import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementWinterBatch34() {
  console.log('🔄 [第34弾 補完] 各テーマ10件（計30件）にするため追加商品を取得します...');
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch34_items.json', 'utf8'));

  // --- テーマ1 補完 (目標10件、現在8件) ---
  console.log('\n=== テーマ1 補完 ===');
  // 1-1: ボタニカルマルシェ ホットクレンジングジェル
  let res = await searchRakutenDirect('ホットクレンジング ジェル', 6, '-reviewCount');
  let valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !data.theme1_hot_cleansing.some(e => e.itemCode === it.itemCode));
  if (valid) {
    valid.brandKey = 'botanical_marche_hot_cleansing_gel';
    valid.displayBrand = 'ボタニカルマルシェ ホットクレンジングジェル 自然派温感毛穴ケア';
    data.theme1_hot_cleansing.push(valid);
    console.log(`✅ [テーマ1追加1] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
  }
  await sleep(1300);

  // 1-2: ファンケル or サンタマルシェ
  res = await searchRakutenDirect('サンタマルシェ ホットクレンジング', 6, '-reviewCount');
  valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
  if (!valid) {
    res = await searchRakutenDirect('クレンジングバーム 温感', 6, '-reviewCount');
    valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !data.theme1_hot_cleansing.some(e => e.itemCode === it.itemCode));
  }
  if (valid) {
    valid.brandKey = 'hot_cleansing_balm_select';
    valid.displayBrand = '温感とろけるホットクレンジング 毛穴スチーム角栓クリア';
    data.theme1_hot_cleansing.push(valid);
    console.log(`✅ [テーマ1追加2] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
  }
  await sleep(1300);

  // --- テーマ2 補完 (目標10件、現在8件) ---
  console.log('\n=== テーマ2 補完 ===');
  // 2-1: メディピール ペプチド9 アンプル
  res = await searchRakutenDirect('メディピール ペプチド', 6, '-reviewCount');
  valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
  if (valid) {
    valid.brandKey = 'medi_peel_peptide9_volume_ampoule';
    valid.displayBrand = 'MEDI-PEEL メディピール ボリューム エッセンス / ペプチド9 塗るボトックス弾力アンプル';
    data.theme2_peptide_ampoule.push(valid);
    console.log(`✅ [テーマ2追加1] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
  }
  await sleep(1300);

  // 2-2: メディキューブ コラーゲン セラム または d'Alba ホワイトトリュフ
  res = await searchRakutenDirect('メディキューブ コラーゲン セラム', 6, '-reviewCount');
  valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
  if (!valid) {
    res = await searchRakutenDirect('ダルバ ホワイトトリュフ セラム', 6, '-reviewCount');
    valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
  }
  if (valid) {
    valid.brandKey = 'medicube_triple_collagen_serum';
    valid.displayBrand = 'medicube メディキューブ トリプル コラーゲン セラム / ダルバ ホワイトトリュフ 濃密弾力アンプル';
    data.theme2_peptide_ampoule.push(valid);
    console.log(`✅ [テーマ2追加2] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
  }
  await sleep(1300);

  // --- テーマ3 補完 (目標10件、現在9件) ---
  console.log('\n=== テーマ3 補完 ===');
  // 3-1: センテリアン24 マデカクリーム
  res = await searchRakutenDirect('センテリアン24 マデカクリーム', 6, '-reviewCount');
  valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
  if (!valid) {
    res = await searchRakutenDirect('CICA バーム', 6, '-reviewCount');
    valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !data.theme3_b5_cica_balm.some(e => e.itemCode === it.itemCode));
  }
  if (valid) {
    valid.brandKey = 'centellian24_the_madeca_cream';
    valid.displayBrand = 'Centellian24 センテリアン24 ザ・マデカクリーム 東国製薬 高純度TECA 濃密リペアバーム';
    data.theme3_b5_cica_balm.push(valid);
    console.log(`✅ [テーマ3追加1] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
  }

  // 10件に揃えるための検証＆トリミング
  data.theme1_hot_cleansing = data.theme1_hot_cleansing.slice(0, 10);
  data.theme2_peptide_ampoule = data.theme2_peptide_ampoule.slice(0, 10);
  data.theme3_b5_cica_balm = data.theme3_b5_cica_balm.slice(0, 10);

  fs.writeFileSync('scratch/rakuten_winter_batch34_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補完完了！ scratch/rakuten_winter_batch34_items.json`);
  console.log(`- テーマ1 (温感クレンジング): ${data.theme1_hot_cleansing.length}件`);
  console.log(`- テーマ2 (ペプチド・コラーゲン): ${data.theme2_peptide_ampoule.length}件`);
  console.log(`- テーマ3 (パンテノール・シカ): ${data.theme3_b5_cica_balm.length}件`);
}

supplementWinterBatch34().catch(err => {
  console.error('エラー:', err);
  process.exit(1);
});
