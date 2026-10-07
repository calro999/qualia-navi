import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch59Items() {
  console.log('❄️ [11-12月冬コスメ 第59弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【温熱ハンドマッサージャー＆手もみエアマッサージャー】 10選 ---
  console.log('\n=== テーマ1: 温熱ハンドマッサージャー＆手もみエアマッサージャー ===');
  const handMassagerConfigs = [
    { brand: 'atex_lourdes_hand_care_hpl1806', name: 'アテックス ATEX ルルド ハンドケア コードレス AX-HPL1806 ハンドマッサージャー 温熱ヒーター 指先独立エアバッグ', query: 'ルルド ハンドケア コードレス' },
    { brand: 'doctorair_3d_hand_massager_hr01', name: 'ドクターエア DOCTORAIR 3Dハンドマッサージャー HR-01 手のひら 指先 加圧マッサージ 温熱ヒーター搭載', query: 'ドクターエア 3Dハンドマッサージャー' },
    { brand: 'niplux_hand_momi_heating_airbag', name: 'NIPLUX HAND MOMI ニップラックス ハンドモミ ハンドマッサージャー 温熱 手のひらマッサージ 指圧 エアバッグ', query: 'NIPLUX HAND MOMI' },
    { brand: 'mytrex_hand_air_care_massager', name: 'MYTREX マイトレックス ハンドケア 手もみ エアマッサージャー 温熱 ハンドマッサージ 指先 つぼ押し 手首', query: 'マイトレックス ハンドケア' },
    { brand: 'alinco_hand_ease_air_mcr6019', name: 'アルインコ ALINCO ハンドイーズ MCR6019 手のひらマッサージャー エアバッグ 温熱 指先 疲労回復', query: 'アルインコ ハンドイーズ' },
    { brand: 'atex_tor_hand_care_luxe_hxl', name: 'アテックス TOR トール ハンドケア リュクス AX-HXT214 手のひらから手首まで 21層エアバッグ もみほぐし 温熱', query: 'トール ハンドケア リュクス' },
    { brand: 'monolourdes_palm_massager_hxl194', name: 'モノルルド 手のひらマッサージャー AX-HXL194 グリグリつぼ押し 指圧 コンパクト ハンドケア 手の疲れ', query: 'モノルルド 手のひらマッサージャー' },
    { brand: 'festino_charging_hand_care_beauty', name: 'FESTINO フェスティノ 充電式 ハンドマッサージャー 美容家電 ハンドケア 手荒れ 保湿 パラフィン風ケア', query: 'フェスティノ ハンドケア' },
    { brand: 'breo_ipalm_hand_acupressure_device', name: 'breo ブレオ ハンドマッサージャー エアー指圧 手のひら 指先 温熱 リラクゼーション 美容家電', query: 'breo ハンドマッサージャー' },
    { brand: 'curesel_air_hand_massager_heater', name: 'コードレス ハンドマッサージャー 振動 温熱 エアバッグ 6段階調節 手のひら 指先 手首 つぼ押し 軽量', query: 'ハンドマッサージャー コードレス 温熱' }
  ];

  const handItems = [];
  for (const cfg of handMassagerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        handItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【温熱EMSネックマッサージャー＆首元温感リラクゼーションギア】 10選 ---
  console.log('\n=== テーマ2: 温熱EMSネックマッサージャー＆首元温感リラクゼーションギア ===');
  const neckMassagerConfigs = [
    { brand: 'niplux_neck_relax_ems_heating', name: 'NIPLUX NECK RELAX ニップラックス ネックリラックス EMS 温熱 首元マッサージャー コードレス 軽量 低周波パルス', query: 'NIPLUX NECK RELAX' },
    { brand: 'mytrex_ems_heat_neck_device', name: 'MYTREX EMS HEAT NECK マイトレックス ヒートネック コードレス EMS 温熱 首 肩こり 僧帽筋 リラクゼーション', query: 'MYTREX EMS HEAT NECK' },
    { brand: 'atex_lourdes_neck_massage_cordless', name: 'アテックス ルルド ホットネックマッサージピロー AX-HXL191 / AX-HP1806 温熱ヒーター もみ玉 首 肩 腰 リラックス', query: 'ルルド ホットネックマッサージピロー' },
    { brand: 'doctorair_3d_neck_massager_mn04', name: 'ドクターエア DOCTORAIR 3Dネックマッサージャー MN-04 / MN-03 首 肩 背中 もみ玉 温熱 コードレス', query: 'ドクターエア 3Dネックマッサージャー' },
    { brand: 'omron_neck_massager_hm150', name: 'オムロン OMRON ネックマッサージャ HM-150 / HM-141 温熱ヒーター 首もみ もみ玉 医療機器認証 肩こり解消', query: 'オムロン ネックマッサージャ' },
    { brand: 'niplux_neck_relax_1s_multi_pad', name: 'NIPLUX NECK RELAX 1S ネックリラックス ワンエス 首 肩 僧帽筋 6枚電極パッド 温熱 EMS 広範囲ケア', query: 'NIPLUX NECK RELAX 1S' },
    { brand: 'alinco_neck_momitaimu_mcr8318', name: 'アルインコ ALINCO 首もみマッサージャー もみたいむ MCR8318 温熱ヒーター 速度2段階 首 肩 腰 疲労回復', query: 'アルインコ 首もみマッサージャー' },
    { brand: 'breo_ineck_air_neck_relaxer', name: 'breo ブレオ iNeck 首元マッサージャー コードレス 首こり 温熱 指圧 もみほぐし リフレッシュ', query: 'breo 首マッサージャー' },
    { brand: 'three_up_cordless_ems_neck', name: '充電式 温熱EMS ネックリフレッシャー コードレス 首元温感 パルスEMS 軽量 リラクゼーション ネックケア', query: 'EMS ネックマッサージャー 温熱' },
    { brand: 'neck_stretcher_air_heating_pillow', name: '首元ストレッチ温熱ピロー ネックストレッチャー エアー牽引 温熱 首 肩甲骨 ストレートネック ケア', query: 'ネックストレッチャー 温熱' }
  ];

  const neckItems = [];
  for (const cfg of neckMassagerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        neckItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【まるでこたつソックス＆温活極暖着圧レギンス・着圧温熱レッグウェア】 10選 ---
  console.log('\n=== テーマ3: まるでこたつソックス＆温活極暖着圧レギンス ===');
  const kotatsuSocksConfigs = [
    { brand: 'okamoto_kotatsu_socks_womens', name: '靴下の岡本 靴下サプリ まるでこたつソックス レディース 発熱 三陰交 温熱刺激 冷え対策 防寒靴下', query: '靴下の岡本 まるでこたつソックス レディース' },
    { brand: 'okamoto_kotatsu_leg_warmer', name: '靴下の岡本 靴下サプリ まるでこたつ レッグウォーマー 足首 三陰交 ツボ温め 温活 冷えとり', query: 'まるでこたつ レッグウォーマー' },
    { brand: 'iondoctor_leg_warmer_41cm_silk', name: 'イオンドクター IONDOCTOR レッグウォーマー 41cm 鉱物パウダー 天然鉱物温活 足首 ふくらはぎ むくみ 冷え', query: 'イオンドクター レッグウォーマー' },
    { brand: 'mediqtto_pajama_leggings_warm', name: 'メディキュット 寝ながらメディキュット パジャマレギンス 温感 超高圧力 あったか 骨盤ケア 美脚 冬用', query: 'メディキュット パジャマレギンス 温感' },
    { brand: 'slimwalk_warm_shaping_leggings', name: 'スリムウォーク 美脚 美尻 あったかスパッツ レギンス 発熱繊維 段階圧力設計 冬用タイツ 防寒', query: 'スリムウォーク あったか レギンス' },
    { brand: 'belmise_slim_warm_tights_polar', name: 'ベルミス BELMISE スリムウォーム 極暖裏起毛 着圧タイツ レギンス 1200デニール透け感 フェイクタイツ 美脚', query: 'ベルミス スリムウォーム' },
    { brand: 'okamoto_kotatsu_oyasumi_switch', name: '靴下の岡本 靴下サプリ まるでこたつ おやすみスイッチ 就寝用 快眠靴下 つま先オープン 温活', query: 'まるでこたつ おやすみスイッチ' },
    { brand: 'silk_family_warm_leg_warmer_japan', name: '極暖シルク＆ウール レッグウォーマー 二重編み 日本製 天然繊維 冷え取り 保温 保湿 美肌 足首温め', query: 'シルク レッグウォーマー 極暖 日本製' },
    { brand: 'gunze_sabrina_polar_warm_tights', name: 'グンゼ GUNZE サブリナ SABRINA 極暖裏起毛タイツ 240デニール 毛布タッチ 吸湿発熱 静電気防止 美脚', query: 'グンゼ 極暖 タイツ 240' },
    { brand: 'tabio_kutsushitaya_wool_leg_warmer', name: '靴下屋 Tabio タビオ ウール混 ケーブル編み レッグウォーマー 日本製 ルーズソックス 温活 冷え対策', query: '靴下屋 レッグウォーマー ウール' }
  ];

  const socksItems = [];
  for (const cfg of kotatsuSocksConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        socksItems.push(valid);
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
    theme1_hand_massager: handItems,
    theme2_neck_massager: neckItems,
    theme3_kotatsu_socks: socksItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch59_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第59弾 全${handItems.length + neckItems.length + socksItems.length}件のアイテム情報を ${outPath} に保存しました！`);
}

fetchWinterBatch59Items().catch(console.error);
