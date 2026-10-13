import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function fetchSeries15() {
  console.log('🍁 楽天OpenAPIより第15弾の最新商品データを取得開始...');

  // 1. 高保湿アイクリーム
  console.log('1. アイクリーム検索中...');
  const rawEye = await searchRakutenDirect('アイクリーム 目元 保湿 シワ', 20);
  
  // 2. フェイシャルオイル（先行導入オイル）
  console.log('2. フェイスオイル検索中...');
  const rawOil = await searchRakutenDirect('フェイスオイル 保湿', 20);

  // 3. CICA＆セラミド低刺激バーム・クリーム
  console.log('3. シカクリーム・バーム検索中...');
  const rawCica = await searchRakutenDirect('シカクリーム 保湿', 20);

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

  const eyeItems = formatList(rawEye, 'eye');
  const oilItems = formatList(rawOil, 'oil');
  const cicaItems = formatList(rawCica, 'cica');

  console.log(`取得完了: アイ=${eyeItems.length}件, オイル=${oilItems.length}件, CICAバーム=${cicaItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    eyeItems,
    oilItems,
    cicaItems
  };

  fs.writeFileSync('scratch/autumn_series15_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('✅ scratch/autumn_series15_items.json に保存完了');
}

fetchSeries15().catch(err => {
  console.error('❌ 取得エラー:', err);
  process.exit(1);
});
