// scripts/insert_autumn_series18_main.mjs
import fs from 'fs';
import path from 'path';
import {
  cleansingItemsRaw,
  concealerItemsRaw,
  bathOilItemsRaw,
  cleansingArticles,
  concealerArticles,
  bathOilArticles,
  updateArticlesJson
} from './insert_autumn_series18_helper.mjs';

import { getCleansingArticleContent } from './autumn_series18_article1_cleansing.mjs';
import { getConcealerArticleContent } from './autumn_series18_article2_concealer.mjs';
import { getBathOilArticleContent } from './autumn_series18_article3_bathoil.mjs';

console.log('🍂 [2026秋コスメ特集 第18弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const cleansingContent = getCleansingArticleContent();
const concealerContent = getConcealerArticleContent();
const bathOilContent = getBathOilArticleContent();

console.log(`- 記事1 (秋高保湿クレンジングジェル10選) 文字数: 約${cleansingContent.length}文字`);
console.log(`- 記事2 (秋高保湿リキッドコンシーラー10選) 文字数: 約${concealerContent.length}文字`);
console.log(`- 記事3 (秋高保湿バスオイル10選) 文字数: 約${bathOilContent.length}文字`);

if (cleansingContent.length < 5000 || concealerContent.length < 5000 || bathOilContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-moist-cleansing-gel-balm-pores-10",
    slug: "autumn-moist-cleansing-gel-balm-pores-10",
    title: "【秋の乾燥と毛穴ごわつきに】摩擦レスでうるおいキープ！秋の高保湿クレンジングジェル・バーム10選",
    subtitle: "夏の紫外線ダメージと秋の冷気で硬化した毛穴角栓・黒ずみを優しくほぐす！美容液成分＆植物オイル高配合で洗顔後のつっぱりを完全ブロックする高保湿クレンジング完全比較",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 38,
    introText: "夏の紫外線ダメージと秋の冷気で硬化した毛穴角栓・黒ずみを優しくほぐす！美容液成分＆植物オイル高配合で洗顔後のつっぱりを完全ブロックする高保湿クレンジング完全比較",
    isHallOfFame: true,
    coverImage: cleansingItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cleansing.jpg",
    recommendedItemCodes: cleansingArticles.map(a => a.id),
    contentMarkdown: cleansingContent
  },
  {
    id: "feat-autumn-hydrating-concealer-under-eye-dark-circles-10",
    slug: "autumn-hydrating-concealer-under-eye-dark-circles-10",
    title: "【秋の乾燥クマ・くすみ影を消す】ひび割れず夕方まで密着！高保湿リキッドコンシーラーおすすめ10選",
    subtitle: "気温低下による血行不良青グマと乾燥小ジワ割れを防ぐ！光拡散偏光パール＆美容液カプセル配合で薄膜なのに頑固な目元の影を自然に消し去る優秀コンシーラー完全ガイド",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 37,
    introText: "気温低下による血行不良青グマと乾燥小ジワ割れを防ぐ！光拡散偏光パール＆美容液カプセル配合で薄膜なのに頑固な目元の影を自然に消し去る優秀コンシーラー完全ガイド",
    isHallOfFame: true,
    coverImage: concealerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/concealer.jpg",
    recommendedItemCodes: concealerArticles.map(a => a.id),
    contentMarkdown: concealerContent
  },
  {
    id: "feat-autumn-moist-bath-oil-body-care-cold-dry-10",
    slug: "autumn-moist-bath-oil-body-care-cold-dry-10",
    title: "【秋の冷え込みと全身乾燥を防ぐ】湯上がりもしっとり！高保湿バスオイル・入浴液おすすめ10選",
    subtitle: "急激な冷え込みによる湯冷めと入浴後の過乾燥（粉ふき）を徹底防止！天然植物精油＆高純度セラミドヴェールで全身を包み込み深いリラックスと極上素肌を育む名品バスケア",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 36,
    introText: "急激な冷え込みによる湯冷めと入浴後の過乾燥（粉ふき）を徹底防止！天然植物精油＆高純度セラミドヴェールで全身を包み込み深いリラックスと極上素肌を育む名品バスケア",
    isHallOfFame: true,
    coverImage: bathOilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bathoil.jpg",
    recommendedItemCodes: bathOilArticles.map(a => a.id),
    contentMarkdown: bathOilContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第18弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第18弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 18, "slug": "autumn-moist-cleansing-gel-balm-pores-10", "category": "スキンケア", "concern": "秋の乾燥と夏の紫外線疲れによる毛穴開き・硬化角栓・ごわつき", "shortTitle": "摩擦レスでうるおいキープ！秋の高保湿クレンジングジェル・バーム10選" },
  { "series": 18, "slug": "autumn-hydrating-concealer-under-eye-dark-circles-10", "category": "ベースメイク", "concern": "気温低下による目元の血行不良クマ・乾燥小ジワ割れ・くすみ", "shortTitle": "ひび割れず夕方まで密着！高保湿リキッドコンシーラーおすすめ10選" },
  { "series": 18, "slug": "autumn-moist-bath-oil-body-care-cold-dry-10", "category": "ボディケア", "concern": "夜の冷え込みによる湯冷め・入浴後の急激な水分蒸散・全身の粉ふき乾燥", "shortTitle": "湯上がりもしっとり！高保湿バスオイル・入浴液おすすめ10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第18弾の統合処理がすべて正常に完了しました！');
