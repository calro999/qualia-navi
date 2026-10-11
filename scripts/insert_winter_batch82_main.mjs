import fs from 'fs';
import path from 'path';
import {
  eyeshadowItemsRaw,
  bodyButterItemsRaw,
  eyebrowItemsRaw,
  eyeshadowArticles,
  bodyButterArticles,
  eyebrowArticles,
  updateArticlesJson
} from './insert_winter_batch82_helper.mjs';

import { getEyeshadowArticleContent } from './winter_batch82_article1_eyeshadow.mjs';
import { getBodyButterArticleContent } from './winter_batch82_article2_bodybutter.mjs';
import { getEyebrowArticleContent } from './winter_batch82_article3_eyebrow.mjs';

console.log('🚀 [冬コスメ 第82弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const eyeshadowContent = getEyeshadowArticleContent();
const bodyButterContent = getBodyButterArticleContent();
const eyebrowContent = getEyebrowArticleContent();

console.log(`- 記事1 (スティックアイシャドウ) 文字数: 約${eyeshadowContent.length}文字`);
console.log(`- 記事2 (濃厚ボディバター) 文字数: 約${bodyButterContent.length}文字`);
console.log(`- 記事3 (アイブロウパウダー＆ペンシル) 文字数: 約${eyebrowContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (eyeshadowContent.length < 5000 || bodyButterContent.length < 5000 || eyebrowContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-winter-radiant-stick-eyeshadow-glitter-pen-2026",
    slug: "winter-radiant-stick-eyeshadow-glitter-pen-2026",
    title: "【2026冬・聖夜の濡れツヤ＆うるみ目を叶える】スティックアイシャドウ＆涙袋グリッターペンシルおすすめ人気10選！ローラメルシエ・ボビイブラウン・ウォンジョンヨ・エクセル徹底比較！粉飛びゼロで夕方までヨレない高密着アイカラー",
    subtitle: "11〜12月のホリデーシーズンや冬の深刻な目元乾燥下でも粉飛び・シワ落ちせず、まるで濡れたような上品なツヤとうるみ目を夕方までキープする高密着スティックアイシャドウ＆涙袋ペンシル10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 35,
    introText: "11〜12月のホリデーシーズンや冬の深刻な目元乾燥下でも粉飛び・シワ落ちせず、まるで濡れたような上品なツヤとうるみ目を夕方までキープする高密着スティックアイシャドウ＆涙袋ペンシル10選！",
    isHallOfFame: true,
    coverImage: eyeshadowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyeshadow.jpg",
    recommendedItemCodes: eyeshadowArticles.map(a => a.id),
    contentMarkdown: eyeshadowContent
  },
  {
    id: "feat-winter-rich-moisturizing-body-butter-cream-2026",
    slug: "winter-rich-moisturizing-body-butter-cream-2026",
    title: "【2026冬・粉吹き乾燥ボディを救う濃密保湿】高保湿ボディバター＆リッチモイスチャークリームおすすめ人気10選！ザ・ボディショップ・ロクシタン・ローラメルシエ・ヴェレダ徹底比較！シアバターの濃密シールドで翌朝までベルベット肌へ",
    subtitle: "11〜12月の気温低下と暖房乾燥でガサガサになったすねやひじの粉吹き肌を、シアバターや高純度オイルの濃密シールドで翌朝までベルベットのようにしっとり包み込むリッチボディケア10選！",
    targetGender: "unisex",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 36,
    introText: "11〜12月の気温低下と暖房乾燥でガサガサになったすねやひじの粉吹き肌を、シアバターや高純度オイルの濃密シールドで翌朝までベルベットのようにしっとり包み込むリッチボディケア10選！",
    isHallOfFame: true,
    coverImage: bodyButterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodybutter.jpg",
    recommendedItemCodes: bodyButterArticles.map(a => a.id),
    contentMarkdown: bodyButterContent
  },
  {
    id: "feat-winter-fluffy-eyebrow-powder-pencil-palette-2026",
    slug: "winter-fluffy-eyebrow-powder-pencil-palette-2026",
    title: "【2026冬・マフラー＆タートルネックに映える立体美眉】高密着アイブロウパウダー＆極細アイブロウペンシルおすすめ人気10選！KATE・ジルスチュアート・セザンヌ・セルヴォーク徹底比較！乾燥肌でも粉落ちせず夕方まで消えないふんわり抜け感眉",
    subtitle: "11〜12月のマフラーやタートルネック着用時にも映える立体美眉を叶え、乾燥した地肌にもしっとり密着して衣類の摩擦でも夕方まで眉尻が消えない高密着アイブロウコスメ10選！",
    targetGender: "unisex",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi メイクコレクター / ベース＆パーツメイク担当",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 34,
    introText: "11〜12月のマフラーやタートルネック着用時にも映える立体美眉を叶え、乾燥した地肌にもしっとり密着して衣類の摩擦でも夕方まで眉尻が消えない高密着アイブロウコスメ10選！",
    isHallOfFame: true,
    coverImage: eyebrowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyebrow.jpg",
    recommendedItemCodes: eyebrowArticles.map(a => a.id),
    contentMarkdown: eyebrowContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に新規3特集記事を追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 第82弾の特集記事および商品記事の統合が完了しました！');
