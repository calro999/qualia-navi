import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch16Cosmetics() {
  console.log('❄️ [11-12月コスメ 第16弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026冬・聖夜に煌めく極上陰影】高密着ホリデーアイシャドウパレット＆深みウォームカラー
  console.log('\n--- テーマ1: 高密着ホリデーアイシャドウパレット＆深みウォームカラー ---');
  const eyeshadowQueries = [
    'SUQQU シグニチャー カラー アイズ アイシャドウ',
    'ルナソル アイカラーレーション アイシャドウ LUNASOL',
    'ディオールショウ サンク クルール アイシャドウ Dior',
    'シャネル レ キャトル オンブル アイシャドウ CHANEL',
    'アディクション ザ アイシャドウ パレット ＋',
    'エクセル スキニーリッチシャドウ アイシャドウ excel',
    'キャンメイク シルキースフレアイズ アイシャドウ',
    'デイジーク シャドウパレット dasique 9色',
    'CLIO プロ アイ パレット クリオ アイシャドウ',
    'コスメデコルテ アイグロウジェム スキンシャドウ'
  ];
  let eyeshadowItems = [];
  for (const q of eyeshadowQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      eyeshadowItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・夕方まで乾かない朝のうるおい結界】高保湿UVデイクリーム＆日中用プロテクト美容液
  console.log('\n--- テーマ2: 高保湿UVデイクリーム＆日中用プロテクト美容液 ---');
  const dayCreamQueries = [
    'KANEBO カネボウ クリーム イン デイ 40g 朝用クリーム 日焼け止め',
    'カネボウ ヴェイル オブ デイ 40g 日中用美容液 UV',
    'コスメデコルテ サンシェルター マルチ プロテクション トーンアップCC',
    'オルビス リンクルブライトUVプロテクター 医薬部外品 50g',
    'エリクシール デーケアレボリューション SP+ 朝用乳液 UV',
    'オバジC デイセラムUV 日焼け止め美容液 30g ロート製薬',
    'ラ ロッシュ ポゼ UVイデア XL プロテクショントーンアップ ローズ',
    'ポーラ B.A ライト セレクター N 日中用クリーム UV',
    'キュレル UVエッセンス 潤浸保湿 日焼け止め 医薬部外品',
    'アスタリフト D-UVクリア ホワイトソリューション 日焼け止め'
  ];
  let dayCreamItems = [];
  for (const q of dayCreamQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      dayCreamItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬・絶対外さないホリデーギフト】予算別人気プレゼントコスメ＆冬のご褒美ビューティー
  console.log('\n--- テーマ3: 予算別人気プレゼントコスメ＆冬のご褒美ビューティー ---');
  const giftQueries = [
    'ディオール アディクト リップ マキシマイザー Dior ギフト',
    'シャネル ミロワール ドゥーブル ファセット コンパクトミラー CHANEL 名入れ',
    'Aesop レスレクション アロマティック ハンドウォッシュ 500ml イソップ',
    'SHIRO ホワイトリリー サボン ヘアミスト 80ml シロ ギフト',
    'ジョーマローン ロンドン イングリッシュペアー＆フリージア コロン 30ml 公式 ギフト',
    'uka スカルプブラシ ケンザン ウカ 頭皮ブラシ ギフト',
    'SABON サボン ボディスクラブ 320g スプーン付き ギフト',
    'BAUM バウム アロマティック ハンドウォッシュ 300ml',
    'ジルスチュアート リップバーム ハンドクリーム ギフトセット JILLSTUART',
    'ReFa リファ ハートブラシ ヘアブラシ 公式 ギフト'
  ];
  let giftItems = [];
  for (const q of giftQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      giftItems.push(...res);
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

  const cleanEyeshadow = dedupe(eyeshadowItems);
  const cleanDayCream = dedupe(dayCreamItems);
  const cleanGift = dedupe(giftItems);

  console.log(`\n取得結果まとめ:`);
  console.log(`- ホリデーアイシャドウパレット: ${cleanEyeshadow.length} 件`);
  console.log(`- 高保湿UVデイクリーム: ${cleanDayCream.length} 件`);
  console.log(`- ホリデープレゼントコスメ: ${cleanGift.length} 件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 16,
    theme1_eyeshadow: cleanEyeshadow.slice(0, 15),
    theme2_daycream: cleanDayCream.slice(0, 15),
    theme3_gift: cleanGift.slice(0, 15)
  };

  const outPath = 'scratch/rakuten_winter_batch16_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ ${outPath} に保存しました！`);
}

fetchWinterBatch16Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
