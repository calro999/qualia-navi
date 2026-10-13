import fs from 'fs';
import path from 'path';
import {
  cleanseItemsRaw,
  boosterItemsRaw,
  bathItemsRaw,
  cleanseArticles,
  boosterArticles,
  bathArticles,
  updateArticlesJson
} from './insert_autumn_series5_helper.mjs';

import { getCleanseArticleContent } from './autumn_series5_article1_cleanse.mjs';
import { getBoosterArticleContent } from './autumn_series5_article2_booster.mjs';
import { getBathArticleContent } from './autumn_series5_article3_bath.mjs';

console.log('🍂 [2026秋コスメ特集 第5弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const cleanseContent = getCleanseArticleContent();
const boosterContent = getBoosterArticleContent();
const bathContent = getBathArticleContent();

console.log(`- 記事1 (秋温感クレンジング10選) 文字数: 約${cleanseContent.length}文字`);
console.log(`- 記事2 (秋導入美容液＆ブースター10選) 文字数: 約${boosterContent.length}文字`);
console.log(`- 記事3 (秋薬用入浴剤＆バスソルト10選) 文字数: 約${bathContent.length}文字`);

if (cleanseContent.length < 5000 || boosterContent.length < 5000 || bathContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-hot-cleansing-balm-pores-10",
    slug: "autumn-hot-cleansing-balm-pores-10",
    title: "【肌が冷えて毛穴が固まる季節に】じんわり温めてつっぱらない！秋の温感ホットクレンジング＆高保湿バーム10選",
    subtitle: "気温低下で固まる角栓や毛穴の黒ずみをほぐしてオフ！洗い上がりのつっぱりを防ぐ秋の濃密クレンジング徹底比較",
    targetGender: "women",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "気温低下で固まる角栓や毛穴の黒ずみをほぐしてオフ！洗い上がりのつっぱりを防ぐ秋の濃密クレンジング徹底比較",
    isHallOfFame: true,
    coverImage: cleanseItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cleanse.jpg",
    recommendedItemCodes: cleanseArticles.map(a => a.id),
    contentMarkdown: cleanseContent
  },
  {
    id: "feat-autumn-booster-serum-dry-skin-10",
    slug: "autumn-booster-serum-dry-skin-10",
    title: "【化粧水が浸透しにくい季節に】ごわつく角層をほぐして吸い付く肌へ！秋の導入美容液＆ブースター10選",
    subtitle: "夏の紫外線ダメージ後の角質肥厚とインナードライを解消！いつものスキンケア効果を劇的に高める土台美容液完全ガイド",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "夏の紫外線ダメージ後の角質肥厚とインナードライを解消！いつものスキンケア効果を劇的に高める土台美容液完全ガイド",
    isHallOfFame: true,
    coverImage: boosterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/booster.jpg",
    recommendedItemCodes: boosterArticles.map(a => a.id),
    contentMarkdown: boosterContent
  },
  {
    id: "feat-autumn-bath-salt-soak-dry-cold-10",
    slug: "autumn-bath-salt-soak-dry-cold-10",
    title: "【湯冷めとお風呂上がりの乾燥が気になる季節に】芯から温まり肌が潤う！秋の薬用入浴剤＆バスソルト10選",
    subtitle: "冷え込む秋の夜に手足の先までポカポカ！入浴後の過乾燥・粉吹き・かゆみを防ぐ重炭酸＆薬用バスケア徹底解説",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 34,
    introText: "冷え込む秋の夜に手足の先までポカポカ！入浴後の過乾燥・粉吹き・かゆみを防ぐ重炭酸＆薬用バスケア徹底解説",
    isHallOfFame: true,
    coverImage: bathItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bath.jpg",
    recommendedItemCodes: bathArticles.map(a => a.id),
    contentMarkdown: bathContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの秋コスメ第5弾特集記事を追加しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 2026秋コスメ特集 第5弾 全3記事（各10商品レビュー、合計30商品）のデータベース登録が完了しました！');
