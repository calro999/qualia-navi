import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch62() {
  const filePath = 'scratch/rakuten_winter_batch62_items.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`現在の取得状況: テーマ1=${data.theme1_handy_mist.length}件, テーマ2=${data.theme2_pore_vacuum.length}件, テーマ3=${data.theme3_face_shaver.length}件`);

  // テーマ1の追加取得（10件に満たす）
  const mistQueries = [
    { brand: 'nano_mist_facial_steamer_rechargeable', name: 'ナノスチーマー ハンディミスト 美顔器 携帯用 保湿スプレー ナノ粒子 USB充電式 乾燥肌', query: 'ハンディミスト 美顔器 保湿' },
    { brand: 'portable_face_mist_sprayer_compact', name: 'ポータブル フェイスミスト スチーマー 超音波微粒子 潤い補給 メイクキープ 乾燥防止', query: '携帯ミスト 美顔器 充電式' },
    { brand: 'ultrasonic_nano_mist_hydrating_gun', name: '超音波 ナノハンディミスト 美容スチーマー 化粧水タンク コンパクト 保湿ケア 持ち歩き', query: 'ナノスチーマー 携帯用 美顔器' },
    { brand: 'deep_hydrating_pocket_facial_mist', name: 'ディープモイスト ハンディミスト美顔器 ナノミストスプレー 浸透保湿 携帯加湿器 旅行 オフィス', query: 'ミスト美顔器 携帯用 ナノ' }
  ];

  for (const cfg of mistQueries) {
    if (data.theme1_handy_mist.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        if (data.theme1_handy_mist.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_handy_mist.push(valid);
        console.log(`✅ テーマ1追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // テーマ2の追加取得（10件に満たす）
  const vacuumQueries = [
    { brand: 'belulu_poreclear_suction_spot_remover', name: '美ルル ポアクリア 毛穴吸引器 美顔器 真空吸引 3段階強さ 角栓 イチゴ鼻 クリーナー', query: '毛穴吸引器 黒ずみ除去' },
    { brand: 'thermal_pore_cleaner_blackhead_suction', name: '温熱ケア 毛穴吸引器 美顔器 真空負圧 黒ずみ 角栓取り 毛穴クレンジング USB充電式', query: '毛穴吸引器 角栓' }
  ];

  for (const cfg of vacuumQueries) {
    if (data.theme2_pore_vacuum.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        if (data.theme2_pore_vacuum.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_pore_vacuum.push(valid);
        console.log(`✅ テーマ2追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  console.log(`\n最終取得件数: テーマ1=${data.theme1_handy_mist.length}件, テーマ2=${data.theme2_pore_vacuum.length}件, テーマ3=${data.theme3_face_shaver.length}件`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

refineBatch62().catch(console.error);
