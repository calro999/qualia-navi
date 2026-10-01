import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch15Cosmetics() {
  console.log('❄️ [11-12月コスメ 第15弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026冬・指先まで見惚れる透明美手へ】高保湿ハンドクリーム＆ネイルオイル
  console.log('\n--- テーマ1: 高保湿ハンドクリーム＆ネイルオイル ---');
  const handCreamQueries = [
    'ロクシタン シア ハンドクリーム 30ml 75ml 公式',
    'Aesop イソップ レスレクション ハンドバーム 75ml',
    'uka ネイルオイル ウカ nail oil 爪 保湿',
    'アトリックス ビューティーチャージ プレミアム ナイトスペリア',
    'ユースキン 120g ポンプ 指定医薬部外品 手荒れ ひび あかぎれ',
    'SHIRO シロ サボン ホワイトリリー ハンド美容液 ハンドセラム',
    'ジルスチュアート ハンドクリーム ホワイトフローラル 公式 ギフト',
    'シャネル ラ クレーム マン ハンドクリーム CHANEL',
    'ヘパリン類似物質 ハンドクリーム 薬用 高保湿 乾燥肌',
    'OPI プロスパ ネイル キューティクル オイル ネイルケア'
  ];
  let handCreamItems = [];
  for (const q of handCreamQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      handCreamItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・芯から温まる極上の温活＆全身うるおい浴】高濃度重炭酸入浴剤＆薬用バスソルト・バスオイル
  console.log('\n--- テーマ2: 高濃度重炭酸入浴剤＆薬用バスソルト・バスオイル ---');
  const bathSaltQueries = [
    'BARTH バース 薬用 中性 重炭酸入浴剤 90錠 公式 医薬部外品',
    'クナイプ バスソルト ホップ＆バレリアン 850g グーテナハト',
    'アユーラ AYURA メディテーションバスt 入浴剤 300ml',
    'エプソムソルト 炭酸入浴剤 マグネシウム 硫酸マグネシウム 3kg',
    'BARAKA ジョルダニアン デッドシー ソルト 死海塩 入浴剤',
    'ホットアルバム 薬用 ホットタブ 重炭酸湯 クラシック',
    'シークリスタルス エプソムソルト コスメティック クエン酸 入浴剤',
    'SHIRO ホワイトリリー クレイ バスソルト ギフト',
    'きき湯 ファインヒート スマートモデル 薬用 入浴剤 炭酸',
    'ヴェレダ バスミルク アルニカ モミ ラベンダー 入浴剤 WELEDA'
  ];
  let bathSaltItems = [];
  for (const q of bathSaltQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      bathSaltItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬・縦ジワ＆ガサガサ皮むけ完全消去】濃密高保湿リップマスク＆夜用リップ美容液バーム
  console.log('\n--- テーマ3: 濃密高保湿リップマスク＆夜用リップ美容液バーム ---');
  const lipMaskQueries = [
    'ラネージュ リップスリーピングマスク LANEIGE ベリー 公式',
    'タカミリップ TAKAMI 唇用美容液 7g 公式 高保湿',
    'オバジ ダーマパワーX リップエッセンス 10g ロート製薬',
    'キュレル リップケアバーム 医薬部外品 セラミド 4.2g',
    'Torriden トリデン ソリッドイン セラミド リップエッセンス',
    'レブロン キス シュガー スクラブ 角質ケア リップクリーム',
    'モアリップ 医薬品 リップクリーム 口唇炎 口角炎 8g',
    '資生堂 モイスト リップクリーム ディープモイスト',
    'Dior アディクト リップ グロウ オイル ディオール リップケア',
    'クラランス リップコンフォートオイル CLARINS リップオイル'
  ];
  let lipMaskItems = [];
  for (const q of lipMaskQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      lipMaskItems.push(...res);
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

  const cleanHandCream = dedupe(handCreamItems);
  const cleanBathSalt = dedupe(bathSaltItems);
  const cleanLipMask = dedupe(lipMaskItems);

  console.log(`\n取得結果まとめ:`);
  console.log(`- 高保湿ハンドクリーム＆ネイルオイル: ${cleanHandCream.length} 件`);
  console.log(`- 重炭酸入浴剤＆バスソルト: ${cleanBathSalt.length} 件`);
  console.log(`- 濃密リップマスク＆リップバーム: ${cleanLipMask.length} 件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 15,
    theme1_handcream: cleanHandCream.slice(0, 15),
    theme2_bathsalt: cleanBathSalt.slice(0, 15),
    theme3_lipmask: cleanLipMask.slice(0, 15)
  };

  const outPath = 'scratch/rakuten_winter_batch15_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ ${outPath} に保存しました！`);
}

fetchWinterBatch15Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
