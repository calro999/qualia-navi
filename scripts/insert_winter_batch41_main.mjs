import fs from 'fs';
import path from 'path';
import {
  eyeshadowItemsRaw,
  handCareItemsRaw,
  cushionItemsRaw,
  eyeshadowArticles,
  handCareArticles,
  cushionArticles
} from './insert_winter_batch41_helper.mjs';

import { getEyeshadowArticleContent } from './winter_batch41_article1_eyeshadow.mjs';
import { getHandCareArticleContent } from './winter_batch41_article2_handcare.mjs';
import { getCushionArticleContent } from './winter_batch41_article3_cushion.mjs';

console.log('🚀 [冬コスメ 第41弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const eyeshadowContent = getEyeshadowArticleContent();
const handCareContent = getHandCareArticleContent();
const cushionContent = getCushionArticleContent();

console.log(`- 記事1 (限定アイシャドウパレット＆ジュエルラメ) 文字数: 約${eyeshadowContent.length}文字`);
console.log(`- 記事2 (薬用高保湿ハンドクリーム＆フレグランスセラム) 文字数: 約${handCareContent.length}文字`);
console.log(`- 記事3 (高保湿美容液クッション＆バームファンデ) 文字数: 約${cushionContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (eyeshadowContent.length < 5000 || handCareContent.length < 5000 || cushionContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-eyeshadow-palette-jewel-glitter-2026",
    slug: "winter-holiday-eyeshadow-palette-jewel-glitter-2026",
    title: "【2026冬ホリデー・聖夜の煌めき＆透明感】限定アイシャドウパレット＆冬のジュエルラメ・濡れツヤシャドウおすすめ人気10選！イルミネーションに映える大人の上品アイメイク徹底解説",
    subtitle: "冬の澄んだ光と夜の街灯に映える大人の濡れツヤ目元へ！ディオール、SUQQU、ルナソル、トムフォード、シャネルなど、暖房乾燥でも粉飛び・二重幅溜まり知らずの名品アイシャドウパレット10選を美容エディターが徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "冬の澄んだ光と夜の街灯に映える大人の濡れツヤ目元へ！ディオール、SUQQU、ルナソル、トムフォード、シャネルなど、暖房乾燥でも粉飛び・二重幅溜まり知らずの名品アイシャドウパレット10選を美容エディターが徹底比較！",
    isHallOfFame: true,
    coverImage: eyeshadowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyeshadow.jpg",
    recommendedItemCodes: eyeshadowArticles.map(a => a.id),
    contentMarkdown: eyeshadowContent
  },
  {
    id: "feat-winter-repair-hand-cream-fragrance-serum-2026",
    slug: "winter-repair-hand-cream-fragrance-serum-2026",
    title: "【2026冬・ガサガサ手荒れ＆あかぎれを即効リペア】薬用高保湿ハンドクリーム＆冬ギフトに喜ばれる極上フレグランスハンドセラムおすすめ人気10選！ベタつかない神アイテム徹底比較",
    subtitle: "寒冷と水仕事でひび割れた手肌を根本から救済！ロクシタン、シャネル、イソップ、SHIRO、ビュリー、ユースキンなど、スマホ操作も邪魔しないベタつきゼロ処方と心癒されるアロマ香る名品ハンドケア10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "寒冷と水仕事でひび割れた手肌を根本から救済！ロクシタン、シャネル、イソップ、SHIRO、ビュリー、ユースキンなど、スマホ操作も邪魔しないベタつきゼロ処方と心癒されるアロマ香る名品ハンドケア10選を徹底検証！",
    isHallOfFame: true,
    coverImage: handCareItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/handcream.jpg",
    recommendedItemCodes: handCareArticles.map(a => a.id),
    contentMarkdown: handCareContent
  },
  {
    id: "feat-winter-hydrating-serum-cushion-balm-foundation-2026",
    slug: "winter-hydrating-serum-cushion-balm-foundation-2026",
    title: "【2026冬・暖房乾燥でもひび割れ知らずの生ツヤ美肌】高保湿美容液クッションファンデ＆濃厚バームファンデーションおすすめ人気10選！夕方の粉ふき・毛穴落ちをゼロにする大人のベースメイク決定版",
    subtitle: "エアコン暖房直撃でも夕方までみずみずしいツヤをキープ！クレ・ド・ポー ボーテ、ディオール、TIRTIR、カバーマークなど、美容液成分70%以上配合でしぼみ肌をふっくら満たす高保湿ファンデーション10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "エアコン暖房直撃でも夕方までみずみずしいツヤをキープ！クレ・ド・ポー ボーテ、ディオール、TIRTIR、カバーマークなど、美容液成分70%以上配合でしぼみ肌をふっくら満たす高保湿ファンデーション10選を徹底比較！",
    isHallOfFame: true,
    coverImage: cushionItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cushion.jpg",
    recommendedItemCodes: cushionArticles.map(a => a.id),
    contentMarkdown: cushionContent
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
  console.log(`🎉 成功！ src/data.ts の INITIAL_BLOG_POSTS に 3つの新規冬コスメ特集記事を先頭追加しました！`);
} else {
  console.error(`❌ data.ts 内に ${blogPostsMarker} が見つかりませんでした。`);
  process.exit(1);
}
