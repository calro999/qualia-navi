// scripts/fetch_autumn_series20_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries20() {
  console.log('🍁 楽天OpenAPIより第20弾の最新商品データを厳選取得開始...');

  // 1. 薬用・高保湿スカルプローション＆頭皮用美容液
  const rawScalp = await searchRakutenDirect('スカルプローション 頭皮 保湿 かゆみ', 30);

  // 2. 高保湿スティックアイシャドウ＆涙袋ライナー
  const rawShadow = await searchRakutenDirect('スティックアイシャドウ 涙袋', 30);

  // 3. 高濃度炭酸入浴剤＆薬用重炭酸タブレット
  const rawCarbonic = await searchRakutenDirect('重炭酸 入浴剤 炭酸 保湿 冷え', 30);

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

  const scalpItems = formatList(rawScalp, 'scl');
  const shadowItems = formatList(rawShadow, 'shd');
  const carbonicItems = formatList(rawCarbonic, 'crb');

  console.log(`厳選取得結果: スカルプ=${scalpItems.length}件, シャドウ=${shadowItems.length}件, 重炭酸=${carbonicItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    scalpItems,
    shadowItems,
    carbonicItems
  };

  const outPath = path.join(__dirname, 'autumn_series20_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries20().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
