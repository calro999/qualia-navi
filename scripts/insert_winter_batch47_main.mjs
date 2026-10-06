import fs from 'fs';
import path from 'path';
import {
  pdrnItemsRaw,
  lipItemsRaw,
  eyeItemsRaw,
  pdrnArticles,
  lipArticles,
  eyeArticles
} from './insert_winter_batch47_helper.mjs';

import { getPdrnArticleContent } from './winter_batch47_article1_pdrn.mjs';
import { getMeltingLipArticleContent } from './winter_batch47_article2_meltinglip.mjs';
import { getEyeCreamArticleContent } from './winter_batch47_article3_eyecream.mjs';

console.log('🚀 [冬コスメ 第47弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const pdrnContent = getPdrnArticleContent();
const lipContent = getMeltingLipArticleContent();
const eyeContent = getEyeCreamArticleContent();

console.log(`- 記事1 (PDRN美容液＆再生アンプル) 文字数: 約${pdrnContent.length}文字`);
console.log(`- 記事2 (メルティングリップバーム＆粘膜ルージュ) 文字数: 約${lipContent.length}文字`);
console.log(`- 記事3 (レチノール＆バクチオール アイクリーム) 文字数: 約${eyeContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (pdrnContent.length < 5000 || lipContent.length < 5000 || eyeContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-pdrn-salmon-dna-serum-skin-repair-2026",
    slug: "winter-pdrn-salmon-dna-serum-skin-repair-2026",
    title: "【2026冬・細胞レベルの肌再生＆しぼみ肌にハリ艶注入】PDRN美容液＆サーモンDNA濃密再生アンプルおすすめ人気10選！冬の寒冷乾燥・小じわ・毛穴の開きをクリニック発想で根本リペアする名品徹底比較",
    subtitle: "寒冷でしぼみ切った冬の砂漠肌を細胞レベルで押し返す！VT PDRN100、REJURANデュアルアンプル、メディキューブピンクペプチド、Anua水光カプセル、KISOなど、医療発想のサーモンDNA（PDRN）コスメ10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "寒冷でしぼみ切った冬の砂漠肌を細胞レベルで押し返す！VT PDRN100、REJURANデュアルアンプル、メディキューブピンクペプチド、Anua水光カプセル、KISOなど、医療発想のサーモンDNA（PDRN）コスメ10選を徹底比較！",
    isHallOfFame: true,
    coverImage: pdrnItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/pdrn.jpg",
    recommendedItemCodes: pdrnArticles.map(a => a.id),
    contentMarkdown: pdrnContent
  },
  {
    id: "feat-winter-melting-lip-balm-mucosa-plump-tint-2026",
    slug: "winter-melting-lip-balm-mucosa-plump-tint-2026",
    title: "【2026冬・体温でとろけて縦ジワ消滅＆一日中高密着保湿】メルティングリップバーム＆粘膜プランプリップおすすめ人気10選！乾燥・皮剥け・血色不良を救う大人のツヤ膜リップ徹底比較",
    subtitle: "木枯らしと暖房乾燥でカサつく唇を救う！体温でじゅわっと溶け出す極上のツヤ膜と多幸感血色！KANEBOルージュスター、ロムアンド、デイジーク、KATEツヤバース、オペラ、ラカ、ディオールなど話題のメルティングバーム10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "木枯らしと暖房乾燥でカサつく唇を救う！体温でじゅわっと溶け出す極上のツヤ膜と多幸感血色！KANEBOルージュスター、ロムアンド、デイジーク、KATEツヤバース、オペラ、ラカ、ディオールなど話題のメルティングバーム10選を徹底比較！",
    isHallOfFame: true,
    coverImage: lipItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lip.jpg",
    recommendedItemCodes: lipArticles.map(a => a.id),
    contentMarkdown: lipContent
  },
  {
    id: "feat-winter-retinol-bakuchiol-wrinkle-eye-cream-2026",
    slug: "winter-retinol-bakuchiol-wrinkle-eye-cream-2026",
    title: "【2026冬・目元・口元の乾燥小じわをピンと伸ばす】高機能レチノール＆バクチオール リンクルアイクリームおすすめ人気10選！暖房砂漠のちりめんジワ・ほうれい線・たるみまぶたを皮膚科学発想で集中アイロンがけ徹底比較",
    subtitle: "暖房の温風で湿度20%の過酷な乾燥に直撃される目元・口元を救う！資生堂エリクシール純粋レチノール、コスメデコルテiP.Shot、なめらか本舗、VTシカレチ、トゥヴェールなど、ちりめんジワとほうれい線をピンと伸ばす神アイクリーム10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "暖房の温風で湿度20%の過酷な乾燥に直撃される目元・口元を救う！資生堂エリクシール純粋レチノール、コスメデコルテiP.Shot、なめらか本舗、VTシカレチ、トゥヴェールなど、ちりめんジワとほうれい線をピンと伸ばす神アイクリーム10選を徹底比較！",
    isHallOfFame: true,
    coverImage: eyeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eye.jpg",
    recommendedItemCodes: eyeArticles.map(a => a.id),
    contentMarkdown: eyeContent
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
  console.log(`✅ src/data.ts に 3 つの新規冬特集記事を登録しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 第47弾の全記事統合処理が正常に完了しました！');
