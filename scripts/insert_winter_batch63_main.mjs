import fs from 'fs';
import path from 'path';
import {
  warmerItemsRaw,
  brushItemsRaw,
  ledMaskItemsRaw,
  warmerArticles,
  brushArticles,
  ledMaskArticles
} from './insert_winter_batch63_helper.mjs';

import { getHandWarmerArticleContent } from './winter_batch63_article1_hand_warmer.mjs';
import { getCleansingBrushArticleContent } from './winter_batch63_article2_cleansing_brush.mjs';
import { getLedMaskArticleContent } from './winter_batch63_article3_led_mask.mjs';

console.log('🚀 [冬コスメ 第63弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const warmerContent = getHandWarmerArticleContent();
const brushContent = getCleansingBrushArticleContent();
const ledMaskContent = getLedMaskArticleContent();

console.log(`- 記事1 (充電式カイロ＆モバイルバッテリー温活) 文字数: 約${warmerContent.length}文字`);
console.log(`- 記事2 (音波振動シリコン電動洗顔ブラシ) 文字数: 約${brushContent.length}文字`);
console.log(`- 記事3 (LED美顔マスク＆光エステフォトフェイシャル) 文字数: 約${ledMaskContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (warmerContent.length < 5000 || brushContent.length < 5000 || ledMaskContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-rechargeable-hand-warmer-electric-pocket-kairo-2026",
    slug: "winter-rechargeable-hand-warmer-electric-pocket-kairo-2026",
    title: "【2026冬・指先のかじかみ＆末端冷え性を5秒で即温め】充電式カイロ＆モバイルバッテリーおすすめ人気10選！繰り返し使える電子ハンドウォーマー・急速発熱・可愛い軽量スリム設計など冬の温活＆ホリデーギフト徹底比較",
    subtitle: "11〜12月の凍える寒さで指先がかじかむ通勤通学や手荒れの悩みを、スイッチ5秒の急速発熱で即座に温める最新充電式カイロ！モットル、フランフラン、hagoogiなど冬の温活＆ギフトに選ばれる人気10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の凍える寒さで指先がかじかむ通勤通学や手荒れの悩みを、スイッチ5秒の急速発熱で即座に温める最新充電式カイロ！モットル、フランフラン、hagoogiなど冬の温活＆ギフトに選ばれる人気10選！",
    isHallOfFame: true,
    coverImage: warmerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/warmer.jpg",
    recommendedItemCodes: warmerArticles.map(a => a.id),
    contentMarkdown: warmerContent
  },
  {
    id: "feat-winter-sonic-silicone-facial-cleansing-brush-pore-care-2026",
    slug: "winter-sonic-silicone-facial-cleansing-brush-pore-care-2026",
    title: "【2026冬・寒さでゴワつく冬肌を摩擦レスに脱皮】音波振動シリコン電動洗顔ブラシおすすめ人気10選！温熱毛穴ケア・極細シリコンヘッド・完全防水など乾燥肌を傷めず古い角質と毛穴汚れをごっそり落としスキンケア浸透を爆上げする神ギア徹底比較",
    subtitle: "11〜12月の寒さでターンオーバーが滞りゴワついた冬肌を、摩擦ゼロの音波微振動と極細シリコンで優しく解きほぐす！FOREO、美ルル、Ur.Salonなど乾燥肌でも安心して使える最新シリコン電動洗顔ブラシ10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の寒さでターンオーバーが滞りゴワついた冬肌を、摩擦ゼロの音波微振動と極細シリコンで優しく解きほぐす！FOREO、美ルル、Ur.Salonなど乾燥肌でも安心して使える最新シリコン電動洗顔ブラシ10選！",
    isHallOfFame: true,
    coverImage: brushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/brush.jpg",
    recommendedItemCodes: brushArticles.map(a => a.id),
    contentMarkdown: brushContent
  },
  {
    id: "feat-winter-led-face-mask-photofacial-light-therapy-2026",
    slug: "winter-led-face-mask-photofacial-light-therapy-2026",
    title: "【2026冬・おうちで極上フォトフェイシャル】LED美顔マスク＆光エステ美顔器おすすめ人気10選！赤色LED×近赤外線・7色光波長・ハンズフリー設計など冬の冷えくすみ＆ハリ不足を寝ながら底上げするエイジングケア神ギア徹底比較",
    subtitle: "11〜12月の寒さと血行不良による冬の頑固なくすみやハリ不足を、寝転がったまま光エネルギーで深層ケア！赤色LED、近赤外線、美ルル、FEIHAIなどホリデーシーズン＆ボーナス買いの極上LEDマスク10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の寒さと血行不良による冬の頑固なくすみやハリ不足を、寝転がったまま光エネルギーで深層ケア！赤色LED、近赤外線、美ルル、FEIHAIなどホリデーシーズン＆ボーナス買いの極上LEDマスク10選！",
    isHallOfFame: true,
    coverImage: ledMaskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/led.jpg",
    recommendedItemCodes: ledMaskArticles.map(a => a.id),
    contentMarkdown: ledMaskContent
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

console.log(`🎉 第63弾 特集記事3件＆個別商品記事30件の統合が完了しました！`);
