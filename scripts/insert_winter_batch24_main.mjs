import fs from 'fs';
import path from 'path';
import {
  heparinItemsRaw,
  carbonicItemsRaw,
  lipBalmItemsRaw,
  heparinArticles,
  carbonicArticles,
  lipBalmArticles
} from './insert_winter_batch24_helper.mjs';

import { getHeparinArticleContent } from './winter_batch24_article1_heparin.mjs';
import { getCarbonicArticleContent } from './winter_batch24_article2_carbonic.mjs';
import { getLipBalmArticleContent } from './winter_batch24_article3_lipbalm.mjs';

console.log('🚀 [冬コスメ 第24弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const heparinContent = getHeparinArticleContent();
const carbonicContent = getCarbonicArticleContent();
const lipBalmContent = getLipBalmArticleContent();

console.log(`- 記事1 (ヘパリン＆ワセリン) 文字数: 約${heparinContent.length}文字`);
console.log(`- 記事2 (高濃度炭酸泡パック) 文字数: 約${carbonicContent.length}文字`);
console.log(`- 記事3 (ティントリップバーム) 文字数: 約${lipBalmContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (heparinContent.length < 5000 || carbonicContent.length < 5000 || lipBalmContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-heparin-vaseline-barrier-balm-dry-skin-2026",
    slug: "winter-heparin-vaseline-barrier-balm-dry-skin-2026",
    title: "【2026冬・粉吹き肌荒れ＆皮むけを皮膚科級保水で救済】ヘパリン類似物質＆高精製ワセリン配合コスメおすすめ人気10選！医薬部外品バームから濃密高保湿乳液まで真冬の砂漠肌レスキュー決定版",
    subtitle: "湿度が30%を下回る11〜12月、普通のクリームでは追いつかない口元の粉吹き・カサつき・赤み肌荒れを根本修復！カルテHD（高保湿オールインワン・乳液）、資生堂イハダ（薬用バーム・ナイトパック）、健栄製薬ヒルマイルド、日興リカ サンホワイトP-1、ヘパトリート、ケアセラAP、ザーネクリーム、キュレルなど、皮膚科レベルの実力派10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "湿度が30%を下回る11〜12月、普通のクリームでは追いつかない口元の粉吹き・カサつき・赤み肌荒れを根本修復！カルテHD（高保湿オールインワン・乳液）、資生堂イハダ（薬用バーム・ナイトパック）、健栄製薬ヒルマイルド、日興リカ サンホワイトP-1、ヘパトリート、ケアセラAP、ザーネクリーム、キュレルなど、皮膚科レベルの実力派10選を徹底検証！",
    isHallOfFame: true,
    coverImage: heparinItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/heparin.jpg",
    recommendedItemCodes: heparinArticles.map(a => a.id),
    contentMarkdown: heparinContent
  },
  {
    id: "feat-winter-carbonic-acid-foam-pack-serum-2026",
    slug: "winter-carbonic-acid-foam-pack-serum-2026",
    title: "【2026冬・冷えくすみ＆ゴワつき肌を血流ブーストで即効リセット】高濃度炭酸泡パック＆炭酸土台美容液おすすめ人気10選！朝の血色感UPと浸透力を極める冬の炭酸スキンケア決定版",
    subtitle: "急激な冷え込みで毛細血管の血流が滞り、どんより青白くくすむ11〜12月の冬肌をボーア効果で一発トーンアップ！ソフィーナiP（ベースケアセラム土台美容液）、ドクターメディオン（スパオキシジェル生炭酸）、KANEBO（スクラビングマッド・コンフォートストレッチィ）、EKATO（持続型ガスパック）、SHIKARI、アスタリフト、トランシーノなど、プロ絶賛の炭酸コスメ10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "急激な冷え込みで毛細血管の血流が滞り、どんより青白くくすむ11〜12月の冬肌をボーア効果で一発トーンアップ！ソフィーナiP（ベースケアセラム土台美容液）、ドクターメディオン（スパオキシジェル生炭酸）、KANEBO（スクラビングマッド・コンフォートストレッチィ）、EKATO（持続型ガスパック）、SHIKARI、アスタリフト、トランシーノなど、プロ絶賛の炭酸コスメ10選を徹底検証！",
    isHallOfFame: true,
    coverImage: carbonicItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/carbonic.jpg",
    recommendedItemCodes: carbonicArticles.map(a => a.id),
    contentMarkdown: carbonicContent
  },
  {
    id: "feat-winter-tinted-hydrating-lip-balm-glow-2026",
    slug: "winter-tinted-hydrating-lip-balm-glow-2026",
    title: "【2026冬・皮むけ唇をぷるんと染める透け感血色】高保湿ティントリップバーム＆カラーリップトリートメントおすすめ人気10選！荒れない・縦ジワ消える冬のうるみ美発色リップ決定版",
    subtitle: "口紅を塗るとカサついて皮がめくれ、無色リップだと顔色が暗く沈む冬のジレンマを解決！自然由来オイルやシアバターで唇を濃密保護しながらジュワッと透け感血色を宿す人気バームを徹底検証。ディオール（リップグロウ）、シャネル（ココボーム）、オペラ（リップティント）、NARS（アフターグロー）、キャンメイク、メンソレータム（リップフォンデュ）、ボビイブラウン、ロムアンド、Laka、トリデンなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "口紅を塗るとカサついて皮がめくれ、無色リップだと顔色が暗く沈む冬のジレンマを解決！自然由来オイルやシアバターで唇を濃密保護しながらジュワッと透け感血色を宿す人気バームを徹底検証。ディオール（リップグロウ）、シャネル（ココボーム）、オペラ（リップティント）、NARS（アフターグロー）、キャンメイク、メンソレータム（リップフォンデュ）、ボビイブラウン、ロムアンド、Laka、トリデンなど厳選10選！",
    isHallOfFame: true,
    coverImage: lipBalmItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipbalm.jpg",
    recommendedItemCodes: lipBalmArticles.map(a => a.id),
    contentMarkdown: lipBalmContent
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
