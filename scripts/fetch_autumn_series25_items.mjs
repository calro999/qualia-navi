// scripts/fetch_autumn_series25_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries25() {
  console.log('🍁 楽天OpenAPIより第25弾の最新商品データを厳選取得開始...');

  // 1. プレストパウダー (保湿・乾燥崩れ・テカリ防止)
  console.log('1. プレストパウダー 取得中...');
  const rawPowder = await searchRakutenDirect('プレストパウダー 保湿 乾燥', 30);

  // 2. ネッククリーム・デコルテ (首のシワ・保湿・エイジングケア)
  console.log('2. ネッククリーム 取得中...');
  const [rawNeck1, rawNeck2] = await Promise.all([
    searchRakutenDirect('首 シワ クリーム 保湿 デコルテ', 30),
    searchRakutenDirect('ネッククリーム 首用 首元', 30)
  ]);
  const rawNeck = [...rawNeck1, ...rawNeck2];

  // 3. ネイルオイル・補修セラム (爪 縦筋 割れ 保湿)
  console.log('3. ネイルオイル 取得中...');
  const rawNail = await searchRakutenDirect('ネイルオイル 爪 補修 保湿 美容液', 30);

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

  const powderItems = formatList(rawPowder, 'pwd');
  const neckItems = formatList(rawNeck, 'nck', it => 
    it.itemName.includes('首') || 
    it.itemName.includes('ネック') || 
    it.itemName.includes('美くび') ||
    it.itemName.includes('デコルテ')
  );
  const nailItems = formatList(rawNail, 'nal');

  console.log(`厳選取得結果: プレストパウダー=${powderItems.length}件, ネッククリーム=${neckItems.length}件, ネイルオイル=${nailItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    powderItems,
    neckItems,
    nailItems
  };

  const outPath = path.join(__dirname, 'autumn_series25_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries25().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
