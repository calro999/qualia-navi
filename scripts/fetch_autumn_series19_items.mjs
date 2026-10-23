// scripts/fetch_autumn_series19_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries19() {
  console.log('🍁 楽天OpenAPIより第19弾の最新商品データを厳選取得開始...');

  // 1. 高保湿リップトリートメント＆ナイトリップマスク
  const rawLip = await searchRakutenDirect('リップトリートメント 保湿 リップケア', 30);

  // 2. 高保湿美容液プライマー＆うるおい下地
  const rawPrimer = await searchRakutenDirect('化粧下地 保湿 美容液 プライマー', 30);

  // 3. ホットアイマスク＆温感アイケア
  const rawEye = await searchRakutenDirect('ホットアイマスク 温感 アイケア 充電式', 30);

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

  const lipItems = formatList(rawLip, 'lip', item => !item.itemName.includes('美顔器'));
  const primerItems = formatList(rawPrimer, 'prm', item => !item.itemName.includes('セット') && !item.itemName.includes('BBクリーム'));
  const eyeItems = formatList(rawEye, 'eye', item => !item.itemName.includes('カバー') && !item.itemName.includes('スペア'));

  console.log(`厳選取得結果: リップケア=${lipItems.length}件, プライマー=${primerItems.length}件, アイケア=${eyeItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    lipItems,
    primerItems,
    eyeItems
  };

  const outPath = path.join(__dirname, 'autumn_series19_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries19().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
