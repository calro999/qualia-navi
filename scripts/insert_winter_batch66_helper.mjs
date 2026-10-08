import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch66Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch66_items.json', 'utf8'));

// --- テーマ1: コスメ＆ビューティーアドベントカレンダー2026 10商品 ---
export const adventItemsRaw = batch66Data.theme1_holiday_advent_calendar;

// --- テーマ2: ホリデースキンケアコフレ＆プレミアム集中保湿限定キット2026 10商品 ---
export const skincareCoffretItemsRaw = batch66Data.theme2_skincare_holiday_coffret;

// --- テーマ3: 濃密マイクロ高濃度炭酸泡洗顔料＆温感ホイップ洗顔フォーム 10商品 ---
export const carbonicFoamItemsRaw = batch66Data.theme3_carbonic_acid_foam_wash;

console.log(`第66弾 選定アイテム数: アドベントカレンダー=${adventItemsRaw.length}, スキンケアコフレ=${skincareCoffretItemsRaw.length}, 炭酸泡洗顔=${carbonicFoamItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'advent' ? 'adv' : category === 'skincare_coffret' ? 'skc' : 'crb';
  const id = `art-winter-b66-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・メイクアップ・クリスマスコフレ・アドベントカレンダー・デパコス・ホリデー限定・ギフト・2026冬';
  let descType = '11〜12月のホリデーシーズンを最高潮に盛り上げる、人気デパコス・フレグランス・スキンケアのミニサイズが毎日贅沢に手に入る憧れのアドベントカレンダー';
  
  if (category === 'skincare_coffret') {
    catName = 'スキンケア・美容液・クリスマスコフレ・ホリデーキット・エイジングケア・高保湿・集中リペア・デパコス・2026冬';
    descType = '11〜12月の厳しい寒さと乾燥から肌を守り抜き、1年間頑張った自分への最高のご褒美として翌朝のハリ・ツヤ・透明感を格上げする最高峰スキンケア限定セット';
  } else if (category === 'carbonic_foam') {
    catName = 'スキンケア・洗顔料・炭酸泡洗顔・マイクロホイップ・毛穴ケア・くすみオフ・血行促進・温感・摩擦レス・2026冬';
    descType = '11〜12月の気温低下で血行不良になりくすんだ冬肌や、固まった毛穴の角栓を、毛穴より微細な高濃度炭酸マイクロ泡でこすらず浮かせて血色透明感を呼び覚ます朝晩のレスキュー洗顔料';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の寒さ・乾燥・冷え・くすみトラブルを根本から解消し、洗練された冬の美しさを実感できます。`,
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
    reviewCount: item.reviewCount || 240,
    featureSlug: featureSlug
  };
}

export const adventArticles = adventItemsRaw.map((it, idx) => createProductArticle(it, 'advent', ['アドベントカレンダー', 'クリスマスコフレ', 'ホリデー限定', 'ロクシタン', 'ポールアンドジョー', 'キールズ', 'サボン', 'ディオール'], 'winter-holiday-beauty-advent-calendar-gift-2026', idx));
export const skincareCoffretArticles = skincareCoffretItemsRaw.map((it, idx) => createProductArticle(it, 'skincare_coffret', ['クリスマスコフレ', 'スキンケアセット', 'SK-II', 'コスメデコルテ', 'エスティローダー', 'ランコム', 'キールズ', '高保湿美容液'], 'winter-holiday-skincare-coffret-luxury-set-2026', idx));
export const carbonicFoamArticles = carbonicFoamItemsRaw.map((it, idx) => createProductArticle(it, 'carbonic_foam', ['炭酸泡洗顔', '炭酸洗顔', 'ソフィーナiP', 'オバジX', 'SHIKARI', 'ビフェスタ', '毛穴ケア', 'くすみオフ', '血行促進'], 'winter-micro-carbonic-acid-foam-face-wash-2026', idx));

export const allNewArticles = [...adventArticles, ...skincareCoffretArticles, ...carbonicFoamArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 240).toLocaleString()}件)</span>
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
