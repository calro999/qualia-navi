import fs from 'fs';
import path from 'path';
import {
  enzymeItemsRaw,
  settingItemsRaw,
  scrubItemsRaw,
  enzymeArticles,
  settingArticles,
  scrubArticles,
  updateArticlesJson
} from './insert_autumn_series16_helper.mjs';

import { getEnzymeArticleContent } from './autumn_series16_article1_enzyme.mjs';
import { getSettingArticleContent } from './autumn_series16_article2_setting.mjs';
import { getScrubArticleContent } from './autumn_series16_article3_scrub.mjs';

console.log('🍂 [2026秋コスメ特集 第16弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const enzymeContent = getEnzymeArticleContent();
const settingContent = getSettingArticleContent();
const scrubContent = getScrubArticleContent();

console.log(`- 記事1 (秋酵素洗顔パウダー10選) 文字数: 約${enzymeContent.length}文字`);
console.log(`- 記事2 (秋メイクキープミスト10選) 文字数: 約${settingContent.length}文字`);
console.log(`- 記事3 (秋リップスクラブ10選) 文字数: 約${scrubContent.length}文字`);

if (enzymeContent.length < 5000 || settingContent.length < 5000 || scrubContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-enzyme-face-wash-powder-pores-dullness-10",
    slug: "autumn-enzyme-face-wash-powder-pores-dullness-10",
    title: "【秋の乾燥でくすむ古い角質を落としてつるんと整える季節に】毛穴・くすみオフ！高保湿酵素洗顔パウダー10選",
    subtitle: "夏の紫外線ダメージで硬化した古い角質と毛穴の角栓を分解！アミノ酸洗浄成分＆パパイン酵素でつっぱらず透明感を呼び覚ます厳選名品",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 38,
    introText: "夏の紫外線ダメージで硬化した古い角質と毛穴の角栓を分解！アミノ酸洗浄成分＆パパイン酵素でつっぱらず透明感を呼び覚ます厳選名品",
    isHallOfFame: true,
    coverImage: enzymeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/enzyme.jpg",
    recommendedItemCodes: enzymeArticles.map(a => a.id),
    contentMarkdown: enzymeContent
  },
  {
    id: "feat-autumn-moist-makeup-setting-spray-dry-skin-10",
    slug: "autumn-moist-makeup-setting-spray-dry-skin-10",
    title: "【乾燥でファンデが浮いて粉を吹く・ひび割れる季節に】うるおい密着！高保湿メイクキープミスト10選",
    subtitle: "エアコン暖房の温風や外気の乾燥によるファンデのひび割れ・粉吹きをブロック！微細な美容液ミストで一日中つるんとした生ツヤ肌をキープする優秀フィックススプレー徹底比較",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 37,
    introText: "エアコン暖房の温風や外気の乾燥によるファンデのひび割れ・粉吹きをブロック！微細な美容液ミストで一日中つるんとした生ツヤ肌をキープする優秀フィックススプレー徹底比較",
    isHallOfFame: true,
    coverImage: settingItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/setting.jpg",
    recommendedItemCodes: settingArticles.map(a => a.id),
    contentMarkdown: settingContent
  },
  {
    id: "feat-autumn-lip-scrub-gommage-peeling-flaky-lips-10",
    slug: "autumn-lip-scrub-gommage-peeling-flaky-lips-10",
    title: "【木枯らしで唇がガサガサに皮剥けして口紅が乗らない季節に】ぷるんと復活！唇用スクラブ＆高保湿リップゴマージュ10選",
    subtitle: "乾燥でカチカチに硬くなった唇の皮剥けを優しくリセット！天然シュガーやマイルドな濃密泡と高純度植物オイルでふっくら血色リップを呼び覚ます名品完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-22",
    readTimeMinutes: 36,
    introText: "乾燥でカチカチに硬くなった唇の皮剥けを優しくリセット！天然シュガーやマイルドな濃密泡と高純度植物オイルでふっくら血色リップを呼び覚ます名品完全網羅",
    isHallOfFame: true,
    coverImage: scrubItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scrub.jpg",
    recommendedItemCodes: scrubArticles.map(a => a.id),
    contentMarkdown: scrubContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第16弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第16弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 16, "slug": "autumn-enzyme-face-wash-powder-pores-dullness-10", "category": "スキンケア", "concern": "夏の紫外線ダメージの角質肥厚・毛穴黒ずみ・くすみ", "shortTitle": "毛穴・くすみオフ！高保湿酵素洗顔パウダー10選" },
  { "series": 16, "slug": "autumn-moist-makeup-setting-spray-dry-skin-10", "category": "ベースメイク", "concern": "冷暖房乾燥によるファンデ粉吹き・ほうれい線割れ", "shortTitle": "うるおい密着！高保湿メイクキープミスト10選" },
  { "series": 16, "slug": "autumn-lip-scrub-gommage-peeling-flaky-lips-10", "category": "リップケア", "concern": "木枯らしの唇皮剥け・縦ジワ・口紅のノリ改善", "shortTitle": "ぷるんと復活！唇用スクラブ＆高保湿リップゴマージュ10選" }
];

// 重複チェックして追加
for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第16弾の統合処理がすべて正常に完了しました！');
