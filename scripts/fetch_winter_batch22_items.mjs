import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch22Items() {
  console.log('❄️ [11-12月コスメ 第22弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: ホリデー限定＆冬映え多色アイシャドウパレット ---
  console.log('\n=== テーマ1: ホリデー限定＆冬映え多色アイシャドウパレット ===');
  const paletteConfigs = [
    { brand: 'dior_eyeshadow', name: 'ディオール ディオールショウ サンク クルール', query: 'ディオールショウ サンク クルール ディオール' },
    { brand: 'lunasol_eyeshadow', name: 'ルナソル アイカラーレーション', query: 'ルナソル アイカラーレーション' },
    { brand: 'suqqu_eyeshadow', name: 'SUQQU シグニチャー カラー アイズ', query: 'SUQQU シグニチャー カラー アイズ' },
    { brand: 'decorte_eyeshadow', name: 'コスメデコルテ アイグロウジェム / コントゥアリング アイシャドウ', query: 'コスメデコルテ アイグロウジェム スキンシャドウ' },
    { brand: 'chanel_eyeshadow', name: 'シャネル レ キャトル オンブル', query: 'シャネル レ キャトル オンブル アイシャドウ' },
    { brand: 'addiction_eyeshadow', name: 'アディクション ザ アイシャドウ パレット ＋', query: 'アディクション ザ アイシャドウ パレット' },
    { brand: 'tomford_eyeshadow', name: 'トム フォード アイ カラー クォード', query: 'トムフォード アイ カラー クォード' },
    { brand: 'excel_eyeshadow', name: 'エクセル スキニーリッチシャドウ / リアルクローズシャドウ', query: 'エクセル スキニーリッチシャドウ' },
    { brand: 'canmake_eyeshadow', name: 'キャンメイク シルキースフレアイズ / プティパレットアイズ', query: 'キャンメイク シルキースフレアイズ' },
    { brand: 'dasique_eyeshadow', name: 'デイジーク シャドウ パレット', query: 'デイジーク シャドウ パレット dasique' }
  ];

  const paletteItems = [];
  for (const cfg of paletteConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        paletteItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿リップオイル＆美容液トリートメントグロス ---
  console.log('\n=== テーマ2: 高保湿リップオイル＆美容液トリートメントグロス ===');
  const lipOilConfigs = [
    { brand: 'clarins_lipoil', name: 'クラランス リップコンフォートオイル', query: 'クラランス リップコンフォートオイル 7ml' },
    { brand: 'dior_lipoil', name: 'ディオール アディクト リップ グロウ オイル', query: 'ディオール アディクト リップ グロウ オイル' },
    { brand: 'jillstuart_lipoil', name: 'ジルスチュアート リップブロッサム グロウ / リップセラム', query: 'ジルスチュアート リップ グロウ セラムバーム' },
    { brand: 'bobbibrown_lipoil', name: 'ボビイ ブラウン エクストラ リップ ティント / クラッシュド オイル インフューズド グロス', query: 'ボビイブラウン クラッシュド オイル インフューズド グロス' },
    { brand: 'hermes_lipoil', name: 'エルメス エルメジスティブル リップ オイル', query: 'エルメス エルメジスティブル リップ オイル' },
    { brand: 'rmk_lipoil', name: 'RMK リップジェリーグロス / リップオイル', query: 'RMK リップジェリーグロス' },
    { brand: 'excel_lipoil', name: 'エクセル リップケアオイル', query: 'エクセル リップケアオイル' },
    { brand: 'romand_lipoil', name: 'ロムアンド グラスティング ウォーター グロス', query: 'ロムアンド グラスティング ウォーター グロス rom&nd' },
    { brand: 'tirtir_lipoil', name: 'TIRTIR マイグロウ リップオイル', query: 'TIRTIR マイグロウ リップオイル' },
    { brand: 'torriden_lipoil', name: 'トリデン ソリッドイン セラミド リップエッセンス', query: 'トリデン ソリッドイン セラミド リップエッセンス' }
  ];

  const lipOilItems = [];
  for (const cfg of lipOilConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipOilItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 予算別・クリスマス＆ホリデーコスメギフト ---
  console.log('\n=== テーマ3: 予算別・クリスマス＆ホリデーコスメギフト ===');
  const giftConfigs = [
    { brand: 'dior_lebaume', name: 'ディオール ル ボーム (マルチクリーム)', query: 'ディオール ル ボーム 50ml' },
    { brand: 'chanel_crememain', name: 'シャネル ラ クレーム マン (ハンドクリーム)', query: 'シャネル ラ クレーム マン 50ml' },
    { brand: 'aesop_handbalm', name: 'イソップ レスレクション / アンドラム アロマティック ハンドバーム', query: 'イソップ レスレクション ハンドバーム 75ml' },
    { brand: 'shiro_sabon', name: 'SHIRO サボン / ホワイトリリー オードパルファン・ボディコロン', query: 'SHIRO サボン オードパルファン 40ml' },
    { brand: 'jillstuart_giftset', name: 'ジルスチュアート ハンドクリーム＆リップバーム ギフトセット', query: 'ジルスチュアート ハンドクリーム リップバーム ギフト' },
    { brand: 'buly_pommade', name: 'オフィシーヌ・ユニヴェルセル・ビュリー ポマード・コンクレット', query: 'ビュリー ポマード コンクレット 75ml' },
    { brand: 'jomalone_cologne', name: 'ジョー マローン ロンドン イングリッシュ ペアー ＆ フリージア コロン', query: 'ジョーマローン イングリッシュ ペアー ＆ フリージア コロン 30ml' },
    { brand: 'uka_kenzan', name: 'uka ウカ スカルプブラシ ケンザン', query: 'uka スカルプブラシ ケンザン' },
    { brand: 'sabon_handscrub', name: 'SABON サボン ハンドクリーム＆スクラブ ギフトセット', query: 'SABON ギフト ハンドクリーム スクラブ' },
    { brand: 'loccitane_handset', name: 'ロクシタン ハンドクリーム＆シアバター ギフトセット', query: 'ロクシタン ハンドクリーム ギフト ボックス' }
  ];

  const giftItems = [];
  for (const cfg of giftConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        giftItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const result = {
    theme1_palette: paletteItems,
    theme2_lipoil: lipOilItems,
    theme3_gift: giftItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch22_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計取得アイテム数: パレット=${paletteItems.length}/10, リップオイル=${lipOilItems.length}/10, ギフト=${giftItems.length}/10`);
  console.log('scratch/rakuten_winter_batch22_items.json に保存しました！');
}

fetchWinterBatch22Items().catch(console.error);
