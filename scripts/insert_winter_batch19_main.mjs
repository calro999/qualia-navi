import fs from 'fs';
import path from 'path';
import {
  plumperItemsRaw,
  washItemsRaw,
  mistItemsRaw,
  plumperArticles,
  washArticles,
  mistArticles
} from './insert_winter_batch19_helper.mjs';

import { getPlumperArticleContent } from './winter_batch19_article1_plumper.mjs';
import { getEnzymeWashArticleContent } from './winter_batch19_article2_enzyme_wash.mjs';
import { getHairMistArticleContent } from './winter_batch19_article3_hair_mist.mjs';

console.log('🚀 [冬コスメ 第19弾] 特集記事の生成と data.ts への統合を開始します...');

const plumperContent = getPlumperArticleContent();
const washContent = getEnzymeWashArticleContent();
const mistContent = getHairMistArticleContent();

console.log(`- 記事1 (リッププランパー) 文字数: 約${plumperContent.length}文字`);
console.log(`- 記事2 (酵素洗顔＆角質ピール) 文字数: 約${washContent.length}文字`);
console.log(`- 記事3 (静電気防止ヘアミスト) 文字数: 約${mistContent.length}文字`);

// 3000文字以上（5000文字以上）であることを厳格に検証
if (plumperContent.length < 5000 || washContent.length < 5000 || mistContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-hydrating-lip-plumper-volume-glow-2026",
    slug: "winter-hydrating-lip-plumper-volume-glow-2026",
    title: "【2026冬・唇の縦ジワ消滅＆ちゅるん発光多幸感】高保湿リッププランパー＆ボリュームツヤリップ美容液おすすめ人気10選！寒冷乾燥・皮むけを防ぎイルミネーションに映える大人のぷっくり粘膜リップ決定版",
    subtitle: "真冬の過酷な寒冷乾燥による「唇のしぼみ」「深い縦ジワ」「青白いくすみ」を即効レスキュー！ディオール（ヒアルロン酸ガラスツヤ）、ジルスチュアート（花蜜濃密トリートメント）、ヴィセ（スパイシープランプ）、ボビイブラウン（ボタニカル高保湿セラム）、クラランス、TIRTIR、キャンメイク、フジコ、KEYBO、エトヴォスなど、内側から押し返すようなハリと血色多幸感を叶える名作10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "真冬の過酷な寒冷乾燥による「唇のしぼみ」「深い縦ジワ」「青白いくすみ」を即効レスキュー！ディオール（ヒアルロン酸ガラスツヤ）、ジルスチュアート（花蜜濃密トリートメント）、ヴィセ（スパイシープランプ）、ボビイブラウン（ボタニカル高保湿セラム）、クラランス、TIRTIR、キャンメイク、フジコ、KEYBO、エトヴォスなど、内側から押し返すようなハリと血色多幸感を叶える名作10選！",
    isHallOfFame: true,
    coverImage: plumperItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/plumper.jpg",
    recommendedItemCodes: plumperArticles.map(a => a.id),
    contentMarkdown: plumperContent
  },
  {
    id: "feat-winter-enzyme-powder-wash-peeling-glow-2026",
    slug: "winter-enzyme-powder-wash-peeling-glow-2026",
    title: "【2026冬・ターンオーバー低下と乾燥くすみを打破】高保湿・酵素洗顔パウダー＆温感角質ピールおすすめ人気10選！冬のゴワつき・毛穴詰まりを潤い守ってオフする発光つるすべ透明肌決定版",
    subtitle: "寒冷による皮膚温低下で起こる「冬の角質肥厚（硬化角質）」と「化粧水が弾かれるゴワつき」を根本改善！オバジC（ピュアビタミンC配合）、ファンケル（炭×泥クッション泡）、スイサイ（W酵素カプセル）、カネボウ（プレミアム濃密泡）、タカミスキンピール、VT、キュレル、ミノン、センサイ、メラノCCなど、肌の水分を守りながら不要タンパク質汚れだけを分解する名作10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "寒冷による皮膚温低下で起こる「冬の角質肥厚（硬化角質）」と「化粧水が弾かれるゴワつき」を根本改善！オバジC（ピュアビタミンC配合）、ファンケル（炭×泥クッション泡）、スイサイ（W酵素カプセル）、カネボウ（プレミアム濃密泡）、タカミスキンピール、VT、キュレル、ミノン、センサイ、メラノCCなど、肌の水分を守りながら不要タンパク質汚れだけを分解する名作10選！",
    isHallOfFame: true,
    coverImage: washItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/wash.jpg",
    recommendedItemCodes: washArticles.map(a => a.id),
    contentMarkdown: washContent
  },
  {
    id: "feat-winter-anti-static-hair-mist-gloss-spray-2026",
    slug: "winter-anti-static-hair-mist-gloss-spray-2026",
    title: "【2026冬・コート＆ニットの静電気・摩擦パサつき完全ブロック】高密着美髪ヘアミスト＆静電気防止ツヤ髪スプレーおすすめ人気10選！マフラーを外しても広がらないうるツヤまとまり髪決定版",
    subtitle: "湿度20%台の過酷な冬にマフラーを着脱した瞬間の「バチバチ静電気爆発」「浮き毛・アホ毛」「毛先のパサつき摩擦」を完全中和！ジルスチュアート（愛されホワイトフローラル）、ディオール（ミスディオール美髪ヴェール）、ReFa（ロックミスト）、ミルボン（サロン級CMADK補修）、SHIRO、シャネル、モロッカンオイル、ラ・カスタ、ナプラ、オルビスなど、オイル前の水分補給でまとまり髪を叶える名作10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-02",
    readTimeMinutes: 16,
    introText: "湿度20%台の過酷な冬にマフラーを着脱した瞬間の「バチバチ静電気爆発」「浮き毛・アホ毛」「毛先のパサつき摩擦」を完全中和！ジルスチュアート（愛されホワイトフローラル）、ディオール（ミスディオール美髪ヴェール）、ReFa（ロックミスト）、ミルボン（サロン級CMADK補修）、SHIRO、シャネル、モロッカンオイル、ラ・カスタ、ナプラ、オルビスなど、オイル前の水分補給でまとまり髪を叶える名作10選！",
    isHallOfFame: true,
    coverImage: mistItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/mist.jpg",
    recommendedItemCodes: mistArticles.map(a => a.id),
    contentMarkdown: mistContent
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
  console.log(`✅ src/data.ts の INITIAL_BLOG_POSTS に3件の新規特集記事を追加しました！`);
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが見つかりませんでした！');
  process.exit(1);
}

console.log('🎉 バッチ19（特集3記事＆個別商品30記事）の統合が正常に完了しました！');
