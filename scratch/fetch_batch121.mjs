import fs from 'fs';

const APP_ID = '1016259074853036495';
const AFFILIATE_ID = '4ebd0545.98fae6cc.4ebd0546.90c88bc6';

const BATCH_ITEMS = [
  {
    slug: 'art-medicinal-myoban-deodorant-spray-powder-10sen-2026',
    searchKeyword: 'ミョウバン スプレー'
  },
  {
    slug: 'art-pure-castor-oil-organic-pack-warm-care-10sen-2026',
    searchKeyword: 'ヒマシ油'
  },
  {
    slug: 'art-ultrasonic-water-flosser-jet-washer-portable-10sen-2026',
    searchKeyword: 'ジェットウォッシャー'
  },
  {
    slug: 'art-high-concentration-idebenone-antioxidant-ampoule-10sen-2026',
    searchKeyword: 'イデベノン'
  }
];

async function fetchRakutenItems(keyword) {
  const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId=${APP_ID}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(keyword)}&hits=10&sort=-reviewCount&imageFlag=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.Items || data.Items.length === 0) {
      console.warn(`[WARN] No items found for: ${keyword}`);
      return [];
    }
    return data.Items.map(item => {
      const it = item.Item;
      let img = it.mediumImageUrls?.[0]?.imageUrl || it.smallImageUrls?.[0]?.imageUrl || '';
      img = img.replace('?_ex=128x128', '?_ex=500x500').replace('?_ex=64x64', '?_ex=500x500');
      return {
        name: it.itemName,
        price: it.itemPrice,
        url: it.affiliateUrl || it.itemUrl,
        image: img,
        shop: it.shopName,
        reviewCount: it.reviewCount,
        reviewAverage: it.reviewAverage,
        itemCode: it.itemCode
      };
    });
  } catch (err) {
    console.error(`[ERROR] Fetch failed for ${keyword}:`, err);
    return [];
  }
}

async function run() {
  const results = {};
  for (const t of BATCH_ITEMS) {
    console.log(`Fetching: ${t.slug} (${t.searchKeyword})...`);
    results[t.slug] = await fetchRakutenItems(t.searchKeyword);
    console.log(`Found ${results[t.slug].length} items for ${t.searchKeyword}`);
    await new Promise(r => setTimeout(r, 600));
  }
  fs.writeFileSync('scratch/batch121_rakuten.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('Done! Saved to scratch/batch121_rakuten.json');
}

run();
