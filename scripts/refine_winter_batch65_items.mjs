import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch65Items() {
  console.log('🔄 不足アイテムの追加取得を開始します...');
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch65_items.json', 'utf8'));

  // 1. ヒートブラシ (現在9件 -> 10件へ)
  if (data.theme1_heat_brush.length < 10) {
    const res = await searchRakutenDirect('クレイツ イオン ブラシアイロン', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古') && !data.theme1_heat_brush.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = 'create_ion_ceramic_straight_brush_iron';
      valid.displayBrand = 'クレイツ イオン ブラシアイロン エアクシオン エスペシャル ストレート カール マイナスイオン';
      data.theme1_heat_brush.push(valid);
      console.log(`✅ [ヒートブラシ追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 2. 加温フットバス (現在7件 -> 10件へ)
  const footBathQueries = [
    { brand: 'collapsible_smart_heated_foot_bath_spa', name: '足湯 フットバス 保温 折りたたみ 電気 加温機能 45度 バブル ジェット 足元冷え対策 むくみ改善', query: '足湯 フットバス 保温 折りたたみ' },
    { brand: 'electric_portable_heated_foot_soaking_bucket', name: 'フットバス 足湯 保温 加熱 足湯器 電気 バブル フットケア 自宅スパ リラックス 温活', query: 'フットバス 足湯 保温 加熱' },
    { brand: 'deep_soak_thermal_insulation_foot_bath_tub', name: '足湯器 保温 電気 バケツ 折りたたみ式 フットバス 足裏指圧 疲労回復 防寒 血行促進', query: '足湯器 保温 電気 バケツ' }
  ];

  for (const cfg of footBathQueries) {
    if (data.theme2_folding_foot_bath.length >= 10) break;
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古') && !data.theme2_folding_foot_bath.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.theme2_folding_foot_bath.push(valid);
      console.log(`✅ [フットバス追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 3. シルク手袋＆かかと (現在9件 -> 10件へ)
  if (data.theme3_silk_gloves_heel.length < 10) {
    const res = await searchRakutenDirect('シルク かかと靴下 角質 保湿', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 600 && !it.itemName.includes('中古') && !data.theme3_silk_gloves_heel.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = 'silk_intensive_heel_hydrating_care_socks';
      valid.displayBrand = 'シルク かかと保湿 靴下 角質ケア ひび割れ防止 つるつる 保湿ソックス 就寝用 乾燥対策';
      data.theme3_silk_gloves_heel.push(valid);
      console.log(`✅ [シルク手袋＆かかと追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 最終確認: ヒートブラシ=${data.theme1_heat_brush.length}件, 加温フットバス=${data.theme2_folding_foot_bath.length}件, シルク手袋＆かかと=${data.theme3_silk_gloves_heel.length}件`);
  fs.writeFileSync('scratch/rakuten_winter_batch65_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch65_items.json を更新しました。');
}

refineBatch65Items().catch(console.error);
