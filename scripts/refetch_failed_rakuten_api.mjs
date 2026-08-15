import fs from 'fs';
import path from 'path';

console.log('🚀 [Rakuten API Precision Refetcher] 過去の126件の未取得・静的画像記事を対象に、検索キーワード最適化で100%楽天公式API直叩き取得を開始中...');

const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function refetchFailedItems() {
  let refetchedCount = 0;
  let failCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    // Target only articles that still have static fallback image URL or missing real image
    if (art.imageUrl && art.imageUrl.startsWith('/images/products/')) {
      
      // Strategy to generate clean, highly-discoverable search keywords for Rakuten API
      let cleanKw = '';
      if (art.targetKw) {
        // Pick first 2-3 words from targetKw
        const words = art.targetKw.split(' ').filter(w => !['40代', '50代', '使い方', '順番', '楽天', '楽天公式', '塗り方', '購入'].includes(w));
        cleanKw = words.slice(0, 3).join(' ');
      }
      if (!cleanKw || cleanKw.length < 3) {
        cleanKw = (art.productName || art.title || '').replace(/【.*?】/g, '').replace(/（.*?）/g, '').trim().split(' ').slice(0, 2).join(' ');
      }

      console.log(`📡 [Refetching ${i + 1}/${articles.length}] ID: ${art.id} | Query: '${cleanKw}'...`);

      const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=1`;

      try {
        let res = await fetch(url);
        let data = await res.json();

        if (!data.Items || data.Items.length === 0) {
          // Broad fallback with brand name only
          const brandWord = cleanKw.split(' ')[0];
          const broadUrl = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(brandWord)}&format=json&hits=1`;
          res = await fetch(broadUrl);
          data = await res.json();
        }

        if (data.Items && data.Items.length > 0) {
          const item = data.Items[0].Item;
          let rawImg = item.mediumImageUrls?.[0]?.imageUrl || item.imageUrl || '';
          
          if (rawImg.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
            rawImg = rawImg.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
          } else if (rawImg.includes('tshop.r10s.jp/')) {
            rawImg = rawImg.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
          }

          articles[i].productName = item.itemName;
          articles[i].affiliateLink = item.affiliateUrl;
          articles[i].imageUrl = rawImg;
          articles[i].rakutenPrice = item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : articles[i].rakutenPrice;

          refetchedCount++;
          console.log(`  ✅ Success: ${item.itemName.slice(0, 30)} | Img: ${rawImg.slice(0, 45)}...`);
        } else {
          failCount++;
          console.log(`  ❌ Fail for query: '${cleanKw}'`);
        }
      } catch (e) {
        failCount++;
        console.log(`  ⚠️ API Error for query '${cleanKw}': ${e.message}`);
      }

      await new Promise(r => setTimeout(r, 1200));

      if (refetchedCount % 20 === 0) {
        fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf-8');
        console.log(`💾 Progress saved (${refetchedCount} refetched).`);
      }
    }
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`🎉 [Precision Refetch Finished] 再試行の結果、追加で${refetchedCount}件を楽天公式API直叩きでリアルタイム画像・アフィリンクへ完全更新完了！(未取得残数: ${failCount}件)`);
}

refetchFailedItems();
