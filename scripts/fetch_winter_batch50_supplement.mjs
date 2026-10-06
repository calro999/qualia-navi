import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchSupplements() {
  console.log('🔄 [不足分補完リクエスト] 楽天OpenAPIから各テーマが10選になるよう追加取得します...');

  const existingData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch50_items.json', 'utf8'));

  // テーマ1 不足2件（越冬クリーム、ニベアプレミアムボディミルク）
  console.log('\n--- テーマ1 補完 ---');
  const bodySupp = [
    { brand: 'beehoney_etto_cream_100g', name: 'ハウス オブ ローゼ ビーハニー 越冬クリーム 100g ハチミツ・ローヤルゼリー 冬季限定 全身高保湿クリーム', query: 'ビーハニー 越冬クリーム 100g' },
    { brand: 'nivea_premium_body_milk_moist', name: '花王 ニベア プレミアムボディミルク モイスチャー 200g 高保水型ヒアルロン酸 超乾燥肌用', query: 'ニベア プレミアムボディミルク モイスチャー 200g' }
  ];

  for (const cfg of bodySupp) {
    if (existingData.theme1_body.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        existingData.theme1_body.push(valid);
        console.log(`✅ [テーマ1補完] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ2 不足2件（エレガンス、NARS）
  console.log('\n--- テーマ2 補完 ---');
  const powderSupp = [
    { brand: 'elegance_la_poudre_8_8g', name: 'エレガンス ラ プードル オートニュアンス 8.8g プレストパウダー 至高の耐水・耐皮脂・透明感', query: 'エレガンス ラプードル 8.8g' },
    { brand: 'nars_light_reflecting_pressed', name: 'NARS ナーズ ライトリフレクティングセッティングパウダー プレスト N 10g リフ粉 光反射', query: 'NARS リフ粉 プレスト' },
    { brand: 'cledepeau_poudre_transparante', name: 'クレ・ド・ポー ボーテ プードルトランスパラントn 26g 至高のダイヤモンドヴェール 保湿ルースパウダー', query: 'クレドポーボーテ プードルトランスパラントn' }
  ];

  for (const cfg of powderSupp) {
    if (existingData.theme2_powder.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        existingData.theme2_powder.push(valid);
        console.log(`✅ [テーマ2補完] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // テーマ3 不足1件（ケラスターゼ）
  console.log('\n--- テーマ3 補完 ---');
  const hairSupp = [
    { brand: 'kerastase_oleo_relax_100ml', name: 'ケラスターゼ DP フルイド オレオ リラックス 100ml くせ毛・広がり・乾燥毛用 至高のアウトバスオイル', query: 'ケラスターゼ オレオリラックス 100ml' },
    { brand: 'loretta_base_care_oil_120ml', name: 'ロレッタ ベースケアオイル 120ml ダマスクローズの香り さらさらツヤ髪 洗い流さないヘアトリートメント', query: 'ロレッタ ベースケアオイル 120ml' }
  ];

  for (const cfg of hairSupp) {
    if (existingData.theme3_hair.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        existingData.theme3_hair.push(valid);
        console.log(`✅ [テーマ3補完] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 補完後の最終アイテム数:`);
  console.log(`- テーマ1: ${existingData.theme1_body.length}/10`);
  console.log(`- テーマ2: ${existingData.theme2_powder.length}/10`);
  console.log(`- テーマ3: ${existingData.theme3_hair.length}/10`);

  fs.writeFileSync('scratch/rakuten_winter_batch50_items.json', JSON.stringify(existingData, null, 2), 'utf8');
  console.log('💾 更新を scratch/rakuten_winter_batch50_items.json に保存しました！');
}

fetchSupplements().catch(err => {
  console.error('補完エラー:', err);
  process.exit(1);
});
