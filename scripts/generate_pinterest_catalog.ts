import fs from 'fs';
import path from 'path';

console.log('📌 [Pinterest Catalog] Pinterest用のカタログCSVの生成を開始します...');

const domain = 'https://qualia-navi.vercel.app';
const csvPath = path.resolve(process.cwd(), 'public', 'pinterest_catalog.csv');

// Regex or eval to extract from data.ts is hard in plain node, so we use a regex or just read the JSON.
// Since we have articles.json, we can just use that for the products.
// But we should also get the INITIAL_ARTICLES from data.ts if there are any that aren't in articles.json.
// Actually, generate_mass_articles.py put all products into articles.json. Let's just read articles.json.

const jsonPath = path.resolve(process.cwd(), 'src', 'data', 'articles.json');
let articles = [];

if (fs.existsSync(jsonPath)) {
  const jsonContent = fs.readFileSync(jsonPath, 'utf8');
  articles = JSON.parse(jsonContent);
} else {
  console.warn('⚠️ articles.json が見つかりませんでした。');
}

// Function to escape CSV fields
function escapeCsv(field) {
  if (field === undefined || field === null) return '';
  let str = String(field);
  // Replace newlines and quotes
  str = str.replace(/"/g, '""');
  str = str.replace(/\n/g, ' ');
  if (str.includes(',') || str.includes('"')) {
    return `"${str}"`;
  }
  return str;
}

// Header
let csvContent = 'id,title,description,link,image_link,price,availability,condition,google_product_category\n';

articles.forEach(art => {
  if (!art.id) return;
  
  const id = escapeCsv(art.id);
  const title = escapeCsv(art.title || art.productName);
  const description = escapeCsv(art.introText || art.title);
  const link = escapeCsv(`${domain}/articles/${art.id}`);
  
  let imageUrl = art.imageUrl || '';
  if (imageUrl.startsWith('/')) {
    imageUrl = `${domain}${imageUrl}`;
  }
  const image_link = escapeCsv(imageUrl);
  
  // Extract number from price, default to 0 if not found
  let priceStr = art.rakutenPrice || '0';
  let priceMatch = priceStr.match(/[0-9,]+/);
  let price = '0 JPY';
  if (priceMatch) {
    price = `${priceMatch[0].replace(/,/g, '')} JPY`;
  } else {
    // If no match, try to just output a number + JPY
    price = '0 JPY';
  }

  const availability = 'in stock';
  const condition = 'new';
  const category = 'Health & Beauty > Personal Care > Cosmetics';
  
  csvContent += `${id},${title},${description},${link},${image_link},${price},${availability},${condition},${escapeCsv(category)}\n`;
});

fs.writeFileSync(csvPath, csvContent, 'utf8');
console.log(`✅ [Pinterest Catalog] ${articles.length}件のアイテムを ${csvPath} に出力しました。`);
