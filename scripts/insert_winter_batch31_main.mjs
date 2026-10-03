import fs from 'fs';
import path from 'path';
import {
  glitterItemsRaw,
  mascaraBaseItemsRaw,
  peelingItemsRaw,
  glitterArticles,
  mascaraBaseArticles,
  peelingArticles
} from './insert_winter_batch31_helper.mjs';

import { getGlitterArticleContent } from './winter_batch31_article1_glitter.mjs';
import { getMascaraBaseArticleContent } from './winter_batch31_article2_mascara_base.mjs';
import { getPeelingArticleContent } from './winter_batch31_article3_peeling.mjs';

console.log('🚀 [冬コスメ 第31弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const glitterContent = getGlitterArticleContent();
const mascaraBaseContent = getMascaraBaseArticleContent();
const peelingContent = getPeelingArticleContent();

console.log(`- 記事1 (リキッドグリッター) 文字数: 約${glitterContent.length}文字`);
console.log(`- 記事2 (マスカラ下地) 文字数: 約${mascaraBaseContent.length}文字`);
console.log(`- 記事3 (ピーリングジェル) 文字数: 約${peelingContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (glitterContent.length < 5000 || mascaraBaseContent.length < 5000 || peelingContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-sparkle-glitter-eyeliner-liquid-holiday-2026",
    slug: "winter-sparkle-glitter-eyeliner-liquid-holiday-2026",
    title: "【2026冬ホリデー・イルミネーション映え瞳】大粒ラメ＆高密着リキッドグリッターライナーおすすめ人気10選！パリパリ割れ・ラメ落ちゼロで夜まで澄んだきらめきをキープする決定版",
    subtitle: "冬の澄んだ夜空や街のイルミネーションに映える宝石のようなうるみ目を演出！暖房乾燥やまばたきの動きに負けない柔軟性密着フィルム採用リキッドグリッターを徹底検証。CipiCipi（シピシピ）、Wonjungyo（ウォンジョンヨ）、rom&nd、Ririmew、ETUDE、キャンメイクなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 16,
    introText: "冬の澄んだ夜空や街のイルミネーションに映える宝石のようなうるみ目を演出！暖房乾燥やまばたきの動きに負けない柔軟性密着フィルム採用リキッドグリッターを徹底検証。CipiCipi（シピシピ）、Wonjungyo（ウォンジョンヨ）、rom&nd、Ririmew、ETUDE、キャンメイクなど厳選10選！",
    isHallOfFame: true,
    coverImage: glitterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/glitter.jpg",
    recommendedItemCodes: glitterArticles.map(a => a.id),
    contentMarkdown: glitterContent
  },
  {
    id: "feat-winter-curl-lock-mascara-base-primer-2026",
    slug: "winter-curl-lock-mascara-base-primer-2026",
    title: "【2026冬・寒風＆呼気湿気でも下がらない】最強カールキープマスカラ下地＆マスカラベースおすすめ人気10選！マフラー・マスクの湿気を完全遮断して一日中上向き美束まつ毛をキープする決定版",
    subtitle: "首元のマフラーやマスクから吹き上がる温かい呼気スチームによるまつ毛の下垂・結露を完全ブロック！完全撥水ワックスと超軽量ポリマーで夜まで上向き扇状アーチを形状記憶する神下地を徹底比較。エレガンス、キャンメイク、エテュセ、ケイト、ピメル、ヒロインメイク、ディオールなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 16,
    introText: "首元のマフラーやマスクから吹き上がる温かい呼気スチームによるまつ毛の下垂・結露を完全ブロック！完全撥水ワックスと超軽量ポリマーで夜まで上向き扇状アーチを形状記憶する神下地を徹底比較。エレガンス、キャンメイク、エテュセ、ケイト、ピメル、ヒロインメイク、ディオールなど厳選10選！",
    isHallOfFame: true,
    coverImage: mascaraBaseItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mascara_base.jpg",
    recommendedItemCodes: mascaraBaseArticles.map(a => a.id),
    contentMarkdown: mascaraBaseContent
  },
  {
    id: "feat-winter-gentle-peeling-gel-exfoliating-gommage-2026",
    slug: "winter-gentle-peeling-gel-exfoliating-gommage-2026",
    title: "【2026冬・ゴワつき＆化粧水が入らない肌を即効つるすべ】低刺激角質ピーリングジェル＆マイルドゴマージュおすすめ人気10選！古い角質をポロポロ除去して吸い付くモチ肌を蘇らせる冬の角質ケア決定版",
    subtitle: "冬の寒冷乾燥で分厚く硬くなった古い老廃角質（角質肥厚）をやさしく巻き取って脱ぎ捨てる！摩擦レスな美容液ジェルでスキンケアの浸透力を劇的にブーストし、翌朝のメイクのりを最高に高めるレスキュー角質ケアを徹底検証。Cure（キュア）、ロゼット、オルビス、DETクリア、プリュなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 16,
    introText: "冬の寒冷乾燥で分厚く硬くなった古い老廃角質（角質肥厚）をやさしく巻き取って脱ぎ捨てる！摩擦レスな美容液ジェルでスキンケアの浸透力を劇的にブーストし、翌朝のメイクのりを最高に高めるレスキュー角質ケアを徹底検証。Cure（キュア）、ロゼット、オルビス、DETクリア、プリュなど厳選10選！",
    isHallOfFame: true,
    coverImage: peelingItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/peeling.jpg",
    recommendedItemCodes: peelingArticles.map(a => a.id),
    contentMarkdown: peelingContent
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
