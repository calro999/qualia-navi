import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch67() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch67_items.json', 'utf8'));

  // 1. MYTREX PROVE 本体の再取得
  console.log('--- MYTREX PROVE 本体の再取得 ---');
  try {
    const res = await searchRakutenDirect('MYTREX 電気ブラシ', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 10000 && !it.itemName.includes('専用') && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'mytrex_prove_electric_pulse_scalp_face_lift';
      valid.displayBrand = 'MYTREX PROVE マイトレックス プルーヴ 電気バリブラシ EMS パルス マイクロカレント 表情筋 リフトケア';
      const idx = data.theme2_ems_scalp_lift_brush.findIndex(e => e.brandKey === 'mytrex_prove_electric_pulse_scalp_face_lift');
      if (idx !== -1) {
        data.theme2_ems_scalp_lift_brush[idx] = valid;
      } else {
        data.theme2_ems_scalp_lift_brush.push(valid);
      }
      console.log(`✅ MYTREX本体更新: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  } catch (e) {
    console.error('MYTREX再取得エラー:', e.message);
  }
  await sleep(1300);

  // 2. ANLAN 電気ブラシ
  console.log('--- ANLAN 電気ブラシの取得 ---');
  try {
    const res = await searchRakutenDirect('ANLAN 電気ブラシ', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'anlan_ems_head_spa_scalp_lift_brush_led';
      valid.displayBrand = 'ANLAN EMS スカルプブラシ 電気ブラシ 赤色青色LED 振動エステ イオン導出入 頭皮マッサージ フェイスケア';
      data.theme2_ems_scalp_lift_brush.push(valid);
      console.log(`✅ ANLAN追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  } catch (e) {
    console.error('ANLAN取得エラー:', e.message);
  }
  await sleep(1300);

  // 3. アデランス or EMSリフトブラシ
  console.log('--- EMSリフトブラシの取得 ---');
  try {
    const res = await searchRakutenDirect('EMSリフトブラシ 頭皮 顔', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 4000 && !it.itemName.includes('中古') && !data.theme2_ems_scalp_lift_brush.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = 'aderans_smasbeat_ems_lift_brush_led_care';
      valid.displayBrand = 'アデランス スマスビート EMSリフトブラシ 頭皮ケア 赤色LED バイブレーション スカルプ美顔器';
      data.theme2_ems_scalp_lift_brush.push(valid);
      console.log(`✅ EMSブラシ追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  } catch (e) {
    console.error('EMSブラシ取得エラー:', e.message);
  }
  await sleep(1300);

  // 4. ジョンマスターオーガニック ギフトセット
  console.log('--- ジョンマスター ギフトセットの取得 ---');
  try {
    const res = await searchRakutenDirect('ジョンマスター ギフトセット', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'john_masters_holiday_body_hair_care_set';
      valid.displayBrand = 'ジョンマスターオーガニック ホリデーコレクション ボディウォッシュ ボディミルク リップカーム オーガニック ギフト';
      data.theme3_holiday_bodycare_bath_gift.push(valid);
      console.log(`✅ ジョンマスター追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  } catch (e) {
    console.error('ジョンマスター取得エラー:', e.message);
  }
  await sleep(1300);

  // 5. ニールズヤード ギフト
  console.log('--- ニールズヤード ギフトの取得 ---');
  try {
    const res = await searchRakutenDirect('ニールズヤード ギフト', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'neals_yard_holiday_aroma_bodycare_relax_kit';
      valid.displayBrand = 'ニールズヤード レメディーズ ホリデー アロマティック ボディバター バスソルト リラックス オーガニック コフレ';
      data.theme3_holiday_bodycare_bath_gift.push(valid);
      console.log(`✅ ニールズヤード追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  } catch (e) {
    console.error('ニールズヤード取得エラー:', e.message);
  }

  // 重複排除と10件切り詰め
  const dedupe = (list) => {
    const seen = new Set();
    return list.filter(it => {
      if (!it || seen.has(it.itemCode)) return false;
      seen.add(it.itemCode);
      return true;
    }).slice(0, 10);
  };

  data.theme1_nanocare_hair_dryer = dedupe(data.theme1_nanocare_hair_dryer);
  data.theme2_ems_scalp_lift_brush = dedupe(data.theme2_ems_scalp_lift_brush);
  data.theme3_holiday_bodycare_bath_gift = dedupe(data.theme3_holiday_bodycare_bath_gift);

  fs.writeFileSync('scratch/rakuten_winter_batch67_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n精査完了:`);
  console.log(`- テーマ1: ${data.theme1_nanocare_hair_dryer.length}件`);
  console.log(`- テーマ2: ${data.theme2_ems_scalp_lift_brush.length}件`);
  console.log(`- テーマ3: ${data.theme3_holiday_bodycare_bath_gift.length}件`);
}

refineBatch67().catch(console.error);
