import fs from 'fs';
import path from 'path';
import {
  primerItemsRaw,
  oilItemsRaw,
  mascaraItemsRaw,
  primerArticles,
  oilArticles,
  mascaraArticles
} from './insert_winter_batch18_helper.mjs';

import { getPrimerArticleContent } from './winter_batch18_article1_primer.mjs';
import { getOilArticleContent } from './winter_batch18_article2_oil.mjs';
import { getMascaraArticleContent } from './winter_batch18_article3_mascara.mjs';

console.log('🚀 [冬コスメ 第18弾] 特集記事の生成と data.ts への統合を開始します...');

const primerContent = getPrimerArticleContent();
const oilContent = getOilArticleContent();
const mascaraContent = getMascaraArticleContent();

console.log(`- 記事1 (ポアプライマー＆毛穴下地) 文字数: 約${primerContent.length}文字`);
console.log(`- 記事2 (ブースターオイル＆導入液) 文字数: 約${oilContent.length}文字`);
console.log(`- 記事3 (お湯落ちマスカラ＆カラー) 文字数: 約${mascaraContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (primerContent.length < 5000 || oilContent.length < 5000 || mascaraContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-pore-primer-blur-base-2026",
    slug: "winter-pore-primer-blur-base-2026",
    title: "【2026冬・暖房乾燥でも毛穴落ち＆小ジワ割れゼロへ】高保湿ポアプライマー＆毛穴補正下地おすすめ人気10選！夕方のファンデ毛穴落ち・粉浮きを防ぐつるんとなめらか陶器肌決定版",
    subtitle: "真冬の過酷な暖房温風と寒風による「ファンデの毛穴落ち」「すり鉢毛穴」「乾燥地割れ」を根本から防ぐ！クレ・ド・ポー ボーテ（最高峰トリートメント下地）、コスメデコルテ（光彩パールグロウ）、ポール＆ジョー（ヒアルロン酸濃密保湿）、ローラメルシエ（水分プライマー）、エテュセ、キャンメイク、キス、マキアージュ、ジルスチュアート、エレガンスなど、美容液成分で潤しながら凹凸を消し去る名作10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "真冬の過酷な暖房温風と寒風による「ファンデの毛穴落ち」「すり鉢毛穴」「乾燥地割れ」を根本から防ぐ！クレ・ド・ポー ボーテ（最高峰トリートメント下地）、コスメデコルテ（光彩パールグロウ）、ポール＆ジョー（ヒアルロン酸濃密保湿）、ローラメルシエ（水分プライマー）、エテュセ、キャンメイク、キス、マキアージュ、ジルスチュアート、エレガンスなど、美容液成分で潤しながら凹凸を消し去る名作10選！",
    isHallOfFame: true,
    coverImage: primerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/primer.jpg",
    recommendedItemCodes: primerArticles.map(a => a.id),
    contentMarkdown: primerContent
  },
  {
    id: "feat-winter-booster-facial-oil-hydrate-2026",
    slug: "winter-booster-facial-oil-hydrate-2026",
    title: "【2026冬・カチコチ乾燥肌をふっくら解きほぐす】高純度ブースターオイル＆導入美容オイルおすすめ人気10選！化粧水がぐんぐん吸い込まれる極上オイルインスキンケア決定版",
    subtitle: "急激な気温低下で皮脂膜が消失し、化粧水を弾くカチコチ硬化肌をふっくら柔軟化！メルヴィータ（オレイン酸リッチ100%オーガニックアルガン）、RMK（水油ハイブリッドWトリートメント）、HABA（純度99.9%高品位スクワラン）、トリロジー（必須脂肪酸80%ローズヒップ）、コスメデコルテAQ、アルビオン、クラランス、無印良品、バイオイル、ソンバーユなど、洗顔後1滴で細胞間脂質をほぐす名作10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "急激な気温低下で皮脂膜が消失し、化粧水を弾くカチコチ硬化肌をふっくら柔軟化！メルヴィータ（オレイン酸リッチ100%オーガニックアルガン）、RMK（水油ハイブリッドWトリートメント）、HABA（純度99.9%高品位スクワラン）、トリロジー（必須脂肪酸80%ローズヒップ）、コスメデコルテAQ、アルビオン、クラランス、無印良品、バイオイル、ソンバーユなど、洗顔後1滴で細胞間脂質をほぐす名作10選！",
    isHallOfFame: true,
    coverImage: oilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/oil.jpg",
    recommendedItemCodes: oilArticles.map(a => a.id),
    contentMarkdown: oilContent
  },
  {
    id: "feat-winter-tubing-mascara-nuance-color-2026",
    slug: "winter-tubing-mascara-nuance-color-2026",
    title: "【2026冬・冷風＆涙目でもにじまない垢抜け美束まつ毛】高密着お湯落ちマスカラ＆ニュアンスカラーマスカラおすすめ人気10選！マフラー映えする上向きセパレート＆温感お湯オフ決定版",
    subtitle: "真冬の冷風涙・マフラー呼気スチーム・目元クリームの油分によるパンダ目を完全阻止！デジャヴュ（1.5mm超極細自まつ毛際立て）、D-UP（形状記憶上向きカール）、ヒロインメイク（水油両耐久第3のマスカラ）、エテュセ（まつパ級シアーブラックベース）、メイベリン、エレガンス、キャンメイク、ウォンジョンヨ、オペラ、クリニークなど、擦らずお湯でスルリと落ちる名作10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "真冬の冷風涙・マフラー呼気スチーム・目元クリームの油分によるパンダ目を完全阻止！デジャヴュ（1.5mm超極細自まつ毛際立て）、D-UP（形状記憶上向きカール）、ヒロインメイク（水油両耐久第3のマスカラ）、エテュセ（まつパ級シアーブラックベース）、メイベリン、エレガンス、キャンメイク、ウォンジョンヨ、オペラ、クリニークなど、擦らずお湯でスルリと落ちる名作10選！",
    isHallOfFame: true,
    coverImage: mascaraItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mascara.jpg",
    recommendedItemCodes: mascaraArticles.map(a => a.id),
    contentMarkdown: mascaraContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に3件の新規特集記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 バッチ18（特集3記事＆個別商品30記事）の統合が正常に完了しました！');
