import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries5Items() {
  console.log('🍂 [2026秋コスメ特集 第5弾] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋の温感クレンジング＆高保湿バーム10選 ---
  console.log('\n=== テーマ1: 秋の温感ホットクレンジング＆高保湿バーム10選 ===');
  const cleanseConfigs = [
    { brand: 'manara_hot_cleansing_gel_massage_plus', name: 'マナラ ホットクレンジングゲル マッサージプラス 温感 毛穴 美容液クレンジング', query: 'マナラ ホットクレンジングゲル' },
    { brand: 'duo_the_cleansing_balm_hot', name: 'DUO デュオ ザ クレンジングバーム ホット 温感バーム 毛穴詰まり くすみ 吸着', query: 'DUO クレンジングバーム ホット' },
    { brand: 'shu_uemura_ultime8_cleansing_oil', name: 'シュウ ウエムラ アルティム8∞ スブリム ビューティ クレンジング オイル カシミヤ肌', query: 'シュウウエムラ アルティム8' },
    { brand: 'attenir_skin_clear_cleanse_oil', name: 'アテニア スキンクリア クレンズ オイル アロマタイプ くすみ 糖化 角栓 Attenir', query: 'アテニア スキンクリア クレンズ オイル' },
    { brand: 'fancl_mild_cleansing_oil', name: 'ファンケル マイルドクレンジング オイル マイクレ 毛穴 摩擦レス 熟成ホップ FANCL', query: 'ファンケル マイルドクレンジングオイル' },
    { brand: 'banila_co_clean_it_zero', name: 'バニラコ クリーン イット ゼロ クレンジング バーム オリジナル 韓国 洗顔 保湿', query: 'バニラコ クレンジングバーム' },
    { brand: 'lululun_cleansing_balm_rich_moist', name: 'ルルルン クレンジングバーム リッチモイスト または CLEAR BLACK 毛穴 保湿', query: 'ルルルン クレンジングバーム' },
    { brand: 'perfect_one_focus_cleansing_balm', name: 'パーフェクトワンフォーカス スムースクレンジングバーム ビタミンC ポア 毛穴', query: 'パーフェクトワンフォーカス クレンジングバーム' },
    { brand: 'biore_ouchi_de_este_massage_gel', name: 'ビオレ おうちdeエステ 肌をなめらかにする マッサージ洗顔ジェル 毛穴 角栓 花王', query: 'ビオレ おうちdeエステ 洗顔ジェル' },
    { brand: 'kanebo_mellow_off_veil', name: 'KANEBO カネボウ メロウ オフ ヴェール クレンジング クリーム とろける カネボウ', query: 'カネボウ メロウ オフ ヴェール' }
  ];

  const cleanseItems = [];
  for (const cfg of cleanseConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (cleanseItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !cleanseItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cleanseItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の導入美容液＆ブースター10選 ---
  console.log('\n=== テーマ2: 秋の導入美容液＆ブースター10選 ===');
  const boosterConfigs = [
    { brand: 'decorte_liposome_advanced_repair_serum', name: 'コスメデコルテ リポソーム アドバンスト リペアセラム 美容液 導入 保湿 DECORTE', query: 'コスメデコルテ リポソーム アドバンスト リペアセラム' },
    { brand: 'takami_skinpeel', name: 'タカミスキンピール 30ml 角質美容水 毛穴 キメ 導入美容液 TAKAMI', query: 'タカミスキンピール' },
    { brand: 'sofina_ip_base_care_serum', name: 'ソフィーナiP ベースケア セラム 土台美容液 炭酸 導入美容液 花王 マイクロ炭酸泡', query: 'ソフィーナiP ベースケア セラム' },
    { brand: 'lancome_genifique_advanced', name: 'ランコム ジェニフィック アドバンスト N 美容液 美肌菌 導入 LANCOME', query: 'ランコム ジェニフィック アドバンスト' },
    { brand: 'vt_reedle_shot_100', name: 'VT リードルショット 100 導入美容液 マイクロニードル 天然針 美容針 スキンケア', query: 'VT リードルショット 100' },
    { brand: 'manyo_galac_niacin_2_0_essence', name: '魔女工場 manyo ガラク ナイアシン 2.0 エッセンス ガラクトミセス 美白 導入', query: '魔女工場 ガラクナイアシン' },
    { brand: 'muji_fermented_introductory_serum', name: '無印良品 発酵導入美容液 50ml 米ぬか発酵液 導入液 スキンケア うるおい', query: '無印良品 発酵導入美容液' },
    { brand: 'albion_eclafutur_t', name: 'アルビオン エクラフチュール t 美容液 導入 細胞修復 ナノ ALBION', query: 'アルビオン エクラフチュール t' },
    { brand: 'kanebo_on_skin_essence_v', name: 'KANEBO カネボウ オン スキン エッセンス V または F 化粧液 導入 角層 保湿', query: 'カネボウ オン スキン エッセンス' },
    { brand: 'one_by_kose_serum_veil_deep_repair', name: 'ONE BY KOSE セラム ヴェール ディープリペア 薬用導入美容液 ライスパワーNo.11', query: 'ワンバイコーセー セラム ヴェール' }
  ];

  const boosterItems = [];
  for (const cfg of boosterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (boosterItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !boosterItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        boosterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋の薬用入浴剤＆温活バスソルト10選 ---
  console.log('\n=== テーマ3: 秋の薬用入浴剤＆温活バスソルト10選 ===');
  const bathConfigs = [
    { brand: 'barth_neutral_bicarbonate_bath_tablet', name: 'BARTH バース 薬用 中性重炭酸入浴剤 炭酸泉 疲労回復 温活 冷え症 血行促進', query: 'BARTH 入浴剤' },
    { brand: 'kneipp_bath_salt_hops_valerian', name: 'クナイプ バスソルト ホップ＆バレリアン グーテナハト 安眠 天然岩塩 Kneipp', query: 'クナイプ バスソルト ホップ' },
    { brand: 'ayura_meditation_bath_t', name: 'アユーラ AYURA メディテーションバスt 入浴剤 アロマティックハーブ 癒やし 安らぎ', query: 'アユーラ メディテーションバス' },
    { brand: 'epsom_salt_sea_crystals', name: 'エプソムソルト シークリスタルス 硫酸マグネシウム 入浴剤 国産 発汗 温活 ミネラル', query: 'エプソムソルト シークリスタルス' },
    { brand: 'curel_medicated_bath_milk', name: 'キュレル 潤浸保湿 入浴剤 薬用 セラミドケア 消炎剤 乾燥肌 粉吹き 花王 乳液', query: 'キュレル 入浴剤' },
    { brand: 'tsumura_kusuri_yu_bath_herb', name: 'ツムラのくすり湯 バスハーブ 生薬エキス 薬用入浴剤 冷え症 肩こり 疲労回復', query: 'ツムラのくすり湯 バスハーブ' },
    { brand: 'sabon_bath_salt_rose', name: 'SABON サボン バスソルト ローズ 死海の塩 ミネラル 入浴剤 リフレッシュ 保湿', query: 'サボン バスソルト' },
    { brand: 'weleda_lavender_bath_milk', name: 'ヴェレダ WELEDA バスミルク ラベンダー または アルニカ オーガニック 入浴剤', query: 'ヴェレダ バスミルク' },
    { brand: 'urumore_rich_moisture_bath_liquid', name: 'ウルモア 濃厚保湿入浴液 アース製薬 コラーゲン セラミド お風呂上がり 保湿 うるおい', query: 'ウルモア 濃厚保湿入浴液' },
    { brand: 'bub_medicure_carbonic_bath_tablet', name: '花王 バブ メディキュア ほぐし 炭酸入浴剤 温活 疲労回復 高濃度炭酸 肩こり 腰痛', query: 'バブ メディキュア' }
  ];

  const bathItems = [];
  for (const cfg of bathConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (bathItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !bathItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bathItems.push(valid);
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
    cleanseItems,
    boosterItems,
    bathItems
  };

  const outputPath = path.resolve('scratch/autumn_series5_items.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf8');
  console.log(`\n🎉 第5弾 楽天APIより取得完了！保存先: ${outputPath}`);
  console.log(`取得商品数: クレンジング=${cleanseItems.length}件, ブースター=${boosterItems.length}件, 入浴剤=${bathItems.length}件`);
}

fetchAutumnSeries5Items().catch(console.error);
