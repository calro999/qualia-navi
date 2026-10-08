import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch66Items() {
  console.log('❄️ [11-12月冬コスメ 第66弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【コスメ＆ビューティーアドベントカレンダー2026】 10選 ---
  console.log('\n=== テーマ1: コスメ＆ビューティーアドベントカレンダー2026 ===');
  const adventConfigs = [
    { brand: 'loccitane_holiday_advent_calendar_premium', name: 'ロクシタン L\'OCCITANE アドベントカレンダー ホリデー限定 ハンドクリーム ボディケア コスメ ギフト 2026', query: 'ロクシタン アドベントカレンダー' },
    { brand: 'paul_and_joe_advent_calendar_makeup_skincare', name: 'ポール＆ジョー PAUL & JOE メイクアップ コレクション アドベントカレンダー リップ プライマー コフレ', query: 'ポール&ジョー アドベントカレンダー' },
    { brand: 'kiehls_holiday_advent_calendar_skincare_set', name: 'キールズ KIEHL\'S ホリデー アドベントカレンダー スキンケア 美容液 クリーム ミニボトル 豪華限定セット', query: 'キールズ アドベントカレンダー' },
    { brand: 'sabon_holiday_advent_calendar_bath_body_spa', name: 'SABON サボン アドベントカレンダー ホリデー ボディ用スクラブ シャワーオイル ハンドクリーム ギフト', query: 'SABON アドベントカレンダー' },
    { brand: 'clarins_holiday_advent_calendar_beauty_curation', name: 'クラランス CLARINS アドベントカレンダー ホリデー スキンケア リップオイル ダブルセーラム ミニキット', query: 'クラランス アドベントカレンダー' },
    { brand: 'the_body_shop_holiday_beauty_advent_calendar', name: 'ザ・ボディショップ THE BODY SHOP アドベントカレンダー ビューティー ボディバター ハンドクリーム 限定', query: 'ボディショップ アドベントカレンダー' },
    { brand: 'clinique_holiday_advent_calendar_skincare_set', name: 'クリニーク CLINIQUE アドベントカレンダー ホリデー 24デイズ スキンケア メイク モイスチャーサージ', query: 'クリニーク アドベントカレンダー' },
    { brand: 'mac_holiday_advent_calendar_makeup_collection', name: 'M・A・C マック ホリデー アドベントカレンダー リップスティック アイシャドウ メイクアップ 限定コフレ', query: 'MAC アドベントカレンダー コスメ' },
    { brand: 'dr_ci_labo_holiday_advent_calendar_anti_aging', name: 'ドクターシーラボ アドベントカレンダー ホリデーコフレ VC100 アクアコラーゲンゲル 美容液 贅沢セット', query: 'アドベントカレンダー コスメ コフレ' },
    { brand: 'luxury_beauty_holiday_countdown_advent_box', name: 'ホリデー ビューティー アドベントカレンダー 24日間 カウントダウン スキンケア ボディケア コフレ ギフト', query: 'クリスマス アドベントカレンダー コスメ' }
  ];

  const adventItems = [];
  for (const cfg of adventConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (adventItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古') && !adventItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        adventItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【ホリデースキンケアコフレ＆プレミアム集中保湿限定キット2026】 10選 ---
  console.log('\n=== テーマ2: ホリデースキンケアコフレ＆プレミアム集中保湿限定キット2026 ===');
  const skincareCoffretConfigs = [
    { brand: 'sk2_pitera_holiday_coffret_special_set', name: 'SK-II SK2 エスケーツー ピテラ ベストコレクション ホリデー コフレ フェイシャルトリートメント エッセンス', query: 'SK-II クリスマスコフレ スキンケア' },
    { brand: 'cosme_decorte_liposome_holiday_repair_kit', name: 'コスメデコルテ リポソーム アドバンスト リペアセラム ホリデーキット 保湿美容液 リペアクリーム コフレ', query: 'コスメデコルテ リポソーム コフレ' },
    { brand: 'estee_lauder_advanced_night_repair_holiday_set', name: 'エスティローダー アドバンス ナイトリペア ホリデー スキンケア セット 美容液 アイクリーム コフレ 限定', query: 'エスティローダー ナイトリペア セット' },
    { brand: 'lancome_genifique_ultimate_holiday_skincare_kit', name: 'ランコム LANCOME ジェニフィック アルティメット ホリデー キット 美容液 シートマスク スキンケア コフレ', query: 'ランコム ジェニフィック キット' },
    { brand: 'kiehls_ultra_facial_cream_holiday_moisture_set', name: 'キールズ KIEHL\'S ホリデー スキンケア セット UFCクリーム 美容液 化粧水 保湿 ギフト コフレ 限定', query: 'キールズ ホリデー スキンケア' },
    { brand: 'obagi_c25_serum_neo_holiday_special_skincare', name: 'オバジ Obagi C25セラム ネオ ホリデーセット プレミアム ビタミンC美容液 フレームリフト ハリ 保湿', query: 'オバジ C25 セラム セット' },
    { brand: 'kanebo_comfort_stretchy_wash_holiday_skincare', name: 'KANEBO カネボウ スキンケア ホリデーキット クリームインデイ ライブリースキン ウェア 保湿 コフレ', query: 'KANEBO カネボウ スキンケア キット' },
    { brand: 'astalift_jelly_aquarysta_holiday_aging_care_set', name: 'アスタリフト ASTALIFT ジェリー アクアリスタ ホリデー 集中スキンケア セット 先行美容液 ハリ 保湿', query: 'アスタリフト スキンケア セット' },
    { brand: 'shiseido_ultimune_holiday_power_infusing_kit', name: 'SHISEIDO 資生堂 アルティミューン パワライジング ホリデー キット 美容液 スキンケア セット コフレ', query: '資生堂 アルティミューン キット' },
    { brand: 'dr_ci_labo_enrich_lift_holiday_special_coffret', name: 'ドクターシーラボ アクアコラーゲンゲル エンリッチリフトEX ホリデー スペシャル コフレ 美容液 マスク', query: 'ドクターシーラボ コフレ スキンケア' }
  ];

  const skincareCoffretItems = [];
  for (const cfg of skincareCoffretConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (skincareCoffretItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古') && !skincareCoffretItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        skincareCoffretItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【濃密マイクロ高濃度炭酸泡洗顔料＆温感ホイップ洗顔フォーム】 10選 ---
  console.log('\n=== テーマ3: 濃密マイクロ高濃度炭酸泡洗顔料＆温感ホイップ洗顔フォーム ===');
  const carbonicFoamConfigs = [
    { brand: 'sofina_ip_renew_mousse_wash_carbonic_acid', name: 'SOFINA iP ソフィーナiP リニュームース ウォッシュ 濃密マイクロ炭酸泡洗顔料 くすみオフ 血行促進 保湿', query: 'ソフィーナip リニュームース ウォッシュ' },
    { brand: 'obagi_x_frame_lift_mousse_carbonic_wash', name: 'オバジX フレームリフト ムースウォッシュ 高密度炭酸泡洗顔 ハリ つや 毛穴汚れオフ うるおいキープ', query: 'オバジX フレームリフト ムースウォッシュ' },
    { brand: 'shikari_brightening_wash_carbonic_brush_set', name: 'SHIKARI シカリ ブライトニングウォッシュ 洗顔パック 薬用 有効成分配合 毛穴 ブラシ付き マイクロ泡', query: 'SHIKARI シカリ 洗顔' },
    { brand: 'bifesta_carbonated_foam_wash_brightup_pore', name: 'ビフェスタ 炭酸泡洗顔 ブライトアップ くすみ 角質 毛穴すっきり 濃密ホイップ 炭酸洗顔フォーム', query: 'ビフェスタ 炭酸泡洗顔' },
    { brand: 'dr_medion_headspa_carbonic_micro_mousse_wash', name: 'ドクターメディオン スパオキシ ムースウォッシュ 炭酸泡洗顔 高濃度炭酸ガス 毛穴ケア くすみオフ 保湿', query: 'ドクターメディオン 炭酸 洗顔' },
    { brand: 'hada_nature_carbonic_hot_cleansing_w_foam', name: '肌ナチュール 炭酸クレンジング 炭酸泡洗顔 ホット 濃密泡 メイク落とし 毛穴の黒ずみ 保湿成分配合', query: '肌ナチュール 炭酸 クレンジング' },
    { brand: 'priere_carbonic_acid_deep_cleansing_facial_wash', name: 'プリエクラ 炭酸泡洗顔 マイクロバブル 洗顔料 ビタミンC 保湿 くすみ 毛穴汚れ 濃密ホイップ', query: 'プリエクラ 炭酸洗顔' },
    { brand: 'rafra_warm_marshmallow_orange_carbonic_cleanser', name: 'ラフラ RAFRA マシュマロオレンジ 炭酸泡洗顔 温感 クレンジング 洗顔料 ビタミンC オレンジ精油 アロマ', query: 'ラフラ マシュマロオレンジ' },
    { brand: 'duo_the_bright_foam_carbonic_facial_cleanser', name: 'DUO デュオ ザ ブライトフォーム 炭酸泡洗顔料 毛穴 マッサージ 保湿 美肌カプセル 濃密泡 くすみケア', query: 'DUO ザ ブライトフォーム' },
    { brand: 'medicube_zero_pore_carbonic_deep_foam_wash', name: 'メディキューブ 炭酸泡洗顔 毛穴ケア ゼロポア 高濃度マイクロ炭酸 角質ケア 泡立て不要 時短洗顔', query: '炭酸泡洗顔 毛穴 濃密泡' }
  ];

  const carbonicFoamItems = [];
  for (const cfg of carbonicFoamConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (carbonicFoamItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !carbonicFoamItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        carbonicFoamItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 結果の保存
  const result = {
    theme1_holiday_advent_calendar: adventItems,
    theme2_skincare_holiday_coffret: skincareCoffretItems,
    theme3_carbonic_acid_foam_wash: carbonicFoamItems
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch66_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第66弾 全${adventItems.length + skincareCoffretItems.length + carbonicFoamItems.length}件のアイテム保存完了: ${outPath}`);
  console.log(`- テーマ1 (アドベントカレンダー): ${adventItems.length}件`);
  console.log(`- テーマ2 (スキンケアコフレ): ${skincareCoffretItems.length}件`);
  console.log(`- テーマ3 (炭酸泡洗顔): ${carbonicFoamItems.length}件`);
}

fetchWinterBatch66Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
