import fs from 'fs';
import path from 'path';
import {
  bubbleItemsRaw,
  proteoItemsRaw,
  glutaItemsRaw,
  bubbleArticles,
  proteoArticles,
  glutaArticles
} from './insert_winter_batch54_helper.mjs';

import { getBubbleShowerArticleContent } from './winter_batch54_article1_bubble_shower.mjs';
import { getProteoglycanArticleContent } from './winter_batch54_article2_proteoglycan.mjs';
import { getGlutathioneArticleContent } from './winter_batch54_article3_glutathione.mjs';

console.log('🚀 [冬コスメ 第54弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const bubbleContent = getBubbleShowerArticleContent();
const proteoContent = getProteoglycanArticleContent();
const glutaContent = getGlutathioneArticleContent();

console.log(`- 記事1 (シャワーヘッド) 文字数: 約${bubbleContent.length}文字`);
console.log(`- 記事2 (プロテオグリカン) 文字数: 約${proteoContent.length}文字`);
console.log(`- 記事3 (白玉グルタチオン) 文字数: 約${glutaContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (bubbleContent.length < 5000 || proteoContent.length < 5000 || glutaContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-ultra-fine-bubble-shower-head-beauty-2026",
    slug: "winter-ultra-fine-bubble-shower-head-beauty-2026",
    title: "【2026冬・全身の乾燥粉吹き＆頭皮毛穴の冷え固まりを根本解消】ウルトラファインバブル＆マイクロナノバブル美肌シャワーヘッドおすすめ人気10選！ReFa・MYTREX・ボリーナなど浴びる美容液・温浴シルキーバスで極上美肌＆美髪を叶える神アイテム徹底比較",
    subtitle: "冬の熱いシャワーによる乾燥バリア破壊を阻止！ReFaファインバブルピュア、MYTREX HIHO FINE BUBBLE+、ボリーナアヴァンティ、サロニアなど、浴びるだけで水分量アップ＆湯冷め防止の最新美肌シャワーヘッド10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "冬の熱いシャワーによる乾燥バリア破壊を阻止！ReFaファインバブルピュア、MYTREX HIHO FINE BUBBLE+、ボリーナアヴァンティ、サロニアなど、浴びるだけで水分量アップ＆湯冷め防止の最新美肌シャワーヘッド10選！",
    isHallOfFame: true,
    coverImage: bubbleItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bubble.jpg",
    recommendedItemCodes: bubbleArticles.map(a => a.id),
    contentMarkdown: bubbleContent
  },
  {
    id: "feat-winter-proteoglycan-serum-deep-hydration-firming-2026",
    slug: "winter-proteoglycan-serum-deep-hydration-firming-2026",
    title: "【2026冬・暖房砂漠のしぼみ肌＆乾燥小じわ・ほうれい線を押し返す】高純度プロテオグリカン原液＆保水ハリ集中エイジングケア美容液おすすめ人気10選！ヒアルロン酸を超える驚異の保水力×EGF様作用で冬のふっくら水光肌を叶える奇跡の原液コスメ徹底比較",
    subtitle: "ヒアルロン酸の約1.3倍の保水力とEGF様作用で暖房砂漠肌を救う！フラコラ、ナチュドール、雪華ひとひら、トゥヴェール、プロセラ原液など、かつて1g3000万円と呼ばれた奇跡の保水原液10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 28,
    introText: "ヒアルロン酸の約1.3倍の保水力とEGF様作用で暖房砂漠肌を救う！フラコラ、ナチュドール、雪華ひとひら、トゥヴェール、プロセラ原液など、かつて1g3000万円と呼ばれた奇跡の保水原液10選！",
    isHallOfFame: true,
    coverImage: proteoItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/proteo.jpg",
    recommendedItemCodes: proteoArticles.map(a => a.id),
    contentMarkdown: proteoContent
  },
  {
    id: "feat-winter-glutathione-shiratama-brightening-serum-2026",
    slug: "winter-glutathione-shiratama-brightening-serum-2026",
    title: "【2026冬・夏の居座りくすみ＆冬の濁り肌を一掃する白玉発光ケア】白玉グルタチオン美容液＆濃密ブライトニングアンプルおすすめ人気10選！美容医療の白玉点滴発想×ビタミンC・ナイアシンアミドで真冬の陶器ツヤ肌を叶える神セラム徹底比較",
    subtitle: "冬特有の寒冷血行不良とメラニン沈着による『冬ぐすみ』を打破！ナンバーズイン5番、メディキューブ、Anua、魔女工場、ダルバ、COSRXなど、黒色メラニンを明るいトーンへシフトさせる白玉美白アンプル10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 28,
    introText: "冬特有の寒冷血行不良とメラニン沈着による『冬ぐすみ』を打破！ナンバーズイン5番、メディキューブ、Anua、魔女工場、ダルバ、COSRXなど、黒色メラニンを明るいトーンへシフトさせる白玉美白アンプル10選！",
    isHallOfFame: true,
    coverImage: glutaItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/gluta.jpg",
    recommendedItemCodes: glutaArticles.map(a => a.id),
    contentMarkdown: glutaContent
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
