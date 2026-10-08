import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch63Items() {
  console.log('❄️ [11-12月冬コスメ 第63弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【充電式カイロ＆モバイルバッテリー温活（繰り返し使える電気ハンドウォーマー）】 10選 ---
  console.log('\n=== テーマ1: 充電式カイロ＆モバイルバッテリー温活（電気ハンドウォーマー） ===');
  const handWarmerConfigs = [
    { brand: 'mottole_rechargeable_hand_warmer', name: 'mottole モットル 充電式カイロ モバイルバッテリー機能 電気カイロ かわいい 小型 薄型 速暖', query: 'mottole 充電式カイロ' },
    { brand: 'francfranc_rechargeable_pocket_warmer', name: 'Francfranc フランフラン 繰り返し使えるカイロ 充電式 カイロ ウォーマー モバイルバッテリー ギフト', query: 'フランフラン 充電式カイロ' },
    { brand: 'lifeonproducts_dual_hand_warmer_separable', name: 'Life on Products 2つに分かれる 充電式カイロ シェアできる モバイルバッテリー機能付き 両手温め', query: 'Life on Products 充電式カイロ' },
    { brand: 'etshaim_pocket_rechargeable_hand_warmer', name: '充電式カイロ 電気カイロ 急速発熱 3段階温度調節 モバイルバッテリー 大容量 繰り返し使える', query: '充電式カイロ 急速発熱' },
    { brand: 'cute_macaron_rechargeable_hand_warmer', name: '充電式カイロ かわいい マカロン型 くすみカラー 小型 軽量 ミニ 電気カイロ プレゼント ギフト', query: '充電式カイロ かわいい' },
    { brand: 'separable_magnetic_rechargeable_hand_warmer', name: '充電式カイロ 分離式 磁石でくっつく 1台2役 両手で使える モバイルバッテリー機能 寒さ対策', query: '充電式カイロ 分離式' },
    { brand: 'large_capacity_digital_display_hand_warmer', name: '充電式カイロ LED残量表示 温度表示 大容量バッテリー 10000mAh 長時間発熱 防寒グッズ', query: '充電式カイロ 温度表示' },
    { brand: 'ultra_slim_lightweight_pocket_hand_warmer', name: '充電式カイロ 超薄型 軽量 ポケットサイズ 電気カイロ ミニ コンパクト 通勤 通学 ギフト', query: '充電式カイロ 薄型' },
    { brand: 'leather_strap_luxury_rechargeable_warmer', name: '充電式カイロ レザーストラップ付き 高級感 おしゃれ ハンドウォーマー 即暖 モバイルバッテリー', query: '充電式カイロ おしゃれ' },
    { brand: 'mirror_equipped_rechargeable_hand_warmer', name: '充電式カイロ ミラー付き 鏡付き コンパクト 電気カイロ コスメ風 メイク直し 寒さ対策', query: '充電式カイロ ミラー' }
  ];

  const handWarmerItems = [];
  for (const cfg of handWarmerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1200) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (handWarmerItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1200 && !it.itemName.includes('中古') && !handWarmerItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        handWarmerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【音波振動シリコン電動洗顔ブラシ（摩擦レス毛穴ディープクレンジング）】 10選 ---
  console.log('\n=== テーマ2: 音波振動シリコン電動洗顔ブラシ（摩擦レス毛穴ケア） ===');
  const cleansingBrushConfigs = [
    { brand: 'foreo_luna_mini_silicone_cleansing_brush', name: 'FOREO LUNA mini 音波振動 シリコン 洗顔ブラシ 完全防水 毛穴 黒ずみ ディープクレンジング', query: 'FOREO 洗顔ブラシ' },
    { brand: 'salonia_ion_facial_cleansing_brush', name: 'SALONIA サロニア イオンフェイシャルブラシ 電動洗顔ブラシ 音波振動 温熱 毛穴汚れ 摩擦レス', query: 'サロニア 洗顔ブラシ' },
    { brand: 'anlan_sonic_silicone_facial_cleansing_brush', name: 'ANLAN シリコン 洗顔ブラシ 音波振動 温熱ケア 毛穴ケア クレンジングブラシ USB充電式 防水', query: 'ANLAN 洗顔ブラシ' },
    { brand: 'belulu_fururu_silicone_cleansing_brush', name: '美ルル フルル belulu 洗顔ブラシ シリコン 音波振動 毛穴 黒ずみ 角栓 クレンジング 美顔器', query: '美ルル 洗顔ブラシ' },
    { brand: 'sunmay_leaf_sonic_silicone_facial_cleanser', name: 'SUNMAY 音波洗顔器 葉っぱ型 シリコン 洗顔ブラシ 毛穴ケア 角質オフ 音波振動 15段階スピード', query: 'SUNMAY 洗顔ブラシ' },
    { brand: 'thermal_sonic_silicone_cleansing_device', name: '洗顔ブラシ シリコン 音波振動 温熱 毛穴ケア クレンジング 角栓 黒ずみ 皮脂除去 防水 充電式', query: '洗顔ブラシ シリコン 温熱' },
    { brand: 'rotary_sonic_soft_facial_brush_waterproof', name: '電動 洗顔ブラシ 超極細毛 シリコン 2WAY 音波振動 毛穴クレンジング IPX7防水 回転 洗顔器', query: '電動洗顔ブラシ 超極細毛' },
    { brand: 'compact_pocket_silicone_sonic_face_wash', name: 'シリコン 洗顔ブラシ 音波振動 毛穴 小鼻 角栓 イチゴ鼻 ケア ミニ 小型 旅行用 クレンジング', query: 'シリコン 洗顔ブラシ 小鼻' },
    { brand: 'emperor_facial_deep_cleanse_silicone_device', name: '洗顔ブラシ 電動 音波振動 シリコン クレンジングブラシ 毛穴洗浄 ディープクレンジング 洗顔器', query: '電動 音波洗顔器 シリコン' },
    { brand: 'multifunctional_facial_massager_cleansing_brush', name: '音波振動 洗顔ブラシ シリコン フェイスマッサージ 毛穴ケア 角質ケア リフトケア 温感 防水', query: '洗顔器 音波 シリコン' }
  ];

  const cleansingBrushItems = [];
  for (const cfg of cleansingBrushConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (cleansingBrushItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !cleansingBrushItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cleansingBrushItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【LED美顔マスク＆光エステフォトフェイシャル（赤色LED×近赤外線）】 10選 ---
  console.log('\n=== テーマ3: LED美顔マスク＆光エステフォトフェイシャル ===');
  const ledMaskConfigs = [
    { brand: 'anlan_7color_led_light_facial_mask', name: 'ANLAN 7色LED 光美顔マスク フォトフェイシャル 赤色LED 近赤外線 美顔器 ハンズフリー 光エステ', query: 'ANLAN LEDマスク' },
    { brand: 'belulu_hikari_mini_led_facial_mask', name: '美ルル ヒカリミニ belulu LED美顔器 光エステ フォトフェイシャル 3色LED コラーゲンマシン', query: '美ルル LED 美顔器' },
    { brand: 'silicone_soft_led_beauty_face_mask', name: 'LED 美顔マスク シリコン 柔らかい 密着 光エステ 赤色LED 近赤外線 フォトフェイシャル 美顔器', query: 'LED 美顔器 マスク シリコン' },
    { brand: 'currentbody_style_led_light_therapy_mask', name: 'LEDマスク 光美顔器 7色 光エステ フォトマスク コラーゲン 毛穴 くすみ ハリ エイジングケア', query: 'LED 美顔マスク 7色' },
    { brand: 'handfree_wireless_led_phototherapy_shield', name: 'LED美顔器 マスク型 ハンズフリー ワイヤレス 光エステ 赤色 青色 黄色 LED シールドタイプ 軽量', query: 'LED 美顔器 マスク ハンズフリー' },
    { brand: 'neck_and_face_dual_led_beauty_mask', name: 'LED 美顔マスク 首元ケア ネックケア付き 一体型 光エステ フォトフェイシャル 7色LED 美顔器', query: 'LED 美顔マスク 首' },
    { brand: 'cosbeauty_led_photo_facial_beauty_device', name: 'LED美顔器 光エステ フォトフェイシャル 赤色LED コラーゲン生成 肌荒れ予防 ハリ 弾力 うるおい', query: '光エステ 美顔器 赤色LED' },
    { brand: 'salon_grade_collagen_light_led_mask', name: 'サロン級 コラーゲンマシン LED 美顔マスク 赤色LED 近赤外線 高輝度 エイジングケア 照射 美顔器', query: 'LEDマスク コラーゲン' },
    { brand: 'compact_eyecare_led_light_facial_mask', name: 'LED 光美顔器 フェイスマスク 目元ケア 光トリートメント 近赤外線 リフトケア 美肌 コードレス', query: 'LED フェイスマスク 美顔器' },
    { brand: 'professional_7_wavelengths_led_skin_care_mask', name: 'LED美顔マスク 7波長 光美顔器 業務級 光エステ スキンケア フォトセラピー ハリ 毛穴 引き締め', query: 'LED 光美顔器 マスク' }
  ];

  const ledMaskItems = [];
  for (const cfg of ledMaskConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (ledMaskItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古') && !ledMaskItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        ledMaskItems.push(valid);
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
    theme1_hand_warmer: handWarmerItems,
    theme2_cleansing_brush: cleansingBrushItems,
    theme3_led_mask: ledMaskItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch63_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第63弾 全${handWarmerItems.length + cleansingBrushItems.length + ledMaskItems.length}件のアイテム情報を ${outPath} に保存しました！`);
}

fetchWinterBatch63Items().catch(console.error);
