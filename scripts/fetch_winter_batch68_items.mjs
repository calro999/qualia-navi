import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch68Items() {
  console.log('❄️ [11-12月冬コスメ 第68弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【デスク下遠赤外線パネルヒーター＆足元フットウォーマー】 10選 ---
  console.log('\n=== テーマ1: デスク下遠赤外線パネルヒーター＆足元フットウォーマー ===');
  const panelHeaterConfigs = [
    { brand: 'round_type_360_far_infrared_panel_heater', name: 'パネルヒーター 遠赤外線 ラウンド型 丸型 足元 足元ヒーター デスク下 筒型 360度 省エネ タイマー 乾燥しない', query: 'パネルヒーター 足元 ラウンド型' },
    { brand: 'five_sided_foldable_under_desk_panel_heater', name: 'パネルヒーター 5面 遠赤外線 折りたたみ 足元ヒーター デスク下 足裏天板付き こたつ オフィス 省エネ 暖房', query: 'パネルヒーター 5面 足元' },
    { brand: 'three_sided_compact_foldable_foot_panel_heater', name: 'パネルヒーター 3面 遠赤外線 足元ヒーター デスク デスク下 薄型 折りたたみ 自動OFF タイマー 防寒', query: 'パネルヒーター 3面 足元' },
    { brand: 'flannel_covered_round_foot_warmer_heater', name: 'パネルヒーター 丸型 フランネル毛布付き 遠赤外線 足温器 デスク下 コンパクト 筒形 高温 静音 省エネ', query: 'パネルヒーター 丸型 毛布付き' },
    { brand: 'smart_temperature_control_desk_foot_heater', name: 'パネルヒーター デスク下 遠赤外線 足元ヒーター 温度調節3段階 タイマー機能 転倒自動オフ オフィス 無風', query: 'パネルヒーター 足元 遠赤外線 タイマー' },
    { brand: 'magnetic_under_desk_thin_panel_heater', name: 'デスクヒーター マグネット 貼るだけ デスク下 パネルヒーター 薄型 遠赤外線 省エネ 机下 暖房', query: 'デスクヒーター マグネット パネルヒーター' },
    { brand: 'high_power_carbon_crystal_foot_panel_heater', name: 'パネルヒーター 炭素結晶 遠赤外線 足元ヒーター デスク下 速暖 省エネ 折りたたみ式 無音 無光 防寒グッズ', query: 'パネルヒーター 炭素結晶 足元' },
    { brand: 'fluffy_top_cover_enclosed_panel_heater', name: 'パネルヒーター 天面付き 遠赤外線 一人用こたつ デスク下 足元 暖房 フットウォーマー 省エネ 節電', query: 'パネルヒーター 天面付き 足元' },
    { brand: 'portable_ultra_thin_desk_foot_warmer', name: '足元ヒーター パネルヒーター 折りたたみ 軽量 持ち運び デスク下 テレワーク 自宅 在宅勤務 受験生 寒さ対策', query: 'パネルヒーター 足元 折りたたみ テレワーク' },
    { brand: 'morita_electric_under_desk_panel_heater', name: 'デスクヒーター 足元 パネルヒーター 省エネ コンパクト 暖房器具 冷え対策 オフィス 自宅 足温器', query: 'デスクヒーター 足元 パネルヒーター' }
  ];

  const panelHeaterItems = [];
  for (const cfg of panelHeaterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (panelHeaterItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古') && !panelHeaterItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        panelHeaterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【高純度ピュアスクワランオイル＆アルガンオイル】 10選 ---
  console.log('\n=== テーマ2: 高純度ピュアスクワランオイル＆アルガンオイル ===');
  const pureOilConfigs = [
    { brand: 'haba_high_purity_squalane_oil', name: 'HABA ハーバー 高品位スクワラン スクワランオイル 15ml 30ml 無添加 フェイスオイル 高保湿 毛穴ケア', query: 'HABA スクワランオイル' },
    { brand: 'melvita_organic_argan_oil_bio', name: 'メルヴィータ Melvita ビオオイル アルガンオイル 50ml オーガニック ブースター 美容オイル 導入液 フェイス', query: 'メルヴィータ アルガンオイル' },
    { brand: 'plant_derived_pure_squalane_oil_100', name: '植物性スクワランオイル 100% オリーブスクワラン キャリアオイル 無添加 フェイス ボディ スキンケア 保湿', query: 'オリーブスクワランオイル 100' },
    { brand: 'organic_unrefined_moroccan_argan_oil', name: 'モロッコ産 アルガンオイル 未精製 オーガニック 100% 天然 ピュア ゴールデン ヘアオイル スキンケア', query: 'アルガンオイル オーガニック 未精製' },
    { brand: 'haba_squalane_ii_plant_derived_oil', name: 'HABA ハーバー スクワランII 植物スクワラン 無添加 ピュアオイル 高保湿 乾燥肌 敏感肌 うるおい', query: 'HABA スクワラン 植物' },
    { brand: 'natural_pure_deep_sea_shark_squalane', name: '深海鮫 スクワランオイル 100% 天然 無添加 高純度 ピュアオイル 全身保湿 マッサージ マタニティオイル', query: '深海鮫 スクワランオイル 100' },
    { brand: 'pure_refined_argan_oil_odorless', name: '精製 アルガンオイル 100% オーガニック モロッコ産 無香料 フェイスオイル ブースターオイル 浸透保湿', query: '精製 アルガンオイル 100' },
    { brand: 'organic_jojoba_and_squalane_blend_oil', name: 'ホホバオイル スクワランオイル 高精製 無添加 美容オイル フェイスオイル 保湿オイル 全身用 ベビーオイル', query: 'ホホバオイル スクワラン 美容オイル' },
    { brand: 'large_capacity_pure_squalane_body_face', name: 'スクワランオイル 大容量 ポンプ式 100% 天然 無添加 美容オイル マッサージオイル フェイス ボディ クレンジング', query: 'スクワランオイル ポンプ 大容量' },
    { brand: 'anti_aging_golden_argan_face_oil', name: 'アルガンオイル モロッカン オーガニック 100% 美容オイル エイジングケア 目元 口元 小じわ ハリ ツヤ 保湿', query: 'アルガンオイル 100 オーガニック フェイス' }
  ];

  const pureOilItems = [];
  for (const cfg of pureOilConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (pureOilItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !pureOilItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        pureOilItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【洗えるフランネル電気ひざ掛け＆着る電気毛布】 10選 ---
  console.log('\n=== テーマ3: 洗えるフランネル電気ひざ掛け＆着る電気毛布 ===');
  const electricBlanketConfigs = [
    { brand: 'washable_flannel_electric_throw_blanket', name: '電気毛布 ひざ掛け フランネル 洗える 電気ひざ掛け 140×80cm タイマー付 省エネ ふわふわ 暖かい 防寒', query: '電気ひざ掛け フランネル 洗える タイマー' },
    { brand: 'large_size_soft_flannel_electric_blanket', name: '電気毛布 大判 敷き毛布 掛け毛布 フランネル 丸洗い ダニ退治 室温センサー 抗菌防臭 省エネ 暖房グッズ', query: '電気毛布 大判 フランネル 洗える' },
    { brand: 'wearable_electric_blanket_poncho_flannel', name: '着る電気毛布 ポンチョ スナップボタン付き フランネル 洗える 電気ブランケット USB ルームウェア 温活 防寒', query: '着る電気毛布 ポンチョ 洗える' },
    { brand: 'yamazen_washable_flannel_electric_throw', name: '山ゼン YAMAZEN 電気ひざ掛け毛布 フランネル 丸洗い可能 温度調節 ダニ退治 省エネ デスクワーク オフィス', query: '山善 電気ひざ掛け フランネル' },
    { brand: 'lifejoy_flannel_washable_electric_blanket', name: 'ライフジョイ 電気毛布 ひざ掛け 洗える フランネル ふわふわ 140cm×80cm 日本製コントローラー 省エネ', query: 'ライフジョイ 電気ひざ掛け フランネル' },
    { brand: 'cordless_usb_rechargeable_heated_throw', name: 'USB 電気毛布 ひざ掛け コードレス モバイルバッテリー給電 ヒーターブランケット 洗える フランネル キャンプ', query: 'USB 電気毛布 ひざ掛け 洗える' },
    { brand: 'francfranc_style_fashion_heated_blanket', name: '電気毛布 かわいい おしゃれ フランネル 北欧 電気ブランケット 洗える タイマー 温度調節 くすみカラー', query: '電気ひざ掛け かわいい おしゃれ 洗える' },
    { brand: 'koizumi_washable_flannel_electric_carpet_throw', name: 'コイズミ KOIZUMI 電気ひざ掛け フランネル マイキー 丸洗い ダニ退治 抗菌防臭 温活 冷え性改善', query: 'コイズミ 電気ひざ掛け フランネル' },
    { brand: 'double_sided_thick_flannel_electric_rug', name: '電気ブランケット 両面フランネル 極厚 洗える 電気ひざ掛け毛布 6段階温度調節 自動オフタイマー 省エネ', query: '電気ブランケット 両面フランネル 洗える' },
    { brand: 'compact_office_desk_warm_electric_throw', name: '電気ひざ掛け ミニ 小型 100×70cm フランネル 洗える デスクワーク オフィス 車中泊 省エネ 節電対策', query: '電気ひざ掛け ミニ 洗える フランネル' }
  ];

  const electricBlanketItems = [];
  for (const cfg of electricBlanketConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (electricBlanketItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古') && !electricBlanketItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        electricBlanketItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 取得完了: パネルヒーター=${panelHeaterItems.length}件, ピュアオイル=${pureOilItems.length}件, 電気ひざ掛け=${electricBlanketItems.length}件`);

  const result = {
    theme1_panel_heater: panelHeaterItems,
    theme2_pure_oil: pureOilItems,
    theme3_electric_blanket: electricBlanketItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch68_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch68_items.json に保存完了しました。');
}

fetchWinterBatch68Items().catch(console.error);
