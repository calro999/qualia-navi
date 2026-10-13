import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series14_items.json', 'utf8'));

export const neckItemsRaw = batchData.neckItems;
export const boosterItemsRaw = batchData.boosterItems;
export const mistItemsRaw = batchData.mistItems;

console.log(`🍂 2026秋コスメ特集 第14弾 アイテム数: ネック=${neckItemsRaw.length}, ブースター=${boosterItemsRaw.length}, ミスト=${mistItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'neck' ? 'nck' : category === 'booster' ? 'bst' : 'mst';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn14-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'スキンケア・ネックケア・デコルテ・ネッククリーム・首のシワ・高保湿・2026秋';
  let descType = '秋の冷たい風やタートルネック・マフラーによる擦れで乾燥し、横ジワやたるみが目立ちやすい首元とデコルテを、レチノールやペプチドの濃密ヴェールで引き締めてふっくら整える高保湿ネッククリーム';
  let features = [
    'ペプチドやレチノール誘導体がデリケートな首元の皮膚にハリと弾力を集中補給',
    'ベタつかず洋服や寝具に付かないシルキーな密着テクスチャー',
    '楽天市場公式取扱店・正規代理店でポイント高還元＆お得に購入可能'
  ];
  
  if (category === 'booster') {
    catName = 'スキンケア・導入美容液・ブースター・角質柔軟・インナードライ・高浸透・2026秋';
    descType = '夏の紫外線ダメージで硬くゴワついた秋の角質層を瞬時にやわらげ、その後に使う化粧水や美容液の通り道を切り拓いて角層奥深くまでうるおいを引き込む高浸透ブースター美容液';
    features = [
      '微細リポソームカプセルや植物発酵エキスが角質細胞の間に入り込み、硬いゴワつきをほぐす',
      '洗顔後すぐのまっさらな肌にスッと吸い込まれ、化粧水の浸透実感を劇的に向上',
      '楽天市場公式ショップ・人気コスメアワード受賞名品を安心・高還元で入手可能'
    ];
  } else if (category === 'mist') {
    catName = 'ヘアケア・ヘアミスト・静電気防止・ヘアウォーター・パサつき防止・アホ毛対策・2026秋';
    descType = '秋の空気の乾燥やセーター・マフラーの着脱によって発生するパチパチ静電気をブロックし、浮き毛やパサつきを抑えてサラツヤ髪へ整える高保湿トリートメントヘアミスト';
    features = [
      '植物オイルやアミノ酸成分が髪のキューティクルを整え、帯電を防いで静電気をシャットアウト',
      '朝の寝癖直しから日中の乾燥対策までシュッと吹きかけるだけで速攻まとまる',
      '心地よいホワイトムスクや天然アロマの香りでヘアフレグランス効果も抜群'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のパーツ・コンディション特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第14弾10選'],
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
      '朝晩の継続的なパーツケア習慣の積み重ねが重要'
    ],
    rating: Number((Math.min(5, Math.max(4.2, item.reviewAverage || 4.6))).toFixed(1)),
    relatedItemCodes: []
  };
}

export const neckArticles = neckItemsRaw.map((it, idx) =>
  createProductArticle(it, 'neck', ['ネッククリーム', 'デコルテケア', '首のシワ', '高保湿', 'レチノール'], 'autumn-neck-decollete-cream-chapped-wrinkles-10', idx)
);

export const boosterArticles = boosterItemsRaw.map((it, idx) =>
  createProductArticle(it, 'booster', ['導入美容液', 'ブースター', '角質ケア', 'インナードライ', 'リポソーム'], 'autumn-booster-serum-stiff-skin-absorption-10', idx)
);

export const mistArticles = mistItemsRaw.map((it, idx) =>
  createProductArticle(it, 'mist', ['ヘアミスト', '静電気防止', 'ヘアウォーター', 'パサつき防止', '寝癖直し'], 'autumn-anti-static-hair-mist-frizzy-dry-10', idx)
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
    ...neckArticles,
    ...boosterArticles,
    ...mistArticles
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
  console.log(`✅ articles.json に秋コスメ第14弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
