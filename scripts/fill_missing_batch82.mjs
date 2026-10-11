import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissing() {
  const jsonPath = path.resolve('scratch/rakuten_winter_batch82_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. テーマ1の10件目を補完（rom&nd リキッドグリッター または アディクション）
  if (data.theme1_radiant_stick_eyeshadow.length < 10) {
    console.log('テーマ1の不足分を取得中...');
    const res = await searchRakutenDirect('ロムアンド リキッド グリッター シャドウ', 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = 'romand_liquid_glitter_shadow';
      valid.displayBrand = 'ロムアンド rom&nd リキッド グリッター シャドウ 涙袋 ホリデー うるうるラメ';
      data.theme1_radiant_stick_eyeshadow.push(valid);
      console.log(`✅ テーマ1追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1500);
  }

  // 2. テーマ2の10件目を補完（イソップ ボディバーム または クナイプ）
  if (data.theme2_rich_moisturizing_body_butter.length < 10) {
    console.log('テーマ2の不足分を取得中...');
    const res = await searchRakutenDirect('イソップ レスレクション ハンドバーム または イソップ ボディバーム', 6, '-reviewCount');
    let valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
    if (!valid) {
      const res2 = await searchRakutenDirect('イソップ インテンシブ ハイドレーティング ボディバーム', 6, '-reviewCount');
      valid = res2.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
    }
    if (valid) {
      valid.brandKey = 'aesop_hydrating_body_balm';
      valid.displayBrand = 'イソップ Aesop ハイドレーティング ボディバーム 高保湿 植物エキス アロマ';
      data.theme2_rich_moisturizing_body_butter.push(valid);
      console.log(`✅ テーマ2追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1500);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`テーマ1件数: ${data.theme1_radiant_stick_eyeshadow.length}`);
  console.log(`テーマ2件数: ${data.theme2_rich_moisturizing_body_butter.length}`);
  console.log(`テーマ3件数: ${data.theme3_fluffy_eyebrow_powder_pencil.length}`);
}

fillMissing().catch(console.error);
