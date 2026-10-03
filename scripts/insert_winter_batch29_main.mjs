import fs from 'fs';
import path from 'path';
import {
  aegyoItemsRaw,
  lashItemsRaw,
  lipLinerItemsRaw,
  aegyoArticles,
  lashArticles,
  lipLinerArticles
} from './insert_winter_batch29_helper.mjs';

import { getAegyoSalArticleContent } from './winter_batch29_article1_aegyosal.mjs';
import { getLashCoatingArticleContent } from './winter_batch29_article2_lashcoating.mjs';
import { getLipLinerArticleContent } from './winter_batch29_article3_lipliner.mjs';

console.log('🚀 [冬コスメ 第29弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const aegyoContent = getAegyoSalArticleContent();
const lashContent = getLashCoatingArticleContent();
const lipLinerContent = getLipLinerArticleContent();

console.log(`- 記事1 (涙袋コスメ) 文字数: 約${aegyoContent.length}文字`);
console.log(`- 記事2 (まつ毛コーティング) 文字数: 約${lashContent.length}文字`);
console.log(`- 記事3 (リップライナー) 文字数: 約${lipLinerContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (aegyoContent.length < 5000 || lashContent.length < 5000 || lipLinerContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-aegyo-sal-liner-concealer-pencil-2026",
    slug: "winter-aegyo-sal-liner-concealer-pencil-2026",
    title: "【2026冬・ぷっくりうるうる涙袋で澄んだ瞳＆中顔面短縮】高密着涙袋ライナー＆涙袋コンシーラー・影色ペンシルおすすめ人気10選！冬の乾燥まぶたでもシワ割れ・ヨレゼロで自然な立体感を偽装する大人の涙袋メイク決定版",
    subtitle: "イルミネーションやホリデーイベントで瞳をうるませて中顔面を短縮する冬の本命コスメ！冬の目元乾燥でもちりめんジワにめり込まず、夕方までふっくら立体感が続く高密着涙袋コスメを徹底比較。BBIA、ウォンジョンヨ、キャンメイク、セザンヌ、ケイト、カラーグラム、マジョリカマジョルカ、エチュード、ジュディドール、シピシピなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "イルミネーションやホリデーイベントで瞳をうるませて中顔面を短縮する冬の本命コスメ！冬の目元乾燥でもちりめんジワにめり込まず、夕方までふっくら立体感が続く高密着涙袋コスメを徹底比較。BBIA、ウォンジョンヨ、キャンメイク、セザンヌ、ケイト、カラーグラム、マジョリカマジョルカ、エチュード、ジュディドール、シピシピなど厳選10選！",
    isHallOfFame: true,
    coverImage: aegyoItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/aegyosal.jpg",
    recommendedItemCodes: aegyoArticles.map(a => a.id),
    contentMarkdown: aegyoContent
  },
  {
    id: "feat-winter-lash-coating-clear-mascara-fixer-2026",
    slug: "winter-lash-coating-clear-mascara-fixer-2026",
    title: "【2026冬・マツパ＆マツエク長持ち×韓国風束感まつ毛】まつ毛美容液コーティング剤＆クリアマスカラ・ラッシュフィクサーおすすめ人気10選！エアコン暖房のパサつき乾燥を防ぎ上向きカールを一日中キープする決定版",
    subtitle: "年末イベントに向けてまつ毛パーマやマツエクをする人が急増する11〜12月！エアコン暖房による乾燥・バラつきを防ぎ、トレンドの韓流ちゅるん束感を一日中形状記憶するマストアイテムを徹底検証。フェニックス、キャンメイク、セザンヌ、エレガンス、ケイト、エテュセ、ラッシュアディクト、ピメル、ヒロインメイク、マジョリカマジョルカなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "年末イベントに向けてまつ毛パーマやマツエクをする人が急増する11〜12月！エアコン暖房による乾燥・バラつきを防ぎ、トレンドの韓流ちゅるん束感を一日中形状記憶するマストアイテムを徹底検証。フェニックス、キャンメイク、セザンヌ、エレガンス、ケイト、エテュセ、ラッシュアディクト、ピメル、ヒロインメイク、マジョリカマジョルカなど厳選10選！",
    isHallOfFame: true,
    coverImage: lashItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lashcoating.jpg",
    recommendedItemCodes: lashArticles.map(a => a.id),
    contentMarkdown: lashContent
  },
  {
    id: "feat-winter-hydrating-lip-liner-pencil-shaping-2026",
    slug: "winter-hydrating-lip-liner-pencil-shaping-2026",
    title: "【2026冬・人中短縮＆ふっくら立体粘膜リップ】高密着リップライナー＆リップペンシル・シェイパーおすすめ人気10選！冬のコートに映える上品オーバーリップと口角リフトを叶える大人の美唇形成決定版",
    subtitle: "重ためコートやタートルネックで強調されがちな顔の余白を人中短縮とオーバーリップでキュッと引き締め！乾燥する冬の唇でもスルスル描けて縦ジワを埋める高保湿ペンシルを徹底比較。ハートパーセント、ロムアンド、M・A・C、エクセル、クリオ、インテグレート、ちふれ、セザンヌ、リンメル、ヴィセなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "重ためコートやタートルネックで強調されがちな顔の余白を人中短縮とオーバーリップでキュッと引き締め！乾燥する冬の唇でもスルスル描けて縦ジワを埋める高保湿ペンシルを徹底比較。ハートパーセント、ロムアンド、M・A・C、エクセル、クリオ、インテグレート、ちふれ、セザンヌ、リンメル、ヴィセなど厳選10選！",
    isHallOfFame: true,
    coverImage: lipLinerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipliner.jpg",
    recommendedItemCodes: lipLinerArticles.map(a => a.id),
    contentMarkdown: lipLinerContent
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
