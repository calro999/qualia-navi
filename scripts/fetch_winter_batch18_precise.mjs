import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPreciseBatch18Items() {
  console.log('❄️ [11-12月コスメ 第18弾] 10ブランド各1商品を厳密に取得します...');

  // --- テーマ1: 高保湿ポアプライマー＆毛穴補正下地 厳選10商品 ---
  console.log('\n=== テーマ1: ポアプライマー＆毛穴下地 ===');
  const primerConfigs = [
    { brand: 'cledepeau', name: 'クレ・ド・ポー ボーテ ヴォワールコレクチュールn', query: 'クレドポーボーテ ヴォワールコレクチュールn 正規品' },
    { brand: 'decorte', name: 'コスメデコルテ フローレススキン グロウライザー', query: 'コスメデコルテ フローレススキン グロウライザー' },
    { brand: 'pauljoe', name: 'ポール＆ジョー モイスチュアライジング ファンデーション プライマー', query: 'ポール&ジョー モイスチュアライジング ファンデーション プライマー' },
    { brand: 'lauramercier', name: 'ローラメルシエ ピュアキャンバスプライマー ハイドレーティング', query: 'ローラメルシエ ピュアキャンバスプライマー ハイドレーティング' },
    { brand: 'ettusais', name: 'エテュセ フェイスエディション プライマー フォーベリーオイリースキン 部分用下地', query: 'エテュセ フェイスエディション プライマー' },
    { brand: 'canmake', name: 'キャンメイク ポアレスエアリーベース', query: 'キャンメイク ポアレスエアリーベース' },
    { brand: 'kiss', name: 'キス マットシフォン UVホワイトニングベース', query: 'キス マットシフォン UVホワイトニングベース' },
    { brand: 'maquillage', name: 'マキアージュ ドラマティックスキンセンサーベース NEO', query: 'マキアージュ ドラマティックスキンセンサーベース NEO' },
    { brand: 'jillstuart', name: 'ジルスチュアート イルミネイティング セラムプライマー', query: 'ジルスチュアート イルミネイティング セラムプライマー' },
    { brand: 'elegance', name: 'エレガンス モデリング カラーアップ ベース', query: 'エレガンス モデリング カラーアップ ベース' }
  ];

  const primerItems = [];
  for (const cfg of primerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 5, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        primerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高純度ブースターオイル＆導入美容オイル 厳選10商品 ---
  console.log('\n=== テーマ2: 高純度ブースターオイル＆導入美容オイル ===');
  const oilConfigs = [
    { brand: 'melvita', name: 'メルヴィータ ビオオイル アルガンオイル', query: 'メルヴィータ ビオオイル アルガンオイル 50ml' },
    { brand: 'rmk', name: 'RMK Wトリートメントオイル', query: 'RMK Wトリートメントオイル 50ml' },
    { brand: 'haba', name: 'HABA 高品位スクワラン', query: 'HABA ハーバー 高品位 スクワラン 30ml' },
    { brand: 'trilogy', name: 'トリロジー ローズヒップオイル', query: 'トリロジー ローズヒップオイル 20ml' },
    { brand: 'decorte_aq', name: 'コスメデコルテ AQ オイルインフュージョン', query: 'コスメデコルテ AQ オイル インフュージョン' },
    { brand: 'albion', name: 'アルビオン ハーバルオイル トリニティフュージョン', query: 'アルビオン ハーバルオイル トリニティフュージョン' },
    { brand: 'femmue', name: 'ファミュ アイディアルオイル', query: 'ファミュ アイディアルオイル 30ml FEMMUE' },
    { brand: 'clarins', name: 'クラランス プラント フェイス オイル デハイドレイテッドスキン', query: 'クラランス プラント フェイス オイル' },
    { brand: 'etvos', name: 'エトヴォス ミネラルインナートリートメントオイル', query: 'エトヴォス ミネラルインナートリートメントオイル' },
    { brand: 'muji', name: '無印良品 ホホバオイル', query: '無印良品 ホホバオイル 200ml' }
  ];

  const oilItems = [];
  for (const cfg of oilConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 5, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        oilItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高密着お湯落ちマスカラ＆ニュアンスカラーマスカラ 厳選10商品 ---
  console.log('\n=== テーマ3: お湯落ち＆ニュアンスカラーマスカラ ===');
  const mascaraConfigs = [
    { brand: 'dejavu', name: 'デジャヴュ 塗るつけまつげ ラッシュアップE', query: 'デジャヴュ 塗るつけまつげ ラッシュアップ' },
    { brand: 'dup', name: 'D-UP パーフェクトエクステンションマスカラ for カール', query: 'ディーアップ パーフェクトエクステンションマスカラ for カール' },
    { brand: 'heroinemake', name: 'ヒロインメイク マイクロマスカラ アドバンストフィルム', query: 'ヒロインメイク マイクロマスカラ アドバンストフィルム' },
    { brand: 'ettusais_mascara', name: 'エテュセ アイエディション マスカラベース', query: 'エテュセ アイエディション マスカラベース' },
    { brand: 'maybelline', name: 'メイベリン スカイハイ マスカラ', query: 'メイベリン スカイハイ マスカラ' },
    { brand: 'elegance_mascara', name: 'エレガンス グラヴィティレス マスカラ', query: 'エレガンス グラヴィティレス マスカラ' },
    { brand: 'canmake_mascara', name: 'キャンメイク クイックラッシュカーラー セパレート', query: 'キャンメイク クイックラッシュカーラー セパレート' },
    { brand: 'wonjungyo', name: 'ウォンジョンヨ ヌードアイラッシュ', query: 'ウォンジョンヨ ヌードアイラッシュ' },
    { brand: 'opera', name: 'オペラ マイラッシュ アドバンスト', query: 'オペラ マイラッシュ アドバンスト' },
    { brand: 'romand', name: 'ロムアンド ハンオール フィックスマスカラ', query: 'ロムアンド ハンオール マスカラ' }
  ];

  const mascaraItems = [];
  for (const cfg of mascaraConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 5, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        mascaraItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const output = {
    fetchedAt: new Date().toISOString(),
    batch: 18,
    theme1_primer: primerItems,
    theme2_oil: oilItems,
    theme3_mascara: mascaraItems
  };

  const outPath = 'scratch/rakuten_winter_batch18_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n🎉 完了！ 厳選アイテムを ${outPath} に保存しました！`);
  console.log(`- ポアプライマー: ${primerItems.length}/10`);
  console.log(`- ブースターオイル: ${oilItems.length}/10`);
  console.log(`- マスカラ: ${mascaraItems.length}/10`);
}

fetchPreciseBatch18Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
