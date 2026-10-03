import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch28Items() {
  console.log('❄️ [11-12月コスメ 第28弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: ホットマッサージジェル＆温感レッグ・ボディバーム 10選 ---
  console.log('\n=== テーマ1: ホットマッサージジェル＆温感レッグ・ボディバーム ===');
  const warmingBodyConfigs = [
    { brand: 'bambi_water_hot_body_gel', name: 'BAMBI WATER バンビウォーター ホットボディジェル', query: 'バンビウォーター ホットボディジェル' },
    { brand: 'clarins_body_fit_active', name: 'CLARINS クラランス ボディ フィット アクティヴ', query: 'クラランス ボディ フィット アクティヴ' },
    { brand: 'ilcorpo_mineral_fit_grietz', name: 'シーボディ イルコルポ ミネラルフィットグリッツ', query: 'イルコルポ ミネラルフィットグリッツ' },
    { brand: 'weleda_arnica_massage_oil', name: 'WELEDA ヴェレダ アルニカ マッサージオイル 100ml', query: 'ヴェレダ アルニカ マッサージオイル' },
    { brand: 'estherny_hot_massage_ultra', name: 'サナ エステニー ホット・マッサージュ ウルトラスーパーハード', query: 'エステニー ホットマッサージュ' },
    { brand: 'ayura_meditation_body_gel', name: 'アユーラ AYURA ビカッサ リバランスボディー / ボディセラム', query: 'アユーラ ボディセラム' },
    { brand: 'venus_lab_hot_slimming_gel', name: 'ヴィーナスラボ スヴェルトボディジェル 温感マッサージ', query: 'ヴィーナスラボ ホットスヴェルトボディジェル' },
    { brand: 'kneipp_bio_oil_warm', name: 'クナイプ Kneipp ビオ オイル / アルニカ 温感マッサージ', query: 'クナイプ ビオオイル' },
    { brand: 'seven_break_gel_premier', name: 'セブンブレイクジェル プレミア プレミアム温感ジェル', query: 'セブンブレイクジェル' },
    { brand: 'melvita_l_or_rose_body_oil', name: 'メルヴィータ Melvita ロルロズ ピンクフィット ボディオイル', query: 'メルヴィータ ロルロズ ピンクフィット' }
  ];

  const warmingBodyItems = [];
  for (const cfg of warmingBodyConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        warmingBodyItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿シュガーボディスクラブ＆角質つるすべボディポリッシュ 10選 ---
  console.log('\n=== テーマ2: 高保湿シュガーボディスクラブ＆角質つるすべボディポリッシュ ===');
  const sugarScrubConfigs = [
    { brand: 'sabon_body_scrub_delicate_jasmine', name: 'SABON サボン ボディスクラブ 600g / 320g', query: 'サボン ボディスクラブ 600g' },
    { brand: 'house_of_rose_oh_baby_body_smoother', name: 'ハウス オブ ローゼ Oh! Baby ボディ スムーザー N 570g', query: 'ハウスオブローゼ Oh Baby ボディ スムーザー' },
    { brand: 'aesop_geranium_leaf_body_scrub', name: 'Aesop イソップ ゼラニウム リーフ ボディスクラブ 180ml', query: 'イソップ ゼラニウム ボディスクラブ' },
    { brand: 'laline_dead_sea_body_scrub', name: 'Laline ラリン デッドシーミネラルズ / シア＆ククイ ボディスクラブ', query: 'ラリン ボディスクラブ' },
    { brand: 'jo_malone_english_pear_scrub', name: 'ジョー マローン ロンドン イングリッシュ ペアー エクスフォリエイティング スクラブ', query: 'ジョーマローン ボディスクラブ' },
    { brand: 'dove_creamy_body_scrub_pomegranate', name: 'Dove ダヴ クリーミースクラブ ザクロ＆シアバター', query: 'ダヴ クリーミースクラブ' },
    { brand: 'kneipp_sugar_scrub_camellia', name: 'クナイプ Kneipp シュガースクラブ カメリア＆アルガン', query: 'クナイプ シュガースクラブ' },
    { brand: 'john_masters_sugar_body_scrub', name: 'ジョンマスターオーガニック ボディスクラブ', query: 'ジョンマスターオーガニック ボディスクラブ' },
    { brand: 'flora_notis_jillstuart_body_scrub', name: 'フローラノーティス ジルスチュアート ボディスクラブ', query: 'フローラノーティス ボディスクラブ' },
    { brand: 'loccitane_shea_ultra_rich_body_scrub', name: 'ロクシタン シア リッチボディスクラブ 200ml', query: 'ロクシタン リッチボディスクラブ' }
  ];

  const sugarScrubItems = [];
  for (const cfg of sugarScrubConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        sugarScrubItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高密着シェーディング＆小顔コントゥアリング 10選 ---
  console.log('\n=== テーマ3: 高密着シェーディング＆小顔コントゥアリング ===');
  const shadingConfigs = [
    { brand: 'too_cool_for_school_artclass_by_rodin', name: 'too cool for school アートクラス バイロダン シェーディング マスター', query: 'バイロダン シェーディング' },
    { brand: 'canmake_shading_powder', name: 'CANMAKE キャンメイク シェーディングパウダー', query: 'キャンメイク シェーディングパウダー' },
    { brand: 'cezanne_natural_matte_shading', name: 'CEZANNE セザンヌ ナチュラルマットシェーディング', query: 'セザンヌ ナチュラルマットシェーディング' },
    { brand: 'kate_3d_create_chat_eyebrow', name: 'KATE ケイト デザイニングアイブロウ3D / 3Dクリエイトチャット', query: 'ケイト デザイニングアイブロウ3D' },
    { brand: 'ririmew_sheer_matte_shading', name: 'Ririmew リリミュウ シアーマットシェーディング 指原莉乃', query: 'リリミュウ シアーマットシェーディング' },
    { brand: 'whomee_chicchagao_shadow', name: 'WHOMEE フーミー ちっちゃ顔シャドウ イガリシノブ', query: 'フーミー ちっちゃ顔シャドウ' },
    { brand: 'etvos_mineral_shading_palette', name: 'ETVOS エトヴォス ミネラルマルチパウダー / シェーディング', query: 'エトヴォス ミネラルマルチパウダー' },
    { brand: 'bbia_last_blush_shading', name: 'BBIA ピアー ラストブラッシュ アーモンドブロッサム シェーディング', query: 'BBIA ラストブラッシュ' },
    { brand: 'mac_mineralize_skinfinish_natural', name: 'M・A・C マック ミネラライズ スキンフィニッシュ / シェーディング', query: 'MAC ミネラライズ スキンフィニッシュ' },
    { brand: 'judydoll_highlight_shading_palette', name: 'JUDYDOLL ジュディドール メリハリマスターパレット ハイライト シェーディング', query: 'ジュディドール ハイライト シェーディング' }
  ];

  const shadingItems = [];
  for (const cfg of shadingConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        shadingItems.push(valid);
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
    theme1_warmingbody: warmingBodyItems,
    theme2_sugarscrub: sugarScrubItems,
    theme3_shading: shadingItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch28_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計取得アイテム数: 温感ボディマッサージ=${warmingBodyItems.length}/10, スクラブ=${sugarScrubItems.length}/10, シェーディング=${shadingItems.length}/10`);
  console.log('scratch/rakuten_winter_batch28_items.json に保存しました！');
}

fetchWinterBatch28Items().catch(console.error);
