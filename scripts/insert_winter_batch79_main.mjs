import fs from 'fs';
import path from 'path';
import {
  powderItemsRaw,
  primerItemsRaw,
  eyelashItemsRaw,
  powderArticles,
  primerArticles,
  eyelashArticles
} from './insert_winter_batch79_helper.mjs';

import { getPowderArticleContent } from './winter_batch79_article1_powder.mjs';
import { getPrimerArticleContent } from './winter_batch79_article2_primer.mjs';
import { getEyelashArticleContent } from './winter_batch79_article3_eyelash.mjs';

console.log('🚀 [冬コスメ 第79弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const powderContent = getPowderArticleContent();
const primerContent = getPrimerArticleContent();
const eyelashContent = getEyelashArticleContent();

console.log(`- 記事1 (高保湿フェイスパウダー) 文字数: 約${powderContent.length}文字`);
console.log(`- 記事2 (トーンアップカラー下地) 文字数: 約${primerContent.length}文字`);
console.log(`- 記事3 (高濃度まつ毛美容液) 文字数: 約${eyelashContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (powderContent.length < 5000 || primerContent.length < 5000 || eyelashContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-hydrating-face-powder-moist-2026",
    slug: "winter-hydrating-face-powder-moist-2026",
    title: "【2026冬・暖房乾燥でも粉吹き・小じわ落ちゼロ】高保湿ルースパウダー＆美容液フェイスパウダーおすすめ人気10選！コスメデコルテ・カネボウ ミラコレ・NARS・エレガンス徹底比較！冬のパウダー砂漠化を防ぎ極上生ツヤ陶器肌へ",
    subtitle: "11〜12月の強い暖房風や外気の乾燥でも粉吹き・小じわ割れを防ぎ、美容液成分でしっとり潤いながら毛穴レスな陶器肌を一日中キープする高保湿フェイスパウダー10選！",
    targetGender: "unisex",
    authorId: "author-matsumoto",
    authorName: "松本 結衣",
    authorRole: "Qualia Navi ベースメイクコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 34,
    introText: "11〜12月の強い暖房風や外気の乾燥でも粉吹き・小じわ割れを防ぎ、美容液成分でしっとり潤いながら毛穴レスな陶器肌を一日中キープする高保湿フェイスパウダー10選！",
    isHallOfFame: true,
    coverImage: powderItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/powder.jpg",
    recommendedItemCodes: powderArticles.map(a => a.id),
    contentMarkdown: powderContent
  },
  {
    id: "feat-winter-toneup-color-primer-glow-2026",
    slug: "winter-toneup-color-primer-glow-2026",
    title: "【2026冬・冷えくすみ＆血行不良を一瞬で血色透明感へ】高保湿トーンアップカラー下地＆コントロールカラーおすすめ人気10選！ラロッシュポゼ・コスメデコルテ・エレガンス・ジルスチュアート徹底比較！くすみを飛ばし夕方まで発光美肌が続く",
    subtitle: "11〜12月の寒さによる血行不良・青白いくすみや黄ぐすみを光とカラー補正で払い、素肌そのものが発光しているかのような血色ツヤ美肌へ導く高保湿カラー化粧下地10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 35,
    introText: "11〜12月の寒さによる血行不良・青白いくすみや黄ぐすみを光とカラー補正で払い、素肌そのものが発光しているかのような血色ツヤ美肌へ導く高保湿カラー化粧下地10選！",
    isHallOfFame: true,
    coverImage: primerItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/primer.jpg",
    recommendedItemCodes: primerArticles.map(a => a.id),
    contentMarkdown: primerContent
  },
  {
    id: "feat-winter-nourishing-eyelash-serum-lash-care-2026",
    slug: "winter-nourishing-eyelash-serum-lash-care-2026",
    title: "【2026冬・暖房乾燥＆摩擦ダメージから美まつ毛を守る】高濃度まつ毛美容液＆まつ毛トリートメントおすすめ人気10選！ラッシュアディクト・エマーキット・スカルプD・PHOEBE徹底比較！冬の抜け毛・切れ毛をストップし濃密ハリコシ自まつ毛へ",
    subtitle: "11〜12月の外気乾燥やビューラー・マスカラによる冬のダメージ・切れ毛を防ぎ、高濃度ペプチドや美容液成分で濃密なハリ・コシ・密度を与える高機能まつ毛美容液10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-11",
    readTimeMinutes: 33,
    introText: "11〜12月の外気乾燥やビューラー・マスカラによる冬のダメージ・切れ毛を防ぎ、高濃度ペプチドや美容液成分で濃密なハリ・コシ・密度を与える高機能まつ毛美容液10選！",
    isHallOfFame: true,
    coverImage: eyelashItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/eyelash.jpg",
    recommendedItemCodes: eyelashArticles.map(a => a.id),
    contentMarkdown: eyelashContent
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
  console.log('✅ src/data.ts の INITIAL_BLOG_POSTS に新規3特集記事を追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 第79弾の特集記事および商品記事の統合が完了しました！');
