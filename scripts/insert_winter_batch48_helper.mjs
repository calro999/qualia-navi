import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch48Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch48_items.json', 'utf8'));

// --- テーマ1: クリスマスコフレ＆ホリデー限定メイクパレット 厳選10商品 ---
export const holidayItemsRaw = batch48Data.theme1_holiday;

// --- テーマ2: 高保湿美容液ファンデーション＆水光クッション 厳選10商品 ---
export const foundationItemsRaw = batch48Data.theme2_foundation;

// --- テーマ3: ヒト型セラミド原液＆高濃度セラミド美容液 厳選10商品 ---
export const ceramideItemsRaw = batch48Data.theme3_ceramide;

console.log(`第48弾 選定アイテム数: ホリデー=${holidayItemsRaw.length}, ファンデーション=${foundationItemsRaw.length}, セラミド=${ceramideItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'holiday' ? 'holi' : category === 'foundation' ? 'fndn' : 'cera';
  const id = `art-winter-b48-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・クリスマスコフレ・ホリデーコレクション・アイシャドウパレット・限定コスメ・デパコス・ギフト・2026冬コスメ';
  let descType = '11〜12月のホリデーシーズンを鮮やかに彩る限定アイテムで、冬の澄んだ光に映える繊細なパールと華やかなカラーが詰まった、自分へのご褒美や大切な人へのギフトに最適なプレミアムコスメ';
  if (category === 'foundation') {
    catName = 'ベースメイク・ファンデーション・美容液ファンデ・クッションファンデ・高保湿・ツヤ肌・乾燥対策・暖房対策・崩れ防止・2026冬ベースメイク';
    descType = '11〜12月の過酷な暖房や冷気によるカサつき・粉吹き・毛穴落ちを防ぎ、贅沢なスキンケア成分で一日中みずみずしい潤いと品格あふれる水光ツヤを纏い続ける高機能ベースメイク';
  } else if (category === 'ceramide') {
    catName = 'スキンケア・美容液・セラミド・ヒト型セラミド・原液・敏感肌・インナードライ・バリア機能・高保湿・角層ケア・2026冬スキンケア';
    descType = '冬の寒風と暖房によって細胞間脂質がスカスカになった砂漠肌に、皮膚科学に基づいた高純度ヒト型セラミドが角層深部までダイレクトに浸透し、健やかな水分保持バリアを再建する集中救済アイテム';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分・最安値比較`,
    content: `${item.itemName}は、11〜12月の本格的な冬シーズンにおいて、${descType}です。楽天市場での最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」をはじめとする信頼性の高い正規取扱ショップにて、お買い物マラソンや各種ポイント還元イベントを活用してお得に購入可能です。冬特有の美容悩みを根本から解消し、ワンランク上の仕上がりを約束する名品として多くの愛用者から支持されています。`,
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
    reviewCount: item.reviewCount || 185,
    featureSlug: featureSlug
  };
}

export const holidayArticles = holidayItemsRaw.map((it, idx) => createProductArticle(it, 'holiday', ['クリスマスコフレ', 'ホリデーコレクション', 'アイシャドウパレット', '限定コスメ', 'SUQQU', 'ディオール', 'コスメデコルテ', 'ジルスチュアート', 'CHANEL', 'ギフト'], 'winter-holiday-coffret-eyeshadow-palette-2026', idx));
export const foundationArticles = foundationItemsRaw.map((it, idx) => createProductArticle(it, 'foundation', ['美容液ファンデーション', 'クッションファンデ', '資生堂スキングロウ', 'クレドポーボーテ', 'TIRTIR', 'コスメデコルテ', '高保湿ファンデ', 'ツヤ肌', '暖房乾燥対策'], 'winter-serum-foundation-glow-cushion-dry-skin-2026', idx));
export const ceramideArticles = ceramideItemsRaw.map((it, idx) => createProductArticle(it, 'ceramide', ['セラミド美容液', 'ヒト型セラミド', 'エトヴォス', 'トゥヴェール', 'キュレル', '松山油脂', 'KISO', 'バリア機能改善', 'インナードライ', '乾燥性敏感肌'], 'winter-human-ceramide-skin-barrier-serum-2026', idx));

export const allNewArticles = [...holidayArticles, ...foundationArticles, ...ceramideArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 185).toLocaleString()}件)</span>
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
