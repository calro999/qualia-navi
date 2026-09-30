import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch11_items.json', 'utf8'));

// 1. 朝用洗顔・高保湿ジェル・泡洗顔 厳選10商品
export const morningItemsRaw = [
  // 1. KANEBO コンフォート ストレッチィ ウォッシュ II
  data.theme1_morning_cleanser.find(it => it.itemName.includes("コンフォート") && it.itemName.includes("ストレッチィ")) || data.theme1_morning_cleanser[11],
  // 2. LAGOM ジェルトゥウォーター クレンザー
  data.theme1_morning_cleanser.find(it => (it.itemName.includes("LAGOM") || it.itemName.includes("ラゴム")) && !it.itemName.includes("2本")) || data.theme1_morning_cleanser[20],
  // 3. ルナソル ポリッシングクリア ジェルウォッシュ（2026年最新リニューアル版）
  data.theme1_morning_cleanser.find(it => it.itemName.includes("ポリッシングクリア") || (it.itemName.includes("ルナソル") && it.itemName.includes("ジェルウォッシュ"))) || data.theme1_morning_cleanser[0],
  // 4. KANEBO スクラビング マッド ウォッシュ
  data.theme1_morning_cleanser.find(it => it.itemName.includes("スクラビング") && it.itemName.includes("マッド") && !it.itemName.includes("2個")) || data.theme1_morning_cleanser[1],
  // 5. エスト クラリファイイング ジェル ウォッシュ MED
  data.theme1_morning_cleanser.find(it => it.itemName.includes("クラリファイイング") && !it.itemName.includes("頭皮") && !it.itemName.includes("ミニ") && !it.itemName.includes("3個")) || data.theme1_morning_cleanser[31],
  // 6. マナラ モイストウォッシュゲル
  data.theme1_morning_cleanser.find(it => it.itemName.includes("マナラ") || it.itemName.includes("モイストウォッシュ")) || data.theme1_morning_cleanser[30],
  // 7. ソフィーナiP ポア クリアリング ジェル ウォッシュ
  data.theme1_morning_cleanser.find(it => it.itemName.includes("ソフィーナ") && it.itemName.includes("ポア")) || data.theme1_morning_cleanser[40],
  // 8. ビオレ おうちdeエステ 肌をなめらかにするマッサージ洗顔ジェル
  data.theme1_morning_cleanser.find(it => it.itemName.includes("ビオレ") && it.itemName.includes("おうちdeエステ") && !it.itemName.includes("ミニ")) || data.theme1_morning_cleanser[48],
  // 9. キュレル 泡洗顔料 本体 150ml（セラミド保護・医薬部外品）
  data.theme1_morning_cleanser.find(it => it.itemName.includes("キュレル") && it.itemName.includes("泡洗顔料") && !it.itemName.includes("つめかえ") && !it.itemName.includes("詰め替え")) || data.theme1_morning_cleanser[0],
  // 10. ファンケル 泥ジェル洗顔
  data.theme1_morning_cleanser.find(it => it.itemName.includes("泥ジェル洗顔")) || data.theme1_morning_cleanser[0]
];

// 2. 高保湿エイジングケア化粧水＆エッセンスローション 厳選10商品
export const lotionItemsRaw = [
  // 1. コスメデコルテ イドラクラリティ 薬用 トリートメント エッセンス ウォーター
  data.theme2_rich_lotion.find(it => it.itemName.includes("イドラクラリティ") && !it.itemName.includes("3点")) || data.theme2_rich_lotion[10],
  // 2. SK-II フェイシャル トリートメント エッセンス
  data.theme2_rich_lotion.find(it => (it.itemName.includes("SK-II") || it.itemName.includes("SK2")) && it.itemName.includes("フェイシャル トリートメント エッセンス") && !it.itemName.includes("2本")) || data.theme2_rich_lotion[24],
  // 3. アルビオン フローラドリップ
  data.theme2_rich_lotion.find(it => it.itemName.includes("フローラドリップ") && !it.itemName.includes("2本")) || data.theme2_rich_lotion[67],
  // 4. イプサ ザ・タイムR アクア
  data.theme2_rich_lotion.find(it => it.itemName.includes("イプサ") || it.itemName.includes("タイムR")) || data.theme2_rich_lotion[0],
  // 5. カルテHD 高保湿ローション
  data.theme2_rich_lotion.find(it => it.itemName.includes("カルテHD") && it.itemName.includes("ローション") && !it.itemName.includes("ボディ")) || data.theme2_rich_lotion[26],
  // 6. オルビスユードット エッセンスローション
  data.theme2_rich_lotion.find(it => it.itemName.includes("オルビス") && it.itemName.includes("ドット")) || data.theme2_rich_lotion[32],
  // 7. アクセーヌ モイストバランス ローション
  data.theme2_rich_lotion.find(it => it.itemName.includes("アクセーヌ") && it.itemName.includes("モイストバランス")) || data.theme2_rich_lotion[39],
  // 8. キュレル ディープモイスチャースプレー
  data.theme2_rich_lotion.find(it => it.itemName.includes("キュレル") && it.itemName.includes("ディープモイスチャー") && !it.itemName.includes("2本") && !it.itemName.includes("3本")) || data.theme2_rich_lotion[52],
  // 9. 肌ラボ 極潤プレミアム ヒアルロン液
  data.theme2_rich_lotion.find(it => it.itemName.includes("極潤プレミアム") && !it.itemName.includes("5本") && !it.itemName.includes("詰替")) || data.theme2_rich_lotion[58],
  // 10. カネボウ スキン ハーモナイザー
  data.theme2_rich_lotion.find(it => it.itemName.includes("スキン ハーモナイザー") || it.itemName.includes("ハーモナイザー")) || data.theme2_rich_lotion[0]
];

// 3. 濃厚補修ヘアミルク＆洗い流さないアウトバストリートメント 厳選10商品
export const hairMilkItemsRaw = [
  // 1. オルビス エッセンスインヘアミルク
  data.theme3_hair_milk.find(it => it.itemName.includes("オルビス") && it.itemName.includes("エッセンスインヘアミルク") && !it.itemName.includes("4点")) || data.theme3_hair_milk[11],
  // 2. ミルボン エルジューダ エマルジョン＋
  data.theme3_hair_milk.find(it => it.itemName.includes("エルジューダ") && (it.itemName.includes("エマルジョン＋") || it.itemName.includes("エマルジョン+")) && !it.itemName.includes("2本")) || data.theme3_hair_milk[2],
  // 3. oggi otto セラム CMC ミルキィ
  data.theme3_hair_milk.find(it => it.itemName.includes("オッジィオット") && it.itemName.includes("ミルキィ") && !it.itemName.includes("450g") && !it.itemName.includes("3種")) || data.theme3_hair_milk[28],
  // 4. 資生堂 サブリミック ワンダーシールド
  data.theme3_hair_milk.find(it => it.itemName.includes("ワンダーシールド") && !it.itemName.includes("詰替") && !it.itemName.includes("2個")) || data.theme3_hair_milk[38],
  // 5. ナプラ N. シアミルク
  data.theme3_hair_milk.find(it => (it.itemName.includes("N. シアミルク") || it.itemName.includes("N. SHEA")) && !it.itemName.includes("2個") && !it.itemName.includes("3個")) || data.theme3_hair_milk[48],
  // 6. ケラスターゼ ネクター テルミック
  data.theme3_hair_milk.find(it => it.itemName.includes("ケラスターゼ") || it.itemName.includes("ネクター テルミック")) || data.theme3_hair_milk[7],
  // 7. モロッカンオイル オールインワン リーブイン コンディショナー
  data.theme3_hair_milk.find(it => it.itemName.includes("モロッカンオイル") && it.itemName.includes("リーブイン")) || data.theme3_hair_milk[57],
  // 8. ラ・カスタ アロマエステ ヘアエマルジョン
  data.theme3_hair_milk.find(it => it.itemName.includes("ラ・カスタ") && it.itemName.includes("ヘアエマルジョン") && !it.itemName.includes("リフィル") && !it.itemName.includes("2本")) || data.theme3_hair_milk[62],
  // 9. ジョンマスターオーガニック R&Aヘアミルク
  data.theme3_hair_milk.find(it => it.itemName.includes("ジョンマスター") || it.itemName.includes("R&Aヘアミルク")) || data.theme3_hair_milk[0],
  // 10. エイトザタラソ 美容液ヘアミルク
  data.theme3_hair_milk.find(it => it.itemName.includes("エイトザタラソ") || it.itemName.includes("タラソ")) || data.theme3_hair_milk[0]
];

console.log('=== SELECTION RESULTS ===');
console.log('Morning Cleansers:');
morningItemsRaw.forEach((it, i) => console.log(`  ${i+1}. ${it?.itemName.slice(0, 45)} [${it?.itemPrice}円]`));
console.log('Lotions:');
lotionItemsRaw.forEach((it, i) => console.log(`  ${i+1}. ${it?.itemName.slice(0, 45)} [${it?.itemPrice}円]`));
console.log('Hair Milks:');
hairMilkItemsRaw.forEach((it, i) => console.log(`  ${i+1}. ${it?.itemName.slice(0, 45)} [${it?.itemPrice}円]`));
