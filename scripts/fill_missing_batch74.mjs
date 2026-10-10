import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch74() {
  console.log('🔄 不足している4アイテムを楽天APIからピンポイント取得します...');
  const jsonPath = 'scratch/rakuten_winter_batch74_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. ランコム ジェニフィック
  if (data.theme1_booster_serum.length < 10) {
    try {
      const res = await searchRakutenDirect('ランコム ジェニフィック 美容液', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'lancome_genifique_advanced_serum';
        valid.displayBrand = 'ランコム LANCOME ジェニフィック アドバンスト N 50ml または アルティメ 美肌菌 導入美容液 バリア回復 デパコス';
        data.theme1_booster_serum.splice(3, 0, valid); // 4番目に挿入
        console.log(`✅ [lancome_genifique_advanced_serum] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('ランコム取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 2. dプログラム アレルバリア ミスト
  if (data.theme2_hydrating_makeup_mist.length < 10) {
    try {
      const res = await searchRakutenDirect('dプログラム アレルバリア ミスト', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'd_program_allerbarrier_mist_n';
        valid.displayBrand = '資生堂 dプログラム アレルバリア ミスト N 57ml 敏感肌 オイル＆化粧水 2層 花粉 微粒子 暖房乾燥 保湿';
        data.theme2_hydrating_makeup_mist.splice(2, 0, valid); // 3番目に挿入
        console.log(`✅ [d_program_allerbarrier_mist_n] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('dプログラム取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 3. アディクション または MAC フィックスミスト
  if (data.theme2_hydrating_makeup_mist.length < 10) {
    try {
      const res = await searchRakutenDirect('アディクション フィックス ミスト', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'addiction_makeup_fix_micro_mist';
        valid.displayBrand = 'アディクション ADDICTION メイクアップ フィックス マイクロ ミスト 70ml オイルフリー 超微細ミスト 潤い ウォータープルーフ';
        data.theme2_hydrating_makeup_mist.push(valid);
        console.log(`✅ [addiction_makeup_fix_micro_mist] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        // 代替としてMAC プレップ プライム フィックス+
        const macRes = await searchRakutenDirect('マック フィックス ミスト', 6, '-reviewCount');
        const macValid = macRes.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
        if (macValid) {
          macValid.brandKey = 'mac_prep_prime_fix_plus';
          macValid.displayBrand = 'M・A・C MAC プレップ プライム フィックス+ 100ml 保湿 フィックススプレー メイクキープ デパコス名品';
          data.theme2_hydrating_makeup_mist.push(macValid);
          console.log(`✅ [mac_prep_prime_fix_plus] ${macValid.itemName.slice(0, 35)} (${macValid.priceFormatted})`);
        }
      }
    } catch (e) {
      console.error('ミスト取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 4. オペラ リップティント テラコッタ
  if (data.theme3_deep_color_moist_lip.length < 10) {
    try {
      const res = await searchRakutenDirect('オペラ リップティント テラコッタ', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'opera_lip_tint_n_terracotta';
        valid.displayBrand = 'オペラ OPERA リップティント N 09 テラコッタ または 11 フィグ 透け感ティント スクワラン 高保湿 プチプラ名品';
        data.theme3_deep_color_moist_lip.splice(5, 0, valid); // 6番目に挿入
        console.log(`✅ [opera_lip_tint_n_terracotta] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('オペラ取得エラー:', e.message);
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 不足分取得完了！ テーマ1: ${data.theme1_booster_serum.length}件, テーマ2: ${data.theme2_hydrating_makeup_mist.length}件, テーマ3: ${data.theme3_deep_color_moist_lip.length}件`);
}

fillMissingBatch74().catch(console.error);
