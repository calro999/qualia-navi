import fs from 'fs';
import path from 'path';
import {
  eyeItemsRaw,
  oilItemsRaw,
  cicaItemsRaw,
  eyeArticles,
  oilArticles,
  cicaArticles,
  updateArticlesJson
} from './insert_autumn_series15_helper.mjs';

import { getEyeArticleContent } from './autumn_series15_article1_eye.mjs';
import { getOilArticleContent } from './autumn_series15_article2_oil.mjs';
import { getCicaArticleContent } from './autumn_series15_article3_cica.mjs';

console.log('🍂 [2026秋コスメ特集 第15弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const eyeContent = getEyeArticleContent();
const oilContent = getOilArticleContent();
const cicaContent = getCicaArticleContent();

console.log(`- 記事1 (秋高保湿アイクリーム10選) 文字数: 約${eyeContent.length}文字`);
console.log(`- 記事2 (秋お風呂上がり先行フェイスオイル10選) 文字数: 約${oilContent.length}文字`);
console.log(`- 記事3 (秋低刺激CICAバーム10選) 文字数: 約${cicaContent.length}文字`);

if (eyeContent.length < 5000 || oilContent.length < 5000 || cicaContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-eye-cream-fine-lines-crow-feet-10",
    slug: "autumn-eye-cream-fine-lines-crow-feet-10",
    title: "【木枯らしでまぶたや目尻がカサつき小ジワが目立つ季節に】高保湿・目元ふっくらアイクリーム10選",
    subtitle: "秋の乾燥風と眼精疲労で深くなる目元のちりめんジワをふっくら押し戻す！ナイアシンアミド＆レチノール高配合で皮膚の薄い目元を濃密保護する名品完全比較",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 38,
    introText: "秋の乾燥風と眼精疲労で深くなる目元のちりめんジワをふっくら押し戻す！ナイアシンアミド＆レチノール高配合で皮膚の薄い目元を濃密保護する名品完全比較",
    isHallOfFame: true,
    coverImage: eyeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyecream.jpg",
    recommendedItemCodes: eyeArticles.map(a => a.id),
    contentMarkdown: eyeContent
  },
  {
    id: "feat-autumn-facial-oil-post-bath-dehydration-10",
    slug: "autumn-facial-oil-post-bath-dehydration-10",
    title: "【入浴後の急激なツッパリ・肌の過乾燥を防ぐ季節に】水分を逃さないお風呂上がり先行フェイシャルオイル10選",
    subtitle: "脱衣所に出た瞬間から始まる急激な肌の水分蒸発を食い止める！高純度スクワラン＆未精製アルガンオイルで濡れた肌を即密閉する優秀ブースターオイル完全ガイド",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 37,
    introText: "脱衣所に出た瞬間から始まる急激な肌の水分蒸発を食い止める！高純度スクワラン＆未精製アルガンオイルで濡れた肌を即密閉する優秀ブースターオイル完全ガイド",
    isHallOfFame: true,
    coverImage: oilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/faceoil.jpg",
    recommendedItemCodes: oilArticles.map(a => a.id),
    contentMarkdown: oilContent
  },
  {
    id: "feat-autumn-cica-ceramide-calming-balm-10",
    slug: "autumn-cica-ceramide-calming-balm-10",
    title: "【季節の変わり目に肌がピリピリ赤くゆらぐ季節に】肌バリアを立て直す低刺激CICA＆セラミドバーム10選",
    subtitle: "秋の寒暖差や花粉でいつもの化粧水もしみる敏感肌を穏やかに鎮静！ツボクサエキス＆濃密ヒト型セラミドで肌荒れをスピード修復する低刺激バーム完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 36,
    introText: "秋の寒暖差や花粉でいつもの化粧水もしみる敏感肌を穏やかに鎮静！ツボクサエキス＆濃密ヒト型セラミドで肌荒れをスピード修復する低刺激バーム完全網羅",
    isHallOfFame: true,
    coverImage: cicaItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cicacream.jpg",
    recommendedItemCodes: cicaArticles.map(a => a.id),
    contentMarkdown: cicaContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第15弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 第15弾の統合処理がすべて正常に完了しました！');
