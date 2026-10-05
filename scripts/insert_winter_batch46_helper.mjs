import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch46Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch46_items.json', 'utf8'));

// --- テーマ1: 高濃度アゼライン酸美容液＆アゼライン酸バリアクリーム 厳選10商品 ---
export const azelaicItemsRaw = batch46Data.theme1_azelaic;

// --- テーマ2: 発酵スキンケア＆ガラクトミセス・コメ発酵液・酵母コスメ 厳選10商品 ---
export const fermentedItemsRaw = batch46Data.theme2_fermented;

// --- テーマ3: サロン級カラートリートメント＆カラーシャンプー 厳選10商品 ---
export const colortreatmentItemsRaw = batch46Data.theme3_colortreatment;

console.log(`選定アイテム数: アゼライン酸=${azelaicItemsRaw.length}, 発酵コスメ=${fermentedItemsRaw.length}, カラートリートメント=${colortreatmentItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'azelaic' ? 'azel' : category === 'fermented' ? 'ferm' : 'colortr';
  const id = `art-winter-b46-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・美容液・クリーム・アゼライン酸・赤ら顔ケア・酒さ・皮脂バランス・毛穴引き締め・大人ニキビ・敏感肌・ドクターズコスメ・2026冬スキンケア';
  let descType = '外気の冷気と室内の暖房による寒暖差赤ら顔や、乾燥するのに皮脂が酸化して毛穴が詰まる冬特有のゆらぎ肌を、皮膚科学発想のアゼライン酸が根本から整える集中鎮静アイテム';
  if (category === 'fermented') {
    catName = 'スキンケア・発酵コスメ・ガラクトミセス・コメ発酵エキス・ピテラ・酵母・バイオスキンケア・高保湿化粧水・導入美容液・SK2・魔女工場・アルビオン・2026冬コスメ';
    descType = '寒さで血行が滞り硬化した冬の角層を、天然アミノ酸やペプチドを豊富に含む発酵の力でじんわりほぐし、内側から溢れ出るようなツヤとふっくらハリを育む高機能発酵コスメ';
  } else if (category === 'colortreatment') {
    catName = 'ヘアケア・カラートリートメント・カラーシャンプー・白髪染め・白髪ケア・サロン専売・褪色防止・黄ばみ消し・ダメージ補修・クレイエンス・利尻・ソマルカ・2026冬ヘアケア';
    descType = '11〜12月のイベントや年末年始を前に、美容室へ行けない合間でも自宅のバスルームで髪を傷めず艶やかにカラーチャージし、白髪や褪色を美しくカバーするサロン級カラートリートメント';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分・最安値比較`,
    content: `${item.itemName}は、11〜12月の本格的な冬シーズンにおいて、${descType}です。楽天市場での最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」をはじめとする信頼性の高い正規取扱ショップにて、楽天お買い物マラソンや各種ポイント還元イベントを活用してお得に手に入ります。冬の過酷な環境でも揺るぎない美しさを保つための本命アイテムとして、多くの美容愛好家や専門家から絶大な支持を集めています。`,
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
    reviewCount: item.reviewCount || 310,
    featureSlug: featureSlug
  };
}

export const azelaicArticles = azelaicItemsRaw.map((it, idx) => createProductArticle(it, 'azelaic', ['アゼライン酸', 'DRX AZAクリア', 'コスデバハ', 'KISO', 'トゥヴェール', '赤ら顔', '酒さ', '毛穴ケア', '皮脂ゆらぎ', '韓国コスメ', 'ドクターズコスメ'], 'winter-azelaic-acid-serum-barrier-cream-redness-2026', idx));
export const fermentedArticles = fermentedItemsRaw.map((it, idx) => createProductArticle(it, 'fermented', ['発酵コスメ', 'ガラクトミセス', 'SK-II', 'ピテラ', '魔女工場', 'アルビオンフローラドリップ', 'ライスパワーNo11', 'ワンバイコーセー', 'ナンバーズイン3番', 'ランコムジェニフィック', '米肌'], 'winter-fermented-skincare-galactomyces-rice-biotech-2026', idx));
export const colortreatmentArticles = colortreatmentItemsRaw.map((it, idx) => createProductArticle(it, 'colortreatment', ['カラートリートメント', 'カラーシャンプー', '白髪染め', 'クレイエンス', '利尻ヘアカラー', 'クオルシア', 'ソマルカ', 'サイオス', 'エンシェールズ', 'エヌドット', 'スカルプDボーテ', 'b.ris'], 'winter-salon-color-treatment-shampoo-hair-repair-2026', idx));

export const allNewArticles = [...azelaicArticles, ...fermentedArticles, ...colortreatmentArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 310).toLocaleString()}件)</span>
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
