import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series9_items.json', 'utf8'));

export const hairItemsRaw = batchData.hairItems;
export const eyeItemsRaw = batchData.eyeItems;
export const lashItemsRaw = batchData.lashItems;

console.log(`🍂 2026秋コスメ特集 第9弾 アイテム数: ヘアケア=${hairItemsRaw.length}, 単色アイシャドウ=${eyeItemsRaw.length}, まつ毛美容液=${lashItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hair' ? 'hrs' : category === 'eye' ? 'sgl' : 'lsh';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn9-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'ヘアケア・スタイリング・アホ毛スティック・まとめ髪・ヘアバーム・静電気対策・保湿・2026秋';
  let descType = '秋の乾燥した空気やニットの静電気によるトップのアホ毛・パサつき・広がりをサッと撫でるだけで瞬時に抑え、艶やかで品のあるまとめ髪を作るヘアスティック＆高保湿ヘアバーム';
  let features = [
    '手を汚さずにマスカラ感覚でアホ毛や乱れた前髪をピンポイント補正し、自然にキープ',
    '植物性シアバターや天然オイル配合で、固まらずしっとり柔らかな濡れ髪ニュアンスが持続',
    '楽天市場公式・優良店舗でポイント還元＆まとめ買いに最適'
  ];
  
  if (category === 'eye') {
    catName = 'メイクアップ・アイシャドウ・単色アイシャドウ・クリームアイシャドウ・濡れツヤ・まぶた乾燥・2026秋';
    descType = '秋の冷たい外気でカサつきやすいデリケートな目元にピタッと密着し、粉飛びゼロで一日中濡れたような色気と深みを与える高密着単色アイシャドウ＆リキッドアイカラー';
    features = [
      '美容オイルやスフレベースの密着フォーミュラで、乾燥したまぶたにも二重幅にたまらずフィット',
      '指一本でサッと塗るだけで、上品な立体感と光の陰影を生み出す洗練された秋カラー',
      '楽天市場公式取扱ショップにて安心の正規品・ポイント還元でお得に購入可能'
    ];
  } else if (category === 'lash') {
    catName = 'スキンケア・目元ケア・まつ毛美容液・アイラッシュセラム・まつ育・まゆ毛ケア・ハリコシ・2026秋';
    descType = '夏の紫外線ダメージや秋の乾燥・摩擦で抜けやすく細くなったまつ毛と眉毛を根本から集中補修し、ハリ・コシ・長さのある豊かな目元を育てる高機能まつ毛美容液';
    features = [
      'ペプチドや高濃度美容成分がまつ毛の毛周期をサポートし、根元からピンと上向く存在感へ',
      'デリケートな目元にも染みにくい低刺激処方で、毎日のスキンケアに心地よくプラス',
      '大人気サロン専売正規品からドラッグストア定番まで楽天市場で安心購入可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のパーツ・コンディション特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第9弾10選'],
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
      '適量の塗布と日々の継続使用が美しい仕上がりのポイント'
    ],
    rating: Number((Math.min(5, Math.max(4.2, item.reviewAverage || 4.6))).toFixed(1)),
    relatedItemCodes: []
  };
}

export const hairArticles = hairItemsRaw.map((it, idx) =>
  createProductArticle(it, 'hair', ['ヘアスティック', 'アホ毛対策', 'ヘアバーム', '前髪キープ', '静電気防止'], 'autumn-hair-stick-balm-flyaway-10', idx)
);

export const eyeArticles = eyeItemsRaw.map((it, idx) =>
  createProductArticle(it, 'eye', ['単色アイシャドウ', '濡れツヤ', 'クリームアイシャドウ', '乾燥まぶた', '秋カラー'], 'autumn-single-eyeshadow-wet-glow-10', idx)
);

export const lashArticles = lashItemsRaw.map((it, idx) =>
  createProductArticle(it, 'lash', ['まつ毛美容液', 'アイラッシュセラム', 'まつ育', '目元ケア', 'ハリコシ'], 'autumn-eyelash-serum-nourishing-lash-10', idx)
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
    ...hairArticles,
    ...eyeArticles,
    ...lashArticles
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
  console.log(`✅ articles.json に秋コスメ第9弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
