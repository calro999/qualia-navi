import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function diversifyBatch55() {
  console.log('✨ [第55弾 ラインナップ精緻化] 重複・アタッチメントの排除と人気ブランドへの最適化を行います...');

  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch55_items.json', 'utf8'));

  // 1. テーマ1の4番: MYTREX PROVE 本体 または 電気ブラシ本体の取得
  console.log('\n--- テーマ1: 電気ブラシ本体の補正 ---');
  // アタッチメントのみを除外
  data.theme1_ems_brush = data.theme1_ems_brush.filter(it => !it.itemName.includes('フェイス用　ア') && !it.itemName.includes('専用アタッチメント'));
  
  const emsQueries = [
    '電気バリブラシ 美顔器',
    'EMS スカルプリフト プラス',
    'ステラボーテ ビューティ フェイス スティック',
    'ドクターエルミス リフトレ'
  ];
  for (const q of emsQueries) {
    if (data.theme1_ems_brush.length >= 10) break;
    const res = await searchRakutenDirect(q, 6, '-reviewCount');
    const valid = res.find(it => it.itemPrice > 10000 && !it.itemName.includes('アタッチメント') && !it.itemName.includes('中古') && !data.theme1_ems_brush.some(ex => ex.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = `ems_brush_premium_${data.theme1_ems_brush.length + 1}`;
      valid.displayBrand = valid.itemName.slice(0, 38);
      data.theme1_ems_brush.push(valid);
      console.log(`✅ [テーマ1追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 2. テーマ2: トラネキサム酸の重複（エビスビーホワイト複数等）を解消し、トランシーノ・資生堂・キールズ等の一流ブランドを厳選
  console.log('\n--- テーマ2: トラネキサム酸の重複解消＆ブランド補完 ---');
  // 重複解消
  const seenNames = new Set();
  data.theme2_tranexamic_acid = data.theme2_tranexamic_acid.filter(it => {
    const isEbis = it.itemName.includes('エビスビーホワイト');
    if (isEbis && seenNames.has('ebis')) return false;
    if (isEbis) seenNames.add('ebis');
    return true;
  });

  const txaBrandQueries = [
    'トランシーノ 薬用 美白',
    'トラネキサム酸 美容液 医薬部外品',
    'オバジ 美白 美容液',
    'IHADA 薬用 ナイトパック トラネキサム酸',
    '無印良品 薬用美白美容液',
    'ファンケル ブライトニング エッセンス'
  ];

  for (const q of txaBrandQueries) {
    if (data.theme2_tranexamic_acid.length >= 10) break;
    const res = await searchRakutenDirect(q, 6, '-reviewCount');
    const valid = res.find(it => it.itemPrice >= 1500 && it.itemPrice <= 18000 && !it.itemName.includes('ふるさと納税') && !it.itemName.includes('中古') && !data.theme2_tranexamic_acid.some(ex => ex.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = `txa_brand_${data.theme2_tranexamic_acid.length + 1}`;
      valid.displayBrand = valid.itemName.slice(0, 38);
      data.theme2_tranexamic_acid.push(valid);
      console.log(`✅ [テーマ2追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 3. テーマ3: 塗るボトックス・ペプチドのラインナップ確認
  console.log('\n--- テーマ3: 塗るボトックス・ペプチド確認 ---');
  // トゥヴェールエッセンスTWA/TWKの重複を整える
  const seenTw = new Set();
  data.theme3_botox_argireline = data.theme3_botox_argireline.filter(it => {
    const isTw = it.itemName.includes('エッセンスTW');
    if (isTw && seenTw.has('tw')) return false;
    if (isTw) seenTw.add('tw');
    return true;
  });

  const peptideQueries = [
    'ボトックス 美容液 ペプチド',
    'アルジレリン 美容液 原液',
    'シワ 改善 美容液 ペプチド',
    'マトリキシル ペプチド 美容液'
  ];

  for (const q of peptideQueries) {
    if (data.theme3_botox_argireline.length >= 10) break;
    const res = await searchRakutenDirect(q, 6, '-reviewCount');
    const valid = res.find(it => it.itemPrice >= 1400 && it.itemPrice <= 15000 && !it.itemName.includes('中古') && !data.theme3_botox_argireline.some(ex => ex.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = `botox_peptide_${data.theme3_botox_argireline.length + 1}`;
      valid.displayBrand = valid.itemName.slice(0, 38);
      data.theme3_botox_argireline.push(valid);
      console.log(`✅ [テーマ3追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 各10件に揃える
  data.theme1_ems_brush = data.theme1_ems_brush.slice(0, 10);
  data.theme2_tranexamic_acid = data.theme2_tranexamic_acid.slice(0, 10);
  data.theme3_botox_argireline = data.theme3_botox_argireline.slice(0, 10);

  console.log(`\n🎉 最終確定:`);
  console.log(`- テーマ1: ${data.theme1_ems_brush.length}件`);
  console.log(`- テーマ2: ${data.theme2_tranexamic_acid.length}件`);
  console.log(`- テーマ3: ${data.theme3_botox_argireline.length}件`);

  fs.writeFileSync('scratch/rakuten_winter_batch55_items.json', JSON.stringify(data, null, 2), 'utf8');
}

diversifyBatch55();
