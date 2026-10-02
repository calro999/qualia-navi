import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch20() {
  const filePath = 'scratch/rakuten_winter_batch20_items.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // --- テーマ2 補完 ---
  console.log('\n=== テーマ2 補完（ハイライター） ===');
  const glowSupplements = [
    { brand: 'rmk_glow', name: 'RMK グロースティック / ハイライター', query: 'RMK グロー ハイライト' },
    { brand: 'clio_glow', name: 'CLIO プリズム エアー ハイライター', query: 'CLIO プリズム エアー ハイライター' }
  ];

  for (const cfg of glowSupplements) {
    if (data.theme2_glow.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_glow.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // もしまだ10件未満なら
  if (data.theme2_glow.length < 10) {
    const backupCfg = { brand: 'three_glow', name: 'THREE シマリング グロー デュオ', query: 'THREE シマリング グロー デュオ' };
    const res = await searchRakutenDirect(backupCfg.query, 6, '-reviewCount');
    const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
    if (valid) {
      valid.brandKey = backupCfg.brand;
      valid.displayBrand = backupCfg.name;
      data.theme2_glow.push(valid);
      console.log(`✅ [${backupCfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // --- テーマ3 補完 ---
  console.log('\n=== テーマ3 補完（スカルプローション） ===');
  const scalpSupplements = [
    { brand: 'shiseido_adenovital', name: '資生堂 アデノバイタル スカルプエッセンス', query: 'アデノバイタル スカルプエッセンス' },
    { brand: 'scalpd_beaute', name: 'スカルプD ボーテ 薬用スカルプセラム', query: 'スカルプD ボーテ スカルプセラム' },
    { brand: 'ayura_scalp', name: 'アユーラ ビカッサヘッドセラムα', query: 'アユーラ ビカッサヘッドセラム' },
    { brand: 'orbis_scalp', name: 'オルビス スカルプリファイニング エッセンス', query: 'オルビス スカルプリファイニング' },
    { brand: 'moroccanoil_scalp', name: 'モロッカンオイル スカルプ トリートメント', query: 'モロッカンオイル スカルプトリートメント' }
  ];

  for (const cfg of scalpSupplements) {
    if (data.theme3_scalp.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_scalp.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補完完了！`);
  console.log(`- 高保湿リップティント: ${data.theme1_tint.length}/10`);
  console.log(`- 濡れツヤハイライター: ${data.theme2_glow.length}/10`);
  console.log(`- 高保湿スカルプローション: ${data.theme3_scalp.length}/10`);
}

supplementBatch20().catch(console.error);
