import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch76Items() {
  console.log('❄️ [11-12月冬コスメ 第76弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【寒いお風呂で待たずに秒速ちゅるん髪！ウォータートリートメント＆温感リキッドトリートメント】 10選 ---
  console.log('\n=== テーマ1: ウォータートリートメント＆温感リキッドトリートメント ===');
  const waterHairConfigs = [
    { brand: 'moremo_water_treatment_miracle_10', name: 'moremo モレモ ウォータートリートメント ミラクル10 200ml 韓国コスメ 即効ツヤ 美髪 サロン級', query: 'モレモ ウォータートリートメント 200ml' },
    { brand: 'loreal_paris_wonder_water', name: 'ロレアル パリ ウォータートリートメント エルセーヴ ノーシャンプー さらさら まとまり 放置時間不要', query: 'ロレアル パリ ウォータートリートメント' },
    { brand: 'headspa7_all_in_one_treatment', name: 'HEADSPA 7 ヘッドスパセブン トリートメント 200ml 温感 アンプルトリートメント 韓国 頭皮ケア ダメージ補修', query: 'ヘッドスパ7 トリートメント' },
    { brand: 'salonia_water_treatment', name: 'SALONIA サロニア スムースシャイン ウォータートリートメント 200ml シルキー 浸透 美容液 集中補修', query: 'サロニア ウォータートリートメント' },
    { brand: 'ahalo_honey_water_treatment', name: 'アハロハニー ハイドロ＆リペア ジェントル ウォータートリートメント 導入液 蜂蜜 集中保水', query: 'アハロハニー ウォータートリートメント' },
    { brand: 'je_laime_fantasy_water_treatment', name: 'コーセー ジュレーム ファンタジスト リペア インテンシブ ウォータートリートメント 高浸透 保湿', query: 'ジュレーム ウォータートリートメント' },
    { brand: 'fino_premium_touch_hair_oil_water', name: 'ファイントゥデイ フィーノ fino プレミアムタッチ 浸透美容液 ヘアマスク または ヘアトリートメント 美容液', query: 'フィーノ プレミアムタッチ ヘアマスク' },
    { brand: 'pluseau_point_repair_water', name: 'プリュスオー plus eau ハイドロミスト または メロウリュクスマスク 美容液トリートメント 浸透補修', query: 'プリュスオー ハイドロミスト' },
    { brand: 'purunt_deep_repair_treatment', name: 'プルント Purunt ディープリペア 美容液 トリートメント 保水生コラーゲン 集中補修 ダメージケア', query: 'プルント トリートメント' },
    { brand: 'tsubaki_premium_ex_repair_mask', name: 'TSUBAKI プレミアム EX リペアマスク 180g 待ち時間0秒 艶髪 サロン帰りの仕上がり', query: 'TSUBAKI プレミアムEX リペアマスク' }
  ];

  const waterHairItems = [];
  for (const cfg of waterHairConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 700) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (waterHairItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 700 && !it.itemName.includes('中古') && !waterHairItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        waterHairItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【冷えくすみ＆代謝低下のゴワつき毛穴を一掃！濃密炭酸パック＆生ジェル炭酸ガスパック】 10選 ---
  console.log('\n=== テーマ2: 濃密炭酸パック＆生ジェル炭酸ガスパック ===');
  const co2PackConfigs = [
    { brand: 'enisie_glow_pack', name: 'エニシー グローパック 炭酸ガスパック プレタパック フェイシャル ジェル リフトアップ サロン専売品 正規品', query: 'エニシー グローパック' },
    { brand: 'dr_medion_spaoxy_gel', name: 'ドクターメディオン Dr.MEDION スパオキシジェル 炭酸パック 自宅エステ 高濃度炭酸ジェル ビタミンC誘導体', query: 'ドクターメディオン スパオキシジェル' },
    { brand: 'favorina_nano_aqua_carbonated_gel', name: 'フェヴリナ FAVORINA ナノアクア 炭酸ジェルパック 10回分 生炭酸 美肌 保湿 毛穴ケア', query: 'フェヴリナ 炭酸ジェルパック' },
    { brand: 'u_raleal_sparkling_pack', name: 'Urar ユレイル スパークリングパック 炭酸パック 生炭酸 抗炎症 薬用 美白 ニキビ 医薬部外品', query: 'ユレイル スパークリングパック' },
    { brand: 'ekato_precious_gel_pack', name: 'EKATO エカト プレシャスジェルパック 60分持続 炭酸ガスパック 洗い流し不要 ハリ 弾力', query: 'EKATO プレシャスジェルパック' },
    { brand: 'vt_cica_bubble_sparkling_mask', name: 'VT COSMETICS シカ バブル スパークリング ブースター 炭酸泡パック CICA 毛穴 ディープクレンジング 韓国コスメ', query: 'VT シカ バブル スパークリング' },
    { brand: 'sing_organic_carbonated_white_pack', name: 'シング オーガニック 炭酸ホワイトパック 発泡 濃密泡パック 洗顔 ピーリング 保湿', query: 'シング オーガニック 炭酸ホワイトパック' },
    { brand: 'riena_co2_gel_pack', name: 'リエナ スノーウィー CO2 ジェルパック 炭酸パック プロ仕様 高濃度 サロン専売 大容量', query: 'CO2 ジェルパック 炭酸パック' },
    { brand: 'meeth_morerich_pack', name: 'ミース meeth モアリッチパック 炭酸ガスパック うるおい 保湿 ツヤ 透明感 美肌', query: 'モアリッチパック 炭酸' },
    { brand: 'cotton_labo_carbonated_pack', name: 'コットンラボ 炭酸パックマスク 水につけるだけ 簡単 炭酸シートマスク プチプラ 高コスパ', query: 'コットンラボ 炭酸パックマスク' }
  ];

  const co2PackItems = [];
  for (const cfg of co2PackConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (co2PackItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !co2PackItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        co2PackItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【極寒の朝洗顔卒業＆化粧ノリ劇的復活！高保湿ふき取り化粧水＆角質柔軟ピールローション】 10選 ---
  console.log('\n=== テーマ3: 高保湿ふき取り化粧水＆角質柔軟ピールローション ===');
  const wipeTonerConfigs = [
    { brand: 'kanebo_radiant_skin_refiner', name: 'KANEBO カネボウ ラディアント スキン リファイナー 200ml ふき取り化粧水 うるおい 角質ケア デパコス', query: 'カネボウ ラディアント スキン リファイナー' },
    { brand: 'takami_skinpeel_essence', name: 'TAKAMI タカミ タカミスキンピール 30ml 角質美容水 毛穴 キメ ざらつき ベスコス受賞 角質ケア', query: 'タカミスキンピール 30ml' },
    { brand: 'benefique_reset_clear_n', name: '資生堂 ベネフィーク リセットクリア N 200ml 浄化感 ふき取り化粧液 とろみ クリア美肌', query: 'ベネフィーク リセットクリア N' },
    { brand: 'clinique_clarifying_lotion_2', name: 'クリニーク CLINIQUE クラリファイング ローション 2 200ml / 400ml 拭き取り化粧水 角質ケア デパコス名品', query: 'クリニーク クラリファイング ローション 2' },
    { brand: 'nature_conc_medicated_clear_lotion', name: 'ナリス ナリスアップ ネイチャーコンク 薬用 クリアローション 200ml 医薬部外品 ふきとり化粧水 プチプラ', query: 'ネイチャーコンク 薬用 クリアローション' },
    { brand: 'eau_de_muge_medicated_lotion', name: '小林製薬 オードムーゲ 薬用ローション 500ml ふきとり化粧水 ニキビ 肌荒れ 保湿 医薬部外品', query: 'オードムーゲ 薬用ローション 500ml' },
    { brand: 'sk2_facial_treatment_clear_lotion', name: 'SK-II SK2 エスケーツー フェイシャルトリートメント クリアローション 230ml ふきとり用化粧水 ピテラ デパコス', query: 'SK-II フェイシャルトリートメント クリアローション' },
    { brand: 'ipsa_clearup_lotion', name: 'IPSA イプサ クリアアップ ローション 150ml 角質ケア ふき取り化粧水 べたつき・乾燥肌用 デパコス', query: 'イプサ クリアアップ ローション' },
    { brand: 'bioderma_sensibio_h2o', name: 'ビオデルマ BIODERMA サンシビオ H2O 500ml クレンジングウォーター ふき取り化粧水 敏感肌 保湿', query: 'ビオデルマ サンシビオ H2O 500ml' },
    { brand: 'chifure_wiping_lotion', name: 'ちふれ CHIFURE ふきとり化粧水 150ml 保湿成分配合 油分・古い角質オフ プチプラ名品', query: 'ちふれ ふきとり化粧水' }
  ];

  const wipeTonerItems = [];
  for (const cfg of wipeTonerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (wipeTonerItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !wipeTonerItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        wipeTonerItems.push(valid);
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
    theme1_water_instant_hair_treatment: waterHairItems,
    theme2_carbonated_co2_gel_mask_pack: co2PackItems,
    theme3_hydrating_wiping_peel_lotion: wipeTonerItems
  };

  const outPath = 'scratch/rakuten_winter_batch76_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 [取得完了] 3テーマ合計 ${waterHairItems.length + co2PackItems.length + wipeTonerItems.length} 商品の最新楽天データを ${outPath} に保存しました！`);
}

fetchWinterBatch76Items();
