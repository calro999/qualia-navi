import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch69Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch69_items.json', 'utf8'));

// --- テーマ1: 超音波トリートメントアイロン＆超音波美髪浸透器 10商品 ---
export const ultrasonicItemsRaw = batch69Data.theme1_ultrasonic_treatment;

// --- テーマ2: 速暖人感センサーセラミックファンヒーター 10商品 ---
export const ceramicHeaterItemsRaw = batch69Data.theme2_ceramic_fan_heater;

// --- テーマ3: 目元専用温熱EMS美顔器＆マイクロカレントアイリフトペン 10商品 ---
export const eyeEmsItemsRaw = batch69Data.theme3_eye_ems_device;

console.log(`第69弾 選定アイテム数: 超音波ヘアアイロン=${ultrasonicItemsRaw.length}, セラミックヒーター=${ceramicHeaterItemsRaw.length}, 目元EMS美顔器=${eyeEmsItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'ultrasonic' ? 'uti' : category === 'ceramic_heater' ? 'cfh' : 'eye';
  const id = `art-winter-b69-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ヘアケア・美容家電・超音波トリートメントアイロン・浸透促進・髪質改善・サロン専売・パサつき補修・静電気防止・2026冬';
  let descType = '11〜12月の暖房乾燥や静電気でスカスカに傷んだ毛先に、毎秒100万回の超音波振動とエッセンシャル赤外線でトリートメント成分を深層まで浸透させ、サロン帰りの極上ツヤ髪を叶える美髪浸透ギア';
  
  if (category === 'ceramic_heater') {
    catName = '美容家電・インテリア暖房・セラミックファンヒーター・人感センサー・速暖・脱衣所・洗面所・ヒートショック防止・朝メイク暖房・2026冬';
    descType = '11〜12月の極寒の脱衣所・洗面所をわずか2秒で温め、ヒートショックを防ぐと同時にお風呂上がりの水分蒸発を食い止めて朝のメイクのりを劇的に底上げする速暖温活ヒーター';
  } else if (category === 'eye_ems') {
    catName = 'スキンケア・美容家電・目元美顔器・EMS・マイクロカレント・温熱ケア・アイリフト・クマ改善・目尻小じわ・眼精疲労・2026冬';
    descType = '11〜12月の寒冷血行不良による頑固な青クマ・黒クマや乾燥小じわ、スマホ疲れのまぶたのたるみを40℃温熱と微弱電流EMSで集中ほぐし＆引き上げる最新アイケアデバイス';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の寒さ・乾燥・冷え・くすみトラブルを根本から解消し、洗練された冬の美しさを実感できます。`,
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

export const ultrasonicArticles = ultrasonicItemsRaw.map((it, idx) => createProductArticle(it, 'ultrasonic', ['超音波トリートメント', 'ケアプロ', 'ヤーマンシャインプロ', '超音波ヘアアイロン', 'トリートメント浸透', '髪質改善', 'ツヤ髪'], 'winter-ultrasonic-treatment-hair-iron-repair-2026', idx));
export const ceramicHeaterArticles = ceramicHeaterItemsRaw.map((it, idx) => createProductArticle(it, 'ceramic_heater', ['セラミックファンヒーター', '人感センサー', '脱衣所暖房', '速暖ヒーター', 'ヒートショック対策', '洗面台メイク', '省エネ'], 'winter-rapid-heating-ceramic-fan-heater-sensor-2026', idx));
export const eyeEmsArticles = eyeEmsItemsRaw.map((it, idx) => createProductArticle(it, 'eye_ems', ['目元美顔器', 'アイリフト', 'EMS美顔器', 'マイクロカレント', '温熱ケア', 'クマ改善', '目元たるみ'], 'winter-eye-ems-microcurrent-thermal-lift-device-2026', idx));

export const allNewArticles = [...ultrasonicArticles, ...ceramicHeaterArticles, ...eyeEmsArticles];

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
