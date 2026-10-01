import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch15Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch15_items.json', 'utf8'));

// --- テーマ1: 高保湿ハンドクリーム＆ネイルオイル 厳選10商品 ---
const handCreamItemsRaw = batch15Data.theme1_handcream;

// --- テーマ2: 高濃度重炭酸入浴剤＆薬用バスソルト・バスオイル 厳選10商品 ---
const bathSaltItemsRaw = batch15Data.theme2_bathsalt;

// --- テーマ3: 濃密高保湿リップマスク＆夜用リップ美容液バーム 厳選10商品 ---
const lipMaskItemsRaw = batch15Data.theme3_lipmask;

console.log(`選定アイテム数: ハンドケア=${handCreamItemsRaw.length}, 入浴剤＆バスソルト=${bathSaltItemsRaw.length}, リップケア=${lipMaskItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'handcream' ? 'hnd' : category === 'bathsalt' ? 'bth' : 'lip';
  const id = `art-winter-b15-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ハンドケア・ハンドクリーム・ネイルオイル・手荒れ修復・あかぎれ予防';
  let descType = '11〜12月の水仕事や冷気・エアコン暖房による手の乾燥・あかぎれ・ささくれ・手肌のくすみ・小ジワを集中リペアし、ふっくら透明感のある手元へ導く高保湿ハンド＆ネイルケア';
  if (category === 'bathsalt') {
    catName = 'ボディケア・入浴剤・重炭酸・バスソルト・温活・冷え性改善';
    descType = '真冬の厳しい冷え込みでこわばった筋肉や血管を芯から温め、血行促進と疲労回復、全身のうるおいバリアを同時に叶えるプレミアム温活バスアイテム';
  } else if (category === 'lipmask') {
    catName = 'スキンケア・リップケア・リップマスク・リップバーム・唇荒れ予防・縦ジワ改善';
    descType = '皮脂腺のない繊細な冬の唇のガサガサ皮むけや縦ジワ・ひび割れを寝ている間や日中に濃厚ラッピングし、ぷるんと潤いに満ちた赤ちゃん唇へ導く集中リップ美容液・バーム';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬本番における過酷な乾燥・寒冷環境（手荒れ・冷え性・唇のひび割れ）において、美容賢者や乾燥肌ユーザーから絶大な支持を得ている実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、公式店「${item.shopName}」等からポイント還元付きでお得にお買い求めいただけます。冬のビューティールーティンを格上げする本命名品です。`,
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

const handCreamArticles = handCreamItemsRaw.map((it, idx) => createProductArticle(it, 'handcream', ['ハンドクリーム', 'ネイルオイル', '手荒れケア', 'あかぎれ予防', 'ささくれ改善', 'ロクシタン', 'Aesop', 'uka', 'ユースキン', 'ホリデーギフト'], 'winter-hand-cream-nail-oil-repair-2026', idx));
const bathSaltArticles = bathSaltItemsRaw.map((it, idx) => createProductArticle(it, 'bathsalt', ['入浴剤', '重炭酸入浴剤', 'バスソルト', '温活ケア', '冷え性改善', 'BARTH', 'クナイプ', 'アユーラ', 'エプソムソルト', '全身保湿'], 'winter-bath-salt-bicarbonate-warming-care-2026', idx));
const lipMaskArticles = lipMaskItemsRaw.map((it, idx) => createProductArticle(it, 'lipmask', ['リップマスク', 'リップバーム', 'ナイトリップケア', '唇の乾燥', '皮むけ予防', 'ラネージュ', 'タカミリップ', 'オバジ', 'キュレル', '縦ジワ改善'], 'winter-hydrating-lip-mask-balm-night-care-2026', idx));

const allNewArticles = [...handCreamArticles, ...bathSaltArticles, ...lipMaskArticles];

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
    ※冬の高級ハンドクリームや薬用重炭酸入浴剤、集中リップバームも、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に手に入れましょう。
  </p>
</div>`;

export {
  batch15Data,
  handCreamItemsRaw,
  bathSaltItemsRaw,
  lipMaskItemsRaw,
  handCreamArticles,
  bathSaltArticles,
  lipMaskArticles,
  renderItemCard,
  rakutenCardBanner
};
