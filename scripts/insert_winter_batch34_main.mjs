import fs from 'fs';
import path from 'path';
import {
  hotCleansingItemsRaw,
  peptideAmpouleItemsRaw,
  b5CicaItemsRaw,
  hotCleansingArticles,
  peptideAmpouleArticles,
  b5CicaArticles
} from './insert_winter_batch34_helper.mjs';

import { getHotCleansingArticleContent } from './winter_batch34_article1_hot_cleansing.mjs';
import { getPeptideAmpouleArticleContent } from './winter_batch34_article2_peptide_ampoule.mjs';
import { getB5CicaBalmArticleContent } from './winter_batch34_article3_b5_cica_balm.mjs';

console.log('🚀 [冬コスメ 第34弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const hotCleansingContent = getHotCleansingArticleContent();
const peptideAmpouleContent = getPeptideAmpouleArticleContent();
const b5CicaContent = getB5CicaBalmArticleContent();

console.log(`- 記事1 (温感ホットクレンジング) 文字数: 約${hotCleansingContent.length}文字`);
console.log(`- 記事2 (ペプチド・コラーゲンアンプル) 文字数: 約${peptideAmpouleContent.length}文字`);
console.log(`- 記事3 (パンテノール＆シカB5バーム) 文字数: 約${b5CicaContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (hotCleansingContent.length < 5000 || peptideAmpouleContent.length < 5000 || b5CicaContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-warming-hot-cleansing-gel-pore-massage-2026",
    slug: "winter-warming-hot-cleansing-gel-pore-massage-2026",
    title: "【2026冬・毛穴スチーム温感ケア＆くすみ一掃】温感ホットクレンジングジェル＆マッサージ洗顔おすすめ人気10選！冷え固まった角栓をとろかす冬の毛穴レス美肌決定版",
    subtitle: "11〜12月の気温低下で硬く閉じた毛穴・冷え固まった皮脂・血行不良のどんよりくすみをポカポカ温感スチームでじんわり緩めてとろかす！マナラ、スキンビル、DUO、ベネフィーク、アンレーベルラボ、ラチェスカ、ラフラ、エリクシールなど厳選10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "11〜12月の気温低下で硬く閉じた毛穴・冷え固まった皮脂・血行不良のどんよりくすみをポカポカ温感スチームでじんわり緩めてとろかす！マナラ、スキンビル、DUO、ベネフィーク、アンレーベルラボ、ラチェスカ、ラフラ、エリクシールなど厳選10選を徹底比較！",
    isHallOfFame: true,
    coverImage: hotCleansingItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hot_cleansing.jpg",
    recommendedItemCodes: hotCleansingArticles.map(a => a.id),
    contentMarkdown: hotCleansingContent
  },
  {
    id: "feat-winter-peptide-collagen-firming-ampoule-serum-2026",
    slug: "winter-peptide-collagen-firming-ampoule-serum-2026",
    title: "【2026冬・塗るボトックス＆たるみ毛穴リフト】ペプチド・コラーゲン濃密弾力アンプル美容液おすすめ人気10選！冬のしぼみ肌・ほうれい線を内側から押し返す本格ハリ肌決定版",
    subtitle: "11〜12月の急激な乾燥でしぼむ肌密度・頬のたるみ毛穴・ファンデが食い込むほうれい線を救済！アセチルヘキサペプチド-8、超低分子コラーゲン、微細針スピキュール、ボルフィリンでピンと押し返す神アンプルを徹底検証。バイオヒールボ、VT、ナンバーズイン、オーディナリー、KAHI、シーラボなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "11〜12月の急激な乾燥でしぼむ肌密度・頬のたるみ毛穴・ファンデが食い込むほうれい線を救済！アセチルヘキサペプチド-8、超低分子コラーゲン、微細針スピキュール、ボルフィリンでピンと押し返す神アンプルを徹底検証。バイオヒールボ、VT、ナンバーズイン、オーディナリー、KAHI、シーラボなど厳選10選！",
    isHallOfFame: true,
    coverImage: peptideAmpouleItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/peptide_ampoule.jpg",
    recommendedItemCodes: peptideAmpouleArticles.map(a => a.id),
    contentMarkdown: peptideAmpouleContent
  },
  {
    id: "feat-winter-panthenol-b5-cica-rescue-barrier-balm-2026",
    slug: "winter-panthenol-b5-cica-rescue-barrier-balm-2026",
    title: "【2026冬・寒冷刺激＆マスク擦れ救済】パンテノール＆シカ B5レスキューリペアバームおすすめ人気10選！赤み・ヒリつき・粉ふきを鉄壁シールドで鎮静修復する冬の守り神コスメ決定版",
    subtitle: "真冬の木枯らし・急激な寒暖差ショック・マフラーやマスクの物理摩擦で崩壊した肌バリアを集中再建！高濃度ビタミンB5（パンテノール）×CICA（マデカソサイド）が赤み・痒み・皮むけを速攻レスキュー。ラロッシュポゼB5+、アベンヌ、バイオヒールボ、ドクタージャルト、イハダ、VT、トリデンなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "真冬の木枯らし・急激な寒暖差ショック・マフラーやマスクの物理摩擦で崩壊した肌バリアを集中再建！高濃度ビタミンB5（パンテノール）×CICA（マデカソサイド）が赤み・痒み・皮むけを速攻レスキュー。ラロッシュポゼB5+、アベンヌ、バイオヒールボ、ドクタージャルト、イハダ、VT、トリデンなど厳選10選！",
    isHallOfFame: true,
    coverImage: b5CicaItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/b5_cica.jpg",
    recommendedItemCodes: b5CicaArticles.map(a => a.id),
    contentMarkdown: b5CicaContent
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
