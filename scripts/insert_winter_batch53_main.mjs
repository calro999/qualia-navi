import fs from 'fs';
import path from 'path';
import {
  exosomeItemsRaw,
  ultrasonicItemsRaw,
  iplItemsRaw,
  exosomeArticles,
  ultrasonicArticles,
  iplArticles
} from './insert_winter_batch53_helper.mjs';

import { getExosomeArticleContent } from './winter_batch53_article1_exosome.mjs';
import { getUltrasonicArticleContent } from './winter_batch53_article2_ultrasonic.mjs';
import { getIplArticleContent } from './winter_batch53_article3_ipl.mjs';

console.log('🚀 [冬コスメ 第53弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const exosomeContent = getExosomeArticleContent();
const ultrasonicContent = getUltrasonicArticleContent();
const iplContent = getIplArticleContent();

console.log(`- 記事1 (エクソソーム美容液) 文字数: 約${exosomeContent.length}文字`);
console.log(`- 記事2 (超音波トリートメントアイロン) 文字数: 約${ultrasonicContent.length}文字`);
console.log(`- 記事3 (IPL光美容器) 文字数: 約${iplContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (exosomeContent.length < 5000 || ultrasonicContent.length < 5000 || iplContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-exosome-stem-cell-serum-aging-repair-2026",
    slug: "winter-exosome-stem-cell-serum-aging-repair-2026",
    title: "【2026冬・年齢肌のしぼみ＆乾燥小じわ・毛穴を根本細胞リペア】高純度エクソソーム美容液＆ヒト幹細胞培養液アンプルおすすめ人気10選！冬のおこもり再生美容で発光ハリ艶肌を叶える最先端バイオスキンケア徹底比較",
    subtitle: "寒冷と暖房乾燥でしぼんだ大人の肌細胞に活力を！フラコラ、リジェンスキン、メディキューブ、DDS MATRIX、ステムボーテ、湘南美容クリニックなど、再生医療発想の最高峰エイジングケア10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 28,
    introText: "寒冷と暖房乾燥でしぼんだ大人の肌細胞に活力を！フラコラ、リジェンスキン、メディキューブ、DDS MATRIX、ステムボーテ、湘南美容クリニックなど、再生医療発想の最高峰エイジングケア10選！",
    isHallOfFame: true,
    coverImage: exosomeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/exosome.jpg",
    recommendedItemCodes: exosomeArticles.map(a => a.id),
    contentMarkdown: exosomeContent
  },
  {
    id: "feat-winter-ultrasonic-hair-treatment-iron-care-2026",
    slug: "winter-ultrasonic-hair-treatment-iron-care-2026",
    title: "【2026冬・乾燥パサつき＆ニット静電気の広がり髪をサロン帰りのうるツヤ美髪へ】超音波トリートメントアイロン＆超音波浸透美髪器おすすめ人気10選！CARE PRO（ケアプロ）・ヤーマン・SALONIAなど冬の集中ヘアパックを劇的格上げする神ギア徹底比較",
    subtitle: "冬の乾燥と静電気で傷んだ髪を毎秒100万回振動でサロン級補修！CARE PRO DEEP、ヤーマン シャインプロ、Le ment、Kiboerなど、お風呂で使えるインバス美髪アイロン10選！",
    targetGender: "women",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 28,
    introText: "冬の乾燥と静電気で傷んだ髪を毎秒100万回振動でサロン級補修！CARE PRO DEEP、ヤーマン シャインプロ、Le ment、Kiboerなど、お風呂で使えるインバス美髪アイロン10選！",
    isHallOfFame: true,
    coverImage: ultrasonicItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/ultrasonic.jpg",
    recommendedItemCodes: ultrasonicArticles.map(a => a.id),
    contentMarkdown: ultrasonicContent
  },
  {
    id: "feat-winter-ipl-hair-removal-device-smooth-skin-2026",
    slug: "winter-ipl-hair-removal-device-smooth-skin-2026",
    title: "【2026冬・紫外線最少の今こそ始めるツルスベ肌計画】家庭用IPL光美容器＆高機能美肌脱毛器おすすめ人気10選！ケノン・ブラウン・ReFaなど冬の間にムダ毛ゼロ＆透明美肌を手に入れるボーナスご褒美美容家電徹底比較",
    subtitle: "紫外線ゼロ期の冬こそ脱毛の絶対的ベストシーズン！ケノン、ブラウンPro5、ヤーマン、Ulikeサファイア氷感、JOVS、ReFaなど、来年夏にツルスベ肌を間に合わせる家庭用光美容器10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 28,
    introText: "紫外線ゼロ期の冬こそ脱毛の絶対的ベストシーズン！ケノン、ブラウンPro5、ヤーマン、Ulikeサファイア氷感、JOVS、ReFaなど、来年夏にツルスベ肌を間に合わせる家庭用光美容器10選！",
    isHallOfFame: true,
    coverImage: iplItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/ipl.jpg",
    recommendedItemCodes: iplArticles.map(a => a.id),
    contentMarkdown: iplContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの新規特集記事を挿入しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが src/data.ts に見つかりませんでした。');
  process.exit(1);
}

// 追加後の記事総数を確認
const finalCount = (dataTsContent.match(/id:\s*"feat-winter-/g) || []).length;
console.log(`🎉 登録完了！特集記事の総数: ${finalCount}件以上`);
