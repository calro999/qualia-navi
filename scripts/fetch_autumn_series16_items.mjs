import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function fetchSeries16() {
  console.log('🍁 楽天OpenAPIより第16弾の最新商品データを取得開始...');

  // 1. 酵素洗顔パウダー (毛穴・くすみ・古い角質)
  console.log('1. 酵素洗顔パウダー検索中...');
  const rawEnzyme = await searchRakutenDirect('酵素洗顔 パウダー 保湿 毛穴', 20);
  
  // 2. 高保湿メイクキープミスト (乾燥崩れ・粉吹き防止)
  console.log('2. メイクキープミスト検索中...');
  const rawSetting = await searchRakutenDirect('メイクキープミスト 保湿', 20);

  // 3. 唇用スクラブ＆リップゴマージュ (唇の皮剥け・ガサガサ)
  console.log('3. リップスクラブ検索中...');
  const rawScrub = await searchRakutenDirect('リップスクラブ 保湿 唇ケア', 20);

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

  const enzymeItems = formatList(rawEnzyme, 'enzyme');
  const settingItems = formatList(rawSetting, 'setting');
  const scrubItems = formatList(rawScrub, 'scrub');

  console.log(`取得完了: 酵素洗顔=${enzymeItems.length}件, メイクキープ=${settingItems.length}件, リップスクラブ=${scrubItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    enzymeItems,
    settingItems,
    scrubItems
  };

  fs.writeFileSync('scratch/autumn_series16_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('✅ scratch/autumn_series16_items.json に保存完了');
}

fetchSeries16().catch(err => {
  console.error('❌ 取得エラー:', err);
  process.exit(1);
});
