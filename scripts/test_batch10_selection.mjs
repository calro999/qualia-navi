import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch10_items.json', 'utf8'));

console.log('Testing item selection...');

const coffretItemsRaw = [
  // 1. コスメデコルテ
  data.theme1_coffret.find(it => it.itemName.includes("デコルテ") && (it.itemName.includes("コフレ") || it.itemName.includes("ワンダーランド"))) || data.theme1_coffret[1],
  // 2. ジルスチュアート
  data.theme1_coffret.find(it => it.itemName.includes("ジルスチュアート") && it.itemName.includes("コレクション")) || data.theme1_coffret[10],
  // 3. ディオール
  data.theme1_coffret.find(it => it.itemName.includes("ディオール") && (it.itemName.includes("ホリデー") || it.itemName.includes("コフレ"))) || data.theme1_coffret[3],
  // 4. RMK
  data.theme1_coffret.find(it => it.itemName.includes("RMK") && it.itemName.includes("キット")) || data.theme1_coffret[5],
  // 5. ルナソル
  data.theme1_coffret.find(it => it.itemName.includes("ルナソル") || it.itemName.includes("アイカラーレーション")) || data.theme1_coffret[0],
  // 6. シュウウエムラ
  data.theme1_coffret.find(it => it.itemName.includes("シュウウエムラ") || it.itemName.includes("クレンジング")) || data.theme1_coffret[0],
  // 7. ポール＆ジョー
  data.theme1_coffret.find(it => it.itemName.includes("PAUL") || it.itemName.includes("ポール")) || data.theme1_coffret[0],
  // 8. シャネル
  data.theme1_coffret.find(it => it.itemName.includes("シャネル") || it.itemName.includes("ラ クレーム マン")) || data.theme1_coffret[0],
  // 9. イヴ・サンローラン
  data.theme1_coffret.find(it => it.itemName.includes("イヴサンローラン") || it.itemName.includes("サンローラン") || it.itemName.includes("YSL")) || data.theme1_coffret[2],
  // 10. シピシピ
  data.theme1_coffret.find(it => it.itemName.includes("シピシピ") || it.itemName.includes("CipiCipi")) || data.theme1_coffret[4]
];

const bodyOilItemsRaw = [
  // 1. ヴェレダ ホワイトバーチ
  data.theme2_bodyoil.find(it => it.itemName.includes("ヴェレダ") && it.itemName.includes("ホワイトバーチ") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || data.theme2_bodyoil[10],
  // 2. ヴェレダ アルニカ
  data.theme2_bodyoil.find(it => it.itemName.includes("ヴェレダ") && it.itemName.includes("アルニカ") && !it.itemName.includes("2個")) || data.theme2_bodyoil[20],
  // 3. クラランス アンティオー
  data.theme2_bodyoil.find(it => it.itemName.includes("クラランス") && it.itemName.includes("アンティオー") && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || data.theme2_bodyoil[30],
  // 4. メルヴィータ アルガンオイル
  data.theme2_bodyoil.find(it => it.itemName.includes("メルヴィータ") || it.itemName.includes("アルガン")) || data.theme2_bodyoil[5],
  // 5. ニールズヤード アロマティック マッサージオイル
  data.theme2_bodyoil.find(it => it.itemName.includes("ニールズヤード") && it.itemName.includes("アロマティック")) || data.theme2_bodyoil[38],
  // 6. バイオイル
  data.theme2_bodyoil.find(it => it.itemName.includes("バイオイル") && it.itemName.includes("125ml") && !it.itemName.includes("2個")) || data.theme2_bodyoil[43],
  // 7. クナイプ マッサージオイル
  data.theme2_bodyoil.find(it => it.itemName.includes("クナイプ") || it.itemName.includes("グレープシード")) || data.theme2_bodyoil[0],
  // 8. ニュートロジーナ インテンスリペア オイル
  data.theme2_bodyoil.find(it => it.itemName.includes("ニュートロジーナ") && it.itemName.includes("オイル")) || data.theme2_bodyoil[4],
  // 9. エルバビーバ ベビーオイル
  data.theme2_bodyoil.find(it => it.itemName.includes("erbaviva") || it.itemName.includes("エルバビーバ")) || data.theme2_bodyoil[6],
  // 10. 無印良品 ホホバオイル
  data.theme2_bodyoil.find(it => it.itemName.includes("ホホバ") || it.itemName.includes("無印")) || data.theme2_bodyoil[0]
];

const cushionItemsRaw = [
  // 1. TIRTIR クリスタルメッシュ
  data.theme3_cushion.find(it => it.itemName.includes("TIRTIR") && it.itemName.includes("クリスタルメッシュ")) || data.theme3_cushion[16],
  // 2. TIRTIR レッドクッション
  data.theme3_cushion.find(it => it.itemName.includes("TIRTIR") && it.itemName.includes("レッドクッション") && !it.itemName.includes("ミニ")) || data.theme3_cushion[11],
  // 3. CLIO メッシュグロウ
  data.theme3_cushion.find(it => it.itemName.includes("CLIO") && it.itemName.includes("メッシュグロウ") && !it.itemName.includes("ミニ")) || data.theme3_cushion[20],
  // 4. ジョンセンムル スキンヌーダー
  data.theme3_cushion.find(it => it.itemName.includes("ジョンセンムル") && it.itemName.includes("スキンヌーダー")) || data.theme3_cushion[30],
  // 5. HERA ブラッククッション
  data.theme3_cushion.find(it => it.itemName.includes("HERA") && it.itemName.includes("ブラック") && !it.itemName.includes("リフィルのみ")) || data.theme3_cushion[52],
  // 6. エトヴォス クッションファンデーション
  data.theme3_cushion.find(it => it.itemName.includes("エトヴォス") || it.itemName.includes("ETVOS")) || data.theme3_cushion[0],
  // 7. ミシャ プロカバー
  data.theme3_cushion.find(it => it.itemName.includes("ミシャ") || it.itemName.includes("MISSHA") || it.itemName.includes("プロカバー")) || data.theme3_cushion[0],
  // 8. ラロッシュポゼ トーンアップ / BB
  data.theme3_cushion.find(it => it.itemName.includes("ラロッシュポゼ")) || data.theme3_cushion[40],
  // 9. ローラメルシエ クッション
  data.theme3_cushion.find(it => it.itemName.includes("ローラメルシエ") || it.itemName.includes("トムフォード")) || data.theme3_cushion[7],
  // 10. V3 エキサイティング ファンデーション
  data.theme3_cushion.find(it => it.itemName.includes("V3") || it.itemName.includes("スピケア")) || data.theme3_cushion[2]
];

console.log("Coffret selected:", coffretItemsRaw.length);
coffretItemsRaw.forEach((it, i) => console.log(`C${i+1}: ${it.itemName.slice(0, 45)} [${it.priceFormatted}]`));

console.log("\nBody Oil selected:", bodyOilItemsRaw.length);
bodyOilItemsRaw.forEach((it, i) => console.log(`O${i+1}: ${it.itemName.slice(0, 45)} [${it.priceFormatted}]`));

console.log("\nCushion selected:", cushionItemsRaw.length);
cushionItemsRaw.forEach((it, i) => console.log(`F${i+1}: ${it.itemName.slice(0, 45)} [${it.priceFormatted}]`));
