import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch67Items() {
  console.log('❄️ [11-12月冬コスメ 第67弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【高機能速乾・美髪ナノケアドライヤー＆大風量イオンヘアドライヤー】 10選 ---
  console.log('\n=== テーマ1: 高機能速乾・美髪ナノケアドライヤー＆大風量イオンヘアドライヤー ===');
  const dryerConfigs = [
    { brand: 'panasonic_nanocare_hair_dryer_eh_na0j', name: 'パナソニック ヘアドライヤー ナノケア 高浸透ナノイー＆ミネラル EH-NA0J 速乾 大風量 静電気抑制', query: 'パナソニック ナノケア ドライヤー' },
    { brand: 'refa_beautech_dryer_smart_pro_hydro', name: 'ReFa リファ ビューテック ドライヤー スマート プロ ハイドロイオン センシング 速乾 美髪 コンパクト', query: 'ReFa ビューテック ドライヤー' },
    { brand: 'kinujo_hair_dryer_super_far_infrared_light', name: 'KINUJO 絹女 ヘアドライヤー 超遠赤外線 超大風量 超軽量 マイナスイオン 速乾 ツヤ髪 折りたたみ', query: 'KINUJO 絹女 ドライヤー' },
    { brand: 'salonia_speedy_ion_dryer_quick_dry_light', name: 'SALONIA サロニア スピーディーイオンドライヤー 大風量 速乾 マイナスイオン 軽量 ダメージ低減', query: 'サロニア スピーディーイオンドライヤー' },
    { brand: 'dyson_supersonic_nural_shine_hair_dryer', name: 'Dyson ダイソン スーパーソニック ヘアドライヤー スカルプケア インテリジェントヒートコントロール 速乾', query: 'ダイソン スーパーソニック ドライヤー' },
    { brand: 'koizumi_monster_double_fan_ion_dryer', name: 'コイズミ KOIZUMI モンスター ダブルファンドライヤー 大風量 短時間乾燥 デジタルマイナスイオン', query: 'コイズミ モンスター ドライヤー' },
    { brand: 'sharp_plasmacluster_beauty_hair_dryer', name: 'シャープ SHARP プラズマクラスター ドライヤー 速乾 美髪 うるおいキープ 静電気抑制 ドレープフロー', query: 'シャープ プラズマクラスター ドライヤー' },
    { brand: 'holistic_cures_magnet_hair_pro_dryer_zero', name: 'ホリスティックキュア マグネットヘアプロ ドライヤー ゼロ 速乾 育成光線 美髪 軽量 プロ仕様', query: 'マグネットヘアプロ ドライヤー ゼロ' },
    { brand: 'bioprogramming_repronizer_hair_beauron_4d', name: 'バイオプログラミング レプロナイザー ヘアドライヤー セラミックス 髪質改善 うるツヤ 最高峰美髪', query: 'レプロナイザー ドライヤー' },
    { brand: 'yaman_lift_dryer_scalp_facial_care_glow', name: 'ヤーマン YA-MAN リフトドライヤー 音波振動 スカルプケア フェイスリフト 大風量 速乾 美髪', query: 'ヤーマン リフトドライヤー' }
  ];

  const dryerItems = [];
  for (const cfg of dryerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 3000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (dryerItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古') && !dryerItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        dryerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【EMS電気バリブラシ＆頭皮・フェイスリフトブラシ】 10選 ---
  console.log('\n=== テーマ2: EMS電気バリブラシ＆頭皮・フェイスリフトブラシ ===');
  const brushConfigs = [
    { brand: 'salonia_ems_lift_brush_face_scalp_body', name: 'SALONIA サロニア EMS リフトブラシ 3Dフィットピン 頭皮 フェイス ボディ 全身リフトケア 温感 防水', query: 'サロニア EMS リフトブラシ' },
    { brand: 'mytrex_prove_electric_pulse_scalp_face_lift', name: 'MYTREX PROVE マイトレックス プルーヴ 電気バリブラシ EMS パルス マイクロカレント 表情筋 リフトケア', query: 'マイトレックス プルーヴ EMS' },
    { brand: 'yaman_mysé_scalp_lift_active_plus_ems', name: 'ヤーマン ミーゼ スカルプリフト アクティブ プラス EMS マイクロカレント 赤色青色LED 防水 頭皮 顔', query: 'ミーゼ スカルプリフト アクティブ' },
    { brand: 'electron_denki_bari_brush_2_lotus_skincare', name: 'デンキバリブラシ 2.0 エレクトロン ELECTRON 低周波美容機器 頭皮 フェイスライン ハリ ツヤ サロン品質', query: 'デンキバリブラシ エレクトロン' },
    { brand: 'anlan_ems_head_spa_scalp_lift_brush_led', name: 'ANLAN EMS スカルプブラシ 電気ブラシ 赤色青色LED 振動エステ イオン導出入 頭皮マッサージ フェイスケア', query: 'ANLAN EMS スカルプブラシ' },
    { brand: 'festino_ems_charging_head_spa_brush', name: 'FESTINO フェスティノ EMS チャージング ヘッドスパ ブラシ 頭皮リフト 音波振動 完全防水 お風呂ケア', query: 'フェスティノ EMS ヘッドスパ' },
    { brand: 'aderans_smasbeat_ems_lift_brush_led_care', name: 'アデランス スマスビート EMSリフトブラシ 頭皮ケア 赤色LED バイブレーション スカルプ美顔器', query: 'アデランス スマスビート EMS' },
    { brand: 'niplux_ems_head_spa_scalp_brush_massage', name: 'NIPLUX EMS ヘッドスパ スカルプブラシ 電気針ブラシ 揉み上げ EMSパルス LED光美顔 防水 頭皮洗浄', query: 'NIPLUX EMS ヘッドスパ' },
    { brand: 'belulu_brilliant_hair_ems_scalp_device', name: '美ルル ブリリアントヘアー EMS レーザー 赤色LED 高周波 頭皮ケア スカルプマシン 薄毛 ハリコシ 美髪', query: '美ルル ブリリアントヘアー' },
    { brand: 'lement_scalp_spa_ems_brush_waterproof', name: 'Le ment ルメント ヘッドスパ EMS スカルプブラシ 炭酸シャンプー併用 防水 お風呂リフトケア 頭皮ほぐし', query: 'ルメント ヘッドスパ EMS' }
  ];

  const brushItems = [];
  for (const cfg of brushConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 3000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (brushItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古') && !brushItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        brushItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【ホリデー限定ボディケア＆バスギフトセット2026】 10選 ---
  console.log('\n=== テーマ3: ホリデー限定ボディケア＆バスギフトセット2026 ===');
  const bodycareConfigs = [
    { brand: 'sabon_holiday_bodycare_bath_gift_box', name: 'SABON サボン ホリデー ギフトセット ボディスクラブ シャワーオイル ボディローション クリスマス限定 コフレ', query: 'SABON ホリデー ギフト ボディケア' },
    { brand: 'loccitane_holiday_body_hand_care_gift_set', name: 'ロクシタン L\'OCCITANE ホリデー スキン＆ボディケア ギフトセット シア ハンドクリーム シャワーオイル コフレ', query: 'ロクシタン ホリデー ボディケア ギフト' },
    { brand: 'lush_snow_fairy_christmas_bath_gift_box', name: 'LUSH ラッシュ スノーフェアリー クリスマス ギフトセット バスボム シャワージェル ボディローション 冬限定', query: 'LUSH スノーフェアリー クリスマス' },
    { brand: 'ayura_meditation_bath_holiday_spa_gift_set', name: 'AYURA アユーラ メディテーションバスt 入浴剤 ボディ用美容液 ホリデー ギフトセット 癒し アロマ 安眠', query: 'アユーラ メディテーションバス ギフト' },
    { brand: 'john_masters_holiday_body_hair_care_set', name: 'ジョンマスターオーガニック ホリデーコレクション ボディウォッシュ ボディミルク リップカーム オーガニック ギフト', query: 'ジョンマスター ホリデー ギフト' },
    { brand: 'jill_stuart_holiday_white_floral_body_gift', name: 'ジルスチュアート JILL STUART ホワイトフローラル ボディミルク ハンドクリーム ホリデー限定 コフレ プレゼント', query: 'ジルスチュアート ギフト ボディミルク' },
    { brand: 'the_body_shop_holiday_body_butter_duo_trio', name: 'ザ・ボディショップ THE BODY SHOP ホリデー ボディバター シャワージェル ギフトセット 高保湿 冬限定', query: 'ボディショップ ホリデー ギフト' },
    { brand: 'molton_brown_holiday_bauble_bath_shower_gel', name: 'モルトンブラウン MOLTON BROWN クリスマス ボーブル バス＆シャワージェル ホリデー限定 英国王室御用達 ギフト', query: 'モルトンブラウン クリスマス ギフト' },
    { brand: 'neals_yard_holiday_aroma_bodycare_relax_kit', name: 'ニールズヤード レメディーズ ホリデー アロマティック ボディバター バスソルト リラックス オーガニック コフレ', query: 'ニールズヤード ホリデー ギフト' },
    { brand: 'kneipp_holiday_bath_salt_body_lotion_set', name: 'クナイプ KNEIPP バスソルト アソート ギフトセット ボディローション ハンドクリーム ドイツ天然岩塩 冬温活', query: 'クナイプ バスソルト ギフトセット' }
  ];

  const bodycareItems = [];
  for (const cfg of bodycareConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (bodycareItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !bodycareItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bodycareItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 結果の保存
  const result = {
    theme1_nanocare_hair_dryer: dryerItems,
    theme2_ems_scalp_lift_brush: brushItems,
    theme3_holiday_bodycare_bath_gift: bodycareItems
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch67_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第67弾 全${dryerItems.length + brushItems.length + bodycareItems.length}件のアイテム保存完了: ${outPath}`);
  console.log(`- テーマ1 (ナノケアドライヤー): ${dryerItems.length}件`);
  console.log(`- テーマ2 (EMS電気バリブラシ): ${brushItems.length}件`);
  console.log(`- テーマ3 (ホリデーボディケアギフト): ${bodycareItems.length}件`);
}

fetchWinterBatch67Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
