import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch49Items() {
  console.log('❄️ [11-12月冬コスメ 第49弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【飲む高濃度セラミド＆飲むコラーゲン・美容インナードリンク＆サプリ】 10選 ---
  console.log('\n=== テーマ1: 飲むセラミド＆コラーゲン・美容インナーケア ===');
  const innerConfigs = [
    { brand: 'orbis_defencera', name: 'オルビス ディフェンセラ 特定保健用食品 飲むスキンケア 米胚芽由来グルコシルセラミド 30包', query: 'オルビス ディフェンセラ 30包' },
    { brand: 'shiseido_the_collagen', name: '資生堂 ザ・コラーゲン ドリンク 50ml×10本 低分子コラーゲン ヒアルロン酸 ビタミンC', query: '資生堂 ザ コラーゲン ドリンク 10本' },
    { brand: 'chocola_bb_rich_ceramide', name: 'エーザイ チョコラBB リッチセラミド 50ml×10本 機能性表示食品 肌の潤いを逃しにくくする', query: 'チョコラBB リッチセラミド 10本' },
    { brand: 'astalift_drink_pure_collagen', name: '富士フイルム アスタリフト ドリンク ピュアコラーゲン 10000 30ml×10本 高純度低分子コラーゲン', query: 'アスタリフト ドリンク ピュアコラーゲン 10000' },
    { brand: 'pola_ba_liquid', name: 'POLA ポーラ B.A リキッド 20ml×12本 最高峰インナービューティー コラーゲンペプチド', query: 'POLA BA リキッド 12本' },
    { brand: 'lypospheric_vitamin_c', name: 'リポスフェリック ビタミンC 30包 リポソームカプセル化 高吸収型ビタミンC サプリメント', query: 'リポスフェリック ビタミンC 30包' },
    { brand: 'morinaga_delicious_collagen', name: '森永製菓 おいしいコラーゲンドリンク 125ml コラーゲンペプチド10000mg', query: '森永 おいしいコラーゲンドリンク' },
    { brand: 'dhc_ceramide_moisture', name: 'DHC セラミド モイスチュア 30日分 機能性表示食品 パイナップル由来グルコシルセラミド', query: 'DHC セラミド モイスチュア 30日分' },
    { brand: 'fancl_deep_charge_collagen', name: 'ファンケル ディープチャージ コラーゲン 30日分 HTCフィッシュコラーゲン バラつぼみエキス', query: 'ファンケル ディープチャージ コラーゲン 30日分' },
    { brand: 'taisho_alfe_deep_essence', name: '大正製薬 アルフェ ディープエッセンス 50ml×10本 セラミド 鉄分 ヒアルロン酸 美容ドリンク', query: 'アルフェ ディープエッセンス 10本' }
  ];

  const innerItems = [];
  for (const cfg of innerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 0) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        innerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【高保湿温感クレイマスク＆泥ミネラルパック・年末毛穴大掃除】 10選 ---
  console.log('\n=== テーマ2: 高保湿温感クレイマスク＆泥ミネラルパック ===');
  const clayConfigs = [
    { brand: 'kanebo_scrubbing_mud_wash', name: 'KANEBO カネボウ スクラビング マッド ウォッシュ 130g モロッコ溶岩クレイ生泥ペースト 洗顔料', query: 'KANEBO スクラビング マッド ウォッシュ 130g' },
    { brand: 'argelan_moist_clear_clay_mask', name: 'アルジェラン モイストクリア クレイマスク 120g 高保湿オーガニック海泥 植物オイル配合', query: 'アルジェラン モイストクリア クレイマスク' },
    { brand: 'innisfree_super_volcanic_clay_mask', name: 'innisfree イニスフリー スーパー ヴォルカニック ポア クレイマスク 2X 100ml 火山灰 毛穴ケア', query: 'イニスフリー スーパー ヴォルカニック ポアクレイマスク 2X' },
    { brand: 'argital_green_clay_paste', name: 'ARGITAL アルジタル グリーンクレイペースト 250ml シチリア海泥 スキンピュア フェイスパック', query: 'アルジタル グリーンクレイペースト 250ml' },
    { brand: 'decorte_clay_blanc', name: 'コスメデコルテ クレイ ブラン 171g ホワイトクレイ配合 薬用毛穴クリア洗顔料', query: 'コスメデコルテ クレイ ブラン 171g' },
    { brand: 'fancl_clay_gel_facial_wash', name: 'ファンケル 泥ジェル洗顔 120g 黒泥・白泥・海洋泥 トリプルクレイ 毛穴ジェルウォッシュ', query: 'ファンケル 泥ジェル洗顔 120g' },
    { brand: 'three_balancing_stem_clay_mask', name: 'THREE スリー バランシング ステム ピュリファイング クレイマスク 100g 天然クレイ 精油ブレンド', query: 'THREE バランシング クレイマスク' },
    { brand: 'sofina_ip_pore_clearing_gel', name: 'SOFINA iP ソフィーナiP ポア クリアリング ジェル ウォッシュ 30g 角栓崩壊 竹炭ブラックジェル', query: 'ソフィーナiP ポア クリアリング ジェル ウォッシュ 30g' },
    { brand: 'drcilabo_vc100_hot_peel_cleansing', name: 'ドクターシーラボ VC100 ホットピール クレンジングゲル EX 150g 温感スチーム 高浸透ビタミンC', query: 'VC100 ホットピール クレンジングゲル EX 150g' },
    { brand: 'sabon_3in1_dead_sea_mask', name: 'SABON サボン 3in1 デッドシーマスク 125ml 死海泥ミネラル マスク＆スクラブ＆洗顔', query: 'SABON 3in1 デッドシーマスク' }
  ];

  const clayItems = [];
  for (const cfg of clayConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        clayItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【極上スカルプソルトスクラブ＆濃密ヘッドスパクレンジング】 10選 ---
  console.log('\n=== テーマ3: 極上スカルプソルトスクラブ＆濃密ヘッドスパクレンジング ===');
  const scalpConfigs = [
    { brand: 'sabon_head_scrub_delicate_jasmine', name: 'SABON サボン ヘッドスクラブ 300g 死海ソルト 3種のボタニカルオイル 贅沢ヘッドスパ', query: 'SABON ヘッドスクラブ 300g' },
    { brand: 'davines_naturaltech_elevating_scrub', name: 'Davines ダヴィネス ナチュラルテック スクラブ エレベーティング 250ml 海塩 スカルプクレンズ', query: 'ダヴィネス ナチュラルテック スクラブ 250ml' },
    { brand: 'aveda_pramasana_scalp_cleanser', name: 'AVEDA アヴェダ プラマサナ ピュリファイング スカルプ クレンザー 150ml 頭皮用ディープクレンジング', query: 'アヴェダ プラマサナ スカルプ クレンザー 150ml' },
    { brand: 'weleda_rosemary_scalp_cleansing', name: 'WELEDA ヴェレダ ローズマリー スカルプクレンジング 200g 1本3役 クレイ＆ソルトヘッドスパ', query: 'ヴェレダ ローズマリー スカルプクレンジング 200g' },
    { brand: 'milbon_plarmia_clear_spa_foam', name: 'ミルボン プラーミア クリアスパフォーム 320g 高濃度4400ppm炭酸濃密泡 カキタンニン頭皮ケア', query: 'ミルボン プラーミア クリアスパフォーム 320g' },
    { brand: 'cocone_clay_cream_shampoo', name: 'cocone ココネ クレイクリームシャンプー 380g マイクロクレイ 海洋ミネラル オールインワンスパ', query: 'cocone クレイクリームシャンプー 380g' },
    { brand: 'loccitane_aromachologie_scalp_scrub', name: 'L\'OCCITANE ロクシタン ファイブハーブス ピュアフレッシュネス スカルプスクラブ 150ml 海塩ミント', query: 'ロクシタン スカルプ スクラブ 150ml' },
    { brand: 'thebodyshop_fuji_greentea_scalp_scrub', name: 'THE BODY SHOP ザ・ボディショップ リフレッシング スカルプスクラブ フジグリーンティ 240ml', query: 'ボディショップ スカルプスクラブ フジグリーンティ' },
    { brand: 'uka_scalp_cleansing_deep_light', name: 'uka ウカ スカルプクレンジング ディープ＆ライト 100ml アミノ酸系頭皮ディープクレンジング', query: 'uka スカルプクレンジング ディープ ライト' },
    { brand: 'lebel_theo_scalp_flex', name: 'LebeL ルベル ジオ スキャルプフレックス 230ml 温感頭皮柔軟ジェル 毛穴角栓クレンジング', query: 'ルベル ジオ スキャルプフレックス 230ml' }
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

  console.log(`\n🎉 取得完了結果:`);
  console.log(`- テーマ1 (飲むセラミド＆コラーゲン): ${innerItems.length}/10 アイテム`);
  console.log(`- テーマ2 (温感クレイマスク＆泥パック): ${clayItems.length}/10 アイテム`);
  console.log(`- テーマ3 (頭皮ソルトスクラブ＆ヘッドスパ): ${scalpItems.length}/10 アイテム`);

  const output = {
    theme1_inner: innerItems,
    theme2_clay: clayItems,
    theme3_scalp: scalpItems,
    fetchedAt: new Date().toISOString()
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch49_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch49_items.json に保存完了しました！');
}

fetchWinterBatch49Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
