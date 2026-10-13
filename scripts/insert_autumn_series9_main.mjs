import fs from 'fs';
import path from 'path';
import {
  hairItemsRaw,
  eyeItemsRaw,
  lashItemsRaw,
  hairArticles,
  eyeArticles,
  lashArticles,
  updateArticlesJson
} from './insert_autumn_series9_helper.mjs';

import { getHairArticleContent } from './autumn_series9_article1_hair.mjs';
import { getSingleEyeArticleContent } from './autumn_series9_article2_eye.mjs';
import { getLashArticleContent } from './autumn_series9_article3_lash.mjs';

console.log('🍂 [2026秋コスメ特集 第9弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const hairContent = getHairArticleContent();
const eyeContent = getSingleEyeArticleContent();
const lashContent = getLashArticleContent();

console.log(`- 記事1 (秋ヘアスティック＆バーム10選) 文字数: 約${hairContent.length}文字`);
console.log(`- 記事2 (秋単色アイシャドウ10選) 文字数: 約${eyeContent.length}文字`);
console.log(`- 記事3 (秋まつ毛美容液10選) 文字数: 約${lashContent.length}文字`);

if (hairContent.length < 5000 || eyeContent.length < 5000 || lashContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-hair-stick-balm-flyaway-10",
    slug: "autumn-hair-stick-balm-flyaway-10",
    title: "【乾燥と静電気でアホ毛が爆発する季節に】ひと塗りでまとまる！秋のヘアスティック＆高保湿ヘアバーム10選",
    subtitle: "秋風の乾燥やニットの摩擦で広がるアホ毛・パサつきを一瞬でリセット！手を汚さず整うマスカラ型スティック＆シアバターバーム徹底比較",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "秋風の乾燥やニットの摩擦で広がるアホ毛・パサつきを一瞬でリセット！手を汚さず整うマスカラ型スティック＆シアバターバーム徹底比較",
    isHallOfFame: true,
    coverImage: hairItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair.jpg",
    recommendedItemCodes: hairArticles.map(a => a.id),
    contentMarkdown: hairContent
  },
  {
    id: "feat-autumn-single-eyeshadow-wet-glow-10",
    slug: "autumn-single-eyeshadow-wet-glow-10",
    title: "【秋の乾燥でまぶたがカサつく季節に】粉飛びゼロで濡れツヤ密着！秋の単色アイシャドウ10選",
    subtitle: "乾燥した目元にもピタッと密着してシワ落ちしない！指一本で洗練された陰影と濡れツヤを叶えるクリーム＆リキッドアイカラー完全検証",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 37,
    introText: "乾燥した目元にもピタッと密着してシワ落ちしない！指一本で洗練された陰影と濡れツヤを叶えるクリーム＆リキッドアイカラー完全検証",
    isHallOfFame: true,
    coverImage: eyeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eye.jpg",
    recommendedItemCodes: eyeArticles.map(a => a.id),
    contentMarkdown: eyeContent
  },
  {
    id: "feat-autumn-eyelash-serum-nourishing-lash-10",
    slug: "autumn-eyelash-serum-nourishing-lash-10",
    title: "【秋の乾燥でまつ毛の抜け毛やハリ不足が気になる季節に】濃密まつ育！秋のまつ毛美容液＆眉毛ケア10選",
    subtitle: "夏のダメージと秋の乾燥で細く抜けやすくなったまつ毛を根本から集中補修！サロン専売ナノペプチド＆低刺激アイラッシュセラム完全ガイド",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "夏のダメージと秋の乾燥で細く抜けやすくなったまつ毛を根本から集中補修！サロン専売ナノペプチド＆低刺激アイラッシュセラム完全ガイド",
    isHallOfFame: true,
    coverImage: lashItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lash.jpg",
    recommendedItemCodes: lashArticles.map(a => a.id),
    contentMarkdown: lashContent
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
  console.log('✅ src/data.ts に第9弾の3記事を追加完了しました！');
} else {
  console.error('❌ src/data.ts 内に INITIAL_BLOG_POSTS の宣言が見つかりませんでした。');
  process.exit(1);
}

console.log('✨ 第9弾のデータ登録がすべて正常に完了しました。');
