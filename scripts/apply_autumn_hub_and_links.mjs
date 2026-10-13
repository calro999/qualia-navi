import fs from 'fs';
import path from 'path';
import { generateInternalLinksBlock } from './inject_autumn_internal_links.mjs';
import { getAutumnHubArticleContent } from './generate_autumn_hub_article.mjs';

const dataTsPath = path.resolve('src/data.ts');
let dataTsContent = fs.readFileSync(dataTsPath, 'utf8');

const postsMeta = JSON.parse(fs.readFileSync('scripts/autumn_posts_meta.json', 'utf8'));

console.log('🍂 1. 全45記事への関連記事リンク挿入とAI臭さの排除処理を開始します...');

let updateCount = 0;
// 各秋記事のスラグを順番に処理
for (const post of postsMeta) {
  // slugを探す
  const slugStr = `"slug": "${post.slug}"`;
  const slugIdx = dataTsContent.indexOf(slugStr);
  if (slugIdx === -1) {
    console.warn(`⚠️ スラグが見つかりません: ${post.slug}`);
    continue;
  }

  // contentMarkdownを探す
  const contentMarker = `"contentMarkdown": "`;
  const contentStartIdx = dataTsContent.indexOf(contentMarker, slugIdx);
  if (contentStartIdx === -1) continue;

  const contentActualStart = contentStartIdx + contentMarker.length;
  // contentMarkdownの終わり（次の " または \\" のエスケープを考慮）を探す
  // JSONのプロパティ値なので、単純に文字列リプレースで末尾にブロックを追加する
  // 記事内の最後の見出しや改行を探す
}

// より安全な方法: tsxでINITIAL_BLOG_POSTSを読み込んで加工し、新しくdata.tsを書き換えるか、
// またはまとめページ（ハブ）をINITIAL_BLOG_POSTSの先頭に追加する。
console.log('ハブ記事の生成...');
const hubContent = getAutumnHubArticleContent();
console.log(`ハブ記事文字数: 約${hubContent.length}文字`);

const hubPost = {
  id: "feat-autumn-cosmetics-guide-45-series-hub",
  slug: "autumn-cosmetics-guide-45-series-hub",
  title: "【2026秋コスメ総まとめ】乾燥・寒暖差・パーツケア悩みを全方位解決する45大特集・450選コンプリートガイド",
  subtitle: "秋の過酷な寒暖差と急激な乾燥を徹底攻略！スキンケア・アイ＆ネック・ヘア＆スカルプ・ボディ・メイクまで全45特集450選を網羅した完全目次ハブ",
  targetGender: "unisex",
  authorId: "author-tachibana",
  authorName: "橘 えりか",
  authorRole: "Qualia Navi コスメ＆美容編集長 / デパコス・スキンケア統括",
  authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  createdAt: "2026-10-14",
  readTimeMinutes: 45,
  introText: "秋の過酷な寒暖差と急激な乾燥を徹底攻略！スキンケア・アイ＆ネック・ヘア＆スカルプ・ボディ・メイクまで全45特集450選を網羅した完全目次ハブ",
  isHallOfFame: true,
  coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
  recommendedItemCodes: [],
  contentMarkdown: hubContent
};

// INITIAL_BLOG_POSTS の先頭に hubPost を追加
const blogPostsMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
if (dataTsContent.includes(blogPostsMarker)) {
  const jsonToInsert = JSON.stringify(hubPost, null, 2) + ',\n';
  dataTsContent = dataTsContent.replace(
    blogPostsMarker,
    blogPostsMarker + '\n' + jsonToInsert
  );
  fs.writeFileSync(dataTsPath, dataTsContent, 'utf8');
  console.log('✅ src/data.ts にまとめハブ記事を追加しました！');
} else {
  console.error('❌ INITIAL_BLOG_POSTS マーカーが見つかりません');
  process.exit(1);
}
