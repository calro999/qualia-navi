import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch17Cosmetics() {
  console.log('❄️ [11-12月コスメ 第17弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026冬・指先に宿す極上の冬映えと多幸感】高密着セルフネイルポリッシュ＆ホリデー限定速乾ネイル
  console.log('\n--- テーマ1: 高密着セルフネイルポリッシュ＆ホリデー限定速乾ネイル ---');
  const nailQueries = [
    'uka カラーベースコート ネイル ウカ',
    'OSAJI アップリフト ネイルカラー オサジ',
    'THREE ネイルポリッシュ スリー ネイル',
    'SHIRO 亜麻ネイル シロ ネイルカラー',
    'エクセル ネイルポリッシュ N サナ エクセル',
    'キャンメイク カラフルネイルズ CANMAKE ネイル',
    'Laka フルーティーグラムネイル ラカ',
    'アディクション ザ ネイルポリッシュ ＋ ADDICTION',
    'D-UP ディーアップ ネイルファンデーション',
    'リリミュウ ネイルポリッシュ 指原莉乃 Ririmew'
  ];
  let nailItems = [];
  for (const q of nailQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      nailItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・冷え切った肌を解きほぐす極上温感スチーム】フェイススチーマー＆ナノケア美顔器
  console.log('\n--- テーマ2: フェイススチーマー＆ナノケア美顔器 ---');
  const steamerQueries = [
    'パナソニック スチーマー ナノケア EH-SA3D コンパクト',
    'パナソニック スチーマー ナノケア EH-SA0B 温冷 化粧水ミスト',
    'SALONIA サロニア ピュアブライトスチーマー 美顔器',
    'ヤーマン ブライトクリーン スチーマー 美顔器 YAMAN',
    'ヤーマン フォトスチーマー IS-100P 美顔器',
    'FESTINO フェイシャル モイスト ナノスチーマー フェスティノ',
    'ツインバード フェイススチーマー SH-2787PW 美顔器',
    'ANLAN 温冷スチーマー 美顔器 ナノスチーマー',
    'ミーゼ スチーマー 美顔器 ヤーマン',
    'ナノスチーマー 美顔器 高保湿 毛穴ケア 温感'
  ];
  let steamerItems = [];
  for (const q of steamerQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      steamerItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬・コートに映える抜け感美眉】高密着アイブロウパレット＆垢抜けニュアンス眉マスカラ
  console.log('\n--- テーマ3: 高密着アイブロウパレット＆垢抜けニュアンス眉マスカラ ---');
  const eyebrowQueries = [
    'コスメデコルテ コントゥアリング パウダーアイブロウ DECORTE',
    'セルヴォーク インディケイト アイブロウパウダー Celvoke',
    'ケイト デザイニングアイブロウ3D KATE アイブロウパレット',
    'デジャヴュ アイブロウカラー 眉マスカラ フィルム眉カラー',
    'ロムアンド ハンオール ブロウカラ rom&nd 眉マスカラ',
    'ジルスチュアート ムースブロウマスカラ JILL STUART 眉',
    'フーミー アイブロウパウダー WHOMEE イガリシノブ',
    'エクセル パウダー＆ペンシル アイブロウEX excel',
    'キャンメイク スマートミニアイブロウカラー 極細ブラシ',
    'アンドビー アイブロウパレット be 河北裕介'
  ];
  let eyebrowItems = [];
  for (const q of eyebrowQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      eyebrowItems.push(...res);
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

  const cleanNail = dedupe(nailItems);
  const cleanSteamer = dedupe(steamerItems);
  const cleanEyebrow = dedupe(eyebrowItems);

  console.log(`\n取得結果まとめ:`);
  console.log(`- ネイルポリッシュ＆ケア: ${cleanNail.length} 件`);
  console.log(`- フェイススチーマー＆ナノケア: ${cleanSteamer.length} 件`);
  console.log(`- アイブロウパレット＆眉マスカラ: ${cleanEyebrow.length} 件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 17,
    theme1_nail: cleanNail.slice(0, 15),
    theme2_steamer: cleanSteamer.slice(0, 15),
    theme3_eyebrow: cleanEyebrow.slice(0, 15)
  };

  const outPath = 'scratch/rakuten_winter_batch17_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ ${outPath} に保存しました！`);
}

fetchWinterBatch17Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
