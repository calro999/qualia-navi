// scripts/replace_hub.mjs
import fs from 'fs';
import path from 'path';
import { getAutumnHubArticleContent } from './generate_autumn_hub_article.mjs';

const dataTsPath = path.resolve('src/data.ts');
let dataTsContent = fs.readFileSync(dataTsPath, 'utf8');

const postsMeta = JSON.parse(fs.readFileSync('scripts/autumn_posts_meta.json', 'utf8'));

const hubIdx = dataTsContent.indexOf('"id": "feat-autumn-cosmetics-guide-45-series-hub"', 500000);
const objStart = dataTsContent.lastIndexOf('{', hubIdx);
const nextIdIdx = dataTsContent.indexOf('"id": "feat-autumn-eye-cream-fine-lines-crow-feet-10"', hubIdx);
const objEnd = dataTsContent.lastIndexOf('{', nextIdIdx);

console.log('hubIdx:', hubIdx, 'objStart:', objStart, 'objEnd:', objEnd);

const newHubContent = getAutumnHubArticleContent();

const newHubPost = {
  id: "feat-autumn-cosmetics-guide-45-series-hub",
  slug: "autumn-cosmetics-guide-45-series-hub",
  title: "【2026秋コスメ総まとめ】乾燥・寒暖差・パーツケア悩みを全方位解決する57大特集・570選コンプリートガイド",
  subtitle: "第1弾〜第19弾の全57大特集・厳選570商品を完全網羅！スキンケア・ベースメイク・ヘア＆スカルプ・ハンド＆フット・入浴バスケア・目元温熱まで、秋特有のリアルな悩みに寄り添い解決する総合目次ページ",
  targetGender: "unisex",
  authorId: "author-tachibana",
  authorName: "橘 えりか",
  authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
  authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  createdAt: "2026-10-23",
  readTimeMinutes: 58,
  introText: "第1弾〜第19弾の全57大特集・厳選570商品を完全網羅！スキンケア・ベースメイク・ヘア＆スカルプ・ハンド＆フット・入浴バスケア・目元温熱まで、秋特有のリアルな悩みに寄り添い解決する総合目次ページ",
  isHallOfFame: true,
  coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
  recommendedItemCodes: postsMeta.slice(0, 10).map(p => `blog-${p.slug}`),
  contentMarkdown: newHubContent
};

const replacement = JSON.stringify(newHubPost, null, 2) + ',\n\n';
const updatedTs = dataTsContent.slice(0, objStart) + replacement + dataTsContent.slice(objEnd);
fs.writeFileSync(dataTsPath, updatedTs, 'utf8');
console.log('✅ src/data.ts のハブ記事を57大特集・570選仕様に置換完了しました！');
