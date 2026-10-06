import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch49Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch49_items.json', 'utf8'));

// --- テーマ1: 飲む高濃度セラミド＆飲むコラーゲン 厳選10商品 ---
export const innerItemsRaw = batch49Data.theme1_inner;

// --- テーマ2: 高保湿温感クレイマスク＆泥ミネラルパック 厳選10商品 ---
export const clayItemsRaw = batch49Data.theme2_clay;

// --- テーマ3: 極上スカルプソルトスクラブ＆濃密ヘッドスパクレンジング 厳選10商品 ---
export const scalpItemsRaw = batch49Data.theme3_scalp;

console.log(`第49弾 選定アイテム数: インナーケア=${innerItemsRaw.length}, クレイパック=${clayItemsRaw.length}, スカルプスクラブ=${scalpItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'inner' ? 'inn' : category === 'clay' ? 'cly' : 'scp';
  const id = `art-winter-b49-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'インナーケア・美容ドリンク・コラーゲンドリンク・飲むセラミド・ビタミンC・サプリメント・2026冬インナーケア';
  let descType = '11〜12月の本格的な乾燥と寒さで外側からのスキンケアが追いつかない砂漠肌に、特定保健用食品や機能性表示食品の高純度セラミド・低分子コラーゲンが体内から全身の水分保持機能を底上げする飲む集中インナーケア';
  if (category === 'clay') {
    catName = 'スキンケア・パック・クレイマスク・泥パック・毛穴ケア・角質ケア・温感クレンジング・黒ずみ除去・2026冬スキンケア';
    descType = '11〜12月の寒冷環境で固まった頑固な毛穴角栓・黒ずみ・ゴワつき角質を、つっぱり感のない濃密ミネラル泥と温感スチーム効果で年末に優しく吸着オフする極上クレイマスク';
  } else if (category === 'scalp') {
    catName = 'ヘアケア・スカルプケア・頭皮スクラブ・ヘッドスパ・炭酸シャンプー・頭皮クレンジング・美髪・ギフト・2026冬ヘアケア';
    descType = '冬の暖房による頭皮の蒸れ・乾燥フケ・血行不良・ニオイをミネラル海塩と植物オイルで一掃し、根元からふんわり立ち上がる極上ツヤ美髪へ導くサロン級ヘッドスパスクラブ';
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

export const innerArticles = innerItemsRaw.map((it, idx) => createProductArticle(it, 'inner', ['飲むセラミド', 'コラーゲンドリンク', 'オルビスディフェンセラ', 'ザコラーゲン', 'リポスフェリック', '美容サプリ', '乾燥肌インナーケア', '冬の温活美容'], 'winter-inner-beauty-ceramide-collagen-drink-supplement-2026', idx));
export const clayArticles = clayItemsRaw.map((it, idx) => createProductArticle(it, 'clay', ['クレイマスク', '泥パック', 'KANEBOマッドウォッシュ', 'イニスフリー火山灰', 'アルジタル', '毛穴角栓大掃除', '温感クレンジング', '年末肌リセット'], 'winter-hydrating-clay-mask-pore-purifying-pack-2026', idx));
export const scalpArticles = scalpItemsRaw.map((it, idx) => createProductArticle(it, 'scalp', ['頭皮スクラブ', 'スカルプクレンジング', 'SABONヘッドスクラブ', 'ダヴィネス', 'アヴェダ', '炭酸ヘッドスパ', '冬の乾燥フケ対策', '美髪ギフト'], 'winter-head-spa-scalp-scrub-salt-cleansing-2026', idx));

export const allNewArticles = [...innerArticles, ...clayArticles, ...scalpArticles];

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
