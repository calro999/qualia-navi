// scripts/insert_autumn_series26_main.mjs
import fs from 'fs';
import path from 'path';
import {
  peelItemsRaw,
  cheekItemsRaw,
  nightItemsRaw,
  peelArticles,
  cheekArticles,
  nightArticles,
  updateArticlesJson
} from './insert_autumn_series26_helper.mjs';

import { getPeelArticleContent } from './autumn_series26_article1_peel.mjs';
import { getCheekArticleContent } from './autumn_series26_article2_cheek.mjs';
import { getNightArticleContent } from './autumn_series26_article3_night.mjs';

console.log('🍂 [2026秋コスメ特集 第26弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const peelContent = getPeelArticleContent();
const cheekContent = getCheekArticleContent();
const nightContent = getNightArticleContent();

console.log(`- 記事1 (秋角質柔軟ピーリング美容液10選) 文字数: 約${peelContent.length}文字`);
console.log(`- 記事2 (秋高保湿リキッドチーク10選) 文字数: 約${cheekContent.length}文字`);
console.log(`- 記事3 (秋濃厚ナイトリペアクリーム10選) 文字数: 約${nightContent.length}文字`);

if (peelContent.length < 5000 || cheekContent.length < 5000 || nightContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-mild-peeling-serum-smooth-pores-10",
    slug: "autumn-mild-peeling-serum-smooth-pores-10",
    title: "【秋のゴワつき毛穴・化粧水弾き肌に】角質柔軟ピーリング美容液10選",
    subtitle: "夏の紫外線ダメージによる遅れてきた角質肥厚を摩擦レスにほぐす！サリチル酸・乳酸・フルーツ酸配合で浸透ルートを再開通させむき卵のようなつるすべ美肌へ導く名品完全比較",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 38,
    introText: "夏の紫外線ダメージによる遅れてきた角質肥厚を摩擦レスにほぐす！サリチル酸・乳酸・フルーツ酸配合で浸透ルートを再開通させむき卵のようなつるすべ美肌へ導く名品完全比較",
    isHallOfFame: true,
    coverImage: peelItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/peel.jpg",
    recommendedItemCodes: peelArticles.map(a => a.id),
    contentMarkdown: peelContent
  },
  {
    id: "feat-autumn-hydrating-liquid-blush-cheek-10",
    slug: "autumn-hydrating-liquid-blush-cheek-10",
    title: "【秋の乾燥によるチーク粉浮き・血色レスに】美容液リキッドチーク10選",
    subtitle: "パウダーが粉っぽく小ジワに割れる秋の頬に！美容オイルとヒアルロン酸が溶け込んだ高保湿リキッドで内側からじゅわっと上気したような生ツヤと多幸感血色を叶える決定版ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 37,
    introText: "パウダーが粉っぽく小ジワに割れる秋の頬に！美容オイルとヒアルロン酸が溶け込んだ高保湿リキッドで内側からじゅわっと上気したような生ツヤと多幸感血色を叶える決定版ガイド",
    isHallOfFame: true,
    coverImage: cheekItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cheek.jpg",
    recommendedItemCodes: cheekArticles.map(a => a.id),
    contentMarkdown: cheekContent
  },
  {
    id: "feat-autumn-dense-night-repair-cream-dry-lines-10",
    slug: "autumn-dense-night-repair-cream-dry-lines-10",
    title: "【秋の就寝中過乾燥・朝のカピカピ肌に】濃厚ナイトリペアクリーム10選",
    subtitle: "湿度が30%台へ急落する深夜の水分蒸発と寝具摩擦を極厚シールド！ヒト幹細胞・エクソソーム・レチノール配合で睡眠中の肌再生力を最大化し翌朝ぷるんと押し返すハリ肌を育む完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 36,
    introText: "湿度が30%台へ急落する深夜の水分蒸発と寝具摩擦を極厚シールド！ヒト幹細胞・エクソソーム・レチノール配合で睡眠中の肌再生力を最大化し翌朝ぷるんと押し返すハリ肌を育む完全網羅",
    isHallOfFame: true,
    coverImage: nightItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/night.jpg",
    recommendedItemCodes: nightArticles.map(a => a.id),
    contentMarkdown: nightContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第26弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第26弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 26, "slug": "autumn-mild-peeling-serum-smooth-pores-10", "category": "角質＆毛穴ケア", "concern": "秋のゴワつき・角質肥厚・化粧水浸透不良・毛穴の黒ずみ", "shortTitle": "角質柔軟ピーリング美容液10選" },
  { "series": 26, "slug": "autumn-hydrating-liquid-blush-cheek-10", "category": "ポイントメイク", "concern": "秋の乾燥によるチーク粉浮き・血色感消失・頬の小ジワ目立ち", "shortTitle": "美容液リキッドチーク10選" },
  { "series": 26, "slug": "autumn-dense-night-repair-cream-dry-lines-10", "category": "ナイトスキンケア", "concern": "深夜の湿度急降下による過乾燥・朝のカピカピ感・寝具摩擦", "shortTitle": "濃厚ナイトリペアクリーム10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第26弾の統合処理がすべて正常に完了しました！');
