import fs from 'fs';
import path from 'path';

const postsMeta = JSON.parse(fs.readFileSync('scripts/autumn_posts_meta.json', 'utf8'));

// カテゴリや悩みに関連する他記事を見つけるマップ
function getRelatedPosts(currentSlug) {
  const current = postsMeta.find(p => p.slug === currentSlug);
  if (!current) return [];

  // 同じカテゴリまたは同じシリーズ以外の補完関係にあるおすすめ3記事を選定
  const candidates = postsMeta.filter(p => p.slug !== currentSlug);
  
  // 1. 同一カテゴリまたは関連パーツケア
  let categoryMatches = candidates.filter(p => p.category === current.category);
  // 2. 乾燥・バリア系
  let concernMatches = candidates.filter(p => p.concern.includes('乾燥') || p.concern.includes('バリア') || p.concern.includes('静電気'));
  
  const picked = [];
  
  // 1件目: 同一カテゴリから
  if (categoryMatches.length > 0) {
    picked.push(categoryMatches[Math.floor(Math.random() * categoryMatches.length)]);
  }
  
  // 2件目・3件目: 異なるシリーズから相乗効果のあるアイテム（例: スキンケアなら導入液やオイル、ヘアならミルクやミスト）
  const remaining = candidates.filter(p => !picked.some(x => x.slug === p.slug));
  
  // まとめページ（ハブ）へのリンクは常に全記事に共通して案内
  picked.push(remaining[0]);
  picked.push(remaining[1]);

  return picked.slice(0, 3);
}

// 内部リンク用Markdownブロックを生成
export function generateInternalLinksBlock(currentSlug) {
  const related = getRelatedPosts(currentSlug);
  
  return `
---

### 🍁 【あわせて読みたい】2026秋の季節悩み特化・関連記事
秋の過酷な寒暖差や乾燥をトータルでケアする、美容エディター厳選のパーツ別・お悩み別特集です。

- 📖 **【特集まとめ】** [【2026秋コスメ総まとめ】乾燥・寒暖差・パーツケア悩みを全方位解決する45大特集・450選コンプリートガイド](/blog/autumn-cosmetics-guide-45-series-hub)
${related.map(r => `- 🍂 **【${r.category}】** [${r.shortTitle}（${r.concern}対策）](/blog/${r.slug})`).join('\n')}
`;
}

console.log('Internal links block generator ready.');
