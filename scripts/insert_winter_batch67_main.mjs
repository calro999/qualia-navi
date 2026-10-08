import fs from 'fs';
import path from 'path';
import {
  dryerItemsRaw,
  brushItemsRaw,
  bodycareItemsRaw,
  dryerArticles,
  brushArticles,
  bodycareArticles
} from './insert_winter_batch67_helper.mjs';

import { getNanocareDryerArticleContent } from './winter_batch67_article1_nanocare_dryer.mjs';
import { getEmsLiftBrushArticleContent } from './winter_batch67_article2_ems_lift_brush.mjs';
import { getBodycareGiftArticleContent } from './winter_batch67_article3_bodycare_gift.mjs';

console.log('🚀 [冬コスメ 第67弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const dryerContent = getNanocareDryerArticleContent();
const brushContent = getEmsLiftBrushArticleContent();
const bodycareContent = getBodycareGiftArticleContent();

console.log(`- 記事1 (ナノケアドライヤー) 文字数: 約${dryerContent.length}文字`);
console.log(`- 記事2 (EMS電気バリブラシ) 文字数: 約${brushContent.length}文字`);
console.log(`- 記事3 (ホリデーボディケアギフト) 文字数: 約${bodycareContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (dryerContent.length < 5000 || brushContent.length < 5000 || bodycareContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-high-performance-nanocare-hair-dryer-2026",
    slug: "winter-high-performance-nanocare-hair-dryer-2026",
    title: "【2026冬・寒さで乾かない濡れ髪＆冬の静電気パサつきを秒速ケア】高機能速乾・美髪ナノケアドライヤーおすすめ人気10選！パナソニック ナノケア・ReFa（リファ）・KINUJO・サロニア・ダイソンなど高浸透ナノイー＆遠赤外線で乾かしながらうるツヤ髪へ導く冬の最高峰ご褒美ドライヤー徹底比較",
    subtitle: "11〜12月の気温低下で乾きにくい濡れ髪を秒速速乾！パナソニック、ReFa、KINUJO、ダイソンなど冬の寒風・静電気パサつきを抑えてうるツヤ髪へ導く最高峰ドライヤー10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の気温低下で乾きにくい濡れ髪を秒速速乾！パナソニック、ReFa、KINUJO、ダイソンなど冬の寒風・静電気パサつきを抑えてうるツヤ髪へ導く最高峰ドライヤー10選！",
    isHallOfFame: true,
    coverImage: dryerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/dryer.jpg",
    recommendedItemCodes: dryerArticles.map(a => a.id),
    contentMarkdown: dryerContent
  },
  {
    id: "feat-winter-electric-scalp-face-ems-lift-brush-2026",
    slug: "winter-electric-scalp-face-ems-lift-brush-2026",
    title: "【2026冬・寒さで凝り固まる頭筋＆もたつくフェイスラインを秒速引き上げ】EMS電気バリブラシ＆頭皮・フェイスリフトブラシおすすめ人気10選！サロニア・MYTREX（マイトレックス）・ヤーマン・エレクトロンなど低周波EMS×赤色LED×バイブレーションで冬のたるみ・目元疲れ・頭皮のこわばりをサロン級リフトケアする神ギア徹底比較",
    subtitle: "11〜12月の寒さでガチガチに固まる頭筋と表情筋をEMSと赤色LEDで深部からほぐす！サロニア、マイトレックス、ヤーマン、デンキバリブラシなど冬のたるみ・重たまぶたを引き上げる神ギア10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の寒さでガチガチに固まる頭筋と表情筋をEMSと赤色LEDで深部からほぐす！サロニア、マイトレックス、ヤーマン、デンキバリブラシなど冬のたるみ・重たまぶたを引き上げる神ギア10選！",
    isHallOfFame: true,
    coverImage: brushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/brush.jpg",
    recommendedItemCodes: brushArticles.map(a => a.id),
    contentMarkdown: brushContent
  },
  {
    id: "feat-winter-holiday-limited-bodycare-bath-gift-set-2026",
    slug: "winter-holiday-limited-bodycare-bath-gift-set-2026",
    title: "【2026冬・大切な人への贈り物＆1年頑張った自分への至福のご褒美】ホリデー限定ボディケア＆バスギフトセットおすすめ人気10選！SABON（サボン）・ロクシタン・LUSH（ラッシュ）・アユーラ・ジョンマスターオーガニックなど華やかな限定の香りと贅沢な潤いに包まれるクリスマスギフト徹底比較",
    subtitle: "11〜12月のホリデーシーズンに贈りたい極上のギフト＆自分への最高のご褒美！SABON、ロクシタン、LUSH、アユーラなど限定の香りと潤いで全身を包み込むコフレ10選！",
    targetGender: "unisex",
    authorId: "author-inoue",
    authorName: "井上 さくら",
    authorRole: "専属コスメコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月のホリデーシーズンに贈りたい極上のギフト＆自分への最高のご褒美！SABON、ロクシタン、LUSH、アユーラなど限定の香りと潤いで全身を包み込むコフレ10選！",
    isHallOfFame: true,
    coverImage: bodycareItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodycare.jpg",
    recommendedItemCodes: bodycareArticles.map(a => a.id),
    contentMarkdown: bodycareContent
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
  console.log('✅ src/data.ts に第67弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
