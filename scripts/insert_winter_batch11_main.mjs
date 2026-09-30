import fs from 'fs';
import path from 'path';
import {
  morningItemsRaw,
  lotionItemsRaw,
  hairMilkItemsRaw,
  morningArticles,
  lotionArticles,
  hairMilkArticles
} from './insert_winter_batch11_helper.mjs';

import { getCleanserArticleContent } from './winter_batch11_article1_cleanser.mjs';
import { getLotionArticleContent } from './winter_batch11_article2_lotion.mjs';
import { getHairMilkArticleContent } from './winter_batch11_article3_hairmilk.mjs';

console.log('🚀 [冬コスメ 第11弾] 特集記事の生成と data.ts への統合を開始します...');

const cleanserContent = getCleanserArticleContent();
const lotionContent = getLotionArticleContent();
const hairMilkContent = getHairMilkArticleContent();

console.log(`- 記事1 (朝用洗顔・ジュレ洗顔) 文字数: 約${cleanserContent.length}文字`);
console.log(`- 記事2 (高保湿化粧水・エッセンスローション) 文字数: 約${lotionContent.length}文字`);
console.log(`- 記事3 (ヘアミルク・アウトバス) 文字数: 約${hairMilkContent.length}文字`);

const blogPostsToAdd = [
  {
    id: "feat-winter-morning-hydrating-cleanser-gel-2026",
    slug: "winter-morning-hydrating-cleanser-gel-2026",
    title: "【2026冬・朝のつっぱり＆乾燥崩れゼロへ】泡立たない高保湿朝洗顔・温感ジュレ洗顔おすすめ人気10選！寝起きの酸化皮脂・角栓だけを摩擦レスにオフする水分発光洗顔決定版",
    subtitle: "「冬の朝は水洗顔だけ」がインナードライと毛穴詰まりを加速させる？！KANEBO（生石けん・クレイ）、ラゴム、ルナソル、エスト、マナラ、ソフィーナiPなど、界面活性剤に頼らず美容液成分で汚れを浮かせる神朝洗顔10選を徹底比較。真冬の過酷な暖房下でも夕方までファンデが吸い付くプロ直伝メソッドも大公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 16,
    introText: "「冬の朝は水洗顔だけ」がインナードライと毛穴詰まりを加速させる？！KANEBO（生石けん・クレイ）、ラゴム、ルナソル、エスト、マナラ、ソフィーナiPなど、界面活性剤に頼らず美容液成分で汚れを浮かせる神朝洗顔10選を徹底比較。真冬の過酷な暖房下でも夕方までファンデが吸い付くプロ直伝メソッドも大公開！",
    isHallOfFame: true,
    coverImage: morningItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cleanser.jpg",
    recommendedItemCodes: morningArticles.map(a => a.id),
    contentMarkdown: cleanserContent
  },
  {
    id: "feat-winter-rich-hydrating-lotion-essence-2026",
    slug: "winter-rich-hydrating-lotion-essence-2026",
    title: "【2026冬・砂漠肌をうるおす濃密とろみ浸透】高保湿エイジングケア化粧水＆エッセンスローションおすすめ人気10選！冷気・暖房に負けない角層深部アプローチ徹底比較",
    subtitle: "湿度20%のオフィス暖房で干からびる砂漠肌を即効救済！コスメデコルテ（イドラクラリティ）、SK-II（ピテラ）、アルビオン（フローラドリップ）、イプサ、カルテHD（ヘパリン類似物質）、オルビスユードットなど、増粘剤の見せかけではない本物の高保湿エッセンスローション10選を徹底検証。エステ級3回ミルフィーユ塗りも完全解説！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 16,
    introText: "湿度20%のオフィス暖房で干からびる砂漠肌を即効救済！コスメデコルテ（イドラクラリティ）、SK-II（ピテラ）、アルビオン（フローラドリップ）、イプサ、カルテHD（ヘパリン類似物質）、オルビスユードットなど、増粘剤の見せかけではない本物の高保湿エッセンスローション10選を徹底検証。エステ級3回ミルフィーユ塗りも完全解説！",
    isHallOfFame: true,
    coverImage: lotionItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lotion.jpg",
    recommendedItemCodes: lotionArticles.map(a => a.id),
    contentMarkdown: lotionContent
  },
  {
    id: "feat-winter-hydrating-hair-milk-treatment-2026",
    slug: "winter-hydrating-hair-milk-treatment-2026",
    title: "【2026冬・静電気＆乾燥パサつき完全ブロック】濃厚補修ヘアミルク＆洗い流さないアウトバストリートメントおすすめ人気10選！毛先まで吸いつく極上うるおいシルク髪へ",
    subtitle: "「ヘアオイルだけ」では冬の髪は乾く？！オルビス（大バズりヘアミルク）、ミルボン（エルジューダ＋）、oggi otto（高濃度CMC）、資生堂サブリミック、N.（シアミルク）、ケラスターゼなど、冬のニット摩擦・マフラー静電気・暖房乾燥を根本から防ぐ神ヘアミルク10選を徹底比較。ミルク×オイルの究極ミルフィーユ保湿も大公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 15,
    introText: "「ヘアオイルだけ」では冬の髪は乾く？！オルビス（大バズりヘアミルク）、ミルボン（エルジューダ＋）、oggi otto（高濃度CMC）、資生堂サブリミック、N.（シアミルク）、ケラスターゼなど、冬のニット摩擦・マフラー静電気・暖房乾燥を根本から防ぐ神ヘアミルク10選を徹底比較。ミルク×オイルの究極ミルフィーユ保湿も大公開！",
    isHallOfFame: true,
    coverImage: hairMilkItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hairmilk.jpg",
    recommendedItemCodes: hairMilkArticles.map(a => a.id),
    contentMarkdown: hairMilkContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第11弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}
