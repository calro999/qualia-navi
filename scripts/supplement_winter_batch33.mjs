import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function supplementBatch33() {
  console.log('🔄 テーマ2（2件の精度向上）とテーマ3（1件追加）を楽天APIから直接再取得します...');
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch33_items.json', 'utf8'));

  // 1. コスメデコルテ リポソーム アイセラム本品 (20mL)
  console.log('コスメデコルテ リポソーム アイセラム本品 取得中...');
  const resDecorte = await searchRakutenDirect('コスメデコルテ リポソーム アドバンスト リペアアイセラム 20ml', 6, '-reviewCount');
  const validDecorte = resDecorte.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古'));
  if (validDecorte) {
    validDecorte.brandKey = 'cosmedecorte_liposome_repair_eye_serum';
    validDecorte.displayBrand = 'DECORTÉ コスメデコルテ リポソーム アドバンスト リペアアイセラム 目元美容液 20mL';
    data.theme2_eye_cream[2] = validDecorte;
    console.log(`✅ [cosmedecorte_eye] ${validDecorte.itemName.slice(0, 35)} (${validDecorte.priceFormatted})`);
  }

  // 2. 韓国実力派アイクリーム: AHC テン レボリューション リアル アイクリーム フォー フェイス
  console.log('AHC アイクリーム フォー フェイス 取得中...');
  const resAhc = await searchRakutenDirect('AHC テン レボリューション リアル アイクリーム フォー フェイス', 6, '-reviewCount');
  const validAhc = resAhc.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
  if (validAhc) {
    validAhc.brandKey = 'ahc_ten_revolution_real_eye_cream';
    validAhc.displayBrand = 'AHC エーエイチシー テン レボリューション リアル アイクリーム フォー フェイス';
    data.theme2_eye_cream[9] = validAhc;
    console.log(`✅ [ahc_eye_cream] ${validAhc.itemName.slice(0, 35)} (${validAhc.priceFormatted})`);
  } else {
    // 代替: イニスフリー グリーンティー アイクリーム
    const resInni = await searchRakutenDirect('イニスフリー アイクリーム', 6, '-reviewCount');
    const validInni = resInni.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (validInni) {
      validInni.brandKey = 'innisfree_green_tea_eye_cream';
      validInni.displayBrand = 'innisfree イニスフリー グリーンティー シード ヒアルロン アイクリーム';
      data.theme2_eye_cream[9] = validInni;
      console.log(`✅ [innisfree_eye] ${validInni.itemName.slice(0, 35)} (${validInni.priceFormatted})`);
    }
  }

  // 3. テーマ3の10番目: CLAYD クレイド キャニオン クレイ入浴剤 / 入浴料
  console.log('テーマ3の10番目 CLAYD 入浴剤 取得中...');
  const resClayd = await searchRakutenDirect('CLAYD 入浴剤', 6, '-reviewCount');
  const validClayd = resClayd.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
  if (validClayd) {
    validClayd.brandKey = 'clayd_canyon_bath_clay_powder';
    validClayd.displayBrand = 'CLAYD クレイド CANYON 入浴剤 天然クレイバス 高発汗・毛穴吸着';
    data.theme3_bath_salt.push(validClayd);
    console.log(`✅ [clayd_bath] ${validClayd.itemName.slice(0, 35)} (${validClayd.priceFormatted})`);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch33_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補完・更新完了！`);
  console.log(`- テーマ1 (ヘアミルク): ${data.theme1_hair_milk.length}件`);
  console.log(`- テーマ2 (アイクリーム): ${data.theme2_eye_cream.length}件`);
  console.log(`- テーマ3 (温活バスソルト): ${data.theme3_bath_salt.length}件`);
}

supplementBatch33().catch(err => {
  console.error('エラー:', err);
  process.exit(1);
});
