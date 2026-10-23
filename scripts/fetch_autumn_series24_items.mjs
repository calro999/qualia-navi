// scripts/fetch_autumn_series24_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries24() {
  console.log('🍁 楽天OpenAPIより第24弾の最新商品データを厳選取得開始...');

  // 1. クレンジングミルク (乾燥・毛穴・敏感肌)
  console.log('1. クレンジングミルク 取得中...');
  const rawMilk = await searchRakutenDirect('クレンジングミルク 保湿', 30);

  // 2. スティックコンシーラー (美容液・乾燥小ジワ・高密着)
  console.log('2. スティックコンシーラー 取得中...');
  const rawStick = await searchRakutenDirect('コンシーラー カバー スティック', 30);

  // 3. かかとクリーム・バーム (乾燥・ひび割れ・角質柔軟・尿素)
  console.log('3. かかと保湿クリーム 取得中...');
  const rawFoot = await searchRakutenDirect('かかと クリーム 尿素 保湿', 30);

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

  const milkItems = formatList(rawMilk, 'mlk', it => !it.itemName.includes('発酵 3点'));
  const stickItems = formatList(rawStick, 'stk', it => !it.itemName.includes('リップバーム'));
  const footItems = formatList(rawFoot, 'fot', it => it.itemName.includes('かかと') || it.itemName.includes('コウンバル'));

  console.log(`厳選取得結果: クレンジングミルク=${milkItems.length}件, スティックコンシーラー=${stickItems.length}件, かかとクリーム=${footItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    milkItems,
    stickItems,
    footItems
  };

  const outPath = path.join(__dirname, 'autumn_series24_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries24().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
