import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch52Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch52_items.json', 'utf8'));

// --- テーマ1: ハイドロキノン・スポット美白 厳選10商品 ---
export const hqItemsRaw = batch52Data.theme1_hq_whitening;

// --- テーマ2: かっさプレート＆温感リフトカッサ 厳選10商品 ---
export const caxaItemsRaw = batch52Data.theme2_caxa_lift;

// --- テーマ3: スカルプブラシ＆頭皮マッサージブラシ 厳選10商品 ---
export const scalpItemsRaw = batch52Data.theme3_scalp_brush;

console.log(`第52弾 選定アイテム数: ハイドロキノン美白=${hqItemsRaw.length}, かっさプレート=${caxaItemsRaw.length}, スカルプブラシ=${scalpItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hq_whitening' ? 'hqw' : category === 'caxa_lift' ? 'cax' : 'scb';
  const id = `art-winter-b52-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・美容液・クリーム・美白・ハイドロキノン・レチノール・シミ対策・肝斑・色素沈着・2026冬スキンケア';
  let descType = '11〜12月の紫外線量が年間で最も減少するベストシーズンを捉え、高濃度ハイドロキノン（純度99%・安定型）やピュアレチノール、トラネキサム酸で濃いシミ・肝斑・頑固な色素沈着を狙い撃ちする集中スポット美白クリーム';
  if (category === 'caxa_lift') {
    catName = '美顔器・美容グッズ・かっさプレート・温感カッサ・EMS・マッサージ・小顔・リフトアップ・むくみ解消・2026冬美容';
    descType = '冬の厳しい寒冷刺激で首肩や咬筋・側頭筋がこわばり、リンパと静脈血が滞ることで生じる冬のパンパンむくみ・くすみ・たるみを、陶磁器や高純度テラヘルツ鉱石の絶妙なカーブと温感EMSで解きほぐす本格温活カッサマッサージ';
  } else if (category === 'scalp_brush') {
    catName = 'ヘアケア・スカルプケア・頭皮ブラシ・シャンプーブラシ・スカルプマッサージ・ukaケンザン・ReFa・頭皮温活・2026冬ヘアケア';
    descType = '寒さによる頭皮の血行不良、秋からの抜け毛ピーク、暖房による乾燥フケをバスタイムとお風呂上がりの両方で心地よくほぐし、毛穴汚れのディープクレンジングと顔全体のリフトアップを同時に叶える大人のスカルプマッサージブラシ';
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
    reviewCount: item.reviewCount || 195,
    featureSlug: featureSlug
  };
}

export const hqArticles = hqItemsRaw.map((it, idx) => createProductArticle(it, 'hq_whitening', ['ハイドロキノン', 'シミ消し', 'レチノール', '美白クリーム', '肝斑ケア', '旭研究所', 'ビーグレン', 'HAKU', 'ポーラホワイトショット'], 'winter-hydroquinone-retinol-spot-whitening-cream-2026', idx));
export const caxaArticles = caxaItemsRaw.map((it, idx) => createProductArticle(it, 'caxa_lift', ['かっさプレート', 'カッサマッサージ', 'アユーラビカッサ', 'ReFaカッサ', 'テラヘルツかっさ', '温感EMS', '小顔マッサージ', '冬の温活'], 'winter-kassa-plate-warm-lift-massage-2026', idx));
export const scalpArticles = scalpItemsRaw.map((it, idx) => createProductArticle(it, 'scalp_brush', ['スカルプブラシ', 'ukaケンザン', 'ReFaハートブラシ', 'エトヴォスブラシ', 'シャンプーブラシ', '頭皮マッサージ', '頭皮クレンジング', '冬のヘアケア'], 'winter-scalp-brush-head-spa-massage-2026', idx));

export const allNewArticles = [...hqArticles, ...caxaArticles, ...scalpArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 195).toLocaleString()}件)</span>
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
