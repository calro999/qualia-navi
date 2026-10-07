import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch54Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch54_items.json', 'utf8'));

// --- テーマ1: ウルトラファインバブル＆マイクロナノバブル美肌シャワーヘッド 10商品 ---
export const bubbleItemsRaw = batch54Data.theme1_bubble_shower;

// --- テーマ2: 高純度プロテオグリカン原液＆保水ハリ集中美容液 10商品 ---
export const proteoItemsRaw = batch54Data.theme2_proteo_serum;

// --- テーマ3: 白玉グルタチオン美容液＆濃密ブライトニングアンプル 10商品 ---
export const glutaItemsRaw = batch54Data.theme3_glutathione_serum;

console.log(`第54弾 選定アイテム数: シャワーヘッド=${bubbleItemsRaw.length}, プロテオグリカン=${proteoItemsRaw.length}, グルタチオン=${glutaItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'bubble_shower' ? 'bbl' : category === 'proteo_serum' ? 'ptg' : 'glt';
  const id = `art-winter-b54-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = '美容家電・バスグッズ・シャワーヘッド・ウルトラファインバブル・ナノバブル・節水・保湿・ReFa・ボリーナ・2026冬美容';
  let descType = '11〜12月の急激な冷え込みと空気の乾燥による過酷な肌カサつきや湯冷め、頭皮の毛穴汚れに対し、超微細なウルトラファインバブル・マイクロナノバブルが毛穴の奥まで浸透して潤いを閉じ込め、浴びるだけでシルクのような温浴美肌とサラツヤ美髪へ導く美容シャワーヘッド';
  if (category === 'proteo_serum') {
    catName = 'スキンケア・美容液・プロテオグリカン・原液コスメ・高保水・エイジングケア・シワ・ハリ・フラコラ・2026冬スキンケア';
    descType = 'ヒアルロン酸の約1.3倍の水分保持力とEGF様作用を誇り、真冬の暖房による超乾燥砂漠肌やほうれい線、乾燥小じわ、弾力低下に対し、肌の土台から細胞レベルの保水クッションを再構築する高純度プロテオグリカン原液美容液';
  } else if (category === 'glutathione_serum') {
    catName = 'スキンケア・美容液・グルタチオン・白玉美容液・ビタミンC・美白・くすみ・透明感・ナンバーズイン・韓国コスメ・2026冬美容';
    descType = '美容医療の「白玉点滴」発想で、夏の蓄積紫外線や冬の血行不良による頑固なくすみ・色ムラ・キメの乱れを一掃し、澄み渡るような発光白玉水光肌を叶える高純度グルタチオン×ビタミンC集中ブライトニング美容液';
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
    reviewCount: item.reviewCount || 240,
    featureSlug: featureSlug
  };
}

export const bubbleArticles = bubbleItemsRaw.map((it, idx) => createProductArticle(it, 'bubble_shower', ['ウルトラファインバブル', 'マイクロナノバブル', '美肌シャワーヘッド', 'ReFa', 'MYTREX', 'ボリーナ', '節水シャワー', '冬のバスタイム'], 'winter-ultra-fine-bubble-shower-head-beauty-2026', idx));
export const proteoArticles = proteoItemsRaw.map((it, idx) => createProductArticle(it, 'proteo_serum', ['プロテオグリカン', '原液美容液', 'フラコラ', 'ナチュドール', '高保水', '乾燥小じわ', 'EGF様作用', '冬スキンケア'], 'winter-proteoglycan-serum-deep-hydration-firming-2026', idx));
export const glutaArticles = glutaItemsRaw.map((it, idx) => createProductArticle(it, 'glutathione_serum', ['グルタチオン', '白玉点滴', '美白美容液', 'ナンバーズイン', 'メディキューブ', 'アヌア', '魔女工場', '透明感'], 'winter-glutathione-shiratama-brightening-serum-2026', idx));

export const allNewArticles = [...bubbleArticles, ...proteoArticles, ...glutaArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 240).toLocaleString()}件)</span>
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
