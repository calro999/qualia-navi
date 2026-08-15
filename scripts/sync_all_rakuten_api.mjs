import fs from 'fs';
import path from 'path';

console.log('🚀 [Rakuten API Batch Synchronizer] 全366記事の商品名・確定アフィリンク・高画質画像を楽天公式APIで完全全件最新化中...');

const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function syncAllArticles() {
  let updatedCount = 0;
  let failCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    // Search keyword based on productName or title or targetKw
    let queryKw = art.productName || art.title || '';
    // Clean up query keyword to get precise Rakuten API hit
    queryKw = queryKw.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();

    if (queryKw.length > 30) {
      queryKw = queryKw.slice(0, 30);
    }

    const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(queryKw)}&format=json&hits=1`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      
      if (!data.Items || data.Items.length === 0) {
        // Fallback search with targetKw or shorter title
        const shortKw = (art.targetKw || art.title || '').split(' ')[0];
        const fallbackUrl = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(shortKw)}&format=json&hits=1`;
        res = await fetch(fallbackUrl);
        data = await res.json();
      }

      if (data.Items && data.Items.length > 0) {
        const item = data.Items[0].Item;
        let rawImg = item.mediumImageUrls?.[0]?.imageUrl || item.imageUrl || '';
        
        // Convert thumbnail to high resolution CDN image URL
        if (rawImg.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
          rawImg = rawImg.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        } else if (rawImg.includes('tshop.r10s.jp/')) {
          rawImg = rawImg.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        }

        articles[i].productName = item.itemName;
        articles[i].affiliateLink = item.affiliateUrl;
        articles[i].imageUrl = rawImg;
        articles[i].rakutenPrice = item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : articles[i].rakutenPrice;

        updatedCount++;
        console.log(`✅ [${i + 1}/${articles.length}] Sync OK: '${queryKw.slice(0, 20)}' => Image: ${rawImg.slice(0, 45)}...`);
      } else {
        failCount++;
        console.log(`❌ [${i + 1}/${articles.length}] Fail hit for query: '${queryKw}'`);
      }
    } catch (e) {
      failCount++;
      console.log(`⚠️ [${i + 1}/${articles.length}] API Error for query: '${queryKw}': ${e.message}`);
    }

    // Rate limiting delay (1,200ms) to respect Rakuten API SLA
    await new Promise(r => setTimeout(r, 1200));

    // Save progress periodically every 50 items
    if ((i + 1) % 50 === 0 || i === articles.length - 1) {
      fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf-8');
      console.log(`💾 Progress saved at ${i + 1}/${articles.length} items.`);
    }
  }

  console.log(`🎉 [Sync Completed] 全${articles.length}記事中、${updatedCount}件の画像・アフィリンク・商品名を楽天API直叩きでリアルタイム完全更新完了！(失敗: ${failCount}件)`);
}

syncAllArticles();
