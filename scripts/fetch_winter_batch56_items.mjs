import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch56Items() {
  console.log('❄️ [11-12月冬コスメ 第56弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【ホリデー限定フレグランスキャンドル＆リードディフューザー】 10選 ---
  console.log('\n=== テーマ1: ホリデー限定フレグランスキャンドル＆リードディフューザー ===');
  const candleDiffuserConfigs = [
    { brand: 'diptyque_scented_candle_baies', name: 'diptyque ディプティック アロマキャンドル ベ 190g カシス ローズ フレグランスキャンドル ギフト ホリデー', query: 'ディプティック キャンドル ベ 190g' },
    { brand: 'jomalone_home_candle_english_pear', name: 'Jo Malone London ジョー マローン ロンドン イングリッシュ ペアー ＆ フリージア ホーム キャンドル 200g ルームフレグランス ギフト', query: 'ジョーマローン キャンドル イングリッシュペアー' },
    { brand: 'maison_margiela_replica_candle_lazy_sunday', name: 'Maison Margiela REPLICA メゾン マルジェラ レプリカ キャンドル レイジーサンデー モーニング 165g ルームアロマ ホリデー', query: 'メゾンマルジェラ レプリカ キャンドル レイジーサンデーモーニング' },
    { brand: 'shiro_fragrance_diffuser_savon', name: 'SHIRO シロ サボン フレグランスディフューザー 300ml リードディフューザー ルームフレグランス 部屋 香り', query: 'SHIRO サボン フレグランスディフューザー 300ml' },
    { brand: 'baum_aromatic_room_spray_candle', name: 'BAUM バウム アロマティック ルームスプレー 100ml / キャンドル ウッドランド 木の香り 森林浴 リラクゼーション ギフト', query: 'BAUM バウム ルームスプレー' },
    { brand: 'sabon_aroma_reed_diffuser_delicate_jasmine', name: 'SABON サボン アロマ デリケート・ジャスミン 250ml リードディフューザー ルームフレグランス ギフト', query: 'SABON アロマ ディフューザー デリケートジャスミン' },
    { brand: 'apotheke_fragrance_reed_diffuser', name: 'APFR アポテーケ フレグランス リードディフューザー 250ml APOTHEKE FRAGRANCE ホワイトベチバー オークモス ルームフレグランス', query: 'アポテーケ フレグランス ディフューザー 250ml' },
    { brand: 'loccitane_sensory_scented_candle_holiday', name: 'L\'OCCITANE ロクシタン センティッドキャンドル プロヴァンス アロマ キャンドル ギフト ホリデーコレクション', query: 'ロクシタン キャンドル' },
    { brand: 'neom_organics_scented_candle_sleep', name: 'NEOM ネオム オーガニック センティッド キャンドル トランクイリティ 1芯 185g 快眠 ラベンダー アロマキャンドル', query: 'NEOM キャンドル' },
    { brand: 'thann_aroma_diffuser_wood', name: 'THANN タン アロマディフューザー アロマティックウッド 150ml 精油 天然エッセンシャルオイル スティック', query: 'THANN アロマディフューザー アロマティックウッド' }
  ];

  const candleItems = [];
  for (const cfg of candleDiffuserConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('スティックのみ') || it.itemName.includes('空瓶')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        candleItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【酒粕パック＆和漢コメ発酵・杜氏の白玉美肌スキンケア】 10選 ---
  console.log('\n=== テーマ2: 酒粕パック＆和漢コメ発酵・杜氏の白玉美肌スキンケア ===');
  const sakeRiceConfigs = [
    { brand: 'wafood_made_sake_lees_pack', name: 'pdc ワフードメイド 酒粕パック 170g 酒かす 洗い流すパック コメ発酵エキス くすみ 透明感 毛穴 杜氏の手', query: 'ワフードメイド 酒粕パック 170g' },
    { brand: 'kikumasamune_japanese_sake_serum', name: '菊正宗 日本酒の美容液 150ml コメ発酵液 3種のセラミド プラセンタ 高保湿 美容液 透明感', query: '菊正宗 日本酒の美容液 150ml' },
    { brand: 'kose_maihada_hada_jun_essence', name: 'KOSE 米肌 まいはだ 肌潤改善エッセンス 30ml 医薬部外品 ライスパワーNo.11 保湿美容液 セラミド産生', query: '米肌 肌潤改善エッセンス 30ml' },
    { brand: 'rice_force_deep_moisture_essence', name: 'ライスフォース ディープモイスチュアエッセンス 30ml 薬用保湿美容液 ライスパワーNo.11 高保水 乾燥肌', query: 'ライスフォース ディープモイスチュアエッセンス' },
    { brand: 'wafood_made_sake_lees_cream', name: 'pdc ワフードメイド 酒粕クリーム 55g もっちり濃密保湿 コメ発酵エキス 酒かす 美肌菌 うるおい', query: 'ワフードメイド 酒粕クリーム' },
    { brand: 'fukumitsuya_suppin_sake_bath', name: '福光屋 すっぴん 酒風呂専用 原酒 純米酒 2L コメ発酵液 入浴液 アミノ酸 保湿 つるつる', query: 'すっぴん酒風呂 福光屋' },
    { brand: 'hakutsuru_medicated_daiginjo_lotion', name: '白鶴 薬用 大吟醸のうるおい美白水 500ml トラネキサム酸 医薬部外品 コメ発酵液 大容量 化粧水', query: '白鶴 薬用 大吟醸のうるおい美白水' },
    { brand: 'kiso_rice_ferment_extract_pure', name: 'KISO 基礎化粧品 コメ発酵液 20ml アミノ酸 天然保湿因子 NMF 原液 美容液 もっちり肌', query: 'KISO コメ発酵 美容液' },
    { brand: 'kikumasamune_sake_face_mask_high_moist', name: '菊正宗 日本酒のフェイスマスク 高保湿 32枚入 コメ発酵液 プラセンタエキス アルブチン シートマスク', query: '菊正宗 日本酒のフェイスマスク 高保湿' },
    { brand: 'bijin_nuka_junmai_pack_peeling', name: 'リアル 美人ぬか 純米パック 100g 米ぬかセラミド 米ぬか発酵エキス 洗い流すパック なめらか つるすべ', query: '美人ぬか 純米パック' }
  ];

  const sakeRiceItems = [];
  for (const cfg of sakeRiceConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        sakeRiceItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【温感RF×EMS目元美顔器＆アイリフトマッサージャー】 10選 ---
  console.log('\n=== テーマ3: 温感RF×EMS目元美顔器＆アイリフトマッサージャー ===');
  const eyeDeviceConfigs = [
    { brand: 'yaman_medilift_eye_device', name: 'YA-MAN ヤーマン メディリフト アイ EPE-10BB ウェアラブル 目元美顔器 EMS ヒーター 眼輪筋 リフトケア', query: 'ヤーマン メディリフト アイ' },
    { brand: 'panasonic_eye_steamer_eh_sw68', name: 'Panasonic パナソニック 目もとエステ EH-SW68 温感スチーム アロマホルダー うるおい リフレッシュ 目元ケア', query: 'パナソニック 目もとエステ EH-SW68' },
    { brand: 'anlan_eye_massager_rf_ems_device', name: 'ANLAN 温感 目元美顔器 RF EMS 目元ケア 赤青光エステ イオン導入 振動 目元 口元 ほうれい線 美顔器', query: 'ANLAN 目元美顔器 RF EMS' },
    { brand: 'niplux_eye_relax_massager_hot', name: 'NIPLUX EYE RELAX ニップラックス アイリラックス ホットアイマスク エア 温熱 目元エステ 快眠 リラクゼーション', query: 'NIPLUX EYE RELAX ニップラックス' },
    { brand: 'doctorair_3d_eye_magic_rem04', name: 'DOCTORAIR ドクターエア 3Dアイマジック REM-04 目元マッサージャー 温熱 エア 目元ケア 癒やし', query: 'ドクターエア 3Dアイマジック REM-04' },
    { brand: 'belulu_classy_eye_refre_device', name: 'belulu 美ルル 目元美顔器 目元ケア 温熱 音波振動 赤色LED イオン導入 アイケア ペン型美顔器', query: '美ルル 目元 美顔器' },
    { brand: 'wavewave_eye_massager_warm_air', name: 'WAVEWAVE アイマッサージャー ホットアイマスク 温熱 エアプレッシャー 目元エステ 折りたたみ コードレス', query: 'WAVEWAVE アイマッサージャー' },
    { brand: 'mytrex_eye_air_irhythm_device', name: 'MYTREX iRhythm マイトレックス アイリズム 振動 目元マッサージャー ピンポイント振動 アイケア リフレッシュ', query: 'MYTREX iRhythm マイトレックス' },
    { brand: 'salonia_smart_rf_eye_device', name: 'SALONIA サロニア RF フェイシャル 目元美顔器 温感 RF イオン導入 ハリ 目元集中ケア', query: 'サロニア 美顔器 目元' },
    { brand: 'lement_eye_care_pen_ems_device', name: 'ルメント Le ment アイケアプロ 目元美顔器 超音波振動 温熱 赤青LED マイクロカレント 口元 目元', query: 'ルメント アイケアプロ' }
  ];

  const eyeDeviceItems = [];
  for (const cfg of eyeDeviceConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('専用ジェルのみ')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyeDeviceItems.push(valid);
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
    theme1_candle_diffuser: candleItems,
    theme2_sake_rice_ferment: sakeRiceItems,
    theme3_eye_massager_device: eyeDeviceItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch56_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第56弾 全${candleItems.length + sakeRiceItems.length + eyeDeviceItems.length}件のアイテム情報を ${outPath} に保存しました！`);
}

fetchWinterBatch56Items().catch(console.error);
