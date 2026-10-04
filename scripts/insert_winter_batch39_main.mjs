import fs from 'fs';
import path from 'path';
import {
  fragranceItemsRaw,
  lipMaskItemsRaw,
  nailCareItemsRaw,
  fragranceArticles,
  lipMaskArticles,
  nailCareArticles
} from './insert_winter_batch39_helper.mjs';

import { getFragranceArticleContent } from './winter_batch39_article1_fragrance.mjs';
import { getLipMaskArticleContent } from './winter_batch39_article2_lip_mask.mjs';
import { getNailCareArticleContent } from './winter_batch39_article3_nail_care.mjs';

console.log('🚀 [冬コスメ 第39弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const fragranceContent = getFragranceArticleContent();
const lipMaskContent = getLipMaskArticleContent();
const nailCareContent = getNailCareArticleContent();

console.log(`- 記事1 (ホリデー限定フレグランス＆冬香水・ヘアミスト) 文字数: 約${fragranceContent.length}文字`);
console.log(`- 記事2 (夜用リップスリーピングマスク＆高保湿リップ) 文字数: 約${lipMaskContent.length}文字`);
console.log(`- 記事3 (ホリデー限定ネイルカラー＆高保湿ネイルオイル) 文字数: 約${nailCareContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (fragranceContent.length < 5000 || lipMaskContent.length < 5000 || nailCareContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-holiday-fragrance-parfum-hairmist-2026",
    slug: "winter-holiday-fragrance-parfum-hairmist-2026",
    title: "【2026冬ホリデー・聖夜を彩る温もりと洗練の香り】ホリデー限定フレグランス＆冬のプレミアム香水・ヘアミストおすすめ人気10選！バニラ・ウッディ・紅茶系の冬映え名品徹底比較",
    subtitle: "澄んだ冷気と聖夜の街並みに美しく溶け込む！ジョー マローン、メゾン マルジェラ、ディプティック、SHIRO、シャネル、ディオールなど、コートやマフラーに極上の余韻を宿す冬の香水＆ヘアミスト名品10選を美容エディターが徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "澄んだ冷気と聖夜の街並みに美しく溶け込む！ジョー マローン、メゾン マルジェラ、ディプティック、SHIRO、シャネル、ディオールなど、コートやマフラーに極上の余韻を宿す冬の香水＆ヘアミスト名品10選を美容エディターが徹底比較！",
    isHallOfFame: true,
    coverImage: fragranceItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/fragrance.jpg",
    recommendedItemCodes: fragranceArticles.map(a => a.id),
    contentMarkdown: fragranceContent
  },
  {
    id: "feat-winter-overnight-lip-sleeping-mask-treatment-2026",
    slug: "winter-overnight-lip-sleeping-mask-treatment-2026",
    title: "【2026冬・ひび割れ・皮剥け唇を寝ている間に集中リペア】夜用リップスリーピングマスク＆高保湿リップトリートメントバームおすすめ人気10選！翌朝ぷるんとした赤ちゃん唇へ導く救世主",
    subtitle: "暖房乾燥や寒風によるガサガサ皮剥け・縦ジワを一晩でリセット！ラネージュ、オバジ、キュレル、タカミ、トリデン、クラランスなど、寝ている間に濃密密封してぷるぷる美唇を蘇らせる夜用リップマスク＆バーム10選を皮膚科学目線で徹底比較！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "暖房乾燥や寒風によるガサガサ皮剥け・縦ジワを一晩でリセット！ラネージュ、オバジ、キュレル、タカミ、トリデン、クラランスなど、寝ている間に濃密密封してぷるぷる美唇を蘇らせる夜用リップマスク＆バーム10選を皮膚科学目線で徹底比較！",
    isHallOfFame: true,
    coverImage: lipMaskItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/lipmask.jpg",
    recommendedItemCodes: lipMaskArticles.map(a => a.id),
    contentMarkdown: lipMaskContent
  },
  {
    id: "feat-winter-holiday-nail-color-oil-cuticle-care-2026",
    slug: "winter-holiday-nail-color-oil-cuticle-care-2026",
    title: "【2026冬ホリデー・指先から溢れる上品な輝き＆徹底保湿】ホリデー限定ネイルカラー＆高保湿ネイルオイル・甘皮ハンドケア名品おすすめ人気10選！ニットに映える冬の褒められ手元メイク",
    subtitle: "冬のニットの袖口から覗く指先を見惚れる美しさに！uka、ディオール、シャネル、OPI、LCN、キャンメイク、OSAJIなど、ささくれ・二枚爪を根本から防ぐネイルオイルと冬映え美爪ポリッシュ10選を徹底ガイド！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-05",
    readTimeMinutes: 20,
    introText: "冬のニットの袖口から覗く指先を見惚れる美しさに！uka、ディオール、シャネル、OPI、LCN、キャンメイク、OSAJIなど、ささくれ・二枚爪を根本から防ぐネイルオイルと冬映え美爪ポリッシュ10選を徹底ガイド！",
    isHallOfFame: true,
    coverImage: nailCareItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/nailcare.jpg",
    recommendedItemCodes: nailCareArticles.map(a => a.id),
    contentMarkdown: nailCareContent
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
