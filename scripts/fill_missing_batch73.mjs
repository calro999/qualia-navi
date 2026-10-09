import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch73() {
  const jsonPath = path.resolve('scratch/rakuten_winter_batch73_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. 保湿クリームの不足1件（クレ・ド・ポー ボーテ）
  if (data.theme1_rich_moisturizing_face_cream.length < 10) {
    console.log('補完中: クレドポーボーテ クレームアンタンシヴ...');
    try {
      const res = await searchRakutenDirect('クレドポーボーテ クレームアンタンシヴ', 5, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'cle_de_peau_creme_intensive_n';
        valid.displayBrand = 'クレ・ド・ポー ボーテ クレームアンタンシヴ n 50g 夜用 エマルジョン 乳液 クリーム ハリ 保湿 デパコス 最高峰';
        data.theme1_rich_moisturizing_face_cream.push(valid);
        console.log(`✅ 補完成功: ${valid.itemName} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  // 2. アイシャドウ/ラメの不足3件
  const missingGlitter = [
    { brand: 'addiction_the_eyeshadow_sparkle', name: 'アディクション ADDICTION ザ アイシャドウ スパークル 1g 単色 アイシャドウ 高輝度ラメ 偏光 キラキラ', query: 'アディクション アイシャドウ スパークル' },
    { brand: 'cipicipi_glitter_illumination_liner_r', name: 'シピシピ CipiCipi グリッター イルミネーションライナー 涙袋ライナー 高密着パール 微細ラメ', query: 'シピシピ グリッター' },
    { brand: 'elegance_rayon_jule_eyes', name: 'エレガンス Elegance レヨン ジュレアイズ N ジュレ アイカラー ぷるぷる 濡れツヤ デパコス アイシャドウ', query: 'エレガンス レヨン ジュレアイズ' }
  ];

  for (const cfg of missingGlitter) {
    if (data.theme3_holiday_sparkle_glitter_eyeshadow.length >= 10) break;
    await sleep(1300);
    console.log(`補完中: ${cfg.query}...`);
    try {
      const res = await searchRakutenDirect(cfg.query, 5, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !data.theme3_holiday_sparkle_glitter_eyeshadow.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_holiday_sparkle_glitter_eyeshadow.push(valid);
        console.log(`✅ 補完成功: ${valid.itemName} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  console.log(`最終アイテム件数: 保湿クリーム=${data.theme1_rich_moisturizing_face_cream.length}, クレンジング=${data.theme2_rich_milk_cream_cleansing.length}, アイシャドウ/ラメ=${data.theme3_holiday_sparkle_glitter_eyeshadow.length}`);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
}

fillMissingBatch73().catch(console.error);
