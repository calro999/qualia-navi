import fs from 'fs';
import path from 'path';
import {
  highlighterItemsRaw,
  nightCreamItemsRaw,
  bathCareItemsRaw,
  highlighterArticles,
  nightCreamArticles,
  bathCareArticles
} from './insert_winter_batch40_helper.mjs';

import { getHighlighterArticleContent } from './winter_batch40_article1_highlighter.mjs';
import { getNightCreamArticleContent } from './winter_batch40_article2_night_cream.mjs';
import { getBathCareArticleContent } from './winter_batch40_article3_bath_care.mjs';

console.log('🚀 [冬コスメ 第40弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const highlighterContent = getHighlighterArticleContent();
const nightCreamContent = getNightCreamArticleContent();
const bathCareContent = getBathCareArticleContent();

console.log(`- 記事1 (極上スティックハイライト＆生ツヤリキッド) 文字数: 約${highlighterContent.length}文字`);
console.log(`- 記事2 (高機能リッチナイトクリーム＆エイジングケア) 文字数: 約${nightCreamContent.length}文字`);
console.log(`- 記事3 (薬用重炭酸入浴剤＆高保湿バスオイル) 文字数: 約${bathCareContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (highlighterContent.length < 5000 || nightCreamContent.length < 5000 || bathCareContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-dewy-glow-highlighter-stick-liquid-2026",
    slug: "winter-dewy-glow-highlighter-stick-liquid-2026",
    title: "【2026冬ホリデー・聖夜の濡れツヤ発光】極上スティックハイライト＆生ツヤリキッドハイライターおすすめ人気10選！暖房乾燥でも粉割れ知らずの水光肌徹底解説",
    subtitle: "冬の乾燥くすみを光で飛ばす！シャネル、ディオール、hince、コスメデコルテ、SUQQUなど、バームや美容液リキッドで内側から発光する生ツヤ立体美肌を叶える名品ハイライター10選を美容エディターが徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "冬の乾燥くすみを光で飛ばす！シャネル、ディオール、hince、コスメデコルテ、SUQQUなど、バームや美容液リキッドで内側から発光する生ツヤ立体美肌を叶える名品ハイライター10選を美容エディターが徹底比較！",
    isHallOfFame: true,
    coverImage: highlighterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/highlighter.jpg",
    recommendedItemCodes: highlighterArticles.map(a => a.id),
    contentMarkdown: highlighterContent
  },
  {
    id: "feat-winter-rich-aging-care-night-cream-repair-2026",
    slug: "winter-rich-aging-care-night-cream-repair-2026",
    title: "【2026冬・一晩でしぼみ肌をふっくら押し返す】高機能リッチナイトクリーム＆濃密エイジングケアクリームおすすめ人気10選！暖房砂漠から肌を救う睡眠美容決定版",
    subtitle: "エアコン暖房でしぼんだ大人の冬肌を寝ている間にラッピング再生！カネボウ、コスメデコルテ、エリクシール、SK-II、ランコムなど、翌朝ふっくら弾むハリツヤ肌へ導く最高峰ナイトクリーム10選を皮膚科学目線で徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "エアコン暖房でしぼんだ大人の冬肌を寝ている間にラッピング再生！カネボウ、コスメデコルテ、エリクシール、SK-II、ランコムなど、翌朝ふっくら弾むハリツヤ肌へ導く最高峰ナイトクリーム10選を皮膚科学目線で徹底比較！",
    isHallOfFame: true,
    coverImage: nightCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/nightcream.jpg",
    recommendedItemCodes: nightCreamArticles.map(a => a.id),
    contentMarkdown: nightCreamContent
  },
  {
    id: "feat-winter-holiday-bath-oil-milk-bicarbonate-spa-2026",
    slug: "winter-holiday-bath-oil-milk-bicarbonate-spa-2026",
    title: "【2026冬・極上おうちスパ＆冷え・乾燥肌を至福の香りでほぐす】薬用重炭酸入浴剤＆高保湿バスミルク・ホリデーバスオイルおすすめ人気10選！芯から温まる温活＆冬ギフト決定版",
    subtitle: "芯まで冷え切った冬の身体を深部から温めて全身潤す！アユーラ、BARTH、ヴェレダ、SHIRO、ジョー マローンなど、血行促進と脱衣所乾燥ゼロを叶える名品入浴料＆ホリデーギフト10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "芯まで冷え切った冬の身体を深部から温めて全身潤す！アユーラ、BARTH、ヴェレダ、SHIRO、ジョー マローンなど、血行促進と脱衣所乾燥ゼロを叶える名品入浴料＆ホリデーギフト10選を徹底比較！",
    isHallOfFame: true,
    coverImage: bathCareItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bathcare.jpg",
    recommendedItemCodes: bathCareArticles.map(a => a.id),
    contentMarkdown: bathCareContent
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
