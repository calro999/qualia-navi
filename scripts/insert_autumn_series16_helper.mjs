import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series16_items.json', 'utf8'));

export const enzymeItemsRaw = batchData.enzymeItems;
export const settingItemsRaw = batchData.settingItems;
export const scrubItemsRaw = batchData.scrubItems;

console.log(`🍂 2026秋コスメ特集 第16弾 アイテム数: 酵素洗顔=${enzymeItemsRaw.length}, メイクキープ=${settingItemsRaw.length}, リップスクラブ=${scrubItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'enzyme' ? 'enz' : category === 'setting' ? 'stg' : 'scb';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn16-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'スキンケア・洗顔料・酵素洗顔・毛穴ケア・角栓除去・くすみオフ・2026秋';
  let descType = '夏の紫外線ダメージで硬く肥厚した古い角質や毛穴の黒ずみを、肌を痛めずアミノ酸とパパイン酵素で優しく分解し、つっぱり感なくつるんと透明感を呼び覚ます高保湿酵素洗顔パウダー';
  let features = [
    'タンパク質分解酵素（パパイン・プロテアーゼ）が不要な角質と角栓だけを選択的に分解洗浄',
    'アミノ酸洗浄成分やヒアルロン酸配合で、秋の乾燥肌でも洗い上がりが突っ張らずしっとり',
    '楽天市場公式取扱ショップにて安心の正規品・ポイント高還元でお得に入手可能'
  ];
  
  if (category === 'setting') {
    catName = 'ベースメイク・フィックスミスト・メイクキープミスト・乾燥崩れ防止・生ツヤ密着・2026秋';
    descType = '秋の冷暖房による乾燥風や外気の冷えでファンデーションが粉を吹き、目元やほうれい線がひび割れるのを防ぎ、美容液ヴェールで一日中みずみずしいツヤ肌をキープする高保湿セッティングミスト';
    features = [
      '微細な霧がメイク膜をぴったりコーティングし、マスクへの色移りや乾燥崩れを徹底ブロック',
      'ヒアルロン酸や植物オイル配合で、日中の乾燥砂漠肌にうるおいをチャージするスキンケア効果',
      '楽天市場公式店・人気ブランドから高ポイント還元＆安心配送で購入可能'
    ];
  } else if (category === 'scrub') {
    catName = 'リップケア・リップスクラブ・リップゴマージュ・シュガースクラブ・唇の皮剥け・縦ジワ改善・2026秋';
    descType = '冷たい木枯らしと湿度の低下でガサガサに荒れて皮剥けした唇を、微細なシュガースクラブやバブルピーリングで優しくリセットし、濃密植物オイルでふっくら血色唇へ導く高保湿リップスクラブ';
    features = [
      '天然シュガーやマイルドな濃密泡がデリケートな唇の薄皮を傷つけずに余分な角質をオフ',
      'ホホバオイルやシアバターが浸透し、スクラブ後そのまま洗い流さずリップパックとしても機能',
      '楽天市場公式・人気セレクトショップから安心の国内正規品でお得に入手可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のパーツ・コンディション特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第16弾10選'],
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
      '毎日の丁寧なパーツケア・バリア保護の継続が大切'
    ],
    rating: Number((Math.min(5, Math.max(4.2, item.reviewAverage || 4.6))).toFixed(1)),
    relatedItemCodes: []
  };
}

export const enzymeArticles = enzymeItemsRaw.map((it, idx) =>
  createProductArticle(it, 'enzyme', ['酵素洗顔', '毛穴ケア', 'くすみオフ', '古い角質', 'パパイン酵素'], 'autumn-enzyme-face-wash-powder-pores-dullness-10', idx)
);

export const settingArticles = settingItemsRaw.map((it, idx) =>
  createProductArticle(it, 'setting', ['メイクキープミスト', 'フィックスミスト', '乾燥崩れ防止', '粉吹き防止', '高保湿'], 'autumn-moist-makeup-setting-spray-dry-skin-10', idx)
);

export const scrubArticles = scrubItemsRaw.map((it, idx) =>
  createProductArticle(it, 'scrub', ['リップスクラブ', '唇ケア', '皮剥け防止', 'シュガースクラブ', '高保湿バーム'], 'autumn-lip-scrub-gommage-peeling-flaky-lips-10', idx)
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
    ...enzymeArticles,
    ...settingArticles,
    ...scrubArticles
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
  console.log(`✅ articles.json に秋コスメ第16弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
