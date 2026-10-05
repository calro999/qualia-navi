import fs from 'fs';
import path from 'path';
import {
  cleansingOilItemsRaw,
  salonHairItemsRaw,
  settingSprayItemsRaw,
  cleansingOilArticles,
  salonHairArticles,
  settingSprayArticles
} from './insert_winter_batch42_helper.mjs';

import { getCleansingOilArticleContent } from './winter_batch42_article1_cleansingoil.mjs';
import { getSalonHairArticleContent } from './winter_batch42_article2_salonhair.mjs';
import { getSettingSprayArticleContent } from './winter_batch42_article3_settingspray.mjs';

console.log('🚀 [冬コスメ 第42弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const cleansingOilContent = getCleansingOilArticleContent();
const salonHairContent = getSalonHairArticleContent();
const settingSprayContent = getSettingSprayArticleContent();

console.log(`- 記事1 (高保湿クレンジングオイル) 文字数: 約${cleansingOilContent.length}文字`);
console.log(`- 記事2 (サロン専売シャンプー＆トリートメント) 文字数: 約${salonHairContent.length}文字`);
console.log(`- 記事3 (高保湿メイクキープミスト) 文字数: 約${settingSprayContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (cleansingOilContent.length < 5000 || salonHairContent.length < 5000 || settingSprayContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-deep-hydrating-cleansing-oil-pore-2026",
    slug: "winter-deep-hydrating-cleansing-oil-pore-2026",
    title: "【2026冬・乾燥と摩擦をゼロにする極上毛穴レスオフ】高保湿クレンジングオイル＆植物性ディープクレンジングおすすめ人気10選！冬の濃いホリデーメイク・ラメもするんと落ちてつっぱらない名品比較",
    subtitle: "冷え固まった角栓とホリデーの濃密ラメを摩擦レスで瞬時にオフ！シュウウエムラ、ファンケル、アテニア、魔女工場、ボビイブラウンなど、洗い上がりのつっぱりゼロを叶える美容オイルクレンジング10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 22,
    introText: "冷え固まった角栓とホリデーの濃密ラメを摩擦レスで瞬時にオフ！シュウウエムラ、ファンケル、アテニア、魔女工場、ボビイブラウンなど、洗い上がりのつっぱりゼロを叶える美容オイルクレンジング10選を徹底比較！",
    isHallOfFame: true,
    coverImage: cleansingOilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cleansingoil.jpg",
    recommendedItemCodes: cleansingOilArticles.map(a => a.id),
    contentMarkdown: cleansingOilContent
  },
  {
    id: "feat-winter-salon-grade-repair-shampoo-treatment-set-2026",
    slug: "winter-salon-grade-repair-shampoo-treatment-set-2026",
    title: "【2026冬・サロン帰りの極上ツヤとまとまりを再現】サロン専売高保湿ダメージ補修シャンプー＆トリートメントセットおすすめ人気10選！乾燥パサつき・静電気・枝毛を根本補修する冬のご褒美ヘアケア",
    subtitle: "暖房乾燥やマフラー摩擦で傷んだパサつき髪を芯から救済！ケラスターゼ、オージュア、コタ、資生堂サブリミック、TOKIOインカラミなど、一年頑張った自分へのご褒美・冬ギフトにふさわしいサロン専売ヘアケア10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 22,
    introText: "暖房乾燥やマフラー摩擦で傷んだパサつき髪を芯から救済！ケラスターゼ、オージュア、コタ、資生堂サブリミック、TOKIOインカラミなど、一年頑張った自分へのご褒美・冬ギフトにふさわしいサロン専売ヘアケア10選を徹底検証！",
    isHallOfFame: true,
    coverImage: salonHairItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/salonhair.jpg",
    recommendedItemCodes: salonHairArticles.map(a => a.id),
    contentMarkdown: salonHairContent
  },
  {
    id: "feat-winter-hydrating-makeup-setting-spray-fix-mist-2026",
    slug: "winter-hydrating-makeup-setting-spray-fix-mist-2026",
    title: "【2026冬・暖房による乾燥崩れ＆マフラー擦れを完全防御】高保湿メイクキープミスト＆モイストフィックススプレーおすすめ人気10選！ツヤ肌キープ＆一日中ヨレない名品比較",
    subtitle: "エアコン暖房の砂漠乾燥でも一日中つや玉キープ！コーセー限定モイスト、コスメデコルテ、M・A・C、シュウウエムラ、クラランスなど、マフラーへの色移りや夕方の粉ふきを完全ガードする高保湿セッティングミスト10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 22,
    introText: "エアコン暖房の砂漠乾燥でも一日中つや玉キープ！コーセー限定モイスト、コスメデコルテ、M・A・C、シュウウエムラ、クラランスなど、マフラーへの色移りや夕方の粉ふきを完全ガードする高保湿セッティングミスト10選を徹底比較！",
    isHallOfFame: true,
    coverImage: settingSprayItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/settingspray.jpg",
    recommendedItemCodes: settingSprayArticles.map(a => a.id),
    contentMarkdown: settingSprayContent
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
