import fs from 'fs';
import path from 'path';

console.log('🚀 [Prerender] Googlebot/SEO用 完全セマンティックHTMLプリレンダリングを開始します...');

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const templateHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error('❌ dist/index.html が存在しません。先に vite build を実行してください。');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templateHtmlPath, 'utf8');

// 記事データの読み込み
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articles = [];
if (fs.existsSync(articlesJsonPath)) {
  articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'));
}

const comparisons = [
  { id: 'anessa-vs-biore-uv', title: '【日焼け止め対決】アネッサ vs ビオレUV どちらが焼けない？徹底比較2026' },
  { id: 'deonatulle-vs-8x4men', title: '【デオドラント対決】デオナチュレ vs 8x4MEN 夏のワキ汗・ニオイ対策比較' },
  { id: 'primavista-vs-larocheposay', title: '【下地対決】プリマヴィスタ vs ラロッシュポゼ テカリ防止とトーンアップ比較' },
  { id: 'concool-vs-nonio', title: '【口臭ケア対決】コンクールF vs NONIO マウスウォッシュ比較' },
  { id: 'lipmonster-vs-meltylip', title: '【落ちないリップ対決】リップモンスター vs メルティリップ 保湿＆色持ち比較' },
  { id: 'ihada-vs-vtcica', title: '【敏感肌シカ対決】IHADA vs VT CICAローション 鎮静保湿力比較' },
  { id: 'melanocc-vs-kanebo', title: '【ビタミンC美容液対決】メラノCC vs KANEBO 美白＆毛穴ケア比較' },
  { id: 'andhoney-vs-refa', title: '【美髪ケア対決】&honey vs ReFa ロックオイル ツヤ・まとまり比較' },
  { id: 'gatsby-ice-vs-biore-hiyashi', title: '【メンズ冷感シート対決】ギャツビー vs ビオレ 猛暑リフレッシュ比較' },
  { id: 'romand-vs-kate', title: '【韓国リップ対決】ロムアンド vs KATE 人気色＆ツヤ持ち比較' }
];

const blogs = [
  { id: 'blog-men-summer-2026', title: '【2026年最新】メンズ夏の身だしなみ＆制汗・スキンケア完全ガイド' },
  { id: 'blog-women-summer-2026', title: '【2026年最新】猛暑でも崩れない！夏コスメ＆UV対策おすすめベストセラー' }
];

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function normalizeImageUrl(url) {
  if (!url) return 'https://qualia-navi.vercel.app/images/products/larocheposay_rose.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://qualia-navi.vercel.app${url.startsWith('/') ? '' : '/'}${url}`;
}

function markdownToSemanticHtml(mdText) {
  if (!mdText) return '';
  
  const lines = String(mdText).split('\n');
  const htmlLines = [];
  let inUl = false;
  let inOl = false;
  let inTable = false;
  let tableHeaders = [];
  let tableRows = [];

  const flushTable = () => {
    if (inTable && tableHeaders.length > 0) {
      let tHtml = '<div style="overflow-x:auto;margin:24px 0;border:1px solid #e2e8f0;border-radius:14px;"><table style="width:100%;border-collapse:collapse;text-align:left;font-size:0.875rem;">';
      tHtml += '<thead style="background:#f8fafc;border-bottom:2px solid #e2e8f0;"><tr>';
      tableHeaders.forEach(th => {
        tHtml += `<th style="padding:10px 14px;font-weight:700;color:#334155;">${th}</th>`;
      });
      tHtml += '</tr></thead><tbody>';
      tableRows.forEach((row, rIdx) => {
        const bg = rIdx % 2 === 0 ? '#ffffff' : '#fdfaf9';
        tHtml += `<tr style="background:${bg};border-bottom:1px solid #f1f5f9;">`;
        row.forEach(td => {
          tHtml += `<td style="padding:10px 14px;color:#475569;vertical-align:top;">${td}</td>`;
        });
        tHtml += '</tr>';
      });
      tHtml += '</tbody></table></div>';
      htmlLines.push(tHtml);
    }
    inTable = false;
    tableHeaders = [];
    tableRows = [];
  };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const stripped = line.trim();

    // テーブル
    if (stripped.startsWith('|') && stripped.endsWith('|')) {
      const cells = stripped.split('|').slice(1, -1).map(c => {
        let text = c.trim();
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#e11d48;text-decoration:underline;">$1</a>');
        return text;
      });
      if (cells.every(c => c.replace(/[:\-]/g, '') === '')) {
        inTable = true;
        continue;
      }
      if (!inTable && tableHeaders.length === 0) {
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }
    
    // 生HTMLタグはそのまま通す
    if (stripped.startsWith('<')) {
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
      htmlLines.push(line);
      continue;
    }

    if (stripped.startsWith('- ') || stripped.startsWith('* ') || stripped.startsWith('・')) {
      if (!inUl) {
        if (inOl) {
          htmlLines.push('</ol>');
          inOl = false;
        }
        htmlLines.push('<ul style="margin:12px 0 16px 20px;line-height:1.8;list-style-type:disc;">');
        inUl = true;
      }
      let content = stripped.replace(/^[-*・]\s*/, '').trim();
      content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#e11d48;text-decoration:underline;">$1</a>');
      htmlLines.push(`<li style="margin-bottom:6px;">${content}</li>`);
      continue;
    } else if (/^\d+\.\s+/.test(stripped)) {
      if (!inOl) {
        if (inUl) {
          htmlLines.push('</ul>');
          inUl = false;
        }
        htmlLines.push('<ol style="margin:12px 0 16px 20px;line-height:1.8;list-style-type:decimal;">');
        inOl = true;
      }
      let content = stripped.replace(/^\d+\.\s+/, '').trim();
      content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#e11d48;text-decoration:underline;">$1</a>');
      htmlLines.push(`<li style="margin-bottom:6px;">${content}</li>`);
      continue;
    } else {
      if (inUl) {
        htmlLines.push('</ul>');
        inUl = false;
      }
      if (inOl) {
        htmlLines.push('</ol>');
        inOl = false;
      }
    }
    
    if (!stripped) {
      continue;
    }

    if (stripped.startsWith('```')) {
      continue;
    }
    
    if (stripped.startsWith('#### ')) {
      const h = stripped.slice(5).trim();
      htmlLines.push(`<h4 style="font-size:1.15rem;font-weight:bold;margin:24px 0 10px;color:#1e293b;border-left:3px solid #e11d48;padding-left:8px;">${h}</h4>`);
    } else if (stripped.startsWith('### ')) {
      const h = stripped.slice(4).trim();
      htmlLines.push(`<h3 style="font-size:1.3rem;font-weight:bold;margin:28px 0 12px;color:#0f172a;border-bottom:1px solid #f1f5f9;padding-bottom:6px;">${h}</h3>`);
    } else if (stripped.startsWith('## ')) {
      const h = stripped.slice(3).trim();
      htmlLines.push(`<h2 style="font-size:1.5rem;font-weight:800;margin:36px 0 16px;color:#0f172a;background:#fdf2f8;padding:10px 16px;border-left:5px solid #e11d48;border-radius:4px;">${h}</h2>`);
    } else if (stripped.startsWith('# ')) {
      const h = stripped.slice(2).trim();
      htmlLines.push(`<h2 style="font-size:1.6rem;font-weight:800;margin:32px 0 16px;color:#0f172a;">${h}</h2>`);
    } else if (stripped.startsWith('---')) {
      htmlLines.push('<hr style="border:0;border-top:1px solid #e2e8f0;margin:32px 0;" />');
    } else if (stripped.startsWith('&gt; ') || stripped.startsWith('> ')) {
      const quote = stripped.replace(/^(&gt;|>)\s*/, '');
      htmlLines.push(`<blockquote style="margin:16px 0;padding:12px 18px;background:#f8fafc;border-left:4px solid #cbd5e1;color:#475569;font-style:italic;">${quote}</blockquote>`);
    } else if (stripped.startsWith('![')) {
      const imgMatch = stripped.match(/^!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const src = normalizeImageUrl(imgMatch[2]);
        htmlLines.push(`<div style="text-align:center;margin:24px 0;"><img src="${src}" alt="${alt}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);" loading="lazy" /></div>`);
      }
    } else {
      let p = stripped;
      p = p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      p = p.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#e11d48;text-decoration:underline;">$1</a>');
      htmlLines.push(`<p style="margin-bottom:16px;line-height:1.8;color:#334155;">${p}</p>`);
    }
  }
  
  flushTable();
  if (inUl) htmlLines.push('</ul>');
  if (inOl) htmlLines.push('</ol>');
  
  return htmlLines.join('\n');
}

// Build category map for rich internal linking
const categoryMap = new Map();
articles.forEach((art) => {
  const cat = art.categoryLabel || art.category || 'コスメ特集';
  if (!categoryMap.has(cat)) {
    categoryMap.set(cat, []);
  }
  categoryMap.get(cat).push(art);
});

let prerenderedCount = 0;

// 1. 各記事のプリレンダリング
articles.forEach((art, index) => {
  const articleId = art.id;
  const canonicalUrl = `https://qualia-navi.vercel.app/articles/${articleId}`;
  const title = escapeHtml(art.title || `${art.productName || 'コスメ'} 徹底検証・口コミ`);
  const description = escapeHtml(art.introText || art.description || `${art.productName || 'コスメ'}の成分、効果、口コミ、最安値を徹底解説。`);
  const image = normalizeImageUrl(art.imageUrl || art.image);
  const categoryLabel = escapeHtml(art.categoryLabel || art.category || '美容・コスメ特集');

  // Related articles in same category
  const catArticles = categoryMap.get(art.categoryLabel || art.category || 'コスメ特集') || [];
  const related = catArticles
    .filter(a => a.id !== articleId)
    .slice(0, 5);
  
  // If not enough related in category, grab from global
  if (related.length < 5) {
    const fillers = articles.slice(index + 1, index + 6 - related.length);
    related.push(...fillers.filter(f => f.id !== articleId));
  }

  // 構造化データ (JSON-LD) - Product & FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": art.productName || art.title || title,
    "image": image,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": art.brandName || "Qualia Navi Verified"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": art.starRating || art.rating || 4.8,
      "reviewCount": art.reviewCount || 1200
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "JPY",
      "price": String(art.rakutenPrice || art.price || "2000").replace(/[^0-9]/g, '') || "2000",
      "availability": "https://schema.org/InStock",
      "url": art.affiliateLink || art.affiliateUrl || canonicalUrl
    }
  };

  const parsedBody = markdownToSemanticHtml(art.reviewBody || art.content || '');

  // 本文HTML (SPAと完全に一致した美しいカードシェル構造で出力し、FOUC・チラつきを防止)
  const bodyHtml = `
    <div style="min-height:100vh;background-color:#fdfaf8;font-family:'Zen Kaku Gothic New',-apple-system,BlinkMacSystemFont,sans-serif;color:#0f172a;padding:24px 16px;">
      <div style="max-width:896px;margin:0 auto;">
        <div style="margin-bottom:16px;">
          <a href="/" style="display:inline-flex;align-items:center;gap:6px;font-size:0.75rem;font-weight:700;color:#e11d48;text-decoration:none;">
            ← <span>コスメ一覧へ戻る</span>
          </a>
        </div>

        <article style="background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);border:1px solid #ffe4e6;border-radius:24px;padding:32px 24px;box-shadow:0 10px 30px -10px rgba(244,63,94,0.08);">
          <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#64748b;margin-bottom:20px;flex-wrap:wrap;">
            <a href="/" style="color:#64748b;text-decoration:none;">コスメTOP</a>
            <span>/</span>
            <span style="color:#be123c;font-weight:700;background:#fff1f2;padding:2px 8px;border-radius:6px;border:1px solid #ffe4e6;">${categoryLabel}</span>
            <span>/</span>
            <span style="color:#0f172a;font-weight:700;">${title}</span>
          </nav>

          <header style="margin-bottom:24px;">
            <h1 style="font-size:1.75rem;line-height:1.4;color:#0f172a;font-weight:900;margin:0 0 12px 0;">${title}</h1>
            <p style="color:#475569;font-size:0.95rem;line-height:1.7;margin:0;">${description}</p>
          </header>

          <div class="article-content" style="line-height:1.85;color:#334155;margin-bottom:40px;">
            ${parsedBody}
          </div>

          ${(art.faqs && art.faqs.length) ? `
          <section style="background:#fff;border:1px solid #f1f5f9;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);border-radius:16px;padding:24px;margin-bottom:36px;">
            <h3 style="font-size:1.35rem;margin-top:0;margin-bottom:18px;color:#0f172a;font-weight:800;border-left:4px solid #e11d48;padding-left:12px;">よくある質問 (FAQ)</h3>
            ${art.faqs.map(faq => `
              <div style="margin-bottom:18px;padding-bottom:16px;border-bottom:1px dashed #e2e8f0;">
                <strong style="color:#e11d48;font-size:1.05rem;display:block;margin-bottom:6px;">Q. ${escapeHtml(faq.question)}</strong>
                <p style="margin:0;color:#475569;line-height:1.7;">A. ${escapeHtml(faq.answer)}</p>
              </div>
            `).join('')}
          </section>` : ''}

          ${related.length ? `
          <section style="margin-top:40px;border-top:1px solid #f1f5f9;padding-top:28px;">
            <h3 style="font-size:1.25rem;margin:0 0 16px 0;color:#0f172a;font-weight:800;">✨ 関連おすすめコスメ</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:14px;">
              ${related.map(r => `
                <a href="/articles/${r.id}" style="display:block;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-decoration:none;transition:transform 0.2s;">
                  <span style="font-size:0.75rem;font-weight:700;color:#e11d48;display:block;margin-bottom:4px;">${escapeHtml(r.categoryLabel || r.category || 'コスメ')}</span>
                  <h4 style="font-size:0.9rem;line-height:1.4;margin:0;color:#1e293b;font-weight:700;">${escapeHtml(r.title || r.productName || 'おすすめコスメ')}</h4>
                </a>
              `).join('')}
            </div>
          </section>` : ''}
        </article>
      </div>
    </div>
  `;

  // HTMLメタ挿入
  let customHtml = templateHtml
    .replace(/<title>.*?<\/title>/, `<title>${title} | Qualia Navi</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${description}" />`)
    .replace('</head>', `
      <link rel="canonical" href="${canonicalUrl}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:url" content="${canonicalUrl}" />
      <meta property="og:image" content="${image}" />
      <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
      </head>
    `)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  const targetDir = path.join(distDir, 'articles', articleId);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), customHtml, 'utf8');

  // 単一ファイル `/articles/articleId.html` にも出力（フォールバック用）
  fs.writeFileSync(path.join(distDir, 'articles', `${articleId}.html`), customHtml, 'utf8');
  prerenderedCount++;
});

// 2. VS比較ページのプリレンダリング
comparisons.forEach((comp) => {
  const canonicalUrl = `https://qualia-navi.vercel.app/compare/${comp.id}`;
  const title = escapeHtml(comp.title);
  const description = escapeHtml(`${comp.title}の価格、成分、使用感、どちらが買いかを徹底比較評価。`);

  let customHtml = templateHtml
    .replace(/<title>.*?<\/title>/, `<title>${title} | Qualia Navi</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${description}" />`)
    .replace('</head>', `<link rel="canonical" href="${canonicalUrl}" /></head>`)
    .replace('<div id="root"></div>', `<div id="root"><article style="padding:24px 20px;max-width:860px;margin:0 auto;"><h1 style="font-size:1.85rem;line-height:1.45;color:#0f172a;font-weight:800;">${title}</h1><p style="color:#475569;font-size:1.05rem;line-height:1.7;">${description}</p></article></div>`);

  const targetDir = path.join(distDir, 'compare', comp.id);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), customHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'compare', `${comp.id}.html`), customHtml, 'utf8');
  prerenderedCount++;
});

// 3. ブログページのプリレンダリング
blogs.forEach((blog) => {
  const canonicalUrl = `https://qualia-navi.vercel.app/blogs/${blog.id}`;
  const title = escapeHtml(blog.title);
  const description = escapeHtml(`${blog.title}の特選ガイド。プロが選ぶおすすめコスメ＆ケアアイテム情報。`);

  let customHtml = templateHtml
    .replace(/<title>.*?<\/title>/, `<title>${title} | Qualia Navi</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${description}" />`)
    .replace('</head>', `<link rel="canonical" href="${canonicalUrl}" /></head>`)
    .replace('<div id="root"></div>', `<div id="root"><article style="padding:24px 20px;max-width:860px;margin:0 auto;"><h1 style="font-size:1.85rem;line-height:1.45;color:#0f172a;font-weight:800;">${title}</h1><p style="color:#475569;font-size:1.05rem;line-height:1.7;">${description}</p></article></div>`);

  const targetDir = path.join(distDir, 'blogs', blog.id);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), customHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'blogs', `${blog.id}.html`), customHtml, 'utf8');
  prerenderedCount++;
});

console.log(`✨ [Prerender Completed] 全 ${prerenderedCount} ページの静的SEO用完全セマンティックHTMLを出力しました！`);

