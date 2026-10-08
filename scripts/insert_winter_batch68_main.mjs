import fs from 'fs';
import path from 'path';
import {
  panelHeaterItemsRaw,
  pureOilItemsRaw,
  electricBlanketItemsRaw,
  panelHeaterArticles,
  pureOilArticles,
  electricBlanketArticles
} from './insert_winter_batch68_helper.mjs';

import { getPanelHeaterArticleContent } from './winter_batch68_article1_panel_heater.mjs';
import { getPureOilArticleContent } from './winter_batch68_article2_pure_oil.mjs';
import { getElectricBlanketArticleContent } from './winter_batch68_article3_electric_blanket.mjs';

console.log('🚀 [冬コスメ 第68弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const panelHeaterContent = getPanelHeaterArticleContent();
const pureOilContent = getPureOilArticleContent();
const electricBlanketContent = getElectricBlanketArticleContent();

console.log(`- 記事1 (デスク下遠赤外線パネルヒーター＆足元ウォーマー) 文字数: 約${panelHeaterContent.length}文字`);
console.log(`- 記事2 (高純度ピュアスクワランオイル＆アルガンオイル) 文字数: 約${pureOilContent.length}文字`);
console.log(`- 記事3 (洗えるフランネル電気ひざ掛け＆着る電気毛布) 文字数: 約${electricBlanketContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (panelHeaterContent.length < 5000 || pureOilContent.length < 5000 || electricBlanketContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-under-desk-panel-heater-foot-warmer-2026",
    slug: "winter-under-desk-panel-heater-foot-warmer-2026",
    title: "【2026冬・エアコン温風で肌が砂漠化するオフィス＆在宅ワークを救う】デスク下遠赤外線パネルヒーター＆足元フットウォーマーおすすめ人気10選！無風・乾燥ゼロ・360度ラウンド型・省エネ節電など顔の粉吹きを防ぎ足先をポカポカ温める美肌温活暖房徹底比較",
    subtitle: "11〜12月のエアコン温風直撃による顔の粉吹き砂漠化を完全に防ぎつつ、遠赤外線で膝から足裏までぐるりと包み込み下半身の冷えと夕方のむくみを解消！TOKAIZなど最新デスク下パネルヒーター10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月のエアコン温風直撃による顔の粉吹き砂漠化を完全に防ぎつつ、遠赤外線で膝から足裏までぐるりと包み込み下半身の冷えと夕方のむくみを解消！TOKAIZなど最新デスク下パネルヒーター10選！",
    isHallOfFame: true,
    coverImage: panelHeaterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/panelheater.jpg",
    recommendedItemCodes: panelHeaterArticles.map(a => a.id),
    contentMarkdown: panelHeaterContent
  },
  {
    id: "feat-winter-pure-squalane-argan-multipurpose-facial-oil-2026",
    slug: "winter-pure-squalane-argan-multipurpose-facial-oil-2026",
    title: "【2026冬・暖房砂漠の粉吹き肌＆ごわつき角質を1滴で即効密封】高純度ピュアスクワランオイル＆アルガンオイルおすすめ人気10選！無添加・オーガニック100%・ブースター導入・毛穴詰まりゼロなど顔・髪・爪・全身のバリア機能を呼び醒ます冬の神オイル徹底比較",
    subtitle: "11〜12月の超乾燥・寒冷刺激によって水分を失った肌に、たった1滴で皮脂膜を完璧に再現してうるおいを密封！HABA高品位スクワラン、メルヴィータ生アルガンなど冬の砂漠肌を救う神オイル10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の超乾燥・寒冷刺激によって水分を失った肌に、たった1滴で皮脂膜を完璧に再現してうるおいを密封！HABA高品位スクワラン、メルヴィータ生アルガンなど冬の砂漠肌を救う神オイル10選！",
    isHallOfFame: true,
    coverImage: pureOilItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/pureoil.jpg",
    recommendedItemCodes: pureOilArticles.map(a => a.id),
    contentMarkdown: pureOilContent
  },
  {
    id: "feat-winter-electric-blanket-flannel-heating-throw-2026",
    slug: "winter-electric-blanket-flannel-heating-throw-2026",
    title: "【2026冬・骨盤＆下半身を極上温めして血色美肌を育てる】洗えるフランネル電気ひざ掛け＆着る電気毛布おすすめ人気10選！とろけるマイクロファイバー・丸洗い対応・ダニ退治・省エネ節電など冬の冷え性＆くすみ肌を体内から温め流す最新温活ブランケット徹底比較",
    subtitle: "11〜12月の厳しい寒さから下半身と内臓を極上のとろけるフランネルで温め、骨盤周りの血流を促進して全身の巡りと血色感ある素肌を育てる！山善、ライフジョイ、コイズミなど冬の温活電気ひざ掛け10選！",
    targetGender: "unisex",
    authorId: "author-inoue",
    authorName: "井上 さくら",
    authorRole: "専属コスメコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の厳しい寒さから下半身と内臓を極上のとろけるフランネルで温め、骨盤周りの血流を促進して全身の巡りと血色感ある素肌を育てる！山善、ライフジョイ、コイズミなど冬の温活電気ひざ掛け10選！",
    isHallOfFame: true,
    coverImage: electricBlanketItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/electricblanket.jpg",
    recommendedItemCodes: electricBlanketArticles.map(a => a.id),
    contentMarkdown: electricBlanketContent
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
  console.log('✅ src/data.ts に第68弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
