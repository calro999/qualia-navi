import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch30Items() {
  console.log('❄️ [11-12月コスメ 第30弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: ホットビューラー＆充電式温熱まつ毛カーラー 10選 ---
  console.log('\n=== テーマ1: ホットビューラー＆温熱まつ毛カーラー ===');
  const curlerConfigs = [
    { brand: 'panasonic_matsuge_kurun_curler', name: 'Panasonic パナソニック まつげくるん セパレートロングカール EH-SE51', query: 'パナソニック まつげくるん EH-SE51' },
    { brand: 'hollywood_eyelash_curler', name: 'グッズマン ハリウッドアイラズ ホットアイラッシュカーラー', query: 'ハリウッドアイラズ ホットアイラッシュカーラー' },
    { brand: 'anlan_hot_eyelash_curler_usb', name: 'ANLAN アンラン ホットビューラー 充電式 まつ毛カーラー', query: 'ANLAN ホットビューラー 充電式' },
    { brand: 'festino_hot_eyelash_curler', name: 'FESTINO フェスティノ ホットアイラッシュカーラー', query: 'フェスティノ ホットアイラッシュカーラー' },
    { brand: 'koizumi_eyelash_curler', name: 'KOIZUMI コイズミ プチエステ アイラッシュカーラー KLC-0980', query: 'コイズミ アイラッシュカーラー KLC' },
    { brand: 'areti_hot_eyelash_curler', name: 'Areti アレティ 充電式ホットビューラー まつ毛カーラー', query: 'アレティ ホットビューラー' },
    { brand: 'audew_or_kbe_hot_lash_curler', name: '貝印 ホットアイラッシュカーラー KQ-0342', query: '貝印 ホットアイラッシュカーラー' },
    { brand: 'eyelash_comb_curler_type', name: 'コイズミ ホットアイラッシュカーラー ボリュームコーム', query: 'コイズミ ホットビューラー コーム' },
    { brand: 'anlan_dual_comb_curler', name: 'ANLAN まつ毛カーラー 快速予熱 ホットビューラー', query: 'ANLAN ホットビューラー 快速予熱' },
    { brand: 'panasonic_comb_curler_natural', name: 'Panasonic パナソニック まつげくるん ナチュラルカール EH-SE11', query: 'パナソニック まつげくるん EH-SE11' }
  ];

  const curlerItems = [];
  for (const cfg of curlerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        curlerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿アイシャドウベース＆目元用プライマー 10選 ---
  console.log('\n=== テーマ2: 高保湿アイシャドウベース＆目元用プライマー ===');
  const primerConfigs = [
    { brand: 'canmake_lasting_multi_eyebase', name: 'CANMAKE キャンメイク ラスティングマルチアイベース WP', query: 'キャンメイク ラスティングマルチアイベース' },
    { brand: 'excel_fit_eyebase', name: 'excel エクセル フィットアイベース 保湿アイシャドウ下地', query: 'エクセル フィットアイベース' },
    { brand: 'nars_smudgeproof_eyeshadow_base', name: 'NARS ナーズ スマッジプルーフ アイシャドーベース', query: 'NARS スマッジプルーフ アイシャドーベース' },
    { brand: 'mac_prep_prime_24hour_eyebase', name: 'M・A・C マック プレップ プライム 24アワー エクステンド アイベース', query: 'MAC プレッププライム エクステンド アイベース' },
    { brand: 'lunasol_eyelid_base', name: 'LUNASOL ルナソル アイリッドベース 目元用プライマー', query: 'ルナソル アイリッドベース' },
    { brand: 'elegance_eyeclear_colorbase', name: 'Elégance エレガンス アイクリア カラーベース 目元用ファンデーション', query: 'エレガンス アイクリア カラーベース' },
    { brand: 'cezanne_eyeshadow_base', name: 'CEZANNE セザンヌ アイシャドウベース トーンアップ', query: 'セザンヌ アイシャドウベース' },
    { brand: 'toone_petaldrop_liquid_eyeshadow_or_primer', name: 'to/one トーン ペタル リキッド アイシャドウベース / 目元プライマー', query: 'トーン ペタル リキッド アイシャドウ' },
    { brand: 'etude_proof10_eye_primer', name: 'ETUDE エチュード プルーフ10 アイプライマー', query: 'エチュード プルーフ10 アイプライマー' },
    { brand: 'kate_oil_block_or_eyeshadow_base', name: 'KATE ケイト アイカラーベース 目元下地', query: 'ケイト アイカラーベース' }
  ];

  const primerItems = [];
  for (const cfg of primerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        primerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: マイクロニードルパッチ（ヒアルロン酸針パッチ・目元＆ほうれい線集中ケア） 10選 ---
  console.log('\n=== テーマ3: マイクロニードルパッチ（ヒアルロン酸針パッチ） ===');
  const patchConfigs = [
    { brand: 'kitano_hyalo_deep_patch', name: '北の快適工房 ヒアロディープパッチ マイクロニードル', query: 'ヒアロディープパッチ' },
    { brand: 'medilift_micro_filler_patch', name: 'ヤーマン メディリフト マイクロフィラー アイ 目元用ニードルパッチ', query: 'メディリフト マイクロフィラー' },
    { brand: 'dermafiller_premier_patch', name: 'Quanis クオニス ダーマフィラー プレミア マイクロニードルパッチ', query: 'ダーマフィラー プレミア' },
    { brand: 'vt_reedle_shot_needle_patch', name: 'VT COSMETICS リードルショット ニードルパッチ スポットケア', query: 'VT リードルショット パッチ' },
    { brand: 'rohto_hadalabo_or_patch', name: 'スパトリートメント HAS マイクロパッチ 針美容シート', query: 'スパトリートメント HAS マイクロパッチ' },
    { brand: 'dr_ci_labo_needle_patch', name: 'ドクターシーラボ ニードルパッチ マイクロニードル 美容液シート', query: 'シーラボ ニードルパッチ' },
    { brand: 'fracora_micro_needle_patch', name: 'フラコラ マイクロニードルパッチ ヒアルロン酸原液注入', query: 'フラコラ マイクロニードルパッチ' },
    { brand: 'shiseido_navision_ha_fill_patch', name: '資生堂 ナビジョン HA フィルパッチ B マイクロニードル', query: 'ナビジョン HA フィルパッチ' },
    { brand: 'kose_clear_turn_micro_patch', name: 'コーセー クリアターン うるおい針 マイクロパッチ ヒアルロン酸注入', query: 'クリアターン うるおい針パッチ' },
    { brand: 'snp_cica_or_hyaluron_needle_patch', name: 'SNP W+ マイクロニードルパッチ アイパッチ 針シート', query: 'SNP マイクロニードルパッチ' }
  ];

  const patchItems = [];
  for (const cfg of patchConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
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

  // 保存
  const result = {
    updatedAt: new Date().toISOString(),
    theme1_curler: curlerItems,
    theme2_primer: primerItems,
    theme3_patch: patchItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch30_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch30_items.json`);
  console.log(`- ホットビューラー: ${curlerItems.length}件`);
  console.log(`- アイシャドウベース: ${primerItems.length}件`);
  console.log(`- ニードルパッチ: ${patchItems.length}件`);
}

fetchWinterBatch30Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
