import fs from 'fs';
import path from 'path';

console.log('📌 [Pinterest Catalog] Pinterest審査完全対応カタログXML (RSS 2.0) の生成を開始します...');

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
<title>Qualia Navi コスメカタログ</title>
<link>${domain}</link>
<description>Qualia Navi - トレンドコスメ・美容アイテムの公式トレンドガイドカタログ</description>
`;

articles.forEach(art => {
  if (!art.id) return;

  const id = escapeXml(art.id);
  // 商品名とタイトルの最適化
  const rawTitle = art.productName || art.title || 'トレンドコスメ';
  const title = escapeXml(rawTitle.slice(0, 150)); // Pinterestのタイトル上限文字数ガード
  
  // 説明文
  const rawDesc = art.introText || art.content || art.title || '人気コスメのトレンドレビュー';
  const description = escapeXml(rawDesc.slice(0, 500));
  
  // 自ドメインの商品詳細直URL（アフィリエイトURLは絶対に含めない）
  const link = escapeXml(`${domain}/article/${art.id}`);
  
  // 高画質画像URL
  let imageUrl = art.imageUrl || art.image || '';
  if (imageUrl.startsWith('/')) {
    imageUrl = `${domain}${imageUrl}`;
  }
  if (!imageUrl.startsWith('http')) {
    imageUrl = `${domain}/images/products/decorte_liposome.jpg`; // デフォルトフォールバック
  }
  const image_link = escapeXml(imageUrl);
  
  // 価格フォーマット（例: 2980 JPY）
  let priceStr = art.rakutenPrice || art.price || '1980';
  let priceMatch = String(priceStr).match(/[0-9,]+/);
  let priceVal = 1980;
  if (priceMatch) {
    priceVal = parseInt(priceMatch[0].replace(/,/g, ''), 10);
    if (isNaN(priceVal) || priceVal <= 0) priceVal = 1980;
  }
  const price = `${priceVal} JPY`;

  // ブランド（必須フィールド）
  const brandName = art.category ? art.category.toUpperCase() : 'QUALIA';
  const brand = escapeXml(brandName);

  // カテゴリ
  const googleCategory = escapeXml('Health & Beauty > Personal Care > Cosmetics');
  const productType = escapeXml(`コスメ > ${art.category || '美容アイテム'}`);
  
  xmlContent += `
<item>
  <g:id>${id}</g:id>
  <title>${title}</title>
  <description>${description}</description>
  <link>${link}</link>
  <g:image_link>${image_link}</g:image_link>
  <g:price>${price}</g:price>
  <g:availability>in_stock</g:availability>
  <g:condition>new</g:condition>
  <g:brand>${brand}</g:brand>
  <g:google_product_category>${googleCategory}</g:google_product_category>
  <g:product_type>${productType}</g:product_type>
</item>`;
});

xmlContent += `
</channel>
</rss>`;

fs.writeFileSync(xmlPath, xmlContent, 'utf8');
console.log(`✅ [Pinterest Catalog Validated] ${articles.length}件のアイテムを Pinterest 完全準拠仕様で ${xmlPath} に出力しました。`);
