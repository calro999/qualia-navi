// scripts/insert_autumn_series20_main.mjs
import fs from 'fs';
import path from 'path';
import {
  scalpItemsRaw,
  shadowItemsRaw,
  carbonicItemsRaw,
  scalpArticles,
  shadowArticles,
  carbonicArticles,
  updateArticlesJson
} from './insert_autumn_series20_helper.mjs';

import { getScalpArticleContent } from './autumn_series20_article1_scalp.mjs';
import { getShadowArticleContent } from './autumn_series20_article2_shadow.mjs';
import { getCarbonicArticleContent } from './autumn_series20_article3_carbonic.mjs';

console.log('🍂 [2026秋コスメ特集 第20弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const scalpContent = getScalpArticleContent();
const shadowContent = getShadowArticleContent();
const carbonicContent = getCarbonicArticleContent();

console.log(`- 記事1 (秋薬用高保湿スカルプローション10選) 文字数: 約${scalpContent.length}文字`);
console.log(`- 記事2 (秋高保湿スティックアイシャドウ10選) 文字数: 約${shadowContent.length}文字`);
console.log(`- 記事3 (秋高濃度炭酸・重炭酸入浴剤10選) 文字数: 約${carbonicContent.length}文字`);

if (scalpContent.length < 5000 || shadowContent.length < 5000 || carbonicContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-scalp-lotion-dry-itch-dandruff-10",
    slug: "autumn-scalp-lotion-dry-itch-dandruff-10",
    title: "【急な乾燥と冷えによる頭皮のフケ・かゆみに】薬用高保湿スカルプローション＆頭皮美容液10選",
    subtitle: "夏の紫外線疲労と秋の湿度低下で乱れた頭皮バリアを集中補修！抗炎症成分＆生体アミノ酸・炭酸微細泡でフケやかゆみ・秋の抜け毛を徹底予防する実力派スカルプケア完全比較",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 38,
    introText: "夏の紫外線疲労と秋の湿度低下で乱れた頭皮バリアを集中補修！抗炎症成分＆生体アミノ酸・炭酸微細泡でフケやかゆみ・秋の抜け毛を徹底予防する実力派スカルプケア完全比較",
    isHallOfFame: true,
    coverImage: scalpItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scalp.jpg",
    recommendedItemCodes: scalpArticles.map(a => a.id),
    contentMarkdown: scalpContent
  },
  {
    id: "feat-autumn-moist-stick-eyeshadow-aegyo-sal-10",
    slug: "autumn-moist-stick-eyeshadow-aegyo-sal-10",
    title: "【乾燥小ジワの粉落ちを防ぎ濡れツヤ宿す】大人のぷっくり涙袋！高保湿スティックアイシャドウ10選",
    subtitle: "パウダーが粉飛びする秋の乾燥まぶたにオイルワックスベースがスルスル密着！大人のくぼみ目やくすみを上品なパールと光で飛ばし一日中ヨレない立体アイを叶える名品完全ガイド",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 37,
    introText: "パウダーが粉飛びする秋の乾燥まぶたにオイルワックスベースがスルスル密着！大人のくぼみ目やくすみを上品なパールと光で飛ばし一日中ヨレない立体アイを叶える名品完全ガイド",
    isHallOfFame: true,
    coverImage: shadowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/shadow.jpg",
    recommendedItemCodes: shadowArticles.map(a => a.id),
    contentMarkdown: shadowContent
  },
  {
    id: "feat-autumn-carbonic-acid-bath-tablet-cold-warm-10",
    slug: "autumn-carbonic-acid-bath-tablet-cold-warm-10",
    title: "【秋の冷え・湯冷め・疲労を芯から温める】高濃度炭酸入浴剤＆薬用重炭酸タブレット10選",
    subtitle: "手足の冷えと秋の夜長の睡眠不足をぬるめ温浴で一掃！お湯に24時間溶け込み続ける中性重炭酸イオンが血流を劇的に促進し就寝時まで足先ポカポカが続く本格温活入浴剤完全網羅",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 36,
    introText: "手足の冷えと秋の夜長の睡眠不足をぬるめ温浴で一掃！お湯に24時間溶け込み続ける中性重炭酸イオンが血流を劇的に促進し就寝時まで足先ポカポカが続く本格温活入浴剤完全網羅",
    isHallOfFame: true,
    coverImage: carbonicItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/carbonic.jpg",
    recommendedItemCodes: carbonicArticles.map(a => a.id),
    contentMarkdown: carbonicContent
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
    blogPostsMarker + '\n' + jsonToInsert
  );
  fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第20弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第20弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 20, "slug": "autumn-scalp-lotion-dry-itch-dandruff-10", "category": "ヘアケア", "concern": "秋の急な湿度低下と紫外線疲労による頭皮の乾燥・フケ・かゆみ・抜け毛", "shortTitle": "薬用高保湿スカルプローション＆頭皮美容液10選" },
  { "series": 20, "slug": "autumn-moist-stick-eyeshadow-aegyo-sal-10", "category": "アイメイク", "concern": "乾燥による目元小ジワの粉飛び・夕方のくすみ・大人の涙袋ハイライト", "shortTitle": "大人のぷっくり涙袋！高保湿スティックアイシャドウ10選" },
  { "series": 20, "slug": "autumn-carbonic-acid-bath-tablet-cold-warm-10", "category": "ボディケア", "concern": "朝晩の冷え込みによる手足の先の冷え・湯冷め・慢性的疲労", "shortTitle": "高濃度炭酸入浴剤＆薬用重炭酸タブレット10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第20弾の統合処理がすべて正常に完了しました！');
