// scripts/fetch_autumn_series18_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries18() {
  console.log('🍁 楽天OpenAPIより第18弾の最新商品データを厳選取得開始...');

  // 1. 高保湿クレンジングジェル・バーム
  const rawCleansing = await searchRakutenDirect('クレンジングジェル 保湿 毛穴', 30);

  // 2. 高保湿コンシーラー＆目元ハイライト
  const rawConcealer = await searchRakutenDirect('コンシーラー クマ 保湿', 30);

  // 3. 高保湿バスオイル＆入浴美容液
  const rawBathOil = await searchRakutenDirect('バスオイル 保湿 入浴剤', 30);

  const formatList = (items, categoryPrefix, filterFn = () => true) => {
    const seenNames = new Set();
    const list = [];
    for (const item of items) {
      if (!item.itemName || !item.itemPrice || !item.imageUrl) continue;
      if (!filterFn(item)) continue;
      const coreName = item.itemName
        .replace(/【.*?】/g, '')
        .replace(/★.*?★/g, '')
        .replace(/＼.*?／/g, '')
        .replace(/\[.*?\]/g, '')
        .trim()
        .slice(0, 15);
      if (seenNames.has(coreName)) continue;
      seenNames.add(coreName);

      list.push({
        rank: list.length + 1,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        priceFormatted: `¥${Number(item.itemPrice).toLocaleString()}`,
        itemUrl: item.itemUrl,
        affiliateUrl: item.affiliateUrl || item.itemUrl,
        imageUrl: item.imageUrl,
        shopName: item.shopName || '楽天市場 取扱店',
        reviewCount: item.reviewCount || 0,
        reviewAverage: item.reviewAverage || 0,
        itemCode: item.itemCode || `${categoryPrefix}-${list.length + 1}`
      });
      if (list.length >= 10) break;
    }
    return list;
  };

  const cleansingItems = formatList(rawCleansing, 'clg');
  const concealerItems = formatList(rawConcealer, 'con', item => !item.itemName.includes('BBクリーム'));
  const bathOilItems = formatList(rawBathOil, 'bto', item => !item.itemName.includes('訳あり'));

  console.log(`厳選取得結果: クレンジング=${cleansingItems.length}件, コンシーラー=${concealerItems.length}件, バスオイル=${bathOilItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    cleansingItems,
    concealerItems,
    bathOilItems
  };

  const outPath = path.join(__dirname, 'autumn_series18_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries18().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
