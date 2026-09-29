import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch6Cosmetics() {
  console.log('❄️ [11-12月コスメ 第6弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 冬のごわつき肌・角質肥厚をほぐす導入美容液＆角質ケア（ブースター）
  console.log('\n--- テーマ1: 冬の導入美容液・ブースター・角質ピール ---');
  const boosterQueries = [
    '導入美容液 ブースター 冬 保湿',
    'タカミスキンピール 角質美容水',
    'コスメデコルテ リポソーム アドバンスト リペアセラム',
    'ランコム ジェニフィック アドバンスト N 美容液',
    'ソフィーナiP ベースケア セラム 土台美容液',
    'VT リードルショット 100 300 導入',
    'カネボウ オン スキン エッセンス',
    'アルビオン エクラフチュール t 美容液'
  ];
  let boosterItems = [];
  for (const q of boosterQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      boosterItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 冬の青ぐすみ・血色不良を払拭！高保湿トーンアップ化粧下地＆CCクリーム
  console.log('\n--- テーマ2: 冬の高保湿トーンアップ下地＆CCクリーム ---');
  const toneupQueries = [
    '化粧下地 トーンアップ 高保湿 冬',
    'クレドポーボーテ ヴォワールコレクチュールn 下地',
    'ラロッシュポゼ UVイデア トーンアップ ローズ',
    'ポール&ジョー モイスチュアライジング プライマー',
    'コスメデコルテ サンシェルター トーンアップCC 01',
    'ダルバ ウォータフル トーンアップ サンクリーム',
    'ナンバーズイン 3番 ノーファンデ陶器肌',
    'エクセル モチベートユアスキン 下地'
  ];
  let toneupItems = [];
  for (const q of toneupQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      toneupItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 11-12月ボーナス＆ホリデーご褒美！冬の本格リフトケア・RF温感美顔器＆EMSスカルプ美顔器
  console.log('\n--- テーマ3: 冬の本格リフトケア・RF温感美顔器＆EMSギア ---');
  const deviceQueries = [
    '美顔器 RF リフトケア EMS 温感',
    'ヤーマン フォトプラス シャイニー 美顔器',
    'パナソニック バイタリフト RF EH-SR85',
    'SALONIA サロニア EMS リフトブラシ',
    'ミーゼ スカルプリフト アクティブ プラス',
    'メディキューブ AGE-R ブースタープロ',
    'ヤーマン キャビスパ 360',
    'ANLAN 温冷美顔器 リフトケア'
  ];
  let deviceItems = [];
  for (const q of deviceQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      deviceItems.push(...res);
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

  const cleanBooster = dedupe(boosterItems);
  const cleanToneup = dedupe(toneupItems);
  const cleanDevice = dedupe(deviceItems);

  console.log(`\n取得結果集計:`);
  console.log(`- 導入美容液・ブースター: ${cleanBooster.length}件`);
  console.log(`- 高保湿トーンアップ下地: ${cleanToneup.length}件`);
  console.log(`- 本格RF温感・EMS美顔器: ${cleanDevice.length}件`);

  const output = {
    theme1_booster: cleanBooster.slice(0, 40),
    theme2_toneup: cleanToneup.slice(0, 40),
    theme3_device: cleanDevice.slice(0, 40),
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch6_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_batch6_items.json に保存しました！');
}

fetchWinterBatch6Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
