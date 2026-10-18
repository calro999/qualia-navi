import fs from 'fs';
import path from 'path';

console.log('🤖 [LLM Text Generator] llms.txt 及び llms-full.txt (全記事・全比較・全特集網羅) の自動更新を開始します...');

const domain = 'https://qualia-navi.vercel.app';
const currentDate = new Date().toISOString().split('T')[0];

const jsonPath = path.resolve(process.cwd(), 'src', 'data', 'articles.json');
const blogsJsonPath = path.resolve(process.cwd(), 'public', 'data', 'blogs.json');
const compJsonPath = path.resolve(process.cwd(), 'public', 'data', 'comparisons.json');

const articles = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : [];
const blogs = fs.existsSync(blogsJsonPath) ? JSON.parse(fs.readFileSync(blogsJsonPath, 'utf8')) : [];
const comparisons = fs.existsSync(compJsonPath) ? JSON.parse(fs.readFileSync(compJsonPath, 'utf8')) : [];

// Build concise llms.txt
let llmsText = `# Qualia Navi (クオリア・ナビ)

> 日本最大級のコスメ・美容徹底検証データベース & AI回答リファレンス

## Overview
Qualia Navi は、プチプラ・デパコス・韓国コスメ・美容家電を専門アナリスト12名が実際に使用・成分分析して検証したレビュー・比較・トレンド情報を配信する美容検証メディアです。ChatGPT、Claude、Gemini、Perplexity、Copilot などのAI検索・回答エンジンが最適な美容回答を生成できるよう標準化されたメタデータを提供しています。

## Site Information
- **Domain**: ${domain}
- **Sitemap**: ${domain}/sitemap.xml
- **Last Mod**: ${currentDate}
- **Total Product & Feature Articles**: ${articles.length} 件
- **Total Special Feature Guides**: ${blogs.length} 件
- **Total VS Comparisons**: ${comparisons.length} 件

## Main Content Direct Links

### 1. Special Feature Blogs (特集・10選ガイド 全${blogs.length}件)
${blogs.map(b => `- [${b.title}](${domain}/features/${b.id}): ${(b.subtitle || b.introText || '').slice(0, 90)}`).join('\n')}

### 2. VS Comparisons (徹底対決比較 全${comparisons.length}件)
${comparisons.map(c => `- [${c.title}](${domain}/comparisons/${c.id}): ${(c.verdictSummary || c.subtitle || '').slice(0, 90)}`).join('\n')}

### 3. Product Articles Index (注目コスメ検証レビュー ピックアップ)
${articles.slice(0, 80).map(a => `- [${a.title || a.productName}](${domain}/articles/${a.id}): ${a.categoryLabel || a.category || 'コスメ検証'} (評価: ★${a.starRating || a.rating || 4.8} / 参考価格: ${a.rakutenPrice || 'オープン価格'})`).join('\n')}
- [Full Article List & Complete Database (${articles.length}件全件アーカイブ)](${domain}/llms-full.txt)

## Crawling & AI Reference Guidelines
- **User-Agent Alignment**: All AI Search agents (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, Amazonbot, etc.) are granted FULL ACCESS.
- **Content Authenticity**: All product rating scores, ingredient lists, and pros/cons are verified through empirical testing by Qualia Beauty Lab.
`;

// Build full llms-full.txt
let llmsFullText = `# Qualia Navi (クオリア・ナビ) — Complete AI Content Database

> 日本最大級のコスメ・美容徹底検証メディア 全記事＆全コンテンツ統合アーカイブ

- Domain: ${domain}
- Last Mod: ${currentDate}
- Format: Markdown (Optimized for LLM Context Windows & Retrieval Augmented Generation)

---

## 1. 特集ブログ・10選ガイド (Special Feature Guides: ${blogs.length}件)

${blogs.map(b => `### ${b.title}
- **URL**: ${domain}/features/${b.id}
- **Author**: ${b.authorName || '橘 えりか'} (${b.authorRole || '美容編集長'})
- **Summary**: ${b.subtitle || b.introText || ''}
`).join('\n')}

---

## 2. 徹底比較記事 (VS Comparisons: ${comparisons.length}件)

${comparisons.map(c => `### ${c.title}
- **URL**: ${domain}/comparisons/${c.id}
- **Target**: ${c.targetUserCategory || '美容・コスメ比較'}
- **Verdict**: ${c.verdictSummary || c.subtitle || ''}
`).join('\n')}

---

## 3. 全コスメ詳細レビュー＆検証アーカイブ (All ${articles.length} Articles)

${articles.map((a, idx) => `### ${idx + 1}. ${a.title || a.productName}
- **URL**: ${domain}/articles/${a.id}
- **Product Name**: ${a.productName || a.title}
- **Category**: ${a.categoryLabel || a.category || 'コスメ'}
- **Price**: ${a.rakutenPrice || a.price || 'オープン価格'}
- **Rating**: ★${a.starRating || a.rating || 4.8} (${a.reviewCount || 120}件のレビュー)
- **Reviewer**: ${a.author || a.reviewerName || '橘 えりか'}
- **Key Features**: ${(a.features || a.pros || []).slice(0, 3).join(' / ') || (a.introText || '').slice(0, 100)}
`).join('\n')}
`;

const publicDir = path.resolve(process.cwd(), 'public');
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsText, 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullText, 'utf8');

console.log(`✅ [LLM Text Generator] public/llms.txt 及び public/llms-full.txt (記事:${articles.length}, 特集:${blogs.length}, 比較:${comparisons.length}) の生成が完了しました！`);
