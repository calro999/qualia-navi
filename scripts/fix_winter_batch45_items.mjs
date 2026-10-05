import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function completeTheme1() {
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch45_items.json', 'utf8'));

  const candidateQueries = [
    { brand: 'spicule_needle_moist_essence', name: '針コスメ スピキュール 高濃度 プレミアム 美容液 30ml マイクロニードル ヒト幹細胞 エイジングケア', query: 'スピキュール 美容液' },
    { brand: 'medicube_cica_spicule_serum', name: 'MEDICUBE メディキューブ スキンブースター アンプル セラム 浸透 毛穴 集中ケア', query: 'メディキューブ 美容液' },
    { brand: 'vt_cica_reedle_balance_serum', name: 'VT COSMETICS シカ リードル エッセンス 美容液 針美容 導入液 うるおい', query: 'VT リードル 美容液' },
    { brand: 'dr_pepti_peptide_volume_master_essence', name: 'DR.PEPTI ドクターペプチ ペプチド ボリューム マスター エッセンス 105ml 塗るボトックス 弾力 泡美容液', query: 'ドクターペプチ ペプチド ボリューム' }
  ];

  for (const q of candidateQueries) {
    if (current.theme1_microneedle.length >= 10) break;
    try {
      const res = await searchRakutenDirect(q.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = q.brand;
        valid.displayBrand = q.name;
        current.theme1_microneedle.push(valid);
        console.log(`✅ [T1追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
    } catch (e) {
      console.warn(`T1エラー:`, e.message);
    }
    await sleep(1300);
  }

  console.log(`テーマ1 最終件数: ${current.theme1_microneedle.length} 件`);
  fs.writeFileSync('scratch/rakuten_winter_batch45_items.json', JSON.stringify(current, null, 2), 'utf8');
}

completeTheme1().catch(console.error);
