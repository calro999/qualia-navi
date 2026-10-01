import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch16() {
  console.log('🔄 一部ブランドのキーワード最適化・追加取得を開始します...');
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch16_items.json', 'utf8'));

  const additionalEyesshadow = [
    'シャネル レキャトルオンブル',
    'アディクション アイシャドウ パレット'
  ];
  for (const q of additionalEyesshadow) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      current.theme1_eyeshadow.unshift(...res);
    } catch (e) {
      console.warn(e.message);
    }
    await sleep(1300);
  }

  const additionalDayCream = [
    'ラロッシュポゼ トーンアップ ローズ',
    'POLA BA ライトセレクター'
  ];
  for (const q of additionalDayCream) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      current.theme2_daycream.unshift(...res);
    } catch (e) {
      console.warn(e.message);
    }
    await sleep(1300);
  }

  function dedupe(items) {
    const seen = new Set();
    const result = [];
    for (const it of items) {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) continue;
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり') || it.itemName.includes('アウトレット') || it.itemName.includes('ジャンク')) continue;
      if (!seen.has(it.itemCode) && !seen.has(it.itemName)) {
        seen.add(it.itemCode);
        seen.add(it.itemName);
        result.push(it);
      }
    }
    return result;
  }

  current.theme1_eyeshadow = dedupe(current.theme1_eyeshadow);
  current.theme2_daycream = dedupe(current.theme2_daycream);
  current.theme3_gift = dedupe(current.theme3_gift);

  console.log('補完後の件数:');
  console.log('- アイシャドウ:', current.theme1_eyeshadow.length);
  console.log('- UVデイクリーム:', current.theme2_daycream.length);
  console.log('- ギフトコスメ:', current.theme3_gift.length);

  fs.writeFileSync('scratch/rakuten_winter_batch16_items.json', JSON.stringify(current, null, 2), 'utf8');
  console.log('✅ 補完完了！');
}

supplementBatch16();
