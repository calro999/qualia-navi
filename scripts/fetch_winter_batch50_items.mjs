import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch50Items() {
  console.log('❄️ [11-12月冬コスメ 第50弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【粉ふき乾燥ボディ＆ひび割れかかとを即効レスキュー】高保湿ボディミルク＆濃厚ボディバター・パーツ集中リペアバーム 10選 ---
  console.log('\n=== テーマ1: 高保湿ボディミルク＆濃厚ボディバター・集中リペアバーム ===');
  const bodyConfigs = [
    { brand: 'lauramercier_amber_vanilla', name: 'ローラ メルシエ ホイップトボディクリーム アンバーバニラ 300g 甘く官能的な香りと至高の高保湿', query: 'ローラメルシエ ボディクリーム アンバーバニラ 300g' },
    { brand: 'loccitane_shea_body_cream', name: 'ロクシタン シア リッチボディクリーム 200ml シアバター25%配合 超濃密高保湿', query: 'ロクシタン シア リッチボディクリーム 200ml' },
    { brand: 'thebodyshop_body_butter_shea', name: 'THE BODY SHOP ザ・ボディショップ ボディバター シア 200ml 96時間高保湿 ヴィーガン処方', query: 'ボディショップ ボディバター シア 200ml' },
    { brand: 'sabon_repair_body_cream', name: 'SABON サボン リペアボディクリーム パチュリ・ラベンダー・バニラ 200ml ジェリコローズ 集中修復', query: 'SABON リペアボディクリーム 200ml' },
    { brand: 'neutrogena_cica_emulsion', name: 'ニュートロジーナ ノルウェーフォーミュラ インテンスリペア CICA エマルジョン 250ml 純度99%グリセリン', query: 'ニュートロジーナ CICA エマルジョン 250ml' },
    { brand: 'yuskin_medicated_cream_120g', name: 'ユースキン 120g ポンプ または ボトル 指定医薬部外品 ひび あかぎれ しもやけ ビタミン系クリーム', query: 'ユースキン 120g' },
    { brand: 'houseofrose_moist_barrier_rich', name: 'ハウス オブ ローゼ モイストバリア リッチボディクリーム 180g セラミド配合 高保湿粉ふき防止', query: 'ハウスオブローゼ モイストバリア ボディクリーム' },
    { brand: 'clarins_moisture_rich_body_lotion', name: 'クラランス モイスチャー リッチ ボディ ローション 200ml シアバター ハリ弾力', query: 'クラランス モイスチャー リッチ ボディ ローション 200ml' },
    { brand: 'curel_deep_moisture_spray_250g', name: 'キュレル ディープモイスチャースプレー 250g 医薬部外品 セラミド機能成分 全身保湿スプレー', query: 'キュレル ディープモイスチャースプレー 250g' },
    { brand: 'curel_moisture_balm_70g', name: 'キュレル モイスチャーバーム 70g 医薬部外品 濃厚バーム ひび割れ粉ふき かかと・ひじ集中ケア', query: 'キュレル モイスチャーバーム 70g' }
  ];

  const bodyItems = [];
  for (const cfg of bodyConfigs) {
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
        bodyItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【暖房乾燥でも粉浮きゼロ＆極上シルク肌】高保湿フェイスパウダー＆しっとり美容液ルースパウダー 10選 ---
  console.log('\n=== テーマ2: 高保湿フェイスパウダー＆しっとり美容液ルースパウダー ===');
  const powderConfigs = [
    { brand: 'decorte_loose_powder_new', name: 'コスメデコルテ ルース パウダー 20g 2024リニューアル 光のヴェール 生ツヤ高保湿パウダー', query: 'コスメデコルテ ルース パウダー 20g' },
    { brand: 'elegance_la_poudre_haute_nuance', name: 'エレガンス ラ プードル オートニュアンス 8.8g プレストパウダー 至高の透明感・耐皮脂・粉感ゼロ', query: 'エレガンス ラ プードル オートニュアンス 8.8g' },
    { brand: 'nars_light_reflecting_setting_powder', name: 'NARS ナーズ ライトリフレクティングセッティングパウダー プレスト N 10g リフ粉 光反射毛穴レス', query: 'NARS ライトリフレクティングセッティングパウダー プレスト N' },
    { brand: 'givenchy_prisme_libre_loose_powder', name: 'GIVENCHY ジバンシイ プリズム・リーブル 4色ルースパウダー 極上のオーラ肌・寒冷くすみ補正', query: 'ジバンシイ プリズム リーブル ルースパウダー' },
    { brand: 'lauramercier_translucent_ultra_blur', name: 'ローラ メルシエ トランスルーセント ルース セッティング パウダー ウルトラブラー 20g ヒアルロン酸配合', query: 'ローラメルシエ ウルトラブラー 20g' },
    { brand: 'suqqu_oil_rich_glow_loose_powder', name: 'SUQQU スック オイル リッチ グロウ ルース パウダー 15g 美容オイル高配合 濡れツヤ肌', query: 'SUQQU オイル リッチ グロウ ルース パウダー 15g' },
    { brand: 'kanebo_milano_collection_face_powder', name: 'カネボウ ミラノコレクション フェースアップパウダー 24g ヒアルロン酸・ローヤルゼリー 芸術的仕上がり', query: 'ミラノコレクション フェースアップパウダー 24g' },
    { brand: 'chacott_finishing_powder_moist', name: 'チャコット・コスメティクス フィニッシングパウダー モイスト 20g アルガンオイル・シアバター 高保湿', query: 'チャコット フィニッシングパウダー モイスト 20g' },
    { brand: 'canmake_silky_loose_moist_powder', name: 'キャンメイク シルキールースモイストパウダー 6.0g 保湿成分27種配合 プチプラしっとり生ツヤパウダー', query: 'キャンメイク シルキールースモイストパウダー' },
    { brand: 'innisfree_no_sebum_moisture_powder', name: 'イニスフリー ノーセバム モイスチャー パウダー 5g 天然ミネラル 植物性保湿パウダー 乾燥崩れ防止', query: 'イニスフリー ノーセバム モイスチャー パウダー' }
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

  // --- テーマ3: 【ニット静電気＆マフラー擦れのパサつき毛先を密着補修】高保湿ヘアオイル＆濃密アウトバスヘアミルク 10選 ---
  console.log('\n=== テーマ3: 高保湿ヘアオイル＆濃密アウトバスヘアミルク ===');
  const hairConfigs = [
    { brand: 'orbis_essence_in_hair_milk', name: 'オルビス エッセンスインヘアミルク 140g 無香料 浸透美容液成分配合 うるおい毛先補修', query: 'オルビス エッセンスインヘアミルク 140g' },
    { brand: 'moroccanoil_treatment_original', name: 'モロッカンオイル トリートメント 100ml アルガンオイル配合 冬の静電気防止・ツヤ髪', query: 'モロッカンオイル トリートメント 100ml' },
    { brand: 'kerastase_oleo_relax_serum', name: 'ケラスターゼ DP フルイド オレオ リラックス 100ml くせ毛・広がり・乾燥毛用 至高のアウトバスオイル', query: 'ケラスターゼ フルイド オレオ リラックス 100ml' },
    { brand: 'milbon_elujuda_emulsion_plus', name: 'ミルボン ディーセス エルジューダ エマルジョン+ 120g バオバブエキス配合 硬毛・乾燥毛用ミルク', query: 'ミルボン エルジューダ エマルジョン+ 120g' },
    { brand: 'refa_lock_oil_100ml', name: 'MTG ReFa リファ ロックオイル 100ml アイロン前の熱保護 スタイリングキープ ツヤ髪オイル', query: 'リファ ロックオイル 100ml' },
    { brand: 'track_oil_no3_kinmokusei', name: 'track トラック オイル No.3 90ml 金木犀の香り 天然由来成分99.19% 濃密ツヤ束感リッチオイル', query: 'トラック オイル No.3 90ml' },
    { brand: 'napla_n_dot_polish_oil_150ml', name: 'ナプラ N. エヌドット ポリッシュオイル 150ml シアバター配合 天然由来オイル 保湿・ウェット質感', query: 'エヌドット ポリッシュオイル 150ml' },
    { brand: 'lacasta_hair_emulsion_80ml', name: 'ラ・カスタ アロマエステ ヘアエマルジョン 80ml オーガニック植物成分配合 洗い流さないヘアトリートメント', query: 'ラカスタ アロマエステ ヘアエマルジョン 80ml' },
    { brand: 'uka_hair_oil_windy_lady', name: 'uka ウカ ヘアオイル ウィンディレディ 50ml 強風・乾燥・静電気から髪を守るなめらかオイル', query: 'uka ヘアオイル ウィンディレディ' },
    { brand: 'oshimatsubaki_camellia_oil_60ml', name: '大島椿 椿油 60ml 天然椿油100% 髪・頭皮・肌のマルチ保湿 静電気・乾燥防止の伝統名品', query: '大島椿 60ml 椿油' }
  ];

  const hairItems = [];
  for (const cfg of hairConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        hairItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n🎉 第50弾 取得完了結果:`);
  console.log(`- テーマ1 (ボディミルク＆ボディバター・バーム): ${bodyItems.length}/10 アイテム`);
  console.log(`- テーマ2 (高保湿フェイスパウダー・ルースパウダー): ${powderItems.length}/10 アイテム`);
  console.log(`- テーマ3 (アウトバスヘアオイル＆ヘアミルク): ${hairItems.length}/10 アイテム`);

  const output = {
    theme1_body: bodyItems,
    theme2_powder: powderItems,
    theme3_hair: hairItems,
    fetchedAt: new Date().toISOString()
  };

  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/rakuten_winter_batch50_items.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch50_items.json に保存完了しました！');
}

fetchWinterBatch50Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
