import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch16Precise() {
  console.log('💎 [11-12月コスメ 第16弾] 厳選10ブランドのピンポイント直接取得を開始します...');

  // --- テーマ1: ホリデーアイシャドウパレット＆深みウォームカラー ---
  const queriesTheme1 = [
    { brand: 'SUQQU', query: 'SUQQU シグニチャー カラー アイズ' },
    { brand: 'LUNASOL', query: 'ルナソル アイカラーレーション' },
    { brand: 'Dior', query: 'ディオール サンク クルール アイシャドウ' },
    { brand: 'CHANEL', query: 'シャネル レキャトルオンブル' },
    { brand: 'ADDICTION', query: 'アディクション ザ アイシャドウ パレット' },
    { brand: 'excel', query: 'エクセル スキニーリッチシャドウ' },
    { brand: 'CANMAKE', query: 'キャンメイク シルキースフレアイズ' },
    { brand: 'dasique', query: 'デイジーク シャドウパレット' },
    { brand: 'CLIO', query: 'クリオ プロ アイ パレット' },
    { brand: 'COSME DECORTE', query: 'コスメデコルテ アイグロウジェム スキンシャドウ' }
  ];

  // --- テーマ2: 高保湿UVデイクリーム＆日中用プロテクト美容液 ---
  const queriesTheme2 = [
    { brand: 'KANEBO', query: 'カネボウ クリーム イン デイ 40g' },
    { brand: 'KANEBO Veil', query: 'カネボウ ヴェイル オブ デイ 40g' },
    { brand: 'COSME DECORTE', query: 'コスメデコルテ サンシェルター トーンアップCC' },
    { brand: 'ORBIS', query: 'オルビス リンクルブライトUVプロテクター 50g' },
    { brand: 'ELIXIR', query: 'エリクシール デーケアレボリューション SP+' },
    { brand: 'Obagi', query: 'オバジC デイセラムUV 30g' },
    { brand: 'LA ROCHE-POSAY', query: 'ラロッシュポゼ UVイデア XL トーンアップ' },
    { brand: 'POLA', query: 'POLA BA ライトセレクター' },
    { brand: 'Curel', query: 'キュレル 潤浸保湿 UVエッセンス 50g' },
    { brand: 'ASTALIFT', query: 'アスタリフト D-UVクリア ホワイトソリューション' }
  ];

  // --- テーマ3: 予算別ホリデーギフトコスメ＆冬のご褒美ビューティー ---
  const queriesTheme3 = [
    { brand: 'Dior', query: 'ディオール アディクト リップ マキシマイザー' },
    { brand: 'CHANEL', query: 'シャネル ミロワール ドゥーブル ファセット' },
    { brand: 'Aesop', query: 'イソップ レスレクション ハンドウォッシュ 500ml' },
    { brand: 'SHIRO', query: 'SHIRO サボン ヘアミスト 80ml' },
    { brand: 'Jo Malone', query: 'ジョーマローン イングリッシュペアー コロン 30ml' },
    { brand: 'uka', query: 'uka スカルプブラシ ケンザン' },
    { brand: 'SABON', query: 'サボン ボディスクラブ 320g' },
    { brand: 'BAUM', query: 'バウム アロマティック ハンドウォッシュ 300ml' },
    { brand: 'JILL STUART', query: 'ジルスチュアート ハンドクリーム リップバーム ギフト' },
    { brand: 'ReFa', query: 'ReFa リファ ハートブラシ' }
  ];

  async function fetchGroup(queries) {
    const results = [];
    for (const q of queries) {
      try {
        const items = await searchRakutenDirect(q.query, 6, '-reviewCount');
        // 最も適切で評価が高く、画像があり中古でないアイテムを1つ選定
        const validItem = items.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
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

  console.log('\n--- テーマ1: ホリデーアイシャドウパレット 取得中 ---');
  const itemsTheme1 = await fetchGroup(queriesTheme1);
  console.log(`テーマ1 取得完了: ${itemsTheme1.length} 件`);

  console.log('\n--- テーマ2: 高保湿UVデイクリーム 取得中 ---');
  const itemsTheme2 = await fetchGroup(queriesTheme2);
  console.log(`テーマ2 取得完了: ${itemsTheme2.length} 件`);

  console.log('\n--- テーマ3: ホリデーギフトコスメ 取得中 ---');
  const itemsTheme3 = await fetchGroup(queriesTheme3);
  console.log(`テーマ3 取得完了: ${itemsTheme3.length} 件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 16,
    theme1_eyeshadow: itemsTheme1,
    theme2_daycream: itemsTheme2,
    theme3_gift: itemsTheme3
  };

  const outPath = 'scratch/rakuten_winter_batch16_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ 厳選各10商品（計${itemsTheme1.length + itemsTheme2.length + itemsTheme3.length}件）を ${outPath} に保存しました！`);
}

fetchWinterBatch16Precise().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
