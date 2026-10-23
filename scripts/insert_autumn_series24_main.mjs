// scripts/insert_autumn_series24_main.mjs
import fs from 'fs';
import path from 'path';
import {
  milkItemsRaw,
  stickItemsRaw,
  footItemsRaw,
  milkArticles,
  stickArticles,
  footArticles,
  updateArticlesJson
} from './insert_autumn_series24_helper.mjs';

import { getMilkArticleContent } from './autumn_series24_article1_milk.mjs';
import { getStickArticleContent } from './autumn_series24_article2_stick.mjs';
import { getFootArticleContent } from './autumn_series24_article3_foot.mjs';

console.log('🍂 [2026秋コスメ特集 第24弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const milkContent = getMilkArticleContent();
const stickContent = getStickArticleContent();
const footContent = getFootArticleContent();

console.log(`- 記事1 (秋高保湿クレンジングミルク10選) 文字数: 約${milkContent.length}文字`);
console.log(`- 記事2 (秋高密着スティックコンシーラー10選) 文字数: 約${stickContent.length}文字`);
console.log(`- 記事3 (秋薬用かかと保湿クリーム10選) 文字数: 約${footContent.length}文字`);

if (milkContent.length < 5000 || stickContent.length < 5000 || footContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-hydrating-cleansing-milk-barrier-10",
    slug: "autumn-hydrating-cleansing-milk-barrier-10",
    title: "【秋の乾燥ゴワつき・バリア乱れ肌に】高保湿クレンジングミルク10選",
    subtitle: "夏と同じオイルで洗ってつっぱっていませんか？美容液成分80%以上・セラミド＆植物オイル高配合で摩擦レスにメイクオフし洗い上がりふっくらモチ肌を育む名品完全比較",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 38,
    introText: "夏と同じオイルで洗ってつっぱっていませんか？美容液成分80%以上・セラミド＆植物オイル高配合で摩擦レスにメイクオフし洗い上がりふっくらモチ肌を育む名品完全比較",
    isHallOfFame: true,
    coverImage: milkItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/milk.jpg",
    recommendedItemCodes: milkArticles.map(a => a.id),
    contentMarkdown: milkContent
  },
  {
    id: "feat-autumn-creamy-stick-concealer-fine-lines-10",
    slug: "autumn-creamy-stick-concealer-fine-lines-10",
    title: "【目元の乾燥小ジワ・夕方のひび割れ防止に】高密着スティックコンシーラー10選",
    subtitle: "外気乾燥と表情の動きでファンデが割れる秋の悩みを一撃解消！体温でとろけるオイルバーム処方でシミ・クマ・ほうれい線を夕方までしわ割れ知らずに鉄壁カバーする名品ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 37,
    introText: "外気乾燥と表情の動きでファンデが割れる秋の悩みを一撃解消！体温でとろけるオイルバーム処方でシミ・クマ・ほうれい線を夕方までしわ割れ知らずに鉄壁カバーする名品ガイド",
    isHallOfFame: true,
    coverImage: stickItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/stick.jpg",
    recommendedItemCodes: stickArticles.map(a => a.id),
    contentMarkdown: stickContent
  },
  {
    id: "feat-autumn-intensive-heel-care-urea-cream-10",
    slug: "autumn-intensive-heel-care-urea-cream-10",
    title: "【秋のガサガサかかと・タイツ電線防止に】薬用高保湿かかとクリーム10選",
    subtitle: "冷え込みでターンオーバーが停止し分厚く硬化した角質を尿素の力でふっくら柔軟化！エミューオイル・スクワラン・プロポリスがひび割れを防ぎ生まれたての素足を蘇らせる完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 36,
    introText: "冷え込みでターンオーバーが停止し分厚く硬化した角質を尿素の力でふっくら柔軟化！エミューオイル・スクワラン・プロポリスがひび割れを防ぎ生まれたての素足を蘇らせる完全網羅",
    isHallOfFame: true,
    coverImage: footItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/foot.jpg",
    recommendedItemCodes: footArticles.map(a => a.id),
    contentMarkdown: footContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第24弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第24弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 24, "slug": "autumn-hydrating-cleansing-milk-barrier-10", "category": "クレンジング・洗顔", "concern": "秋の乾燥ゴワつき・バリア崩れ・洗顔後のつっぱり感防止", "shortTitle": "高保湿クレンジングミルク10選" },
  { "series": 24, "slug": "autumn-creamy-stick-concealer-fine-lines-10", "category": "ベースメイク", "concern": "目元の乾燥小ジワ・ほうれい線・夕方のファンデひび割れ防止", "shortTitle": "高密着スティックコンシーラー10選" },
  { "series": 24, "slug": "autumn-intensive-heel-care-urea-cream-10", "category": "フット＆パーツケア", "concern": "秋のガサガサかかと・ストッキング電線・角質硬化ひび割れ", "shortTitle": "薬用高保湿かかとクリーム10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第24弾の統合処理がすべて正常に完了しました！');
