import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch7Cosmetics() {
  console.log('❄️ [11-12月コスメ 第7弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 冬の深み粘膜リップ＆高保湿ルージュ・ティント
  console.log('\n--- テーマ1: 冬の深みカラー・高保湿ルージュ＆ティント ---');
  const lipQueries = [
    'リップ 口紅 高保湿 冬 ボルドー ブラウン',
    'KATE リップモンスター 03 05 07 10',
    'ディオール アディクト リップスティック',
    'シャネル ルージュ ココ ブルーム フラッシュ',
    'コスメデコルテ ルージュデコルテ',
    'リリミュウ ミューテッドシアーティント センシュアルフィックスティント',
    'ロムアンド ジューシーラスティングティント ディープ',
    'オペラ リップティント N'
  ];
  let lipItems = [];
  for (const q of lipQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      lipItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 冬の静電気・パサつきを防ぐサロン級高機能ドライヤー＆ストレートヘアアイロン
  console.log('\n--- テーマ2: 冬の高機能ドライヤー＆ヘアアイロン ---');
  const hairDeviceQueries = [
    'ドライヤー ナノケア 速乾 大風量 高浸透',
    'パナソニック ヘアードライヤー ナノケア EH-NA0J',
    'ReFa リファ ビューテック ドライヤー スマート プロ',
    'KINUJO 絹女 ヘアドライヤー KH201 KH202',
    'リファ ビューテック ストレートアイロン プロ',
    'KINUJO 絹女 ストレートアイロン LM-125',
    'サロニア スムースシャイン ストレートアイロン',
    'ダイソン スーパーソニック ヘアドライヤー'
  ];
  let hairDeviceItems = [];
  for (const q of hairDeviceQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      hairDeviceItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 冬の乾燥頭皮・フケ・かゆみを防ぐ高保湿スカルプシャンプー＆頭皮美容液エッセンス
  console.log('\n--- テーマ3: 冬の高保湿スカルプシャンプー＆頭皮美容液 ---');
  const scalpQueries = [
    'スカルプシャンプー 頭皮 保湿 乾燥 フケ かゆみ',
    'haru kurokami スカルプ シャンプー',
    'ルベル イオ リコミント クレンジング ルートサプリ',
    '資生堂 サブリミック アデノバイタル スカルプ パワーショット',
    'アヴェダ プラマサナ スカルプ トリートメント エッセンス',
    'オルナ オーガニック スカルプ シャンプー トリートメント',
    'ミルボン オージュア モイストカーム スカルプ ローション',
    'キュレル 頭皮保湿ローション'
  ];
  let scalpItems = [];
  for (const q of scalpQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      scalpItems.push(...res);
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

  const cleanLip = dedupe(lipItems);
  const cleanHairDevice = dedupe(hairDeviceItems);
  const cleanScalp = dedupe(scalpItems);

  console.log(`\n取得結果集計:`);
  console.log(`- 深み高保湿リップ: ${cleanLip.length}件`);
  console.log(`- 高機能ヘアケア家電: ${cleanHairDevice.length}件`);
  console.log(`- スカルプ＆頭皮美容液: ${cleanScalp.length}件`);

  const output = {
    theme1_lip: cleanLip.slice(0, 40),
    theme2_hair_device: cleanHairDevice.slice(0, 40),
    theme3_scalp: cleanScalp.slice(0, 40),
    fetchedAt: new Date().toISOString()
  };

  fs.writeFileSync('scratch/rakuten_winter_batch7_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('✅ scratch/rakuten_winter_batch7_items.json に保存しました！');
}

fetchWinterBatch7Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
