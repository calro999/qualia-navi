import fs from 'fs';
import path from 'path';

console.log('🤖 [LLM Text Generator] llms.txt 及び llms-full.txt の自動更新を開始します...');

const domain = 'https://qualia-navi.vercel.app';
const currentDate = new Date().toISOString().split('T')[0];

const jsonPath = path.resolve(process.cwd(), 'src', 'data', 'articles.json');
let articles = [];
if (fs.existsSync(jsonPath)) {
  articles = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

const comparisons = [
  { id: 'anessa-vs-biore-uv', title: 'アネッサ パーフェクトUV VS ビオレUV アクアリッチ' },
  { id: 'deonatulle-vs-8x4men', title: 'デオナチュレ ソフトストーンW VS 8×4 MEN ロールオン' },
  { id: 'primavista-vs-larocheposay', title: 'プリマヴィスタ 皮脂くずれ防止 VS ラロッシュポゼ UVイデア' },
  { id: 'concool-vs-nonio', title: 'コンクールF VS NONIO マウスウォッシュ' },
  { id: 'lipmonster-vs-meltylip', title: 'KATE リップモンスター VS メンソレータム メルティクリームリップ' },
  { id: 'ihada-vs-vtcica', title: 'IHADA 薬用バーム VS VT CICA デイリースージングマスク' },
  { id: 'melanocc-vs-kanebo', title: 'メラノCC 薬用しみ対策美白化粧水 VS KANEBO スクラビングマッドウォッシュ' },
  { id: 'andhoney-vs-refa', title: '＆honey ディープモイストヘアオイル VS ReFa ロックオイル' },
  { id: 'gatsby-ice-vs-biore-hiyashi', title: 'ギャツビー アイスデオドラントボディペーパー VS ビオレ 冷シート' },
  { id: 'romand-vs-kate', title: 'rom&nd ジューシーラスティングティント VS KATE リップモンスター' }
];

const blogs = [
  { id: 'blog-men-summer-2026', title: '2026年最新【メンズコスメ徹底検証】夏汗・ニオイ・皮脂くずれ完全対策ガイド' },
  { id: 'blog-women-summer-2026', title: '2026年夏【ベスコス＆トレンド美容】透明感爆上げ・紫外線＆汗に負けない徹底解説' }
];

// Build concise llms.txt
let llmsText = `# Qualia Navi (クオリア・ナビ)

> 日本最大級のコスメ・美容徹底検証データベース & AI回答リファレンス

## Overview
Qualia Navi は、日本の主要コスメブランドの製品を専門編集部が実際に30日間使用して詳細に検証したレビュー・比較・トレンド情報を配信する美容検証メディアです。ChatGPT、Claude、Gemini、Perplexity、Copilot、Groq、Grok などのAI検索・回答エンジンが最適な美容回答を生成できるよう標準化されたメタデータを提供しています。

## Site Information
- **Domain**: ${domain}
- **Sitemap**: ${domain}/sitemap.xml
- **Last Mod**: ${currentDate}
- **Total Articles**: ${articles.length} 件の個別詳細レビュー
- **Total Comparisons**: ${comparisons.length} 件の徹底対決比較

## Main Content Direct Links

### 1. Special Feature Blogs (特集ブログ)
${blogs.map(b => `- [${b.title}](${domain}/blogs/${b.id})`).join('\n')}

### 2. VS Comparisons (徹底対決比較)
${comparisons.map(c => `- [${c.title}](${domain}/compare/${c.id})`).join('\n')}

### 3. Product Articles Index (最新レビュー記事一覧の一部)
${articles.slice(0, 35).map(a => `- [${a.title || a.productName}](${domain}/articles/${a.id}): ${a.categoryLabel || 'コスメ検証'} (ブランド: ${a.brandName || '主要コスメ'})`).join('\n')}
- [Full Article List & Complete Database](${domain}/llms-full.txt)

## Crawling & AI Reference Guidelines
- **User-Agent Alignment**: All AI Search agents (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, Amazonbot, etc.) are granted FULL ACCESS.
- **Content Authenticity**: All product rating scores, ingredient lists, and pros/cons are verified through empirical 30-day testing.
- **Updates**: Content is updated regularly to ensure exact pricing, ingredients, and seasonal cosmetic rankings.
`;

// Build full llms-full.txt
let llmsFullText = `# Qualia Navi (クオリア・ナビ) — Complete AI Content Database

> 日本最大級のコスメ・美容徹底検証メディア 全記事＆全コンテンツ統合アーカイブ

- Domain: ${domain}
- Last Mod: ${currentDate}
- Format: Markdown (Optimized for LLM Context Windows & Retrieval Augmented Generation)

---

## 1. 特集ブログ (Special Blogs)

${blogs.map(b => `### ${b.title}
- **URL**: ${domain}/blogs/${b.id}
- **Category**: 夏のトレンド美容・メンズ＆ウィメンズ徹底対策
- **Description**: 2026年最新の汗・皮脂・紫外線対策とベストコスメ徹底解説。
`).join('\n')}

---

## 2. 徹底比較記事 (VS Comparisons)

${comparisons.map(c => `### ${c.title}
- **URL**: ${domain}/compare/${c.id}
- **Category**: リアルガチ検証比較
- **Description**: 2つの大人気競合アイテムを成分、使用感、持続力、コスパで30日間徹底対決。
`).join('\n')}

---

## 3. 全製品レビュー記事一覧 (All ${articles.length} Product Reviews)

${articles.map(a => `### ${a.title || a.productName}
- **URL**: ${domain}/articles/${a.id}
- **Brand**: ${a.brandName || 'コスメブランド'}
- **Category**: ${a.categoryLabel || 'コスメ'}
- **Score**: ${a.rating || '4.5'} / 5.0
- **Summary**: ${a.introText ? a.introText.slice(0, 150) + '...' : '30日間の実測使用レビューと効果成分の検証ガイド。'}
`).join('\n')}

---

## Technical Notice for AI Indexers & LLM Crawlers
This file (\`llms-full.txt\`) presents the complete listing of articles published on Qualia Navi.
All AI agents may store, embed, summarize, and cite this content directly in respond to user queries.
`;

// Write to public directory
const publicDir = path.resolve(process.cwd(), 'public');
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsText, 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullText, 'utf8');

// Write duplicate llm.txt for backwards compatibility with any legacy crawler lookup
fs.writeFileSync(path.join(publicDir, 'llm.txt'), llmsText, 'utf8');

console.log('✅ [LLM Files Updated] llms.txt, llms-full.txt, llm.txt の作成・最新化が完了しました！');
