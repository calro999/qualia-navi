import fs from 'fs';
import path from 'path';
import {
  oilLotionItemsRaw,
  headSpaItemsRaw,
  magnetNailItemsRaw,
  oilLotionArticles,
  headSpaArticles,
  magnetNailArticles,
  updateArticlesJson
} from './insert_winter_batch83_helper.mjs';

import { getOilLotionArticleContent } from './winter_batch83_article1_oil_lotion.mjs';
import { getHeadSpaArticleContent } from './winter_batch83_article2_head_spa.mjs';
import { getMagnetNailArticleContent } from './winter_batch83_article3_magnet_nail.mjs';

console.log('🚀 [冬コスメ 第83弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const oilLotionContent = getOilLotionArticleContent();
const headSpaContent = getHeadSpaArticleContent();
const magnetNailContent = getMagnetNailArticleContent();

console.log(`- 記事1 (2層式オイルイン化粧水) 文字数: 約${oilLotionContent.length}文字`);
console.log(`- 記事2 (温感ヘッドスパ) 文字数: 約${headSpaContent.length}文字`);
console.log(`- 記事3 (マグネットネイル) 文字数: 約${magnetNailContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (oilLotionContent.length < 5000 || headSpaContent.length < 5000 || magnetNailContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-winter-biphasic-oil-in-lotion-mist-essence-2026",
    slug: "winter-biphasic-oil-in-lotion-mist-essence-2026",
    title: "【2026冬・暖房砂漠を生き抜く水分油分黄金比】2層式オイルイン化粧水＆シェイクローションおすすめ人気10選！KANEBO・ダルバ・RMK・ファミュ徹底比較！角層深層までうるおいを閉じ込めインナードライを根絶する至高の二層式ミスト＆トナー",
    subtitle: "11〜12月の気温低下とエアコン暖房による極度のインナードライ・粉吹き肌を救う、水分とオイルの黄金比率で角層深くまで浸透密閉する2層式オイルイン化粧水10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 35,
    introText: "11〜12月の気温低下とエアコン暖房による極度のインナードライ・粉吹き肌を救う、水分とオイルの黄金比率で角層深くまで浸透密閉する2層式オイルイン化粧水10選！",
    isHallOfFame: true,
    coverImage: oilLotionItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/oillotion.jpg",
    recommendedItemCodes: oilLotionArticles.map(a => a.id),
    contentMarkdown: oilLotionContent
  },
  {
    id: "feat-winter-warming-head-spa-scalp-cleansing-gel-2026",
    slug: "winter-warming-head-spa-scalp-cleansing-gel-2026",
    title: "【2026冬・寒冷血行不良＆カチコチ頭皮を解きほぐす】温感ヘッドスパ＆スカルプ温感クレンジングジェルおすすめ人気10選！ルメント・ヴェレダ・スティーブンノル・ファンケル徹底比較！じんわり温まる至福の温感マッサージで毛穴の酸化皮脂を一掃し美髪を育む",
    subtitle: "11〜12月の寒さで強張り血行不良になった頭皮を温感効果でじんわり解きほぐし、毛穴に詰まった酸化皮脂を除去して美髪の土台を育む温感スカルプクレンジング10選！",
    targetGender: "unisex",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 36,
    introText: "11〜12月の寒さで強張り血行不良になった頭皮を温感効果でじんわり解きほぐし、毛穴に詰まった酸化皮脂を除去して美髪の土台を育む温感スカルプクレンジング10選！",
    isHallOfFame: true,
    coverImage: headSpaItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/headspa.jpg",
    recommendedItemCodes: headSpaArticles.map(a => a.id),
    contentMarkdown: headSpaContent
  },
  {
    id: "feat-winter-magnetic-gel-nail-cat-eye-holiday-kit-2026",
    slug: "winter-magnetic-gel-nail-cat-eye-holiday-kit-2026",
    title: "【2026冬・聖夜の指先を彩る幻想的な奥行きときらめき】マグネットネイル＆ホリデーセルフジェルネイルキットおすすめ人気10選！ネイル工房・ネイルタウン・GelMe1・TOY's×INITY徹底比較！磁石で自在に操る微粒子キャッツアイ＆うるうるぷるマグ完全攻略",
    subtitle: "11〜12月のクリスマスやホリデーイベントに向けて、磁石の力で幻想的な奥行きと濡れツヤ光沢を生み出すサロン級マグネットジェルネイル＆スターターキット10選！",
    targetGender: "unisex",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi メイクコレクター / ベース＆パーツメイク担当",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-12",
    readTimeMinutes: 34,
    introText: "11〜12月のクリスマスやホリデーイベントに向けて、磁石の力で幻想的な奥行きと濡れツヤ光沢を生み出すサロン級マグネットジェルネイル＆スターターキット10選！",
    isHallOfFame: true,
    coverImage: magnetNailItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/magnetnail.jpg",
    recommendedItemCodes: magnetNailArticles.map(a => a.id),
    contentMarkdown: magnetNailContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に新規3特集記事を追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 第83弾の特集記事および商品記事の統合が完了しました！');
