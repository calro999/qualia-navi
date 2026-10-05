import fs from 'fs';
import path from 'path';
import {
  lipPlumperItemsRaw,
  scalpSerumItemsRaw,
  boosterSerumItemsRaw,
  lipPlumperArticles,
  scalpSerumArticles,
  boosterSerumArticles
} from './insert_winter_batch43_helper.mjs';

import { getLipPlumperArticleContent } from './winter_batch43_article1_lipplumper.mjs';
import { getScalpSerumArticleContent } from './winter_batch43_article2_scalpserum.mjs';
import { getBoosterSerumArticleContent } from './winter_batch43_article3_boosterserum.mjs';

console.log('🚀 [冬コスメ 第43弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const lipPlumperContent = getLipPlumperArticleContent();
const scalpSerumContent = getScalpSerumArticleContent();
const boosterSerumContent = getBoosterSerumArticleContent();

console.log(`- 記事1 (高保湿リッププランパー) 文字数: 約${lipPlumperContent.length}文字`);
console.log(`- 記事2 (高保湿スカルプエッセンス) 文字数: 約${scalpSerumContent.length}文字`);
console.log(`- 記事3 (高保湿導入美容液＆ブースター) 文字数: 約${boosterSerumContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (lipPlumperContent.length < 5000 || scalpSerumContent.length < 5000 || boosterSerumContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-lip-plumper-volume-gloss-serum-2026",
    slug: "winter-lip-plumper-volume-gloss-serum-2026",
    title: "【2026冬ホリデー・縦ジワ消滅＆ぷっくりボリュームアップ】高保湿リッププランパー＆美容液ボリュームグロスおすすめ人気10選！痛くない名品から温感ピリピリ・ガラス玉ツヤまで徹底比較",
    subtitle: "寒さと乾燥でしぼんだ唇をふっくら押し返す！ディオール、ジルスチュアート、コスメデコルテ、クラランス、keybo、ヴィセなど、縦ジワを消して魅惑的な生ツヤと多幸感を与える高保湿リッププランパー10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 22,
    introText: "寒さと乾燥でしぼんだ唇をふっくら押し返す！ディオール、ジルスチュアート、コスメデコルテ、クラランス、keybo、ヴィセなど、縦ジワを消して魅惑的な生ツヤと多幸感を与える高保湿リッププランパー10選を徹底比較！",
    isHallOfFame: true,
    coverImage: lipPlumperItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipplumper.jpg",
    recommendedItemCodes: lipPlumperArticles.map(a => a.id),
    contentMarkdown: lipPlumperContent
  },
  {
    id: "feat-winter-scalp-serum-hydrating-essence-lotion-2026",
    slug: "winter-scalp-serum-hydrating-essence-lotion-2026",
    title: "【2026冬・暖房による乾燥フケ・かゆみ＆頭皮冷えを根本ケア】高保湿スカルプエッセンス＆温感頭皮美容液おすすめ人気10選！パチパチ炭酸・薬用育毛・セラミド地肌保湿でふんわり美髪へ",
    subtitle: "暖房乾燥と寒冷によるフケ・かゆみ・抜け毛を徹底防御！アヴェダ、資生堂アデノバイタル、オージュア、ミルボンクロナ炭酸泡、ロクシタン、キュレルなど、冷え固まった頭皮をほぐして美髪を育む高保湿スカルプ美容液10選を徹底検証！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 22,
    introText: "暖房乾燥と寒冷によるフケ・かゆみ・抜け毛を徹底防御！アヴェダ、資生堂アデノバイタル、オージュア、ミルボンクロナ炭酸泡、ロクシタン、キュレルなど、冷え固まった頭皮をほぐして美髪を育む高保湿スカルプ美容液10選を徹底検証！",
    isHallOfFame: true,
    coverImage: scalpSerumItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/scalpserum.jpg",
    recommendedItemCodes: scalpSerumArticles.map(a => a.id),
    contentMarkdown: scalpSerumContent
  },
  {
    id: "feat-winter-hydrating-booster-serum-facial-oil-2026",
    slug: "winter-hydrating-booster-serum-facial-oil-2026",
    title: "【2026冬・寒さで強張った角層を解きほぐす先行投資スキンケア】高保湿導入美容液＆濃密ブースターオイルおすすめ人気10選！マイクロ炭酸泡・多重層リポソーム・発酵液で化粧水がグングン入る神アイテム比較",
    subtitle: "真冬のゴワつき・砂漠肌を解き放つ！コスメデコルテリポソーム、ソフィーナiP土台美容液、RMKオイル、タカミスキンピール、ランコムなど、後から使う化粧水や美容液を磁石のように引き込む先行導入ブースター10選を徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 22,
    introText: "真冬のゴワつき・砂漠肌を解き放つ！コスメデコルテリポソーム、ソフィーナiP土台美容液、RMKオイル、タカミスキンピール、ランコムなど、後から使う化粧水や美容液を磁石のように引き込む先行導入ブースター10選を徹底比較！",
    isHallOfFame: true,
    coverImage: boosterSerumItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/boosterserum.jpg",
    recommendedItemCodes: boosterSerumArticles.map(a => a.id),
    contentMarkdown: boosterSerumContent
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
