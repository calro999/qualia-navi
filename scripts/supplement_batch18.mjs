import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch18() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch18_items.json', 'utf8'));

  console.log('🔄 オイル2枠とマスカラ1枠の再取得・補充を行います...');

  // 1. オイル補充1: バイオイル Bio-Oil 125ml
  try {
    const res1 = await searchRakutenDirect('バイオイル 125ml 美容オイル 保湿', 5, '-reviewCount');
    const valid1 = res1.find(it => it.imageUrl && it.itemPrice > 0);
    if (valid1) {
      valid1.brandKey = 'bio_oil';
      valid1.displayBrand = 'バイオイル（Bio-Oil） 保湿美容オイル';
      data.theme2_oil.push(valid1);
      console.log(`✅ [バイオイル] ${valid1.itemName.slice(0, 35)} (${valid1.priceFormatted})`);
    }
  } catch (e) {
    console.error(e.message);
  }
  await sleep(1300);

  // 2. オイル補充2: カネボウ スキンオイル / FEMMUE
  try {
    const res2 = await searchRakutenDirect('FEMMUE ファミュ アイディアルオイル', 5, '-reviewCount');
    const valid2 = res2.find(it => it.imageUrl && it.itemPrice > 0);
    if (valid2) {
      valid2.brandKey = 'femmue';
      valid2.displayBrand = 'ファミュ（FEMMUE） アイディアルオイル';
      data.theme2_oil.push(valid2);
      console.log(`✅ [FEMMUE] ${valid2.itemName.slice(0, 35)} (${valid2.priceFormatted})`);
    } else {
      // 代替: カネボウ または キュレル オイル
      const altRes = await searchRakutenDirect('キュレル 潤浸保湿 フェイスケアオイル 美容オイル', 5, '-reviewCount');
      const altValid = altRes.find(it => it.imageUrl && it.itemPrice > 0);
      if (altValid) {
        altValid.brandKey = 'curel';
        altValid.displayBrand = 'キュレル 潤浸保湿 フェイスケアオイル';
        data.theme2_oil.push(altValid);
        console.log(`✅ [キュレル] ${altValid.itemName.slice(0, 35)} (${altValid.priceFormatted})`);
      }
    }
  } catch (e) {
    console.error(e.message);
  }
  await sleep(1300);

  // 3. マスカラ調整: クリニーク ラッシュパワー マスカラ ロング ウェアリング フォーミュラ（お湯落ちの殿堂）
  try {
    const res3 = await searchRakutenDirect('クリニーク ラッシュ パワー マスカラ ロング ウェアリング フォーミュラ', 5, '-reviewCount');
    const valid3 = res3.find(it => it.imageUrl && it.itemPrice > 0);
    if (valid3) {
      valid3.brandKey = 'clinique';
      valid3.displayBrand = 'クリニーク ラッシュ パワー マスカラ';
      // ロムアンド（眉マスカラになっていたもの）をクリニークに差し替え
      const romIdx = data.theme3_mascara.findIndex(m => m.brandKey === 'romand');
      if (romIdx !== -1) {
        data.theme3_mascara[romIdx] = valid3;
      } else {
        data.theme3_mascara.push(valid3);
      }
      console.log(`✅ [クリニーク] ${valid3.itemName.slice(0, 35)} (${valid3.priceFormatted})`);
    }
  } catch (e) {
    console.error(e.message);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch18_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`🎉 最終確認:`);
  console.log(`- ポアプライマー: ${data.theme1_primer.length} 件`);
  console.log(`- ブースターオイル: ${data.theme2_oil.length} 件`);
  console.log(`- お湯落ちマスカラ: ${data.theme3_mascara.length} 件`);
}

supplementBatch18().catch(err => console.error(err));
