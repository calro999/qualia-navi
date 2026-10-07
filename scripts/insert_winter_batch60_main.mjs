import fs from 'fs';
import path from 'path';
import {
  waterItemsRaw,
  hairItemsRaw,
  nailItemsRaw,
  waterArticles,
  hairArticles,
  nailArticles
} from './insert_winter_batch60_helper.mjs';

import { getWaterPeelingArticleContent } from './winter_batch60_article1_water_peeling.mjs';
import { getHairFoundationArticleContent } from './winter_batch60_article2_hair_foundation.mjs';
import { getNailMachineArticleContent } from './winter_batch60_article3_electric_nail_machine.mjs';

console.log('🚀 [冬コスメ 第60弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const waterContent = getWaterPeelingArticleContent();
const hairContent = getHairFoundationArticleContent();
const nailContent = getNailMachineArticleContent();

console.log(`- 記事1 (超音波ウォーターピーリング美顔器) 文字数: 約${waterContent.length}文字`);
console.log(`- 記事2 (生え際カバー＆白髪隠しヘアファンデーション) 文字数: 約${hairContent.length}文字`);
console.log(`- 記事3 (電動ネイルマシン＆本格爪ケア) 文字数: 約${nailContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (waterContent.length < 5000 || hairContent.length < 5000 || nailContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-water-peeling-ultrasonic-pore-cleanser-2026",
    slug: "winter-water-peeling-ultrasonic-pore-cleanser-2026",
    title: "【2026冬・寒さで固まる毛穴黒ずみ＆暖房ゴワつき肌を秒速クリア】超音波ウォーターピーリング美顔器おすすめ人気10選！ANLAN・ヤーマン・美ルル・コイズミなど毎秒数万回振動×温感イオン導出入で冬の角栓・ファンデ毛穴落ちを吹き飛ばしシルク素肌へ導く神ギア徹底比較",
    subtitle: "冬の冷気でカチカチに硬化した毛穴の角栓やファンデの毛穴落ちを水と超音波の微細ミストで負担なく吹き飛ばす！ANLAN、ヤーマン、コスビューティー、美ルル、コイズミなど、温感イオン導入＆EMSリフトまで備えた冬の神美顔器10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "冬の冷気でカチカチに硬化した毛穴の角栓やファンデの毛穴落ちを水と超音波の微細ミストで負担なく吹き飛ばす！ANLAN、ヤーマン、コスビューティー、美ルル、コイズミなど、温感イオン導入＆EMSリフトまで備えた冬の神美顔器10選！",
    isHallOfFame: true,
    coverImage: waterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/water.jpg",
    recommendedItemCodes: waterArticles.map(a => a.id),
    contentMarkdown: waterContent
  },
  {
    id: "feat-winter-hair-foundation-hair-powder-gray-cover-2026",
    slug: "winter-hair-foundation-hair-powder-gray-cover-2026",
    title: "【2026冬・忘年会＆ホリデー前に美容院へ行けない緊急事態を救う】白髪隠しヘアファンデーション＆生え際カバー・ポンポンヘアパウダーおすすめ人気10選！フジコ・プリオール・利尻・SMHなど分け目の薄毛・地肌透け・白髪を秒速カバーし小顔シェーディングまで叶える神ヘアコスメ徹底比較",
    subtitle: "年末の美容室予約が取れない時期の救世主！人と会うイベント前にサッとポンポン叩くだけで分け目の白髪や頭皮の透けを自然にカバー。フジコdekoシャドウ、資生堂プリオール、利尻、スーパーミリオンヘアー、アデランスなど小顔効果も叶える人気ヘアファンデ10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "年末の美容室予約が取れない時期の救世主！人と会うイベント前にサッとポンポン叩くだけで分け目の白髪や頭皮の透けを自然にカバー。フジコdekoシャドウ、資生堂プリオール、利尻、スーパーミリオンヘアー、アデランスなど小顔効果も叶える人気ヘアファンデ10選！",
    isHallOfFame: true,
    coverImage: hairItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair.jpg",
    recommendedItemCodes: hairArticles.map(a => a.id),
    contentMarkdown: hairContent
  },
  {
    id: "feat-winter-electric-nail-machine-drill-buffer-care-2026",
    slug: "winter-electric-nail-machine-drill-buffer-care-2026",
    title: "【2026冬・爪先の乾燥割れ＆二枚爪・セルフジェルオフを自宅でプロ級ケア】電動ネイルマシン＆本格セルフネイルケア・爪磨きキットおすすめ人気10選！プチトル・パナソニック・フェスティノ・LilyNaなど正逆回転×無段階スピード調整で甘皮処理・ガラス級素爪ツヤ出し・時短ジェルオフ徹底比較",
    subtitle: "冬の乾燥による二枚爪・爪割れ・ささくれの集中ケアからサロン激戦期のセルフジェルオフまで自宅で時短完結！プチトルシリーズ、パナソニック、フェスティノ、LilyNaなど、削りすぎを防ぎながらガラスのような素爪の輝きと美しい指先を育てる電動ネイルマシン10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "冬の乾燥による二枚爪・爪割れ・ささくれの集中ケアからサロン激戦期のセルフジェルオフまで自宅で時短完結！プチトルシリーズ、パナソニック、フェスティノ、LilyNaなど、削りすぎを防ぎながらガラスのような素爪の輝きと美しい指先を育てる電動ネイルマシン10選！",
    isHallOfFame: true,
    coverImage: nailItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/nail.jpg",
    recommendedItemCodes: nailArticles.map(a => a.id),
    contentMarkdown: nailContent
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

console.log(`🎉 第60弾 特集記事3件＆個別商品記事30件の統合が完了しました！`);
