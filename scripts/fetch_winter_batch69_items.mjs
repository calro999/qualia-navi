import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch69Items() {
  console.log('❄️ [11-12月冬コスメ 第69弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【超音波トリートメントアイロン＆超音波美髪浸透器】 10選 ---
  console.log('\n=== テーマ1: 超音波トリートメントアイロン＆超音波美髪浸透器 ===');
  const ultrasonicConfigs = [
    { brand: 'care_pro_deep_ultrasonic_treatment_iron', name: 'CARE PRO ケアプロ 超音波アイロン トリートメント浸透 超音波 赤外線 サロン専売 ヘアケア 美髪 コードレス 防水', query: 'ケアプロ 超音波 トリートメント' },
    { brand: 'yaman_shine_pro_ultrasonic_hair_iron', name: 'ヤーマン YA-MAN シャインプロ 超音波トリートメント ヘアアイロン 超音波 温熱 赤外線 LED 美髪 お風呂 防水', query: 'ヤーマン シャインプロ' },
    { brand: 'lement_deep_repair_ultrasonic_iron', name: 'ルメント Le ment ディープリペアプロ 超音波トリートメント 赤外線 超音波アイロン サロン級ケア パサつき補修', query: 'ルメント ディープリペアプロ' },
    { brand: 'festino_charge_ultrasonic_hair_pack_iron', name: 'フェスティノ FESTINO チャージング 超音波 トリートメントアイロン 美髪ケア トリートメント浸透促進 コードレス 防水', query: 'フェスティノ 超音波 トリートメント' },
    { brand: 'kiboer_ultrasonic_treatment_hair_repair_iron', name: 'Kiboer 超音波 トリートメントアイロン 浸透促進 赤外線ライト 超音波振動 ヘアケア トリートメント アイロン 防水', query: '超音波トリートメントアイロン Kiboer' },
    { brand: 'salon_grade_infrared_ultrasonic_hair_pack_iron', name: '超音波 ヘアアイロン トリートメント 浸透 赤外線 エッセンシャルライト コードレス 防水 IPX5 サロン級 ヘアパック', query: '超音波 ヘアアイロン トリートメント 赤外線' },
    { brand: 'deep_layer_ultrasonic_compatible_hair_mask', name: '超音波アイロン対応 サロン専売 濃密トリートメント ヘアマスク 集中補修 ダメージケア 髪質改善 保湿ケラチン', query: 'トリートメント 集中補修 ヘアマスク 美髪' },
    { brand: 'professional_cordless_waterproof_ultrasonic_iron', name: '超音波 トリートメント アイロン 浸透促進器 ヘアケア コードレス 充電式 防水 バスルーム インバス アウトバス', query: '超音波 トリートメント アイロン コードレス 防水' },
    { brand: 'anlan_ultrasonic_thermal_hair_treatment_iron', name: '超音波 アイロン ヘアケア トリートメント 浸透 促進 赤外線 温熱 美髪ツヤ髪 トリートメント導入器', query: '超音波 トリートメント 浸透 赤外線' },
    { brand: 'premium_keratin_booster_ultrasonic_hair_serum', name: '髪質改善 濃密ヘアトリートメント 超音波導入 ヘアパック ケラチン 原液 美容液 枝毛 切れ毛 静電気 防止', query: 'ケラチン トリートメント 髪質改善 集中ケア' }
  ];

  const ultrasonicItems = [];
  for (const cfg of ultrasonicConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (ultrasonicItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1800 && !it.itemName.includes('中古') && !ultrasonicItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        ultrasonicItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【人感センサー付き速暖セラミックファンヒーター】 10選 ---
  console.log('\n=== テーマ2: 人感センサー付き速暖セラミックファンヒーター ===');
  const ceramicHeaterConfigs = [
    { brand: 'iris_ohyama_large_airflow_ceramic_heater', name: 'アイリスオーヤマ セラミックファンヒーター 大風量 人感センサー 速暖 首振り タイマー 省エネ 脱衣所 トイレ 小型', query: 'アイリスオーヤマ セラミックファンヒーター 人感センサー' },
    { brand: 'yamazen_sensor_ceramic_fan_heater_compact', name: '山善 YAMAZEN セラミックヒーター 人感センサー 速暖 暖房器具 脱衣所 洗面所 小型 足元ヒーター 省エネ', query: '山善 セラミックヒーター 人感センサー' },
    { brand: 'modern_deco_tower_ceramic_fan_heater_sensor', name: 'モダンデコ セラミックファンヒーター 人感センサー タワー型 首振り 速暖 大風量 静音 リモコン付き おしゃれ', query: 'モダンデコ セラミックファンヒーター' },
    { brand: 'compact_mini_ceramic_heater_dressing_room', name: 'セラミックヒーター 小型 人感センサー 2秒速暖 足元ヒーター 脱衣所 洗面所 トイレ オフィス 転倒OFF 暖房', query: 'セラミックヒーター 小型 人感センサー 脱衣所' },
    { brand: 'siroca_sensor_ceramic_fan_heater_interior', name: 'シロカ 人感センサー セラミックヒーター 速暖 コンパクト 軽量 省エネ 暖房器 脱衣所 足元 トイレ 洗面台', query: 'シロカ セラミックヒーター 人感センサー' },
    { brand: 'plus_minus_zero_ceramic_fan_heater_design', name: 'プラスマイナスゼロ プラマイゼロ セラミックファンヒーター 人感センサー 北欧 デザイン おしゃれ 速暖 脱衣所', query: 'プラスマイナスゼロ セラミックファンヒーター' },
    { brand: 'oscillating_fast_heat_ceramic_blower_heater', name: 'セラミックファンヒーター 首振り 大風量 人感センサー 速暖 タイマー 3段階切替 脱衣所 洗面台 メイク暖房', query: 'セラミックファンヒーター 首振り 人感センサー 大風量' },
    { brand: 'thermostat_eco_ceramic_fan_heater_quiet', name: 'セラミックヒーター 温度調節 人感センサー ECO省エネモード 速暖 静音 リモコン付き 脱衣所 寝室 暖房', query: 'セラミックヒーター ECO 人感センサー 省エネ' },
    { brand: 'doshisha_wall_mountable_ceramic_heater_compact', name: 'ドウシシャ 壁掛け 人感センサー セラミックヒーター 脱衣所 送風 速暖 ヒートショック対策 洗面所 タイマー', query: 'ドウシシャ セラミックヒーター 脱衣所' },
    { brand: 'retro_compact_stylish_ceramic_heater_portable', name: 'セラミックヒーター レトロ かわいい おしゃれ 人感センサー 小型 速暖 持ち運び 足元 洗面台 メイク ギフト', query: 'セラミックヒーター おしゃれ 小型 人感センサー' }
  ];

  const ceramicHeaterItems = [];
  for (const cfg of ceramicHeaterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (ceramicHeaterItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古') && !ceramicHeaterItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        ceramicHeaterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【目元専用温熱EMS美顔器＆マイクロカレントアイリフトペン】 10選 ---
  console.log('\n=== テーマ3: 目元専用温熱EMS美顔器＆マイクロカレントアイリフトペン ===');
  const eyeEmsConfigs = [
    { brand: 'anlan_eye_ems_thermal_care_device', name: 'ANLAN 目元美顔器 温熱ケア EMS マイクロカレント 音波振動 赤色青色LED イオン導入 目元 クマ たるみ 小じわ 口元', query: 'ANLAN 目元美顔器 EMS 温熱' },
    { brand: 'mys_deep_core_eye_ems_lift_pen', name: 'ミーゼ myse ヤーマン 目元美顔器 EMS マイクロカレント リフトケア 温熱 アイケア 目もと ほうれい線 美顔器', query: 'ミーゼ 目元美顔器 EMS' },
    { brand: 'salonia_ems_facial_eye_lift_brush_pen', name: 'サロニア SALONIA EMS リフトブラシ 目元 フェイスケア 微弱電流 温感 美顔器 ハリ弾力 ハリ美容', query: 'サロニア EMS 美顔器' },
    { brand: 'medicube_age_r_eye_shot_tightening_device', name: 'メディキューブ medicube AGE-R アイショット 目元ケア ショット美顔器 目元 たるみ クマ 小じわ 韓国美顔器', query: 'メディキューブ AGE-R アイショット' },
    { brand: 'belulu_reborn_eye_microcurrent_device', name: '美ルル belulu 目元美顔器 アイケア 温熱 イオン導入 マイクロカレント 振動 目元エステ クマ 乾燥小じわ ケア', query: '美ルル 目元美顔器' },
    { brand: 'red_led_thermal_sonic_eye_massager_pen', name: '目元美顔器 EMS 温熱 42℃ 赤色LED 光エステ 音波振動 マイクロカレント アイマッサージャー 目元 クマ 口元 たるみ', query: '目元美顔器 EMS 42度 赤色LED' },
    { brand: 'portable_rechargeable_ion_eye_lift_stick', name: '目元ケア 美顔器 イオン導入 温熱 EMS 微弱電流 振動 目元 たるみ むくみ クマ 解消 コードレス 充電式 アイペン', query: '目元美顔器 イオン導入 温熱 振動' },
    { brand: 'medicube_glitter_eye_cream_for_device', name: 'メディキューブ アイクリーム 美顔器専用 目元クリーム レチノール ペプチド 高保湿 目元集中ケア アイクリーム', query: 'メディキューブ アイクリーム' },
    { brand: 'nion_rf_eye_thermal_lifting_wand', name: 'RF 目元美顔器 ラジオ波 EMS 温熱 目元ケア クマ 目袋 たるみ ほうれい線 目尻 小じわ ハリ コードレス', query: '目元美顔器 RF ラジオ波 EMS' },
    { brand: 'luxury_cooling_heating_dual_eye_rejuvenator', name: '温冷 目元美顔器 温熱 冷却 クール EMS リフトアップ 目元 むくみ解消 クマ アイケア 目もとエステ リフレッシュ', query: '目元美顔器 温冷 EMS' }
  ];

  const eyeEmsItems = [];
  for (const cfg of eyeEmsConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (eyeEmsItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1800 && !it.itemName.includes('中古') && !eyeEmsItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyeEmsItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 取得完了: 超音波ヘアアイロン=${ultrasonicItems.length}件, セラミックヒーター=${ceramicHeaterItems.length}件, 目元EMS美顔器=${eyeEmsItems.length}件`);

  const result = {
    theme1_ultrasonic_treatment: ultrasonicItems,
    theme2_ceramic_fan_heater: ceramicHeaterItems,
    theme3_eye_ems_device: eyeEmsItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch69_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch69_items.json に保存完了しました。');
}

fetchWinterBatch69Items().catch(console.error);
