import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function fetchSeries14() {
  console.log('🍁 楽天OpenAPIより第14弾の最新商品データを取得開始...');

  // 1. ネック＆デコルテクリーム
  console.log('1. ネック＆デコルテクリーム検索中...');
  const rawNeck = await searchRakutenDirect('ネッククリーム デコルテ 首元 保湿', 20);
  
  // 2. ブースター・導入美容液
  console.log('2. ブースター・導入液検索中...');
  const rawBooster = await searchRakutenDirect('導入美容液 ブースター 保湿', 20);

  // 3. 静電気防止ヘアミスト
  console.log('3. ヘアミスト検索中...');
  const rawMist = await searchRakutenDirect('ヘアミスト 静電気 保湿', 20);

  const formatList = (items, categoryPrefix) => {
    return items
      .filter(item => item.itemName && item.itemPrice && item.imageUrl)
      .slice(0, 10)
      .map((item, idx) => ({
        rank: idx + 1,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        priceFormatted: `¥${Number(item.itemPrice).toLocaleString()}`,
        itemUrl: item.itemUrl,
        affiliateUrl: item.affiliateUrl || item.itemUrl,
        imageUrl: item.imageUrl,
        shopName: item.shopName || '楽天市場 取扱店',
        reviewCount: item.reviewCount || 0,
        reviewAverage: item.reviewAverage || 0,
        itemCode: item.itemCode || `${categoryPrefix}-${idx+1}`
      }));
  };

  const neckItems = formatList(rawNeck, 'neck');
  const boosterItems = formatList(rawBooster, 'booster');
  const mistItems = formatList(rawMist, 'mist');

  console.log(`取得完了: ネック=${neckItems.length}件, ブースター=${boosterItems.length}件, ミスト=${mistItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    neckItems,
    boosterItems,
    mistItems
  };

  fs.writeFileSync('scratch/autumn_series14_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('✅ scratch/autumn_series14_items.json に保存完了');
}

fetchSeries14().catch(err => {
  console.error('❌ 取得エラー:', err);
  process.exit(1);
});
