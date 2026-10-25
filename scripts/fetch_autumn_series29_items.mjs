// scripts/fetch_autumn_series29_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries29() {
  console.log('🍁 楽天OpenAPIより第29弾の最新商品データを厳選取得開始...');

  // 1. リップスリーピングマスク＆濃厚リップバーム (皮剥け・縦ジワ・夜用リップケア)
  console.log('1. リップスリーピングマスク 取得中...');
  const rawLip = await searchRakutenDirect('リップスリーピングマスク 保湿 リップバーム', 30);

  // 2. 高保湿美容液化粧下地 (粉ふき防止・毛穴レス・トーンアップ)
  console.log('2. 高保湿美容液下地 取得中...');
  const rawPrimer = await searchRakutenDirect('化粧下地 保湿 美容液 ツヤ', 30);

  // 3. 高保湿入浴剤・重炭酸バスソルト (冷え性・乾燥肌・温活)
  console.log('3. 高保湿重炭酸入浴剤 取得中...');
  const rawBath = await searchRakutenDirect('入浴剤 重炭酸 保湿 乾燥', 30);

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

  const lipItems = formatList(rawLip, 'lip');
  const primerItems = formatList(rawPrimer, 'prm');
  const bathItems = formatList(rawBath, 'bth');

  console.log(`- リップマスク: ${lipItems.length}件`);
  console.log(`- 美容液化粧下地: ${primerItems.length}件`);
  console.log(`- 重炭酸入浴剤: ${bathItems.length}件`);

  const output = {
    lipItems,
    primerItems,
    bathItems
  };

  fs.writeFileSync(
    path.join(__dirname, 'autumn_series29_raw.json'),
    JSON.stringify(output, null, 2),
    'utf8'
  );
  console.log('✅ autumn_series29_raw.json に保存完了しました！');
}

fetchSeries29().catch(err => {
  console.error('❌ エラー発生:', err);
  process.exit(1);
});
