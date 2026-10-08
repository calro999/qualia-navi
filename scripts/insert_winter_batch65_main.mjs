import fs from 'fs';
import path from 'path';
import {
  heatBrushItemsRaw,
  footBathItemsRaw,
  silkGlovesItemsRaw,
  heatBrushArticles,
  footBathArticles,
  silkGlovesArticles
} from './insert_winter_batch65_helper.mjs';

import { getHeatBrushArticleContent } from './winter_batch65_article1_heat_brush.mjs';
import { getFootBathArticleContent } from './winter_batch65_article2_foot_bath.mjs';
import { getSilkGlovesArticleContent } from './winter_batch65_article3_silk_gloves.mjs';

console.log('🚀 [冬コスメ 第65弾] 特集記事の文字数検証と data.ts への統合を開始します...');

const heatBrushContent = getHeatBrushArticleContent();
const footBathContent = getFootBathArticleContent();
const silkGlovesContent = getSilkGlovesArticleContent();

console.log(`- 記事1 (ヒートブラシ＆ストレートヘアアイロンブラシ) 文字数: 約${heatBrushContent.length}文字`);
console.log(`- 記事2 (折りたたみ加温フットバス＆バブル温活足湯器) 文字数: 約${footBathContent.length}文字`);
console.log(`- 記事3 (シルク保湿おやすみ手袋＆かかとケアソックス) 文字数: 約${silkGlovesContent.length}文字`);

// 5000文字以上であることを厳格に検証（リクエスト条件: 3000文字以下は絶対禁止）
if (heatBrushContent.length < 5000 || footBathContent.length < 5000 || silkGlovesContent.length < 5000) {
  console.error('❌ 文字数が基準（5000文字）未満の記事が存在します！');
  process.exit(1);
}

const blogPostsToAdd = [
  {
    id: "feat-winter-heat-brush-straightener-hair-iron-2026",
    slug: "winter-heat-brush-straightener-hair-iron-2026",
    title: "【2026冬・寒さで固まる頑固な寝癖＆パサつき広がり髪を秒速リセット】ヒートブラシ＆ストレートヘアアイロンブラシおすすめ人気10選！ブラッシング感覚で熱ダメージ軽減・マイナスイオン・急速加熱など忙しい冬の朝にうるツヤ美髪を仕込む時短神ギア徹底比較",
    subtitle: "11〜12月の寒さで頑固に固まった冬の寝癖やパサつき広がりを、普通のブラッシング感覚で熱ダメージを抑えつつマイナスイオンで一瞬のうるツヤストレートに整える！サロニア、アゲツヤ、ルピリーナなど朝の時短神ヒートブラシ10選！",
    targetGender: "unisex",
    authorId: "author-tachibana",
    authorName: "橘 えりか",
    authorRole: "Qualia Navi コスメ＆美容編集長",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の寒さで頑固に固まった冬の寝癖やパサつき広がりを、普通のブラッシング感覚で熱ダメージを抑えつつマイナスイオンで一瞬のうるツヤストレートに整える！サロニア、アゲツヤ、ルピリーナなど朝の時短神ヒートブラシ10選！",
    isHallOfFame: true,
    coverImage: heatBrushItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/heatbrush.jpg",
    recommendedItemCodes: heatBrushArticles.map(a => a.id),
    contentMarkdown: heatBrushContent
  },
  {
    id: "feat-winter-folding-heated-foot-bath-spa-massager-2026",
    slug: "winter-folding-heated-foot-bath-spa-massager-2026",
    title: "【2026冬・足先の底冷え＆夕方のパンパンむくみ脚を自宅で極上リセット】折りたたみ加温フットバス＆バブル温活足湯器おすすめ人気10選！42℃恒温キープ・ジェットバブル・足裏ローラー・コンパクト収納など末端冷え性を根本から温め流す最新足湯ギア徹底比較",
    subtitle: "11〜12月の急激な寒波による足先の末端冷え性や夕方のむくみ脚を、自宅で42℃恒温キープ＆ジェットバブルで芯から温めほぐす！サンコー、ピエ・ド・スパなど冬の極上温活フットバス10選！",
    targetGender: "unisex",
    authorId: "author-hasumi",
    authorName: "蓮見 拓真",
    authorRole: "Qualia Navi 統括編集長",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の急激な寒波による足先の末端冷え性や夕方のむくみ脚を、自宅で42℃恒温キープ＆ジェットバブルで芯から温めほぐす！サンコー、ピエ・ド・スパなど冬の極上温活フットバス10選！",
    isHallOfFame: true,
    coverImage: footBathItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/footbath.jpg",
    recommendedItemCodes: footBathArticles.map(a => a.id),
    contentMarkdown: footBathContent
  },
  {
    id: "feat-winter-silk-night-moisturizing-gloves-heel-care-2026",
    slug: "winter-silk-night-moisturizing-gloves-heel-care-2026",
    title: "【2026冬・水仕事の手荒れあかぎれ＆ガサガサ鏡餅かかとを一晩で救済】シルク保湿おやすみ手袋＆かかとケアソックスおすすめ人気10選！天然絹100%・スマホ対応指先オープン・保湿ジェル内蔵など就寝中の集中ナイトパックで吸い付くような白玉手肌＆つるすべ素足へ導く冬の必需品徹底比較",
    subtitle: "11〜12月の水仕事や木枯らしでガサガサに荒れた手肌やあかぎれ、鏡餅のようにひび割れたかかとを、天然シルクの力で一晩中密封集中リペア！足うら美人、絹紡糸おやすみ手袋など冬のパーツケア10選！",
    targetGender: "unisex",
    authorId: "author-inoue",
    authorName: "井上 さくら",
    authorRole: "専属コスメコレクター",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-10-08",
    readTimeMinutes: 30,
    introText: "11〜12月の水仕事や木枯らしでガサガサに荒れた手肌やあかぎれ、鏡餅のようにひび割れたかかとを、天然シルクの力で一晩中密封集中リペア！足うら美人、絹紡糸おやすみ手袋など冬のパーツケア10選！",
    isHallOfFame: true,
    coverImage: silkGlovesItemsRaw[0]?.imageUrl || "https://shop.r10s.jp/sample/silkgloves.jpg",
    recommendedItemCodes: silkGlovesArticles.map(a => a.id),
    contentMarkdown: silkGlovesContent
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
  console.log('✅ src/data.ts に第65弾の特集記事3本を正常に追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS のマーカーが見つかりませんでした。');
  process.exit(1);
}
