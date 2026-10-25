// scripts/insert_autumn_series27_main.mjs
import fs from 'fs';
import path from 'path';
import {
  carbonItemsRaw,
  browItemsRaw,
  shampooItemsRaw,
  carbonArticles,
  browArticles,
  shampooArticles,
  updateArticlesJson
} from './insert_autumn_series27_helper.mjs';

import { getCarbonArticleContent } from './autumn_series27_article1_carbon.mjs';
import { getBrowArticleContent } from './autumn_series27_article2_brow.mjs';
import { getShampooArticleContent } from './autumn_series27_article3_shampoo.mjs';

console.log('🍂 [2026秋コスメ特集 第27弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const carbonContent = getCarbonArticleContent();
const browContent = getBrowArticleContent();
const shampooContent = getShampooArticleContent();

console.log(`- 記事1 (秋高濃度炭酸パック＆炭酸洗顔10選) 文字数: 約${carbonContent.length}文字`);
console.log(`- 記事2 (秋落ちない眉ティント＆高耐久アイブロウ10選) 文字数: 約${browContent.length}文字`);
console.log(`- 記事3 (秋高保湿クレイ・クリームシャンプー10選) 文字数: 約${shampooContent.length}文字`);

if (carbonContent.length < 5000 || browContent.length < 5000 || shampooContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-carbonated-pack-foam-dullness-pores-10",
    slug: "autumn-carbonated-pack-foam-dullness-pores-10",
    title: "【秋の冷えによる土色くすみ・開き毛穴に】高濃度炭酸パック＆炭酸洗顔10選",
    subtitle: "気温低下で収縮した毛細血管をボーア効果で一気に拡張！濃密マイクロ炭酸泡とクレイが毛穴奥の酸化皮脂を溶かし出し内側からポッと上気した水光透明肌を呼び覚ます名品完全比較",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-25",
    readTimeMinutes: 38,
    introText: "気温低下で収縮した毛細血管をボーア効果で一気に拡張！濃密マイクロ炭酸泡とクレイが毛穴奥の酸化皮脂を溶かし出し内側からポッと上気した水光透明肌を呼び覚ます名品完全比較",
    isHallOfFame: true,
    coverImage: carbonItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/carbon.jpg",
    recommendedItemCodes: carbonArticles.map(a => a.id),
    contentMarkdown: carbonContent
  },
  {
    id: "feat-autumn-eyebrow-tint-coat-smudge-proof-10",
    slug: "autumn-eyebrow-tint-coat-smudge-proof-10",
    title: "【秋の夕方の眉尻消失・まばら薄眉に】落ちない眉ティント＆高耐久アイブロウ10選",
    subtitle: "インナードライ皮脂と前髪・ニット着脱の摩擦で消える眉尻を最大7日間鉄壁ロック！セルフタンニング角質染色＆4Dフォーク筆で本物の毛並みを再現し朝のメイクを30秒に短縮する決定版ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-25",
    readTimeMinutes: 37,
    introText: "インナードライ皮脂と前髪・ニット着脱の摩擦で消える眉尻を最大7日間鉄壁ロック！セルフタンニング角質染色＆4Dフォーク筆で本物の毛並みを再現し朝のメイクを30秒に短縮する決定版ガイド",
    isHallOfFame: true,
    coverImage: browItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/brow.jpg",
    recommendedItemCodes: browArticles.map(a => a.id),
    contentMarkdown: browContent
  },
  {
    id: "feat-autumn-clay-cream-shampoo-dry-scalp-10",
    slug: "autumn-clay-cream-shampoo-dry-scalp-10",
    title: "【秋の頭皮の乾燥フケ・かゆみ・パサつき髪に】高保湿クレイ＆クリームシャンプー10選",
    subtitle: "泡立つ界面活性剤による皮脂の奪いすぎと摩擦ダメージを完全ゼロへ！ミネラルクレイ・レチノール・植物オイル配合の濃厚クリームで頭皮スパから毛先補修まで1本完結させる完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-25",
    readTimeMinutes: 36,
    introText: "泡立つ界面活性剤による皮脂の奪いすぎと摩擦ダメージを完全ゼロへ！ミネラルクレイ・レチノール・植物オイル配合の濃厚クリームで頭皮スパから毛先補修まで1本完結させる完全網羅",
    isHallOfFame: true,
    coverImage: shampooItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/shampoo.jpg",
    recommendedItemCodes: shampooArticles.map(a => a.id),
    contentMarkdown: shampooContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第27弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第27弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 27, "slug": "autumn-carbonated-pack-foam-dullness-pores-10", "category": "血行促進＆毛穴ケア", "concern": "秋の冷えによる土色くすみ・血行不良・たるみ開き毛穴", "shortTitle": "高濃度炭酸パック＆炭酸洗顔10選" },
  { "series": 27, "slug": "autumn-eyebrow-tint-coat-smudge-proof-10", "category": "アイブロウメイク", "concern": "夕方の眉尻消失・インナードライ皮脂崩れ・まばら薄眉", "shortTitle": "落ちない眉ティント＆高耐久アイブロウ10選" },
  { "series": 27, "slug": "autumn-clay-cream-shampoo-dry-scalp-10", "category": "ヘア＆スカルプケア", "concern": "頭皮の乾燥フケ・かゆみ・静電気による髪のパサつき広がり", "shortTitle": "高保湿クレイ＆クリームシャンプー10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第27弾の統合処理がすべて正常に完了しました！');
