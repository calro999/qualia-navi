import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function fetchSeries17() {
  console.log('🍁 楽天OpenAPIより第17弾の最新商品データを取得開始...');

  // 1. 温感マッサージジェル＆クリーム
  console.log('1. 温感マッサージジェル検索中...');
  const rawMassage = await searchRakutenDirect('温感 マッサージジェル 保湿', 20);
  
  // 2. 高保湿リキッド＆クリームチーク
  console.log('2. リキッド＆クリームチーク検索中...');
  const rawBlush = await searchRakutenDirect('リキッドチーク 保湿', 20);

  // 3. 高保湿フットクリーム＆レッグケア
  console.log('3. フットクリーム検索中...');
  const rawFoot = await searchRakutenDirect('フットクリーム かかと 保湿', 20);

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

  const massageItems = formatList(rawMassage, 'massage');
  const blushItems = formatList(rawBlush, 'blush');
  const footItems = formatList(rawFoot, 'foot');

  console.log(`取得完了: 温感マッサージ=${massageItems.length}件, チーク=${blushItems.length}件, フットクリーム=${footItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    massageItems,
    blushItems,
    footItems
  };

  fs.writeFileSync('scratch/autumn_series17_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('✅ scratch/autumn_series17_items.json に保存完了');
}

fetchSeries17().catch(err => {
  console.error('❌ 取得エラー:', err);
  process.exit(1);
});
