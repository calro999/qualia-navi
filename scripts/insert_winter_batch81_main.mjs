import fs from 'fs';
import path from 'path';
import {
  highlighterItemsRaw,
  hairStickItemsRaw,
  primerItemsRaw,
  highlighterArticles,
  hairStickArticles,
  primerArticles,
  updateArticlesJson
} from './insert_winter_batch81_helper.mjs';

import { getHighlighterArticleContent } from './winter_batch81_article1_highlighter.mjs';
import { getHairStickArticleContent } from './winter_batch81_article2_hairstick.mjs';
import { getPrimerArticleContent } from './winter_batch81_article3_primer.mjs';

console.log('🚀 [冬コスメ 第81弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const highlighterContent = getHighlighterArticleContent();
const hairStickContent = getHairStickArticleContent();
const primerContent = getPrimerArticleContent();

console.log(`- 記事1 (生ツヤハイライター) 文字数: 約${highlighterContent.length}文字`);
console.log(`- 記事2 (アホ毛キープスティック) 文字数: 約${hairStickContent.length}文字`);
console.log(`- 記事3 (トーンアップ化粧下地) 文字数: 約${primerContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (highlighterContent.length < 5000 || hairStickContent.length < 5000 || primerContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-glow-highlighter-2026",
    slug: "winter-holiday-glow-highlighter-2026",
    title: "【2026冬・聖夜の濡れツヤ発光】スティックハイライト＆生ツヤハイライターおすすめ人気10選！シャネル・hince・ディオール・クレドポー徹底比較！乾燥肌でも粉浮きゼロの内側発光ツヤ肌へ",
    subtitle: "11〜12月のホリデーシーズンや真冬の過酷な暖房乾燥下でも粉浮き・小ジワ割れせず、まるで内側から水分が湧き出るような濡れツヤと立体骨格美を叶える高保湿スティック＆生ツヤハイライター10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 35,
    introText: "11〜12月のホリデーシーズンや真冬の過酷な暖房乾燥下でも粉浮き・小ジワ割れせず、まるで内側から水分が湧き出るような濡れツヤと立体骨格美を叶える高保湿スティック＆生ツヤハイライター10選！",
    isHallOfFame: true,
    coverImage: highlighterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/highlighter.jpg",
    recommendedItemCodes: highlighterArticles.map(a => a.id),
    contentMarkdown: highlighterContent
  },
  {
    id: "feat-winter-hair-point-repair-anti-static-stick-2026",
    slug: "winter-hair-point-repair-anti-static-stick-2026",
    title: "【2026冬・静電気＆マフラー摩擦によるアホ毛・浮き毛を即制覇】まとめ髪ポイントリペアブラシ＆アホ毛キープスティックおすすめ人気10選！プリュスオー・アンドハニー・ミルボン徹底比較！固めずサラリと整える美髪の救世主",
    subtitle: "11〜12月のマフラー着脱やウールコートによる静電気で大爆発するアホ毛や浮き毛、前髪の割れを、手を汚さず外出先でサッと整えて固めずサラサラキープする高機能ヘアマスカラ＆スティック10選！",
    targetGender: "unisex",
    authorId: "author-kamiya",
    authorName: "神谷 俊介",
    authorRole: "Qualia Navi ヘアケアディレクター / サロンオーナー",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 36,
    introText: "11〜12月のマフラー着脱やウールコートによる静電気で大爆発するアホ毛や浮き毛、前髪の割れを、手を汚さず外出先でサッと整えて固めずサラサラキープする高機能ヘアマスカラ＆スティック10選！",
    isHallOfFame: true,
    coverImage: hairStickItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hairstick.jpg",
    recommendedItemCodes: hairStickArticles.map(a => a.id),
    contentMarkdown: hairStickContent
  },
  {
    id: "feat-winter-lavender-pink-tone-up-color-primer-2026",
    slug: "winter-lavender-pink-tone-up-color-primer-2026",
    title: "【2026冬・寒さでくすむ冬肌に透明感とピュアな血色感を宿す】ラベンダー＆ピンク系コントロールカラー・トーンアップ化粧下地おすすめ人気10選！コスメデコルテ・エレガンス・ジルスチュアート・ダルバ徹底比較！血行不良の青白さ・黄ぐすみを光補正する魔法のベースメイク",
    subtitle: "11〜12月の寒さによる血行不良で青白く沈んだ肌や黄ぐすみに、色彩理論（補色効果）と高保湿美容液成分で澄み切った透明感と多幸感あふれる血色感を瞬時に宿すトーンアップ化粧下地10選！",
    targetGender: "unisex",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 34,
    introText: "11〜12月の寒さによる血行不良で青白く沈んだ肌や黄ぐすみに、色彩理論（補色効果）と高保湿美容液成分で澄み切った透明感と多幸感あふれる血色感を瞬時に宿すトーンアップ化粧下地10選！",
    isHallOfFame: true,
    coverImage: primerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/primer.jpg",
    recommendedItemCodes: primerArticles.map(a => a.id),
    contentMarkdown: primerContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に新規3特集記事を追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 第81弾の特集記事および商品記事の統合が完了しました！');
