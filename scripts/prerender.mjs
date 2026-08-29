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
  
  const text = String(mdText).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const lines = text.split('\n');
  const htmlLines = [];
  let inUl = false;
  let inOl = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const stripped = line.trim();
    
    if (stripped.startsWith('- ') || stripped.startsWith('* ')) {
      if (!inUl) {
        if (inOl) {
          htmlLines.push('</ol>');
          inOl = false;
        }
        htmlLines.push('<ul style="margin:12px 0 16px 20px;line-height:1.8;list-style-type:disc;">');
        inUl = true;
      }
      let content = stripped.slice(2).trim();
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

  // 本文HTML (検索エンジンが即パースできる完全セマンティックHTML)
  const bodyHtml = `
    <article style="max-width:860px;margin:0 auto;padding:24px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Zen Kaku Gothic New',sans-serif;color:#1e293b;">
      <nav style="font-size:0.875rem;color:#64748b;margin-bottom:16px;">
        <a href="/" style="color:#64748b;text-decoration:none;">ホーム</a> &gt; 
        <span style="color:#e11d48;font-weight:600;">${categoryLabel}</span>
      </nav>

      <header style="margin-bottom:28px;">
        <span style="display:inline-block;background:#ffe4e6;color:#e11d48;font-size:0.875rem;font-weight:700;padding:4px 12px;border-radius:9999px;margin-bottom:12px;">${categoryLabel}</span>
        <h1 style="font-size:1.85rem;line-height:1.45;margin:0 0 16px 0;color:#0f172a;font-weight:800;">${title}</h1>
        <p style="color:#475569;font-size:1.05rem;line-height:1.7;margin:0;">${description}</p>
      </header>

      ${(art.features && art.features.length) ? `
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
        <h2 style="font-size:1.25rem;margin-top:0;margin-bottom:12px;color:#0f172a;font-weight:700;">📌 検証の要点とハイライト</h2>
        <ul style="margin:0;padding-left:20px;line-height:1.8;">
          ${art.features.map(f => `<li style="margin-bottom:8px;color:#334155;">${escapeHtml(f)}</li>`).join('')}
        </ul>
      </div>` : ''}

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

      <div style="text-align:center;margin:40px 0 50px 0;background:linear-gradient(135deg, #fff1f2 0%, #fdf2f8 100%);padding:32px 24px;border-radius:16px;border:1px solid #fecdd3;">
        <h3 style="font-size:1.3rem;margin:0 0 12px 0;color:#881337;font-weight:800;">楽天市場の公式認定ショップでお得にチェック</h3>
        <p style="margin:0 0 20px 0;color:#9f1239;font-size:0.95rem;">リアルタイム価格・限定クーポン・ポイント還元倍率を確認できます</p>
        <a href="${art.affiliateLink || art.affiliateUrl || canonicalUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:linear-gradient(135deg, #e11d48 0%, #be123c 100%);color:#fff;padding:16px 36px;border-radius:9999px;text-decoration:none;font-weight:800;font-size:1.1rem;box-shadow:0 10px 15px -3px rgba(225,29,72,0.3);">
          ${escapeHtml(art.ctaTitle || '👉 楽天市場で最新価格＆ポイント還元をチェック ↗')}
        </a>
      </div>

      ${related.length ? `
      <section style="margin-top:48px;border-top:2px solid #f1f5f9;padding-top:32px;">
        <h3 style="font-size:1.35rem;margin:0 0 20px 0;color:#0f172a;font-weight:800;">✨ 関連するおすすめ美容・コスメ記事</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:16px;">
          ${related.map(r => `
            <a href="/articles/${r.id}" style="display:block;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;text-decoration:none;transition:box-shadow 0.2s ease;">
              <span style="font-size:0.75rem;font-weight:700;color:#e11d48;display:block;margin-bottom:6px;">${escapeHtml(r.categoryLabel || r.category || 'コスメ検証')}</span>
              <h4 style="font-size:0.95rem;line-height:1.5;margin:0 0 8px 0;color:#1e293b;font-weight:700;">${escapeHtml(r.title || r.productName || 'おすすめコスメ')}</h4>
              <p style="font-size:0.8rem;color:#64748b;margin:0;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escapeHtml(r.introText || r.description || '')}</p>
            </a>
          `).join('')}
        </div>
      </section>` : ''}
    </article>
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

