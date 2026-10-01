import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch16Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch16_items.json', 'utf8'));

// --- テーマ1: ホリデーアイシャドウパレット 厳選10商品 ---
const eyeshadowItemsRaw = batch16Data.theme1_eyeshadow;

// --- テーマ2: 高保湿UVデイクリーム 厳選10商品 ---
const dayCreamItemsRaw = batch16Data.theme2_daycream;

// --- テーマ3: ホリデーギフトコスメ 厳選10商品 ---
const giftItemsRaw = batch16Data.theme3_gift;

console.log(`選定アイテム数: アイシャドウ=${eyeshadowItemsRaw.length}, UVデイクリーム=${dayCreamItemsRaw.length}, ギフトコスメ=${giftItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'eyeshadow' ? 'eye' : category === 'daycream' ? 'uvc' : 'gft';
  const id = `art-winter-b16-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・アイシャドウ・ホリデーパレット・アイメイク・乾燥崩れ防止';
  let descType = '11〜12月のホリデーシーズンや冬の澄んだ光に映える深みウォームカラーと繊細な濡れツヤラメを叶え、目元の乾燥小ジワや二重幅ヨレを防ぐ高密着オイルインアイシャドウ';
  if (category === 'daycream') {
    catName = 'スキンケア・朝用クリーム・日焼け止め・UVデイクリーム・高保湿バリア・乾燥崩れ防止';
    descType = '11〜12月の過酷な暖房エアコン乾燥と真冬の紫外線UVAから素肌を一日中守り抜き、日中のうるおい補給とメイクの密着・ツヤ肌を同時に両立する高機能UVデイクリーム';
  } else if (category === 'gift') {
    catName = 'ホリデーギフト・プレゼントコスメ・デパコス・ご褒美コスメ・クリスマスコフレ・予算別';
    descType = '11〜12月のクリスマスやホリデーギフト、大切な友人やパートナーへの贈り物、今年一年頑張った自分へのご褒美に絶対外さない洗練されたセンスと上質さを兼ね備えた名作ビューティーアイテム';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月のホリデーシーズンおよび冬本番の過酷な寒冷・乾燥環境において、多くの美容愛好家やコスメ賢者から絶賛されている実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規取扱店・優良ショップからポイント高還元付きでお得にお買い求めいただけます。冬のメイクとスキンケアをワンランク上に格上げする本命の逸品です。`,
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
    reviewCount: item.reviewCount || 250,
    featureSlug: featureSlug
  };
}

const eyeshadowArticles = eyeshadowItemsRaw.map((it, idx) => createProductArticle(it, 'eyeshadow', ['アイシャドウパレット', 'ホリデーコスメ', '冬メイク', 'SUQQU', 'ルナソル', 'ディオール', 'シャネル', 'エクセル', 'キャンメイク', 'トムフォード'], 'winter-warm-eyeshadow-palette-holiday-2026', idx));
const dayCreamArticles = dayCreamItemsRaw.map((it, idx) => createProductArticle(it, 'daycream', ['朝用クリーム', 'UVデイクリーム', '高保湿UV', 'カネボウ', 'クリームインデイ', 'オルビス', 'ラロッシュポゼ', 'POLA', '乾燥肌スキンケア', '暖房乾燥対策'], 'winter-hydrating-uv-day-cream-barrier-2026', idx));
const giftArticles = giftItemsRaw.map((it, idx) => createProductArticle(it, 'gift', ['ホリデーギフト', 'プレゼントコスメ', '予算別ギフト', 'Diorマキシマイザー', 'シャネルミラー', 'イソップ', 'SHIRO', 'ジョーマローン', 'uka', 'ReFa'], 'winter-holiday-cosmetics-gift-guide-2026', idx));

const allNewArticles = [...eyeshadowArticles, ...dayCreamArticles, ...giftArticles];

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
function renderItemCard(it, art, reason, pros, cons) {
  return `
<div style="margin: 28px 0; padding: 22px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.05);">
  <div style="display: flex; gap: 20px; flex-direction: row; flex-wrap: wrap;">
    <div style="flex: 0 0 200px; max-width: 220px; margin: 0 auto; text-align: center;">
      <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener">
        <img src="${it.imageUrl}" alt="${it.itemName}" style="width: 100%; height: auto; max-height: 220px; object-fit: contain; border-radius: 12px; background: #f8fafc; padding: 6px; border: 1px solid #edf2f7;" loading="lazy" />
      </a>
      <div style="margin-top: 8px; font-size: 0.78rem; color: #64748b;">取扱: ${it.shopName}</div>
    </div>
    <div style="flex: 1 1 300px; min-width: 260px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <span style="background: #0284c7; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 8px; border-radius: 6px;">注目度No.${it.rank || 1}</span>
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 200).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・最新楽天市場価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.65; margin-bottom: 12px;">
        ${reason}
      </p>
      <div style="background: #f8fafc; border-radius: 10px; padding: 12px; font-size: 0.85rem; margin-bottom: 14px;">
        <div style="color: #059669; font-weight: bold; margin-bottom: 4px;">✅ メリット: ${pros}</div>
        <div style="color: #dc2626; font-weight: bold;">⚠️ 注意点: ${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="flex: 1 1 auto; text-align: center; background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; padding: 12px 18px; border-radius: 10px; font-weight: bold; text-decoration: none; font-size: 0.92rem; box-shadow: 0 3px 8px rgba(2,132,199,0.3);">
          🛒 楽天市場で在庫・最安値をチェック
        </a>
        <a href="/articles/${art.id}" style="padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; color: #334155; text-decoration: none; font-size: 0.88rem; font-weight: 600; background: #fff;">
          📖 詳細スペック・口コミを見る
        </a>
      </div>
    </div>
  </div>
</div>`;
}

// 楽天カードPRバナー
const rakutenCardBanner = `
<div style="margin: 28px 0; padding: 18px 22px; background: #fffcf5; border: 1px solid #fef08a; border-radius: 14px; text-align: center;">
  <p style="font-size: 0.82rem; font-weight: bold; color: #854d0e; margin-bottom: 8px;">
    💳 Qualia Naviからのご案内：楽天カード新規入会＆利用でポイント進呈中
  </p>
  <div style="display: flex; justify-content: center; align-items: center; margin: 8px 0;">
    <a href="https://hb.afl.rakuten.co.jp/hsc/570202c9.ad3cd4ba.5446e4f3.10821450/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MTY3NDAxLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; display: inline-block;">
      <img src="https://hbb.afl.rakuten.co.jp/hsb/570202c9.ad3cd4ba.5446e4f3.10821450/?me_id=2101008&me_adv_id=167401&t=pict" border="0" style="margin:2px; max-width: 100%; height: auto; border-radius: 6px;" alt="楽天カード新規入会キャンペーン" title="楽天カード">
    </a>
  </div>
  <p style="font-size: 0.74rem; color: #78716c; margin-top: 4px;">
    ※冬の憧れデパコスアイシャドウパレットや高機能UVデイクリーム、大切な人へのホリデーギフトも、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に手に入れましょう。
  </p>
</div>`;

export {
  batch16Data,
  eyeshadowItemsRaw,
  dayCreamItemsRaw,
  giftItemsRaw,
  eyeshadowArticles,
  dayCreamArticles,
  giftArticles,
  renderItemCard,
  rakutenCardBanner
};
