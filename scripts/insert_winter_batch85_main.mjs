import fs from 'fs';
import path from 'path';
import {
  cleanserItemsRaw,
  lipBalmItemsRaw,
  bodyMilkItemsRaw,
  cleanserArticles,
  lipBalmArticles,
  bodyMilkArticles,
  updateArticlesJson
} from './insert_winter_batch85_helper.mjs';

import { getCleanserArticleContent } from './winter_batch85_article1_cleanser.mjs';
import { getLipBalmArticleContent } from './winter_batch85_article2_lip_balm.mjs';
import { getBodyMilkArticleContent } from './winter_batch85_article3_body_milk.mjs';

console.log('🚀 [冬コスメ 第85弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const cleanserContent = getCleanserArticleContent();
const lipBalmContent = getLipBalmArticleContent();
const bodyMilkContent = getBodyMilkArticleContent();

console.log(`- 記事1 (泡洗顔料) 文字数: 約${cleanserContent.length}文字`);
console.log(`- 記事2 (カラーリップバーム) 文字数: 約${lipBalmContent.length}文字`);
console.log(`- 記事3 (ボディミルク) 文字数: 約${bodyMilkContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (cleanserContent.length < 5000 || lipBalmContent.length < 5000 || bodyMilkContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-winter-deep-moisture-foaming-cleanser-whip-2026",
    slug: "winter-deep-moisture-foaming-cleanser-whip-2026",
    title: "【2026冬・洗い上がりのつっぱり感ゼロへ】保湿力の強さで肌乾燥とさようなら！高保湿泡洗顔料＆濃密ホイップ洗顔フォームおすすめ人気10選！KANEBO・ソフィーナiP・キュレル・オルビス徹底比較！摩擦レスな濃密クッション泡で冬の乾燥小ジワ・毛穴詰まりをうるおい洗浄",
    subtitle: "11〜12月の急激な外気温低下と空気の乾燥による洗顔後のバリバリ感・つっぱり感を解消し、濃密クッション泡で潤いを守りながら汚れを落とす高保湿洗顔料10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長 / メンズ＆ユニセックス美容担当",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 35,
    introText: "11〜12月の急激な外気温低下と空気の乾燥による洗顔後のバリバリ感・つっぱり感を解消し、濃密クッション泡で潤いを守りながら汚れを落とす高保湿洗顔料10選！",
    isHallOfFame: true,
    coverImage: cleanserItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cleanser.jpg",
    recommendedItemCodes: cleanserArticles.map(a => a.id),
    contentMarkdown: cleanserContent
  },
  {
    id: "feat-winter-tinted-moisture-lip-balm-rouge-glow-2026",
    slug: "winter-tinted-moisture-lip-balm-rouge-glow-2026",
    title: "【2026冬・皮剥け唇でもするする塗れて血色ツヤ復活】保湿力の強さで唇乾燥とさようなら！高保湿カラーリップバーム＆ティントルージュおすすめ人気10選！ニベア・ディオール・シャネル・ボビイブラウン徹底比較！1本でうるおい密閉×透け感血色を叶える冬の必須リップ",
    subtitle: "11〜12月の寒冷乾燥で荒れやすく皮剥けしやすい唇を濃密な美容オイル膜で包み込み、自然な血色感とみずみずしい透明ツヤを長時間キープする高保湿カラーリップバーム10選！",
    targetGender: "women",
    authorId: "author-inoue",
    authorName: "井上 さくら",
    authorRole: "Qualia Navi リップケアコレクター / リップ部門専属",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 36,
    introText: "11〜12月の寒冷乾燥で荒れやすく皮剥けしやすい唇を濃密な美容オイル膜で包み込み、自然な血色感とみずみずしい透明ツヤを長時間キープする高保湿カラーリップバーム10選！",
    isHallOfFame: true,
    coverImage: lipBalmItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipbalm.jpg",
    recommendedItemCodes: lipBalmArticles.map(a => a.id),
    contentMarkdown: lipBalmContent
  },
  {
    id: "feat-winter-deep-moisture-body-milk-ceramide-lotion-2026",
    slug: "winter-deep-moisture-body-milk-ceramide-lotion-2026",
    title: "【2026冬・お風呂上がりの全身粉吹き＆カサつきを即鎮静】保湿力の強さで身体の乾燥とさようなら！高保湿ボディミルク＆セラミドボディローションおすすめ人気10選！キュレル・カルテHD・ミノン・ニュートロジーナ徹底比較！ベタつかず服がすぐ着られるのに翌朝まで吸い付くうるおい肌へ",
    subtitle: "11〜12月のお風呂上がりの急激な乾燥・粉吹き・衣類摩擦によるカサつきやかゆみを防ぎ、ベタつかずスーッと浸透して潤いを閉じ込める高保湿セラミドボディミルク10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 34,
    introText: "11〜12月のお風呂上がりの急激な乾燥・粉吹き・衣類摩擦によるカサつきやかゆみを防ぎ、ベタつかずスーッと浸透して潤いを閉じ込める高保湿セラミドボディミルク10選！",
    isHallOfFame: true,
    coverImage: bodyMilkItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodymilk.jpg",
    recommendedItemCodes: bodyMilkArticles.map(a => a.id),
    contentMarkdown: bodyMilkContent
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

console.log('🎉 第85弾 全3記事（各10商品レビュー、合計30商品）のデータベース登録が完了しました！');
