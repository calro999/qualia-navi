// scripts/update_killer_6_articles.mjs
import fs from 'fs';
import path from 'path';

import {
  peelItemsRaw,
  cheekItemsRaw,
  nightItemsRaw,
  peelArticles,
  cheekArticles,
  nightArticles
} from './insert_autumn_series26_helper.mjs';

import {
  carbonItemsRaw,
  browItemsRaw,
  shampooItemsRaw,
  carbonArticles,
  browArticles,
  shampooArticles
} from './insert_autumn_series27_helper.mjs';

import { getPeelArticleContent } from './autumn_series26_article1_peel.mjs';
import { getCheekArticleContent } from './autumn_series26_article2_cheek.mjs';
import { getNightArticleContent } from './autumn_series26_article3_night.mjs';

import { getCarbonArticleContent } from './autumn_series27_article1_carbon.mjs';
import { getBrowArticleContent } from './autumn_series27_article2_brow.mjs';
import { getShampooArticleContent } from './autumn_series27_article3_shampoo.mjs';

console.log('🔥 [キラー記事化アップデート] 第26弾（3記事）＋第27弾（3記事）の合計6記事を徹底ブラッシュアップ版で上書き更新します...');

const carbonContent = getCarbonArticleContent();
const browContent = getBrowArticleContent();
const shampooContent = getShampooArticleContent();

const peelContent = getPeelArticleContent();
const cheekContent = getCheekArticleContent();
const nightContent = getNightArticleContent();

console.log('📊 キラー記事化後の文字数レポート:');
console.log(`  1. [第27弾-1] 高濃度炭酸パック＆炭酸洗顔10選: ${carbonContent.length.toLocaleString()} 文字`);
console.log(`  2. [第27弾-2] 落ちない眉ティント＆高耐久アイブロウ10選: ${browContent.length.toLocaleString()} 文字`);
console.log(`  3. [第27弾-3] 高保湿クレイ＆クリームシャンプー10選: ${shampooContent.length.toLocaleString()} 文字`);
console.log(`  4. [第26弾-1] 角質柔軟ピーリング美容液10選: ${peelContent.length.toLocaleString()} 文字`);
console.log(`  5. [第26弾-2] 美容液リキッドチーク10選: ${cheekContent.length.toLocaleString()} 文字`);
console.log(`  6. [第26弾-3] 濃厚ナイトリペアクリーム10選: ${nightContent.length.toLocaleString()} 文字`);

const updatedSixPosts = [
  // 第27弾の3記事
  {
    id: "feat-autumn-carbonated-pack-foam-dullness-pores-10",
    slug: "autumn-carbonated-pack-foam-dullness-pores-10",
    title: "【秋の冷えによる土色くすみ・開き毛穴に】高濃度炭酸パック＆炭酸洗顔10選",
    subtitle: "気温低下で収縮した毛細血管をボーア効果で一気に拡張！濃密マイクロ炭酸泡とクレイが毛穴奥の酸化皮脂を溶かし出し内側からポッと上気した水光透明肌を呼び覚ます名品完全比較",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-25",
    readTimeMinutes: 48,
    introText: "気温低下で収縮した毛細血管をボーア効果で一気に拡張！濃密マイクロ炭酸泡とクレイが毛穴奥の酸化皮脂を溶かし出し内側からポッと上気した水光透明肌を呼び覚ます名品完全比較",
    isHallOfFame: true,
    coverImage: carbonItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/carbon.jpg",
    recommendedItemCodes: carbonArticles.map(a => a.id),
    contentMarkdown: carbonContent
  },
  {
    id: "feat-autumn-eyebrow-tint-coat-smudge-proof-10",
    slug: "autumn-eyebrow-tint-coat-smudge-proof-10",
    title: "【秋の夕方の眉尻消失・まばら薄眉に】落ちない眉ティント＆高耐久アイブロウ10選",
    subtitle: "インナードライ皮脂と前髪・ニット着脱の摩擦で消える眉尻を最大7日間鉄壁ロック！セルフタンニング角質染色＆4Dフォーク筆で本物の毛並みを再現し朝のメイクを30秒に短縮する決定版ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-25",
    readTimeMinutes: 47,
    introText: "インナードライ皮脂と前髪・ニット着脱の摩擦で消える眉尻を最大7日間鉄壁ロック！セルフタンニング角質染色＆4Dフォーク筆で本物の毛並みを再現し朝のメイクを30秒に短縮する決定版ガイド",
    isHallOfFame: true,
    coverImage: browItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/brow.jpg",
    recommendedItemCodes: browArticles.map(a => a.id),
    contentMarkdown: browContent
  },
  {
    id: "feat-autumn-clay-cream-shampoo-dry-scalp-10",
    slug: "autumn-clay-cream-shampoo-dry-scalp-10",
    title: "【秋の頭皮の乾燥フケ・かゆみ・パサつき髪に】高保湿クレイ＆クリームシャンプー10選",
    subtitle: "泡立つ界面活性剤による皮脂の奪いすぎと摩擦ダメージを完全ゼロへ！ミネラルクレイ・レチノール・植物オイル配合の濃厚クリームで頭皮スパから毛先補修まで1本完結させる完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-25",
    readTimeMinutes: 48,
    introText: "泡立つ界面活性剤による皮脂の奪いすぎと摩擦ダメージを完全ゼロへ！ミネラルクレイ・レチノール・植物オイル配合の濃厚クリームで頭皮スパから毛先補修まで1本完結させる完全網羅",
    isHallOfFame: true,
    coverImage: shampooItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/shampoo.jpg",
    recommendedItemCodes: shampooArticles.map(a => a.id),
    contentMarkdown: shampooContent
  },
  // 第26弾の3記事
  {
    id: "feat-autumn-mild-peeling-serum-smooth-pores-10",
    slug: "autumn-mild-peeling-serum-smooth-pores-10",
    title: "【秋のゴワつき毛穴・化粧水弾き肌に】角質柔軟ピーリング美容液10選",
    subtitle: "夏の紫外線ダメージによる遅れてきた角質肥厚を摩擦レスにほぐす！サリチル酸・乳酸・フルーツ酸配合で浸透ルートを再開通させむき卵のようなつるすべ美肌へ導く名品完全比較",
    targetGender: "women",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター / 乾燥肌・バリア機能担当",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 49,
    introText: "夏の紫外線ダメージによる遅れてきた角質肥厚を摩擦レスにほぐす！サリチル酸・乳酸・フルーツ酸配合で浸透ルートを再開通させむき卵のようなつるすべ美肌へ導く名品完全比較",
    isHallOfFame: true,
    coverImage: peelItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/peel.jpg",
    recommendedItemCodes: peelArticles.map(a => a.id),
    contentMarkdown: peelContent
  },
  {
    id: "feat-autumn-hydrating-liquid-blush-cheek-10",
    slug: "autumn-hydrating-liquid-blush-cheek-10",
    title: "【秋の乾燥によるチーク粉浮き・血色レスに】美容液リキッドチーク10選",
    subtitle: "パウダーが粉っぽく小ジワに割れる秋の頬に！美容オイルとヒアルロン酸が溶け込んだ高保湿リキッドで内側からじゅわっと上気したような生ツヤと多幸感血色を叶える決定版ガイド",
    targetGender: "women",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 47,
    introText: "パウダーが粉っぽく小ジワに割れる秋の頬に！美容オイルとヒアルロン酸が溶け込んだ高保湿リキッドで内側からじゅわっと上気したような生ツヤと多幸感血色を叶える決定版ガイド",
    isHallOfFame: true,
    coverImage: cheekItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cheek.jpg",
    recommendedItemCodes: cheekArticles.map(a => a.id),
    contentMarkdown: cheekContent
  },
  {
    id: "feat-autumn-dense-night-repair-cream-dry-lines-10",
    slug: "autumn-dense-night-repair-cream-dry-lines-10",
    title: "【秋の就寝中過乾燥・朝のカピカピ肌に】濃厚ナイトリペアクリーム10選",
    subtitle: "湿度が30%台へ急落する深夜の水分蒸発と寝具摩擦を極厚シールド！ヒト幹細胞・エクソソーム・レチノール配合で睡眠中の肌再生力を最大化し翌朝ぷるんと押し返すハリ肌を育む完全網羅",
    targetGender: "unisex",
    authorId: "author-hayashi",
    authorName: "林 祥平",
    authorRole: "Qualia Navi メンズ美容・ヘア＆スカルプ担当スペシャリスト",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-24",
    readTimeMinutes: 48,
    introText: "湿度が30%台へ急落する深夜の水分蒸発と寝具摩擦を極厚シールド！ヒト幹細胞・エクソソーム・レチノール配合で睡眠中の肌再生力を最大化し翌朝ぷるんと押し返すハリ肌を育む完全網羅",
    isHallOfFame: true,
    coverImage: nightItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/night.jpg",
    recommendedItemCodes: nightArticles.map(a => a.id),
    contentMarkdown: nightContent
  }
];

const dataTsPath = path.resolve('src/data.ts');
const dataTsContent = fs.readFileSync(dataTsPath, 'utf8');

const startMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
const nextPostMarker = '{\n  "id": "feat-autumn-hydrating-pressed-powder-dry-shine-10",';

const startIdx = dataTsContent.indexOf(startMarker);
const nextPostIdx = dataTsContent.indexOf(nextPostMarker);

if (startIdx === -1 || nextPostIdx === -1) {
  console.error('❌ マーカーが見つかりません:', { startIdx, nextPostIdx });
  process.exit(1);
}

const beforeSlice = dataTsContent.slice(0, startIdx + startMarker.length);
const afterSlice = dataTsContent.slice(nextPostIdx);

const replacementJson = '\n' + updatedSixPosts.map(bp => JSON.stringify(bp, null, 2)).join(',\n') + ',\n\n';

const newDataTsContent = beforeSlice + replacementJson + afterSlice;
fs.writeFileSync(dataTsPath, newDataTsContent, 'utf8');

console.log('✅ src/data.ts 内の6記事をキラー記事版へ完全に置換しました！');
