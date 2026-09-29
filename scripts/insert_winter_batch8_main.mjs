import fs from 'fs';
import path from 'path';
import {
  cheekItemsRaw,
  bodyItemsRaw,
  lashItemsRaw,
  cheekArticles,
  bodyArticles,
  lashArticles
} from './insert_winter_batch8_helper.mjs';

import { getCheekArticleContent } from './winter_batch8_article1_cheek.mjs';
import { getBodywashArticleContent } from './winter_batch8_article2_bodywash.mjs';
import { getLashArticleContent } from './winter_batch8_article3_lash.mjs';

console.log('🚀 [冬コスメ 第8弾] 特集記事の生成と data.ts への統合を開始します...');

const cheekContent = getCheekArticleContent();
const bodyContent = getBodywashArticleContent();
const lashContent = getLashArticleContent();

console.log(`- 記事1 (チーク) 文字数: 約${cheekContent.length}文字`);
console.log(`- 記事2 (ボディウォッシュ) 文字数: 約${bodyContent.length}文字`);
console.log(`- 記事3 (まつ毛美容液) 文字数: 約${lashContent.length}文字`);

const blogPostsToAdd = [
  {
    id: "feat-winter-cream-liquid-blush-cheek-2026",
    slug: "winter-cream-liquid-blush-cheek-2026",
    title: "【2026冬・極上ツヤ血色＆多幸感】高密着クリームチーク＆リキッドチークおすすめ人気10選！冬の粉ふき・青ぐすみを防ぎ内側から上気する生血色チーク決定版",
    subtitle: "11〜12月の寒冷による青ぐすみ＆暖房乾燥による粉ふき・毛穴落ちを完全解決！NARS、コスメデコルテ、ジルスチュアート、キャンメイク、セザンヌなど、冬の暗色コートやニットに映える多幸感あふれる濡れツヤ生血色チーク10選を徹底比較。プロ直伝のスポンジ叩き込み塗法とマスクに付かない仕込みサンド技も完全公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 14,
    introText: "11〜12月の寒冷による青ぐすみ＆暖房乾燥による粉ふき・毛穴落ちを完全解決！NARS、コスメデコルテ、ジルスチュアート、キャンメイク、セザンヌなど、冬の暗色コートやニットに映える多幸感あふれる濡れツヤ生血色チーク10選を徹底比較。プロ直伝のスポンジ叩き込み塗法とマスクに付かない仕込みサンド技も完全公開！",
    isHallOfFame: true,
    coverImage: cheekItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/cheek.jpg",
    recommendedItemCodes: cheekArticles.map(a => a.id),
    contentMarkdown: cheekContent
  },
  {
    id: "feat-winter-hydrating-body-wash-soap-2026",
    slug: "winter-hydrating-body-wash-soap-2026",
    title: "【2026冬・洗うだけで全身もちもち吸い付く肌へ】高保湿ボディウォッシュ＆薬用泡ボディソープおすすめ人気10選！真冬の粉吹き・すねの痒み・カサカサ乾燥肌をバリア機能ごと守る神洗浄料",
    subtitle: "11〜12月のお風呂上がりに襲ってくる「スネの猛烈なかゆみ」と「白い粉ふき」を皮膚科学アプローチで根本解決！ケアセラ、キュレル、ミノン、ニベアW保水美肌、SABONなど、肌の必須セラミドと水分を奪わずに洗う神ボディウォッシュ10選を徹底比較。皮膚科医推奨の38℃ぬるま湯入浴ルールと濃密泡手洗いテクニックも大公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 14,
    introText: "11〜12月のお風呂上がりに襲ってくる「スネの猛烈なかゆみ」と「白い粉ふき」を皮膚科学アプローチで根本解決！ケアセラ、キュレル、ミノン、ニベアW保水美肌、SABONなど、肌の必須セラミドと水分を奪わずに洗う神ボディウォッシュ10選を徹底比較。皮膚科医推奨の38℃ぬるま湯入浴ルールと濃密泡手洗いテクニックも大公開！",
    isHallOfFame: true,
    coverImage: bodyItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/bodywash.jpg",
    recommendedItemCodes: bodyArticles.map(a => a.id),
    contentMarkdown: bodyContent
  },
  {
    id: "feat-winter-eyelash-serum-lash-care-2026",
    slug: "winter-eyelash-serum-lash-care-2026",
    title: "【2026冬・乾燥しぼみまつ毛を濃密補修＆育毛】高濃度まつ毛美容液（アイラッシュセラム）おすすめ人気10選！冬の寒冷・暖房乾燥・ホリデーメイクの抜け毛を防ぎハリ・コシ・密度を最大化",
    subtitle: "11〜12月の寒冷乾燥とホリデーアイメイクの酷使で急増する「まつ毛の抜け毛」「細毛」「切れ毛」を集中レスキュー！ラッシュアディクト、エマーキット、PHOEBE、スカルプDプレミアムなど、毛母細胞を活性化しケラチンを補修する実力派アイラッシュセラム10選を徹底比較。色素沈着を防ぐ正しい生え際キワ塗りテクニックも完全解説！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 14,
    introText: "11〜12月の寒冷乾燥とホリデーアイメイクの酷使で急増する「まつ毛の抜け毛」「細毛」「切れ毛」を集中レスキュー！ラッシュアディクト、エマーキット、PHOEBE、スカルプDプレミアムなど、毛母細胞を活性化しケラチンを補修する実力派アイラッシュセラム10選を徹底比較。色素沈着を防ぐ正しい生え際キワ塗りテクニックも完全解説！",
    isHallOfFame: true,
    coverImage: lashItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lash.jpg",
    recommendedItemCodes: lashArticles.map(a => a.id),
    contentMarkdown: lashContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第8弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 3つのキラー特集記事の挿入および商品データのマージが完了しました！');
