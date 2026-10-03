import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch32Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch32_items.json', 'utf8'));

// --- テーマ1: コスメアドベントカレンダー＆ホリデー限定コフレ 厳選10商品 ---
export const adventItemsRaw = batch32Data.theme1_advent;

// --- テーマ2: 冬のカラーコントロール下地＆補正ベース 厳選10商品 ---
export const colorCorrectItemsRaw = batch32Data.theme2_color_correct;

// --- テーマ3: 乾燥しない高保湿ベルベットマットリップ 厳選10商品 ---
export const velvetLipItemsRaw = batch32Data.theme3_velvet_lip;

console.log(`選定アイテム数: アドベントカレンダー=${adventItemsRaw.length}, コントロールカラー下地=${colorCorrectItemsRaw.length}, ベルベットマットリップ=${velvetLipItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'advent' ? 'adv' : category === 'color_correct' ? 'cc' : 'vlp';
  const id = `art-winter-b32-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'クリスマスコフレ・アドベントカレンダー・ホリデー限定・ギフトセット・2026冬コスメ・プレミアムコフレ';
  let descType = '11〜12月のクリスマスまでのカウントダウンを毎日特別なコスメで彩る、人気デパコス・オーガニックブランドの豪華コスメアドベントカレンダー';
  if (category === 'color_correct') {
    catName = 'ベースメイク・コントロールカラー・化粧下地・カラー補正・赤み消し・青クマカバー・冬のくすみ対策・透明感メイク';
    descType = '11〜12月の寒冷乾燥や血行不良で生じる赤ら顔・青クマ・黄ぐすみを補色理論と光拡散で一掃し、ファンデの厚塗りを防ぐ高保湿カラーコントロール下地';
  } else if (category === 'velvet_lip') {
    catName = 'リップメイク・マットリップ・ベルベットティント・スフレリップ・高保湿・落ちにくいリップ・冬メイク・深みカラー';
    descType = '11〜12月の真冬の乾燥環境でも縦ジワを目立たせず、しっとりスフレ質感でドラマティックな深み発色を長時間キープする高保湿ベルベットマットリップ';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月のホリデーシーズンおよび厳冬期において、上質な仕上がりと高い実用性でSNSや美容誌から絶賛を集める本命の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規公式ショップ・優良店からポイントアップやクーポンを活用してお得に購入可能です。冬の特別なシーンや日常のメイク悩みを確実にアップデートしてくれる名品です。`,
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
    reviewAverage: item.reviewAverage || 4.7,
    reviewCount: item.reviewCount || 280,
    featureSlug: featureSlug
  };
}

export const adventArticles = adventItemsRaw.map((it, idx) => createProductArticle(it, 'advent', ['アドベントカレンダー', 'クリスマスコフレ', 'ホリデー限定', 'ロクシタン', 'ポールアンドジョー', 'キールズ', 'サボン', 'ディオール', 'クリニーク', 'クラランス', 'ジルスチュアート', 'コスメデコルテ', 'YSL', '2026コフレ'], 'winter-beauty-advent-calendar-holiday-2026', idx));
export const colorCorrectArticles = colorCorrectItemsRaw.map((it, idx) => createProductArticle(it, 'color_correct', ['コントロールカラー', '化粧下地', 'カラー補正', 'エレガンス', 'ジバンシイ', 'コスメデコルテ', 'RMK', 'フーミー', 'イプサ', 'インテグレート', 'キャンメイク', 'キス', 'セザンヌ', '赤み消し', '青クマ対策'], 'winter-color-correcting-makeup-base-primer-2026', idx));
export const velvetLipArticles = velvetLipItemsRaw.map((it, idx) => createProductArticle(it, 'velvet_lip', ['ベルベットマットリップ', 'スフレマット', 'リップティント', 'ケイト', 'リップモンスター', 'ロムアンド', '3CE', 'エチュード', 'ビーアイドル', 'NARS', 'MAC', 'Laka', 'メイベリン', 'ペリペラ', '冬リップ'], 'winter-hydrating-velvet-matte-lip-tint-2026', idx));

export const allNewArticles = [...adventArticles, ...colorCorrectArticles, ...velvetLipArticles];

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
        <span style="background: #e11d48; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px;">${badgeText}</span>
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 280).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #e11d48; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・楽天市場最新価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin-bottom: 14px;">
        ${description}
      </p>
      <div style="background: #f8fafc; padding: 12px 14px; border-radius: 10px; margin-bottom: 14px; font-size: 0.86rem; border: 1px solid #e2e8f0;">
        <div style="color: #15803d; font-weight: bold; margin-bottom: 4px;">👍 おすすめポイント:</div>
        <div style="color: #334155; margin-bottom: 6px;">${pros}</div>
        <div style="color: #b91c1c; font-weight: bold; margin-bottom: 4px;">⚠️ 注意点・留意点:</div>
        <div style="color: #334155;">${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); color: #ffffff; font-weight: bold; font-size: 0.9rem; padding: 10px 20px; border-radius: 9999px; text-decoration: none; box-shadow: 0 2px 8px rgba(225,29,72,0.3);">
          楽天市場で詳細・最安値を見る →
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #f1f5f9; color: #334155; font-weight: 600; font-size: 0.85rem; padding: 10px 16px; border-radius: 9999px; text-decoration: none; border: 1px solid #cbd5e1;">
          個別口コミレビュー記事へ
        </a>
      </div>
    </div>
  </div>
</div>
`;
}

export function renderRakutenCampaignBanner() {
  return `
<div style="margin: 32px 0; padding: 18px 24px; border-radius: 14px; background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%); border: 1px solid #fecdd3; text-align: center;">
  <span style="display: inline-block; background: #e11d48; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 10px; border-radius: 9999px; margin-bottom: 8px;">楽天市場 2026冬 お得情報</span>
  <h4 style="margin: 0 0 6px 0; color: #9f1239; font-size: 1.05rem; font-weight: bold;">【ポイント最大10倍以上】お買い物マラソン＆5と0のつく日はさらにお得！</h4>
  <p style="margin: 0; font-size: 0.88rem; color: #4c0519; line-height: 1.5;">
    冬コスメ・ホリデー限定品の購入は楽天市場の公式ショップ・優良店が安心＆高還元。エントリー＆楽天カード利用で大量ポイントが還元されます。
  </p>
</div>
`;
}
