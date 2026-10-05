import fs from 'fs';
import path from 'path';

console.log('⚡ [Catalog Generator] クライアントバンドル超軽量化のためカタログJSONと個別記事JSONを分離生成します...');

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');

if (!fs.existsSync(articlesJsonPath)) {
  console.error('articles.json not found');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));

// 1. 一覧用軽量カタログ（不要な重いcontentやスペック全文を省く）
const catalog = articles.map(art => ({
  id: art.id,
  title: art.title,
  productName: art.productName || art.title,
  category: art.category,
  categoryLabel: art.categoryLabel || art.category,
  price: art.price,
  rakutenPrice: art.rakutenPrice || art.price,
  imageUrl: art.imageUrl,
  affiliateLink: art.affiliateLink,
  originalUrl: art.originalUrl || art.affiliateLink,
  rating: art.rating || 4.5,
  reviewCount: art.reviewCount || 10,
  introText: (art.introText || '').slice(0, 160),
  shopName: art.shopName || '楽天市場',
  isHallOfFame: !!art.isHallOfFame,
  createdAt: art.createdAt || new Date().toISOString()
}));

// 出力先
const publicDataDir = path.join(projectRoot, 'public', 'data');
const publicArticlesDir = path.join(publicDataDir, 'articles');
fs.mkdirSync(publicArticlesDir, { recursive: true });

// public/data/catalog.json
fs.writeFileSync(path.join(publicDataDir, 'catalog.json'), JSON.stringify(catalog), 'utf8');

// src/data/catalog.json （静的import用にも出力）
fs.writeFileSync(path.join(projectRoot, 'src', 'data', 'catalog.json'), JSON.stringify(catalog), 'utf8');

// 2. 個別記事JSON（オンデマンド取得用）
let count = 0;
articles.forEach(art => {
  const filePath = path.join(publicArticlesDir, `${art.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(art), 'utf8');
  count++;
});

console.log(`✅ [Catalog Generator] 一覧用カタログ生成完了 (${(fs.statSync(path.join(publicDataDir, 'catalog.json')).size / 1024 / 1024).toFixed(2)} MB)`);
console.log(`✅ [Catalog Generator] 個別記事JSON ${count} 件を public/data/articles/ へ出力完了！`);
