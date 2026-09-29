import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch8Cosmetics() {
  console.log('❄️ [11-12月コスメ 第8弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 冬の極上ツヤ血色＆多幸感 高密着クリームチーク＆リキッドチーク
  console.log('\n--- テーマ1: 冬のクリームチーク＆リキッドチーク ---');
  const cheekQueries = [
    'クリームチーク 高保湿 血色 ツヤ',
    'リキッドチーク 多幸感',
    'NARS アフターグロー リキッドブラッシュ',
    'アディクション ザ ブラッシュ ニュアンサー',
    'コスメデコルテ クリーム ブラッシュ',
    'ジルスチュアート メルティシマー ブラッシュ',
    'キャンメイク クリームチーク パール',
    'セザンヌ フェイスグロウカラー'
  ];
  let cheekItems = [];
  for (const q of cheekQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      cheekItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 冬の全身粉ふき・乾燥肌を防ぐ高保湿ボディウォッシュ＆泡ボディソープ
  console.log('\n--- テーマ2: 冬の高保湿ボディウォッシュ＆泡ボディソープ ---');
  const bodyWashQueries = [
    '高保湿 ボディウォッシュ 乾燥肌 泡',
    'ケアセラ 泡ボディウォッシュ セラミド',
    'キュレル 泡ボディウォッシュ 医薬部外品',
    'ミノン 全身シャンプー 泡タイプ',
    'ニベア クリームケア ボディウォッシュ W保水美肌',
    'SABON サボン シャワーオイル',
    'バウンシア 濃密泡 ボディソープ',
    'ハダカラ hadakara ボディソープ 保湿'
  ];
  let bodyWashItems = [];
  for (const q of bodyWashQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      bodyWashItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 冬の寒冷・暖房乾燥からまつ毛を守る高濃度まつ毛美容液（アイラッシュセラム）
  console.log('\n--- テーマ3: 冬の高濃度まつ毛美容液 ---');
  const lashQueries = [
    'まつ毛美容液 高濃度 まつげ 美容液 ハリ コシ',
    'ラッシュアディクト アイラッシュ コンディショニング セラム',
    'エマーキット EMAKED まつ毛美容液',
    'PHOEBE アイラッシュセラム フィービー',
    'スカルプD まつ毛美容液 プレミアム',
    'マジョリカ マジョルカ ラッシュジェリードロップ',
    'UZU まつげ美容液',
    'リバイタラッシュ アドバンス ジャパン'
  ];
  let lashItems = [];
  for (const q of lashQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      lashItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  function dedupe(items) {
    const seen = new Set();
    const result = [];
    for (const it of items) {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) continue;
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり') || it.itemName.includes('アウトレット') || it.itemName.includes('ジャンク')) continue;
      if (!seen.has(it.itemCode) && !seen.has(it.itemName)) {
        seen.add(it.itemCode);
        seen.add(it.itemName);
        result.push(it);
      }
    }
    return result;
  }

  const cleanCheek = dedupe(cheekItems);
  const cleanBodyWash = dedupe(bodyWashItems);
  const cleanLash = dedupe(lashItems);

  console.log(`\n取得結果集計:`);
  console.log(`- クリーム＆リキッドチーク: ${cleanCheek.length}件`);
  console.log(`- 高保湿ボディウォッシュ: ${cleanBodyWash.length}件`);
  console.log(`- 高濃度まつ毛美容液: ${cleanLash.length}件`);

  const output = {
    theme1_cheek: cleanCheek.slice(0, 40),
    theme2_bodywash: cleanBodyWash.slice(0, 40),
    theme3_lash: cleanLash.slice(0, 40),
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch8_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_batch8_items.json に保存しました！');
}

fetchWinterBatch8Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
