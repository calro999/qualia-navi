import fs from 'fs';
import path from 'path';
import {
  microneedleItemsRaw,
  emulsionItemsRaw,
  handwashItemsRaw,
  microneedleArticles,
  emulsionArticles,
  handwashArticles
} from './insert_winter_batch45_helper.mjs';

import { getMicroneedleArticleContent } from './winter_batch45_article1_microneedle.mjs';
import { getEmulsionArticleContent } from './winter_batch45_article2_emulsion.mjs';
import { getHandwashArticleContent } from './winter_batch45_article3_handwash.mjs';

console.log('🚀 [冬コスメ 第45弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const microneedleContent = getMicroneedleArticleContent();
const emulsionContent = getEmulsionArticleContent();
const handwashContent = getHandwashArticleContent();

console.log(`- 記事1 (塗るマイクロニードル美容液) 文字数: 約${microneedleContent.length}文字`);
console.log(`- 記事2 (高保湿乳液＆濃密バリアエマルジョン) 文字数: 約${emulsionContent.length}文字`);
console.log(`- 記事3 (高保湿フレグランスハンドソープ) 文字数: 約${handwashContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (microneedleContent.length < 5000 || emulsionContent.length < 5000 || handwashContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-microneedle-spicule-serum-pore-lift-2026",
    slug: "winter-microneedle-spicule-serum-pore-lift-2026",
    title: "【2026冬・浸透しないゴワつき砂漠肌を突き破る針美容】塗るマイクロニードル美容液＆スピキュール導入セラムおすすめ人気10選！天然微細針×CICA・PDRNで冬の毛穴・ハリ・弾力を底上げする名品徹底比較",
    subtitle: "冬の寒冷で硬化した角層を心地よいチクチク刺激で突破！VTリードルショット、PDRNリターン、ナンバーズイン、イニスフリー、ドクターペプチなど、角層奥深くまで美容成分を届けて翌朝ツヤツヤ水光肌を叶える本命針コスメ10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 25,
    introText: "冬の寒冷で硬化した角層を心地よいチクチク刺激で突破！VTリードルショット、PDRNリターン、ナンバーズイン、イニスフリー、ドクターペプチなど、角層奥深くまで美容成分を届けて翌朝ツヤツヤ水光肌を叶える本命針コスメ10選を徹底比較！",
    isHallOfFame: true,
    coverImage: microneedleItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/needle.jpg",
    recommendedItemCodes: microneedleArticles.map(a => a.id),
    contentMarkdown: microneedleContent
  },
  {
    id: "feat-winter-rich-moist-hydrating-emulsion-milk-2026",
    slug: "winter-rich-moist-hydrating-emulsion-milk-2026",
    title: "【2026冬・化粧水が逃げない潤いシールド＆極上もち肌】高保湿乳液＆濃密バリアエマルジョンおすすめ人気10選！ヒト型セラミド・先行乳液・リッチミルクで冬の粉ふき・インナードライを完全防備する名品徹底比較",
    subtitle: "化粧水をいくら重ねても乾く砂漠肌・粉ふき・インナードライを完全ブロック！コスメデコルテ、アルビオン、エリクシール、ミノン、キュレル、ポーラB.Aなど、水分油分の黄金比でラメラ構造を整える冬の本命高保湿乳液10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 25,
    introText: "化粧水をいくら重ねても乾く砂漠肌・粉ふき・インナードライを完全ブロック！コスメデコルテ、アルビオン、エリクシール、ミノン、キュレル、ポーラB.Aなど、水分油分の黄金比でラメラ構造を整える冬の本命高保湿乳液10選を徹底検証！",
    isHallOfFame: true,
    coverImage: emulsionItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/emulsion.jpg",
    recommendedItemCodes: emulsionArticles.map(a => a.id),
    contentMarkdown: emulsionContent
  },
  {
    id: "feat-winter-holiday-fragrance-hand-wash-gift-2026",
    slug: "winter-holiday-fragrance-hand-wash-gift-2026",
    title: "【2026冬・ホリデーギフト＆手肌を労わる贅沢アロマケア】高保湿フレグランスハンドソープ＆濃密リキッドハンドウォッシュおすすめ人気10選！Aesop・SHIRO・ジョーマローン・BAUMなど11-12月のクリスマスプレゼントや冬の乾燥手荒れを防ぐ名品徹底比較",
    subtitle: "手洗い後のピキピキ乾燥・あかぎれを防ぎ、バスルームを至福のアロマで満たす！Aesop、ジョーマローン、SHIRO、BAUM、モルトンブラウンなど、11〜12月のクリスマスギフトや自分へのご褒美に絶対外さない高保湿ハンドウォッシュ10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 25,
    introText: "手洗い後のピキピキ乾燥・あかぎれを防ぎ、バスルームを至福のアロマで満たす！Aesop、ジョーマローン、SHIRO、BAUM、モルトンブラウンなど、11〜12月のクリスマスギフトや自分へのご褒美に絶対外さない高保湿ハンドウォッシュ10選を徹底比較！",
    isHallOfFame: true,
    coverImage: handwashItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/handwash.jpg",
    recommendedItemCodes: handwashArticles.map(a => a.id),
    contentMarkdown: handwashContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に新規3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 [冬コスメ 第45弾] 3記事の統合がすべて完了しました！');
