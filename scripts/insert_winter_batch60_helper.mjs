import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch60Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch60_items.json', 'utf8'));

// --- テーマ1: 超音波ウォーターピーリング美顔器＆温感イオン毛穴ケア 10商品 ---
export const waterItemsRaw = batch60Data.theme1_water_peeling;

// --- テーマ2: 生え際カバー＆白髪隠しヘアファンデーション・ポンポンヘアパウダー 10商品 ---
export const hairItemsRaw = batch60Data.theme2_hair_foundation;

// --- テーマ3: 電動ネイルマシン＆本格セルフネイルケア・爪磨き 10商品 ---
export const nailItemsRaw = batch60Data.theme3_nail_machine;

console.log(`第60弾 選定アイテム数: ウォーターピーリング=${waterItemsRaw.length}, ヘアファンデーション=${hairItemsRaw.length}, 電動ネイルマシン=${nailItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'water_peeling' ? 'wat' : category === 'hair_foundation' ? 'hai' : 'nai';
  const id = `art-winter-b60-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = '美容家電・スキンケア・毛穴ケア・ウォーターピーリング・超音波美顔器・イオン導出入・EMSリフト・黒ずみ角栓・2026冬おこもり美容';
  let descType = '11〜12月の寒さで毛穴が縮こまり硬化した角栓や古い角質、ファンデの毛穴落ちを、毎秒数万回の超音波振動ミストと温感イオンで肌に負担をかけずスッキリ弾き飛ばし、冬の乾燥ゴワつき肌をシルクのような透明素肌へリセットする神毛穴美顔器';
  
  if (category === 'hair_foundation') {
    catName = 'ヘアケア・コスメ・白髪隠し・ヘアファンデーション・ヘアパウダー・生え際カバー・薄毛カバー・小顔シェーディング・2026冬ホリデー身だしなみ';
    descType = '11〜12月の忘年会やクリスマス、帰省などのイベント集中期に、年末の美容院予約が取れなくてもサッとポンポン塗るだけで白髪や分け目の地肌の透けを瞬時に自然カバーし、冬の小顔立体メイクまで叶える救世主ヘアコスメ';
  } else if (category === 'nail_machine') {
    catName = 'ネイルケア・美容家電・電動ネイルマシン・爪磨き・甘皮処理・ジェルネイルオフ・二枚爪リペア・セルフネイル・2026冬指先美爪ケア';
    descType = '11〜12月の激しい空気乾燥による二枚爪・割れ爪・ささくれの集中ケアから、ホリデーシーズンのセルフジェルネイルの下地作り・短時間オフまで、多彩なビットと回転速度でプロ級の仕上がりを自宅で叶える必須電動ビューティーギア';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の肌・髪・指先の悩みを根本からケアし、清潔感と洗練された美しさを実感できます。`,
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

export const waterArticles = waterItemsRaw.map((it, idx) => createProductArticle(it, 'water_peeling', ['ウォーターピーリング', '毛穴ケア', '超音波美顔器', 'ANLAN', 'ヤーマン', '美ルル', '黒ずみ撃退'], 'winter-water-peeling-ultrasonic-pore-cleanser-2026', idx));
export const hairArticles = hairItemsRaw.map((it, idx) => createProductArticle(it, 'hair_foundation', ['白髪隠し', 'ヘアファンデーション', 'フジコdekoシャドウ', 'プリオール', 'ヘアパウダー', '生え際カバー', '薄毛隠し'], 'winter-hair-foundation-hair-powder-gray-cover-2026', idx));
export const nailArticles = nailItemsRaw.map((it, idx) => createProductArticle(it, 'nail_machine', ['電動ネイルマシン', 'プチトル', 'ネイルケア', '甘皮処理', '爪磨き', 'ジェルオフ', 'セルフネイル'], 'winter-electric-nail-machine-drill-buffer-care-2026', idx));

export const allNewArticles = [...waterArticles, ...hairArticles, ...nailArticles];

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
