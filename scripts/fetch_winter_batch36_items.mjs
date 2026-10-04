import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch36Items() {
  console.log('❄️ [11-12月コスメ 第36弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 【2026冬・紫外線が下がる今こそシミ・くすみを一掃】高保湿・薬用集中美白美容液 10選 ---
  console.log('\n=== テーマ1: 高保湿・薬用集中美白美容液 ===');
  const whiteningConfigs = [
    { brand: 'shiseido_haku_melanofocus_iv', name: 'SHISEIDO 資生堂 HAKU メラノフォーカスIV / EV 薬用美白美容液 4MSK トラネキサム酸', query: 'HAKU メラノフォーカス' },
    { brand: 'decorte_whitelogist_neogenesis', name: 'DECORTÉ コスメデコルテ ホワイトロジスト ネオジェネシス ブライトニング コンセントレイト コウジ酸', query: 'コスメデコルテ ホワイトロジスト' },
    { brand: 'pola_white_shot_facial_serum', name: 'POLA ポーラ ホワイトショット フェイシャルセラム 美白美容液 ルシノール', query: 'ポーラ ホワイトショット 美容液' },
    { brand: 'lancome_clarifique_brightening_serum', name: 'LANCOME ランコム クラリフィック ブライトニング セラム PHA ナイアシンアミド ウォーターピーリング', query: 'ランコム クラリフィック セラム' },
    { brand: 'kiehls_clearly_corrective_dark_spot_solution', name: 'Kiehl\'s キールズ DS クリアリーホワイト ブライトニング エッセンス 活性型ビタミンC 透明美白', query: 'キールズ DS クリアリーホワイト' },
    { brand: 'obagi_c25_serum_neo_brightening', name: 'Obagi オバジ C25セラム ネオ ピュアビタミンC25% 高濃度 極限美容液 くすみ 毛穴 ハリ', query: 'オバジ C25セラム ネオ' },
    { brand: 'melano_cc_premium_brightening_essence', name: 'ロート製薬 メラノCC 薬用しみ集中対策 プレミアム美容液 ピュアビタミンC アラントイン', query: 'メラノCC プレミアム 美容液' },
    { brand: 'astalift_white_advanced_lotion_serum', name: 'ASTALIFT アスタリフト ホワイト ジェリー アクアリスタ / アドバンスドエッセンス ナノアスタキサンチン', query: 'アスタリフト ホワイト ジェリー' },
    { brand: 'dior_snow_essence_of_light_serum', name: 'DIOR ディオール スノー エッセンス オブ ライト セラム エーデルワイスエキス 薬用美白', query: 'ディオール スノー 美容液' },
    { brand: 'fancl_brightening_essence_whitening', name: 'FANCL ファンケル ブライトニング エッセンス 薬用美白美容液 ビタミンC誘導体 無添加処方', query: 'ファンケル ブライトニング エッセンス' }
  ];

  const whiteningItems = [];
  for (const cfg of whiteningConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        whiteningItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・静電気＆マフラー摩擦を即撃退】とかすだけで濡れツヤ髪へ！高機能美髪ヘアコーム＆静電気拡散コーム 10選 ---
  console.log('\n=== テーマ2: 高機能美髪ヘアコーム＆静電気拡散コーム ===');
  const hairCombConfigs = [
    { brand: 'love_chrome_k24gp_tsuki_gold', name: 'LOVE CHROME ラブクロム K24GP ツキ ゴールド 純金コーティング 静電気拡散 美髪コーム', query: 'ラブクロム K24GP ツキ' },
    { brand: 'love_chrome_k24gp_tetsuki_gold', name: 'LOVE CHROME ラブクロム K24GP テツキ ゴールド サロン仕様 ハンドル付き美髪コーム', query: 'ラブクロム K24GP テツキ' },
    { brand: 'love_chrome_pg_tsuki_black', name: 'LOVE CHROME ラブクロム PG ツキ プレミアムブラック 静電気防止 持ち運びヘアコーム', query: 'ラブクロム PG ツキ' },
    { brand: 'refa_heart_comb_ray', name: 'ReFa リファ ハートコーム レイ 折りたたみ 携帯用 ツヤ髪 静電気軽減 ワイドコーム', query: 'リファ ハートコーム' },
    { brand: 'love_chrome_k24gp_scalp_guasha', name: 'LOVE CHROME ラブクロム K24GP スカルプカッサ ゴールド 頭皮ケア ほぐし 美髪コーム', query: 'ラブクロム スカルプカッサ' },
    { brand: 'tangle_teezer_the_ultimate_detangler', name: 'Tangle Teezer タングルティーザー ザ・アルティメットディタングラー 濡れ髪専用 もつれ解消コーム', query: 'タングルティーザー アルティメットディタングラー' },
    { brand: 'wet_brush_pro_speed_dry', name: 'WetBrush ウェットブラシ プロ スピードドライ / フレックスドライ 耐熱速乾 風抜けコーム', query: 'ウェットブラシ プロ' },
    { brand: 'mason_pearson_pocket_bristle_comb', name: 'MASON PEARSON メイソンピアソン ポケットコーム / テールドコーム 高級ハンドメイド', query: 'メイソンピアソン コーム' },
    { brand: 'love_chrome_b3_tsuki_deepblack', name: 'LOVE CHROME ラブクロム B3 ツキ ディープブラック プロフェッショナル仕様 静電気拡散コーム', query: 'ラブクロム B3 ツキ' },
    { brand: 'uka_scalp_cleansing_brush_kenzan', name: 'uka ウカ スカルプブラシ ケンザン 頭皮コリほぐし ツボ押し インバス・アウトバス', query: 'ウカ スカルプブラシ ケンザン' }
  ];

  const hairCombItems = [];
  for (const cfg of hairCombConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairCombItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬ホリデー・極上の香りと潤いに包まれる】ボディケア＆バスタイム限定コフレ・プレミアムギフトセット 10選 ---
  console.log('\n=== テーマ3: ボディケア＆バスタイム限定コフレ・プレミアムギフトセット ===');
  const bodycareCoffretConfigs = [
    { brand: 'sabon_holiday_body_care_gift_set', name: 'SABON サボン ホリデー ギフトセット スクラブ シャワーオイル ボディローション コフレ', query: 'SABON ホリデー ギフト' },
    { brand: 'loccitane_holiday_hand_body_collection', name: 'L\'OCCITANE ロクシタン ホリデー シア / アーモンド ハンド＆ボディケア コフレセット', query: 'ロクシタン ホリデー コフレ' },
    { brand: 'jo_malone_holiday_bath_body_travel_collection', name: 'Jo Malone London ジョー マローン ロンドン コロン ＆ ボディケア ギフトセット', query: 'ジョーマローン ギフトセット コロン' },
    { brand: 'lush_christmas_bath_bomb_gift_box', name: 'LUSH ラッシュ みつばちマーチ＆バスボム ギフトセット 贅沢バスタイム', query: 'ラッシュ ギフトセット バスボム' },
    { brand: 'laura_mercier_amber_vanilla_body_duet', name: 'LAURA MERCIER ローラ メルシエ ホリデー アンバーバニラ ボディスフレ ＆ ハンドクリーム キット', query: 'ローラメルシエ アンバーバニラ ギフト' },
    { brand: 'diptyque_holiday_bath_body_fragrance_set', name: 'diptyque ディプティック ホリデー ボディケア ＆ ミニキャンドル フレグランス ギフトセット', query: 'ディプティック ホリデー ギフト' },
    { brand: 'molton_brown_holiday_festive_bauble_bath', name: 'MOLTON BROWN モルトンブラウン ホリデー フェスティブ ボーブル バス＆シャワージェル セット', query: 'モルトンブラウン ホリデー' },
    { brand: 'jillstuart_holiday_body_milk_hand_set', name: 'JILL STUART ジルスチュアート ホワイトフローラル ボディミルク＆ハンドクリーム ギフトセット', query: 'ジルスチュアート ギフト ボディミルク ハンドクリーム' },
    { brand: 'shiro_holiday_body_milk_mist_fragrance', name: 'SHIRO シロ ホリデー限定 ホワイトリリー / サボン ボディケア ＆ パフューム ギフト', query: 'SHIRO ホリデー ギフト' },
    { brand: 'aux_paradis_winter_bodycare_gift_can', name: 'AUX PARADIS オゥパラディ ウィンターベリー アロマティック ボディミルク＆ハンドクリーム セット', query: 'オゥパラディ ギフト' }
  ];

  const bodycareCoffretItems = [];
  for (const cfg of bodycareCoffretConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bodycareCoffretItems.push(valid);
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
    theme1_whitening: whiteningItems,
    theme2_hair_comb: hairCombItems,
    theme3_bodycare_coffret: bodycareCoffretItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch36_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch36_items.json`);
  console.log(`- テーマ1 (高保湿・薬用集中美白美容液): ${whiteningItems.length}件`);
  console.log(`- テーマ2 (高機能美髪ヘアコーム): ${hairCombItems.length}件`);
  console.log(`- テーマ3 (ボディケア＆バス限定コフレ): ${bodycareCoffretItems.length}件`);
}

fetchWinterBatch36Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
