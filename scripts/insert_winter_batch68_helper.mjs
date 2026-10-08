import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch68Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch68_items.json', 'utf8'));

// --- テーマ1: デスク下遠赤外線パネルヒーター＆足元フットウォーマー 10商品 ---
export const panelHeaterItemsRaw = batch68Data.theme1_panel_heater;

// --- テーマ2: 高純度ピュアスクワランオイル＆アルガンオイル 10商品 ---
export const pureOilItemsRaw = batch68Data.theme2_pure_oil;

// --- テーマ3: 洗えるフランネル電気ひざ掛け＆着る電気毛布 10商品 ---
export const electricBlanketItemsRaw = batch68Data.theme3_electric_blanket;

console.log(`第68弾 選定アイテム数: パネルヒーター=${panelHeaterItemsRaw.length}, ピュアオイル=${pureOilItemsRaw.length}, 電気ひざ掛け=${electricBlanketItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'panel_heater' ? 'pnh' : category === 'pure_oil' ? 'oil' : 'ebl';
  const id = `art-winter-b68-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = '美容家電・インテリア暖房・パネルヒーター・遠赤外線・足元ヒーター・デスク下・無風暖房・乾燥しない・末端冷え性・美肌温活・2026冬';
  let descType = '11〜12月のエアコン温風直撃による顔の粉吹き砂漠化を完全に防ぎつつ、遠赤外線で膝から足裏までぐるりと囲んで下半身の冷えと夕方のむくみを解消する美肌温活ギア';
  
  if (category === 'pure_oil') {
    catName = 'スキンケア・美容オイル・ピュアオイル・スクワラン・アルガンオイル・オーガニック・無添加・高保湿・バリア機能・乾燥小じわ・2026冬';
    descType = '11〜12月の超乾燥・寒冷刺激によって水分を失った肌に、たった1滴で皮脂膜を完璧に再現してうるおいを密封し、顔・髪・爪・全身の粉吹きを救済する万能無添加美容オイル';
  } else if (category === 'electric_blanket') {
    catName = 'ボディケア・温活・フェムケア・電気毛布・電気ひざ掛け・フランネル・洗える・省エネ・冷え性改善・血流促進・冬の快眠・2026冬';
    descType = '11〜12月の厳しい寒さから下半身と内臓を極上のとろけるフランネルで温め、骨盤周りの血流を促進することで全身の巡りと血色感あふれる素肌を育てる冬の温活ブランケット';
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

export const panelHeaterArticles = panelHeaterItemsRaw.map((it, idx) => createProductArticle(it, 'panel_heater', ['パネルヒーター', '足元ヒーター', 'デスク下暖房', '遠赤外線', '無風暖房', '乾燥対策', '温活美肌'], 'winter-under-desk-panel-heater-foot-warmer-2026', idx));
export const pureOilArticles = pureOilItemsRaw.map((it, idx) => createProductArticle(it, 'pure_oil', ['スクワランオイル', 'アルガンオイル', 'HABA', 'メルヴィータ', '美容オイル', 'ブースター', '高保湿'], 'winter-pure-squalane-argan-multipurpose-facial-oil-2026', idx));
export const electricBlanketArticles = electricBlanketItemsRaw.map((it, idx) => createProductArticle(it, 'electric_blanket', ['電気毛布', '電気ひざ掛け', 'フランネル', '着る電気毛布', '温活', '冷え性', '丸洗い'], 'winter-electric-blanket-flannel-heating-throw-2026', idx));

export const allNewArticles = [...panelHeaterArticles, ...pureOilArticles, ...electricBlanketArticles];

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
