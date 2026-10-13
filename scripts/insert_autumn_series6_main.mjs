import fs from 'fs';
import path from 'path';
import {
  eyeItemsRaw,
  scalpItemsRaw,
  scrubItemsRaw,
  eyeArticles,
  scalpArticles,
  scrubArticles,
  updateArticlesJson
} from './insert_autumn_series6_helper.mjs';

import { getEyeArticleContent } from './autumn_series6_article1_eye.mjs';
import { getScalpArticleContent } from './autumn_series6_article2_scalp.mjs';
import { getScrubArticleContent } from './autumn_series6_article3_scrub.mjs';

console.log('🍂 [2026秋コスメ特集 第6弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const eyeContent = getEyeArticleContent();
const scalpContent = getScalpArticleContent();
const scrubContent = getScrubArticleContent();

console.log(`- 記事1 (秋アイクリーム10選) 文字数: 約${eyeContent.length}文字`);
console.log(`- 記事2 (秋スカルプケア10選) 文字数: 約${scalpContent.length}文字`);
console.log(`- 記事3 (秋ボディスクラブ10選) 文字数: 約${scrubContent.length}文字`);

if (eyeContent.length < 5000 || scalpContent.length < 5000 || scrubContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-eye-cream-wrinkles-dark-circles-10",
    slug: "autumn-eye-cream-wrinkles-dark-circles-10",
    title: "【目元の小ジワと乾燥くまが気になる季節に】ピンと弾むハリ感！秋の高機能アイクリーム＆目元美容液10選",
    subtitle: "冷えと乾燥でちりめんジワや青くまが目立つ目元を集中レスキュー！レチノール＆リポソーム配合の最新アイケア完全比較",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "冷えと乾燥でちりめんジワや青くまが目立つ目元を集中レスキュー！レチノール＆リポソーム配合の最新アイケア完全比較",
    isHallOfFame: true,
    coverImage: eyeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eye.jpg",
    recommendedItemCodes: eyeArticles.map(a => a.id),
    contentMarkdown: eyeContent
  },
  {
    id: "feat-autumn-scalp-care-hair-loss-dry-10",
    slug: "autumn-scalp-care-hair-loss-dry-10",
    title: "【秋の抜け毛と頭皮の乾燥かゆみが気になる季節に】健やかな美髪の土台をつくる！秋のスカルプケア美容液＆ブラシ10選",
    subtitle: "夏の紫外線ダメージと秋の換毛期によるごっそり抜け毛・頭皮の乾燥フケを防止！サロン級ヘッドスパブラシ＆薬用育毛エッセンス徹底検証",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 37,
    introText: "夏の紫外線ダメージと秋の換毛期によるごっそり抜け毛・頭皮の乾燥フケを防止！サロン級ヘッドスパブラシ＆薬用育毛エッセンス徹底検証",
    isHallOfFame: true,
    coverImage: scalpItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scalp.jpg",
    recommendedItemCodes: scalpArticles.map(a => a.id),
    contentMarkdown: scalpContent
  },
  {
    id: "feat-autumn-body-scrub-heel-cracked-dry-10",
    slug: "autumn-body-scrub-heel-cracked-dry-10",
    title: "【かかとやひじのガサガサが気になる季節に】つるんと柔らかな素肌へ！秋のボディスクラブ＆角質ケア10選",
    subtitle: "サンダル後の夏の蓄積角質と乾燥によるかかとのひび割れ・ひじの黒ずみを優しくオフ！死海の塩＆温泉水スクラブ徹底ガイド",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "サンダル後の夏の蓄積角質と乾燥によるかかとのひび割れ・ひじの黒ずみを優しくオフ！死海の塩＆温泉水スクラブ徹底ガイド",
    isHallOfFame: true,
    coverImage: scrubItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scrub.jpg",
    recommendedItemCodes: scrubArticles.map(a => a.id),
    contentMarkdown: scrubContent
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
  console.log('✅ src/data.ts に第6弾の3記事を追加完了しました！');
} else {
  console.error('❌ src/data.ts 内に INITIAL_BLOG_POSTS の宣言が見つかりませんでした。');
  process.exit(1);
}

console.log('✨ 第6弾のデータ登録がすべて正常に完了しました。');
