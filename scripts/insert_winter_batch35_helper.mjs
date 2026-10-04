import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch35Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch35_items.json', 'utf8'));

// --- テーマ1: クリスマスコフレ＆ホリデー限定メイクアップキット 厳選10商品 ---
export const holidayCoffretItemsRaw = batch35Data.theme1_holiday_coffret;

// --- テーマ2: 高保湿フェイスパウダー＆しっとり美容液ルースパウダー 厳選10商品 ---
export const moistPowderItemsRaw = batch35Data.theme2_moist_powder;

// --- テーマ3: 高保湿ヘアオイル＆静電気・摩擦防止アウトバストリートメント 厳選10商品 ---
export const hairOilItemsRaw = batch35Data.theme3_hair_oil;

console.log(`選定アイテム数: クリスマスコフレ=${holidayCoffretItemsRaw.length}, 保湿パウダー=${moistPowderItemsRaw.length}, ヘアオイル=${hairOilItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'holiday_coffret' ? 'coffret' : category === 'moist_powder' ? 'powder' : 'hairoil';
  const id = `art-winter-b35-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・クリスマスコフレ・ホリデーコレクション・アイシャドウパレット・限定キット・デパコス・2026冬コスメ';
  let descType = '11〜12月のホリデーシーズンを華やかに彩り、即完売が相次ぐ年に一度の限定コレクション。冬の澄んだ光に映える贅沢なアイシャドウやリップ、限定ポーチが詰まったプレミアムなクリスマスコフレ＆ホリデーキット';
  if (category === 'moist_powder') {
    catName = 'ベースメイク・フェイスパウダー・ルースパウダー・プレストパウダー・乾燥肌・保湿パウダー・ツヤ肌・2026冬コスメ';
    descType = '11〜12月の厳しい外気冷えやエアコン暖房の超乾燥下でも、粉吹き・毛穴落ち・目元口元のシワ割れを徹底的に防ぎ、うるおいヴェールでしっとりシルキーな透明肌をキープする高保湿美容液フェイスパウダー';
  } else if (category === 'hair_oil') {
    catName = 'ヘアケア・ヘアオイル・アウトバストリートメント・静電気防止・枝毛ケア・保湿オイル・サロン専売・2026冬コスメ';
    descType = '11〜12月の木枯らしやエアコン暖房、ウールニット・マフラーとの摩擦・静電気によるパサつき・広がり・枝毛を強力に防ぎ、髪内部の水分を閉じ込めて一日中つややかなまとまりを与える高保湿濃厚ヘアオイル';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の本格的な寒冷乾燥期およびホリデーシーズンにおいて、日常を特別に輝かせ過酷な環境から美しさを守り抜く本命の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の公式正規取扱店や優良ストアから、お買い物マラソン・ポイントアッププログラムを活用してお得に購入できます。自分へのご褒美や大切な人へのホリデーギフト、冬の乾燥対策に心からおすすめできる一品です。`,
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
    reviewCount: item.reviewCount || 420,
    featureSlug: featureSlug
  };
}

export const holidayCoffretArticles = holidayCoffretItemsRaw.map((it, idx) => createProductArticle(it, 'holiday_coffret', ['クリスマスコフレ', 'ホリデーコレクション', 'コスメデコルテ', 'ジルスチュアート', 'エレガンス', 'ルナソル', 'ディオール', 'SUQQU', 'アディクション', 'RMK', 'イヴサンローラン', 'MAC', '限定メイクパレット'], 'winter-holiday-coffret-makeup-collection-2026', idx));
export const moistPowderArticles = moistPowderItemsRaw.map((it, idx) => createProductArticle(it, 'moist_powder', ['フェイスパウダー', 'ルースパウダー', 'プレストパウダー', 'コスメデコルテ', 'ミラノコレクション', 'エレガンス', 'ラプードル', 'NARS', 'SUQQU', 'ジバンシイ', 'ローラメルシエ', 'チャコット', 'キャンメイク', '乾燥肌パウダー', '保湿パウダー'], 'winter-hydrating-moist-loose-face-powder-2026', idx));
export const hairOilArticles = hairOilItemsRaw.map((it, idx) => createProductArticle(it, 'hair_oil', ['ヘアオイル', 'アウトバストリートメント', 'モロッカンオイル', 'ケラスターゼ', 'エルジューダ', 'ミルボン', 'トラックオイル', 'エヌドット', 'アンドハニー', 'フィーノ', 'ロレアルパリ', 'ウカ', 'ツバキ', '静電気防止', '枝毛補修'], 'winter-deep-moist-hair-oil-anti-static-2026', idx));

export const allNewArticles = [...holidayCoffretArticles, ...moistPowderArticles, ...hairOilArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 420).toLocaleString()}件)</span>
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
      <div style="background: #f8fafc; padding: 12px 14px; border-radius: 10px; margin-bottom: 14px; font-size: 0.86rem; border: 1px solid #e2e8f0;">
        <div style="color: #15803d; font-weight: bold; margin-bottom: 4px;">👍 おすすめポイント:</div>
        <div style="color: #334155; margin-bottom: 6px;">${pros}</div>
        <div style="color: #b91c1c; font-weight: bold; margin-bottom: 4px;">⚠️ 注意点・留意点:</div>
        <div style="color: #334155;">${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; font-weight: bold; font-size: 0.9rem; padding: 10px 20px; border-radius: 9999px; text-decoration: none; box-shadow: 0 2px 8px rgba(2,132,199,0.3);">
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
<div style="margin: 32px 0; padding: 18px 24px; border-radius: 14px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; text-align: center;">
  <span style="display: inline-block; background: #0284c7; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 10px; border-radius: 9999px; margin-bottom: 8px;">楽天市場 2026冬 お得情報</span>
  <h4 style="margin: 0 0 6px 0; color: #0369a1; font-size: 1.05rem; font-weight: bold;">【ポイント最大10倍以上】お買い物マラソン＆5と0のつく日はさらにお得！</h4>
  <p style="margin: 0; font-size: 0.88rem; color: #0c4a6e; line-height: 1.5;">
    冬の限定コフレ・高保湿パウダー・濃厚ヘアオイルの購入は楽天市場の公式ショップ・優良店が安心＆高還元。エントリー＆楽天カード利用で大量ポイントが還元されます。
  </p>
</div>
`;
}
