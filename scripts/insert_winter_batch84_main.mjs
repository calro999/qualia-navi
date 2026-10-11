import fs from 'fs';
import path from 'path';
import {
  multiBalmItemsRaw,
  emulsionItemsRaw,
  lipItemsRaw,
  multiBalmArticles,
  emulsionArticles,
  lipArticles,
  updateArticlesJson
} from './insert_winter_batch84_helper.mjs';

import { getMultiBalmArticleContent } from './winter_batch84_article1_multi_balm.mjs';
import { getEmulsionArticleContent } from './winter_batch84_article2_emulsion.mjs';
import { getLipArticleContent } from './winter_batch84_article3_melting_lip.mjs';

console.log('🚀 [冬コスメ 第84弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const multiBalmContent = getMultiBalmArticleContent();
const emulsionContent = getEmulsionArticleContent();
const lipContent = getLipArticleContent();

console.log(`- 記事1 (マルチバーム) 文字数: 約${multiBalmContent.length}文字`);
console.log(`- 記事2 (高保湿乳液) 文字数: 約${emulsionContent.length}文字`);
console.log(`- 記事3 (メルティングリップ) 文字数: 約${lipContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (multiBalmContent.length < 5000 || emulsionContent.length < 5000 || lipContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-winter-rescue-multi-moisture-balm-stick-2026",
    slug: "winter-rescue-multi-moisture-balm-stick-2026",
    title: "【2026冬・粉吹き＆皮剥けを秒速レスキュー】保湿力の強さで肌乾燥とさようなら！高保湿マルチバーム＆スティックバームおすすめ人気10選！KAHI・イハダ・ラロッシュポゼ徹底比較！外出先でもひと塗りで水分油分を密閉する救世主",
    subtitle: "11〜12月の気温低下とオフィス暖房による極度の粉吹き・皮剥け・インナードライを即効レスキューし、メイクの上から水分油分を密閉する高保湿マルチバーム10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 35,
    introText: "11〜12月の気温低下とオフィス暖房による極度の粉吹き・皮剥け・インナードライを即効レスキューし、メイクの上から水分油分を密閉する高保湿マルチバーム10選！",
    isHallOfFame: true,
    coverImage: multiBalmItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/multibalm.jpg",
    recommendedItemCodes: multiBalmArticles.map(a => a.id),
    contentMarkdown: multiBalmContent
  },
  {
    id: "feat-winter-deep-moisture-ceramide-emulsion-milk-2026",
    slug: "winter-deep-moisture-ceramide-emulsion-milk-2026",
    title: "【2026冬・角層を柔らかくほぐし潤いを抱え込む】保湿力の強さで肌乾燥とさようなら！高保湿乳液＆セラミドエマルジョンおすすめ人気10選！コスメデコルテ・アルビオン・ミノン・カルテHD徹底比較！インナードライを根本から解消する先行乳液＆濃密ミルク",
    subtitle: "11〜12月の寒さでゴワつき硬化した角層を柔らかくほぐし、セラミドや水分を抱え込んで逃さない高保湿エモリエント乳液10選！",
    targetGender: "unisex",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 36,
    introText: "11〜12月の寒さでゴワつき硬化した角層を柔らかくほぐし、セラミドや水分を抱え込んで逃さない高保湿エモリエント乳液10選！",
    isHallOfFame: true,
    coverImage: emulsionItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/emulsion.jpg",
    recommendedItemCodes: emulsionArticles.map(a => a.id),
    contentMarkdown: emulsionContent
  },
  {
    id: "feat-winter-melting-rouge-glossy-tint-balm-2026",
    slug: "winter-melting-rouge-glossy-tint-balm-2026",
    title: "【2026冬・カサカサ唇とさようなら！とろける蜜ツヤと血色感】保湿力の強さで乾燥唇とさようなら！高保湿メルティングリップ＆濃密ツヤ粘膜ティントおすすめ人気10選！ロムアンド・KATE・キャンメイク・オペラ徹底比較！ホリデーの口元をぷるんと彩る高密着リップ",
    subtitle: "11〜12月のクリスマスやホリデーシーズンに向けて、乾燥唇でも皮剥けせず体温でとろける濃密ツヤと血色感をキープする高保湿メルティングリップ10選！",
    targetGender: "unisex",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi メイクコレクター / ベース＆パーツメイク担当",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 34,
    introText: "11〜12月のクリスマスやホリデーシーズンに向けて、乾燥唇でも皮剥けせず体温でとろける濃密ツヤと血色感をキープする高保湿メルティングリップ10選！",
    isHallOfFame: true,
    coverImage: lipItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/meltinglip.jpg",
    recommendedItemCodes: lipArticles.map(a => a.id),
    contentMarkdown: lipContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの特集記事を追加しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 第84弾 全3記事（各10商品レビュー、合計30商品）のデータベース登録が完了しました！');
