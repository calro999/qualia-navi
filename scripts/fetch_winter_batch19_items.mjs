import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchBatch19Items() {
  console.log('❄️ [11-12月コスメ 第19弾] 楽天APIからリアルタイムで30アイテムを取得します...');

  // --- テーマ1: リッププランパー＆ボリュームツヤリップ美容液 ---
  console.log('\n=== テーマ1: リッププランパー＆ボリュームツヤリップ美容液 ===');
  const plumperConfigs = [
    { brand: 'dior', name: 'ディオール アディクト リップ マキシマイザー', query: 'ディオール アディクト リップ マキシマイザー 正規品' },
    { brand: 'jillstuart', name: 'ジルスチュアート クリスタルブルーム リップブーケ セラム', query: 'ジルスチュアート リップブーケ セラム' },
    { brand: 'visee', name: 'ヴィセ エッセンス リッププランパー', query: 'ヴィセ エッセンス リッププランパー' },
    { brand: 'bobbibrown', name: 'ボビイ ブラウン エクストラ プランプ リップ セラム', query: 'ボビイブラウン エクストラ プランプ リップ セラム' },
    { brand: 'clarins', name: 'クラランス リップコンフォートオイル', query: 'クラランス リップコンフォートオイル' },
    { brand: 'tirtir', name: 'TIRTIR ウォーターリズム リッププランパー', query: 'TIRTIR ウォーターリズム リッププランパー' },
    { brand: 'canmake', name: 'キャンメイク プランプリップケアスクラブ', query: 'キャンメイク プランプリップケアスクラブ' },
    { brand: 'fujiko', name: 'フジコ プランピーリップ', query: 'フジコ プランピーリップ' },
    { brand: 'keybo', name: 'キボ ドトム リッププラス プランパー', query: 'キボ リッププラス プランパー keybo' },
    { brand: 'etvos', name: 'エトヴォス ミネラルリッププランパー シアー', query: 'エトヴォス ミネラルリッププランパー' }
  ];

  const plumperItems = [];
  for (const cfg of plumperConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        plumperItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 酵素洗顔パウダー＆温感角質ピール ---
  console.log('\n=== テーマ2: 酵素洗顔パウダー＆角質ピール ===');
  const washConfigs = [
    { brand: 'obagi', name: 'オバジC 酵素洗顔パウダー', query: 'オバジC 酵素洗顔パウダー' },
    { brand: 'fancl', name: 'ファンケル ディープクリア 洗顔パウダー', query: 'ファンケル ディープクリア 洗顔パウダー' },
    { brand: 'suisai', name: 'スイサイ ビューティクリア パウダーウォッシュN', query: 'スイサイ ビューティクリア パウダーウォッシュ' },
    { brand: 'kanebo', name: 'カネボウ クラリファイング パウダー ウォッシュ', query: 'カネボウ クラリファイング パウダー ウォッシュ' },
    { brand: 'takami', name: 'タカミスキンピール 30ml', query: 'タカミスキンピール 30ml 角質美容水' },
    { brand: 'vt', name: 'VT シカ カプセルマスク', query: 'VT シカ カプセルマスク 10個' },
    { brand: 'curel', name: 'キュレル 潤浸保湿 泡洗顔料', query: 'キュレル 潤浸保湿 泡洗顔料 本体' },
    { brand: 'minon', name: 'ミノン アミノモイスト クリアウォッシュ パウダー', query: 'ミノン アミノモイスト クリアウォッシュ パウダー' },
    { brand: 'orbis', name: 'オルビス パウダーウォッシュプラス', query: 'オルビス パウダーウォッシュプラス' },
    { brand: 'sensai', name: 'センサイ SP クリアジェルウォッシュ', query: 'センサイ クリアジェルウォッシュ' }
  ];

  const washItems = [];
  for (const cfg of washConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        washItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 静電気防止ヘアミスト＆美髪ツヤスプレー ---
  console.log('\n=== テーマ3: 静電気防止ヘアミスト＆美髪ツヤスプレー ===');
  const mistConfigs = [
    { brand: 'jillstuart_hair', name: 'ジルスチュアート トリートメント ヘアミスト ホワイトフローラル', query: 'ジルスチュアート トリートメント ヘアミスト ホワイトフローラル' },
    { brand: 'dior_hair', name: 'ミス ディオール ヘアミスト', query: 'ミス ディオール ヘアミスト 30ml' },
    { brand: 'refa', name: 'リファ ロックオイル ライト / ロックミスト', query: 'ReFa リファ ロックオイル ライト 100ml' },
    { brand: 'milbon', name: 'ミルボン エルジューダ ブリーチケア セラム', query: 'ミルボン エルジューダ ブリーチケア セラム 120ml' },
    { brand: 'shiro', name: 'SHIRO ホワイトリリー ヘアミスト', query: 'SHIRO ホワイトリリー ヘアミスト 80ml' },
    { brand: 'napla', name: 'ナプラ N. ベースヘアスプレー 1', query: 'ナプラ N. ベースヘアスプレー 1 160g' },
    { brand: 'chanel', name: 'シャネル チャンス オー タンドゥル ヘアミスト', query: 'シャネル チャンス オー タンドゥル ヘアミスト 35ml' },
    { brand: 'moroccanoil', name: 'モロッカンオイル オールインワン リーブイン コンディショナー', query: 'モロッカンオイル オールインワン リーブイン コンディショナー 160ml' },
    { brand: 'lacasta', name: 'ラ・カスタ アロマエステ ヘアローション モイスト', query: 'ラ・カスタ アロマエステ ヘアローション 150ml' },
    { brand: 'stephenknoll', name: 'スティーブンノル モイスチュア リペアミスト', query: 'スティーブンノル モイスチュア リペアミスト 250ml' }
  ];

  const mistItems = [];
  for (const cfg of mistConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        mistItems.push(valid);
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
    batch: 19,
    theme1_plumper: plumperItems,
    theme2_wash: washItems,
    theme3_mist: mistItems
  };

  const outPath = 'scratch/rakuten_winter_batch19_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n🎉 完了！ 厳選アイテムを ${outPath} に保存しました！`);
  console.log(`- リッププランパー: ${plumperItems.length}/10`);
  console.log(`- 酵素洗顔・角質ピール: ${washItems.length}/10`);
  console.log(`- ヘアミスト・静電気防止: ${mistItems.length}/10`);
}

fetchBatch19Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
