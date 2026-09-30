import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch12Cosmetics() {
  console.log('❄️ [11-12月コスメ 第12弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026冬・目元の乾燥割れ＆くすみクマ完全消去】高保湿美容液コンシーラー＆目元密着リキッドコンシーラー
  console.log('\n--- テーマ1: 高保湿美容液コンシーラー＆密着リキッドコンシーラー ---');
  const concealerQueries = [
    '高保湿 コンシーラー 美容液 リキッド',
    'ディオールスキン フォーエヴァー スキン コレクト コンシーラー',
    'NARS ラディアント クリーミー コンシーラー',
    'コスメデコルテ トーンパーフェクティング パレット',
    '資生堂 エッセンス スキングロウ コンシーラー',
    'TIRTIR マスクフィット オールカバー デュアルコンシーラー',
    'ザセム カバーパーフェクション チップコンシーラー',
    'アンドビー ファンシーラー be',
    'ルナソル シームレスカバースキンコンシーラー',
    'イプサ クリエイティブコンシーラーe'
  ];
  let concealerItems = [];
  for (const q of concealerQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      concealerItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・ニット摩擦＆乾燥パサつきに負けない濡れツヤ束感】高保湿ヘアバーム＆スタイリングバター
  console.log('\n--- テーマ2: 高保湿ヘアバーム＆スタイリングバター ---');
  const hairBalmQueries = [
    'ヘアバーム オーガニック スタイリング 保湿',
    'N. エヌドット ナチュラルバーム 45g',
    'ザ・プロダクト ヘアワックス オーガニック 42g',
    'track トラック バーム 40g',
    'リンクオリジナルメーカーズ ヘアバーム 997',
    'ジェミールフラン メルティバター バーム 40g',
    'ジョンマスターオーガニック ナチュラルバーム M&C',
    'アリミノ ダンスデザインチューナー モダンシマー バーム',
    'ボタニスト ボタニカル ヘアバーム 32g',
    'ダイアン ボヌール オーガニック ヘアバーム'
  ];
  let hairBalmItems = [];
  for (const q of hairBalmQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      hairBalmItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬・外出先でも粉ふき・乾燥小ジワを即効リセット】高保湿スティック美容液＆SOSレスキューマルチバーム
  console.log('\n--- テーマ3: 高保湿スティック美容液＆SOSレスキューマルチバーム ---');
  const stickBalmQueries = [
    'スティック美容液 保湿 バーム メイクの上から',
    'KAHI カヒ リンクルバウンス マルチバーム',
    'イプサ ザ・タイムR デイエッセンス スティック',
    'イハダ 薬用バーム 20g',
    'キュレル 潤浸保湿 モイストバーム 70g',
    'クラブ エアリータッチ デイエッセンス スティック美容液',
    'コスメデコルテ 薬用 デイセラム スティック',
    'dプログラム 薬用 スキンリペアクリーム バーム',
    'ロクシタン シアバター 150ml 保湿バーム',
    'メルヴィータ タッチオブオイル スティック'
  ];
  let stickBalmItems = [];
  for (const q of stickBalmQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      stickBalmItems.push(...res);
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

  const cleanConcealer = dedupe(concealerItems);
  const cleanHairBalm = dedupe(hairBalmItems);
  const cleanStickBalm = dedupe(stickBalmItems);

  console.log(`\n=== 取得結果サマリー ===`);
  console.log(`テーマ1 (美容液コンシーラー): 生データ=${concealerItems.length}件 -> 重複除外後=${cleanConcealer.length}件`);
  console.log(`テーマ2 (ヘアバーム): 生データ=${hairBalmItems.length}件 -> 重複除外後=${cleanHairBalm.length}件`);
  console.log(`テーマ3 (スティック美容液・バーム): 生データ=${stickBalmItems.length}件 -> 重複除外後=${cleanStickBalm.length}件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    theme1_concealer: cleanConcealer,
    theme2_hair_balm: cleanHairBalm,
    theme3_stick_balm: cleanStickBalm
  };

  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch', { recursive: true });
  }

  fs.writeFileSync('scratch/rakuten_winter_batch12_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('🎉 scratch/rakuten_winter_batch12_items.json に全取得アイテムを正常保存しました！');
}

fetchWinterBatch12Cosmetics().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
