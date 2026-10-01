import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtraBatch13() {
  console.log('❄️ [11-12月コスメ 第13弾 追加・再取得] 楽天OpenAPI直接検索を開始します...');

  // 既存のデータを読み込み
  const currentData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch13_items.json', 'utf8'));

  // テーマ2: 【2026冬・首元の横ジワ・乾燥たるみ・マフラー摩擦を撃退】高保湿ネッククリーム＆デコルテ集中ケア
  const neckQueries = [
    'ネッククリーム',
    'クラランス ネック デコルテ',
    'クラランス ファーミング EX ネック',
    'エリクシール ネックエッセンス',
    '資生堂 リバイタル ネックゾーン エッセンス',
    'シスレー ネッククリーム',
    '首元 保湿 クリーム 美容液',
    'ネック トリートメント クリーム',
    'パーフェクトワン リンクルストレッチジェル 首',
    '北の快適工房 ネックエステミスト',
    '大正製薬 トリニティーライン 首元用 美容クリーム',
    'メディリフト ネック ヤーマン'
  ];

  let neckItems = [];
  for (const q of neckQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      neckItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3の追加検索（温感ホットアイマスク・目元ケア）
  const eyeExtraQueries = [
    'SALUA ホットアイマスク 充電式',
    'めぐりズム 蒸気でホットアイマスク 無香料',
    'めぐりズム 完熟ゆず',
    'パナソニック 目もとエステ',
    'NIPLUX EYE RELAX',
    'MYTREX ホットアイマスク',
    'ホットアイマスク シルク 充電式 コードレス'
  ];

  let eyeExtraItems = [];
  for (const q of eyeExtraQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      eyeExtraItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  function dedupe(existingList, newItems) {
    const seen = new Set();
    const result = [];
    for (const it of [...existingList, ...newItems]) {
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

  const mergedNeck = dedupe(currentData.theme2_neck_cream || [], neckItems);
  const mergedEye = dedupe(currentData.theme3_eye_mask || [], eyeExtraItems);

  console.log('\n=======================================');
  console.log(`✅ テーマ2 (ネッククリーム) 取得総数: ${mergedNeck.length}件`);
  console.log(`✅ テーマ3 (ホットアイマスク) 取得総数: ${mergedEye.length}件`);
  console.log('=======================================\n');

  currentData.theme2_neck_cream = mergedNeck;
  currentData.theme3_eye_mask = mergedEye;
  currentData.updatedAt = new Date().toISOString();

  fs.writeFileSync('scratch/rakuten_winter_batch13_items.json', JSON.stringify(currentData, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch13_items.json を更新しました！');
}

fetchExtraBatch13().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
