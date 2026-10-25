// scripts/fetch_autumn_series28_items.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchSeries28() {
  console.log('🍁 楽天OpenAPIより第28弾の最新商品データを厳選取得開始...');

  // 1. 高機能アイクリーム＆アイセラム (目元のちりめんジワ・まぶたの窪み・乾燥)
  console.log('1. 高機能アイクリーム＆アイセラム 取得中...');
  const rawEye = await searchRakutenDirect('アイクリーム レチノール 保湿', 30);

  // 2. 生ツヤ高保湿クッションファンデーション (粉ふき・皮脂テカリ・時短)
  console.log('2. 生ツヤ高保湿クッションファンデーション 取得中...');
  const rawCushion = await searchRakutenDirect('クッションファンデ ツヤ 美容液 保湿', 30);

  // 3. 薬用高保湿ボディソープ＆ミルクウォッシュ (乾燥かゆみ・背中ニキビ・セラミド)
  console.log('3. 薬用高保湿ボディソープ 取得中...');
  const rawBodyWash = await searchRakutenDirect('ボディソープ 高保湿 乾燥', 30);

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

  const eyeItems = formatList(rawEye, 'eye');
  const cushionItems = formatList(rawCushion, 'csh');
  const bodyWashItems = formatList(rawBodyWash, 'bdw');

  console.log(`- アイクリーム: ${eyeItems.length}件`);
  console.log(`- クッションファンデ: ${cushionItems.length}件`);
  console.log(`- 薬用ボディソープ: ${bodyWashItems.length}件`);

  const output = {
    eyeItems,
    cushionItems,
    bodyWashItems
  };

  fs.writeFileSync(
    path.join(__dirname, 'autumn_series28_raw.json'),
    JSON.stringify(output, null, 2),
    'utf8'
  );
  console.log('✅ autumn_series28_raw.json に保存完了しました！');
}

fetchSeries28().catch(err => {
  console.error('❌ エラー発生:', err);
  process.exit(1);
});
