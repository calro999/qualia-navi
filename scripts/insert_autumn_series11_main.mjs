import fs from 'fs';
import path from 'path';
import {
  lipOilItemsRaw,
  maskItemsRaw,
  milkItemsRaw,
  lipOilArticles,
  maskArticles,
  milkArticles,
  updateArticlesJson
} from './insert_autumn_series11_helper.mjs';

import { getLipOilArticleContent } from './autumn_series11_article1_lipoil.mjs';
import { getMaskArticleContent } from './autumn_series11_article2_mask.mjs';
import { getMilkArticleContent } from './autumn_series11_article3_milk.mjs';

console.log('🍂 [2026秋コスメ特集 第11弾] 特集記事の文字数検証と articles.json & data.ts への統合を開始します...');

const lipOilContent = getLipOilArticleContent();
const maskContent = getMaskArticleContent();
const milkContent = getMilkArticleContent();

console.log(`- 記事1 (秋リップオイル＆プランパー10選) 文字数: 約${lipOilContent.length}文字`);
console.log(`- 記事2 (秋美白集中シートマスク10選) 文字数: 約${maskContent.length}文字`);
console.log(`- 記事3 (秋高保湿ヘアミルク10選) 文字数: 約${milkContent.length}文字`);

if (lipOilContent.length < 5000 || maskContent.length < 5000 || milkContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

// 1. articles.json に30件の個別商品記事を追加
updateArticlesJson();

const blogPostsToAdd = [
  {
    id: "feat-autumn-lip-oil-plumper-cracked-lips-10",
    slug: "autumn-lip-oil-plumper-cracked-lips-10",
    title: "【木枯らしで唇がひび割れて皮剥けする季節に】縦ジワ消滅！秋の高保湿リップオイル＆プランパー10選",
    subtitle: "秋の乾燥風で荒れた唇を植物オイルで集中密閉！ヒアルロン酸＆カプサイシンでふっくら縦ジワを飛ばすプランプ名品完全比較",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 36,
    introText: "秋の乾燥風で荒れた唇を植物オイルで集中密閉！ヒアルロン酸＆カプサイシンでふっくら縦ジワを飛ばすプランプ名品完全比較",
    isHallOfFame: true,
    coverImage: lipOilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipoil.jpg",
    recommendedItemCodes: lipOilArticles.map(a => a.id),
    contentMarkdown: lipOilContent
  },
  {
    id: "feat-autumn-whitening-sheet-mask-sun-spots-10",
    slug: "autumn-whitening-sheet-mask-sun-spots-10",
    title: "【夏の紫外線ダメージでシミやくすみが濃くなる季節に】秋の美白集中リセット！高浸透シートマスク10選",
    subtitle: "夏に蓄積したメラニンが表面化する秋のシミ予備軍を徹底ブロック！トラネキサム酸・高浸透ビタミンC配合の美白パック完全検証",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 37,
    introText: "夏に蓄積したメラニンが表面化する秋のシミ予備軍を徹底ブロック！トラネキサム酸・高浸透ビタミンC配合の美白パック完全検証",
    isHallOfFame: true,
    coverImage: maskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mask.jpg",
    recommendedItemCodes: maskArticles.map(a => a.id),
    contentMarkdown: maskContent
  },
  {
    id: "feat-autumn-hair-milk-emulsion-frizzy-dry-10",
    slug: "autumn-hair-milk-emulsion-frizzy-dry-10",
    title: "【乾燥と静電気で髪が広がりパサつく季節に】しっとり潤い補給！秋の高保湿ヘアミルク＆エマルジョン10選",
    subtitle: "オイルだけでは届かない髪の芯へ水分をチャージ！ケラチン＆セラミドでパサつく毛先をとぅるんとまとめるアウトバスミルク完全ガイド",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-13",
    readTimeMinutes: 35,
    introText: "オイルだけでは届かない髪の芯へ水分をチャージ！ケラチン＆セラミドでパサつく毛先をとぅるんとまとめるアウトバスミルク完全ガイド",
    isHallOfFame: true,
    coverImage: milkItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/milk.jpg",
    recommendedItemCodes: milkArticles.map(a => a.id),
    contentMarkdown: milkContent
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
  console.log('✅ src/data.ts に第11弾の3記事を追加完了しました！');
} else {
  console.error('❌ src/data.ts 内に INITIAL_BLOG_POSTS の宣言が見つかりませんでした。');
  process.exit(1);
}

console.log('✨ 第11弾のデータ登録がすべて正常に完了しました。');
