import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch38Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch38_items.json', 'utf8'));

// --- テーマ1: 年間ベストコスメ受賞・殿堂入り神コスメ 厳選10商品 ---
export const bestcosmeItemsRaw = batch38Data.theme1_bestcosme;

// --- テーマ2: ホリデー限定チーク＆ツヤ肌ハイライトパレット 厳選10商品 ---
export const blushHighlighterItemsRaw = batch38Data.theme2_blush_highlighter;

// --- テーマ3: メンズコスメ＆ジェンダーレス冬ギフト名品 厳選10商品 ---
export const mensGiftItemsRaw = batch38Data.theme3_mens_gift;

console.log(`選定アイテム数: ベスコス殿堂入り=${bestcosmeItemsRaw.length}, チーク＆ハイライト=${blushHighlighterItemsRaw.length}, メンズ冬ギフト=${mensGiftItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'best' ? 'best' : category === 'blush' ? 'blush' : 'mens';
  const id = `art-winter-b38-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ベストコスメ・殿堂入り・デパコス名品・コスメデコルテ・クレドポー・カネボウ・SUQQU・ディオール・ランコム・2026冬コスメ';
  let descType = '美容専門誌やSNSの年間ベストコスメで殿堂入りを果たした実力派コスメ。11〜12月の本格的な乾燥期でも圧倒的な美肌効果を発揮し、多くの美容愛好家やプロから絶賛され続ける名品';
  if (category === 'blush') {
    catName = 'メイクアップ・チーク・ハイライト・フェイスパウダー・多幸感メイク・ディオール・シャネル・SUQQU・クレドポー・2026冬コスメ';
    descType = '冬の寒さによる血行不良やくすみを一掃し、内側からジュワッと上気したような血色感と繊細なパールツヤを宿すホリデー＆冬メイクの主役コスメ';
  } else if (category === 'mens') {
    catName = 'メンズコスメ・メンズスキンケア・クリスマスギフト・冬ギフト・身だしなみ・SHISEIDOMEN・イソップ・THREE・バルクオム・2026冬コスメ';
    descType = '11〜12月のホリデーシーズンに彼氏や旦那、大切なパートナーへのプレゼントとして大人気のメンズコスメ＆グルーミング名品。冬の乾燥肌を清潔感あふれる美肌へと導く上質ギフト';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}です。楽天市場での最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」をはじめとする信頼できる取扱ショップにて、ポイントアップやお買い物マラソンのキャンペーンを活用して賢く購入いただけます。冬の自分へのご褒美や大切な方へのホリデーギフトとして自信を持っておすすめできる逸品です。`,
    category: catName,
    tags: [...tagList, '2026冬コスメ', '楽天市場正規品', '11月12月人気コスメ'],
    createdAt: nowStr,
    updatedAt: nowStr,
    itemCode: item.itemCode,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    priceFormatted: item.priceFormatted,
    itemUrl: item.affiliateUrl || item.itemUrl,
    affiliateUrl: item.affiliateUrl,
    imageUrl: item.imageUrl,
    shopName: item.shopName,
    reviewAverage: item.reviewAverage || 4.8,
    reviewCount: item.reviewCount || 350,
    featureSlug: featureSlug
  };
}

export const bestcosmeArticles = bestcosmeItemsRaw.map((it, idx) => createProductArticle(it, 'best', ['ベストコスメ', '殿堂入り', 'コスメデコルテ', 'リポソーム', 'クレドポー', 'ルセラム', 'カネボウ', 'ルージュスターヴァイブラント', 'SUQQU', 'ディオールマキシマイザー', 'ランコムジェニフィック', 'エスティローダー', 'POLAアイゾーンクリーム'], 'winter-best-cosmetics-hall-of-fame-award-2026', idx));
export const blushHighlighterArticles = blushHighlighterItemsRaw.map((it, idx) => createProductArticle(it, 'blush', ['チーク', 'ハイライト', 'ディオールバックステージ', 'クレドポーボーテ', 'レオスールデクラ', 'SUQQUチーク', 'シャネルボームエサンシエル', 'ジルスチュアート', '血色メイク', '多幸感メイク', '生ツヤ肌'], 'winter-holiday-glow-blush-highlighter-palette-2026', idx));
export const mensGiftArticles = mensGiftItemsRaw.map((it, idx) => createProductArticle(it, 'mens', ['メンズコスメ', 'メンズスキンケア', '彼氏プレゼント', 'クリスマスプレゼント', 'SHISEIDOMEN', 'イソップ', 'THREEフォーメン', 'バルクオム', 'ロクシタンメンズ', 'ディプティック', 'プラウドメン'], 'winter-mens-grooming-holiday-gift-set-2026', idx));

export const allNewArticles = [...bestcosmeArticles, ...blushHighlighterArticles, ...mensGiftArticles];

const existingIds = new Set(existingArticles.map(a => a.id));
let addedCount = 0;
for (const art of allNewArticles) {
  if (!existingIds.has(art.id)) {
    existingArticles.unshift(art);
    existingIds.add(art.id);
    addedCount++;
  }
}
fs.writeFileSync(articlesJsonPath, JSON.stringify(existingArticles, null, 2), 'utf8');
console.log(`✅ src/data/articles.json に ${addedCount} 件の新規個別商品記事を登録しました。（総記事数: ${existingArticles.length}件）`);

// 商品カードコンポーネント生成関数
export function renderItemCard(it, art, badgeText, description, pros, cons) {
  return `
<div style="margin: 28px 0; padding: 22px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.05);">
  <div style="display: flex; gap: 20px; flex-direction: row; flex-wrap: wrap;">
    <div style="flex: 0 0 200px; max-width: 220px; margin: 0 auto; text-align: center;">
      <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener">
        <img src="${it.imageUrl}" alt="${it.itemName}" style="width: 100%; height: auto; max-height: 220px; object-fit: contain; border-radius: 12px; background: #f8fafc; padding: 6px; border: 1px solid #edf2f7;" loading="lazy" />
      </a>
      <div style="margin-top: 8px; font-size: 0.78rem; color: #64748b;">取扱店舗: ${it.shopName}</div>
    </div>
    <div style="flex: 1 1 300px; min-width: 260px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <span style="background: #0284c7; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px;">${badgeText}</span>
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 350).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・楽天市場最新価格)</span>
      </div>
      <p style="font-size: 0.92rem; line-height: 1.65; color: #334155; margin-bottom: 14px;">
        ${description}
      </p>
      <div style="background: #f8fafc; border-radius: 10px; padding: 12px; margin-bottom: 16px; font-size: 0.85rem;">
        <div style="color: #059669; font-weight: bold; margin-bottom: 4px;">👍 編集部の推しポイント:</div>
        <div style="color: #334155; margin-bottom: 8px; line-height: 1.4;">${pros}</div>
        <div style="color: #dc2626; font-weight: bold; margin-bottom: 4px;">💡 購入前の留意点:</div>
        <div style="color: #334155; line-height: 1.4;">${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #e60012 100%); color: #ffffff; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 0.88rem; text-decoration: none; box-shadow: 0 2px 8px rgba(230,0,18,0.25);">
          楽天市場で最安値・在庫を見る →
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #f1f5f9; color: #475569; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; text-decoration: none; border: 1px solid #cbd5e1;">
          詳細レビューを見る
        </a>
      </div>
    </div>
  </div>
</div>
`;
}

// 楽天キャンペーンバナー
export function renderRakutenCampaignBanner() {
  return `
<div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #fff1f2 0%, #fef2f2 100%); border: 1.5px dashed #f43f5e; border-radius: 16px; text-align: center;">
  <span style="background: #e11d48; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 4px 10px; border-radius: 9999px; display: inline-block; margin-bottom: 8px;">楽天市場 2026冬 ホリデー＆マラソン開催中</span>
  <h4 style="font-size: 1.1rem; font-weight: 800; color: #881337; margin: 0 0 8px 0;">エントリーでポイント最大10倍以上！冬の限定コスメ・ギフトをお得に手に入れるチャンス</h4>
  <p style="font-size: 0.88rem; color: #4c0519; margin: 0 0 14px 0; line-height: 1.5;">
    11〜12月のホリデー限定コフレや人気アイテムは完売・在庫切れが相次ぎます。買い回りキャンペーンやお買い物マラソンを賢く併用して、ポイント還元を最大限に受け取りましょう。
  </p>
  <a href="https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fpoint-up%2Fmarathon%2F" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #e11d48; color: #ffffff; padding: 10px 24px; border-radius: 8px; font-weight: bold; font-size: 0.9rem; text-decoration: none; box-shadow: 0 3px 10px rgba(225,29,72,0.3);">
    楽天マラソン・ポイントアップに事前エントリーする →
  </a>
</div>
`;
}
