// scripts/fetch_autumn_series23_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries23() {
  console.log('🍁 楽天OpenAPIより第23弾の最新商品データを厳選取得開始...');

  // 1. 薬用美白＆高保湿ハンドセラム・手元エイジングケア美容液
  const rawHandSerum = await searchRakutenDirect('ハンド美容液 保湿 手荒れ', 30);

  // 2. 高濃度まつ毛美容液＆まつ毛トリートメントコーティング
  const rawLash = await searchRakutenDirect('まつ毛美容液 まつげ 美容液 保湿', 30);

  // 3. 高純度ホホバオイル＆天然オーガニックマルチオイル
  const rawJojoba = await searchRakutenDirect('ホホバオイル オーガニック 美容オイル スキンケア', 30);

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

  const handSerumItems = formatList(rawHandSerum, 'hds');
  const lashItems = formatList(rawLash, 'lsh');
  const jojobaItems = formatList(rawJojoba, 'job', item => !item.itemName.includes('犬') && !item.itemName.includes('ペット'));

  console.log(`厳選取得結果: ハンドセラム=${handSerumItems.length}件, まつ毛美容液=${lashItems.length}件, ホホバオイル=${jojobaItems.length}件`);

  const result = {
    fetchedAt: new Date().toISOString(),
    handSerumItems,
    lashItems,
    jojobaItems
  };

  const outPath = path.join(__dirname, 'autumn_series23_raw_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`[保存完了] ${outPath}`);
}

fetchSeries23().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
