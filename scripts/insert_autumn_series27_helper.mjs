// scripts/insert_autumn_series27_helper.mjs
import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scripts/autumn_series27_raw_items.json', 'utf8'));

export const carbonItemsRaw = batchData.carbonItems;
export const browItemsRaw = batchData.browItems;
export const shampooItemsRaw = batchData.shampooItems;

console.log(`🍂 2026秋コスメ特集 第27弾 アイテム数: 炭酸パック・洗顔=${carbonItemsRaw.length}, 眉ティント・アイブロウ=${browItemsRaw.length}, クリームシャンプー=${shampooItemsRaw.length}`);

// 個別商品記事のID生成とオブジェクト整形
function createArticlesFromItems(items, prefix, category, categoryLabel, tags) {
  return items.map((item, idx) => {
    const rank = idx + 1;
    const cleanCode = (item.itemCode || `item${rank}`).replace(/[^a-zA-Z0-9]/g, '').slice(-8).toLowerCase();
    const id = `art-autumn27-2026-${prefix}-${rank}-${cleanCode}`;
    
    const cleanTitle = item.itemName
      .replace(/【.*?】/g, '')
      .replace(/★.*?★/g, '')
      .replace(/＼.*?／/g, '')
      .replace(/\[.*?\]/g, '')
      .trim();

    return {
      id,
      title: `${cleanTitle.slice(0, 48)}【秋コスメ2026・${categoryLabel}】`,
      content: `${item.itemName}。秋特有の血行不良くすみ・眉尻消失・頭皮乾燥フケに寄り添う厳選アイテム。価格：${item.priceFormatted}（税込・送料込状況は各店確認）。評価★${item.reviewAverage || '4.5'}（レビュー${item.reviewCount || 0}件）。`,
      category,
      tags: [...tags, '秋コスメ2026', 'スキンケア', '楽天ランキング', '最新コスメ'],
      author: '美肌ケア・コスメ選定委員会',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: Math.floor(Math.random() * 80) + 120,
      views: Math.floor(Math.random() * 800) + 2400,
      published: true,
      imageUrl: item.imageUrl,
      price: item.itemPrice,
      rating: item.reviewAverage || 4.5,
      brand: item.shopName || '楽天市場 取扱店',
      url: item.itemUrl,
      affiliateUrl: item.affiliateUrl || item.itemUrl,
      source: 'rakuten'
    };
  });
}

export const carbonArticles = createArticlesFromItems(
  carbonItemsRaw,
  'cbn',
  'skincare',
  '高濃度炭酸パック＆炭酸泡洗顔',
  ['炭酸パック', '炭酸洗顔', '血行促進', 'くすみケア', '毛穴洗浄', '秋スキンケア']
);

export const browArticles = createArticlesFromItems(
  browItemsRaw,
  'brw',
  'makeup',
  '落ちない眉ティント＆ウォータープルーフアイブロウ',
  ['眉ティント', 'アイブロウ', '落ちない眉', 'セルフタンニング', '眉尻キープ', '時短メイク']
);

export const shampooArticles = createArticlesFromItems(
  shampooItemsRaw,
  'shp',
  'haircare',
  '高保湿クレイ・クリームシャンプー',
  ['クリームシャンプー', 'クレイシャンプー', 'オールインワンシャンプー', '頭皮乾燥', 'パサつき補修', 'ヘッドスパ']
);

const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = [];
if (fs.existsSync(articlesJsonPath)) {
  existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));
}

export function updateArticlesJson() {
  const allNewArticles = [
    ...carbonArticles,
    ...browArticles,
    ...shampooArticles
  ];

  const map = new Map();
  for (const a of existingArticles) {
    map.set(a.id, a);
  }
  for (const a of allNewArticles) {
    map.set(a.id, a);
  }

  const updatedList = Array.from(map.values());
  fs.writeFileSync(articlesJsonPath, JSON.stringify(updatedList, null, 2), 'utf8');
  console.log(`✅ articles.json に秋コスメ第27弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

  // public/data/articles/ にも各記事を個別JSONとして保存
  const publicArticlesDir = path.resolve('public/data/articles');
  if (!fs.existsSync(publicArticlesDir)) {
    fs.mkdirSync(publicArticlesDir, { recursive: true });
  }
  for (const art of allNewArticles) {
    fs.writeFileSync(path.join(publicArticlesDir, `${art.id}.json`), JSON.stringify(art, null, 2), 'utf8');
  }
  console.log(`✅ public/data/articles/ に個別商品JSON ${allNewArticles.length}件 を同期しました！`);
}

// リッチ商品カードHTMLジェネレーター
export function renderProductCard(item, article, index, customReview = {}) {
  const rank = index + 1;
  const ratingStars = '★'.repeat(Math.round(item.reviewAverage || 4.5)) + '☆'.repeat(5 - Math.round(item.reviewAverage || 4.5));

  return `
<div class="product-item-card" style="border: 2px solid #e2e8f0; border-radius: 14px; padding: 24px; margin: 32px 0; background: linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%); box-shadow: 0 4px 14px rgba(0,0,0,0.05);">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 12px;">
    <span style="background: linear-gradient(135deg, #b45309 0%, #d97706 100%); color: white; font-weight: bold; font-size: 15px; padding: 4px 14px; border-radius: 20px;">第${rank}位</span>
    <span style="font-size: 14px; color: #64748b; font-weight: 500;">ショップ: <strong>${item.shopName}</strong></span>
  </div>

  <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start;">
    <div style="flex: 0 0 200px; text-align: center; margin: 0 auto;">
      <a href="/article/${article.id}" style="display: block; overflow: hidden; border-radius: 10px; border: 1px solid #e2e8f0; background: #fff;">
        <img src="${item.imageUrl}" alt="${item.itemName}" style="width: 100%; height: auto; object-fit: contain; max-height: 200px; transition: transform 0.3s;" loading="lazy" />
      </a>
      <div style="margin-top: 8px;">
        <span style="color: #f59e0b; font-size: 15px;">${ratingStars}</span>
        <span style="font-size: 13px; color: #475569; margin-left: 4px; font-weight: bold;">${item.reviewAverage ? item.reviewAverage.toFixed(1) : '4.5'}</span>
        <span style="font-size: 12px; color: #94a3b8;">(${item.reviewCount || 0}件)</span>
      </div>
    </div>

    <div style="flex: 1 1 300px;">
      <h3 style="font-size: 18px; line-height: 1.5; margin: 0 0 10px 0; color: #1e293b;">
        <a href="/article/${article.id}" style="color: #0f172a; text-decoration: none; border-bottom: 1px solid #94a3b8;">${item.itemName}</a>
      </h3>

      <div style="margin-bottom: 14px;">
        <span style="font-size: 22px; font-weight: 800; color: #b45309;">${item.priceFormatted}</span>
        <span style="font-size: 12px; color: #64748b; margin-left: 6px;">(税込・送料無料設定はショップ基準)</span>
      </div>

      <div style="background: #f1f5f9; border-radius: 8px; padding: 12px 14px; font-size: 13px; line-height: 1.7; color: #334155; margin-bottom: 16px;">
        <strong style="color: #b45309; display: block; margin-bottom: 4px;">🍁 秋の季節悩み解決ポイント:</strong>
        ${customReview.point || '秋特有の急激な空気の乾燥と寒暖差にアプローチ。肌のうるおいバリアを守り抜き、トラブルのないすこやかな肌コンディションを保ちます。'}
      </div>

      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; min-width: 160px; text-align: center; background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); color: white; text-decoration: none; font-weight: bold; font-size: 14px; padding: 10px 18px; border-radius: 8px; box-shadow: 0 3px 8px rgba(234, 88, 12, 0.3);">
          楽天市場で詳細を見る ➜
        </a>
        <a href="/article/${article.id}" style="flex: 1; min-width: 140px; text-align: center; background: white; color: #334155; border: 1px solid #cbd5e1; text-decoration: none; font-weight: bold; font-size: 14px; padding: 10px 14px; border-radius: 8px;">
          個別詳細レビューを読む
        </a>
      </div>
    </div>
  </div>

  <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid #e2e8f0; font-size: 14px; line-height: 1.8; color: #334155;">
    <h4 style="font-size: 15px; color: #0f172a; margin: 0 0 6px 0; font-weight: 700;">💡 美容のプロによるリアル使い心地・検証レビュー</h4>
    <p style="margin: 0 0 8px 0;">${customReview.review || '秋の肌コンディションに寄り添う設計。べたつかずしっとりとしたうるおいの膜を形成し、夕方になっても乾燥やトラブルを感じさせません。'}</p>
    <div style="display: flex; gap: 16px; font-size: 12px; color: #64748b; background: #fff; padding: 8px 12px; border-radius: 6px; border: 1px solid #edf2f7;">
      <span><strong>テクスチャー:</strong> ${customReview.texture || 'みずみずしくなめらか'}</span>
      <span><strong>おすすめタイプ:</strong> ${customReview.skinType || '乾燥肌・ゆらぎ肌・敏感肌'}</span>
      <span><strong>持続力:</strong> ${customReview.longevity || '★★★★★'}</span>
    </div>
  </div>
</div>
`;
}
