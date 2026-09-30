import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtra() {
  console.log('✨ [第10弾 補強検索] 各テーマの人気定番＆最新アイテムを補強します...');

  // テーマ1 補強
  const extraCoffretQueries = [
    'シュウウエムラ クレンジング ホリデー',
    'ルナソル アイカラーレーション',
    'イヴサンローラン リップ ホリデー',
    'エスティローダー メークアップ コレクション'
  ];
  let extraCoffret = [];
  for (const q of extraCoffretQueries) {
    try {
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      extraCoffret.push(...res);
    } catch(e) { console.warn(e.message); }
    await sleep(1300);
  }

  // テーマ2 補強
  const extraOilQueries = [
    'メルヴィータ ビオオイル アルガンオイル',
    'クナイプ マッサージオイル',
    '無印良品 ホホバオイル 200ml',
    'イソップ ボディトリートメント オイル'
  ];
  let extraOil = [];
  for (const q of extraOilQueries) {
    try {
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      extraOil.push(...res);
    } catch(e) { console.warn(e.message); }
    await sleep(1300);
  }

  // テーマ3 補強
  const extraCushionQueries = [
    'ミシャ クッションファンデ プロカバー',
    'ローラメルシエ クッションファンデーション',
    'エトヴォス ミネラルグロウスキンクッション',
    'アピュー スキンケア ウォーターロック クッション'
  ];
  let extraCushion = [];
  for (const q of extraCushionQueries) {
    try {
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      extraCushion.push(...res);
    } catch(e) { console.warn(e.message); }
    await sleep(1300);
  }

  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch10_items.json', 'utf8'));

  function dedupe(existing, add) {
    const seen = new Set(existing.map(it => it.itemCode));
    const res = [...existing];
    for (const it of add) {
      if (!it.imageUrl || !it.itemName || it.itemPrice <= 0) continue;
      if (it.itemName.includes('中古') || it.itemName.includes('古着') || it.itemName.includes('訳あり')) continue;
      if (!seen.has(it.itemCode)) {
        seen.add(it.itemCode);
        res.push(it);
      }
    }
    return res;
  }

  current.theme1_coffret = dedupe(current.theme1_coffret, extraCoffret);
  current.theme2_bodyoil = dedupe(current.theme2_bodyoil, extraOil);
  current.theme3_cushion = dedupe(current.theme3_cushion, extraCushion);

  fs.writeFileSync('scratch/rakuten_winter_batch10_items.json', JSON.stringify(current, null, 2), 'utf8');
  console.log(`✅ 補強完了！現在: コフレ=${current.theme1_coffret.length}件, オイル=${current.theme2_bodyoil.length}件, クッション=${current.theme3_cushion.length}件`);
}

fetchExtra();
