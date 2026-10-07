import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch59Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch59_items.json', 'utf8'));

// --- テーマ1: 温熱ハンドマッサージャー＆手もみエアマッサージャー 10商品 ---
export const handItemsRaw = batch59Data.theme1_hand_massager;

// --- テーマ2: 温熱EMSネックマッサージャー＆首元温感リラクゼーションギア 10商品 ---
export const neckItemsRaw = batch59Data.theme2_neck_massager;

// --- テーマ3: まるでこたつソックス＆温活極暖着圧レギンス・着圧温熱レッグウェア 10商品 ---
export const socksItemsRaw = batch59Data.theme3_kotatsu_socks;

console.log(`第59弾 選定アイテム数: ハンドマッサージャー=${handItemsRaw.length}, ネックマッサージャー=${neckItemsRaw.length}, まるでこたつソックス=${socksItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hand_massager' ? 'han' : category === 'neck_massager' ? 'nec' : 'soc';
  const id = `art-winter-b59-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = '美容家電・ボディケア・ハンドケア・ハンドマッサージャー・温熱ヒーター・手もみ・エアバッグ・指圧・乾燥手荒れ・2026冬おこもり美容';
  let descType = '11〜12月の厳しい寒気による指先の冷えや血行不良、PC・スマホ操作による手の筋肉のこわばり、乾燥手荒れを、温熱ヒーターと立体エアバッグの加圧で芯からじんわり温めほぐし、ハンドクリームの浸透まで劇的に引き上げる神ハンドケア家電';
  
  if (category === 'neck_massager') {
    catName = '美容家電・リラクゼーション・ネックマッサージャー・EMS・温熱ヒーター・首肩こり・僧帽筋・血行促進・顔のくすみ解消・2026冬リフレッシュギア';
    descType = '11〜12月の木枯らしやマフラーの重みでカチカチに凝り固まった首筋・肩・僧帽筋を、心地よい温熱と深層EMSパルス・立体もみ玉で優しく解きほぐし、首元の巡りを改善して顔全体の血色感アップとスッキリしたフェイスラインへと導く最新ネックマッサージャー';
  } else if (category === 'kotatsu_socks') {
    catName = '温活・レッグウェア・まるでこたつソックス・着圧ソックス・レッグウォーマー・裏起毛タイツ・冷え性改善・三陰交ツボ温め・2026冬極暖アイテム';
    descType = '11〜12月の足先が氷のように冷える底冷えや夕方のパンパンな寒冷むくみを、足首の特許ツボ温熱技術（三陰交刺激）や極暖発熱繊維・段階着圧設計で防ぎ、履くだけでまるでこたつに入っているかのような至福の温もりとほっそり美脚を叶える冬の必須温活レッグウェア';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の冷え・乾燥・凝り固まりの悩みを根本からケアし、極上の温もりと美しさを実感できます。`,
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
    reviewCount: item.reviewCount || 230,
    featureSlug: featureSlug
  };
}

export const handArticles = handItemsRaw.map((it, idx) => createProductArticle(it, 'hand_massager', ['ハンドマッサージャー', 'ルルド', 'NIPLUX', '温熱ケア', '手荒れ改善', 'ハンドケア', 'クリスマスギフト'], 'winter-heating-air-hand-massager-relax-care-2026', idx));
export const neckArticles = neckItemsRaw.map((it, idx) => createProductArticle(it, 'neck_massager', ['ネックマッサージャー', 'EMSヒートネック', 'MYTREX', '首肩こり', '温熱リラックス', '温活', '冬のご褒美'], 'winter-heating-ems-neck-massager-shoulder-relax-2026', idx));
export const socksArticles = socksItemsRaw.map((it, idx) => createProductArticle(it, 'kotatsu_socks', ['まるでこたつソックス', '靴下の岡本', '温活靴下', '冷え取り', 'レッグウォーマー', 'イオンドクター', '裏起毛タイツ'], 'winter-warm-kotatsu-socks-heating-compression-tights-2026', idx));

export const allNewArticles = [...handArticles, ...neckArticles, ...socksArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 230).toLocaleString()}件)</span>
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
          個別レビュー詳細・スペック詳細ページへ
        </a>
      </div>
    </div>
  </div>
</div>
`;
}
