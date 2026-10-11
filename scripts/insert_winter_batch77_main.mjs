import fs from 'fs';
import path from 'path';
import {
  nailHardenerItemsRaw,
  creamShampooItemsRaw,
  makeupSpongeItemsRaw,
  nailHardenerArticles,
  creamShampooArticles,
  makeupSpongeArticles
} from './insert_winter_batch77_helper.mjs';

import { getNailHardenerArticleContent } from './winter_batch77_article1_nail_hardener.mjs';
import { getClayCreamShampooArticleContent } from './winter_batch77_article2_clay_cream_shampoo.mjs';
import { getMakeupSpongeArticleContent } from './winter_batch77_article3_makeup_sponge.mjs';

console.log('🚀 [冬コスメ 第77弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const nailHardenerContent = getNailHardenerArticleContent();
const creamShampooContent = getClayCreamShampooArticleContent();
const makeupSpongeContent = getMakeupSpongeArticleContent();

console.log(`- 記事1 (ネイルハードナー＆自爪補強コート) 文字数: 約${nailHardenerContent.length}文字`);
console.log(`- 記事2 (クレイクリームシャンプー＆高保湿泡立たないシャンプー) 文字数: 約${creamShampooContent.length}文字`);
console.log(`- 記事3 (高保湿メイクスポンジ＆水光パフ) 文字数: 約${makeupSpongeContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (nailHardenerContent.length < 5000 || creamShampooContent.length < 5000 || makeupSpongeContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-nail-hardener-strengthener-repair-2026",
    slug: "winter-nail-hardener-strengthener-repair-2026",
    title: "【2026冬・乾燥割れ爪＆二枚爪を鉄壁補強】ネイルハードナー＆自爪補強コートおすすめ人気10選！OPI・エテュセ・ディーアップ・ドクターネイル徹底比較！薄爪・縦スジを繊維＆ケラチンコートで美爪育成",
    subtitle: "11〜12月の木枯らしと乾燥による爪のパキッと割れ・二枚爪・薄爪を鉄壁コートし、美しい素爪を育む自爪補強ハードナー＆育爪ベースコート10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 32,
    introText: "11〜12月の木枯らしと乾燥による爪のパキッと割れ・二枚爪・薄爪を鉄壁コートし、美しい素爪を育む自爪補強ハードナー＆育爪ベースコート10選！",
    isHallOfFame: true,
    coverImage: nailHardenerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/nail.jpg",
    recommendedItemCodes: nailHardenerArticles.map(a => a.id),
    contentMarkdown: nailHardenerContent
  },
  {
    id: "feat-winter-clay-cream-shampoo-nourish-moist-2026",
    slug: "winter-clay-cream-shampoo-nourish-moist-2026",
    title: "【2026冬・頭皮砂漠化＆乾燥フケ・かゆみを泡立てずに濃密補修】クレイクリームシャンプー＆高保湿泡立たないシャンプーおすすめ人気10選！ココネ・カミカ・プレディア・クレイエンス徹底比較！海泥ミネラル×濃密クリームで摩擦ゼロ＆うるおいツヤ髪へ",
    subtitle: "11〜12月の気温低下と熱いシャワーで乾燥しがちな頭皮を、海泥クレイと濃密クリームで摩擦レスに洗い上げてうるおす高保湿泡立たないシャンプー10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 34,
    introText: "11〜12月の気温低下と熱いシャワーで乾燥しがちな頭皮を、海泥クレイと濃密クリームで摩擦レスに洗い上げてうるおす高保湿泡立たないシャンプー10選！",
    isHallOfFame: true,
    coverImage: creamShampooItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/shampoo.jpg",
    recommendedItemCodes: creamShampooArticles.map(a => a.id),
    contentMarkdown: creamShampooContent
  },
  {
    id: "feat-winter-hydrating-makeup-sponge-water-puff-2026",
    slug: "winter-hydrating-makeup-sponge-water-puff-2026",
    title: "【2026冬・乾燥粉ふき肌に吸い付く密着美肌】高保湿メイクスポンジ＆水光パフおすすめ人気10選！&be・ロージーローザ・ビューティーブレンダー・リアルテクニクス徹底比較！水を含ませて使う肉厚立体パフで乾燥崩れ・毛穴落ちを完全防止",
    subtitle: "11〜12月の乾燥肌や粉ふき肌にファンデーションを吸い付くように密着させ、一日中うるおい満ちる水光ツヤ肌を叶える高保湿立体メイクスポンジ10選！",
    targetGender: "unisex",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi ベースメイクコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 31,
    introText: "11〜12月の乾燥肌や粉ふき肌にファンデーションを吸い付くように密着させ、一日中うるおい満ちる水光ツヤ肌を叶える高保湿立体メイクスポンジ10選！",
    isHallOfFame: true,
    coverImage: makeupSpongeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/sponge.jpg",
    recommendedItemCodes: makeupSpongeArticles.map(a => a.id),
    contentMarkdown: makeupSpongeContent
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
  console.log('✅ src/data.ts に第77弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
