import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtraBatch5() {
  console.log('🔍 追加の冬コスメ名品を楽天APIから直接取得します...');
  
  const extraQueries = [
    { cat: 'theme1_eyecare', q: 'なめらか本舗 リンクルアイクリーム' },
    { cat: 'theme1_eyecare', q: 'ヒアロディープパッチ' },
    { cat: 'theme1_eyecare', q: 'クラランス ダブルセーラム アイ' },
    { cat: 'theme1_eyecare', q: 'キールズ DS RTN リニューイング セラム' },
    { cat: 'theme2_mask', q: 'メディヒール パック NMF' },
    { cat: 'theme2_mask', q: 'SK-II フェイシャルトリートメントマスク' },
    { cat: 'theme2_mask', q: 'VT リードルショット パック' },
    { cat: 'theme3_powder', q: 'コスメデコルテ ルースパウダー 00' },
    { cat: 'theme3_powder', q: 'エクセル エクストラリッチパウダー' },
    { cat: 'theme3_powder', q: 'チャコット パウダー モイスト' }
  ];

  const currentData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch5_items.json', 'utf8'));

  for (const item of extraQueries) {
    try {
      const res = await searchRakutenDirect(item.q, 6, '-reviewCount');
      if (res && res.length > 0) {
        currentData[item.cat].push(...res);
        console.log(`✅ [${item.cat}] "${item.q}" から ${res.length}件 追加`);
      }
    } catch (e) {
      console.warn(`エラー (${item.q}):`, e.message);
    }
    await sleep(1300);
  }

  function dedupe(items) {
    const seen = new Set();
    const result = [];
    for (const it of items) {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) continue;
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり')) continue;
      if (!seen.has(it.itemCode) && !seen.has(it.itemName)) {
        seen.add(it.itemCode);
        seen.add(it.itemName);
        result.push(it);
      }
    }
    return result;
  }

  currentData.theme1_eyecare = dedupe(currentData.theme1_eyecare);
  currentData.theme2_mask = dedupe(currentData.theme2_mask);
  currentData.theme3_powder = dedupe(currentData.theme3_powder);

  fs.writeFileSync('scratch/rakuten_winter_batch5_items.json', JSON.stringify(currentData, null, 2), 'utf8');
  console.log('🎉 追加名品の統合が完了しました！');
  console.log(`- アイケア: ${currentData.theme1_eyecare.length}件`);
  console.log(`- シートマスク: ${currentData.theme2_mask.length}件`);
  console.log(`- フェイスパウダー: ${currentData.theme3_powder.length}件`);
}

fetchExtraBatch5().catch(console.error);
