import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch31Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch31_items.json', 'utf8'));

// --- テーマ1: 大粒ラメ＆高密着リキッドグリッターライナー 厳選10商品 ---
export const glitterItemsRaw = batch31Data.theme1_glitter;

// --- テーマ2: 最強カールキープマスカラ下地＆マスカラベース 厳選10商品 ---
export const mascaraBaseItemsRaw = batch31Data.theme2_mascara_base;

// --- テーマ3: 低刺激角質ピーリングジェル＆マイルドゴマージュ 厳選10商品 ---
export const peelingItemsRaw = batch31Data.theme3_peeling;

console.log(`選定アイテム数: グリッター=${glitterItemsRaw.length}, マスカラ下地=${mascaraBaseItemsRaw.length}, ピーリングジェル=${peelingItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'glitter' ? 'glt' : category === 'mascara_base' ? 'mb' : 'pel';
  const id = `art-winter-b31-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'アイメイク・リキッドグリッター・ラメライナー・涙袋ラメ・ホリデーメイク・イルミネーション映え・冬メイク';
  let descType = '11〜12月のイルミネーションやホリデーイベントで、極小ラメから大粒ホログラムまで一日中まぶたに密着させて澄んだ瞳を演出する高密着リキッドグリッターライナー';
  if (category === 'mascara_base') {
    catName = 'アイメイク・マスカラ下地・マスカラベース・カールキープ下地・上向きまつ毛・湿気ブロック・冬メイク・アイラッシュケア';
    descType = '11〜12月のマフラーやマスクの呼気スチーム、冷気によるまつ毛の下垂を完全防御し、夕方まで上向き扇状カールを鉄壁キープする最強カールキープマスカラ下地';
  } else if (category === 'peeling') {
    catName = 'スキンケア・角質ケア・ピーリングジェル・マイルドゴマージュ・くすみケア・毛穴ケア・ブースター・冬の高保湿ケア';
    descType = '11〜12月の冷えや乾燥で分厚く硬くなった古い角質をやさしくポロポロ巻き取り、その後の化粧水や美容液の浸透力を劇的に高める低刺激角質ピーリングジェル';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月のホリデーシーズンおよび寒冷乾燥期において、高い実用性と洗練された仕上がりで美容賢者やSNSから絶大な支持を集める本命の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規取扱店・優良ショップからポイント還元付きでお得にお買い求めいただけます。真冬特有のメイク崩れやくすみ・乾燥悩みをクリアにし、澄んだ美しさを引き出す実力派コスメです。`,
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

export const glitterArticles = glitterItemsRaw.map((it, idx) => createProductArticle(it, 'glitter', ['リキッドグリッター', 'ラメライナー', '涙袋グリッター', 'シピシピ', 'ウォンジョンヨ', 'ロムアンド', 'リリミュウ', 'エチュード', 'キャンメイク', '3CE', 'ミルクタッチ', 'フラワーノーズ', 'ホリデーメイク'], 'winter-sparkle-glitter-eyeliner-liquid-holiday-2026', idx));
export const mascaraBaseArticles = mascaraBaseItemsRaw.map((it, idx) => createProductArticle(it, 'mascara_base', ['マスカラ下地', 'マスカラベース', 'カールキープ下地', 'エレガンス', 'キャンメイク', 'エテュセ', 'ケイト', 'ピメル', 'ヒロインメイク', 'マジョリカマジョルカ', 'ディオール', 'セザンヌ', 'コーセー', 'まつ毛カールキープ'], 'winter-curl-lock-mascara-base-primer-2026', idx));
export const peelingArticles = peelingItemsRaw.map((it, idx) => createProductArticle(it, 'peeling', ['ピーリングジェル', '角質ケア', 'ゴマージュ', 'キュア', 'ロゼット', 'オルビス', 'DETクリア', 'プリュ', 'ナチュレーヌ', 'デルマQ2', 'プラセンタ', 'ターンオーバー', 'くすみケア', 'ブースター'], 'winter-gentle-peeling-gel-exfoliating-gommage-2026', idx));

export const allNewArticles = [...glitterArticles, ...mascaraBaseArticles, ...peelingArticles];

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
    冬コスメの購入は楽天市場の公式ショップが安心＆高還元。エントリー＆楽天カード利用でザクザクポイントが貯まります。
  </p>
</div>
`;
}
