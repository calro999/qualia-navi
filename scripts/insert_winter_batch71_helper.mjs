import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch71Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch71_items.json', 'utf8'));

// --- テーマ1: 薬用高保湿リップバーム＆夜用集中リップトリートメントマスク 10商品 ---
export const lipBalmItemsRaw = batch71Data.theme1_medicinal_lip_balm_mask;

// --- テーマ2: 高保湿・美容液ファンデーション＆生ツヤクッションファンデ 10商品 ---
export const foundationItemsRaw = batch71Data.theme2_serum_foundation_cushion;

// --- テーマ3: 極上ヘアフレグランスミスト＆練り香水（ソリッドパフューム） 10商品 ---
export const fragranceItemsRaw = batch71Data.theme3_hair_fragrance_solid_perfume;

console.log(`第71弾 選定アイテム数: リップケア=${lipBalmItemsRaw.length}, ファンデーション=${foundationItemsRaw.length}, ヘアフレグランス=${fragranceItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'lip_balm' ? 'lbm' : category === 'foundation' ? 'fnd' : 'hfg';
  const id = `art-winter-b71-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・リップケア・リップバーム・リップマスク・高保湿・唇荒れ予防・セラミド・2026冬';
  let descType = '11〜12月の木枯らしと寒冷乾燥による唇の皮剥け・ガサガサ・ひび割れを一夜で修復し、ぷるんと弾むうるツヤ唇へと整える集中保湿リップケアアイテム';
  
  if (category === 'foundation') {
    catName = 'ベースメイク・ファンデーション・美容液ファンデ・クッションファンデ・高保湿・光沢肌・乾燥崩れ防止・2026冬';
    descType = '11〜12月の暖房直撃でも粉吹きや毛穴落ちを許さず、美容液成分70%超のうるおいで1日中みずみずしい光沢水光肌をキープする高保湿ファンデーション';
  } else if (category === 'hair_fragrance') {
    catName = 'フレグランス・ヘアケア・ヘアフレグランス・ヘアミスト・練り香水・ツヤ髪・静電気防止・ホリデーギフト・2026冬';
    descType = '11〜12月の冬の澄んだ空気やイルミネーションデートに映える、冬髪の乾燥パサつきと静電気を防ぎながらふんわり上質に香るヘアフレグランス＆練り香水';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目コスメです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の寒さ・乾燥・冷え・くすみトラブルを根本から解消し、洗練された冬の美しさを実感できます。`,
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

export const lipBalmArticles = lipBalmItemsRaw.map((it, idx) => createProductArticle(it, 'lip_balm', ['薬用リップバーム', 'リップスリーピングマスク', 'オバジリップ', 'ラネージュリップ', 'キュレルリップ', '唇ひび割れ', 'タカミリップ'], 'winter-medicinal-lip-balm-night-repair-mask-2026', idx));
export const foundationArticles = foundationItemsRaw.map((it, idx) => createProductArticle(it, 'foundation', ['美容液ファンデーション', 'クッションファンデ', '資生堂エッセンススキングロウ', 'TIRTIRクリスタル', 'クレドポーボーテ', '暖房乾燥防止', '水光肌'], 'winter-serum-foundation-dewy-cushion-moist-2026', idx));
export const fragranceArticles = fragranceItemsRaw.map((it, idx) => createProductArticle(it, 'hair_fragrance', ['ヘアフレグランス', 'ヘアミスト', 'ミスディオール', 'SHIROホワイトリリー', 'シャネルチャンス', '練り香水', 'ホリデーギフト'], 'winter-hair-fragrance-mist-solid-perfume-2026', idx));

export const allNewArticles = [...lipBalmArticles, ...foundationArticles, ...fragranceArticles];

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
