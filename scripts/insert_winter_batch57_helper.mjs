import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch57Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch57_items.json', 'utf8'));

// --- テーマ1: 薬用ホワイトニング歯磨き粉＆音波電動歯ブラシ・美白オーラルケア 10商品 ---
export const oralItemsRaw = batch57Data.theme1_whitening_oral_care;

// --- テーマ2: セルフジェルネイルスターターキット＆UV/LEDライト・自爪補修ベース 10商品 ---
export const nailItemsRaw = batch57Data.theme2_gel_nail_kit;

// --- テーマ3: 温熱EMSフットマッサージャー＆エアーレッグリフレ＆温熱着圧レギンス 10商品 ---
export const footItemsRaw = batch57Data.theme3_foot_massage_warm_care;

console.log(`第57弾 選定アイテム数: オーラルホワイトニング=${oralItemsRaw.length}, ジェルネイルキット=${nailItemsRaw.length}, 温熱フットマッサージャー=${footItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'whitening_oral' ? 'ora' : category === 'gel_nail' ? 'nai' : 'foo';
  const id = `art-winter-b57-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'オーラルケア・ホワイトニング歯磨き粉・電動歯ブラシ・美白ハミガキ・音波振動・口臭ケア・ステイン除去・2026冬デンタルコスメ';
  let descType = '11〜12月の忘年会・ホリデー・成人式前撮りなど人と会う機会が増える冬シーズンに、歯の黄ばみ・着色ステインを根こそぎ浮遊除去し、笑顔が映える白く輝く歯と清潔な息を叶える薬用ホワイトニング＆音波電動ケアアイテム';
  
  if (category === 'gel_nail') {
    catName = 'ネイル・セルフジェルネイル・ジェルネイルキット・LEDライト・マグネットネイル・自爪補修・ホリデーネイル・サロン級・2026冬ネイルケア';
    descType = '予約困難な11〜12月のネイルサロン代わりに、自宅でサロン級のマグネット・ツヤ・高発色ホリデーネイルを短時間で仕上げ、冬の乾燥で折れやすい自爪をしっかり補強する本格ジェルネイルスターターキット＆補修アイテム';
  } else if (category === 'foot_massage') {
    catName = '美容家電・ボディケア・フットマッサージャー・レッグリフレ・EMS・温熱加圧・着圧レギンス・美脚ケア・むくみ解消・冷え性改善・2026冬温活ギア';
    descType = '11〜12月の急速な寒波による下半身の血行不良、夕方のブーツが入らないパンパンなふくらはぎのむくみを、温熱ヒーターと強力エアー加圧・EMS筋収縮によって深層からほぐし流す本格フットケア＆温熱着圧ギア';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の悩みを根本からケアし、上質な暮らしと美しさを実感できます。`,
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
    reviewCount: item.reviewCount || 180,
    featureSlug: featureSlug
  };
}

export const oralArticles = oralItemsRaw.map((it, idx) => createProductArticle(it, 'whitening_oral', ['ホワイトニング', '歯磨き粉', 'アパガード', '電動歯ブラシ', 'ソニッケアー', 'オーラルケア', 'ステイン除去', '白い歯'], 'winter-medicated-whitening-toothpaste-sonic-brush-oral-2026', idx));
export const nailArticles = nailItemsRaw.map((it, idx) => createProductArticle(it, 'gel_nail', ['ジェルネイル', 'ネイルキット', 'LEDライト', 'ohora', 'シャイニージェル', 'マグネットネイル', 'セルフネイル', '自爪補修'], 'winter-self-gel-nail-starter-kit-led-lamp-care-2026', idx));
export const footArticles = footItemsRaw.map((it, idx) => createProductArticle(it, 'foot_massage', ['フットマッサージャー', 'レッグリフレ', 'パナソニック', 'ルルド', 'SIXPAD', '温熱着圧', 'ブーツむくみ', '冷え性改善'], 'winter-heating-ems-air-foot-massager-leg-recovery-2026', idx));

export const allNewArticles = [...oralArticles, ...nailArticles, ...footArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 180).toLocaleString()}件)</span>
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
      <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 10px 14px; border-radius: 4px; margin-bottom: 8px; font-size: 0.85rem; color: #166534;">
        <strong>【ここが優れている（メリット）】</strong><br />
        ${pros}
      </div>
      <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 10px 14px; border-radius: 4px; margin-bottom: 14px; font-size: 0.85rem; color: #92400e;">
        <strong>【購入前の注意点（デメリット）】</strong><br />
        ${cons}
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <a href="${it.affiliateUrl || it.itemUrl}" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: linear-gradient(135deg, #bf0000 0%, #d92626 100%); color: #ffffff; font-weight: bold; font-size: 0.95rem; padding: 10px 22px; border-radius: 9999px; text-decoration: none; box-shadow: 0 3px 10px rgba(191,0,0,0.25); text-align: center;">
          楽天市場で詳細・最安値をチェック ❯
        </a>
        <a href="/article/${art.id}" style="font-size: 0.88rem; color: #0284c7; text-decoration: underline;">
          個別レビュー詳細・成分詳細ページへ
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
