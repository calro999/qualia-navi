import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch58Items() {
  console.log('❄️ [11-12月冬コスメ 第58弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【高濃度生炭酸ガスパック＆ジェル炭酸フェイスパック】 10選 ---
  console.log('\n=== テーマ1: 高濃度生炭酸ガスパック＆ジェル炭酸フェイスパック ===');
  const carbonicPackConfigs = [
    { brand: 'enisie_glow_pack_clplus_facial_pack', name: 'エニシー グローパック フェイシャルジェルパック 10回分 炭酸ガスパック リフトアップ 毛穴 ハリツヤ サロン専売 高濃度', query: 'エニシー グローパック' },
    { brand: 'ekato_precious_gel_pack_carbonic', name: 'EKATO エカト プレシャスジェルパック 炭酸ガスパック 持続型 60分炭酸パック 炭酸パック 美肌 ハリ 保湿 エイジングケア', query: 'EKATO プレシャスジェルパック' },
    { brand: 'mediplorer_co2_gel_mask_premium', name: 'メディプローラー CO2ジェルマスク プレミアム 炭酸ガスパック 炭酸パック ドクターズコスメ 元祖炭酸パック 透明感 エイジングケア', query: 'メディプローラー CO2ジェルマスク' },
    { brand: 'favorina_nano_aqua_carbonic_gel_pack', name: 'フェヴリナ ナノアクア 炭酸ジェルパック 10回分 生炭酸 高濃度炭酸パック 無添加 ヒアルロン酸 くすみ 毛穴ケア', query: 'フェヴリナ 炭酸ジェルパック' },
    { brand: 'drmedion_spa_oxy_gel_carbonic_pack', name: 'ドクターメディオン スパオキシジェル 炭酸パック 炭酸ガス 高濃度 美肌 自宅エステ うるおい 透明感 保湿', query: 'ドクターメディオン スパオキシジェル' },
    { brand: 'toyo_soda_spa_foam_premium_10000', name: 'ソーダスパフォーム プレミアム 10000 130g 東洋炭酸研究所 高濃度炭酸泡パック 濃密泡 スカルプ フェイス 毛穴洗浄', query: 'ソーダスパフォーム プレミアム 10000' },
    { brand: 're_blanc_carbonic_bubble_pack', name: 'リプラス 生炭酸ガスパック 濃密ジェル 炭酸パック 炭酸フェイスパック エステ専売 スキンケア 保湿 ハリ肌', query: '炭酸パック 炭酸ガスパック サロン専売' },
    { brand: 'sing_organic_carbonic_whitening_pack', name: 'シング オーガニック 炭酸ホワイトパック 発泡 濃密泡 ピーリング 保湿 美容液 美肌 くすみ 炭酸パック', query: 'シング オーガニック 炭酸パック' },
    { brand: 'cotton_labo_carbonic_pack_mask_sheet', name: 'コットン・ラボ 水素水＆炭酸パックマスク 炭酸シートマスク 簡単 水で濡らすだけ 炭酸フェイスマスク 毛穴 くすみ', query: 'コットンラボ 炭酸パックマスク' },
    { brand: 'meeth_morerich_pack_carbonic_gel', name: 'ミース meeth モアリッチパック 炭酸ガスパック 7回分 高保湿 うるおい 保湿パック エステ仕様 スキンケア', query: '炭酸ガスパック モアリッチパック' }
  ];

  const carbonicItems = [];
  for (const cfg of carbonicPackConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        carbonicItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【コードレスミニヘアアイロン＆充電式ストレート・カールアイロン】 10選 ---
  console.log('\n=== テーマ2: コードレスミニヘアアイロン＆充電式ストレート・カールアイロン ===');
  const cordlessIronConfigs = [
    { brand: 'refa_beautech_finger_iron_st', name: 'ReFa BEAUTECH FINGER IRON ST リファ ビューテック フィンガーアイロン ST コードレス ミニヘアアイロン 指先感覚 毛束 前髪 お直し', query: 'リファ フィンガーアイロン ST' },
    { brand: 'kinujo_lip_iron_cordless_hair_iron', name: 'KINUJO LIP IRON 絹女 リップアイロン コードレス ヘアアイロン シルクプレート 海外対応 USB充電式 前髪 カール ストレート', query: '絹女 リップアイロン' },
    { brand: 'salonia_cordless_straight_hair_iron', name: 'SALONIA サロニア イージースケーター コードレスヘアアイロン ミニ ストレートアイロン USB充電式 コンパクト 軽量 持ち運び', query: 'サロニア コードレス ヘアアイロン' },
    { brand: 'mods_hair_stylish_mobile_hair_iron', name: 'mod\'s hair モッズ・ヘア スタイリッシュ モバイルヘアアイロン MHS-1342 USB給電 モバイルバッテリー対応 ミニアイロン', query: 'モッズヘア モバイルヘアアイロン' },
    { brand: 'koizumi_cordless_straight_iron_kss', name: 'コイズミ コードレス ストレートアイロン KHS-8620 / KHS-8640 充電式 マイナスイオン セラミックコーティング ミニサイズ', query: 'コイズミ コードレス ストレートアイロン' },
    { brand: 'agetuya_cordless_mini_straight_iron', name: 'Agetuya アゲツヤ コードレス ミニアイロン 充電式 ストレート＆カール 2way 携帯用 海外対応 ヘアアイロン 小型', query: 'アゲツヤ コードレス ミニアイロン' },
    { brand: 'areti_portable_cordless_hair_iron', name: 'Areti アレティ ポータブル コードレス ヘアアイロン i38 プレート 充電式 ストレート カール ミニ 持ち運び 旅行用', query: 'アレティ コードレス ヘアアイロン' },
    { brand: 'festino_charging_portable_mini_iron', name: 'FESTINO フェスティノ USB スタイリング ヘアアイロン 充電式 コードレス コンパクト 前髪 お直し ストレート カール', query: 'フェスティノ 充電式 ヘアアイロン' },
    { brand: 'create_ion_cordless_iron_klein', name: 'クレイツ コードレス ヘアアイロン クラインストレート RCIS-G02W 海外兼用 充電式 ミニ クレイツイオン加工', query: 'クレイツ コードレス ヘアアイロン' },
    { brand: 'tescom_cordless_hair_iron_isc', name: 'テスコム コードレス ヘアアイロン ISC200 充電式 リチウムイオン ヘアーアイロン ストレート カール 外出先 お直し', query: 'テスコム コードレス ヘアーアイロン' }
  ];

  const cordlessItems = [];
  for (const cfg of cordlessIronConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cordlessItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【よもぎ温座パット＆温活フェムケア・オーガニック温熱シート】 10選 ---
  console.log('\n=== テーマ3: よもぎ温座パット＆温活フェムケア・オーガニック温熱シート ===');
  const yomogiWarmConfigs = [
    { brand: 'graphico_yutsuki_bijin_yomogi_onza_pad', name: 'グラフィコ 優月美人 よもぎ温座パット 6回分 / 36回分 よもぎ蒸し パッド 骨盤温め 冷え性改善 カイロ フェムケア 生理前温活', query: '優月美人 よもぎ温座パット' },
    { brand: 'withfemme_yomogi_warming_pad_organic', name: 'ウィズフェム よもぎ温熱パッド オーガニックコットン よもぎ蒸しシート 温活 下腹部温め 冷え対策 フェムテック', query: 'よもぎ温座 パッド 温活' },
    { brand: 'drelcia_femcare_warming_herb_sheet', name: '韓国伝統 よもぎ蒸し パッド オーガニック 国産よもぎ配合 デリケートゾーン 温熱シート 骨盤 巡り改善 冬の防寒', query: 'よもぎ蒸しパッド 韓国' },
    { brand: 'kiribai_belly_warming_sheet_kairo', name: '桐灰 命の母 おなか用カイロ 貼るカイロ 温熱シート ぬくもり 巡り 骨盤温活 下腹部 冷え対策 10個入', query: '桐灰 命の母 カイロ' },
    { brand: 'kao_megrhythm_steam_warm_patch', name: 'めぐりズム 蒸気の温熱シート 下着の内側面に貼るタイプ 5枚入 / 8枚入 蒸気温熱 胃腸の働きを活発に 冷え改善 お腹 腰', query: 'めぐりズム 蒸気の温熱シート 下着の内側' },
    { brand: 'onpax_femcare_warm_cushion_sheet', name: 'エステー オンパックス おなか温熱シート 温活 貼るカイロ よもぎ ハーブ 温感シート 冷えとり 骨盤ケア', query: 'オンパックス 温熱シート おなか' },
    { brand: 'organic_cotton_yomogi_steam_pack_set', name: 'オーガニックコットン よもぎ蒸し シート 温活パッド 無漂白 天然よもぎ末 ハーブカイロ 冷えとり 防寒 妊活ケア', query: 'よもぎ蒸し シート オーガニック' },
    { brand: 'kiribai_femcare_warming_spot_pad', name: '小林製薬 桐灰 あずきのチカラ おなか用 レンジで温めるだけ 繰り返し使える 温熱ピロー 蒸気温熱 下腹部温活', query: 'あずきのチカラ おなか用' },
    { brand: 'botanical_herbal_warming_pad_femtech', name: 'ボタニカル よもぎ ハーブ 温熱シート 温活パッド 骨盤底筋 冷え改善 温め 美容温活 下半身冷え対策', query: 'よもぎ 温熱パット' },
    { brand: 'genmai_hot_pack_organic_warming_cushion', name: '玄米カイロ おなか用 レンジで温める 温活玄米ピロー 米ぬか ハーブ よもぎ リラックス 温熱パッド 繰り返し使用可能', query: '玄米カイロ おなか' }
  ];

  const yomogiItems = [];
  for (const cfg of yomogiWarmConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        yomogiItems.push(valid);
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
    theme1_carbonic_pack: carbonicItems,
    theme2_cordless_iron: cordlessItems,
    theme3_yomogi_warm_pad: yomogiItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch58_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第58弾 全${carbonicItems.length + cordlessItems.length + yomogiItems.length}件のアイテム情報を ${outPath} に保存しました！`);
}

fetchWinterBatch58Items().catch(console.error);
