import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch61Items() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch61_items.json', 'utf8'));

  // テーマ1: あと1件追加して10件に
  if (data.theme1_massage_gun.length < 10) {
    console.log(`テーマ1: 現在${data.theme1_massage_gun.length}件。補完中...`);
    const extraQueries = [
      { brand: 'mytrex_rebive_air_ultralight', name: 'MYTREX REBIVE AIR マイトレックス リバイブ エア 超軽量 ハンディ フェイス 全身', query: 'マイトレックス リバイブ エア' },
      { brand: 'handy_mini_massage_gun_quiet', name: '筋膜リリースガン ミニ 小型 軽量 ハンディ振動マシン Type-C充電', query: '筋膜リリースガン ミニ 静音' }
    ];
    for (const cfg of extraQueries) {
      if (data.theme1_massage_gun.length >= 10) break;
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古') && !data.theme1_massage_gun.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_massage_gun.push(valid);
        console.log(`✅ テーマ1追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
      await sleep(1300);
    }
  }

  // テーマ2: あと1件追加して10件に
  if (data.theme2_cavitation.length < 10) {
    console.log(`テーマ2: 現在${data.theme2_cavitation.length}件。補完中...`);
    const extraQueries = [
      { brand: 'rf_ems_cavitation_body_slimming_white', name: 'キャビテーション RFラジオ波 EMS複合美容器 赤色LED光エステ お腹 二の腕 太もも 引き締め', query: 'キャビテーション 美顔器 RF EMS' },
      { brand: 'waterproof_body_cavitation_spa_shape', name: 'キャビテーション 防水 超音波 美容器 全身 ダイエット EMS 高周波', query: 'キャビテーション 超音波 EMS 防水' }
    ];
    for (const cfg of extraQueries) {
      if (data.theme2_cavitation.length >= 10) break;
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古') && !data.theme2_cavitation.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_cavitation.push(valid);
        console.log(`✅ テーマ2追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
      await sleep(1300);
    }
  }

  // テーマ3: あと3件追加して10件に
  if (data.theme3_callus_remover.length < 10) {
    console.log(`テーマ3: 現在${data.theme3_callus_remover.length}件。補完中...`);
    const extraQueries = [
      { brand: 'electric_heel_callus_file_vacuum', name: '電動角質リムーバー 吸塵式 かかと削り 角質除去 USB充電式 LED照明 フットケア', query: '電動角質リムーバー 吸塵' },
      { brand: 'special_glass_foot_shiner_file', name: 'かかと削り ガラス製 ナノ特殊加工 フットファイル 足裏 角質ケア つるつる', query: 'かかと削り ガラス' },
      { brand: 'dr_scholl_extra_diamond_roller', name: 'ドクターショール エキストラ ダイヤモンド 電動角質リムーバー ローラーヘッド かかと やすり', query: 'ドクターショール 電動角質リムーバー' },
      { brand: 'wide_metal_foot_file_pedicure', name: '両面フットファイル かかとやすり ステンレス 角質削り 足裏 ひび割れ 魚の目', query: 'かかとやすり 足裏 角質' }
    ];
    for (const cfg of extraQueries) {
      if (data.theme3_callus_remover.length >= 10) break;
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !data.theme3_callus_remover.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_callus_remover.push(valid);
        console.log(`✅ テーマ3追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
      await sleep(1300);
    }
  }

  fs.writeFileSync('scratch/rakuten_winter_batch61_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補完完了！各テーマの商品数: テーマ1=${data.theme1_massage_gun.length}, テーマ2=${data.theme2_cavitation.length}, テーマ3=${data.theme3_callus_remover.length}`);
}

refineBatch61Items().catch(console.error);
