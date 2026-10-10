import fs from 'fs';
import path from 'path';
import {
  holidayItemsRaw,
  blushItemsRaw,
  hairItemsRaw,
  holidayArticles,
  blushArticles,
  hairArticles
} from './insert_winter_batch75_helper.mjs';

import { getHolidayArticleContent } from './winter_batch75_article1_holiday.mjs';
import { getBlushArticleContent } from './winter_batch75_article2_blush.mjs';
import { getHairArticleContent } from './winter_batch75_article3_hair.mjs';

console.log('🚀 [冬コスメ 第75弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const holidayContent = getHolidayArticleContent();
const blushContent = getBlushArticleContent();
const hairContent = getHairArticleContent();

console.log(`- 記事1 (ホリデー限定アイシャドウパレット＆メイクコフレ) 文字数: 約${holidayContent.length}文字`);
console.log(`- 記事2 (高保湿リキッドチーク＆生ツヤクリームチーク) 文字数: 約${blushContent.length}文字`);
console.log(`- 記事3 (濃密補修ヘアオイル＆うるおい高保湿ヘアミルク) 文字数: 約${hairContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (holidayContent.length < 5000 || blushContent.length < 5000 || hairContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-eyeshadow-palette-makeup-coffret-2026",
    slug: "winter-holiday-eyeshadow-palette-makeup-coffret-2026",
    title: "【2026クリスマスコフレ＆ホリデー限定】豪華アイシャドウパレット＆プレミアムメイクアップキットおすすめ人気10選！ディオール・ルナソル・コスメデコルテ・シャネル徹底比較！年に一度の煌めきラメ×限定パッケージで冬の特別感を纏う",
    subtitle: "11〜12月のホリデーシーズンを彩る、年に一度の特別限定パッケージと贅沢な煌めきラメを宿したプレミアムアイシャドウ＆コフレ10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 32,
    introText: "11〜12月のホリデーシーズンを彩る、年に一度の特別限定パッケージと贅沢な煌めきラメを宿したプレミアムアイシャドウ＆コフレ10選！",
    isHallOfFame: true,
    coverImage: holidayItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/holiday.jpg",
    recommendedItemCodes: holidayArticles.map(a => a.id),
    contentMarkdown: holidayContent
  },
  {
    id: "feat-winter-hydrating-liquid-cream-blush-cheek-2026",
    slug: "winter-hydrating-liquid-cream-blush-cheek-2026",
    title: "【2026冬・寒さで淀む肌にじゅわっと上気した多幸感を宿す】高保湿リキッドチーク＆生ツヤクリームチークおすすめ人気10選！NARS・コスメデコルテ・アディクション・fwee徹底比較！暖房乾燥でも粉吹きゼロ×内側から発光する血色ツヤ",
    subtitle: "11〜12月の寒さで血行が淀みがちな冬肌に、内側からじゅわっと上気したような血色感とみずみずしいツヤを宿す高保湿リキッド＆クリームチーク10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 31,
    introText: "11〜12月の寒さで血行が淀みがちな冬肌に、内側からじゅわっと上気したような血色感とみずみずしいツヤを宿す高保湿リキッド＆クリームチーク10選！",
    isHallOfFame: true,
    coverImage: blushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/blush.jpg",
    recommendedItemCodes: blushArticles.map(a => a.id),
    contentMarkdown: blushContent
  },
  {
    id: "feat-winter-deep-repair-hair-oil-moist-milk-2026",
    slug: "winter-deep-repair-hair-oil-moist-milk-2026",
    title: "【2026冬・マフラー摩擦＆静電気パサつきを鉄壁ガード】濃密補修ヘアオイル＆うるおい高保湿ヘアミルクおすすめ人気10選！ミルボン・ケラスターゼ・ReFa・オルビス徹底比較！暖房乾燥の広がり・枝毛をリセットしてシルクの指通りへ",
    subtitle: "11〜12月のマフラー摩擦やエアコン暖房の強烈な乾燥から毛先を守り、パサつき・広がり・静電気を鉄壁コートする濃密補修ヘアオイル＆ミルク10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 30,
    introText: "11〜12月のマフラー摩擦やエアコン暖房の強烈な乾燥から毛先を守り、パサつき・広がり・静電気を鉄壁コートする濃密補修ヘアオイル＆ミルク10選！",
    isHallOfFame: true,
    coverImage: hairItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair.jpg",
    recommendedItemCodes: hairArticles.map(a => a.id),
    contentMarkdown: hairContent
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
  console.log('✅ src/data.ts に第75弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
