import fs from 'fs';
import path from 'path';
import {
  hairStickItemsRaw,
  healingLipItemsRaw,
  tonerPadItemsRaw,
  hairStickArticles,
  healingLipArticles,
  tonerPadArticles
} from './insert_winter_batch25_helper.mjs';

import { getHairStickArticleContent } from './winter_batch25_article1_hairstick.mjs';
import { getHealingLipArticleContent } from './winter_batch25_article2_healinglip.mjs';
import { getTonerPadArticleContent } from './winter_batch25_article3_tonerpad.mjs';

console.log('🚀 [冬コスメ 第25弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const hairStickContent = getHairStickArticleContent();
const healingLipContent = getHealingLipArticleContent();
const tonerPadContent = getTonerPadArticleContent();

console.log(`- 記事1 (まとめ髪スティック) 文字数: 約${hairStickContent.length}文字`);
console.log(`- 記事2 (医薬品治療リップ) 文字数: 約${healingLipContent.length}文字`);
console.log(`- 記事3 (高保湿トナーパッド) 文字数: 約${tonerPadContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (hairStickContent.length < 5000 || healingLipContent.length < 5000 || tonerPadContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-anti-frizz-hair-stick-point-repair-2026",
    slug: "winter-anti-frizz-hair-stick-point-repair-2026",
    title: "【2026冬・静電気＆マフラー摩擦のアホ毛を一瞬で消す】まとめ髪スティック＆ポイントリペアヘアスティックおすすめ人気10選！手を汚さず外出先でも濡れツヤキープする冬の美髪レスキュー決定版",
    subtitle: "ウールコートやマフラーで静電気が発生し、頭頂部のアホ毛や前髪の割れが頻発する11〜12月！手を汚さず外出先でも数秒で浮き毛を整えるマスカラ型ブラシ＆固形バームを徹底検証。プリュスオー（ポイントリペア）、ウテナ（マトメージュ レギュラー/スーパーホールド）、ミルボン（エルジューダ）、Fujiko、ダイアン、アンドハニー、ジョンマスター、セザンヌ、ルシードエルなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "ウールコートやマフラーで静電気が発生し、頭頂部のアホ毛や前髪の割れが頻発する11〜12月！手を汚さず外出先でも数秒で浮き毛を整えるマスカラ型ブラシ＆固形バームを徹底検証。プリュスオー（ポイントリペア）、ウテナ（マトメージュ レギュラー/スーパーホールド）、ミルボン（エルジューダ）、Fujiko、ダイアン、アンドハニー、ジョンマスター、セザンヌ、ルシードエルなど厳選10選！",
    isHallOfFame: true,
    coverImage: hairStickItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/hairstick.jpg",
    recommendedItemCodes: hairStickArticles.map(a => a.id),
    contentMarkdown: hairStickContent
  },
  {
    id: "feat-winter-medicated-healing-lip-cream-cracked-lips-2026",
    slug: "winter-medicated-healing-lip-cream-cracked-lips-2026",
    title: "【2026冬・血が出るひび割れ＆口角炎を根本治療】モアリップ級 医薬品リップクリーム＆薬用高保水リペアリップおすすめ人気10選！普通のリップが効かない冬の唇トラブルを医学的アプローチで救済する決定版",
    subtitle: "湿度が30%を下回る11〜12月、あくびや会話で口角が切れ、縦ジワから出血する深刻な唇トラブルを即効修復！アラントイン・ビタミンB6・ビタミンEを高濃度配合した第3類医薬品から皮膚科医注目の薬用セラミドバームまで徹底比較。資生堂モアリップ、ロート製薬ヒビプロLP、ユースキンリリップ、オバジ、キュレル、ベビーワセリン、dプログラム、近江兄弟社、トリデンなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "湿度が30%を下回る11〜12月、あくびや会話で口角が切れ、縦ジワから出血する深刻な唇トラブルを即効修復！アラントイン・ビタミンB6・ビタミンEを高濃度配合した第3類医薬品から皮膚科医注目の薬用セラミドバームまで徹底比較。資生堂モアリップ、ロート製薬ヒビプロLP、ユースキンリリップ、オバジ、キュレル、ベビーワセリン、dプログラム、近江兄弟社、トリデンなど厳選10選！",
    isHallOfFame: true,
    coverImage: healingLipItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/healinglip.jpg",
    recommendedItemCodes: healingLipArticles.map(a => a.id),
    contentMarkdown: healingLipContent
  },
  {
    id: "feat-winter-hydrating-toner-pad-moisture-barrier-2026",
    slug: "winter-hydrating-toner-pad-moisture-barrier-2026",
    title: "【2026冬・朝5分で暖房乾燥ゼロの吸い付き肌】高保湿トナーパッド＆部分用リペア水分パッドおすすめ人気10選！冬の冷えゴワつき肌をほぐし夕方までファンデが粉吹きしないメイク前の仕込み決定版",
    subtitle: "寒さで皮膚温が下がり化粧水が弾かれる11〜12月の朝、サッと貼るだけで角質柔軟と水分密閉を叶える大人気トナーパッドを徹底検証！液だれせず髪も濡らさない朝5分の時短仕込みで、オフィス暖房の猛烈な乾燥でも夕方までファンデが毛穴落ち・粉浮きしない水光肌へ。トリデン、ナンバーズイン3番・5番、メディヒール、Anua、スキンフード、VT、バイオヒールボ、COSRXなど厳選10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-03",
    readTimeMinutes: 16,
    introText: "寒さで皮膚温が下がり化粧水が弾かれる11〜12月の朝、サッと貼るだけで角質柔軟と水分密閉を叶える大人気トナーパッドを徹底検証！液だれせず髪も濡らさない朝5分の時短仕込みで、オフィス暖房の猛烈な乾燥でも夕方までファンデが毛穴落ち・粉浮きしない水光肌へ。トリデン、ナンバーズイン3番・5番、メディヒール、Anua、スキンフード、VT、バイオヒールボ、COSRXなど厳選10選！",
    isHallOfFame: true,
    coverImage: tonerPadItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/tonerpad.jpg",
    recommendedItemCodes: tonerPadArticles.map(a => a.id),
    contentMarkdown: tonerPadContent
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
