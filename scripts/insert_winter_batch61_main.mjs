import fs from 'fs';
import path from 'path';
import {
  gunItemsRaw,
  cavItemsRaw,
  calItemsRaw,
  gunArticles,
  cavArticles,
  calArticles
} from './insert_winter_batch61_helper.mjs';

import { getMassageGunArticleContent } from './winter_batch61_article1_mini_massage_gun.mjs';
import { getCavitationArticleContent } from './winter_batch61_article2_cavitation_body_slimmer.mjs';
import { getCallusRemoverArticleContent } from './winter_batch61_article3_callus_remover_foot_file.mjs';

console.log('🚀 [冬コスメ 第61弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const gunContent = getMassageGunArticleContent();
const cavContent = getCavitationArticleContent();
const calContent = getCallusRemoverArticleContent();

console.log(`- 記事1 (フェイス対応ミニマッサージガン) 文字数: 約${gunContent.length}文字`);
console.log(`- 記事2 (防水キャビテーション美容器) 文字数: 約${cavContent.length}文字`);
console.log(`- 記事3 (電動かかと角質リムーバー) 文字数: 約${calContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (gunContent.length < 5000 || cavContent.length < 5000 || calContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-mini-massage-gun-face-body-relax-2026",
    slug: "winter-mini-massage-gun-face-body-relax-2026",
    title: "【2026冬・寒さで固まる首肩こり＆顔たるみを秒速リリース】フェイス対応ミニマッサージガンおすすめ人気10選！MYTREX・ドクターエア・SIXPAD・サロニアなど超軽量×深部振動で冬の筋膜癒着・むくみを瞬時にほぐす神ビューティーギア徹底比較",
    subtitle: "冬の寒さによる首肩のガチガチこりや忘年会・イベント前の顔のむくみ・たるみを、手のひらサイズの超軽量ミニガンが秒速で解放！MYTREX、ドクターエア、SIXPAD、サロニアなど、顔専用シリコンや温熱ヘッド搭載の人気10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "冬の寒さによる首肩のガチガチこりや忘年会・イベント前の顔のむくみ・たるみを、手のひらサイズの超軽量ミニガンが秒速で解放！MYTREX、ドクターエア、SIXPAD、サロニアなど、顔専用シリコンや温熱ヘッド搭載の人気10選！",
    isHallOfFame: true,
    coverImage: gunItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/gun.jpg",
    recommendedItemCodes: gunArticles.map(a => a.id),
    contentMarkdown: gunContent
  },
  {
    id: "feat-winter-waterproof-rf-ems-cavitation-body-slimming-2026",
    slug: "winter-waterproof-rf-ems-cavitation-body-slimming-2026",
    title: "【2026冬・忘年会太り＆冷えセルライトをお風呂で撃退】防水キャビテーション美容器＆温熱RF・EMSボディシェイパーおすすめ人気10選！ヤーマン・美ルル・ミーゼ・ロアビなど超音波×深部温熱×筋肉刺激で冬の冷え固まり脂肪を絞る神ボディケアギア徹底比較",
    subtitle: "忘年会やクリスマス等のご馳走続きによる冬太り・冷え固まった頑固なセルライトをお風呂で温まりながら引き締める！ヤーマン キャビスパ、美ルル キャビスタイル、ミーゼ ディープコアなど、湯船で使える完全防水キャビテーション美容器10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "忘年会やクリスマス等のご馳走続きによる冬太り・冷え固まった頑固なセルライトをお風呂で温まりながら引き締める！ヤーマン キャビスパ、美ルル キャビスタイル、ミーゼ ディープコアなど、湯船で使える完全防水キャビテーション美容器10選！",
    isHallOfFame: true,
    coverImage: cavItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cav.jpg",
    recommendedItemCodes: cavArticles.map(a => a.id),
    contentMarkdown: cavContent
  },
  {
    id: "feat-winter-electric-callus-remover-foot-file-heel-care-2026",
    slug: "winter-electric-callus-remover-foot-file-heel-care-2026",
    title: "【2026冬・乾燥ひび割れ鏡餅かかとを秒速つるつる】電動かかと角質リムーバー＆ガラス製足裏フットファイルおすすめ人気10選！ドクターショール・コイズミ・ナノガラスなど削りすぎず冬のガサガサ角化・タイツ伝線を防ぐ神フットケアギア徹底比較",
    subtitle: "冬の空気乾燥でカチカチに硬化した「鏡餅かかと」やひび割れ、タイツの伝線を秒速リセット！ドクターショール ベルベットスムーズ、コイズミ、ウルンラップ ナノガラスなど、皮膚を痛めず撫でるだけで赤ちゃん素足へ磨き上げる人気フットファイル10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "冬の空気乾燥でカチカチに硬化した「鏡餅かかと」やひび割れ、タイツの伝線を秒速リセット！ドクターショール ベルベットスムーズ、コイズミ、ウルンラップ ナノガラスなど、皮膚を痛めず撫でるだけで赤ちゃん素足へ磨き上げる人気フットファイル10選！",
    isHallOfFame: true,
    coverImage: calItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cal.jpg",
    recommendedItemCodes: calArticles.map(a => a.id),
    contentMarkdown: calContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に3つの新規特集記事を挿入しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが src/data.ts に見つかりませんでした。');
  process.exit(1);
}

console.log(`🎉 第61弾 特集記事3件＆個別商品記事30件の統合が完了しました！`);
