import fs from 'fs';
import path from 'path';
import {
  powderItemsRaw,
  creamItemsRaw,
  cleanseItemsRaw,
  powderArticles,
  creamArticles,
  cleanseArticles
} from './insert_winter_batch21_helper.mjs';

import { getPowderArticleContent } from './winter_batch21_article1_powder.mjs';
import { getCreamArticleContent } from './winter_batch21_article2_cream.mjs';
import { getCleanseArticleContent } from './winter_batch21_article3_cleanse.mjs';

console.log('🚀 [冬コスメ 第21弾] 特集記事の生成と data.ts への統合を開始します...');

const powderContent = getPowderArticleContent();
const creamContent = getCreamArticleContent();
const cleanseContent = getCleanseArticleContent();

console.log(`- 記事1 (プレストパウダー) 文字数: 約${powderContent.length}文字`);
console.log(`- 記事2 (エイジングケアクリーム) 文字数: 約${creamContent.length}文字`);
console.log(`- 記事3 (クレンジングミルク＆クリーム) 文字数: 約${cleanseContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (powderContent.length < 5000 || creamContent.length < 5000 || cleanseContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-limited-pressed-powder-compact-2026",
    slug: "winter-holiday-limited-pressed-powder-compact-2026",
    title: "【2026ホリデー限定＆年に一度の芸術品】プレミアムプレストパウダー＆ミラコレ級名品コンパクトおすすめ人気10選！冬の乾燥粉吹きゼロ×一日中澄んだ陶器肌決定版",
    subtitle: "冬の冷気と暖房で「パウダーを重ねると粉を吹く」「夕方に乾燥小ジワが目立つ」悩みを完全解消！カネボウ（伝説のミラノコレクション2026）、エレガンス（無敵のラ プードル）、コスメデコルテ（AQオーラリフレクター）、資生堂（スノービューティー）、ディオール、NARS、ジバンシイ、SUQQU、キャンメイク、セザンヌなど、しっとり吸い付いて毛穴を消し去る至高の10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "冬の冷気と暖房で「パウダーを重ねると粉を吹く」「夕方に乾燥小ジワが目立つ」悩みを完全解消！カネボウ（伝説のミラノコレクション2026）、エレガンス（無敵のラ プードル）、コスメデコルテ（AQオーラリフレクター）、資生堂（スノービューティー）、ディオール、NARS、ジバンシイ、SUQQU、キャンメイク、セザンヌなど、しっとり吸い付いて毛穴を消し去る至高の10選！",
    isHallOfFame: true,
    coverImage: powderItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/powder.jpg",
    recommendedItemCodes: powderArticles.map(a => a.id),
    contentMarkdown: powderContent
  },
  {
    id: "feat-winter-luxury-high-performance-anti-aging-cream-2026",
    slug: "winter-luxury-high-performance-anti-aging-cream-2026",
    title: "【2026冬ボーナス＆1年の極上ご褒美】憧れデパコスの最高峰エイジングケアクリームおすすめ人気10選！過酷な寒冷乾燥から守り抜き翌朝ふっくら弾むハリツヤ肌決定版",
    subtitle: "湿度低下と暖房の直撃で起こる「どれだけ保湿しても内側がつっぱる」「夕方に頬や目元がしぼむ」冬枯れ肌を根本救済！コスメデコルテ（ナイト多重層リポソーム）、カネボウ（胎脂着想クリーム イン ナイト）、SK-II（ピテラ×最新リフト）、クレ・ド・ポー ボーテ、ランコム、エスティローダー、キールズ、資生堂、エリクシール、キュレルなど、睡眠中の肌再生を極限まで高める本命10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "湿度低下と暖房の直撃で起こる「どれだけ保湿しても内側がつっぱる」「夕方に頬や目元がしぼむ」冬枯れ肌を根本救済！コスメデコルテ（ナイト多重層リポソーム）、カネボウ（胎脂着想クリーム イン ナイト）、SK-II（ピテラ×最新リフト）、クレ・ド・ポー ボーテ、ランコム、エスティローダー、キールズ、資生堂、エリクシール、キュレルなど、睡眠中の肌再生を極限まで高める本命10選！",
    isHallOfFame: true,
    coverImage: creamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cream.jpg",
    recommendedItemCodes: creamArticles.map(a => a.id),
    contentMarkdown: creamContent
  },
  {
    id: "feat-winter-hydrating-cleansing-milk-cream-dry-skin-2026",
    slug: "winter-hydrating-cleansing-milk-cream-dry-skin-2026",
    title: "【2026冬・洗い流した瞬間からつっぱらない極上うるおい】高保湿クレンジングミルク＆美容液クリームクレンジングおすすめ人気10選！摩擦レスで砂漠肌をほぐす冬の落とすケア決定版",
    subtitle: "「洗顔後に顔が引きつる」「化粧水がピリピリ沁みる」冬のバリア崩壊を即効リセット！カバーマーク（美容液成分89%の王道ミルク）、カネボウ（至福のエンリッチド オフ クリーム）、コスメデコルテ（奇跡のAQミリオリティ）、オルビス、チャントアチャーム、ヴェレダ、パラドゥ、スイサイ、ミノン、ファンケルなど、肌の潤いを守りながら汚れだけを浮かせる実力派10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "「洗顔後に顔が引きつる」「化粧水がピリピリ沁みる」冬のバリア崩壊を即効リセット！カバーマーク（美容液成分89%の王道ミルク）、カネボウ（至福のエンリッチド オフ クリーム）、コスメデコルテ（奇跡のAQミリオリティ）、オルビス、チャントアチャーム、ヴェレダ、パラドゥ、スイサイ、ミノン、ファンケルなど、肌の潤いを守りながら汚れだけを浮かせる実力派10選！",
    isHallOfFame: true,
    coverImage: cleanseItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cleanse.jpg",
    recommendedItemCodes: cleanseArticles.map(a => a.id),
    contentMarkdown: cleanseContent
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
