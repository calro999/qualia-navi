import fs from 'fs';
import path from 'path';
import {
  concealerItemsRaw,
  dryShampooItemsRaw,
  mascaraRemoverItemsRaw,
  concealerArticles,
  dryShampooArticles,
  mascaraRemoverArticles
} from './insert_winter_batch78_helper.mjs';

import { getConcealerPaletteArticleContent } from './winter_batch78_article1_concealer_palette.mjs';
import { getDryShampooArticleContent } from './winter_batch78_article2_dry_shampoo.mjs';
import { getMascaraRemoverArticleContent } from './winter_batch78_article3_mascara_remover.mjs';

console.log('🚀 [冬コスメ 第78弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const concealerContent = getConcealerPaletteArticleContent();
const dryShampooContent = getDryShampooArticleContent();
const mascaraRemoverContent = getMascaraRemoverArticleContent();

console.log(`- 記事1 (コンシーラーパレット) 文字数: 約${concealerContent.length}文字`);
console.log(`- 記事2 (ドライシャンプー＆前髪パウダー) 文字数: 約${dryShampooContent.length}文字`);
console.log(`- 記事3 (マスカラリムーバー＆ポイントリムーバー) 文字数: 約${mascaraRemoverContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (concealerContent.length < 5000 || dryShampooContent.length < 5000 || mascaraRemoverContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-concealer-palette-color-correcting-2026",
    slug: "winter-concealer-palette-color-correcting-2026",
    title: "【2026冬・寒冷クマ＆乾燥小じわ・赤みを消し去る】高密着コンシーラーパレット＆マルチカラー補正コンシーラーおすすめ人気10選！コスメデコルテ・&be・IPSA・エクセル徹底比較！美容液成分イン×薄膜密着で夕方までひび割れ・ヨレゼロ",
    subtitle: "11〜12月の寒冷による青グマや暖房乾燥による目元の小じわ割れ・赤みを、美容液成分と高密着薄膜で夕方まで自然に消し去るコンシーラーパレット10選！",
    targetGender: "unisex",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi ベースメイクコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 33,
    introText: "11〜12月の寒冷による青グマや暖房乾燥による目元の小じわ割れ・赤みを、美容液成分と高密着薄膜で夕方まで自然に消し去るコンシーラーパレット10選！",
    isHallOfFame: true,
    coverImage: concealerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/concealer.jpg",
    recommendedItemCodes: concealerArticles.map(a => a.id),
    contentMarkdown: concealerContent
  },
  {
    id: "feat-winter-refresh-dry-shampoo-scalp-powder-mist-2026",
    slug: "winter-refresh-dry-shampoo-scalp-powder-mist-2026",
    title: "【2026冬・暖房ムレ頭皮のニオイ＆夕方のペタンコ前髪を一瞬でリセット】高機能ドライシャンプー＆頭皮リフレッシュスプレー・パウダーおすすめ人気10選！ダイアン・フジコ・スティーブンノル・ザプロダクト徹底比較！水なしで頭皮スッキリ＆根本ふんわり立ち上げ",
    subtitle: "11〜12月の厚着やマフラー・強暖房による頭皮ムレや夕方のペタンコ前髪を一瞬でリセットし、水なしで清潔感とうるおいを両立する高機能ドライシャンプー10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 34,
    introText: "11〜12月の厚着やマフラー・強暖房による頭皮ムレや夕方のペタンコ前髪を一瞬でリセットし、水なしで清潔感とうるおいを両立する高機能ドライシャンプー10選！",
    isHallOfFame: true,
    coverImage: dryShampooItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/dryshampoo.jpg",
    recommendedItemCodes: dryShampooArticles.map(a => a.id),
    contentMarkdown: dryShampooContent
  },
  {
    id: "feat-winter-gentle-mascara-remover-point-makeup-cleanse-2026",
    slug: "winter-gentle-mascara-remover-point-makeup-cleanse-2026",
    title: "【2026冬・乾燥まぶたを擦らずスルンと落とす】マスカラリムーバー＆高保湿ポイントメイクリムーバーおすすめ人気10選！ヒロインメイク・キャンメイク・ビフェスタ・ランコム徹底比較！冬の乾燥小じわ・色素沈着・まつ毛切れ毛を防ぐ摩擦ゼロクレンジング",
    subtitle: "11〜12月の冬の乾燥でデリケートになった目元・口元をゴシゴシ擦らず、強力ウォータープルーフやティントをスルンと落として色素沈着・小じわを防ぐ摩擦ゼロリムーバー10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 32,
    introText: "11〜12月の冬の乾燥でデリケートになった目元・口元をゴシゴシ擦らず、強力ウォータープルーフやティントをスルンと落として色素沈着・小じわを防ぐ摩擦ゼロリムーバー10選！",
    isHallOfFame: true,
    coverImage: mascaraRemoverItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/remover.jpg",
    recommendedItemCodes: mascaraRemoverArticles.map(a => a.id),
    contentMarkdown: mascaraRemoverContent
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

console.log('🎉 第78弾の特集記事および商品記事の統合が完了しました！');
