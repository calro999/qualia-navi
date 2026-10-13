import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries7Items() {
  console.log('🍂 [2026秋コスメ特集 第7弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: ビタミンC＆ふき取り角質ケア美容液10選 ---
  console.log('\n=== テーマ1: ビタミンC＆ふき取り角質ケア美容液10選 ===');
  const vitaminConfigs = [
    { brand: 'yunth_pure_vitamin_c_serum', name: 'Yunth ユンス 生ビタミンC 美白美容液 個包装 導入美容液 アスコルビン酸', query: 'Yunth 生ビタミンC' },
    { brand: 'obagi_c25_serum_neo', name: 'オバジ C25セラム ネオ 高濃度ピュアビタミンC 毛穴 くすみ ハリ Obagi', query: 'オバジ C25セラム ネオ' },
    { brand: 'melano_cc_premium_essence', name: 'メラノCC 薬用しみ集中対策 プレミアム美容液 ビタミンC ロート製薬', query: 'メラノCC プレミアム美容液' },
    { brand: 'clinique_clarifying_lotion_2', name: 'クリニーク クラリファイング ローション 2 ふき取り化粧水 角質ケア CLINIQUE', query: 'クリニーク クラリファイング ローション 2' },
    { brand: 'dr_ci_labo_vc100_essence_lotion_ex', name: 'ドクターシーラボ VC100エッセンスローションEX 高浸透ビタミンC APPS ナイアシンアミド', query: 'ドクターシーラボ VC100エッセンスローションEX' },
    { brand: 'innisfree_vitamin_c_green_tea_enzyme', name: 'イニスフリー ビタミンC グリーンティー エンザイム ブライト セラム 美容液 角質', query: 'イニスフリー ビタミンC セラム' },
    { brand: 'anua_niacinamide_txa_serum', name: 'アヌア ナイアシンアミド 10% TXA 4% ダークスポット セラム くすみ Anua', query: 'アヌア ナイアシンアミド セラム' },
    { brand: 'sk_ii_clear_lotion', name: 'SK-II フェイシャル トリートメント クリア ローション ふきとり化粧水 AHA ピテラ', query: 'SK-II クリアローション' },
    { brand: 'kanebo_radical_clarifying_scrub_cleanser', name: 'KANEBO カネボウ スクラビング マッド ウォッシュ または クリアリング クレンジング', query: 'カネボウ スクラビング マッド ウォッシュ' },
    { brand: 'takarazuka_chifure_wipe_lotion', name: 'ちふれ ふきとり化粧水 保湿 角質ケア ノンアルコール', query: 'ちふれ ふきとり化粧水' }
  ];

  const vitaminItems = [];
  for (const cfg of vitaminConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (vitaminItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !vitaminItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        vitaminItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の乾燥崩れ防止メイクキープミスト＆セッティングパウダー10選 ---
  console.log('\n=== テーマ2: 秋のメイクキープミスト＆セッティングパウダー10選 ===');
  const settingConfigs = [
    { brand: 'kose_make_keep_mist_ex', name: 'コーセー メイク キープ ミスト EX COOL または MOIST 化粧崩れ防止 KOSE', query: 'コーセー メイク キープ ミスト EX' },
    { brand: 'decorte_loose_powder', name: 'コスメデコルテ ルース パウダー 光の調合 シルク肌 保湿 フェイスパウダー DECORTE', query: 'コスメデコルテ ルースパウダー' },
    { brand: 'clarins_fix_make_up', name: 'クラランス フィックス メイクアップ 保湿 ミスト化粧水 ローズ クラランス', query: 'クラランス フィックス メイクアップ' },
    { brand: 'nars_light_reflecting_setting_powder', name: 'NARS ナーズ ライトリフレクティングセッティングパウダー プレスト N リフ粉', query: 'NARS ライトリフレクティングセッティングパウダー' },
    { brand: 'shiseido_dprogram_allerbarrier_mist', name: 'dプログラム アレルバリア ミスト N 敏感肌用 オイルインミスト 花粉 乾燥 資生堂', query: 'dプログラム アレルバリア ミスト N' },
    { brand: 'mac_prep_prime_fix_plus', name: 'M・A・C マック プレップ プライム フィックス+ ミスト化粧水 保湿 セッティング', query: 'M・A・C プレップ プライム フィックス' },
    { brand: 'laura_mercier_translucent_loose_setting_powder', name: 'ローラ メルシエ ルースセッティングパウダー トランスルーセント ウルトラピュア', query: 'ローラ メルシエ ルースセッティングパウダー' },
    { brand: 'canmake_marshmallow_finish_powder_abloom', name: 'キャンメイク マシュマロフィニッシュパウダー 〜Abloom〜 フェイスパウダー CANMAKE', query: 'キャンメイク マシュマロフィニッシュパウダー Abloom' },
    { brand: 'elegance_la_poudre_haute_nuance', name: 'エレガンス ラ プードル オートニュアンス フェイスパウダー Elegance', query: 'エレガンス ラ プードル オートニュアンス' },
    { brand: 'innisfree_no_sebum_mineral_powder', name: 'イニスフリー ノーセバム ミネラルパウダー N テカリ防止 皮脂コントロール', query: 'イニスフリー ノーセバム ミネラルパウダー' }
  ];

  const settingItems = [];
  for (const cfg of settingConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (settingItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !settingItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        settingItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋の夜長に安らぐピローミスト＆アロマキャンドル・ルームフレグランス10選 ---
  console.log('\n=== テーマ3: 秋の夜長に安らぐピローミスト＆アロマ10選 ===');
  const sleepConfigs = [
    { brand: 'loccitane_cocon_de_serenite_relaxing_pillow_mist', name: 'ロクシタン プロヴァンスアロマ ピローミスト リラクシング 100ml ココンドセエニテ', query: 'ロクシタン ピローミスト' },
    { brand: 'neals_yard_goodnight_pillow_mist', name: 'ニールズヤード レメディーズ グッドナイト ピローミスト 45ml ラベンダー カモミール', query: 'ニールズヤード ピローミスト' },
    { brand: 'diptyque_scented_candle_baies', name: 'ディプティック diptyque フレグランス キャンドル ベ 190g カシス ローズ', query: 'ディプティック キャンドル ベ' },
    { brand: 'shiro_white_tea_room_fragrance', name: 'SHIRO シロ ホワイトティー ルームフレグランス ディフューザー 芳香剤', query: 'SHIRO ホワイトティー ルームフレグランス' },
    { brand: 'muji_essential_oil_sweet_orange', name: '無印良品 おやすみブレンド エッセンシャルオイル アロマオイル 精油', query: '無印良品 おやすみブレンド' },
    { brand: 'aesop_olous_aromatique_room_spray', name: 'イソップ オロウス アロマティック ルームスプレー 100ml Aesop 芳香 ルームコロン', query: 'イソップ ルームスプレー' },
    { brand: 'baobab_collection_candle', name: 'バオバブ コレクション または ウッドウィック ハースウィック キャンドル 暖炉 音', query: 'ウッドウィック ハースウィック キャンドル' },
    { brand: 'jo_malone_english_pear_home_candle', name: 'ジョー マローン ロンドン イングリッシュ ぺアー ＆ フリージア ホーム キャンドル', query: 'ジョーマローン ホームキャンドル' },
    { brand: 'athletia_switch_fragrance_mist', name: 'アスレティア スイッチング アロマルームミスト または ピローミスト athletia', query: 'アスレティア アロマルームミスト' },
    { brand: 'ayura_night_gentle_bath_fragrance', name: 'アユーラ ナイトリートバス または スピリットオブアユーラ アロマルームフレグランス', query: 'アユーラ ナイトリートバス' }
  ];

  const sleepItems = [];
  for (const cfg of sleepConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (sleepItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !sleepItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        sleepItems.push(valid);
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
    vitaminItems,
    settingItems,
    sleepItems
  };

  fs.writeFileSync('scratch/autumn_series7_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第7弾 楽天API取得完了: ビタミンC=${vitaminItems.length}件, メイクキープ=${settingItems.length}件, ナイトアロマ=${sleepItems.length}件`);
}

fetchAutumnSeries7Items().catch(console.error);
