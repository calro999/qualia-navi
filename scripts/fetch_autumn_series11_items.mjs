import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries11Items() {
  console.log('🍂 [2026秋コスメ特集 第11弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋の深まる乾燥と冷え込みから唇を守る高保湿リップオイル＆プランパー10選 ---
  console.log('\n=== テーマ1: 秋の高保湿リップオイル＆プランパー10選 ===');
  const lipOilConfigs = [
    { brand: 'clarins_lip_comfort_oil', name: 'クラランス リップコンフォートオイル 保湿 リップオイル CLARINS', query: 'クラランス リップコンフォートオイル' },
    { brand: 'dior_addict_lip_maximizer', name: 'ディオール アディクト リップ マキシマイザー プランパー ヒアルロン酸 DIOR', query: 'ディオール リップ マキシマイザー' },
    { brand: 'fenty_beauty_gloss_bomb_heat', name: 'ジルスチュアート リップブーケ セラム プランパー 保湿 JILL STUART', query: 'ジルスチュアート リップブーケセラム' },
    { brand: 'addiction_rip_oil_tint', name: 'アディクション リップ オイル ティント または プランパー ADDICTION', query: 'アディクション リップ オイル' },
    { brand: 'romand_glasting_water_gloss', name: 'ロムアンド グラスティング ウォーター グロス プランパー ミント 水光ティント', query: 'ロムアンド ウォーターグロス' },
    { brand: 'hince_mood_enhancer_lip_glow', name: 'hince ムードインハンサー リップグロウ または リップオイル 韓国コスメ', query: 'hince リップ' },
    { brand: 'hera_sensual_spicy_nude_gloss', name: 'HERA ヘラ センシュアル スパイシー ヌード グロス ボリューム プランパー', query: 'HERA スパイシーヌードグロス' },
    { brand: 'keybo_lip_plus_plumper', name: 'キボ keybo リップ プラス プランパー 激辛 神 プランパー 韓国', query: 'キボ リッププランパー' },
    { brand: 'cezanne_lip_color_shield', name: 'セザンヌ リップカラーシールド または リップオイル 高密着 CEZANNE', query: 'セザンヌ リップカラーシールド' },
    { brand: 'excel_lip_care_oil', name: 'エクセル リップケアオイル 7種の天然美肌オイル 保湿 美容液 リップ excel', query: 'エクセル リップケアオイル' }
  ];

  const lipOilItems = [];
  for (const cfg of lipOilConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lipOilItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !lipOilItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipOilItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の紫外線ダメージ後のシミ予防・美白集中シートマスク10選 ---
  console.log('\n=== テーマ2: 秋のシミ予防・美白集中シートマスク10選 ===');
  const maskConfigs = [
    { brand: 'haku_melanofocus_mask', name: 'HAKU メラノフォーカス マスク 薬用 美白 シートマスク 資生堂 シミ予防', query: 'HAKU メラノフォーカス マスク' },
    { brand: 'transino_medicated_whitening_facial_mask_ex', name: 'トランシーノ 薬用ホワイトニング フェイシャルマスクEX トラネキサム酸 第一三共', query: 'トランシーノ フェイシャルマスク' },
    { brand: 'kose_clear_turn_white_mask_vitamin_c', name: 'コーセー クリアターン ホワイト マスク ビタミンC 高純度ビタミンC KOSE', query: 'クリアターン ホワイト マスク ビタミンC' },
    { brand: 'dr_derma_share_glutathione_mask', name: 'ナンバーズイン 5番 白玉 グルタチオン C ふりかけ マスク シートマスク 韓国', query: 'ナンバーズイン 5番 マスク' },
    { brand: 'sk_ii_whitening_source_derm_revival_mask', name: 'SK-II ホワイトニング ソース ダーム リバイバル マスク ピテラ 美白 SK2', query: 'SK-II ホワイトニング マスク' },
    { brand: 'quality_first_derma_laser_super_vc100', name: 'クオリティファースト ダーマレーザー スーパー VC100 マスク 7枚入 美容液', query: 'ダーマレーザー VC100 マスク' },
    { brand: 'mediheal_vita_lightbeam_essential_mask', name: 'メディヒール ビタ ライトビーム エッセンシャルマスク ビタミンC MEDIHEAL', query: 'メディヒール ビタ マスク' },
    { brand: 'obagi_c_serum_gel_mask', name: 'オバジC クリアリセットマスク または ダーマパワーX シートマスク Obagi', query: 'オバジ マスク' },
    { brand: 'lu_lu_lun_hydra_v_mask', name: 'ルルルン ハイドラ V マスク 7枚入 ビタミン 7種 ビタミンハーブ ルルルン公式', query: 'ルルルン ハイドラ V マスク' },
    { brand: 'hadabisei_brightening_facial_mask', name: '肌美精 超浸透3Dマスク 美白 4枚入 高純度ビタミンC クラシエ', query: '肌美精 超浸透3Dマスク 美白' }
  ];

  const maskItems = [];
  for (const cfg of maskConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (maskItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !maskItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        maskItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 乾燥してパサつく秋髪に艶を取り戻すアウトバス高保湿ヘアミルク＆エマルジョン10選 ---
  console.log('\n=== テーマ3: 秋の高保湿ヘアミルク＆エマルジョン10選 ===');
  const milkConfigs = [
    { brand: 'orbis_essence_in_hair_milk', name: 'オルビス エッセンスインヘアミルク 無香料 高保水 ヘアミルク ORBIS 美髪', query: 'オルビス ヘアミルク' },
    { brand: 'milbon_elujuda_emulsion_plus', name: 'ミルボン エルジューダ エマルジョン+ 120g 洗い流さないトリートメント MILBON', query: 'エルジューダ エマルジョン' },
    { brand: 'shiseido_sublimic_wonder_shield', name: '資生堂 サブリミック ワンダーシールド 125ml 洗い流さない ヘアトリートメント', query: 'サブリミック ワンダーシールド' },
    { brand: 'moroccanoil_all_in_one_leave_in_conditioner', name: 'モロッカンオイル オールインワン リーブイン コンディショナー ヘアミスト ミルク', query: 'モロッカンオイル リーブイン' },
    { brand: 'allna_organic_hair_milk', name: 'ALLNA ORGANIC オルナオーガニック ヘアミルク 洗い流さないトリートメント 保湿', query: 'オルナオーガニック ヘアミルク' },
    { brand: 'n_dot_shea_milk', name: 'ナプラ N. エヌドット シアミルク 150g 洗い流さないトリートメント napla', query: 'エヌドット シアミルク' },
    { brand: 'botanist_botanical_hair_milk', name: 'BOTANIST ボタニスト ボタニカル ヘアミルク モイスト ダメージケア 植物由来', query: 'ボタニスト ヘアミルク' },
    { brand: 'pantene_miracles_dual_active_milk', name: 'パンテーン ミラクルズ リネジー デュアル エフェクト または ヘアミルク P&G', query: 'パンテーン ミラクルズ ミルク' },
    { brand: 'john_masters_rose_apricot_hair_milk', name: 'ジョンマスターオーガニック R&A ヘアミルク ローズ＆アプリコット John Masters', query: 'ジョンマスター ヘアミルク' },
    { brand: 'yolu_calm_night_repair_treatment', name: 'YOLU ヨル カームナイトリペア ブースターヘアミスト または バーム ミルク', query: 'YOLU ヘアミスト' }
  ];

  const milkItems = [];
  for (const cfg of milkConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (milkItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !milkItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        milkItems.push(valid);
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
    lipOilItems,
    maskItems,
    milkItems
  };

  fs.writeFileSync('scratch/autumn_series11_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第11弾 楽天API取得完了: リップオイル=${lipOilItems.length}件, 美白マスク=${maskItems.length}件, ヘアミルク=${milkItems.length}件`);
}

fetchAutumnSeries11Items().catch(console.error);
