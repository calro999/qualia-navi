import fs from 'fs';
import path from 'path';
import {
  holidayItemsRaw,
  foundationItemsRaw,
  ceramideItemsRaw,
  holidayArticles,
  foundationArticles,
  ceramideArticles
} from './insert_winter_batch48_helper.mjs';

import { getHolidayArticleContent } from './winter_batch48_article1_holiday.mjs';
import { getFoundationArticleContent } from './winter_batch48_article2_foundation.mjs';
import { getCeramideArticleContent } from './winter_batch48_article3_ceramide.mjs';

console.log('🚀 [冬コスメ 第48弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const holidayContent = getHolidayArticleContent();
const foundationContent = getFoundationArticleContent();
const ceramideContent = getCeramideArticleContent();

console.log(`- 記事1 (ホリデー限定コフレ＆パレット) 文字数: 約${holidayContent.length}文字`);
console.log(`- 記事2 (高保湿美容液ファンデーション) 文字数: 約${foundationContent.length}文字`);
console.log(`- 記事3 (ヒト型セラミド美容液＆原液) 文字数: 約${ceramideContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (holidayContent.length < 5000 || foundationContent.length < 5000 || ceramideContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-coffret-eyeshadow-palette-2026",
    slug: "winter-holiday-coffret-eyeshadow-palette-2026",
    title: "【2026冬ホリデー限定・クリスマスコフレ＆限定パレット】ホリデーコレクション メイクアップパレット＆限定コフレおすすめ人気10選！冬の澄んだ光に映える極上ラメ・多幸感カラー＆争奪戦必至のプレミアム名品比較",
    subtitle: "年間最大のコスメの祭典！ジルスチュアート、SUQQU、コスメデコルテ、DIOR、ルナソル、YSL、NARS、シャネルなど、冬の澄んだ空気に映える繊細なジュエルラメと多幸感カラーが詰まった2026年限定クリスマスコフレ＆パレット10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "年間最大のコスメの祭典！ジルスチュアート、SUQQU、コスメデコルテ、DIOR、ルナソル、YSL、NARS、シャネルなど、冬の澄んだ空気に映える繊細なジュエルラメと多幸感カラーが詰まった2026年限定クリスマスコフレ＆パレット10選を徹底比較！",
    isHallOfFame: true,
    coverImage: holidayItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/holiday.jpg",
    recommendedItemCodes: holidayArticles.map(a => a.id),
    contentMarkdown: holidayContent
  },
  {
    id: "feat-winter-serum-foundation-glow-cushion-dry-skin-2026",
    slug: "winter-serum-foundation-glow-cushion-dry-skin-2026",
    title: "【2026冬・暖房砂漠でも崩れない＆乾燥割れゼロ】高保湿美容液ファンデーション＆水光セラムクッションおすすめ人気10選！真冬の湿度20%環境を跳ね返すスキンケア処方ベースメイク徹底比較",
    subtitle: "真冬の過酷な暖房砂漠（湿度20%）に負けない！SHISEIDOエッセンススキングロウ、クレ・ド・ポー ボーテ、TIRTIRレッド、コスメデコルテ、ボビイブラウン、SUQQUなど、美容液成分70%以上で夕方まで粉吹き・ひび割れを防ぐ神ベースメイク10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "真冬の過酷な暖房砂漠（湿度20%）に負けない！SHISEIDOエッセンススキングロウ、クレ・ド・ポー ボーテ、TIRTIRレッド、コスメデコルテ、ボビイブラウン、SUQQUなど、美容液成分70%以上で夕方まで粉吹き・ひび割れを防ぐ神ベースメイク10選！",
    isHallOfFame: true,
    coverImage: foundationItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/foundation.jpg",
    recommendedItemCodes: foundationArticles.map(a => a.id),
    contentMarkdown: foundationContent
  },
  {
    id: "feat-winter-human-ceramide-skin-barrier-serum-2026",
    slug: "winter-human-ceramide-skin-barrier-serum-2026",
    title: "【2026冬・角層バリア崩壊＆砂漠肌を救う】ヒト型セラミド原液＆高濃度セラミド導入美容液おすすめ人気10選！寒冷乾燥・エアコン・マスク摩擦による皮剥け・インナードライを皮膚科学で根本修復",
    subtitle: "寒冷と暖房で細胞間脂質がスカスカになった砂漠肌を皮膚科学発想で緊急修復！エトヴォス、トゥヴェールナノエマルジョン、キュレル、松山油脂、KISO、チューンメーカーズ、アスタリフトなど、ヒト型セラミド高配合の救世主10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "寒冷と暖房で細胞間脂質がスカスカになった砂漠肌を皮膚科学発想で緊急修復！エトヴォス、トゥヴェールナノエマルジョン、キュレル、松山油脂、KISO、チューンメーカーズ、アスタリフトなど、ヒト型セラミド高配合の救世主10選を徹底比較！",
    isHallOfFame: true,
    coverImage: ceramideItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/ceramide.jpg",
    recommendedItemCodes: ceramideArticles.map(a => a.id),
    contentMarkdown: ceramideContent
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

console.log('🎉 第48弾の全記事統合処理が正常に完了しました！');
