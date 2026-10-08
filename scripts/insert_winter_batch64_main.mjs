import fs from 'fs';
import path from 'path';
import {
  humidifierItemsRaw,
  hotCoolItemsRaw,
  brushItemsRaw,
  humidifierArticles,
  hotCoolArticles,
  brushArticles
} from './insert_winter_batch64_helper.mjs';

import { getDeskHumidifierArticleContent } from './winter_batch64_article1_desk_humidifier.mjs';
import { getHotAndCoolDeviceArticleContent } from './winter_batch64_article2_hot_and_cool_device.mjs';
import { getSonicResetBrushArticleContent } from './winter_batch64_article3_sonic_reset_brush.mjs';

console.log('🚀 [冬コスメ 第64弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const humidifierContent = getDeskHumidifierArticleContent();
const hotCoolContent = getHotAndCoolDeviceArticleContent();
const brushContent = getSonicResetBrushArticleContent();

console.log(`- 記事1 (卓上超音波加湿器＆アロマ美肌ディフューザー) 文字数: 約${humidifierContent.length}文字`);
console.log(`- 記事2 (温冷美顔器＆ホット＆クール美顔器) 文字数: 約${hotCoolContent.length}文字`);
console.log(`- 記事3 (音波振動リセットブラシ＆マイナスイオン磁気ヘアブラシ) 文字数: 約${brushContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (humidifierContent.length < 5000 || hotCoolContent.length < 5000 || brushContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-ultrasonic-desk-humidifier-aroma-diffuser-2026",
    slug: "winter-ultrasonic-desk-humidifier-aroma-diffuser-2026",
    title: "【2026冬・暖房直撃の砂漠肌＆就寝時の乾燥喉を救う】卓上超音波加湿器＆美肌アロマディフューザーおすすめ人気10選！コードレス・静音大容量・次亜塩素酸水対応・上部給水などオフィスのデスク＆寝室でうるおいバリアを守る冬の加湿神ギア徹底比較",
    subtitle: "11〜12月の暖房直撃による肌の水分蒸散や就寝時の喉カラカラを、ナノ超音波ミストとアロマの香りで防ぎ抜く！mottole、モダンデコ、サンコーなど冬のデスク＆寝室に置きたい人気加湿器10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の暖房直撃による肌の水分蒸散や就寝時の喉カラカラを、ナノ超音波ミストとアロマの香りで防ぎ抜く！mottole、モダンデコ、サンコーなど冬のデスク＆寝室に置きたい人気加湿器10選！",
    isHallOfFame: true,
    coverImage: humidifierItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/humidifier.jpg",
    recommendedItemCodes: humidifierArticles.map(a => a.id),
    contentMarkdown: humidifierContent
  },
  {
    id: "feat-winter-hot-and-cool-facial-device-pore-firming-2026",
    slug: "winter-hot-and-cool-facial-device-pore-firming-2026",
    title: "【2026冬・寒冷こわばり肌を42℃温熱でほぐし急速冷却で毛穴をキュッと締める】温冷美顔器＆ホット＆クール美顔器おすすめ人気10選！イオン導出入・EMSリフト・赤青LED光エステなど冬の乾燥くすみ＆ゆるみ毛穴をサロン級ケアする最新美顔ギア徹底比較",
    subtitle: "11〜12月の寒さで血行が滞りゴワついた冬肌を42℃で温めほぐし、美容液を深層浸透させた後、6℃の急速冷却で毛穴を引き締めて潤い密閉！ANLAN、美ルル、エビスなど最新温冷美顔器10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の寒さで血行が滞りゴワついた冬肌を42℃で温めほぐし、美容液を深層浸透させた後、6℃の急速冷却で毛穴を引き締めて潤い密閉！ANLAN、美ルル、エビスなど最新温冷美顔器10選！",
    isHallOfFame: true,
    coverImage: hotCoolItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hotcool.jpg",
    recommendedItemCodes: hotCoolArticles.map(a => a.id),
    contentMarkdown: hotCoolContent
  },
  {
    id: "feat-winter-sonic-vibration-reset-hair-brush-anti-static-2026",
    slug: "winter-sonic-vibration-reset-hair-brush-anti-static-2026",
    title: "【2026冬・ニット＆マフラーの静電気爆発・冬のパサつき髪を秒速リセット】音波振動リセットブラシ＆マイナスイオン磁気ヘアブラシおすすめ人気10選！毎分6000回振動・強力磁気・頭皮エアークッションなどとかすだけで指通り極上のツヤストレートに整える冬の美髪神ギア徹底比較",
    subtitle: "11〜12月のマフラーやニットによる激しい静電気とパサつき広がりを、毎分6000回の音波振動と強力磁気で瞬時に解きほぐす！コイズミ、alettaなど冬の必需品音波振動リセットブラシ10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月のマフラーやニットによる激しい静電気とパサつき広がりを、毎分6000回の音波振動と強力磁気で瞬時に解きほぐす！コイズミ、alettaなど冬の必需品音波振動リセットブラシ10選！",
    isHallOfFame: true,
    coverImage: brushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/brush.jpg",
    recommendedItemCodes: brushArticles.map(a => a.id),
    contentMarkdown: brushContent
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
  console.log('✅ src/data.ts に第64弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
