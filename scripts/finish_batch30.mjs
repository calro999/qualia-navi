import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function finishBatch30() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch30_items.json', 'utf8'));

  const queries = [
    { brand: 'shiseido_navision_needle_patch_extra', name: '資生堂 ナビジョン フォーカスアイプログラム マイクロニードル', query: 'ナビジョン アイプログラム' },
    { brand: 'hyaluronic_needle_patch_kose', name: 'コーセー コスメディカ マイクロニードル パッチ 目元用', query: 'マイクロパッチ 目元' },
    { brand: 'needle_patch_moisture_shot', name: 'ヒアルロン酸 美容針パッチ 目元・口元用 集中ケア', query: 'ヒアルロン酸 針 目元' },
    { brand: 'needle_patch_aging_care', name: 'マイクロニードル 目元美容液パッチ 集中ハリケア', query: 'マイクロニードル 目元' }
  ];

  for (const cfg of queries) {
    if (data.theme3_patch.length >= 10) break;
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid && !data.theme3_patch.some(x => x.itemCode === valid.itemCode)) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        data.theme3_patch.push(valid);
        console.log(`✅ [ニードルパッチ追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.error(e.message);
    }
    await sleep(1300);
  }

  fs.writeFileSync('scratch/rakuten_winter_batch30_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`🎉 最終確定: ホットビューラー=${data.theme1_curler.length}, アイシャドウベース=${data.theme2_primer.length}, ニードルパッチ=${data.theme3_patch.length}`);
}

finishBatch30().catch(console.error);
