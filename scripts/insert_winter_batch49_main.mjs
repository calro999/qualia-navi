import fs from 'fs';
import path from 'path';
import {
  innerItemsRaw,
  clayItemsRaw,
  scalpItemsRaw,
  innerArticles,
  clayArticles,
  scalpArticles
} from './insert_winter_batch49_helper.mjs';

import { getInnerArticleContent } from './winter_batch49_article1_inner.mjs';
import { getClayArticleContent } from './winter_batch49_article2_clay.mjs';
import { getScalpArticleContent } from './winter_batch49_article3_scalp.mjs';

console.log('🚀 [冬コスメ 第49弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const innerContent = getInnerArticleContent();
const clayContent = getClayArticleContent();
const scalpContent = getScalpArticleContent();

console.log(`- 記事1 (飲む高濃度セラミド＆コラーゲン) 文字数: 約${innerContent.length}文字`);
console.log(`- 記事2 (高保湿温感クレイ＆泥ミネラルパック) 文字数: 約${clayContent.length}文字`);
console.log(`- 記事3 (頭皮ソルトスクラブ＆ヘッドスパ) 文字数: 約${scalpContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (innerContent.length < 5000 || clayContent.length < 5000 || scalpContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-inner-beauty-ceramide-collagen-drink-supplement-2026",
    slug: "winter-inner-beauty-ceramide-collagen-drink-supplement-2026",
    title: "【2026冬・外側ケアが効かない超乾燥＆疲れ肌に】飲む高濃度セラミド＆飲むコラーゲン・美容インナードリンク＆サプリおすすめ人気10選！内側から水分を逃さない冬の集中インナーケア徹底比較",
    subtitle: "冬の暖房砂漠と寒さで外側からのスキンケアが限界を迎えた肌に！オルビスディフェンセラ、資生堂ザ・コラーゲン、チョコラBBリッチセラミド、アスタリフト、POLA B.A、リポスフェリックなど、全身の水分保持を底上げする神インナーケア10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "冬の暖房砂漠と寒さで外側からのスキンケアが限界を迎えた肌に！オルビスディフェンセラ、資生堂ザ・コラーゲン、チョコラBBリッチセラミド、アスタリフト、POLA B.A、リポスフェリックなど、全身の水分保持を底上げする神インナーケア10選！",
    isHallOfFame: true,
    coverImage: innerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/inner.jpg",
    recommendedItemCodes: innerArticles.map(a => a.id),
    contentMarkdown: innerContent
  },
  {
    id: "feat-winter-hydrating-clay-mask-pore-purifying-pack-2026",
    slug: "winter-hydrating-clay-mask-pore-purifying-pack-2026",
    title: "【2026冬・寒さで固まった毛穴の黒ずみ＆ゴワつき角質を大掃除】高保湿温感クレイマスク＆泥ミネラルパックおすすめ人気10選！年末の肌リセット・つっぱり感ゼロの透明感毛穴ケア徹底比較",
    subtitle: "寒さで固まった皮脂角栓とゴワつき角質を優しく大掃除！KANEBOスクラビングマッドウォッシュ、アルジタル、イニスフリー、コスメデコルテ、ソフィーナiP、ファンケルなど、つっぱり感ゼロで陶器肌へ導く冬の濃密泥パック10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "寒さで固まった皮脂角栓とゴワつき角質を優しく大掃除！KANEBOスクラビングマッドウォッシュ、アルジタル、イニスフリー、コスメデコルテ、ソフィーナiP、ファンケルなど、つっぱり感ゼロで陶器肌へ導く冬の濃密泥パック10選！",
    isHallOfFame: true,
    coverImage: clayItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/clay.jpg",
    recommendedItemCodes: clayArticles.map(a => a.id),
    contentMarkdown: clayContent
  },
  {
    id: "feat-winter-head-spa-scalp-scrub-salt-cleansing-2026",
    slug: "winter-head-spa-scalp-scrub-salt-cleansing-2026",
    title: "【2026冬・暖房頭皮の乾燥フケ＆ニオイ・血行不良を大掃除】極上スカルプソルトスクラブ＆濃密ヘッドスパクレンジングおすすめ人気10選！サロン帰り級の根元ふんわり美髪・年末ご褒美ケア徹底比較",
    subtitle: "暖房による乾燥フケ・かゆみ・夕方の頭皮臭を根本からクリアに！SABONヘッドスクラブ、ダヴィネス、ミルボンプラーミア、ヴェレダ、cocone、ukaなど、サロン帰り級の根元ふんわり美髪へ導く冬の頭皮大掃除＆ご褒美ヘッドスパ10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "暖房による乾燥フケ・かゆみ・夕方の頭皮臭を根本からクリアに！SABONヘッドスクラブ、ダヴィネス、ミルボンプラーミア、ヴェレダ、cocone、ukaなど、サロン帰り級の根元ふんわり美髪へ導く冬の頭皮大掃除＆ご褒美ヘッドスパ10選！",
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
  console.log(`✅ src/data.ts に 3 つの新規冬特集記事を登録しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 第49弾の全記事統合処理が正常に完了しました！');
