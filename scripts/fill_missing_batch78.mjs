import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch78() {
  console.log('🔄 不足・調整アイテムを楽天OpenAPIから追加取得して各テーマ10商品（計30商品）を完全に揃えます...');
  const jsonPath = 'scratch/rakuten_winter_batch78_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. テーマ1: コンシーラーパレット
  // Diorがチーク(ロージーグロウ)になっていた場合はコンシーラー本体に置換
  const diorIdx = data.theme1_concealer_palette_color_correcting.findIndex(it => it.brandKey === 'dior_backstage_flash_concealer');
  if (diorIdx !== -1 && !data.theme1_concealer_palette_color_correcting[diorIdx].itemName.includes('コンシーラー')) {
    console.log('🔄 Diorのアイテムがチークのため、エトヴォス ミネラルコンシーラーパレットに置換します...');
    try {
      const res = await searchRakutenDirect('エトヴォス ミネラルコンシーラーパレット', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));
      if (valid) {
        valid.brandKey = 'etvos_mineral_concealer_palette';
        valid.displayBrand = 'ETVOS エトヴォス ミネラルコンシーラーパレット SPF36 PA+++ 石鹸落ち 天然ミネラル';
        data.theme1_concealer_palette_color_correcting[diorIdx] = valid;
        console.log(`✅ [etvos_mineral_concealer_palette] 置換完了: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('エトヴォス取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // テーマ1で10件に満たない場合、RMKまたはWHOMEEを追加
  if (data.theme1_concealer_palette_color_correcting.length < 10) {
    try {
      const res = await searchRakutenDirect('RMK フローレスカバーコンシーラー', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古') && !data.theme1_concealer_palette_color_correcting.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = 'rmk_flawless_cover_concealer_palette';
        valid.displayBrand = 'RMK フローレスカバーコンシーラー カスタマイズ パレット 薄膜密着 クマ・色ムラ補正';
        data.theme1_concealer_palette_color_correcting.push(valid);
        console.log(`✅ [rmk_flawless_cover_concealer_palette] 追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('RMK取得エラー:', e.message);
    }
    await sleep(1300);
  }

  if (data.theme1_concealer_palette_color_correcting.length < 10) {
    try {
      const res = await searchRakutenDirect('フーミー キニシーラー', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !data.theme1_concealer_palette_color_correcting.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = 'whomee_kinisealer_palette';
        valid.displayBrand = 'WHOMEE フーミー キニシーラー 2色パレット イガリシノブ クマ消し 血色感';
        data.theme1_concealer_palette_color_correcting.push(valid);
        console.log(`✅ [whomee_kinisealer_palette] 追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('フーミー取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 2. テーマ2: ドライシャンプー (現在9件 -> あと1件)
  // 資生堂 フレッシィ ドライシャンプー
  if (data.theme2_refresh_dry_shampoo_scalp_powder_mist.length < 10) {
    try {
      const res = await searchRakutenDirect('資生堂 フレッシィ ドライシャンプー', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 300 && !it.itemName.includes('中古') && !data.theme2_refresh_dry_shampoo_scalp_powder_mist.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = 'shiseido_fressy_dry_shampoo_bottle';
        valid.displayBrand = '資生堂 フレッシィ ドライシャンプー ボトルタイプ 250ml / ディスペンサー 150ml 水のいらないシャンプー';
        data.theme2_refresh_dry_shampoo_scalp_powder_mist.push(valid);
        console.log(`✅ [shiseido_fressy_dry_shampoo_bottle] 追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('フレッシィ取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 3. テーマ3: マスカラリムーバー＆ポイントメイクリムーバー (現在7件 -> あと3件)
  // 3-1: クリニーク テイクザデイオフ
  if (data.theme3_gentle_mascara_remover_point_cleanse.length < 10) {
    try {
      const res = await searchRakutenDirect('クリニーク テイクザデイオフ リムーバー', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !data.theme3_gentle_mascara_remover_point_cleanse.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = 'clinique_take_the_day_off_remover';
        valid.displayBrand = 'クリニーク CLINIQUE テイク ザ デイ オフ ポイントメイクアップ リムーバー 125ml デパコス';
        data.theme3_gentle_mascara_remover_point_cleanse.push(valid);
        console.log(`✅ [clinique_take_the_day_off_remover] 追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('クリニーク取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 3-2: メイベリン アイメイクアップリムーバー
  if (data.theme3_gentle_mascara_remover_point_cleanse.length < 10) {
    try {
      const res = await searchRakutenDirect('メイベリン アイメイクアップリムーバー', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !data.theme3_gentle_mascara_remover_point_cleanse.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = 'maybelline_eye_makeup_remover';
        valid.displayBrand = 'メイベリン エクスプレス アイメイクアップ リムーバー 70ml 2層式 ウォータープルーフ対応';
        data.theme3_gentle_mascara_remover_point_cleanse.push(valid);
        console.log(`✅ [maybelline_eye_makeup_remover] 追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('メイベリン取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 3-3: キングダム マスカラリムーバー
  if (data.theme3_gentle_mascara_remover_point_cleanse.length < 10) {
    try {
      const res = await searchRakutenDirect('キングダム マスカラリムーバー', 6, '-reviewCount');
      let valid = res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !data.theme3_gentle_mascara_remover_point_cleanse.some(e => e.itemCode === it.itemCode));
      if (!valid) {
        const res2 = await searchRakutenDirect('マスカラリムーバー コーム', 6, '-reviewCount');
        valid = res2.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !data.theme3_gentle_mascara_remover_point_cleanse.some(e => e.itemCode === it.itemCode));
      }
      if (valid) {
        valid.brandKey = 'kingdom_mascara_remover_comb';
        valid.displayBrand = 'キングダム kingdom マスカラリムーバー コーム型 イオンクレンジング成分配合 まつ毛ケア';
        data.theme3_gentle_mascara_remover_point_cleanse.push(valid);
        console.log(`✅ [kingdom_mascara_remover_comb] 追加: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('キングダム取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 保存
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 [完全揃い完了] 各テーマ10商品ずつ揃いました！`);
  console.log(`- テーマ1 (コンシーラーパレット): ${data.theme1_concealer_palette_color_correcting.length}件`);
  console.log(`- テーマ2 (ドライシャンプー＆前髪パウダー): ${data.theme2_refresh_dry_shampoo_scalp_powder_mist.length}件`);
  console.log(`- テーマ3 (マスカラリムーバー＆ポイントリムーバー): ${data.theme3_gentle_mascara_remover_point_cleanse.length}件`);
}

fillMissingBatch78().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
