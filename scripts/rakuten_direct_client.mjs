import fs from 'fs';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 楽天OpenAPIを直接叩いて最新商品情報を取得する共通関数（Rate Limit保護ウェイト付き）
 */
export async function searchRakutenDirect(keyword, hits = 10, sort = '-reviewCount', retries = 3) {
  console.log(`[楽天API直接リクエスト] キーワード: "${keyword}", 取得件数: ${hits}`);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(keyword)}&format=json&hits=${hits}&sort=${encodeURIComponent(sort)}&imageFlag=1`;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    // 楽天APIレート制限（毎秒1リクエスト程度）に配慮して1200msウェイト
    await sleep(1200);
    const res = await fetch(url);
    if (res.status === 429) {
      console.log(`[Rate Limit 429検知] 2秒待機して再試行中... (試行 ${attempt}/${retries})`);
      await sleep(2000);
      continue;
    }
    if (!res.ok) {
      throw new Error(`楽天APIエラー HTTP ${res.status}: ${await res.text()}`);
    }
    
    const data = await res.json();
    const rawItems = (data.Items || []).map(e => e.Item || e);
    
    return rawItems.map((item, idx) => {
      let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
      if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
        img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
      } else if (img.includes('tshop.r10s.jp/')) {
        img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
      }
      
      return {
        rank: idx + 1,
        itemCode: item.itemCode,
        itemName: item.itemName,
        catchcopy: item.catchcopy || '',
        itemPrice: item.itemPrice,
        priceFormatted: `${item.itemPrice.toLocaleString()}円 (税込)`,
        shopName: item.shopName,
        affiliateUrl: item.affiliateUrl,
        itemUrl: item.itemUrl,
        imageUrl: img,
        reviewAverage: item.reviewAverage || 4.5,
        reviewCount: item.reviewCount || 0
      };
    });
  }
  throw new Error(`楽天APIリトライ上限超過: ${keyword}`);
}
