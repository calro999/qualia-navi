import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch35Items() {
  console.log('❄️ [11-12月コスメ 第35弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: クリスマスコフレ＆ホリデー限定メイクアップキット 10選 ---
  console.log('\n=== テーマ1: クリスマスコフレ＆ホリデー限定メイクアップキット ===');
  const holidayCoffretConfigs = [
    { brand: 'decorte_holiday_makeup_collection', name: 'DECORTÉ コスメデコルテ ホワイトブリス メイクアップ コレクション クリスマスコフレ', query: 'コスメデコルテ クリスマスコフレ' },
    { brand: 'jillstuart_guilty_parfait_holiday_collection', name: 'JILL STUART ジルスチュアート ギルティパフェタイム コレクション クリスマスコフレ', query: 'ジルスチュアート クリスマスコフレ' },
    { brand: 'elegance_parfum_coffret_elegance', name: 'Elégance エレガンス コフレ パルボヌール / プードル 限定キット', query: 'エレガンス クリスマスコフレ' },
    { brand: 'lunasol_holiday_collection_eyecolor', name: 'LUNASOL ルナソル フローズンガーデン コレクション アイカラーレーション', query: 'ルナソル クリスマスコフレ' },
    { brand: 'dior_holiday_couture_makeup_palette', name: 'DIOR ディオール ホリデー クチュール メイクアップ パレット 限定', query: 'ディオール ホリデー パレット' },
    { brand: 'suqqu_holiday_makeup_kit', name: 'SUQQU スック ホリデー メイクアップ キット アイシャドウ チーク セット', query: 'SUQQU ホリデー キット' },
    { brand: 'addiction_holiday_addiction_coffret', name: 'ADDICTION アディクション ホリデー アディクション サイレントウィッシュ コフレ', query: 'アディクション クリスマスコフレ' },
    { brand: 'rmk_holiday_limited_collection', name: 'RMK ホリデー コレクション アイシャドウパレット リップ キット', query: 'RMK クリスマスコフレ' },
    { brand: 'ysl_holiday_makeup_gift_set', name: 'YVES SAINT LAURENT イヴ・サンローラン ホリデー ミニ リップ セット 限定コフレ', query: 'イヴサンローラン クリスマスコフレ' },
    { brand: 'mac_holiday_colour_collection_gift', name: 'M・A・C マック ホリデー ギフト ミニ リップスティック / アイシャドウ キット', query: 'MAC クリスマスコフレ' }
  ];

  const holidayCoffretItems = [];
  for (const cfg of holidayCoffretConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        holidayCoffretItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 暖房乾燥でも粉吹き・ひび割れゼロ！高保湿フェイスパウダー＆しっとり美容液ルースパウダー 10選 ---
  console.log('\n=== テーマ2: 高保湿フェイスパウダー＆しっとり美容液ルースパウダー ===');
  const moistPowderConfigs = [
    { brand: 'decorte_loose_powder_moist', name: 'DECORTÉ コスメデコルテ ルースパウダー 光透けシルク肌 高保湿ヒアルロン酸', query: 'コスメデコルテ ルースパウダー' },
    { brand: 'kanebo_milano_collection_face_powder', name: 'カネボウ ミラノコレクション フェイスアップパウダー 高機能モイストプレストパウダー', query: 'ミラノコレクション フェイスパウダー' },
    { brand: 'elegance_la_poudre_haute_nuance', name: 'Elégance エレガンス ラ プードル オートニュアンス 耐水耐皮脂シルキー仕上げ', query: 'エレガンス ラ プードル' },
    { brand: 'nars_light_reflecting_setting_powder_pressed', name: 'NARS ナーズ ライトリフレクティング セッティングパウダー プレスト リフ粉 保湿グリセリン', query: 'NARS ライトリフレクティング プレスト' },
    { brand: 'suqqu_oil_rich_glow_loose_powder', name: 'SUQQU スック オイル リッチ グロウ ルースパウダー 美容オイル高配合 しっとり濡れツヤ', query: 'SUQQU オイル リッチ グロウ ルースパウダー' },
    { brand: 'givenchy_prisme_libre_loose_powder', name: 'GIVENCHY ジバンシイ プリズム・リーブル 4色フェイスパウダー 微粒子スキンケア処方', query: 'ジバンシイ プリズムリーブル' },
    { brand: 'laura_mercier_translucent_loose_setting_powder', name: 'LAURA MERCIER ローラ メルシエ トランスルーセント ルース セッティング パウダー', query: 'ローラメルシエ ルースセッティングパウダー' },
    { brand: 'chacott_finishing_powder_moist', name: 'Chacott チャコット フィニッシングパウダー モイスト 24h高保湿 アルガンオイルシアバター', query: 'チャコット フィニッシングパウダー モイスト' },
    { brand: 'canmake_moist_loose_powder', name: 'CANMAKE キャンメイク モイストルースパウダー シルキールースモイスト 保湿ルース', query: 'キャンメイク シルキールースモイストパウダー' },
    { brand: 'kanebo_sensai_loose_powder', name: 'KANEBO カネボウ スムースフェザリールースパウダー / メルティフィール ウェア しっとり密着', query: 'カネボウ ルースパウダー' }
  ];

  const moistPowderItems = [];
  for (const cfg of moistPowderConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        moistPowderItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: ニット静電気＆マフラー摩擦を完全遮断！高保湿ヘアオイル＆濃厚アウトバストリートメント 10選 ---
  console.log('\n=== テーマ3: 高保湿ヘアオイル＆濃厚アウトバストリートメント ===');
  const hairOilConfigs = [
    { brand: 'moroccanoil_treatment_original', name: 'MOROCCANOIL モロッカンオイル トリートメント アルガンオイル 高保湿 洗い流さないヘアオイル', query: 'モロッカンオイル トリートメント' },
    { brand: 'kerastase_elixir_ultime_huile_originale', name: 'KERASTASE ケラスターゼ ユイルスブリム ティーインペリアル / エルキシール ユイル 高保湿オイル', query: 'ケラスターゼ ユイルスブリム' },
    { brand: 'milbon_elujuda_moist_hair_oil', name: 'MILBON ミルボン エルジューダ MO / グレイスオン セラム しっとりまとまりヘアオイル', query: 'ミルボン エルジューダ オイル' },
    { brand: 'track_oil_no3_kinmokusei', name: 'track oil トラック オイル No.3 金木犀の香り 天然由来成分99.19% 濃密ツヤ感', query: 'トラックオイル No3' },
    { brand: 'napla_n_dot_polish_oil_sc', name: 'napla ナプラ N. エヌドット ポリッシュオイル SC シアバター 天然由来 高保湿スタイリング', query: 'エヌドット ポリッシュオイル' },
    { brand: 'and_honey_deep_moist_hair_oil_30', name: '＆honey アンドハニー ディープモイスト ヘアオイル 3.0 オーガニック処方 保水ハチミツ美容', query: 'アンドハニー ディープモイスト ヘアオイル' },
    { brand: 'fino_premium_touch_hair_oil', name: 'fino フィーノ プレミアムタッチ 濃厚美容液ヘアオイル 濃密Wオイル ダメージ補修', query: 'フィーノ ヘアオイル' },
    { brand: 'loreal_paris_extraordinary_oil_extra_rich', name: 'L\'OREAL PARIS ロレアル パリ エクストラオーディナリー オイル エクストラ リッチ 極上のしっとり感', query: 'ロレアル パリ エクストラオーディナリー オイル' },
    { brand: 'uka_hair_oil_windy_lady', name: 'uka ウカ ヘアオイル ウィンディレディ / レイン 静電気・パサつき防止 アサイーオイル', query: 'ウカ ヘアオイル' },
    { brand: 'shiseido_tsubaki_premium_repair_hair_oil', name: 'TSUBAKI ツバキ プレミアム 補修ヘアオイル 艶髪 摩擦軽減 椿オイル配合', query: 'TSUBAKI プレミアム 補修ヘアオイル' }
  ];

  const hairOilItems = [];
  for (const cfg of hairOilConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairOilItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // 保存
  const result = {
    updatedAt: new Date().toISOString(),
    theme1_holiday_coffret: holidayCoffretItems,
    theme2_moist_powder: moistPowderItems,
    theme3_hair_oil: hairOilItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch35_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch35_items.json`);
  console.log(`- テーマ1 (クリスマスコフレ＆ホリデー限定キット): ${holidayCoffretItems.length}件`);
  console.log(`- テーマ2 (高保湿フェイスパウダー): ${moistPowderItems.length}件`);
  console.log(`- テーマ3 (高保湿ヘアオイル): ${hairOilItems.length}件`);
}

fetchWinterBatch35Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
