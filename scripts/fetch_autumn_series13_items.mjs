import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function fetchSeries13() {
  console.log('🍁 楽天OpenAPIより第13弾の最新商品データを取得開始...');

  // 1. ハンド＆ネイルクリーム (手荒れ・ささくれ・水仕事の乾燥)
  console.log('1. ハンド＆ネイルクリーム検索中...');
  const rawHand = await searchRakutenDirect('ハンドクリーム 高保湿', 20);
  
  // 2. スカルプケアエッセンス・頭皮用美容液 (秋の抜け毛・乾燥フケ・頭皮のかゆみ)
  console.log('2. スカルプエッセンス・頭皮美容液検索中...');
  const rawScalp = await searchRakutenDirect('スカルプ エッセンス 頭皮 美容液 保湿', 15);

  // 3. ナイトスリーピングマスク・夜用濃密ジェル (暖房・寝ている間の乾燥砂漠化)
  console.log('3. ナイトスリーピングマスク検索中...');
  const rawNight = await searchRakutenDirect('スリーピングマスク ナイト パック 保湿', 15);

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

  const handItems = formatList(rawHand, 'hand');
  const scalpItems = formatList(rawScalp, 'scalp');
  const nightItems = formatList(rawNight, 'night');

  console.log(`取得完了: ハンド=${handItems.length}件, スカルプ=${scalpItems.length}件, ナイトパック=${nightItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    handItems,
    scalpItems,
    nightItems
  };

  fs.writeFileSync('scratch/autumn_series13_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('✅ scratch/autumn_series13_items.json に保存完了');
}

fetchSeries13().catch(err => {
  console.error('❌ 取得エラー:', err);
  process.exit(1);
});
