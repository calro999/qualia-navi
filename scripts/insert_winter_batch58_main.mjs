import fs from 'fs';
import path from 'path';
import {
  carbonicItemsRaw,
  cordlessItemsRaw,
  yomogiItemsRaw,
  carbonicArticles,
  cordlessArticles,
  yomogiArticles
} from './insert_winter_batch58_helper.mjs';

import { getCarbonicPackArticleContent } from './winter_batch58_article1_carbonic_pack.mjs';
import { getCordlessIronArticleContent } from './winter_batch58_article2_cordless_iron.mjs';
import { getYomogiWarmPadArticleContent } from './winter_batch58_article3_yomogi_warm_pad.mjs';

console.log('🚀 [冬コスメ 第58弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const carbonicContent = getCarbonicPackArticleContent();
const cordlessContent = getCordlessIronArticleContent();
const yomogiContent = getYomogiWarmPadArticleContent();

console.log(`- 記事1 (生炭酸ガスパック) 文字数: 約${carbonicContent.length}文字`);
console.log(`- 記事2 (コードレスヘアアイロン) 文字数: 約${cordlessContent.length}文字`);
console.log(`- 記事3 (よもぎ温座パット温活) 文字数: 約${yomogiContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (carbonicContent.length < 5000 || cordlessContent.length < 5000 || yomogiContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-carbonic-acid-gas-gel-pack-mask-2026",
    slug: "winter-carbonic-acid-gas-gel-pack-mask-2026",
    title: "【2026冬・暖房ゴワつき＆寒冷たるみを秒速リセット】高濃度生炭酸ガスパック＆ジェル炭酸フェイスパックおすすめ人気10選！エニシーグローパック・EKATO・メディプローラー・フェヴリナなどボーア効果で血流促進＆サロン帰りの水光透明肌へ導く傑作おこもりケア徹底比較",
    subtitle: "寒冷による血流低下と暖房の乾燥ゴワつきを医療発想のボーア効果で劇的リセット！エニシーグローパック、EKATO、メディプローラー、フェヴリナ、ソーダスパフォームなど、自宅でサロン帰りの水光ツヤ肌を叶える高濃度生炭酸ガスパック10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "寒冷による血流低下と暖房の乾燥ゴワつきを医療発想のボーア効果で劇的リセット！エニシーグローパック、EKATO、メディプローラー、フェヴリナ、ソーダスパフォームなど、自宅でサロン帰りの水光ツヤ肌を叶える高濃度生炭酸ガスパック10選！",
    isHallOfFame: true,
    coverImage: carbonicItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/carbonic.jpg",
    recommendedItemCodes: carbonicArticles.map(a => a.id),
    contentMarkdown: carbonicContent
  },
  {
    id: "feat-winter-cordless-mini-hair-iron-straightener-2026",
    slug: "winter-cordless-mini-hair-iron-straightener-2026",
    title: "【2026冬・忘年会＆ホリデーデートの外出先で即お直し】コードレスミニヘアアイロン＆充電式ストレート・カールアイロンおすすめ人気10選！リファ フィンガーアイロン・絹女・サロニア・モッズヘアなど冬の強風＆マフラー静電気で崩れた前髪を外出先でサッと直す神ギア徹底比較",
    subtitle: "冬の木枯らし強風・マフラー静電気・寒暖差結露で崩れた前髪をパウダールームで秒速リカバリー！ReFaフィンガーアイロン、SALONIA、モッズ・ヘア、コイズミなど、バッグに忍ばせて外出先でもサロン帰りの束感ツヤ髪を復元する神コードレスヘアアイロン10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "冬の木枯らし強風・マフラー静電気・寒暖差結露で崩れた前髪をパウダールームで秒速リカバリー！ReFaフィンガーアイロン、SALONIA、モッズ・ヘア、コイズミなど、バッグに忍ばせて外出先でもサロン帰りの束感ツヤ髪を復元する神コードレスヘアアイロン10選！",
    isHallOfFame: true,
    coverImage: cordlessItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/iron.jpg",
    recommendedItemCodes: cordlessArticles.map(a => a.id),
    contentMarkdown: cordlessContent
  },
  {
    id: "feat-winter-yomogi-warm-pad-femcare-heating-seat-2026",
    slug: "winter-yomogi-warm-pad-femcare-heating-seat-2026",
    title: "【2026冬・真冬の底冷え＆下半身の冷え固まりを芯から撃退】よもぎ温座パット＆温活フェムケア・オーガニック温熱シートおすすめ人気10選！優月美人・よもぎ蒸し発想・骨盤温め・巡り改善でくすみ知らずの血色美肌と至福の温もりを叶える冬の必須温活徹底比較",
    subtitle: "真冬の氷のような底冷えや骨盤の血行停滞を骨盤底からポカポカ温める！グラフィコ優月美人、ダナミよもぎ蒸しパッド、桐灰命の母、めぐりズム、あずきのチカラ、シルク腹巻きなど、内臓から温めて顔のくすみまで一掃する至福の温活フェムケア10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "真冬の氷のような底冷えや骨盤の血行停滞を骨盤底からポカポカ温める！グラフィコ優月美人、ダナミよもぎ蒸しパッド、桐灰命の母、めぐりズム、あずきのチカラ、シルク腹巻きなど、内臓から温めて顔のくすみまで一掃する至福の温活フェムケア10選！",
    isHallOfFame: true,
    coverImage: yomogiItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/yomogi.jpg",
    recommendedItemCodes: yomogiArticles.map(a => a.id),
    contentMarkdown: yomogiContent
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

console.log(`🎉 第58弾 特集記事3件＆個別商品記事30件の統合が完了しました！`);
