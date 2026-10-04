import fs from 'fs';
import path from 'path';
import {
  brushItemsRaw,
  primerItemsRaw,
  hairTreatmentItemsRaw,
  brushArticles,
  primerArticles,
  hairTreatmentArticles
} from './insert_winter_batch37_helper.mjs';

import { getBrushArticleContent } from './winter_batch37_article1_brush.mjs';
import { getPrimerArticleContent } from './winter_batch37_article2_primer.mjs';
import { getHairTreatmentArticleContent } from './winter_batch37_article3_hair_treatment.mjs';

console.log('🚀 [冬コスメ 第37弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const brushContent = getBrushArticleContent();
const primerContent = getPrimerArticleContent();
const hairTreatmentContent = getHairTreatmentArticleContent();

console.log(`- 記事1 (高級メイクブラシセット＆熊野筆) 文字数: 約${brushContent.length}文字`);
console.log(`- 記事2 (高保湿モイスト下地・プライマー) 文字数: 約${primerContent.length}文字`);
console.log(`- 記事3 (サロン級ケラチン＆酸熱ヘアマスク) 文字数: 約${hairTreatmentContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (brushContent.length < 5000 || primerContent.length < 5000 || hairTreatmentContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-makeup-brush-set-kumano-2026",
    slug: "winter-holiday-makeup-brush-set-kumano-2026",
    title: "【2026冬・ホリデー限定＆冬ギフト本命】極上肌あたりでメイクの仕上がりが激変！高級メイクブラシセット＆熊野筆・ホリデーコレクションおすすめ人気10選！プロ級の透明感とツヤ肌を叶える名品徹底比較",
    subtitle: "手持ちコスメの発色と密着感を150%底上げする魔法のツール！冬の乾燥肌にもチクチクしない極上タッチの伝統工芸・熊野筆、SIXPLUS、資生堂、白鳳堂など、自分へのご褒美やクリスマスプレゼントに選ばれる名品ブラシ10選をプロが徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "手持ちコスメの発色と密着感を150%底上げする魔法のツール！冬の乾燥肌にもチクチクしない極上タッチの伝統工芸・熊野筆、SIXPLUS、資生堂、白鳳堂など、自分へのご褒美やクリスマスプレゼントに選ばれる名品ブラシ10選をプロが徹底比較！",
    isHallOfFame: true,
    coverImage: brushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/makeup_brush.jpg",
    recommendedItemCodes: brushArticles.map(a => a.id),
    contentMarkdown: brushContent
  },
  {
    id: "feat-winter-hydrating-moist-makeup-primer-base-2026",
    slug: "winter-hydrating-moist-makeup-primer-base-2026",
    title: "【2026冬・乾燥崩れ＆粉吹きを一日中ブロック】美容液成分80%以上！高保湿モイストメイク下地・うるおいツヤ肌プライマーおすすめ人気10選！暖房下でもひび割れない発光美肌の作り方",
    subtitle: "11〜12月の急激な空気乾燥とエアコン暖房によるファンデの粉吹き・ひび割れ・毛穴落ちを完全防御！クレ・ド・ポー ボーテ、コスメデコルテ、ポール＆ジョー、カネボウ、ダルバなど、美容液級の保水ヴェールで一日中生ツヤ肌をキープする名品10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "11〜12月の急激な空気乾燥とエアコン暖房によるファンデの粉吹き・ひび割れ・毛穴落ちを完全防御！クレ・ド・ポー ボーテ、コスメデコルテ、ポール＆ジョー、カネボウ、ダルバなど、美容液級の保水ヴェールで一日中生ツヤ肌をキープする名品10選を徹底比較！",
    isHallOfFame: true,
    coverImage: primerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/moist_primer.jpg",
    recommendedItemCodes: primerArticles.map(a => a.id),
    contentMarkdown: primerContent
  },
  {
    id: "feat-winter-keratin-acid-heat-hair-mask-treatment-2026",
    slug: "winter-keratin-acid-heat-hair-mask-treatment-2026",
    title: "【2026冬・静電気＆マフラー摩擦で傷んだ髪を芯から再生】サロン級の髪質改善！高濃度ケラチン＆酸熱トリートメント・集中補修ヘアマスクおすすめ人気10選！パサつき・うねりをリセットするとぅるん髪へ",
    subtitle: "11〜12月の木枯らしやマフラー摩擦、暖房熱でタンパク質が流出した深刻なダメージ毛を救済！毛髪の85%を占めるケラチン補給と酸熱架橋テクノロジーで、サロン帰りの指通りを自宅で再現するミルボン、フィーノ、生ケラチン原液、オラプレックスなど厳選10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 20,
    introText: "11〜12月の木枯らしやマフラー摩擦、暖房熱でタンパク質が流出した深刻なダメージ毛を救済！毛髪の85%を占めるケラチン補給と酸熱架橋テクノロジーで、サロン帰りの指通りを自宅で再現するミルボン、フィーノ、生ケラチン原液、オラプレックスなど厳選10選を徹底比較！",
    isHallOfFame: true,
    coverImage: hairTreatmentItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair_treatment.jpg",
    recommendedItemCodes: hairTreatmentArticles.map(a => a.id),
    contentMarkdown: hairTreatmentContent
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
