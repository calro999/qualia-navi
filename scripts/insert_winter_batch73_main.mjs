import fs from 'fs';
import path from 'path';
import {
  creamItemsRaw,
  cleansingItemsRaw,
  glitterItemsRaw,
  creamArticles,
  cleansingArticles,
  glitterArticles
} from './insert_winter_batch73_helper.mjs';

import { getCreamArticleContent } from './winter_batch73_article1_cream.mjs';
import { getCleansingArticleContent } from './winter_batch73_article2_cleansing.mjs';
import { getGlitterArticleContent } from './winter_batch73_article3_eyeshadow.mjs';

console.log('🚀 [冬コスメ 第73弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const creamContent = getCreamArticleContent();
const cleansingContent = getCleansingArticleContent();
const glitterContent = getGlitterArticleContent();

console.log(`- 記事1 (濃密高保湿フェイスクリーム＆水分密閉ナイトクリーム) 文字数: 約${creamContent.length}文字`);
console.log(`- 記事2 (濃密うるおいミルククレンジング＆極上クレンジングクリーム) 文字数: 約${cleansingContent.length}文字`);
console.log(`- 記事3 (濡れツヤ単色アイシャドウ＆ジュエリーパール・グリッター) 文字数: 約${glitterContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (creamContent.length < 5000 || cleansingContent.length < 5000 || glitterContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-rich-moisturizing-face-cream-night-shield-2026",
    slug: "winter-rich-moisturizing-face-cream-night-shield-2026",
    title: "【2026冬・暖房乾燥でも水分逃さないうるおい鉄壁シールド】濃密高保湿フェイスクリーム＆水分密閉ナイトクリームおすすめ人気10選！キールズ・キュレル・コスメデコルテ徹底比較！ヒト型セラミド×リピッドカプセルで翌朝まで吸いつくモチ肌へ",
    subtitle: "11〜12月の湿度急低下とエアコン暖房の温風から肌水分を守り抜き、翌朝まで吸い付くような潤いとハリを維持する濃密高保湿フェイスクリーム＆ナイトクリーム10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 32,
    introText: "11〜12月の湿度急低下とエアコン暖房の温風から肌水分を守り抜き、翌朝まで吸い付くような潤いとハリを維持する濃密高保湿フェイスクリーム＆ナイトクリーム10選！",
    isHallOfFame: true,
    coverImage: creamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cream.jpg",
    recommendedItemCodes: creamArticles.map(a => a.id),
    contentMarkdown: creamContent
  },
  {
    id: "feat-winter-rich-milk-cleansing-moist-cream-makeup-remover-2026",
    slug: "winter-rich-milk-cleansing-moist-cream-makeup-remover-2026",
    title: "【2026冬・乾燥つっぱり＆寒冷ゆらぎ肌を潤いで守る摩擦レス落とし】濃密うるおいミルククレンジング＆極上クレンジングクリームおすすめ人気10選！カバーマーク・コスメデコルテ・カネボウ徹底比較！美容液成分90%以上×とろけるテクスチャーで洗うほどモチモチ肌へ",
    subtitle: "11〜12月の木枯らしや寒暖差でバリア機能が低下した肌をやさしく包み込み、メイク汚れだけを浮き上がらせて潤い皮脂膜を守り抜く極上うるおいクレンジング10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 31,
    introText: "11〜12月の木枯らしや寒暖差でバリア機能が低下した肌をやさしく包み込み、メイク汚れだけを浮き上がらせて潤い皮脂膜を守り抜く極上うるおいクレンジング10選！",
    isHallOfFame: true,
    coverImage: cleansingItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cleansing.jpg",
    recommendedItemCodes: cleansingArticles.map(a => a.id),
    contentMarkdown: cleansingContent
  },
  {
    id: "feat-winter-holiday-sparkle-glitter-single-eyeshadow-radiance-2026",
    slug: "winter-holiday-sparkle-glitter-single-eyeshadow-radiance-2026",
    title: "【2026冬ホリデー・イルミネーション映え＆澄んだ瞳を演出】濡れツヤ単色アイシャドウ＆ジュエリーパール・グリッターおすすめ人気10選！コスメデコルテ・アディクション・ボビイブラウン徹底比較！微細多色ラメ×高密着ヴェールでまぶたに星屑の煌めきを",
    subtitle: "11〜12月の澄んだ冬空やイルミネーションの下で星屑のように濡れたツヤと多色パールを放ち、まぶたの乾燥を防ぎながら1日中くすまない輝きをキープする単色アイカラー10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の澄んだ冬空やイルミネーションの下で星屑のように濡れたツヤと多色パールを放ち、まぶたの乾燥を防ぎながら1日中くすまない輝きをキープする単色アイカラー10選！",
    isHallOfFame: true,
    coverImage: glitterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/glitter.jpg",
    recommendedItemCodes: glitterArticles.map(a => a.id),
    contentMarkdown: glitterContent
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
  console.log('✅ src/data.ts に第73弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
