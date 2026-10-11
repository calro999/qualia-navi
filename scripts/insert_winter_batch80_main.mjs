import fs from 'fs';
import path from 'path';
import {
  plumperItemsRaw,
  maskItemsRaw,
  hairMaskItemsRaw,
  plumperArticles,
  maskArticles,
  hairMaskArticles,
  updateArticlesJson
} from './insert_winter_batch80_helper.mjs';

import { getPlumperArticleContent } from './winter_batch80_article1_plumper.mjs';
import { getSheetMaskArticleContent } from './winter_batch80_article2_sheetmask.mjs';
import { getHairMaskArticleContent } from './winter_batch80_article3_hairmask.mjs';

console.log('🚀 [冬コスメ 第80弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const plumperContent = getPlumperArticleContent();
const maskContent = getSheetMaskArticleContent();
const hairMaskContent = getHairMaskArticleContent();

console.log(`- 記事1 (高保湿リッププランパー) 文字数: 約${plumperContent.length}文字`);
console.log(`- 記事2 (高保湿シートマスク) 文字数: 約${maskContent.length}文字`);
console.log(`- 記事3 (濃厚集中ヘアマスク) 文字数: 約${hairMaskContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (plumperContent.length < 5000 || maskContent.length < 5000 || hairMaskContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-winter-hydrating-lip-plumper-serum-2026",
    slug: "winter-hydrating-lip-plumper-serum-2026",
    title: "【2026冬・唇の乾燥縦ジワ＆皮剥けを即レスキュー】高保湿リッププランパー＆濃密リップ美容液おすすめ人気10選！ディオール・ジルスチュアート・ヴィセ・ラネージュ徹底比較！ふっくら血色感あふれる極上ぷるツヤ唇へ",
    subtitle: "11〜12月の急激な気温低下と暖房乾燥による唇の皮剥け・縦ジワ・血色不良を即効レスキューし、濃密な美容液成分と温感・清涼プランプ効果でぷるんと弾むツヤ唇へ導く高保湿リッププランパー10選！",
    targetGender: "unisex",
    authorId: "author-shiraishi",
    authorName: "白石 梨乃",
    authorRole: "Qualia Navi リップメイク＆カラーコーディネーター",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 35,
    introText: "11〜12月の急激な気温低下と暖房乾燥による唇の皮剥け・縦ジワ・血色不良を即効レスキューし、濃密な美容液成分と温感・清涼プランプ効果でぷるんと弾むツヤ唇へ導く高保湿リッププランパー10選！",
    isHallOfFame: true,
    coverImage: plumperItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/plumper.jpg",
    recommendedItemCodes: plumperArticles.map(a => a.id),
    contentMarkdown: plumperContent
  },
  {
    id: "feat-winter-nourishing-sheet-mask-glow-2026",
    slug: "winter-nourishing-sheet-mask-glow-2026",
    title: "【2026冬・暖房砂漠の乾燥肌を満たす集中保湿】高保湿シートマスク＆濃密フェイスパックおすすめ人気10選！ルルルン・ダーマレーザー・メディヒール・トリデン徹底比較！翌朝の化粧ノリが劇的変化する冬のレスキューマスク",
    subtitle: "11〜12月の過酷な暖房砂漠でカサつく肌に濃密な水分と美容液を隙間なく届け、角層深くまで満たして翌朝のメイクのりを劇的に格上げする高保湿シートマスク10選！",
    targetGender: "unisex",
    authorId: "author-takanashi",
    authorName: "高梨 葵",
    authorRole: "Qualia Navi スキンケアスペシャリスト / 元化粧品開発",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 36,
    introText: "11〜12月の過酷な暖房砂漠でカサつく肌に濃密な水分と美容液を隙間なく届け、角層深くまで満たして翌朝のメイクのりを劇的に格上げする高保湿シートマスク10選！",
    isHallOfFame: true,
    coverImage: maskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mask.jpg",
    recommendedItemCodes: maskArticles.map(a => a.id),
    contentMarkdown: maskContent
  },
  {
    id: "feat-winter-deep-repair-hair-mask-salon-2026",
    slug: "winter-deep-repair-hair-mask-salon-2026",
    title: "【2026冬・静電気＆マフラー摩擦によるパサつきを撃退】濃厚ヘアマスク＆高保湿集中トリートメントおすすめ人気10選！フィーノ・TSUBAKI・ミルボン・ケラスターゼ徹底比較！芯から潤うサロン帰りのとぅるん髪へ",
    subtitle: "11〜12月のマフラー摩擦や静電気、外気の乾燥でパサつき・広がる冬のダメージ髪を芯から集中補修し、指通りの良いとぅるんとしたツヤ髪へ導く濃厚ヘアマスク10選！",
    targetGender: "unisex",
    authorId: "author-kamiya",
    authorName: "神谷 俊介",
    authorRole: "Qualia Navi ヘアケアディレクター / サロンオーナー",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 34,
    introText: "11〜12月のマフラー摩擦や静電気、外気の乾燥でパサつき・広がる冬のダメージ髪を芯から集中補修し、指通りの良いとぅるんとしたツヤ髪へ導く濃厚ヘアマスク10選！",
    isHallOfFame: true,
    coverImage: hairMaskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hairmask.jpg",
    recommendedItemCodes: hairMaskArticles.map(a => a.id),
    contentMarkdown: hairMaskContent
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

console.log('🎉 第80弾の特集記事および商品記事の統合が完了しました！');
