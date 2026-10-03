import fs from 'fs';
import path from 'path';
import {
  curlerItemsRaw,
  primerItemsRaw,
  patchItemsRaw,
  curlerArticles,
  primerArticles,
  patchArticles
} from './insert_winter_batch30_helper.mjs';

import { getCurlerArticleContent } from './winter_batch30_article1_curler.mjs';
import { getPrimerArticleContent } from './winter_batch30_article2_primer.mjs';
import { getPatchArticleContent } from './winter_batch30_article3_patch.mjs';

console.log('🚀 [冬コスメ 第30弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const curlerContent = getCurlerArticleContent();
const primerContent = getPrimerArticleContent();
const patchContent = getPatchArticleContent();

console.log(`- 記事1 (ホットビューラー) 文字数: 約${curlerContent.length}文字`);
console.log(`- 記事2 (アイシャドウベース) 文字数: 約${primerContent.length}文字`);
console.log(`- 記事3 (ニードルパッチ) 文字数: 約${patchContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (curlerContent.length < 5000 || primerContent.length < 5000 || patchContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-heated-eyelash-curler-hot-lash-lift-2026",
    slug: "winter-heated-eyelash-curler-hot-lash-lift-2026",
    title: "【2026冬・寒風でも下がらない上向き美カール】ホットビューラー＆充電式温熱まつ毛カーラーおすすめ人気10選！冬の冷気・マスク湿気に負けず一日中カールキープする決定版",
    subtitle: "冷え切った冬のまつ毛を熱の力で優しく解きほぐし、夕方までピンと上向きアーチを形状記憶！マフラーやマスクの呼気湿気によるカール崩れを完全リセットする冬のマストツールを徹底検証。パナソニック まつげくるん、ANLAN、KOBAKO、FESTINO、コイズミなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 16,
    introText: "冷え切った冬のまつ毛を熱の力で優しく解きほぐし、夕方までピンと上向きアーチを形状記憶！マフラーやマスクの呼気湿気によるカール崩れを完全リセットする冬のマストツールを徹底検証。パナソニック まつげくるん、ANLAN、KOBAKO、FESTINO、コイズミなど厳選10選！",
    isHallOfFame: true,
    coverImage: curlerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/curler.jpg",
    recommendedItemCodes: curlerArticles.map(a => a.id),
    contentMarkdown: curlerContent
  },
  {
    id: "feat-winter-hydrating-eyeshadow-base-primer-2026",
    slug: "winter-hydrating-eyeshadow-base-primer-2026",
    title: "【2026冬・乾燥まぶたの粉飛び＆二重幅溜まりゼロ】高保湿アイシャドウベース＆アイシャドウプライマーおすすめ人気10選！ホリデーシャドウの高発色と夜までの高密着を叶える神下地決定版",
    subtitle: "冬の暖房乾燥によるまぶたのカサつき・ラメ落ち・夕方のくすみを徹底防止！パウダーを磁石のように吸着させ、二重の溝に線を作らせない高密着アイプライマーを徹底比較。キャンメイク、エクセル、NARS、M・A・C、ルナソル、エレガンス、セザンヌ、アーバンディケイ、ケイトなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 16,
    introText: "冬の暖房乾燥によるまぶたのカサつき・ラメ落ち・夕方のくすみを徹底防止！パウダーを磁石のように吸着させ、二重の溝に線を作らせない高密着アイプライマーを徹底比較。キャンメイク、エクセル、NARS、M・A・C、ルナソル、エレガンス、セザンヌ、アーバンディケイ、ケイトなど厳選10選！",
    isHallOfFame: true,
    coverImage: primerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/primer.jpg",
    recommendedItemCodes: primerArticles.map(a => a.id),
    contentMarkdown: primerContent
  },
  {
    id: "feat-winter-micro-needle-patch-hyaluronic-acid-anti-wrinkle-2026",
    slug: "winter-micro-needle-patch-hyaluronic-acid-anti-wrinkle-2026",
    title: "【2026冬・寝ている間に目元＆ほうれい線ふっくら】マイクロニードルパッチ（ヒアルロン酸針パッチ）おすすめ人気10選！暖房乾燥の小ジワを角層深部から押し返す冬の集中美容決定版",
    subtitle: "塗るケアでは届かない角層深部へ高分子ヒアルロン酸を直接ダイレクト注入！就寝中にじっくり溶けて翌朝ふっくらハリ肌を蘇らせる最先端マイクロニードルパッチを徹底検証。北の快適工房 ヒアロディープパッチ、メディリフト、クオニス ダーマフィラー、VT、スパトリートメント、ナビジョンなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 16,
    introText: "塗るケアでは届かない角層深部へ高分子ヒアルロン酸を直接ダイレクト注入！就寝中にじっくり溶けて翌朝ふっくらハリ肌を蘇らせる最先端マイクロニードルパッチを徹底検証。北の快適工房 ヒアロディープパッチ、メディリフト、クオニス ダーマフィラー、VT、スパトリートメント、ナビジョンなど厳選10選！",
    isHallOfFame: true,
    coverImage: patchItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/patch.jpg",
    recommendedItemCodes: patchArticles.map(a => a.id),
    contentMarkdown: patchContent
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
