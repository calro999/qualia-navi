import fs from 'fs';
import path from 'path';
import {
  hotCleansingItemsRaw,
  scalpLotionItemsRaw,
  highlighterItemsRaw,
  hotCleansingArticles,
  scalpLotionArticles,
  highlighterArticles
} from './insert_winter_batch70_helper.mjs';

import { getHotCleansingArticleContent } from './winter_batch70_article1_hot_cleansing.mjs';
import { getScalpLotionArticleContent } from './winter_batch70_article2_scalp_lotion.mjs';
import { getHighlighterArticleContent } from './winter_batch70_article3_highlighter_balm.mjs';

console.log('🚀 [冬コスメ 第70弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const hotCleansingContent = getHotCleansingArticleContent();
const scalpLotionContent = getScalpLotionArticleContent();
const highlighterContent = getHighlighterArticleContent();

console.log(`- 記事1 (温感クレンジングバーム) 文字数: 約${hotCleansingContent.length}文字`);
console.log(`- 記事2 (薬用スカルプ保湿ローション) 文字数: 約${scalpLotionContent.length}文字`);
console.log(`- 記事3 (生ツヤハイライトスティック＆バーム) 文字数: 約${highlighterContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (hotCleansingContent.length < 5000 || scalpLotionContent.length < 5000 || highlighterContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-melting-hot-cleansing-balm-pore-care-2026",
    slug: "winter-melting-hot-cleansing-balm-pore-care-2026",
    title: "【2026冬・頑固な毛穴詰まり＆冷え固まり皮脂をとろかす】極上とろける温感クレンジングバーム＆生ホットバームおすすめ人気10選！DUO・マナラ・ラフラ徹底比較！42℃温感×濃厚とろけるオイルで冬の角栓黒ずみ・ゴワつきを一掃＆W洗顔不要で潤い死守する神クレンジング",
    subtitle: "11〜12月の寒さで冷え固まった頑固な皮脂と毛穴汚れを42℃の温感スチーム効果でとろかし、美容オイルの潤いで満たしながらW洗顔不要で落とし切る極上ホットバーム10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の寒さで冷え固まった頑固な皮脂と毛穴汚れを42℃の温感スチーム効果でとろかし、美容オイルの潤いで満たしながらW洗顔不要で落とし切る極上ホットバーム10選！",
    isHallOfFame: true,
    coverImage: hotCleansingItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/duohot.jpg",
    recommendedItemCodes: hotCleansingArticles.map(a => a.id),
    contentMarkdown: hotCleansingContent
  },
  {
    id: "feat-winter-medicinal-scalp-moisture-lotion-ceramide-2026",
    slug: "winter-medicinal-scalp-moisture-lotion-ceramide-2026",
    title: "【2026冬・暖房乾燥フケ＆かゆみを根本解決】薬用スカルプ保湿ローション＆頭皮用セラミド美容液おすすめ人気10選！キュレル・スカルプDボーテ・オージュア徹底比較！エアコン直撃の粉ふき地肌・赤み・つっぱり感を瞬時に鎮静＆根元ふんわり美髪を育む冬の地肌レスキュー",
    subtitle: "11〜12月の暖房直撃と外気乾燥による頭皮の粉ふきフケ・かゆみ・赤み・つっぱり感を瞬時に鎮め、うるおいバリアを再構築する薬用高保湿スカルプローション10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の暖房直撃と外気乾燥による頭皮の粉ふきフケ・かゆみ・赤み・つっぱり感を瞬時に鎮め、うるおいバリアを再構築する薬用高保湿スカルプローション10選！",
    isHallOfFame: true,
    coverImage: scalpLotionItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/curelscalp.jpg",
    recommendedItemCodes: scalpLotionArticles.map(a => a.id),
    contentMarkdown: scalpLotionContent
  },
  {
    id: "feat-winter-dewy-glow-highlighter-stick-balm-radiance-2026",
    slug: "winter-dewy-glow-highlighter-stick-balm-radiance-2026",
    title: "【2026冬・イルミネーション映え濡れツヤ肌】生ツヤ発光ハイライトスティック＆マルチグロウバームおすすめ人気10選！シャネル・hince・ディオール徹底比較！冬の暖房乾燥でも粉吹き・小じわ割れゼロ！4K級水光肌×立体小顔を叶えるホリデー神コスメ",
    subtitle: "11〜12月の澄んだ空気や夜のイルミネーションに映える、粉吹き知らずのジュワッと濡れツヤ発光を叶える最新ハイライトスティック＆マルチバーム10選！",
    targetGender: "unisex",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi ベースメイクコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の澄んだ空気や夜のイルミネーションに映える、粉吹き知らずのジュワッと濡れツヤ発光を叶える最新ハイライトスティック＆マルチバーム10選！",
    isHallOfFame: true,
    coverImage: highlighterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/chanelglow.jpg",
    recommendedItemCodes: highlighterArticles.map(a => a.id),
    contentMarkdown: highlighterContent
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
  console.log('✅ src/data.ts に第70弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
