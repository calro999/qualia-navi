import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch63() {
  console.log('🔄 [冬コスメ 第63弾] 楽天APIから正確なコスメ＆美容ギアを取得して精査・補完します...');
  const filePath = 'scratch/rakuten_winter_batch63_items.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // --- テーマ1の精査（3番目のネッククーラーを除外して、真の充電式カイロに差し替え） ---
  data.theme1_hand_warmer = data.theme1_hand_warmer.filter(it => {
    return !it.itemName.includes('ネッククーラー') && !it.itemName.includes('冷却プレート');
  });

  const warmerReplacementQueries = [
    { brand: 'lifeonproducts_warm_hand_warmer_rechargeable', name: 'Life on Products 蓄熱式電気カイロ 充電式カイロ カイロ ウォーマー モバイルバッテリー エコ', query: 'ライフオンプロダクツ カイロ' },
    { brand: 'smart_temp_control_portable_electric_kairo', name: '充電式カイロ 電気カイロ 小型 軽量 急速発熱 3段階調温 防寒グッズ ギフト プレゼント', query: '電気カイロ かわいい 小型' }
  ];

  for (const cfg of warmerReplacementQueries) {
    if (data.theme1_hand_warmer.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1200) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('冷却')) return false;
        if (data.theme1_hand_warmer.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_hand_warmer.push(valid);
        console.log(`✅ テーマ1追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2の精査（洗顔料を除外し、純粋な音波振動シリコン洗顔ブラシに差し替え＆10件確保） ---
  data.theme2_cleansing_brush = data.theme2_cleansing_brush.filter(it => {
    return !it.itemName.includes('エクストラ クリーミー フォーム');
  });

  const brushReplacementQueries = [
    { brand: 'salonia_facial_cleansing_brush_device', name: 'SALONIA サロニア イオンフェイシャルブラシ 洗顔器 音波振動 温熱 毛穴ディープクレンジング 防水', query: 'サロニア 音波洗顔器' },
    { brand: 'anlan_sonic_silicone_facial_brush_cleanse', name: 'ANLAN 音波洗顔ブラシ シリコン フェイスブラシ 温熱 毛穴ケア クレンジング 角栓 黒ずみ 防水', query: 'ANLAN 音波洗顔' },
    { brand: 'arety_pore_silicone_cleansing_brush', name: 'Areti アレティ 洗顔ブラシ シリコン 音波振動 毛穴 黒ずみ 角栓 クレンジング 防水 美顔器', query: 'アレティ 洗顔ブラシ' },
    { brand: 'touchbeauty_sonic_silicone_facial_brush', name: 'TOUCHBeauty 音波洗顔ブラシ シリコン 洗顔器 フェイスブラシ 毛穴汚れ 角質ケア IPX7防水', query: '音波洗顔ブラシ シリコン' },
    { brand: 'belulu_fururu_silicone_sonic_cleanse', name: '美ルル フルル シリコン 洗顔ブラシ 音波振動 クレンジング 美顔器 毛穴汚れ スキンケア', query: '美ルル フルル' }
  ];

  for (const cfg of brushReplacementQueries) {
    if (data.theme2_cleansing_brush.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('洗顔フォーム') || it.itemName.includes('洗顔料')) return false;
        if (data.theme2_cleansing_brush.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_cleansing_brush.push(valid);
        console.log(`✅ テーマ2追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3の精査（ヘッドスパやふるさと納税を除外し、通常販売の光LED美顔マスクに差し替え＆10件確保） ---
  data.theme3_led_mask = data.theme3_led_mask.filter(it => {
    return !it.itemName.includes('ヘッドスパ') && !it.itemName.includes('ふるさと納税') && !it.itemName.includes('クラッシィ');
  });

  const ledMaskReplacementQueries = [
    { brand: 'anlan_7color_led_light_photofacial_mask', name: 'ANLAN 7色 光美顔マスク LED美顔器 フォトフェイシャル 赤色LED 近赤外線 毛穴 くすみ ハリ', query: 'LED 光美顔マスク' },
    { brand: 'currentbody_style_soft_silicone_led_mask', name: 'LED 美顔器 マスク 光エステ 赤色LED 近赤外線 シリコン 柔らかい 密着 フォトフェイシャル', query: 'LED 美顔器 シリコン マスク' },
    { brand: 'belulu_hikari_plus_led_photofacial_device', name: '美ルル ヒカリプラス belulu 光エステ LED美顔器 7色LED フォトフェイシャル コラーゲンマシン', query: '美ルル ヒカリ' },
    { brand: 'wireless_wearable_led_light_facial_mask', name: 'LED 美顔マスク ウェアラブル 光美顔器 コードレス ハンズフリー 3色光 フォトエステ 美肌ケア', query: 'LED 美顔器 マスク コードレス' },
    { brand: 'silicone_collagen_red_light_led_mask_face', name: 'LEDマスク 赤色光 近赤外線 コラーゲン 光エステ 美顔器 シリコンマスク フェイスケア ハリ 弾力', query: 'LEDマスク 赤色光' },
    { brand: 'phototherapy_7color_led_skin_care_shield', name: '光エステ LEDマスク 美顔器 7色光 フェイシャル シールドタイプ ハンズフリー 美肌 光美容', query: '光エステ LED 美顔器 マスク' },
    { brand: 'cosbeauty_led_photo_mask_beauty_clean', name: 'LED 美顔マスク 光美顔器 フォトフェイシャル 3色 LED 赤色 青色 オレンジ 肌荒れ エイジングケア', query: 'LED フェイスマスク 光エステ' }
  ];

  for (const cfg of ledMaskReplacementQueries) {
    if (data.theme3_led_mask.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ふるさと納税') || it.itemName.includes('ヘッドスパ') || it.itemName.includes('シャワー')) return false;
        if (data.theme3_led_mask.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_led_mask.push(valid);
        console.log(`✅ テーマ3追加: [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 精査完了！ テーマ1=${data.theme1_hand_warmer.length}件, テーマ2=${data.theme2_cleansing_brush.length}件, テーマ3=${data.theme3_led_mask.length}件`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

refineBatch63().catch(console.error);
