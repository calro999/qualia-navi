import fs from 'fs';
import path from 'path';

// 保存された楽天API取得データを読み込む
const batchData = JSON.parse(fs.readFileSync('scratch/autumn_series15_items.json', 'utf8'));

export const eyeItemsRaw = batchData.eyeItems;
export const oilItemsRaw = batchData.oilItems;
export const cicaItemsRaw = batchData.cicaItems;

console.log(`🍂 2026秋コスメ特集 第15弾 アイテム数: アイ=${eyeItemsRaw.length}, オイル=${oilItemsRaw.length}, CICA=${cicaItemsRaw.length}`);

const nowStr = new Date().toISOString();
const articlesJsonPath = path.resolve('src/data/articles.json');
let existingArticles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

function createProductArticle(item, category, tagList, featureSlug, idx) {
  const catKey = category === 'eye' ? 'eye' : category === 'oil' ? 'oil' : 'cca';
  const cleanCode = (item.itemCode || `item${idx+1}`).replace(/[^a-zA-Z0-9]/g, '').slice(-10);
  const id = `art-autumn15-2026-${catKey}-${idx+1}-${cleanCode}`;
  
  let catName = 'スキンケア・アイケア・アイクリーム・目元のシワ・乾燥小ジワ・高保湿・2026秋';
  let descType = '秋の冷たい木枯らしと湿度の低下でまぶたや目尻の皮膚がカサつき、ちりめんジワや乾燥クマが目立ちやすいデリケートな目元を、ナイアシンアミドやレチノールの高密着ラップでふっくら押し戻す高保湿アイクリーム';
  let features = [
    'ナイアシンアミドや純粋レチノールが目元の真皮・表皮に働きかけ、乾燥小ジワを集中改善',
    '皮膚が薄い目元に負担をかけずピタッと留まる高密着エモリエントヴェール',
    '楽天市場公式取扱店・コスメ大賞受賞ショップでポイント高還元＆お得に購入可能'
  ];
  
  if (category === 'oil') {
    catName = 'スキンケア・フェイスオイル・ブースターオイル・スクワラン・アルガンオイル・過乾燥防止・2026秋';
    descType = '秋の入浴後に浴室を出た瞬間から始まる急激な肌の水分蒸発（脱衣所過乾燥）を食い止め、洗顔直後に素肌を柔らかく包み込んで化粧水の浸透を助ける高純度フェイシャルオイル';
    features = [
      '高純度スクワランや未精製オーガニックアルガンオイルが皮脂膜の代わりに素肌を瞬間密閉',
      'オイルとは思えないほどサラリと馴染み、その後のスキンケアを一切邪魔しない浸透親和性',
      '楽天市場公式・オイル専門店から大容量＆高コスパで安心購入可能'
    ];
  } else if (category === 'cica') {
    catName = 'スキンケア・フェイスクリーム・シカクリーム・シカバーム・セラミド・肌荒れ・敏感肌・2026秋';
    descType = '秋の寒暖差や冷たい風、花粉によって肌のバリア機能が低下し、ピリピリと赤くゆらぎやすい敏感肌を、ツボクサエキス（CICA）と濃密セラミドで穏やかに鎮静・集中保護する低刺激バーム＆クリーム';
    features = [
      '高濃度ツボクサエキス（CICA）とヒト型セラミドが乱れた肌バリアを急速に立て直し、赤みを鎮静',
      '敏感肌でもしみない無添加・弱酸性低刺激処方で、マスク荒れや季節の変わり目のゆらぎをケア',
      '韓国公式正規品から日本製ドクターズコスメまで楽天市場で安心・高ポイント還元で入手可能'
    ];
  }

  return {
    id: id,
    title: `【2026秋】${item.itemName.slice(0, 38)}の口コミ評判・効果・最安値`,
    content: `${item.itemName}は、2026年秋のピンポイント悩み特化ケアにおいて、${descType}として大注目のアイテムです。楽天市場の最新実勢価格は${item.priceFormatted}となっており、「${item.shopName}」等の安心ショップにて、お買い物マラソンや各種ポイント還元を利用してお得に入手できます。`,
    category: catName,
    tags: [...tagList, '2026秋コスメ', '楽天市場正規品', '秋コスメ第15弾10選'],
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

export const eyeArticles = eyeItemsRaw.map((it, idx) =>
  createProductArticle(it, 'eye', ['アイクリーム', '目元のシワ', '乾燥小ジワ', '高保湿', 'ナイアシンアミド'], 'autumn-eye-cream-fine-lines-crow-feet-10', idx)
);

export const oilArticles = oilItemsRaw.map((it, idx) =>
  createProductArticle(it, 'oil', ['フェイスオイル', 'スクワラン', 'アルガンオイル', '入浴後過乾燥防止', 'ブースターオイル'], 'autumn-facial-oil-post-bath-dehydration-10', idx)
);

export const cicaArticles = cicaItemsRaw.map((it, idx) =>
  createProductArticle(it, 'cica', ['シカクリーム', 'シカバーム', '敏感肌', '肌荒れ鎮静', 'セラミド'], 'autumn-cica-ceramide-calming-balm-10', idx)
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
    ...eyeArticles,
    ...oilArticles,
    ...cicaArticles
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
  console.log(`✅ articles.json に秋コスメ第15弾の個別商品記事 ${allNewArticles.length}件 を追加・更新しました！`);

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
