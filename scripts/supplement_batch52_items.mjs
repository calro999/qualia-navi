import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch52() {
  const currentData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch52_items.json', 'utf8'));

  // --- テーマ1補充（残り3件） ---
  const hqSupps = [
    { brand: 'lantelno_white_rush_hq', name: 'LANTELNO ランテルノ ホワイトHQクリーム 6g 純ハイドロキノン 5%配合 専門機関レベル 集中美白スポットケア', query: 'ランテルノ ハイドロキノン' },
    { brand: 'pluskirei_plus_white_hq', name: 'プラスキレイ プラスホワイトHQ 30g ハイドロキノン 配合 集中ケア', query: 'プラスキレイ ハイドロキノン' },
    { brand: 'kiso_hydroquinone_cream', name: 'KISO 基礎化粧品 ハイドロクリーム 8g 純ハイドロキノン 配合 高濃度スポット集中クリーム', query: 'KISO ハイドロキノン' },
    { brand: 'episteme_hq_laser_clear', name: 'ロート製薬 エピステーム HQ レーザークリア 12g ハイドロキノン 夜用集中美容液', query: 'エピステーム HQ レーザークリア' }
  ];

  for (const cfg of hqSupps) {
    if (currentData.theme1_hq_whitening.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        currentData.theme1_hq_whitening.push(valid);
        console.log(`✅ [補充 テーマ1] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2補充（残り1件） ---
  const caxaSupps = [
    { brand: 'refa_caxa_m1', name: 'ReFa CAXA M1 リファ カッサ エムワン 美顔ローラー カッサプレート 携帯用 コンパクト', query: 'リファ カッサ M1' },
    { brand: 'stone_kassa_scraps', name: '天然石 ローズクォーツ カッサ プレート 羽根型 美顔 リンパ流し', query: 'カッサ 羽根型 ローズクォーツ' }
  ];

  for (const cfg of caxaSupps) {
    if (currentData.theme2_caxa_lift.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        currentData.theme2_caxa_lift.push(valid);
        console.log(`✅ [補充 テーマ2] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3補充（残り1件） ---
  const scalpSupps = [
    { brand: 'lacasta_head_spa_brush', name: 'ラ・カスタ La CASTA ヘッドスパ スキャルプブラシ シリコン頭皮マッサージ', query: 'ラ・カスタ スキャルプブラシ' },
    { brand: 'orbis_scalp_refresher', name: 'オルビス ORBIS スカルプ＆リフレッシュブラシ 頭皮用ブラシ シャンプーブラシ', query: 'オルビス スカルプ リフレッシュブラシ' },
    { brand: 'uka_kenzan_medium', name: 'uka ウカ スカルプブラシ ケンザン ミディアム シリコン頭皮マッサージブラシ', query: 'ウカ ケンザン ミディアム' }
  ];

  for (const cfg of scalpSupps) {
    if (currentData.theme3_scalp_brush.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        currentData.theme3_scalp_brush.push(valid);
        console.log(`✅ [補充 テーマ3] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // 重複除去し10件に揃える
  currentData.theme1_hq_whitening = currentData.theme1_hq_whitening.slice(0, 10);
  currentData.theme2_caxa_lift = currentData.theme2_caxa_lift.slice(0, 10);
  currentData.theme3_scalp_brush = currentData.theme3_scalp_brush.slice(0, 10);

  const outPath = path.resolve('scratch/rakuten_winter_batch52_items.json');
  fs.writeFileSync(outPath, JSON.stringify(currentData, null, 2), 'utf8');
  console.log(`\n🎉 [補充完了] 全テーマ10アイテム確定！`);
  console.log(`件数: テーマ1=${currentData.theme1_hq_whitening.length}/10, テーマ2=${currentData.theme2_caxa_lift.length}/10, テーマ3=${currentData.theme3_scalp_brush.length}/10`);
}

supplementBatch52().catch(e => {
  console.error(e);
  process.exit(1);
});
