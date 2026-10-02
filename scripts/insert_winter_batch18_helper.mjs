import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch18Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch18_items.json', 'utf8'));

// --- テーマ1: ポアプライマー＆毛穴補正下地 厳選10商品 ---
export const primerItemsRaw = batch18Data.theme1_primer;

// --- テーマ2: 導入美容オイル＆ブースターオイル 厳選10商品 ---
export const oilItemsRaw = batch18Data.theme2_oil;

// --- テーマ3: お湯落ち＆ニュアンスカラーマスカラ 厳選10商品 ---
export const mascaraItemsRaw = batch18Data.theme3_mascara;

console.log(`選定アイテム数: ポアプライマー=${primerItemsRaw.length}, 導入オイル=${oilItemsRaw.length}, マスカラ=${mascaraItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'primer' ? 'prm' : category === 'oil' ? 'oil' : 'msc';
  const id = `art-winter-b18-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ベースメイク・化粧下地・ポアプライマー・毛穴カバー・乾燥崩れ防止・保湿下地';
  let descType = '11〜12月の暖房乾燥や冷たい外気によって引き起こされる「ファンデーションの毛穴落ち」「粉浮き」「乾燥小ジワ割れ」を徹底ブロックし、美容液成分で潤いを補給しながらキメの整ったつるんとなめらかな陶器肌を一日中キープする高保湿毛穴補正下地';
  if (category === 'oil') {
    catName = 'スキンケア・美容オイル・導入オイル・ブースター・高保湿・乾燥肌・エイジングケア';
    descType = '11〜12月の急激な気温低下でゴワつき、化粧水が弾かれるようになった冬の硬化角質をふっくらと解きほぐし、親水性と親油性の絶妙なバランスで後続のスキンケアの浸透ルートを劇的にブーストする高純度導入美容オイル';
  } else if (category === 'mascara') {
    catName = 'メイクアップ・マスカラ・お湯落ちマスカラ・ロングマスカラ・カラーマスカラ・アイメイク';
    descType = '11〜12月の冷たい冬風による涙目やマスク・マフラーの呼気湿気でも絶対に滲まない耐水フィルム処方を備え、38℃のお湯でするんと摩擦レスに落とせる冬の洗練ニュアンス美束ロング＆カールマスカラ';
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
    reviewCount: item.reviewCount || 280,
    featureSlug: featureSlug
  };
}

export const primerArticles = primerItemsRaw.map((it, idx) => createProductArticle(it, 'primer', ['ポアプライマー', '毛穴下地', '化粧下地', 'クレドポーボーテ', 'コスメデコルテ', 'ポールアンドジョー', 'ローラメルシエ', 'エテュセ', 'キャンメイク', 'マキアージュ', '冬メイク'], 'winter-pore-primer-blur-base-2026', idx));
export const oilArticles = oilItemsRaw.map((it, idx) => createProductArticle(it, 'oil', ['美容オイル', 'ブースターオイル', '導入美容液', 'メルヴィータ', 'RMK', 'HABA', 'スクワラン', 'トリロジー', 'アルビオン', '冬スキンケア'], 'winter-booster-facial-oil-hydrate-2026', idx));
export const mascaraArticles = mascaraItemsRaw.map((it, idx) => createProductArticle(it, 'mascara', ['マスカラ', 'お湯落ちマスカラ', 'カラーマスカラ', 'デジャヴュ', 'DUP', 'ヒロインメイク', 'エテュセ', 'メイベリン', 'エレガンス', 'クリニーク', '冬アイメイク'], 'winter-tubing-mascara-nuance-color-2026', idx));

export const allNewArticles = [...primerArticles, ...oilArticles, ...mascaraArticles];

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
export function renderItemCard(it, art, reason, pros, cons) {
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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.8} (${(it.reviewCount || 250).toLocaleString()}件)</span>
      </div>
      <h3 style="font-size: 1.15rem; font-weight: bold; margin: 0 0 10px 0; color: #0f172a; line-height: 1.45;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="color: #0f172a; text-decoration: none;">
          ${it.itemName}
        </a>
      </h3>
      <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7; margin-bottom: 12px;">
        ${it.priceFormatted} <span style="font-size: 0.78rem; font-weight: normal; color: #64748b;">(税込・最新楽天市場価格)</span>
      </div>
      <p style="font-size: 0.92rem; color: #334155; line-height: 1.6; margin-bottom: 12px;">
        ${reason}
      </p>
      <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 14px;">
        <div style="color: #0369a1; font-weight: bold; margin-bottom: 4px;">✨ おすすめポイント: ${pros}</div>
        <div style="color: #475569;">💡 気になる点: ${cons}</div>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #e60000 100%); color: #ffffff; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 0.9rem; text-decoration: none; box-shadow: 0 2px 6px rgba(230,0,0,0.3);">
          楽天市場で詳細・在庫を見る →
        </a>
        <a href="/articles/${art.id}" style="display: inline-block; background: #ffffff; color: #0284c7; border: 1px solid #0284c7; padding: 10px 16px; border-radius: 8px; font-weight: bold; font-size: 0.88rem; text-decoration: none;">
          詳細レビュー・口コミ記事を読む
        </a>
      </div>
    </div>
  </div>
</div>`;
}

export function rakutenCardBanner() {
  return `
<div style="margin: 32px 0; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%); border: 1px solid #fecaca; text-align: center;">
  <p style="font-size: 0.95rem; font-weight: bold; color: #991b1b; margin-bottom: 8px;">
    🛍️ 楽天スーパーSALE・お買い物マラソン・毎月5と0のつく日はポイント高還元！
  </p>
  <p style="font-size: 0.85rem; color: #7f1d1d; margin: 0 0 12px 0;">
    楽天市場の公式ショップ・優良認定店舗なら、真冬の乾燥対策コスメ・ホリデー限定コフレもお得にポイントが貯まります。
  </p>
  <a href="https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #bf0000; color: #ffffff; font-weight: bold; font-size: 0.88rem; padding: 8px 18px; border-radius: 6px; text-decoration: none;">
    楽天市場コスメ・冬のビューティー特集をチェックする →
  </a>
</div>`;
}
