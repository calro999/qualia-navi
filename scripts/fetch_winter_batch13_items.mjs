import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch13Cosmetics() {
  console.log('❄️ [11-12月コスメ 第13弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026冬・寝ている間の摩擦＆静電気を完全防止】美髪シルクナイトキャップ＆シルク枕カバー
  console.log('\n--- テーマ1: 美髪シルクナイトキャップ＆シルク枕カバー ---');
  const silkHairQueries = [
    'シルク ナイトキャップ 絹100% ヘアケア',
    'Utukky ナイトキャップ シルク 渡辺直美',
    'COCOSILK ココシルク ナイトキャップ シルク100%',
    'シルク 枕カバー 25匁 洗える 片面 両面 ファスナー',
    'Utukky シルク 枕カバー 封筒式 25匁',
    'ココシルク シルク枕カバー ファスナー',
    'リリーシルク ナイトキャップ シルク 美髪',
    'ITSUKI ナイトキャップ 美髪 就寝用',
    'シルク ナイトキャップ ロングヘア ヘアキャップ',
    'シルク 枕カバー 美肌 美髪 保湿 摩擦軽減'
  ];
  let silkHairItems = [];
  for (const q of silkHairQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      silkHairItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・首元の横ジワ・乾燥たるみ・マフラー摩擦を撃退】高保湿ネッククリーム＆デコルテ集中ケア
  console.log('\n--- テーマ2: 高保湿ネッククリーム＆デコルテ集中ケア ---');
  const neckCreamQueries = [
    'ネッククリーム 首元 首のシワ 保湿 デコルテ',
    'クラランス ファーミング EX ネック ＆ デコルテ SP',
    'エリクシール ネックエッセンス 資生堂 首用美容液',
    'シスレー クレーム レパラトリス ネック デコルテ',
    'クレドポーボーテ クレームプールルクー エ デコルテ',
    'セルヴォーク リッチネッククリーム デコルテ',
    'べネフィーク レチノリフト ネックエッセンス',
    'ドクターシーラボ ACGマチュアリフト ネック',
    'メディリフト ネックシートマスク ヤーマン',
    'ネックライン クリーム レチノール 保湿 ナイアシンアミド'
  ];
  let neckCreamItems = [];
  for (const q of neckCreamQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      neckCreamItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬・目元の冷え・眼精疲労・青クマを温めて癒やす】充電式温感ホットアイマスク＆目元温熱ギア
  console.log('\n--- テーマ3: 充電式温感ホットアイマスク＆目元温熱ギア ---');
  const eyeMaskQueries = [
    'ホットアイマスク 充電式 温熱 コードレス',
    'SALUA ホットアイマスク 充電式 シルク',
    'RELX ホットアイマスク 充電式 温熱',
    'ドクターエア 3Dアイマジック リフレッシュ 目元',
    'NIPLUX EYE RELAX ホットアイマスク',
    'めぐりズム 蒸気でホットアイマスク 大容量 無香料 完熟ゆず',
    'MYTREX EYE AIR ホットアイマスク コードレス',
    'ルルド おやすみめめホット アイマスク 温熱',
    'アンサー ホットアイマスク 遮光 安眠 タイマー',
    '温感 アイマスク 目元エステ 疲れ目 クマ'
  ];
  let eyeMaskItems = [];
  for (const q of eyeMaskQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      eyeMaskItems.push(...res);
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

  const cleanedSilkHair = dedupe(silkHairItems);
  const cleanedNeckCream = dedupe(neckCreamItems);
  const cleanedEyeMask = dedupe(eyeMaskItems);

  console.log('\n=======================================');
  console.log(`✅ 取得完了:`);
  console.log(`- テーマ1 (シルクナイトキャップ＆枕カバー): ${cleanedSilkHair.length}件`);
  console.log(`- テーマ2 (ネッククリーム＆デコルテ): ${cleanedNeckCream.length}件`);
  console.log(`- テーマ3 (充電式ホットアイマスク): ${cleanedEyeMask.length}件`);
  console.log('=======================================\n');

  const outputData = {
    fetchedAt: new Date().toISOString(),
    theme1_silk_hair: cleanedSilkHair,
    theme2_neck_cream: cleanedNeckCream,
    theme3_eye_mask: cleanedEyeMask
  };

  fs.writeFileSync('scratch/rakuten_winter_batch13_items.json', JSON.stringify(outputData, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch13_items.json に保存しました！');
}

fetchWinterBatch13Cosmetics().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
