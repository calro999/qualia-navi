// scripts/insert_autumn_series23_main.mjs
import fs from 'fs';
import path from 'path';
import {
  handSerumItemsRaw,
  lashItemsRaw,
  jojobaItemsRaw,
  handSerumArticles,
  lashArticles,
  jojobaArticles,
  updateArticlesJson
} from './insert_autumn_series23_helper.mjs';

import { getHandSerumArticleContent } from './autumn_series23_article1_handserum.mjs';
import { getLashArticleContent } from './autumn_series23_article2_lash.mjs';
import { getJojobaArticleContent } from './autumn_series23_article3_jojoba.mjs';

console.log('🍂 [2026秋コスメ特集 第23弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const handSerumContent = getHandSerumArticleContent();
const lashContent = getLashArticleContent();
const jojobaContent = getJojobaArticleContent();

console.log(`- 記事1 (秋薬用美白・シワ改善ハンドセラム10選) 文字数: 約${handSerumContent.length}文字`);
console.log(`- 記事2 (秋高濃度まつ毛美容液10選) 文字数: 約${lashContent.length}文字`);
console.log(`- 記事3 (秋高純度オーガニックホホバオイル10選) 文字数: 約${jojobaContent.length}文字`);

if (handSerumContent.length < 5000 || lashContent.length < 5000 || jojobaContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-anti-aging-hand-serum-whitening-wrinkle-10",
    slug: "autumn-anti-aging-hand-serum-whitening-wrinkle-10",
    title: "【秋の冷え・手肌の血管浮き・小ジワに】薬用美白＆高保湿ハンドセラム10選",
    subtitle: "クリームの前に仕込む手の美容液！ナイアシンアミド・ビタミンC誘導体・生プラセンタ配合で手肌のくすみ・骨っぽさ・乾燥シワを根本からふっくら若見えさせる名品完全比較",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 38,
    introText: "クリームの前に仕込む手の美容液！ナイアシンアミド・ビタミンC誘導体・生プラセンタ配合で手肌のくすみ・骨っぽさ・乾燥シワを根本からふっくら若見えさせる名品完全比較",
    isHallOfFame: true,
    coverImage: handSerumItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/handserum.jpg",
    recommendedItemCodes: handSerumArticles.map(a => a.id),
    contentMarkdown: handSerumContent
  },
  {
    id: "feat-autumn-eyelash-nourishing-serum-damage-repair-10",
    slug: "autumn-eyelash-nourishing-serum-damage-repair-10",
    title: "【秋の抜け毛・乾燥パサつきまつ毛に】高濃度補修まつ毛美容液10選",
    subtitle: "紫外線ダメージと空気の乾燥で抜けやすくなった自まつ毛を集中ケア！幹細胞培養液・高濃度ペプチド・ケラチン配合でまつ毛パーマやマツエクを美しく保つ本格セラム完全ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 37,
    introText: "紫外線ダメージと空気の乾燥で抜けやすくなった自まつ毛を集中ケア！幹細胞培養液・高濃度ペプチド・ケラチン配合でまつ毛パーマやマツエクを美しく保つ本格セラム完全ガイド",
    isHallOfFame: true,
    coverImage: lashItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lash.jpg",
    recommendedItemCodes: lashArticles.map(a => a.id),
    contentMarkdown: lashContent
  },
  {
    id: "feat-autumn-pure-jojoba-multi-organic-oil-dry-10",
    slug: "autumn-pure-jojoba-multi-organic-oil-dry-10",
    title: "【秋の頭皮・髪のパサつき・全身乾燥に】高純度オーガニックホホバオイル10選",
    subtitle: "人の皮脂に近いワックスエステルが全身のバリア機能を鉄壁ガード！ブースター・頭皮クレンジング・毛先オイル・お風呂上がりのボディケアまでこなす天然万能オイル完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-23",
    readTimeMinutes: 36,
    introText: "人の皮脂に近いワックスエステルが全身のバリア機能を鉄壁ガード！ブースター・頭皮クレンジング・毛先オイル・お風呂上がりのボディケアまでこなす天然万能オイル完全網羅",
    isHallOfFame: true,
    coverImage: jojobaItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/jojoba.jpg",
    recommendedItemCodes: jojobaArticles.map(a => a.id),
    contentMarkdown: jojobaContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に秋コスメ第23弾の3大特集記事を挿入しました！');
} else {
  console.error('❌ src/data.ts に INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}

// 2. scripts/autumn_posts_meta.json に第23弾の3記事を追加
const metaPath = path.resolve('scripts/autumn_posts_meta.json');
let metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const newMetas = [
  { "series": 23, "slug": "autumn-anti-aging-hand-serum-whitening-wrinkle-10", "category": "ハンド＆ボディケア", "concern": "秋の冷え・手肌の血管浮き・小ジワ・くすみ改善", "shortTitle": "薬用美白＆高保湿ハンドセラム10選" },
  { "series": 23, "slug": "autumn-eyelash-nourishing-serum-damage-repair-10", "category": "アイゾーンケア", "concern": "秋の抜け毛・乾燥パサつき・まつ毛パーマのダメージ補修", "shortTitle": "高濃度補修まつ毛美容液10選" },
  { "series": 23, "slug": "autumn-pure-jojoba-multi-organic-oil-dry-10", "category": "マルチスキンケアオイル", "concern": "頭皮のフケかゆみ・髪の静電気パサつき・全身の粉ふき乾燥", "shortTitle": "高純度オーガニックホホバオイル10選" }
];

for (const nm of newMetas) {
  if (!metaList.some(m => m.slug === nm.slug)) {
    metaList.unshift(nm);
  }
}
fs.writeFileSync(metaPath, JSON.stringify(metaList, null, 2), 'utf8');
console.log('✅ scripts/autumn_posts_meta.json を更新しました！');

console.log('🎉 第23弾の統合処理がすべて正常に完了しました！');
