import fs from 'fs';
import path from 'path';
import {
  patchItemsRaw,
  co2ItemsRaw,
  ccbbItemsRaw,
  patchArticles,
  co2Articles,
  ccbbArticles
} from './insert_winter_batch51_helper.mjs';

import { getPatchArticleContent } from './winter_batch51_article1_patch.mjs';
import { getCo2ArticleContent } from './winter_batch51_article2_co2.mjs';
import { getCcbbArticleContent } from './winter_batch51_article3_ccbb.mjs';

console.log('🚀 [冬コスメ 第51弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const patchContent = getPatchArticleContent();
const co2Content = getCo2ArticleContent();
const ccbbContent = getCcbbArticleContent();

console.log(`- 記事1 (ヒアルロン酸マイクロニードルパッチ) 文字数: 約${patchContent.length}文字`);
console.log(`- 記事2 (高濃度炭酸泡美容液＆炭酸ガスパック) 文字数: 約${co2Content.length}文字`);
console.log(`- 記事3 (高保湿トーンアップCC＆美容液BBクリーム) 文字数: 約${ccbbContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (patchContent.length < 5000 || co2Content.length < 5000 || ccbbContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-microneedle-hyaluron-patch-wrinkle-repair-2026",
    slug: "winter-microneedle-hyaluron-patch-wrinkle-repair-2026",
    title: "【2026冬・目元・ほうれい線の刻まれた乾燥小じわを寝ている間に集中消去】高濃度ヒアルロン酸マイクロニードルパッチ＆刺すエイジングケアシートおすすめ人気10選！暖房砂漠のちりめんジワ・たるみ溝を皮膚科学でふっくら押し戻す最新ニードル比較",
    subtitle: "塗るアイクリームを超えたDDS浸透！北の快適工房、クオニス、VTリードル、ヤーマン、ナビジョン、クリアターンなど、高分子ヒアルロン酸を結晶針にして角層深部へ直接ダイレクト注入する冬の集中リンクルケア10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "塗るアイクリームを超えたDDS浸透！北の快適工房、クオニス、VTリードル、ヤーマン、ナビジョン、クリアターンなど、高分子ヒアルロン酸を結晶針にして角層深部へ直接ダイレクト注入する冬の集中リンクルケア10選！",
    isHallOfFame: true,
    coverImage: patchItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/patch.jpg",
    recommendedItemCodes: patchArticles.map(a => a.id),
    contentMarkdown: patchContent
  },
  {
    id: "feat-winter-carbonic-acid-co2-bohr-serum-mask-2026",
    slug: "winter-carbonic-acid-co2-bohr-serum-mask-2026",
    title: "【2026冬・寒さで滞った血行不良＆くすみ・ゴワつき肌を劇的覚醒】高濃度炭酸泡美容液＆炭酸ガスパック（CO2パック）おすすめ人気10選！ボーア効果で細胞に酸素を届け透明感とハリを宿す冬の土台スキンケア徹底比較",
    subtitle: "冷え切った冬の肌を細胞レベルで酸素チャージ！ソフィーナiP、エニシーグローパック、ドクターメディオン、EKATO、estセラムワン、Yunthなど、ボーア効果で血流を跳ね上げ透明感ともちもち弾力を呼び覚ます炭酸コスメ10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "冷え切った冬の肌を細胞レベルで酸素チャージ！ソフィーナiP、エニシーグローパック、ドクターメディオン、EKATO、estセラムワン、Yunthなど、ボーア効果で血流を跳ね上げ透明感ともちもち弾力を呼び覚ます炭酸コスメ10選！",
    isHallOfFame: true,
    coverImage: co2ItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/co2.jpg",
    recommendedItemCodes: co2Articles.map(a => a.id),
    contentMarkdown: co2Content
  },
  {
    id: "feat-winter-hydrating-tone-up-cc-serum-bb-cream-2026",
    slug: "winter-hydrating-tone-up-cc-serum-bb-cream-2026",
    title: "【2026冬・暖房乾燥でも素肌が息づく・マスク摩擦＆粉ふき知らず】高保湿トーンアップCCクリーム＆美容液BBクリームおすすめ人気10選！美容液成分80%以上で一日中みずみずしい潤膜と素肌美をキープする冬の時短ベースメイク徹底比較",
    subtitle: "重たいファンデを脱ぎ捨てて、一日中乾かない素肌美へ！コスメデコルテ、ラロッシュポゼ、エトヴォス、ランコムBB、カバーマーク、dプログラムなど、美容液成分80%以上で乾燥割れ・毛穴落ちをゼロにする神CC＆BB10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-06",
    readTimeMinutes: 28,
    introText: "重たいファンデを脱ぎ捨てて、一日中乾かない素肌美へ！コスメデコルテ、ラロッシュポゼ、エトヴォス、ランコムBB、カバーマーク、dプログラムなど、美容液成分80%以上で乾燥割れ・毛穴落ちをゼロにする神CC＆BB10選！",
    isHallOfFame: true,
    coverImage: ccbbItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/ccbb.jpg",
    recommendedItemCodes: ccbbArticles.map(a => a.id),
    contentMarkdown: ccbbContent
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
  console.log(`✅ src/data.ts に 3 つの新規冬特集記事を登録しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

console.log('🎉 第51弾の全記事統合処理が正常に完了しました！');
