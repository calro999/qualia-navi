import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishBatch53Items() {
  console.log('🎯 [第53弾 アイテム精査＆30アイテム確定] 楽天APIから厳選データを補完・確定します...');

  const batch53Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch53_items.json', 'utf8'));

  // --- テーマ1: フェイス用エクソソーム美容液に厳選 ---
  // ハンドクリームやまつ毛美容液を除外
  batch53Data.theme1_exosome_serum = batch53Data.theme1_exosome_serum.filter(it => {
    const n = it.itemName;
    if (n.includes('ハンドクリーム') || n.includes('まつ毛') || n.includes('まつげ')) return false;
    return true;
  });

  console.log(`テーマ1 現状キープ: ${batch53Data.theme1_exosome_serum.length}件`);

  // 「エクソソーム 美容液」で検索して、上位レビューの美容液を追加
  const exosomeSearch = await searchRakutenDirect('エクソソーム 美容液', 15, '-reviewCount');
  for (const item of exosomeSearch) {
    if (batch53Data.theme1_exosome_serum.length >= 10) break;
    const name = item.itemName;
    if (name.includes('まつ毛') || name.includes('ハンド') || name.includes('中古') || item.itemPrice < 2000) continue;
    if (!batch53Data.theme1_exosome_serum.some(ex => ex.itemCode === item.itemCode)) {
      item.brandKey = `exosome_serum_${batch53Data.theme1_exosome_serum.length + 1}`;
      item.displayBrand = item.itemName.slice(0, 35);
      batch53Data.theme1_exosome_serum.push(item);
      console.log(`✅ [テーマ1追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
    }
  }

  // --- テーマ2: 超音波トリートメントアイロン 10件に確定 ---
  console.log(`テーマ2 現状キープ: ${batch53Data.theme2_ultrasonic_iron.length}件`);
  const ultrasonicSearch = await searchRakutenDirect('超音波トリートメント', 15, '-reviewCount');
  for (const item of ultrasonicSearch) {
    if (batch53Data.theme2_ultrasonic_iron.length >= 10) break;
    const name = item.itemName;
    if (name.includes('シャンプーのみ') || name.includes('中古') || item.itemPrice < 5000) continue;
    if (!batch53Data.theme2_ultrasonic_iron.some(ex => ex.itemCode === item.itemCode)) {
      item.brandKey = `ultrasonic_iron_${batch53Data.theme2_ultrasonic_iron.length + 1}`;
      item.displayBrand = item.itemName.slice(0, 35);
      batch53Data.theme2_ultrasonic_iron.push(item);
      console.log(`✅ [テーマ2追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
    }
  }

  // --- テーマ3: IPL光美容器 10件に確定 ---
  console.log(`テーマ3 現状キープ: ${batch53Data.theme3_ipl_device.length}件`);
  const iplSearch = await searchRakutenDirect('IPL 脱毛器 光美容器', 15, '-reviewCount');
  for (const item of iplSearch) {
    if (batch53Data.theme3_ipl_device.length >= 10) break;
    const name = item.itemName;
    if (name.includes('中古') || item.itemPrice < 10000) continue;
    if (!batch53Data.theme3_ipl_device.some(ex => ex.itemCode === item.itemCode)) {
      item.brandKey = `ipl_device_${batch53Data.theme3_ipl_device.length + 1}`;
      item.displayBrand = item.itemName.slice(0, 35);
      batch53Data.theme3_ipl_device.push(item);
      console.log(`✅ [テーマ3追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
    }
  }

  console.log(`\n🎉 確定結果:`);
  console.log(`- テーマ1: ${batch53Data.theme1_exosome_serum.length}件`);
  console.log(`- テーマ2: ${batch53Data.theme2_ultrasonic_iron.length}件`);
  console.log(`- テーマ3: ${batch53Data.theme3_ipl_device.length}件`);

  fs.writeFileSync('scratch/rakuten_winter_batch53_items.json', JSON.stringify(batch53Data, null, 2), 'utf8');
}

finishBatch53Items();
