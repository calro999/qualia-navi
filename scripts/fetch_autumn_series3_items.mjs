import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries3Items() {
  console.log('🍂 [2026秋コスメ特集 第3弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋の最新ハイライト＆シェーディング10選 ---
  console.log('\n=== テーマ1: 秋の最新ハイライト＆シェーディング10選 ===');
  const highlightConfigs = [
    { brand: 'dior_backstage_face_glow_palette', name: 'ディオール バックステージ フェイス グロウ パレット 4色 ハイライト チーク Dior', query: 'ディオール バックステージ フェイス グロウ パレット' },
    { brand: 'chanel_baume_essentiel', name: 'シャネル ボーム エサンシエル スカルプティング トランスパラン スティックハイライト', query: 'シャネル ボーム エサンシエル' },
    { brand: 'cle_de_peau_le_rehausseur_decla', name: 'クレ・ド・ポー ボーテ ル・レオスールデクラ フェイスカラー ハイライト 資生堂', query: 'ル レオスールデクラ' },
    { brand: 'cezanne_pearl_glow_highlight', name: 'セザンヌ パールグロウハイライト 濡れツヤ 発光ツヤ シャンパンベージュ CEZANNE', query: 'セザンヌ パールグロウハイライト' },
    { brand: 'canmake_munyutto_highlighter', name: 'キャンメイク むにゅっとハイライター むにゅっと質感 生ツヤ 透けツヤ CANMAKE', query: 'キャンメイク むにゅっとハイライター' },
    { brand: 'too_cool_for_school_artclass_by_rodin', name: 'too cool for school アートクラス バイ ロダン シェーディング 3色 小顔 立体感', query: 'アートクラス バイ ロダン シェーディング' },
    { brand: 'hince_true_dimension_radiance_balm', name: 'hince ヒンス トゥルーディメンション ラディアンス バーム スティックハイライト 濡れツヤ', query: 'ヒンス ラディアンスバーム' },
    { brand: 'mac_mineralize_skinfinish', name: 'M・A・C マック ミネラライズ スキンフィニッシュ ライトスカペード フェイスパウダー', query: 'マック ミネラライズ スキンフィニッシュ' },
    { brand: 'judydoll_merihari_master_palette', name: 'JUDYDOLL ジュディドール メリハリマスターパレット シェーディング ハイライト 4色', query: 'ジュディドール メリハリマスターパレット' },
    { brand: 'etvos_mineral_highlight_balm', name: 'エトヴォス ETVOS ミネラルハイライトバーム 天然ミネラル ツヤ感 低刺激 石鹸オフ', query: 'エトヴォス ミネラルハイライトバーム' }
  ];

  const highlightItems = [];
  for (const cfg of highlightConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (highlightItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !highlightItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        highlightItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 金木犀・紅茶・ウッディ香る秋の最新フレグランス10選 ---
  console.log('\n=== テーマ2: 金木犀・紅茶・ウッディ香る秋の最新フレグランス10選 ===');
  const fragranceConfigs = [
    { brand: 'aux_paradis_osmanthus_eau_de_parfum', name: 'オゥパラディ AUX PARADIS オスマンサス オードパルファム 金木犀 香水 秋限定', query: 'オゥパラディ オスマンサス' },
    { brand: 'shiro_kinmokusei_eau_de_parfum', name: 'SHIRO シロ キンモクセイ オードパルファム 金木犀 香水 フローラル 秋限定', query: 'SHIRO キンモクセイ オードパルファム' },
    { brand: 'jo_malone_english_pear_and_freesia', name: 'ジョー マローン ロンドン イングリッシュ ペアー ＆ フリージア コロン 秋の香り', query: 'ジョーマローン イングリッシュペアー' },
    { brand: 'maison_margiela_replica_coffee_break', name: 'メゾン マルジェラ レプリカ オードトワレ コーヒー ブレイク 秋 珈琲 ミルク', query: 'レプリカ コーヒーブレイク' },
    { brand: 'diptyque_tam_dao_eau_de_toilette', name: 'ディプティック diptyque タムダオ オードトワレ サンダルウッド ウッディ 秋', query: 'ディプティック タムダオ' },
    { brand: 'loccitane_osmanthus_eau_de_toilette', name: 'ロクシタン L\'OCCITANE オスマンサス オードトワレ 金木犀 フルーティフローラル', query: 'ロクシタン オスマンサス オードトワレ' },
    { brand: 'shiro_white_tea_eau_de_parfum', name: 'SHIRO シロ ホワイトティー オードパルファム 紅茶 シトラス 秋 癒しの香り', query: 'SHIRO ホワイトティー オードパルファム' },
    { brand: 'maison_margiela_replica_autumn_vibes', name: 'メゾン マルジェラ レプリカ オードトワレ オータム バイブス 紅葉 森林 秋', query: 'レプリカ オータムバイブス' },
    { brand: 'fiancee_body_mist_kinmokusei', name: 'フィアンセ ボディミスト 金木犀 キンモクセイの香り プチプラ 香水 秋限定', query: 'フィアンセ 金木犀' },
    { brand: 'j_scent_roasted_green_tea', name: 'J-Scent ジェイセント ほうじ茶 伝統の和の香り オードパルファム 香水 秋', query: 'J-Scent ほうじ茶' }
  ];

  const fragranceItems = [];
  for (const cfg of fragranceConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (fragranceItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !fragranceItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        fragranceItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋の集中レスキュー保湿シートマスク10選 ---
  console.log('\n=== テーマ3: 秋の集中レスキュー保湿シートマスク10選 ===');
  const maskConfigs = [
    { brand: 'lululun_hydra_ex_mask', name: 'ルルルン ハイドラ EX マスク エクソソーム 白玉 グルタチオン 高保湿 フェイスマスク', query: 'ルルルン ハイドラ EX マスク' },
    { brand: 'vt_cica_reedle_shot_mask', name: 'VT リードルショット CICA デイリー スージング マスク マイクロニードル 鎮静 秋肌', query: 'VT リードルショット マスク' },
    { brand: 'mediheal_nmf_ampoule_mask_jex', name: 'メディヒール N.M.F アクア アンプルマスク 高保水 ヒアルロン酸 セラミド パック', query: 'メディヒール N.M.F マスク' },
    { brand: 'numbuzin_no3_skin_softening_sheet_mask', name: 'ナンバーズイン 3番 すべすべキメケアシートマスク 発酵成分 毛穴引き締め パック', query: 'ナンバーズイン 3番 シートマスク' },
    { brand: 'quality_1st_derma_laser_super_vc100', name: 'クオリティファースト ダーマレーザー スーパー VC100 マスク ビタミンC 毛穴 くすみ', query: 'ダーマレーザー スーパーVC100' },
    { brand: 'torriden_dive_in_low_molecular_mask', name: 'Torriden トリデン ダイブイン 低分子 ヒアルロン酸 マスク 水分 パック 敏感肌', query: 'トリデン ダイブイン マスク' },
    { brand: 'minon_amino_moist_sheet_mask', name: 'ミノン アミノモイスト ぷるぷるしっとり肌マスク 第一三共 敏感肌 乾燥肌 ジェルマスク', query: 'ミノン ぷるぷるしっとり肌マスク' },
    { brand: 'abib_gummy_sheet_mask_heartleaf', name: 'Abib アビブ ガムシートマスク ドクダミ ステッカー 鎮静 密着シートマスク 韓国', query: 'アビブ ガムシートマスク ドクダミ' },
    { brand: 'quality_1st_derma_laser_retinol', name: 'クオリティファースト ダーマレーザー スーパー レチノール 100 マスク ハリ エイジング', query: 'ダーマレーザー レチノール' },
    { brand: 'sk2_facial_treatment_mask', name: 'SK-II SK2 フェイシャルトリートメント マスク ピテラ 集中トリートメント パック', query: 'SK-II フェイシャルトリートメント マスク' }
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

  const resultData = {
    highlightItems,
    fragranceItems,
    maskItems
  };

  const outputPath = path.resolve('scratch/autumn_series3_items.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf8');
  console.log(`\n🎉 第3弾 楽天APIより取得完了！保存先: ${outputPath}`);
  console.log(`取得商品数: ハイライト=${highlightItems.length}件, フレグランス=${fragranceItems.length}件, シートマスク=${maskItems.length}件`);
}

fetchAutumnSeries3Items().catch(console.error);
