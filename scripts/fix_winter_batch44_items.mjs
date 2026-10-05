import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fixBatch44() {
  console.log('🔧 不足アイテム（各2件、計4件）を楽天APIから追加取得して10件ずつに補完します...');

  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch44_items.json', 'utf8'));

  // テーマ1 不足分: タカミ & アンレーベル
  const t1Missing = [
    { brand: 'takami_essence_ce_vitamin', name: 'TAKAMI タカミ エッセンスCE 30ml ビタミンC・E配合 機能性美容液 毛穴キメ透明感ケア', query: 'タカミ エッセンスCE' },
    { brand: 'unlabel_lab_v_essence_vitamin_c', name: 'アンレーベル ラボ V エッセンス 50ml 超高圧浸透型ビタミンC誘導体 毛穴・くすみ集中アプローチ', query: 'アンレーベル ラボ ビタミンC' }
  ];

  for (const cfg of t1Missing) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme1_vitamin_c.push(valid);
        console.log(`✅ [テーマ1追加: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 取得失敗: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1500);
  }

  // テーマ2 不足分: POLA & コスメデコルテ
  const t2Missing = [
    { brand: 'pola_ba_wash_n', name: 'POLA ポーラ B.A ウォッシュ N 100g 最高峰濃密泡 潤いを守りながら透き通るような洗い上がり', query: 'POLA BA ウォッシュ 100g' },
    { brand: 'decorte_clay_blanc_cleanser', name: 'DECORTÉ コスメデコルテ クレイ ブラン 171g 天然ホワイトクレイ配合 すっきりなめらか透明感洗顔', query: 'コスメデコルテ クレイブラン' }
  ];

  for (const cfg of t2Missing) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_cleanser.push(valid);
        console.log(`✅ [テーマ2追加: ${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 取得失敗: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1500);
  }

  console.log('\n--- 補完後の件数確認 ---');
  console.log(`テーマ1 (ビタミンC美容液): ${data.theme1_vitamin_c.length}/10`);
  console.log(`テーマ2 (高保湿洗顔フォーム): ${data.theme2_cleanser.length}/10`);
  console.log(`テーマ3 (ハイドロゲル・モデリングマスク): ${data.theme3_hydrogel.length}/10`);

  fs.writeFileSync('scratch/rakuten_winter_batch44_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('🎉 scratch/rakuten_winter_batch44_items.json の補完更新が完了しました！');
}

fixBatch44().catch(err => {
  console.error('Fatal Fix Error:', err);
  process.exit(1);
});
