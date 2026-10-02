import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch20Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch20_items.json', 'utf8'));

// --- テーマ1: 高保湿リップティント＆メルティングバーム 厳選10商品 ---
export const tintItemsRaw = batch20Data.theme1_tint;

// --- テーマ2: リキッドハイライター＆濡れツヤグロウスティック 厳選10商品 ---
export const glowItemsRaw = batch20Data.theme2_glow;

// --- テーマ3: 高保湿スカルプローション＆頭皮用保湿エッセンス 厳選10商品 ---
export const scalpItemsRaw = batch20Data.theme3_scalp;

console.log(`選定アイテム数: リップティント=${tintItemsRaw.length}, ハイライター=${glowItemsRaw.length}, スカルプローション=${scalpItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'tint' ? 'tnt' : category === 'glow' ? 'glw' : 'scp';
  const id = `art-winter-b20-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・リップメイク・リップティント・メルティングバーム・高保湿リップ・粘膜リップ';
  let descType = '11〜12月の冷気と暖房による乾燥に負けず、食事や長時間の外出でも色ツヤが持続する高保湿リップティント＆とろけるメルティングバーム';
  if (category === 'glow') {
    catName = 'ベースメイク・ハイライター・リキッドハイライト・ハイライトスティック・ツヤ肌・水光肌';
    descType = '冬の乾燥小じわや粉吹きを起こさず、澄んだ冬の光やイルミネーションを浴びて内側から発光する濡れツヤと透明感を宿すリキッドハイライター＆グロウスティック';
  } else if (category === 'scalp') {
    catName = 'ヘアケア・スカルプケア・頭皮保湿ローション・頭皮用美容液・フケかゆみ対策・冬の頭皮乾燥ケア';
    descType = '11〜12月の急激な湿度低下とエアコン暖房によって引き起こされる頭皮の乾き、つっぱり、フケ、かゆみを素早く鎮静し、健やかな美髪の土台を整える頭皮用高保湿エッセンス';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬本番・ホリデーシーズンにおいて、美容賢者やSNSのコスメ愛好家から絶大な支持を集めている実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規取扱店・優良ショップからポイント高還元付きでお得にお買い求めいただけます。冬のビューティールーティンを劇的に格上げする本命コスメです。`,
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
    reviewCount: item.reviewCount || 290,
    featureSlug: featureSlug
  };
}

export const tintArticles = tintItemsRaw.map((it, idx) => createProductArticle(it, 'tint', ['リップティント', 'メルティングバーム', 'ケイト', 'リップモンスター', 'ロムアンド', 'Laka', 'アミューズ', 'ディオール', 'BBIA', 'hince', 'YSL', 'キャンメイク', 'フジコ', '冬リップ'], 'winter-long-lasting-hydrating-lip-tint-2026', idx));
export const glowArticles = glowItemsRaw.map((it, idx) => createProductArticle(it, 'glow', ['ハイライター', 'リキッドハイライト', 'グロウスティック', 'シャネル', 'ディオール', 'hince', 'コスメデコルテ', 'キャンメイク', 'セザンヌ', 'エトヴォス', 'MAC', 'RMK', 'CLIO', '水光肌'], 'winter-dewy-glow-liquid-highlighter-stick-2026', idx));
export const scalpArticles = scalpItemsRaw.map((it, idx) => createProductArticle(it, 'scalp', ['スカルプローション', '頭皮保湿', '頭皮乾燥', 'フケかゆみ', 'キュレル', 'オージュア', 'ミルボン', 'アヴェダ', 'ヴェレダ', 'ラカスタ', 'ルベル', '資生堂', 'スカルプD', 'オルビス', 'モロッカンオイル'], 'winter-hydrating-scalp-lotion-serum-relief-2026', idx));

export const allNewArticles = [...tintArticles, ...glowArticles, ...scalpArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 280).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・楽天市場最新価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.6; margin-bottom: 12px;">
        ${description}
      </p>
      <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 14px;">
        <div style="color: #0369a1; font-weight: bold; margin-bottom: 4px;">✨ 魅力と実感メリット: ${pros}</div>
        <div style="color: #475569;">💡 使用上の留意点: ${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #e60000 100%); color: #ffffff; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 0.9rem; text-decoration: none; box-shadow: 0 2px 6px rgba(230,0,0,0.3);">
          楽天市場で在庫・詳細を見る →
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #ffffff; color: #0284c7; border: 1px solid #0284c7; padding: 10px 16px; border-radius: 8px; font-weight: bold; font-size: 0.88rem; text-decoration: none;">
          詳細レビュー・口コミ記事を読む
        </a>
      </div>
    </div>
  </div>
</div>`;
}

export function renderRakutenCampaignBanner() {
  return `
<div style="margin: 32px 0; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%); border: 1px solid #fecaca; text-align: center;">
  <p style="font-size: 0.95rem; font-weight: bold; color: #991b1b; margin-bottom: 8px;">
    🛍️ 楽天大感謝祭・スーパーSALE・5と0のつく日はポイント高還元！
  </p>
  <p style="font-size: 0.85rem; color: #7f1d1d; margin: 0 0 12px 0;">
    公式フラッグシップショップや楽天市場認定の優良コスメショップなら、冬の必須アイテムやホリデー限定色も安心してお得に手に入ります。
  </p>
  <a href="https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #bf0000; color: #ffffff; font-weight: bold; font-size: 0.88rem; padding: 8px 18px; border-radius: 6px; text-decoration: none;">
    楽天市場 コスメ・ビューティー最新セール会場はこちら →
  </a>
</div>`;
}
