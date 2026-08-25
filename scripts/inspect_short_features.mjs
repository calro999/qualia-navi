import fs from 'fs';
import path from 'path';

const articlesJsonPath = path.resolve(process.cwd(), 'src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

console.log(`📊 全記事数: ${articles.length}`);

// 特集記事を抽出
const featureArticles = articles.filter(a => a.id.startsWith('feature-'));
console.log(`📑 特集記事数: ${featureArticles.length}`);

const shortFeatures = [];

for (const feat of featureArticles) {
  // タイトルまたはIDから期待するアイテム数（5選、10選、7選、3選等）を抽出
  let expectedCount = 5;
  const match = feat.title.match(/【?([0-9]+)選】?/);
  if (match) {
    expectedCount = parseInt(match[1], 10);
  } else if (feat.id.includes('-5-')) {
    expectedCount = 5;
  } else if (feat.id.includes('-10-')) {
    expectedCount = 10;
  } else if (feat.id.includes('-7-')) {
    expectedCount = 7;
  } else if (feat.id.includes('-3-')) {
    expectedCount = 3;
  }

  // 本文中の見出し "## 1.", "## 2." 等の数をカウント
  const headingMatches = feat.reviewBody.match(/## [0-9]+\./g) || [];
  const actualCount = headingMatches.length;

  if (actualCount < expectedCount) {
    shortFeatures.push({
      id: feat.id,
      title: feat.title,
      expected: expectedCount,
      actual: actualCount,
      category: feat.category
    });
  }
}

console.log(`\n⚠️ アイテム数が不足している特集記事: ${shortFeatures.length}件`);
console.table(shortFeatures);
