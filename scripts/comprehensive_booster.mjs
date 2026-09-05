import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

async function main() {
  console.log('=== [1] 楽天API直接フェッチによる最新市場データ収集 ===');
  
  // 1. マツパ・マツエク後ケア＆コーティング美容液
  console.log('\n--- Fetching Lash Care & Coating ---');
  const lashItems = await searchRakutenDirect('まつ毛パーマ コーティング 美容液 サロン', 5);
  
  // 2. 20代・30代 クリスマスコフレ＆ホリデー限定
  console.log('\n--- Fetching Holiday Coffret 20s 30s ---');
  const coffretItems = await searchRakutenDirect('クリスマスコフレ 2026 ホリデー 限定 セット', 5);
  
  // 3. アベンヌ・低刺激レスキュー（あせも・汗疹・肌荒れ）
  console.log('\n--- Fetching Avene Rescue Items ---');
  const aveneItems = await searchRakutenDirect('アベンヌウォーター スプレー あせも 肌荒れ', 3);
  
  // 4. ミルボン・アホ毛＆前髪キープ
  console.log('\n--- Fetching Milbon Point Care ---');
  const milbonItems = await searchRakutenDirect('ミルボン エルジューダ ポイントケアスティック 正規品', 3);
  
  // 5. イエベ秋・ブラウンリップ・血色リップ
  console.log('\n--- Fetching Autumn Warm Lip ---');
  const lipItems = await searchRakutenDirect('リップ イエベ秋 ブラウン 口紅 落ちない', 5);

  const marketData = {
    lashItems,
    coffretItems,
    aveneItems,
    milbonItems,
    lipItems
  };

  fs.writeFileSync('scratch/booster_rakuten_data.json', JSON.stringify(marketData, null, 2));
  console.log('\n✅ 楽天API直接取得完了！scratch/booster_rakuten_data.json に保存しました。');
}

main().catch(console.error);
