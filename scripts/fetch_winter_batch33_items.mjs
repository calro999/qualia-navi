import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch33Items() {
  console.log('❄️ [11-12月コスメ 第33弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 高保湿ヘアミルク＆浸透エマルジョン 10選 ---
  console.log('\n=== テーマ1: 高保湿ヘアミルク＆浸透エマルジョン ===');
  const hairMilkConfigs = [
    { brand: 'orbis_essence_in_hair_milk', name: 'ORBIS オルビス エッセンスインヘアミルク 高保湿トリートメント', query: 'オルビス エッセンスインヘアミルク' },
    { brand: 'milbon_elujuda_emulsion_plus', name: 'MILBON ミルボン エルジューダ エマルジョン＋ 洗い流さないトリートメント', query: 'エルジューダ エマルジョン' },
    { brand: 'napla_n_dot_shea_milk', name: 'napla ナプラ N. エヌドット シアミルク 高保湿ヘアエマルジョン', query: 'エヌドット シアミルク' },
    { brand: 'lacasta_aroma_este_hair_emulsion', name: 'La CASTA ラ・カスタ アロマエステ ヘアエマルジョン 洗い流さないトリートメント', query: 'ラカスタ ヘアエマルジョン' },
    { brand: 'moroccanoil_leave_in_conditioner', name: 'MOROCCANOIL モロッカンオイル オールインワン リーブイン コンディショナー ミルク', query: 'モロッカンオイル リーブイン' },
    { brand: 'cosmedecorte_aq_hair_essence', name: 'DECORTÉ コスメデコルテ AQ ブースティング トリートメント ヘアセラム / イドラクラリティ', query: 'コスメデコルテ ヘアセラム' },
    { brand: 'john_masters_rose_apricot_hair_milk', name: 'john masters organics ジョンマスターオーガニック R&Aヘアミルク ローズ＆アプリコット', query: 'ジョンマスターオーガニック ヘアミルク' },
    { brand: 'stephen_knoll_moisture_hair_emulsion', name: 'STEPHEN KNOLL スティーブンノル モイスチュアソフニング エマルジョン', query: 'スティーブンノル モイスチュアソフニング エマルジョン' },
    { brand: 'botanist_botanical_hair_milk_moist', name: 'BOTANIST ボタニスト ボタニカルヘアミルク モイスト / スムース', query: 'ボタニスト ヘアミルク モイスト' },
    { brand: 'pantene_effortless_vita_milk', name: 'PANTENE パンテーン エフォートレス クイック リペアカプセル ヴィタミルク', query: 'パンテーン ヴィタミルク' }
  ];

  const hairMilkItems = [];
  for (const cfg of hairMilkConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairMilkItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿アイクリーム＆目元専用美容液 10選 ---
  console.log('\n=== テーマ2: 高保湿アイクリーム＆目元専用美容液 ===');
  const eyeCreamConfigs = [
    { brand: 'elixir_retino_power_wrinkle_cream', name: 'ELIXIR エリクシール レチノパワー リンクルクリーム 医薬部外品 薬用純粋レチノール', query: 'エリクシール レチノパワー リンクルクリーム' },
    { brand: 'pola_wrinkle_shot_medical_serum_n', name: 'POLA ポーラ リンクルショット メディカル セラム N 医薬部外品 シワ改善美容液', query: 'ポーラ リンクルショット メディカルセラム' },
    { brand: 'cosmedecorte_liposome_repair_eye_serum', name: 'DECORTÉ コスメデコルテ リポソーム アドバンスト リペアアイセラム 目元美容液', query: 'コスメデコルテ リポソーム アイセラム' },
    { brand: 'nameraka_honpo_wrinkle_eye_cream_n', name: 'なめらか本舗 サナ リンクルアイクリーム N ピュアレチノール×豆乳イソフラボン', query: 'なめらか本舗 リンクルアイクリーム' },
    { brand: 'kiehls_creamy_eye_treatment_avocado', name: 'Kiehl\'s キールズ アイ トリートメント AV アボカド 高保湿アイクリーム', query: 'キールズ アイトリートメント AV' },
    { brand: 'clarins_double_serum_eye', name: 'CLARINS クラランス ダブル セーラム アイ 目元用エイジングケア美容液', query: 'クラランス ダブルセーラム アイ' },
    { brand: 'clinique_all_about_eyes', name: 'CLINIQUE クリニーク オール アバウト アイ 目元用保湿ジェルクリーム', query: 'クリニーク オールアバウトアイ' },
    { brand: 'kanebo_wrinkle_lift_serum', name: 'KANEBO カネボウ リンクル リフト セラム 医薬部外品 / 目元用リペア', query: 'カネボウ リンクル リフト セラム' },
    { brand: 'cezanne_wrinkle_white_eye_cream', name: 'CEZANNE セザンヌ リンクルホワイトアイクリーム 医薬部外品 ナイアシンアミド配合', query: 'セザンヌ リンクルホワイトアイクリーム' },
    { brand: 'cnp_propolis_eye_serum', name: 'CNP Laboratory プロポリス アイセラム / アイクリーム 蜂の恵み高保湿', query: 'CNP プロポリス アイクリーム' }
  ];

  const eyeCreamItems = [];
  for (const cfg of eyeCreamConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyeCreamItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 薬用重炭酸入浴剤＆エプソムソルト・ミネラルバスソルト 10選 ---
  console.log('\n=== テーマ3: 薬用重炭酸入浴剤＆エプソムソルト・ミネラルバスソルト ===');
  const bathSaltConfigs = [
    { brand: 'barth_neutral_bicarbonate_bath_tablet', name: 'BARTH 薬用 バース 中性重炭酸入浴剤 医薬部外品 疲労回復・温活', query: 'BARTH 重炭酸入浴剤' },
    { brand: 'kneipp_bath_salt_good_night', name: 'Kneipp クナイプ バスソルト ホップ＆バレリアン / ユズ＆ジンジャー ドイツ天然岩塩', query: 'クナイプ バスソルト' },
    { brand: 'sea_crystals_epsom_salt_pure', name: 'Sea Crystals シークリスタルス 国産エプソムソルト 硫酸マグネシウム 温活入浴料', query: 'シークリスタルス エプソムソルト' },
    { brand: 'ayura_meditation_bath_t', name: 'AYURA アユーラ メディテーションバス t 薬用アロマバスミルク 瞑想風呂', query: 'アユーラ メディテーションバス' },
    { brand: 'weleda_arnica_bath_milk', name: 'WELEDA ヴェレダ バスミルク アルニカ / モミ / ラベンダー オーガニックハーブ', query: 'ヴェレダ バスミルク' },
    { brand: 'babu_medicure_relieve_carbonic', name: '花王 バブ 薬用 メディキュア ほぐしめぐり浴 高濃度炭酸 温活入浴剤', query: 'バブ メディキュア' },
    { brand: 'onpo_torori_carbonic_bath_powder', name: 'アース製薬 温泡 ONPO とろり炭酸湯 / こだわりゆず 生薬・炭酸湯', query: '温泡 とろり炭酸湯' },
    { brand: 'nehan_tokyo_epsalt_bath_salt', name: 'NEHAN TOKYO ネハントウキョウ エプソルト 高純度硫酸マグネシウム 高級バスギフト', query: 'NEHAN TOKYO 入浴剤' },
    { brand: 'jomalone_bath_oil_english_pear', name: 'JO MALONE LONDON ジョー マローン ロンドン バス オイル イングリッシュペアー', query: 'ジョーマローン バスオイル' },
    { brand: 'baraka_jordanian_dead_sea_salt', name: 'BARAKA バラカ ジョルダニアン デッドシー ソルト 死海の天然ミネラル結晶', query: 'BARAKA デッドシーソルト' }
  ];

  const bathSaltItems = [];
  for (const cfg of bathSaltConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bathSaltItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 保存
  const result = {
    updatedAt: new Date().toISOString(),
    theme1_hair_milk: hairMilkItems,
    theme2_eye_cream: eyeCreamItems,
    theme3_bath_salt: bathSaltItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch33_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch33_items.json`);
  console.log(`- テーマ1 (ヘアミルク): ${hairMilkItems.length}件`);
  console.log(`- テーマ2 (アイクリーム): ${eyeCreamItems.length}件`);
  console.log(`- テーマ3 (温活バスソルト): ${bathSaltItems.length}件`);
}

fetchWinterBatch33Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
