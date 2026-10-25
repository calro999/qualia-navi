// scripts/insert_autumn_series28_main.mjs
import fs from 'fs';
import path from 'path';
import {
  eyeItemsRaw,
  cushionItemsRaw,
  bodyWashItemsRaw,
  eyeArticles,
  cushionArticles,
  bodyWashArticles,
  updateArticlesJson
} from './insert_autumn_series28_helper.mjs';

import { getEyeArticleContent } from './autumn_series28_article1_eye.mjs';
import { getCushionArticleContent } from './autumn_series28_article2_cushion.mjs';
import { getBodyWashArticleContent } from './autumn_series28_article3_bodywash.mjs';

console.log('🍂 [2026秋コスメ特集 第28弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const eyeContent = getEyeArticleContent();
const cushionContent = getCushionArticleContent();
const bodyWashContent = getBodyWashArticleContent();

console.log(`- 記事1 (晩秋の高機能アイクリーム10選) 文字数: 約${eyeContent.length.toLocaleString()}文字`);
console.log(`- 記事2 (生ツヤ高保湿クッションファンデ10選) 文字数: 約${cushionContent.length.toLocaleString()}文字`);
console.log(`- 記事3 (薬用高保湿ボディソープ10選) 文字数: 約${bodyWashContent.length.toLocaleString()}文字`);

if (eyeContent.length < 50000 || cushionContent.length < 50000 || bodyWashContent.length < 50000) {
  console.error('❌ 文字数がキラー基準（50,000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-advanced-eye-cream-wrinkle-repair-10",
    slug: "autumn-advanced-eye-cream-wrinkle-repair-10",
    title: "【晩秋の目元ちりめんジワ・夕方のまぶた窪みに】高機能アイクリーム10選",
    subtitle: "湿度が30%台へ急落し皮膚が最も薄い目元を集中レスキュー！純粋レチノール・ペプチド・セラミド配合で笑いジワと夕方の窪みをふっくら押し返し若々しいハリ眼差しへ導く名品完全比較",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-26",
    readTimeMinutes: 48,
    introText: "湿度が30%台へ急落し皮膚が最も薄い目元を集中レスキュー！純粋レチノール・ペプチド・セラミド配合で笑いジワと夕方の窪みをふっくら押し返し若々しいハリ眼差しへ導く名品完全比較",
    isHallOfFame: true,
    coverImage: eyeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eye.jpg",
    recommendedItemCodes: eyeArticles.map(a => a.id),
    contentMarkdown: eyeContent
  },
  {
    id: "feat-autumn-hydrating-glow-cushion-foundation-10",
    slug: "autumn-hydrating-glow-cushion-foundation-10",
    title: "【秋の粉ふき・皮脂崩れの同時勃発に】生ツヤ高保湿クッションファンデ10選",
    subtitle: "頬はカサつきTゾーンはテカる秋のアンバランス肌を救う！美容液成分70%超と微細メッシュが厚塗り感なく素肌になりすまし夕方まで毛穴落ちゼロの水光ツヤ肌をキープする決定版ガイド",
    targetGender: "women",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi ベースメイク・トーンアップ部門専属コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-26",
    readTimeMinutes: 47,
    introText: "頬はカサつきTゾーンはテカる秋のアンバランス肌を救う！美容液成分70%超と微細メッシュが厚塗り感なく素肌になりすまし夕方まで毛穴落ちゼロの水光ツヤ肌をキープする決定版ガイド",
    isHallOfFame: true,
    coverImage: cushionItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cushion.jpg",
    recommendedItemCodes: cushionArticles.map(a => a.id),
    contentMarkdown: cushionContent
  },
  {
    id: "feat-autumn-medicinal-barrier-body-wash-dry-itch-10",
    slug: "autumn-medicinal-barrier-body-wash-dry-itch-10",
    title: "【秋の乾燥粉ふき・全身のムズムズ痒みに】薬用高保湿ボディソープ10選",
    subtitle: "熱いお湯とゴシゴシ洗いによるセラミド流出を完全ストップ！7種の天然型セラミド・シアバター・弱酸性アミノ酸泡でお風呂上がりのつっぱり感をゼロにし吸い付くシルク肌を育む完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-26",
    readTimeMinutes: 48,
    introText: "熱いお湯とゴシゴシ洗いによるセラミド流出を完全ストップ！7種の天然型セラミド・シアバター・弱酸性アミノ酸泡でお風呂上がりのつっぱり感をゼロにし吸い付くシルク肌を育む完全網羅",
    isHallOfFame: true,
    coverImage: bodyWashItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodywash.jpg",
    recommendedItemCodes: bodyWashArticles.map(a => a.id),
    contentMarkdown: bodyWashContent
  }
];

// data.ts の INITIAL_BLOG_POSTS 先頭に挿入
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第28弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第28弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 28, "slug": "autumn-advanced-eye-cream-wrinkle-repair-10", "category": "アイ＆パーツスキンケア", "concern": "晩秋の目元ちりめんジワ・夕方のまぶた窪み・青クマ", "shortTitle": "高機能アイクリーム10選" },
  { "series": 28, "slug": "autumn-hydrating-glow-cushion-foundation-10", "category": "ベースメイク", "concern": "秋の頬の粉ふき乾燥とTゾーンのインナードライ皮脂テカリ", "shortTitle": "生ツヤ高保湿クッションファンデ10選" },
  { "series": 28, "slug": "autumn-medicinal-barrier-body-wash-dry-itch-10", "category": "ボディケア", "concern": "お風呂上がりのスネ・腕の粉ふき・全身の乾燥かゆみ", "shortTitle": "薬用高保湿ボディソープ10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第28弾のキラー記事統合処理がすべて正常に完了しました！');
