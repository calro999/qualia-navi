import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch51Items() {
  console.log('❄️ [11-12月冬コスメ 第51弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【目元・ほうれい線の刻まれた乾燥小じわを寝ながら集中消去】高濃度ヒアルロン酸マイクロニードルパッチ＆刺すエイジングケアシート 10選 ---
  console.log('\n=== テーマ1: 高濃度ヒアルロン酸マイクロニードルパッチ 10選 ===');
  const patchConfigs = [
    { brand: 'hyalo_deep_patch', name: '北の快適工房 ヒアロディープパッチ 8枚入り（4回分） ギネス認定 高濃度ヒアルロン酸マイクロニードル 目元 ほうれい線', query: '北の快適工房 ヒアロディープパッチ' },
    { brand: 'quanis_dermafiller_premier', name: 'クオニス ダーマフィラー プレミア 8回分 ヒアルロン酸マイクロニードル レチノール ビタミンC', query: 'クオニス ダーマフィラー プレミア' },
    { brand: 'vt_reedle_shot_matrix_patch', name: 'VT COSMETICS リードルショット マトリックスパッチ CICA ツボクサエキス 美容針パッチ', query: 'VT リードルショット パッチ' },
    { brand: 'spa_treatment_has_microneedle', name: 'スパトリートメント HAS iマイクロパッチ 2枚×4セット ヒト幹細胞エキス ヒアルロン酸針 目元 口元', query: 'スパトリートメント HAS マイクロパッチ' },
    { brand: 'yaman_medilift_micro_filler_eye', name: 'YA-MAN ヤーマン メディリフト マイクロフィラーアイ 4袋 目元用マイクロニードルパッチ ヒアルロン酸', query: 'ヤーマン メディリフト マイクロフィラー アイ' },
    { brand: 'navision_ha_fill_patch_b', name: '資生堂 ナビジョンHA フィルパッチB 2枚×3包入 針状ヒアルロン酸 美容液パッチ', query: 'ナビジョンHA フィルパッチ' },
    { brand: 'kose_clear_turn_hyalotune_micro', name: 'コーセー クリアターン ヒアロチューン マイクロパッチ 3回分 1500本の微細針 ヒアルロン酸', query: 'クリアターン ヒアロチューン マイクロパッチ' },
    { brand: 'dermacept_rx_needle_patch', name: 'ロート製薬 ダーマセプトRX マイクロニードルパッチ 目元用 集中美容パッチ', query: 'ロート製薬 マイクロニードルパッチ' },
    { brand: 'acropass_micro_needle_patch', name: 'アクロパス マイクロニードルパッチ スポットパッチ エイジングケア 目元 口元', query: 'アクロパス パッチ' },
    { brand: 'drcilabo_micro_patch', name: 'ドクターシーラボ マイクロニードル パッチ 目元 口元用 ハリ うるおい 美容液シート', query: 'ドクターシーラボ マイクロニードルパッチ' }
  ];

  const patchItems = [];
  for (const cfg of patchConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 0) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        patchItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【寒さで滞った血行不良＆くすみ・ゴワつき肌を劇的覚醒】高濃度炭酸泡美容液＆炭酸ガスパック（CO2パック） 10選 ---
  console.log('\n=== テーマ2: 高濃度炭酸泡美容液＆炭酸ガスパック（CO2パック） 10選 ===');
  const co2Configs = [
    { brand: 'sofina_ip_base_care_serum', name: '花王 ソフィーナiP ベースケア セラム 土台美容液 90g 高濃度マイクロ炭酸泡 うるおい密着浸透', query: 'ソフィーナiP ベースケア セラム 90g' },
    { brand: 'enisie_glow_pack_co2', name: 'エニシー グローパック 10回分 炭酸ガスパック リズム フェイスパック 引き締め 整肌', query: 'エニシー グローパック' },
    { brand: 'dr_medion_spaoxy_gel_co2', name: 'ドクターメディオン スパオキシジェル 3回分 または 10回分 炭酸パック 本格エステ級 生炭酸', query: 'ドクターメディオン スパオキシジェル' },
    { brand: 'ekato_precious_gel_pack_co2', name: 'EKATO エカト プレシャスジェルパック 10回分 持続型炭酸ガスパック 60分間連続炭酸発生', query: 'EKATO プレシャスジェルパック' },
    { brand: 'yunth_raw_carbonic_sheet_mask', name: 'Yunth ユンス 生炭酸パック または 美白炭酸マスク ビタミンC配合 生美容液 集中トーンアップ', query: 'Yunth 炭酸パック' },
    { brand: 'hadanature_carbonic_foam_cleansing', name: '肌ナチュール 炭酸クレンジング 100g とろける高濃度炭酸泡 メイク落とし＆炭酸パック', query: '肌ナチュール 炭酸クレンジング 100g' },
    { brand: 'astalift_sparkle_tight_serum', name: '富士フイルム アスタリフト スパークル タイト セラム 50g 泡感ジェル パチパチ炭酸 毛穴引き締め', query: 'アスタリフト スパークル タイト セラム' },
    { brand: 'favorina_nano_aqua_gel_pack', name: 'フェヴリナ ナノアクア 炭酸ジェルパック 10回分 CO2無添加炭酸パック 毛穴 くすみ ハリ', query: 'フェヴリナ ナノアクア 炭酸ジェルパック' },
    { brand: 'tns_carbonic_sheet_pack', name: 'コットン・ラボ 炭酸パックマスク 3枚入 水で濡らすだけの生炭酸シートマスク', query: '炭酸パックマスク コットンラボ' },
    { brand: 'kanebo_dew_carbonic_essence', name: 'カネボウ DEW 炭酸泡美容液 または DEW ウォームクレンジング 炭酸導入美容液', query: 'DEW 炭酸 美容液' }
  ];

  const co2Items = [];
  for (const cfg of co2Configs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        co2Items.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【暖房乾燥でも素肌が息づく・マスク摩擦＆粉ふき知らず】高保湿トーンアップCCクリーム＆美容液BBクリーム 10選 ---
  console.log('\n=== テーマ3: 高保湿トーンアップCCクリーム＆美容液BBクリーム 10選 ===');
  const ccbbConfigs = [
    { brand: 'decorte_sun_shelter_tone_up_cc', name: 'コスメデコルテ サンシェルター マルチ プロテクション トーンアップCC 35g SPF50+/PA++++ うるおいツヤ肌', query: 'コスメデコルテ サンシェルター トーンアップCC' },
    { brand: 'larocheposay_uv_idea_tone_up_rose', name: 'ラロッシュポゼ UVイデア XL プロテクショントーンアップ ローズ 30ml SPF50+ 高保湿 血色感', query: 'ラロッシュポゼ トーンアップ ローズ' },
    { brand: 'etvos_mineral_inner_treatment_base', name: 'エトヴォス ETVOS ミネラルインナートリートメントベース 25ml SPF31 PA+++ 美容液仕立て 高保湿下地', query: 'エトヴォス ミネラルインナートリートメントベース' },
    { brand: 'lancome_uv_expert_bb_n', name: 'ランコム UV エクスペール BB n 30ml SPF50+ PA++++ 最高峰プロテクション＆素肌カバー', query: 'ランコム UV エクスペール BB n' },
    { brand: 'covermark_skinbright_cream_cc', name: 'カバーマーク スキンブライト クリーム CC 25g SPF50+ PA++++ 和漢植物エキス 美肌持続', query: 'カバーマーク スキンブライト クリーム CC' },
    { brand: 'dprogram_allerbarrier_essence_bb', name: '資生堂 dプログラム アレルバリア エッセンス BB N 30ml 敏感肌用 高保湿 花粉・乾燥バリア', query: 'dプログラム アレルバリア エッセンス BB N' },
    { brand: 'onlyminerals_mineral_essence_bb', name: 'オンリーミネラル ミネラルエッセンス BBクリーム 30g SPF25 PA++ 石けんオフ ボタニカル保湿', query: 'オンリーミネラル ミネラルエッセンス BBクリーム' },
    { brand: 'obagi_c_day_serum_uv', name: 'オバジC デイセラムUV 30g SPF50+ PA++++ ビタミンC3種配合 紫外線感知トーンアップセラム', query: 'オバジC デイセラムUV 30g' },
    { brand: 'kose_es_prique_cc_base', name: 'コーセー エスプリーク コンフォート メイククリーム または CCベース 高保湿 毛穴カバー', query: 'エスプリーク コンフォート メイククリーム' },
    { brand: 'canmake_moist_prism_primer', name: 'キャンメイク モイストプリズムプライマー または マーメイドスキンジェル UV CICA 保湿下地 プチプラ', query: 'キャンメイク マーメイドスキンジェル UV' }
  ];

  const ccbbItems = [];
  for (const cfg of ccbbConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        ccbbItems.push(valid);
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
    theme1_patch: patchItems,
    theme2_co2: co2Items,
    theme3_ccbb: ccbbItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch51_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第51弾 3テーマ計 ${patchItems.length + co2Items.length + ccbbItems.length} アイテムの楽天最新API取得が完了しました！`);
  console.log(`- テーマ1 (針パッチ): ${patchItems.length}/10`);
  console.log(`- テーマ2 (炭酸美容液・CO2パック): ${co2Items.length}/10`);
  console.log(`- テーマ3 (高保湿CC/BBクリーム): ${ccbbItems.length}/10`);
}

fetchWinterBatch51Items().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
