import fs from 'fs';
import path from 'path';
import {
  hairMilkItemsRaw,
  eyeCreamItemsRaw,
  bathSaltItemsRaw,
  hairMilkArticles,
  eyeCreamArticles,
  bathSaltArticles
} from './insert_winter_batch33_helper.mjs';

import { getHairMilkArticleContent } from './winter_batch33_article1_hair_milk.mjs';
import { getEyeCreamArticleContent } from './winter_batch33_article2_eye_cream.mjs';
import { getBathSaltArticleContent } from './winter_batch33_article3_bath_salt.mjs';

console.log('🚀 [冬コスメ 第33弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const hairMilkContent = getHairMilkArticleContent();
const eyeCreamContent = getEyeCreamArticleContent();
const bathSaltContent = getBathSaltArticleContent();

console.log(`- 記事1 (ヘアミルク＆エマルジョン) 文字数: 約${hairMilkContent.length}文字`);
console.log(`- 記事2 (高保湿アイクリーム) 文字数: 約${eyeCreamContent.length}文字`);
console.log(`- 記事3 (薬用重炭酸＆温活バスソルト) 文字数: 約${bathSaltContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (hairMilkContent.length < 5000 || eyeCreamContent.length < 5000 || bathSaltContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-hydrating-hair-milk-emulsion-leave-in-2026",
    slug: "winter-hydrating-hair-milk-emulsion-leave-in-2026",
    title: "【2026冬・静電気＆乾燥パサつき完全防止】高保湿ヘアミルク＆浸透エマルジョンおすすめ人気10選！髪の内部保水×キューティクル補修で一日中まとまるうるツヤ美髪へ",
    subtitle: "冬の外気乾燥・暖房風・マフラー摩擦による静電気や広がりを根本解決！ヘアオイルだけでは届かない毛髪内部へ水分とCMC補修成分を届ける神エマルジョンを徹底比較。オルビス、ミルボン、N.、ラ・カスタ、モロッカンオイル、コスメデコルテ、ジョンマスターなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 19,
    introText: "冬の外気乾燥・暖房風・マフラー摩擦による静電気や広がりを根本解決！ヘアオイルだけでは届かない毛髪内部へ水分とCMC補修成分を届ける神エマルジョンを徹底比較。オルビス、ミルボン、N.、ラ・カスタ、モロッカンオイル、コスメデコルテ、ジョンマスターなど厳選10選！",
    isHallOfFame: true,
    coverImage: hairMilkItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hair_milk.jpg",
    recommendedItemCodes: hairMilkArticles.map(a => a.id),
    contentMarkdown: hairMilkContent
  },
  {
    id: "feat-winter-hydrating-wrinkle-eye-cream-serum-2026",
    slug: "winter-hydrating-wrinkle-eye-cream-serum-2026",
    title: "【2026冬・暖房乾燥の小ジワ＆青グマをふっくら押し返す】高保湿アイクリーム＆目元専用美容液おすすめ人気10選！レチノール・ナイアシンアミド・ペプチドで皮膚の薄い目元を守り抜く本格アイケア決定版",
    subtitle: "わずか0.02mmの極薄皮膚に襲いかかる冬の寒冷・暖房乾燥！ファンデが食い込むちりめんジワ、血行不良の青クマ、まぶたのくぼみを角層深部からふっくら押し返す高機能アイケアを徹底検証。エリクシール、ポーラ、コスメデコルテ、なめらか本舗、キールズ、クラランス、クリニークなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 19,
    introText: "わずか0.02mmの極薄皮膚に襲いかかる冬の寒冷・暖房乾燥！ファンデが食い込むちりめんジワ、血行不良の青クマ、まぶたのくぼみを角層深部からふっくら押し返す高機能アイケアを徹底検証。エリクシール、ポーラ、コスメデコルテ、なめらか本舗、キールズ、クラランス、クリニークなど厳選10選！",
    isHallOfFame: true,
    coverImage: eyeCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eye_cream.jpg",
    recommendedItemCodes: eyeCreamArticles.map(a => a.id),
    contentMarkdown: eyeCreamContent
  },
  {
    id: "feat-winter-warming-bath-salt-epsom-bicarbonate-2026",
    slug: "winter-warming-bath-salt-epsom-bicarbonate-2026",
    title: "【2026冬・芯まで温まる極上温活＆冷え・乾燥肌リセット】薬用重炭酸入浴剤＆高保湿エプソムソルト・ミネラルバスソルトおすすめ人気10選！血行促進・発汗・快眠を叶える冬のおうちスパ決定版",
    subtitle: "真冬の深刻な末端冷え性、寒暖差疲労、全身のカサカサ粉ふき肌を芯から救済！中性重炭酸イオン・高純度硫酸マグネシウム・天然岩塩が深部体温を上げ、朝までポカポカ快眠を叶える冬の温活入浴料を徹底比較。BARTH、クナイプ、シークリスタルス、アユーラ、ヴェレダ、NEHANなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-04",
    readTimeMinutes: 19,
    introText: "真冬の深刻な末端冷え性、寒暖差疲労、全身のカサカサ粉ふき肌を芯から救済！中性重炭酸イオン・高純度硫酸マグネシウム・天然岩塩が深部体温を上げ、朝までポカポカ快眠を叶える冬の温活入浴料を徹底比較。BARTH、クナイプ、シークリスタルス、アユーラ、ヴェレダ、NEHANなど厳選10選！",
    isHallOfFame: true,
    coverImage: bathSaltItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bath_salt.jpg",
    recommendedItemCodes: bathSaltArticles.map(a => a.id),
    contentMarkdown: bathSaltContent
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
