import fs from 'fs';
import path from 'path';
import {
  hairBrushItemsRaw,
  barrierCreamItemsRaw,
  headSpaItemsRaw,
  hairBrushArticles,
  barrierCreamArticles,
  headSpaArticles
} from './insert_winter_batch14_helper.mjs';

import { getHairBrushArticleContent } from './winter_batch14_article1_hairbrush.mjs';
import { getBarrierCreamArticleContent } from './winter_batch14_article2_barriercream.mjs';
import { getHeadSpaArticleContent } from './winter_batch14_article3_headspa.mjs';

console.log('🚀 [冬コスメ 第14弾] 特集記事の生成と data.ts への統合を開始します...');

const hairBrushContent = getHairBrushArticleContent();
const barrierCreamContent = getBarrierCreamArticleContent();
const headSpaContent = getHeadSpaArticleContent();

console.log(`- 記事1 (高級ヘアブラシ) 文字数: 約${hairBrushContent.length}文字`);
console.log(`- 記事2 (リペアバリアクリーム) 文字数: 約${barrierCreamContent.length}文字`);
console.log(`- 記事3 (電動EMSヘッドスパ) 文字数: 約${headSpaContent.length}文字`);

// 3000文字以上であることを厳格に検証
if (hairBrushContent.length < 5000 || barrierCreamContent.length < 5000 || headSpaContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-scalp-hair-brush-paddle-massage-2026",
    slug: "winter-scalp-hair-brush-paddle-massage-2026",
    title: "【2026冬・静電気＆枝毛ゼロの感動サラツヤ美髪へ】高級ヘアブラシ＆頭皮ほぐしパドルブラシおすすめ人気10選！ReFa・AVEDA・ukaなどホリデーギフトにも選ばれる名品を徹底比較",
    subtitle: "乾燥と冷気の厳しい11〜12月は髪の静電気・広がり・頭皮の血行不良が深刻化！ReFa（ハートブラシ＆イオンケア）、AVEDA（名入れパドルブラシ）、uka（ケンザン）、メイソンピアソン（高級猪毛）、ラ・カスタなど、ブラッシングだけで天使の輪を生み出す名品10選を徹底検証。静電気防止メカニズムや頭皮マッサージのツボまで完全網羅！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "乾燥と冷気の厳しい11〜12月は髪の静電気・広がり・頭皮の血行不良が深刻化！ReFa（ハートブラシ＆イオンケア）、AVEDA（名入れパドルブラシ）、uka（ケンザン）、メイソンピアソン（高級猪毛）、ラ・カスタなど、ブラッシングだけで天使の輪を生み出す名品10選を徹底検証。静電気防止メカニズムや頭皮マッサージのツボまで完全網羅！",
    isHallOfFame: true,
    coverImage: hairBrushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hairbrush.jpg",
    recommendedItemCodes: hairBrushArticles.map(a => a.id),
    contentMarkdown: hairBrushContent
  },
  {
    id: "feat-winter-cica-ceramide-barrier-repair-cream-2026",
    slug: "winter-cica-ceramide-barrier-repair-cream-2026",
    title: "【2026冬・寒暖差肌荒れ＆粉ふき赤み肌を徹底鎮静】高保湿CICA＆高濃度セラミド・パンテノール リペアバリアクリームおすすめ人気10選！冷気と暖房の乾燥に負けない皮膚科医注目ダーマコスメ決定版",
    subtitle: "「外の極寒と室内の暖房で顔が赤くヒリヒリ…粉を吹いてファンデが乗らない！」真冬の寒暖差20℃によるバリア機能崩壊を根本レスキュー。AESTURA（アトバリア365）、ラ ロッシュ ポゼ（シカプラスト バーム B5+）、VT、キュレル、BIOHEAL BOHなど、肌の細胞間脂質を疑似再構築する神リペアクリーム10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "「外の極寒と室内の暖房で顔が赤くヒリヒリ…粉を吹いてファンデが乗らない！」真冬の寒暖差20℃によるバリア機能崩壊を根本レスキュー。AESTURA（アトバリア365）、ラ ロッシュ ポゼ（シカプラスト バーム B5+）、VT、キュレル、BIOHEAL BOHなど、肌の細胞間脂質を疑似再構築する神リペアクリーム10選を徹底比較！",
    isHallOfFame: true,
    coverImage: barrierCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/barriercream.jpg",
    recommendedItemCodes: barrierCreamArticles.map(a => a.id),
    contentMarkdown: barrierCreamContent
  },
  {
    id: "feat-winter-ems-head-spa-scalp-lift-device-2026",
    slug: "winter-ems-head-spa-scalp-lift-device-2026",
    title: "【2026冬ボーナス＆ホリデー極上ご褒美】電動EMSヘッドスパ＆スカルプリフトマッサージャーおすすめ人気10選！MYTREX・ヤーマン・NIPLUXなど湯船で使える極上サロン級リフトケア徹底比較",
    subtitle: "寒さでガチガチに固まった頭皮のコリ・首肩コリを、プロのハンドテクニック×電気針EMSで芯からほぐす！MYTREX（最高峰EMS）、NIPLUX（2倍振動＆赤色LED）、ヤーマン ミーゼ（ニードルリフト）、パナソニック（サロンタッチ）など、お風呂で温まりながら頭皮からフェイスラインを引き上げる至高の美容ギア10選を徹底レビュー！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "寒さでガチガチに固まった頭皮のコリ・首肩コリを、プロのハンドテクニック×電気針EMSで芯からほぐす！MYTREX（最高峰EMS）、NIPLUX（2倍振動＆赤色LED）、ヤーマン ミーゼ（ニードルリフト）、パナソニック（サロンタッチ）など、お風呂で温まりながら頭皮からフェイスラインを引き上げる至高の美容ギア10選を徹底レビュー！",
    isHallOfFame: true,
    coverImage: headSpaItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/headspa.jpg",
    recommendedItemCodes: headSpaArticles.map(a => a.id),
    contentMarkdown: headSpaContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第14弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}
