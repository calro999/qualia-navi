import fs from 'fs';
import path from 'path';
import {
  holidayCoffretItemsRaw,
  moistPowderItemsRaw,
  hairOilItemsRaw,
  holidayCoffretArticles,
  moistPowderArticles,
  hairOilArticles
} from './insert_winter_batch35_helper.mjs';

import { getHolidayCoffretArticleContent } from './winter_batch35_article1_coffret.mjs';
import { getMoistPowderArticleContent } from './winter_batch35_article2_moist_powder.mjs';
import { getHairOilArticleContent } from './winter_batch35_article3_hair_oil.mjs';

console.log('🚀 [冬コスメ 第35弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const holidayCoffretContent = getHolidayCoffretArticleContent();
const moistPowderContent = getMoistPowderArticleContent();
const hairOilContent = getHairOilArticleContent();

console.log(`- 記事1 (クリスマスコフレ＆ホリデー限定キット) 文字数: 約${holidayCoffretContent.length}文字`);
console.log(`- 記事2 (高保湿フェイスパウダー) 文字数: 約${moistPowderContent.length}文字`);
console.log(`- 記事3 (高保湿ヘアオイル) 文字数: 約${hairOilContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (holidayCoffretContent.length < 5000 || moistPowderContent.length < 5000 || hairOilContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-coffret-makeup-collection-2026",
    slug: "winter-holiday-coffret-makeup-collection-2026",
    title: "【2026冬ホリデー・即完売必至の限定コフレ】クリスマスコフレ＆ホリデーメイクアップキットおすすめ人気10選！年に一度の豪華デパコス限定セット徹底比較",
    subtitle: "11〜12月の街が輝くホリデーシーズン！コスメデコルテ、ジルスチュアート、エレガンス、ルナソル、Dior、SUQQU、アディクション、RMK、YSL、MACなど即完売する憧れブランドの限定パレット・リップ・バニティポーチをプロが徹底比較！楽天市場でお得に確実にゲットする攻略法も公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "11〜12月の街が輝くホリデーシーズン！コスメデコルテ、ジルスチュアート、エレガンス、ルナソル、Dior、SUQQU、アディクション、RMK、YSL、MACなど即完売する憧れブランドの限定パレット・リップ・バニティポーチをプロが徹底比較！楽天市場でお得に確実にゲットする攻略法も公開！",
    isHallOfFame: true,
    coverImage: holidayCoffretItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/holiday_coffret.jpg",
    recommendedItemCodes: holidayCoffretArticles.map(a => a.id),
    contentMarkdown: holidayCoffretContent
  },
  {
    id: "feat-winter-hydrating-moist-loose-face-powder-2026",
    slug: "winter-hydrating-moist-loose-face-powder-2026",
    title: "【2026冬・暖房でも粉吹き・乾燥崩れゼロ】高保湿フェイスパウダー＆しっとり美容液ルースパウダーおすすめ人気10選！目元のシワ割れを防ぎ一日中シルキーな透明美肌をキープする決定版",
    subtitle: "11〜12月の過酷な外気乾燥＆エアコン暖房でパウダーを塗ると粉を吹く・目元がシワ割れする悩みを解決！アミノ酸コーティング・微粒子ヒアルロン酸・美容オイル練り込みパウダーでうるおいを密閉。コスメデコルテ、ミラノコレクション、エレガンス、NARS、SUQQU、ジバンシイなど厳選10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "11〜12月の過酷な外気乾燥＆エアコン暖房でパウダーを塗ると粉を吹く・目元がシワ割れする悩みを解決！アミノ酸コーティング・微粒子ヒアルロン酸・美容オイル練り込みパウダーでうるおいを密閉。コスメデコルテ、ミラノコレクション、エレガンス、NARS、SUQQU、ジバンシイなど厳選10選を徹底比較！",
    isHallOfFame: true,
    coverImage: moistPowderItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/moist_powder.jpg",
    recommendedItemCodes: moistPowderArticles.map(a => a.id),
    contentMarkdown: moistPowderContent
  },
  {
    id: "feat-winter-deep-moist-hair-oil-anti-static-2026",
    slug: "winter-deep-moist-hair-oil-anti-static-2026",
    title: "【2026冬・ニット静電気＆マフラー摩擦を完全遮断】高保湿ヘアオイル＆濃厚アウトバストリートメントおすすめ人気10選！パサつき・広がり・枝毛を集中補修して濡れツヤ髪を一日中キープする決定版",
    subtitle: "11〜12月の木枯らしやエアコン暖房でパサつき、ニットやマフラーを脱ぐたびに爆発する静電気・摩擦ダメージを根本解決！モロッカンオイル、ケラスターゼ、ミルボン、track oil No.3、N.、&honey、フィーノ、ロレアル、uka、TSUBAKIなど厳選10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "11〜12月の木枯らしやエアコン暖房でパサつき、ニットやマフラーを脱ぐたびに爆発する静電気・摩擦ダメージを根本解決！モロッカンオイル、ケラスターゼ、ミルボン、track oil No.3、N.、&honey、フィーノ、ロレアル、uka、TSUBAKIなど厳選10選を徹底比較！",
    isHallOfFame: true,
    coverImage: hairOilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair_oil.jpg",
    recommendedItemCodes: hairOilArticles.map(a => a.id),
    contentMarkdown: hairOilContent
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
