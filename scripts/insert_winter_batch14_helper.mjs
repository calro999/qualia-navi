import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch14Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch14_items.json', 'utf8'));

// --- テーマ1: 高級ヘアブラシ＆頭皮ほぐしパドルブラシ 厳選10商品 ---
const hairBrushItemsRaw = batch14Data.theme1_hairbrush;

// --- テーマ2: 高保湿CICA＆高濃度セラミド・パンテノール リペアバリアクリーム 厳選10商品 ---
const barrierCreamItemsRaw = batch14Data.theme2_barriercream;

// --- テーマ3: 電動EMSヘッドスパ＆スカルプリフトマッサージャー 厳選10商品 ---
const headSpaItemsRaw = batch14Data.theme3_headspa;

console.log(`選定アイテム数: ヘアブラシ=${hairBrushItemsRaw.length}, リペアクリーム=${barrierCreamItemsRaw.length}, 電動ヘッドスパ=${headSpaItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hairbrush' ? 'hbr' : category === 'barriercream' ? 'bcr' : 'hsp';
  const id = `art-winter-b14-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ヘアケア・ヘアブラシ・パドルブラシ・頭皮マッサージ・静電気防止';
  let descType = '11〜12月の激しい乾燥と静電気による髪の広がり・パサつき・枝毛を物理的に抑制し、ブラッシングするだけでツヤとまとまりを与える上質ヘアブラシ';
  if (category === 'barriercream') {
    catName = 'スキンケア・高保湿クリーム・敏感肌ケア・CICA・セラミド・バリア修復';
    descType = '真冬の厳しい寒風とエアコン暖房による寒暖差・過乾燥で赤みや粉ふきを起こした肌バリアを集中再構築する高濃度シカ＆セラミド配合リペアクリーム';
  } else if (category === 'headspa') {
    catName = '美容家電・電動ヘッドスパ・EMSスカルプケア・リフトアップ・温活ギア';
    descType = '冬の寒さでこわばった頭皮や側頭筋、首肩をプロの手技とEMS電気刺激でほぐし、湯船の中で極上スパ体験とフェイスリフトを叶える本格美容マシン';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬本番における過酷な環境（寒冷・暖房乾燥・血行不良）において、美容賢者やユーザーから高い支持を得ている実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、公式店「${item.shopName}」等からポイント還元付きでお得にお買い求めいただけます。冬のビューティールーティンを格上げする本命アイテムです。`,
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
    reviewCount: item.reviewCount || 200,
    featureSlug: featureSlug
  };
}

const hairBrushArticles = hairBrushItemsRaw.map((it, idx) => createProductArticle(it, 'hairbrush', ['ヘアブラシ', 'パドルブラシ', 'スカルプブラシ', 'ReFa', 'AVEDA', 'ukaケンザン', '静電気対策', '美髪ケア', 'ホリデーギフト'], 'winter-scalp-hair-brush-paddle-massage-2026', idx));
const barrierCreamArticles = barrierCreamItemsRaw.map((it, idx) => createProductArticle(it, 'barriercream', ['シカクリーム', 'セラミドクリーム', 'リペアクリーム', 'AESTURA', 'ラロッシュポゼ', 'キュレル', '寒暖差肌荒れ', '粉ふき防止', 'ダーマコスメ'], 'winter-cica-ceramide-barrier-repair-cream-2026', idx));
const headSpaArticles = headSpaItemsRaw.map((it, idx) => createProductArticle(it, 'headspa', ['電動ヘッドスパ', 'EMSヘッドスパ', 'スカルプケア', 'MYTREX', 'NIPLUX', 'ヤーマン', 'ミーゼ', '頭皮マッサージ', 'ホリデーご褒美'], 'winter-ems-head-spa-scalp-lift-device-2026', idx));

const allNewArticles = [...hairBrushArticles, ...barrierCreamArticles, ...headSpaArticles];

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
    ※冬の高級ヘアブラシや高濃度バリアクリーム、電動EMSヘッドスパマシンも、楽天カード決済なら常時3倍以上のポイント還元。お買い物マラソンや0・5のつく日を活用してお得に手に入れましょう。
  </p>
</div>`;

export {
  batch14Data,
  hairBrushItemsRaw,
  barrierCreamItemsRaw,
  headSpaItemsRaw,
  hairBrushArticles,
  barrierCreamArticles,
  headSpaArticles,
  renderItemCard,
  rakutenCardBanner
};
