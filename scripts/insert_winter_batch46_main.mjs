import fs from 'fs';
import path from 'path';
import {
  azelaicItemsRaw,
  fermentedItemsRaw,
  colortreatmentItemsRaw,
  azelaicArticles,
  fermentedArticles,
  colortreatmentArticles
} from './insert_winter_batch46_helper.mjs';

import { getAzelaicArticleContent } from './winter_batch46_article1_azelaic.mjs';
import { getFermentedArticleContent } from './winter_batch46_article2_fermented.mjs';
import { getColorTreatmentArticleContent } from './winter_batch46_article3_colortreatment.mjs';

console.log('🚀 [冬コスメ 第46弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const azelaicContent = getAzelaicArticleContent();
const fermentedContent = getFermentedArticleContent();
const colortreatmentContent = getColorTreatmentArticleContent();

console.log(`- 記事1 (高濃度アゼライン酸美容液＆クリーム) 文字数: 約${azelaicContent.length}文字`);
console.log(`- 記事2 (発酵スキンケア＆ガラクトミセス・コメ発酵液) 文字数: 約${fermentedContent.length}文字`);
console.log(`- 記事3 (サロン級カラートリートメント＆カラーシャンプー) 文字数: 約${colortreatmentContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (azelaicContent.length < 5000 || fermentedContent.length < 5000 || colortreatmentContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-azelaic-acid-serum-barrier-cream-redness-2026",
    slug: "winter-azelaic-acid-serum-barrier-cream-redness-2026",
    title: "【2026冬・寒暖差の赤ら顔＆皮脂ゆらぎ肌を集中鎮静】高濃度アゼライン酸美容液＆アゼライン酸バリアクリームおすすめ人気10選！冬の大人ニキビ・酒さ・毛穴詰まりを皮膚科学発想で根本ケアする名品徹底比較",
    subtitle: "寒暖差の赤み・酒さ・大人ニキビ・冬の酸化毛穴詰まりを撃退！ロート製薬DRX、コスデバハ、KISO、トゥヴェール、ジオーディナリーなど、皮膚科学発想で冬のゆらぎ肌を鎮静する最新アゼライン酸コスメ10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 26,
    introText: "寒暖差の赤み・酒さ・大人ニキビ・冬の酸化毛穴詰まりを撃退！ロート製薬DRX、コスデバハ、KISO、トゥヴェール、ジオーディナリーなど、皮膚科学発想で冬のゆらぎ肌を鎮静する最新アゼライン酸コスメ10選を徹底比較！",
    isHallOfFame: true,
    coverImage: azelaicItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/azelaic.jpg",
    recommendedItemCodes: azelaicArticles.map(a => a.id),
    contentMarkdown: azelaicContent
  },
  {
    id: "feat-winter-fermented-skincare-galactomyces-rice-biotech-2026",
    slug: "winter-fermented-skincare-galactomyces-rice-biotech-2026",
    title: "【2026冬・寒さで硬化した角層を解きほぐす発酵バイオの力】発酵スキンケア＆ガラクトミセス・コメ発酵液・酵母コスメおすすめ人気10選！冬の砂漠肌・くすみ・ゴワつきを自生力で底上げする名品徹底比較",
    subtitle: "どれだけ塗っても浸透しない真冬の硬化角層を微生物の恵みで解きほぐす！SK-IIピテラ、魔女工場、アルビオンフローラドリップ、ONE BY KOSEライスパワー、ランコム美肌菌など、自ら潤う肌を育てる冬の本命発酵コスメ10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 26,
    introText: "どれだけ塗っても浸透しない真冬の硬化角層を微生物の恵みで解きほぐす！SK-IIピテラ、魔女工場、アルビオンフローラドリップ、ONE BY KOSEライスパワー、ランコム美肌菌など、自ら潤う肌を育てる冬の本命発酵コスメ10選を徹底比較！",
    isHallOfFame: true,
    coverImage: fermentedItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/fermented.jpg",
    recommendedItemCodes: fermentedArticles.map(a => a.id),
    contentMarkdown: fermentedContent
  },
  {
    id: "feat-winter-salon-color-treatment-shampoo-hair-repair-2026",
    slug: "winter-salon-color-treatment-shampoo-hair-repair-2026",
    title: "【2026冬・美容室に行けない年末の褪色・白髪を艶やかにリセット】サロン級カラートリートメント＆カラーシャンプーおすすめ人気10選！クリスマス・忘年会前の緊急ツヤ色チャージ＆傷まないヘアカラー徹底比較",
    subtitle: "年末のサロン予約が取れない！忘年会やイベント直前の白髪・黄ばみ・褪色を自宅で傷めず艶やかに緊急リセット！クレイエンス、利尻ヘアカラー、クオルシア、ソマルカ、サイオス、N.など、真冬の乾燥毛をしっとり守るサロン級ヘアカラー10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 26,
    introText: "年末のサロン予約が取れない！忘年会やイベント直前の白髪・黄ばみ・褪色を自宅で傷めず艶やかに緊急リセット！クレイエンス、利尻ヘアカラー、クオルシア、ソマルカ、サイオス、N.など、真冬の乾燥毛をしっとり守るサロン級ヘアカラー10選を徹底比較！",
    isHallOfFame: true,
    coverImage: colortreatmentItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/colortreatment.jpg",
    recommendedItemCodes: colortreatmentArticles.map(a => a.id),
    contentMarkdown: colortreatmentContent
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

console.log('🎉 第46弾の全記事統合処理が正常に完了しました！');
