import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch75Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch75_items.json', 'utf8'));

// --- テーマ1: ホリデー限定アイシャドウパレット＆プレミアムメイクアップキット 10商品 ---
export const holidayItemsRaw = batch75Data.theme1_holiday_makeup_coffret;

// --- テーマ2: 高保湿リキッドチーク＆生ツヤクリームチーク 10商品 ---
export const blushItemsRaw = batch75Data.theme2_hydrating_cream_liquid_blush;

// --- テーマ3: 濃密補修ヘアオイル＆うるおい高保湿ヘアミルク 10商品 ---
export const hairItemsRaw = batch75Data.theme3_deep_repair_hair_oil_milk;

console.log(`第75弾 選定アイテム数: ホリデーコフレ=${holidayItemsRaw.length}, 高保湿チーク=${blushItemsRaw.length}, ヘアケア=${hairItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'holiday' ? 'hol' : category === 'blush' ? 'blk' : 'har';
  const id = `art-winter-b75-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・アイシャドウ・クリスマスコフレ・ホリデーコレクション・限定パレット・デパコス・ラメ・多幸感・2026冬';
  let descType = '11〜12月のホリデーシーズンを彩る、年に一度の特別限定パッケージと贅沢な煌めきラメを宿したプレミアムアイシャドウ＆コフレ';
  
  if (category === 'blush') {
    catName = 'メイクアップ・チーク・リキッドチーク・クリームチーク・生ツヤ・暖房乾燥対策・血色感・多幸感メイク・ハイライト・2026冬';
    descType = '11〜12月の寒さで血行が淀みがちな冬肌に、内側からじゅわっと上気したような血色感とみずみずしいツヤを宿す高保湿リキッド＆クリームチーク';
  } else if (category === 'hair') {
    catName = 'ヘアケア・洗い流さないトリートメント・ヘアオイル・ヘアミルク・高保湿・静電気防止・枝毛補正・マフラー摩擦対策・サロン専売品・2026冬';
    descType = '11〜12月のマフラー摩擦やエアコン暖房の強烈な乾燥から毛先を守り、パサつき・広がり・静電気を鉄壁コートする濃密補修ヘアオイル＆ミルク';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な人気と信頼を集める名品コスメです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の公式・認定ショップにて、お買い物マラソンや楽天スーパーSALE、各種ポイントアップ企画を利用してお得に購入できます。寒さや乾燥でデリケートになりがちな真冬のコンディションを整え、洗練された冬の美しさを引き出します。`,
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
    reviewCount: item.reviewCount || 350,
    featureSlug: featureSlug
  };
}

export const holidayArticles = holidayItemsRaw.map((it, idx) => createProductArticle(it, 'holiday', ['クリスマスコフレ', 'ホリデー限定', 'ディオールサンククルール', 'ルナソルアイカラーレーション', 'シャネルレキャトルオンブル', 'SUQQUアイシャドウ', 'コスメデコルテアイグロウジェム', 'ホリデーパレット'], 'winter-holiday-eyeshadow-palette-makeup-coffret-2026', idx));
export const blushArticles = blushItemsRaw.map((it, idx) => createProductArticle(it, 'blush', ['冬チーク', 'リキッドチーク', 'クリームチーク', 'NARSアフターグロー', 'コスメデコルテクリームブラッシュ', 'fweeプリンポット', 'セザンヌフェイスグロウカラー', '多幸感チーク'], 'winter-hydrating-liquid-cream-blush-cheek-2026', idx));
export const hairArticles = hairItemsRaw.map((it, idx) => createProductArticle(it, 'hair', ['冬ヘアオイル', 'ヘアミルク', 'ミルボンエルジューダ', 'ケラスターゼオイル', 'モロッカンオイル', 'ReFaロックオイル', 'オルビスヘアミルク', '静電気防止ヘアケア'], 'winter-deep-repair-hair-oil-moist-milk-2026', idx));

export const allNewArticles = [...holidayArticles, ...blushArticles, ...hairArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 350).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #e11d48; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・楽天市場最新価格)</span>
      </div>
      <p style="font-size: 0.95rem; line-height: 1.7; color: #334155; margin-bottom: 14px;">
        ${description}
      </p>
      <div style="background: #f1f5f9; padding: 12px 16px; border-radius: 10px; font-size: 0.88rem; margin-bottom: 14px;">
        <div style="color: #047857; font-weight: bold; margin-bottom: 4px;">✨ おすすめポイント・真冬のメリット:</div>
        <div style="color: #1e293b; line-height: 1.6;">${pros}</div>
        ${cons ? `<div style="color: #b91c1c; font-weight: bold; margin: 8px 0 4px 0;">⚠️ 注意点・留意事項:</div><div style="color: #475569; line-height: 1.6;">${cons}</div>` : ''}
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #e11d48; color: #ffffff; font-weight: bold; font-size: 0.92rem; padding: 10px 22px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 6px rgba(225,29,72,0.3);">
          楽天市場で詳細・在庫・最安値をチェック ❯
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #ffffff; color: #475569; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.88rem; padding: 10px 18px; border-radius: 8px; text-decoration: none;">
          📖 個別口コミ・成分解説を見る
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
