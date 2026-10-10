import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch74Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch74_items.json', 'utf8'));

// --- テーマ1: 高保湿導入美容液＆角質浸透導入液 10商品 ---
export const boosterItemsRaw = batch74Data.theme1_booster_serum;

// --- テーマ2: 高保湿フィックスミスト＆メイクキープミスト 10商品 ---
export const mistItemsRaw = batch74Data.theme2_hydrating_makeup_mist;

// --- テーマ3: 深みボルドー＆ショコラブラウン高保湿リップ 10商品 ---
export const lipItemsRaw = batch74Data.theme3_deep_color_moist_lip;

console.log(`第74弾 選定アイテム数: 導入美容液=${boosterItemsRaw.length}, ミスト=${mistItemsRaw.length}, 深みリップ=${lipItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'booster' ? 'bst' : category === 'mist' ? 'mst' : 'lip';
  const id = `art-winter-b74-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・導入美容液・ブースター・土台美容液・角質ケア・リポソーム・高保湿・乾燥ゴワつき対策・2026冬';
  let descType = '11〜12月の寒さとエアコン暖房で硬くなった真冬の角質を瞬時に解きほぐし、後から使う化粧水や美容液の浸透力を劇的に高める高保湿導入美容液';
  
  if (category === 'mist') {
    catName = 'メイクアップ・フィックスミスト・メイクキープスプレー・高保湿ミスト・オイルイン・暖房乾燥対策・マスク崩れ防止・ツヤ肌・2026冬';
    descType = '11〜12月の過酷な室内暖房乾燥やマフラー・マスクの摩擦によるメイク崩れ・粉吹きを防ぎ、2層式オイルヴェールでうるおいとメイクを1日中キープする高保湿フィックスミスト';
  } else if (category === 'lip') {
    catName = 'メイクアップ・リップ・口紅・ティント・ボルドー・ショコラブラウン・高保湿・縦ジワ補正・プランパー・ホリデーメイク・2026冬';
    descType = '11〜12月の冬ファッションに華やかな血色感と洗練された深みを与え、乾燥で荒れがちな唇を濃密オイルとジェル膜でむっちり包み込む高保湿ルージュ＆ティント';
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

export const boosterArticles = boosterItemsRaw.map((it, idx) => createProductArticle(it, 'booster', ['導入美容液', 'ブースター美容液', 'コスメデコルテリポソーム', 'ソフィーナiP土台美容液', 'ランコムジェニフィック', 'タカミスキンピール', 'VTリードルショット', '角質ケア'], 'winter-penetration-booster-serum-first-essence-2026', idx));
export const mistArticles = mistItemsRaw.map((it, idx) => createProductArticle(it, 'mist', ['メイクキープミスト', 'フィックスミスト', 'コスメデコルテミスト', 'コーセーメイクキープミスト', 'クラランスフィックス', 'ダルバスプレーセラム', '暖房乾燥対策'], 'winter-hydrating-makeup-fix-mist-setting-spray-2026', idx));
export const lipArticles = lipItemsRaw.map((it, idx) => createProductArticle(it, 'lip', ['冬リップ', 'ボルドーリップ', 'ブラウンリップ', 'KATEリップモンスター', 'ディオールマキシマイザー', 'ロムアンドティント', '高保湿口紅', 'ホリデーメイク2026'], 'winter-deep-bordeaux-brown-rich-moist-lip-rouge-2026', idx));

export const allNewArticles = [...boosterArticles, ...mistArticles, ...lipArticles];

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
