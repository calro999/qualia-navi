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
  // G1: PDRN 美容液 グルタチオン
  let g1 = await fetchRakutenItems('PDRN 美容液 グルタチオン', 10);
  if (g1.length < 10) {
    await sleep(1500);
    g1 = await fetchRakutenItems('PDRN 美容液', 10);
  }
  await sleep(1500);

  // G2: 超音波トリートメント アイロン
  const g2 = await fetchRakutenItems('超音波 トリートメント アイロン', 10);
  await sleep(1500);

  // G3: 女性用 育毛剤 スカルプエッセンス
  const g3 = await fetchRakutenItems('女性用 育毛剤 スカルプエッセンス', 10);
  await sleep(1500);

  // G4: アイシャドウ テラコッタ ブラウン イエベ秋
  let g4 = await fetchRakutenItems('アイシャドウ テラコッタ ブラウン', 10);

  fs.writeFileSync('scratch/rakuten_batch83_g1_verified.json', JSON.stringify(g1, null, 2));
  fs.writeFileSync('scratch/rakuten_batch83_g2_verified.json', JSON.stringify(g2, null, 2));
  fs.writeFileSync('scratch/rakuten_batch83_g3_verified.json', JSON.stringify(g3, null, 2));
  fs.writeFileSync('scratch/rakuten_batch83_g4_verified.json', JSON.stringify(g4, null, 2));

  console.log(`Fetched counts: g1=${g1.length}, g2=${g2.length}, g3=${g3.length}, g4=${g4.length}`);
}

run();
