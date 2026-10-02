import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch18Cosmetics() {
  console.log('❄️ [11-12月コスメ 第18弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026冬・暖房乾燥でも毛穴落ち＆小ジワ割れゼロへ】高保湿ポアプライマー＆毛穴補正下地
  console.log('\n--- テーマ1: 高保湿ポアプライマー＆毛穴補正下地 ---');
  const primerQueries = [
    'クレドポーボーテ ヴォワールコレクチュールn 化粧下地',
    'コスメデコルテ フローレススキン グロウライザー 下地',
    'ポールアンドジョー モイスチュアライジング ファンデーション プライマー',
    'ローラメルシエ ピュアキャンバスプライマー ハイドレーティング',
    'エテュセ フェイスエディション プライマー 部分用下地',
    'キャンメイク ポアレスエアリーベース 化粧下地',
    'キス マットシフォン UVホワイトニングベース',
    'マキアージュ ドラマティックスキンセンサーベース NEO',
    'ジルスチュアート イルミネイティング セラムプライマー',
    'エレガンス モデリング カラーアップ ベース'
  ];
  let primerItems = [];
  for (const q of primerQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      primerItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・カチコチ乾燥肌をふっくら解きほぐす】高純度ブースターオイル＆導入美容オイル
  console.log('\n--- テーマ2: 高純度ブースターオイル＆導入美容オイル ---');
  const oilQueries = [
    'メルヴィータ ビオオイル アルガンオイル 50ml',
    'RMK Wトリートメントオイル 導入 オイル',
    'HABA ハーバー 高品位 スクワラン オイル 30ml',
    'トリロジー ローズヒップオイル 美容オイル',
    'コスメデコルテ AQ オイルインフュージョン 美容オイル',
    'アルビオン ハーバルオイル トリニティフュージョン',
    'ファミュ アイディアルオイル FEMMUE',
    'クラランス プラント フェイス オイル デハイドレイテッドスキン',
    'エトヴォス ミネラルインナートリートメントオイル ETVOS',
    '無印良品 ホホバオイル 200ml'
  ];
  let oilItems = [];
  for (const q of oilQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      oilItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬・冷風＆涙目でもにじまない垢抜け美束まつ毛】高密着お湯落ちマスカラ＆ニュアンスカラーマスカラ
  console.log('\n--- テーマ3: 高密着お湯落ちマスカラ＆ニュアンスカラーマスカラ ---');
  const mascaraQueries = [
    'デジャヴュ 塗るつけまつげ ラッシュアップ マスカラ',
    'ディーアップ パーフェクトエクステンションマスカラ for カール DUP',
    'ヒロインメイク マイクロマスカラ アドバンストフィルム お湯落ち',
    'エテュセ アイエディション マスカラベース まつ毛美容液',
    'メイベリン スカイハイ マスカラ お湯オフ ロング',
    'エレガンス グラヴィティレス マスカラ Elegance',
    'キャンメイク クイックラッシュカーラー セパレート',
    'ウォンジョンヨ ヌードアイラッシュ マスカラ Wonjungyo',
    'オペラ マイラッシュ アドバンスト マスカラ',
    'ロムアンド オールハンロングアッシュ マスカラ rom&nd'
  ];
  let mascaraItems = [];
  for (const q of mascaraQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      mascaraItems.push(...res);
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

  const cleanPrimer = dedupe(primerItems);
  const cleanOil = dedupe(oilItems);
  const cleanMascara = dedupe(mascaraItems);

  console.log(`\n取得結果まとめ:`);
  console.log(`- 高保湿ポアプライマー＆補正下地: ${cleanPrimer.length} 件`);
  console.log(`- 導入美容オイル＆ブースターオイル: ${cleanOil.length} 件`);
  console.log(`- お湯落ち＆ニュアンスカラーマスカラ: ${cleanMascara.length} 件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 18,
    theme1_primer: cleanPrimer.slice(0, 15),
    theme2_oil: cleanOil.slice(0, 15),
    theme3_mascara: cleanMascara.slice(0, 15)
  };

  const outPath = 'scratch/rakuten_winter_batch18_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ ${outPath} に保存しました！`);
}

fetchWinterBatch18Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
