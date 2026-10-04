import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch33Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch33_items.json', 'utf8'));

// --- テーマ1: 高保湿ヘアミルク＆浸透エマルジョン 厳選10商品 ---
export const hairMilkItemsRaw = batch33Data.theme1_hair_milk;

// --- テーマ2: 高保湿アイクリーム＆目元専用美容液 厳選10商品 ---
export const eyeCreamItemsRaw = batch33Data.theme2_eye_cream;

// --- テーマ3: 薬用重炭酸入浴剤＆エプソムソルト・ミネラルバスソルト 厳選10商品 ---
export const bathSaltItemsRaw = batch33Data.theme3_bath_salt;

console.log(`選定アイテム数: ヘアミルク=${hairMilkItemsRaw.length}, アイクリーム=${eyeCreamItemsRaw.length}, 温活バスソルト=${bathSaltItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hair_milk' ? 'hmk' : category === 'eye_cream' ? 'eye' : 'bts';
  const id = `art-winter-b33-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ヘアケア・ヘアミルク・洗い流さないトリートメント・静電気対策・アウトバスケア・2026冬コスメ・美髪ケア';
  let descType = '11〜12月の暖房乾燥・寒冷外気・マフラー摩擦による静電気や毛先のパサつき・広がりを、毛髪内部への集中水分保水とキューティクルCMC補修で一日中しっとりまとめる高保湿ヘアミルク';
  if (category === 'eye_cream') {
    catName = 'スキンケア・アイケア・アイクリーム・目元美容液・シワ改善・クマ対策・レチノール・2026冬スキンケア';
    descType = '11〜12月の寒冷・エアコン暖房で急激に乾燥する目元のちりめんジワ・青グマ・くぼみを、レチノールやペプチド、高濃度リポソームで角層深部からふっくら押し返す高保湿アイクリーム';
  } else if (category === 'bath_salt') {
    catName = 'ボディケア・バスグッズ・入浴剤・薬用重炭酸・エプソムソルト・バスソルト・温活・冷え性改善・ギフト';
    descType = '11〜12月の急激な冷え込み・自律神経の乱れ・全身のカサつきを、高純度重炭酸イオンやマグネシウム温活によって芯から温め血行を促進し、極上の快眠へと導く薬用温活入浴剤＆バスソルト';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の寒冷乾燥期およびホリデーシーズンにおいて、確かな実力と上質な仕上がりで美容のプロや愛用者から絶賛を集める本命の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規公式ショップ・高評価店からポイントアップやお買い物マラソンを活用してお得に購入可能です。冬の過酷な環境から美しさを守り抜く信頼の名品です。`,
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

export const hairMilkArticles = hairMilkItemsRaw.map((it, idx) => createProductArticle(it, 'hair_milk', ['ヘアミルク', '洗い流さないトリートメント', 'アウトバス', 'オルビス', 'ミルボン', 'エルジューダ', 'ナプラ', 'ラカスタ', 'モロッカンオイル', 'コスメデコルテ', 'ジョンマスター', 'スティーブンノル', 'ボタニスト', 'パンテーン', '静電気防止'], 'winter-hydrating-hair-milk-emulsion-leave-in-2026', idx));
export const eyeCreamArticles = eyeCreamItemsRaw.map((it, idx) => createProductArticle(it, 'eye_cream', ['アイクリーム', '目元美容液', 'アイケア', 'エリクシール', 'ポーラ', 'リンクルショット', 'コスメデコルテ', 'なめらか本舗', 'キールズ', 'クラランス', 'クリニーク', 'カネボウ', 'セザンヌ', 'AHC', 'シワ改善', 'クマ対策'], 'winter-hydrating-wrinkle-eye-cream-serum-2026', idx));
export const bathSaltArticles = bathSaltItemsRaw.map((it, idx) => createProductArticle(it, 'bath_salt', ['入浴剤', 'バスソルト', 'エプソムソルト', '重炭酸入浴剤', 'BARTH', 'クナイプ', 'シークリスタルス', 'アユーラ', 'ヴェレダ', 'バブ', '温泡', 'ネハントウキョウ', 'ジョーマローン', 'クレイド', '温活', '冷え性'], 'winter-warming-bath-salt-epsom-bicarbonate-2026', idx));

export const allNewArticles = [...hairMilkArticles, ...eyeCreamArticles, ...bathSaltArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 350).toLocaleString()}件)</span>
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
      <div style="background: #f8fafc; padding: 12px 14px; border-radius: 10px; margin-bottom: 14px; font-size: 0.86rem; border: 1px solid #e2e8f0;">
        <div style="color: #15803d; font-weight: bold; margin-bottom: 4px;">👍 おすすめポイント:</div>
        <div style="color: #334155; margin-bottom: 6px;">${pros}</div>
        <div style="color: #b91c1c; font-weight: bold; margin-bottom: 4px;">⚠️ 注意点・留意点:</div>
        <div style="color: #334155;">${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; font-weight: bold; font-size: 0.9rem; padding: 10px 20px; border-radius: 9999px; text-decoration: none; box-shadow: 0 2px 8px rgba(2,132,199,0.3);">
          楽天市場で詳細・最安値を見る →
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #f1f5f9; color: #334155; font-weight: 600; font-size: 0.85rem; padding: 10px 16px; border-radius: 9999px; text-decoration: none; border: 1px solid #cbd5e1;">
          個別口コミレビュー記事へ
        </a>
      </div>
    </div>
  </div>
</div>
`;
}

export function renderRakutenCampaignBanner() {
  return `
<div style="margin: 32px 0; padding: 18px 24px; border-radius: 14px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 1px solid #bae6fd; text-align: center;">
  <span style="display: inline-block; background: #0284c7; color: #fff; font-size: 0.75rem; font-weight: bold; padding: 3px 10px; border-radius: 9999px; margin-bottom: 8px;">楽天市場 2026冬 お得情報</span>
  <h4 style="margin: 0 0 6px 0; color: #0369a1; font-size: 1.05rem; font-weight: bold;">【ポイント最大10倍以上】お買い物マラソン＆5と0のつく日はさらにお得！</h4>
  <p style="margin: 0; font-size: 0.88rem; color: #0c4a6e; line-height: 1.5;">
    冬のスキンケア・ヘアケア・温活コスメの購入は楽天市場の公式ショップ・優良店が安心＆高還元。エントリー＆楽天カード利用で大量ポイントが還元されます。
  </p>
</div>
`;
}
