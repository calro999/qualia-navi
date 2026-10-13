import fs from 'fs';
import path from 'path';
import {
  handItemsRaw,
  hairItemsRaw,
  lipCareItemsRaw,
  handArticles,
  hairArticles,
  lipCareArticles,
  updateArticlesJson
} from './insert_autumn_series4_helper.mjs';

import { getHandArticleContent } from './autumn_series4_article1_hand.mjs';
import { getHairArticleContent } from './autumn_series4_article2_hair.mjs';
import { getLipCareArticleContent } from './autumn_series4_article3_lipcare.mjs';

console.log('🍂 [2026秋コスメ特集 第4弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const handContent = getHandArticleContent();
const hairContent = getHairArticleContent();
const lipCareContent = getLipCareArticleContent();

console.log(`- 記事1 (秋ハンド＆ネイルケア10選) 文字数: 約${handContent.length}文字`);
console.log(`- 記事2 (秋ヘアオイル＆ミルク10選) 文字数: 約${hairContent.length}文字`);
console.log(`- 記事3 (秋リップマスク＆スクラブ10選) 文字数: 約${lipCareContent.length}文字`);

if (handContent.length < 5000 || hairContent.length < 5000 || lipCareContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-hand-cream-nail-oil-chapped-10",
    slug: "autumn-hand-cream-nail-oil-chapped-10",
    title: "【水仕事や冷たい風で手肌が荒れる季節に】うるおい密着でベタつかない！秋の高保湿ハンドクリーム＆ネイルオイル10選",
    subtitle: "指先のカサつき・ささくれ・手荒れを即鎮静！スマホやPC操作も快適な高保湿ハンド＆ネイルケア完全比較",
    targetGender: "unisex",
    authorId: "author-inoue",
    authorName: "井上 さくら",
    authorRole: "Qualia Navi リップケアコレクター / リップ部門専属",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "指先のカサつき・ささくれ・手荒れを即鎮静！スマホやPC操作も快適な高保湿ハンド＆ネイルケア完全比較",
    isHallOfFame: true,
    coverImage: handItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hand.jpg",
    recommendedItemCodes: handArticles.map(a => a.id),
    contentMarkdown: handContent
  },
  {
    id: "feat-autumn-hair-oil-milk-dry-frizz-10",
    slug: "autumn-hair-oil-milk-dry-frizz-10",
    title: "【パサつきと静電気が気になる季節に】毛先までとぅるんとまとまる！秋の高保湿ヘアオイル＆ヘアミルク10選",
    subtitle: "夏の紫外線ダメージと秋の乾燥風による広がり・枝毛を集中補修！サロン帰りのサラツヤ美髪へ導くアウトバストリートメント",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長 / メンズ＆ユニセックス美容担当",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "夏の紫外線ダメージと秋の乾燥風による広がり・枝毛を集中補修！サロン帰りのサラツヤ美髪へ導くアウトバストリートメント",
    isHallOfFame: true,
    coverImage: hairItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair.jpg",
    recommendedItemCodes: hairArticles.map(a => a.id),
    contentMarkdown: hairContent
  },
  {
    id: "feat-autumn-lip-sleeping-mask-scrub-peeling-10",
    slug: "autumn-lip-sleeping-mask-scrub-peeling-10",
    title: "【唇の皮剥けと縦ジワが気になる季節に】翌朝ぷるんと生き返る！秋の濃厚リップマスク＆リップスクラブ10選",
    subtitle: "秋風によるガサガサ唇・口紅が乗らない悩みを解消！就寝中の濃密ラップ保湿と角質オフでふっくら血色唇へ",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 34,
    introText: "秋風によるガサガサ唇・口紅が乗らない悩みを解消！就寝中の濃密ラップ保湿と角質オフでふっくら血色唇へ",
    isHallOfFame: true,
    coverImage: lipCareItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipcare.jpg",
    recommendedItemCodes: lipCareArticles.map(a => a.id),
    contentMarkdown: lipCareContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの秋コスメ第4弾特集記事を追加しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 2026秋コスメ特集 第4弾 全3記事（各10商品レビュー、合計30商品）のデータベース登録が完了しました！');
