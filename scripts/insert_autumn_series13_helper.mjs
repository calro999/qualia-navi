import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series13_items.json', 'utf8'));

export const handItemsRaw = batchData.handItems;
export const scalpItemsRaw = batchData.scalpItems;
export const nightItemsRaw = batchData.nightItems;

console.log(`🍂 2026秋コスメ特集 第13弾 アイテム数: ハンド=${handItemsRaw.length}, スカルプ=${scalpItemsRaw.length}, ナイトパック=${nightItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'hand' ? 'hnd' : category === 'scalp' ? 'scp' : 'ngt';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn13-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'ハンドケア・ネイルケア・ハンドクリーム・手荒れ・あかぎれ・高保湿・2026秋';
  let descType = '冷たい風や頻繁な手洗いで手肌がカサつき、指先のささくれやひび割れが起きやすい秋に、濃厚なうるおいベールで手肌と爪先を同時に包み込む高保湿ハンド＆ネイルクリーム';
  let features = [
    '尿素やセラミド、高純度シアバターが角層深くまで浸透し、ガサガサの手荒れをなめらかに補修',
    'ベタつきを残さずスマホやPC操作も快適な密着ベール処方',
    '楽天市場公式・正規取扱店でポイント高還元＆ギフトにも喜ばれる上質パッケージ'
  ];
  
  if (category === 'scalp') {
    catName = 'ヘアケア・スカルプケア・頭皮美容液・スカルプエッセンス・フケかゆみ・抜け毛対策・2026秋';
    descType = '秋の空気の乾燥と夏の紫外線ダメージの蓄積で、地肌のつっぱりやかゆみ、季節の抜け毛が気になる頭皮環境を健やかに整える高保湿スカルプケアエッセンス';
    features = [
      '植物由来エキスや美肌菌サポート成分が頭皮の水分・油分バランスを整え、乾燥フケやかゆみを予防',
      'ベタつかず清涼感のある心地よいテクスチャーで、お風呂上がりの頭皮マッサージに最適',
      'サロン専売品からオーガニック処方まで楽天市場で安心・高ポイント還元で購入可能'
    ];
  } else if (category === 'night') {
    catName = 'スキンケア・フェイスパック・スリーピングマスク・ナイトパック・夜用クリーム・乾燥肌・2026秋';
    descType = '就寝中の暖房や秋の夜風による水分蒸発（過乾燥）を防ぎ、寝ている間に美容成分をじっくり浸透させて翌朝ぷるんとしたハリ肌へ整える夜用スリーピングマスク';
    features = [
      '塗って寝るだけで一晩中うるおいを逃さない濃密ラッピング処方',
      '翌朝の洗顔時に手触りの違いを実感できる濃密なハリ・ツヤ補給',
      'ベタつきにくく枕に付きにくいストレスフリーなジェル・クリーム質感'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のピンポイント悩み特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第13弾10選'],
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
      '毎日の継続的なスキンケア・パーツケア習慣が大切'
    ],
    rating: Number((Math.min(5, Math.max(4.2, item.reviewAverage || 4.6))).toFixed(1)),
    relatedItemCodes: []
  };
}

export const handArticles = handItemsRaw.map((it, idx) =>
  createProductArticle(it, 'hand', ['ハンドクリーム', 'ネイルケア', '手荒れ防止', '高保湿', 'ささくれケア'], 'autumn-hand-nail-cream-chapped-skin-10', idx)
);

export const scalpArticles = scalpItemsRaw.map((it, idx) =>
  createProductArticle(it, 'scalp', ['スカルプエッセンス', '頭皮美容液', 'フケかゆみ', '抜け毛対策', '頭皮保湿'], 'autumn-scalp-essence-dry-itch-hair-loss-10', idx)
);

export const nightArticles = nightItemsRaw.map((it, idx) =>
  createProductArticle(it, 'night', ['スリーピングマスク', 'ナイトパック', '夜用集中ケア', '高保湿ジェル', '暖房乾燥対策'], 'autumn-sleeping-mask-night-hydration-10', idx)
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
    ...handArticles,
    ...scalpArticles,
    ...nightArticles
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
  console.log(`✅ articles.json に秋コスメ第13弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
