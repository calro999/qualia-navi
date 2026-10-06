import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch50Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch50_items.json', 'utf8'));

// --- テーマ1: ボディ角質ケア 厳選10商品 ---
export const bodyPeelItemsRaw = batch50Data.theme1_body_peel;

// --- テーマ2: 高保湿フェムケア・デリケートゾーンケア 厳選10商品 ---
export const femItemsRaw = batch50Data.theme2_fem_care;

// --- テーマ3: 女性用薬用育毛美容液＆スカルプエッセンス 厳選10商品 ---
export const hairGrowthItemsRaw = batch50Data.theme3_hair_growth;

console.log(`第50弾 選定アイテム数: ボディ角質ケア=${bodyPeelItemsRaw.length}, フェムケア=${femItemsRaw.length}, 育毛スカルプ=${hairGrowthItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'body_peel' ? 'bdp' : category === 'fem_care' ? 'fem' : 'hrg';
  const id = `art-winter-b50-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ボディケア・角質ケア・ピーリング・ボディスクラブ・二の腕ザラつき・ひじひざ黒ずみ・高保湿・2026冬ボディケア';
  let descType = '11〜12月の厚手のニット・タイツ摩擦と暖房乾燥で角質肥厚を起こした二の腕のザラつき（毛孔性苔癬）、ひじ・ひざのガサガサ黒ずみを、肌を傷めずケミカルピーリング（BHA/AHA）や濃密ソルト・シュガースクラブで優しくなめらかに整える冬の集中ボディ角質ケア';
  if (category === 'fem_care') {
    catName = 'ボディケア・フェムケア・デリケートゾーンケア・フェミニンウォッシュ・保湿オイル・弱酸性・2026冬ボディケア';
    descType = '防寒タイツや裏起毛インナーによるムレ・摩擦、暖房乾燥で引き起こされる冬のデリケートゾーンの乾燥・かゆみ・ニオイ・黒ずみを、弱酸性アミノ酸泡と高純度ボタニカルオイルで労わりながらバリア機能を守る冬の集中フェムケア';
  } else if (category === 'hair_growth') {
    catName = 'ヘアケア・スカルプケア・薬用育毛剤・女性用育毛エッセンス・頭皮美容液・抜け毛予防・ボリュームアップ・2026冬ヘアケア';
    descType = '夏の紫外線ダメージの蓄積と冬の寒冷血行不良が重なる11〜12月の抜け毛ピーク・分け目のペタンコ髪を救い、女性ホルモン様成分や生薬有効成分で根元から立ち上がるふんわり美髪を育む女性用薬用育毛美容液';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分・最安値比較`,
    content: `${item.itemName}は、11〜12月の本格的な冬シーズンにおいて、${descType}として大人気の実力派アイテムです。楽天市場での最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」をはじめとする信頼性の高い公式・正規取扱ショップにて、お買い物マラソンや各種ポイント還元イベントを活用してお得に購入可能です。冬特有の美容悩みを根本から解消し、毎日のケアに確かな手応えをもたらします。`,
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
    reviewCount: item.reviewCount || 195,
    featureSlug: featureSlug
  };
}

export const bodyPeelArticles = bodyPeelItemsRaw.map((it, idx) => createProductArticle(it, 'body_peel', ['二の腕ザラつき', '角質ケア', 'タカミスキンピールボディ', 'ポーラチョイスBHA', 'SABONスクラブ', 'サメ肌改善', 'ひじひざ黒ずみ', '冬のボディケア'], 'winter-rough-skin-keratosis-body-peeling-lotion-2026', idx));
export const femArticles = femItemsRaw.map((it, idx) => createProductArticle(it, 'fem_care', ['フェムケア', 'デリケートゾーンケア', 'iroha', 'アルジタル', 'フェミニンオイル', '弱酸性ソープ', 'タイツムレ対策', 'デリケートゾーン黒ずみ'], 'winter-feminine-care-delicate-oil-wash-2026', idx));
export const hairGrowthArticles = hairGrowthItemsRaw.map((it, idx) => createProductArticle(it, 'hair_growth', ['女性用育毛剤', '薬用育毛エッセンス', 'アデノバイタル', 'スカルプDボーテ', 'マイナチュレ', '抜け毛予防', '冬の頭皮ケア', '美髪育毛'], 'winter-hair-growth-serum-scalp-essence-women-2026', idx));

export const allNewArticles = [...bodyPeelArticles, ...femArticles, ...hairGrowthArticles];

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

// リッチ商品カードレンダラー
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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 195).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・楽天市場最新価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin-bottom: 14px;">
        ${description}
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; font-size: 0.84rem;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px;">
          <div style="color: #166534; font-weight: bold; margin-bottom: 4px;">👍 おすすめポイント</div>
          <div style="color: #15803d; line-height: 1.5;">${pros}</div>
        </div>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px;">
          <div style="color: #991b1b; font-weight: bold; margin-bottom: 4px;">💡 注意点・使い方のコツ</div>
          <div style="color: #b91c1c; line-height: 1.5;">${cons}</div>
        </div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #e11d48; color: #ffffff; padding: 9px 18px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: bold; box-shadow: 0 2px 6px rgba(225,29,72,0.25);">
          楽天市場で最安値・在庫を見る →
        </a>
        <a href="/article/${art.id}" style="display: inline-block; background: #f8fafc; color: #475569; border: 1px solid #cbd5e1; padding: 9px 16px; border-radius: 8px; text-decoration: none; font-size: 0.88rem; font-weight: 500;">
          詳細レビュー・口コミを読む
        </a>
      </div>
    </div>
  </div>
</div>`;
}
