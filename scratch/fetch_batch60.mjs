import fs from 'fs';

const RAKUTEN_APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';
const API_ENDPOINT = 'https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401';

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function searchRakuten(keyword, hits = 10) {
  await sleep(1500);
  const url = new URL(API_ENDPOINT);
  url.searchParams.set('applicationId', RAKUTEN_APP_ID);
  url.searchParams.set('accessKey', RAKUTEN_ACCESS_KEY);
  url.searchParams.set('affiliateId', RAKUTEN_AFFILIATE_ID);
  url.searchParams.set('keyword', keyword);
  url.searchParams.set('hits', hits.toString());
  url.searchParams.set('formatVersion', '2');
  url.searchParams.set('sort', '-reviewCount');

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const items = data.Items || [];
  return items.map((item, idx) => {
    let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
    img = img.replace(/^http:/, 'https:').replace(/\?_ex=.*$/, '');
    return {
      rank: idx + 1,
      name: item.itemName,
      price: item.itemPrice,
      shop: item.shopName,
      affiliateUrl: item.affiliateUrl || item.itemUrl,
      imageUrl: img,
      reviewCount: item.reviewCount || 0,
      reviewAverage: item.reviewAverage || 0,
      description: item.itemCaption ? item.itemCaption.slice(0, 180) + '...' : ''
    };
  });
}

async function run() {
  console.log('Fetching Group 1: ヒト型セラミド バーム...');
  const g1 = await searchRakuten('ヒト型セラミド バーム', 10);
  fs.writeFileSync('scratch/rakuten_batch60_g1_verified.json', JSON.stringify(g1, null, 2));

  console.log('Fetching Group 2: ネック パッチ 首 マイクロニードル...');
  const g2 = await searchRakuten('首 ネック パッチ マイクロニードル', 10);
  fs.writeFileSync('scratch/rakuten_batch60_g2_verified.json', JSON.stringify(g2, null, 2));

  console.log('Fetching Group 3: 炭酸 スカルプ クレンジング 頭皮...');
  const g3 = await searchRakuten('炭酸 スカルプ クレンジング シャンプー 頭皮', 10);
  fs.writeFileSync('scratch/rakuten_batch60_g3_verified.json', JSON.stringify(g3, null, 2));

  console.log('Fetching Group 4: アプリコット テラコッタ コスメ アイシャドウ チーク...');
  const g4 = await searchRakuten('テラコッタ アイシャドウ リップ アプリコット', 10);
  fs.writeFileSync('scratch/rakuten_batch60_g4_verified.json', JSON.stringify(g4, null, 2));

  console.log('All 4 groups fetched successfully!');
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
