import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch60Items() {
  console.log('❄️ [11-12月冬コスメ 第60弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【超音波ウォーターピーリング美顔器＆温感イオン毛穴ケアギア】 10選 ---
  console.log('\n=== テーマ1: 超音波ウォーターピーリング美顔器＆温感イオン毛穴ケア ===');
  const waterPeelingConfigs = [
    { brand: 'anlan_ultrasonic_water_peeling_ems', name: 'ANLAN アンラン 超音波ウォーターピーリング 美顔器 イオン導出 イオン導入 EMSリフト 温熱ケア 毛穴 黒ずみ', query: 'ANLAN ウォーターピーリング' },
    { brand: 'yaman_circle_peeling_pro_device', name: 'ヤーマン YA-MAN サークルピーリングプロ 美顔器 超音波ピーリング 角質ケア 毛穴洗浄 毛穴吸引', query: 'ヤーマン サークルピーリングプロ' },
    { brand: 'cosbeauty_aquapeeling_pro_device', name: 'COSBEAUTY コスビューティー アクリアルピーリングプロEX 超音波美顔器 ウォーターピーリング 防水 角栓', query: 'アクリアルピーリングプロEX' },
    { brand: 'miraie_water_peeling_peeling_pro', name: '美ルル belulu アクアルファ クラシック ウォーターピーリング 美顔器 超音波 イオン導出入 クレンジング', query: '美ルル アクアルファ ウォーターピーリング' },
    { brand: 'festino_facial_cleansing_peeling', name: 'FESTINO フェスティノ 充電式 フェイシャル ピーリング クレンジング 美顔器 毛穴汚れ 超音波', query: 'フェスティノ ピーリング' },
    { brand: 'salonia_aquaclean_peeling_device', name: 'サロニア SALONIA アクアピーリング 美顔器 超音波 ウォーターピーリング 毛穴ケア 水流洗浄', query: 'サロニア ピーリング 美顔器' },
    { brand: 'areti_pore_water_peeling_device', name: 'アレティ Areti ウォーターピーリング 超音波振動 美顔器 スキンケア 毛穴 角栓除去 イオン導入', query: 'アレティ ウォーターピーリング' },
    { brand: 'sarlisi_ultrasonic_skin_scrubber', name: 'サーリシ SARLISI 超音波 ウォーターピーリング スキンバブル 美顔器 毛穴洗浄 黒ずみ ピーリング', query: 'SARLISI ウォーターピーリング' },
    { brand: 'tbr_smart_water_peeling_ems_led', name: 'スマート ウォーターピーリング 美顔器 EMS 青色赤色LED光エステ 超音波振動 温熱 毛穴ケア 防水', query: 'ウォーターピーリング EMS LED' },
    { brand: 'lourdes_face_peeling_cleaner_ax', name: '超音波 ピーリング 美顔器 イオン導入 イオン導出 毛穴ケア 角栓 黒ずみ 小鼻 たるみ コードレス', query: '超音波 ピーリング 美顔器 イオン導入' }
  ];

  const waterPeelingItems = [];
  for (const cfg of waterPeelingConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (waterPeelingItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古') && !waterPeelingItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        waterPeelingItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【生え際カバー＆分け目薄毛・白髪隠しヘアファンデーション・ポンポンヘアパウダー】 10選 ---
  console.log('\n=== テーマ2: 生え際カバー＆白髪隠しヘアファンデーション・ポンポンヘアパウダー ===');
  const hairFoundationConfigs = [
    { brand: 'fujiko_deko_shadow_hair_powder', name: 'Fujiko フジコ dekoシャドウ デコシャドウ ヘアファンデーション 生え際カバー 小顔メイク 分け目', query: 'フジコ dekoシャドウ' },
    { brand: 'aderans_hairplus_viewpaf_powder', name: 'アデランス ヘアプラス ビューパフ ヘアファンデーション パウダー 増毛 白髪隠し 分け目 つむじ', query: 'アデランス ビューパフ' },
    { brand: 'shiseido_prior_hair_foundation', name: '資生堂 プリオール PRIOR ヘア ファンデーション 白髪隠し コンパクト パフ付き 生え際 つむじ', query: 'プリオール ヘア ファンデーション' },
    { brand: 'rishiri_hair_foundation_powder', name: '利尻昆布 利尻ヘアファンデーション 白髪かくし 生え際 分け目 パウダー 無添加 天然由来', query: '利尻 ヘアファンデーション' },
    { brand: 'smh_super_million_hair_pocket', name: 'スーパーミリオンヘアー SMH ヘアファンデーション スティックタイプ 白髪隠し 分け目カバー', query: 'SMH ヘアファンデーション' },
    { brand: 'amorous_kurokami_cover_compact', name: 'アモロス 黒髪花 ヘアファンデーション A コンパクト 白髪隠し 生え際用 ヘアカラーパウダー', query: 'アモロス 黒彩 ヘアファンデーション' },
    { brand: 'cefine_hair_foundation_powder', name: 'セフィーヌ CEFINE ヘアメイク パウダー ビューティプロ 白髪隠し 生え際 分け目 薄毛カバー', query: 'セフィーヌ ヘアメイク パウダー' },
    { brand: 'dariya_salon_de_pro_hair_foundation', name: 'サロンドプロ 白髪かくし カラーオンリタッチ 白髪用 ヘアファンデーション コンパクト 生え際', query: 'サロンドプロ ヘアファンデーション' },
    { brand: 'aroma_shampoo_ponpon_hair_powder', name: 'ポンポンヘアパウダー つむじ 分け目 ボリュームアップ 白髪隠し 頭皮ファンデーション 薄毛カバー', query: 'ポンポン ヘアパウダー 白髪' },
    { brand: 'dior_or_kanebo_kate_hair_shadow', name: 'KATE ケイト 3Dヘアラインバーム フェイス＆ヘアシャドウ 生え際 小顔 骨格補正 シェーディング', query: 'KATE 3Dヘアラインバーム' }
  ];

  const hairFoundationItems = [];
  for (const cfg of hairFoundationConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 900) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (hairFoundationItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 900 && !it.itemName.includes('中古') && !hairFoundationItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairFoundationItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【電動ネイルマシン＆本格セルフネイルケア・爪磨き・甘皮処理キット】 10選 ---
  console.log('\n=== テーマ3: 電動ネイルマシン＆本格セルフネイルケア・爪磨き ===');
  const nailMachineConfigs = [
    { brand: 'rooro_mini_rooro_pochi_nail_drill', name: 'Rooro ローロ ミニローロ ポチ 電動ネイルマシン ジェルオフ 甘皮ケア 角質除去 爪磨き USB充電', query: 'ローロ ミニローロ ポチ' },
    { brand: 'petitor_m_nail_drill_machine_usb', name: 'プチトルM Petitor M 電動ネイルマシン プロ用 ジェルネイル オフ ネイルケア 甘皮 爪やすり ビット付き', query: 'プチトルM ネイルマシン' },
    { brand: 'petitor_c_nail_drill_compact_pink', name: 'プチトルC コンパクト Petitor C 初心者用 ネイルマシン ジェルオフ 自宅ネイル 爪磨き サンディング', query: 'プチトルC ネイルマシン' },
    { brand: 'anlan_electric_nail_polisher_care', name: 'ANLAN 電動ネイルケア 爪やすり 爪磨き 甘皮処理 角質除去 5in1 ネイルマシン LEDライト付き', query: 'ANLAN 電動ネイルケア' },
    { brand: 'festino_rechargeable_nail_care_pen', name: 'FESTINO フェスティノ 充電式 ネイルケア ペン 電動爪磨き 甘皮 美容家電 ギフト', query: 'フェスティノ ネイルケア' },
    { brand: 'panasonic_nail_care_device_es_wc20', name: 'パナソニック Panasonic ネイルケア 基本ケア ES-WC20 甘皮ケア 爪磨き 形づくり 美爪', query: 'パナソニック ネイルケア ES-WC20' },
    { brand: 'kashimura_rechargeable_nail_polisher', name: 'カシムラ ネイルケア 電動爪磨き USB充電式 爪やすり 甘皮処理 ネイルマシン 自宅エステ', query: '電動ネイルマシン USB充電式' },
    { brand: 'belle_professional_nail_drill_pro', name: 'プロ仕様 電動ネイルマシン 正逆回転 無段階スピード調整 ビットセット ジェルネイルオフ スカルプ', query: 'ネイルマシン プロ用 正逆回転' },
    { brand: 'cordless_nail_drill_machine_bits', name: 'コードレス ネイルマシン 充電式 ネイルケア 甘皮処理 爪磨き ジェルオフ コンパクト 静音設計', query: 'コードレス ネイルマシン' },
    { brand: 'glass_nail_electric_buffer_shine', name: 'ガラス製 電動爪磨き シャイナー ピカピカ 自爪ケア 素爪美爪 ツヤ出し ネイルポリッシャー', query: '電動 爪磨き ガラス' }
  ];

  const nailMachineItems = [];
  for (const cfg of nailMachineConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1200) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (nailMachineItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1200 && !it.itemName.includes('中古') && !nailMachineItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        nailMachineItems.push(valid);
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
    theme1_water_peeling: waterPeelingItems,
    theme2_hair_foundation: hairFoundationItems,
    theme3_nail_machine: nailMachineItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch60_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第60弾 全${waterPeelingItems.length + hairFoundationItems.length + nailMachineItems.length}件のアイテム情報を ${outPath} に保存しました！`);
}

fetchWinterBatch60Items().catch(console.error);
