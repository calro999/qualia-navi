import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch15Precise() {
  console.log('💎 [11-12月コスメ 第15弾] 厳選10ブランドのピンポイント取得を開始します...');

  // --- テーマ1: ハンドクリーム＆ネイルオイル ---
  const queriesTheme1 = [
    { brand: 'L\'OCCITANE', query: 'ロクシタン シア ハンドクリーム 30ml' },
    { brand: 'Aesop', query: 'イソップ レスレクション ハンドバーム 75ml' },
    { brand: 'uka', query: 'uka ネイルオイル ベーシック 爪' },
    { brand: 'atrix', query: 'アトリックス ビューティーチャージ ナイトスペリア' },
    { brand: 'yuskin', query: 'ユースキン 120g ポンプ 指定医薬部外品' },
    { brand: 'SHIRO', query: 'SHIRO ホワイトリリー ハンド美容液' },
    { brand: 'JILL STUART', query: 'ジルスチュアート ハンドクリーム ホワイトフローラル' },
    { brand: '健栄製薬/ヒルマイルド', query: 'ヒルマイルド クリーム 60g 健栄製薬 医薬品' },
    { brand: 'OPI', query: 'OPI プロスパ キューティクル オイル ネイル' },
    { brand: 'Kneipp', query: 'クナイプ ハンドクリーム バニラ ハニー 75ml' }
  ];

  // --- テーマ2: 重炭酸入浴剤＆バスソルト ---
  const queriesTheme2 = [
    { brand: 'BARTH', query: 'BARTH 薬用 中性 重炭酸入浴剤 90錠' },
    { brand: 'Kneipp', query: 'クナイプ バスソルト ホップ バレリアン 850g' },
    { brand: 'AYURA', query: 'アユーラ メディテーションバスt 300ml' },
    { brand: 'Sea Crystals', query: 'シークリスタルス エプソムソルト 2.2kg' },
    { brand: 'BARAKA', query: 'BARAKA ジョルダニアン デッドシー ソルト' },
    { brand: 'HOT TAB', query: '薬用 ホットタブ 重炭酸湯 Classic 45錠' },
    { brand: 'きき湯', query: 'きき湯 ファインヒート スマートモデル 400g' },
    { brand: 'SHIRO', query: 'SHIRO ホワイトリリー クレイ バスソルト' },
    { brand: 'WELEDA', query: 'ヴェレダ アルニカ バスミルク 200ml' },
    { brand: 'バブ', query: 'バブ メディキュア ほぐし 炭酸 入浴剤' }
  ];

  // --- テーマ3: リップマスク＆リップバーム ---
  const queriesTheme3 = [
    { brand: 'LANEIGE', query: 'ラネージュ リップスリーピングマスク ベリー 20g' },
    { brand: 'TAKAMI', query: 'タカミリップ 7g 唇用美容液 公式' },
    { brand: 'Obagi', query: 'オバジ ダーマパワーX リップエッセンス 10g' },
    { brand: 'Curel', query: 'キュレル リップケアバーム 4.2g 医薬部外品' },
    { brand: 'Torriden', query: 'トリデン ソリッドイン セラミド リップエッセンス' },
    { brand: 'REVLON', query: 'レブロン キス シュガースクラブ 角質ケア' },
    { brand: 'モアリップ', query: 'モアリップ 8g 第3類医薬品 口唇炎' },
    { brand: 'Dior', query: 'ディオール アディクト リップ グロウ オイル' },
    { brand: 'CLARINS', query: 'クラランス リップコンフォートオイル 7ml' },
    { brand: 'Kiehl\'s', query: 'キールズ リップ バーム No.1 15ml' }
  ];

  async function fetchGroup(queries) {
    const results = [];
    for (const q of queries) {
      try {
        const items = await searchRakutenDirect(q.query, 5, '-reviewCount');
        // 最も適切で評価の高いアイテムを1つ選定
        const validItem = items.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));
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

  console.log('\n--- テーマ1: ハンドクリーム＆ネイルオイル 取得中 ---');
  const itemsTheme1 = await fetchGroup(queriesTheme1);
  console.log(`テーマ1 取得完了: ${itemsTheme1.length} 件`);

  console.log('\n--- テーマ2: 重炭酸入浴剤＆バスソルト 取得中 ---');
  const itemsTheme2 = await fetchGroup(queriesTheme2);
  console.log(`テーマ2 取得完了: ${itemsTheme2.length} 件`);

  console.log('\n--- テーマ3: リップマスク＆リップバーム 取得中 ---');
  const itemsTheme3 = await fetchGroup(queriesTheme3);
  console.log(`テーマ3 取得完了: ${itemsTheme3.length} 件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 15,
    theme1_handcream: itemsTheme1,
    theme2_bathsalt: itemsTheme2,
    theme3_lipmask: itemsTheme3
  };

  const outPath = 'scratch/rakuten_winter_batch15_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ 厳選各10商品（計${itemsTheme1.length + itemsTheme2.length + itemsTheme3.length}件）を ${outPath} に保存しました！`);
}

fetchWinterBatch15Precise().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
