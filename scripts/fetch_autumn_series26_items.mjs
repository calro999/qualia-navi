// scripts/fetch_autumn_series26_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries26() {
  console.log('🍁 楽天OpenAPIより第26弾の最新商品データを厳選取得開始...');

  // 1. ピーリング美容液 (角質柔軟・毛穴・マイルドピール)
  console.log('1. ピーリング美容液 取得中...');
  const [rawPeel1, rawPeel2] = await Promise.all([
    searchRakutenDirect('ピーリング 美容液 角質 毛穴', 30),
    searchRakutenDirect('角質美容液 ピール 導入液', 30)
  ]);
  const rawPeel = [...rawPeel1, ...rawPeel2];

  // 2. リキッドチーク (美容液・ツヤ・高保湿)
  console.log('2. リキッドチーク 取得中...');
  const rawCheek = await searchRakutenDirect('リキッドチーク チーク ツヤ 保湿', 30);

  // 3. ナイトリペアクリーム (寝ている間の乾燥小ジワ・高保湿・セラミド＆レチノール)
  console.log('3. ナイトリペアクリーム 取得中...');
  const [rawNight1, rawNight2] = await Promise.all([
    searchRakutenDirect('ナイトクリーム 高保湿 エイジングケア', 30),
    searchRakutenDirect('ナイトリペアクリーム 夜用 フェイスクリーム 保湿', 30)
  ]);
  const rawNight = [...rawNight1, ...rawNight2];

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

  const peelItems = formatList(rawPeel, 'pel', it => !it.itemName.includes('美顔器') && !it.itemName.includes('超音波'));
  const cheekItems = formatList(rawCheek, 'chk');
  const nightItems = formatList(rawNight, 'ngt', it => it.itemName.includes('クリーム') && !it.itemName.includes('ローション'));

  console.log(`厳選取得結果: ピーリング美容液=${peelItems.length}件, リキッドチーク=${cheekItems.length}件, ナイトクリーム=${nightItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    peelItems,
    cheekItems,
    nightItems
  };

  const outPath = path.join(__dirname, 'autumn_series26_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries26().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
