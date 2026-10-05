import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

console.log(`📦 元データ全 ${articles.length} 件を重複完全排除・高品質化します...`);

const uniqueMap = new Map();
let removedCount = 0;

articles.forEach(art => {
  if (!art.id) return;

  // 商品名とリンクから一意キーを生成
  const nameKey = (art.productName || art.title || '').trim().toLowerCase().slice(0, 35);
  const linkKey = (art.affiliateLink || art.originalUrl || '').split('?')[0];
  const combinedKey = `${nameKey}__${linkKey}`;

  // すでに存在する場合
  if (uniqueMap.has(nameKey) || uniqueMap.has(linkKey) || uniqueMap.has(combinedKey)) {
    removedCount++;
    return;
  }

  // 壊れたタイトルや定型文のみのものを除外
  if (
    art.title?.includes('[国内発送＆送料無料]') ||
    art.introText?.includes('温かみのある深みテラコッタピグメント')
  ) {
    removedCount++;
    return;
  }

  uniqueMap.set(nameKey, art);
  if (linkKey) uniqueMap.set(linkKey, art);
  uniqueMap.set(combinedKey, art);
});

// 重複を除去した一意な記事配列を生成
const deduplicatedArticles = Array.from(new Set(uniqueMap.values()));

console.log(`✅ 重複・破損コピー記事 ${removedCount} 件を完全排除しました。`);
console.log(`✨ 残存する完全独立・高品質コスメ記事数: ${deduplicatedArticles.length} 件`);

fs.writeFileSync(articlesJsonPath, JSON.stringify(deduplicatedArticles, null, 2), 'utf8');
console.log(`💾 src/data/articles.json を最新更新完了！`);
