import fs from 'fs';
import path from 'path';
import {
  neckItemsRaw,
  boosterItemsRaw,
  mistItemsRaw,
  neckArticles,
  boosterArticles,
  mistArticles,
  updateArticlesJson
} from './insert_autumn_series14_helper.mjs';

import { getNeckArticleContent } from './autumn_series14_article1_neck.mjs';
import { getBoosterArticleContent } from './autumn_series14_article2_booster.mjs';
import { getMistArticleContent } from './autumn_series14_article3_mist.mjs';

console.log('🍂 [2026秋コスメ特集 第14弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const neckContent = getNeckArticleContent();
const boosterContent = getBoosterArticleContent();
const mistContent = getMistArticleContent();

console.log(`- 記事1 (秋ネック＆デコルテクリーム10選) 文字数: 約${neckContent.length}文字`);
console.log(`- 記事2 (秋高浸透ブースター10選) 文字数: 約${boosterContent.length}文字`);
console.log(`- 記事3 (秋静電気防止ヘアミスト10選) 文字数: 約${mistContent.length}文字`);

if (neckContent.length < 5000 || boosterContent.length < 5000 || mistContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-neck-decollete-cream-chapped-wrinkles-10",
    slug: "autumn-neck-decollete-cream-chapped-wrinkles-10",
    title: "【秋風とマフラーの摩擦で首元の乾燥小ジワが目立つ季節に】若見え首元をつくる高保湿ネック＆デコルテクリーム10選",
    subtitle: "タートルネックの擦れや乾燥で深くなる首の横ジワを集中リフト！ペプチド＆レチノール配合で洋服につかずふっくらハリ肌へ導く厳選名品",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 38,
    introText: "タートルネックの擦れや乾燥で深くなる首の横ジワを集中リフト！ペプチド＆レチノール配合で洋服につかずふっくらハリ肌へ導く厳選名品",
    isHallOfFame: true,
    coverImage: neckItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/neck.jpg",
    recommendedItemCodes: neckArticles.map(a => a.id),
    contentMarkdown: neckContent
  },
  {
    id: "feat-autumn-booster-serum-stiff-skin-absorption-10",
    slug: "autumn-booster-serum-stiff-skin-absorption-10",
    title: "【乾燥で肌がゴワつき化粧水が浸透しにくい季節に】角質をやわらげる高浸透ブースター・導入美容液10選",
    subtitle: "夏の紫外線ダメージで硬化した角質細胞を瞬時にほぐす！リポソームやセラミド配合で化粧水がぐんぐん吸い込まれる先行型スキンケア徹底比較",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 37,
    introText: "夏の紫外線ダメージで硬化した角質細胞を瞬時にほぐす！リポソームやセラミド配合で化粧水がぐんぐん吸い込まれる先行型スキンケア徹底比較",
    isHallOfFame: true,
    coverImage: boosterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/booster.jpg",
    recommendedItemCodes: boosterArticles.map(a => a.id),
    contentMarkdown: boosterContent
  },
  {
    id: "feat-autumn-anti-static-hair-mist-frizzy-dry-10",
    slug: "autumn-anti-static-hair-mist-frizzy-dry-10",
    title: "【乾燥とセーターの脱ぎ着で髪がパチパチ広がる季節に】静電気・パサつき防止ヘアミスト10選",
    subtitle: "ウール摩擦によるパチパチ静電気やアホ毛の爆発をひと吹きでブロック！天然植物オイル＆アミノ酸ヴェールで一日中まとまる優秀ヘアウォーター完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 36,
    introText: "ウール摩擦によるパチパチ静電気やアホ毛の爆発をひと吹きでブロック！天然植物オイル＆アミノ酸ヴェールで一日中まとまる優秀ヘアウォーター完全網羅",
    isHallOfFame: true,
    coverImage: mistItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mist.jpg",
    recommendedItemCodes: mistArticles.map(a => a.id),
    contentMarkdown: mistContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第14弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 第14弾の統合処理がすべて正常に完了しました！');
