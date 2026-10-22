import fs from 'fs';
import path from 'path';
import {
  massageItemsRaw,
  blushItemsRaw,
  footItemsRaw,
  massageArticles,
  blushArticles,
  footArticles,
  updateArticlesJson
} from './insert_autumn_series17_helper.mjs';

import { getMassageArticleContent } from './autumn_series17_article1_massage.mjs';
import { getBlushArticleContent } from './autumn_series17_article2_blush.mjs';
import { getFootArticleContent } from './autumn_series17_article3_foot.mjs';

console.log('🍂 [2026秋コスメ特集 第17弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const massageContent = getMassageArticleContent();
const blushContent = getBlushArticleContent();
const footContent = getFootArticleContent();

console.log(`- 記事1 (秋温感マッサージジェル10選) 文字数: 約${massageContent.length}文字`);
console.log(`- 記事2 (秋高保湿リキッドチーク10選) 文字数: 約${blushContent.length}文字`);
console.log(`- 記事3 (秋高保湿フットクリーム10選) 文字数: 約${footContent.length}文字`);

if (massageContent.length < 5000 || blushContent.length < 5000 || footContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-warming-massage-gel-cream-dullness-10",
    slug: "autumn-warming-massage-gel-cream-dullness-10",
    title: "【秋の乾燥と冷えで肌の透明感が失われくすむ季節に】血色・ツヤ蘇る！秋の温感マッサージジェル＆クリーム10選",
    subtitle: "気温低下による顔の血行不良と青白い冷えぐすみをじんわり温めて撃退！高純度マグネシウム＆植物エキス配合で内側から上気した血色ツヤ肌を呼び戻す温感マッサージ名品完全比較",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 38,
    introText: "気温低下による顔の血行不良と青白い冷えぐすみをじんわり温めて撃退！高純度マグネシウム＆植物エキス配合で内側から上気した血色ツヤ肌を呼び戻す温感マッサージ名品完全比較",
    isHallOfFame: true,
    coverImage: massageItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/massage.jpg",
    recommendedItemCodes: massageArticles.map(a => a.id),
    contentMarkdown: massageContent
  },
  {
    id: "feat-autumn-moist-liquid-cream-blush-cheek-10",
    slug: "autumn-moist-liquid-cream-blush-cheek-10",
    title: "【乾燥でチークが粉浮きして毛穴が目立つ季節に】じゅわっと潤い血色！秋の高保湿リキッド＆クリームチーク10選",
    subtitle: "乾燥でパウダーが乗らない頬にスキンケアのように溶け込む！美容オイル＆ツボクサエキス配合で一日中毛穴落ちせず内側から発光する生ツヤ血色を叶えるリキッド＆クリームチーク完全ガイド",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 37,
    introText: "乾燥でパウダーが乗らない頬にスキンケアのように溶け込む！美容オイル＆ツボクサエキス配合で一日中毛穴落ちせず内側から発光する生ツヤ血色を叶えるリキッド＆クリームチーク完全ガイド",
    isHallOfFame: true,
    coverImage: blushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/blush.jpg",
    recommendedItemCodes: blushArticles.map(a => a.id),
    contentMarkdown: blushContent
  },
  {
    id: "feat-autumn-moist-foot-cream-cold-dry-heels-10",
    slug: "autumn-moist-foot-cream-cold-dry-heels-10",
    title: "【肌寒くなり手足の冷えと就寝時の足の乾燥カサつきが気になる季節に】芯まで温めて潤す！秋の高保湿フットクリーム＆レッグケア10選",
    subtitle: "冷えによる血行不良とタイツ摩擦でガチガサになったかかと・足裏を集中救済！高濃度尿素＆馬油配合でひび割れを防ぎ翌朝つるんとなめらかに整える優秀フットケア完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 36,
    introText: "冷えによる血行不良とタイツ摩擦でガチガサになったかかと・足裏を集中救済！高濃度尿素＆馬油配合でひび割れを防ぎ翌朝つるんとなめらかに整える優秀フットケア完全網羅",
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第17弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第17弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 17, "slug": "autumn-warming-massage-gel-cream-dullness-10", "category": "スキンケア", "concern": "秋の気温低下による血行不良・青白い冷えぐすみ・むくみ", "shortTitle": "血色・ツヤ蘇る！秋の温感マッサージジェル＆クリーム10選" },
  { "series": 17, "slug": "autumn-moist-liquid-cream-blush-cheek-10", "category": "ベースメイク", "concern": "乾燥によるチークの粉浮き・毛穴落ち・血色不足", "shortTitle": "じゅわっと潤い血色！秋の高保湿リキッド＆クリームチーク10選" },
  { "series": 17, "slug": "autumn-moist-foot-cream-cold-dry-heels-10", "category": "ボディケア", "concern": "足元の冷えとタイツ摩擦によるかかとのガサガサひび割れ", "shortTitle": "芯まで温めて潤す！秋の高保湿フットクリーム＆レッグケア10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第17弾の統合処理がすべて正常に完了しました！');
