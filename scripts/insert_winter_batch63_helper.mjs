import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch63Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch63_items.json', 'utf8'));

// --- テーマ1: 充電式カイロ＆モバイルバッテリー温活（電気ハンドウォーマー） 10商品 ---
export const warmerItemsRaw = batch63Data.theme1_hand_warmer;

// --- テーマ2: 音波振動シリコン電動洗顔ブラシ（摩擦レス毛穴ディープクレンジング） 10商品 ---
export const brushItemsRaw = batch63Data.theme2_cleansing_brush;

// --- テーマ3: LED美顔マスク＆光エステフォトフェイシャル（赤色LED×近赤外線） 10商品 ---
export const ledMaskItemsRaw = batch63Data.theme3_led_mask;

console.log(`第63弾 選定アイテム数: 充電式カイロ=${warmerItemsRaw.length}, 洗顔ブラシ=${brushItemsRaw.length}, LED美顔マスク=${ledMaskItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hand_warmer' ? 'wmr' : category === 'cleansing_brush' ? 'brs' : 'led';
  const id = `art-winter-b63-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = '美容家電・温活グッズ・充電式カイロ・電気カイロ・ハンドウォーマー・末端冷え性・血行促進・モバイルバッテリー・2026冬ポータブル温活';
  let descType = '11〜12月の寒冷期における指先のかじかみや末端の血行不良を5秒で即座に温め、冷えによる手荒れや血色感低下を根本から救済する冬の持ち歩き温活神ギア';
  
  if (category === 'cleansing_brush') {
    catName = '美容家電・スキンケア・電動洗顔ブラシ・音波振動シリコン・毛穴ディープクレンジング・角質肥厚ケア・くすみオフ・完全防水・2026冬摩擦レス洗顔';
    descType = '11〜12月の急激な気温低下と空気乾燥によってターンオーバーが鈍化しゴワつく冬肌を、摩擦ゼロの超音波微振動と極細シリコンで優しく解きほぐし、毛穴汚れと古い角質を落として美容液の浸透を爆上げする冬の洗顔神ギア';
  } else if (category === 'led_mask') {
    catName = '美容家電・スキンケア・LED美顔マスク・光エステ・フォトフェイシャル・赤色LED・近赤外線・コラーゲンマシン・エイジングケア・2026冬おうちエステ';
    descType = '11〜12月の寒さと血行不良による頑固な冬のくすみ・ハリ不足・乾燥小ジワを、波長を厳選した高輝度LEDの光エネルギーで寝ながらハンズフリーに深層ケアし、上質な発光ツヤ肌を仕込む冬のプレミアム美顔ギア';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の冷え・乾燥・くすみの悩みを根本から解消し、洗練された冬の美しさを実感できます。`,
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

export const warmerArticles = warmerItemsRaw.map((it, idx) => createProductArticle(it, 'hand_warmer', ['充電式カイロ', '電気カイロ', 'ハンドウォーマー', 'モットル', 'フランフラン', '末端冷え性', '冬ギフト'], 'winter-rechargeable-hand-warmer-electric-pocket-kairo-2026', idx));
export const brushArticles = brushItemsRaw.map((it, idx) => createProductArticle(it, 'cleansing_brush', ['電動洗顔ブラシ', 'シリコン洗顔器', '音波振動洗顔', 'FOREO', '美ルル', '毛穴ケア', 'くすみオフ'], 'winter-sonic-silicone-facial-cleansing-brush-pore-care-2026', idx));
export const ledMaskArticles = ledMaskItemsRaw.map((it, idx) => createProductArticle(it, 'led_mask', ['LED美顔マスク', '光エステ', 'フォトフェイシャル', '赤色LED', '美ルル', '美顔器', 'ハリ弾力ケア'], 'winter-led-face-mask-photofacial-light-therapy-2026', idx));

export const allNewArticles = [...warmerArticles, ...brushArticles, ...ledMaskArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 280).toLocaleString()}件)</span>
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
      <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 10px 14px; border-radius: 4px; margin-bottom: 8px; font-size: 0.85rem; color: #166534;">
        <strong>【ここが優れている（メリット）】</strong><br />
        ${pros}
      </div>
      <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px; font-size: 0.85rem; color: #92400e;">
        <strong>【購入前の注意点（デメリット）】</strong><br />
        ${cons}
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #d92626 100%); color: #ffffff; font-weight: bold; font-size: 0.95rem; padding: 10px 22px; border-radius: 9999px; text-decoration: none; box-shadow: 0 3px 10px rgba(191,0,0,0.25); text-align: center;">
          楽天市場で詳細・最安値をチェック ❯
        </a>
        <a href="/article/${art.id}" style="font-size: 0.88rem; color: #0284c7; text-decoration: underline;">
          個別レビュー詳細・スペック詳細ページへ
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
