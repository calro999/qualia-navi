import fs from 'fs';
import path from 'path';
import {
  handCreamItemsRaw,
  bathSaltItemsRaw,
  lipMaskItemsRaw,
  handCreamArticles,
  bathSaltArticles,
  lipMaskArticles
} from './insert_winter_batch15_helper.mjs';

import { getHandCreamArticleContent } from './winter_batch15_article1_handcream.mjs';
import { getBathSaltArticleContent } from './winter_batch15_article2_bathsalt.mjs';
import { getLipMaskArticleContent } from './winter_batch15_article3_lipmask.mjs';

console.log('🚀 [冬コスメ 第15弾] 特集記事の生成と data.ts への統合を開始します...');

const handCreamContent = getHandCreamArticleContent();
const bathSaltContent = getBathSaltArticleContent();
const lipMaskContent = getLipMaskArticleContent();

console.log(`- 記事1 (高保湿ハンド＆ネイル) 文字数: 約${handCreamContent.length}文字`);
console.log(`- 記事2 (重炭酸入浴剤＆バスソルト) 文字数: 約${bathSaltContent.length}文字`);
console.log(`- 記事3 (濃密リップマスク＆バーム) 文字数: 約${lipMaskContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (handCreamContent.length < 5000 || bathSaltContent.length < 5000 || lipMaskContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-hand-cream-nail-oil-repair-2026",
    slug: "winter-hand-cream-nail-oil-repair-2026",
    title: "【2026冬・指先まで見惚れる透明美手へ】高保湿ハンドクリーム＆ネイルオイルおすすめ人気10選！あかぎれ・ささくれ・手荒れを防ぐ名品＆ホリデーギフト決定版",
    subtitle: "11〜12月は水仕事の冷水・空気の急激な乾燥・アルコール消毒で手の小ジワ・血管浮き・あかぎれ・ささくれが一年で最も深刻化！ロクシタン（シア20%）、Aesop（アロマバーム）、uka（オーガニックネイルオイル）、アトリックス（夜用美容液カプセル）、ユースキン、SHIROなど、手肌年齢を10歳若返らせる神アイテム10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "11〜12月は水仕事の冷水・空気の急激な乾燥・アルコール消毒で手の小ジワ・血管浮き・あかぎれ・ささくれが一年で最も深刻化！ロクシタン（シア20%）、Aesop（アロマバーム）、uka（オーガニックネイルオイル）、アトリックス（夜用美容液カプセル）、ユースキン、SHIROなど、手肌年齢を10歳若返らせる神アイテム10選を徹底比較！",
    isHallOfFame: true,
    coverImage: handCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/handcream.jpg",
    recommendedItemCodes: handCreamArticles.map(a => a.id),
    contentMarkdown: handCreamContent
  },
  {
    id: "feat-winter-bath-salt-bicarbonate-warming-care-2026",
    slug: "winter-bath-salt-bicarbonate-warming-care-2026",
    title: "【2026冬・芯から温まる極上の温活＆全身うるおい浴】高濃度重炭酸入浴剤＆薬用バスソルト・バスオイルおすすめ人気10選！冷え性・肩こり・乾燥肌を癒やす至福のホリデーバスタイム",
    subtitle: "外気温が一桁台まで下がる11〜12月、頑固な冷え性・肩こり・むくみ・入浴後の粉ふき乾燥肌を根本から癒やす！BARTH（中性重炭酸）、クナイプ（ホップ＆バレリアン天然岩塩）、アユーラ（メディテーションバス）、シークリスタルス（国産エプソムソルト）、SABON（死海塩）など、深部体温を上げて朝まで熟睡を約束する名作10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "外気温が一桁台まで下がる11〜12月、頑固な冷え性・肩こり・むくみ・入浴後の粉ふき乾燥肌を根本から癒やす！BARTH（中性重炭酸）、クナイプ（ホップ＆バレリアン天然岩塩）、アユーラ（メディテーションバス）、シークリスタルス（国産エプソムソルト）、SABON（死海塩）など、深部体温を上げて朝まで熟睡を約束する名作10選を徹底検証！",
    isHallOfFame: true,
    coverImage: bathSaltItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bathsalt.jpg",
    recommendedItemCodes: bathSaltArticles.map(a => a.id),
    contentMarkdown: bathSaltContent
  },
  {
    id: "feat-winter-hydrating-lip-mask-balm-night-care-2026",
    slug: "winter-hydrating-lip-mask-balm-night-care-2026",
    title: "【2026冬・縦ジワ＆ガサガサ皮むけ完全消去】濃密高保湿リップマスク＆夜用リップ美容液バームおすすめ人気10選！ぷるんと弾む赤ちゃん唇を叶える集中リップケア決定版",
    subtitle: "「唇の皮がむけて血がにじむ…縦ジワで口紅が綺麗に乗らない！」皮脂腺のない繊細な唇を真冬の過酷な乾燥から守り抜く。LANEIGE（リップスリーピングマスク）、タカミリップ（唇用美容液）、オバジ（ダーマパワーX）、キュレル（セラミドバーム）、Torriden、レブロン（シュガースクラブ）、モアリップなど、ひと晩で赤ちゃん唇へ導く神リップケア10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-01",
    readTimeMinutes: 16,
    introText: "「唇の皮がむけて血がにじむ…縦ジワで口紅が綺麗に乗らない！」皮脂腺のない繊細な唇を真冬の過酷な乾燥から守り抜く。LANEIGE（リップスリーピングマスク）、タカミリップ（唇用美容液）、オバジ（ダーマパワーX）、キュレル（セラミドバーム）、Torriden、レブロン（シュガースクラブ）、モアリップなど、ひと晩で赤ちゃん唇へ導く神リップケア10選！",
    isHallOfFame: true,
    coverImage: lipMaskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipmask.jpg",
    recommendedItemCodes: lipMaskArticles.map(a => a.id),
    contentMarkdown: lipMaskContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第15弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}
