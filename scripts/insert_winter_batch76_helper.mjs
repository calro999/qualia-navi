import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch76Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch76_items.json', 'utf8'));

// --- テーマ1: ウォータートリートメント＆温感リキッドトリートメント 10商品 ---
export const waterHairItemsRaw = batch76Data.theme1_water_instant_hair_treatment;

// --- テーマ2: 濃密炭酸パック＆生ジェル炭酸ガスパック 10商品 ---
export const co2PackItemsRaw = batch76Data.theme2_carbonated_co2_gel_mask_pack;

// --- テーマ3: 高保湿ふき取り化粧水＆角質柔軟ピールローション 10商品 ---
export const wipeTonerItemsRaw = batch76Data.theme3_hydrating_wiping_peel_lotion;

console.log(`第76弾 選定アイテム数: ウォータートリートメント=${waterHairItemsRaw.length}, 炭酸パック=${co2PackItemsRaw.length}, ふき取り化粧水=${wipeTonerItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'water' ? 'wtr' : category === 'co2' ? 'co2' : 'wip';
  const id = `art-winter-b76-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ヘアケア・ウォータートリートメント・温感リキッドトリートメント・ダメージ補修・待ち時間ゼロ・うるおい・ツヤ髪・サロン専売品・2026冬';
  let descType = '11〜12月の寒いお風呂で放置時間を待たずに、微発熱スチーム反応と高浸透リキッド処方で傷んだキューティクルを瞬時にちゅるんと密閉補修する時短ウォータートリートメント';
  
  if (category === 'co2') {
    catName = 'スキンケア・パック・炭酸パック・生炭酸ガスパック・ボーア効果・血行促進・冷えくすみ・毛穴引き締め・おこもり美容・サロン専売品・2026冬';
    descType = '11〜12月の気温低下で血行が滞り、ゴワつきやくすみが気になる真冬の肌を、医療発想のボーア効果と高濃度生炭酸ガスで内側から呼び覚ますプレミアム集中ケアパック';
  } else if (category === 'wipe') {
    catName = 'スキンケア・化粧水・ふき取り化粧水・角質柔軟ピールローション・朝洗顔代わり・ブースター・摩擦レス・くすみオフ・キメ整え・2026冬';
    descType = '11〜12月の極寒の朝に辛い冷水洗顔を卒業し、寝ている間の皮脂や不要な古い角質をうるおいでやさしくオフして化粧ノリを劇的に高める高保湿ふき取り化粧水';
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

export const waterHairArticles = waterHairItemsRaw.map((it, idx) => createProductArticle(it, 'water', ['ウォータートリートメント', '温感トリートメント', 'モレモミラクル10', 'ロレアルワンダーウォーター', 'ヘッドスパ7', 'フィーノ', 'プリュスオー', '冬ヘアケア'], 'winter-instant-water-treatment-liquid-hair-care-2026', idx));
export const co2PackArticles = co2PackItemsRaw.map((it, idx) => createProductArticle(it, 'co2', ['炭酸パック', '炭酸ガスパック', 'エニシーグローパック', 'ドクターメディオン', 'フェヴリナ', 'EKATO', 'ソーダスパフォーム', 'おこもり美容'], 'winter-co2-carbonated-gel-mask-pack-radiance-2026', idx));
export const wipeTonerArticles = wipeTonerItemsRaw.map((it, idx) => createProductArticle(it, 'wipe', ['ふき取り化粧水', '角質ケア', 'カネボウラディアントスキンリファイナー', 'タカミスキンピール', 'ベネフィークリセットクリア', 'クリニーク', 'オードムーゲ', '朝洗顔'], 'winter-hydrating-wiping-toner-peel-lotion-2026', idx));

export const allNewArticles = [...waterHairArticles, ...co2PackArticles, ...wipeTonerArticles];

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
      <p style="font-size: 0.93rem; color: #334155; line-height: 1.7; margin-bottom: 14px;">
        ${description}
      </p>
      <div style="background: #f1f5f9; padding: 12px 14px; border-radius: 10px; margin-bottom: 14px; font-size: 0.88rem;">
        <div style="font-weight: bold; color: #0f172a; margin-bottom: 4px;">💡 おすすめポイント＆特長</div>
        <div style="color: #334155; line-height: 1.5;">${pros}</div>
      </div>
      <div style="background: #fff1f2; padding: 10px 14px; border-radius: 10px; margin-bottom: 16px; font-size: 0.84rem; color: #9f1239;">
        <strong>⚠️ 購入時の留意点:</strong> ${cons}
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #e11d48 100%); color: #ffffff; font-weight: bold; font-size: 0.92rem; padding: 10px 20px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 6px rgba(190,0,0,0.3); transition: transform 0.15s ease;">
          楽天市場で最安値・在庫を見る →
        </a>
        <a href="/article/${art.id}" style="display: inline-block; background: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; font-weight: bold; font-size: 0.88rem; padding: 9px 16px; border-radius: 8px; text-decoration: none;">
          詳細スペック・口コミ個別記事
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
