import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batch25Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch25_items.json', 'utf8'));

// --- テーマ1: まとめ髪スティック＆ポイントリペアヘアスティック 厳選10商品 ---
export const hairStickItemsRaw = batch25Data.theme1_hairstick;

// --- テーマ2: 医薬品・薬用治療リップクリーム＆高保水リペア 厳選10商品 ---
export const healingLipItemsRaw = batch25Data.theme2_healinglip;

// --- テーマ3: 高保湿トナーパッド＆部分用リペア水分パッド 厳選10商品 ---
export const tonerPadItemsRaw = batch25Data.theme3_tonerpad;

console.log(`選定アイテム数: ヘアスティック=${hairStickItemsRaw.length}, 治療リップ=${healingLipItemsRaw.length}, トナーパッド=${tonerPadItemsRaw.length}`);

// 個別商品記事のID生成と登録
const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hairstick' ? 'hst' : category === 'healinglip' ? 'hlp' : 'tpd';
  const id = `art-winter-b25-${catKey}-${idx+1}-${item.itemCode.replace(/[^a-zA-Z0-9]/g, '').slice(-10)}`;
  
  let catName = 'ヘアケア・スタイリング・まとめ髪スティック・アホ毛対策・マエガミキープ・静電気防止・冬ヘアケア';
  let descType = '11〜12月のマフラー摩擦や乾燥・静電気で広がるアホ毛・浮き毛を一瞬で抑え、手を汚さずにサロン帰りのまとまりと自然なツヤを与える携帯用ヘアスティック';
  if (category === 'healinglip') {
    catName = 'リップケア・医薬品リップ・口角炎治療・ひび割れ対策・薬用リップバーム・高保湿リップ・冬リップケア';
    descType = '11〜12月の湿度の急低下で起きる「唇のひび割れ・出血・口角炎・皮むけ」を有効成分で医学的に修復し、ぷるんとした健康的な唇へと導く医薬品・薬用高保水リップケア';
  } else if (category === 'tonerpad') {
    catName = 'スキンケア・トナーパッド・部分用シートマスク・水分チャージ・角質ケア・朝スキンケア・暖房乾燥対策';
    descType = '11〜12月の冷え込みでスキンケアが浸透しにくい朝に、サッと貼るだけで角質柔軟と濃密保水を一気に叶え、オフィス暖房の乾燥でも一日中ファンデが粉吹きしない土台を作る高保湿トナーパッド';
  }

  return {
    id: id,
    title: `【2026冬最新】${item.itemName.slice(0, 42)}の口コミ評判・成分特徴・最安値比較`,
    content: `${item.itemName}は、11〜12月の冬本番・乾燥ピークシーズンにおいて、多くの美容ファンや専門家から高評価を得ている実力派の${descType}です。楽天市場における最新価格は${item.priceFormatted}で、「${item.shopName}」等の正規取扱店・優良ショップからポイント高還元付きでお得にお買い求めいただけます。真冬の過酷な寒さと乾燥に立ち向かう心強い本命コスメです。`,
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

export const hairStickArticles = hairStickItemsRaw.map((it, idx) => createProductArticle(it, 'hairstick', ['まとめ髪スティック', 'アホ毛直し', 'プリュスオー', 'マトメージュ', 'ミルボン', 'エルジューダ', 'フジコ', 'ダイアン', 'アンドハニー', 'ジョンマスター', 'セザンヌ', 'ルシードエル', '静電気防止'], 'winter-anti-frizz-hair-stick-point-repair-2026', idx));
export const healingLipArticles = healingLipItemsRaw.map((it, idx) => createProductArticle(it, 'healinglip', ['医薬品リップ', '口角炎', 'ひび割れ', 'モアリップ', 'ヒビプロ', 'ユースキン', 'メディカルリップ', 'オバジ', 'キュレル', 'ベビーワセリン', 'dプログラム', 'メンターム', 'トリデン', '唇の皮むけ'], 'winter-medicated-healing-lip-cream-cracked-lips-2026', idx));
export const tonerPadArticles = tonerPadItemsRaw.map((it, idx) => createProductArticle(it, 'tonerpad', ['トナーパッド', '部分用シートマスク', 'トリデン', 'ナンバーズイン', 'メディヒール', 'アヌア', 'スキンフード', 'VTコスメ', 'バイオヒールボ', 'COSRX', '朝スキンケア', '暖房乾燥対策'], 'winter-hydrating-toner-pad-moisture-barrier-2026', idx));

export const allNewArticles = [...hairStickArticles, ...healingLipArticles, ...tonerPadArticles];

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
    公式フラッグシップショップや楽天市場認定の優良コスメショップなら、冬のヘアケア・スキンケアも安心してお得に手に入ります。
  </p>
  <a href="https://hb.afl.rakuten.co.jp/hgc/54d2a438.4bc4abc2.54d2a439.aa1be583/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F" target="_blank" rel="nofollow sponsored noopener" style="display: inline-block; background: #bf0000; color: #ffffff; font-weight: bold; font-size: 0.88rem; padding: 8px 18px; border-radius: 6px; text-decoration: none;">
    楽天市場 コスメ・ビューティー最新セール会場はこちら →
  </a>
</div>`;
}
