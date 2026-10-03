import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch31() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch31_items.json', 'utf8'));

  // テーマ1: あと1件補充
  console.log('\n=== テーマ1 (グリッター) 補充 ===');
  const glitterQueries = [
    { brand: 'flowerknows_glitter_liquid', name: 'Flower Knows フラワーノーズ スワンバレエ リキッドアイシャドウ グリッター', query: 'フラワーノーズ グリッター' },
    { brand: 'bbia_glitter_tear_liner', name: 'BBIA ピアー グリッター アイライナー 涙袋ライナー', query: 'BBIA グリッター' },
    { brand: 'whomee_glitter_liner', name: 'WHOMEE フーミー キラララライナー マルチグリッター', query: 'フーミー グリッター' },
    { brand: 'colorgram_milk_bling_shadow', name: 'colorgram カラーグラム ミルクブリングシャドウ リキッドグリッター', query: 'カラーグラム グリッター' }
  ];

  for (const cfg of glitterQueries) {
    if (data.theme1_glitter.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme1_glitter.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_glitter.push(valid);
        console.log(`✅ [グリッター追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // テーマ3: あと3件補充
  console.log('\n=== テーマ3 (ピーリングジェル) 補充 ===');
  const peelingQueries = [
    { brand: 'natureine_premium_peeling_gel', name: 'ナチュレーヌ プレミアム 薬用 ピーリングジェル 高保湿', query: 'ナチュレーヌ プレミアム ピーリング' },
    { brand: 'dermal_q2_peeling_gel', name: 'フューチャーラボ デルマQ2 マイルドピーリングゲル プラス', query: 'デルマQ2 ピーリングゲル' },
    { brand: 'rosette_gommage_bright_peel', name: 'ロゼット 夢みるバーム / ロゼット ゴマージュ 角質ケア', query: 'ロゼット ピーリング' },
    { brand: 'peeling_gel_moisture_ex', name: '角質 ポロポロ ピーリングジェル 薬用 美白 大容量', query: 'ピーリングジェル 大容量 角質' },
    { brand: 'white_label_placenta_peeling', name: 'ホワイトラベル 金のプラセンタ 濃密リッチピーリングミックス', query: 'プラセンタ ピーリング' }
  ];

  for (const cfg of peelingQueries) {
    if (data.theme3_peeling.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme3_peeling.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_peeling.push(valid);
        console.log(`✅ [ピーリング追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch31_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 最終確定: グリッター=${data.theme1_glitter.length}, マスカラ下地=${data.theme2_mascara_base.length}, ピーリングジェル=${data.theme3_peeling.length}`);
}

supplementBatch31().catch(console.error);
