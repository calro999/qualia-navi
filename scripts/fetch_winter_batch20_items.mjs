import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchBatch20Items() {
  console.log('❄️ [11-12月コスメ 第20弾] 楽天APIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 高保湿リップティント＆メルティングバーム ---
  console.log('\n=== テーマ1: 高保湿リップティント＆メルティングバーム ===');
  const tintConfigs = [
    { brand: 'kate', name: 'ケイト リップモンスター', query: 'ケイト リップモンスター 口紅' },
    { brand: 'romand', name: 'ロムアンド グラスティング メルティングバーム', query: 'ロムアンド グラスティング メルティングバーム' },
    { brand: 'laka', name: 'Laka フルーティーグラムティント', query: 'Laka フルーティーグラムティント' },
    { brand: 'amuse', name: 'AMUSE デューティント / ベベティント', query: 'アミューズ デューティント AMUSE' },
    { brand: 'dior_tint', name: 'ディオール アディクト リップ ティント', query: 'ディオール アディクト リップ ティント' },
    { brand: 'bbia', name: 'BBIA ローティント', query: 'BBIA ローティント グロー' },
    { brand: 'hince_tint', name: 'hince ムードインハンサー リキッドグロウ / ウォーターリキッド', query: 'hince ムードインハンサー リキッドグロウ' },
    { brand: 'ysl', name: 'イヴ・サンローラン ルージュ ヴォリュプテ キャンディグレーズ', query: 'イヴサンローラン キャンディグレーズ' },
    { brand: 'canmake_tint', name: 'キャンメイク むちぷるティント', query: 'キャンメイク むちぷるティント' },
    { brand: 'fujiko_tint', name: 'フジコ ニュアンスラップティント', query: 'フジコ ニュアンスラップティント' }
  ];

  const tintItems = [];
  for (const cfg of tintConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        tintItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: リキッドハイライター＆濡れツヤグロウスティック ---
  console.log('\n=== テーマ2: リキッドハイライター＆濡れツヤグロウスティック ===');
  const glowConfigs = [
    { brand: 'chanel_stick', name: 'シャネル ボーム エサンシエル', query: 'シャネル ボーム エサンシエル' },
    { brand: 'dior_glow', name: 'ディオールスキン フォーエヴァー グロウ マキシマイザー', query: 'ディオールスキン フォーエヴァー グロウ マキシマイザー' },
    { brand: 'hince_stick', name: 'hince トゥルーディメンション ラディアンスバーム', query: 'hince トゥルーディメンション ラディアンスバーム' },
    { brand: 'decorte_glow', name: 'コスメデコルテ ディップイン グロウ クリーム ハイライター', query: 'コスメデコルテ ディップイン グロウ' },
    { brand: 'rmk_glow', name: 'RMK ルミナス メイクアップベース / カラースティック', query: 'RMK グロースティック' },
    { brand: 'canmake_highlighter', name: 'キャンメイク むにゅっとハイライター', query: 'キャンメイク むにゅっとハイライター' },
    { brand: 'cezanne_glow', name: 'セザンヌ パールグロウハイライト', query: 'セザンヌ パールグロウハイライト' },
    { brand: 'etvos_glow', name: 'エトヴォス ミネラルラディアントスキンバーム', query: 'エトヴォス ミネラルラディアントスキンバーム' },
    { brand: 'lauramercier', name: 'ローラ メルシエ ローズグロウ リキッド カラーハイライター', query: 'ローラメルシエ ローズグロウ リキッドハイライター' },
    { brand: 'mac_glow', name: 'M・A・C ストロボクリーム', query: 'MAC ストロボクリーム 50ml' }
  ];

  const glowItems = [];
  for (const cfg of glowConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        glowItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高保湿スカルプローション＆頭皮用保湿エッセンス ---
  console.log('\n=== テーマ3: 高保湿スカルプローション＆頭皮用保湿エッセンス ===');
  const scalpConfigs = [
    { brand: 'curel_scalp', name: 'キュレル 頭皮保湿ローション', query: 'キュレル 頭皮保湿ローション 120ml' },
    { brand: 'milbon_scalp', name: 'ミルボン オージュア モイストカーム モイスチュアローション', query: 'オージュア モイストカーム モイスチュアローション' },
    { brand: 'aveda_scalp', name: 'アヴェダ インヴァティ アドバンス スカルプ エッセンス', query: 'アヴェダ インヴァティ スカルプ エッセンス' },
    { brand: 'shiseido_sublimic', name: '資生堂 サブリミック フェンテフォルテ ハイドレーティング セラム', query: 'サブリミック フェンテフォルテ ハイドレーティング セラム' },
    { brand: 'uka_scalp', name: 'uka スカルプクレンジング ディープ＆ライト / スカルプセラム', query: 'uka スカルプクレンジング 深頭皮' },
    { brand: 'weleda_scalp', name: 'ヴェレダ オーガニック ヘアトニック', query: 'ヴェレダ オーガニック ヘアトニック 100ml' },
    { brand: 'lacasta_scalp', name: 'ラ・カスタ アロマエステ スキャルプ リペア エッセンス', query: 'ラ・カスタ アロマエステ スキャルプ エッセンス' },
    { brand: 'loccitane_scalp', name: 'ロクシタン 薬用 メディカル アンチヘアロスセラム', query: 'ロクシタン スカルプ ナイトセラム' },
    { brand: 'etvos_scalp', name: 'エトヴォス メディカル スカルプエッセンス', query: 'エトヴォス スカルプエッセンス' },
    { brand: 'lebel_scalp', name: 'ルベル ルートサプリ / リコミント スカルプエッセンス', query: 'ルベル リコミント ルートサプリ' }
  ];

  const scalpItems = [];
  for (const cfg of scalpConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        scalpItems.push(valid);
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
    batch: 20,
    theme1_tint: tintItems,
    theme2_glow: glowItems,
    theme3_scalp: scalpItems
  };

  const outPath = 'scratch/rakuten_winter_batch20_items.json';
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`\n🎉 完了！ 厳選アイテムを ${outPath} に保存しました！`);
  console.log(`- 高保湿リップティント: ${tintItems.length}/10`);
  console.log(`- 濡れツヤハイライター: ${glowItems.length}/10`);
  console.log(`- 高保湿スカルプローション: ${scalpItems.length}/10`);
}

fetchBatch20Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
