import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtra() {
  console.log('追加アイテムの楽天API検索を開始します...');
  const extraQueries = [
    { cat: 'booster', q: 'ランコム ジェニフィック' },
    { cat: 'booster', q: 'メルヴィータ アルガンオイル' },
    { cat: 'booster', q: 'イニスフリー グリーンティー セラム' },
    { cat: 'booster', q: 'オバジC25セラム ネオ' },
    { cat: 'toneup', q: 'ポール ＆ ジョー プロテクティング ファンデーション プライマー' },
    { cat: 'toneup', q: 'コスメデコルテ フローレススキン グロウライザー' },
    { cat: 'toneup', q: 'ジルスチュアート ルーセントシフォン トーンアップ プライマー' },
    { cat: 'device', q: 'パナソニック バイタリフト かっさ EH-SP85' },
    { cat: 'device', q: 'SALONIA EMS リフトブラシ' },
    { cat: 'device', q: 'ミーゼ スカルプリフト' }
  ];

  let existing = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch6_items.json', 'utf8'));

  for (const item of extraQueries) {
    try {
      const res = await searchRakutenDirect(item.q, 5, '-reviewCount');
      if (item.cat === 'booster') {
        existing.theme1_booster.push(...res);
      } else if (item.cat === 'toneup') {
        existing.theme2_toneup.push(...res);
      } else if (item.cat === 'device') {
        existing.theme3_device.push(...res);
      }
      console.log(`取得成功: ${item.q} (${res.length}件)`);
    } catch (e) {
      console.warn(`取得エラー: ${item.q}`, e.message);
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

  existing.theme1_booster = dedupe(existing.theme1_booster);
  existing.theme2_toneup = dedupe(existing.theme2_toneup);
  existing.theme3_device = dedupe(existing.theme3_device);

  fs.writeFileSync('scratch/rakuten_winter_batch6_items.json', JSON.stringify(existing, null, 2), 'utf8');
  console.log(`✅ 補強完了！ booster=${existing.theme1_booster.length}, toneup=${existing.theme2_toneup.length}, device=${existing.theme3_device.length}`);
}

fetchExtra().catch(console.error);
