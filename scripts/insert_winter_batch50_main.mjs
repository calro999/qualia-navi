import fs from 'fs';
import path from 'path';
import {
  bodyPeelItemsRaw,
  femItemsRaw,
  hairGrowthItemsRaw,
  bodyPeelArticles,
  femArticles,
  hairGrowthArticles
} from './insert_winter_batch50_helper.mjs';

import { getBodyPeelArticleContent } from './winter_batch50_article1_bodypeel.mjs';
import { getFemCareArticleContent } from './winter_batch50_article2_femcare.mjs';
import { getHairGrowthArticleContent } from './winter_batch50_article3_hairgrowth.mjs';

console.log('🚀 [冬コスメ 第50弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const bodyPeelContent = getBodyPeelArticleContent();
const femCareContent = getFemCareArticleContent();
const hairGrowthContent = getHairGrowthArticleContent();

console.log(`- 記事1 (ボディ角質ケア・二の腕・ひじひざ) 文字数: 約${bodyPeelContent.length}文字`);
console.log(`- 記事2 (冬の高保湿フェムケア・デリケートゾーン) 文字数: 約${femCareContent.length}文字`);
console.log(`- 記事3 (女性用薬用育毛美容液・スカルプエッセンス) 文字数: 約${hairGrowthContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (bodyPeelContent.length < 5000 || femCareContent.length < 5000 || hairGrowthContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-rough-skin-keratosis-body-peeling-lotion-2026",
    slug: "winter-rough-skin-keratosis-body-peeling-lotion-2026",
    title: "【2026冬・二の腕のザラつき＆ひじ・ひざのガサガサ黒ずみを滑らかに一掃】高保湿PHA/AHAボディピーリング美容液＆角質柔軟ミルク・スクラブおすすめ人気10選！冬の摩擦・乾燥によるサメ肌＆毛穴詰まりを解消する大人のボディ角質ケア徹底比較",
    subtitle: "厚手ニットやタイツ摩擦で硬化した角質を優しくオフ！タカミスキンピールボディ、ポーラチョイスBHA、SABON、クレンジングリサーチ、ザーネ、キュレルなど、サメ肌・黒ずみをリセットする冬のボディ角質ケア10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "厚手ニットやタイツ摩擦で硬化した角質を優しくオフ！タカミスキンピールボディ、ポーラチョイスBHA、SABON、クレンジングリサーチ、ザーネ、キュレルなど、サメ肌・黒ずみをリセットする冬のボディ角質ケア10選！",
    isHallOfFame: true,
    coverImage: bodyPeelItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/body.jpg",
    recommendedItemCodes: bodyPeelArticles.map(a => a.id),
    contentMarkdown: bodyPeelContent
  },
  {
    id: "feat-winter-feminine-care-delicate-oil-wash-2026",
    slug: "winter-feminine-care-delicate-oil-wash-2026",
    title: "【2026冬・タイツ摩擦＆暖房乾燥のかゆみ・ニオイ・黒ずみを根本リセット】高保湿フェミニンオイル＆低刺激デリケートゾーンソープおすすめ人気10選！皮膚科学発想の弱酸性フェムケア・冬のバリア機能集中保湿徹底比較",
    subtitle: "防寒タイツのムレと暖房過乾燥からデリケートゾーンを守る！iroha、アルジタル、アンティーム、ラフドット、MAPUTI、コラージュフルフルなど、弱酸性泡と濃密オイルで摩擦・痒み・ニオイを防ぐ冬のフェムケア10選！",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "防寒タイツのムレと暖房過乾燥からデリケートゾーンを守る！iroha、アルジタル、アンティーム、ラフドット、MAPUTI、コラージュフルフルなど、弱酸性泡と濃密オイルで摩擦・痒み・ニオイを防ぐ冬のフェムケア10選！",
    isHallOfFame: true,
    coverImage: femItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/fem.jpg",
    recommendedItemCodes: femArticles.map(a => a.id),
    contentMarkdown: femCareContent
  },
  {
    id: "feat-winter-hair-growth-serum-scalp-essence-women-2026",
    slug: "winter-hair-growth-serum-scalp-essence-women-2026",
    title: "【2026冬・秋からの抜け毛ピーク＆分け目のペタンコ髪・地肌の乾燥冷えを救う】女性用薬用育毛美容液＆高機能スカルプエッセンスおすすめ人気10選！トップのふんわり立ち上がりと美髪の土台を育てる大人の頭皮温活エイジングケア徹底比較",
    subtitle: "夏のダメージ蓄積と真冬の血行不良による抜け毛・薄毛を食い止める！資生堂アデノバイタル、スカルプDボーテ、アヴェダ、ケラスターゼ、ポーラ、マイナチュレ、柑気楼など、根元からふんわり弾む美髪を育む大人の薬用育毛美容液10選！",
    targetGender: "women",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "夏のダメージ蓄積と真冬の血行不良による抜け毛・薄毛を食い止める！資生堂アデノバイタル、スカルプDボーテ、アヴェダ、ケラスターゼ、ポーラ、マイナチュレ、柑気楼など、根元からふんわり弾む美髪を育む大人の薬用育毛美容液10選！",
    isHallOfFame: true,
    coverImage: hairGrowthItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair.jpg",
    recommendedItemCodes: hairGrowthArticles.map(a => a.id),
    contentMarkdown: hairGrowthContent
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
