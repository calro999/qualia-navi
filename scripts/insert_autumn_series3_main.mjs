import fs from 'fs';
import path from 'path';
import {
  highlightItemsRaw,
  fragranceItemsRaw,
  maskItemsRaw,
  highlightArticles,
  fragranceArticles,
  maskArticles,
  updateArticlesJson
} from './insert_autumn_series3_helper.mjs';

import { getHighlightArticleContent } from './autumn_series3_article1_highlight.mjs';
import { getFragranceArticleContent } from './autumn_series3_article2_fragrance.mjs';
import { getMaskArticleContent } from './autumn_series3_article3_mask.mjs';

console.log('🍂 [2026秋コスメ特集 第3弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const highlightContent = getHighlightArticleContent();
const fragranceContent = getFragranceArticleContent();
const maskContent = getMaskArticleContent();

console.log(`- 記事1 (ハイライト＆シェーディング) 文字数: 約${highlightContent.length}文字`);
console.log(`- 記事2 (秋フレグランス) 文字数: 約${fragranceContent.length}文字`);
console.log(`- 記事3 (高保湿シートマスク) 文字数: 約${maskContent.length}文字`);

if (highlightContent.length < 5000 || fragranceContent.length < 5000 || maskContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-highlight-shading-dry-skin-10",
    slug: "autumn-highlight-shading-dry-skin-10",
    title: "【乾燥でくすむ季節に】立体ツヤと小顔を叶える秋のハイライト＆シェーディング10選",
    subtitle: "肌寒い秋の乾燥や顔の平坦感・くすみ悩みを吹き飛ばす！濡れツヤ生バームから自然な影色パウダーまで徹底解説",
    targetGender: "women",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi メイクコレクター / ベース＆パーツメイク担当",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "肌寒い秋の乾燥や顔の平坦感・くすみ悩みを吹き飛ばす！濡れツヤ生バームから自然な影色パウダーまで徹底解説",
    isHallOfFame: true,
    coverImage: highlightItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/highlight.jpg",
    recommendedItemCodes: highlightArticles.map(a => a.id),
    contentMarkdown: highlightContent
  },
  {
    id: "feat-autumn-fragrance-chilly-season-10",
    slug: "autumn-fragrance-chilly-season-10",
    title: "【少し肌寒い季節に】金木犀や温もりウッディ香る秋の最新フレグランス10選",
    subtitle: "秋風が心地よい季節にまといたい！金木犀・アールグレイ紅茶・ほろ苦コーヒー・深みウッドの上質な香り完全ガイド",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長 / メンズ＆ユニセックス美容担当",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "秋風が心地よい季節にまといたい！金木犀・アールグレイ紅茶・ほろ苦コーヒー・深みウッドの上質な香り完全ガイド",
    isHallOfFame: true,
    coverImage: fragranceItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/fragrance.jpg",
    recommendedItemCodes: fragranceArticles.map(a => a.id),
    contentMarkdown: fragranceContent
  },
  {
    id: "feat-autumn-sheet-mask-dryness-rescue-10",
    slug: "autumn-sheet-mask-dryness-rescue-10",
    title: "【秋の乾燥とごわつき肌に】夏の紫外線ダメージを集中リセットする高保湿シートマスク10選",
    subtitle: "季節の変わり目のカサつき・毛穴・ハリ不足を救う！即効うるおいチャージできる厳選シートマスク徹底比較",
    targetGender: "unisex",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 34,
    introText: "季節の変わり目のカサつき・毛穴・ハリ不足を救う！即効うるおいチャージできる厳選シートマスク徹底比較",
    isHallOfFame: true,
    coverImage: maskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mask.jpg",
    recommendedItemCodes: maskArticles.map(a => a.id),
    contentMarkdown: maskContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの秋コスメ第3弾特集記事を追加しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 2026秋コスメ特集 第3弾 全3記事（各10商品レビュー、合計30商品）のデータベース登録が完了しました！');
