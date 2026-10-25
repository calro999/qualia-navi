// scripts/fetch_autumn_series27_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries27() {
  console.log('🍁 楽天OpenAPIより第27弾の最新商品データを厳選取得開始...');

  // 1. 炭酸パック・炭酸泡洗顔 (くすみ・血行促進・毛穴)
  console.log('1. 炭酸パック・炭酸泡洗顔 取得中...');
  const rawCarbon = await searchRakutenDirect('炭酸パック 毛穴 保湿', 30);

  // 2. アイブロウコート・眉ティント (消えない・眉尻キープ・ウォータープルーフ)
  console.log('2. アイブロウコート・眉ティント 取得中...');
  const rawBrow = await searchRakutenDirect('眉ティント アイブロウ 落ちない', 30);

  // 3. クリームシャンプー (頭皮乾燥・ヘッドスパ・うるおい)
  console.log('3. クリームシャンプー 取得中...');
  const rawShampoo = await searchRakutenDirect('クリームシャンプー オールインワン 保湿 頭皮', 30);

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

  const carbonItems = formatList(rawCarbon, 'cbn');
  const browItems = formatList(rawBrow, 'brw');
  const shampooItems = formatList(rawShampoo, 'shp');

  console.log(`厳選取得結果: 炭酸パック・洗顔=${carbonItems.length}件, 眉ティント・落ちないアイブロウ=${browItems.length}件, クリームシャンプー=${shampooItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    carbonItems,
    browItems,
    shampooItems
  };

  const outPath = path.join(__dirname, 'autumn_series27_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries27().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
