import fs from 'fs';
import path from 'path';
import {
  eyeshadowItemsRaw,
  basemakeItemsRaw,
  eyeAccItemsRaw,
  eyeshadowArticles,
  basemakeArticles,
  eyeAccArticles,
  updateArticlesJson
} from './insert_autumn_series2_helper.mjs';

import { getEyeshadowArticleContent } from './autumn_series2_article1_eyeshadow.mjs';
import { getBasemakeArticleContent } from './autumn_series2_article2_basemake.mjs';
import { getEyeAccArticleContent } from './autumn_series2_article3_eyeacc.mjs';

console.log('🍂 [2026秋コスメ特集 第2弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const eyeshadowContent = getEyeshadowArticleContent();
const basemakeContent = getBasemakeArticleContent();
const eyeAccContent = getEyeAccArticleContent();

console.log(`- 記事1 (秋アイシャドウ10選) 文字数: 約${eyeshadowContent.length}文字`);
console.log(`- 記事2 (秋ベースメイク10選) 文字数: 約${basemakeContent.length}文字`);
console.log(`- 記事3 (秋カラーアイメイク10選) 文字数: 約${eyeAccContent.length}文字`);

if (eyeshadowContent.length < 5000 || basemakeContent.length < 5000 || eyeAccContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-best-eyeshadow-palette-10",
    slug: "autumn-best-eyeshadow-palette-10",
    title: "【2026秋・目元に宿す極上の深みと輝き】琥珀ブラウン＆テラコッタで魅せる！秋の最新アイシャドウパレットおすすめ人気10選！ルナソル・SUQQU・ディオール・エクセル徹底比較！粉飛びしない密着ツヤと重ねるほどに美しい大人の陰影グラデーション",
    subtitle: "秋のシックな装いに溶け込み、琥珀ブラウンやテラコッタの温もりと濡れツヤラメを宿す秋の最新アイシャドウ10選！",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "秋のシックな装いに溶け込み、琥珀ブラウンやテラコッタの温もりと濡れツヤラメを宿す秋の最新アイシャドウ10選！",
    isHallOfFame: true,
    coverImage: eyeshadowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyeshadow.jpg",
    recommendedItemCodes: eyeshadowArticles.map(a => a.id),
    contentMarkdown: eyeshadowContent
  },
  {
    id: "feat-autumn-best-moist-basemake-foundation-10",
    slug: "autumn-best-moist-basemake-foundation-10",
    title: "【2026秋・乾燥＆寒暖差に負けない】うるおい生ツヤ肌が続く！秋の最新ベースメイクおすすめ人気10選！ポール＆ジョー・クレ・ド・ポー・コスメデコルテ・TIRTIR徹底比較！カサつき・毛穴落ちを防ぐ高保湿下地＆ツヤファンデーション完全ガイド",
    subtitle: "夏のダメージと秋の急激な乾燥・寒暖差を乗り越え、素肌が発光するような生ツヤを一日中キープする高保湿ベースメイク10選！",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "夏のダメージと秋の急激な乾燥・寒暖差を乗り越え、素肌が発光するような生ツヤを一日中キープする高保湿ベースメイク10選！",
    isHallOfFame: true,
    coverImage: basemakeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/basemake.jpg",
    recommendedItemCodes: basemakeArticles.map(a => a.id),
    contentMarkdown: basemakeContent
  },
  {
    id: "feat-autumn-best-nuance-eye-accent-mascara-10",
    slug: "autumn-best-nuance-eye-accent-mascara-10",
    title: "【2026秋・目元に抜け感とこなれ感を宿す】黒からシフト！秋の最新カラーマスカラ・極細アイライナー・垢抜けアイブロウおすすめ人気10選！デジャヴュ・ヒロインメイク・キャンメイク・KATE徹底比較！モーブ＆バーガンディで目力を残しながら垢抜ける秋のカラーアイメイク完全攻略",
    subtitle: "黒や濃い茶色から脱却！モーブ・バーガンディ・オリーブなどの秋色ニュアンスで目力を保ちつつ垢抜けるカラーアイメイク10選！",
    targetGender: "women",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi メイクコレクター / ベース＆パーツメイク担当",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 34,
    introText: "黒や濃い茶色から脱却！モーブ・バーガンディ・オリーブなどの秋色ニュアンスで目力を保ちつつ垢抜けるカラーアイメイク10選！",
    isHallOfFame: true,
    coverImage: eyeAccItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyeacc.jpg",
    recommendedItemCodes: eyeAccArticles.map(a => a.id),
    contentMarkdown: eyeAccContent
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
    `${blogPostsMarker}\n${jsonToInsert}`
  );
  fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの秋コスメ第2弾特集記事を追加しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 2026秋コスメ特集 第2弾 全3記事（各10商品レビュー、合計30商品）のデータベース登録が完了しました！');
