import fs from 'fs';
import { getLipMaskArticleContent } from './autumn_series29_article1_lipmask.mjs';
import { getPrimerArticleContent } from './autumn_series29_article2_primer.mjs';
import { getBathArticleContent } from './autumn_series29_article3_bath.mjs';
import { lipArticles, primerArticles, bathArticles } from './insert_autumn_series29_helper.mjs';

const dataTsPath = 'src/data.ts';
let dataTsContent = fs.readFileSync(dataTsPath, 'utf8');

// 既存の誤った3記事（dateやcontentを使っているもの）の開始インデックスを特定
const startMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [\n  {';
const endMarker = '{\n  "id": "feat-autumn-advanced-eye-cream-wrinkle-repair-10"';

const startIndex = dataTsContent.indexOf(startMarker);
const endIndex = dataTsContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('置換対象の位置が見つかりません', { startIndex, endIndex });
  process.exit(1);
}

const lipMaskPost = {
  id: "feat-autumn-hydrating-lip-sleeping-mask-chapped-10",
  slug: "autumn-hydrating-lip-sleeping-mask-chapped-10",
  title: "【唇の皮剥け・深い縦ジワ・口紅割れを即効救命】高保湿リップスリーピングマスク＆濃厚リップバーム10選",
  subtitle: "皮脂腺がなく水分蒸散が激しい唇を夜間集中リペア！ベリーコンプレックス・PDRN・高純度セラミド配合で翌朝生まれたてのマシュマロ唇へ導く名品完全比較",
  targetGender: "unisex",
  authorId: "author-tachibana",
  authorName: "橘 えりか",
  authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
  authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  createdAt: "2026-10-26",
  readTimeMinutes: 48,
  introText: "皮脂腺がなく水分蒸散が激しい唇を夜間集中リペア！ベリーコンプレックス・PDRN・高純度セラミド配合で翌朝生まれたてのマシュマロ唇へ導く名品完全比較",
  isHallOfFame: true,
  coverImage: "https://shop.r10s.jp/laneige-r/cabinet/event/13528295/1212040001_2610.jpg",
  recommendedItemCodes: lipArticles.map(a => a.id),
  contentMarkdown: getLipMaskArticleContent()
};

const primerPost = {
  id: "feat-autumn-hydrating-serum-primer-flaky-skin-10",
  slug: "autumn-hydrating-serum-primer-flaky-skin-10",
  title: "【粉ふき・毛穴落ち・夕方のベース割れを鉄壁阻止】高保湿美容液化粧下地10選",
  subtitle: "空気の乾燥と寒暖差によるベース崩れを83%以上の美容液成分で完全防止！ナイアシンアミド・PDRN・生ツヤパール配合で一日中みずみずしい発光美肌を保つ名品比較",
  targetGender: "women",
  authorId: "author-tachibana",
  authorName: "橘 えりか",
  authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
  authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  createdAt: "2026-10-26",
  readTimeMinutes: 50,
  introText: "空気の乾燥と寒暖差によるベース崩れを83%以上の美容液成分で完全防止！ナイアシンアミド・PDRN・生ツヤパール配合で一日中みずみずしい発光美肌を保つ名品比較",
  isHallOfFame: true,
  coverImage: "https://shop.r10s.jp/anuajapan/cabinet/anua00150/imgrc0138152219.jpg",
  recommendedItemCodes: primerArticles.map(a => a.id),
  contentMarkdown: getPrimerArticleContent()
};

const bathPost = {
  id: "feat-autumn-medicinal-bicarbonate-bath-cold-dry-10",
  slug: "autumn-medicinal-bicarbonate-bath-cold-dry-10",
  title: "【末端冷え・首肩こり・湯上がり過乾燥を根本解消】薬用高保湿重炭酸入浴剤＆アロマバスソルト10選",
  subtitle: "さら湯による肌セラミド流出を防ぎ、重炭酸イオンと硫酸マグネシウムで芯まで温める！入浴後もポカポカとうるおいが持続する温活＆ボディケアの最高峰を徹底比較",
  targetGender: "unisex",
  authorId: "author-tachibana",
  authorName: "橘 えりか",
  authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
  authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  createdAt: "2026-10-26",
  readTimeMinutes: 46,
  introText: "さら湯による肌セラミド流出を防ぎ、重炭酸イオンと硫酸マグネシウムで芯まで温める！入浴後もポカポカとうるおいが持続する温活＆ボディケアの最高峰を徹底比較",
  isHallOfFame: true,
  coverImage: "https://shop.r10s.jp/chapon/cabinet/compass1632731853.jpg",
  recommendedItemCodes: bathArticles.map(a => a.id),
  contentMarkdown: getBathArticleContent()
};

const threePostsJson = [lipMaskPost, primerPost, bathPost].map(p => JSON.stringify(p, null, 2)).join(',\n') + ',\n';

const prefix = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [\n';
const newContent = dataTsContent.slice(0, startIndex + prefix.length) + threePostsJson + dataTsContent.slice(endIndex);

fs.writeFileSync(dataTsPath, newContent, 'utf8');
console.log('✅ src/data.ts の第29弾投稿を完全な BlogPost 型に置換完了しました！');
