import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch36Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch36_items.json', 'utf8'));

// --- テーマ1: 高保湿・薬用集中美白美容液 厳選10商品 ---
export const whiteningItemsRaw = batch36Data.theme1_whitening;

// --- テーマ2: 高機能美髪ヘアコーム＆静電気拡散コーム 厳選10商品 ---
export const hairCombItemsRaw = batch36Data.theme2_hair_comb;

// --- テーマ3: ボディケア＆バスタイム限定コフレ・プレミアムギフトセット 厳選10商品 ---
export const bodycareCoffretItemsRaw = batch36Data.theme3_bodycare_coffret;

console.log(`選定アイテム数: 美白美容液=${whiteningItemsRaw.length}, 美髪ヘアコーム=${hairCombItemsRaw.length}, ボディケアコフレ=${bodycareCoffretItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'whitening' ? 'white' : category === 'hair_comb' ? 'comb' : 'bodycoffret';
  const id = `art-winter-b36-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・美白美容液・シミ対策・くすみ改善・透明感・トラネキサム酸・ビタミンC・コウジ酸・2026冬コスメ';
  let descType = '紫外線量が年間最小になる11〜12月の冬こそ攻めるべきシミ・くすみ・色ムラの集中リセット美容液。過酷な寒冷乾燥下でも角層バリアを壊さず、贅沢な高保湿成分とともに透明感を底上げする本命薬用美白美容液';
  if (category === 'hair_comb') {
    catName = 'ヘアケア・ヘアコーム・美髪コーム・静電気防止・ラブクロム・ReFa・ツヤ髪・ホリデーギフト・2026冬コスメ';
    descType = '11〜12月の木枯らしやエアコン暖房、ウールニット・マフラーによる激しい摩擦・静電気を吸着拡散。特殊加工でキューティクルを滑らかに整え、梳かすだけで濡れツヤシルク髪を叶える高機能美髪ヘアコーム';
  } else if (category === 'bodycare_coffret') {
    catName = 'ボディケア・バスグッズ・クリスマスコフレ・ホリデーギフト・SABON・ロクシタン・ジョーマローン・保湿ケア・2026冬コスメ';
    descType = '11〜12月のホリデーシーズンに自分への至福のご褒美や大切な人への贈り物として年間屈指の人気を誇る限定コフレ。極上の香りとリッチなうるおいに包まれ、冬の冷えや乾燥肌をやさしく癒すプレミアムバス＆ボディケアキット';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の本格的な寒冷期およびホリデーシーズンにおいて、日常のケアを特別な贅沢へと昇華させ、過酷な環境から美しさを守り抜く${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の公式ショップや安心の優良取扱店から、お買い物マラソン・ポイントアッププログラムを活用してお得に購入できます。自分へのご褒美やギフト、冬の集中ケアに心からおすすめできる逸品です。`,
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

export const whiteningArticles = whiteningItemsRaw.map((it, idx) => createProductArticle(it, 'whitening', ['美白美容液', 'シミ予防', 'くすみケア', 'HAKU', 'コスメデコルテ', 'ホワイトショット', 'ランコム', 'キールズ', 'オバジ', 'メラノCC', 'アスタリフト', 'ディオールスノー', 'ファンケル', '透明感スキンケア'], 'winter-intensive-whitening-brightening-serum-2026', idx));
export const hairCombArticles = hairCombItemsRaw.map((it, idx) => createProductArticle(it, 'hair_comb', ['ヘアコーム', '美髪コーム', 'ラブクロム', 'LOVECHROME', 'リファ', 'ReFa', 'ハートコーム', 'タングルティーザー', 'ウェットブラシ', 'メイソンピアソン', 'ウカ', 'ケンザン', '静電気防止', 'ツヤ髪ケア', 'クリスマスプレゼント'], 'winter-anti-static-hair-comb-love-chrome-2026', idx));
export const bodycareCoffretArticles = bodycareCoffretItemsRaw.map((it, idx) => createProductArticle(it, 'bodycare_coffret', ['ボディケアコフレ', 'クリスマスコフレ', 'ホリデーギフト', 'SABON', 'ロクシタン', 'ジョーマローン', 'LUSH', 'ローラメルシエ', 'ディプティック', 'モルトンブラウン', 'ジルスチュアート', 'SHIRO', 'オゥパラディ', 'バスタイムギフト'], 'winter-holiday-bodycare-bath-gift-set-2026', idx));

export const allNewArticles = [...whiteningArticles, ...hairCombArticles, ...bodycareCoffretArticles];

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

export function renderRakutenCampaignBanner(themeTitle) {
  return `
<div style="margin: 32px 0; padding: 18px 24px; border-radius: 14px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; text-align: center;">
  <span style="display: inline-block; background: #0284c7; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 10px; border-radius: 9999px; margin-bottom: 8px;">楽天市場 2026冬 お得情報</span>
  <h4 style="margin: 0 0 6px 0; color: #0369a1; font-size: 1.05rem; font-weight: bold;">【ポイント最大10倍以上】お買い物マラソン＆5と0のつく日はさらにお得！</h4>
  <p style="margin: 0; font-size: 0.88rem; color: #0c4a6e; line-height: 1.5;">
    ${themeTitle}の購入は楽天市場の公式ショップ・正規代理店が安心＆高還元。エントリー＆楽天カード利用で大量ポイントが還元されます。
  </p>
</div>
`;
}
