import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch54Items() {
  console.log('✨ [第54弾 アイテム厳選ブラッシュアップ] 100%テーマに合致するコスメ・美容アイテムに差し替えます...');

  const batch54Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch54_items.json', 'utf8'));

  // --- テーマ2: プロテオグリカン美容液の純化 ---
  // プロテオグリカンがメインのアイテムのみを残す
  batch54Data.theme2_proteo_serum = batch54Data.theme2_proteo_serum.filter(it => {
    const n = it.itemName;
    if (n.includes('ビタミンC誘導体 10％配合 化粧水')) return false;
    if (n.includes('ヒト幹細胞順化培養液原液 10％配合')) return false;
    if (n.includes('ナイアシンアミド') && !n.includes('プロテオ')) return false;
    return n.includes('プロテオグリカン') || n.includes('プロセラ');
  });

  console.log(`テーマ2 純化後残存数: ${batch54Data.theme2_proteo_serum.length}件`);

  const pQueries = [
    'ナチュドール プロテオグリカン原液',
    'トゥヴェール プロテオグリカン原液',
    'プロセラ原液 プロテオグリカン',
    '雪華ひとひら プロテオグリカン',
    '水溶性 プロテオグリカン原液',
    'あおもりPG プロテオグリカン 原液',
    'プロテオグリカン 美容液 エッセンス',
    'プロテオグリカン 100% 原液'
  ];

  for (const q of pQueries) {
    if (batch54Data.theme2_proteo_serum.length >= 10) break;
    const res = await searchRakutenDirect(q, 6, '-reviewCount');
    for (const item of res) {
      if (batch54Data.theme2_proteo_serum.length >= 10) break;
      const n = item.itemName;
      if (!n.includes('プロテオグリカン') && !n.includes('プロセラ')) continue;
      if (n.includes('中古') || n.includes('サプリ') || n.includes('錠剤') || item.itemPrice < 1200) continue;
      if (!batch54Data.theme2_proteo_serum.some(ex => ex.itemCode === item.itemCode)) {
        item.brandKey = `proteo_pure_${batch54Data.theme2_proteo_serum.length + 1}`;
        item.displayBrand = item.itemName.slice(0, 38);
        batch54Data.theme2_proteo_serum.push(item);
        console.log(`✅ [プロテオグリカン確定] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
      }
    }
    await sleep(1300);
  }

  // --- テーマ3: グルタチオン美容液の純化 ---
  batch54Data.theme3_glutathione_serum = batch54Data.theme3_glutathione_serum.filter(it => {
    const n = it.itemName;
    if (n.includes('化粧水') && n.includes('BIG TONER')) return false;
    if (n.includes('タカミスキンピール')) return false;
    if (n.includes('3STEP ビタケア')) return false;
    return true;
  });

  console.log(`テーマ3 純化後残存数: ${batch54Data.theme3_glutathione_serum.length}件`);

  const gQueries = [
    'グルタチオン 美容液 ナンバーズイン',
    'グルタチオン アンプル メディキューブ',
    'アヌア ダークスポットセラム',
    'ネイチャーリパブリック ビタペアC セラム 美容液',
    'KISO ホワイトエッセンス GL グルタチオン',
    'グルタチオン セラム 韓国',
    'グルタチオン ビタミンC 美容液',
    'グルタチオン トーンアップ 美容液'
  ];

  for (const q of gQueries) {
    if (batch54Data.theme3_glutathione_serum.length >= 10) break;
    const res = await searchRakutenDirect(q, 6, '-reviewCount');
    for (const item of res) {
      if (batch54Data.theme3_glutathione_serum.length >= 10) break;
      const n = item.itemName;
      if (n.includes('サプリ') || n.includes('中古') || item.itemPrice < 1500) continue;
      if (!batch54Data.theme3_glutathione_serum.some(ex => ex.itemCode === item.itemCode)) {
        item.brandKey = `gluta_pure_${batch54Data.theme3_glutathione_serum.length + 1}`;
        item.displayBrand = item.itemName.slice(0, 38);
        batch54Data.theme3_glutathione_serum.push(item);
        console.log(`✅ [グルタチオン確定] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
      }
    }
    await sleep(1300);
  }

  console.log('\n=== 最終結果 ===');
  console.log(`- テーマ1: ${batch54Data.theme1_bubble_shower.length}件`);
  console.log(`- テーマ2: ${batch54Data.theme2_proteo_serum.length}件`);
  console.log(`- テーマ3: ${batch54Data.theme3_glutathione_serum.length}件`);

  fs.writeFileSync('scratch/rakuten_winter_batch54_items.json', JSON.stringify(batch54Data, null, 2), 'utf8');
}

refineBatch54Items();
