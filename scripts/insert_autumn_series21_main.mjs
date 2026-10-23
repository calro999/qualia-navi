// scripts/insert_autumn_series21_main.mjs
import fs from 'fs';
import path from 'path';
import {
  mistItemsRaw,
  peelItemsRaw,
  saltItemsRaw,
  mistArticles,
  peelArticles,
  saltArticles,
  updateArticlesJson
} from './insert_autumn_series21_helper.mjs';

import { getMistArticleContent } from './autumn_series21_article1_mist.mjs';
import { getPeelArticleContent } from './autumn_series21_article2_peel.mjs';
import { getSaltArticleContent } from './autumn_series21_article3_salt.mjs';

console.log('🍂 [2026秋コスメ特集 第21弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const mistContent = getMistArticleContent();
const peelContent = getPeelArticleContent();
const saltContent = getSaltArticleContent();

console.log(`- 記事1 (秋高保湿ミスト化粧水10選) 文字数: 約${mistContent.length}文字`);
console.log(`- 記事2 (秋高保湿ボディピーリング10選) 文字数: 約${peelContent.length}文字`);
console.log(`- 記事3 (秋高純度エプソムソルト10選) 文字数: 約${saltContent.length}文字`);

if (mistContent.length < 5000 || peelContent.length < 5000 || saltContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-hydrating-facial-mist-spray-dry-skin-10",
    slug: "autumn-hydrating-facial-mist-spray-dry-skin-10",
    title: "【暖房と秋風による日中の粉吹き乾燥に】高保湿ミスト化粧水＆オイルインスプレー10選",
    subtitle: "水だけスプレーの過乾燥を防ぐオイルイン2層式＆等張水処方！プロポリスやホワイトトリュフ配合でメイクの上からでも崩さず一日中うるおい水光ツヤ肌を死守する携帯ミスト完全比較",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 38,
    introText: "水だけスプレーの過乾燥を防ぐオイルイン2層式＆等張水処方！プロポリスやホワイトトリュフ配合でメイクの上からでも崩さず一日中うるおい水光ツヤ肌を死守する携帯ミスト完全比較",
    isHallOfFame: true,
    coverImage: mistItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mist.jpg",
    recommendedItemCodes: mistArticles.map(a => a.id),
    contentMarkdown: mistContent
  },
  {
    id: "feat-autumn-body-peeling-gel-rough-elbow-knee-10",
    slug: "autumn-body-peeling-gel-rough-elbow-knee-10",
    title: "【衣類摩擦と乾燥による肘・膝の黒ずみに】薬用高保湿ボディピーリングジェル10選",
    subtitle: "タイツや厚着の摩擦と秋の代謝停滞で硬化した古い角質を摩擦レスに優しくオフ！ハトムギ・CICA・酵素配合で肘・膝・ヒップのザラつきをリセットし吸い付くつるすべ肌へ導く実力派完全ガイド",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 37,
    introText: "タイツや厚着の摩擦と秋の代謝停滞で硬化した古い角質を摩擦レスに優しくオフ！ハトムギ・CICA・酵素配合で肘・膝・ヒップのザラつきをリセットし吸い付くつるすべ肌へ導く実力派完全ガイド",
    isHallOfFame: true,
    coverImage: peelItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/peel.jpg",
    recommendedItemCodes: peelArticles.map(a => a.id),
    contentMarkdown: peelContent
  },
  {
    id: "feat-autumn-epsom-salt-magnesium-bath-cold-soak-10",
    slug: "autumn-epsom-salt-magnesium-bath-cold-soak-10",
    title: "【秋の冷え・むくみ・疲労を芯からほぐす】高純度エプソムソルト・マグネシウム入浴剤10選",
    subtitle: "塩分ゼロで風呂釜を傷めない純度99%硫酸マグネシウムの温活パワー！経皮マグネシウム補給で筋肉の強ばりをゆるめドッサリ深部発汗と極上つるすべ美肌を叶える名品完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 36,
    introText: "塩分ゼロで風呂釜を傷めない純度99%硫酸マグネシウムの温活パワー！経皮マグネシウム補給で筋肉の強ばりをゆるめドッサリ深部発汗と極上つるすべ美肌を叶える名品完全網羅",
    isHallOfFame: true,
    coverImage: saltItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/salt.jpg",
    recommendedItemCodes: saltArticles.map(a => a.id),
    contentMarkdown: saltContent
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
    blogPostsMarker + '\n' + jsonToInsert
  );
  fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第21弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第21弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 21, "slug": "autumn-hydrating-facial-mist-spray-dry-skin-10", "category": "スキンケア", "concern": "秋の暖房乾燥と冷風による日中の肌砂漠化・粉吹き・過乾燥", "shortTitle": "高保湿ミスト化粧水＆オイルインスプレー10選" },
  { "series": 21, "slug": "autumn-body-peeling-gel-rough-elbow-knee-10", "category": "ボディケア", "concern": "衣類摩擦と乾燥による肘・膝・ヒップの黒ずみ・角質肥厚・ザラつき", "shortTitle": "薬用高保湿ボディピーリングジェル10選" },
  { "series": 21, "slug": "autumn-epsom-salt-magnesium-bath-cold-soak-10", "category": "ボディケア", "concern": "秋の冷え込みによる手足の先の冷え・筋肉の強ばり・むくみ", "shortTitle": "高純度エプソムソルト・マグネシウム入浴剤10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第21弾の統合処理がすべて正常に完了しました！');
