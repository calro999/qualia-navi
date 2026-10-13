import fs from 'fs';
import path from 'path';
import {
  lipItemsRaw,
  cheekItemsRaw,
  nailItemsRaw,
  lipArticles,
  cheekArticles,
  nailArticles,
  updateArticlesJson
} from './insert_autumn_batch_helper.mjs';

import { getLipArticleContent } from './autumn_batch_article1_lip.mjs';
import { getCheekArticleContent } from './autumn_batch_article2_cheek.mjs';
import { getNailArticleContent } from './autumn_batch_article3_nail.mjs';

console.log('🍂 [2026秋コスメ特集] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const lipContent = getLipArticleContent();
const cheekContent = getCheekArticleContent();
const nailContent = getNailArticleContent();

console.log(`- 記事1 (秋リップ10選) 文字数: 約${lipContent.length}文字`);
console.log(`- 記事2 (秋チーク10選) 文字数: 約${cheekContent.length}文字`);
console.log(`- 記事3 (秋ネイルチップ10選) 文字数: 約${nailContent.length}文字`);

if (lipContent.length < 5000 || cheekContent.length < 5000 || nailContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-best-lip-cosme-ranking-10",
    slug: "autumn-best-lip-cosme-ranking-10",
    title: "【2026秋・ひと塗りで旬顔へ】深み血色と濃密ツヤが続く！秋の最新リップおすすめ人気10選！ケイト・ロムアンド・M・A・C・ディオール徹底比較！落ちにくさと乾燥対策を両立するトレンド秋リップ完全ガイド",
    subtitle: "10〜11月の深まる季節に映える深みブラウン・イチジク粘膜カラーから、乾燥知らずの高保湿生ツヤティントまで厳選した秋の最新リップ10選！",
    targetGender: "women",
    authorId: "author-inoue",
    authorName: "井上 さくら",
    authorRole: "Qualia Navi リップケアコレクター / リップ部門専属",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "10〜11月の深まる季節に映える深みブラウン・イチジク粘膜カラーから、乾燥知らずの高保湿生ツヤティントまで厳選した秋の最新リップ10選！",
    isHallOfFame: true,
    coverImage: lipItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lip.jpg",
    recommendedItemCodes: lipArticles.map(a => a.id),
    contentMarkdown: lipContent
  },
  {
    id: "feat-autumn-best-blush-cheek-cosme-10",
    slug: "autumn-best-blush-cheek-cosme-10",
    title: "【2026秋・大人の多幸感と陰影を引き立てる】透け感ベージュ＆血色テラコッタで垢抜ける！秋の最新チークおすすめ人気10選！セザンヌ・NARS・クリニーク・fwee徹底比較！くすみ知らずのふんわり血色美肌をつくる選び方",
    subtitle: "秋のシックな装いに溶け込み、自然な骨格美と温かみのある多幸感を両立する透け感ベージュ＆テラコッタ秋チーク10選！",
    targetGender: "women",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi メイクコレクター / ベース＆パーツメイク担当",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "秋のシックな装いに溶け込み、自然な骨格美と温かみのある多幸感を両立する透け感ベージュ＆テラコッタ秋チーク10選！",
    isHallOfFame: true,
    coverImage: cheekItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cheek.jpg",
    recommendedItemCodes: cheekArticles.map(a => a.id),
    contentMarkdown: cheekContent
  },
  {
    id: "feat-autumn-best-nail-tips-trend-10",
    slug: "autumn-best-nail-tips-trend-10",
    title: "【2026秋・指先から秋をまとう】貼るだけでサロン級！べっ甲・マグネット・ニュアンス秋ネイルチップおすすめ人気10選！ダッシングディバ・フィンガースーツ・ohora徹底比較！休日やイベントに映える大人の秋デザイン完全攻略",
    subtitle: "サロンに行かずに貼るだけでサロン級の美爪に！べっ甲・マグネットキャッツアイ・ニュアンスデザインを気軽に楽しめる秋の最新ネイルチップ10選！",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / トレンド・ネイル統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 34,
    introText: "サロンに行かずに貼るだけでサロン級の美爪に！べっ甲・マグネットキャッツアイ・ニュアンスデザインを気軽に楽しめる秋の最新ネイルチップ10選！",
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
    `${blogPostsMarker}\n${jsonToInsert}`
  );
  fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの秋コスメ特集記事を追加しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 2026秋コスメ特集 全3記事（各10商品レビュー、合計30商品）のデータベース登録が完了しました！');
