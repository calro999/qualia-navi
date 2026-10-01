import fs from 'fs';
import path from 'path';
import {
  silkHairItemsRaw,
  neckCreamItemsRaw,
  eyeMaskItemsRaw,
  silkHairArticles,
  neckCreamArticles,
  eyeMaskArticles
} from './insert_winter_batch13_helper.mjs';

import { getSilkHairArticleContent } from './winter_batch13_article1_silkcap.mjs';
import { getNeckCreamArticleContent } from './winter_batch13_article2_neckcream.mjs';
import { getEyeMaskArticleContent } from './winter_batch13_article3_eyemask.mjs';

console.log('🚀 [冬コスメ 第13弾] 特集記事の生成と data.ts への統合を開始します...');

const silkHairContent = getSilkHairArticleContent();
const neckCreamContent = getNeckCreamArticleContent();
const eyeMaskContent = getEyeMaskArticleContent();

console.log(`- 記事1 (シルクヘアケア) 文字数: 約${silkHairContent.length}文字`);
console.log(`- 記事2 (ネッククリーム) 文字数: 約${neckCreamContent.length}文字`);
console.log(`- 記事3 (ホットアイマスク) 文字数: 約${eyeMaskContent.length}文字`);

const blogPostsToAdd = [
  {
    id: "feat-winter-silk-night-cap-pillowcase-haircare-2026",
    slug: "winter-silk-night-cap-pillowcase-haircare-2026",
    title: "【2026冬・寝ている間の摩擦＆静電気を完全ブロック】美髪シルクナイトキャップ＆シルク枕カバーおすすめ人気10選！翌朝のアホ毛・パサつき・寝癖をゼロにするうるツヤ摩擦レス睡眠術",
    subtitle: "「夜どれだけ丁寧にトリートメントしても、朝起きると毛先がバサバサ…」その原因は冬の乾燥と寝返り摩擦にあった！ココシルク（年間ランキング受賞）、Utukky（25匁最高級シルク）、絹かいこ、リリーシルクなど、100%天然シルクが生み出す圧倒的保湿＆静電気防止アイテム10選を徹底検証。摩擦レス美髪のメカニズムから正しい装着法まで完全網羅！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "「夜どれだけ丁寧にトリートメントしても、朝起きると毛先がバサバサ…」その原因は冬の乾燥と寝返り摩擦にあった！ココシルク（年間ランキング受賞）、Utukky（25匁最高級シルク）、絹かいこ、リリーシルクなど、100%天然シルクが生み出す圧倒的保湿＆静電気防止アイテム10選を徹底検証。摩擦レス美髪のメカニズムから正しい装着法まで完全網羅！",
    isHallOfFame: true,
    coverImage: silkHairItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/silkhair.jpg",
    recommendedItemCodes: silkHairArticles.map(a => a.id),
    contentMarkdown: silkHairContent
  },
  {
    id: "feat-winter-neck-decollete-wrinkle-firming-cream-2026",
    slug: "winter-neck-decollete-wrinkle-firming-cream-2026",
    title: "【2026冬・首元の横ジワ・乾燥たるみ・マフラー摩擦を撃退】高保湿ネッククリーム＆デコルテ集中リフトケアクリームおすすめ人気10選！タートルネックが映える大人のなめらか首元美肌術",
    subtitle: "「顔は入念にスキンケアしているのに、首元だけ横ジワと乾燥が目立つ…」冬の寒さによる血行不良、マフラーのチクチク摩擦、長時間のスマホ下向き姿勢で深くなる首ジワを根本ケア！クラランス（ネックの絶対女王）、パーフェクトワン（シワ改善×美白）、資生堂、シスレーなど、薄い首元の皮膚をふっくら持ち上げる神ネッククリーム10選を徹底比較。リンパを流す塗布マッサージ術も公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "「顔は入念にスキンケアしているのに、首元だけ横ジワと乾燥が目立つ…」冬の寒さによる血行不良、マフラーのチクチク摩擦、長時間のスマホ下向き姿勢で深くなる首ジワを根本ケア！クラランス（ネックの絶対女王）、パーフェクトワン（シワ改善×美白）、資生堂、シスレーなど、薄い首元の皮膚をふっくら持ち上げる神ネッククリーム10選を徹底比較。リンパを流す塗布マッサージ術も公開！",
    isHallOfFame: true,
    coverImage: neckCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/neckcream.jpg",
    recommendedItemCodes: neckCreamArticles.map(a => a.id),
    contentMarkdown: neckCreamContent
  },
  {
    id: "feat-winter-heated-eye-mask-massager-relax-2026",
    slug: "winter-heated-eye-mask-massager-relax-2026",
    title: "【2026冬・目元の冷え・眼精疲労・頑固な青クマを芯から温めて癒やす】充電式温感ホットアイマスク＆目元リフレッシュギアおすすめ人気10選！ホリデーギフト・ご褒美快眠アイテム決定版",
    subtitle: "冷気と年末のPC・スマホ酷使でカチコチに凍りついた目元を極上温熱で解放！NIPLUX（加圧エア×温熱）、La Luna（安眠BGM×グラフェン温熱）、nerugoo（コードレスシルク）、ROMANTIC、めぐりズムなど、血行を促進して青クマ・目元の乾燥小ジワ・重いまぶたをケアする神アイマスク10選を徹底検証。目元の温熱ケアが生み出す自律神経リセット＆美肌相乗効果も詳しく解説！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "冷気と年末のPC・スマホ酷使でカチコチに凍りついた目元を極上温熱で解放！NIPLUX（加圧エア×温熱）、La Luna（安眠BGM×グラフェン温熱）、nerugoo（コードレスシルク）、ROMANTIC、めぐりズムなど、血行を促進して青クマ・目元の乾燥小ジワ・重いまぶたをケアする神アイマスク10選を徹底検証。目元の温熱ケアが生み出す自律神経リセット＆美肌相乗効果も詳しく解説！",
    isHallOfFame: true,
    coverImage: eyeMaskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyemask.jpg",
    recommendedItemCodes: eyeMaskArticles.map(a => a.id),
    contentMarkdown: eyeMaskContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第13弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}
