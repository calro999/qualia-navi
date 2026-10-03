import fs from 'fs';
import path from 'path';
import {
  handSerumItemsRaw,
  inbathMilkItemsRaw,
  fragranceItemsRaw,
  handSerumArticles,
  inbathMilkArticles,
  fragranceArticles
} from './insert_winter_batch26_helper.mjs';

import { getHandSerumArticleContent } from './winter_batch26_article1_handserum.mjs';
import { getInbathMilkArticleContent } from './winter_batch26_article2_inbathmilk.mjs';
import { getFragranceArticleContent } from './winter_batch26_article3_fragrance.mjs';

console.log('🚀 [冬コスメ 第26弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const handSerumContent = getHandSerumArticleContent();
const inbathMilkContent = getInbathMilkArticleContent();
const fragranceContent = getFragranceArticleContent();

console.log(`- 記事1 (薬用ハンドセラム) 文字数: 約${handSerumContent.length}文字`);
console.log(`- 記事2 (インバスボディミルク) 文字数: 約${inbathMilkContent.length}文字`);
console.log(`- 記事3 (冬フレグランス) 文字数: 約${fragranceContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (handSerumContent.length < 5000 || inbathMilkContent.length < 5000 || fragranceContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-medicated-hand-serum-aging-care-2026",
    slug: "winter-medicated-hand-serum-aging-care-2026",
    title: "【2026冬・手の甲の血管浮き＆ちりめんジワを根本修復】薬用美白・シワ改善ハンドセラム＆手元エイジングケア美容液おすすめ人気10選！ハンドクリームでは届かない大人の手肌を若返らせる決定版",
    subtitle: "寒風と水仕事で手肌のコラーゲンが失われ、血管浮きやちりめんジワが急激に加速する11〜12月！単なる油膜のハンドクリームを塗り直すケアから卒業し、ナイアシンアミドやトラネキサム酸で真皮からふっくら押し上げる手肌専用美容液を徹底検証。コスメデコルテAQ、イソップ、SABON、SHIRO、アテニア、ファンケル、ユースキン、ベネフィーク、ロクシタン、コエンリッチなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "寒風と水仕事で手肌のコラーゲンが失われ、血管浮きやちりめんジワが急激に加速する11〜12月！単なる油膜のハンドクリームを塗り直すケアから卒業し、ナイアシンアミドやトラネキサム酸で真皮からふっくら押し上げる手肌専用美容液を徹底検証。コスメデコルテAQ、イソップ、SABON、SHIRO、アテニア、ファンケル、ユースキン、ベネフィーク、ロクシタン、コエンリッチなど厳選10選！",
    isHallOfFame: true,
    coverImage: handSerumItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/handserum.jpg",
    recommendedItemCodes: handSerumArticles.map(a => a.id),
    contentMarkdown: handSerumContent
  },
  {
    id: "feat-winter-in-bath-body-milk-barrier-lotion-2026",
    slug: "winter-in-bath-body-milk-barrier-lotion-2026",
    title: "【2026冬・お風呂上がりの脱衣所乾燥を完全遮断】濡れた肌にそのまま塗るインバスボディミルク＆高保湿ボディトリートメントおすすめ人気10選！湯気の中で水分を抱え込み夕方まで粉吹きしない究極の冬ボディケア",
    subtitle: "浴室のドアを開けた瞬間、冷えと乾燥でわずか5分で水分蒸発がピークに達する11〜12月のバスタイム！寒さに震えながら脱衣所でクリームを塗る苦痛をゼロにし、濡れた肌に伸ばすだけで水分を密閉するインバス高保湿ミルクを徹底比較。キュレル、ビオレu、ニベア、BARTH、ミノン、LUSH、SABON、ヴェレダ、ジョンソン、ダイアンなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "浴室のドアを開けた瞬間、冷えと乾燥でわずか5分で水分蒸発がピークに達する11〜12月のバスタイム！寒さに震えながら脱衣所でクリームを塗る苦痛をゼロにし、濡れた肌に伸ばすだけで水分を密閉するインバス高保湿ミルクを徹底比較。キュレル、ビオレu、ニベア、BARTH、ミノン、LUSH、SABON、ヴェレダ、ジョンソン、ダイアンなど厳選10選！",
    isHallOfFame: true,
    coverImage: inbathMilkItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/inbathmilk.jpg",
    recommendedItemCodes: inbathMilkArticles.map(a => a.id),
    contentMarkdown: inbathMilkContent
  },
  {
    id: "feat-winter-warm-holiday-fragrance-parfum-perfume-2026",
    slug: "winter-warm-holiday-fragrance-parfum-perfume-2026",
    title: "【2026冬・澄んだ冷気に温もりを宿す】冬のホリデー限定フレグランス＆温もりオードパルファンおすすめ人気10選！バニラ・ウッディ・アンバー・ムスクが体温でとろける大人の冬香水決定版",
    subtitle: "吐く息が白くなる11〜12月、凛とした冷気の中でこそ真価を発揮する重厚で甘美な冬の名香を徹底検証！体温でじんわりと温まり、コートを脱いだ瞬間にふわりと漂うバニラ・ウッディ・アンバー・ホワイトムスク。ジョーマローン、マルジェラ（バイザファイヤープレイス）、ディプティック（オルフェオン）、SHIRO、イヴサンローラン、ディオール、シャネル、トムフォード、キリアン、バイレードなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "吐く息が白くなる11〜12月、凛とした冷気の中でこそ真価を発揮する重厚で甘美な冬の名香を徹底検証！体温でじんわりと温まり、コートを脱いだ瞬間にふわりと漂うバニラ・ウッディ・アンバー・ホワイトムスク。ジョーマローン、マルジェラ（バイザファイヤープレイス）、ディプティック（オルフェオン）、SHIRO、イヴサンローラン、ディオール、シャネル、トムフォード、キリアン、バイレードなど厳選10選！",
    isHallOfFame: true,
    coverImage: fragranceItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/fragrance.jpg",
    recommendedItemCodes: fragranceArticles.map(a => a.id),
    contentMarkdown: fragranceContent
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
