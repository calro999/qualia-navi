import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series11_items.json', 'utf8'));

export const lipOilItemsRaw = batchData.lipOilItems;
export const maskItemsRaw = batchData.maskItems;
export const milkItemsRaw = batchData.milkItems;

console.log(`🍂 2026秋コスメ特集 第11弾 アイテム数: リップオイル=${lipOilItemsRaw.length}, 美白マスク=${maskItemsRaw.length}, ヘアミルク=${milkItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'lip' ? 'lpo' : category === 'mask' ? 'wms' : 'hmk';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn11-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'メイクアップ・リップケア・リップオイル・リッププランパー・保湿・縦ジワ・ぷるぷる唇・2026秋';
  let descType = '秋の冷たい木枯らしで皮剥けやひび割れを起こしやすい唇を、植物オイルの濃密な保護膜とプランプ効果で縦ジワレスなぷっくりツヤ唇へ導く高保湿リップオイル＆プランパー';
  let features = [
    'ホホバ油やローズヒップ油などの天然トリートメントオイルが唇の深部まで潤いを補給',
    'カプサイシンやメントールによる心地よい刺激で血行を促し、内側からふっくらボリューミーに',
    '楽天市場公式・正規取扱店でポイント高還元＆まとめ買いに最適'
  ];
  
  if (category === 'mask') {
    catName = 'スキンケア・シートマスク・パック・美白・シミ予防・ビタミンC・トラネキサム酸・くすみ・2026秋';
    descType = '真夏の強烈な紫外線ダメージが蓄積して表面化する秋のシミ予備軍・くすみ肌を、薬用美白有効成分とビタミンで集中リセットする高浸透美白シートマスク';
    features = [
      'トラネキサム酸や高浸透ビタミンC誘導体がメラニン生成を初期段階で強力ブロック',
      '高密着3Dシートやマイクロファイバーが美容液を余すことなく角層深部へチャージ',
      '楽天市場公式取扱ショップにて安心の正規品・ポイント還元でお得に購入可能'
    ];
  } else if (category === 'milk') {
    catName = 'ヘアケア・トリートメント・ヘアミルク・アウトバス・洗い流さない・パサつき・静電気防止・2026秋';
    descType = '秋の空気の乾燥やニットの摩擦・静電気で広がりパサつく毛先に、水分と油分を黄金比で抱え込ませてしなやかな指通りを一日中キープする高保水ヘアミルク＆エマルジョン';
    features = [
      '髪の内部を潤す高保水エッセンスと、キューティクルをコートする植物オイルのWアプローチ',
      'ベタつかずスーッと浸透し、ドライヤー前の熱ダメージ保護や朝のスタイリングベースに万能',
      '大人気サロン専売品からドラッグストア定番まで楽天市場で安心購入可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のパーツ・コンディション特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第11弾10選'],
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
      '毎日の継続使用とお好みの仕上がりに合わせた使い分けが大切'
    ],
    rating: Number((Math.min(5, Math.max(4.2, item.reviewAverage || 4.6))).toFixed(1)),
    relatedItemCodes: []
  };
}

export const lipOilArticles = lipOilItemsRaw.map((it, idx) =>
  createProductArticle(it, 'lip', ['リップオイル', 'リッププランパー', '縦ジワ', '乾燥唇', 'ぷっくり唇'], 'autumn-lip-oil-plumper-cracked-lips-10', idx)
);

export const maskArticles = maskItemsRaw.map((it, idx) =>
  createProductArticle(it, 'mask', ['美白シートマスク', 'シミ予防', 'ビタミンC', 'トラネキサム酸', 'くすみ改善'], 'autumn-whitening-sheet-mask-sun-spots-10', idx)
);

export const milkArticles = milkItemsRaw.map((it, idx) =>
  createProductArticle(it, 'milk', ['ヘアミルク', '洗い流さないトリートメント', 'パサつき防止', '静電気対策', 'アウトバス'], 'autumn-hair-milk-emulsion-frizzy-dry-10', idx)
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
    ...lipOilArticles,
    ...maskArticles,
    ...milkArticles
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
  console.log(`✅ articles.json に秋コスメ第11弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
