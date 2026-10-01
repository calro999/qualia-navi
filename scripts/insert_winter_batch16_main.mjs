import fs from 'fs';
import path from 'path';
import {
  eyeshadowItemsRaw,
  dayCreamItemsRaw,
  giftItemsRaw,
  eyeshadowArticles,
  dayCreamArticles,
  giftArticles
} from './insert_winter_batch16_helper.mjs';

import { getEyeshadowArticleContent } from './winter_batch16_article1_eyeshadow.mjs';
import { getDayCreamArticleContent } from './winter_batch16_article2_daycream.mjs';
import { getGiftArticleContent } from './winter_batch16_article3_gift.mjs';

console.log('🚀 [冬コスメ 第16弾] 特集記事の生成と data.ts への統合を開始します...');

const eyeshadowContent = getEyeshadowArticleContent();
const dayCreamContent = getDayCreamArticleContent();
const giftContent = getGiftArticleContent();

console.log(`- 記事1 (ホリデーアイシャドウパレット) 文字数: 約${eyeshadowContent.length}文字`);
console.log(`- 記事2 (高保湿UVデイクリーム) 文字数: 約${dayCreamContent.length}文字`);
console.log(`- 記事3 (ホリデーギフトコスメ) 文字数: 約${giftContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (eyeshadowContent.length < 5000 || dayCreamContent.length < 5000 || giftContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-warm-eyeshadow-palette-holiday-2026",
    slug: "winter-warm-eyeshadow-palette-holiday-2026",
    title: "【2026冬・聖夜に煌めく極上陰影】高密着ホリデーアイシャドウパレット＆深みウォームカラーおすすめ人気10選！夕方のくすみ・二重幅ヨレを防ぐ大人の冬アイメイク決定版",
    subtitle: "澄んだ冬の光とイルミネーションに映える、大人のためのホリデーアイシャドウ決定版！SUQQU（透け感陰影）、ルナソル（水ツヤ発光）、ディオール（クチュール高密着）、シャネル（名作4色）、エクセル、キャンメイク、トムフォードなど、真冬の乾燥まぶたでも粉飛び・二重幅ヨレゼロを叶える神パレット10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "澄んだ冬の光とイルミネーションに映える、大人のためのホリデーアイシャドウ決定版！SUQQU（透け感陰影）、ルナソル（水ツヤ発光）、ディオール（クチュール高密着）、シャネル（名作4色）、エクセル、キャンメイク、トムフォードなど、真冬の乾燥まぶたでも粉飛び・二重幅ヨレゼロを叶える神パレット10選を徹底比較！",
    isHallOfFame: true,
    coverImage: eyeshadowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyeshadow.jpg",
    recommendedItemCodes: eyeshadowArticles.map(a => a.id),
    contentMarkdown: eyeshadowContent
  },
  {
    id: "feat-winter-hydrating-uv-day-cream-barrier-2026",
    slug: "winter-hydrating-uv-day-cream-barrier-2026",
    title: "【2026冬・夕方まで乾かない朝のうるおい結界】高保湿UVデイクリーム＆日中用プロテクト美容液おすすめ人気10選！暖房乾燥・冬のUVA・花粉寒暖差を鉄壁ガードする大人の朝クリーム決定版",
    subtitle: "「冬は日差しが弱いから日焼け止めは不要」は大間違い！真皮を破壊するUVAと湿度20%のオフィス暖房から素肌を守り抜く。KANEBO（クリームインデイ）、カネボウ（ヴェイルオブデイ）、コスメデコルテ、オルビス（シワ改善×美白）、エリクシール、ラロッシュポゼ、POLA B.Aなど、一日中モロモロが出ず発光ツヤ肌をキープする朝クリーム10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "「冬は日差しが弱いから日焼け止めは不要」は大間違い！真皮を破壊するUVAと湿度20%のオフィス暖房から素肌を守り抜く。KANEBO（クリームインデイ）、カネボウ（ヴェイルオブデイ）、コスメデコルテ、オルビス（シワ改善×美白）、エリクシール、ラロッシュポゼ、POLA B.Aなど、一日中モロモロが出ず発光ツヤ肌をキープする朝クリーム10選！",
    isHallOfFame: true,
    coverImage: dayCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/daycream.jpg",
    recommendedItemCodes: dayCreamArticles.map(a => a.id),
    contentMarkdown: dayCreamContent
  },
  {
    id: "feat-winter-holiday-cosmetics-gift-guide-2026",
    slug: "winter-holiday-cosmetics-gift-guide-2026",
    title: "【2026冬・絶対外さないホリデーギフト】予算別（3,000円/5,000円/1万円）人気プレゼントコスメ＆冬のご褒美ビューティーおすすめ人気10選！女友達・大切な人へ贈るおしゃれ名品決定版",
    subtitle: "クリスマス、誕生日、忘年会、自分へのご褒美に！「相手のパーソナルカラーが分からなくても100%喜ばれる」ギフトの鉄則を伝授。Dior（マキシマイザー）、シャネル（名入れミラー）、Aesop（アロマハンドウォッシュ）、SHIRO（ヘアミスト）、uka（ケンザン）、SABON、BAUM、ReFaなど、センス抜群と絶賛される名作10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "クリスマス、誕生日、忘年会、自分へのご褒美に！「相手のパーソナルカラーが分からなくても100%喜ばれる」ギフトの鉄則を伝授。Dior（マキシマイザー）、シャネル（名入れミラー）、Aesop（アロマハンドウォッシュ）、SHIRO（ヘアミスト）、uka（ケンザン）、SABON、BAUM、ReFaなど、センス抜群と絶賛される名作10選！",
    isHallOfFame: true,
    coverImage: giftItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/gift.jpg",
    recommendedItemCodes: giftArticles.map(a => a.id),
    contentMarkdown: giftContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第16弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}
