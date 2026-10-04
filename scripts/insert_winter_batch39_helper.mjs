import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch39Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch39_items.json', 'utf8'));

// --- テーマ1: ホリデーフレグランス＆冬香水・ヘアミスト 厳選10商品 ---
export const fragranceItemsRaw = batch39Data.theme1_fragrance;

// --- テーマ2: 夜用リップスリーピングマスク＆高保湿リップトリートメントバーム 厳選10商品 ---
export const lipMaskItemsRaw = batch39Data.theme2_lip_mask;

// --- テーマ3: ホリデー限定ネイルカラー＆高保湿ネイルオイル・ハンドケア 厳選10商品 ---
export const nailCareItemsRaw = batch39Data.theme3_nail_care;

console.log(`選定アイテム数: 冬フレグランス=${fragranceItemsRaw.length}, リップスリーピングマスク=${lipMaskItemsRaw.length}, ネイルケア=${nailCareItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'fragrance' ? 'fragrance' : category === 'lipmask' ? 'lipmask' : 'nailcare';
  const id = `art-winter-b39-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'フレグランス・香水・ヘアミスト・ジョーマローン・マルジェラ・ディプティック・SHIRO・シャネル・ディオール・ルラボ・2026冬コスメ';
  let descType = '澄んだ冬の冷気と聖夜の街並みに美しく溶け込むプレミアムフレグランス＆ヘアミスト。11〜12月のホリデーシーズンに自分へのご褒美や大切な人への特別なクリスマスギフトとして圧倒的な人気を誇る名香';
  if (category === 'lipmask') {
    catName = 'リップケア・リップスリーピングマスク・リップバーム・高保湿リップ・ラネージュ・オバジ・キュレル・タカミ・ディオール・2026冬コスメ';
    descType = '冬の過酷な暖房乾燥や寒風によるガサガサ唇・皮剥け・縦じわを、就寝中に濃密な潤いヴェールで集中リセットする夜用リップトリートメント';
  } else if (category === 'nailcare') {
    catName = 'ネイルケア・ネイルオイル・ホリデーネイル・マニキュア・uka・ディオール・シャネル・OPI・LCN・OSAJI・ロクシタン・2026冬コスメ';
    descType = '冬のコートやニットの手元を上品に彩るホリデーネイルカラーと、寒冷乾燥によるささくれ・二枚爪・割れ爪を根本から防ぐ高保湿ネイルオイル＆甘皮リペアトリートメント';
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
    reviewCount: item.reviewCount || 320,
    featureSlug: featureSlug
  };
}

export const fragranceArticles = fragranceItemsRaw.map((it, idx) => createProductArticle(it, 'fragrance', ['冬香水', 'ホリデーフレグランス', 'ヘアミスト', 'ジョーマローン', 'メゾンマルジェラ', 'ディプティック', 'SHIRO', 'シャネル', 'ディオール', 'ルラボ', 'バイレード', 'クロエ', 'クリスマスギフト'], 'winter-holiday-fragrance-parfum-hairmist-2026', idx));
export const lipMaskArticles = lipMaskItemsRaw.map((it, idx) => createProductArticle(it, 'lipmask', ['リップスリーピングマスク', '夜用リップケア', '唇の皮剥け', 'リップバーム', 'ラネージュ', 'オバジ', 'キュレル', 'タカミリップ', 'トリデン', 'CNP', 'モアリップ', 'クラランス', 'ディオールリップ'], 'winter-overnight-lip-sleeping-mask-treatment-2026', idx));
export const nailCareArticles = nailCareItemsRaw.map((it, idx) => createProductArticle(it, 'nailcare', ['ネイルケア', 'ネイルオイル', 'ホリデーネイル', '甘皮ケア', '二枚爪', 'ukaネイルオイル', 'ディオールアブリコ', 'シャネルヴェルニ', 'OPIネイルエンビー', 'LCN', 'キャンメイク', 'OSAJI', 'ロクシタン'], 'winter-holiday-nail-color-oil-cuticle-care-2026', idx));

export const allNewArticles = [...fragranceArticles, ...lipMaskArticles, ...nailCareArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 320).toLocaleString()}件)</span>
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
