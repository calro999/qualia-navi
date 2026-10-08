import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch65Items() {
  console.log('❄️ [11-12月冬コスメ 第65弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【ヒートブラシ＆ストレートヘアアイロンブラシ】 10選 ---
  console.log('\n=== テーマ1: ヒートブラシ＆ストレートヘアアイロンブラシ ===');
  const heatBrushConfigs = [
    { brand: 'salonia_straight_heat_brush', name: 'SALONIA サロニア ストレートヒートブラシ マイナスイオン ブラシアイロン 時短 寝癖直し 海外対応', query: 'サロニア ストレートヒートブラシ' },
    { brand: 'agetuya_comb_straight_hair_iron_brush', name: 'Agetuya アゲツヤ コームアイロン ストレート ブラシ ヘアアイロン ヒートブラシ 海外対応 高温', query: 'アゲツヤ コームアイロン' },
    { brand: 'lupilina_negative_ion_straight_heat_brush', name: 'ルピリーナ Lupilina ストレートブラシ ヘアアイロンブラシ マイナスイオン 遠赤外線 ツヤ髪 朝時短', query: 'ルピリーナ ストレートブラシ' },
    { brand: 'areti_ionic_straight_brush_iron', name: 'Areti アレティ ヘアアイロン ブラシ ストレート マイナスイオン 朝時短 火傷防止 静電気抑制', query: 'アレティ ストレートブラシ' },
    { brand: 'panasonic_ionic_compact_brush_iron', name: 'パナソニック ブラシアイロン コンパクト 2way ストレート カール ナノイー 海外対応', query: 'パナソニック ブラシアイロン' },
    { brand: 'cordless_portable_usb_heat_brush', name: 'コードレス ヒートブラシ ヘアアイロンブラシ 充電式 ミニ ストレートアイロン 持ち歩き USB 外出先', query: 'コードレス ヒートブラシ 充電式' },
    { brand: 'negative_ion_fast_heating_straight_brush', name: 'ヒートブラシ ヘアアイロン ブラシ型 急速加熱 マイナスイオン うるツヤ ストレート 時短 スタイリング', query: 'ヒートブラシ 急速加熱 マイナスイオン' },
    { brand: 'wide_plate_volume_down_heat_brush', name: 'ストレートヒートブラシ ワイド ロングヘア用 時短 マイナスイオン ボリュームダウン 外ハネ 内巻き', query: 'ストレートヒートブラシ ワイド' },
    { brand: 'anti_scald_safety_comb_heat_brush', name: 'ブラシアイロン 火傷防止 ストレート コーム型 ダブルマイナスイオン 温度調節 初心者 簡単寝癖直し', query: 'ブラシアイロン 火傷防止 ストレート' },
    { brand: 'compact_bangs_short_hair_heat_brush', name: 'ミニ ヒートブラシ 前髪用 ショートヘア ショートボブ ストレートアイロン コンパクト 軽量 旅行用', query: 'ミニ ヒートブラシ 前髪' }
  ];

  const heatBrushItems = [];
  for (const cfg of heatBrushConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (heatBrushItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !heatBrushItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        heatBrushItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【折りたたみ加温フットバス＆バブル温活足湯器】 10選 ---
  console.log('\n=== テーマ2: 折りたたみ加温フットバス＆バブル温活足湯器 ===');
  const footBathConfigs = [
    { brand: 'folding_constant_heated_bubble_foot_bath', name: 'フットバス 折りたたみ 加温 保温 足湯 バブル機能 足元冷え性 むくみ解消 自宅スパ 足湯器 42度', query: 'フットバス 折りたたみ 保温 バブル' },
    { brand: 'electric_folding_temperature_control_foot_spa', name: '足湯器 折りたたみ 保温 加温 42℃〜45℃ 温度調節 バブルジェット 足裏マッサージ 電気 足湯バケツ', query: '足湯器 折りたたみ 保温 42度' },
    { brand: 'deep_bucket_calf_warming_foot_bath', name: '深型 フットバス 折りたたみ 加温 保温 足湯器 ふくらはぎまで温まる 自宅温活 疲労回復 冷え対策', query: 'フットバス 深型 保温 折りたたみ' },
    { brand: 'thanko_individual_folding_heated_foot_bath', name: 'サンコー おうちで足湯 折りたたみ 加温 フットバス 保温 バブル 足裏刺激 温活 リフレッシュ', query: 'サンコー 足湯 フットバス' },
    { brand: 'roller_massage_heated_bubble_foot_spa', name: 'フットバス 保温 加温式 ローラー付き 足裏マッサージ バブル機能 折りたたみ式 足湯 コンパクト収納', query: 'フットバス 保温 ローラー バブル' },
    { brand: 'remote_control_smart_heated_foot_bath', name: 'フットバス リモコン付き 加温 折りたたみ 足湯器 デジタル温度表示 タイマー機能 保温 省スペース', query: 'フットバス リモコン 保温 折りたたみ' },
    { brand: 'foldable_aromatherapy_herb_foot_spa_unit', name: '足湯器 折りたたみ 加温 保温 アロマ 薬草対応 バブル 足裏突起 自宅エステ 冷え性改善 血行促進', query: '足湯器 保温 折りたたみ アロマ' },
    { brand: 'high_power_rapid_heating_foot_spa_tub', name: 'フットバス 急速加熱 保温 折りたたみ 足湯 45℃恒温 バブルマッサージ フットケア 敬老の日 ギフト', query: 'フットバス 急速加熱 折りたたみ' },
    { brand: 'compact_silicone_collapsible_foot_bath_tub', name: 'シリコン 折りたたみ フットバス 足湯 保温 加温器 バブル コンパクト 足浴器 自宅温活 防寒', query: '折りたたみ フットバス シリコン 加温' },
    { brand: 'luxury_jet_bubble_home_spa_foot_massager', name: '高級 フットバス 加温 保温 ジェットバブル 足裏回転ローラー 足湯器 自宅フットスパ 疲労回復', query: 'フットバス 高級 保温 ジェット' }
  ];

  const footBathItems = [];
  for (const cfg of footBathConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (footBathItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古') && !footBathItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        footBathItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【シルク保湿おやすみ手袋＆かかとケアソックス】 10選 ---
  console.log('\n=== テーマ3: シルク保湿おやすみ手袋＆かかとケアソックス ===');
  const silkGlovesConfigs = [
    { brand: 'pure_silk_100_night_moisturizing_gloves', name: 'シルク手袋 100% おやすみ手袋 保湿 ハンドケア ナイト手袋 就寝用 手荒れ あかぎれ 潤い 日本製', query: 'シルク手袋 保湿 100% おやすみ' },
    { brand: 'touchscreen_open_finger_silk_night_gloves', name: 'シルク 手袋 スマホ対応 指先オープン 保湿 おやすみ手袋 ナイトグローブ ハンドクリーム 手荒れ予防', query: 'シルク 手袋 指先オープン 保湿' },
    { brand: 'silk_heel_cracked_repair_moisturizing_socks', name: 'シルク かかとケア 靴下 かかと つるつる 保湿 ソックス 就寝用 角質 ひび割れ防止 ガサガサ解消', query: 'シルク かかとケア 靴下 つるつる' },
    { brand: 'spun_silk_breathable_skin_repair_hand_gloves', name: '絹紡糸 シルク おやすみ手袋 高通気性 保湿 ナイト手袋 敏感肌 手荒れ あかぎれ防止 ハンドパック', query: '絹紡糸 シルク 手袋 保湿' },
    { brand: 'silk_heel_and_hand_double_moisturizing_set', name: 'シルク 保湿 手袋 かかとソックス セット 就寝用 おやすみ ハンドケア フットケア 美肌 角質ケア', query: 'シルク 手袋 かかと 靴下 セット' },
    { brand: 'long_cuff_silk_wrist_warm_night_gloves', name: 'シルク 手袋 手首長め おやすみ用 保湿 ハンドケア 冷え取り 絹 温活 手荒れ 就寝 ナイト手袋', query: 'シルク 手袋 手首長め 保湿' },
    { brand: 'open_toe_silk_heel_smooth_night_socks', name: 'シルク かかとソックス つま先オープン 保湿 角質ケア おやすみ靴下 蒸れない かかと保護 就寝用', query: 'シルク かかとソックス つま先オープン' },
    { brand: 'organic_silk_cotton_gentle_moisturizing_mitts', name: 'シルク コットン おやすみ手袋 オーガニック 潤い ハンドケア 保湿手袋 手荒れ アトピー 敏感肌', query: 'シルク コットン おやすみ手袋 保湿' },
    { brand: 'smooth_gel_coated_silk_heel_hydrating_socks', name: 'シルク かかとケア 靴下 内側保湿ジェル かかと保湿 つるつる ひび割れ防止 就寝用 ソックス', query: 'シルク かかと 靴下 保湿ジェル' },
    { brand: 'premium_mulberry_silk_hand_and_foot_spa_set', name: '最高級 絹手袋 シルク100% おやすみ ナイトグローブ 就寝用 保湿 ハンドケア 美容 美手 エイジングケア', query: '最高級 絹手袋 シルク100 保湿' }
  ];

  const silkGlovesItems = [];
  for (const cfg of silkGlovesConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 700) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (silkGlovesItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 700 && !it.itemName.includes('中古') && !silkGlovesItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        silkGlovesItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 取得完了: ヒートブラシ=${heatBrushItems.length}件, 加温フットバス=${footBathItems.length}件, シルク手袋＆かかと=${silkGlovesItems.length}件`);

  const result = {
    theme1_heat_brush: heatBrushItems,
    theme2_folding_foot_bath: footBathItems,
    theme3_silk_gloves_heel: silkGlovesItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch65_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch65_items.json に保存完了しました。');
}

fetchWinterBatch65Items().catch(console.error);
