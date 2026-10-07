import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch59Items() {
  console.log('🔄 [第59弾 リファイン] 3テーマ各10商品（計30商品）のユニーク化＆不足分ピンポイント再取得を開始します...');

  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch59_items.json', 'utf8'));

  // --- テーマ1: 温熱ハンドマッサージャー 10選 ---
  // 確定済みユニーク
  const finalTheme1 = [];
  
  // 1. ルルド ハンドケア
  const t1_1 = current.theme1_hand_massager.find(it => it.brandKey === 'atex_lourdes_hand_care_hpl1806');
  if (t1_1) finalTheme1.push(t1_1);

  // 2. NIPLUX HAND MOMI
  const t1_2 = current.theme1_hand_massager.find(it => it.brandKey === 'niplux_hand_momi_heating_airbag');
  if (t1_2) finalTheme1.push(t1_2);

  // 3. アルインコ ハンドイーズ
  const t1_3 = current.theme1_hand_massager.find(it => it.brandKey === 'alinco_hand_ease_air_mcr6019');
  if (t1_3) finalTheme1.push(t1_3);

  // 4. アテックス トール ハンドケア リュクス
  const t1_4 = current.theme1_hand_massager.find(it => it.brandKey === 'atex_tor_hand_care_luxe_hxl');
  if (t1_4) finalTheme1.push(t1_4);

  // 5. breo iPalm 2
  const t1_5 = current.theme1_hand_massager.find(it => it.brandKey === 'breo_ipalm_hand_acupressure_device');
  if (t1_5) finalTheme1.push(t1_5);

  // 残り5件をピンポイント取得
  const t1_queries = [
    { brand: 'doctorair_3d_hand_care_relax', name: 'ドクターエア DOCTORAIR 3Dハンドマッサージャー 手のひら 指先 温熱ヒーター搭載 エアマッサージ', query: 'ドクターエア ハンドマッサージ' },
    { brand: 'atex_lourdes_hand_care_ax_hxl1805', name: 'アテックス ルルド ハンドケア AX-HXL1805 手のひらマッサージャー 指圧 温熱 ヒーター機能 手荒れケア', query: 'ルルド ハンドケア AX-HXL1805' },
    { brand: 'koizumi_hand_massager_air_heat', name: 'コイズミ KOIZUMI ハンドマッサージャー エアー＆温熱ヒーター 手のひら 揉みほぐし 指先ケア', query: 'コイズミ ハンドマッサージャー' },
    { brand: 'festino_charging_hand_care_beauty', name: 'FESTINO フェスティノ チャージング ハンドケア 充電式 コードレス 美容ハンドマッサージャー', query: 'FESTINO チャージング ハンドケア' },
    { brand: 'air_cordless_hand_relax_device', name: 'コードレス 温熱 ハンドマッサージャー 手もみ エアバッグ 指圧 手の疲れ デスクワーク リフレッシュ', query: 'ハンドマッサージ機 コードレス' }
  ];

  for (const q of t1_queries) {
    if (finalTheme1.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
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
    const res = await searchRakutenDirect('ハンドマッサージャー エアー', 10, '-reviewCount');
    for (const it of res) {
      if (finalTheme1.length >= 10) break;
      if (!it.imageUrl || it.itemPrice <= 2500 || it.itemName.includes('中古')) continue;
      if (finalTheme1.some(e => e.itemCode === it.itemCode)) continue;
      it.brandKey = `hand_massager_extra_${finalTheme1.length + 1}`;
      it.displayBrand = it.itemName.slice(0, 35);
      finalTheme1.push(it);
      console.log(`✅ [T1補充] ${it.itemName.slice(0, 35)}`);
    }
  }

  // --- テーマ2: 温熱EMSネックマッサージャー 10選 ---
  const finalTheme2 = [];
  const t2_1 = current.theme2_neck_massager.find(it => it.brandKey === 'niplux_neck_relax_ems_heating');
  if (t2_1) finalTheme2.push(t2_1);

  const t2_2 = current.theme2_neck_massager.find(it => it.brandKey === 'mytrex_ems_heat_neck_device');
  if (t2_2) finalTheme2.push(t2_2);

  const t2_3 = current.theme2_neck_massager.find(it => it.brandKey === 'atex_lourdes_neck_massage_cordless');
  if (t2_3) finalTheme2.push(t2_3);

  const t2_4 = current.theme2_neck_massager.find(it => it.brandKey === 'doctorair_3d_neck_massager_mn04');
  if (t2_4) finalTheme2.push(t2_4);

  const t2_5 = current.theme2_neck_massager.find(it => it.brandKey === 'omron_neck_massager_hm150');
  if (t2_5) finalTheme2.push(t2_5);

  const t2_6 = current.theme2_neck_massager.find(it => it.brandKey === 'alinco_neck_momitaimu_mcr8318');
  if (t2_6) finalTheme2.push(t2_6);

  const t2_7 = current.theme2_neck_massager.find(it => it.brandKey === 'breo_ineck_air_neck_relaxer');
  if (t2_7) finalTheme2.push(t2_7);

  const t2_8 = current.theme2_neck_massager.find(it => it.brandKey === 'neck_stretcher_air_heating_pillow');
  if (t2_8) finalTheme2.push(t2_8);

  const t2_queries = [
    { brand: 'thrive_tsukami_momi_neck_md440', name: 'スライヴ THRIVE つかみもみマッサージャー MD-440 / MD-442 首 肩 温熱ヒーター 医療機器', query: 'スライヴ つかみもみマッサージャー' },
    { brand: 'panasonic_neck_refre_device', name: 'パナソニック ネックマッサージャー 高周波治療器 コリコラン / 首もみ 温熱', query: '首マッサージャー コードレス 温熱' }
  ];

  for (const q of t2_queries) {
    if (finalTheme2.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
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

  if (finalTheme2.length < 10) {
    const res = await searchRakutenDirect('EMS 首 肩 温熱', 10, '-reviewCount');
    for (const it of res) {
      if (finalTheme2.length >= 10) break;
      if (!it.imageUrl || it.itemPrice <= 2500 || it.itemName.includes('中古')) continue;
      if (finalTheme2.some(e => e.itemCode === it.itemCode)) continue;
      it.brandKey = `neck_massager_extra_${finalTheme2.length + 1}`;
      it.displayBrand = it.itemName.slice(0, 35);
      finalTheme2.push(it);
      console.log(`✅ [T2補充] ${it.itemName.slice(0, 35)}`);
    }
  }

  // --- テーマ3: まるでこたつソックス＆温活極暖着圧レギンス 10選 ---
  const finalTheme3 = [];
  const t3_1 = current.theme3_kotatsu_socks.find(it => it.brandKey === 'okamoto_kotatsu_socks_womens');
  if (t3_1) finalTheme3.push(t3_1);

  const t3_2 = current.theme3_kotatsu_socks.find(it => it.brandKey === 'iondoctor_leg_warmer_41cm_silk');
  if (t3_2) finalTheme3.push(t3_2);

  const t3_3 = current.theme3_kotatsu_socks.find(it => it.brandKey === 'slimwalk_warm_shaping_leggings');
  if (t3_3) finalTheme3.push(t3_3);

  const t3_4 = current.theme3_kotatsu_socks.find(it => it.brandKey === 'silk_family_warm_leg_warmer_japan');
  if (t3_4) finalTheme3.push(t3_4);

  const t3_5 = current.theme3_kotatsu_socks.find(it => it.brandKey === 'gunze_sabrina_polar_warm_tights');
  if (t3_5) finalTheme3.push(t3_5);

  const t3_6 = current.theme3_kotatsu_socks.find(it => it.brandKey === 'tabio_kutsushitaya_wool_leg_warmer');
  if (t3_6) finalTheme3.push(t3_6);

  const t3_queries = [
    { brand: 'okamoto_kotatsu_mens_socks', name: '靴下の岡本 靴下サプリ まるでこたつソックス メンズ 発熱冷え対策 男性温活 防寒靴下', query: 'まるでこたつソックス メンズ' },
    { brand: 'mediqtto_warm_compression_tights', name: 'メディキュット あったか 温感 着圧タイツ 極暖 防寒 美脚 骨盤サポート', query: 'メディキュット 極暖 タイツ' },
    { brand: 'hokaron_warm_socks_womens', name: 'ホカロン 靴下 レディース 吸湿発熱 裏起毛 ルームソックス パイルソックス 防寒 温活', query: 'ホカロン 靴下 レディース' },
    { brand: 'atsugi_astigu_warm_tights_140', name: 'アツギ ASTIGU アスティーグ 温 140デニール 発熱 光発熱 吸湿発熱 タイツ', query: 'アツギ 発熱 タイツ 140' }
  ];

  for (const q of t3_queries) {
    if (finalTheme3.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
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

  if (finalTheme3.length < 10) {
    const res = await searchRakutenDirect('まるでこたつ 靴下', 10, '-reviewCount');
    for (const it of res) {
      if (finalTheme3.length >= 10) break;
      if (!it.imageUrl || it.itemPrice <= 800 || it.itemName.includes('中古')) continue;
      if (finalTheme3.some(e => e.itemCode === it.itemCode)) continue;
      it.brandKey = `kotatsu_socks_extra_${finalTheme3.length + 1}`;
      it.displayBrand = it.itemName.slice(0, 35);
      finalTheme3.push(it);
      console.log(`✅ [T3補充] ${it.itemName.slice(0, 35)}`);
    }
  }

  const result = {
    theme1_hand_massager: finalTheme1.slice(0, 10),
    theme2_neck_massager: finalTheme2.slice(0, 10),
    theme3_kotatsu_socks: finalTheme3.slice(0, 10),
    refinedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch59_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 リファイン完了！ テーマ1: ${result.theme1_hand_massager.length}件, テーマ2: ${result.theme2_neck_massager.length}件, テーマ3: ${result.theme3_kotatsu_socks.length}件（計30件完全ユニーク）を保存しました！`);
}

refineBatch59Items().catch(console.error);
