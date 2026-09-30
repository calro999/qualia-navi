import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch11Cosmetics() {
  console.log('❄️ [11-12月コスメ 第11弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026冬・朝のつっぱり＆乾燥崩れゼロへ】泡立たない高保湿朝洗顔・温感ジュレ洗顔
  console.log('\n--- テーマ1: 泡立たない高保湿朝洗顔・温感ジュレ洗顔 ---');
  const morningCleanserQueries = [
    '朝用洗顔 ジェル 泡立たない 保湿',
    'カネボウ スクラビング マッド ウォッシュ 洗顔',
    'カネボウ コンフォート ストレッチィ ウォッシュ',
    'LAGOM ラゴム ジェルトゥウォーター クレンザー 朝洗顔',
    'ルナソル スムージング ジェルウォッシュ 洗顔',
    'マナラ モイストウォッシュゲル 朝用洗顔',
    'エスト クラリファイイング ジェル ウォッシュ',
    'オルビス アクアニスト ジェルウォッシュ 洗顔',
    'ソフィーナiP ポア クリアリング ジェル ウォッシュ',
    'ビオレ おうちdeエステ 肌をなめらかにするマッサージ洗顔ジェル'
  ];
  let morningCleanserItems = [];
  for (const q of morningCleanserQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      morningCleanserItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・砂漠肌をうるおす濃密とろみ浸透】高保湿エイジングケア化粧水＆エッセンスローション
  console.log('\n--- テーマ2: 高保湿エイジングケア化粧水＆エッセンスローション ---');
  const lotionQueries = [
    '高保湿 化粧水 とろみ セラミド',
    'コスメデコルテ イドラクラリティ 薬用 トリートメント エッセンス ウォーター',
    'SK-II フェイシャルトリートメントエッセンス 230ml',
    'IPSA イプサ ザ タイムR アクア 200ml 化粧水',
    'カルテHD 高保湿ローション 化粧水',
    'オルビスユードット エッセンスローション つめかえ',
    'アクセーヌ モイストバランス ローション 360ml',
    'キュレル ディープモイスチャースプレー 250g',
    '肌ラボ 極潤プレミアム ヒアルロン液 化粧水',
    'アルビオン フローラドリップ 化粧液 160ml'
  ];
  let lotionItems = [];
  for (const q of lotionQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      lotionItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬・静電気＆乾燥パサつき完全ブロック】濃厚補修ヘアミルク＆洗い流さないアウトバストリートメント
  console.log('\n--- テーマ3: 濃厚補修ヘアミルク＆洗い流さないアウトバストリートメント ---');
  const hairMilkQueries = [
    'ヘアミルク 洗い流さない トリートメント 保湿',
    'オルビス エッセンスインヘアミルク ボトル',
    'ミルボン エルジューダ エマルジョン プラス',
    'オッジィオット セラムCMCミルキィ',
    '資生堂 サブリミック ワンダーシールド',
    'ナプラ N. エヌドット シアミルク 洗い流さないトリートメント',
    'モロッカンオイル オールインワン リーブイン コンディショナー',
    'ラ・カスタ アロマエステ ヘアエマルジョン',
    'ジョンマスターオーガニック R&Aヘアミルク N',
    'ダイアン ボヌール ナイトドリームティー ヘアミルク'
  ];
  let hairMilkItems = [];
  for (const q of hairMilkQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      hairMilkItems.push(...res);
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

  const cleanMorning = dedupe(morningCleanserItems);
  const cleanLotion = dedupe(lotionItems);
  const cleanHairMilk = dedupe(hairMilkItems);

  console.log(`\n取得結果集計:`);
  console.log(`- 朝用洗顔・ジュレ洗顔: ${cleanMorning.length}件`);
  console.log(`- 高保湿化粧水・エッセンスローション: ${cleanLotion.length}件`);
  console.log(`- ヘアミルク・アウトバストリートメント: ${cleanHairMilk.length}件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    theme1_morning_cleanser: cleanMorning,
    theme2_rich_lotion: cleanLotion,
    theme3_hair_milk: cleanHairMilk
  };

  fs.writeFileSync('scratch/rakuten_winter_batch11_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ 取得結果を scratch/rakuten_winter_batch11_items.json に保存しました！');
}

fetchWinterBatch11Cosmetics().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
