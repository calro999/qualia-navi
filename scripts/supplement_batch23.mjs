import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch23() {
  const jsonPath = 'scratch/rakuten_winter_batch23_items.json';
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log('🔄 不足または不適切なアイテムを再取得して補完します...');

  // --- テーマ2 補完 ---
  // 不適切なmac (ドレス) を除外
  data.theme2_lipscrub = data.theme2_lipscrub.filter(it => it.brandKey !== 'mac_lip_scrubtious');

  const scrubReplacements = [
    { brand: 'country_stream_scrub', name: 'カントリー＆ストリーム リップスクラブ', query: 'カントリー&ストリーム リップスクラブ' },
    { brand: 'innisfree_lip_scrub', name: 'イニスフリー グリーンティー リップスクラブ', query: 'イニスフリー リップ' },
    { brand: 'jillstuart_lip_scrub', name: 'ジルスチュアート リップバーム / スクラブ', query: 'ジルスチュアート リップバーム' }
  ];

  for (const cfg of scrubReplacements) {
    if (data.theme2_lipscrub.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme2_lipscrub.push(valid);
        console.log(`✅ [リップスクラブ補完] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3 補完 (アディクション) ---
  if (data.theme3_stickeyeshadow.length < 10) {
    const shadowReplacements = [
      { brand: 'addiction_liquid_eyeshadow', name: 'アディクション ザ リキッド アイシャドウ ウルトラスパークル', query: 'アディクション リキッド アイシャドウ' },
      { brand: 'rmk_liquid_eyeshadow', name: 'RMK リキッドアイズ', query: 'RMK リキッドアイズ' }
    ];

    for (const cfg of shadowReplacements) {
      if (data.theme3_stickeyeshadow.length >= 10) break;
      try {
        const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
        const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
        if (valid) {
          valid.brandKey = cfg.brand;
          valid.displayBrand = cfg.name;
          data.theme3_stickeyeshadow.push(valid);
          console.log(`✅ [スティック/リキッドアイシャドウ補完] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
        }
      } catch (e) {
        console.error(e.message);
      }
      await sleep(1300);
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 補完完了！ アイライナー=${data.theme1_eyeliner.length}/10, リップスクラブ=${data.theme2_lipscrub.length}/10, スティックシャドウ=${data.theme3_stickeyeshadow.length}/10`);
}

supplementBatch23().catch(console.error);
