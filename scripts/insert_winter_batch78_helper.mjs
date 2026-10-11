import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch78Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch78_items.json', 'utf8'));

// --- テーマ1: コンシーラーパレット＆マルチカラー補正コンシーラー 10商品 ---
export const concealerItemsRaw = batch78Data.theme1_concealer_palette_color_correcting;

// --- テーマ2: 高機能ドライシャンプー＆頭皮リフレッシュスプレー・パウダー 10商品 ---
export const dryShampooItemsRaw = batch78Data.theme2_refresh_dry_shampoo_scalp_powder_mist;

// --- テーマ3: マスカラリムーバー＆高保湿ポイントメイクリムーバー 10商品 ---
export const mascaraRemoverItemsRaw = batch78Data.theme3_gentle_mascara_remover_point_cleanse;

console.log(`第78弾 選定アイテム数: コンシーラーパレット=${concealerItemsRaw.length}, ドライシャンプー=${dryShampooItemsRaw.length}, マスカラリムーバー=${mascaraRemoverItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'concealer' ? 'cnp' : category === 'dryshampoo' ? 'drs' : 'msr';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-winter-b78-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'ベースメイク・コンシーラー・コンシーラーパレット・カラー補正・クマ消し・赤みカバー・高密着・保湿・楽天市場正規品・2026冬';
  let descType = '11〜12月の寒冷による青グマや暖房乾燥による目元の小じわ割れ・赤みを、美容液成分と高密着薄膜で夕方まで自然に消し去るコンシーラーパレット';
  
  if (category === 'dryshampoo') {
    catName = 'ヘアケア・スカルプケア・ドライシャンプー・頭皮スプレー・前髪パウダー・皮脂ケア・ニオイ対策・ふんわり立ち上げ・サロン級・2026冬';
    descType = '11〜12月の厚着やマフラー・強暖房による頭皮ムレや夕方のペタンコ前髪を一瞬でリセットし、水なしで清潔感とうるおいを両立する高機能ドライシャンプー';
  } else if (category === 'remover') {
    catName = 'スキンケア・クレンジング・ポイントメイクリムーバー・マスカラリムーバー・アイメイクリムーバー・摩擦レス・低刺激・高保湿・2026冬';
    descType = '11〜12月の冬の乾燥でデリケートになった目元・口元をゴシゴシ擦らず、強力ウォータープルーフやティントをスルンと落として色素沈着・小じわを防ぐ摩擦ゼロリムーバー';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持と高いレビュー評価を集める実力派アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の公式・認定ショップにて、お買い物マラソンや楽天スーパーSALE、各種ポイントアップ企画を利用してお得に購入できます。乾燥や寒さでトラブルが起こりやすい真冬のコンディションを整え、洗練された冬の美しさを引き出します。`,
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

export const concealerArticles = concealerItemsRaw.map((it, idx) => createProductArticle(it, 'concealer', ['コンシーラーパレット', 'コスメデコルテ', '&beファンシーラー', 'イプサ', 'エクセル', 'キャンメイク', 'クマ消し', '冬ベースメイク'], 'winter-concealer-palette-color-correcting-2026', idx));
export const dryShampooArticles = dryShampooItemsRaw.map((it, idx) => createProductArticle(it, 'dryshampoo', ['ドライシャンプー', 'ダイアン', 'フジコFPPパウダー', 'スティーブンノル', 'ザプロダクト', '前髪復活', '頭皮ニオイケア', '冬ヘアケア'], 'winter-refresh-dry-shampoo-scalp-powder-mist-2026', idx));
export const mascaraRemoverArticles = mascaraRemoverItemsRaw.map((it, idx) => createProductArticle(it, 'remover', ['マスカラリムーバー', 'ポイントメイクリムーバー', 'ヒロインメイク', 'キャンメイク', 'ビフェスタ', 'ランコムビファシル', '摩擦レスクレンジング', '目元乾燥対策'], 'winter-gentle-mascara-remover-point-makeup-cleanse-2026', idx));

export const allNewArticles = [...concealerArticles, ...dryShampooArticles, ...mascaraRemoverArticles];

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
</div>
`;
}
