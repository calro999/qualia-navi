import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtraItems() {
  console.log('❄️ [追加フェッチ] バリエーション拡充のための楽天API直接検索...');
  
  const existing = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch8_items.json', 'utf8'));

  const extraCheekQueries = [
    'セザンヌ フェイスグロウカラー',
    'キャンメイク むにゅっと ハイライター',
    'アディクション チーク ティント',
    'hince トゥルーディメンション ラディアンスバーム'
  ];
  let extraCheeks = [];
  for (const q of extraCheekQueries) {
    try {
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      extraCheeks.push(...res);
    } catch (e) {
      console.warn(e.message);
    }
    await sleep(1300);
  }

  const extraBodyQueries = [
    'SABON シャワーオイル デリケート ジャスミン',
    'バウンシア ボディソープ プレミアムモイスト',
    'hadakara 泡ボディソープ 高吸着'
  ];
  let extraBodies = [];
  for (const q of extraBodyQueries) {
    try {
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      extraBodies.push(...res);
    } catch (e) {
      console.warn(e.message);
    }
    await sleep(1300);
  }

  const extraLashQueries = [
    'スカルプD まつ毛美容液 プレミアム 単品',
    'マジョリカ マジョルカ ラッシュジェリードロップ EX',
    'UZU アイラッシュセラム まつ毛美容液'
  ];
  let extraLashes = [];
  for (const q of extraLashQueries) {
    try {
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      extraLashes.push(...res);
    } catch (e) {
      console.warn(e.message);
    }
    await sleep(1300);
  }

  function dedupe(arr) {
    const seen = new Set();
    return arr.filter(it => {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) return false;
      if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
      if (seen.has(it.itemCode) || seen.has(it.itemName)) return false;
      seen.add(it.itemCode);
      seen.add(it.itemName);
      return true;
    });
  }

  existing.theme1_cheek = dedupe([...existing.theme1_cheek, ...extraCheeks]);
  existing.theme2_bodywash = dedupe([...existing.theme2_bodywash, ...extraBodies]);
  existing.theme3_lash = dedupe([...existing.theme3_lash, ...extraLashes]);

  fs.writeFileSync('scratch/rakuten_winter_batch8_items.json', JSON.stringify(existing, null, 2), 'utf8');
  console.log(`✅ 拡張完了: チーク=${existing.theme1_cheek.length}件, ボディウォッシュ=${existing.theme2_bodywash.length}件, まつ毛美容液=${existing.theme3_lash.length}件`);
}

fetchExtraItems().catch(console.error);
