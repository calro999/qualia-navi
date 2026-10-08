import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fillMissing() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch70_items.json', 'utf8'));

  // --- テーマ1の修正・補完 ---
  // 重複している 8番目 (botanical_warm_cleansing_balm_clay) を除去
  data.theme1_hot_cleansing_balm = data.theme1_hot_cleansing_balm.filter(it => it.brandKey !== 'botanical_warm_cleansing_balm_clay');

  // 不足分2アイテムを取得
  console.log('--- テーマ1 追加取得 ---');
  const t1Queries = [
    { brand: 'clayge_cleansing_balm_warm_clay', name: 'クレージュ CLAYGE クレンジングバーム クリア モイスト 泥 クレイ 温感 毛穴 角栓 W洗顔不要 メイク落とし 保湿', query: 'クレージュ クレンジングバーム' },
    { brand: 'honey_cleansing_balm_moist_pore', name: '&honey アンドハニー クレンジングバーム クリア クレンジング モイスト ハチミツ 毛穴 角栓 メイク落とし 保湿', query: 'アンドハニー クレンジングバーム' }
  ];

  for (const q of t1Queries) {
    const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !data.theme1_hot_cleansing_balm.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = q.brand;
      valid.displayBrand = q.name;
      data.theme1_hot_cleansing_balm.push(valid);
      console.log(`✅ [Theme 1追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // --- テーマ2の修正・補完 ---
  // 不適切な4番目 (minon_medicated_scalp_care_lotion がシャンプーになっている) を置換
  console.log('\n--- テーマ2 修正・追加取得 ---');
  data.theme2_scalp_moisture_lotion = data.theme2_scalp_moisture_lotion.filter(it => it.brandKey !== 'minon_medicated_scalp_care_lotion');

  const t2Queries = [
    { brand: 'chifure_medicated_scalp_essence_tonic', name: 'ちふれ 薬用 育毛エッセンス 頭皮 保湿 薬用 ローション フケ かゆみ 頭皮ケア 無香料 地肌ケア', query: 'ちふれ 育毛エッセンス' }
  ];

  for (const q of t2Queries) {
    const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !data.theme2_scalp_moisture_lotion.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = q.brand;
      valid.displayBrand = q.name;
      data.theme2_scalp_moisture_lotion.push(valid);
      console.log(`✅ [Theme 2追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // --- テーマ3の補完 (現在8件 -> あと2件追加して10件に) ---
  console.log('\n--- テーマ3 追加取得 ---');
  const t3Queries = [
    { brand: 'laura_mercier_translucent_glow_highlighter', name: 'ローラメルシエ フェイスイルミネーター ハイライター ハイライト パウダー ツヤ肌 立体感 イルミネーション デパコス', query: 'ローラメルシエ ハイライト' },
    { brand: 'clio_prism_air_highlighter_glow', name: 'CLIO クリオ プリズム エアー ハイライター フェイスカラー 立体感 ツヤ肌 微細ラメ 韓国コスメ デイリーハイライト', query: 'クリオ プリズム エアー ハイライター' }
  ];

  for (const q of t3Queries) {
    const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !data.theme3_glow_highlighter_balm.some(e => e.itemCode === it.itemCode));
    if (valid) {
      valid.brandKey = q.brand;
      valid.displayBrand = q.name;
      data.theme3_glow_highlighter_balm.push(valid);
      console.log(`✅ [Theme 3追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  console.log(`\n最終確認件数:`);
  console.log(`- テーマ1: ${data.theme1_hot_cleansing_balm.length}件`);
  console.log(`- テーマ2: ${data.theme2_scalp_moisture_lotion.length}件`);
  console.log(`- テーマ3: ${data.theme3_glow_highlighter_balm.length}件`);

  fs.writeFileSync('scratch/rakuten_winter_batch70_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('🎉 完璧に全30アイテムのデータが保存されました！');
}

fillMissing().catch(e => console.error(e));
