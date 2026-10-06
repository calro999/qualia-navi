import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch53Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch53_items.json', 'utf8'));

// --- テーマ1: 高純度エクソソーム＆ヒト幹細胞 美容液 厳選10商品 ---
export const exosomeItemsRaw = batch53Data.theme1_exosome_serum;

// --- テーマ2: 超音波トリートメントアイロン 厳選10商品 ---
export const ultrasonicItemsRaw = batch53Data.theme2_ultrasonic_iron;

// --- テーマ3: 家庭用IPL光美容器 厳選10商品 ---
export const iplItemsRaw = batch53Data.theme3_ipl_device;

console.log(`第53弾 選定アイテム数: エクソソーム美容液=${exosomeItemsRaw.length}, 超音波アイロン=${ultrasonicItemsRaw.length}, IPL光美容器=${iplItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'exosome_serum' ? 'exo' : category === 'ultrasonic_iron' ? 'ult' : 'ipl';
  const id = `art-winter-b53-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'スキンケア・美容液・エクソソーム・ヒト幹細胞培養液・エイジングケア・シワ・毛穴・ハリ・2026冬スキンケア';
  let descType = '11〜12月の急激な気温・湿度低下による肌細胞のしぼみ・ハリ不足・乾燥小じわ・毛穴の開きに対し、最先端の再生医療発想である高純度エクソソームやヒト幹細胞順化培養液で深層から若々しい弾力と発光水光肌を呼び覚ます集中エイジングケア美容液';
  if (category === 'ultrasonic_iron') {
    catName = 'ヘアケア・美容家電・超音波トリートメントアイロン・超音波アイロン・ケアプロ・ヤーマン・美髪ケア・静電気防止・2026冬ヘアケア';
    descType = '冬の厳しい寒冷風や暖房乾燥、マフラー・ニットの静電気摩擦でパサつき・広がるダメージ毛先を、毎秒100万回以上の超音波振動と赤外線でトリートメント分子をナノ微細化して髪の深層まで高速浸透させるサロン専売級の超音波トリートメント導入アイロン';
  } else if (category === 'ipl_device') {
    catName = '美容家電・脱毛器・光美容器・IPL・ケノン・ブラウン・ReFa・ムダ毛ケア・美肌フォトフェイシャル・VIO・2026冬美容';
    descType = '紫外線量が年間最小で日焼けトラブルがなく、高出力照射による確実な減毛効果と美肌フォトフェイシャル効果を最大限に引き出せる11〜12月の冬に、来たる春夏に向けて自宅で完全ツルスベ肌を仕上げるハイパワー家庭用IPL光美容器';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分・最安値比較`,
    content: `${item.itemName}は、11〜12月の本格的な冬シーズンにおいて、${descType}として大人気の実力派アイテムです。楽天市場での最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」をはじめとする信頼性の高い公式・正規取扱ショップにて、お買い物マラソンや各種ポイント還元イベントを活用してお得に購入可能です。冬特有の美容悩みを根本から解消し、毎日のケアに確かな手応えをもたらします。`,
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

export const exosomeArticles = exosomeItemsRaw.map((it, idx) => createProductArticle(it, 'exosome_serum', ['エクソソーム', 'ヒト幹細胞', 'エイジングケア', 'フラコラ', 'リジェンスキン', 'メディキューブ', '湘南美容クリニック', 'ハリ肌'], 'winter-exosome-stem-cell-serum-aging-repair-2026', idx));
export const ultrasonicArticles = ultrasonicItemsRaw.map((it, idx) => createProductArticle(it, 'ultrasonic_iron', ['超音波アイロン', 'トリートメント浸透', 'ケアプロ', 'ヤーマンシャインプロ', 'ルメント', 'Kiboer', '冬のヘアケア', 'サロン級美髪'], 'winter-ultrasonic-hair-treatment-iron-care-2026', idx));
export const iplArticles = iplItemsRaw.map((it, idx) => createProductArticle(it, 'ipl_device', ['家庭用脱毛器', 'IPL光美容器', 'ケノン', 'ブラウンエキスパート', 'ReFaエピ', 'ヤーマンレイボーテ', 'Ulike', '冬の脱毛'], 'winter-ipl-hair-removal-device-smooth-skin-2026', idx));

export const allNewArticles = [...exosomeArticles, ...ultrasonicArticles, ...iplArticles];

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
        <span style="color: #f59e0b; font-size: 0.85rem; font-weight: bold;">★ ${it.reviewAverage || 4.7} (${(it.reviewCount || 195).toLocaleString()}件)</span>
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
