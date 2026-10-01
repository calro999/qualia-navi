import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch14Cosmetics() {
  console.log('❄️ [11-12月コスメ 第14弾] 楽天OpenAPI直接検索を開始します...');

  // テーマ1: 【2026冬・静電気＆枝毛ゼロの感動サラツヤ美髪へ】高級ヘアブラシ＆頭皮ほぐしパドルブラシ
  console.log('\n--- テーマ1: 高級ヘアブラシ＆頭皮ほぐしパドルブラシ ---');
  const hairBrushQueries = [
    'リファ ハートブラシ ReFa HEART BRUSH 公式',
    'AVEDA アヴェダ パドルブラシ 名入れ パドル ブラシ',
    'uka ウカ スカルプブラシ ケンザン バリカタ',
    'タングルティーザー ザ アルティメットディタングラー 公式',
    'メイソンピアソン ヘアブラシ 猪毛 ポケットブリッスル',
    'ラカスタ ヘッドスパブラシ スカルプブラシ',
    'ReFa ION CARE BRUSH イオンケアブラシ リファ',
    'ウェットブラシ プロ ディタングラー WetBrush パドル',
    'マペペ パドルブラシ ふかふか クッション ヘアブラシ',
    'ヘアブラシ 静電気防止 猪毛 天然木 木製 クッションブラシ'
  ];
  let hairBrushItems = [];
  for (const q of hairBrushQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      hairBrushItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ2: 【2026冬・寒暖差肌荒れ＆粉ふき赤み肌を徹底鎮静】高保湿CICA＆高濃度セラミド・パンテノール リペアバリアクリーム
  console.log('\n--- テーマ2: CICA＆高濃度セラミド・パンテノール リペアバリアクリーム ---');
  const barrierCreamQueries = [
    'エストラ エストラー AESTURA アトバリア365 クリーム',
    'ラロッシュポゼ シカプラスト リペア バーム B5+ 公式',
    'VT CICA クリーム シカクリーム 敏感肌 保湿 大容量',
    'キュレル 潤浸保湿 フェイスクリーム 医薬部外品 セラミド',
    'バイオヒールボ プロバイオダーム 3Dリフティング クリーム BOH',
    '松山油脂 肌をうるおす 保湿クリーム セラミド 詰め替え',
    'リアルバリア エクストリーム クリーム Real Barrier',
    'イニスフリー レチノール シカ リペア セラム クリーム',
    'ドクタージャルト シカペア クリーム Dr.Jart+ 第2世代',
    'セラミド クリーム 高保湿 バリア機能 乾燥性敏感肌 ナイアシンアミド'
  ];
  let barrierCreamItems = [];
  for (const q of barrierCreamQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      barrierCreamItems.push(...res);
    } catch (err) {
      console.warn(`検索エラー (${q}):`, err.message);
    }
    await sleep(1300);
  }

  // テーマ3: 【2026冬ボーナス＆ホリデー極上ご褒美】電動EMSヘッドスパ＆スカルプリフトマッサージャー
  console.log('\n--- テーマ3: 電動EMSヘッドスパ＆スカルプリフトマッサージャー ---');
  const headSpaQueries = [
    'MYTREX EMS HEAD SPA PRO マイトレックス ヘッドスパ 公式',
    'NIPLUX EMS HEAD SPA ニップラックス ヘッドスパ 頭皮マッサージ',
    'ヤーマン ミーゼ ニードルヘッドスパリフト myse 電気ブラシ',
    'パナソニック 頭皮エステ サロンタッチタイプ スパイラル',
    'RELX EMS ヘッドスパ 電動 頭皮ブラシ 防水 IPX7',
    'WAVEWAVE スカルプ ブラシ EMS ヘッドスパ 電気ブラシ',
    'ルルド シェイプアップリボン ヘッドスパ 温感',
    'スカルプD メカノバイオ アンファー 頭皮エステ',
    'ヘッドスパ 電動 防水 お風呂 EMS 赤色LED スカルプケア',
    '頭皮 マッサージ器 EMS 電気針 スカルプ リフト フェイスケア'
  ];
  let headSpaItems = [];
  for (const q of headSpaQueries) {
    try {
      const res = await searchRakutenDirect(q, 10, '-reviewCount');
      headSpaItems.push(...res);
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

  const cleanHairBrush = dedupe(hairBrushItems);
  const cleanBarrierCream = dedupe(barrierCreamItems);
  const cleanHeadSpa = dedupe(headSpaItems);

  console.log(`\n取得結果まとめ:`);
  console.log(`- 高級ヘアブラシ＆パドルブラシ: ${cleanHairBrush.length} 件`);
  console.log(`- CICA＆セラミド リペアバリアクリーム: ${cleanBarrierCream.length} 件`);
  console.log(`- 電動EMSヘッドスパ＆スカルプギア: ${cleanHeadSpa.length} 件`);

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 14,
    theme1_hairbrush: cleanHairBrush.slice(0, 15),
    theme2_barriercream: cleanBarrierCream.slice(0, 15),
    theme3_headspa: cleanHeadSpa.slice(0, 15)
  };

  const outPath = 'scratch/rakuten_winter_batch14_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`✅ ${outPath} に保存しました！`);
}

fetchWinterBatch14Cosmetics().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
