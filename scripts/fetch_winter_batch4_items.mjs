import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch4Cosmetics() {
  console.log('❄️ [11-12月コスメ 第4弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 冬の保湿メイクキープミスト＆オイルインミスト化粧水（暖房乾燥・崩れ防止）
  console.log('\n--- テーマ1: 保湿メイクキープミスト＆オイルインミスト ---');
  const mistQueries = [
    'メイクキープミスト 保湿 乾燥肌 冬',
    'オイルインミスト 化粧水 つや肌',
    'ダルバ ファーストスプレーセラム',
    'コスメデコルテ コンフォートデイミスト',
    'クラランス フィックス メイクアップ',
    'エリクシール つや玉ミスト',
    'コーセー メイクキープミスト モイスト',
    'CNP プロポリス ミスト'
  ];
  let mistItems = [];
  for (const q of mistQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      mistItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 冬の温感クレンジングバーム＆とろけるホットクレンジング（毛穴温活・乾燥くすみオフ）
  console.log('\n--- テーマ2: 温感クレンジングバーム＆ホットクレンジング ---');
  const warmCleansingQueries = [
    '温感 クレンジングバーム 毛穴 ホット',
    'マナラ ホットクレンジングゲル',
    'DUO クレンジングバーム ホット',
    'アテニア スキンクリア クレンズオイル',
    'シュウウエムラ アルティム8 クレンジングオイル',
    'バニラコ クレンジングバーム',
    'スキンビル ホットクレンジングジェル',
    'カネボウ メロウ オフ ヴェイル'
  ];
  let cleansingItems = [];
  for (const q of warmCleansingQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      cleansingItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 冬フレグランス＆高保湿練り香水（バニラ・ウッディ・ムスク・ホリデーギフト）
  console.log('\n--- テーマ3: 冬フレグランス＆高保湿練り香水 ---');
  const fragranceQueries = [
    '冬 香水 バニラ ウッディ ムスク',
    'メゾンマルジェラ レプリカ ファイヤープレイス',
    'ジョーマローン 香水 ギフト コロン',
    'SHIRO 香水 サボン ホワイトリリー',
    'AUX PARADIS ウィンターベリー オードパルファム',
    'ディプティック 香水 オードトワレ',
    'ローラメルシエ アンバーバニラ 香水',
    '練り香水 ソリッドパフューム レディース'
  ];
  let fragranceItems = [];
  for (const q of fragranceQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      fragranceItems.push(...res);
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
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり')) continue;
      if (!seen.has(it.itemCode) && !seen.has(it.itemName)) {
        seen.add(it.itemCode);
        seen.add(it.itemName);
        result.push(it);
      }
    }
    return result;
  }

  const cleanMist = dedupe(mistItems);
  const cleanCleansing = dedupe(cleansingItems);
  const cleanFragrance = dedupe(fragranceItems);

  console.log(`\n取得結果集計:`);
  console.log(`- 保湿ミスト: ${cleanMist.length}件`);
  console.log(`- 温感クレンジング: ${cleanCleansing.length}件`);
  console.log(`- 冬フレグランス: ${cleanFragrance.length}件`);

  const output = {
    theme1_mist: cleanMist.slice(0, 35),
    theme2_cleansing: cleanCleansing.slice(0, 35),
    theme3_fragrance: cleanFragrance.slice(0, 35),
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch4_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_batch4_items.json に保存しました！');
}

fetchWinterBatch4Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
