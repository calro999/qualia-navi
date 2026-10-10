import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch76() {
  console.log('🔄 不足アイテムを楽天OpenAPIから追加取得して各テーマ10商品（計30商品）を揃えます...');
  const jsonPath = 'scratch/rakuten_winter_batch76_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. テーマ1: ウォータートリートメント (現在8件 -> あと2件)
  if (data.theme1_water_instant_hair_treatment.length < 10) {
    try {
      const res = await searchRakutenDirect('エイトザタラソ ウォータートリートメント', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
      if (valid && !data.theme1_water_instant_hair_treatment.some(e => e.itemCode === valid.itemCode)) {
        valid.brandKey = 'eight_the_thalasso_water_treatment';
        valid.displayBrand = 'エイトザタラソ 8 THE THALASSO ウォータートリートメント 導入保水 濃密ヘアケア';
        data.theme1_water_instant_hair_treatment.push(valid);
        console.log(`✅ [eight_the_thalasso_water_treatment] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('エイトザタラソ取得エラー:', e.message);
    }
    await sleep(1300);
  }

  if (data.theme1_water_instant_hair_treatment.length < 10) {
    try {
      const res = await searchRakutenDirect('フィーノ ヘアオイル', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古'));
      if (valid && !data.theme1_water_instant_hair_treatment.some(e => e.itemCode === valid.itemCode)) {
        valid.brandKey = 'fino_premium_touch_hair_oil';
        valid.displayBrand = 'ファイントゥデイ フィーノ fino プレミアムタッチ 濃厚美容液ヘアオイル 浸透補修 ダメージリペア';
        data.theme1_water_instant_hair_treatment.push(valid);
        console.log(`✅ [fino_premium_touch_hair_oil] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('フィーノオイル取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 2. テーマ2: 炭酸パック (現在7件 -> あと3件)
  if (data.theme2_carbonated_co2_gel_mask_pack.length < 10) {
    try {
      const res = await searchRakutenDirect('ソーダスパフォーム 炭酸', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古'));
      if (valid && !data.theme2_carbonated_co2_gel_mask_pack.some(e => e.itemCode === valid.itemCode)) {
        valid.brandKey = 'soda_spa_foam_premium_10000';
        valid.displayBrand = 'ソーダスパフォーム プレミアム 10000 高濃度 炭酸泡パック 濃密炭酸フォーム 毛穴 頭皮 フェイス';
        data.theme2_carbonated_co2_gel_mask_pack.push(valid);
        console.log(`✅ [soda_spa_foam_premium_10000] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('ソーダスパフォーム取得エラー:', e.message);
    }
    await sleep(1300);
  }

  if (data.theme2_carbonated_co2_gel_mask_pack.length < 10) {
    try {
      const res = await searchRakutenDirect('炭酸パック 毛穴', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !data.theme2_carbonated_co2_gel_mask_pack.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = 'co2_bubble_face_pack_salon';
        valid.displayBrand = 'サロン仕様 炭酸ガス パック フェイシャル 生炭酸 高保湿 美容液マスク';
        data.theme2_carbonated_co2_gel_mask_pack.push(valid);
        console.log(`✅ [co2_bubble_face_pack_salon] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('炭酸パック追加取得エラー:', e.message);
    }
    await sleep(1300);
  }

  if (data.theme2_carbonated_co2_gel_mask_pack.length < 10) {
    try {
      const res = await searchRakutenDirect('メディオン 炭酸', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !data.theme2_carbonated_co2_gel_mask_pack.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = 'medion_carbonated_pack_mask';
        valid.displayBrand = 'ドクターメディオン スパオキシマスク 炭酸シートマスク 集中ケア';
        data.theme2_carbonated_co2_gel_mask_pack.push(valid);
        console.log(`✅ [medion_carbonated_pack_mask] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('メディオンマスク取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 3. テーマ3: ふき取り化粧水 (現在8件 -> あと2件: ベネフィーク & クリニークをキーワード修正して取得)
  if (data.theme3_hydrating_wiping_peel_lotion.length < 10) {
    try {
      const res = await searchRakutenDirect('ベネフィーク リセットクリア', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古'));
      if (valid && !data.theme3_hydrating_wiping_peel_lotion.some(e => e.itemCode === valid.itemCode)) {
        valid.brandKey = 'benefique_reset_clear_lotion';
        valid.displayBrand = '資生堂 ベネフィーク リセットクリア N 200ml ふき取り化粧液 とろみ クリア美肌';
        data.theme3_hydrating_wiping_peel_lotion.push(valid);
        console.log(`✅ [benefique_reset_clear_lotion] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('ベネフィーク取得エラー:', e.message);
    }
    await sleep(1300);
  }

  if (data.theme3_hydrating_wiping_peel_lotion.length < 10) {
    try {
      const res = await searchRakutenDirect('クリニーク クラリファイング ローション', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古'));
      if (valid && !data.theme3_hydrating_wiping_peel_lotion.some(e => e.itemCode === valid.itemCode)) {
        valid.brandKey = 'clinique_clarifying_lotion_2';
        valid.displayBrand = 'クリニーク CLINIQUE クラリファイング ローション 2 200ml / 400ml 拭き取り化粧水 角質ケア デパコス名品';
        data.theme3_hydrating_wiping_peel_lotion.push(valid);
        console.log(`✅ [clinique_clarifying_lotion_2] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('クリニーク取得エラー:', e.message);
    }
    await sleep(1300);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 [完了] テーマ1: ${data.theme1_water_instant_hair_treatment.length}件, テーマ2: ${data.theme2_carbonated_co2_gel_mask_pack.length}件, テーマ3: ${data.theme3_hydrating_wiping_peel_lotion.length}件`);
}

fillMissingBatch76();
