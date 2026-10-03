import fs from 'fs';
import path from 'path';
import {
  adventItemsRaw,
  colorCorrectItemsRaw,
  velvetLipItemsRaw,
  adventArticles,
  colorCorrectArticles,
  velvetLipArticles
} from './insert_winter_batch32_helper.mjs';

import { getAdventArticleContent } from './winter_batch32_article1_advent.mjs';
import { getColorCorrectArticleContent } from './winter_batch32_article2_color_correct.mjs';
import { getVelvetLipArticleContent } from './winter_batch32_article3_velvet_lip.mjs';

console.log('🚀 [冬コスメ 第32弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const adventContent = getAdventArticleContent();
const colorCorrectContent = getColorCorrectArticleContent();
const velvetLipContent = getVelvetLipArticleContent();

console.log(`- 記事1 (アドベントカレンダー) 文字数: 約${adventContent.length}文字`);
console.log(`- 記事2 (カラーコントロール下地) 文字数: 約${colorCorrectContent.length}文字`);
console.log(`- 記事3 (ベルベットマットリップ) 文字数: 約${velvetLipContent.length}文字`);

// 5000文字以上であることを厳格に検証
if (adventContent.length < 5000 || colorCorrectContent.length < 5000 || velvetLipContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-beauty-advent-calendar-holiday-2026",
    slug: "winter-beauty-advent-calendar-holiday-2026",
    title: "【2026冬ホリデー・豪華コスメアドベントカレンダーおすすめ人気10選】完売必至のデパコス＆ボディケア！クリスマスのカウントダウンを彩る夢のコフレを徹底比較",
    subtitle: "クリスマスまでの24日間を毎日特別なコスメでカウントダウン！圧倒的コスパを誇る憧れデパコス＆極上ボディケアのアドベントカレンダーを徹底検証。ロクシタン、ポール＆ジョー、キールズ、SABON、ディオール、クリニーク、クラランス、ジルスチュアート、コスメデコルテ、YSLなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 18,
    introText: "クリスマスまでの24日間を毎日特別なコスメでカウントダウン！圧倒的コスパを誇る憧れデパコス＆極上ボディケアのアドベントカレンダーを徹底検証。ロクシタン、ポール＆ジョー、キールズ、SABON、ディオール、クリニーク、クラランス、ジルスチュアート、コスメデコルテ、YSLなど厳選10選！",
    isHallOfFame: true,
    coverImage: adventItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/advent.jpg",
    recommendedItemCodes: adventArticles.map(a => a.id),
    contentMarkdown: adventContent
  },
  {
    id: "feat-winter-color-correcting-makeup-base-primer-2026",
    slug: "winter-color-correcting-makeup-base-primer-2026",
    title: "【2026冬・寒暖差の赤み＆青クマ＆黄ぐすみを光補正】高保湿カラーコントロール下地おすすめ人気10選！色相環の補色理論でファンデを薄膜化し透明美肌を叶える冬の神ベース決定版",
    subtitle: "冬の寒暖差による赤ら顔、冷えによる頑固な青クマ、乾燥による黄ぐすみを光の補色効果で根本から打ち消す！ファンデの厚塗りを防ぎ、一日中うるおい発光肌をキープする高保湿カラー下地を徹底比較。エレガンス、ジバンシイ、コスメデコルテ、RMK、フーミー、イプサ、キャンメイクなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 18,
    introText: "冬の寒暖差による赤ら顔、冷えによる頑固な青クマ、乾燥による黄ぐすみを光の補色効果で根本から打ち消す！ファンデの厚塗りを防ぎ、一日中うるおい発光肌をキープする高保湿カラー下地を徹底比較。エレガンス、ジバンシイ、コスメデコルテ、RMK、フーミー、イプサ、キャンメイクなど厳選10選！",
    isHallOfFame: true,
    coverImage: colorCorrectItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/color_correct.jpg",
    recommendedItemCodes: colorCorrectArticles.map(a => a.id),
    contentMarkdown: colorCorrectContent
  },
  {
    id: "feat-winter-hydrating-velvet-matte-lip-tint-2026",
    slug: "winter-hydrating-velvet-matte-lip-tint-2026",
    title: "【2026冬・縦ジワ＆乾燥知らず】高保湿ベルベットマットリップ＆スフレリップおすすめ人気10選！コートに映える深みボルドー・ブラウンをふんわり一日中キープする決定版",
    subtitle: "冬のウールコートやニットに最高に映える深みマットリップ！最新のオイルインゲル＆ブラーパウダー処方で、真冬でも皮剥け・縦ジワ割れを一切起こさずふんわりスフレ唇が続く進化系マットを徹底検証。ケイト リップモンスター スフレマット、ロムアンド、3CE、エチュード、ビーアイドル、NARS、MACなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 18,
    introText: "冬のウールコートやニットに最高に映える深みマットリップ！最新のオイルインゲル＆ブラーパウダー処方で、真冬でも皮剥け・縦ジワ割れを一切起こさずふんわりスフレ唇が続く進化系マットを徹底検証。ケイト リップモンスター スフレマット、ロムアンド、3CE、エチュード、ビーアイドル、NARS、MACなど厳選10選！",
    isHallOfFame: true,
    coverImage: velvetLipItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/velvet_lip.jpg",
    recommendedItemCodes: velvetLipArticles.map(a => a.id),
    contentMarkdown: velvetLipContent
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
