import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series12_items.json', 'utf8'));

export const bodyItemsRaw = batchData.bodyItems;
export const removerItemsRaw = batchData.removerItems;
export const washItemsRaw = batchData.washItems;

console.log(`🍂 2026秋コスメ特集 第12弾 アイテム数: ボディミルク=${bodyItemsRaw.length}, リムーバー=${removerItemsRaw.length}, ボディウォッシュ=${washItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'body' ? 'bdm' : category === 'remover' ? 'rmv' : 'bdw';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn12-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'ボディケア・ボディクリーム・ボディミルク・ボディバター・粉吹き・乾燥肌・高保湿・2026秋';
  let descType = '秋の冷え込みと乾燥によって全身が白く粉を吹き、カサカサとかゆみが出やすい素肌を、高純度シアバターやセラミドの濃密な保護膜でしっとり包み込む高保湿ボディミルク＆ボディバター';
  let features = [
    'ヒト型セラミドやオーガニックシアバターが角層のバリア機能を強力にサポートし、粉吹きを瞬時にリセット',
    'ベタつかずスーッと伸び広がり、塗った直後にパジャマを着ても快適な極上のテクスチャー',
    '楽天市場公式・正規取扱店でポイント高還元＆大容量サイズでお得に入手可能'
  ];
  
  if (category === 'remover') {
    catName = 'スキンケア・クレンジング・ポイントメイクリムーバー・アイメイク落とし・低刺激・まつ毛保護・2026秋';
    descType = '秋の乾燥で皮膚が薄くデリケートになった目元や唇を、ゴシゴシ擦らずにするんとオフして摩擦シワや色素沈着を防ぐ低刺激ポイントメイクリムーバー＆マスカラリムーバー';
    features = [
      '2層式オイル＆ウォーターがウォータープルーフマスカラやティントリップを瞬時に浮かせてオフ',
      'ヒアルロン酸や植物エキス配合で、クレンジング後もしっとり潤い、目元の小ジワを予防',
      '楽天市場公式取扱ショップにて安心の正規品・ポイント還元でお得に購入可能'
    ];
  } else if (category === 'wash') {
    catName = 'ボディケア・ボディソープ・ボディウォッシュ・泡タイプ・乾燥かゆみ・セラミド・弱酸性・2026秋';
    descType = '秋の入浴後の急速な水分蒸発や皮脂の落としすぎによるカサつき・かゆみを防ぎ、汚れだけを落として肌のうるおいを守り抜く高保湿セラミドボディウォッシュ＆シャワーオイル';
    features = [
      '天然オイルやセラミド配合の濃密クッション泡が、摩擦レスで肌を優しく包み込みながら洗浄',
      'お風呂上がりの急激なツッパリ感を防ぎ、ボディクリームを塗る前でもしっとり吸い付く素肌をキープ',
      '大人気サロン・デパコス名品からドラッグストア定番まで楽天市場で安心購入可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のパーツ・コンディション特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第12弾10選'],
    createdAt: nowStr,
    updatedAt: nowStr,
    itemCode: item.itemCode,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    priceFormatted: item.priceFormatted,
    shopName: item.shopName,
    affiliateUrl: item.affiliateUrl,
    itemUrl: item.itemUrl,
    imageUrl: item.imageUrl,
    reviewAverage: item.reviewAverage,
    reviewCount: item.reviewCount,
    pros: [
      features[0],
      features[1]
    ],
    cons: [
      '人気アイテムのため入荷待ちやセール時の早期完売に注意',
      '毎日の入浴後やメイクオフ時の正しい使用方法の継続が大切'
    ],
    rating: Number((Math.min(5, Math.max(4.2, item.reviewAverage || 4.6))).toFixed(1)),
    relatedItemCodes: []
  };
}

export const bodyArticles = bodyItemsRaw.map((it, idx) =>
  createProductArticle(it, 'body', ['ボディクリーム', 'ボディミルク', 'ボディバター', '粉吹き防止', '乾燥肌ケア'], 'autumn-body-milk-butter-flaky-skin-10', idx)
);

export const removerArticles = removerItemsRaw.map((it, idx) =>
  createProductArticle(it, 'remover', ['ポイントメイクリムーバー', 'アイメイクリムーバー', '低刺激', '摩擦レス', '目元ケア'], 'autumn-eye-makeup-remover-frictionless-10', idx)
);

export const washArticles = washItemsRaw.map((it, idx) =>
  createProductArticle(it, 'wash', ['ボディウォッシュ', 'ボディソープ', '高保湿', 'セラミド', '乾燥かゆみ防止'], 'autumn-moist-body-wash-dry-itch-10', idx)
);

export function renderProductCard(item, article, highlightCatch, detailedReview, skinFeel, advice) {
  const ratingStars = '★'.repeat(Math.floor(article.rating)) + (article.rating % 1 >= 0.5 ? '☆' : '');

  return `
<div class="my-8 rounded-2xl border border-stone-200/80 bg-stone-50/50 p-6 shadow-sm transition-all hover:shadow-md dark:border-stone-800 dark:bg-stone-900/50">
  <div class="flex flex-col md:flex-row gap-6 items-start">
    <div class="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden bg-white dark:bg-stone-800 flex items-center justify-center p-2 border border-stone-100 dark:border-stone-800 shrink-0">
      <img src="${item.imageUrl}" alt="${item.itemName}" class="object-contain w-full h-full hover:scale-105 transition-transform duration-300" loading="lazy" />
    </div>
    <div class="flex-1 space-y-3">
      <div class="flex flex-wrap items-center gap-2">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
          秋の厳選 ${item.rank}位
        </span>
        <span class="text-xs text-stone-500 dark:text-stone-400 font-medium">${item.shopName}</span>
      </div>
      <h3 class="text-lg md:text-xl font-bold text-stone-900 dark:text-white leading-snug">
        <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
          ${item.itemName}
        </a>
      </h3>
      <p class="text-sm font-semibold text-amber-700 dark:text-amber-300">
        💡 ${highlightCatch}
      </p>
      <div class="flex items-baseline gap-3">
        <span class="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight">${item.priceFormatted}</span>
        <div class="flex items-center text-xs text-amber-500 font-medium">
          <span class="text-amber-500 mr-1">${ratingStars}</span>
          <span class="font-bold text-stone-700 dark:text-stone-300">${item.reviewAverage}</span>
          <span class="text-stone-400 ml-1">(${item.reviewCount.toLocaleString()}件のレビュー)</span>
        </div>
      </div>
      <p class="text-sm text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
        ${detailedReview}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
        <div class="p-2.5 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/50">
          <span class="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">✨ ここが極上ポイント</span>
          <span class="text-emerald-700 dark:text-emerald-400">${skinFeel}</span>
        </div>
        <div class="p-2.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/50">
          <span class="font-bold text-blue-800 dark:text-blue-300 block mb-0.5">📌 プロの使い方アドバイス</span>
          <span class="text-blue-700 dark:text-blue-400">${advice}</span>
        </div>
      </div>
      <div class="pt-3 flex flex-wrap gap-3">
        <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-sm hover:shadow transition-all">
          楽天市場で最新価格・在庫を見る ➜
        </a>
        <a href="/articles/${article.id}" class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-medium text-sm border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
          成分・詳細口コミを読む
        </a>
      </div>
    </div>
  </div>
</div>
`;
}

export function updateArticlesJson() {
  const allNewArticles = [
    ...bodyArticles,
    ...removerArticles,
    ...washArticles
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
  console.log(`✅ articles.json に秋コスメ第12弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
