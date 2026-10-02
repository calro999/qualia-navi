import fs from 'fs';
import path from 'path';
import {
  paletteItemsRaw,
  lipOilItemsRaw,
  giftItemsRaw,
  paletteArticles,
  lipOilArticles,
  giftArticles
} from './insert_winter_batch22_helper.mjs';

import { getPaletteArticleContent } from './winter_batch22_article1_palette.mjs';
import { getLipOilArticleContent } from './winter_batch22_article2_lipoil.mjs';
import { getGiftArticleContent } from './winter_batch22_article3_gift.mjs';

console.log('🚀 [冬コスメ 第22弾] 特集記事の生成と data.ts への統合を開始します...');

const paletteContent = getPaletteArticleContent();
const lipOilContent = getLipOilArticleContent();
const giftContent = getGiftArticleContent();

console.log(`- 記事1 (アイシャドウパレット) 文字数: 約${paletteContent.length}文字`);
console.log(`- 記事2 (高保湿リップオイル) 文字数: 約${lipOilContent.length}文字`);
console.log(`- 記事3 (コスメギフトガイド) 文字数: 約${giftContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (paletteContent.length < 5000 || lipOilContent.length < 5000 || giftContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-eyeshadow-palette-glitter-2026",
    slug: "winter-holiday-eyeshadow-palette-glitter-2026",
    title: "【2026ホリデー限定＆冬の目元を彩る至高の煌めき】アイシャドウパレット＆ホリデー限定アイカラーおすすめ人気10選！冬のくすみ・粉飛びゼロ×イルミネーション映え決定版",
    subtitle: "冬の乾燥による粉吹き・二重幅のヨレ・青ぐすみを完全解消！ディオール（至高のサンク クルール）、ルナソル（アイカラーレーション）、SUQQU（絹艶シグニチャー）、コスメデコルテ、シャネル、トムフォード、アディクション、エクセル、キャンメイク、デイジークなど、澄んだ奥行きと輝きを宿す本命10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "冬の乾燥による粉吹き・二重幅のヨレ・青ぐすみを完全解消！ディオール（至高のサンク クルール）、ルナソル（アイカラーレーション）、SUQQU（絹艶シグニチャー）、コスメデコルテ、シャネル、トムフォード、アディクション、エクセル、キャンメイク、デイジークなど、澄んだ奥行きと輝きを宿す本命10選！",
    isHallOfFame: true,
    coverImage: paletteItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/palette.jpg",
    recommendedItemCodes: paletteArticles.map(a => a.id),
    contentMarkdown: paletteContent
  },
  {
    id: "feat-winter-hydrating-lip-oil-serum-gloss-2026",
    slug: "winter-hydrating-lip-oil-serum-gloss-2026",
    title: "【2026冬・寒風でも割れない至高のぷるツヤ膜】高保湿リップオイル＆美容液トリートメントグロスおすすめ人気10選！ベタつきゼロで縦ジワを埋める冬の唇ラッピング決定版",
    subtitle: "冷風と暖房で起こる「皮むけ」「縦ジワ割れ」「口紅の粉浮き」をオイルの密閉シールドで即効救済！クラランス（王道コンフォートオイル）、ディオール（チェリーオイルのグロウオイル）、ジルスチュアート、ボビイブラウン、エルメス、ロムアンド、TIRTIR、トリデン、シピシピ、hinceなど、ベタつかず極上のぷるツヤ唇をキープする実力派10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "冷風と暖房で起こる「皮むけ」「縦ジワ割れ」「口紅の粉浮き」をオイルの密閉シールドで即効救済！クラランス（王道コンフォートオイル）、ディオール（チェリーオイルのグロウオイル）、ジルスチュアート、ボビイブラウン、エルメス、ロムアンド、TIRTIR、トリデン、シピシピ、hinceなど、ベタつかず極上のぷるツヤ唇をキープする実力派10選！",
    isHallOfFame: true,
    coverImage: lipOilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipoil.jpg",
    recommendedItemCodes: lipOilArticles.map(a => a.id),
    contentMarkdown: lipOilContent
  },
  {
    id: "feat-winter-holiday-christmas-cosmetics-gift-guide-2026",
    slug: "winter-holiday-christmas-cosmetics-gift-guide-2026",
    title: "【2026冬・女友達＆自分へのご褒美】予算別（3,000円〜1万円）クリスマス＆ホリデーコスメギフトおすすめ人気10選！絶対に外さない失敗ゼロの鉄板名品決定版",
    subtitle: "クリスマスプレゼントや女子会交換、1年のご褒美に迷ったらコレ！パーソナルカラーや肌質を問わず誰に贈っても100%喜ばれる上質パーツケア＆香りアイテムを予算別に網羅。ディオール（ル ボーム）、シャネル（ラ クレーム マン）、イソップ、SHIRO、ジルスチュアート、ビュリー、ジョーマローン、uka、サボン、ロクシタンなど、失敗しない本命10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "クリスマスプレゼントや女子会交換、1年のご褒美に迷ったらコレ！パーソナルカラーや肌質を問わず誰に贈っても100%喜ばれる上質パーツケア＆香りアイテムを予算別に網羅。ディオール（ル ボーム）、シャネル（ラ クレーム マン）、イソップ、SHIRO、ジルスチュアート、ビュリー、ジョーマローン、uka、サボン、ロクシタンなど、失敗しない本命10選！",
    isHallOfFame: true,
    coverImage: giftItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/gift.jpg",
    recommendedItemCodes: giftArticles.map(a => a.id),
    contentMarkdown: giftContent
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
