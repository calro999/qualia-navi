import fs from 'fs';
import path from 'path';

console.log('🧹 記事の徹底クリーニング（AI臭さ・メタ情報の完全排除・自然なプロ編集記事へのブラッシュアップ）を開始します...');

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

let cleanedCount = 0;

articlesData = articlesData.map(article => {
  if (!article.content) return article;

  let content = article.content;

  // 1. メタ情報ブロックの削除/自然な導入への置換
  // 例: > **【2026-08-30 最新 / 対象クエリ: ...】** ...
  content = content.replace(/> \*\*【\d{4}-\d{2}-\d{2} 最新 \/ 対象クエリ:.*?】\*\*[\s\S]*?>.*?\n\n---\n\n/g, '');
  content = content.replace(/> \*\*【\d{4}-\d{2}-\d{2} 最新 \/ 対象クエリ:.*?】\*\*[\s\S]*?\n\n---\n\n/g, '');
  content = content.replace(/> \*\*【.*?対象クエリ.*?】\*\*[\s\S]*?\n\n/g, '');
  content = content.replace(/楽天市場OpenAPIから直接取得した確定画像・最新価格・公式アフィリエイトリンクをもとに、.*?\n\n/g, '');
  content = content.replace(/楽天市場のOpenAPIから直接取得した.*?\n\n/g, '');
  content = content.replace(/確定商品画像・最新価格・アフィリエイトリンクを使用しています。/g, '');

  // 2. 「対象クエリ:」などのシステム用語の削除
  content = content.replace(/対象クエリ[:：].*?\n/g, '');
  content = content.replace(/【対象クエリ[:：].*?】/g, '');

  // 3. テーブル見出しやセクション見出しの「対象クエリ」の自然な日本語化
  content = content.replace(/## 📱 (.*?) — おすすめ10選 一覧比較表/g, '## 📱 $1 おすすめ人気10選 一覧比較表');

  // 4. 重複した水平線の整理
  content = content.replace(/\n---\n\n---\n/g, '\n---\n');

  if (content !== article.content) {
    cleanedCount++;
    return {
      ...article,
      content: content.trim()
    };
  }

  return article;
});

fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
console.log(`✨ クリーニング完了: ${cleanedCount}件の記事を自然なプロ編集スタイルへブラッシュアップしました。`);
