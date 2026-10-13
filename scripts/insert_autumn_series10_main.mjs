import fs from 'fs';
import path from 'path';
import {
  balmItemsRaw,
  scentItemsRaw,
  nailItemsRaw,
  balmArticles,
  scentArticles,
  nailArticles,
  updateArticlesJson
} from './insert_autumn_series10_helper.mjs';

import { getBalmArticleContent } from './autumn_series10_article1_balm.mjs';
import { getScentArticleContent } from './autumn_series10_article2_scent.mjs';
import { getNailArticleContent } from './autumn_series10_article3_nail.mjs';

console.log('🍂 [2026秋コスメ特集 第10弾（記念弾）] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const balmContent = getBalmArticleContent();
const scentContent = getScentArticleContent();
const nailContent = getNailArticleContent();

console.log(`- 記事1 (秋マルチ保湿スティック10選) 文字数: 約${balmContent.length}文字`);
console.log(`- 記事2 (秋紅茶・フィグ・ウッディ香水10選) 文字数: 約${scentContent.length}文字`);
console.log(`- 記事3 (秋高保湿ネイルオイル10選) 文字数: 約${nailContent.length}文字`);

if (balmContent.length < 5000 || scentContent.length < 5000 || nailContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-multi-moist-stick-balm-10",
    slug: "autumn-multi-moist-stick-balm-10",
    title: "【外出先で急に乾燥・粉吹きする季節に】メイクの上から即潤う！秋のマルチ保湿スティック＆美容液バーム10選",
    subtitle: "外気と暖房による急激な砂漠化肌を秒速レスキュー！メイクの上から直接濡れツヤチャージするスティック美容液完全比較",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "外気と暖房による急激な砂漠化肌を秒速レスキュー！メイクの上から直接濡れツヤチャージするスティック美容液完全比較",
    isHallOfFame: true,
    coverImage: balmItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/balm.jpg",
    recommendedItemCodes: balmArticles.map(a => a.id),
    contentMarkdown: balmContent
  },
  {
    id: "feat-autumn-tea-fig-woody-fragrance-10",
    slug: "autumn-tea-fig-woody-fragrance-10",
    title: "【少し肌寒い季節に温もりを纏いたい時に】秋の気配に溶け込む！紅茶・イチジク・ウッディ香水10選",
    subtitle: "肌寒い空気にじんわり溶け合う温もりと気品！アールグレイ・ホワイトティー・熟したフィグ・静寂のウッディノート徹底解説",
    targetGender: "unisex",
    authorId: "author-mizuki",
    authorName: "観月 美月",
    authorRole: "Qualia Navi ライフスタイル＆フレグランスエディター / アロマ調香師",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 37,
    introText: "肌寒い空気にじんわり溶け合う温もりと気品！アールグレイ・ホワイトティー・熟したフィグ・静寂のウッディノート徹底解説",
    isHallOfFame: true,
    coverImage: scentItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scent.jpg",
    recommendedItemCodes: scentArticles.map(a => a.id),
    contentMarkdown: scentContent
  },
  {
    id: "feat-autumn-nail-oil-hand-serum-dry-10",
    slug: "autumn-nail-oil-hand-serum-dry-10",
    title: "【秋の乾燥で指先のささくれや二枚爪が気になる季節に】サロン級の美爪へ！秋の高保湿ネイルオイル＆ハンドセラム10選",
    subtitle: "爪の縦ジワ・割れ爪・痛いささくれを根本から集中補修！ロールオン＆ブラシ型の高機能ネイルオイルと浸透ハンド美容液完全ガイド",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "爪の縦ジワ・割れ爪・痛いささくれを根本から集中補修！ロールオン＆ブラシ型の高機能ネイルオイルと浸透ハンド美容液完全ガイド",
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
  console.log('✅ src/data.ts に第10弾の3記事を追加完了しました！');
} else {
  console.error('❌ src/data.ts 内に INITIAL_BLOG_POSTS の宣言が見つかりませんでした。');
  process.exit(1);
}

console.log('✨ 第10弾のデータ登録がすべて正常に完了しました。');
