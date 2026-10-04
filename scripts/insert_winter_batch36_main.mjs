import fs from 'fs';
import path from 'path';
import {
  whiteningItemsRaw,
  hairCombItemsRaw,
  bodycareCoffretItemsRaw,
  whiteningArticles,
  hairCombArticles,
  bodycareCoffretArticles
} from './insert_winter_batch36_helper.mjs';

import { getWhiteningArticleContent } from './winter_batch36_article1_whitening.mjs';
import { getHairCombArticleContent } from './winter_batch36_article2_hair_comb.mjs';
import { getBodycareCoffretArticleContent } from './winter_batch36_article3_bodycare_coffret.mjs';

console.log('🚀 [冬コスメ 第36弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const whiteningContent = getWhiteningArticleContent();
const hairCombContent = getHairCombArticleContent();
const bodycareCoffretContent = getBodycareCoffretArticleContent();

console.log(`- 記事1 (高保湿・薬用集中美白美容液) 文字数: 約${whiteningContent.length}文字`);
console.log(`- 記事2 (高機能美髪ヘアコーム) 文字数: 約${hairCombContent.length}文字`);
console.log(`- 記事3 (ボディケア＆バス限定コフレ) 文字数: 約${bodycareCoffretContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (whiteningContent.length < 5000 || hairCombContent.length < 5000 || bodycareCoffretContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-intensive-whitening-brightening-serum-2026",
    slug: "winter-intensive-whitening-brightening-serum-2026",
    title: "【2026冬・紫外線が下がる今こそシミ・くすみを一掃】高保湿・薬用集中美白美容液おすすめ人気10選！冬の角質をうるおいで満たし圧倒的透明感と発光白肌を手に入れる決定版",
    subtitle: "紫外線量が年間最小になる11〜12月は夏の蓄積メラニンとシミ・くすみを一掃する美白のゴールデンタイム！乾燥で角層バリアを壊さず、4MSK・コウジ酸・ルシノール・ピュアビタミンC・トラネキサム酸で透明感を底上げする本命薬用美白美容液10選をプロが徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "紫外線量が年間最小になる11〜12月は夏の蓄積メラニンとシミ・くすみを一掃する美白のゴールデンタイム！乾燥で角層バリアを壊さず、4MSK・コウジ酸・ルシノール・ピュアビタミンC・トラネキサム酸で透明感を底上げする本命薬用美白美容液10選をプロが徹底比較！",
    isHallOfFame: true,
    coverImage: whiteningItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/whitening_serum.jpg",
    recommendedItemCodes: whiteningArticles.map(a => a.id),
    contentMarkdown: whiteningContent
  },
  {
    id: "feat-winter-anti-static-hair-comb-love-chrome-2026",
    slug: "winter-anti-static-hair-comb-love-chrome-2026",
    title: "【2026冬・静電気＆マフラー摩擦を即撃退】とかすだけで濡れツヤ髪へ！高機能美髪ヘアコーム＆静電気拡散コームおすすめ人気10選！ラブクロム・ReFaなどホリデーギフトにも選ばれる名品徹底比較",
    subtitle: "11〜12月の木枯らしやエアコン暖房、ウールニット・マフラーによるバチバチ静電気と摩擦ダメージを根本解決！特殊加工で静電気を吸着拡散し、キューティクルを引き締めてサロン帰りの濡れツヤ髪を再現するLOVE CHROME、ReFa、タングルティーザーなど厳選10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "11〜12月の木枯らしやエアコン暖房、ウールニット・マフラーによるバチバチ静電気と摩擦ダメージを根本解決！特殊加工で静電気を吸着拡散し、キューティクルを引き締めてサロン帰りの濡れツヤ髪を再現するLOVE CHROME、ReFa、タングルティーザーなど厳選10選を徹底比較！",
    isHallOfFame: true,
    coverImage: hairCombItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair_comb.jpg",
    recommendedItemCodes: hairCombArticles.map(a => a.id),
    contentMarkdown: hairCombContent
  },
  {
    id: "feat-winter-holiday-bodycare-bath-gift-set-2026",
    slug: "winter-holiday-bodycare-bath-gift-set-2026",
    title: "【2026冬ホリデー・極上の香りと潤いに包まれる】ボディケア＆バスタイム限定コフレ・プレミアムギフトセットおすすめ人気10選！SABON・ロクシタン・ジョーマローンなど完売必至の限定キット徹底比較",
    subtitle: "パーソナルカラーを問わず誰もが喜ぶ冬の鉄板ギフト＆自分への至福のご褒美！冷え切った身体と乾燥した粉吹き肌を温め潤すSABON、ロクシタン、ジョーマローン、LUSH、ローラメルシエ、ディプティックなどの贅沢限定コフレ10選をプロが徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "パーソナルカラーを問わず誰もが喜ぶ冬の鉄板ギフト＆自分への至福のご褒美！冷え切った身体と乾燥した粉吹き肌を温め潤すSABON、ロクシタン、ジョーマローン、LUSH、ローラメルシエ、ディプティックなどの贅沢限定コフレ10選をプロが徹底比較！",
    isHallOfFame: true,
    coverImage: bodycareCoffretItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodycare_coffret.jpg",
    recommendedItemCodes: bodycareCoffretArticles.map(a => a.id),
    contentMarkdown: bodycareCoffretContent
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
