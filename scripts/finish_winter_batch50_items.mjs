import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function finishBatch50() {
  const jsonPath = path.resolve('scratch/rakuten_winter_batch50_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  if (data.theme1_body_peel.length < 10) {
    const res = await searchRakutenDirect('クナイプ ボディスクラブ', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'kneipp_body_scrub';
      valid.displayBrand = 'クナイプ ボディスクラブ 200ml 天然シュガースクラブ ボタニカルオイル';
      data.theme1_body_peel.push(valid);
      console.log(`✅ [テーマ1追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  }

  // wicot を通常単品版で再取得
  const wicotIdx = data.theme3_hair_growth.findIndex(it => it.brandKey === 'wicot_scalp_serum_supp');
  if (wicotIdx !== -1) {
    const res = await searchRakutenDirect('wicot スカルプセラム', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && it.itemPrice < 15000 && !it.itemName.includes('中古') && !it.itemName.includes('ふるさと納税'));
    if (valid) {
      valid.brandKey = 'wicot_scalp_serum';
      valid.displayBrand = 'wicot 薬用スカルプセラム 100ml 医薬部外品 オーガニック認証 薬用育毛剤 女性用';
      data.theme3_hair_growth[wicotIdx] = valid;
      console.log(`✅ [wicot更新] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  }

  // マイナチュレ も通常単品版で再取得
  const mynatureIdx = data.theme3_hair_growth.findIndex(it => it.brandKey === 'mynature_scalp_lotion');
  if (mynatureIdx !== -1 && data.theme3_hair_growth[mynatureIdx].itemPrice > 10000) {
    const res = await searchRakutenDirect('マイナチュレ 120ml', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && it.itemPrice < 12000 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'mynature_scalp_lotion';
      valid.displayBrand = 'マイナチュレ 薬用育毛剤 120ml 医薬部外品 女性用 無添加 センブリエキス';
      data.theme3_hair_growth[mynatureIdx] = valid;
      console.log(`✅ [マイナチュレ更新] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
  }

  data.theme1_body_peel = data.theme1_body_peel.slice(0, 10);
  data.theme2_fem_care = data.theme2_fem_care.slice(0, 10);
  data.theme3_hair_growth = data.theme3_hair_growth.slice(0, 10);

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 [完了] テーマ1: ${data.theme1_body_peel.length}件, テーマ2: ${data.theme2_fem_care.length}件, テーマ3: ${data.theme3_hair_growth.length}件`);
}

finishBatch50().catch(console.error);
