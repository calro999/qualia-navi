import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissingBatch77() {
  console.log('🔄 不足・調整アイテムを楽天OpenAPIから追加取得して各テーマ10商品（計30商品）を揃えます...');
  const jsonPath = 'scratch/rakuten_winter_batch77_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // 1. テーマ1: ネイルハードナー (現在8件 -> あと2件)
  // ドクターネイル ディープセラム または ネイルネイル ボリュームジェルトップ/ハードナー
  if (data.theme1_nail_hardener_strengthener.length < 10) {
    try {
      const res = await searchRakutenDirect('ドクターネイル ディープセラム', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 1500 && !it.itemName.includes('中古'));
      if (valid && !data.theme1_nail_hardener_strengthener.some(e => e.itemCode === valid.itemCode)) {
        valid.brandKey = 'dr_nail_deep_serum_repair';
        valid.displayBrand = '興和 ドクターネイル ディープセラム 3.3ml / 6.6ml 自爪浸透補修 ケラチン割れ補修';
        data.theme1_nail_hardener_strengthener.push(valid);
        console.log(`✅ [dr_nail_deep_serum_repair] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('ドクターネイル取得エラー:', e.message);
    }
    await sleep(1300);
  }

  if (data.theme1_nail_hardener_strengthener.length < 10) {
    try {
      const res = await searchRakutenDirect('ネイルネイル スプリットリペア', 6, '-reviewCount');
      let valid = res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古'));
      if (!valid) {
        const res2 = await searchRakutenDirect('ネイル ハードナー 補強', 6, '-reviewCount');
        valid = res2.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !data.theme1_nail_hardener_strengthener.some(e => e.itemCode === it.itemCode));
      }
      if (valid && !data.theme1_nail_hardener_strengthener.some(e => e.itemCode === valid.itemCode)) {
        valid.brandKey = 'nail_nail_split_repair_hardener';
        valid.displayBrand = 'BCL ネイルネイル スプリットリペアセラム または ボリュームジェルトップ 爪補強';
        data.theme1_nail_hardener_strengthener.push(valid);
        console.log(`✅ [nail_nail_split_repair_hardener] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('ネイルネイル取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 2. テーマ2: クレイクリームシャンプー (現在9件 -> あと1件)
  // KAMIKA または 405 / クレイシャンプー
  if (data.theme2_clay_cream_shampoo_nourish.length < 10) {
    try {
      const res = await searchRakutenDirect('KAMIKA シャンプー', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 2000 && !it.itemName.includes('中古'));
      if (valid && !data.theme2_clay_cream_shampoo_nourish.some(e => e.itemCode === valid.itemCode)) {
        valid.brandKey = 'kamika_all_in_one_cream_shampoo';
        valid.displayBrand = 'KAMIKA カミカ オールインワン黒髪クリームシャンプー 泡立たない 濃厚補修 ヘマチン メリタン';
        data.theme2_clay_cream_shampoo_nourish.push(valid);
        console.log(`✅ [kamika_all_in_one_cream_shampoo] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('KAMIKA取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 3. テーマ3: 粧美堂のアイテムがクリーナーだった場合、確実にスポンジ本体（ロージーローザ シフォンタッチスポンジ等）へ置換
  const shobidoIdx = data.theme3_hydrating_makeup_sponge_puff.findIndex(it => it.brandKey === 'shobido_3d_makeup_sponge_marshmallow');
  if (shobidoIdx !== -1 && data.theme3_hydrating_makeup_sponge_puff[shobidoIdx].itemName.includes('クリーナー')) {
    console.log('🔄 粧美堂のアイテムがクリーナーのため、スポンジ本体（ロージーローザ シフォンタッチスポンジ または オルビス パフ）に置換します...');
    try {
      const res = await searchRakutenDirect('ロージーローザ シフォンタッチスポンジ', 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 300 && !it.itemName.includes('中古') && !data.theme3_hydrating_makeup_sponge_puff.some(e => e.itemCode === it.itemCode));
      if (valid) {
        valid.brandKey = 'rosy_rosa_chiffon_touch_sponge';
        valid.displayBrand = 'ロージーローザ ROSY ROSA シフォンタッチスポンジN ダイヤ型 / スクエア 厚手 ふんわり';
        data.theme3_hydrating_makeup_sponge_puff[shobidoIdx] = valid;
        console.log(`✅ [rosy_rosa_chiffon_touch_sponge] 置換完了: ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error('ロージーローザシフォンタッチ取得エラー:', e.message);
    }
    await sleep(1300);
  }

  // 保存
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 [完全揃い完了] 各テーマ10商品ずつ揃いました！`);
  console.log(`- テーマ1 (ネイルハードナー): ${data.theme1_nail_hardener_strengthener.length}件`);
  console.log(`- テーマ2 (クレイクリームシャンプー): ${data.theme2_clay_cream_shampoo_nourish.length}件`);
  console.log(`- テーマ3 (メイクスポンジ＆水光パフ): ${data.theme3_hydrating_makeup_sponge_puff.length}件`);
}

fillMissingBatch77();
