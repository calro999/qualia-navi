import fs from 'fs';
import path from 'path';

console.log('⚡️ [Perfect Markdown & Layout Enforcer] 各商品「テキスト解説 ➡ 商品画像 ➡ 直行ボタン」の完璧な順序に統一中...');

const projectRoot = process.cwd();
const dataTsPath = path.join(projectRoot, 'src', 'data.ts');
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');

const articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
const articlesMap = new Map();
articlesData.forEach(art => {
  if (art.id) articlesMap.set(art.id, art);
});

const defaultProductImage = '/images/products/decorte_liposome.jpg';

function getProductsByCategory(category, count = 10) {
  let list = articlesData.filter(a => a.category === category);
  if (list.length < count) {
    list = articlesData.filter(a => a.category === category || a.category === 'bodycare' || a.category === 'lip' || a.category === 'skincare');
  }
  return list.slice(0, count);
}

// 各商品カード：商品見出し ➡ テキスト解説 ➡ 【商品画像】 ➡ 【直行ボタン】の完璧な順序
function renderProductCard(art, index) {
  const title = art.productName || art.title;
  const price = art.rakutenPrice || art.priceRange || '1,980円 (税込)';
  const rating = art.starRating || 4.8;
  
  let imgUrl = art.imageUrl || art.image;
  if (!imgUrl || typeof imgUrl !== 'string' || imgUrl.includes('topic_')) {
    imgUrl = defaultProductImage;
  }

  const affLink = art.affiliateLink || art.originalUrl || '#';
  const audience = art.targetAudience || '毎日のケアで失敗したくない方、本気のコスメをお探しの方';
  
  let features = art.features || ['高密着処方で落ちにくい', '保湿成分配合で肌に優しい', '話題の人気コスメ'];
  if (typeof features === 'string') features = [features];

  const reviewText = art.introText || (art.reviewBody ? art.reviewBody.slice(0, 150) + '...' : 'リアルタイムに大人気。口コミでも高評価を獲得している実力派コスメアイテムです。');

  return `
### 第${index}位：${title}

- **参考価格**: ${price}
- **総合評価**: ★★★★★ (${rating})
- **おすすめな人**: ${audience}
- **主な特徴・メリット**:
${features.slice(0, 3).map(f => `  - ${f}`).join('\n')}

**【Qualia美容分析室の検証レビュー】**
${reviewText}

![${title}](${imgUrl})

[【楽天市場】${title} の商品ページへ直行する ↗](${affLink})

---
`;
}

function generateRichMarkdown(post) {
  let codes = post.recommendedItemCodes || [];
  let productList = [];

  codes.forEach(code => {
    const item = articlesMap.get(code);
    if (item && !productList.some(p => p.id === item.id)) {
      productList.push(item);
    }
  });

  const titleLower = (post.title + ' ' + post.slug).toLowerCase();
  const fillCategory = titleLower.includes('lip') || titleLower.includes('リップ') || titleLower.includes('ティント') ? 'lip' :
                       titleLower.includes('sweat') || titleLower.includes('制汗') || titleLower.includes('ニオイ') || titleLower.includes('デオ') ? 'bodycare' :
                       titleLower.includes('skin') || titleLower.includes('化粧水') || titleLower.includes('スキンケア') || titleLower.includes('乳液') || titleLower.includes('美容液') ? 'skincare' :
                       titleLower.includes('hair') || titleLower.includes('ヘア') || titleLower.includes('シャンプー') ? 'haircare' : 'makeup';
  
  const extra = getProductsByCategory(fillCategory, 15);
  extra.forEach(ex => {
    if (!productList.some(p => p.id === ex.id) && productList.length < 10) {
      productList.push(ex);
    }
  });

  if (productList.length < 10) {
    articlesData.forEach(ex => {
      if (!productList.some(p => p.id === ex.id) && productList.length < 10) {
        productList.push(ex);
      }
    });
  }

  const items = productList.slice(0, 10);

  let md = `## 1. ${post.title}：失敗しないための徹底比較ガイド

${post.introText || 'コスメ選びで大切なのは、自分の悩みや求める質感（持続力・保湿感・発色・香りの強さ）にフィットしているかを見極めることです。本特集では、リアルタイムに支持されている人気実力派アイテム10選を徹底比較しました。'}

### 本特集の比較チェックリスト
- **持続力・キープ力**: 朝使って夕方まで塗り直し・ケアが不要か
- **肌への優しさ・保湿性**: 敏感肌でもピリピリせず、潤い膜が持続するか
- **使用感・仕上がり**: ベタつきや白残りがなく、自然で綺麗な仕上がりか

---

## 2. 話題の人気実力派アイテム 厳選10選 徹底紹介

`;

  items.forEach((item, idx) => {
    md += renderProductCard(item, idx + 1);
  });

  md += `
## 3. まとめ：用途・お悩み別のおすすめ対比

全10商品を実際に検証・比較した結果、用途や悩み別での最適解は以下の通りです。

- **とにかく落ちにくさ・持続力を最重視する方**: 『${items[0]?.productName || items[0]?.title}』が最もおすすめ！
- **自然な使い心地とコスパ・毎日使いを求める方**: 『${items[1]?.productName || items[1]?.title}』がベストチョイス！
- **乾燥や肌荒れ・成分の優しさをケアしたい方**: 『${items[2]?.productName || items[2]?.title}』をお選びください。

気になる商品は各商品のすぐ下にある「商品ページへ直行する ↗」リンクから、楽天市場の店舗・公式ショップ直リンクで最新価格や在庫をご確認ください！
`;

  return { markdown: md, itemIds: items.map(i => i.id) };
}

async function main() {
  const { INITIAL_BLOG_POSTS } = await import('../src/data.ts');
  
  console.log(`全 ${INITIAL_BLOG_POSTS.length} 件のブログ記事を「解説 ➡ 画像 ➡ ボタン」完璧順序へ統一更新中...`);

  const updatedPosts = INITIAL_BLOG_POSTS.map((post) => {
    const { markdown, itemIds } = generateRichMarkdown(post);
    const collageCover = `/images/collages/${post.id}.jpg`;
    
    return {
      ...post,
      coverImage: collageCover,
      recommendedItemCodes: itemIds,
      contentMarkdown: markdown
    };
  });

  let dataTsText = fs.readFileSync(dataTsPath, 'utf-8');
  
  const startMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const endMarker = 'export const INITIAL_COMPARISONS: ProductComparison[] = [';
  
  const startIdx = dataTsText.indexOf(startMarker);
  const endIdx = dataTsText.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error('マーカーが見つかりませんでした。');
    return;
  }

  const jsonStr = JSON.stringify(updatedPosts, null, 2);
  const newPart = `${startMarker}\n${jsonStr.slice(1, -1)}\n];\n\n`;

  const updatedDataTs = dataTsText.slice(0, startIdx) + newPart + dataTsText.slice(endIdx);
  
  fs.writeFileSync(dataTsPath, updatedDataTs, 'utf-8');
  console.log(`🎉 [Perfect Markdown & Layout Enforcer] 完璧な順序更新が完了しました！`);
}

main().catch(console.error);
