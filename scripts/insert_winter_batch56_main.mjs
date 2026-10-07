import fs from 'fs';
import path from 'path';
import {
  candleItemsRaw,
  sakeRiceItemsRaw,
  eyeDeviceItemsRaw,
  candleArticles,
  sakeRiceArticles,
  eyeDeviceArticles
} from './insert_winter_batch56_helper.mjs';

import { getCandleDiffuserArticleContent } from './winter_batch56_article1_candle_diffuser.mjs';
import { getSakeRiceArticleContent } from './winter_batch56_article2_sake_rice_ferment.mjs';
import { getEyeDeviceArticleContent } from './winter_batch56_article3_eye_device.mjs';

console.log('🚀 [冬コスメ 第56弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const candleContent = getCandleDiffuserArticleContent();
const sakeRiceContent = getSakeRiceArticleContent();
const eyeDeviceContent = getEyeDeviceArticleContent();

console.log(`- 記事1 (キャンドル＆ディフューザー) 文字数: 約${candleContent.length}文字`);
console.log(`- 記事2 (酒粕＆コメ発酵) 文字数: 約${sakeRiceContent.length}文字`);
console.log(`- 記事3 (目元美顔器) 文字数: 約${eyeDeviceContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (candleContent.length < 5000 || sakeRiceContent.length < 5000 || eyeDeviceContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-candle-diffuser-room-fragrance-2026",
    slug: "winter-holiday-candle-diffuser-room-fragrance-2026",
    title: "【2026冬・ホリデー限定＆おうち時間を至高の癒やし空間に変える】フレグランスキャンドル＆リードディフューザーおすすめ人気10選！ディプティック・ジョーマローン・メゾンマルジェラ・SHIRO・BAUMなど極上の香りと温もりで美肌睡眠と自律神経を整えるルームフレグランス徹底比較",
    subtitle: "寒さで強張る冬の夜を至福の空間へ！diptyqueベ、ジョーマローンイングリッシュペアー、レプリカレイジーサンデーモーニング、SHIROサボンなど、極上の香りと炎の1/fゆらぎで自律神経を整え美肌睡眠を叶える冬のルームフレグランス10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "寒さで強張る冬の夜を至福の空間へ！diptyqueベ、ジョーマローンイングリッシュペアー、レプリカレイジーサンデーモーニング、SHIROサボンなど、極上の香りと炎の1/fゆらぎで自律神経を整え美肌睡眠を叶える冬のルームフレグランス10選！",
    isHallOfFame: true,
    coverImage: candleItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/candle.jpg",
    recommendedItemCodes: candleArticles.map(a => a.id),
    contentMarkdown: candleContent
  },
  {
    id: "feat-winter-sake-lees-rice-ferment-brightening-skincare-2026",
    slug: "winter-sake-lees-rice-ferment-brightening-skincare-2026",
    title: "【2026冬・杜氏の白く透き通る手肌に学ぶ発酵美容の極致】酒粕パック＆和漢コメ発酵白玉スキンケアおすすめ人気10選！ワフードメイド・米肌・ライスフォース・菊正宗など真冬の頑固なゴワつき・くすみ・乾燥砂漠肌をもっちり陶器肌へ導く日本伝統の神コスメ徹底比較",
    subtitle: "新酒仕込み最盛期の11〜12月、杜氏の白肌の秘密を解き明かす！ワフードメイド酒粕パック、米肌、ライスフォース、菊正宗日本酒の美容液、福光屋酒風呂など、コウジ酸×天然アミノ酸×ライスパワーNo.11で真冬の陶器白玉肌を育てる和漢発酵コスメ10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "新酒仕込み最盛期の11〜12月、杜氏の白肌の秘密を解き明かす！ワフードメイド酒粕パック、米肌、ライスフォース、菊正宗日本酒の美容液、福光屋酒風呂など、コウジ酸×天然アミノ酸×ライスパワーNo.11で真冬の陶器白玉肌を育てる和漢発酵コスメ10選！",
    isHallOfFame: true,
    coverImage: sakeRiceItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/sake.jpg",
    recommendedItemCodes: sakeRiceArticles.map(a => a.id),
    contentMarkdown: sakeRiceContent
  },
  {
    id: "feat-winter-eye-massager-ems-rf-lift-device-2026",
    slug: "winter-eye-massager-ems-rf-lift-device-2026",
    title: "【2026冬・年末の酷使目元＆寒冷青グマ・目尻のちりめんジワを集中レスキュー】温感RF×EMS目元美顔器＆アイリフトマッサージャーおすすめ人気10選！ヤーマンメディリフトアイ・パナソニック目もとエステ・ANLAN・NIPLUXなど眼輪筋深層トレーニングと温熱血流促進でパッチリ若見えを叶える神ギア徹底比較",
    subtitle: "年末のPC酷使と寒冷血行不良で重症化する青グマ＆たるみ目を覚醒！ヤーマンメディリフトアイ、パナソニック目もとエステ、ANLAN温感RF、NIPLUXアイリラックスなど、眼輪筋深層トレーニングと速暖温熱でパッチリ明るい若見え目元を叶える目元美顔器10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "年末のPC酷使と寒冷血行不良で重症化する青グマ＆たるみ目を覚醒！ヤーマンメディリフトアイ、パナソニック目もとエステ、ANLAN温感RF、NIPLUXアイリラックスなど、眼輪筋深層トレーニングと速暖温熱でパッチリ明るい若見え目元を叶える目元美顔器10選！",
    isHallOfFame: true,
    coverImage: eyeDeviceItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eye_device.jpg",
    recommendedItemCodes: eyeDeviceArticles.map(a => a.id),
    contentMarkdown: eyeDeviceContent
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
console.log(`🎉 登録完了！冬特集記事の総数: ${finalCount}件以上`);
