import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch26() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch26_items.json', 'utf8'));

  // 不足分ハンドセラム (6件追加して計10件にする)
  const handSupplements = [
    { brand: 'coenrich_medicated_hand_serum', name: 'コーセー コエンリッチ ザ プレミアム 薬用CICAディープモイスト ハンドセラム', query: 'コエンリッチ 薬用 ハンドセラム' },
    { brand: 'attenir_hand_treatment_whitening', name: 'アテニア ハンドトリートメント ホワイトコンフォート / 薬用ハンドクリーム', query: 'アテニア ハンド' },
    { brand: 'fancl_hand_serum_medicated', name: 'ファンケル アンドミライ スキン アップ ハンドセラム / 美容液', query: 'ファンケル ハンド' },
    { brand: 'yuskin_hana_hand_serum', name: 'ユースキン ハナ ハンドクリーム / 薬用高保湿リペアセラム', query: 'ユースキン ハナ' },
    { brand: 'shiseido_benefique_hand_cream', name: '資生堂 ベネフィーク クリアハンドクリーム / セラム', query: 'ベネフィーク ハンドクリーム' },
    { brand: 'loccitane_shea_hand_cream_rich', name: 'ロクシタン シア ハンドクリーム 150ml 大容量', query: 'ロクシタン シア ハンドクリーム 150ml' }
  ];

  console.log('\n=== ハンドセラム不足分の補充 ===');
  for (const cfg of handSupplements) {
    if (data.theme1_handserum.length >= 10) break;
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.theme1_handserum.push(valid);
      console.log(`✅ [追加ハンドセラム] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    } else {
      console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
    }
    await sleep(1300);
  }

  // 不足分インバスボディミルク (1件追加して計10件にする)
  const inbathSupplements = [
    { brand: 'diane_botanical_body_milk', name: 'ダイアン ボタニカル ボディミルク ディープモイスト / ハニーオリーブ', query: 'ダイアン ボタニカル ボディミルク' }
  ];

  console.log('\n=== インバスボディミルク不足分の補充 ===');
  for (const cfg of inbathSupplements) {
    if (data.theme2_inbathmilk.length >= 10) break;
    const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
    if (valid) {
      valid.brandKey = cfg.brand;
      valid.displayBrand = cfg.name;
      data.theme2_inbathmilk.push(valid);
      console.log(`✅ [追加インバスミルク] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    } else {
      console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
    }
    await sleep(1300);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch26_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補完完了！ テーマ1(ハンドセラム)=${data.theme1_handserum.length}/10, テーマ2(インバスミルク)=${data.theme2_inbathmilk.length}/10, テーマ3(フレグランス)=${data.theme3_fragrance.length}/10`);
}

supplementBatch26().catch(console.error);
