import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries6Items() {
  console.log('🍂 [2026秋コスメ特集 第6弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋の集中アイクリーム＆目元ケア10選 ---
  console.log('\n=== テーマ1: 秋の集中アイクリーム＆目元ケア10選 ===');
  const eyeConfigs = [
    { brand: 'elixir_retinol_linkle_cream', name: 'エリクシール レチノパワー リンクルクリーム シワ改善 純粋レチノール 資生堂 アイクリーム', query: 'エリクシール リンクルクリーム' },
    { brand: 'decorte_liposome_advanced_repair_eye', name: 'コスメデコルテ リポソーム アドバンスト リペアアイセラム 目元美容液 アイクリーム', query: 'コスメデコルテ リポソーム アイセラム' },
    { brand: 'pola_ba_eye_zone_cream_n', name: 'POLA ポーラ B.A アイゾーンクリーム N 目元用クリーム ハリ 眼輪筋 B.A', query: 'ポーラ BA アイゾーンクリーム' },
    { brand: 'sana_nameraka_honpo_linkle_eye_cream', name: 'なめらか本舗 リンクルアイクリーム N 豆乳イソフラボン ピュアレチノール サナ', query: 'なめらか本舗 リンクルアイクリーム' },
    { brand: 'clarins_double_serum_eye', name: 'クラランス ダブル セーラム アイ 目元用美容液 クラランス CLARINS ハリ ツヤ', query: 'クラランス ダブルセーラム アイ' },
    { brand: 'kiehls_creamy_eye_treatment_avocado', name: 'キールズ アイ トリートメント AV アボカド アイクリーム 保湿 高保湿 目元 KIEHL\'S', query: 'キールズ アイ トリートメント AV' },
    { brand: 'attenir_eye_wrinkle_serum', name: 'アテニア アイ リンクルセラム 薬用シワ改善 目元用美容液 ナイアシンアミド Attenir', query: 'アテニア アイ リンクルセラム' },
    { brand: 'la_roche_posay_redermic_r_eye', name: 'ラロッシュポゼ レダミック R アイ レチノール アイクリーム 敏感肌 低刺激', query: 'ラロッシュポゼ レダミック R アイ' },
    { brand: 'curel_moist_repair_eye_cream', name: 'キュレル 潤浸保湿 モイストリペア アイクリーム セラミドケア 消炎剤 目元 花王', query: 'キュレル モイストリペア アイクリーム' },
    { brand: 'obagi_derma_power_x_stem_eye_cream', name: 'オバジ ダーマパワーX ステムアイクリーム ロート製薬 コラーゲン エラスチン ハリ', query: 'オバジ ステムアイクリーム' }
  ];

  const eyeItems = [];
  for (const cfg of eyeConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (eyeItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !eyeItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        eyeItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋のスカルプケア美容液＆ブラシ10選 ---
  console.log('\n=== テーマ2: 秋のスカルプケア美容液＆ブラシ10選 ===');
  const scalpConfigs = [
    { brand: 'uka_scalp_brush_kenzan', name: 'uka ウカ スカルプブラシ ケンザン 頭皮ケア シリコン ヘッドスパ マッサージ', query: 'uka スカルプブラシ ケンザン' },
    { brand: 'shiseido_adenovital_scalp_power_shot', name: '資生堂 アデノバイタル スカルプ パワーショット 育毛剤 頭皮用美容液 サロン専売', query: 'アデノバイタル スカルプ パワーショット' },
    { brand: 'loccitane_anti_hair_loss_scalp_serum', name: 'ロクシタン 薬用 メディカル アンチヘアロス セラム 育毛美容液 スカルプ 抜け毛予防', query: 'ロクシタン アンチヘアロス セラム' },
    { brand: 'scalp_d_beaute_medical_estrology', name: 'スカルプD ボーテ メディカルエストロジー スカルプセラム 薬用育毛剤 女性用 アンファー', query: 'スカルプD ボーテ メディカルエストロジー' },
    { brand: 'orbis_essence_in_scalp_serum', name: 'オルビス エッセンスインスカルプセラム 頭皮用美容液 抜け毛 フケ かゆみ ORBIS', query: 'オルビス スカルプセラム' },
    { brand: 'kerastase_genesis_serum_anti_chute', name: 'ケラスターゼ ジェネシス セラム フォーティファイ または バン 抜け毛 頭皮 美容液', query: 'ケラスターゼ ジェネシス セラム' },
    { brand: 'weleda_rosemary_scalp_cleansing', name: 'ヴェレダ ローズマリー スカルプクレンジング 頭皮用クレンジング 3in1 ヘッドスパ', query: 'ヴェレダ ローズマリー スカルプ' },
    { brand: 'milbon_aujua_growsive_essence', name: 'ミルボン オージュア グロウシブ グロウエッセンス 育毛剤 医薬部外品 スカルプ Aujua', query: 'オージュア グロウシブ エッセンス' },
    { brand: 'diane_precious_scalp_essence', name: 'モイストダイアン パーフェクトビューティー スカルプエッセンス 頭皮ケア', query: 'ダイアン スカルプエッセンス' },
    { brand: 'aveda_invati_ultra_advanced_revitalizer', name: 'アヴェダ インヴァティ ウルトラ アドバンス スカルプ リバイタライザー 頭皮美容液 AVEDA', query: 'アヴェダ インヴァティ スカルプ' }
  ];

  const scalpItems = [];
  for (const cfg of scalpConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (scalpItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !scalpItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        scalpItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋のボディスクラブ＆角質ケア10選 ---
  console.log('\n=== テーマ3: 秋のボディスクラブ＆角質ケア10選 ===');
  const scrubConfigs = [
    { brand: 'sabon_body_scrub_dead_sea', name: 'SABON サボン ボディスクラブ 600g パチュリ ラベンダー バニラ 死海の塩 スクラブ', query: 'サボン ボディスクラブ' },
    { brand: 'house_of_rose_oh_baby_body_smoother', name: 'ハウスオブローゼ Oh! Baby ボディ スムーザー N 570g 温泉水 スクラブ 角質ケア', query: 'ハウスオブローゼ ボディスクムーザー' },
    { brand: 'aesop_geranium_leaf_body_scrub', name: 'イソップ ジェラニウム ボディスクラブ 180ml Aesop 角質ケア 竹エキス', query: 'イソップ ボディスクラブ' },
    { brand: 'weeed_bliss_scrub', name: 'WEEED ウィード ブリススクラブ 薬用ボディスクラブ 泡立つスクラブ お尻 かかと デリケート', query: 'WEEED ブリススクラブ' },
    { brand: 'kneipp_sugar_scrub', name: 'クナイプ シュガースクラブ カメリア＆アルガン または スイートアーモンド 角質', query: 'クナイプ シュガースクラブ' },
    { brand: 'clarins_exfoliating_body_scrub', name: 'クラランス スムージング ボディスクラブ 竹パウダー 角質除去 CLARINS', query: 'クラランス ボディスクラブ' },
    { brand: 'loccitane_shea_rich_body_scrub', name: 'ロクシタン シア リッチ ボディスクラブ シアバター ナッツ殻 保湿 L\'OCCITANE', query: 'ロクシタン ボディスクラブ' },
    { brand: 'dr_scholl_heel_cream', name: 'ドクターショール かかと用 保湿クリーム ガサガサかかと 保湿 集中ケア レキットベンキーザー', query: 'ドクターショール かかと 保湿クリーム' },
    { brand: 'yuskin_heel_care_cream', name: 'ユースキン 踵用 または ヒールケア 保湿 薬用 ビタミン系クリーム 手荒れ かかと', query: 'ユースキン かかと' },
    { brand: 'botanist_botanical_body_scrub', name: 'BOTANIST ボタニスト ボタニカル ボディスクラブ シュガー ボタニカル 角質ケア', query: 'ボタニスト ボディスクラブ' }
  ];

  const scrubItems = [];
  for (const cfg of scrubConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (scrubItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !scrubItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        scrubItems.push(valid);
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
    eyeItems,
    scalpItems,
    scrubItems
  };

  const outputPath = path.resolve('scratch/autumn_series6_items.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf8');
  console.log(`\n🎉 第6弾 楽天APIより取得完了！保存先: ${outputPath}`);
  console.log(`取得商品数: アイクリーム=${eyeItems.length}件, スカルプ=${scalpItems.length}件, スクラブ=${scrubItems.length}件`);
}

fetchAutumnSeries6Items().catch(console.error);
