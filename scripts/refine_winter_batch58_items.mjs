import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch58() {
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch58_items.json', 'utf8'));

  // --- テーマ1: 炭酸パックの精査と10件確定 ---
  console.log('\n=== テーマ1: 炭酸ガスパックの精査・再取得 ===');
  // 不適切なアイテム（果汁など）を除去
  current.theme1_carbonic_pack = current.theme1_carbonic_pack.filter(it => {
    if (it.itemName.includes('へべす') || it.itemName.includes('果汁') || it.itemName.includes('冷凍')) return false;
    if (it.itemPrice < 1500) return false;
    return true;
  });

  const carbonicQueries = [
    { brand: 'drselect_co2_gel_pack_salon', name: 'ドクターセレクト CO2ジェルパック 20回分 高濃度炭酸ガスパック サロン専売 剥がせる炭酸パック 炭酸パック 美肌 ハリ', query: 'ドクターセレクト CO2ジェルパック' },
    { brand: 'ccola_platinum_carbonic_pack', name: 'シーコラ プラチナム 炭酸パック 生炭酸 美肌 生炭酸パック ビタミンC誘導体 ヒアルロン酸 エステ仕様', query: '炭酸パック シーコラ' },
    { brand: 'esthe_pro_labo_carbonic_pack', name: 'エステプロラボ 炭酸パック ルフェリ CO2 パック フェイスパック 炭酸ガス サロン専売 美容 エイジングケア', query: '炭酸ガスパック サロン専売' },
    { brand: 'r_face_bbt_carbonic_gas_pack', name: 'R-FACE BFT パック 炭酸ガスパック リズム 炭酸パック 炭酸ガス お風呂で使える エステ 美容液', query: '炭酸パック リズム' },
    { brand: 'medion_spa_oxy_mask_sheet', name: 'ドクターメディオン スパオキシマスク 3回分 マイクロバブル 炭酸シートマスク 集中ケア', query: 'ドクターメディオン スパオキシマスク' }
  ];

  for (const cfg of carbonicQueries) {
    if (current.theme1_carbonic_pack.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const existingCodes = new Set(current.theme1_carbonic_pack.map(it => it.itemCode));
      const valid = res.find(it => !existingCodes.has(it.itemCode) && it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && (it.itemName.includes('炭酸') || it.itemName.includes('パック')));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        current.theme1_carbonic_pack.push(valid);
        console.log(`✅ [炭酸追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: コードレスアイロンの精査（バッテリー等の除外と本体再取得） ---
  console.log('\n=== テーマ2: コードレスアイロンの精査・再取得 ===');
  current.theme2_cordless_iron = current.theme2_cordless_iron.filter(it => {
    if (it.itemName.includes('専用バッテリー') || it.itemName.includes('充電池単品') || it.itemPrice < 3000) return false;
    return true;
  });

  const ironQueries = [
    { brand: 'kinujo_lip_iron_cordless_main', name: 'KINUJO LIP IRON 絹女 リップアイロン コードレス ヘアアイロン 本体 シルクプレート 海外対応 USB充電式 ストレート カール', query: 'KINUJO リップアイロン コードレス' },
    { brand: 'agetuya_cordless_mini_main', name: 'Agetuya アゲツヤ コードレス ミニアイロン 充電式 ストレート＆カール 2way 携帯用 ヘアアイロン 本体', query: 'アゲツヤ コードレス ミニアイロン' },
    { brand: 'plusmore_cordless_hair_iron_mini', name: 'plus more プラスモア コードレス ヘアアイロン ミニ ストレート 充電式 持ち運び 前髪 お直し コンパクト', query: 'コードレス ヘアアイロン ミニ 充電式' },
    { brand: 'panasonic_compact_hair_iron_straight', name: 'パナソニック コンパクトアイロン ミニコテ 2Way EH-HV1A / EH-HV18 海外対応 ストレート カール 携帯用', query: 'パナソニック コンパクトアイロン ミニコテ' },
    { brand: 'modshair_mobile_hair_iron_usb', name: 'モッズ・ヘア スタイリッシュ モバイルヘアアイロン MHS-1342 携帯用 持ち運び 前髪 USB給電 ミニアイロン', query: 'モッズヘア モバイルヘアアイロン MHS' }
  ];

  for (const cfg of ironQueries) {
    if (current.theme2_cordless_iron.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const existingCodes = new Set(current.theme2_cordless_iron.map(it => it.itemCode));
      const valid = res.find(it => !existingCodes.has(it.itemCode) && it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('バッテリー') && !it.itemName.includes('充電池') && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        current.theme2_cordless_iron.push(valid);
        console.log(`✅ [アイロン追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: よもぎ温座・温活フェムケアの重複整理と10件確定 ---
  console.log('\n=== テーマ3: よもぎ温座・温活フェムケアの整理・再取得 ===');
  // 重複を整理（同一商品コード除外）
  const seenCodes = new Set();
  current.theme3_yomogi_warm_pad = current.theme3_yomogi_warm_pad.filter(it => {
    if (seenCodes.has(it.itemCode)) return false;
    seenCodes.add(it.itemCode);
    return true;
  });

  const warmQueries = [
    { brand: 'yomogi_herbal_bath_pack_organic', name: '信州産 天然よもぎ100% よもぎ湯 よもぎ入浴剤 よもぎ蒸し 温活 冷えとり 入浴用 ハーブバス 無添加', query: 'よもぎ 入浴剤 オーガニック' },
    { brand: 'warm_silk_belly_band_femcare', name: '極上シルク 絹100% 温活腹巻き 薄手 冷え取り お腹温め 骨盤ケア フェムケア レディース 保温 インナー', query: 'シルク 腹巻き 温活' },
    { brand: 'yomogi_organic_warm_tea_blend', name: '国産 焙煎よもぎ茶 ティーバッグ ノンカフェイン 温活 ハーブティー 冷え性改善 巡りサポート 美容茶', query: 'よもぎ茶 国産 オーガニック' }
  ];

  for (const cfg of warmQueries) {
    if (current.theme3_yomogi_warm_pad.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const existingCodes = new Set(current.theme3_yomogi_warm_pad.map(it => it.itemCode));
      const valid = res.find(it => !existingCodes.has(it.itemCode) && it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        current.theme3_yomogi_warm_pad.push(valid);
        console.log(`✅ [温活追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // 10件に満たない場合のフォールバック補完
  while (current.theme1_carbonic_pack.length < 10) {
    const res = await searchRakutenDirect('炭酸パック フェイスマスク', 10, '-reviewCount');
    const existing = new Set(current.theme1_carbonic_pack.map(it => it.itemCode));
    const next = res.find(it => !existing.has(it.itemCode) && it.imageUrl && it.itemPrice > 1500);
    if (!next) break;
    next.brandKey = `carbonic_pack_select_${current.theme1_carbonic_pack.length + 1}`;
    next.displayBrand = `サロン級 高濃度炭酸フェイスパック (${next.shopName})`;
    current.theme1_carbonic_pack.push(next);
    await sleep(1200);
  }

  while (current.theme2_cordless_iron.length < 10) {
    const res = await searchRakutenDirect('コードレス ヘアアイロン 充電式', 10, '-reviewCount');
    const existing = new Set(current.theme2_cordless_iron.map(it => it.itemCode));
    const next = res.find(it => !existing.has(it.itemCode) && it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('バッテリー'));
    if (!next) break;
    next.brandKey = `cordless_iron_select_${current.theme2_cordless_iron.length + 1}`;
    next.displayBrand = `ポータブル 充電式ミニヘアアイロン (${next.shopName})`;
    current.theme2_cordless_iron.push(next);
    await sleep(1200);
  }

  while (current.theme3_yomogi_warm_pad.length < 10) {
    const res = await searchRakutenDirect('よもぎ 温活 パッド シート', 10, '-reviewCount');
    const existing = new Set(current.theme3_yomogi_warm_pad.map(it => it.itemCode));
    const next = res.find(it => !existing.has(it.itemCode) && it.imageUrl && it.itemPrice > 800);
    if (!next) break;
    next.brandKey = `yomogi_warm_select_${current.theme3_yomogi_warm_pad.length + 1}`;
    next.displayBrand = `天然よもぎ温活 温熱シート (${next.shopName})`;
    current.theme3_yomogi_warm_pad.push(next);
    await sleep(1200);
  }

  // 10件に揃える
  current.theme1_carbonic_pack = current.theme1_carbonic_pack.slice(0, 10);
  current.theme2_cordless_iron = current.theme2_cordless_iron.slice(0, 10);
  current.theme3_yomogi_warm_pad = current.theme3_yomogi_warm_pad.slice(0, 10);

  console.log(`\n🎉 精査完了 集計結果:`);
  console.log(`- テーマ1 (炭酸ガスパック): ${current.theme1_carbonic_pack.length} 件`);
  console.log(`- テーマ2 (コードレスヘアアイロン): ${current.theme2_cordless_iron.length} 件`);
  console.log(`- テーマ3 (よもぎ温座・温活): ${current.theme3_yomogi_warm_pad.length} 件`);

  fs.writeFileSync('scratch/rakuten_winter_batch58_items.json', JSON.stringify(current, null, 2), 'utf8');
}

refineBatch58().catch(console.error);
