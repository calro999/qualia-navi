import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch5Cosmetics() {
  console.log('❄️ [11-12月コスメ 第5弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 冬の目元・口元集中リンクル＆アイケア（レチノール・ペプチド・マイクロニードル）
  console.log('\n--- テーマ1: 冬のアイケア・リンクルケア・目元口元集中ケア ---');
  const eyeCareQueries = [
    'アイクリーム レチノール シワ 目元',
    'エリクシール レチノパワー リンクルクリーム',
    'ポーラ リンクルショット メディカルセラム',
    'コスメデコルテ リポソーム アドバンスト リペアアイセラム',
    'なめらか本舗 リンクルアイクリーム N',
    'ヒアロディープパッチ マイクロニードル',
    'キールズ レチノール 美容液 アイクリーム',
    'クラランス ダブルセーラム アイ'
  ];
  let eyeCareItems = [];
  for (const q of eyeCareQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      eyeCareItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 冬の高保湿フェイスパック＆濃密シートマスク（くすみ・ゴワつき・前夜集中レスキュー）
  console.log('\n--- テーマ2: 冬の高保湿フェイスパック＆シートマスク ---');
  const maskQueries = [
    'フェイスパック 高保湿 シートマスク 冬',
    'ルルルン ハイドラ EX マスク',
    'ルルルン プレシャス RED',
    'ダーマレーザー スーパー セラミド100 マスク',
    'メディヒール N.M.F アクア アンプルマスク',
    'トリデン ダイブイン マスク パック',
    'VT リードルショット パック マスク',
    'SK-II フェイシャルトリートメント マスク'
  ];
  let maskItems = [];
  for (const q of maskQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      maskItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 冬の乾燥崩れ防止・しっとり微粒子フェイスパウダー（粉っぽさゼロ・ツヤキープ）
  console.log('\n--- テーマ3: 冬の乾燥しないしっとりフェイスパウダー ---');
  const powderQueries = [
    'フェイスパウダー 乾燥しない 冬 しっとり',
    'コスメデコルテ ルースパウダー 00',
    'ミラノコレクション 2026 フェイスパウダー',
    'エレガンス ラプードル オートニュアンス',
    'NARS ライトリフレクティングセッティングパウダー プレスト',
    'エクセル エクストラリッチパウダー',
    'カネボウ シャドウオンフェース フェイスパウダー',
    'チャコット ラスティングベース パウダー モイスト'
  ];
  let powderItems = [];
  for (const q of powderQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      powderItems.push(...res);
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
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり') || it.itemName.includes('アウトレット')) continue;
      if (!seen.has(it.itemCode) && !seen.has(it.itemName)) {
        seen.add(it.itemCode);
        seen.add(it.itemName);
        result.push(it);
      }
    }
    return result;
  }

  const cleanEyeCare = dedupe(eyeCareItems);
  const cleanMask = dedupe(maskItems);
  const cleanPowder = dedupe(powderItems);

  console.log(`\n取得結果集計:`);
  console.log(`- アイケア・リンクルケア: ${cleanEyeCare.length}件`);
  console.log(`- 高保湿フェイスマスク: ${cleanMask.length}件`);
  console.log(`- しっとりフェイスパウダー: ${cleanPowder.length}件`);

  const output = {
    theme1_eyecare: cleanEyeCare.slice(0, 40),
    theme2_mask: cleanMask.slice(0, 40),
    theme3_powder: cleanPowder.slice(0, 40),
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch5_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_batch5_items.json に保存しました！');
}

fetchWinterBatch5Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
