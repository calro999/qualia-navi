import fs from 'fs';
import path from 'path';
import {
  hqItemsRaw,
  caxaItemsRaw,
  scalpItemsRaw,
  hqArticles,
  caxaArticles,
  scalpArticles
} from './insert_winter_batch52_helper.mjs';

import { getHqArticleContent } from './winter_batch52_article1_hq.mjs';
import { getCaxaArticleContent } from './winter_batch52_article2_caxa.mjs';
import { getScalpBrushArticleContent } from './winter_batch52_article3_scalpbrush.mjs';

console.log('🚀 [冬コスメ 第52弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const hqContent = getHqArticleContent();
const caxaContent = getCaxaArticleContent();
const scalpContent = getScalpBrushArticleContent();

console.log(`- 記事1 (ハイドロキノン・スポット美白) 文字数: 約${hqContent.length}文字`);
console.log(`- 記事2 (テラヘルツ・陶磁器かっさプレート) 文字数: 約${caxaContent.length}文字`);
console.log(`- 記事3 (スカルプブラシ・頭皮マッサージ) 文字数: 約${scalpContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (hqContent.length < 5000 || caxaContent.length < 5000 || scalpContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-hydroquinone-retinol-spot-whitening-cream-2026",
    slug: "winter-hydroquinone-retinol-spot-whitening-cream-2026",
    title: "【2026冬・紫外線最少期を狙い撃つシミ・肝斑消去の黄金期】高濃度ハイドロキノン＆純粋レチノール 薬用集中スポット美白クリームおすすめ人気10選！冬の間に濃いシミ・色素沈着をリセットする皮膚科学ドクターズコスメ徹底比較",
    subtitle: "紫外線量が年間最少の11-12月こそ攻めの美白ケア！旭研究所、ビーグレン、ポーラ、HAKU、オバジC25、アンプルールなど、頑固なシミ・肝斑を狙い撃つ高濃度スポット美白10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "紫外線量が年間最少の11-12月こそ攻めの美白ケア！旭研究所、ビーグレン、ポーラ、HAKU、オバジC25、アンプルールなど、頑固なシミ・肝斑を狙い撃つ高濃度スポット美白10選！",
    isHallOfFame: true,
    coverImage: hqItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hq.jpg",
    recommendedItemCodes: hqArticles.map(a => a.id),
    contentMarkdown: hqContent
  },
  {
    id: "feat-winter-kassa-plate-warm-lift-massage-2026",
    slug: "winter-kassa-plate-warm-lift-massage-2026",
    title: "【2026冬・寒さでこわばる表情筋＆冷えむくみ・たるみを温め流す】高純度テラヘルツ・陶磁器かっさプレート＆温感リフトカッサおすすめ人気10選！朝晩5分の温活マッサージでフェイスラインを引き上げる大人の小顔ケア徹底比較",
    subtitle: "寒さで凝り固まった首筋・咬筋をほぐし冬の朝パンパンむくみを撃退！アユーラ、ReFa、Panasonicバイタリフト、テラヘルツ鉱石、SUQQUなど、温活カッサで引き締まった小顔を叶える名品10選！",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "寒さで凝り固まった首筋・咬筋をほぐし冬の朝パンパンむくみを撃退！アユーラ、ReFa、Panasonicバイタリフト、テラヘルツ鉱石、SUQQUなど、温活カッサで引き締まった小顔を叶える名品10選！",
    isHallOfFame: true,
    coverImage: caxaItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/caxa.jpg",
    recommendedItemCodes: caxaArticles.map(a => a.id),
    contentMarkdown: caxaContent
  },
  {
    id: "feat-winter-scalp-brush-head-spa-massage-2026",
    slug: "winter-scalp-brush-head-spa-massage-2026",
    title: "【2026冬・寒さで凝り固まった頭皮のこわばり＆血行不良・乾燥フケを解きほぐす】インバス＆アウトバス両用スカルプブラシ＆頭皮マッサージブラシおすすめ人気10選！ukaケンザン・ReFa・エトヴォスなど冬の温感セルフヘッドスパ徹底比較",
    subtitle: "寒冷で硬化した帽状腱膜をほぐし抜け毛・乾燥フケ・顔のたるみをリセット！ukaケンザン（黒・バリカタ・ソフト）、ReFa、エトヴォス、MARKS&WEB、AVEDAなど、自宅でサロン級ヘッドスパを叶える名品10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "寒冷で硬化した帽状腱膜をほぐし抜け毛・乾燥フケ・顔のたるみをリセット！ukaケンザン（黒・バリカタ・ソフト）、ReFa、エトヴォス、MARKS&WEB、AVEDAなど、自宅でサロン級ヘッドスパを叶える名品10選！",
    isHallOfFame: true,
    coverImage: scalpItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scalp.jpg",
    recommendedItemCodes: scalpArticles.map(a => a.id),
    contentMarkdown: scalpContent
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
