import fs from 'fs';
import path from 'path';
import {
  calmItemsRaw,
  concealerItemsRaw,
  tintItemsRaw,
  calmArticles,
  concealerArticles,
  tintArticles,
  updateArticlesJson
} from './insert_autumn_series8_helper.mjs';

import { getCalmArticleContent } from './autumn_series8_article1_calm.mjs';
import { getConcealerArticleContent } from './autumn_series8_article2_concealer.mjs';
import { getTintArticleContent } from './autumn_series8_article3_tint.mjs';

console.log('🍂 [2026秋コスメ特集 第8弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const calmContent = getCalmArticleContent();
const concealerContent = getConcealerArticleContent();
const tintContent = getTintArticleContent();

console.log(`- 記事1 (秋ゆらぎ肌CICA＆ドクダミ10選) 文字数: 約${calmContent.length}文字`);
console.log(`- 記事2 (秋保湿コンシーラー10選) 文字数: 約${concealerContent.length}文字`);
console.log(`- 記事3 (秋マルチカラーバーム＆リップチーク10選) 文字数: 約${tintContent.length}文字`);

if (calmContent.length < 5000 || concealerContent.length < 5000 || tintContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-cica-soothing-sensitive-skin-10",
    slug: "autumn-cica-soothing-sensitive-skin-10",
    title: "【急な寒暖差で肌がピリつく季節に】赤みや肌荒れを即効レスキュー！秋のCICA＆ドクダミ鎮静コスメ10選",
    subtitle: "秋の寒暖差や花粉・乾燥による赤み・肌荒れ・バリア機能低下を即鎮静！高純度ツボクサエキス＆ドクダミ名品完全比較",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "秋の寒暖差や花粉・乾燥による赤み・肌荒れ・バリア機能低下を即鎮静！高純度ツボクサエキス＆ドクダミ名品完全比較",
    isHallOfFame: true,
    coverImage: calmItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cica.jpg",
    recommendedItemCodes: calmArticles.map(a => a.id),
    contentMarkdown: calmContent
  },
  {
    id: "feat-autumn-moist-concealer-color-correct-10",
    slug: "autumn-moist-concealer-color-correct-10",
    title: "【目元の小ジワや乾燥くまが浮き出る季節に】パサつかず一日中高密着！秋の保湿コンシーラー10選",
    subtitle: "冷え込みによる青グマやちりめんジワをひび割れさせずに一日中カバー！美容液配合リキッド＆光補正パレット徹底検証",
    targetGender: "women",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 37,
    introText: "冷え込みによる青グマやちりめんジワをひび割れさせずに一日中カバー！美容液配合リキッド＆光補正パレット徹底検証",
    isHallOfFame: true,
    coverImage: concealerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/concealer.jpg",
    recommendedItemCodes: concealerArticles.map(a => a.id),
    contentMarkdown: concealerContent
  },
  {
    id: "feat-autumn-multi-color-balm-lip-cheek-10",
    slug: "autumn-multi-color-balm-lip-cheek-10",
    title: "【秋の冷えで血色感が失われる季節に】じゅわっと温もり生ツヤ！秋のマルチカラーバーム＆リップチーク10選",
    subtitle: "青白く沈んだ顔色をぽっと上気した多幸感フェイスへ！頬と唇をワントーンで彩る高保湿生ツヤバーム＆スフレポット完全ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "青白く沈んだ顔色をぽっと上気した多幸感フェイスへ！頬と唇をワントーンで彩る高保湿生ツヤバーム＆スフレポット完全ガイド",
    isHallOfFame: true,
    coverImage: tintItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/tint.jpg",
    recommendedItemCodes: tintArticles.map(a => a.id),
    contentMarkdown: tintContent
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
  console.log('✅ src/data.ts に第8弾の3記事を追加完了しました！');
} else {
  console.error('❌ src/data.ts 内に INITIAL_BLOG_POSTS の宣言が見つかりませんでした。');
  process.exit(1);
}

console.log('✨ 第8弾のデータ登録がすべて正常に完了しました。');
