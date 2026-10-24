// scripts/insert_autumn_series25_main.mjs
import fs from 'fs';
import path from 'path';
import {
  powderItemsRaw,
  neckItemsRaw,
  nailItemsRaw,
  powderArticles,
  neckArticles,
  nailArticles,
  updateArticlesJson
} from './insert_autumn_series25_helper.mjs';

import { getPowderArticleContent } from './autumn_series25_article1_powder.mjs';
import { getNeckArticleContent } from './autumn_series25_article2_neck.mjs';
import { getNailArticleContent } from './autumn_series25_article3_nail.mjs';

console.log('🍂 [2026秋コスメ特集 第25弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const powderContent = getPowderArticleContent();
const neckContent = getNeckArticleContent();
const nailContent = getNailArticleContent();

console.log(`- 記事1 (秋高保湿プレストパウダー10選) 文字数: 約${powderContent.length}文字`);
console.log(`- 記事2 (秋薬用ネック＆デコルテクリーム10選) 文字数: 約${neckContent.length}文字`);
console.log(`- 記事3 (秋高浸透ネイルオイル10選) 文字数: 約${nailContent.length}文字`);

if (powderContent.length < 5000 || neckContent.length < 5000 || nailContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-hydrating-pressed-powder-dry-shine-10",
    slug: "autumn-hydrating-pressed-powder-dry-shine-10",
    title: "【秋のインナードライ・粉ふき＆テカリ防止に】高保湿プレストパウダー10選",
    subtitle: "塗ると乾燥して粉が吹き塗らないとTゾーンがテカる秋の悩みを一掃！美容オイルやアミノ酸を練り込んだしっとり生ツヤ微粒子パウダーで夕方まで陶器肌をキープする名品完全比較",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 38,
    introText: "塗ると乾燥して粉が吹き塗らないとTゾーンがテカる秋の悩みを一掃！美容オイルやアミノ酸を練り込んだしっとり生ツヤ微粒子パウダーで夕方まで陶器肌をキープする名品完全比較",
    isHallOfFame: true,
    coverImage: powderItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/powder.jpg",
    recommendedItemCodes: powderArticles.map(a => a.id),
    contentMarkdown: powderContent
  },
  {
    id: "feat-autumn-neck-decollete-firming-cream-10",
    slug: "autumn-neck-decollete-firming-cream-10",
    title: "【秋の深まる首の横ジワ・スマホ首たるみに】薬用ネック＆デコルテクリーム10選",
    subtitle: "タートルネックの摩擦や乾燥で急激に目立ち始める首元の老け見えを救う！ナイアシンアミド・iPS細胞培養液・リフトフィルム処方で服に張り付かずピンと張るハリを育む名品ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 37,
    introText: "タートルネックの摩擦や乾燥で急激に目立ち始める首元の老け見えを救う！ナイアシンアミド・iPS細胞培養液・リフトフィルム処方で服に張り付かずピンと張るハリを育む名品ガイド",
    isHallOfFame: true,
    coverImage: neckItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/neck.jpg",
    recommendedItemCodes: neckArticles.map(a => a.id),
    contentMarkdown: neckContent
  },
  {
    id: "feat-autumn-nail-strengthening-oil-serum-10",
    slug: "autumn-nail-strengthening-oil-serum-10",
    title: "【秋の爪の縦スジ・二枚爪・ささくれ防止に】高浸透ネイルオイル＆爪育セラム10選",
    subtitle: "冷え込みと外気乾燥で水分が抜けペラペラ割れやすくなった指先に！天然シアバター・ケラチン・ヒト幹細胞がハイポニキウム深部まで浸透し縦長美爪を育む決定版完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 36,
    introText: "冷え込みと外気乾燥で水分が抜けペラペラ割れやすくなった指先に！天然シアバター・ケラチン・ヒト幹細胞がハイポニキウム深部まで浸透し縦長美爪を育む決定版完全網羅",
    isHallOfFame: true,
    coverImage: nailItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/nail.jpg",
    recommendedItemCodes: nailArticles.map(a => a.id),
    contentMarkdown: nailContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第25弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第25弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 25, "slug": "autumn-hydrating-pressed-powder-dry-shine-10", "category": "ベースメイク", "concern": "秋のインナードライ・粉ふき・Tゾーンテカリ・酸化亜鉛フリー", "shortTitle": "高保湿プレストパウダー10選" },
  { "series": 25, "slug": "autumn-neck-decollete-firming-cream-10", "category": "ネック＆デコルテケア", "concern": "首の横ジワ・スマホ首たるみ・ニット摩擦・乾燥くすみ", "shortTitle": "薬用ネック＆デコルテクリーム10選" },
  { "series": 25, "slug": "autumn-nail-strengthening-oil-serum-10", "category": "ネイル＆ハンドケア", "concern": "秋の爪の縦スジ・二枚爪・薄爪ペラペラ・甘皮ささくれ", "shortTitle": "高浸透ネイルオイル＆爪育セラム10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第25弾の統合処理がすべて正常に完了しました！');
