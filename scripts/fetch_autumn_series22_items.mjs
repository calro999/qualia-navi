// scripts/fetch_autumn_series22_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries22() {
  console.log('🍁 楽天OpenAPIより第22弾の最新商品データを厳選取得開始...');

  // 1. 高保湿リップライナー＆ボリュームプランプリップペンシル
  const rawLiner = await searchRakutenDirect('リップライナー 保湿 リップペンシル', 30);

  // 2. 高保湿リキッドアイシャドウ＆濡れツヤグロウカラー
  const rawLiquidEye = await searchRakutenDirect('リキッドアイシャドウ ツヤ', 30);

  // 3. 薬用・高保湿バスミルク＆うるおいスキンケア入浴液
  const rawBathMilk = await searchRakutenDirect('バスミルク 保湿 入浴剤 スキンケア', 30);

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

  const linerItems = formatList(rawLiner, 'lnr');
  const liquidEyeItems = formatList(rawLiquidEye, 'leye');
  const bathMilkItems = formatList(rawBathMilk, 'bmk');

  console.log(`厳選取得結果: リップライナー=${linerItems.length}件, リキッドシャドウ=${liquidEyeItems.length}件, バスミルク=${bathMilkItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    linerItems,
    liquidEyeItems,
    bathMilkItems
  };

  const outPath = path.join(__dirname, 'autumn_series22_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries22().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
