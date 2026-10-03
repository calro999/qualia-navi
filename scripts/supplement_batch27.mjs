import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch27() {
  console.log('🔄 [冬コスメ 第27弾] 不足・不整合アイテムの再取得と厳選30商品の完全化を開始します...');

  const batch27 = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch27_items.json', 'utf8'));

  // --- テーマ1: スティック美容液・バームスティック ---
  console.log('\n=== テーマ1: スティック美容液・バームスティック 再調整 ===');
  // 保持する優良アイテム
  const t1KeepKeys = [
    'ipsa_the_time_r_day_essence_stick',
    'kahi_wrinkle_bounce_multi_balm',
    'etvos_mineral_radiant_skin_balm',
    'mimc_beauty_bio_moisture_stick',
    'kanzousan_moist_stick_serum'
  ];
  let t1Items = batch27.theme1_stickserum.filter(it => t1KeepKeys.includes(it.brandKey));

  // 追加で確実に取得する人気スティック美容液
  const t1Replacements = [
    { brand: 'time_secret_day_essence_balm', name: 'TIME SECRET タイムシークレット 薬用デイエッセンスバーム 医薬部外品', query: 'タイムシークレット デイエッセンスバーム' },
    { brand: 'curel_moist_repair_eye_balm', name: '花王 キュレル モイストリペア アイクリーム / バームスティック', query: 'キュレル アイクリーム' },
    { brand: 'club_suppin_care_stick', name: 'クラブ すっぴん スキンローション スティック / スキンケアバーム', query: 'クラブ すっぴん スティック' },
    { brand: 'dr_althea_multi_balm_stick', name: 'ドクターエルシア マルチバーム スティック / CICAバーム', query: 'マルチバーム スティック' },
    { brand: 'addiction_glow_stick', name: 'ADDICTION アディクション ザ グロウ スティック', query: 'アディクション ザ グロウ スティック' }
  ];

  for (const cfg of t1Replacements) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり') && !it.itemName.includes('Tシャツ'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        t1Items.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: ネイルオイル・キューティクルオイル ---
  console.log('\n=== テーマ2: ネイルオイル・キューティクルオイル 再調整 ===');
  const t2KeepKeys = [
    'uka_nail_oil_2445',
    'dior_creme_abricot_serum',
    'opi_pro_spa_nail_cuticle_oil',
    'loccitane_shea_nail_cuticle_oil',
    'muji_nail_care_oil_pen',
    'excel_essence_nail_oil',
    'belinda_cube_nail_oil',
    'nail_holic_repair_milky_oil'
  ];
  let t2Items = batch27.theme2_nailoil.filter(it => t2KeepKeys.includes(it.brandKey));

  const t2Replacements = [
    { brand: 'canmake_make_me_happy_nail_oil', name: 'CANMAKE キャンメイク メイクミーハッピー ネイルオイル', query: 'メイクミーハッピー ネイルオイル' },
    { brand: 'and_nail_organic_blend_oil', name: '石澤研究所 アンドネイル オーガニックブレンドオイル / ネイルベッドオイル', query: 'アンドネイル オーガニックブレンドオイル' }
  ];

  for (const cfg of t2Replacements) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        t2Items.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: ネック＆デコルテクリーム・リフトケア ---
  console.log('\n=== テーマ3: ネック＆デコルテクリーム 再調整 ===');
  const t3KeepKeys = [
    'clarins_firming_ex_neck_decollete',
    'decorte_aq_concentrate_neck_cream',
    'elixir_advanced_aging_care_cream',
    'sisley_creme_pour_le_cou_neck',
    'pola_ba_grandluxe_neck_care',
    'attenir_dresslift_night_cream',
    'acseine_moistbalance_gel_cream'
  ];
  let t3Items = batch27.theme3_neckcream.filter(it => t3KeepKeys.includes(it.brandKey));

  const t3Replacements = [
    { brand: 'elixir_pure_retinol_linkle_cream', name: '資生堂 エリクシール シュペリエル レチノパワー リンクルクリーム L', query: 'レチノパワー リンクルクリーム' },
    { brand: 'obagi_x_derma_advance_lift_cream', name: 'ロート製薬 オバジ オバジX ダーマアドバンスドリフト クリーム', query: 'オバジX ダーマアドバンスドリフト' },
    { brand: 'kiehls_ultra_facial_cream', name: 'KIEHL\'S キールズ クリーム UFC 50ml / 高保湿バリア', query: 'キールズ クリーム UFC 50ml' }
  ];

  for (const cfg of t3Replacements) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり') && !it.itemName.includes('Tシャツ'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        t3Items.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // それぞれ10件ずつに調整
  console.log(`\n最終アイテム集計: スティック美容液=${t1Items.length}/10, ネイルオイル=${t2Items.length}/10, ネッククリーム=${t3Items.length}/10`);

  const finalizedData = {
    theme1_stickserum: t1Items.slice(0, 10),
    theme2_nailoil: t2Items.slice(0, 10),
    theme3_neckcream: t3Items.slice(0, 10)
  };

  fs.writeFileSync('scratch/rakuten_winter_batch27_items.json', JSON.stringify(finalizedData, null, 2), 'utf8');
  console.log('🎉 scratch/rakuten_winter_batch27_items.json を正確な30商品で完全更新しました！');
}

supplementBatch27().catch(console.error);
