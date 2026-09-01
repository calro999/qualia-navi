import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

function normalizeHard(name) {
  let s = name;
  s = s.replace(/【[^】]*】/g, '');
  s = s.replace(/\[[^\]]*\]/g, '');
  s = s.replace(/（[^）]*）/g, '');
  s = s.replace(/\([^)]*\)/g, '');
  s = s.replace(/＼[^／]*／/g, '');
  s = s.replace(/★[^★]*★/g, '');
  s = s.replace(/ポイント\d+倍/g, '');
  s = s.replace(/P\d+倍/g, '');
  s = s.replace(/送料無料/g, '');
  s = s.replace(/あす楽/g, '');
  s = s.replace(/公式/g, '');
  s = s.replace(/正規品/g, '');
  s = s.replace(/国内/g, '');
  s = s.replace(/即納/g, '');
  s = s.replace(/限定/g, '');
  s = s.replace(/メール便/g, '');
  s = s.replace(/ネコポス/g, '');
  s = s.replace(/スーパーSALE/g, '');
  s = s.replace(/お買い物マラソン/g, '');
  s = s.replace(/クーポン[^\s]*/g, '');
  s = s.replace(/期間[^\s]*/g, '');
  s = s.replace(/対象商品/g, '');
  s = s.replace(/全商品/g, '');
  s = s.replace(/先着\d+名様/g, '');
  s = s.replace(/\d+％?OFF/gi, '');
  s = s.replace(/\d+%OFF/gi, '');
  s = s.replace(/\d+個セット/g, '');
  s = s.replace(/\d+本セット/g, '');
  s = s.replace(/\d+枚セット/g, '');
  s = s.replace(/\d+個入/g, '');
  s = s.replace(/\d+セット/g, '');
  s = s.replace(/セット/g, '');
  s = s.replace(/1\+1\+1/g, '');
  s = s.replace(/1\+1/g, '');
  s = s.replace(/詰め替え/g, '');
  s = s.replace(/つめかえ/g, '');
  s = s.replace(/レフィル/g, '');
  s = s.replace(/\d+\.?\d*(mL|ml|g|kg|mg|cc|包|個|枚|本)/gi, '');
  s = s.replace(/[☆★◎●▲■□◆▼△▽♪♫♬※…！!？?・&/|＆＄＃＊:：,，。.、;；～〜→←↑↓↔「」『』""'']/g, '');
  s = s.replace(/[\s\-_　]/g, '');
  return s.toLowerCase();
}

function isSameProduct(norm1, norm2) {
  if (norm1.length < 4 || norm2.length < 4) return false;
  if (norm1 === norm2) return true;
  const h1 = norm1.slice(0, 12);
  const h2 = norm2.slice(0, 12);
  if (h1 === h2) return true;
  if (norm1.length >= 8 && norm2.length >= 8) {
    if (norm1.includes(norm2.slice(0, 10)) || norm2.includes(norm1.slice(0, 10))) return true;
  }
  return false;
}

const EXCLUDE_KEYWORDS = [
  'サポーター', '膝', 'ショーツ', 'パンツ', 'ソックス', '靴下',
  'カステラ', 'お菓子', 'スイーツ', 'コーヒー', '青汁', '大麦若葉',
  'ランドセル', 'ワンピース', 'ドレス', 'エプロン', '腕時計', '時計', '枕カバー',
  'スマホケース', '手帳型', 'iphone', '保護フィルム', 'ガラスフィルム', 'イヤホン',
  '風呂ふた', 'チューブ絞り', 'アームストラップ', '消臭元', 'dvd', 'blu-ray',
  'barfout', '24時間テレビ', 'ボディシェイプ', 'スマートウォッチ',
  'ダイエットサプリ', '円座', '足湯長靴', 'ウォームソックス', 'バンテリン',
  '詰め替えそのまま', 'ポンプとフック'
];

function isBeautyCosmetic(itemName) {
  const lower = itemName.toLowerCase();
  for (const ex of EXCLUDE_KEYWORDS) {
    if (lower.includes(ex.toLowerCase())) return false;
  }
  return true;
}

async function fetchDistinctItems(queries, minHits = 10) {
  const distinct = [];
  const seenNorms = [];
  const seenImages = new Set();
  const seenBaseUrls = new Set();

  for (const q of queries) {
    if (!q || q.length < 2) continue;
    if (distinct.length >= minHits) break;

    try {
      const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(q)}&format=json&hits=30&sort=-reviewCount&imageFlag=1`;
      const res = await fetch(url);
      if (!res.ok) { await new Promise(r => setTimeout(r, 1200)); continue; }
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) continue;

      for (const e of data.Items) {
        if (distinct.length >= minHits) break;
        const item = e.Item || e;
        if (!item.itemName || !item.affiliateUrl) continue;
        if (!isBeautyCosmetic(item.itemName)) continue;

        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
          img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        } else if (img.includes('tshop.r10s.jp/')) {
          img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        }
        if (!img) continue;

        const norm = normalizeHard(item.itemName);
        const imgFile = img.split('?')[0].split('/').pop();
        const baseUrl = item.affiliateUrl.split('?')[0];

        let isDuplicate = false;
        if (seenBaseUrls.has(baseUrl)) isDuplicate = true;
        if (imgFile && seenImages.has(imgFile)) isDuplicate = true;
        for (const seen of seenNorms) {
          if (isSameProduct(norm, seen)) { isDuplicate = true; break; }
        }

        if (!isDuplicate) {
          seenNorms.push(norm);
          if (imgFile) seenImages.add(imgFile);
          seenBaseUrls.add(baseUrl);
          distinct.push({
            itemName: item.itemName,
            shopName: item.shopName || '楽天市場 取扱店',
            affiliateUrl: item.affiliateUrl,
            imageUrl: img,
            price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '価格確認',
            priceNum: item.itemPrice || 0,
            reviewAvg: item.reviewAverage || 4.5,
            reviewCount: item.reviewCount || 0,
            catchcopy: item.catchcopy || ''
          });
        }
      }
    } catch (err) {
      console.warn(`⚠️ ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 700));
  }
  return distinct.slice(0, 10);
}

function generateFeature(item, articleTitle, rank) {
  const rating = item.reviewAvg || 4.5;
  const price = item.priceNum || 0;
  let cc = '';
  if (rank === 1) cc = '【圧倒的売上＆高評価★' + rating.toFixed(1) + '】今選ぶべき本命No.1アイテム';
  else if (rank === 2) cc = '【SNS・口コミで超話題】リピーター続出の実力派ベストセラー';
  else if (rank === 3) cc = '【プロ絶賛・高コスパ】仕上がりの完成度で選ぶならコレ';
  else if (price > 0 && price < 1800) cc = '【プチプラ最強コスパ】惜しみなく毎日使える大人気名品';
  else if (price >= 5000) cc = '【極上ラグジュアリー】至高の使用感と上質なエイジングケア';
  else if (rating >= 4.7) cc = '【驚異の満足度★' + rating.toFixed(1) + '】失敗知らずの神コスメ';
  else cc = '【楽天市場ランキング上位】確かな実力と信頼の人気アイテム';
  const t = articleTitle;
  let d = '';
  if (t.includes('ニキビ') || t.includes('パッチ') || t.includes('アクネ'))
    d = '薄型透明設計でメイクの上からでも目立たず貼れる次世代スポッツケア。有効成分がニキビの炎症部位に集中アプローチし、触らず清潔に保つことで治りを早めます。';
  else if (t.includes('クッション') || t.includes('ファンデ'))
    d = '微粒子パウダーが毛穴・色ムラを瞬時に補正し、水光肌を演出。高密着処方で崩れにくく、スキンケア成分配合で一日中うるおいのあるツヤ肌をキープします。';
  else if (t.includes('リードル') || t.includes('VT'))
    d = '独自のマイクロニードル技術で美容成分を角層深くまでダイレクトに届け、肌のキメ・ツヤ・弾力を集中的にケア。使用回数を重ねるほど実感できる美肌効果を叶えます。';
  else if (t.includes('アイシャドウ') || t.includes('アイシャドー'))
    d = '繊細なパール粒子が光を纏い、目元に奥行きと立体感をプラス。粉飛びやヨレを防ぐ密着処方で、朝のメイクしたての美しい発色が夜まで持続します。';
  else if (t.includes('シーブリーズ') || t.includes('制汗'))
    d = '瞬間冷却＆制汗成分が汗やベタつきを瞬時にリフレッシュ。爽やかな清涼感が長時間持続し、暑い日でもサラサラ快適な肌をキープします。';
  else if (t.includes('オイル') || t.includes('ヘアオイル'))
    d = '厳選された天然由来のオイル成分が髪と肌に浸透し、しっとりなめらかな質感に。べたつかない軽いテクスチャーで、サロン帰りのような上質なツヤとまとまりを叶えます。';
  else if (t.includes('キュレル') || t.includes('皮脂'))
    d = 'セラミドケアと皮脂コントロール成分がTゾーンのテカリ・べたつきを抑えながら、肌のバリア機能を整えて潤いを保持。乾燥性敏感肌でも安心して使える低刺激設計です。';
  else if (t.includes('ビタミンC') || t.includes('リポ'))
    d = 'リポソーム技術で体内吸収率を飛躍的に高めた高濃度ビタミンC。透明感アップや疲労回復をサポートし、インナーケアから美しさを底上げします。';
  else if (t.includes('コスメ') || t.includes('口コミ') || t.includes('人気'))
    d = '楽天市場で圧倒的な支持を集める実力派コスメ。リアルな口コミ評価とリピート率の高さが品質を証明する、失敗しないベストセラーアイテムです。';
  else if (t.includes('カラーシャンプー') || t.includes('シャンプー') || t.includes('ミルクティー'))
    d = 'ブリーチやカラー後の嫌な黄ばみ・赤みをしっかり抑え、サロン帰りの美しい透明感と絶妙なニュアンスカラーをキープ。髪を傷めずなめらかに洗い上げます。';
  else
    d = '肌馴染み抜群の心地よいテクスチャーで、使うたびに肌のコンディションを底上げ。毎日の美容ルーティンを格上げする確かなクオリティです。';
  return `<strong>【特徴】</strong> ${cc}！${d}`;
}

function buildContent(article, top10) {
  const today = '2026-08-31';
  let table = `| 順位 | 商品名 | 価格帯 | 特徴・おすすめポイント | リンク |\n|:---:|:---|:---:|:---|:---:|\n`;
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const shortName = p.itemName.slice(0, 32).replace(/[|\[\]]/g, ' ');
    table += `| **${rank}位** | **${shortName}** | ${p.price || '価格確認'} | ★${p.reviewAvg}・高評価実力派 | [楽天市場で見る](${p.affiliateUrl}) |\n`;
  });
  let productsHtml = '';
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const cleanName = p.itemName.replace(/[<>"']/g, '');
    const featureText = generateFeature(p, article.title, rank);
    productsHtml += `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card">
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 16px 0;">
    <img src="${p.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
    <div style="flex: 1; min-width: 240px;">
      <p style="font-size: 1.25rem; font-weight: bold; color: #e11d48; margin-bottom: 8px;">実売価格: ${p.price || 'ショップ価格を参照'}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px;"><strong>取扱ショップ:</strong> ${p.shopName} (★${p.reviewAvg} / レビュー${p.reviewCount}件)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 14px rgba(191,30,46,0.35);">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${featureText}</p>
</div>
`;
  });
  let intro = article.description || '';
  let existingSections = `## 📌 失敗しない選び方のポイント\n\n毎日のケアやお悩みに合わせて、成分表記や使用感、テクスチャーをチェックして選ぶのがポイントです。`;
  let existingFaqs = `## ❓ よくある質問（FAQ）\n\n### Q. 敏感肌でも使えますか？\n**A.** パッチテスト済みの低刺激処方のものがおすすめです。\n\n### Q. 毎日使っても大丈夫？\n**A.** 基本的にデイリーケアアイテムは毎日ご使用いただけます。`;
  if (article.content) {
    const pMatch = article.content.match(/(## 📌[\s\S]*?)(?=## ❓|## 🎯|---|(?=<script)|$)/);
    if (pMatch) existingSections = pMatch[1].trim();
    const fMatch = article.content.match(/(## ❓[\s\S]*?)(?=## 🎯|---|(?=<script)|$)/);
    if (fMatch) existingFaqs = fMatch[1].trim();
    const introMatch = article.content.match(/^# [^\n]+\n\n([\s\S]*?)(?=\n---|## 📱)/);
    if (introMatch && introMatch[1].trim()) intro = introMatch[1].trim();
  }
  const listSchema = { "@context": "https://schema.org", "@type": "ItemList", "name": article.title, "numberOfItems": top10.length, "itemListElement": top10.map((p, i) => ({ "@type": "ListItem", "position": i + 1, "name": p.itemName.slice(0, 80), "url": p.affiliateUrl })) };
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": article.title, "description": article.description, "author": { "@type": "Person", "name": article.author || "Qualia Navi取材班" }, "datePublished": today, "dateModified": today, "publisher": { "@type": "Organization", "name": "Qualia Navi" } };
  const tagLabel = article.tags && article.tags.length > 0 ? article.tags.slice(0, 4).join(' ') : '厳選おすすめ';
  return `# ${article.title}

${intro}

---

## 📱 【比較表】${tagLabel} 10選 一覧

${table}

${productsHtml}

---

${existingSections}

---

${existingFaqs}

---

## 🎯 まとめ

本記事では「${article.title}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる独立した10商品**をご紹介しました。ぜひ気になったアイテムから試してみてください。

---

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(listSchema, null, 2)}
</script>
`;
}

const extendedQueries = {
  'art-peri-acne-patch-spots-care-ranking-2026': ['ニキビパッチ', 'スポッツケア', 'VT ニキビパッチ', 'COSRX パッチ', 'ニキビ ケア シール', 'ニキビ 薬用 パッチ', '肌荒れ パッチ'],
  'art-peri-korean-cushion-foundation-ranking-2026': ['クッションファンデ 韓国', 'TIRTIR クッション', 'ミシャ クッション', 'クッションファンデーション', 'AGE20s ファンデ', 'ファンデーション 韓国コスメ', 'ツヤ肌 クッション'],
  'art-peri-reedle-shot-levels-comparison-guide-2026': ['VT リードルショット', 'VT コスメティック', 'VT CICA', 'リードルショット 100', 'リードルショット 300', 'マイクロニードル 美容液', 'VT スキンケア'],
  'art-peri-eyeshadow-base-petit-price-ranking-2026': ['アイシャドウベース', 'キャンメイク アイベース', 'エクセル アイシャドウ', 'アイシャドウ下地', 'アイプライマー', 'アイシャドウ ヨレ防止', 'プチプラ アイメイク'],
  'art-sachiko-sea-breeze-price-effects-comparison': ['シーブリーズ', 'デオウォーター', '制汗スプレー', 'ボディシート 冷感', '制汗剤 メントール', 'クールローション 夏', '汗拭きシート 楽天'],
  'art-sachiko-loa-the-oil-hair-body-care-guide': ['ヘアオイル 人気', 'ヘアオイル いい匂い', 'ボディオイル 保湿', 'N. ポリッシュオイル', 'モロッカンオイル', 'ヘアオイル 楽天 ランキング', 'ヘアオイル サラサラ'],
  'art-sachiko-curel-sebum-trouble-care-gel-review': ['キュレル 保湿', 'テカリ防止 保湿ジェル', 'オイルコントロール ジェル', 'ジェルクリーム 皮脂', '脂性肌 保湿', 'セラミド ジェル', 'インナードライ ジェル'],
  'art-sachiko-lypoc-vitamin-c-timing-effects': ['ビタミンC サプリ', 'リポソーム ビタミンC', 'ビタミンC ドリンク', '高濃度ビタミンC', 'ビタミンC 美容', 'ビタミンC 粉末', 'アスコルビン酸 サプリ'],
  'art-cosme-kuchikomi-review-2026-real': ['コスメ 口コミ 人気', 'ベストコスメ 楽天', 'コスメ 高評価', '話題 コスメ ランキング', 'コスメ ベストセラー', 'スキンケア 人気 楽天', 'メイクアップ 人気 楽天'],
  'art-milktea-beige-shampoo-10-ranking-comparison-2026': ['ミルクティーシャンプー', 'ベージュシャンプー', 'カラーシャンプー アッシュ', 'カラーシャンプー ベージュ', 'エンシェールズ ミルクティー', 'ソマルカ アッシュ', 'カラーキープ シャンプー']
};

async function main() {
  const ids = Object.keys(extendedQueries);
  console.log(`🚀 残り${ids.length}記事の修復開始（拡張クエリ版）...`);

  let fixed = 0;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const idx = articlesData.findIndex(a => a.id === id);
    if (idx === -1) { console.warn(`⚠️ 記事なし: ${id}`); continue; }
    const art = articlesData[idx];
    const queries = extendedQueries[id];

    console.log(`\n[${i+1}/${ids.length}] 修復中: ${id}`);

    const items = await fetchDistinctItems(queries, 10);
    console.log(`  取得: ${items.length}件`);

    if (items.length < 5) {
      console.warn(`⚠️ 5件未満で対応不可 (${items.length}件): ${id}`);
      continue;
    }

    const finalItems = items.slice(0, Math.min(items.length, 10));
    const newContent = buildContent(art, finalItems);
    articlesData[idx] = {
      ...art,
      content: newContent,
      image: finalItems[0].imageUrl,
      affiliateUrl: finalItems[0].affiliateUrl,
      price: finalItems[0].price,
      itemCount: finalItems.length,
      updatedAt: '2026-08-31'
    };
    console.log(`✅ 修復完了 (${finalItems.length}商品, 1位: ${finalItems[0].itemName.slice(0,28)}...)`);
    fixed++;

    await new Promise(r => setTimeout(r, 800));
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 ${fixed}件を修復完了！`);
}

main().catch(err => { console.error('❌', err); process.exit(1); });
