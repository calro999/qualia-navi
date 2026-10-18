import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import https from 'https';

console.log('🌐 [Sitemap & IndexNow] 全3,600+ページのXMLサイトマップ自動更新およびBing IndexNow送信を開始します...');

const domain = 'https://qualia-navi.vercel.app';
const currentDate = new Date().toISOString().split('T')[0];

// 1. Extract article IDs from articles.json
const articleIds = [];
const jsonPath = resolve(process.cwd(), 'src', 'data', 'articles.json');
if (existsSync(jsonPath)) {
  const articles = JSON.parse(readFileSync(jsonPath, 'utf8'));
  articles.forEach(art => {
    if (art.id && !articleIds.includes(art.id)) {
      articleIds.push(art.id);
    }
  });
}

// 2. Extract all 229 comparison IDs from public/data/comparisons.json
const comparisons = [];
const compJsonPath = resolve(process.cwd(), 'public', 'data', 'comparisons.json');
if (existsSync(compJsonPath)) {
  const compList = JSON.parse(readFileSync(compJsonPath, 'utf8'));
  compList.forEach(c => {
    if (c.id && !comparisons.includes(c.id)) {
      comparisons.push(c.id);
    }
  });
}

// 3. Extract all 315 blog post IDs from public/data/blogs.json
const blogs = [];
const blogJsonPath = resolve(process.cwd(), 'public', 'data', 'blogs.json');
if (existsSync(blogJsonPath)) {
  const blogList = JSON.parse(readFileSync(blogJsonPath, 'utf8'));
  blogList.forEach(b => {
    if (b.id && !blogs.includes(b.id)) {
      blogs.push(b.id);
    }
  });
}

// 4. Authors (12 profiles)
const authors = [
  'author-hasumi',
  'author-tachibana',
  'author-inoue',
  'author-sasaki',
  'author-takahashi',
  'author-watanabe',
  'author-ito',
  'author-yamamoto',
  'author-nakamura',
  'author-kobayashi',
  'author-kato',
  'author-yoshida'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Hub Pages -->
  <url>
    <loc>${domain}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/features</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${domain}/comparisons</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${domain}/authors</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/sitemap</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 10-12-1 Month Seasonal Ranking Hubs -->
  <url>
    <loc>${domain}/ranking/autumn-cosme</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.98</priority>
  </url>
  <url>
    <loc>${domain}/ranking/holiday-coffret</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.98</priority>
  </url>
  <url>
    <loc>${domain}/ranking/gift-selection</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.98</priority>
  </url>
  <url>
    <loc>${domain}/ranking/winter-skincare</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.98</priority>
  </url>
`;

// Add Author Pages
authors.forEach((authorId) => {
  xml += `  <url>
    <loc>${domain}/authors/${authorId}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
});

// Add All 229 VS Comparisons (canonical /comparisons/)
comparisons.forEach((comp) => {
  xml += `  <url>
    <loc>${domain}/comparisons/${comp}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>\n`;
});

// Add All 315 Special Feature Blog Posts (canonical /features/)
blogs.forEach((blog) => {
  xml += `  <url>
    <loc>${domain}/features/${blog}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>\n`;
});

// Add All 3,074 Product & Content Articles
articleIds.forEach((art) => {
  xml += `  <url>
    <loc>${domain}/articles/${art}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
});

xml += `</urlset>`;

const totalUrls = 5 + authors.length + comparisons.length + blogs.length + articleIds.length;
const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf8');
console.log(`✅ [Sitemap Updated] sitemap.xml を全 ${totalUrls} URL (記事:${articleIds.length}, 特集:${blogs.length}, 比較:${comparisons.length}, 著者:${authors.length}) で完全最新化しました。`);

// Send IndexNow Ping
const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

const targetUrls = [
  `https://${host}/`,
  `https://${host}/sitemap`,
  `https://${host}/features`,
  `https://${host}/comparisons`,
  ...blogs.slice(0, 150).map(b => `https://${host}/features/${b}`),
  ...comparisons.slice(0, 150).map(c => `https://${host}/comparisons/${c}`),
  ...articleIds.slice(0, 300).map(id => `https://${host}/articles/${id}`)
];

const postData = JSON.stringify({
  host: host,
  key: apiKey,
  keyLocation: keyLocation,
  urlList: targetUrls
});

const req = https.request({
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData),
    'Connection': 'close'
  },
  timeout: 5000
}, (res) => {
  console.log(`📡 [IndexNow Response] Status Code: ${res.statusCode} (Bing/Copilot 登録受付完了)`);
});

req.on('error', (e) => {
  if (e.code === 'ECONNRESET') return;
  console.warn(`⚠️ [IndexNow Warning] ${e.message}`);
});

req.on('timeout', () => {
  req.destroy();
});

req.write(postData);
req.end();
