import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishBatch55Items() {
  console.log('🎯 [第55弾 アイテム精査＆各10アイテム確定] 楽天APIから厳選データを補完・確定します...');

  const batch55Data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch55_items.json', 'utf8'));

  // テーマ1: アタッチメントのみ等の除外と、本体アイテムの選定
  batch55Data.theme1_ems_brush = batch55Data.theme1_ems_brush.filter(it => {
    const n = it.itemName;
    if (n.includes('専用アタッチメント') || n.includes('アタッチメントのみ') || n.includes('交換用')) return false;
    if (it.itemPrice < 8000) return false;
    return true;
  });

  console.log(`テーマ1 (EMSブラシ) 現状キープ: ${batch55Data.theme1_ems_brush.length}件`);
  const emsKeywords = [
    '電気ブラシ EMS 美顔器',
    'EMS スカルプリフト ブラシ',
    'スカルプ ブラシ EMS 頭皮',
    'デンキバリブラシ',
    '電気バリブラシ 美顔器',
    'EMS リフトケア ブラシ'
  ];

  for (const kw of emsKeywords) {
    if (batch55Data.theme1_ems_brush.length >= 10) break;
    const res = await searchRakutenDirect(kw, 8, '-reviewCount');
    for (const item of res) {
      if (batch55Data.theme1_ems_brush.length >= 10) break;
      const n = item.itemName;
      if (item.itemPrice < 8000 || n.includes('中古') || n.includes('アタッチメント') || n.includes('ローションのみ')) continue;
      if (!batch55Data.theme1_ems_brush.some(ex => ex.itemCode === item.itemCode)) {
        item.brandKey = `ems_brush_${batch55Data.theme1_ems_brush.length + 1}`;
        item.displayBrand = item.itemName.slice(0, 38);
        batch55Data.theme1_ems_brush.push(item);
        console.log(`✅ [EMSブラシ追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
      }
    }
    await sleep(1300);
  }

  // テーマ2: トラネキサム酸アイテムの補完
  console.log(`\nテーマ2 (トラネキサム酸) 現状キープ: ${batch55Data.theme2_tranexamic_acid.length}件`);
  const uniqueTxa = [];
  const seenTxaCodes = new Set();
  for (const it of batch55Data.theme2_tranexamic_acid) {
    if (!seenTxaCodes.has(it.itemCode) && it.itemPrice >= 1200) {
      // ふるさと納税等の超高額除外
      if (it.itemName.includes('ふるさと納税') || it.itemPrice > 25000) continue;
      seenTxaCodes.add(it.itemCode);
      uniqueTxa.push(it);
    }
  }
  batch55Data.theme2_tranexamic_acid = uniqueTxa;

  const txaKeywords = [
    'トラネキサム酸 美容液 薬用',
    'トラネキサム酸 美白 美容液',
    'トランシーノ 美白 美容液',
    'トラネキサム酸 クリーム 薬用',
    '薬用 美白 美容液 トラネキサム酸',
    'トラネキサム酸 美白エッセンス'
  ];

  for (const kw of txaKeywords) {
    if (batch55Data.theme2_tranexamic_acid.length >= 10) break;
    const res = await searchRakutenDirect(kw, 8, '-reviewCount');
    for (const item of res) {
      if (batch55Data.theme2_tranexamic_acid.length >= 10) break;
      const n = item.itemName;
      if (item.itemPrice < 1200 || item.itemPrice > 20000 || n.includes('中古') || n.includes('ふるさと納税') || n.includes('サプリ') || n.includes('錠剤') || n.includes('カプセル')) continue;
      if (!batch55Data.theme2_tranexamic_acid.some(ex => ex.itemCode === item.itemCode)) {
        item.brandKey = `tranexamic_acid_${batch55Data.theme2_tranexamic_acid.length + 1}`;
        item.displayBrand = item.itemName.slice(0, 38);
        batch55Data.theme2_tranexamic_acid.push(item);
        console.log(`✅ [トラネキサム酸追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
      }
    }
    await sleep(1300);
  }

  // テーマ3: 塗るボトックス・ペプチド美容液の補完
  console.log(`\nテーマ3 (塗るボトックス・アルジレリン) 現状キープ: ${batch55Data.theme3_botox_argireline.length}件`);
  const uniqueBotox = [];
  const seenBotoxCodes = new Set();
  for (const it of batch55Data.theme3_botox_argireline) {
    if (!seenBotoxCodes.has(it.itemCode) && it.itemPrice >= 1200) {
      seenBotoxCodes.add(it.itemCode);
      uniqueBotox.push(it);
    }
  }
  batch55Data.theme3_botox_argireline = uniqueBotox;

  const botoxKeywords = [
    'アルジレリン 美容液',
    '塗るボトックス 美容液',
    'シンエイク 美容液',
    'ペプチド 美容液 原液',
    'ペプチド アンプル エイジングケア',
    'ボトックス アンプル'
  ];

  for (const kw of botoxKeywords) {
    if (batch55Data.theme3_botox_argireline.length >= 10) break;
    const res = await searchRakutenDirect(kw, 8, '-reviewCount');
    for (const item of res) {
      if (batch55Data.theme3_botox_argireline.length >= 10) break;
      const n = item.itemName;
      if (item.itemPrice < 1200 || item.itemPrice > 20000 || n.includes('中古') || n.includes('サプリ') || n.includes('錠剤') || n.includes('カプセル')) continue;
      if (!batch55Data.theme3_botox_argireline.some(ex => ex.itemCode === item.itemCode)) {
        item.brandKey = `botox_peptide_${batch55Data.theme3_botox_argireline.length + 1}`;
        item.displayBrand = item.itemName.slice(0, 38);
        batch55Data.theme3_botox_argireline.push(item);
        console.log(`✅ [塗るボトックス追加] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
      }
    }
    await sleep(1300);
  }

  // 各テーマ先頭10件にトリミング
  batch55Data.theme1_ems_brush = batch55Data.theme1_ems_brush.slice(0, 10);
  batch55Data.theme2_tranexamic_acid = batch55Data.theme2_tranexamic_acid.slice(0, 10);
  batch55Data.theme3_botox_argireline = batch55Data.theme3_botox_argireline.slice(0, 10);

  console.log(`\n🎉 確定結果:`);
  console.log(`- テーマ1 (EMSブラシ): ${batch55Data.theme1_ems_brush.length}件`);
  console.log(`- テーマ2 (トラネキサム酸): ${batch55Data.theme2_tranexamic_acid.length}件`);
  console.log(`- テーマ3 (塗るボトックス): ${batch55Data.theme3_botox_argireline.length}件`);

  fs.writeFileSync('scratch/rakuten_winter_batch55_items.json', JSON.stringify(batch55Data, null, 2), 'utf8');
}

finishBatch55Items();
