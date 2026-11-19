// scripts/verify_monthly_hubs_quality.mjs
import fs from 'fs';
import path from 'path';
import { readHubItemsFromDir } from './lib/md_item_parser.mjs';

const BANNED_AI_WORDS = [
  'と言えるでしょう',
  '徹底的に追求',
  '極上のひととき',
  'いかがでしたでしょうか',
  'ぜひお試しください',
  '魅力的です',
  'ワンランク上',
  '手放せません',
  '必見です',
  'マストアイテム',
  '注目を集めています',
  '話題沸騰',
  'メーカーカタログに基づいて',
  'メーカー希望小売価格',
  'それどこのリップ',
  'undefined',
  '&nbsp;'
];

function checkQuality() {
  console.log('🔍 [Quality Gate] 月次ハブ記事・商品データの品質監査を開始します...');
  const genresPath = path.resolve('content/hub-genres.json');
  const genres = JSON.parse(fs.readFileSync(genresPath, 'utf8'));

  const hubItemsRoot = path.resolve('content/hub-items');
  const months = fs.readdirSync(hubItemsRoot).filter((d) => /^\d{4}-\d{2}$/.test(d));

  let totalItems = 0;
  let linkErrors = 0;
  let lengthErrors = 0;
  let prosConsErrors = 0;
  let bannedWordErrors = 0;
  let priceErrors = 0;

  for (const m of months) {
    for (const g of genres) {
      const itemDir = path.join(hubItemsRoot, m, g.slug);
      const items = readHubItemsFromDir(itemDir);
      for (const item of items) {
        totalItems++;
        const itemId = `${m}/${g.slug}/${item.itemCode}`;

        // 1. アフィリエイトリンクの検査 (楽天公式アフィリエイトURL形式・有効性)
        const aff = String(item.affiliateUrl || '');
        if (!aff.includes('hb.afl.rakuten.co.jp') && !aff.includes('item.rakuten.co.jp')) {
          console.error(`❌ [リンク不備] ${itemId}: 正しい楽天アフィリエイトURLではありません -> ${aff}`);
          linkErrors++;
        }

        // 2. 記事文章のボリュームと密度 (十分な魅力と情報量を伝えているか)
        const rev = String(item.reviewMarkdown || '');
        if (rev.length < 150) {
          console.error(`❌ [文章量不足] ${itemId}: レビュー本文が短すぎます (${rev.length}字)`);
          lengthErrors++;
        }

        // 3. メリット(3点)・購入前注意点(2点)の網羅性
        const pros = Array.isArray(item.pros) ? item.pros : [];
        const cons = Array.isArray(item.cons) ? item.cons : [];
        if (pros.length < 2 || cons.length < 2) {
          console.error(`❌ [訴求不足] ${itemId}: メリットまたは購入前注意点の記載が不足しています (pros:${pros.length}, cons:${cons.length})`);
          prosConsErrors++;
        }

        // 4. 価格・送料情報の明記
        const price = String(item.price || '');
        if (!price || !/[0-9]/.test(price)) {
          console.error(`❌ [価格情報欠落] ${itemId}: 価格表記が不正です -> ${price}`);
          priceErrors++;
        }

        // 5. AI定型句・HTMLノイズ・カタログ混入チェック
        const fullContent = `${rev} ${item.featurePoint || ''} ${pros.join(' ')} ${cons.join(' ')}`;
        for (const bad of BANNED_AI_WORDS) {
          if (fullContent.includes(bad)) {
            console.error(`❌ [禁止フレーズ混入] ${itemId}: "${bad}" が含まれています`);
            bannedWordErrors++;
          }
        }
      }
    }
  }

  // 6. コンパイル済みハブ記事の構造・配置検査 (blogs.json)
  const blogsPath = path.resolve('public/data/blogs.json');
  const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
  const monthlyHubs = blogs.filter((b) => /^feat-\d{4}-\d{2}-/.test(b.id));

  let layoutErrors = 0;
  for (const hub of monthlyHubs) {
    if (hub.id.includes('grand-hub')) continue;
    const md = hub.contentMarkdown || '';

    // 必須セクションの適切な配置順序を検証
    const hasNav = md.includes('月次特集アーカイブ＆更新切替');
    const hasLatestSpotlight = md.includes('最新') && md.includes('ピックアップ');
    const hasComparisonTable = md.includes('ランキング早見比較表');
    const hasRankedCards = md.includes('徹底検証ランキング');
    const hasBuyingGuide = md.includes('選び方ガイド');
    const hasFaqs = md.includes('よくある疑問 Q&A');
    const hasAffiliateCTA = md.includes('🛒 楽天市場で現在の価格・在庫・レビューを見る');

    if (!hasNav || !hasLatestSpotlight || !hasComparisonTable || !hasRankedCards || !hasBuyingGuide || !hasFaqs || !hasAffiliateCTA) {
      console.error(`❌ [レイアウト配置不備] ${hub.id}: 必須構成セクションが欠落しています`);
      layoutErrors++;
    }

    // HTMLタグの整合性
    const openDiv = (md.match(/<div\b/g) || []).length;
    const closeDiv = (md.match(/<\/div>/g) || []).length;
    const openTable = (md.match(/<table\b/g) || []).length;
    const closeTable = (md.match(/<\/table>/g) || []).length;
    if (openDiv !== closeDiv || openTable !== closeTable) {
      console.error(`❌ [HTML構造破壊] ${hub.id}: divまたはtableタグが閉じていません (div:${openDiv}/${closeDiv}, table:${openTable}/${closeTable})`);
      layoutErrors++;
    }
  }

  console.log(`\n📊 【品質ゲート監査結果】
- 監査商品数: ${totalItems} 点
- リンク不備: ${linkErrors} 件
- 文章密度・魅力伝達不足: ${lengthErrors} 件
- メリット/注意点不足: ${prosConsErrors} 件
- 価格情報欠落: ${priceErrors} 件
- 禁止AIフレーズ/ノイズ混入: ${bannedWordErrors} 件
- ページ構成・配置・レイアウト不備: ${layoutErrors} 件`);

  const totalErrors = linkErrors + lengthErrors + prosConsErrors + priceErrors + bannedWordErrors + layoutErrors;
  if (totalErrors > 0) {
    console.error(`\n🚨 合計 ${totalErrors} 件の品質不備が検出されました。コミット・更新を中断します。`);
    process.exit(1);
  }

  console.log('\n✅ 全ての品質・リンク・文章レベル・レイアウト配置基準をクリアしました！');
}

checkQuality();
