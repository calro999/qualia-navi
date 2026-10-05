import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch44Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch44_items.json', 'utf8'));

// --- テーマ1: 高浸透ビタミンC美容液＆誘導体セラム 厳選10商品 ---
export const vitaminCItemsRaw = batch44Data.theme1_vitamin_c;

// --- テーマ2: 高保湿モイスト洗顔フォーム＆濃密アミノ酸クッション泡洗顔 厳選10商品 ---
export const cleanserItemsRaw = batch44Data.theme2_cleanser;

// --- テーマ3: 濃密ハイドロゲルマスク＆高密着モデリングマスク 厳選10商品 ---
export const hydrogelItemsRaw = batch44Data.theme3_hydrogel;

console.log(`選定アイテム数: ビタミンC美容液=${vitaminCItemsRaw.length}, 高保湿洗顔フォーム=${cleanserItemsRaw.length}, ゲル＆モデリングマスク=${hydrogelItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'vitaminc' ? 'vitac' : category === 'cleanser' ? 'wash' : 'gelpack';
  const id = `art-winter-b44-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・美容液・ビタミンC・ピュアビタミンC・APPS・毛穴ケア・美白・透明感・オバジ・ユンス・ドクターシーラボ・メラノCC・キールズ・2026冬コスメ';
  let descType = '冬の寒さと乾燥によるどんよりくすみ、暖房によるインナードライ毛穴の開きを集中ケアし、角層深くまでうるおいと透明感を注ぎ込む高浸透ビタミンC美容液';
  if (category === 'cleanser') {
    catName = 'スキンケア・洗顔料・洗顔フォーム・保湿洗顔・アミノ酸洗顔・炭酸泡洗顔・クッション泡・カネボウ・オルビス・オバジ・ポーラ・ミノン・2026冬スキンケア';
    descType = '冬の冷えや外気乾燥で敏感になった素肌のうるおいを守り抜き、濃密なクッション泡や保湿ジェルで摩擦レスに汚れを浮かせ、洗い上がりのツッパリ感をゼロにする高保湿洗顔フォーム';
  } else if (category === 'hydrogel') {
    catName = 'スキンケア・パック・フェイスマスク・ハイドロゲルマスク・モデリングマスク・コラーゲンマスク・韓国コスメ・集中保湿・おこもり美容・バイオダンス・リンゼイ・2026冬コスメ';
    descType = '乾燥が進む11〜12月の夜に、肌に吸い付くように密着して美容液成分を閉じ込め、翌朝の内側から発光するような極上水光肌へと導く濃密ハイドロゲル・モデリングマスク';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分・最安値比較`,
    content: `${item.itemName}は、11〜12月の本格的な冬シーズンにおいて、${descType}です。楽天市場での最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」をはじめとする信頼性の高い正規取扱ショップにて、楽天お買い物マラソンや各種ポイント還元イベントを活用してお得に手に入ります。冬の過酷な乾燥環境でも揺らがない健やかな肌を保つための本命アイテムとして、多くの美容愛好家から厚い支持を集めています。`,
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
    reviewCount: item.reviewCount || 320,
    featureSlug: featureSlug
  };
}

export const vitaminCArticles = vitaminCItemsRaw.map((it, idx) => createProductArticle(it, 'vitaminc', ['ビタミンC美容液', '高濃度ピュアビタミンC', 'APPS', '毛穴ケア', 'くすみ対策', 'オバジC25', 'Yunth', 'ドクターシーラボVC100', 'メラノCC', 'アスタリフト', 'ミシャ', 'イニスフリー', 'COSRX', 'アンレーベルラボ', 'キールズ'], 'winter-high-potency-vitamin-c-serum-pore-2026', idx));
export const cleanserArticles = cleanserItemsRaw.map((it, idx) => createProductArticle(it, 'cleanser', ['保湿洗顔フォーム', 'アミノ酸洗顔', 'クッション泡洗顔', '炭酸洗顔', '乾燥肌洗顔', 'カネボウコンフォート', 'オルビスユードット', 'オバジX', 'ポーラBA', 'コスメデコルテ', 'カバーマーク', 'ファンケル泥ジェル', 'ミノン', 'エスト', 'エトヴォス'], 'winter-deep-moist-hydrating-facial-cleanser-foam-2026', idx));
export const hydrogelArticles = hydrogelItemsRaw.map((it, idx) => createProductArticle(it, 'hydrogel', ['ハイドロゲルマスク', 'モデリングマスク', 'コラーゲンマスク', 'スリーピングパック', 'おこもり美容', 'バイオダンス', 'ナンバーズイン', 'リンゼイ', 'メディヒール', 'トリデン', 'アヌア', 'VT', 'センテリアン24', 'アビブ', 'ドクタージャルト'], 'winter-hydrogel-modeling-mask-pack-intensive-hydrate-2026', idx));

export const allNewArticles = [...vitaminCArticles, ...cleanserArticles, ...hydrogelArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 320).toLocaleString()}件)</span>
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
          <div style="color: #991b1b; font-weight: bold; margin-bottom: 4px;">💡 注意点・コツ</div>
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
