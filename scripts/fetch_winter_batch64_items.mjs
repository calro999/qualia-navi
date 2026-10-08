import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch64Items() {
  console.log('❄️ [11-12月冬コスメ 第64弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【卓上超音波加湿器＆美肌アロマディフューザー】 10選 ---
  console.log('\n=== テーマ1: 卓上超音波加湿器＆美肌アロマディフューザー ===');
  const humidifierConfigs = [
    { brand: 'mottole_desk_ultrasonic_humidifier', name: 'mottole モットル 加湿器 卓上 超音波加湿器 小型 コードレス 充電式 上部給水 静音 オフィス 寝室', query: 'mottole 卓上加湿器' },
    { brand: 'francfranc_mini_aroma_humidifier', name: 'Francfranc フランフラン 加湿器 卓上 アロマ ミニ加湿器 超音波式 かわいい 小型 デスク', query: 'フランフラン 加湿器 卓上' },
    { brand: 'cordless_portable_dual_nozzle_humidifier', name: '加湿器 卓上 コードレス 充電式 ダブルノズル 超音波加湿器 大容量 小型 静音 車載 寝室', query: '加湿器 卓上 コードレス ダブルノズル' },
    { brand: 'aroma_ultrasonic_led_light_humidifier', name: '加湿器 卓上 アロマディフューザー 超音波式 ナイトライト 静音 大容量 上から給水 乾燥対策', query: 'アロマディフューザー 加湿器 卓上 超音波' },
    { brand: 'large_capacity_top_fill_quiet_desk_humidifier', name: '加湿器 卓上 大容量 上部給水 超音波式 次亜塩素酸水対応 静音 小型 省エネ オフィス 寝室', query: '加湿器 卓上 上部給水 大容量 超音波' },
    { brand: 'retro_lamp_design_portable_humidifier', name: '加湿器 卓上 レトロ ランプ型 かわいい アロマ 充電式 コードレス 超音波式 癒し ライト', query: '加湿器 卓上 ランプ レトロ' },
    { brand: 'flame_light_aroma_diffuser_fireplace_humidifier', name: '加湿器 卓上 炎 焚き火 アロマディフューザー 癒し 超音波式 タイマー 静音 暖炉風 ミスト', query: 'アロマディフューザー 炎 焚き火 加湿器' },
    { brand: 'bottle_shaped_compact_usb_humidifier', name: '加湿器 卓上 ボトル型 タンブラー型 USB 静音 ミニ加湿器 車載 オフィス デスク 乾燥予防', query: '加湿器 卓上 タンブラー USB' },
    { brand: 'hypochlorous_acid_compatible_quiet_humidifier', name: '加湿器 卓上 次亜塩素酸水対応 超音波 除菌 消臭 静音 小型 大容量 オフィス 寝室 会社', query: '加湿器 卓上 次亜塩素酸水対応' },
    { brand: 'ultrasonic_skin_hydration_mist_humidifier', name: '卓上加湿器 超音波 美肌 保湿 ナノミスト アロマ 静音 コードレス タイマー 自動停止 小型', query: '卓上加湿器 超音波 保湿 美肌' }
  ];

  const humidifierItems = [];
  for (const cfg of humidifierConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('フィルターのみ') || it.itemName.includes('ジャンク')) return false;
        if (humidifierItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !humidifierItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        humidifierItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【温冷美顔器＆ホット＆クール美顔器（42℃温熱×冷却引き締め）】 10選 ---
  console.log('\n=== テーマ2: 温冷美顔器＆ホット＆クール美顔器 ===');
  const hotCoolConfigs = [
    { brand: 'anlan_hot_and_cool_facial_device', name: 'ANLAN 温冷美顔器 ホット＆クール 温熱 冷却 イオン導入 イオン導出 EMS 光エステ LED 毛穴ケア', query: 'ANLAN 温冷美顔器' },
    { brand: 'belulu_classy_cool_hot_facial_device', name: '美ルル 美顔器 温冷美顔器 ホット クール イオン導入 導出 超音波 リフトケア 毛穴 たるみ', query: '美ルル 温冷美顔器' },
    { brand: 'thermal_cooling_ems_pore_tightening_device', name: '温冷美顔器 ホット クール EMS 微電流 音波振動 イオン導入 導出 冷却 毛穴引き締め 目元ケア', query: '温冷美顔器 EMS 冷却 毛穴' },
    { brand: 'rf_cooling_lifting_firming_facial_massager', name: '美顔器 温冷 RF ラジオ波 EMS 冷却 クール 毛穴 引き締め リフトケア 温熱 イオン 美肌', query: '美顔器 温冷 RF EMS 冷却' },
    { brand: 'photofacial_hot_cool_led_skincare_device', name: '温冷美顔器 1台8役 光エステ 赤青LED 温熱 冷却 イオン クレンジング 保湿 リフト 目元 口元', query: '温冷美顔器 光エステ イオン' },
    { brand: 'ice_cool_thermal_skin_rejuvenation_device', name: '美顔器 ホット クール 温冷ケア 超音波振動 イオン浸透 冷却タイトニング 小顔 たるみ ハリ', query: '美顔器 ホット クール 音波振動' },
    { brand: 'eye_and_face_dual_hot_cold_massager', name: '温冷美顔器 目元ケア 目元 口元 フェイス 温熱 冷却 クール イオン導入 音波振動 ハリ 乾燥小じわ', query: '温冷美顔器 目元ケア フェイス' },
    { brand: 'salon_grade_temperature_control_facial_machine', name: '温冷美顔器 業務用レベル 自宅用 温熱42度 冷却6度 イオン導入 導出 EMS LED美顔器 毛穴', query: '温冷美顔器 42度 冷却' },
    { brand: 'portable_cordless_hot_cool_beauty_gadget', name: '温冷美顔器 コードレス USB充電式 温熱 冷却 イオン導入 毛穴ケア 乾燥肌 くすみ 潤い', query: '温冷美顔器 コードレス 充電式' },
    { brand: 'deep_cleansing_pore_tightening_hot_cool_unit', name: '温冷美顔器 ディープクレンジング 毛穴 黒ずみ 角栓 温熱 冷却 イオン導出 化粧水浸透 うるおい', query: '温冷美顔器 毛穴 クレンジング' }
  ];

  const hotCoolItems = [];
  for (const cfg of hotCoolConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (hotCoolItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古') && !hotCoolItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hotCoolItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【音波振動リセットブラシ＆マイナスイオン磁気ヘアブラシ】 10選 ---
  console.log('\n=== テーマ3: 音波振動リセットブラシ＆マイナスイオン磁気ヘアブラシ ===');
  const brushConfigs = [
    { brand: 'koizumi_reset_brush_magnetic_sonic', name: 'KOIZUMI コイズミ リセットブラシ 音波振動磁気ヘアブラシ パドルタイプ マイナスイオン クッションブラシ 静電気抑制', query: 'コイズミ リセットブラシ' },
    { brand: 'koizumi_reset_brush_portable_compact', name: 'コイズミ リセットブラシ コンパクト 携帯用 音波振動 磁気 折りたたみ ヘアブラシ 持ち歩き 静電気除去', query: 'コイズミ リセットブラシ コンパクト' },
    { brand: 'sonic_vibration_magnetic_negative_ion_brush', name: '音波振動 ヘアブラシ 磁気 マイナスイオン 電動ヘアブラシ 静電気防止 絡まり解消 頭皮マッサージ サラツヤ', query: '音波振動 ヘアブラシ 磁気' },
    { brand: 'electric_scalp_massage_detangling_hair_brush', name: '電動ヘアブラシ 音波振動 振動ブラシ 頭皮ケア スカルプ 静電気防止 もつれ毛 ツヤ髪 クッションブラシ', query: '電動ヘアブラシ 音波振動 頭皮ケア' },
    { brand: 'areti_magnetic_sonic_detangle_hair_brush', name: 'Areti アレティ 電動ヘアブラシ 音波振動 マイナスイオン 絡まない ブラッシング ヘアケア ツヤ', query: 'Areti 電動ヘアブラシ' },
    { brand: 'negative_ion_sonic_vibration_styling_brush', name: 'ヘアブラシ 電動 マイナスイオン 音波振動 静電気 抑制 まとまり パサつき 寝癖直し ツヤ出しブラシ', query: '電動ヘアブラシ マイナスイオン 音波' },
    { brand: 'cushion_air_magnetic_vibrating_paddle_brush', name: '音波振動 磁気パドルブラシ クッションヘッド 頭皮 血行促進 ブラッシング 静電気カット 摩擦軽減', query: '音波振動 磁気 パドルブラシ' },
    { brand: 'luxury_sonic_detangling_paddle_hair_brush', name: '電動ブラシ ヘアブラシ 音波振動 髪質改善 静電気防止 サラサラ まとまり サロン級 ヘアケアブラシ', query: '電動ブラシ 音波振動 サラサラ' },
    { brand: 'portable_mini_sonic_negative_ion_hair_comb', name: '音波振動ヘアブラシ 小型 ミニ 携帯用 ポーチに入る マイナスイオン 静電気抑制 出先 お直し用', query: '音波振動 ヘアブラシ 携帯用' },
    { brand: 'thermal_vibration_scalp_massage_hair_brush', name: '電動ヘアブラシ 音波振動 温熱 頭皮マッサージ リフトケア 磁気 ヘアケア 静電気防止 美髪ブラシ', query: '電動ヘアブラシ 音波振動 マッサージ' }
  ];

  const brushItems = [];
  for (const cfg of brushConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (brushItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !brushItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        brushItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 取得完了: 加湿器=${humidifierItems.length}件, 温冷美顔器=${hotCoolItems.length}件, リセットブラシ=${brushItems.length}件`);

  const result = {
    theme1_desk_humidifier: humidifierItems,
    theme2_hot_and_cool_device: hotCoolItems,
    theme3_sonic_reset_brush: brushItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch64_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch64_items.json に保存完了しました。');
}

fetchWinterBatch64Items().catch(console.error);
