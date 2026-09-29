import fs from 'fs';
import path from 'path';
import {
  bodyCreamItemsRaw,
  footCreamItemsRaw,
  sleepingMaskItemsRaw,
  bodyCreamArticles,
  footCreamArticles,
  sleepingMaskArticles
} from './insert_winter_batch9_helper.mjs';

import { getBodycreamArticleContent } from './winter_batch9_article1_bodycream.mjs';
import { getFootcareArticleContent } from './winter_batch9_article2_footcare.mjs';
import { getSleepingmaskArticleContent } from './winter_batch9_article3_sleepingmask.mjs';

console.log('🚀 [冬コスメ 第9弾] 特集記事の生成と data.ts への統合を開始します...');

const bodycreamContent = getBodycreamArticleContent();
const footcareContent = getFootcareArticleContent();
const sleepingmaskContent = getSleepingmaskArticleContent();

console.log(`- 記事1 (ボディクリーム＆バター) 文字数: 約${bodycreamContent.length}文字`);
console.log(`- 記事2 (かかとフットケア) 文字数: 約${footcareContent.length}文字`);
console.log(`- 記事3 (スリーピングマスク) 文字数: 約${sleepingmaskContent.length}文字`);

const blogPostsToAdd = [
  {
    id: "feat-winter-rich-body-cream-butter-lotion-2026",
    slug: "winter-rich-body-cream-butter-lotion-2026",
    title: "【2026冬・極上もっちり吸いつくシルク肌】高保湿ボディクリーム＆濃厚ボディバター・ミルクおすすめ人気10選！冬の粉ふき・すねの痒み・ひび割れを救う全身濃密うるおいバリア決定版",
    subtitle: "11〜12月のお風呂上がりに襲ってくる「すねの猛烈なかゆみ」「粉ふき」「服の摩擦刺激」を皮膚科学で根本解決！セタフィル、ニュートロジーナ、ローラメルシエ、キュレル、ロクシタンなど、角層の奥までうるおいで満たし24時間吸い付くようなシルク肌を保つ神ボディクリーム10選を徹底比較。プロ直伝のインバス3分密閉法も完全公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 15,
    introText: "11〜12月のお風呂上がりに襲ってくる「すねの猛烈なかゆみ」「粉ふき」「服の摩擦刺激」を皮膚科学で根本解決！セタフィル、ニュートロジーナ、ローラメルシエ、キュレル、ロクシタンなど、角層の奥までうるおいで満たし24時間吸い付くようなシルク肌を保つ神ボディクリーム10選を徹底比較。プロ直伝のインバス3分密閉法も完全公開！",
    isHallOfFame: true,
    coverImage: bodyCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodycream.jpg",
    recommendedItemCodes: bodyCreamArticles.map(a => a.id),
    contentMarkdown: bodycreamContent
  },
  {
    id: "feat-winter-cracked-heel-foot-cream-care-2026",
    slug: "winter-cracked-heel-foot-cream-care-2026",
    title: "【2026冬・タイツが引っかからないつるすべ素足へ】高保湿かかとフットクリーム＆角質集中ケアおすすめ人気10選！頑固なガサガサ鏡餅かかと・ひび割れ・粉ふきを皮膚科学で根本解決",
    subtitle: "11〜12月のタイツ伝線・歩行時のズキズキ痛みを防ぐ！皮脂腺ゼロの足裏に起きる「角質肥厚とクレバスひび割れ」を科学的にリセット。ユースキン、ヒビプロ、ドクターショール、ロコベース、ベビーフットなど、尿素と高密着セラミドバームの使い分けから最短3日で蘇るラップ密閉術まで完全網羅！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 15,
    introText: "11〜12月のタイツ伝線・歩行時のズキズキ痛みを防ぐ！皮脂腺ゼロの足裏に起きる「角質肥厚とクレバスひび割れ」を科学的にリセット。ユースキン、ヒビプロ、ドクターショール、ロコベース、ベビーフットなど、尿素と高密着セラミドバームの使い分けから最短3日で蘇るラップ密閉術まで完全網羅！",
    isHallOfFame: true,
    coverImage: footCreamItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/footcare.jpg",
    recommendedItemCodes: footCreamArticles.map(a => a.id),
    contentMarkdown: footcareContent
  },
  {
    id: "feat-winter-overnight-sleeping-mask-night-pack-2026",
    slug: "winter-overnight-sleeping-mask-night-pack-2026",
    title: "【2026冬・寝ている間に感動のもちぷるハリツヤ肌へ】高保湿スリーピングマスク＆夜用濃密ナイトリペアパックおすすめ人気10選！暖房エアコンの夜間乾燥から肌を守り抜く睡眠美容決定版",
    subtitle: "湿度20%のエアコン暖房による「就寝中の猛烈な水分蒸散」を物理密閉！ラネージュ、コスメデコルテ リポソームナイト、エリクシール つや玉ジェルパック、VT CICAなど、寝ている間に肌再生をブーストし翌朝の洗顔時に吸い付くハリ弾力をもたらす睡眠美容マスク10選を徹底比較。枕に付かないラッピング塗法も大公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 15,
    introText: "湿度20%のエアコン暖房による「就寝中の猛烈な水分蒸散」を物理密閉！ラネージュ、コスメデコルテ リポソームナイト、エリクシール つや玉ジェルパック、VT CICAなど、寝ている間に肌再生をブーストし翌朝の洗顔時に吸い付くハリ弾力をもたらす睡眠美容マスク10選を徹底比較。枕に付かないラッピング塗法も大公開！",
    isHallOfFame: true,
    coverImage: sleepingMaskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/sleepingmask.jpg",
    recommendedItemCodes: sleepingMaskArticles.map(a => a.id),
    contentMarkdown: sleepingmaskContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第9弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 3つのキラー特集記事の挿入および商品データのマージが完了しました！');
