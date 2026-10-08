import fs from 'fs';
import path from 'path';
import {
  adventItemsRaw,
  skincareCoffretItemsRaw,
  carbonicFoamItemsRaw,
  adventArticles,
  skincareCoffretArticles,
  carbonicFoamArticles
} from './insert_winter_batch66_helper.mjs';

import { getAdventCalendarArticleContent } from './winter_batch66_article1_advent_calendar.mjs';
import { getSkincareCoffretArticleContent } from './winter_batch66_article2_skincare_coffret.mjs';
import { getCarbonicFoamArticleContent } from './winter_batch66_article3_carbonic_foam.mjs';

console.log('🚀 [冬コスメ 第66弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const adventContent = getAdventCalendarArticleContent();
const skincareCoffretContent = getSkincareCoffretArticleContent();
const carbonicFoamContent = getCarbonicFoamArticleContent();

console.log(`- 記事1 (コスメアドベントカレンダー2026) 文字数: 約${adventContent.length}文字`);
console.log(`- 記事2 (ホリデースキンケアコフレ2026) 文字数: 約${skincareCoffretContent.length}文字`);
console.log(`- 記事3 (濃密炭酸泡洗顔料＆温感ホイップ) 文字数: 約${carbonicFoamContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (adventContent.length < 5000 || skincareCoffretContent.length < 5000 || carbonicFoamContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-beauty-advent-calendar-gift-2026",
    slug: "winter-holiday-beauty-advent-calendar-gift-2026",
    title: "【2026冬・クリスマスの毎日を彩る極上のカウントダウン】コスメ＆ビューティーアドベントカレンダーおすすめ人気10選！デパコス限定ミニサイズ・人気スキンケア・フレグランス・ボディケアが贅沢に詰まった自分への最高のご褒美＆ホリデーギフト徹底比較",
    subtitle: "11〜12月のホリデーシーズンを彩る憧れのアドベントカレンダー！ロクシタン、ポール＆ジョー、キールズ、サボン、ディオールなど毎日扉を開けるサプライズと現品換算でお得すぎる人気10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月のホリデーシーズンを彩る憧れのアドベントカレンダー！ロクシタン、ポール＆ジョー、キールズ、サボン、ディオールなど毎日扉を開けるサプライズと現品換算でお得すぎる人気10選！",
    isHallOfFame: true,
    coverImage: adventItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/advent.jpg",
    recommendedItemCodes: adventArticles.map(a => a.id),
    contentMarkdown: adventContent
  },
  {
    id: "feat-winter-holiday-skincare-coffret-luxury-set-2026",
    slug: "winter-holiday-skincare-coffret-luxury-set-2026",
    title: "【2026冬・1年間の肌疲れをリセットし翌朝の透明感を底上げ】ホリデースキンケアコフレ＆プレミアム集中保湿限定セットおすすめ人気10選！SK-II・コスメデコルテ・エスティローダー・ランコム・キールズなど冬の乾燥・エイジングを撃退する最高峰ご褒美スキンケアキット徹底比較",
    subtitle: "11〜12月の過酷な乾燥と1年間の蓄積肌疲労を集中修復する最高峰スキンケアコフレ！SK-IIピテラ、デコルテリポソーム、エスティローダーナイトリペアなど限定キット10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の過酷な乾燥と1年間の蓄積肌疲労を集中修復する最高峰スキンケアコフレ！SK-IIピテラ、デコルテリポソーム、エスティローダーナイトリペアなど限定キット10選！",
    isHallOfFame: true,
    coverImage: skincareCoffretItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/skincarecoffret.jpg",
    recommendedItemCodes: skincareCoffretArticles.map(a => a.id),
    contentMarkdown: skincareCoffretContent
  },
  {
    id: "feat-winter-micro-carbonic-acid-foam-face-wash-2026",
    slug: "winter-micro-carbonic-acid-foam-face-wash-2026",
    title: "【2026冬・寒さで淀んだ血行不良くすみ＆毛穴の黒ずみを秒速リセット】濃密炭酸泡洗顔料＆温感ホイップ洗顔おすすめ人気10選！毛穴より微細なマイクロ高濃度炭酸泡でこすらず摩擦レス・血行促進・透明感爆上がりする冬の朝晩レスキュー洗顔徹底比較",
    subtitle: "11〜12月の寒さで血行不良になったくすみ肌や固まった毛穴の角栓を、毛穴より微細な濃密炭酸マイクロ泡で摩擦レスに浮かせて落とす！ソフィーナiP、オバジX、SHIKARIなど10選！",
    targetGender: "unisex",
    authorId: "author-inoue",
    authorName: "井上 さくら",
    authorRole: "専属コスメコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の寒さで血行不良になったくすみ肌や固まった毛穴の角栓を、毛穴より微細な濃密炭酸マイクロ泡で摩擦レスに浮かせて落とす！ソフィーナiP、オバジX、SHIKARIなど10選！",
    isHallOfFame: true,
    coverImage: carbonicFoamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/carbonicfoam.jpg",
    recommendedItemCodes: carbonicFoamArticles.map(a => a.id),
    contentMarkdown: carbonicFoamContent
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
  console.log('✅ src/data.ts に第66弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
