import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch55Items() {
  console.log('❄️ [11-12月冬コスメ 第55弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【EMSリフトブラシ＆デンキバリブラシ】 10選 ---
  console.log('\n=== テーマ1: EMSリフトブラシ＆デンキバリブラシ ===');
  const emsBrushConfigs = [
    { brand: 'electron_denki_bari_brush_2', name: 'ELECTRON エレクトロン デンキバリブラシ 2.0 +ボディ 電気バリブラシ 頭皮 フェイス ボディ 低周波 美顔器', query: 'デンキバリブラシ エレクトロン 公式' },
    { brand: 'salonia_ems_lift_brush', name: 'SALONIA サロニア EMSリフトブラシ 電気ブラシ 頭皮 フェイスケア リフトアップ 温感 防水 スカルプ', query: 'サロニア EMSリフトブラシ' },
    { brand: 'yaman_mys_scalp_lift_active_plus', name: 'YA-MAN ヤーマン myse ミーゼ スカルプリフト アクティブ プラス MS-82G 高リフト EMSブラシ 頭皮 リフトケア', query: 'ミーゼ スカルプリフト アクティブ プラス' },
    { brand: 'mytrex_prove_ems_brush', name: 'MYTREX マイトレックス PROVE プルーヴ トータルリフト美顔器 EMS 目元 口元 頭皮 フェイスブラシ', query: 'MYTREX PROVE マイトレックス プルーヴ' },
    { brand: 'panasonic_vitalift_brush', name: 'Panasonic パナソニック バイタリフト ブラシ EH-SP60 EMS スカルプ 頭筋 リフトケア 美顔器', query: 'バイタリフト ブラシ EH-SP60 パナソニック' },
    { brand: 'aderans_do_raise_electric_brush', name: 'アデランス DoRAISE ドゥライズ 電気リフトブラシ 赤色LED EMS ラジオ波 バイブレーション 頭皮ケア', query: 'アデランス DoRAISE 電気ブラシ' },
    { brand: 'gment_ems_head_spa_brush', name: 'G-MENT EMS スカルプ＆フェイスリフトブラシ 赤青LED 温熱機能 イオン導出入 頭筋ほぐし 美顔器', query: 'EMS リフトブラシ 頭皮 美顔器' },
    { brand: 'wavewave_scalp_brush_pro', name: 'WAVEWAVE スカルプ ブラシ Pro EMS RF美顔器 赤色LED 低周波 頭皮ケア リフトアップ フェイスケア', query: 'WAVEWAVE スカルプブラシ Pro' },
    { brand: 'fukigen_lift_brush_ems', name: 'ANLAN EMS スカルプブラシ リフトアップ美顔器 振動エステ 赤色光 青色光 全身ケア 防水仕様', query: 'ANLAN EMS スカルプブラシ' },
    { brand: 'le_ment_head_spa_ems_brush', name: 'ルメント Le ment ヘッドスパ EMS 頭皮マッサージ機 リフトケア スカルプブラシ 防水', query: 'ルメント ヘッドスパ EMS' }
  ];

  const emsBrushItems = [];
  for (const cfg of emsBrushConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 4000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('アタッチメントのみ') || it.itemName.includes('ローションのみ')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 4000 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        emsBrushItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【高濃度薬用トラネキサム酸 美白美容液＆シミ・肝斑クリーム】 10選 ---
  console.log('\n=== テーマ2: 高濃度薬用トラネキサム酸 美白美容液＆シミ・肝斑クリーム ===');
  const txaConfigs = [
    { brand: 'transino_medicated_whitening_essence_ex', name: '第一三共ヘルスケア トランシーノ 薬用ホワイトニングエッセンスEXII 50g トラネキサム酸 美白美容液 肝斑 シミ しみ', query: 'トランシーノ 薬用ホワイトニングエッセンスEXII' },
    { brand: 'shiseido_haku_melano_focus_ev', name: '資生堂 HAKU メラノフォーカスEV 45g 薬用美白美容液 4MSK m-トラネキサム酸 シミ予防 シミのもと 美容液', query: 'HAKU メラノフォーカスEV 資生堂' },
    { brand: 'hadalabo_shirojyun_premium_serum', name: 'ロート製薬 肌ラボ 白潤プレミアム 薬用浸透美白ジュレ 美容液 トラネキサム酸 グリチルリチン酸2K ビタミンC', query: '白潤プレミアム 薬用 浸透 美白 ジュレ' },
    { brand: 'kiso_white_cream_txa', name: 'KISO 基礎化粧品 薬用 ホワイトクリームTX トラネキサム酸 高配合 50g 医薬部外品 美白 保湿 シミ くすみ', query: 'KISO ホワイトクリーム トラネキサム酸' },
    { brand: 'cosmedecorte_whitelogist_serum', name: 'コスメデコルテ ホワイトロジスト ネオジェネシス ブライトニング コンセントレイト 40ml コウジ酸 トラネキサム酸 美白', query: 'ホワイトロジスト ネオジェネシス' },
    { brand: 'elixir_brightening_serum_txa', name: '資生堂 エリクシール ホワイト スポットクリアセラム WT 22g 薬用美白美容液 トラネキサム酸 純粋レチノール 4MSK', query: 'エリクシール スポットクリアセラム WT' },
    { brand: 'tovert_whitening_serum_txa', name: 'トゥヴェール 薬用ホワイトニングローションα EX トラネキサム酸 ビタミンC誘導体 高濃度 美白化粧水 美容液', query: 'トゥヴェール ホワイトニングローションα EX' },
    { brand: 'chifure_whitening_serum_w_txa', name: 'ちふれ 美白美容液 W 30ml アルブチン トラネキサム酸 薬用 W美白 詰め替え うるおい 保湿 プチプラ', query: 'ちふれ 美白美容液 W' },
    { brand: 'astalift_white_essence_infilt', name: '富士フイルム アスタリフト ホワイト エッセンス インフィルト 30ml トラネキサム酸 ナノAMA+ 美白 美容液 シミ', query: 'アスタリフト ホワイト エッセンス インフィルト' },
    { brand: 'dprogram_whitening_clear_jelly', name: '資生堂 dプログラム ホワイトニングクリア セラム 薬用美白美容液 敏感肌 トラネキサム酸 赤み 肌荒れ予防', query: 'dプログラム ホワイトニングクリア セラム' }
  ];

  const txaItems = [];
  for (const cfg of txaConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('サプリ') || it.itemName.includes('錠剤') || it.itemName.includes('カプセル')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !it.itemName.includes('サプリ'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        txaItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【塗るボトックス＆アルジレリン・シンエイク・ペプチド美容液】 10選 ---
  console.log('\n=== テーマ3: 塗るボトックス＆アルジレリン・シンエイク・ペプチド美容液 ===');
  const botoxConfigs = [
    { brand: 'the_ordinary_argireline_solution', name: 'The Ordinary ジ オーディナリー アルジレリン 10% ソリューション 30ml 塗るボトックス アセチルヘキサペプチド 表情ジワ', query: 'The Ordinary アルジレリン ソリューション' },
    { brand: 'medicube_botox_ampoule_peptide', name: 'medicube メディキューブ PDRN 塗るボトックス ペプチド 集中アンプル 30ml ハリ 弾力 目元 眉間 小じわ 美容液', query: 'メディキューブ ペプチド アンプル' },
    { brand: 'kiso_peptide_essence_argireline', name: 'KISO 基礎化粧品 アセチルヘキサペプチド-8 原液 20ml アルジレリン 塗るボトックス 目元 口元 表情じわ 美容液', query: 'KISO アセチルヘキサペプチド 原液' },
    { brand: 'synake_snake_venom_serum_synake', name: 'シンエイク 原液 100% 20ml 蛇毒ペプチド 塗るボトックス様成分 目元 ほうれい線 額 表情筋 集中エイジングケア', query: 'シンエイク 美容液 原液' },
    { brand: 'tovert_essence_tw_argireline', name: 'トゥヴェール エッセンスTW 30ml ビタミンC誘導体 パルミチン酸レチノール アルジレリン 塗るボトックス 美容液', query: 'トゥヴェール エッセンスTW' },
    { brand: 'vt_cica_vital_peptide_ampoule', name: 'VT COSMETICS シカ ペプチド アンプル 塗るボトックス 弾力ケア CICA エイジングケア 目元 ハリ', query: 'VT ペプチド アンプル' },
    { brand: 'klairs_midnight_blue_peptide', name: 'Dear Klairs クレアス ミッドナイト ブルー ユース アクティベーティング ドロップ 20ml EGF FGF ペプチド 弾力 美容液', query: 'クレアス ミッドナイトブルー ドロップ' },
    { brand: 'dermafirm_peptide_ampoule', name: 'DERMAFIRM ダーマファーム ウルトラセラム ペプチド 30ml アズレン 高純度ペプチド 弾力 ハリ リフト 美容液', query: 'ダーマファーム ペプチド セラム' },
    { brand: 'naturador_argireline_pure_serum', name: 'ナチュドール アルジレリン 10% 原液 美容液 20ml 塗るボトックス アセチルヘキサペプチド-8 乾燥小ジワ エイジングケア', query: 'ナチュドール アルジレリン 原液' },
    { brand: 'tunemakers_peptide_antiwrinkle', name: 'TUNEMAKERS チューンメーカーズ ペプチド 原液 10ml ハリ不足 目元 口元 エイジングケア 原液美容液', query: 'チューンメーカーズ ペプチド 原液' }
  ];

  const botoxItems = [];
  for (const cfg of botoxConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('サプリ')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        botoxItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const outData = {
    theme1_ems_brush: emsBrushItems,
    theme2_tranexamic_acid: txaItems,
    theme3_botox_argireline: botoxItems
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch55_items.json', JSON.stringify(outData, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch55_items.json (EMSブラシ: ${emsBrushItems.length}件, トラネキサム酸: ${txaItems.length}件, 塗るボトックス: ${botoxItems.length}件)`);
}

fetchWinterBatch55Items();
