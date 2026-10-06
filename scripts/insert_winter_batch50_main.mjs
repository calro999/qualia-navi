import fs from 'fs';
import path from 'path';
import {
  bodyItemsRaw,
  powderItemsRaw,
  hairItemsRaw,
  bodyArticles,
  powderArticles,
  hairArticles
} from './insert_winter_batch50_helper.mjs';

import { getBodyArticleContent } from './winter_batch50_article1_body.mjs';
import { getPowderArticleContent } from './winter_batch50_article2_powder.mjs';
import { getHairArticleContent } from './winter_batch50_article3_hair.mjs';

console.log('🚀 [冬コスメ 第50弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const bodyContent = getBodyArticleContent();
const powderContent = getPowderArticleContent();
const hairContent = getHairArticleContent();

console.log(`- 記事1 (高保湿ボディミルク＆濃厚ボディバター) 文字数: 約${bodyContent.length}文字`);
console.log(`- 記事2 (高保湿フェイスパウダー＆美容液ルースパウダー) 文字数: 約${powderContent.length}文字`);
console.log(`- 記事3 (高保湿ヘアオイル＆アウトバスヘアミルク) 文字数: 約${hairContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (bodyContent.length < 5000 || powderContent.length < 5000 || hairContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-body-cream-butter-heel-repair-balm-2026",
    slug: "winter-body-cream-butter-heel-repair-balm-2026",
    title: "【2026冬・粉ふき乾燥ボディ＆ひび割れかかとを即効レスキュー】高保湿ボディミルク＆濃厚ボディバター・パーツ集中リペアバームおすすめ人気10選！ニット・タイツの摩擦や粉吹きをゼロにする冬の全身極上保湿ケア徹底比較",
    subtitle: "タイツの摩擦で白く粉をふくすね、鏡餅のように硬化したかかとを徹底レスキュー！ロクシタン、ザ・ボディショップ、SABON、ニュートロジーナ、ユースキン、越冬クリームなど、真冬の全身を潤いシールドで満たす神ボディケア10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "タイツの摩擦で白く粉をふくすね、鏡餅のように硬化したかかとを徹底レスキュー！ロクシタン、ザ・ボディショップ、SABON、ニュートロジーナ、ユースキン、越冬クリームなど、真冬の全身を潤いシールドで満たす神ボディケア10選！",
    isHallOfFame: true,
    coverImage: bodyItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/body.jpg",
    recommendedItemCodes: bodyArticles.map(a => a.id),
    contentMarkdown: bodyContent
  },
  {
    id: "feat-winter-hydrating-setting-loose-face-powder-2026",
    slug: "winter-hydrating-setting-loose-face-powder-2026",
    title: "【2026冬・暖房乾燥でも粉浮きゼロ＆極上シルク肌】高保湿フェイスパウダー＆しっとり美容液ルースパウダーおすすめ人気10選！ちりめんジワ・毛穴落ちを防ぎ一日中透明感を宿す冬の乾燥知らず名品徹底比較",
    subtitle: "暖房砂漠のオフィスでも粉割れ・ちりめんジワ・毛穴落ち知らず！コスメデコルテ、ジバンシイ、エレガンス ラ プードル、NARSリフ粉、SUQQU、ミラノコレクションなど、しっとり美容液コーティングで極上の生ツヤと透明感をキープする名品10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "暖房砂漠のオフィスでも粉割れ・ちりめんジワ・毛穴落ち知らず！コスメデコルテ、ジバンシイ、エレガンス ラ プードル、NARSリフ粉、SUQQU、ミラノコレクションなど、しっとり美容液コーティングで極上の生ツヤと透明感をキープする名品10選！",
    isHallOfFame: true,
    coverImage: powderItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/powder.jpg",
    recommendedItemCodes: powderArticles.map(a => a.id),
    contentMarkdown: powderContent
  },
  {
    id: "feat-winter-hair-oil-milk-anti-static-leave-in-treatment-2026",
    slug: "winter-hair-oil-milk-anti-static-leave-in-treatment-2026",
    title: "【2026冬・ニット静電気＆マフラー擦れのパサつき毛先を密着補修】高保湿ヘアオイル＆濃密アウトバスヘアミルクおすすめ人気10選！冬のパサつき・広がり・熱ダメージをリセットし天使の輪を宿す美髪ケア徹底比較",
    subtitle: "マフラー脱着時のパチパチ静電気、ニットの摩擦による毛先の広がり・パサつきを根本ブロック！オルビスヘアミルク、モロッカンオイル、ミルボンエルジューダ、ReFaロックオイル、track No.3など、内部補修と外部シールドで冬の天使の輪を宿す美髪名品10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "マフラー脱着時のパチパチ静電気、ニットの摩擦による毛先の広がり・パサつきを根本ブロック！オルビスヘアミルク、モロッカンオイル、ミルボンエルジューダ、ReFaロックオイル、track No.3など、内部補修と外部シールドで冬の天使の輪を宿す美髪名品10選！",
    isHallOfFame: true,
    coverImage: hairItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair.jpg",
    recommendedItemCodes: hairArticles.map(a => a.id),
    contentMarkdown: hairContent
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

console.log('🎉 第50弾の全記事統合処理が正常に完了しました！');
