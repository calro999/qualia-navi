import fs from 'fs';
import path from 'path';
import {
  vitaminItemsRaw,
  settingItemsRaw,
  sleepItemsRaw,
  vitaminArticles,
  settingArticles,
  sleepArticles,
  updateArticlesJson
} from './insert_autumn_series7_helper.mjs';

import { getVitaminArticleContent } from './autumn_series7_article1_vitamin.mjs';
import { getSettingArticleContent } from './autumn_series7_article2_setting.mjs';
import { getSleepArticleContent } from './autumn_series7_article3_sleep.mjs';

console.log('🍂 [2026秋コスメ特集 第7弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const vitaminContent = getVitaminArticleContent();
const settingContent = getSettingArticleContent();
const sleepContent = getSleepArticleContent();

console.log(`- 記事1 (秋ビタミンC＆角質ふき取り10選) 文字数: 約${vitaminContent.length}文字`);
console.log(`- 記事2 (秋メイクキープミスト＆パウダー10選) 文字数: 約${settingContent.length}文字`);
console.log(`- 記事3 (秋ピローミスト＆アロマキャンドル10選) 文字数: 約${sleepContent.length}文字`);

if (vitaminContent.length < 5000 || settingContent.length < 5000 || sleepContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-vitamin-c-dullness-pores-10",
    slug: "autumn-vitamin-c-dullness-pores-10",
    title: "【秋のくすみとゴワつきが気になる季節に】透明感を即効チャージ！秋のビタミンC美容液＆角質ふき取り化粧水10選",
    subtitle: "夏の紫外線ダメージ後の角質肥厚と濁りぐすみを一掃！生ビタミンC・APPS・AHA配合の最新スキンケア徹底比較",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "夏の紫外線ダメージ後の角質肥厚と濁りぐすみを一掃！生ビタミンC・APPS・AHA配合の最新スキンケア徹底比較",
    isHallOfFame: true,
    coverImage: vitaminItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/vitamin.jpg",
    recommendedItemCodes: vitaminArticles.map(a => a.id),
    contentMarkdown: vitaminContent
  },
  {
    id: "feat-autumn-setting-spray-powder-dry-shine-10",
    slug: "autumn-setting-spray-powder-dry-shine-10",
    title: "【秋の乾燥崩れとテカリが気になる季節に】一日中つけたて美肌！秋のメイクキープミスト＆セッティングパウダー10選",
    subtitle: "外気と暖房の寒暖差によるインナードライ・Tゾーンのテカリ・乾燥ひび割れを防止！モイストキープミスト＆シルクパウダー徹底検証",
    targetGender: "women",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 37,
    introText: "外気と暖房の寒暖差によるインナードライ・Tゾーンのテカリ・乾燥ひび割れを防止！モイストキープミスト＆シルクパウダー徹底検証",
    isHallOfFame: true,
    coverImage: settingItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/setting.jpg",
    recommendedItemCodes: settingArticles.map(a => a.id),
    contentMarkdown: settingContent
  },
  {
    id: "feat-autumn-pillow-mist-aroma-candle-relax-10",
    slug: "autumn-pillow-mist-aroma-candle-relax-10",
    title: "【肌寒い夜に心地よく眠れない季節に】秋の夜長を至福の癒しに！ピローミスト＆アロマキャンドル10選",
    subtitle: "冷え込む秋の夜に自律神経を整えて上質な睡眠美容を叶える！天然精油ピローミスト＆焚き火音キャンドル・ルームスプレー完全ガイド",
    targetGender: "unisex",
    authorId: "author-mizuki",
    authorName: "観月 美月",
    authorRole: "Qualia Navi ライフスタイル＆フレグランスエディター / アロマ調香師",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "冷え込む秋の夜に自律神経を整えて上質な睡眠美容を叶える！天然精油ピローミスト＆焚き火音キャンドル・ルームスプレー完全ガイド",
    isHallOfFame: true,
    coverImage: sleepItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/sleep.jpg",
    recommendedItemCodes: sleepArticles.map(a => a.id),
    contentMarkdown: sleepContent
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
  console.log('✅ src/data.ts に第7弾の3記事を追加完了しました！');
} else {
  console.error('❌ src/data.ts 内に INITIAL_BLOG_POSTS の宣言が見つかりませんでした。');
  process.exit(1);
}

console.log('✨ 第7弾のデータ登録がすべて正常に完了しました。');
