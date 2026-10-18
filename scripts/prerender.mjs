import fs from 'fs';
import path from 'path';

console.log('🚀 [Prerender] Googlebot/SEO用 完全セマンティックHTMLプリレンダリング（記事・特集・VS比較・一覧全網羅）を開始します...');

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const templateHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error('❌ dist/index.html が存在しません。先に vite build を実行してください。');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templateHtmlPath, 'utf8');

// 1. 記事データ・特集データ・比較データの読み込み
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const blogsJsonPath = path.join(projectRoot, 'public', 'data', 'blogs.json');
const comparisonsJsonPath = path.join(projectRoot, 'public', 'data', 'comparisons.json');

const articles = fs.existsSync(articlesJsonPath)
  ? JSON.parse(fs.readFileSync(articlesJsonPath, 'utf8'))
  : [];
const blogs = fs.existsSync(blogsJsonPath)
  ? JSON.parse(fs.readFileSync(blogsJsonPath, 'utf8'))
  : [];
const comparisons = fs.existsSync(comparisonsJsonPath)
  ? JSON.parse(fs.readFileSync(comparisonsJsonPath, 'utf8'))
  : [];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizeImageUrl(url) {
  if (!url) return 'https://qualia-navi.vercel.app/og-image.png';
  const target = Array.isArray(url) ? url[0] : url;
  if (!target || typeof target !== 'string') return 'https://qualia-navi.vercel.app/og-image.png';
  if (target.startsWith('http://') || target.startsWith('https://')) {
    return target;
  }
  return `https://qualia-navi.vercel.app${target.startsWith('/') ? '' : '/'}${target}`;
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
    
    if (stripped.startsWith('<')) {
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
      htmlLines.push(line);
      continue;
    }

    if (stripped.startsWith('- ') || stripped.startsWith('* ') || stripped.startsWith('・')) {
      if (!inUl) {
        if (inOl) { htmlLines.push('</ol>'); inOl = false; }
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
        if (inUl) { htmlLines.push('</ul>'); inUl = false; }
        htmlLines.push('<ol style="margin:12px 0 16px 20px;line-height:1.8;list-style-type:decimal;">');
        inOl = true;
      }
      let content = stripped.replace(/^\d+\.\s+/, '').trim();
      content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#e11d48;text-decoration:underline;">$1</a>');
      htmlLines.push(`<li style="margin-bottom:6px;">${content}</li>`);
      continue;
    } else {
      if (inUl) { htmlLines.push('</ul>'); inUl = false; }
      if (inOl) { htmlLines.push('</ol>'); inOl = false; }
    }
    
    if (!stripped || stripped.startsWith('```')) {
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
        htmlLines.push(`<div style="text-align:center;margin:24px 0;"><img src="${src}" alt="${alt}" style="max-width:100%;height:auto;border-radius:12px;" loading="lazy" /></div>`);
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

function buildHtmlPage({ title, description, canonicalUrl, image, jsonLd, bodyHtml }) {
  const cleanHeadTitle = title.includes('Qualia Navi') ? title : `${title} | Qualia Navi`;
  return templateHtml
    .replace(/<title>.*?<\/title>/, `<title>${cleanHeadTitle}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${description}" />`)
    .replace('</head>', `
      <link rel="canonical" href="${canonicalUrl}" />
      <meta property="og:title" content="${cleanHeadTitle}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:url" content="${canonicalUrl}" />
      <meta property="og:image" content="${image}" />
      <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
      </head>
    `)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

function writeRouteFiles(routeParts, html) {
  const dir = path.join(distDir, ...routeParts);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  if (routeParts.length >= 2) {
    const parentDir = path.join(distDir, ...routeParts.slice(0, -1));
    const leaf = routeParts[routeParts.length - 1];
    fs.writeFileSync(path.join(parentDir, `${leaf}.html`), html, 'utf8');
  }
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

// 1. 全3,074記事のプリレンダリング
articles.forEach((art, index) => {
  const articleId = art.id || art.slug;
  if (!articleId) return;
  const canonicalUrl = `https://qualia-navi.vercel.app/articles/${articleId}`;
  const isContentArticle = !!(art.content && (!art.features || art.features.length === 0));

  const rawName = art.productName || art.title || 'コスメ';
  const rawCategory = art.categoryLabel || art.category || '';
  let benefitKw = '口コミ評判・最安値';
  if (rawCategory.includes('スキンケア') || rawCategory.includes('skincare')) {
    benefitKw = '口コミ・保湿効果・最安値本音レビュー';
  } else if (rawCategory.includes('UV') || rawCategory.includes('日焼け止め') || rawCategory.includes('suncare')) {
    benefitKw = '焼けない？口コミ・落とし方・最安値検証';
  } else if (rawCategory.includes('リップ') || rawCategory.includes('メイク') || rawCategory.includes('makeup')) {
    benefitKw = '色持ち・口コミ・最安値本音レビュー';
  } else if (rawCategory.includes('ヘアケア') || rawCategory.includes('haircare')) {
    benefitKw = 'ツヤ・まとまり口コミ・最安値比較';
  }
  const fullTitleText = rawName.includes('【') && rawName.includes('】') ? rawName : `【2026年最新】${rawName}の${benefitKw} | Qualia Navi`;
  const title = escapeHtml(fullTitleText);

  const rawPrice = art.rakutenPrice ? `参考価格: ${art.rakutenPrice}。` : '';
  const rawPros = art.pros && art.pros.length > 0 ? `注目ポイント: ${art.pros.slice(0, 2).join('、')}。` : '';
  const fullDescText = (art.description || `【2026最新】${rawName}のリアルな口コミ・使い心地・成分特徴をQualia美容分析室が徹底検証！${rawPros}${rawPrice}楽天市場の最安値・在庫情報をリアルタイムでお届けします。`).slice(0, 155);
  const description = escapeHtml(fullDescText);
  const image = normalizeImageUrl(art.imageUrl || art.image);
  const categoryLabel = escapeHtml(art.categoryLabel || art.category || '美容・コスメ特集');

  const catArticles = categoryMap.get(art.categoryLabel || art.category || 'コスメ特集') || [];
  const related = catArticles.filter(a => a.id !== articleId).slice(0, 5);
  if (related.length < 5) {
    const fillers = articles.slice(index + 1, index + 6 - related.length);
    related.push(...fillers.filter(f => f.id !== articleId));
  }

  const graphNodes = [];
  if (!isContentArticle) {
    graphNodes.push({
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
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
        "reviewCount": art.reviewCount || 120
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "JPY",
        "price": String(art.rakutenPrice || art.price || "2480").replace(/[^0-9]/g, "") || "2480",
        "availability": "https://schema.org/InStock",
        "url": art.affiliateLink || art.affiliateUrl || canonicalUrl
      }
    });
  }

  graphNodes.push(
    {
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      "headline": title,
      "description": description,
      "image": image,
      "datePublished": art.createdAt || art.date || "2026-10-01",
      "dateModified": art.updatedAt || art.createdAt || "2026-10-19",
      "author": {
        "@type": "Person",
        "name": art.author || art.reviewerName || "橘 えりか",
        "jobTitle": art.reviewerRole || "コスメ＆美容編集長"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Qualia Navi (クオリア・ナビ)",
        "url": "https://qualia-navi.vercel.app"
      },
      "mainEntityOfPage": canonicalUrl
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "コスメ図鑑TOP", "item": "https://qualia-navi.vercel.app" },
        { "@type": "ListItem", "position": 2, "name": categoryLabel, "item": `https://qualia-navi.vercel.app/?category=${encodeURIComponent(art.category || 'all')}` },
        { "@type": "ListItem", "position": 3, "name": title, "item": canonicalUrl }
      ]
    }
  );

  if (art.faqs && art.faqs.length > 0) {
    graphNodes.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": art.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    });
  }

  const parsedBody = markdownToSemanticHtml(art.reviewBody || art.content || '');
  const bodyHtml = `
    <div style="min-height:100vh;background-color:#fdfaf8;font-family:sans-serif;color:#0f172a;padding:24px 16px;">
      <div style="max-width:896px;margin:0 auto;">
        <article style="background:#ffffff;border:1px solid #ffe4e6;border-radius:24px;padding:32px 24px;">
          <nav style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:#64748b;margin-bottom:20px;flex-wrap:wrap;">
            <a href="/" style="color:#64748b;text-decoration:none;">コスメTOP</a>
            <span>/</span>
            <a href="/?category=${encodeURIComponent(art.category || 'all')}" style="color:#be123c;font-weight:700;text-decoration:none;">${categoryLabel}</a>
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
          ${related.length ? `
          <section style="margin-top:40px;border-top:1px solid #f1f5f9;padding-top:28px;">
            <h3 style="font-size:1.25rem;margin:0 0 16px 0;color:#0f172a;font-weight:800;">✨ 関連おすすめコスメ</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:14px;">
              ${related.map(r => `
                <a href="/articles/${r.id}" style="display:block;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-decoration:none;">
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

  const customHtml = buildHtmlPage({
    title,
    description,
    canonicalUrl,
    image,
    jsonLd: { "@context": "https://schema.org", "@graph": graphNodes },
    bodyHtml
  });

  writeRouteFiles(['articles', articleId], customHtml);
  prerenderedCount++;
});

// 2. 全229件のVS比較ページの完全セマンティックHTMLプリレンダリング
comparisons.forEach((comp) => {
  if (!comp.id) return;
  const canonicalUrl = `https://qualia-navi.vercel.app/comparisons/${comp.id}`;
  const title = escapeHtml(comp.title.includes('【') ? comp.title : `【2026最新比較】${comp.title} どっちがおすすめ？違いを徹底検証`);
  const description = escapeHtml((comp.verdictSummary || comp.subtitle || `${comp.title}の価格、成分、使用感、どちらが買いかを徹底比較評価。`).slice(0, 155));
  const image = normalizeImageUrl(comp.coverImage);
  const parsedBody = markdownToSemanticHtml(comp.contentMarkdown || '');

  const pointsHtml = Array.isArray(comp.comparisonPoints) && comp.comparisonPoints.length > 0
    ? `<section style="margin:24px 0;padding:20px;background:#fff1f2;border-radius:16px;">
        <h2 style="font-size:1.2rem;font-weight:800;margin:0 0 12px;color:#881337;">シーン別・勝敗判定マトリクス</h2>
        <ul>
          ${comp.comparisonPoints.map(pt => `<li style="margin-bottom:8px;"><strong>${escapeHtml(pt.scene)}:</strong> ${escapeHtml(pt.reason)}</li>`).join('')}
        </ul>
      </section>`
    : '';

  const bodyHtml = `
    <div style="min-height:100vh;background-color:#fdfaf8;font-family:sans-serif;color:#0f172a;padding:24px 16px;">
      <article style="max-width:860px;margin:0 auto;background:#fff;padding:32px 24px;border-radius:24px;border:1px solid #ffe4e6;">
        <nav style="font-size:0.8rem;color:#64748b;margin-bottom:16px;">
          <a href="/">コスメTOP</a> / <a href="/comparisons">VS比較対決一覧</a> / <span>${title}</span>
        </nav>
        <h1 style="font-size:1.8rem;line-height:1.4;color:#0f172a;font-weight:900;margin-bottom:12px;">${title}</h1>
        <p style="color:#475569;font-size:1rem;line-height:1.7;margin-bottom:20px;">${escapeHtml(comp.subtitle || '')}</p>
        <div style="background:#0f172a;color:#fff;padding:20px;border-radius:16px;margin-bottom:24px;">
          <strong style="color:#fcd34d;display:block;margin-bottom:6px;">対決結論 (VERDICT)</strong>
          <p style="margin:0;line-height:1.7;">${escapeHtml(comp.verdictSummary || '')}</p>
        </div>
        ${pointsHtml}
        <div class="comparison-body" style="line-height:1.85;color:#334155;">
          ${parsedBody}
        </div>
      </article>
    </div>
  `;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image,
        "datePublished": comp.createdAt || "2026-10-01",
        "author": { "@type": "Organization", "name": "Qualia 美容分析室" },
        "mainEntityOfPage": canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "コスメTOP", "item": "https://qualia-navi.vercel.app" },
          { "@type": "ListItem", "position": 2, "name": "VS比較一覧", "item": "https://qualia-navi.vercel.app/comparisons" },
          { "@type": "ListItem", "position": 3, "name": title, "item": canonicalUrl }
        ]
      }
    ]
  };

  const customHtml = buildHtmlPage({ title, description, canonicalUrl, image, jsonLd, bodyHtml });
  writeRouteFiles(['comparisons', comp.id], customHtml);
  writeRouteFiles(['compare', comp.id], customHtml);
  prerenderedCount++;
});

// 3. 全315件のブログ・特集ページの完全セマンティックHTMLプリレンダリング
blogs.forEach((blog) => {
  if (!blog.id) return;
  const canonicalUrl = `https://qualia-navi.vercel.app/features/${blog.id}`;
  const title = escapeHtml(blog.title);
  const description = escapeHtml((blog.introText || blog.subtitle || `${blog.title}の特選ガイド。`).slice(0, 155));
  const image = normalizeImageUrl(blog.coverImage);
  const parsedBody = markdownToSemanticHtml(blog.contentMarkdown || '');

  const bodyHtml = `
    <div style="min-height:100vh;background-color:#fdfaf8;font-family:sans-serif;color:#0f172a;padding:24px 16px;">
      <article style="max-width:860px;margin:0 auto;background:#fff;padding:32px 24px;border-radius:24px;border:1px solid #ffe4e6;">
        <nav style="font-size:0.8rem;color:#64748b;margin-bottom:16px;">
          <a href="/">コスメTOP</a> / <a href="/features">特集記事一覧</a> / <span>${title}</span>
        </nav>
        <h1 style="font-size:1.8rem;line-height:1.4;color:#0f172a;font-weight:900;margin-bottom:12px;">${title}</h1>
        <p style="color:#475569;font-size:1rem;line-height:1.7;margin-bottom:24px;">${escapeHtml(blog.subtitle || blog.introText || '')}</p>
        <div class="blog-body" style="line-height:1.85;color:#334155;">
          ${parsedBody}
        </div>
      </article>
    </div>
  `;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": image,
        "datePublished": blog.createdAt || "2026-10-01",
        "author": { "@type": "Person", "name": blog.authorName || "橘 えりか" },
        "mainEntityOfPage": canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "コスメTOP", "item": "https://qualia-navi.vercel.app" },
          { "@type": "ListItem", "position": 2, "name": "特集記事一覧", "item": "https://qualia-navi.vercel.app/features" },
          { "@type": "ListItem", "position": 3, "name": title, "item": canonicalUrl }
        ]
      }
    ]
  };

  const customHtml = buildHtmlPage({ title, description, canonicalUrl, image, jsonLd, bodyHtml });
  writeRouteFiles(['features', blog.id], customHtml);
  writeRouteFiles(['blogs', blog.id], customHtml);
  writeRouteFiles(['blog', blog.id], customHtml);

  if (blog.slug && blog.slug !== blog.id) {
    writeRouteFiles(['features', blog.slug], customHtml);
    writeRouteFiles(['blogs', blog.slug], customHtml);
    writeRouteFiles(['blog', blog.slug], customHtml);
  }

  prerenderedCount++;
});

// 4. インデックス一覧ページ（/features, /comparisons, /sitemap）のプリレンダリング
const featuresIndexHtml = buildHtmlPage({
  title: '【2026年最新】コスメ・美容 特集記事一覧（10選・お悩み別ガイド） | Qualia Navi',
  description: 'プロ厳選10選や悩み別・成分別・パーソナルカラー別の特集記事全315本以上を網羅。Qualia 美容分析室による徹底検証レポート一覧。',
  canonicalUrl: 'https://qualia-navi.vercel.app/features',
  image: 'https://qualia-navi.vercel.app/og-image.png',
  jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "コスメ・美容 特集記事一覧", "url": "https://qualia-navi.vercel.app/features" },
  bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:24px;"><h1>コスメ・美容 特集記事一覧</h1><ul>${blogs.map(b => `<li><a href="/features/${b.id}">${escapeHtml(b.title)}</a></li>`).join('')}</ul></main>`
});
writeRouteFiles(['features'], featuresIndexHtml);
writeRouteFiles(['blogs'], featuresIndexHtml);

const comparisonsIndexHtml = buildHtmlPage({
  title: '【2026年最新】人気コスメVS対決・徹底比較記事一覧（全229件） | Qualia Navi',
  description: 'お悩みや目的別に人気コスメをガチンコ比較！成分・使用感・コスパの違いを多角的に分析し、あなたにピッタリの1本を見つけます。',
  canonicalUrl: 'https://qualia-navi.vercel.app/comparisons',
  image: 'https://qualia-navi.vercel.app/og-image.png',
  jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", "name": "人気コスメVS対決・徹底比較記事一覧", "url": "https://qualia-navi.vercel.app/comparisons" },
  bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:24px;"><h1>人気コスメVS対決・徹底比較記事一覧</h1><ul>${comparisons.map(c => `<li><a href="/comparisons/${c.id}">${escapeHtml(c.title)}</a></li>`).join('')}</ul></main>`
});
writeRouteFiles(['comparisons'], comparisonsIndexHtml);
writeRouteFiles(['compare'], comparisonsIndexHtml);

// 4.5. 10〜1月 季節別SEOランキングハブの静的プリレンダリング
const seasonalRankingRoutes = [
  {
    path: ['ranking', 'autumn-cosme'],
    blogId: 'feat-autumn-cosmetics-guide-45-series-hub',
    title: '【2026秋コスメ総まとめ】乾燥・寒暖差・パーツケア悩みを全方位解決する45大特集・450選コンプリートガイド | Qualia Navi',
    desc: '秋の急な乾燥や寒暖差ゆらぎに負けない秋コスメ45大特集・450選を完全網羅。楽天市場の最新価格・レビュー徹底比較。'
  },
  {
    path: ['ranking', 'holiday-coffret'],
    blogId: 'feat-winter-holiday-coffret-makeup-collection-2026',
    title: '【2026冬ホリデー・即完売必至の限定コフレ】クリスマスコフレ＆ホリデーメイクアップキット人気おすすめ10選 | Qualia Navi',
    desc: '年に一度の豪華デパコス限定クリスマスコフレ＆ホリデーメイクアップキットを徹底比較！完売前に手に入れるべき限定名品。'
  },
  {
    path: ['ranking', 'gift-selection'],
    blogId: 'feat-winter-holiday-cosmetics-gift-guide-2026',
    title: '【2026冬・絶対外さないホリデーギフト】予算別（3,000円/5,000円/1万円）人気プレゼントコスメ10選 | Qualia Navi',
    desc: '女友達や大切な人へ、または1年頑張った自分へのご褒美に。予算別に失敗しない冬のホリデーギフト名品を徹底比較。'
  },
  {
    path: ['ranking', 'winter-skincare'],
    blogId: 'feat-winter-sheet-mask-face-pack-2026',
    title: '【冬の乾燥くすみ＆ゴワつき一掃】高保湿フェイスパック＆濃密シートマスクおすすめ人気10選 | Qualia Navi',
    desc: '真冬の過酷な乾燥・暖房ダメージを救う高保湿シートマスク＆フェイスパック名品10選。ぷるぷる水光肌を取り戻す決定版。'
  }
];

seasonalRankingRoutes.forEach(r => {
  const targetBlog = blogs.find(b => b.id === r.blogId) || blogs[0];
  const pageHtml = buildHtmlPage({
    title: r.title,
    description: r.desc,
    canonicalUrl: `https://qualia-navi.vercel.app/${r.path.join('/')}`,
    image: normalizeImageUrl(targetBlog.coverImage),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": r.title,
      "description": r.desc,
      "datePublished": "2026-10-15",
      "dateModified": "2026-10-19",
      "mainEntityOfPage": `https://qualia-navi.vercel.app/${r.path.join('/')}`
    },
    bodyHtml: `<main style="max-width:1000px;margin:0 auto;padding:24px;"><h1>${escapeHtml(r.title)}</h1><p>${escapeHtml(r.desc)}</p><div class="article-content">${markdownToSemanticHtml(targetBlog.contentMarkdown || '')}</div></main>`
  });
  writeRouteFiles(r.path, pageHtml);
  prerenderedCount++;
});

// 5. トップページの静的セマンティックHTML＆WebSite/Organization構造化データ
const topCanonicalUrl = "https://qualia-navi.vercel.app";
const topTitle = "【2026年最新】Qualia Navi (クオリア・ナビ) - プチプラ・デパコス・韓国コスメのリアル比較検証メディア";
const topDesc = "透明感引き立つ最新スキンケア、デパコス・プチプラ、話題の韓国コスメをQualia美容分析室が徹底検証！楽天市場の最安値・口コミ情報をリアルタイムナビゲート。";
const topJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://qualia-navi.vercel.app/#website",
      "url": "https://qualia-navi.vercel.app",
      "name": "Qualia Navi (クオリア・ナビ)",
      "description": topDesc,
      "inLanguage": "ja",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://qualia-navi.vercel.app/?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://qualia-navi.vercel.app/#organization",
      "name": "Qualia Navi (クオリア・ナビ)",
      "url": "https://qualia-navi.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qualia-navi.vercel.app/og-image.png"
      }
    }
  ]
};

const topFeaturedArticles = articles.slice(0, 18);
const topArticlesCards = topFeaturedArticles.map(a => `
  <article style="background:#ffffff;border:1px solid #f1f5f9;border-radius:16px;padding:16px;">
    <span style="font-size:0.75rem;font-weight:700;color:#e11d48;background:#fff1f2;padding:4px 8px;border-radius:6px;display:inline-block;margin-bottom:8px;">
      ${escapeHtml(a.categoryLabel || a.category || '注目コスメ')}
    </span>
    <h3 style="font-size:0.95rem;font-weight:700;line-height:1.4;margin:0 0 8px;color:#0f172a;">
      <a href="/articles/${a.id || a.slug}" style="color:#0f172a;text-decoration:none;">
        ${escapeHtml(a.title || a.productName)}
      </a>
    </h3>
    <p style="font-size:0.8rem;color:#64748b;line-height:1.5;margin:0;">
      ${escapeHtml((a.introText || a.description || '').slice(0, 120))}
    </p>
  </article>
`).join('');

const topBodyHtml = `
  <div style="min-height:100vh;background-color:#fdfaf8;font-family:sans-serif;color:#0f172a;padding:24px 16px;">
    <header style="max-width:1100px;margin:0 auto 32px;text-align:center;">
      <h1 style="font-size:2rem;font-weight:900;color:#0f172a;margin-bottom:12px;">${topTitle}</h1>
      <p style="color:#475569;font-size:1.05rem;line-height:1.7;max-width:800px;margin:0 auto;">${topDesc}</p>
      <nav style="display:flex;justify-content:center;gap:16px;margin-top:20px;flex-wrap:wrap;">
        <a href="/features" style="color:#e11d48;font-weight:700;">コスメ特集 (${blogs.length}件)</a>
        <a href="/comparisons" style="color:#e11d48;font-weight:700;">VS比較検証 (${comparisons.length}件)</a>
        <a href="/sitemap" style="color:#e11d48;font-weight:700;">全記事サイトマップ (${articles.length}件)</a>
      </nav>
    </header>
    <main style="max-width:1100px;margin:0 auto;">
      <section style="background:#fff;border:1px solid #ffe4e6;border-radius:20px;padding:28px;margin-bottom:32px;">
        <h2 style="font-size:1.35rem;font-weight:800;color:#be123c;margin:0 0 20px;">注目コスメ検証レビュー</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:16px;">
          ${topArticlesCards}
        </div>
      </section>
    </main>
  </div>
`;

const topCustomHtml = buildHtmlPage({
  title: topTitle,
  description: topDesc,
  canonicalUrl: topCanonicalUrl,
  image: 'https://qualia-navi.vercel.app/og-image.png',
  jsonLd: topJsonLd,
  bodyHtml: topBodyHtml
});

fs.writeFileSync(path.join(distDir, "index.html"), topCustomHtml, "utf8");
console.log(`✨ [Prerender Completed] 全 ${prerenderedCount} ページ（個別記事:${articles.length}, 特集:${blogs.length}, 比較:${comparisons.length}）の静的SEO用完全セマンティックHTMLを出力しました！`);
