import fs from 'fs';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchRakutenItems(keyword, count = 10) {
  const url = new URL('https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401');
  url.searchParams.append('applicationId', APP_ID);
  url.searchParams.append('accessKey', ACCESS_KEY);
  url.searchParams.append('affiliateId', AFFILIATE_ID);
  url.searchParams.append('keyword', keyword);
  url.searchParams.append('hits', count.toString());
  url.searchParams.append('imageFlag', '1');
  url.searchParams.append('sort', '-reviewCount');

  console.log(`Fetching: ${keyword}...`);
  const res = await fetch(url.toString());
  if (!res.ok) {
    const txt = await res.text();
    console.error(`Error ${res.status}: ${txt}`);
    return [];
  }
  const data = await res.json();
  if (!data.Items || !Array.isArray(data.Items)) {
    console.log('No items found');
    return [];
  }

  return data.Items.slice(0, count).map(entry => {
    const item = entry.Item;
    return {
      name: item.itemName,
      price: item.itemPrice,
      url: item.affiliateUrl || item.itemUrl,
      imageUrl: item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '',
      shopName: item.shopName,
      reviewCount: item.reviewCount || 0,
      reviewAverage: item.reviewAverage || 0
    };
  });
}

async function run() {
  const g4 = await fetchRakutenItems('アイシャドウ ブラウン イエベ', 10);
  console.log(`g4 count: ${g4.length}`);
  fs.writeFileSync('scratch/rakuten_batch79_g4_verified.json', JSON.stringify(g4, null, 2));
}

run();
