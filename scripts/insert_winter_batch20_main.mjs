import fs from 'fs';
import path from 'path';
import {
  tintItemsRaw,
  glowItemsRaw,
  scalpItemsRaw,
  tintArticles,
  glowArticles,
  scalpArticles
} from './insert_winter_batch20_helper.mjs';

import { getTintArticleContent } from './winter_batch20_article1_tint.mjs';
import { getGlowArticleContent } from './winter_batch20_article2_glow.mjs';
import { getScalpArticleContent } from './winter_batch20_article3_scalp.mjs';

console.log('🚀 [冬コスメ 第20弾] 特集記事の生成と data.ts への統合を開始します...');

const tintContent = getTintArticleContent();
const glowContent = getGlowArticleContent();
const scalpContent = getScalpArticleContent();

console.log(`- 記事1 (リップティント) 文字数: 約${tintContent.length}文字`);
console.log(`- 記事2 (ハイライター) 文字数: 約${glowContent.length}文字`);
console.log(`- 記事3 (スカルプローション) 文字数: 約${scalpContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (tintContent.length < 5000 || glowContent.length < 5000 || scalpContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-long-lasting-hydrating-lip-tint-2026",
    slug: "winter-long-lasting-hydrating-lip-tint-2026",
    title: "【2026冬・忘年会＆ホリデーでも落ちない×皮むけ知らず】高保湿リップティント＆メルティングバームおすすめ人気10選！寒冷乾燥・エアコン下でもちゅるん発色続く粘膜美リップ決定版",
    subtitle: "真冬の過酷な寒冷乾燥と飲食で「食事をするとすぐ血色が落ちる」「従来のティントだと皮が剥けてボロボロになる」悩みを完全解消！ケイト（落ちないジェル膜リップモンスター）、ロムアンド（とろける水光バーム）、Laka（透明ガラス果汁光沢）、AMUSE（高水分35%ヴィーガン）、ディオール、BBIA、hince、YSL、キャンメイク、フジコなど、むっちり高密着と洗練された粘膜トーンを両立する名作10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "真冬の過酷な寒冷乾燥と飲食で「食事をするとすぐ血色が落ちる」「従来のティントだと皮が剥けてボロボロになる」悩みを完全解消！ケイト（落ちないジェル膜リップモンスター）、ロムアンド（とろける水光バーム）、Laka（透明ガラス果汁光沢）、AMUSE（高水分35%ヴィーガン）、ディオール、BBIA、hince、YSL、キャンメイク、フジコなど、むっちり高密着と洗練された粘膜トーンを両立する名作10選！",
    isHallOfFame: true,
    coverImage: tintItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/tint.jpg",
    recommendedItemCodes: tintArticles.map(a => a.id),
    contentMarkdown: tintContent
  },
  {
    id: "feat-winter-dewy-glow-liquid-highlighter-stick-2026",
    slug: "winter-dewy-glow-liquid-highlighter-stick-2026",
    title: "【2026冬・乾燥粉吹きゼロ＆澄んだ光を宿す水光肌】リキッドハイライター＆濡れツヤグロウスティックおすすめ人気10選！イルミネーションに映える内側発光ツヤ決定版",
    subtitle: "湿度が急落する真冬にパウダーハイライトを使うと起こる「乾燥小ジワの悪目立ち」「粉吹き」「毛穴落ち」を完全回避！シャネル（極上生ツヤのボームエサンシエル）、ディオール（90%自然由来フォーエヴァーグロウ）、hince（ラディアンスバーム）、コスメデコルテ（吸い付くディップイングロウ）、キャンメイク、セザンヌ、エトヴォス、MAC、RMK、CLIOなど、光の正反射とスキンケア油分で肌の透明感を底上げする名作10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "湿度が急落する真冬にパウダーハイライトを使うと起こる「乾燥小ジワの悪目立ち」「粉吹き」「毛穴落ち」を完全回避！シャネル（極上生ツヤのボームエサンシエル）、ディオール（90%自然由来フォーエヴァーグロウ）、hince（ラディアンスバーム）、コスメデコルテ（吸い付くディップイングロウ）、キャンメイク、セザンヌ、エトヴォス、MAC、RMK、CLIOなど、光の正反射とスキンケア油分で肌の透明感を底上げする名作10選！",
    isHallOfFame: true,
    coverImage: glowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/glow.jpg",
    recommendedItemCodes: glowArticles.map(a => a.id),
    contentMarkdown: glowContent
  },
  {
    id: "feat-winter-hydrating-scalp-lotion-serum-relief-2026",
    slug: "winter-hydrating-scalp-lotion-serum-relief-2026",
    title: "【2026冬・暖房乾燥と冷えによるフケ・かゆみ・つっぱりを根本鎮静】高保湿スカルプローション＆頭皮用保湿エッセンスおすすめ人気10選！真冬の乾く頭皮をしっとり潤す美髪土台ケア決定版",
    subtitle: "11〜12月の急激な気温低下とエアコン暖房の直撃で起こる「黒い服に落ちるパラパラ白い乾性フケ」「夕方からの耐えられない頭皮のかゆみ」「つっぱり・赤み」を根本鎮静！キュレル（セラミド直塗りローション）、ミルボン（オージュア モイストカーム）、アヴェダ（植物バイオセラム）、ヴェレダ（伝統ハーブトニック）、ラ・カスタ、ルベル、資生堂アデノバイタル、スカルプDボーテ、オルビス、モロッカンオイルなど、健やかな美髪の土台を整える名作10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "11〜12月の急激な気温低下とエアコン暖房の直撃で起こる「黒い服に落ちるパラパラ白い乾性フケ」「夕方からの耐えられない頭皮のかゆみ」「つっぱり・赤み」を根本鎮静！キュレル（セラミド直塗りローション）、ミルボン（オージュア モイストカーム）、アヴェダ（植物バイオセラム）、ヴェレダ（伝統ハーブトニック）、ラ・カスタ、ルベル、資生堂アデノバイタル、スカルプDボーテ、オルビス、モロッカンオイルなど、健やかな美髪の土台を整える名作10選！",
    isHallOfFame: true,
    coverImage: scalpItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scalp.jpg",
    recommendedItemCodes: scalpArticles.map(a => a.id),
    contentMarkdown: scalpContent
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
