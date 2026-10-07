import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function diversify() {
  const d = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch54_items.json', 'utf8'));
  // ナンバーズインは1番だけ残す
  d.theme3_glutathione_serum = d.theme3_glutathione_serum.slice(0, 7);

  const targets = [
    { name: 'KISO ホワイトエッセンス GL グルタチオン 美容液', q: 'KISO ホワイトエッセンス GL' },
    { name: 'ネイチャーリパブリック ビタペアC 集中美容液', q: 'ビタペアC 集中美容液 ネイチャーリパブリック' },
    { name: 'VT リードルショット グルタチオン または BIOHEAL BOH ビタミン', q: 'グルタチオン 美容液 韓国' }
  ];

  for (const t of targets) {
    const res = await searchRakutenDirect(t.q, 5, '-reviewCount');
    const valid = res.find(it => {
      if (!it.imageUrl || it.itemPrice < 1500) return false;
      if (it.itemName.includes('中古') || it.itemName.includes('サプリ')) return false;
      if (d.theme3_glutathione_serum.some(ex => ex.itemCode === it.itemCode)) return false;
      return true;
    });
    if (valid) {
      valid.brandKey = `gluta_${d.theme3_glutathione_serum.length + 1}`;
      valid.displayBrand = valid.itemName.slice(0, 38);
      d.theme3_glutathione_serum.push(valid);
      console.log(`✅ [グルタチオン多様化追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
    }
    await sleep(1300);
  }

  // 10件に満たない場合のフォールバック
  if (d.theme3_glutathione_serum.length < 10) {
    const res = await searchRakutenDirect('グルタチオン アンプル 美白', 5, '-reviewCount');
    for (const it of res) {
      if (d.theme3_glutathione_serum.length >= 10) break;
      if (it.itemPrice >= 1500 && !d.theme3_glutathione_serum.some(ex => ex.itemCode === it.itemCode)) {
        d.theme3_glutathione_serum.push(it);
      }
    }
  }

  console.log(`テーマ3 最終件数: ${d.theme3_glutathione_serum.length}件`);
  fs.writeFileSync('scratch/rakuten_winter_batch54_items.json', JSON.stringify(d, null, 2), 'utf8');
}

diversify();
