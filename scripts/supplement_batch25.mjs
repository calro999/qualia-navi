import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch25() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch25_items.json', 'utf8'));

  // 不足分ヘアスティック (2件)
  const hairSupplements = [
    { brand: 'cezanne_hair_care_mascara', name: 'セザンヌ ヘアケアマスカラ 00 クリア', query: 'セザンヌ ヘアケアマスカラ' },
    { brand: 'lucidol_hair_stick', name: 'ルシードエル #マルチアレンジスティック エクストラハード', query: 'ルシードエル マルチアレンジスティック' }
  ];

  for (const cfg of hairSupplements) {
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.theme1_hairstick.push(valid);
      console.log(`✅ [追加ヘアスティック] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 不足分トナーパッド (1件)
  const tonerSupplements = [
    { brand: 'goodal_green_tangerine_pad', name: 'goodal グーダル 青みかん ビタC トナーパッド', query: 'グーダル 青みかん トナーパッド' }
  ];

  for (const cfg of tonerSupplements) {
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.theme3_tonerpad.push(valid);
      console.log(`✅ [追加トナーパッド] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch25_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`🎉 補完完了！ テーマ1=${data.theme1_hairstick.length}/10, テーマ2=${data.theme2_healinglip.length}/10, テーマ3=${data.theme3_tonerpad.length}/10`);
}

supplementBatch25().catch(console.error);
