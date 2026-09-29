import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch9Cosmetics() {
  console.log('❄️ [11-12月コスメ 第9弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 冬の粉ふき・すねの痒み・ひび割れを救う 高保湿ボディクリーム＆濃厚ボディバター・ミルク
  console.log('\n--- テーマ1: 冬の高保湿ボディクリーム＆濃厚ボディバター・ミルク ---');
  const bodyCreamQueries = [
    'ボディクリーム 高保湿 乾燥肌',
    'セタフィル モイスチャライジングクリーム 大容量',
    'ニュートロジーナ インテンスリペア ボディエマルジョン',
    'ローラメルシエ ボディクリーム アンバーバニラ',
    'イソップ Aesop レスレクション ボディバーム',
    'ザ ボディショップ ボディバター シア',
    'キュレル モイスチャーバーム',
    'ジョンソン エクストラケア アロマミルク'
  ];
  let bodyCreamItems = [];
  for (const q of bodyCreamQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      bodyCreamItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: タイツが引っかからないつるすべ素足へ 高保湿かかとフットクリーム＆角質集中ケア
  console.log('\n--- テーマ2: 冬の高保湿かかとフットクリーム＆角質集中ケア ---');
  const footCreamQueries = [
    'かかと 保湿クリーム ひび割れ 尿素',
    'ユースキン 120g ボトル',
    'メンソレータム ヒビプロ かかと',
    'ドクターショール かかと用 保湿クリーム',
    'ロコベースリペア かかとケアバーム',
    '小林製薬 かかとちゃん',
    'フットメジ 足用角質クリアハーブ石けん',
    '休足時間 かかとぷるぷるジェルシート'
  ];
  let footCreamItems = [];
  for (const q of footCreamQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      footCreamItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 寝ている間に感動のもちぷるハリツヤ肌へ 高保湿スリーピングマスク＆夜用ナイトリペアパック
  console.log('\n--- テーマ3: 冬の高保湿スリーピングマスク＆夜用ナイトリペアパック ---');
  const sleepingMaskQueries = [
    'スリーピングマスク 高保湿 パック',
    'ラネージュ ウォータースリーピングマスク',
    'ラネージュ バウンシースリーピングマスク',
    'エリクシール スリーピングジェルパック',
    'コスメデコルテ リポソーム アドバンスト リペアクリーム',
    'VT CICA スリーピングマスク',
    'ファミュ ローズウォーター スリーピングマスク',
    'キュレル 潤浸保湿 フェイスクリーム'
  ];
  let sleepingMaskItems = [];
  for (const q of sleepingMaskQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      sleepingMaskItems.push(...res);
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

  const cleanBodyCream = dedupe(bodyCreamItems);
  const cleanFootCream = dedupe(footCreamItems);
  const cleanSleepingMask = dedupe(sleepingMaskItems);

  console.log(`\n取得結果集計:`);
  console.log(`- ボディクリーム＆バター: ${cleanBodyCream.length}件`);
  console.log(`- かかとフットクリーム: ${cleanFootCream.length}件`);
  console.log(`- スリーピングマスク: ${cleanSleepingMask.length}件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    theme1_bodycream: cleanBodyCream,
    theme2_footcream: cleanFootCream,
    theme3_sleepingmask: cleanSleepingMask
  };

  fs.writeFileSync('scratch/rakuten_winter_batch9_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ 楽天API取得データを scratch/rakuten_winter_batch9_items.json に保存しました！');
}

fetchWinterBatch9Cosmetics().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
