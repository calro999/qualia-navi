import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchExtraItems() {
  console.log('🔍 各テーマの厳選10ブランドを確実に揃えるための追加取得を実行します...');

  const queriesTheme1 = [
    { brand: 'ReFa', query: 'ReFa HEART BRUSH リファ ハートブラシ' },
    { brand: 'AVEDA', query: 'AVEDA パドルブラシ 名入れ' },
    { brand: 'uka', query: 'uka ウカ スカルプブラシ ケンザン' },
    { brand: 'タングルティーザー', query: 'タングルティーザー ディタングラー' },
    { brand: 'メイソンピアソン', query: 'メイソンピアソン ポケットブリッスル' },
    { brand: 'ラ・カスタ', query: 'ラカスタ ヘッドスパブラシ' },
    { brand: 'ReFa', query: 'ReFa ION CARE BRUSH リファ イオンケアブラシ' },
    { brand: 'ウェットブラシ', query: 'ウェットブラシ パドルディタングラー' },
    { brand: 'マペペ', query: 'マペペ ふかふかクッション パドルブラシ' },
    { brand: 'ジョンマスター', query: 'ジョンマスターオーガニック コンボパドルブラシ' }
  ];

  const queriesTheme2 = [
    { brand: 'AESTURA', query: 'AESTURA アトバリア365 クリーム' },
    { brand: 'ラロッシュポゼ', query: 'ラロッシュポゼ シカプラスト バーム B5' },
    { brand: 'VT', query: 'VT CICA クリーム 敏感肌' },
    { brand: 'キュレル', query: 'キュレル 潤浸保湿 フェイスクリーム' },
    { brand: 'BIOHEAL BOH', query: 'バイオヒールボ プロバイオダーム クリーム' },
    { brand: '松山油脂', query: '松山油脂 肌をうるおす 保湿クリーム セラミド' },
    { brand: 'Dr.Jart+', query: 'ドクタージャルト シカペア クリーム' },
    { brand: 'Real Barrier', query: 'リアルバリア エクストリーム クリーム' },
    { brand: 'イハダ', query: 'IHADA イハダ 薬用バーム 高精製ワセリン' },
    { brand: 'イニスフリー', query: 'イニスフリー レチノール シカ リペア' }
  ];

  const queriesTheme3 = [
    { brand: 'MYTREX', query: 'MYTREX EMS HEAD SPA PRO マイトレックス' },
    { brand: 'NIPLUX', query: 'NIPLUX EMS HEAD SPA ニップラックス' },
    { brand: 'ヤーマン', query: 'ミーゼ ニードルヘッドスパリフト ヤーマン' },
    { brand: 'パナソニック', query: 'パナソニック 頭皮エステ EH-HE0J' },
    { brand: 'RELX', query: 'RELX EMS ヘッドスパ' },
    { brand: 'WAVEWAVE', query: 'WAVEWAVE スカルプ ブラシ EMS' },
    { brand: 'ANLAN', query: 'ANLAN EMS ヘッドスパ 防水' },
    { brand: 'アデランス', query: 'アデランス バスタイムエステ スパニスト' },
    { brand: 'FESTINO', query: 'フェスティノ 充電式 ヘッドウォッシュ スパ' },
    { brand: 'ルルド', query: 'ルルド エイリラン ヘッドスパ' }
  ];

  const results1 = [];
  for (const item of queriesTheme1) {
    try {
      const res = await searchRakutenDirect(item.query, 3, '-reviewCount');
      if (res && res.length > 0) {
        results1.push({ brandKey: item.brand, ...res[0] });
      }
    } catch (e) {
      console.warn(`Query failed: ${item.query}`, e.message);
    }
    await sleep(1300);
  }

  const results2 = [];
  for (const item of queriesTheme2) {
    try {
      const res = await searchRakutenDirect(item.query, 3, '-reviewCount');
      if (res && res.length > 0) {
        results2.push({ brandKey: item.brand, ...res[0] });
      }
    } catch (e) {
      console.warn(`Query failed: ${item.query}`, e.message);
    }
    await sleep(1300);
  }

  const results3 = [];
  for (const item of queriesTheme3) {
    try {
      const res = await searchRakutenDirect(item.query, 3, '-reviewCount');
      if (res && res.length > 0) {
        results3.push({ brandKey: item.brand, ...res[0] });
      }
    } catch (e) {
      console.warn(`Query failed: ${item.query}`, e.message);
    }
    await sleep(1300);
  }

  const finalOutput = {
    fetchedAt: new Date().toISOString(),
    batch: 14,
    theme1_hairbrush: results1,
    theme2_barriercream: results2,
    theme3_headspa: results3
  };

  fs.writeFileSync('scratch/rakuten_winter_batch14_items.json', JSON.stringify(finalOutput, null, 2), 'utf8');
  console.log(`✅ 厳選アイテム保存完了！`);
  console.log(`- テーマ1 (ヘアブラシ): ${results1.length} 件`);
  console.log(`- テーマ2 (リペアクリーム): ${results2.length} 件`);
  console.log(`- テーマ3 (電動ヘッドスパ): ${results3.length} 件`);
}

fetchExtraItems().catch(err => {
  console.error('エラー:', err);
  process.exit(1);
});
