import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtraLipItems() {
  const extraQueries = [
    'MAC ラスターガラス リップスティック',
    'セルヴォーク ディグニファイド リップス 09',
    'カネボウ ルージュスターヴァイブラント',
    'ビーアイドル つやぷるリップ'
  ];

  let extraItems = [];
  for (const q of extraQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      extraItems.push(...res);
    } catch (err) {
      console.warn(`エラー: ${err.message}`);
    }
    await sleep(1300);
  }

  const batch7Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch7_items.json', 'utf8'));
  const currentLip = batch7Data.theme1_lip || [];

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

  const merged = dedupe([...currentLip, ...extraItems]);
  batch7Data.theme1_lip = merged.slice(0, 40);
  fs.writeFileSync('scratch/rakuten_winter_batch7_items.json', JSON.stringify(batch7Data, null, 2), 'utf8');
  console.log(`✅ リップ追加完了: 合計 ${batch7Data.theme1_lip.length} 件`);
}

fetchExtraLipItems().catch(console.error);
