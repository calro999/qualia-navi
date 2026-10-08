import fs from 'fs';
import path from 'path';
import {
  ultrasonicItemsRaw,
  ceramicHeaterItemsRaw,
  eyeEmsItemsRaw,
  ultrasonicArticles,
  ceramicHeaterArticles,
  eyeEmsArticles
} from './insert_winter_batch69_helper.mjs';

import { getUltrasonicArticleContent } from './winter_batch69_article1_ultrasonic.mjs';
import { getCeramicHeaterArticleContent } from './winter_batch69_article2_ceramic_heater.mjs';
import { getEyeEmsArticleContent } from './winter_batch69_article3_eye_ems.mjs';

console.log('🚀 [冬コスメ 第69弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const ultrasonicContent = getUltrasonicArticleContent();
const ceramicHeaterContent = getCeramicHeaterArticleContent();
const eyeEmsContent = getEyeEmsArticleContent();

console.log(`- 記事1 (超音波トリートメントアイロン) 文字数: 約${ultrasonicContent.length}文字`);
console.log(`- 記事2 (速暖人感センサーセラミックファンヒーター) 文字数: 約${ceramicHeaterContent.length}文字`);
console.log(`- 記事3 (目元専用温熱EMS美顔器＆アイリフトペン) 文字数: 約${eyeEmsContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (ultrasonicContent.length < 5000 || ceramicHeaterContent.length < 5000 || eyeEmsContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-ultrasonic-treatment-hair-iron-repair-2026",
    slug: "winter-ultrasonic-treatment-hair-iron-repair-2026",
    title: "【2026冬・暖房砂漠＆静電気摩擦のパサつき髪をサロン級ちゅるんツヤ髪へ】超音波トリートメントアイロンおすすめ人気10選！CARE PRO（ケアプロ）・ヤーマン・ルメント徹底比較！毎秒100万回超音波×エッセンシャル赤外線で市販トリートメントの浸透力を極限まで引き上げる冬の神美髪ギア",
    subtitle: "11〜12月の暖房乾燥と静電気摩擦でパサつく毛先に、毎秒100万回の超音波振動と赤外線で市販トリートメントの浸透力を極限まで引き上げる！ケアプロ、ヤーマンなど冬の神美髪ギア10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の暖房乾燥と静電気摩擦でパサつく毛先に、毎秒100万回の超音波振動と赤外線で市販トリートメントの浸透力を極限まで引き上げる！ケアプロ、ヤーマンなど冬の神美髪ギア10選！",
    isHallOfFame: true,
    coverImage: ultrasonicItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/carepro.jpg",
    recommendedItemCodes: ultrasonicArticles.map(a => a.id),
    contentMarkdown: ultrasonicContent
  },
  {
    id: "feat-winter-rapid-heating-ceramic-fan-heater-sensor-2026",
    slug: "winter-rapid-heating-ceramic-fan-heater-sensor-2026",
    title: "【2026冬・脱衣所＆洗面所の極寒ヒートショックを防ぎ美肌を守る】速暖人感センサーセラミックファンヒーターおすすめ人気10選！アイリスオーヤマ・山善・モダンデコ徹底比較！2秒即暖・大風量・小型省エネで冬のお風呂上がり乾燥肌レスキュー＆朝の洗面台メイクを至福に変える温活暖房",
    subtitle: "11〜12月の極寒の脱衣所・洗面所をわずか2秒で温め、ヒートショックを防ぎ入浴後の水分蒸発を食い止めて朝のメイクのりを劇的に底上げ！アイリスオーヤマなど速暖人感センサーヒーター10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の極寒の脱衣所・洗面所をわずか2秒で温め、ヒートショックを防ぎ入浴後の水分蒸発を食い止めて朝のメイクのりを劇的に底上げ！アイリスオーヤマなど速暖人感センサーヒーター10選！",
    isHallOfFame: true,
    coverImage: ceramicHeaterItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/irisheater.jpg",
    recommendedItemCodes: ceramicHeaterArticles.map(a => a.id),
    contentMarkdown: ceramicHeaterContent
  },
  {
    id: "feat-winter-eye-ems-microcurrent-thermal-lift-device-2026",
    slug: "winter-eye-ems-microcurrent-thermal-lift-device-2026",
    title: "【2026冬・寒冷血行不良クマ＆乾燥まぶたのたるみを秒速リフト】目元専用温熱EMS美顔器＆マイクロカレントアイリフトペンおすすめ人気10選！ANLAN・ミーゼ・サロニア徹底比較！40℃温感×微弱電流EMS×赤色LEDで冬の目尻小じわ・頑固な青クマ・眼精疲労を根こそぎケアする最新アイギア",
    subtitle: "11〜12月の寒冷血行不良による青クマや乾燥小じわ、スマホ疲れのまぶたのたるみを40℃温熱と微弱電流EMSで集中ほぐし＆引き上げる！ANLAN、ミーゼなど最新目元美顔器10選！",
    targetGender: "unisex",
    authorId: "author-inoue",
    authorName: "井上 さくら",
    authorRole: "専属コスメコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-09",
    readTimeMinutes: 30,
    introText: "11〜12月の寒冷血行不良による青クマや乾燥小じわ、スマホ疲れのまぶたのたるみを40℃温熱と微弱電流EMSで集中ほぐし＆引き上げる！ANLAN、ミーゼなど最新目元美顔器10選！",
    isHallOfFame: true,
    coverImage: eyeEmsItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/anlaneye.jpg",
    recommendedItemCodes: eyeEmsArticles.map(a => a.id),
    contentMarkdown: eyeEmsContent
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
  console.log('✅ src/data.ts に第69弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
