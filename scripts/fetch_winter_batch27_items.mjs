import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch27Items() {
  console.log('❄️ [11-12月コスメ 第27弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得します...');

  // --- テーマ1: 高保湿スティック美容液＆うるおいマルチバームスティック 10選 ---
  console.log('\n=== テーマ1: 高保湿スティック美容液＆うるおいマルチバームスティック ===');
  const stickSerumConfigs = [
    { brand: 'ipsa_the_time_r_day_essence_stick', name: 'IPSA イプサ ザ・タイムR デイエッセンススティック', query: 'イプサ ザ・タイムR デイエッセンススティック' },
    { brand: 'kahi_wrinkle_bounce_multi_balm', name: 'KAHI カヒ リンクルバウンス マルチバーム', query: 'KAHI マルチバーム' },
    { brand: 'kanebo_smile_performer_stick', name: 'KANEBO カネボウ スティック美容液 / ドローイングペンシル', query: 'カネボウ 美容液 スティック' },
    { brand: 'd_program_balm_stick', name: '資生堂 dプログラム バームスティック / 薬用スキンリペア', query: 'dプログラム バーム' },
    { brand: 'elixir_pocket_repair_stick', name: '資生堂 エリクシール ポケットリペア スティック / つや玉ミスト', query: 'エリクシール スティック 美容液' },
    { brand: 'etvos_mineral_radiant_skin_balm', name: 'ETVOS エトヴォス ミネラルラディアントスキンバーム', query: 'エトヴォス ミネラルラディアントスキンバーム' },
    { brand: 'mimc_beauty_bio_moisture_stick', name: 'MiMC エムアイエムシー ビオモイスチュアスティック', query: 'MiMC ビオモイスチュアスティック' },
    { brand: 'nature_republic_hyalon_stick_balm', name: 'ネイチャーリパブリック スティックバーム / コラーゲン', query: 'ネイチャーリパブリック スティックバーム' },
    { brand: 'b_idol_tsuyapuru_stick_serum', name: 'BIDOL ビーアイドル スティック美容液 / つやぷる', query: 'ビーアイドル 美容液' },
    { brand: 'kanzousan_moist_stick_serum', name: '乾燥さん 保湿力スキンケアバーム / スティック美容液', query: '乾燥さん スキンケアバーム' }
  ];

  const stickSerumItems = [];
  for (const cfg of stickSerumConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        stickSerumItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿ペン型ネイルオイル＆ロールオン・キューティクル美容液 10選 ---
  console.log('\n=== テーマ2: 高保湿ペン型ネイルオイル＆ロールオン・キューティクル美容液 ===');
  const nailOilConfigs = [
    { brand: 'uka_nail_oil_2445', name: 'uka ウカ ネイルオイル 24:45 / 7:15 / 13:00', query: 'uka ネイルオイル 24:45' },
    { brand: 'dior_creme_abricot_serum', name: 'Dior ディオール クレーム アブリコ セラム / ネイルオイル', query: 'ディオール セラム アブリコ' },
    { brand: 'opi_pro_spa_nail_cuticle_oil', name: 'OPI オーピーアイ プロスパ ネイル＆キューティクルオイル トゥーゴー', query: 'OPI プロスパ ネイルオイル トゥーゴー' },
    { brand: 'loccitane_shea_nail_cuticle_oil', name: 'ロクシタン シア ネイルオイル 7.5ml', query: 'ロクシタン シア ネイルオイル' },
    { brand: 'shiro_white_lily_nail_oil', name: 'SHIRO シロ ホワイトリリー ネイルオイル / サボン', query: 'SHIRO ホワイトリリー ネイルオイル' },
    { brand: 'muji_nail_care_oil_pen', name: '無印良品 ネイルケアオイル ペン型', query: '無印良品 ネイルケアオイル' },
    { brand: 'excel_essence_nail_oil', name: 'エクセル エッセンスネイルオイル', query: 'エクセル エッセンスネイルオイル' },
    { brand: 'belinda_cube_nail_oil', name: 'ベリンダ キューティクルオイル フラワー キューブ', query: 'ベリンダ ネイルオイル' },
    { brand: 'nail_holic_repair_milky_oil', name: 'コーセー ネイルホリック キューティクルオイル', query: 'ネイルホリック キューティクルオイル' },
    { brand: 'jillstuart_flower_nail_oil', name: 'JILL STUART ジルスチュアート アロマティックフラワー ネイルオイル', query: 'ジルスチュアート ネイルオイル' }
  ];

  const nailOilItems = [];
  for (const cfg of nailOilConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        nailOilItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高保湿ネック＆デコルテ専用クリーム・リフト美容液 10選 ---
  console.log('\n=== テーマ3: 高保湿ネック＆デコルテ専用クリーム・リフト美容液 ===');
  const neckCreamConfigs = [
    { brand: 'clarins_firming_ex_neck_decollete', name: 'クラランス ファーミング EX ネック＆デコルテ SP', query: 'クラランス ファーミング EX ネック' },
    { brand: 'decorte_aq_concentrate_neck_cream', name: 'コスメデコルテ AQ コンセントレイト ネッククリーム', query: 'コスメデコルテ AQ ネッククリーム' },
    { brand: 'elixir_advanced_aging_care_cream', name: '資生堂 エリクシール トータルV ファーミングクリーム / ネックケア', query: 'エリクシール トータルV ファーミングクリーム' },
    { brand: 'sisley_creme_pour_le_cou_neck', name: 'シスレー クレーム レパラトリス / ネック クリーム', query: 'シスレー ネッククリーム' },
    { brand: 'benefique_neck_firming_essence', name: '資生堂 ベネフィーク レチノリフト / ネックエッセンス', query: 'ベネフィーク レチノリフトエッセンス' },
    { brand: 'pola_ba_grandluxe_neck_care', name: 'POLA ポーラ B.A クリーム / ネックケア', query: 'POLA BA クリーム 30g' },
    { brand: 'attenir_dresslift_night_cream', name: 'アテニア ドレススノー ナイトクリーム / ネックリフト', query: 'アテニア ドレススノー ナイトクリーム' },
    { brand: 'acseine_moistbalance_gel_cream', name: 'アクセーヌ モイストバランス ジェル / クリーム', query: 'アクセーヌ モイストバランス ジェル 95g' },
    { brand: 'sensai_cellular_performance_throat_neck', name: 'カネボウ SENSAI センサイ ネック＆デコルテ エッセンス', query: 'SENSAI ネック' },
    { brand: 'antipodes_avocado_pear_nourishing_cream', name: 'アンティポディーズ アボカドペアー ナイトクリーム', query: 'アンティポディーズ アボカドペアー' }
  ];

  const neckCreamItems = [];
  for (const cfg of neckCreamConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        neckCreamItems.push(valid);
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
    theme1_stickserum: stickSerumItems,
    theme2_nailoil: nailOilItems,
    theme3_neckcream: neckCreamItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch27_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 合計取得アイテム数: スティック美容液=${stickSerumItems.length}/10, ネイルオイル=${nailOilItems.length}/10, ネッククリーム=${neckCreamItems.length}/10`);
  console.log('scratch/rakuten_winter_batch27_items.json に保存しました！');
}

fetchWinterBatch27Items().catch(console.error);
