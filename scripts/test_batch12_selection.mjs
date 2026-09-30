import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch12_items.json', 'utf8'));

console.log('=== テーマ1: 高保湿美容液コンシーラー 候補チェック ===');
const concealer10 = [
  // 1. Dior フォーエヴァー スキン コレクト
  data.theme1_concealer.find(it => (it.itemName.includes("ディオールスキン") || it.itemName.includes("Dior")) && it.itemName.includes("スキン コレクト") && !it.itemName.includes("2点")) || data.theme1_concealer[1],
  // 2. NARS ラディアント クリーミー コンシーラー
  data.theme1_concealer.find(it => it.itemName.includes("NARS") && it.itemName.includes("ラディアント") && !it.itemName.includes("ミニ") && !it.itemName.includes("2本")) || data.theme1_concealer[10],
  // 3. コスメデコルテ トーンパーフェクティング パレット
  data.theme1_concealer.find(it => it.itemName.includes("コスメデコルテ") && (it.itemName.includes("トーンパーフェクティング") || it.itemName.includes("パレット"))) || data.theme1_concealer[20],
  // 4. 資生堂 エッセンス スキングロウ ファンデ/コンシーラー
  data.theme1_concealer.find(it => it.itemName.includes("資生堂") && (it.itemName.includes("エッセンス") || it.itemName.includes("スキングロウ"))) || data.theme1_concealer[25],
  // 5. TIRTIR マスクフィット オールカバー デュアルコンシーラー
  data.theme1_concealer.find(it => it.itemName.includes("TIRTIR") || it.itemName.includes("ティルティル")) || data.theme1_concealer[27],
  // 6. ザセム カバーパーフェクション チップコンシーラー
  data.theme1_concealer.find(it => (it.itemName.includes("ザセム") || it.itemName.includes("the SAEM")) && !it.itemName.includes("3本")) || data.theme1_concealer[30],
  // 7. &be アンドビー ファンシーラー
  data.theme1_concealer.find(it => it.itemName.includes("＆be") || it.itemName.includes("&be") || it.itemName.includes("アンドビー")) || data.theme1_concealer[35],
  // 8. イプサ クリエイティブコンシーラーe
  data.theme1_concealer.find(it => it.itemName.includes("イプサ") || it.itemName.includes("IPSA")) || data.theme1_concealer[40],
  // 9. ルナソル シームレスカバースキンコンシーラー
  data.theme1_concealer.find(it => it.itemName.includes("ルナソル") || it.itemName.includes("LUNASOL")) || data.theme1_concealer[55],
  // 10. エクセル サイレントカバー コンシーラー
  data.theme1_concealer.find(it => it.itemName.includes("エクセル") || it.itemName.includes("excel")) || data.theme1_concealer[60]
];

console.log('=== テーマ2: 高保湿ヘアバーム 候補チェック ===');
const hairBalm10 = [
  // 1. ナプラ N. ナチュラルバーム
  data.theme2_hair_balm.find(it => (it.itemName.includes("エヌドット") || it.itemName.includes("N.")) && it.itemName.includes("ナチュラルバーム") && !it.itemName.includes("18g") && !it.itemName.includes("セット")) || data.theme2_hair_balm[10],
  // 2. ザ・プロダクト ヘアワックス
  data.theme2_hair_balm.find(it => it.itemName.includes("product") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || data.theme2_hair_balm[5],
  // 3. track トラック バーム
  data.theme2_hair_balm.find(it => it.itemName.includes("track") || it.itemName.includes("トラック")) || data.theme2_hair_balm[1],
  // 4. リンクオリジナルメーカーズ ヘアバーム 997
  data.theme2_hair_balm.find(it => it.itemName.includes("リンク") && (it.itemName.includes("997") || it.itemName.includes("オリジナル"))) || data.theme2_hair_balm[20],
  // 5. ミルボン ジェミールフラン メルティバター バーム
  data.theme2_hair_balm.find(it => it.itemName.includes("ジェミールフラン") || it.itemName.includes("メルティバター")) || data.theme2_hair_balm[25],
  // 6. ボタニスト ボタニカル ヘアバーム
  data.theme2_hair_balm.find(it => it.itemName.includes("BOTANIST") || it.itemName.includes("ボタニスト")) || data.theme2_hair_balm[30],
  // 7. ダイアン ボヌール オーガニック ヘアバーム
  data.theme2_hair_balm.find(it => it.itemName.includes("ボヌール") || it.itemName.includes("ダイアン")) || data.theme2_hair_balm[35],
  // 8. オルナ オーガニック ヘアバーム
  data.theme2_hair_balm.find(it => it.itemName.includes("オルナ") || it.itemName.includes("ALLNA")) || data.theme2_hair_balm[0],
  // 9. ジョンマスターオーガニック ヘアバーム
  data.theme2_hair_balm.find(it => it.itemName.includes("ジョンマスター") || it.itemName.includes("john masters")) || data.theme2_hair_balm[65],
  // 10. ダンスデザインチューナー モダンシマー
  data.theme2_hair_balm.find(it => it.itemName.includes("ダンスデザインチューナー") || it.itemName.includes("モダンシマー") || it.itemName.includes("アリミノ")) || data.theme2_hair_balm[68]
];

console.log('=== テーマ3: 高保湿スティック美容液＆SOSレスキューマルチバーム 候補チェック ===');
const stickBalm10 = [
  // 1. KAHI カヒ リンクルバウンス マルチバーム
  data.theme3_stick_balm.find(it => (it.itemName.includes("kahi") || it.itemName.includes("KAHI")) && !it.itemName.includes("2個") && !it.itemName.includes("セット")) || data.theme3_stick_balm[11],
  // 2. イプサ ザ・タイムR デイエッセンス スティック
  data.theme3_stick_balm.find(it => it.itemName.includes("イプサ") || it.itemName.includes("IPSA") || it.itemName.includes("デイエッセンス")) || data.theme3_stick_balm[16],
  // 3. 資生堂 イハダ 薬用 バーム
  data.theme3_stick_balm.find(it => it.itemName.includes("イハダ") || it.itemName.includes("IHADA")) || data.theme3_stick_balm[24],
  // 4. キュレル 潤浸保湿 モイストバーム
  data.theme3_stick_balm.find(it => it.itemName.includes("キュレル") || it.itemName.includes("Curel")) || data.theme3_stick_balm[40],
  // 5. クラブ エアリータッチ デイエッセンス スティック
  data.theme3_stick_balm.find(it => it.itemName.includes("クラブ") && (it.itemName.includes("デイエッセンス") || it.itemName.includes("エアリータッチ"))) || data.theme3_stick_balm[43],
  // 6. 資生堂 エリクシール つや玉ミスト
  data.theme3_stick_balm.find(it => it.itemName.includes("エリクシール") || it.itemName.includes("つや玉")) || data.theme3_stick_balm[48],
  // 7. dプログラム 薬用 スキンリペアクリーム
  data.theme3_stick_balm.find(it => it.itemName.includes("dプログラム") || it.itemName.includes("スキンリペア")) || data.theme3_stick_balm[45],
  // 8. ロクシタン シアバター 保湿バーム
  data.theme3_stick_balm.find(it => it.itemName.includes("ロクシタン") || it.itemName.includes("シアバター")) || data.theme3_stick_balm[30],
  // 9. アイノキ モイスト スティック 美容液
  data.theme3_stick_balm.find(it => it.itemName.includes("AINOKI") || it.itemName.includes("アイノキ") || it.itemName.includes("モイスト スティック")) || data.theme3_stick_balm[0],
  // 10. ファーミングスティック PDRN スティック美容液
  data.theme3_stick_balm.find(it => it.itemName.includes("firming") || it.itemName.includes("ファーミング") || it.itemName.includes("PDRN")) || data.theme3_stick_balm[4]
];

console.log('Theme 1 items:');
concealer10.forEach((it, i) => console.log(`  [${i+1}] ${it ? it.itemName.slice(0, 35) : 'NULL'} | ${it?.priceFormatted}`));

console.log('Theme 2 items:');
hairBalm10.forEach((it, i) => console.log(`  [${i+1}] ${it ? it.itemName.slice(0, 35) : 'NULL'} | ${it?.priceFormatted}`));

console.log('Theme 3 items:');
stickBalm10.forEach((it, i) => console.log(`  [${i+1}] ${it ? it.itemName.slice(0, 35) : 'NULL'} | ${it?.priceFormatted}`));
