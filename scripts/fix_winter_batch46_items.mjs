import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function fixBatch46Items() {
  const filePath = 'scratch/rakuten_winter_batch46_items.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`現在の件数: テーマ1=${data.theme1_azelaic.length}, テーマ2=${data.theme2_fermented.length}, テーマ3=${data.theme3_colortreatment.length}`);

  // テーマ1に KISO バランシングクリームAZ2 (アゼライン酸20%クリーム) を追加
  if (data.theme1_azelaic.length < 10) {
    const res = await searchRakutenDirect('KISO バランシングクリームAZ2 20g', 3);
    const item = res.find(it => it.itemName.includes('アゼライン酸') && it.itemPrice > 0) || res[0];
    if (item) {
      item.brandKey = 'kiso_care_azelaic_cream_20';
      item.displayBrand = 'KISO CARE キソ バランシングクリーム AZ2 20g アゼライン酸20% 高濃度フェイスクリーム スクワラン CICA配合';
      data.theme1_azelaic.push(item);
      console.log(`✅ [テーマ1補充] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
    }
  }

  // テーマ2に ランコム ジェニフィック アルティメ セラム (美肌菌・発酵バイオ美容液) を追加
  if (data.theme2_fermented.length < 10) {
    const res = await searchRakutenDirect('ランコム ジェニフィック 30ml', 3);
    const item = res.find(it => it.itemName.includes('ジェニフィック') && it.itemPrice > 0) || res[0];
    if (item) {
      item.brandKey = 'lancome_genifique_ultimate_serum';
      item.displayBrand = 'LANCÔME ランコム ジェニフィック アルティメ セラム 30ml 美肌菌・発酵バイオエキス 導入美容液 ハリツヤうるおい';
      data.theme2_fermented.push(item);
      console.log(`✅ [テーマ2補充] ${item.itemName.slice(0, 35)} (${item.priceFormatted})`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`🎉 修正完了！ テーマ1=${data.theme1_azelaic.length}件, テーマ2=${data.theme2_fermented.length}件, テーマ3=${data.theme3_colortreatment.length}件`);
}

fixBatch46Items().catch(console.error);
