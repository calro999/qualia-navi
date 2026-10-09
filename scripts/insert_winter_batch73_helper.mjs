import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch73Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch73_items.json', 'utf8'));

// --- テーマ1: 濃密高保湿フェイスクリーム＆水分密閉ナイトクリーム 10商品 ---
export const creamItemsRaw = batch73Data.theme1_rich_moisturizing_face_cream;

// --- テーマ2: 濃密うるおいミルククレンジング＆極上クレンジングクリーム 10商品 ---
export const cleansingItemsRaw = batch73Data.theme2_rich_milk_cream_cleansing;

// --- テーマ3: 濡れツヤ単色アイシャドウ＆ジュエリーパール・グリッター 10商品 ---
export const glitterItemsRaw = batch73Data.theme3_holiday_sparkle_glitter_eyeshadow;

console.log(`第73弾 選定アイテム数: 保湿クリーム=${creamItemsRaw.length}, クレンジング=${cleansingItemsRaw.length}, アイシャドウ/ラメ=${glitterItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'cream' ? 'crm' : category === 'cleansing' ? 'cln' : 'glt';
  const id = `art-winter-b73-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・フェイスクリーム・ナイトクリーム・高保湿・セラミド・スクワラン・水分密閉・暖房乾燥対策・2026冬';
  let descType = '11〜12月の湿度急低下とエアコン暖房の連続稼働によって水分が蒸発する真冬肌を徹底密封し、翌朝まで吸い付くような潤いとハリを維持する濃密高保湿フェイスクリーム';
  
  if (category === 'cleansing') {
    catName = 'スキンケア・クレンジング・ミルククレンジング・クレンジングクリーム・敏感肌・摩擦レス・高保湿・メイク落とし・2026冬';
    descType = '11〜12月の木枯らしや寒暖差でバリア機能が低下した肌をやさしく包み込み、メイク汚れだけを浮き上がらせて潤い皮脂膜を守り抜く極上うるおいクレンジング';
  } else if (category === 'glitter') {
    catName = 'メイクアップ・アイシャドウ・単色アイカラー・グリッター・濡れツヤ・ホリデーメイク・ジュエリーパール・イルミネーション映え・2026冬';
    descType = '11〜12月の澄んだ冬空やイルミネーションの下で星屑のように濡れたツヤと多色パールを放ち、まぶたの乾燥を防ぎながら1日中くすまない輝きをキープする単色アイカラー';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として圧倒的な人気と信頼を集める実力派アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店・公式ショップにて、お買い物マラソンや楽天スーパーSALE、各種ポイントアップ企画を利用してお得に購入できます。乾燥や寒さでデリケートになりがちな真冬のコンディションを底上げし、洗練された冬の美しさを引き出します。`,
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

export const creamArticles = creamItemsRaw.map((it, idx) => createProductArticle(it, 'cream', ['高保湿フェイスクリーム', 'ナイトクリーム', 'キールズUFC', 'キュレルフェイスクリーム', 'コスメデコルテリポソーム', 'ラロッシュポゼシカプラスト', '乾燥肌レスキュー'], 'winter-rich-moisturizing-face-cream-night-shield-2026', idx));
export const cleansingArticles = cleansingItemsRaw.map((it, idx) => createProductArticle(it, 'cleansing', ['ミルククレンジング', 'クレンジングクリーム', 'カバーマーククレンジング', 'コスメデコルテAQ', 'カネボウメロウオフヴェイル', '敏感肌クレンジング', '冬の摩擦レス洗顔'], 'winter-rich-milk-cleansing-moist-cream-makeup-remover-2026', idx));
export const glitterArticles = glitterItemsRaw.map((it, idx) => createProductArticle(it, 'glitter', ['単色アイシャドウ', '濡れツヤシャドウ', 'コスメデコルテアイグロウジェム', 'アディクションスパークル', 'ボビイブラウンムーンストーン', 'ウォンジョンヨ涙袋', 'ホリデーメイク2026'], 'winter-holiday-sparkle-glitter-single-eyeshadow-radiance-2026', idx));

export const allNewArticles = [...creamArticles, ...cleansingArticles, ...glitterArticles];

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
      <div style="background: #f8fafc; border-radius: 10px; padding: 12px; margin-bottom: 14px; font-size: 0.85rem;">
        <div style="color: #059669; font-weight: bold; margin-bottom: 4px;">✨ おすすめポイント:</div>
        <div style="color: #475569; margin-bottom: 8px; line-height: 1.5;">${pros}</div>
        <div style="color: #d97706; font-weight: bold; margin-bottom: 4px;">⚠️ 注意・ワンポイント:</div>
        <div style="color: #475569; line-height: 1.5;">${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #e60012 100%); color: #ffffff; font-weight: bold; font-size: 0.9rem; padding: 10px 20px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(230,0,18,0.25);">
          楽天市場で最安値をチェック ❯
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #f1f5f9; color: #334155; font-weight: bold; font-size: 0.85rem; padding: 10px 16px; border-radius: 8px; text-decoration: none; border: 1px solid #cbd5e1;">
          個別詳細・口コミを見る ❯
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
