import fs from 'fs';
import path from 'path';
import {
  concealerItemsRaw,
  hairBalmItemsRaw,
  stickBalmItemsRaw,
  concealerArticles,
  hairBalmArticles,
  stickBalmArticles
} from './insert_winter_batch12_helper.mjs';

import { getConcealerArticleContent } from './winter_batch12_article1_concealer.mjs';
import { getHairBalmArticleContent } from './winter_batch12_article2_hairbalm.mjs';
import { getStickBalmArticleContent } from './winter_batch12_article3_stickbalm.mjs';

console.log('🚀 [冬コスメ 第12弾] 特集記事の生成と data.ts への統合を開始します...');

const concealerContent = getConcealerArticleContent();
const hairBalmContent = getHairBalmArticleContent();
const stickBalmContent = getStickBalmArticleContent();

console.log(`- 記事1 (美容液コンシーラー) 文字数: 約${concealerContent.length}文字`);
console.log(`- 記事2 (高保湿ヘアバーム) 文字数: 約${hairBalmContent.length}文字`);
console.log(`- 記事3 (スティック美容液・バーム) 文字数: 約${stickBalmContent.length}文字`);

const blogPostsToAdd = [
  {
    id: "feat-winter-hydrating-serum-liquid-concealer-2026",
    slug: "winter-hydrating-serum-liquid-concealer-2026",
    title: "【2026冬・目元の乾燥割れ＆くすみクマ完全消去】高保湿美容液コンシーラー＆目元密着リキッドコンシーラーおすすめ人気10選！夕方のちりめんジワ・ひび割れを防ぐ薄膜ツヤ密着決定版",
    subtitle: "「隠せば隠すほどシワ割れして老け見えする」冬の目元悩みを根本解決！Dior（美容液96%）、NARS（光拡散）、コスメデコルテ（4色パレット）、資生堂（発酵ケフィア）、TIRTIR（2in1）、&be、IPSAなど、日中のアイクリーム効果を発揮する神コンシーラー10選を徹底比較。12時間シワに溜まらないプロ直伝ミルフィーユ密着テクニックも大公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 16,
    introText: "「隠せば隠すほどシワ割れして老け見えする」冬の目元悩みを根本解決！Dior（美容液96%）、NARS（光拡散）、コスメデコルテ（4色パレット）、資生堂（発酵ケフィア）、TIRTIR（2in1）、&be、IPSAなど、日中のアイクリーム効果を発揮する神コンシーラー10選を徹底比較。12時間シワに溜まらないプロ直伝ミルフィーユ密着テクニックも大公開！",
    isHallOfFame: true,
    coverImage: concealerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/concealer.jpg",
    recommendedItemCodes: concealerArticles.map(a => a.id),
    contentMarkdown: concealerContent
  },
  {
    id: "feat-winter-rich-hair-balm-styling-butter-2026",
    slug: "winter-rich-hair-balm-styling-butter-2026",
    title: "【2026冬・ニット摩擦＆乾燥パサつきに負けない濡れツヤ束感】高保湿ヘアバーム＆天然由来オーガニックスタイリングバターおすすめ人気10選！手肌も潤うマルチユース決定版",
    subtitle: "「ヘアオイルだけ」では真冬のパサつき・広がり・静電気は防げない？！N.（エヌドット）、ザ・プロダクト、track（ユズ）、リンクオリジナルメーカーズ997、ミルボン（メルティバター）、ボタニストなど、冷風と暖房乾燥から髪を守り抜く高保湿ヘアバーム10選を徹底検証。ベタつかないサロン級インサイド塗布メソッドも完全解説！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 15,
    introText: "「ヘアオイルだけ」では真冬のパサつき・広がり・静電気は防げない？！N.（エヌドット）、ザ・プロダクト、track（ユズ）、リンクオリジナルメーカーズ997、ミルボン（メルティバター）、ボタニストなど、冷風と暖房乾燥から髪を守り抜く高保湿ヘアバーム10選を徹底検証。ベタつかないサロン級インサイド塗布メソッドも完全解説！",
    isHallOfFame: true,
    coverImage: hairBalmItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hairbalm.jpg",
    recommendedItemCodes: hairBalmArticles.map(a => a.id),
    contentMarkdown: hairBalmContent
  },
  {
    id: "feat-winter-hydrating-moisture-stick-rescue-balm-2026",
    slug: "winter-hydrating-moisture-stick-rescue-balm-2026",
    title: "【2026冬・外出先でも粉ふき・乾燥小ジワを即効リセット】高保湿スティック美容液＆SOSレスキューマルチバームおすすめ人気10選！メイクの上から10秒でうるおいツヤ玉復活",
    subtitle: "オフィスの暖房で粉をふく砂漠肌を即座にレスキュー！KAHI（マルチバーム）、IPSA（保水65%）、イハダ（高精製ワセリン）、クラブ（デイエッセンス）、dプログラム、ロクシタン（シアバター）など、メイクを崩さず潤いとツヤを蘇らせる神スティック＆バーム10選を徹底比較。夕方の過乾燥を防ぐ1分リタッチ法も大公開！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-09-30",
    readTimeMinutes: 15,
    introText: "オフィスの暖房で粉をふく砂漠肌を即座にレスキュー！KAHI（マルチバーム）、IPSA（保水65%）、イハダ（高精製ワセリン）、クラブ（デイエッセンス）、dプログラム、ロクシタン（シアバター）など、メイクを崩さず潤いとツヤを蘇らせる神スティック＆バーム10選を徹底比較。夕方の過乾燥を防ぐ1分リタッチ法も大公開！",
    isHallOfFame: true,
    coverImage: stickBalmItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/stickbalm.jpg",
    recommendedItemCodes: stickBalmArticles.map(a => a.id),
    contentMarkdown: stickBalmContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に冬コスメ第12弾の3記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした！');
  process.exit(1);
}
