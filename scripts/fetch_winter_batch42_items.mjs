import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch42Items() {
  console.log('❄️ [11-12月冬コスメ 第42弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬・乾燥と摩擦をゼロにする極上毛穴レスオフ】高保湿クレンジングオイル＆植物性ディープクレンジング 10選 ---
  console.log('\n=== テーマ1: 高保湿クレンジングオイル＆植物性ディープクレンジング ===');
  const cleansingOilConfigs = [
    { brand: 'shu_uemura_ultime8_cleansing_oil', name: 'shu uemura シュウ ウエムラ アルティム8∞ スブリム ビューティ クレンジング オイルn 450ml / 150ml 椿オイル 高保湿', query: 'シュウウエムラ アルティム8 クレンジングオイル 450ml' },
    { brand: 'fancl_mild_cleansing_oil_black_dry', name: 'FANCL ファンケル マイルドクレンジング オイル 120ml 毛穴 摩擦レス 無添加 うるおいキープ つっぱらない', query: 'ファンケル マイルドクレンジングオイル 120ml' },
    { brand: 'attenir_skin_clear_cleanse_oil_aroma', name: 'Attenir アテニア スキンクリア クレンズ オイル アロマタイプ / 無香料 175ml 糖化くすみケア 高保湿', query: 'アテニア スキンクリア クレンズ オイル 175ml' },
    { brand: 'ma_nyo_pure_cleansing_oil_kbeauty', name: '魔女工場 manyo ピュア クレンジング オイル 200ml 韓国コスメ 植物性オイル 毛穴 角栓 敏感肌', query: '魔女工場 ピュアクレンジングオイル 200ml' },
    { brand: 'bobbi_brown_soothing_cleansing_oil', name: 'BOBBI BROWN ボビイ ブラウン スージング クレンジング オイル 200ml 植物由来 美容液オイル 洗い上がりしっとり', query: 'ボビイブラウン スージング クレンジング オイル' },
    { brand: 'three_balancing_cleansing_oil_n', name: 'THREE スリー バランシング クレンジング オイル N 185ml 精油ブレンド オーガニック 乳化が早い', query: 'THREE バランシング クレンジング オイル N' },
    { brand: 'kanebo_mellow_off_veil_cleansing', name: 'KANEBO カネボウ メロウ オフ ヴェール 160g / オイル とろける生感触 うるおいヴェール 洗顔不要', query: 'カネボウ メロウ オフ ヴェール' },
    { brand: 'ipsa_cleansing_oil_ex_hydrating', name: 'IPSA イプサ クレンジング オイル EX 196ml バリア機能キープ 毛穴奥まですっきり なめらか', query: 'イプサ クレンジング オイル EX' },
    { brand: 'clinique_take_the_day_off_cleansing_oil', name: 'CLINIQUE クリニーク テイク ザ デイ オフ クレンジング オイル 200ml 低刺激 ウォータープルーフ対応', query: 'クリニーク テイク ザ デイ オフ クレンジング オイル' },
    { brand: 'muji_mild_cleansing_oil_high_moist', name: '無印良品 マイルドオイルクレンジング 400ml / 200ml オリーブ油 ホホバ油 プチプラ 高保湿大容量', query: '無印良品 マイルドオイルクレンジング 400ml' }
  ];

  const cleansingOilItems = [];
  for (const cfg of cleansingOilConfigs) {
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
        cleansingOilItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・サロン帰りの極上ツヤとまとまりを再現】サロン専売高保湿ダメージ補修シャンプー＆トリートメントセット 10選 ---
  console.log('\n=== テーマ2: サロン専売高保湿ダメージ補修シャンプー＆トリートメントセット ===');
  const salonHairConfigs = [
    { brand: 'kerastase_chronologiste_regeneration_set', name: 'KERASTASE ケラスターゼ CH バン クロノロジスト R 250ml ＆ マスク クロノロジスト 200g 最高峰ヘアケア セット', query: 'ケラスターゼ クロノロジスト セット' },
    { brand: 'milbon_aujua_quench_haircare_set', name: 'Aujua オージュア クエンチ シャンプー ＆ ヘアトリートメント モイスト 各500ml 乾燥パサつき うるおい補給', query: 'オージュア クエンチ セット 500ml' },
    { brand: 'cota_icare_shampoo_treatment_set', name: 'COTA i CARE コタ アイ ケア シャンプー ＆ トリートメント 各800ml サロン専売 髪質改善 保湿 ダメージ補修', query: 'コタ アイケア シャンプー トリートメント セット 800ml' },
    { brand: 'tokio_ie_inkarami_platinum_set', name: 'TOKIO IE インカラミ プラチナム シャンプー ＆ トリートメント 各500ml フラーレン ケラチン結合 サロン級補修', query: 'TOKIO インカラミ プラチナム セット 500ml' },
    { brand: 'shiseido_sublimic_aqua_intensive_set', name: '資生堂 サブリミック アクアインテンシブ シャンプー 500ml ＆ トリートメント 500g 集中補修 うるおい満タン', query: 'サブリミック アクアインテンシブ セット 500ml' },
    { brand: 'lebel_seesaw_haircare_balance_set', name: 'LebeL SEE SAW ルベル シーソー シャンプー ＆ トリートメント バランス / タイト 各500ml 光を味方にする艶髪', query: 'ルベル シーソー セット 500ml' },
    { brand: 'milbon_grand_linkage_haircare_set', name: 'MILBON ミルボン グランドリンケージ シルキーリュクス / ウィローリュクス シャンプー ＆ トリートメント 各500ml サロンカラー持続', query: 'グランドリンケージ セット 500ml' },
    { brand: 'napla_n_dot_shea_shampoo_treatment_set', name: 'ナプラ N. エヌドット シアシャンプー ＆ シアトリートメント モイスチャー 各300ml シアバター高保湿 ハリコシ', query: 'エヌドット シアシャンプー トリートメント セット モイスチャー' },
    { brand: 'fiole_fprotect_rich_haircare_set', name: 'FIOLE フィヨーレ Fプロテクト ヘアシャンプー ＆ ヘアマスク リッチタイプ 各1000ml サロン専売 コスパ最強 詰替', query: 'フィヨーレ Fプロテクト リッチ セット 1000' },
    { brand: 'haho_nico_juugoroku_shampoo_treatment', name: 'HAHONICO ハホニコ ディスデモカ ヘアクレンジング 400ml ＆ ラメイプロトメント 280g ヘマチン配合 髪質再生', query: 'ハホニコ ディスデモカ ラメイプロトメント' }
  ];

  const salonHairItems = [];
  for (const cfg of salonHairConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        salonHairItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬・暖房による乾燥崩れ＆マフラー擦れを完全防御】高保湿メイクキープミスト＆モイストフィックススプレー 10選 ---
  console.log('\n=== テーマ3: 高保湿メイクキープミスト＆モイストフィックススプレー ===');
  const settingSprayConfigs = [
    { brand: 'kose_make_keep_mist_ex_moist', name: 'KOSE コーセー メイク キープ ミスト EX MOIST 85ml 限定モイスト 保湿 ヒアルロン酸 暖房乾燥ガード', query: 'コーセー メイクキープミスト モイスト' },
    { brand: 'decorte_comfort_day_mist_set_protect', name: 'コスメデコルテ コンフォート デイミスト セット＆プロテクト 60ml ウォータープルーフ 微細ミスト うるおいツヤ', query: 'コスメデコルテ コンフォート デイミスト セット プロテクト' },
    { brand: 'mac_prep_prime_fix_plus_original', name: 'M・A・C マック プレップ プライム フィックス+ 100ml / 30ml メイクアップフィクサー 保湿 水光肌ツヤ', query: 'MAC フィックスプラス 100ml' },
    { brand: 'shu_uemura_unlimited_makeup_fix_mist', name: 'shu uemura シュウ ウエムラ アンリミテッド メイクアップ フィックス ミスト 100ml 軽やかフォグミスト 高密着', query: 'シュウウエムラ フィックスミスト 100ml' },
    { brand: 'clarins_fix_make_up_setting_spray', name: 'CLARINS クラランス フィックス メイクアップ N 50ml ローズの香り アロエベラ 高保湿キープ', query: 'クラランス フィックスメイクアップ 50ml' },
    { brand: 'dalba_white_truffle_first_spray_serum', name: 'd\'Alba ダルバ ホワイトトリュフ ファースト スプレー セラム 100ml 韓国コスメ CAミスト 振って使うオイルイン', query: 'ダルバ ファーストスプレーセラム 100ml' },
    { brand: 'dprogram_allerbarrier_mist_sensitive', name: 'dプログラム アレルバリア ミスト N 57ml 資生堂 敏感肌 花粉 ちり ほこり 乾燥から守る 2層タイプ', query: 'dプログラム アレルバリア ミスト N' },
    { brand: 'shiseido_hada_senka_mist_glow', name: 'ELIXIR エリクシール つや玉ミスト 80ml 資生堂 美容水層 美容オイル層 きめ細かい霧 瞬時にツヤ玉', query: 'エリクシール つや玉ミスト' },
    { brand: 'tirtir_mask_fit_make_up_fixer', name: 'TIRTIR ティルティル マスクフィット メイクアップ フィクサー 80ml 高密着シールド 崩れ防止 韓国コスメ', query: 'TIRTIR メイクアップフィクサー 80ml' },
    { brand: 'sofinai_p_skin_care_uv_mist', name: 'SOFINA iP ソフィーナiP うるおいしっとりミスト / メイクキープミスト 炭酸微細ミスト 日中保湿ガード', query: 'ソフィーナip ミスト' }
  ];

  const settingSprayItems = [];
  for (const cfg of settingSprayConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        settingSprayItems.push(valid);
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
    fetchedAt: new Date().toISOString(),
    theme1_cleansingoil: cleansingOilItems,
    theme2_salonhair: salonHairItems,
    theme3_settingspray: settingSprayItems
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch42_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${cleansingOilItems.length}件, テーマ2: ${salonHairItems.length}件, テーマ3: ${settingSprayItems.length}件 を scratch/rakuten_winter_batch42_items.json に保存しました。`);
}

fetchWinterBatch42Items().catch(console.error);
