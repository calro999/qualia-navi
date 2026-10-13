import fs from 'fs';
import path from 'path';
import {
  handItemsRaw,
  scalpItemsRaw,
  nightItemsRaw,
  handArticles,
  scalpArticles,
  nightArticles,
  updateArticlesJson
} from './insert_autumn_series13_helper.mjs';

import { getHandArticleContent } from './autumn_series13_article1_hand.mjs';
import { getScalpArticleContent } from './autumn_series13_article2_scalp.mjs';
import { getNightArticleContent } from './autumn_series13_article3_night.mjs';

console.log('🍂 [2026秋コスメ特集 第13弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const handContent = getHandArticleContent();
const scalpContent = getScalpArticleContent();
const nightContent = getNightArticleContent();

console.log(`- 記事1 (秋ハンド＆ネイルクリーム10選) 文字数: 約${handContent.length}文字`);
console.log(`- 記事2 (秋スカルプエッセンス10選) 文字数: 約${scalpContent.length}文字`);
console.log(`- 記事3 (秋スリーピングマスク10選) 文字数: 約${nightContent.length}文字`);

if (handContent.length < 5000 || scalpContent.length < 5000 || nightContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-hand-nail-cream-chapped-skin-10",
    slug: "autumn-hand-nail-cream-chapped-skin-10",
    title: "【冷たい木枯らしで手肌が荒れて爪先がささくれる季節に】手荒れ・老け手を防ぐ高保湿ハンド＆ネイルクリーム10選",
    subtitle: "秋風や水仕事でカサつく手肌と割れやすい爪を濃密密閉！シアバター＆セラミド配合でベタつかずスマホも触れる人気名品徹底比較",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 38,
    introText: "秋風や水仕事でカサつく手肌と割れやすい爪を濃密密閉！シアバター＆セラミド配合でベタつかずスマホも触れる人気名品徹底比較",
    isHallOfFame: true,
    coverImage: handItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/handcream.jpg",
    recommendedItemCodes: handArticles.map(a => a.id),
    contentMarkdown: handContent
  },
  {
    id: "feat-autumn-scalp-essence-dry-itch-hair-loss-10",
    slug: "autumn-scalp-essence-dry-itch-hair-loss-10",
    title: "【秋の抜け毛が増えて頭皮の乾燥フケやかゆみが気になる季節に】地肌を潤す高保湿スカルプエッセンス10選",
    subtitle: "夏の紫外線ダメージと秋の乾燥で乱れた頭皮環境を集中リセット！美肌菌・ヒト幹細胞・植物エキスで根元からふんわりハリコシを育てる傑作ガイド",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 37,
    introText: "夏の紫外線ダメージと秋の乾燥で乱れた頭皮環境を集中リセット！美肌菌・ヒト幹細胞・植物エキスで根元からふんわりハリコシを育てる傑作ガイド",
    isHallOfFame: true,
    coverImage: scalpItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scalp.jpg",
    recommendedItemCodes: scalpArticles.map(a => a.id),
    contentMarkdown: scalpContent
  },
  {
    id: "feat-autumn-sleeping-mask-night-hydration-10",
    slug: "autumn-sleeping-mask-night-hydration-10",
    title: "【暖房や冷たい夜風で寝ている間に肌が砂漠化する季節に】翌朝ぷるんと潤う高保湿スリーピングマスク10選",
    subtitle: "寝ている間の水分蒸発を一晩中ラッピングして阻止！塗って寝るだけで翌朝もっちり吸い付くハリ肌へ導く夜用集中ジェル＆パック完全検証",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 36,
    introText: "寝ている間の水分蒸発を一晩中ラッピングして阻止！塗って寝るだけで翌朝もっちり吸い付くハリ肌へ導く夜用集中ジェル＆パック完全検証",
    isHallOfFame: true,
    coverImage: nightItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/sleepingmask.jpg",
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第13弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 第13弾の統合処理がすべて正常に完了しました！');
