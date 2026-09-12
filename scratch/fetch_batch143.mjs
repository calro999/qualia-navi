import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';
const BASE_URL = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const queries = {
  t1: 'ネッククリーム 首 シワ レチノール スティック',
  t2: 'キューティクルニッパー 甘皮処理 ネイルケア ステンレス',
  t3: 'イヤーキャップ ヘアカラー 使い捨て 耳カバー 毛染め',
  t4: 'ヘッドスパ ワイヤー ヘッドマッサージャー ゾクゾク'
};

async function fetchProducts(keyword) {
  const url = new URL(BASE_URL);
  url.searchParams.set('applicationId', APP_ID);
  url.searchParams.set('accessKey', ACCESS_KEY);
  url.searchParams.set('affiliateId', AFFILIATE_ID);
  url.searchParams.set('keyword', keyword);
  url.searchParams.set('hits', '15');
  url.searchParams.set('sort', '-reviewCount');

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url.toString());
      if (res.status === 429) {
        console.log('Got 429, waiting 2.5 seconds...');
        await sleep(2500);
        continue;
      }
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      const items = data.Items || [];

      const results = [];
      for (const entry of items) {
        const item = entry.Item || entry;
        const rawImg = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (!rawImg) continue;

        let cleanImg = rawImg.replace(/\?_ex=\d+x\d+/, '');
        if (cleanImg.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
          cleanImg = cleanImg.replace('thumbnail.image.rakuten.co.jp/@0_mall/', 'shop.r10s.jp/');
        }

        results.push({
          name: item.itemName,
          price: item.itemPrice,
          url: item.affiliateUrl || item.itemUrl,
          image: cleanImg,
          shop: item.shopName,
          reviewCount: item.reviewCount || 0,
          reviewAverage: item.reviewAverage || 4.5
        });

        if (results.length >= 10) break;
      }
      return results;
    } catch (err) {
      if (attempt === 2) throw err;
      await sleep(2000);
    }
  }
  return [];
}

async function main() {
  const allResults = {};
  for (const [key, q] of Object.entries(queries)) {
    console.log(`Fetching for ${key}: ${q}...`);
    allResults[key] = await fetchProducts(q);
    console.log(`Retrieved ${allResults[key].length} items.`);
    await sleep(1500);
  }

  fs.writeFileSync('scratch/batch143_fetched.json', JSON.stringify(allResults, null, 2), 'utf-8');
  console.log('Batch 143 products saved successfully to scratch/batch143_fetched.json!');
}

main().catch(console.error);
