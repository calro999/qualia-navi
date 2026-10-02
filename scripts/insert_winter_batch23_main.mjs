import fs from 'fs';
import path from 'path';
import {
  eyelinerItemsRaw,
  lipScrubItemsRaw,
  stickEyeshadowItemsRaw,
  eyelinerArticles,
  lipScrubArticles,
  stickEyeshadowArticles
} from './insert_winter_batch23_helper.mjs';

import { getEyelinerArticleContent } from './winter_batch23_article1_eyeliner.mjs';
import { getLipScrubArticleContent } from './winter_batch23_article2_lipscrub.mjs';
import { getStickEyeshadowArticleContent } from './winter_batch23_article3_stickeyeshadow.mjs';

console.log('🚀 [冬コスメ 第23弾] 特集記事の生成と data.ts への統合を開始します...');

const eyelinerContent = getEyelinerArticleContent();
const lipScrubContent = getLipScrubArticleContent();
const stickEyeshadowContent = getStickEyeshadowArticleContent();

console.log(`- 記事1 (アイライナー) 文字数: 約${eyelinerContent.length}文字`);
console.log(`- 記事2 (リップスクラブ) 文字数: 約${lipScrubContent.length}文字`);
console.log(`- 記事3 (スティックアイシャドウ) 文字数: 約${stickEyeshadowContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (eyelinerContent.length < 5000 || lipScrubContent.length < 5000 || stickEyeshadowContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-long-lasting-smudgeproof-eyeliner-gel-liquid-2026",
    slug: "winter-long-lasting-smudgeproof-eyeliner-gel-liquid-2026",
    title: "【2026冬・寒風＆涙目でも夕方までにじまない耐久美ライン】高密着ジェルアイライナー＆極細リキッドアイライナーおすすめ人気10選！乾燥まぶたでもカサつかずスルスル描ける冬の目元補正決定版",
    subtitle: "冷たい木枯らしの涙目や暖房の乾燥で「いつの間にか目尻が消える」「黒く滲んでパンダ目」にサヨナラ！とろける極細ジェルペンシル（キャンメイク、ケイト、デジャヴュ、エテュセ、セルヴォーク、シャネル）から、ブレずに密着する0.1mm極細リキッド（ラブ・ライナー、ディーアップ、UZU、ヒロインメイク）まで、冬の過酷な環境を耐え抜く実力派10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "冷たい木枯らしの涙目や暖房の乾燥で「いつの間にか目尻が消える」「黒く滲んでパンダ目」にサヨナラ！とろける極細ジェルペンシル（キャンメイク、ケイト、デジャヴュ、エテュセ、セルヴォーク、シャネル）から、ブレずに密着する0.1mm極細リキッド（ラブ・ライナー、ディーアップ、UZU、ヒロインメイク）まで、冬の過酷な環境を耐え抜く実力派10選を徹底検証！",
    isHallOfFame: true,
    coverImage: eyelinerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyeliner.jpg",
    recommendedItemCodes: eyelinerArticles.map(a => a.id),
    contentMarkdown: eyelinerContent
  },
  {
    id: "feat-winter-hydrating-lip-scrub-sugar-peeling-2026",
    slug: "winter-hydrating-lip-scrub-sugar-peeling-2026",
    title: "【2026冬・ガサガサ皮むけ＆縦ジワを即効つるんとリセット】低刺激リップスクラブ＆シュガースクラブおすすめ人気10選！洗い流し不要スティックから濃密生シュガーまで赤ちゃん唇を呼び戻す冬の角質レスキュー決定版",
    subtitle: "湿度が30%を下回る11〜12月、リップクリームをいくら塗っても解決しない「めくれた皮」「粉吹き縦ジワ」「口紅のムラづき」を角質オフ×濃密保湿で即解決！レブロン（国民的シュガースクラブ）、キャンメイク（プランプスクラブ）、LUSH、サラハップ、ラネージュ、エチュード、トリデン、イニスフリー、ジルスチュアート、キュレルなど、痛くない贅沢角質ケア10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "湿度が30%を下回る11〜12月、リップクリームをいくら塗っても解決しない「めくれた皮」「粉吹き縦ジワ」「口紅のムラづき」を角質オフ×濃密保湿で即解決！レブロン（国民的シュガースクラブ）、キャンメイク（プランプスクラブ）、LUSH、サラハップ、ラネージュ、エチュード、トリデン、イニスフリー、ジルスチュアート、キュレルなど、痛くない贅沢角質ケア10選！",
    isHallOfFame: true,
    coverImage: lipScrubItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipscrub.jpg",
    recommendedItemCodes: lipScrubArticles.map(a => a.id),
    contentMarkdown: lipScrubContent
  },
  {
    id: "feat-winter-hydrating-cream-stick-liquid-eyeshadow-2026",
    slug: "winter-hydrating-cream-stick-liquid-eyeshadow-2026",
    title: "【2026冬・乾燥まぶたにピタッと密着＆イルミネーション映え濡れツヤ】高密着スティックアイシャドウ＆リキッドアイシャドウおすすめ人気10選！粉飛びゼロで二重幅にたまらない冬の濡れ感アイカラー決定版",
    subtitle: "パウダーシャドウが乾燥でシワに落ち込む冬の目元を、美容液級のしっとりクリーム膜で救済！ボビイ ブラウン（ロングウェアスティック）、ローラ メルシエ（キャビアスティック）、コスメデコルテ（アイグロウジェム）、アディクション、CipiCipi、ウォンジョンヨ、デイジーク、エレガンス、エチュード、フジコなど、光を集めて一日中潤み続ける濡れツヤ＆グリッター10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "パウダーシャドウが乾燥でシワに落ち込む冬の目元を、美容液級のしっとりクリーム膜で救済！ボビイ ブラウン（ロングウェアスティック）、ローラ メルシエ（キャビアスティック）、コスメデコルテ（アイグロウジェム）、アディクション、CipiCipi、ウォンジョンヨ、デイジーク、エレガンス、エチュード、フジコなど、光を集めて一日中潤み続ける濡れツヤ＆グリッター10選！",
    isHallOfFame: true,
    coverImage: stickEyeshadowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/stickshadow.jpg",
    recommendedItemCodes: stickEyeshadowArticles.map(a => a.id),
    contentMarkdown: stickEyeshadowContent
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
