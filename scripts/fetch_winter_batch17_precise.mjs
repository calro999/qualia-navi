import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch17Precise() {
  console.log('💎 [11-12月コスメ 第17弾] 厳選10ブランド×3テーマ（計30商品）のピンポイント直接取得を開始します...');

  // --- テーマ1: 高密着セルフネイルポリッシュ＆ホリデー限定速乾ネイル ---
  const queriesTheme1 = [
    { brand: 'uka', query: 'uka カラーベースコート ゼロ' },
    { brand: 'OSAJI', query: 'OSAJI アップリフト ネイルカラー' },
    { brand: 'THREE', query: 'THREE ネイルポリッシュ' },
    { brand: 'SHIRO', query: 'SHIRO 亜麻ネイル' },
    { brand: 'excel', query: 'エクセル ネイルポリッシュ N' },
    { brand: 'CANMAKE', query: 'キャンメイク カラフルネイルズ' },
    { brand: 'Laka', query: 'Laka フルーティーグラムネイル' },
    { brand: 'ADDICTION', query: 'アディクション ザ ネイルポリッシュ' },
    { brand: 'D-UP', query: 'ディーアップ ネイルファンデーション' },
    { brand: 'Ririmew', query: 'リリミュウ ネイルポリッシュ' }
  ];

  // --- テーマ2: フェイススチーマー＆ナノケア美顔器 ---
  const queriesTheme2 = [
    { brand: 'Panasonic Compact', query: 'パナソニック スチーマー ナノケア EH-SA3D' },
    { brand: 'Panasonic Mist', query: 'パナソニック スチーマー ナノケア EH-SA0B' },
    { brand: 'SALONIA', query: 'サロニア ピュアブライトスチーマー' },
    { brand: 'YA-MAN Clean', query: 'ヤーマン ブライトクリーン スチーマー' },
    { brand: 'YA-MAN Photo', query: 'ヤーマン フォトスチーマー IS-100P' },
    { brand: 'FESTINO', query: 'フェスティノ フェイシャル モイスト ナノスチーマー' },
    { brand: 'TWINBIRD', query: 'ツインバード フェイススチーマー SH-2787PW' },
    { brand: 'ANLAN', query: 'ANLAN 温冷スチーマー 美顔器' },
    { brand: 'myse', query: 'ミーゼ スチーマー ヤーマン' },
    { brand: 'belulu', query: '美ルル ウルミスト スチーマー' }
  ];

  // --- テーマ3: 高密着アイブロウパレット＆垢抜けニュアンス眉マスカラ ---
  const queriesTheme3 = [
    { brand: 'COSME DECORTE', query: 'コスメデコルテ コントゥアリング パウダーアイブロウ' },
    { brand: 'Celvoke', query: 'セルヴォーク インディケイト アイブロウパウダー' },
    { brand: 'KATE', query: 'ケイト デザイニングアイブロウ3D' },
    { brand: 'dejavu', query: 'デジャヴュ アイブロウカラー 眉マスカラ' },
    { brand: 'rom&nd', query: 'ロムアンド ハンオール ブロウカラ' },
    { brand: 'JILL STUART', query: 'ジルスチュアート ムースブロウマスカラ' },
    { brand: 'WHOMEE', query: 'フーミー アイブロウパウダー' },
    { brand: 'excel', query: 'エクセル パウダー＆ペンシル アイブロウEX' },
    { brand: 'CANMAKE', query: 'キャンメイク スマートミニアイブロウカラー' },
    { brand: 'andbe', query: 'アンドビー アイブロウパレット' }
  ];

  async function fetchGroup(queries) {
    const results = [];
    for (const q of queries) {
      try {
        const items = await searchRakutenDirect(q.query, 6, '-reviewCount');
        // 最も適切で評価が高く、画像があり中古・訳ありでないアイテムを1つ選定
        const validItem = items.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('古着') && !it.itemName.includes('訳あり') && !it.itemName.includes('アウトレット'));
        if (validItem) {
          results.push({ brandKey: q.brand, ...validItem });
        } else if (items.length > 0) {
          results.push({ brandKey: q.brand, ...items[0] });
        }
      } catch (err) {
        console.warn(`Query failed (${q.brand}): ${err.message}`);
      }
      await sleep(1300);
    }
    return results;
  }

  console.log('\n--- テーマ1: 高密着セルフネイルポリッシュ＆速乾ネイル 取得中 ---');
  const itemsTheme1 = await fetchGroup(queriesTheme1);
  console.log(`テーマ1 取得完了: ${itemsTheme1.length} 件`);

  console.log('\n--- テーマ2: フェイススチーマー＆ナノケア美顔器 取得中 ---');
  const itemsTheme2 = await fetchGroup(queriesTheme2);
  console.log(`テーマ2 取得完了: ${itemsTheme2.length} 件`);

  console.log('\n--- テーマ3: 高密着アイブロウパレット＆眉マスカラ 取得中 ---');
  const itemsTheme3 = await fetchGroup(queriesTheme3);
  console.log(`テーマ3 取得完了: ${itemsTheme3.length} 件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 17,
    theme1_nail: itemsTheme1,
    theme2_steamer: itemsTheme2,
    theme3_eyebrow: itemsTheme3
  };

  const outPath = 'scratch/rakuten_winter_batch17_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ 厳選各10商品（計${itemsTheme1.length + itemsTheme2.length + itemsTheme3.length}件）を ${outPath} に保存しました！`);
}

fetchWinterBatch17Precise().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
