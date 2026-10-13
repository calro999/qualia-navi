import fs from 'fs';
import path from 'path';
import {
  bodyItemsRaw,
  removerItemsRaw,
  washItemsRaw,
  bodyArticles,
  removerArticles,
  washArticles,
  updateArticlesJson
} from './insert_autumn_series12_helper.mjs';

import { getBodyArticleContent } from './autumn_series12_article1_body.mjs';
import { getRemoverArticleContent } from './autumn_series12_article2_remover.mjs';
import { getWashArticleContent } from './autumn_series12_article3_wash.mjs';

console.log('🍂 [2026秋コスメ特集 第12弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const bodyContent = getBodyArticleContent();
const removerContent = getRemoverArticleContent();
const washContent = getWashArticleContent();

console.log(`- 記事1 (秋ボディミルク＆バター10選) 文字数: 約${bodyContent.length}文字`);
console.log(`- 記事2 (秋低刺激アイメイクリムーバー10選) 文字数: 約${removerContent.length}文字`);
console.log(`- 記事3 (秋高保湿ボディウォッシュ10選) 文字数: 約${washContent.length}文字`);

if (bodyContent.length < 5000 || removerContent.length < 5000 || washContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-body-milk-butter-flaky-skin-10",
    slug: "autumn-body-milk-butter-flaky-skin-10",
    title: "【急な冷え込みで全身が白く粉を吹く季節に】高保湿ボディミルク＆濃厚バター10選",
    subtitle: "秋の気温低下と乾燥で粉を吹きやすい腕や脚を濃密保湿！高純度シアバター＆セラミドでベタつかず極上もちもち肌へ導く厳選名品",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 37,
    introText: "秋の気温低下と乾燥で粉を吹きやすい腕や脚を濃密保湿！高純度シアバター＆セラミドでベタつかず極上もちもち肌へ導く厳選名品",
    isHallOfFame: true,
    coverImage: bodyItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodymilk.jpg",
    recommendedItemCodes: bodyArticles.map(a => a.id),
    contentMarkdown: bodyContent
  },
  {
    id: "feat-autumn-eye-makeup-remover-frictionless-10",
    slug: "autumn-eye-makeup-remover-frictionless-10",
    title: "【乾燥で目元が敏感になり摩擦シワが気になる季節に】するんと落ちる低刺激リムーバー10選",
    subtitle: "落ちにくい秋の深色ティントやウォータープルーフマスカラも擦らず瞬時にオフ！植物性エモリエント＆高保湿処方でデリケートな目元と唇をいたわる傑作比較",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 38,
    introText: "落ちにくい秋の深色ティントやウォータープルーフマスカラも擦らず瞬時にオフ！植物性エモリエント＆高保湿処方でデリケートな目元と唇をいたわる傑作比較",
    isHallOfFame: true,
    coverImage: removerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/remover.jpg",
    recommendedItemCodes: removerArticles.map(a => a.id),
    contentMarkdown: removerContent
  },
  {
    id: "feat-autumn-moist-body-wash-dry-itch-10",
    slug: "autumn-moist-body-wash-dry-itch-10",
    title: "【お風呂上がりのカサつき・乾燥かゆみを防ぐ季節に】しっとり潤す高保湿ボディウォッシュ10選",
    subtitle: "秋の熱めのお湯で失われがちなうるおいを洗うたびにチャージ！吸着型ヒアルロン酸や濃密オイル泡で洗い上がりもつっぱらない優秀ボディソープ完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-14",
    readTimeMinutes: 36,
    introText: "秋の熱めのお湯で失われがちなうるおいを洗うたびにチャージ！吸着型ヒアルロン酸や濃密オイル泡で洗い上がりもつっぱらない優秀ボディソープ完全網羅",
    isHallOfFame: true,
    coverImage: washItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodywash.jpg",
    recommendedItemCodes: washArticles.map(a => a.id),
    contentMarkdown: washContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第12弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 第12弾の統合処理がすべて正常に完了しました！');
