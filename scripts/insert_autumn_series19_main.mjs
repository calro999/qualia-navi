// scripts/insert_autumn_series19_main.mjs
import fs from 'fs';
import path from 'path';
import {
  lipItemsRaw,
  primerItemsRaw,
  eyeItemsRaw,
  lipArticles,
  primerArticles,
  eyeArticles,
  updateArticlesJson
} from './insert_autumn_series19_helper.mjs';

import { getLipArticleContent } from './autumn_series19_article1_lip.mjs';
import { getPrimerArticleContent } from './autumn_series19_article2_primer.mjs';
import { getEyeArticleContent } from './autumn_series19_article3_eye.mjs';

console.log('🍂 [2026秋コスメ特集 第19弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const lipContent = getLipArticleContent();
const primerContent = getPrimerArticleContent();
const eyeContent = getEyeArticleContent();

console.log(`- 記事1 (秋高保湿リップトリートメント10選) 文字数: 約${lipContent.length}文字`);
console.log(`- 記事2 (秋高保湿美容液プライマー10選) 文字数: 約${primerContent.length}文字`);
console.log(`- 記事3 (秋ホットアイマスク・温感アイケア10選) 文字数: 約${eyeContent.length}文字`);

if (lipContent.length < 5000 || primerContent.length < 5000 || eyeContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-intensive-lip-treatment-night-mask-10",
    slug: "autumn-intensive-lip-treatment-night-mask-10",
    title: "【秋風と乾燥による唇の皮剥け・縦ジワに】翌朝ぷるん！高保湿リップトリートメント＆ナイトマスク10選",
    subtitle: "皮脂腺のない無防備な唇を秋の乾燥と冷風から徹底シールド！抱水性植物オイル＆高純度セラミド配合でひび割れ・皮めくれを集中リペアしふっくら血色リップを蘇らせる実力派完全比較",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 38,
    introText: "皮脂腺のない無防備な唇を秋の乾燥と冷風から徹底シールド！抱水性植物オイル＆高純度セラミド配合でひび割れ・皮めくれを集中リペアしふっくら血色リップを蘇らせる実力派完全比較",
    isHallOfFame: true,
    coverImage: lipItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lip.jpg",
    recommendedItemCodes: lipArticles.map(a => a.id),
    contentMarkdown: lipContent
  },
  {
    id: "feat-autumn-hydrating-serum-primer-base-dry-skin-10",
    slug: "autumn-hydrating-serum-primer-base-dry-skin-10",
    title: "【乾燥によるファンデの粉浮き・毛穴落ちに】美容液80%以上！秋の高保湿プライマー＆うるおい下地10選",
    subtitle: "夏の皮脂防止下地から秋のスキンケア発想下地へシフト！ヒアルロン酸・ナイアシンアミド配合で一日中うるおいを閉じ込め夕方のくすみ・乾燥崩れをゼロにする高保湿プライマー完全ガイド",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 37,
    introText: "夏の皮脂防止下地から秋のスキンケア発想下地へシフト！ヒアルロン酸・ナイアシンアミド配合で一日中うるおいを閉じ込め夕方のくすみ・乾燥崩れをゼロにする高保湿プライマー完全ガイド",
    isHallOfFame: true,
    coverImage: primerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/primer.jpg",
    recommendedItemCodes: primerArticles.map(a => a.id),
    contentMarkdown: primerContent
  },
  {
    id: "feat-autumn-warming-eye-care-hot-mask-fatigue-10",
    slug: "autumn-warming-eye-care-hot-mask-fatigue-10",
    title: "【秋の冷え・デスクワークによる疲れ目と青クマに】芯からほぐす！ホットアイマスク＆温感アイケア10選",
    subtitle: "秋の夜長のブルーライト疲労と気温低下による目元の血行不良を温熱で一掃！グラフェン速暖・EMS・エアマッサージ搭載で重いまぶたをパッと明るく引き上げる最新アイケアギア完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 36,
    introText: "秋の夜長のブルーライト疲労と気温低下による目元の血行不良を温熱で一掃！グラフェン速暖・EMS・エアマッサージ搭載で重いまぶたをパッと明るく引き上げる最新アイケアギア完全網羅",
    isHallOfFame: true,
    coverImage: eyeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eye.jpg",
    recommendedItemCodes: eyeArticles.map(a => a.id),
    contentMarkdown: eyeContent
  }
];

// data.ts の INITIAL_BLOG_POSTS を更新
const dataTsPath = path.resolve('src/data.ts');
let dataTsContent = fs.readFileSync(dataTsPath, 'utf8');

const blogPostsMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
if (dataTsContent.includes(blogPostsMarker)) {
  const jsonToInsert = blogPostsToAdd.map(bp => JSON.stringify(bp, null, 2)).join(',\n') + ',\n';
  dataTsContent = dataTsContent.replace(
    blogPostsMarker,
    blogPostsMarker + '\n' + jsonToInsert
  );
  fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第19弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第19弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 19, "slug": "autumn-intensive-lip-treatment-night-mask-10", "category": "リップケア", "concern": "秋の乾燥風と冷気による唇の皮剥け・ひび割れ・縦ジワ", "shortTitle": "翌朝ぷるん！高保湿リップトリートメント＆ナイトマスク10選" },
  { "series": 19, "slug": "autumn-hydrating-serum-primer-base-dry-skin-10", "category": "ベースメイク", "concern": "秋の空気乾燥によるファンデーションの粉浮き・毛穴落ち・くすみ", "shortTitle": "美容液80%以上！秋の高保湿プライマー＆うるおい下地10選" },
  { "series": 19, "slug": "autumn-warming-eye-care-hot-mask-fatigue-10", "category": "パーツケア", "concern": "秋の夜長のデスクワーク眼精疲労・気温低下による血行不良青クマ", "shortTitle": "芯からほぐす！ホットアイマスク＆温感アイケア10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第19弾の統合処理がすべて正常に完了しました！');
