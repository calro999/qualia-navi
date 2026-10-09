import fs from 'fs';
import path from 'path';
import {
  lipBalmItemsRaw,
  foundationItemsRaw,
  fragranceItemsRaw,
  lipBalmArticles,
  foundationArticles,
  fragranceArticles
} from './insert_winter_batch71_helper.mjs';

import { getLipBalmArticleContent } from './winter_batch71_article1_lip_balm.mjs';
import { getFoundationArticleContent } from './winter_batch71_article2_foundation.mjs';
import { getFragranceArticleContent } from './winter_batch71_article3_fragrance.mjs';

console.log('🚀 [冬コスメ 第71弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const lipBalmContent = getLipBalmArticleContent();
const foundationContent = getFoundationArticleContent();
const fragranceContent = getFragranceArticleContent();

console.log(`- 記事1 (薬用高保湿リップバーム＆夜用集中マスク) 文字数: 約${lipBalmContent.length}文字`);
console.log(`- 記事2 (高保湿・美容液ファンデーション＆水光クッション) 文字数: 約${foundationContent.length}文字`);
console.log(`- 記事3 (極上ヘアフレグランスミスト＆練り香水) 文字数: 約${fragranceContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (lipBalmContent.length < 5000 || foundationContent.length < 5000 || fragranceContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-medicinal-lip-balm-night-repair-mask-2026",
    slug: "winter-medicinal-lip-balm-night-repair-mask-2026",
    title: "【2026冬・唇の皮剥け＆ひび割れを一夜で修復】薬用高保湿リップバーム＆夜用集中リップトリートメントマスクおすすめ人気10選！オバジ・ラネージュ・キュレル徹底比較！セラミド×ハニー濃密パックで縦じわ・乾燥をリセット＆ぷるんと弾むうるツヤ唇へ",
    subtitle: "11〜12月の木枯らしと寒冷乾燥による唇の皮剥け・ガサガサ・ひび割れを一夜で修復し、ぷるんと弾むうるツヤ唇へと整える集中保湿リップケア10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の木枯らしと寒冷乾燥による唇の皮剥け・ガサガサ・ひび割れを一夜で修復し、ぷるんと弾むうるツヤ唇へと整える集中保湿リップケア10選！",
    isHallOfFame: true,
    coverImage: lipBalmItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipbalm.jpg",
    recommendedItemCodes: lipBalmArticles.map(a => a.id),
    contentMarkdown: lipBalmContent
  },
  {
    id: "feat-winter-serum-foundation-dewy-cushion-moist-2026",
    slug: "winter-serum-foundation-dewy-cushion-moist-2026",
    title: "【2026冬・暖房乾燥でも粉吹き・毛穴落ちゼロ】高保湿・美容液ファンデーション＆生ツヤクッションファンデおすすめ人気10選！資生堂・TIRTIR・クレドポー徹底比較！美容液成分70%超え×高密着スキンケア処方で1日中潤い満ちる光沢水光肌",
    subtitle: "11〜12月の暖房直撃でも粉吹きや毛穴落ちを許さず、美容液成分70%超のうるおいで1日中みずみずしい光沢水光肌をキープする高保湿ファンデーション10選！",
    targetGender: "unisex",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi ベースメイクコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の暖房直撃でも粉吹きや毛穴落ちを許さず、美容液成分70%超のうるおいで1日中みずみずしい光沢水光肌をキープする高保湿ファンデーション10選！",
    isHallOfFame: true,
    coverImage: foundationItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/foundation.jpg",
    recommendedItemCodes: foundationArticles.map(a => a.id),
    contentMarkdown: foundationContent
  },
  {
    id: "feat-winter-hair-fragrance-mist-solid-perfume-2026",
    slug: "winter-hair-fragrance-mist-solid-perfume-2026",
    title: "【2026冬・澄んだ冬空にふんわり香る＆ツヤ髪ケア】極上ヘアフレグランスミスト＆練り香水（ソリッドパフューム）おすすめ人気10選！Dior・SHIRO・シャネル徹底比較！乾燥した冬髪に潤いと上質なアロマを纏うホリデーギフト＆モテ香水決定版",
    subtitle: "11〜12月の澄んだ空気やイルミネーションデートに映える、冬髪の乾燥パサつきと静電気を防ぎながらふんわり上質に香るヘアフレグランス＆練り香水10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の澄んだ空気やイルミネーションデートに映える、冬髪の乾燥パサつきと静電気を防ぎながらふんわり上質に香るヘアフレグランス＆練り香水10選！",
    isHallOfFame: true,
    coverImage: fragranceItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/fragrance.jpg",
    recommendedItemCodes: fragranceArticles.map(a => a.id),
    contentMarkdown: fragranceContent
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
  console.log('✅ src/data.ts に第71弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
