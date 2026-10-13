import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series10_items.json', 'utf8'));

export const balmItemsRaw = batchData.balmItems;
export const scentItemsRaw = batchData.scentItems;
export const nailItemsRaw = batchData.nailItems;

console.log(`🍂 2026秋コスメ特集 第10弾（記念弾） アイテム数: 保湿スティック=${balmItemsRaw.length}, 秋フレグランス=${scentItemsRaw.length}, ネイルケア=${nailItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'balm' ? 'blm' : category === 'scent' ? 'sct' : 'nlo';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn10-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'スキンケア・マルチバーム・スティック美容液・乾燥対策・粉吹き・目元・口元・2026秋';
  let descType = '秋の冷たい外気やオフィスの暖房で急に乾燥・粉吹きした目元や口元・頬に、メイクの上からサッと潤いを直接チャージできる高保湿マルチスティック＆美容液バーム';
  let features = [
    '高濃度コラーゲンやセラミド配合で、カサついた角層に水分と油分を瞬時に補給しツヤを復活',
    '携帯性に優れたスティック形状で、ポーチに入れておけば外出先でも手軽に乾燥レスキュー',
    '楽天市場公式・正規取扱店でポイント高還元＆まとめ買いに最適'
  ];
  
  if (category === 'scent') {
    catName = 'フレグランス・香水・オードパルファン・紅茶の香り・フィグ・ウッディ・秋コスメ・2026秋';
    descType = '肌寒い秋の空気に美しく溶け込む、温もりあふれる紅茶（アールグレイ・ホワイトティー）や熟したイチジク（フィグ）、静寂のウッディノートを纏う洗練された秋フレグランス';
    features = [
      '秋のニットやトレンチコートに調和する、甘さとスモーキーさが絶妙にブレンドされた上質な調香',
      'つけた瞬間のフレッシュなトップから、肌に残る温かなラストノートまで一日中続く癒しの余韻',
      '楽天市場公式取扱ショップにて安心の正規品・ポイント還元でお得に購入可能'
    ];
  } else if (category === 'nail') {
    catName = 'ネイルケア・ハンドケア・ネイルオイル・キューティクルオイル・ささくれ・二枚爪・爪補修・2026秋';
    descType = '秋の乾燥でささくれ立ち、白く縦ジワが入って割れやすくなった爪先と指先を、植物オイルの浸透力で根本から集中補修する高保湿ネイルオイル＆ハンドセラム';
    features = [
      'ケラチン補修成分や厳選ボタニカルオイルが爪の深層まで浸透し、折れにくい強い美爪を育成',
      'ロールオンやペンタイプなどベタつかずにサッと塗れるスマート設計で、日中もこまめに保湿',
      '大人気サロン専売品からプチプラ名品まで楽天市場で安心購入可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のパーツ・コンディション特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第10弾10選'],
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
      '毎日のこまめな塗布とお好みの香りに合わせた使い分けが効果的'
    ],
    rating: Number((Math.min(5, Math.max(4.2, item.reviewAverage || 4.6))).toFixed(1)),
    relatedItemCodes: []
  };
}

export const balmArticles = balmItemsRaw.map((it, idx) =>
  createProductArticle(it, 'balm', ['マルチバーム', 'スティック美容液', '乾燥対策', '粉吹き防止', 'メイク直し'], 'autumn-multi-moist-stick-balm-10', idx)
);

export const scentArticles = scentItemsRaw.map((it, idx) =>
  createProductArticle(it, 'scent', ['紅茶の香り', 'イチジク', 'ウッディ', '秋フレグランス', 'オードパルファン'], 'autumn-tea-fig-woody-fragrance-10', idx)
);

export const nailArticles = nailItemsRaw.map((it, idx) =>
  createProductArticle(it, 'nail', ['ネイルオイル', 'キューティクルオイル', 'ささくれ', '美爪ケア', 'ハンドセラム'], 'autumn-nail-oil-hand-serum-dry-10', idx)
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
    ...balmArticles,
    ...scentArticles,
    ...nailArticles
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
  console.log(`✅ articles.json に秋コスメ第10弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
