import fs from 'fs';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchRakutenItems(keyword, hits = 12) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.Items) return [];
  return data.Items.map(entry => {
    const item = entry.Item || entry;
    let rawImg = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
    if (rawImg.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
      rawImg = rawImg.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
    } else if (rawImg.includes('tshop.r10s.jp/')) {
      rawImg = rawImg.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
    }
    return {
      itemCode: item.itemCode || '',
      itemName: item.itemName || '',
      shopName: item.shopName || '',
      affiliateUrl: item.affiliateUrl || item.itemUrl || '',
      imageUrl: rawImg,
      price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '',
      priceNum: item.itemPrice || 0,
      reviewAvg: item.reviewAverage || 4.5,
      reviewCount: item.reviewCount || 0,
      catchcopy: item.catchcopy || ''
    };
  });
}

async function main() {
  const data = JSON.parse(fs.readFileSync('scratch_longtail_batch6_rakuten_items.json', 'utf-8'));
  const kws = ['ウテナ マトメイク 前髪グルー', '前髪固定 グルー', '前髪キープ ポイント グルー', '前髪のり マトメイク'];
  let items = [];
  const seenCodes = new Set();
  for (const kw of kws) {
    const fetched = await fetchRakutenItems(kw, 6);
    for (const it of fetched) {
      if (!seenCodes.has(it.itemCode) && it.imageUrl && it.itemName) {
        seenCodes.add(it.itemCode);
        items.push(it);
      }
    }
    await new Promise(r => setTimeout(r, 400));
  }
  if (items.length > 0) {
    data.bangs_glue = items.slice(0, 10);
    fs.writeFileSync('scratch_longtail_batch6_rakuten_items.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log('✅ bangs_glue を前髪グルー専用アイテム10件に更新完了！');
  }
}

main();
