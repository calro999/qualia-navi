import fs from 'fs';
import path from 'path';
import {
  waterHairItemsRaw,
  co2PackItemsRaw,
  wipeTonerItemsRaw,
  waterHairArticles,
  co2PackArticles,
  wipeTonerArticles
} from './insert_winter_batch76_helper.mjs';

import { getWaterHairArticleContent } from './winter_batch76_article1_water_treatment.mjs';
import { getCo2PackArticleContent } from './winter_batch76_article2_co2_pack.mjs';
import { getWipeTonerArticleContent } from './winter_batch76_article3_wipe_toner.mjs';

console.log('🚀 [冬コスメ 第76弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const waterHairContent = getWaterHairArticleContent();
const co2PackContent = getCo2PackArticleContent();
const wipeTonerContent = getWipeTonerArticleContent();

console.log(`- 記事1 (ウォータートリートメント＆温感リキッドトリートメント) 文字数: 約${waterHairContent.length}文字`);
console.log(`- 記事2 (濃密炭酸パック＆生ジェル炭酸ガスパック) 文字数: 約${co2PackContent.length}文字`);
console.log(`- 記事3 (高保湿ふき取り化粧水＆角質柔軟ピールローション) 文字数: 約${wipeTonerContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (waterHairContent.length < 5000 || co2PackContent.length < 5000 || wipeTonerContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-instant-water-treatment-liquid-hair-care-2026",
    slug: "winter-instant-water-treatment-liquid-hair-care-2026",
    title: "【2026冬・寒いお風呂で待たずに秒速ちゅるん髪】ウォータートリートメント＆温感リキッドトリートメントおすすめ人気10選！モレモ・ロレアル・ヘッドスパ7・サロニア徹底比較！放置時間ゼロ×微発熱スチーム効果で乾燥パサつき髪を集中リペア",
    subtitle: "11〜12月の寒いお風呂で放置時間を待たずに、微発熱スチーム反応と高浸透リキッド処方で傷んだキューティクルを瞬時にちゅるんと密閉補修する時短ウォータートリートメント10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 31,
    introText: "11〜12月の寒いお風呂で放置時間を待たずに、微発熱スチーム反応と高浸透リキッド処方で傷んだキューティクルを瞬時にちゅるんと密閉補修する時短ウォータートリートメント10選！",
    isHallOfFame: true,
    coverImage: waterHairItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/water.jpg",
    recommendedItemCodes: waterHairArticles.map(a => a.id),
    contentMarkdown: waterHairContent
  },
  {
    id: "feat-winter-co2-carbonated-gel-mask-pack-radiance-2026",
    slug: "winter-co2-carbonated-gel-mask-pack-radiance-2026",
    title: "【2026冬・冷えくすみ＆代謝低下のゴワつき毛穴を一掃】濃密炭酸パック＆生ジェル炭酸ガスパックおすすめ人気10選！エニシー・ドクターメディオン・フェヴリナ・ユレイル徹底比較！ボーア効果で血行促進×ホリデー前の極上エステ級セルフケア",
    subtitle: "11〜12月の気温低下で血行が滞り、ゴワつきやくすみが気になる真冬の肌を、医療発想のボーア効果と高濃度生炭酸ガスで内側から呼び覚ますプレミアム集中ケアパック10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 33,
    introText: "11〜12月の気温低下で血行が滞り、ゴワつきやくすみが気になる真冬の肌を、医療発想のボーア効果と高濃度生炭酸ガスで内側から呼び覚ますプレミアム集中ケアパック10選！",
    isHallOfFame: true,
    coverImage: co2PackItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/co2.jpg",
    recommendedItemCodes: co2PackArticles.map(a => a.id),
    contentMarkdown: co2PackContent
  },
  {
    id: "feat-winter-hydrating-wiping-toner-peel-lotion-2026",
    slug: "winter-hydrating-wiping-toner-peel-lotion-2026",
    title: "【2026冬・極寒の朝洗顔卒業＆化粧ノリ劇的復活】高保湿ふき取り化粧水＆角質柔軟ピールローションおすすめ人気10選！カネボウ・タカミ・ベネフィーク・クリニーク徹底比較！暖房乾燥の古い角質を摩擦レス除去×ブースター効果で吸いつく素肌へ",
    subtitle: "11〜12月の極寒の朝に辛い冷水洗顔を卒業し、寝ている間の皮脂や不要な古い角質をうるおいでやさしくオフして化粧ノリを劇的に高める高保湿ふき取り化粧水10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 32,
    introText: "11〜12月の極寒の朝に辛い冷水洗顔を卒業し、寝ている間の皮脂や不要な古い角質をうるおいでやさしくオフして化粧ノリを劇的に高める高保湿ふき取り化粧水10選！",
    isHallOfFame: true,
    coverImage: wipeTonerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/wipe.jpg",
    recommendedItemCodes: wipeTonerArticles.map(a => a.id),
    contentMarkdown: wipeTonerContent
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
  console.log('✅ src/data.ts に第76弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
