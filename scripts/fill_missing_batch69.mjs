import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingItems() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch69_items.json', 'utf8'));

  // セラミックヒーター追加1件 (現在9件 -> 10件)
  console.log('セラミックヒーターの不足分を検索中...');
  const resCh = await searchRakutenDirect('セラミックファンヒーター 小型 人感センサー', 10, '-reviewCount');
  const existingChCodes = new Set(data.theme2_ceramic_fan_heater.map(i => i.itemCode));
  const newCh = resCh.find(it => it.imageUrl && it.itemPrice > 2500 && !existingChCodes.has(it.itemCode) && !it.itemName.includes('中古'));
  if (newCh) {
    newCh.brandKey = 'and_deca_modern_deco_compact_ceramic_heater';
    newCh.displayBrand = 'AND・DECO アンドデコ セラミックファンヒーター 人感センサー 1200W 速暖 小型 暖房 洗面所 脱衣所';
    data.theme2_ceramic_fan_heater.push(newCh);
    console.log(`✅ [セラミックヒーター追加] ${newCh.itemName.slice(0, 35)} (${newCh.priceFormatted})`);
  }

  await sleep(1500);

  // 目元美顔器追加2件 (現在8件 -> 10件)
  console.log('目元美顔器の不足分を検索中...');
  const resEye1 = await searchRakutenDirect('目元美顔器 EMS 温熱', 10, '-reviewCount');
  const existingEyeCodes = new Set(data.theme3_eye_ems_device.map(i => i.itemCode));
  const newEye1 = resEye1.find(it => it.imageUrl && it.itemPrice > 1800 && !existingEyeCodes.has(it.itemCode) && !it.itemName.includes('中古'));
  if (newEye1) {
    newEye1.brandKey = 'thermal_ems_red_led_eye_lifting_wand';
    newEye1.displayBrand = '目元美顔器 EMS 温熱 42℃ 赤色青色LED 音波振動 マイクロカレント アイマッサージャー 目元 クマ たるみ';
    data.theme3_eye_ems_device.push(newEye1);
    existingEyeCodes.add(newEye1.itemCode);
    console.log(`✅ [目元美顔器追加1] ${newEye1.itemName.slice(0, 35)} (${newEye1.priceFormatted})`);
  }

  await sleep(1500);

  const resEye2 = await searchRakutenDirect('アイクリーム レチノール 目元ケア 高保湿', 10, '-reviewCount');
  const newEye2 = resEye2.find(it => it.imageUrl && it.itemPrice > 1800 && !existingEyeCodes.has(it.itemCode) && !it.itemName.includes('中古'));
  if (newEye2) {
    newEye2.brandKey = 'retinol_intensive_wrinkle_repair_eye_cream';
    newEye2.displayBrand = '薬用 レチノール アイクリーム 高保湿 ナイアシンアミド シワ改善 美白 目元用集中ケアクリーム 美顔器併用';
    data.theme3_eye_ems_device.push(newEye2);
    console.log(`✅ [目元美顔器追加2] ${newEye2.itemName.slice(0, 35)} (${newEye2.priceFormatted})`);
  }

  console.log(`最終件数: テーマ1=${data.theme1_ultrasonic_treatment.length}件, テーマ2=${data.theme2_ceramic_fan_heater.length}件, テーマ3=${data.theme3_eye_ems_device.length}件`);
  fs.writeFileSync('scratch/rakuten_winter_batch69_items.json', JSON.stringify(data, null, 2), 'utf8');
}

fillMissingItems().catch(console.error);
