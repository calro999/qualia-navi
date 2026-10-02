import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch21Items() {
  console.log('❄️ [11-12月コスメ 第21弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: ホリデー限定＆プレミアムプレストパウダー ---
  console.log('\n=== テーマ1: ホリデー限定＆プレミアムプレストパウダー ===');
  const powderConfigs = [
    { brand: 'milanocollection', name: 'カネボウ ミラノコレクション フェースアップパウダー', query: 'ミラノコレクション フェースアップパウダー 2026 カネボウ' },
    { brand: 'elegance_powder', name: 'エレガンス ラ プードル オートニュアンス', query: 'エレガンス ラ プードル オートニュアンス' },
    { brand: 'decorte_marcel', name: 'コスメデコルテ マルセル ワンダース コレクション / AQ オーラリフレクター', query: 'コスメデコルテ AQ オーラ リフレクター' },
    { brand: 'snowbeauty', name: '資生堂 スノービューティー ブライトニング スキンケアパウダー', query: '資生堂 スノービューティー ブライトニング スキンケアパウダー' },
    { brand: 'chanel_compact', name: 'シャネル プードル ユニヴェルセル コンパクト', query: 'シャネル プードル ユニヴェルセル コンパクト' },
    { brand: 'dior_powder', name: 'ディオール ディオールスキン フォーエヴァー クッション パウダー / コンパクト', query: 'ディオールスキン フォーエヴァー コンパクト ナチュラル ベルベット' },
    { brand: 'nars_powder', name: 'NARS ライトリフレクティングセッティングパウダー プレスト N', query: 'NARS ライトリフレクティングセッティングパウダー プレスト' },
    { brand: 'suqqu_powder', name: 'SUQQU スムース マット ルース パウダー / リタッチ プレスト パウダー', query: 'SUQQU オイル リッチ グロウ ルース パウダー' },
    { brand: 'canmake_marshmallow', name: 'キャンメイク マシュマロフィニッシュパウダー Abloom', query: 'キャンメイク マシュマロフィニッシュパウダー Abloom' },
    { brand: 'cezanne_silk', name: 'セザンヌ 毛穴レスパウダー / UVシルクカバーパウダー', query: 'セザンヌ UVシルクカバーパウダー' }
  ];

  const powderItems = [];
  for (const cfg of powderConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        powderItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 最高峰エイジングケアクリーム ---
  console.log('\n=== テーマ2: 最高峰エイジングケアクリーム ===');
  const creamConfigs = [
    { brand: 'decorte_liposome_cream', name: 'コスメデコルテ リポソーム アドバンスト リペアクリーム', query: 'コスメデコルテ リポソーム アドバンスト リペアクリーム 50g' },
    { brand: 'kanebo_night_cream', name: 'KANEBO カネボウ クリーム イン ナイト', query: 'カネボウ クリーム イン ナイト 40g' },
    { brand: 'sk2_skinpower', name: 'SK-II スキンパワー アドバンスト クリーム', query: 'SK-II スキンパワー アドバンスト クリーム 80g' },
    { brand: 'cledepeau_creme', name: 'クレ・ド・ポー ボーテ クレームアンタンシヴ n / ラ・クレーム', query: 'クレ・ド・ポー ボーテ クレームアンタンシヴ n' },
    { brand: 'lancome_absolue', name: 'ランコム レネルジー H.P.N. クリーム / アプソリュ ソフトクリーム', query: 'ランコム レネルジー H.P.N. クリーム' },
    { brand: 'esteelauder_cream', name: 'エスティ ローダー シュープリーム プラス YP クリーム', query: 'エスティローダー シュープリーム プラス YP クリーム' },
    { brand: 'kiehls_multi_cream', name: 'キールズ クリーム UFC / SP マルチクリーム', query: 'キールズ SP マルチクリーム 50ml' },
    { brand: 'shiseido_vital_cream', name: 'SHISEIDO バイタルパーフェクション アドバンスクリーム', query: 'SHISEIDO バイタルパーフェクション アドバンスクリーム' },
    { brand: 'obagi_stem_cream', name: 'オバジ ダーマパワーX ステムリフト クリーム', query: 'オバジ ダーマパワーX ステムリフト クリーム 50g' },
    { brand: 'curel_moisture_cream', name: 'キュレル 潤浸保湿フェイスクリーム', query: 'キュレル 潤浸保湿フェイスクリーム 40g' }
  ];

  const creamItems = [];
  for (const cfg of creamConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        creamItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高保湿クレンジングミルク＆美容液クリームクレンジング ---
  console.log('\n=== テーマ3: 高保湿クレンジングミルク＆クリームクレンジング ===');
  const cleanseConfigs = [
    { brand: 'covermark_milk', name: 'カバーマーク トリートメント クレンジング ミルク', query: 'カバーマーク トリートメント クレンジング ミルク 200g' },
    { brand: 'kanebo_off_cream', name: 'KANEBO カネボウ エンリッチド オフ クリーム', query: 'カネボウ エンリッチド オフ クリーム' },
    { brand: 'decorte_aq_cleansing', name: 'コスメデコルテ AQ ミリオリティ リペア クレンジングクリーム n', query: 'コスメデコルテ AQ ミリオリティ リペア クレンジングクリーム' },
    { brand: 'orbis_off_cream', name: 'オルビス オフクリーム', query: 'オルビス オフクリーム 100g' },
    { brand: 'chantacharm_milk', name: 'チャントアチャーム クレンジングミルク', query: 'チャントアチャーム クレンジングミルク 130ml' },
    { brand: 'weleda_cleansing', name: 'ヴェレダ アーモンド クレンジングミルク / モイスチャークレンジングミルク', query: 'ヴェレダ モイスチャー クレンジングミルク' },
    { brand: 'parado_milk', name: 'パラドゥ スキンケアクレンジング', query: 'パラドゥ スキンケアクレンジング 120g' },
    { brand: 'suisai_cleansing', name: 'カネボウ スイサイ ビューティクリア シェイククレンジング / クレンジングクリーム', query: 'カネボウ スイサイ クレンジングクリーム' },
    { brand: 'minon_cleansing', name: 'ミノン アミノモイスト モイストミルキィ クレンジング', query: 'ミノン アミノモイスト モイストミルキィ クレンジング 100g' },
    { brand: 'fancl_cream', name: 'ファンケル 整肌クレンジング ジェル / クリーム', query: 'ファンケル 整肌クレンジング ジェル' }
  ];

  const cleanseItems = [];
  for (const cfg of cleanseConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cleanseItems.push(valid);
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
    theme1_powder: powderItems,
    theme2_cream: creamItems,
    theme3_cleanse: cleanseItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch21_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ 楽天OpenAPIから3テーマ合計 ${powderItems.length + creamItems.length + cleanseItems.length} アイテムを取得し scratch/rakuten_winter_batch21_items.json に保存しました！`);
}

fetchWinterBatch21Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
