import fs from 'fs';
import path from 'path';
import {
  coffretItemsRaw,
  bodyOilItemsRaw,
  cushionItemsRaw,
  coffretArticles,
  bodyOilArticles,
  cushionArticles
} from './insert_winter_batch10_helper.mjs';

import { getCoffretArticleContent } from './winter_batch10_article1_coffret.mjs';
import { getBodyoilArticleContent } from './winter_batch10_article2_bodyoil.mjs';
import { getCushionArticleContent } from './winter_batch10_article3_cushion.mjs';

console.log('🚀 [冬コスメ 第10弾] 特集記事の生成と data.ts への統合を開始します...');

const coffretContent = getCoffretArticleContent();
const bodyoilContent = getBodyoilArticleContent();
const cushionContent = getCushionArticleContent();

console.log(`- 記事1 (クリスマスコフレ) 文字数: 約${coffretContent.length}文字`);
console.log(`- 記事2 (ボディオイル＆マッサージ) 文字数: 約${bodyoilContent.length}文字`);
console.log(`- 記事3 (クッションファンデ＆BB) 文字数: 約${cushionContent.length}文字`);

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-coffret-makeup-kit-2026",
    slug: "winter-holiday-coffret-makeup-kit-2026",
    title: "【2026ホリデー限定】クリスマスコフレ＆限定メイクアップキット人気おすすめ10選！年に一度の特別な輝きをまとう豪華コスメセット徹底比較",
    subtitle: "11〜12月最大の美容イベント！コスメデコルテ、ジルスチュアート、ディオール、RMK、ルナソル、シュウウエムラなど、憧れデパコスからバズりプチプラまで、年に一度の贅沢な限定カラー＆豪華パレット・ポーチ付きコフレを徹底比較。プロ直伝の普段使い着回しメイク術も大公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 16,
    introText: "11〜12月最大の美容イベント！コスメデコルテ、ジルスチュアート、ディオール、RMK、ルナソル、シュウウエムラなど、憧れデパコスからバズりプチプラまで、年に一度の贅沢な限定カラー＆豪華パレット・ポーチ付きコフレを徹底比較。プロ直伝の普段使い着回しメイク術も大公開！",
    isHallOfFame: true,
    coverImage: coffretItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/coffret.jpg",
    recommendedItemCodes: coffretArticles.map(a => a.id),
    contentMarkdown: coffretContent
  },
  {
    id: "feat-winter-body-oil-massage-warming-care-2026",
    slug: "winter-body-oil-massage-warming-care-2026",
    title: "【2026冬・冷えむくみ解消】高保湿ボディオイル＆温感引き締めマッサージオイル人気おすすめ10選！お風呂上がりの巡りケアで真冬もしっとり引き締まった極上シルク肌へ",
    subtitle: "11〜12月の急激な寒暖差で悪化する「夕方の脚のパンパンむくみ・冷え・頑固な粉ふき」を皮膚科学とリンパ循環で根本解決！ヴェレダ（ホワイトバーチ・アルニカ）、クラランス、メルヴィータ、ニールズヤード、バイオイルなど、入浴後3分のインバス密閉法からプロ直伝のセルライト流しマッサージまで完全網羅！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 15,
    introText: "11〜12月の急激な寒暖差で悪化する「夕方の脚のパンパンむくみ・冷え・頑固な粉ふき」を皮膚科学とリンパ循環で根本解決！ヴェレダ（ホワイトバーチ・アルニカ）、クラランス、メルヴィータ、ニールズヤード、バイオイルなど、入浴後3分のインバス密閉法からプロ直伝のセルライト流しマッサージまで完全網羅！",
    isHallOfFame: true,
    coverImage: bodyOilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodyoil.jpg",
    recommendedItemCodes: bodyOilArticles.map(a => a.id),
    contentMarkdown: bodyoilContent
  },
  {
    id: "feat-winter-hydrating-cushion-foundation-bb-2026",
    slug: "winter-hydrating-cushion-foundation-bb-2026",
    title: "【2026冬・乾燥による毛穴落ち・粉浮き完全防止】高保湿モイスチャークッションファンデーション＆BBバーム人気おすすめ10選！冷気・暖房に負けない一日中うるおい発光ツヤ肌の作り方",
    subtitle: "湿度20%のオフィス暖房による「午後3時のファンデ粉吹き・毛穴落ち・ほうれい線めり込み」を徹底撃退！TIRTIR（クリスタルメッシュ/レッド）、CLIO、ジョンセンムル、HERA、ローラメルシエ、エトヴォスなど、美容液成分贅沢配合で一日中素肌が発光する神クッション10選を徹底比較。垂直タップ塗布テクニックも完全公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 15,
    introText: "湿度20%のオフィス暖房による「午後3時のファンデ粉吹き・毛穴落ち・ほうれい線めり込み」を徹底撃退！TIRTIR（クリスタルメッシュ/レッド）、CLIO、ジョンセンムル、HERA、ローラメルシエ、エトヴォスなど、美容液成分贅沢配合で一日中素肌が発光する神クッション10選を徹底比較。垂直タップ塗布テクニックも完全公開！",
    isHallOfFame: true,
    coverImage: cushionItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cushion.jpg",
    recommendedItemCodes: cushionArticles.map(a => a.id),
    contentMarkdown: cushionContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第10弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}
