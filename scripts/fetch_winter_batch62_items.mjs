import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch62Items() {
  console.log('❄️ [11-12月冬コスメ 第62弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【超音波ナノハンディミスト美顔器＆携帯用フェイススチーマー】 10選 ---
  console.log('\n=== テーマ1: 超音波ナノハンディミスト美顔器＆携帯用フェイススチーマー ===');
  const handyMistConfigs = [
    { brand: 'festino_charging_facial_handy_mist', name: 'FESTINO フェスティノ 充電式 フェイシャル ハンディミスト ナノミスト 化粧水対応 美顔器 保湿', query: 'フェスティノ ハンディミスト' },
    { brand: 'belulu_moismist_nano_facial_steamer', name: '美ルル モイスミスト belulu Moismist ハンディミスト 超音波 ナノミスト 加湿 美顔器 化粧水', query: '美ルル モイスミスト' },
    { brand: 'anlan_nano_handy_mist_sprayer', name: 'ANLAN ハンディミスト ナノ微粒子 美顔器 携帯用スチーマー 化粧水 保湿 乾燥肌 USB充電式', query: 'ANLAN ハンディミスト' },
    { brand: 'nanotime_beauty_portable_nano_mist', name: 'nanotimeBeauty ナノタイムビューティー ハンディミスト 携帯ミスト 美顔器 超音波 ナノ粒子', query: 'ナノタイム ハンディミスト' },
    { brand: 'touchbeauty_portable_nano_facial_mist', name: 'TOUCHBeauty タッチビューティ ポータブル フェイシャルミスト ナノスチーマー 携帯美顔器', query: 'TOUCHBeauty ハンディミスト' },
    { brand: 'compact_nano_mist_sprayer_usb_charge', name: '携帯 加湿器 ハンディミスト スチーマー ナノ 美顔器 化粧水 乾燥対策 ポーチ 小型 充電式', query: 'ハンディミスト 化粧水 ナノ' },
    { brand: 'pocket_mist_facial_hydrating_sprayer', name: 'ポケットミスト 超音波 ハンディ スチーマー 美顔器 保湿 携帯用 フェイスミスト 充電式', query: 'ポケットミスト 美顔器' },
    { brand: 'water_replenishing_nano_mist_device', name: 'ハンディミスト 美顔器 超音波 ナノスチーマー 補水 保湿 携帯加湿器 化粧水タンク 清潔', query: 'ハンディスチーマー 美顔器 携帯' },
    { brand: 'facial_moisturizer_nano_mist_steamer', name: 'ナノ フェイススチーマー 携帯用 ハンディ 美顔スチーマー 保湿 メイクの上から使える ミスト', query: 'ハンディ ナノスチーマー メイクの上から' },
    { brand: 'portable_aroma_nano_facial_mist_gun', name: 'ポータブル ナノミストスプレー 美顔器 化粧水 保湿 小型スチーマー 乾燥肌対策 フェイスケア', query: 'ポータブル ナノミスト 美顔器' }
  ];

  const handyMistItems = [];
  for (const cfg of handyMistConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (handyMistItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !handyMistItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        handyMistItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【温熱毛穴吸引器＆真空バキューム黒ずみ角栓クリーナー】 10選 ---
  console.log('\n=== テーマ2: 温熱毛穴吸引器＆真空バキューム黒ずみ角栓クリーナー ===');
  const poreVacuumConfigs = [
    { brand: 'anlan_thermal_pore_vacuum_blackhead', name: 'ANLAN 毛穴吸引器 温熱ケア イチゴ鼻 角栓取り 黒ずみ 吸引 美顔器 3段階吸引力 5種ヘッド LED', query: 'ANLAN 毛穴吸引器' },
    { brand: 'areti_pore_suction_cleaner_camera', name: 'Areti アレティ 毛穴吸引器 カメラ付き マイクロスコープ 温熱 黒ずみ 角栓除去 スマホ連動', query: 'Areti 毛穴吸引器' },
    { brand: 'belulu_pore_clear_suction_device', name: '美ルル ポアクリア belulu PoreClear 毛穴吸引器 スポットクリア 黒ずみ 角栓 クリーナー', query: '美ルル ポアクリア' },
    { brand: 'salonia_pore_cleaning_suction_device', name: '毛穴吸引器 温熱機能 真空吸引 角栓取り 黒ずみ イチゴ鼻 改善 3段階吸引力 LED光エステ USB充電', query: '毛穴吸引器 温熱' },
    { brand: 'visible_camera_pore_vacuum_blackhead', name: '可視化 毛穴吸引器 カメラ付き 20倍拡大 スマホ連動 角栓 黒ずみ いちご鼻 真空吸引 美顔器', query: '毛穴吸引器 カメラ' },
    { brand: 'pore_vacuum_cleaner_hot_compress_led', name: '毛穴吸引器 温熱ケア 真空吸引 美顔器 角栓 黒ずみ 毛穴汚れ 除去 4種類吸引ヘッド LCD表示', query: '毛穴吸引器 真空吸引' },
    { brand: 'water_circulating_pore_suction_hydro', name: '水流 毛穴吸引器 ハイドラフェイシャル 温熱 水洗浄 美顔器 角栓 イチゴ鼻 黒ずみ クリーナー', query: '水流 毛穴吸引器' },
    { brand: 'professional_facial_pore_blackhead_remover', name: '毛穴吸引器 角栓取り いちご鼻 黒ずみ除去 毛穴ケア 温熱 毛穴クレンジング 美顔器 フェイスケア', query: '毛穴吸引器 角栓取り' },
    { brand: 'hot_and_cold_pore_vacuum_blackhead_extractor', name: '毛穴吸引器 温冷ケア 温熱 冷却 真空吸引 黒ずみ 角栓 毛穴引き締め 光エステ 美顔器', query: '毛穴吸引器 温冷' },
    { brand: 'electric_pore_cleaner_suction_extractor', name: '電動 毛穴吸引器 イチゴ鼻 ケア 角栓吸引 黒ずみ 毛穴汚れ 除去 真空 3段階吸引 美肌', query: '毛穴吸引器 イチゴ鼻' }
  ];

  const poreVacuumItems = [];
  for (const cfg of poreVacuumConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (poreVacuumItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !poreVacuumItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        poreVacuumItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【音波振動フェイスシェーバー＆眉毛・うぶ毛トリマー】 10選 ---
  console.log('\n=== テーマ3: 音波振動フェイスシェーバー＆眉毛・うぶ毛トリマー ===');
  const faceShaverConfigs = [
    { brand: 'panasonic_ferie_face_shaver_es_wf61', name: 'パナソニック Panasonic フェリエ フェイス用 ES-WF61 密着スイングヘッド マユカバー マユコーム 眉シェーバー', query: 'パナソニック フェリエ ES-WF61' },
    { brand: 'panasonic_ferie_face_shaver_es_wf41', name: 'パナソニック Panasonic フェリエ フェイス用 ES-WF41 丸い刃先 肌にやさしい フェイスシェーバー 眉毛 うぶ毛', query: 'パナソニック フェリエ ES-WF41' },
    { brand: 'koizumi_face_eyebrow_shaver_klc0850', name: 'コイズミ KOIZUMI フェイスシェーバー プチエステ KLC-0850 眉毛シェーバー うぶ毛カッター コンパクト', query: 'コイズミ フェイスシェーバー' },
    { brand: 'tescom_face_eyebrow_shaver_tl226', name: 'テスコム TESCOM フェイスシェーバー TL226 まゆげ うぶ毛 顔剃り 水洗いOK 乾電池式', query: 'テスコム フェイスシェーバー' },
    { brand: 'kai_bihada_ompa_sonic_vibration_razor', name: '貝印 bi-hada ompa 音波振動カミソリ 替刃式 フェイスシェーバー うぶ毛剃り 肌に優しい 微細振動', query: '貝印 bi-hada ompa' },
    { brand: 'anlan_electric_eyebrow_face_shaver_usb', name: 'ANLAN 眉毛シェーバー フェイスシェーバー 替刃付き USB充電式 水洗い LEDライト うぶ毛 ムダ毛処理', query: 'ANLAN 眉毛シェーバー' },
    { brand: 'festino_charging_facial_hair_remover', name: 'FESTINO フェスティノ 充電式 フェイシャルシェーバー 顔そり うぶ毛 シェーバー LEDライト付き', query: 'フェスティノ フェイスシェーバー' },
    { brand: 'maxell_angelique_face_shaver_mxfs', name: 'マクセル アンジェリーク maxell Angelique フェイスシェーバー まゆコーム 眉毛 うぶ毛カッター', query: 'アンジェリーク フェイスシェーバー' },
    { brand: 'rechargeable_lipstick_face_shaver_painless', name: 'リップ型 フェイスシェーバー 回転刃 LEDライト付き 痛くない うぶ毛 処理 携帯シェーバー 充電式', query: 'リップ型 フェイスシェーバー' },
    { brand: 'electric_dual_head_face_eyebrow_trimmer', name: '電動 フェイスシェーバー 眉毛シェーバー 2in1 ヘッド交換可能 USB充電式 産毛カッター ムダ毛処理', query: 'フェイスシェーバー 2in1 充電式' }
  ];

  const faceShaverItems = [];
  for (const cfg of faceShaverConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (faceShaverItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !faceShaverItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        faceShaverItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const result = {
    theme1_handy_mist: handyMistItems,
    theme2_pore_vacuum: poreVacuumItems,
    theme3_face_shaver: faceShaverItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch62_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第62弾 全${handyMistItems.length + poreVacuumItems.length + faceShaverItems.length}件のアイテム情報を ${outPath} に保存しました！`);
}

fetchWinterBatch62Items().catch(console.error);
