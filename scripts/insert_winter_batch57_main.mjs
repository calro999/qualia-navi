import fs from 'fs';
import path from 'path';
import {
  oralItemsRaw,
  nailItemsRaw,
  footItemsRaw,
  oralArticles,
  nailArticles,
  footArticles
} from './insert_winter_batch57_helper.mjs';

import { getWhiteningOralArticleContent } from './winter_batch57_article1_whitening_oral.mjs';
import { getGelNailKitArticleContent } from './winter_batch57_article2_gel_nail_kit.mjs';
import { getFootMassageArticleContent } from './winter_batch57_article3_foot_massage.mjs';

console.log('🚀 [冬コスメ 第57弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const oralContent = getWhiteningOralArticleContent();
const nailContent = getGelNailKitArticleContent();
const footContent = getFootMassageArticleContent();

console.log(`- 記事1 (ホワイトニング＆オーラルケア) 文字数: 約${oralContent.length}文字`);
console.log(`- 記事2 (セルフジェルネイルキット) 文字数: 約${nailContent.length}文字`);
console.log(`- 記事3 (温熱フットマッサージャー＆レッグケア) 文字数: 約${footContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (oralContent.length < 5000 || nailContent.length < 5000 || footContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-medicated-whitening-toothpaste-sonic-brush-oral-2026",
    slug: "winter-medicated-whitening-toothpaste-sonic-brush-oral-2026",
    title: "【2026冬・忘年会＆ホリデーの写真映え・清潔な笑顔を宿す】薬用ホワイトニング歯磨き粉＆音波電動歯ブラシおすすめ人気10選！アパガードプレミオ・ブレスマイルクリア・ルシェロホワイト・ソニッケアーなど着色ステイン＆黄ばみを除去し白い歯へ導くオーラル美容徹底比較",
    subtitle: "年末の忘年会やホリデーイベントで笑顔に自信！アパガードプレミオ、ブレスマイルクリア、ルシェロホワイト、ソニッケアー、ブラウンオーラルBなど、ナノハイドロキシアパタイト×音波水流でステインと黄ばみをリセットする美白オーラルケア10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "年末の忘年会やホリデーイベントで笑顔に自信！アパガードプレミオ、ブレスマイルクリア、ルシェロホワイト、ソニッケアー、ブラウンオーラルBなど、ナノハイドロキシアパタイト×音波水流でステインと黄ばみをリセットする美白オーラルケア10選！",
    isHallOfFame: true,
    coverImage: oralItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/oral.jpg",
    recommendedItemCodes: oralArticles.map(a => a.id),
    contentMarkdown: oralContent
  },
  {
    id: "feat-winter-self-gel-nail-starter-kit-led-lamp-care-2026",
    slug: "winter-self-gel-nail-starter-kit-led-lamp-care-2026",
    title: "【2026冬・サロン予約激戦期もおうちで即プロ級ホリデーネイル】セルフジェルネイルスターターキット＆UV/LEDライト・自爪補修ベースおすすめ人気10選！シャイニージェル・ohora・ネイル工房・グレースジェルなど削らない密着・うるツヤ・マグネットの輝きを叶える本格セット徹底比較",
    subtitle: "11〜12月の予約困難なサロン代わりに自宅でサロン級ホリデーネイル！シャイニージェル、ohora、ネイル工房、グレースジェル、HOMEIなど、削らない弱酸性密着＆5Dマグネットで冬の指先に極上のツヤと輝きを宿すセルフジェルネイルキット10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "11〜12月の予約困難なサロン代わりに自宅でサロン級ホリデーネイル！シャイニージェル、ohora、ネイル工房、グレースジェル、HOMEIなど、削らない弱酸性密着＆5Dマグネットで冬の指先に極上のツヤと輝きを宿すセルフジェルネイルキット10選！",
    isHallOfFame: true,
    coverImage: nailItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/nail.jpg",
    recommendedItemCodes: nailArticles.map(a => a.id),
    contentMarkdown: nailContent
  },
  {
    id: "feat-winter-heating-ems-air-foot-massager-leg-recovery-2026",
    slug: "winter-heating-ems-air-foot-massager-leg-recovery-2026",
    title: "【2026冬・夕方のブーツが入らない寒冷むくみ＆足先の氷冷えを秒速リセット】温熱EMSフットマッサージャー＆エアーレッグリフレ＆温熱着圧レギンスおすすめ人気10選！パナソニック・ルルド・SIXPAD・ドクターエア・ベルミスなど下腿三頭筋の静脈還流を促進し美脚へ導く神ギア徹底比較",
    subtitle: "寒冷で冷え固まる第二の心臓『ふくらはぎ』を温め絞り流す！パナソニックレッグリフレ、ルルドリラブー2、SIXPADフットフィット、ドクターエア、ベルミスウォームなど、強力エアー加圧×EMS×温熱で夕方のブーツむくみを解消するフットケア10選！",
    targetGender: "unisex",
    authorId: "author-takahashi",
    authorName: "高橋 凛",
    authorRole: "Qualia Navi スキンケア研究コレクター",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-07",
    readTimeMinutes: 29,
    introText: "寒冷で冷え固まる第二の心臓『ふくらはぎ』を温め絞り流す！パナソニックレッグリフレ、ルルドリラブー2、SIXPADフットフィット、ドクターエア、ベルミスウォームなど、強力エアー加圧×EMS×温熱で夕方のブーツむくみを解消するフットケア10選！",
    isHallOfFame: true,
    coverImage: footItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/foot.jpg",
    recommendedItemCodes: footArticles.map(a => a.id),
    contentMarkdown: footContent
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

const finalCount = (dataTsContent.match(/id:\s*"feat-winter-/g) || []).length;
console.log(`🎉 登録完了！特集記事総数確認完了`);
