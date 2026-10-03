import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishBatch27Items() {
  const batch27 = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch27_items.json', 'utf8'));

  const t1Extra = [
    { brand: 'ihada_medicated_balm', name: '資生堂 IHADA イハダ 薬用バーム 20g 医薬部外品', query: 'イハダ 薬用バーム' },
    { brand: 'cezanne_pearl_glow_stick', name: 'CEZANNE セザンヌ パールグロウハイライト / スティック', query: 'セザンヌ パールグロウハイライト' }
  ];

  for (const cfg of t1Extra) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        batch27.theme1_stickserum.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 最終集計:`);
  console.log(`- スティック美容液: ${batch27.theme1_stickserum.length}/10`);
  console.log(`- ネイルオイル: ${batch27.theme2_nailoil.length}/10`);
  console.log(`- ネッククリーム: ${batch27.theme3_neckcream.length}/10`);

  fs.writeFileSync('scratch/rakuten_winter_batch27_items.json', JSON.stringify(batch27, null, 2), 'utf8');
}

finishBatch27Items().catch(console.error);
