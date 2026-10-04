import fs from 'fs';
import path from 'path';
import {
  bestcosmeItemsRaw,
  blushHighlighterItemsRaw,
  mensGiftItemsRaw,
  bestcosmeArticles,
  blushHighlighterArticles,
  mensGiftArticles
} from './insert_winter_batch38_helper.mjs';

import { getBestcosmeArticleContent } from './winter_batch38_article1_bestcosme.mjs';
import { getBlushHighlighterArticleContent } from './winter_batch38_article2_blush_highlighter.mjs';
import { getMensGiftArticleContent } from './winter_batch38_article3_mens_gift.mjs';

console.log('🚀 [冬コスメ 第38弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const bestcosmeContent = getBestcosmeArticleContent();
const blushHighlighterContent = getBlushHighlighterArticleContent();
const mensGiftContent = getMensGiftArticleContent();

console.log(`- 記事1 (年間ベストコスメ殿堂入り神コスメ) 文字数: 約${bestcosmeContent.length}文字`);
console.log(`- 記事2 (ホリデー限定チーク＆生ツヤハイライト) 文字数: 約${blushHighlighterContent.length}文字`);
console.log(`- 記事3 (メンズコスメ＆ジェンダーレス冬ギフト) 文字数: 約${mensGiftContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (bestcosmeContent.length < 5000 || blushHighlighterContent.length < 5000 || mensGiftContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-best-cosmetics-hall-of-fame-award-2026",
    slug: "winter-best-cosmetics-hall-of-fame-award-2026",
    title: "【2026冬・年間ベストコスメ殿堂入り】美容のプロ・読者が本気で選んだ神コスメ・スキンケアおすすめ人気10選！過酷な乾燥を乗り越える名品徹底比較",
    subtitle: "1年を締めくくる美容界最大の祭典！コスメデコルテ リポソーム、クレ・ド・ポー ボーテ ル・セラム、KANEBO ルージュスターヴァイブラント、SUQQU、ディオールなど、過酷な乾燥と寒さに立ち向かい圧倒的な美肌を叶える殿堂入り神コスメ10選をプロが徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "1年を締めくくる美容界最大の祭典！コスメデコルテ リポソーム、クレ・ド・ポー ボーテ ル・セラム、KANEBO ルージュスターヴァイブラント、SUQQU、ディオールなど、過酷な乾燥と寒さに立ち向かい圧倒的な美肌を叶える殿堂入り神コスメ10選をプロが徹底比較！",
    isHallOfFame: true,
    coverImage: bestcosmeItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bestcosme.jpg",
    recommendedItemCodes: bestcosmeArticles.map(a => a.id),
    contentMarkdown: bestcosmeContent
  },
  {
    id: "feat-winter-holiday-glow-blush-highlighter-palette-2026",
    slug: "winter-holiday-glow-blush-highlighter-palette-2026",
    title: "【2026冬・多幸感＆血色ツヤ肌】冬の寒冷くすみを一掃！ホリデー限定チーク＆生ツヤハイライトパレットおすすめ人気10選！内側からジュワッと発光する透明感メイク徹底解説",
    subtitle: "寒さによる血行不良やどんより顔色を吹き飛ばす！ディオール バックステージ、クレ・ド・ポー ボーテ レオスールデクラ、SUQQU、シャネル ボーム エサンシエルなど、内側からジュワッと滲む血色感と宝石のような立体ツヤを仕込む名品10選をプロが徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "寒さによる血行不良やどんより顔色を吹き飛ばす！ディオール バックステージ、クレ・ド・ポー ボーテ レオスールデクラ、SUQQU、シャネル ボーム エサンシエルなど、内側からジュワッと滲む血色感と宝石のような立体ツヤを仕込む名品10選をプロが徹底比較！",
    isHallOfFame: true,
    coverImage: blushHighlighterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/blush.jpg",
    recommendedItemCodes: blushHighlighterArticles.map(a => a.id),
    contentMarkdown: blushHighlighterContent
  },
  {
    id: "feat-winter-mens-grooming-holiday-gift-set-2026",
    slug: "winter-mens-grooming-holiday-gift-set-2026",
    title: "【2026冬・大切な彼やパートナーへ】絶対に喜ばれる！メンズコスメ＆ジェンダーレス冬ギフト・グルーミング名品おすすめ人気10選！清潔感と上質さを贈るクリスマスプレゼント完全ガイド",
    subtitle: "クリスマスやホリデーギフトの本命！SHISEIDO MEN、イソップ、THREE、バルクオム、ディプティックなど、冬の乾燥と戦う男性の清潔感と自信を引き出す上質なメンズコスメ＆グルーミング名品10選を美容エディターが徹底ガイド！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "クリスマスやホリデーギフトの本命！SHISEIDO MEN、イソップ、THREE、バルクオム、ディプティックなど、冬の乾燥と戦う男性の清潔感と自信を引き出す上質なメンズコスメ＆グルーミング名品10選を美容エディターが徹底ガイド！",
    isHallOfFame: true,
    coverImage: mensGiftItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mens_gift.jpg",
    recommendedItemCodes: mensGiftArticles.map(a => a.id),
    contentMarkdown: mensGiftContent
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
