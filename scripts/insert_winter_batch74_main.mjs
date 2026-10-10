import fs from 'fs';
import path from 'path';
import {
  boosterItemsRaw,
  mistItemsRaw,
  lipItemsRaw,
  boosterArticles,
  mistArticles,
  lipArticles
} from './insert_winter_batch74_helper.mjs';

import { getBoosterArticleContent } from './winter_batch74_article1_booster.mjs';
import { getMistArticleContent } from './winter_batch74_article2_mist.mjs';
import { getLipArticleContent } from './winter_batch74_article3_lip.mjs';

console.log('🚀 [冬コスメ 第74弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const boosterContent = getBoosterArticleContent();
const mistContent = getMistArticleContent();
const lipContent = getLipArticleContent();

console.log(`- 記事1 (高保湿導入美容液＆角質浸透導入液) 文字数: 約${boosterContent.length}文字`);
console.log(`- 記事2 (高保湿フィックスミスト＆メイクキープミスト) 文字数: 約${mistContent.length}文字`);
console.log(`- 記事3 (深みボルドー＆ショコラブラウン高保湿リップ) 文字数: 約${lipContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (boosterContent.length < 5000 || mistContent.length < 5000 || lipContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-penetration-booster-serum-first-essence-2026",
    slug: "winter-penetration-booster-serum-first-essence-2026",
    title: "【2026冬・暖房乾燥＆冷気で硬化したゴワつき肌を解きほぐす】高保湿導入美容液（ブースター）＆角質浸透導入液おすすめ人気10選！コスメデコルテ・SOFINA iP・ランコム・タカミ徹底比較！浸透ルート開通で砂漠肌がぐんぐん水分を飲み込む",
    subtitle: "11〜12月の急激な気温低下とエアコン暖房で硬くなった真冬の角質を瞬時に解きほぐし、後から使う化粧水や濃密クリームの浸透力を劇的に高める高保湿導入美容液10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 32,
    introText: "11〜12月の急激な気温低下とエアコン暖房で硬くなった真冬の角質を瞬時に解きほぐし、後から使う化粧水や濃密クリームの浸透力を劇的に高める高保湿導入美容液10選！",
    isHallOfFame: true,
    coverImage: boosterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/booster.jpg",
    recommendedItemCodes: boosterArticles.map(a => a.id),
    contentMarkdown: boosterContent
  },
  {
    id: "feat-winter-hydrating-makeup-fix-mist-setting-spray-2026",
    slug: "winter-hydrating-makeup-fix-mist-setting-spray-2026",
    title: "【2026冬・暖房砂漠＆寒暖差テカリを完全ブロック】高保湿フィックスミスト＆美容液メイクキープミストおすすめ人気10選！コスメデコルテ・コーセー・クラランス・ダルバ徹底比較！オイルイン2層式ヴェールで夕方まで崩れない・乾かない濡れツヤ肌",
    subtitle: "11〜12月の過酷な室内暖房乾燥やマフラー・マスクの摩擦によるメイク崩れ・粉吹きを防ぎ、2層式オイルヴェールでうるおいとメイクを1日中キープする高保湿フィックスミスト10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 31,
    introText: "11〜12月の過酷な室内暖房乾燥やマフラー・マスクの摩擦によるメイク崩れ・粉吹きを防ぎ、2層式オイルヴェールでうるおいとメイクを1日中キープする高保湿フィックスミスト10選！",
    isHallOfFame: true,
    coverImage: mistItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mist.jpg",
    recommendedItemCodes: mistArticles.map(a => a.id),
    contentMarkdown: mistContent
  },
  {
    id: "feat-winter-deep-bordeaux-brown-rich-moist-lip-rouge-2026",
    slug: "winter-deep-bordeaux-brown-rich-moist-lip-rouge-2026",
    title: "【2026冬ホリデー・コート＆マフラーに映える大人顔】深みボルドー＆ショコラブラウン高保湿リップおすすめ人気10選！KATEリップモンスター・ディオール・ロムアンド徹底比較！むっちり肉厚ツヤ×縦ジワ消滅で冬のくすみ肌を瞬時に華やかに",
    subtitle: "11〜12月の冬ファッションに華やかな血色感と洗練された深みを与え、乾燥で荒れがちな唇を濃密オイルとジェル膜でむっちり包み込む高保湿ルージュ＆ティント10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 30,
    introText: "11〜12月の冬ファッションに華やかな血色感と洗練された深みを与え、乾燥で荒れがちな唇を濃密オイルとジェル膜でむっちり包み込む高保湿ルージュ＆ティント10選！",
    isHallOfFame: true,
    coverImage: lipItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lip.jpg",
    recommendedItemCodes: lipArticles.map(a => a.id),
    contentMarkdown: lipContent
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
  console.log('✅ src/data.ts に第74弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
