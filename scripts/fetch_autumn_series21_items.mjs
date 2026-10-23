// scripts/fetch_autumn_series21_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries21() {
  console.log('🍁 楽天OpenAPIより第21弾の最新商品データを厳選取得開始...');

  // 1. 高保湿ミスト化粧水＆オイルインセラムミスト
  const rawMist = await searchRakutenDirect('ミスト化粧水 保湿 オイル スプレー', 30);

  // 2. 薬用・高保湿ボディピーリング＆角質クリアジェル
  const rawPeel = await searchRakutenDirect('ボディ ピーリングジェル 角質 保湿', 30);

  // 3. 高純度エプソムソルト＆マグネシウム入浴剤
  const rawSalt = await searchRakutenDirect('エプソムソルト マグネシウム 入浴剤 保湿', 30);

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

  const mistItems = formatList(rawMist, 'mst');
  const peelItems = formatList(rawPeel, 'pel');
  const saltItems = formatList(rawSalt, 'slt');

  console.log(`厳選取得結果: ミスト=${mistItems.length}件, ピーリング=${peelItems.length}件, エプソムソルト=${saltItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    mistItems,
    peelItems,
    saltItems
  };

  const outPath = path.join(__dirname, 'autumn_series21_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries21().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
