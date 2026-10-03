import fs from 'fs';
import path from 'path';
import {
  warmingBodyItemsRaw,
  sugarScrubItemsRaw,
  shadingItemsRaw,
  warmingBodyArticles,
  sugarScrubArticles,
  shadingArticles
} from './insert_winter_batch28_helper.mjs';

import { getWarmingBodyArticleContent } from './winter_batch28_article1_warmingbody.mjs';
import { getSugarScrubArticleContent } from './winter_batch28_article2_sugarscrub.mjs';
import { getShadingArticleContent } from './winter_batch28_article3_shading.mjs';

console.log('🚀 [冬コスメ 第28弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const warmingBodyContent = getWarmingBodyArticleContent();
const sugarScrubContent = getSugarScrubArticleContent();
const shadingContent = getShadingArticleContent();

console.log(`- 記事1 (温感ボディマッサージ) 文字数: 約${warmingBodyContent.length}文字`);
console.log(`- 記事2 (シュガーボディスクラブ) 文字数: 約${sugarScrubContent.length}文字`);
console.log(`- 記事3 (小顔シェーディング) 文字数: 約${shadingContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (warmingBodyContent.length < 5000 || sugarScrubContent.length < 5000 || shadingContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-warming-body-massage-gel-slimming-2026",
    slug: "winter-warming-body-massage-gel-slimming-2026",
    title: "【2026冬・寒波の冷え＆夕方のブーツむくみを温感リセット】ホットマッサージジェル＆温感レッグ・ボディバームおすすめ人気10選！お風呂上がりの温活スリミングで芯から巡る美脚・軽やかボディへ",
    subtitle: "木枯らしと寒波で下半身の血流が滞り、夕方にはブーツのファスナーが上がらないほどの頑固なむくみや冷え・セルライトに悩まされる11〜12月！お風呂上がりに塗るだけでポカポカ温まり、リンパを流して翌朝の脚を軽くする温感ボディコスメを徹底検証。クラランス、ヴェレダ、サナエステニー、クナイプ、セブンブレイク、バンビウォーター、アユーラ、ザ・ボディショップ、ファイテンなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "木枯らしと寒波で下半身の血流が滞り、夕方にはブーツのファスナーが上がらないほどの頑固なむくみや冷え・セルライトに悩まされる11〜12月！お風呂上がりに塗るだけでポカポカ温まり、リンパを流して翌朝の脚を軽くする温感ボディコスメを徹底検証。クラランス、ヴェレダ、サナエステニー、クナイプ、セブンブレイク、バンビウォーター、アユーラ、ザ・ボディショップ、ファイテンなど厳選10選！",
    isHallOfFame: true,
    coverImage: warmingBodyItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/warmingbody.jpg",
    recommendedItemCodes: warmingBodyArticles.map(a => a.id),
    contentMarkdown: warmingBodyContent
  },
  {
    id: "feat-winter-hydrating-sugar-body-scrub-peeling-2026",
    slug: "winter-hydrating-sugar-body-scrub-peeling-2026",
    title: "【2026冬・タイツ摩擦の黒ずみ＆肘・膝・ヒップのガサガサ角質を即効つるすべ】高保湿シュガーボディスクラブ＆植物オイルボディポリッシュおすすめ人気10選！体温でとろける冬の極上角質ケア決定版",
    subtitle: "厚手タイツやヒートテックの摩擦、乾燥でターンオーバーが滞り、お尻の下や肘・膝が黒ずんでガサガサに硬化する11〜12月！冬の乾燥肌にしみない体温メルティング処方のシュガースクラブ＆高純度ボタニカルオイル配合ボディポリッシュを徹底比較。SABON、ハウスオブローゼ Oh! Baby、イソップ、ラリン、ジョーマローン、ダヴ、クナイプ、ロクシタン、ザ・ボディショップ、ジルスチュアートなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "厚手タイツやヒートテックの摩擦、乾燥でターンオーバーが滞り、お尻の下や肘・膝が黒ずんでガサガサに硬化する11〜12月！冬の乾燥肌にしみない体温メルティング処方のシュガースクラブ＆高純度ボタニカルオイル配合ボディポリッシュを徹底比較。SABON、ハウスオブローゼ Oh! Baby、イソップ、ラリン、ジョーマローン、ダヴ、クナイプ、ロクシタン、ザ・ボディショップ、ジルスチュアートなど厳選10選！",
    isHallOfFame: true,
    coverImage: sugarScrubItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/sugarscrub.jpg",
    recommendedItemCodes: sugarScrubArticles.map(a => a.id),
    contentMarkdown: sugarScrubContent
  },
  {
    id: "feat-winter-sculpting-shading-contour-palette-stick-2026",
    slug: "winter-sculpting-shading-contour-palette-stick-2026",
    title: "【2026冬・タートルネック＆マフラーに埋もれない立体小顔】高密着シェーディング＆小顔コントゥアリングおすすめ人気10選！冬の乾燥肌でも粉浮き・くすみゼロで自然な骨格美を偽装する大人メイク決定版",
    subtitle: "首元の詰まったハイネックニットや厚手マフラーでフェイスラインが埋もれ、顔がパンパンに大きく見えてしまう11〜12月！冬の乾燥肌でも粉吹き・泥崩れせず、透けるようなグレージュ影色でシャープな輪郭を創出する高密着シェーディングを徹底検証。too cool for school、キャンメイク、セザンヌ、ケイト、リリミュウ、エトヴォス、ピアー、MAC、ジュディドール、エチュードなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "首元の詰まったハイネックニットや厚手マフラーでフェイスラインが埋もれ、顔がパンパンに大きく見えてしまう11〜12月！冬の乾燥肌でも粉吹き・泥崩れせず、透けるようなグレージュ影色でシャープな輪郭を創出する高密着シェーディングを徹底検証。too cool for school、キャンメイク、セザンヌ、ケイト、リリミュウ、エトヴォス、ピアー、MAC、ジュディドール、エチュードなど厳選10選！",
    isHallOfFame: true,
    coverImage: shadingItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/shading.jpg",
    recommendedItemCodes: shadingArticles.map(a => a.id),
    contentMarkdown: shadingContent
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
