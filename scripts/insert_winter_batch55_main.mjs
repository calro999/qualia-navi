import fs from 'fs';
import path from 'path';
import {
  emsBrushItemsRaw,
  txaItemsRaw,
  botoxItemsRaw,
  emsBrushArticles,
  txaArticles,
  botoxArticles
} from './insert_winter_batch55_helper.mjs';

import { getEmsBrushArticleContent } from './winter_batch55_article1_ems_brush.mjs';
import { getTranexamicArticleContent } from './winter_batch55_article2_tranexamic.mjs';
import { getBotoxArticleContent } from './winter_batch55_article3_botox_argireline.mjs';

console.log('🚀 [冬コスメ 第55弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const emsContent = getEmsBrushArticleContent();
const txaContent = getTranexamicArticleContent();
const botoxContent = getBotoxArticleContent();

console.log(`- 記事1 (EMSリフトブラシ) 文字数: 約${emsContent.length}文字`);
console.log(`- 記事2 (薬用トラネキサム酸) 文字数: 約${txaContent.length}文字`);
console.log(`- 記事3 (塗るボトックス) 文字数: 約${botoxContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (emsContent.length < 5000 || txaContent.length < 5000 || botoxContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-ems-electric-scalp-lift-brush-device-2026",
    slug: "winter-ems-electric-scalp-lift-brush-device-2026",
    title: "【2026冬・寒さで凝り固まる頭筋＆たるみフェイスラインを瞬間引き上げ】EMSリフトブラシ＆デンキバリブラシおすすめ人気10選！エレクトロン・サロニア・ヤーマン・MYTREXなど頭皮・顔・首肩の筋膜リリースで小顔リフトと美髪を叶える神美顔器徹底比較",
    subtitle: "冬の寒冷でロックされた頭皮（帽状腱膜・側頭筋）と首肩を解きほぐす！デンキバリブラシ2.0、サロニアEMSリフトブラシ、ミーゼスカルプリフトアクティブプラス、バイタリフトなど、頭筋リリースで劇的リフトアップを叶える最新電気ブラシ10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "冬の寒冷でロックされた頭皮（帽状腱膜・側頭筋）と首肩を解きほぐす！デンキバリブラシ2.0、サロニアEMSリフトブラシ、ミーゼスカルプリフトアクティブプラス、バイタリフトなど、頭筋リリースで劇的リフトアップを叶える最新電気ブラシ10選！",
    isHallOfFame: true,
    coverImage: emsBrushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/ems_brush.jpg",
    recommendedItemCodes: emsBrushArticles.map(a => a.id),
    contentMarkdown: emsContent
  },
  {
    id: "feat-winter-tranexamic-acid-medicated-whitening-serum-cream-2026",
    slug: "winter-tranexamic-acid-medicated-whitening-serum-cream-2026",
    title: "【2026冬・紫外線が最も弱い今こそ根こそぎ美白！頑固な肝斑＆色素沈着を狙い撃ち】高濃度薬用トラネキサム酸美容液＆美白リペアクリームおすすめ人気10選！トランシーノ・HAKU・肌ラボ・KISOなど抗炎症×メラニンブロックで冬の陶器透明肌へ導く傑作コスメ徹底比較",
    subtitle: "年間で紫外線量が最少の冬こそ美白集中投資のベストシーズン！HAKUメラノフォーカスEV、ホワイトロジスト、エリクシールスポットクリア、トゥヴェールなど、抗炎症×メラニン生成シグナル遮断で真冬の陶器白玉肌を育てる薬用トラネキサム酸コスメ10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 28,
    introText: "年間で紫外線量が最少の冬こそ美白集中投資のベストシーズン！HAKUメラノフォーカスEV、ホワイトロジスト、エリクシールスポットクリア、トゥヴェールなど、抗炎症×メラニン生成シグナル遮断で真冬の陶器白玉肌を育てる薬用トラネキサム酸コスメ10選！",
    isHallOfFame: true,
    coverImage: txaItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/txa.jpg",
    recommendedItemCodes: txaArticles.map(a => a.id),
    contentMarkdown: txaContent
  },
  {
    id: "feat-winter-argireline-peptide-botox-wrinkle-repair-serum-2026",
    slug: "winter-argireline-peptide-botox-wrinkle-repair-serum-2026",
    title: "【2026冬・乾燥寒冷で深く刻まれる眉間・目尻・額の表情ジワを押し戻す】塗るボトックス（アルジレリン＆シンエイク＆ボツリヌスペプチド）集中エイジングケア美容液おすすめ人気10選！ボトックス注射発想の筋肉緊張緩和×濃密保水でピーンと張った若見えピンポイントセラム徹底比較",
    subtitle: "寒冷と暖房乾燥で形状記憶される眉間・額・目尻の折り目ジワを解除！The Ordinaryアルジレリン10%、メディキューブPDRN、ナチュラス目元原液、BS-COSMEなど、表情筋の過剰緊張をほぐしてピーンとした若々しいハリをもたらす塗るボトックス美容液10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 28,
    introText: "寒冷と暖房乾燥で形状記憶される眉間・額・目尻の折り目ジワを解除！The Ordinaryアルジレリン10%、メディキューブPDRN、ナチュラス目元原液、BS-COSMEなど、表情筋の過剰緊張をほぐしてピーンとした若々しいハリをもたらす塗るボトックス美容液10選！",
    isHallOfFame: true,
    coverImage: botoxItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/botox.jpg",
    recommendedItemCodes: botoxArticles.map(a => a.id),
    contentMarkdown: botoxContent
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

// 追加後の記事総数を確認
const finalCount = (dataTsContent.match(/id:\s*"feat-winter-/g) || []).length;
console.log(`🎉 登録完了！冬特集記事の総数: ${finalCount}件以上`);
