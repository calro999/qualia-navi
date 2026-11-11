import fs from 'fs';
import path from 'path';

console.log('=== [10K PV Traffic Overhaul] Starting SEO & Internal Link Mesh Optimization ===');

const articles = JSON.parse(fs.readFileSync('src/data/articles.json', 'utf8'));
const blogs = JSON.parse(fs.readFileSync('public/data/blogs.json', 'utf8'));
const comparisons = JSON.parse(fs.readFileSync('public/data/comparisons.json', 'utf8'));

// 1. Group articles by category for building robust internal link clusters
const catMap = new Map();
articles.forEach(a => {
  const cat = a.category || 'skincare';
  if (!catMap.has(cat)) catMap.set(cat, []);
  catMap.get(cat).push(a);
});

// Helper: Clean brand & product name for highest search volume query match
function cleanSearchQueryName(a) {
  let name = a.productName || '';
  if (name.length < 10 && a.itemName && a.itemName.length > name.length) {
    name = a.itemName;
  }
  name = name.replace(/［[^］]+］/g, ' ');
  name = name.replace(/（[^）]*(?:ml|g|個|本|回|仕様)[^）]*）/gi, ' ');
  name = name.replace(/\([^)]*(?:ml|g|個|本|回|仕様)[^)]*\)/gi, ' ');
  name = name.replace(/\([0-9]{10,}\)/g, ' ');
  name = name.replace(/^(?:【[^】]*】|\[[^\]]*\]|＼[^／]*／|★[^★]*★|●|◆|■|\s)+/g, '');
  name = name.replace(/【[^】]*】/g, ' ');
  name = name.replace(/\[[^\]]*\]/g, ' ');
  name = name.replace(/(?:世界累計販売数[0-9,]+万個突破★|公式|国内正規品|正規品|予約[：:\s]*)/gi, '');
  name = name.replace(/\s+/g, ' ').trim();

  if (name.length > 25) {
    const tokens = name.split(' ');
    let acc = '';
    for (const t of tokens) {
      if ((acc + ' ' + t).trim().length <= 25) acc = (acc + ' ' + t).trim();
      else break;
    }
    name = acc.length >= 8 ? acc : name.slice(0, 25).trim();
  }
  return name;
}

// 2. High CTR Title Builders (Keyword-First: Product Name in front 25 chars)
const highCtrTitleHooks = [
  (n, s, p) => `【${n}】口コミ評判・効果は本当？最安値本音レビュー`,
  (n, s, p) => `【${n}】口コミ・成分特徴・最安値は？専門家が徹底検証`,
  (n, s, p) => `【${n}】リアルな評判と口コミ！メリット・注意点まとめ`,
  (n, s, p) => `【${n}】口コミ・使い方・成分効果を徹底レビュー！最安値情報`,
  (n, s, p) => `【${n}】口コミ評判・使用感・最安値（${p}）購入ガイド！`,
  (n, s, p) => `【${n}】効果や使い心地は？口コミ・成分・最安値を徹底検証`,
  (n, s, p) => `【${n}】口コミと実際の使い心地を本音レビュー！最安値情報`,
  (n, s, p) => `【${n}】口コミ・成分解析・最安値比較！購入前チェック`,
  (n, s, p) => `【${n}】使い心地と仕上がり検証！愛用者の口コミ＆最安値`,
  (n, s, p) => `【${n}】メリット・デメリット本音レビュー！口コミ＆最安値`,
  (n, s, p) => `【${n}】買う前に知るべき口コミ＆注意点！最安値徹底比較`,
  (n, s, p) => `【${n}】仕上がり・持続力を徹底テスト！口コミ＆最安値ガイド`
];

const titleSet = new Set();
let titleUpdated = 0;

articles.forEach((art, idx) => {
  const is10SenOrGuide = Boolean(
    art.id.includes('10sen') ||
    art.id.includes('longtail') ||
    art.title.includes('10選') ||
    art.title.includes('総まとめ')
  );

  if (!is10SenOrGuide) {
    const coreName = cleanSearchQueryName(art);
    const priceStr = art.rakutenPrice ? String(art.rakutenPrice).replace(/[^0-9,]/g, '') + '円' : '最安値';
    const shopShort = (art.shopName || '楽天').replace(/楽天市場店|公式ショップ|公式ストア/g, '').slice(0, 8);
    const hookFn = highCtrTitleHooks[idx % highCtrTitleHooks.length];
    let newTitle = hookFn(coreName, shopShort, priceStr);

    if (titleSet.has(newTitle)) {
      newTitle = `${newTitle}［${shopShort}］`;
    }
    if (titleSet.has(newTitle)) {
      newTitle = `${newTitle}（#${idx + 1}）`;
    }
    titleSet.add(newTitle);
    art.title = newTitle;
    titleUpdated++;
  } else {
    if (!art.title.includes('【')) {
      art.title = `【2026最新】${art.title}`;
    }
    titleSet.add(art.title);
  }

  // 3. Insert Quick Answer / AI Overview Citation Box at beginning of content (if not already present)
  const pName = art.productName || cleanSearchQueryName(art);
  const rating = art.rating || art.starRating || 4.8;
  const price = art.rakutenPrice || 'オープン価格';
  const shop = art.shopName || '楽天市場正規取扱店';
  const bestPoint = (art.pros && art.pros.length > 0) ? art.pros[0] : '日常ケアを格上げする高機能処方';
  const targetUser = (art.features && art.features.length > 0) ? art.features[0] : `${art.categoryLabel || '美容ケア'}にこだわる方`;

  const quickSummaryBox = `
> [!NOTE] **3秒でわかる総合検証結論（クイックサマリー）**
> - **総合評価**: ★${rating}（${art.reviewCount || 120}件以上の愛用者レビュー）
> - **参考価格・取扱**: **${price}**（${shop}）
> - **最大の強み**: ${bestPoint}
> - **こんな人におすすめ**: ${targetUser}
> - **結論**: デイリー使いにおける満足度とコストパフォーマンスのバランスに優れ、楽天市場の買い回りやポイント還元を活用することで実質最安値圏で入手できる注目コスメです。
`.trim();

  // 4. Build Related Articles Internal Link Cluster (Pick 3 highly relevant peer items)
  const peerList = (catMap.get(art.category || 'skincare') || []).filter(x => x.id !== art.id);
  const relatedA = peerList[(idx * 7 + 1) % peerList.length];
  const relatedB = peerList[(idx * 7 + 3) % peerList.length];
  const relatedC = peerList[(idx * 7 + 5) % peerList.length];

  const relatedClusterSection = `
---

## 💡 あわせて比較検討したい！関連コスメ＆注目アイテム3選

${relatedA ? `- **[${relatedA.productName}](/articles/${relatedA.id})**（${relatedA.rakutenPrice || '参考価格あり'}・★${relatedA.rating || 4.8}）\n  ${(relatedA.pros && relatedA.pros[0]) || '同カテゴリで人気の高い実力派アイテム'}` : ''}
${relatedB ? `- **[${relatedB.productName}](/articles/${relatedB.id})**（${relatedB.rakutenPrice || '参考価格あり'}・★${relatedB.rating || 4.8}）\n  ${(relatedB.pros && relatedB.pros[0]) || '仕上がりとコストパフォーマンスに優れた注目モデル'}` : ''}
${relatedC ? `- **[${relatedC.productName}](/articles/${relatedC.id})**（${relatedC.rakutenPrice || '参考価格あり'}・★${relatedC.rating || 4.8}）\n  ${(relatedC.pros && relatedC.pros[0]) || '口コミ評価が高くリピーター多数の注目コスメ'}` : ''}
`.trim();

  // Inject into content cleanly
  let content = art.content || '';
  // Strip previous quick summary or cluster if re-running
  content = content.replace(/> \[!NOTE\] \*\*3秒でわかる総合検証結論[\s\S]*?注目コスメです。\n+/g, '');
  content = content.replace(/## 💡 あわせて比較検討したい！関連コスメ＆注目アイテム3選[\s\S]*$/g, '').trim();

  // Put quick summary right after H2 1. or at the very top
  if (content.includes('## 1.')) {
    content = content.replace('## 1.', `${quickSummaryBox}\n\n## 1.`);
  } else {
    content = `${quickSummaryBox}\n\n${content}`;
  }

  // Append internal link cluster
  content = `${content}\n\n${relatedClusterSection}`;
  art.content = content;
});

console.log(`Updated ${titleUpdated} titles to High CTR Keyword-First format.`);
console.log(`Injected Quick Answer Summary & 3-item Internal Link Cluster into all ${articles.length} articles.`);

// Save articles.json
const jsonOut = JSON.stringify(articles);
fs.writeFileSync('src/data/articles.json', jsonOut, 'utf8');
fs.writeFileSync('public/data/articles.json', jsonOut, 'utf8');

// Synchronize src/data.ts
const dataTsContent = fs.readFileSync('src/data.ts', 'utf8');
const blogMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = ';
const blogIdx = dataTsContent.indexOf(blogMarker);
if (blogIdx !== -1) {
  const headerPart = dataTsContent.slice(0, blogIdx);
  const newDataTs = `${headerPart}export const INITIAL_BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogs, null, 2)};\n\nexport const INITIAL_COMPARISONS: ProductComparison[] = ${JSON.stringify(comparisons, null, 2)};\n`;
  fs.writeFileSync('src/data.ts', newDataTs, 'utf8');
  console.log('Synchronized src/data.ts successfully.');
}

console.log('=== [10K PV Traffic Overhaul] Optimization Script Completed Successfully! ===');
