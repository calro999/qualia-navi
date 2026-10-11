import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch83Items() {
  console.log('❄️ [11-12月冬コスメ 第83弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 2層式オイルイン化粧水＆シェイクローション 10選 ---
  console.log('\n=== テーマ1: 2層式オイルイン化粧水＆シェイクローション ===');
  const oilLotionConfigs = [
    { brand: 'kanebo_skin_harmonizer', name: 'KANEBO カネボウ スキン ハーモナイザー 2層式 オイルイン化粧水 闘う化粧水 皮脂 水分バランス', query: 'カネボウ スキン ハーモナイザー' },
    { brand: 'dalba_white_truffle_first_spray_serum', name: 'ダルバ dAlba ホワイトトリュフ ファースト スプレー セラム 2層式 ミスト オイルイン トナー', query: 'ダルバ スプレーセラム' },
    { brand: 'rmk_w_treatment_lotion', name: 'RMK Wトリートメント ローション オイルイン 高保湿 エモリエント リッチ 化粧水', query: 'RMK Wトリートメントローション' },
    { brand: 'femmue_dual_essence', name: 'ファミュ FEMMUE デュアルエッセンス カメリア 2層式 オイル セラム ミスト 美容液化粧水', query: 'ファミュ デュアルエッセンス' },
    { brand: 'shiseido_future_solution_lx_treatment_oil', name: 'SHISEIDO 資生堂 フューチャーソリューション LX ユニバーサル ディフェンス または オイルイン ローション', query: '資生堂 オイルイン ローション' },
    { brand: 'athletia_skin_conditioning_oil', name: 'アスレティア athletia スキンコンディショニング オイル または コアバランス オイルイン', query: 'アスレティア コアバランス オイル' },
    { brand: 'albion_herbal_oil_trinity_fusion', name: 'アルビオン ALBION ハーバルオイル トリニティフュージョン または フローラドリップ マルチオイル', query: 'アルビオン ハーバルオイル' },
    { brand: 'chant_a_charm_deep_moist_oil', name: 'チャントアチャーム chant a charm ディープ モイスト オイル 2層式 エッセンス 保湿ブースター', query: 'チャントアチャーム ディープモイストオイル' },
    { brand: 'cosmedecorte_lift_dimension_lotion', name: 'コスメデコルテ リフトディメンション エバーブライト プランプ ローション 高保湿 ハリ 弾力', query: 'コスメデコルテ リフトディメンション ローション' },
    { brand: 'trilogy_rosehip_oil_mist_toner', name: 'トリロジー trilogy ハイドレーティング ミスト トナー ローズヒップ オイルイン 高保湿', query: 'トリロジー ミスト トナー' }
  ];

  const oilLotionItems = [];
  for (const cfg of oilLotionConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (oilLotionItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !oilLotionItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        oilLotionItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 温感ヘッドスパ＆スカルプ温感クレンジングジェル 10選 ---
  console.log('\n=== テーマ2: 温感ヘッドスパ＆スカルプ温感クレンジングジェル ===');
  const headSpaConfigs = [
    { brand: 'lement_sparkling_oil_cleansing_headspa', name: 'ルメント Le ment 高濃度炭酸オイルクレンジング＆シャンプー 温感ヘッドスパ アミノ酸', query: 'ルメント スパークリングオイル クレンジング' },
    { brand: 'clayence_clayspa_headspa_treatment', name: 'クレイエンス clayence クレイスパ ヘッドスパ 温感 クレンジング クレイ トリートメント', query: 'クレイエンス ヘッドスパ' },
    { brand: 'fancl_mild_cleansing_scalp_gel', name: 'ファンケル FANCL マイルドクレンジング スカルプ 頭皮用 クレンジング ジェル 毛穴 毛根', query: 'ファンケル スカルプ クレンジング' },
    { brand: 'andhoney_deep_moist_scalp_cleansing', name: 'アンドハニー andhoney ディープモイスト スカルプ 頭皮 スパ クレンジング オイル ハチミツ', query: 'アンドハニー スカルプ クレンジング' },
    { brand: 'lasana_premior_scalp_cleansing', name: 'ラサーナ La Sana プレミオール ヘッドクレンズ スカルプ クレンジング 頭皮ケア 海藻泥', query: 'ラサーナ プレミオール スカルプ クレンジング' },
    { brand: 'botanist_botanical_scalp_cleansing_serum', name: 'ボタニスト BOTANIST ボタニカル スカルプ クレンジング リペア セラム クレイ 頭皮ケア', query: 'ボタニスト スカルプ クレンジング' },
    { brand: 'aderans_scalp_warm_cleansing_gel', name: 'アデランス ヘアリプロ スカルプ クレンジング ジェル 温感 炭酸 頭皮ケア 育毛サポート', query: 'アデランス スカルプ クレンジング' },
    { brand: 'eight_the_thalasso_headspa_reset_cleansing', name: 'エイトザタラソ 8 THE THALASSO リセット クレンジング 美容液 プレシャンプー スカルプ', query: 'エイトザタラソ クレンジング プレシャンプー' },
    { brand: 'wafood_made_sake_lees_headspa', name: 'ワフードメイド 酒粕パック スカルプ または アルジェラン 温感 スカルプ クレンジング', query: 'アルジェラン スカルプ クレンジング' },
    { brand: 'steven_knoll_scalp_cleansing_clay', name: 'スティーブンノル コーセー モイスチュア ソフニング スカルプ クレンジング クレイ 頭皮用', query: 'スティーブンノル スカルプ クレンジング' }
  ];

  const headSpaItems = [];
  for (const cfg of headSpaConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (headSpaItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !headSpaItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        headSpaItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: マグネットネイル＆ホリデーセルフジェルネイルキット 10選 ---
  console.log('\n=== テーマ3: マグネットネイル＆ホリデーセルフジェルネイルキット ===');
  const magnetNailConfigs = [
    { brand: 'nail_koubou_5d_magnet_gel', name: 'ネイル工房 5D マグネットジェル 微粒子 キャッツアイ 奥行き ホリデーネイル UV/LED対応', query: 'ネイル工房 マグネットジェル 5D' },
    { brand: 'nailtown_irogel_silky_magnet_gel', name: 'ネイルタウン irogel シルキーマグネットジェル 微粒子 うるうる キャッツアイネイル', query: 'ネイルタウン シルキー マグネットジェル' },
    { brand: 'petitprice_cheek_magnet_gel', name: 'プチプラ petitprice チークマグネットジェル ぷるマグ ビー玉ネイル ホリデー セルフネイル', query: 'プチプラ マグネットジェル' },
    { brand: 'gracegel_magnet_gel_cats_eye', name: 'グレースジェル Grace Gel マグネット キャッツアイ ジェルネイル 国産 大容量', query: 'グレースジェル マグネットジェル' },
    { brand: 'gel_me1_magnet_gel_polish', name: 'Gel Me1 ジェルミーワン はがせる マグネットジェル LEDライト対応 セルフジェルネイル', query: 'ジェルミーワン マグネット' },
    { brand: 'toyz_inity_party_flash_magnet', name: 'TOY\'s × INITY トイズバイアイニティ パーティーフラッシュ マグネットジェル 爆輝き', query: 'トイズバイアイニティ マグネット' },
    { brand: 'nail_koubou_strong_magnet_stick', name: 'ネイル工房 超強力 2way マグネットスティック 磁石 プレート ビー玉 キャッツアイ', query: 'ネイル工房 マグネット スティック' },
    { brand: 'nailtown_starter_kit_uv_led_light', name: 'ネイルタウン ジェルネイル スターターキット UV/LED ネイルライト 届いてすぐできる フルセット', query: 'ネイルタウン ジェルネイル スターターキット' },
    { brand: 'kokoist_planet_magnet_gel', name: 'KOKOIST ココイスト プラネットマグネット ハイグロス プロ用 マグネットジェル', query: 'ココイスト プラネット マグネット' },
    { brand: 'leafgel_premium_space_magnet', name: 'シャレドワ SHAREYDVA マグネットパウダー または マグネットジェル ネイルアート', query: 'シャレドワ マグネット' }
  ];

  const magnetNailItems = [];
  for (const cfg of magnetNailConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (magnetNailItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !magnetNailItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        magnetNailItems.push(valid);
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
    theme1_biphasic_oil_lotion: oilLotionItems,
    theme2_warming_head_spa: headSpaItems,
    theme3_magnetic_gel_nail: magnetNailItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch83_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第83弾 30商品の最新データ保存完了: ${outPath}`);
  console.log(`テーマ1 (2層式オイルイン化粧水): ${oilLotionItems.length}/10`);
  console.log(`テーマ2 (温感ヘッドスパ): ${headSpaItems.length}/10`);
  console.log(`テーマ3 (マグネットネイル): ${magnetNailItems.length}/10`);
}

fetchWinterBatch83Items().catch(console.error);
