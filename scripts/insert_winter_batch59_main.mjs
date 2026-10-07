import fs from 'fs';
import path from 'path';
import {
  handItemsRaw,
  neckItemsRaw,
  socksItemsRaw,
  handArticles,
  neckArticles,
  socksArticles
} from './insert_winter_batch59_helper.mjs';

import { getHandMassagerArticleContent } from './winter_batch59_article1_hand_massager.mjs';
import { getNeckMassagerArticleContent } from './winter_batch59_article2_neck_massager.mjs';
import { getKotatsuSocksArticleContent } from './winter_batch59_article3_kotatsu_socks.mjs';

console.log('🚀 [冬コスメ 第59弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const handContent = getHandMassagerArticleContent();
const neckContent = getNeckMassagerArticleContent();
const socksContent = getKotatsuSocksArticleContent();

console.log(`- 記事1 (温熱ハンドマッサージャー) 文字数: 約${handContent.length}文字`);
console.log(`- 記事2 (温熱EMSネックマッサージャー) 文字数: 約${neckContent.length}文字`);
console.log(`- 記事3 (まるでこたつソックス温活) 文字数: 約${socksContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (handContent.length < 5000 || neckContent.length < 5000 || socksContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-heating-air-hand-massager-relax-care-2026",
    slug: "winter-heating-air-hand-massager-relax-care-2026",
    title: "【2026冬・指先の冷え＆冬のガサガサ手荒れ・酷使疲れを温めほぐす】温熱ハンドマッサージャー＆手もみエアマッサージャーおすすめ人気10選！ルルド・NIPLUX・ドクターエア・アテックスなどヒーター温熱×指先独立エアバッグで至福の血行促進＆ハンドクリーム浸透ケア徹底比較",
    subtitle: "冬の冷気による末梢血行不良とPC・スマホ・水仕事の手指疲労を温熱ヒーターと立体エアバッグで極上リセット！ルルド、NIPLUX、アルインコ、TOR、SaiELなど、ハンドクリームの浸透パックとしても絶賛される至福の温熱ハンドケアギア10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "冬の冷気による末梢血行不良とPC・スマホ・水仕事の手指疲労を温熱ヒーターと立体エアバッグで極上リセット！ルルド、NIPLUX、アルインコ、TOR、SaiELなど、ハンドクリームの浸透パックとしても絶賛される至福の温熱ハンドケアギア10選！",
    isHallOfFame: true,
    coverImage: handItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hand.jpg",
    recommendedItemCodes: handArticles.map(a => a.id),
    contentMarkdown: handContent
  },
  {
    id: "feat-winter-heating-ems-neck-massager-shoulder-relax-2026",
    slug: "winter-heating-ems-neck-massager-shoulder-relax-2026",
    title: "【2026冬・木枯らしの寒さで凝り固まる首肩＆冬の顔たるみを温め流す】温熱EMSネックマッサージャー＆首元温感リラクゼーションギアおすすめ人気10選！MYTREX・NIPLUX・ルルドなどじんわり温熱×深層パルスで僧帽筋のこわばりを解放しスッキリとした首元美ライン＆血色美肌を叶える神ギア徹底比較",
    subtitle: "寒さによるすくみ肩や重いコートで凝り固まる首筋・僧帽筋を心地よい温熱と深層EMSパルスで解放！NIPLUX、MYTREX、ルルド、ドクターエア、オムロンなど、首元の巡りを改善して顔のくすみ・たるみまで一掃する最新ネックマッサージャー10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "寒さによるすくみ肩や重いコートで凝り固まる首筋・僧帽筋を心地よい温熱と深層EMSパルスで解放！NIPLUX、MYTREX、ルルド、ドクターエア、オムロンなど、首元の巡りを改善して顔のくすみ・たるみまで一掃する最新ネックマッサージャー10選！",
    isHallOfFame: true,
    coverImage: neckItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/neck.jpg",
    recommendedItemCodes: neckArticles.map(a => a.id),
    contentMarkdown: neckContent
  },
  {
    id: "feat-winter-warm-kotatsu-socks-heating-compression-tights-2026",
    slug: "winter-warm-kotatsu-socks-heating-compression-tights-2026",
    title: "【2026冬・足先が氷のように冷える底冷え＆冬の夕方パンパン脚を救う】まるでこたつソックス＆温活極暖着圧レギンスおすすめ人気10選！靴下の岡本・メディキュット・スリムウォーク・イオンドクターなど三陰交のツボ温め×段階着圧で足先からポカポカ美脚を叶える冬の必須温活ギア徹底比較",
    subtitle: "真冬のフローリングからの底冷えや夕方の寒冷むくみを特許技術のツボ集中温熱と極暖発熱繊維で完全ブロック！靴下の岡本まるでこたつソックス、イオンドクター、スリムウォーク、シルクふぁみりぃ、グンゼサブリナなど、履いた瞬間こたつのような温もりを届ける神温活レッグウェア10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "真冬のフローリングからの底冷えや夕方の寒冷むくみを特許技術のツボ集中温熱と極暖発熱繊維で完全ブロック！靴下の岡本まるでこたつソックス、イオンドクター、スリムウォーク、シルクふぁみりぃ、グンゼサブリナなど、履いた瞬間こたつのような温もりを届ける神温活レッグウェア10選！",
    isHallOfFame: true,
    coverImage: socksItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/socks.jpg",
    recommendedItemCodes: socksArticles.map(a => a.id),
    contentMarkdown: socksContent
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

console.log(`🎉 第59弾 特集記事3件＆個別商品記事30件の統合が完了しました！`);
