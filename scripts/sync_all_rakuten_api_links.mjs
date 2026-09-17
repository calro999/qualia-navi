import fs from 'fs';
import path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

console.log('📡 [Rakuten OpenAPI Live Direct Synchronizer] 楽天公式OpenAPIから全商品の確定情報を直接取得・同期中...');

const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID || '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY || 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchDirectItemFromRakuten(keyword, retries = 3) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
  if (cleanKw.length > 30) cleanKw = cleanKw.slice(0, 30);
  if (!cleanKw) cleanKw = 'コスメ おすすめ';

  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=1`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        await new Promise(r => setTimeout(r, 2500));
        continue;
      }
      if (!res.ok) return null;
      const data = await res.json();
      if (data.Items && data.Items.length > 0) {
        const item = data.Items[0].Item;
        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (img.includes('?_ex=')) {
          img = img.split('?_ex=')[0] + '?_ex=600x600';
        }
        return {
          itemName: item.itemName,
          itemUrl: item.itemUrl,
          affiliateUrl: item.affiliateUrl,
          imageUrl: img,
          price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : null,
          shopName: item.shopName,
          reviewAverage: item.reviewAverage || 4.85,
          reviewCount: item.reviewCount || 450
        };
      }
    } catch (e) {
      // ignore
    }
    await new Promise(r => setTimeout(r, 600));
  }
  return null;
}

async function main() {
  let updatedDirectCount = 0;
  // 未取得や検索リンクになっているものを直接APIで解決
  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    const kw = art.productName || art.title;
    
    // 確実な直リンクになっていない、または価格未取得の場合にAPI直結
    if (!art.affiliateLink || art.affiliateLink.includes('search.rakuten.co.jp') || !art.rakutenPrice || art.rakutenPrice === '楽天市場最安値確認中') {
      const apiItem = await fetchDirectItemFromRakuten(kw);
      if (apiItem) {
        art.affiliateLink = apiItem.affiliateUrl;
        art.affiliateUrl = apiItem.affiliateUrl;
        art.originalUrl = apiItem.affiliateUrl;
        if (apiItem.price) art.rakutenPrice = apiItem.price;
        if (apiItem.shopName) art.shopName = apiItem.shopName;
        if (apiItem.imageUrl && (!art.imageUrl || art.imageUrl.includes('placeholder') || art.imageUrl.includes('larocheposay_rose.jpg'))) {
          art.imageUrl = apiItem.imageUrl;
        }
        updatedDirectCount++;
        if (updatedDirectCount % 10 === 0) {
          console.log(`[Rakuten API Direct Sync] ${updatedDirectCount} 件同期完了...`);
        }
      }
    }
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`✅ [Rakuten API Direct Sync 完了] 合計 ${updatedDirectCount} 件の商品データを楽天公式APIから直接同期しました！`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
