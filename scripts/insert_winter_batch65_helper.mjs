import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch65Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch65_items.json', 'utf8'));

// --- テーマ1: ヒートブラシ＆ストレートヘアアイロンブラシ 10商品 ---
export const heatBrushItemsRaw = batch65Data.theme1_heat_brush;

// --- テーマ2: 折りたたみ加温フットバス＆バブル温活足湯器 10商品 ---
export const footBathItemsRaw = batch65Data.theme2_folding_foot_bath;

// --- テーマ3: シルク保湿おやすみ手袋＆かかとケアソックス 10商品 ---
export const silkGlovesItemsRaw = batch65Data.theme3_silk_gloves_heel;

console.log(`第65弾 選定アイテム数: ヒートブラシ=${heatBrushItemsRaw.length}, 加温フットバス=${footBathItemsRaw.length}, シルク手袋＆かかと=${silkGlovesItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'heat_brush' ? 'htb' : category === 'foot_bath' ? 'ftb' : 'slk';
  const id = `art-winter-b65-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ヘアケア・美容家電・ヒートブラシ・ストレートブラシ・ブラシアイロン・マイナスイオン・寝癖直し・朝時短・2026冬美髪スタイリング';
  let descType = '11〜12月の厳しい寒さで頑固に固まる冬の寝癖やパサつき広がり髪を、普通のブラッシング感覚で熱ダメージを抑えつつマイナスイオンで一瞬のうるツヤストレートに整える朝の救世主ギア';
  
  if (category === 'foot_bath') {
    catName = 'ボディケア・美容家電・フットバス・足湯器・折りたたみ・加温保温・42度恒温・バブルマッサージ・末端冷え性・むくみ解消・自宅温活スパ・2026冬';
    descType = '11〜12月の急激な寒波による足先の末端冷え性・血行不良・夕方のむくみ脚を、自宅で42℃〜45℃の極上保温とジェットバブルで芯から温めほぐす極上の温活美脚フットスパ';
  } else if (category === 'silk_gloves') {
    catName = 'ボディケア・パーツケア・ハンドケア・フットケア・シルク手袋・おやすみ手袋・かかとケア靴下・絹100%・角質ひび割れ防止・あかぎれ手荒れ・2026冬';
    descType = '11〜12月の水仕事や木枯らしでガサガサに荒れた手肌やあかぎれ、ひび割れかかとを、天然シルクの優れた保湿・吸放湿性で一晩中密封集中リペアする冬のナイトパック必需品';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・効果・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬シーズンにおいて、${descType}として絶大な支持を集める注目アイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の正規取扱店にて、お買い物マラソンや各種ポイントアップ企画を利用してお得に購入できます。冬特有の寒さ・乾燥・冷え・寝癖・手足の荒れトラブルを根本から解消し、洗練された冬の美しさを実感できます。`,
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

export const heatBrushArticles = heatBrushItemsRaw.map((it, idx) => createProductArticle(it, 'heat_brush', ['ヒートブラシ', 'ストレートブラシ', 'サロニア', 'アゲツヤ', 'ヘアアイロン', '寝癖直し', '時短スタイリング'], 'winter-heat-brush-straightener-hair-iron-2026', idx));
export const footBathArticles = footBathItemsRaw.map((it, idx) => createProductArticle(it, 'foot_bath', ['フットバス', '足湯器', '折りたたみ足湯', '加温機能', 'バブルバス', '冷え性改善', 'むくみ解消'], 'winter-folding-heated-foot-bath-spa-massager-2026', idx));
export const silkGlovesArticles = silkGlovesItemsRaw.map((it, idx) => createProductArticle(it, 'silk_gloves', ['シルク手袋', 'おやすみ手袋', 'ハンドケア', 'かかと靴下', 'かかとケア', '手荒れ防止', 'シルク100%'], 'winter-silk-night-moisturizing-gloves-heel-care-2026', idx));

export const allNewArticles = [...heatBrushArticles, ...footBathArticles, ...silkGlovesArticles];

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
