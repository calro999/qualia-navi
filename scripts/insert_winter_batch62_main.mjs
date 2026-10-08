import fs from 'fs';
import path from 'path';
import {
  mistItemsRaw,
  vacItemsRaw,
  shvItemsRaw,
  mistArticles,
  vacArticles,
  shvArticles
} from './insert_winter_batch62_helper.mjs';

import { getHandyMistArticleContent } from './winter_batch62_article1_handy_mist.mjs';
import { getPoreVacuumArticleContent } from './winter_batch62_article2_pore_vacuum.mjs';
import { getFaceShaverArticleContent } from './winter_batch62_article3_face_shaver.mjs';

console.log('🚀 [冬コスメ 第62弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const mistContent = getHandyMistArticleContent();
const vacContent = getPoreVacuumArticleContent();
const shvContent = getFaceShaverArticleContent();

console.log(`- 記事1 (超音波ナノハンディミスト美顔器) 文字数: 約${mistContent.length}文字`);
console.log(`- 記事2 (温熱毛穴吸引器＆真空バキューム) 文字数: 約${vacContent.length}文字`);
console.log(`- 記事3 (音波振動フェイスシェーバー) 文字数: 約${shvContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (mistContent.length < 5000 || vacContent.length < 5000 || shvContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-nano-handy-mist-facial-steamer-dry-skin-2026",
    slug: "winter-nano-handy-mist-facial-steamer-dry-skin-2026",
    title: "【2026冬・暖房直撃オフィス＆外出先の粉吹き砂漠肌を1秒救済】超音波ナノハンディミスト美顔器＆携帯用フェイススチーマーおすすめ人気10選！フェスティノ・美ルル・ナノタイムなどメイクを崩さず角層深部へ瞬間補水する冬の持ち歩き神ギア徹底比較",
    subtitle: "11〜12月の暖房直撃オフィスや外出先の猛烈な空気乾燥による肌の砂漠化・ファンデの粉吹き・乾燥小ジワを、メイクを崩さないナノ超微粒子ミストで瞬時に角層まで救済！フェスティノ、美ルル、ナノタイムなど注目の携帯ミスト美顔器10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の暖房直撃オフィスや外出先の猛烈な空気乾燥による肌の砂漠化・ファンデの粉吹き・乾燥小ジワを、メイクを崩さないナノ超微粒子ミストで瞬時に角層まで救済！フェスティノ、美ルル、ナノタイムなど注目の携帯ミスト美顔器10選！",
    isHallOfFame: true,
    coverImage: mistItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mist.jpg",
    recommendedItemCodes: mistArticles.map(a => a.id),
    contentMarkdown: mistContent
  },
  {
    id: "feat-winter-thermal-pore-vacuum-blackhead-cleaner-2026",
    slug: "winter-thermal-pore-vacuum-blackhead-cleaner-2026",
    title: "【2026冬・寒さで凝固するイチゴ鼻＆頑固な黒ずみ角栓を根こそぎリセット】温熱毛穴吸引器＆真空バキューム黒ずみ角栓クリーナーおすすめ人気10選！ANLAN・Areti・可視化カメラ付きなど42℃温感で冷え固まり皮脂を溶かし肌を痛めずスポンと抜く冬の毛穴ディープクレンジング徹底比較",
    subtitle: "11〜12月の冷え込みによって毛穴内部で牛脂のように冷え固まった頑固な角栓や黒ずみを、42℃温熱でじんわり緩めて真空負圧で肌に優しくスポンと吸引！ANLAN、Areti、水流式ハイドラフェイシャルなど冬の毛穴ディープクレンジングギア10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の冷え込みによって毛穴内部で牛脂のように冷え固まった頑固な角栓や黒ずみを、42℃温熱でじんわり緩めて真空負圧で肌に優しくスポンと吸引！ANLAN、Areti、水流式ハイドラフェイシャルなど冬の毛穴ディープクレンジングギア10選！",
    isHallOfFame: true,
    coverImage: vacItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/vac.jpg",
    recommendedItemCodes: vacArticles.map(a => a.id),
    contentMarkdown: vacContent
  },
  {
    id: "feat-winter-sonic-face-shaver-eyebrow-peach-fuzz-trimmer-2026",
    slug: "winter-sonic-face-shaver-eyebrow-peach-fuzz-trimmer-2026",
    title: "【2026冬・ファンデ粉吹き＆乾燥くすみを撃退し陶器肌を仕込む】音波振動フェイスシェーバー＆眉毛・うぶ毛トリマーおすすめ人気10選！パナソニック フェリエ・貝印 bi-hada・コイズミなど角質を削らず顔のうぶ毛をゼロにして冬メイクの密着度・透明感を極限まで引き上げる神ツール徹底比較",
    subtitle: "11〜12月のホリデーデートや忘年会に向け、冬の乾燥でファンデが浮いてしまう真の原因「顔のうぶ毛」を肌を削らず音波微振動で優しくカット！パナソニック フェリエ、貝印 bi-hada ompa、コイズミなど陶器肌を引き出す仕込み神シェーバー10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月のホリデーデートや忘年会に向け、冬の乾燥でファンデが浮いてしまう真の原因「顔のうぶ毛」を肌を削らず音波微振動で優しくカット！パナソニック フェリエ、貝印 bi-hada ompa、コイズミなど陶器肌を引き出す仕込み神シェーバー10選！",
    isHallOfFame: true,
    coverImage: shvItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/shv.jpg",
    recommendedItemCodes: shvArticles.map(a => a.id),
    contentMarkdown: shvContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの新規特集記事を挿入しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが src/data.ts に見つかりませんでした。');
  process.exit(1);
}

console.log(`🎉 第62弾 特集記事3件＆個別商品記事30件の統合が完了しました！`);
