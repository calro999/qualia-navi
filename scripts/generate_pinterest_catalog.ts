import fs from 'fs';
import path from 'path';

console.log('📌 [Pinterest Catalog] Pinterest用のカタログXML (RSS) の生成を開始します...');

const domain = 'https://qualia-navi.vercel.app';
const xmlPath = path.resolve(process.cwd(), 'public', 'pinterest_catalog.xml');

const jsonPath = path.resolve(process.cwd(), 'src', 'data', 'articles.json');
let articles = [];

if (fs.existsSync(jsonPath)) {
  const jsonContent = fs.readFileSync(jsonPath, 'utf8');
  articles = JSON.parse(jsonContent);
} else {
  console.warn('⚠️ articles.json が見つかりませんでした。');
}

function escapeXml(unsafe: string): string {
  if (unsafe === undefined || unsafe === null) return '';
  return String(unsafe).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Qualia Navi</title>
<link>${domain}</link>
<description>Qualia Navi - プチプラ・デパコス・韓国コスメのトレンドガイド</description>
`;

articles.forEach(art => {
  if (!art.id) return;
  
  const id = escapeXml(art.id);
  const title = escapeXml(art.title || art.productName);
  const description = escapeXml(art.introText || art.title);
  const link = escapeXml(`${domain}/articles/${art.id}`);
  
  let imageUrl = art.imageUrl || '';
  if (imageUrl.startsWith('/')) {
    imageUrl = `${domain}${imageUrl}`;
  }
  const image_link = escapeXml(imageUrl);
  
  // Extract number from price, default to 0 if not found
  let priceStr = art.rakutenPrice || '0';
  let priceMatch = priceStr.match(/[0-9,]+/);
  let price = '0 JPY';
  if (priceMatch) {
    price = `${priceMatch[0].replace(/,/g, '')} JPY`;
  }

  const category = escapeXml('Health & Beauty > Personal Care > Cosmetics');
  
  xmlContent += `
<item>
  <g:id>${id}</g:id>
  <title>${title}</title>
  <description>${description}</description>
  <link>${link}</link>
  <g:image_link>${image_link}</g:image_link>
  <g:price>${price}</g:price>
  <g:availability>in stock</g:availability>
  <g:condition>new</g:condition>
  <g:google_product_category>${category}</g:google_product_category>
</item>`;
});

xmlContent += `
</channel>
</rss>`;

fs.writeFileSync(xmlPath, xmlContent, 'utf8');
console.log(`✅ [Pinterest Catalog] ${articles.length}件のアイテムを ${xmlPath} に出力しました。`);
