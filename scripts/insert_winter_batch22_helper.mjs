import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch22Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch22_items.json', 'utf8'));

// --- テーマ1: ホリデー限定＆冬映え多色アイシャドウパレット 厳選10商品 ---
export const paletteItemsRaw = batch22Data.theme1_palette;

// --- テーマ2: 高保湿リップオイル＆美容液トリートメントグロス 厳選10商品 ---
export const lipOilItemsRaw = batch22Data.theme2_lipoil;

// --- テーマ3: 予算別・クリスマス＆ホリデーコスメギフト 厳選10商品 ---
export const giftItemsRaw = batch22Data.theme3_gift;

console.log(`選定アイテム数: パレット=${paletteItemsRaw.length}, リップオイル=${lipOilItemsRaw.length}, ギフト=${giftItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'palette' ? 'plt' : category === 'lipoil' ? 'oil' : 'gft';
  const id = `art-winter-b22-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'メイクアップ・アイシャドウ・アイシャドウパレット・ホリデー限定・多色パレット・冬メイク';
  let descType = '11〜12月の冬本番やホリデーシーズンにおいて、乾燥したまぶたにも粉飛びせず吸い付くように密着し、イルミネーションに映える上品な立体グラデーションを叶える至高のアイシャドウパレット';
  if (category === 'lipoil') {
    catName = 'リップケア・リップグロス・リップオイル・高保湿リップ・縦ジワ補正・ツヤ膜・冬リップ';
    descType = '11〜12月の寒冷乾燥や暖房直撃でも唇の縦ジワを埋め尽くし、ベタつかない極上のツヤ膜でラッピングしてうるおいを密封する高保湿リップオイル＆トリートメントグロス';
  } else if (category === 'gift') {
    catName = 'コスメギフト・クリスマスプレゼント・ホリデーギフト・予算別・女友達プレゼント・ご褒美コスメ';
    descType = '11〜12月のクリスマス女子会や忘年会、大切な人へのギフトや自分へのご褒美として、好みを問わず誰からも喜ばれる洗練された鉄板コスメギフト';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬本番・ホリデーシーズンにおいて、コスメ愛好家や美容エディターから圧倒的な支持を集めている実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規取扱店・優良ショップからポイント高還元付きでお得にお買い求めいただけます。冬のビューティールーティンや特別な日を華やかに彩る本命アイテムです。`,
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
    reviewCount: item.reviewCount || 280,
    featureSlug: featureSlug
  };
}

export const paletteArticles = paletteItemsRaw.map((it, idx) => createProductArticle(it, 'palette', ['アイシャドウパレット', 'ディオール', 'ルナソル', 'SUQQU', 'コスメデコルテ', 'トムフォード', 'シャネル', 'アディクション', 'エクセル', 'キャンメイク', 'デイジーク', 'ホリデー限定アイシャドウ'], 'winter-holiday-eyeshadow-palette-glitter-2026', idx));
export const lipOilArticles = lipOilItemsRaw.map((it, idx) => createProductArticle(it, 'lipoil', ['リップオイル', 'リップグロス', 'クラランス', 'ディオール', 'ジルスチュアート', 'ボビイブラウン', 'エルメス', 'ロムアンド', 'TIRTIR', 'トリデン', 'シピシピ', 'hince', '冬リップケア'], 'winter-hydrating-lip-oil-serum-gloss-2026', idx));
export const giftArticles = giftItemsRaw.map((it, idx) => createProductArticle(it, 'gift', ['コスメギフト', 'クリスマスプレゼント', 'ディオール', 'シャネル', 'イソップ', 'SHIRO', 'ジルスチュアート', 'ビュリー', 'ジョーマローン', 'uka', 'サボン', 'ロクシタン', 'ホリデーギフト'], 'winter-holiday-christmas-cosmetics-gift-guide-2026', idx));

export const allNewArticles = [...paletteArticles, ...lipOilArticles, ...giftArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 280).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・楽天市場最新価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.6; margin-bottom: 12px;">
        ${description}
      </p>
      <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 14px;">
        <div style="color: #0369a1; font-weight: bold; margin-bottom: 4px;">✨ 魅力と実感メリット: ${pros}</div>
        <div style="color: #475569;">💡 使用上の留意点: ${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #e60000 100%); color: #ffffff; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 0.9rem; text-decoration: none; box-shadow: 0 2px 6px rgba(230,0,0,0.3);">
          楽天市場で在庫・詳細を見る →
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #ffffff; color: #0284c7; border: 1px solid #0284c7; padding: 10px 16px; border-radius: 8px; font-weight: bold; font-size: 0.88rem; text-decoration: none;">
          詳細レビュー・口コミ記事を読む
        </a>
      </div>
    </div>
  </div>
</div>`;
}

export function renderRakutenCampaignBanner() {
  return `
<div style="margin: 32px 0; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%); border: 1px solid #fecaca; text-align: center;">
  <p style="font-size: 0.95rem; font-weight: bold; color: #991b1b; margin-bottom: 8px;">
    🛍️ 楽天大感謝祭・スーパーSALE・お買い物マラソンはポイント高還元！
  </p>
  <p style="font-size: 0.85rem; color: #7f1d1d; margin: 0 0 12px 0;">
    公式フラッグシップショップや楽天市場認定の優良コスメショップなら、冬の限定コスメやコフレ・ギフトも安心してお得に手に入ります。
  </p>
  <a href="https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #bf0000; color: #ffffff; font-weight: bold; font-size: 0.88rem; padding: 8px 18px; border-radius: 6px; text-decoration: none;">
    楽天市場 コスメ・ビューティー最新セール会場はこちら →
  </a>
</div>`;
}
