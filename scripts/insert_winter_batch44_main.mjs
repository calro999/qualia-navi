import fs from 'fs';
import path from 'path';
import {
  vitaminCItemsRaw,
  cleanserItemsRaw,
  hydrogelItemsRaw,
  vitaminCArticles,
  cleanserArticles,
  hydrogelArticles
} from './insert_winter_batch44_helper.mjs';

import { getVitaminCArticleContent } from './winter_batch44_article1_vitaminc.mjs';
import { getCleanserArticleContent } from './winter_batch44_article2_cleanser.mjs';
import { getHydrogelArticleContent } from './winter_batch44_article3_hydrogel.mjs';

console.log('🚀 [冬コスメ 第44弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const vitaminCContent = getVitaminCArticleContent();
const cleanserContent = getCleanserArticleContent();
const hydrogelContent = getHydrogelArticleContent();

console.log(`- 記事1 (高浸透ビタミンC美容液) 文字数: 約${vitaminCContent.length}文字`);
console.log(`- 記事2 (高保湿モイスト洗顔フォーム) 文字数: 約${cleanserContent.length}文字`);
console.log(`- 記事3 (濃密ハイドロゲル＆モデリングマスク) 文字数: 約${hydrogelContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (vitaminCContent.length < 5000 || cleanserContent.length < 5000 || hydrogelContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-high-potency-vitamin-c-serum-pore-2026",
    slug: "winter-high-potency-vitamin-c-serum-pore-2026",
    title: "【2026冬・乾燥くすみ＆毛穴開きを打破する高濃度ビタミンC】高浸透ビタミンC美容液＆浸透型VC誘導体セラムおすすめ人気10選！ピュアビタミンC・APPS配合で冬の透明感と毛穴レス美肌を叶える名品徹底比較",
    subtitle: "冬の乾燥砂漠肌・暖房によるたるみ毛穴・寒冷くすみを一撃ケア！オバジC25、ユンス生ビタミンC、ドクターシーラボAPPS、メラノCC、キールズなど、冬でも突っ張らず陶器のような発光透明肌へ導く高保湿ビタミンC美容液10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 24,
    introText: "冬の乾燥砂漠肌・暖房によるたるみ毛穴・寒冷くすみを一撃ケア！オバジC25、ユンス生ビタミンC、ドクターシーラボAPPS、メラノCC、キールズなど、冬でも突っ張らず陶器のような発光透明肌へ導く高保湿ビタミンC美容液10選を徹底比較！",
    isHallOfFame: true,
    coverImage: vitaminCItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/vitaminc.jpg",
    recommendedItemCodes: vitaminCArticles.map(a => a.id),
    contentMarkdown: vitaminCContent
  },
  {
    id: "feat-winter-deep-moist-hydrating-facial-cleanser-foam-2026",
    slug: "winter-deep-moist-hydrating-facial-cleanser-foam-2026",
    title: "【2026冬・洗顔後のツッパリ＆粉ふき砂漠肌を完全阻止】高保湿モイスト洗顔フォーム＆濃密アミノ酸クッション泡洗顔おすすめ人気10選！摩擦レスで汚れだけを吸着し潤いを抱え込む冬の本命洗顔料徹底比較",
    subtitle: "洗顔直後のピキピキ乾燥・粉ふき・小鼻のザラつきを根本から防ぐ！KANEBO糸引き泡、オルビスユードット、オバジX炭酸泡、ポーラB.A、ミノンなど、うるおいバリアを守り抜きながら透明美肌を叶える冬の濃密保湿洗顔料10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 24,
    introText: "洗顔直後のピキピキ乾燥・粉ふき・小鼻のザラつきを根本から防ぐ！KANEBO糸引き泡、オルビスユードット、オバジX炭酸泡、ポーラB.A、ミノンなど、うるおいバリアを守り抜きながら透明美肌を叶える冬の濃密保湿洗顔料10選を徹底検証！",
    isHallOfFame: true,
    coverImage: cleanserItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cleanser.jpg",
    recommendedItemCodes: cleanserArticles.map(a => a.id),
    contentMarkdown: cleanserContent
  },
  {
    id: "feat-winter-hydrogel-modeling-mask-pack-intensive-hydrate-2026",
    slug: "winter-hydrogel-modeling-mask-pack-intensive-hydrate-2026",
    title: "【2026冬・極上おこもり美容＆翌朝の発光水光肌】濃密ハイドロゲルマスク＆高密着モデリングマスクおすすめ人気10選！貼って寝るゲルシート・サロン級冷感パックで過酷な乾燥を跳ね返す集中保湿ケア徹底比較",
    subtitle: "乾かない密閉力でサロン帰りのプルプル水光肌へ！バイオダンス、リンゼイモデリングマスク、ナンバーズイン、メディヒール、VTリードルなど、冬の夜の贅沢おこもりスキンケアに欠かせない大バズり集中保湿マスク10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 24,
    introText: "乾かない密閉力でサロン帰りのプルプル水光肌へ！バイオダンス、リンゼイモデリングマスク、ナンバーズイン、メディヒール、VTリードルなど、冬の夜の贅沢おこもりスキンケアに欠かせない大バズり集中保湿マスク10選を徹底比較！",
    isHallOfFame: true,
    coverImage: hydrogelItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hydrogel.jpg",
    recommendedItemCodes: hydrogelArticles.map(a => a.id),
    contentMarkdown: hydrogelContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に新規3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 [冬コスメ 第44弾] 3記事の統合がすべて完了しました！');
