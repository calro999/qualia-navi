// scripts/insert_autumn_series22_main.mjs
import fs from 'fs';
import path from 'path';
import {
  linerItemsRaw,
  liquidEyeItemsRaw,
  bathMilkItemsRaw,
  linerArticles,
  liquidEyeArticles,
  bathMilkArticles,
  updateArticlesJson
} from './insert_autumn_series22_helper.mjs';

import { getLinerArticleContent } from './autumn_series22_article1_liner.mjs';
import { getLiquidEyeArticleContent } from './autumn_series22_article2_liquideye.mjs';
import { getBathMilkArticleContent } from './autumn_series22_article3_bathmilk.mjs';

console.log('🍂 [2026秋コスメ特集 第22弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const linerContent = getLinerArticleContent();
const liquidEyeContent = getLiquidEyeArticleContent();
const bathMilkContent = getBathMilkArticleContent();

console.log(`- 記事1 (秋高保湿リップライナー10選) 文字数: 約${linerContent.length}文字`);
console.log(`- 記事2 (秋高保湿リキッドアイシャドウ10選) 文字数: 約${liquidEyeContent.length}文字`);
console.log(`- 記事3 (秋薬用高保湿バスミルク10選) 文字数: 約${bathMilkContent.length}文字`);

if (linerContent.length < 5000 || liquidEyeContent.length < 5000 || bathMilkContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-hydrating-lip-liner-plump-pencil-10",
    slug: "autumn-hydrating-lip-liner-plump-pencil-10",
    title: "【秋の乾燥による唇の輪郭ぼやけ・縦ジワ滲みに】高保湿リップライナー＆ペンシル10選",
    subtitle: "気温低下で血色を失いぼやけたリップラインをなめらか補正！シアバター＆ヒアルロン酸配合で縦ジワにじみを防ぎ人中短縮ふっくらオーバーリップを叶える名品完全比較",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 38,
    introText: "気温低下で血色を失いぼやけたリップラインをなめらか補正！シアバター＆ヒアルロン酸配合で縦ジワにじみを防ぎ人中短縮ふっくらオーバーリップを叶える名品完全比較",
    isHallOfFame: true,
    coverImage: linerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/liner.jpg",
    recommendedItemCodes: linerArticles.map(a => a.id),
    contentMarkdown: linerContent
  },
  {
    id: "feat-autumn-moist-liquid-eyeshadow-wet-glow-10",
    slug: "autumn-moist-liquid-eyeshadow-wet-glow-10",
    title: "【まぶたの乾燥ちりめんジワ・くぼみ影を救う】濡れツヤ高保湿リキッドアイシャドウ10選",
    subtitle: "パウダーが粉落ちする秋の乾燥まぶたにウォーターリッチ薄膜がピタッと密着！偏光パールがまぶたの影を光で飛ばし一日中二重幅にたまらずヨレない極上アイカラー完全ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 37,
    introText: "パウダーが粉落ちする秋の乾燥まぶたにウォーターリッチ薄膜がピタッと密着！偏光パールがまぶたの影を光で飛ばし一日中二重幅にたまらずヨレない極上アイカラー完全ガイド",
    isHallOfFame: true,
    coverImage: liquidEyeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/liquideye.jpg",
    recommendedItemCodes: liquidEyeArticles.map(a => a.id),
    contentMarkdown: liquidEyeContent
  },
  {
    id: "feat-autumn-moist-bath-milk-dry-skin-body-10",
    slug: "autumn-moist-bath-milk-dry-skin-body-10",
    title: "【秋の長風呂と全身粉ふき乾燥を防ぐ】薬用高保湿バスミルク＆スキンケア入浴液10選",
    subtitle: "お湯のピリピリ感と湯上がりの急激な過乾燥・かゆみを徹底防止！セラミド・米ぬか発酵エキス・ホホバオイルがお湯全体を濃厚美容液に変え吸い付くモチモチ肌を育む名品完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 36,
    introText: "お湯のピリピリ感と湯上がりの急激な過乾燥・かゆみを徹底防止！セラミド・米ぬか発酵エキス・ホホバオイルがお湯全体を濃厚美容液に変え吸い付くモチモチ肌を育む名品完全網羅",
    isHallOfFame: true,
    coverImage: bathMilkItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bathmilk.jpg",
    recommendedItemCodes: bathMilkArticles.map(a => a.id),
    contentMarkdown: bathMilkContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第22弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第22弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 22, "slug": "autumn-hydrating-lip-liner-plump-pencil-10", "category": "リップメイク", "concern": "秋の冷え・乾燥による唇の輪郭ぼやけ・縦ジワ滲み・人中短縮", "shortTitle": "高保湿リップライナー＆ペンシル10選" },
  { "series": 22, "slug": "autumn-moist-liquid-eyeshadow-wet-glow-10", "category": "アイメイク", "concern": "まぶたの乾燥ちりめんジワ・くぼみ影・二重幅のヨレ防止", "shortTitle": "濡れツヤ高保湿リキッドアイシャドウ10選" },
  { "series": 22, "slug": "autumn-moist-bath-milk-dry-skin-body-10", "category": "ボディケア", "concern": "長風呂による角質間脂質の流出・湯上がりの急激な過乾燥・粉ふきかゆみ", "shortTitle": "薬用高保湿バスミルク＆スキンケア入浴液10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第22弾の統合処理がすべて正常に完了しました！');
