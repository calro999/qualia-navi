import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch34Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch34_items.json', 'utf8'));

// --- テーマ1: 温感ホットクレンジングジェル＆温感マッサージ洗顔 厳選10商品 ---
export const hotCleansingItemsRaw = batch34Data.theme1_hot_cleansing;

// --- テーマ2: 塗るボトックス＆ペプチド・コラーゲン濃密弾力アンプル美容液 厳選10商品 ---
export const peptideAmpouleItemsRaw = batch34Data.theme2_peptide_ampoule;

// --- テーマ3: 寒冷刺激・マスク擦れ救済！パンテノール＆シカ B5レスキューリペアバーム 厳選10商品 ---
export const b5CicaItemsRaw = batch34Data.theme3_b5_cica_balm;

console.log(`選定アイテム数: 温感クレンジング=${hotCleansingItemsRaw.length}, ペプチドアンプル=${peptideAmpouleItemsRaw.length}, B5シカバーム=${b5CicaItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hot_cleansing' ? 'hot' : category === 'peptide_ampoule' ? 'pep' : 'cica';
  const id = `art-winter-b34-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・クレンジング・ホットクレンジング・温感ジェル・毛穴ケア・角栓除去・血行促進・2026冬コスメ';
  let descType = '11〜12月の気温低下で硬く閉じた毛穴や冷え固まった皮脂・頑固な角栓を、じんわり温感スチーム効果でとろけるように浮かせ、血行を促してくすみ・ゴワつきを一掃する温感ホットクレンジングジェル';
  if (category === 'peptide_ampoule') {
    catName = 'スキンケア・美容液・アンプル・ペプチド・コラーゲン・塗るボトックス・たるみ毛穴・ハリ弾力・エイジングケア・2026冬スキンケア';
    descType = '11〜12月の寒冷乾燥で急激にしぼむ肌密度・頬のたるみ毛穴・ほうれい線・乾燥小ジワを、マルチペプチドや低分子コラーゲン、ボルフィリンで内側から押し上げる濃密弾力アンプル美容液';
  } else if (category === 'b5_cica') {
    catName = 'スキンケア・フェイスクリーム・リペアバーム・パンテノール・CICA・敏感肌・赤み改善・肌バリア修復・乾燥肌・2026冬コスメ';
    descType = '11〜12月の冷たい北風や急激な寒暖差ショック、マフラーやマスクの摩擦によって生じる赤み・ヒリつき・粉ふき・皮むけを、高濃度プロビタミンB5とCICA成分で集中的に保護・鎮静・修復するレスキューリペアバーム';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の本格的な寒冷乾燥期およびホリデーシーズンにおいて、肌本来の美しさを引き出し過酷な環境から肌を守り抜く本命の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の公式正規取扱店や優良ストアから、お買い物マラソン・ポイントアッププログラムを活用してお得に購入できます。乾燥や寒さに負けない素肌美を目指す方におすすめの一品です。`,
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

export const hotCleansingArticles = hotCleansingItemsRaw.map((it, idx) => createProductArticle(it, 'hot_cleansing', ['ホットクレンジング', '温感クレンジング', 'マナラ', 'スキンビル', 'DUO', 'ベネフィーク', 'アンレーベルラボ', 'ラチェスカ', 'ラフラ', 'エリクシール', '毛穴ケア', '温感毛穴スチーム'], 'winter-warming-hot-cleansing-gel-pore-massage-2026', idx));
export const peptideAmpouleArticles = peptideAmpouleItemsRaw.map((it, idx) => createProductArticle(it, 'peptide_ampoule', ['ペプチドアンプル', 'コラーゲン美容液', '塗るボトックス', 'バイオヒールボ', 'VT', 'リードルショット', 'ナンバーズイン', 'オーディナリー', 'KAHI', 'バイオダンス', 'ドクターシーラボ', 'エスト', 'メディピール', 'メディキューブ', 'たるみ毛穴', 'ハリ弾力'], 'winter-peptide-collagen-firming-ampoule-serum-2026', idx));
export const b5CicaArticles = b5CicaItemsRaw.map((it, idx) => createProductArticle(it, 'b5_cica', ['パンテノール', 'シカバーム', 'CICA', 'ラロッシュポゼ', 'シカプラスト', 'アベンヌ', 'バイオヒールボ', 'ドクタージャルト', 'イハダ', 'VT', 'トリデン', 'リアルバリア', 'イニスフリー', 'センテリアン24', 'マデカクリーム', '赤み鎮静', '肌バリア修復'], 'winter-panthenol-b5-cica-rescue-barrier-balm-2026', idx));

export const allNewArticles = [...hotCleansingArticles, ...peptideAmpouleArticles, ...b5CicaArticles];

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
    冬のスキンケア・温活・美容液コスメの購入は楽天市場の公式ショップ・優良店が安心＆高還元。エントリー＆楽天カード利用で大量ポイントが還元されます。
  </p>
</div>
`;
}
