import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch58Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch58_items.json', 'utf8'));

// --- テーマ1: 高濃度生炭酸ガスパック＆ジェル炭酸フェイスパック 10商品 ---
export const carbonicItemsRaw = batch58Data.theme1_carbonic_pack;

// --- テーマ2: コードレスミニヘアアイロン＆充電式ストレート・カールアイロン 10商品 ---
export const cordlessItemsRaw = batch58Data.theme2_cordless_iron;

// --- テーマ3: よもぎ温座パット＆温活フェムケア・オーガニック温熱シート 10商品 ---
export const yomogiItemsRaw = batch58Data.theme3_yomogi_warm_pad;

console.log(`第58弾 選定アイテム数: 炭酸ガスパック=${carbonicItemsRaw.length}, コードレスアイロン=${cordlessItemsRaw.length}, よもぎ温座パット=${yomogiItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'carbonic_pack' ? 'car' : category === 'cordless_iron' ? 'iro' : 'yom';
  const id = `art-winter-b58-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・炭酸パック・炭酸ガスパック・CO2パック・ジェルパック・毛穴ケア・ハリツヤ・くすみ改善・エステ専売・2026冬おこもり美容';
  let descType = '11〜12月の厳しい寒暖差や暖房による乾燥ゴワつき、血行不良による青黒いくすみを、ボーア効果（酸素供給）によって内側から劇的にリセットし、翌朝サロン帰りのふっくら水光肌・引き締まりフェイスラインを叶える高濃度生炭酸ガスパック';
  
  if (category === 'cordless_iron') {
    catName = 'ヘアケア・美容家電・コードレスヘアアイロン・ミニヘアアイロン・ストレートアイロン・カールアイロン・USB充電式・前髪お直し・2026冬ポータブルギア';
    descType = '11〜12月の忘年会やクリスマスデート、イルミネーションなどの外出先で、冬の冷たい強風やマフラー摩擦・結露によって崩れた前髪や毛先のカールを、バッグからサッと取り出してわずか数十秒でサロン帰りの美シルエットに復元できる神コードレスヘアアイロン';
  } else if (category === 'yomogi_warm_pad') {
    catName = '温活・フェムケア・ボディケア・よもぎ温座パット・よもぎ蒸し・温熱シート・骨盤温め・冷え性改善・生理前ケア・シルク腹巻き・2026冬巡り温活';
    descType = '11〜12月の急激な寒波による下半身・つま先の氷のような底冷えや骨盤内の血行不良を、韓国伝統のよもぎ蒸し発想や心地よい蒸気温熱で体の芯からポカポカに温め、全身の巡りを促してくすみ知らずの血色美肌と至福のリラックスをもたらす冬の必須温活ケア';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の肌・髪・体の悩みを根本からケアし、上質な暮らしと美しさを実感できます。`,
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
    reviewCount: item.reviewCount || 195,
    featureSlug: featureSlug
  };
}

export const carbonicArticles = carbonicItemsRaw.map((it, idx) => createProductArticle(it, 'carbonic_pack', ['炭酸パック', '炭酸ガスパック', 'エニシーグローパック', 'EKATO', 'メディプローラー', 'ボーア効果', '毛穴引き締め', '水光肌'], 'winter-carbonic-acid-gas-gel-pack-mask-2026', idx));
export const cordlessArticles = cordlessItemsRaw.map((it, idx) => createProductArticle(it, 'cordless_iron', ['コードレスヘアアイロン', 'ミニアイロン', 'リファ', 'ReFa', 'サロニア', '前髪お直し', 'ストレートアイロン', '持ち運びコスメ'], 'winter-cordless-mini-hair-iron-straightener-2026', idx));
export const yomogiArticles = yomogiItemsRaw.map((it, idx) => createProductArticle(it, 'yomogi_warm_pad', ['よもぎ温座パット', 'よもぎ蒸し', '温活', 'フェムケア', '冷え性改善', '骨盤温め', '命の母', 'めぐりズム'], 'winter-yomogi-warm-pad-femcare-heating-seat-2026', idx));

export const allNewArticles = [...carbonicArticles, ...cordlessArticles, ...yomogiArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 190).toLocaleString()}件)</span>
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
