import fs from 'fs';
import path from 'path';

console.log('🚀 [Prerender] Googlebot/SEO用 静的HTMLプリレンダリングを開始します...');

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
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let prerenderedCount = 0;

// 1. 各記事のプリレンダリング
articles.forEach((art) => {
  const articleId = art.id;
  const canonicalUrl = `https://qualia-navi.vercel.app/articles/${articleId}`;
  const title = escapeHtml(art.title || `${art.productName} 徹底検証・口コミ`);
  const description = escapeHtml(art.introText || `${art.productName}の成分、効果、口コミ、最安値を徹底解説。`);
  const image = art.imageUrl ? `https://qualia-navi.vercel.app${art.imageUrl}` : 'https://qualia-navi.vercel.app/images/products/larocheposay_rose.jpg';

  // 構造化データ (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": art.productName || title,
    "image": image,
    "description": description,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": art.starRating || 4.8,
      "reviewCount": art.reviewCount || 1200
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "JPY",
      "price": (art.rakutenPrice || "2000").replace(/[^0-9]/g, '') || "2000",
      "availability": "https://schema.org/InStock",
      "url": art.affiliateLink || canonicalUrl
    }
  };

  // 本文HTML (検索エンジンが即パースできるSEO初期HTML)
  const bodyHtml = `
    <article style="max-width:800px;margin:0 auto;padding:20px;font-family:sans-serif;">
      <header style="margin-bottom:20px;">
        <span style="color:#e11d48;font-weight:bold;">${escapeHtml(art.categoryLabel || '美容・コスメ特習')}</span>
        <h1 style="font-size:1.8rem;line-height:1.4;margin:10px 0;">${title}</h1>
        <p style="color:#4b5563;font-size:1.05rem;line-height:1.6;">${description}</p>
      </header>

      <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;">
        <h2 style="font-size:1.3rem;margin-top:0;">商品の主な特徴</h2>
        <ul>
          ${(art.features || []).map(f => `<li style="margin-bottom:8px;">${escapeHtml(f)}</li>`).join('')}
        </ul>
      </div>

      <div style="line-height:1.8;color:#1f2937;margin-bottom:30px;">
        ${escapeHtml(art.reviewBody || '').replace(/\n/g, '<br/>')}
      </div>

      ${art.faqs && art.faqs.length ? `
      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:24px;">
        <h3 style="font-size:1.2rem;margin-top:0;">よくある質問 (FAQ)</h3>
        ${art.faqs.map(faq => `
          <div style="margin-bottom:12px;">
            <strong style="color:#e11d48;">Q. ${escapeHtml(faq.question)}</strong>
            <p style="margin:4px 0 0 0;color:#374151;">A. ${escapeHtml(faq.answer)}</p>
          </div>
        `).join('')}
      </div>` : ''}

      <div style="text-align:center;margin-top:30px;">
        <a href="${art.affiliateLink || canonicalUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:#e11d48;color:#fff;padding:14px 28px;border-radius:30px;text-decoration:none;font-weight:bold;">${escapeHtml(art.ctaTitle || '楽天市場で最新価格＆在庫を確認')}</a>
      </div>
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
    .replace('<div id="root"></div>', `<div id="root"><article style="padding:20px;max-width:800px;margin:0 auto;"><h1>${title}</h1><p>${description}</p></article></div>`);

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
    .replace('<div id="root"></div>', `<div id="root"><article style="padding:20px;max-width:800px;margin:0 auto;"><h1>${title}</h1><p>${description}</p></article></div>`);

  const targetDir = path.join(distDir, 'blogs', blog.id);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), customHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, 'blogs', `${blog.id}.html`), customHtml, 'utf8');
  prerenderedCount++;
});

console.log(`✨ [Prerender Completed] 全 ${prerenderedCount} ページの静的SEO用HTMLを出力しました！`);
