import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishBatch54Items() {
  console.log('🎯 [第54弾 アイテム精査＆各10アイテム確定] 楽天APIから厳選データを補完・確定します...');

  const batch54Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch54_items.json', 'utf8'));

  // 重複や不要品（シャンプーのみ、カートリッジのみ）を排除
  batch54Data.theme1_bubble_shower = batch54Data.theme1_bubble_shower.filter(it => {
    const n = it.itemName;
    if (n.includes('カートリッジ') && !n.includes('本体')) return false;
    if (it.itemPrice < 4000) return false;
    return true;
  });

  // --- テーマ1: シャワーヘッド を10件まで補充 ---
  console.log(`テーマ1 現状キープ: ${batch54Data.theme1_bubble_shower.length}件`);
  const showerKeywords = [
    'ナノバブル シャワーヘッド',
    'ウルトラファインバブル シャワーヘッド',
    'マイクロバブル シャワーヘッド 節水',
    'ミラブル シャワーヘッド',
    'ボリーナ シャワーヘッド'
  ];

  for (const kw of showerKeywords) {
    if (batch54Data.theme1_bubble_shower.length >= 10) break;
    const res = await searchRakutenDirect(kw, 10, '-reviewCount');
    for (const item of res) {
      if (batch54Data.theme1_bubble_shower.length >= 10) break;
      const n = item.itemName;
      if (item.itemPrice < 4000 || n.includes('中古') || n.includes('ホースのみ') || n.includes('フィルターのみ') || (n.includes('カートリッジ') && !n.includes('本体'))) continue;
      if (!batch54Data.theme1_bubble_shower.some(ex => ex.itemCode === item.itemCode)) {
        item.brandKey = `bubble_shower_${batch54Data.theme1_bubble_shower.length + 1}`;
        item.displayBrand = item.itemName.slice(0, 38);
        batch54Data.theme1_bubble_shower.push(item);
        console.log(`✅ [シャワーヘッド追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
      }
    }
    await sleep(1300);
  }

  // --- テーマ2: プロテオグリカン美容液 を10件まで補充 ---
  console.log(`\nテーマ2 現状キープ: ${batch54Data.theme2_proteo_serum.length}件`);
  // 重複チェック
  const uniqueProteo = [];
  const seenCodes = new Set();
  for (const it of batch54Data.theme2_proteo_serum) {
    if (!seenCodes.has(it.itemCode) && it.itemPrice >= 1200) {
      seenCodes.add(it.itemCode);
      uniqueProteo.push(it);
    }
  }
  batch54Data.theme2_proteo_serum = uniqueProteo;

  const proteoKeywords = [
    'プロテオグリカン 美容液 原液',
    'プロテオグリカン エッセンス',
    '水溶性 プロテオグリカン 美容液',
    'プロテオグリカン 原液 保湿'
  ];

  for (const kw of proteoKeywords) {
    if (batch54Data.theme2_proteo_serum.length >= 10) break;
    const res = await searchRakutenDirect(kw, 10, '-reviewCount');
    for (const item of res) {
      if (batch54Data.theme2_proteo_serum.length >= 10) break;
      const n = item.itemName;
      if (item.itemPrice < 1200 || n.includes('中古') || n.includes('サプリ') || n.includes('錠剤') || n.includes('カプセル') || n.includes('シャンプー')) continue;
      if (!batch54Data.theme2_proteo_serum.some(ex => ex.itemCode === item.itemCode)) {
        item.brandKey = `proteo_serum_${batch54Data.theme2_proteo_serum.length + 1}`;
        item.displayBrand = item.itemName.slice(0, 38);
        batch54Data.theme2_proteo_serum.push(item);
        console.log(`✅ [プロテオグリカン追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
      }
    }
    await sleep(1300);
  }

  // --- テーマ3: グルタチオン美容液 を10件まで補充 ---
  console.log(`\nテーマ3 現状キープ: ${batch54Data.theme3_glutathione_serum.length}件`);
  const uniqueGluta = [];
  const seenGlutaCodes = new Set();
  for (const it of batch54Data.theme3_glutathione_serum) {
    if (!seenGlutaCodes.has(it.itemCode) && it.itemPrice >= 1200) {
      seenGlutaCodes.add(it.itemCode);
      uniqueGluta.push(it);
    }
  }
  batch54Data.theme3_glutathione_serum = uniqueGluta;

  const glutaKeywords = [
    'グルタチオン 美容液',
    'グルタチオン セラム',
    '白玉 グルタチオン 美容液',
    'グルタチオン アンプル'
  ];

  for (const kw of glutaKeywords) {
    if (batch54Data.theme3_glutathione_serum.length >= 10) break;
    const res = await searchRakutenDirect(kw, 10, '-reviewCount');
    for (const item of res) {
      if (batch54Data.theme3_glutathione_serum.length >= 10) break;
      const n = item.itemName;
      if (item.itemPrice < 1200 || n.includes('中古') || n.includes('サプリ') || n.includes('錠剤') || n.includes('カプセル')) continue;
      if (!batch54Data.theme3_glutathione_serum.some(ex => ex.itemCode === item.itemCode)) {
        item.brandKey = `glutathione_serum_${batch54Data.theme3_glutathione_serum.length + 1}`;
        item.displayBrand = item.itemName.slice(0, 38);
        batch54Data.theme3_glutathione_serum.push(item);
        console.log(`✅ [グルタチオン追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
      }
    }
    await sleep(1300);
  }

  console.log(`\n🎉 確定結果:`);
  console.log(`- テーマ1 (シャワーヘッド): ${batch54Data.theme1_bubble_shower.length}件`);
  console.log(`- テーマ2 (プロテオグリカン): ${batch54Data.theme2_proteo_serum.length}件`);
  console.log(`- テーマ3 (グルタチオン): ${batch54Data.theme3_glutathione_serum.length}件`);

  fs.writeFileSync('scratch/rakuten_winter_batch54_items.json', JSON.stringify(batch54Data, null, 2), 'utf8');
}

finishBatch54Items();
