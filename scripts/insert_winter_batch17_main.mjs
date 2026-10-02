import fs from 'fs';
import path from 'path';
import {
  nailItemsRaw,
  steamerItemsRaw,
  eyebrowItemsRaw,
  nailArticles,
  steamerArticles,
  eyebrowArticles
} from './insert_winter_batch17_helper.mjs';

import { getNailArticleContent } from './winter_batch17_article1_nail.mjs';
import { getSteamerArticleContent } from './winter_batch17_article2_steamer.mjs';
import { getEyebrowArticleContent } from './winter_batch17_article3_eyebrow.mjs';

console.log('🚀 [冬コスメ 第17弾] 特集記事の生成と data.ts への統合を開始します...');

const nailContent = getNailArticleContent();
const steamerContent = getSteamerArticleContent();
const eyebrowContent = getEyebrowArticleContent();

console.log(`- 記事1 (セルフネイル＆ケア) 文字数: 約${nailContent.length}文字`);
console.log(`- 記事2 (フェイススチーマー) 文字数: 約${steamerContent.length}文字`);
console.log(`- 記事3 (アイブロウ＆眉マスカラ) 文字数: 約${eyebrowContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (nailContent.length < 5000 || steamerContent.length < 5000 || eyebrowContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-self-nail-polish-care-2026",
    slug: "winter-holiday-self-nail-polish-care-2026",
    title: "【2026冬・指先に宿す極上の冬映えと多幸感】高密着セルフネイルポリッシュ＆ホリデー限定速乾ネイルおすすめ人気10選！割れ爪・二枚爪を防ぐ高保湿ケア＆サロン級ツヤ速乾決定版",
    subtitle: "手袋を外した瞬間に視線を奪う、大人のための冬ネイル決定版！uka（美容液カラーベース）、OSAJI（圧迫感ゼロ透けツヤ）、THREE（植物オイル高配合）、SHIRO（アマニ油リッチ）、キャンメイク、D-UP、エクセル、アディクション、デュカート、コスメデコルテなど、真冬の乾燥・割れ爪・二枚爪を防ぎながらサロン級のツヤと速乾を叶える名作ポリッシュ10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "手袋を外した瞬間に視線を奪う、大人のための冬ネイル決定版！uka（美容液カラーベース）、OSAJI（圧迫感ゼロ透けツヤ）、THREE（植物オイル高配合）、SHIRO（アマニ油リッチ）、キャンメイク、D-UP、エクセル、アディクション、デュカート、コスメデコルテなど、真冬の乾燥・割れ爪・二枚爪を防ぎながらサロン級のツヤと速乾を叶える名作ポリッシュ10選を徹底比較！",
    isHallOfFame: true,
    coverImage: nailItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/nail.jpg",
    recommendedItemCodes: nailArticles.map(a => a.id),
    contentMarkdown: nailContent
  },
  {
    id: "feat-winter-nano-facial-steamer-device-2026",
    slug: "winter-nano-facial-steamer-device-2026",
    title: "【2026冬・冷え切った肌を解きほぐす極上温感スチーム】フェイススチーマー＆ナノケア美顔器おすすめ人気10選！真冬のゴワつき・毛穴詰まり・乾燥砂漠肌を浸透モチ肌へ導く決定版",
    subtitle: "冬の寒さとエアコン暖房でカチコチに凍りついた角質層をナノ温スチームで解きほぐす！パナソニック（ナノケア EH-SA3D / EH-SA0B化粧水ミスト）、SALONIA（温冷Wスチーム）、ヤーマン（ブライトクリーン / 5色フォトスチーマーEX）、FESTINO、ツインバード、ANLAN、美ルル、NANOAなど、冬のボーナスやクリスマスご褒美にふさわしい本格美顔器10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "冬の寒さとエアコン暖房でカチコチに凍りついた角質層をナノ温スチームで解きほぐす！パナソニック（ナノケア EH-SA3D / EH-SA0B化粧水ミスト）、SALONIA（温冷Wスチーム）、ヤーマン（ブライトクリーン / 5色フォトスチーマーEX）、FESTINO、ツインバード、ANLAN、美ルル、NANOAなど、冬のボーナスやクリスマスご褒美にふさわしい本格美顔器10選を徹底検証！",
    isHallOfFame: true,
    coverImage: steamerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/steamer.jpg",
    recommendedItemCodes: steamerArticles.map(a => a.id),
    contentMarkdown: steamerContent
  },
  {
    id: "feat-winter-fluffy-eyebrow-palette-mascara-2026",
    slug: "winter-fluffy-eyebrow-palette-mascara-2026",
    title: "【2026冬・コートに映える抜け感美眉】高密着アイブロウパレット＆垢抜けニュアンス眉マスカラおすすめ人気10選！冬の乾燥・マフラー摩擦でも消えない立体ふんわり眉決定版",
    subtitle: "マフラーやタートルネックで顔の下半分が隠れる冬こそ「眉の抜け感」で印象激変！コスメデコルテ（骨格コントゥアリング）、セルヴォーク（おしゃれモーヴ）、ケイト（殿堂入り3D）、デジャヴュ（極小ブラシフィルム）、ロムアンド（自眉の黒さリセット）、ジルスチュアート（多幸感ムース）、フーミー、エクセル、キャンメイク、&be（消えないワックス）など、マフラー摩擦でも夜まで眉尻が消えない名作10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "マフラーやタートルネックで顔の下半分が隠れる冬こそ「眉の抜け感」で印象激変！コスメデコルテ（骨格コントゥアリング）、セルヴォーク（おしゃれモーヴ）、ケイト（殿堂入り3D）、デジャヴュ（極小ブラシフィルム）、ロムアンド（自眉の黒さリセット）、ジルスチュアート（多幸感ムース）、フーミー、エクセル、キャンメイク、&be（消えないワックス）など、マフラー摩擦でも夜まで眉尻が消えない名作10選！",
    isHallOfFame: true,
    coverImage: eyebrowItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyebrow.jpg",
    recommendedItemCodes: eyebrowArticles.map(a => a.id),
    contentMarkdown: eyebrowContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第17弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}
