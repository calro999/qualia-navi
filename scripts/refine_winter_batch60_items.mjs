import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch60Items() {
  console.log('🔄 [第60弾 リファイン] 3テーマ各10商品（計30商品）のユニーク化＆不足分ピンポイント再取得を開始します...');

  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch60_items.json', 'utf8'));

  // --- テーマ1: 超音波ウォーターピーリング美顔器 10選 ---
  const finalTheme1 = [];
  
  // 1. ANLAN ウォーターピーリング
  const t1_1 = current.theme1_water_peeling.find(it => it.brandKey === 'anlan_ultrasonic_water_peeling_ems');
  if (t1_1) finalTheme1.push(t1_1);

  // 2. コスビューティー アクリアルピーリングプロEX
  const t1_2 = current.theme1_water_peeling.find(it => it.brandKey === 'cosbeauty_aquapeeling_pro_device');
  if (t1_2) finalTheme1.push(t1_2);

  // 3. 美ルル アクアルファ
  const t1_3 = current.theme1_water_peeling.find(it => it.brandKey === 'miraie_water_peeling_peeling_pro');
  if (t1_3) finalTheme1.push(t1_3);

  // 4. FESTINO フェイシャル ピーリング
  const t1_4 = current.theme1_water_peeling.find(it => it.brandKey === 'festino_facial_cleansing_peeling');
  if (t1_4) finalTheme1.push(t1_4);

  // 5. LOABI スマート ウォーターピーリング
  const t1_5 = current.theme1_water_peeling.find(it => it.brandKey === 'tbr_smart_water_peeling_ems_led');
  if (t1_5) finalTheme1.push(t1_5);

  // 6. 楽天1位 9冠 超音波ピーリング
  const t1_6 = current.theme1_water_peeling.find(it => it.brandKey === 'lourdes_face_peeling_cleaner_ax');
  if (t1_6) finalTheme1.push(t1_6);

  // 不足分をピンポイント取得（本体・確実なクエリ）
  const t1_queries = [
    { brand: 'yaman_peeling_device_body', name: 'ヤーマン YA-MAN ウォーターピーリング ダブルピーリングプレミアム 超音波美顔器 毛穴 角質 角栓ケア 防水', query: 'ヤーマン ダブルピーリング' },
    { brand: 'salonia_water_peeling_cleaner', name: 'サロニア SALONIA アクアピーリングデバイス ウォーターピーリング 超音波振動 毛穴汚れ イオン導出', query: 'ウォーターピーリング サロニア' },
    { brand: 'areti_pore_water_peeling_device', name: 'アレティ Areti ウォーターピーリング 超音波振動 美顔器 スキンケア 毛穴 角栓除去 イオン導入', query: 'ウォーターピーリング Areti' },
    { brand: 'sarlisi_ultrasonic_skin_peeling', name: 'サーリシ SARLISI 超音波 ウォーターピーリング 美顔器 深層毛穴洗浄 黒ずみ 角質ケア LED光', query: 'ウォーターピーリング サーリシ' },
    { brand: 'koizumi_face_peeling_ultrasonic', name: 'コイズミ KOIZUMI 超音波 ピーリング 美顔器 KBE-2710 角質 毛穴 小鼻 皮脂 クレンジング', query: 'コイズミ ピーリング 美顔器' },
    { brand: 'panasonic_pore_cleanser_peeling', name: 'パナソニック 毛穴吸引 スポットクリア EH2513P 毛穴 黒ずみ 皮脂 角栓 吸引 美顔器', query: 'パナソニック 毛穴吸引' },
    { brand: 'peeling_ultrasonic_ems_led_light', name: '超音波 ウォーターピーリング 美顔器 EMS リフトケア 赤青LED イオンクレンジング IPX5防水', query: 'ウォーターピーリング EMS' }
  ];

  for (const q of t1_queries) {
    if (finalTheme1.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('替刃') || it.itemName.includes('ゲル')) return false;
        if (finalTheme1.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = q.brand;
        valid.displayBrand = q.name;
        finalTheme1.push(valid);
        console.log(`✅ [T1追加: ${q.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ T1取得失敗: ${q.query}`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // もし10件未満なら補充
  if (finalTheme1.length < 10) {
    const res = await searchRakutenDirect('ウォーターピーリング 美顔器', 15, '-reviewCount');
    for (const it of res) {
      if (finalTheme1.length >= 10) break;
      if (!it.imageUrl || it.itemPrice <= 2500 || it.itemName.includes('中古') || it.itemName.includes('ゲル')) continue;
      if (finalTheme1.some(e => e.itemCode === it.itemCode)) continue;
      it.brandKey = `water_peeling_extra_${finalTheme1.length + 1}`;
      it.displayBrand = it.itemName.slice(0, 35);
      finalTheme1.push(it);
      console.log(`✅ [T1補充] ${it.itemName.slice(0, 35)}`);
    }
  }

  // --- テーマ2: 生え際カバー＆白髪隠しヘアファンデーション 10選 ---
  const finalTheme2 = [];
  
  // 1. フジコ dekoシャドウ
  const t2_1 = current.theme2_hair_foundation.find(it => it.brandKey === 'fujiko_deko_shadow_hair_powder');
  if (t2_1) finalTheme2.push(t2_1);

  // 2. プリオール ヘア ファンデーション
  const t2_2 = current.theme2_hair_foundation.find(it => it.brandKey === 'shiseido_prior_hair_foundation');
  if (t2_2) finalTheme2.push(t2_2);

  // 3. 利尻と椿のPONヘアパウダー
  const t2_3 = current.theme2_hair_foundation.find(it => it.brandKey === 'rishiri_hair_foundation_powder');
  if (t2_3) finalTheme2.push(t2_3);

  // 4. SMH ヘアファンデーション
  const t2_4 = current.theme2_hair_foundation.find(it => it.brandKey === 'smh_super_million_hair_pocket');
  if (t2_4) finalTheme2.push(t2_4);

  // 5. エチュード ポンポンヘアシャドウ
  const t2_5 = current.theme2_hair_foundation.find(it => it.brandKey === 'aroma_shampoo_ponpon_hair_powder');
  if (t2_5) finalTheme2.push(t2_5);

  const t2_queries = [
    { brand: 'aderans_hairplus_viewpaf_powder', name: 'アデランス ヘアプラス ビューパフ ヘアファンデーション パウダー 増毛 白髪隠し 分け目 つむじ', query: 'アデランス ヘアパウダー' },
    { brand: 'cefine_hair_foundation_powder', name: 'セフィーヌ CEFINE ヘアメイク パウダー ビューティプロ 白髪隠し 生え際 分け目 薄毛カバー', query: 'セフィーヌ ヘアメイク' },
    { brand: 'amorous_kurokami_compact_foundation', name: 'アモロス 黒彩 ヘアファンデーション コンパクト 白髪隠し 生え際 分け目用 カバー パフ付き', query: '黒彩 ヘアファンデーション' },
    { brand: 'to_be_white_hair_foundation_compact', name: '白髪隠し ヘアファンデーション コンパクト パウダー 生え際 分け目 つむじ ウォータープルーフ', query: 'ヘアファンデーション 白髪隠し' },
    { brand: 'artnature_art_spray_hair_foundation', name: 'アートネイチャー アートミクロン プラビ パウダー ヘアファンデーション 白髪隠し ボリューム 生え際', query: 'アートネイチャー アートミクロン' },
    { brand: 'naturelab_diane_hair_shadow_deko', name: 'モアブルーム ヘアシャドウ 生え際 白髪隠し 小顔メイク パウダー ヘアファンデーション', query: 'ヘアシャドウ 生え際' },
    { brand: 'bigen_hair_mascara_foundation', name: 'ビゲン ヘアマスカラ / ヘアファンデーション 生え際 分け目 ひと塗り 白髪カバー', query: 'ビゲン ヘアファンデーション' },
    { brand: 'kanebo_kate_hair_line_cover', name: 'KATE ケイト フェイス＆ヘアシャドウ 生え際カバー 小顔 骨格補正 3Dパウダー', query: 'ケイト フェイス＆ヘアシャドウ' }
  ];

  for (const q of t2_queries) {
    if (finalTheme2.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 900) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        if (finalTheme2.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = q.brand;
        valid.displayBrand = q.name;
        finalTheme2.push(valid);
        console.log(`✅ [T2追加: ${q.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ T2取得失敗: ${q.query}`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // もし10件未満なら補充
  if (finalTheme2.length < 10) {
    const res = await searchRakutenDirect('白髪隠し ファンデーション', 15, '-reviewCount');
    for (const it of res) {
      if (finalTheme2.length >= 10) break;
      if (!it.imageUrl || it.itemPrice <= 900 || it.itemName.includes('中古')) continue;
      if (finalTheme2.some(e => e.itemCode === it.itemCode)) continue;
      it.brandKey = `hair_foundation_extra_${finalTheme2.length + 1}`;
      it.displayBrand = it.itemName.slice(0, 35);
      finalTheme2.push(it);
      console.log(`✅ [T2補充] ${it.itemName.slice(0, 35)}`);
    }
  }

  // --- テーマ3: 電動ネイルマシン＆本格セルフネイルケア 10選 ---
  const finalTheme3 = [];

  // 1. プチトルM
  const t3_1 = current.theme3_nail_machine.find(it => it.brandKey === 'petitor_m_nail_drill_machine_usb');
  if (t3_1) finalTheme3.push(t3_1);

  // 2. プチトルC
  const t3_2 = current.theme3_nail_machine.find(it => it.brandKey === 'petitor_c_nail_drill_compact_pink');
  if (t3_2) finalTheme3.push(t3_2);

  // 3. パナソニック ES-WC20
  const t3_3 = current.theme3_nail_machine.find(it => it.brandKey === 'panasonic_nail_care_device_es_wc20');
  if (t3_3) finalTheme3.push(t3_3);

  // 4. 新登場 ネイルマシーン 甘皮 電動ネイルマシン ビット12本
  const t3_4 = current.theme3_nail_machine.find(it => it.brandKey === 'kashimura_rechargeable_nail_polisher');
  if (t3_4) finalTheme3.push(t3_4);

  // 5. プロ仕様 ネイルマシン 累計5万本
  const t3_5 = current.theme3_nail_machine.find(it => it.brandKey === 'belle_professional_nail_drill_pro');
  if (t3_5) finalTheme3.push(t3_5);

  // 6. コードレス 12in1 ネイルマシン 2000件レビュー
  const t3_6 = current.theme3_nail_machine.find(it => it.brandKey === 'cordless_nail_drill_machine_bits');
  if (t3_6) finalTheme3.push(t3_6);

  // 7. フェスティノ 電動爪やすり
  const t3_7 = current.theme3_nail_machine.find(it => it.brandKey === 'glass_nail_electric_buffer_shine');
  if (t3_7) finalTheme3.push(t3_7);

  const t3_queries = [
    { brand: 'rooro_mini_rooro_pochi_body', name: 'Rooro ローロ ミニローロ ポチ 電動ネイルマシン 本体 ジェルオフ 甘皮 角質 正逆回転 静音', query: 'ミニローロポチ 本体' },
    { brand: 'petitor_s_pro_high_speed_drill', name: 'プチトルS Petitor S 上級プロ用 高回転 ネイルマシン サロン仕様 冷却ファン搭載 ジェルオフ', query: 'プチトルS ネイルマシン' },
    { brand: 'anlan_electric_nail_care_pen', name: 'ANLAN 電動ネイルケア 爪切り 爪やすり 爪磨き 甘皮処理 角質 LEDライト 高速回転', query: 'ANLAN ネイルケア' },
    { brand: 'ur_sugar_cordless_nail_drill_kit', name: '充電式 コードレス ネイルマシン 電動爪やすり ビットセット 初心者向け ネイルケア 甘皮', query: '充電式 ネイルマシン コードレス' },
    { brand: 'be_salon_nail_drill_machine_usb', name: 'サロン品質 電動ネイルマシン スピード調整可能 正逆回転 ジェルネイル オフ スカルプ アクリルケア', query: 'ネイルマシン USB' }
  ];

  for (const q of t3_queries) {
    if (finalTheme3.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ビットのみ') || it.itemName.includes('サンディングバンドのみ')) return false;
        if (finalTheme3.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = q.brand;
        valid.displayBrand = q.name;
        finalTheme3.push(valid);
        console.log(`✅ [T3追加: ${q.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ T3取得失敗: ${q.query}`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // もし10件未満なら補充
  if (finalTheme3.length < 10) {
    const res = await searchRakutenDirect('電動ネイルマシン ジェルオフ', 15, '-reviewCount');
    for (const it of res) {
      if (finalTheme3.length >= 10) break;
      if (!it.imageUrl || it.itemPrice <= 1800 || it.itemName.includes('中古')) continue;
      if (finalTheme3.some(e => e.itemCode === it.itemCode)) continue;
      it.brandKey = `nail_machine_extra_${finalTheme3.length + 1}`;
      it.displayBrand = it.itemName.slice(0, 35);
      finalTheme3.push(it);
      console.log(`✅ [T3補充] ${it.itemName.slice(0, 35)}`);
    }
  }

  console.log(`\n✨ リファイン完了集計:`);
  console.log(`- テーマ1 (ウォーターピーリング): ${finalTheme1.length}件`);
  console.log(`- テーマ2 (ヘアファンデーション): ${finalTheme2.length}件`);
  console.log(`- テーマ3 (電動ネイルマシン): ${finalTheme3.length}件`);

  const result = {
    theme1_water_peeling: finalTheme1.slice(0, 10),
    theme2_hair_foundation: finalTheme2.slice(0, 10),
    theme3_nail_machine: finalTheme3.slice(0, 10),
    refinedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch60_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 確定した全30件の厳選アイテム情報を ${outPath} に上書き保存しました！`);
}

refineBatch60Items().catch(console.error);
