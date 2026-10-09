import fs from 'fs';
import path from 'path';
import {
  wrinkleItemsRaw,
  handCreamItemsRaw,
  bathItemsRaw,
  wrinkleArticles,
  handArticles,
  bathArticles
} from './insert_winter_batch72_helper.mjs';

import { getWrinkleArticleContent } from './winter_batch72_article1_wrinkle.mjs';
import { getHandCreamArticleContent } from './winter_batch72_article2_hand_cream.mjs';
import { getBathArticleContent } from './winter_batch72_article3_bath.mjs';

console.log('🚀 [冬コスメ 第72弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const wrinkleContent = getWrinkleArticleContent();
const handContent = getHandCreamArticleContent();
const bathContent = getBathArticleContent();

console.log(`- 記事1 (薬用リンクルクリーム＆高濃度レチノール美容液) 文字数: 約${wrinkleContent.length}文字`);
console.log(`- 記事2 (薬用高保湿ハンドクリーム＆濃密ハンドトリートメント) 文字数: 約${handContent.length}文字`);
console.log(`- 記事3 (薬用重炭酸入浴剤＆極上高保湿バスミルク) 文字数: 約${bathContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (wrinkleContent.length < 5000 || handContent.length < 5000 || bathContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-medicinal-wrinkle-cream-retinol-anti-aging-2026",
    slug: "winter-medicinal-wrinkle-cream-retinol-anti-aging-2026",
    title: "【2026冬・目元＆口元の乾燥小じわ・ほうれい線集中撃退】薬用リンクルクリーム＆高濃度レチノール・ナイアシンアミド美容液おすすめ人気10選！POLA・エリクシール・なめらか本舗徹底比較！純粋レチノール×ニールワンで刻まれたシワを跳ね返すふっくらピン肌へ",
    subtitle: "11〜12月の湿度急低下とエアコン暖房の乾燥による目元・口元のちりめんジワやほうれい線を集中ケアし、真皮・表皮の両面から押し返すハリ肌へ導くシワ改善コスメ10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 32,
    introText: "11〜12月の湿度急低下とエアコン暖房の乾燥による目元・口元のちりめんジワやほうれい線を集中ケアし、真皮・表皮の両面から押し返すハリ肌へ導くシワ改善コスメ10選！",
    isHallOfFame: true,
    coverImage: wrinkleItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/wrinkle.jpg",
    recommendedItemCodes: wrinkleArticles.map(a => a.id),
    contentMarkdown: wrinkleContent
  },
  {
    id: "feat-winter-medicinal-hand-cream-repair-moist-balm-2026",
    slug: "winter-medicinal-hand-cream-repair-moist-balm-2026",
    title: "【2026冬・指先のガサガサ・ひび割れ・あかぎれを一夜で修復】薬用高保湿ハンドクリーム＆濃密ハンドトリートメントバームおすすめ人気10選！ユースキン・ロクシタン・アトリックス徹底比較！ヘパリン類似物質×高純度シアバターで水仕事にも負けないうるスベ手肌へ",
    subtitle: "11〜12月の木枯らしや冷たい水仕事によるガサガサ・ひび割れ・あかぎれを一晩で集中修復し、ベタつかずシルクのようになめらかな手肌を保つ高保湿ハンドケア10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の木枯らしや冷たい水仕事によるガサガサ・ひび割れ・あかぎれを一晩で集中修復し、ベタつかずシルクのようになめらかな手肌を保つ高保湿ハンドケア10選！",
    isHallOfFame: true,
    coverImage: handCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/handcream.jpg",
    recommendedItemCodes: handArticles.map(a => a.id),
    contentMarkdown: handContent
  },
  {
    id: "feat-winter-medicinal-bicarbonate-bath-milk-warmth-moist-2026",
    slug: "winter-medicinal-bicarbonate-bath-milk-warmth-moist-2026",
    title: "【2026冬・冷え切った身体を芯から温めて全身潤す】薬用重炭酸入浴剤＆極上高保湿バスミルク・生薬温活入浴剤おすすめ人気10選！BARTH・アユーラ・クナイプ徹底比較！炭酸温浴×セラミド保湿ヴェールで湯冷めゼロ＆お風呂上がりの粉吹き乾燥肌をリセット",
    subtitle: "11〜12月の底冷えする真冬の夜に芯から血行を促進して疲労・冷えを和らげ、お風呂上がりの粉吹き乾燥肌を美容液ヴェールで守り抜く極上入浴料10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の底冷えする真冬の夜に芯から血行を促進して疲労・冷えを和らげ、お風呂上がりの粉吹き乾燥肌を美容液ヴェールで守り抜く極上入浴料10選！",
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
  console.log('✅ src/data.ts に第72弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
