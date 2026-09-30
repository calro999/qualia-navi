import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch10Cosmetics() {
  console.log('❄️ [11-12月コスメ 第10弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026ホリデー限定】クリスマスコフレ＆限定メイクアップキット
  console.log('\n--- テーマ1: クリスマスコフレ＆ホリデー限定メイクキット ---');
  const coffretQueries = [
    'クリスマスコフレ 2026 限定 コスメ',
    'クリスマスコフレ ジルスチュアート ホリデー',
    'コスメデコルテ クリスマスコフレ 限定',
    'ルナソル ホリデーコレクション アイシャドウ',
    'シュウウエムラ クリスマスコフレ',
    'ディオール クリスマスコフレ ホリデー',
    'ポール&ジョー クリスマスコフレ',
    'クラランス ホリデーキット'
  ];
  let coffretItems = [];
  for (const q of coffretQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      coffretItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・冷えむくみ解消】高保湿ボディオイル＆温感引き締めマッサージオイル
  console.log('\n--- テーマ2: 高保湿ボディオイル＆温感引き締めマッサージオイル ---');
  const bodyOilQueries = [
    'ボディオイル 高保湿 マッサージ',
    'ヴェレダ ホワイトバーチ ボディオイル',
    'ヴェレダ アルニカ マッサージオイル',
    'メルヴィータ ロルロゼ ブリリアント ボディオイル',
    'クラランス ボディオイル アンティオー',
    'ニールズヤード アロマティックマッサージオイル',
    'バイオイル 保湿 125ml',
    'クナイプ マッサージオイル グレープシードオイル'
  ];
  let bodyOilItems = [];
  for (const q of bodyOilQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      bodyOilItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬・乾燥による毛穴落ち・粉浮き完全防止】高保湿モイスチャークッションファンデーション＆BBバーム
  console.log('\n--- テーマ3: 高保湿クッションファンデーション＆BBバーム ---');
  const cushionQueries = [
    'クッションファンデ 高保湿 ツヤ',
    'TIRTIR マスクフィット クリスタルメッシュ クッション',
    'クリオ キルカバー メッシュグロウ クッション',
    'ジョンセンムル エッセンシャル スキンヌーダー クッション',
    'ミシャ M クッションファンデーション プロカバー',
    'ラロッシュポゼ UVイデア XL プロテクショントーンアップ BB',
    '資生堂 マキアージュ ドラマティッククッションジェリー',
    'ヘラ HERA ブラッククッション'
  ];
  let cushionItems = [];
  for (const q of cushionQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      cushionItems.push(...res);
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

  const cleanCoffret = dedupe(coffretItems);
  const cleanBodyOil = dedupe(bodyOilItems);
  const cleanCushion = dedupe(cushionItems);

  console.log(`\n取得結果集計:`);
  console.log(`- クリスマスコフレ＆ホリデーキット: ${cleanCoffret.length}件`);
  console.log(`- ボディオイル＆マッサージオイル: ${cleanBodyOil.length}件`);
  console.log(`- クッションファンデ＆BB: ${cleanCushion.length}件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    theme1_coffret: cleanCoffret,
    theme2_bodyoil: cleanBodyOil,
    theme3_cushion: cleanCushion
  };

  fs.writeFileSync('scratch/rakuten_winter_batch10_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ 取得結果を scratch/rakuten_winter_batch10_items.json に保存しました！');
}

fetchWinterBatch10Cosmetics().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
