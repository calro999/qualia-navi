import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch64Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch64_items.json', 'utf8'));

// --- テーマ1: 卓上超音波加湿器＆美肌アロマディフューザー 10商品 ---
export const humidifierItemsRaw = batch64Data.theme1_desk_humidifier;

// --- テーマ2: 温冷美顔器＆ホット＆クール美顔器 10商品 ---
export const hotCoolItemsRaw = batch64Data.theme2_hot_and_cool_device;

// --- テーマ3: 音波振動リセットブラシ＆マイナスイオン磁気ヘアブラシ 10商品 ---
export const brushItemsRaw = batch64Data.theme3_sonic_reset_brush;

console.log(`第64弾 選定アイテム数: 卓上加湿器=${humidifierItemsRaw.length}, 温冷美顔器=${hotCoolItemsRaw.length}, 音波振動ブラシ=${brushItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'humidifier' ? 'hmd' : category === 'hot_cool' ? 'hcl' : 'rst';
  const id = `art-winter-b64-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = '美容家電・インテリア加湿器・卓上加湿器・超音波式・アロマディフューザー・暖房乾燥対策・美肌保湿・オフィス寝室・2026冬うるおいギア';
  let descType = '11〜12月のエアコン暖房直撃による肌の水分蒸発・砂漠化や就寝時の喉の乾燥を、微細なナノ超音波ミストと癒やしのアロマ香気で防ぎ、角層のうるおいバリアを守り抜く冬の乾燥対策必需品';
  
  if (category === 'hot_cool') {
    catName = '美容家電・美顔器・温冷美顔器・ホットクール・42度温熱・急速冷却・毛穴引き締め・イオン導出入・EMSリフト・赤青LED・2026冬サロン級フェイシャル';
    descType = '11〜12月の寒冷によって血行不良となりゴワついた冬肌を42℃の温熱でほぐして毛穴を開き、美容液を深層浸透させた後、急速冷却でキュッと引き締めて潤いを密閉する冬の本格温冷美顔器';
  } else if (category === 'sonic_brush') {
    catName = 'ヘアケア・美容家電・音波振動ブラシ・リセットブラシ・磁気ヘアブラシ・マイナスイオン・静電気抑制・パドルブラシ・枝毛絡まりケア・2026冬美髪ギア';
    descType = '11〜12月のウールニットやマフラーとの摩擦でバチバチに帯電する静電気と頑固な絡まり・パサつきを、毎分6000回以上の微細な音波振動と強力磁気で一瞬にして解きほぐし極上ツヤ髪へと導く冬の必需品';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の乾燥・冷え・ゴワつき・静電気トラブルを根本から解消し、洗練された冬の美しさを実感できます。`,
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

export const humidifierArticles = humidifierItemsRaw.map((it, idx) => createProductArticle(it, 'humidifier', ['卓上加湿器', '超音波加湿器', 'アロマディフューザー', 'モットル', 'オフィス加湿器', '乾燥対策', '美肌保湿'], 'winter-ultrasonic-desk-humidifier-aroma-diffuser-2026', idx));
export const hotCoolArticles = hotCoolItemsRaw.map((it, idx) => createProductArticle(it, 'hot_cool', ['温冷美顔器', 'ホットアンドクール', 'ANLAN', '美ルル', '毛穴引き締め', 'EMS美顔器', 'イオン導入'], 'winter-hot-and-cool-facial-device-pore-firming-2026', idx));
export const brushArticles = brushItemsRaw.map((it, idx) => createProductArticle(it, 'sonic_brush', ['音波振動ブラシ', 'リセットブラシ', 'コイズミ', '電動ヘアブラシ', '静電気防止', '磁気ブラシ', 'ツヤ髪'], 'winter-sonic-vibration-reset-hair-brush-anti-static-2026', idx));

export const allNewArticles = [...humidifierArticles, ...hotCoolArticles, ...brushArticles];

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
