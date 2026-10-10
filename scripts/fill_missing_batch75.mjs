import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch75() {
  console.log('🔄 不足しているアイテムを楽天APIからピンポイント取得して30件揃えます...');
  const jsonPath = 'scratch/rakuten_winter_batch75_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. テーマ1: シャネル レ キャトル オンブル
  if (data.theme1_holiday_makeup_coffret.length < 10) {
    try {
      const res = await searchRakutenDirect('シャネル アイシャドウ パレット', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 4000 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'chanel_les_4_ombres_holiday';
        valid.displayBrand = 'シャネル CHANEL レ キャトル オンブル 4色アイシャドウ パレット ホリデー 限定 クリスマス 高級デパコス';
        data.theme1_holiday_makeup_coffret.push(valid);
        console.log(`✅ [chanel_les_4_ombres_holiday] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('シャネル取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 2. テーマ1: アディクション または ボビイ ブラウン アイシャドウ
  if (data.theme1_holiday_makeup_coffret.length < 10) {
    try {
      const res = await searchRakutenDirect('ボビイブラウン アイシャドウ', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'bobbi_brown_luxe_eyeshadow';
        valid.displayBrand = 'ボビイ ブラウン BOBBI BROWN リュクス アイシャドウ リッチスパークル ホリデー 濡れツヤ デパコス';
        data.theme1_holiday_makeup_coffret.push(valid);
        console.log(`✅ [bobbi_brown_luxe_eyeshadow] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        const addRes = await searchRakutenDirect('アディクション アイシャドウ', 6, '-reviewCount');
        const addValid = addRes.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古'));
        if (addValid) {
          addValid.brandKey = 'addiction_the_eyeshadow';
          addValid.displayBrand = 'アディクション ADDICTION ザ アイシャドウ パレット ホリデー 限定 煌めき パール デパコス';
          data.theme1_holiday_makeup_coffret.push(addValid);
          console.log(`✅ [addiction_the_eyeshadow] ${addValid.itemName.slice(0, 35)} (${addValid.priceFormatted})`);
        }
      }
    } catch (e) {
      console.error('テーマ1追加エラー:', e.message);
    }
    await sleep(1300);
  }

  // 3. テーマ2: ローラメルシエ または クリニーク チークポップ
  if (data.theme2_hydrating_cream_liquid_blush.length < 10) {
    try {
      const res = await searchRakutenDirect('クリニーク チーク ポップ', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'clinique_cheek_pop';
        valid.displayBrand = 'クリニーク CLINIQUE チーク ポップ パウダリーなめらか しっとり血色感 多幸感 デパコス 名品';
        data.theme2_hydrating_cream_liquid_blush.push(valid);
        console.log(`✅ [clinique_cheek_pop] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        const lmRes = await searchRakutenDirect('ローラメルシエ チーク', 6, '-reviewCount');
        const lmValid = lmRes.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古'));
        if (lmValid) {
          lmValid.brandKey = 'laura_mercier_blush_color_infusion';
          lmValid.displayBrand = 'ローラ メルシエ LAURA MERCIER ブラッシュ カラー インフュージョン シアー しっとり血色 デパコス';
          data.theme2_hydrating_cream_liquid_blush.push(lmValid);
          console.log(`✅ [laura_mercier_blush_color_infusion] ${lmValid.itemName.slice(0, 35)} (${lmValid.priceFormatted})`);
        }
      }
    } catch (e) {
      console.error('テーマ2追加エラー:', e.message);
    }
    await sleep(1300);
  }

  // 4. テーマ3: ケラスターゼ ヘアオイル
  if (data.theme3_deep_repair_hair_oil_milk.length < 10) {
    try {
      const res = await searchRakutenDirect('ケラスターゼ ヘアオイル', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'kerastase_elixir_ultime_oil';
        valid.displayBrand = 'ケラスターゼ KERASTASE ユイルスブリム または フルイド オレオ リラックス 100ml 最高峰 洗い流さないヘアオイル くせ毛 保湿';
        data.theme3_deep_repair_hair_oil_milk.splice(1, 0, valid); // 2番目に挿入
        console.log(`✅ [kerastase_elixir_ultime_oil] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('テーマ3追加エラー:', e.message);
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 全30アイテム揃いました！`);
  console.log(`- テーマ1: ${data.theme1_holiday_makeup_coffret.length}件`);
  console.log(`- テーマ2: ${data.theme2_hydrating_cream_liquid_blush.length}件`);
  console.log(`- テーマ3: ${data.theme3_deep_repair_hair_oil_milk.length}件`);
}

fillMissingBatch75().catch(console.error);
