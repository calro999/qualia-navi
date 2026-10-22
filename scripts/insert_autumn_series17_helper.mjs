import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series17_items.json', 'utf8'));

export const massageItemsRaw = batchData.massageItems;
export const blushItemsRaw = batchData.blushItems;
export const footItemsRaw = batchData.footItems;

console.log(`🍂 2026秋コスメ特集 第17弾 アイテム数: 温感マッサージ=${massageItemsRaw.length}, チーク=${blushItemsRaw.length}, フットケア=${footItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'massage' ? 'msg' : category === 'blush' ? 'bsh' : 'fot';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn17-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'スキンケア・温感ジェル・マッサージジェル・血行促進・むくみ解消・くすみオフ・2026秋';
  let descType = '秋の冷え込みによる血行不良でどんより青白くくすみ、むくみがちな素肌を、心地よい温感成分と高保湿ジェルでじんわり温めほぐし、生き生きとした血色ツヤ肌を呼び戻す温感マッサージジェル';
  let features = [
    'トウガラシエキスやショウガ根エキスが肌をじんわり温め、滞った血流とリンパの流れを促進',
    'マグネシウムやヒアルロン酸配合で、マッサージしながら秋の乾燥肌に濃密なうるおいをチャージ',
    '楽天市場公式・正規取扱店でポイント高還元＆お得に入手可能'
  ];
  
  if (category === 'blush') {
    catName = 'メイクアップ・チーク・リキッドチーク・クリームチーク・生ツヤ血色・粉浮き防止・2026秋';
    descType = '秋の乾燥でパウダーチークが粉を吹き、毛穴や小ジワが目立ちやすい大人の頬に、美容液のようにスッと溶け込んで内側から上気したような自然な血色とツヤを与える高保湿リキッド＆クリームチーク';
    features = [
      '美容オイルやヒアルロン酸を贅沢に配合し、カサつく頬にもムラなく均一に密着',
      '指先やスポンジでぽんぽんと馴染ませるだけで、マスクにも付きにくく一日中鮮やかな血色をキープ',
      '楽天市場公式・人気ブランドから安心の正規品・ポイント高還元で購入可能'
    ];
  } else if (category === 'foot') {
    catName = 'ボディケア・フットケア・かかとクリーム・ひび割れ防止・角質軟化・冷え性対策・2026秋';
    descType = '秋の冷え込みとタイツやブーツの摩擦でガサガサに硬化し、ひび割れが起きやすいかかとや足裏を、高濃度尿素や馬油、シアバターの濃密ベールでつるんとなめらかに整える高保湿フットクリーム';
    features = [
      '尿素やサリチル酸が分厚く硬くなったかかとの角質を柔らかくほぐし、有効成分が深部まで浸透',
      'ベタつきを残さず靴下やスリッパをすぐに履ける快適な速乾・高密着テクスチャー',
      '楽天市場公式・フットケア専門ショップから高評価＆高ポイント還元でお得に購入可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のパーツ・コンディション特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第17弾10選'],
    createdAt: nowStr,
    updatedAt: nowStr,
    itemCode: item.itemCode,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    priceFormatted: item.priceFormatted,
    shopName: item.shopName,
    itemUrl: item.itemUrl,
    affiliateUrl: item.affiliateUrl,
    imageUrl: item.imageUrl,
    reviewAverage: item.reviewAverage,
    reviewCount: item.reviewCount,
    pros: [
      features[0],
      features[1]
    ],
    cons: [
      '人気アイテムのため入荷待ちやセール時の早期完売に注意',
      '毎日の継続的なセルフケア習慣の積み重ねが重要'
    ],
    rating: Number((Math.min(5, Math.max(4.2, item.reviewAverage || 4.6))).toFixed(1)),
    relatedItemCodes: []
  };
}

export const massageArticles = massageItemsRaw.map((it, idx) =>
  createProductArticle(it, 'massage', ['温感ジェル', 'マッサージ', '血行促進', 'くすみ改善', '冷え対策'], 'autumn-warming-massage-gel-cream-dullness-10', idx)
);

export const blushArticles = blushItemsRaw.map((it, idx) =>
  createProductArticle(it, 'blush', ['リキッドチーク', 'クリームチーク', '血色感', '乾燥肌メイク', '生ツヤ'], 'autumn-moist-liquid-cream-blush-cheek-10', idx)
);

export const footArticles = footItemsRaw.map((it, idx) =>
  createProductArticle(it, 'foot', ['フットクリーム', 'かかとケア', 'ひび割れ防止', '尿素配合', '足の冷え'], 'autumn-moist-foot-cream-cold-dry-heels-10', idx)
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
      <p class="text-sm font-medium text-amber-700 dark:text-amber-400">
        💡 ${highlightCatch}
      </p>
      <div class="flex items-baseline gap-3">
        <span class="text-2xl font-black text-rose-600 dark:text-rose-400">${item.priceFormatted}</span>
        <span class="text-xs text-stone-400">税込・最新実勢価格</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
        <span class="text-amber-500 font-bold">${ratingStars} ${article.rating}</span>
        <span class="text-xs text-stone-400">（レビュー ${item.reviewCount.toLocaleString()}件）</span>
      </div>
      <div class="pt-2 text-sm text-stone-700 dark:text-stone-300 leading-relaxed border-t border-stone-200/60 dark:border-stone-800 space-y-2">
        <p><strong>【美容エディターの本音レビュー】</strong><br/>${detailedReview}</p>
        <p><strong>【使用感・テクスチャー】</strong><br/>${skinFeel}</p>
        <p><strong>【プロのおすすめ活用法】</strong><br/>${advice}</p>
      </div>
      <div class="pt-3 flex flex-wrap gap-3">
        <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm hover:from-red-700 hover:to-rose-700 transition-all">
          楽天市場で詳細・在庫を見る
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
    ...massageArticles,
    ...blushArticles,
    ...footArticles
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
  console.log(`✅ articles.json に秋コスメ第17弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
