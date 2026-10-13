import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAutumnSeries10Items() {
  console.log('🍂 [2026秋コスメ特集 第10弾（記念弾）] 楽天APIから直接最新の厳選アイテム30件を取得開始します...');

  // --- テーマ1: 秋の深まる乾燥と冷え込みから唇・頬・目元を守る高保湿マルチスティック＆美容液バーム10選 ---
  console.log('\n=== テーマ1: 秋のマルチ保湿スティック＆美容液バーム10選 ===');
  const balmConfigs = [
    { brand: 'kahi_wrinkle_bounce_multi_balm', name: 'KAHI カヒ マルチバーム リンクルバウンス スティック 美容液 韓国コスメ シワ改善', query: 'KAHI マルチバーム' },
    { brand: 'ipsa_the_time_reset_day_essence_stick', name: 'イプサ ザ・タイムR デイエッセンススティック スティック美容液 保湿 IPSA', query: 'イプサ デイエッセンススティック' },
    { brand: 'decorte_liposome_advanced_repair_cream_stick', name: 'コスメデコルテ リポソーム アドバンスト リペアクリーム ミニ または バーム', query: 'コスメデコルテ リポソーム クリーム' },
    { brand: 'etvos_mineral_sheer_balm', name: 'エトヴォス ミネラルマルチパウダー または ミネラルバーム 保湿 ETVOS', query: 'エトヴォス ミネラルマルチパウダー' },
    { brand: 'curel_moisture_lip_care_balm', name: 'キュレル リップケアバーム セラミドケア 潤浸保湿 夜用 花王 Curel', query: 'キュレル リップケアバーム' },
    { brand: 'd_program_balm_essence', name: 'dプログラム バームエッセンス または カンダンバリア エッセンス 美容液 資生堂', query: 'dプログラム カンダンバリア' },
    { brand: 'miu_organic_multi_balm', name: '無印良品 保湿バーム または 乾燥対策 マルチスティック MUJI', query: '無印良品 保湿クリーム' },
    { brand: 'vaseline_original_pure_skin_jelly', name: 'ヴァセリン オリジナル ピュアスキンジェリー ワセリン 保湿 リップ Vaseline', query: 'ヴァセリン ピュアスキンジェリー' },
    { brand: 'dr_hauschka_lip_care_stick', name: 'ドクターハウシュカ リップケアスティック または 集中バーム Dr.Hauschka', query: 'ドクターハウシュカ リップ' },
    { brand: 'john_masters_lip_calm', name: 'ジョンマスターオーガニック リップカーム オーガニック 保湿 John Masters', query: 'ジョンマスター リップカーム' }
  ];

  const balmItems = [];
  for (const cfg of balmConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (balmItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !balmItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        balmItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 秋の深みと温もりを纏う！紅茶・フィグ（イチジク）・ウッディ秋フレグランス＆オードトワレ10選 ---
  console.log('\n=== テーマ2: 秋の紅茶＆ウッディフレグランス10選 ===');
  const scentConfigs = [
    { brand: 'shiro_white_tea_eau_de_parfum', name: 'SHIRO シロ ホワイトティー オードパルファン 香水 シトラス ティー', query: 'SHIRO ホワイトティー オードパルファン' },
    { brand: 'diptyque_philosykos_eau_de_toilette', name: 'ディプティック フィロシコス オードトワレ イチジク フィグ diptyque', query: 'ディプティック フィロシコス' },
    { brand: 'jo_malone_wood_sage_sea_salt_cologne', name: 'ジョー マローン ウッド セージ ＆ シー ソルト コロン 30ml Jo Malone', query: 'ジョーマローン ウッドセージ' },
    { brand: 'maison_margiela_replica_autumn_vibes', name: 'メゾン マルジェラ レプリカ オータム バイブス オードトワレ 紅葉 秋の森 Margiela', query: 'マルジェラ オータムバイブス' },
    { brand: 'aux_paradis_osmanthus_eau_de_parfum', name: 'オゥパラディ AUX PARADIS オスマンサス 金木犀 香水 パルファム', query: 'オゥパラディ オスマンサス' },
    { brand: 'roger_gallet_the_fantaisie_extrait', name: 'ロジェガレ テ ファンタジー エクストレド コロン 紅茶 スモーキー Roger&Gallet', query: 'ロジェガレ テ ファンタジー' },
    { brand: 'le_labo_the_noir_29_eau_de_parfum', name: 'ル ラボ テ ノワール 29 LE LABO THE NOIR 29 紅茶 フィグ 香水', query: 'ルラボ テノワール' },
    { brand: 'chiro_earl_grey_eau_de_parfum', name: 'SHIRO アールグレイ オードパルファン 紅茶 ベルガモット 限定', query: 'SHIRO アールグレイ' },
    { brand: 'innisfree_black_tea_youth_scent', name: 'イニスフリー ブラックティー ユース トリートメント または 香水', query: 'イニスフリー ブラックティー' },
    { brand: 'layered_fragrance_champagne_olive', name: 'ショーレイヤード レイヤードフレグランス ホワイトティー または オリーブウォッカ', query: 'レイヤードフレグランス ホワイトティー' }
  ];

  const scentItems = [];
  for (const cfg of scentConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (scentItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !scentItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        scentItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 秋の乾燥手荒れ・ささくれ・爪の縦ジワを救う高保湿ネイルオイル＆ハンドセラム10選 ---
  console.log('\n=== テーマ3: 秋の高保湿ネイルオイル＆ハンドセラム10選 ===');
  const nailConfigs = [
    { brand: 'uka_nail_oil_basic', name: 'uka ウカ ネイルオイル ベーシック または 13:00 24:45 ロールオン 保湿', query: 'uka ネイルオイル' },
    { brand: 'loccitane_shea_nail_cuticle_oil', name: 'ロクシタン シア ネイルオイル 7.5ml ブラシタイプ キューティクル LOCCITANE', query: 'ロクシタン ネイルオイル' },
    { brand: 'opi_pro_spa_nail_cuticle_oil', name: 'OPI プロスパ ネイル＆キューティクルオイル 8.6ml オーピーアイ 保湿 美爪', query: 'OPI ネイルオイル' },
    { brand: 'sparitual_farewell_nail_care', name: 'スパリチュアル アップルフルーツ フェアウェル ネイルオイル 爪 健やか SPARITUAL', query: 'スパリチュアル フェアウェル' },
    { brand: 'canmake_foundation_colors_nail', name: 'キャンメイク ファンデーションカラーズ または ネイルケアオイル 美爪 CANMAKE', query: 'キャンメイク ネイルケア' },
    { brand: 'naility_cuticle_oil_pen', name: 'ネイリティ キューティクルオイル ペンタイプ スティック 携帯用 ペン型 香り', query: 'キューティクルオイル ペン' },
    { brand: 'shiro_white_lily_hand_serum', name: 'SHIRO シロ ホワイトリリー ハンド美容液 ハンドセラム 高保湿', query: 'SHIRO ハンド美容液' },
    { brand: 'aesop_resurrection_aromatique_hand_balm', name: 'イソップ レスレクション ハンドバーム 75ml Aesop アロマティック', query: 'イソップ ハンドバーム' },
    { brand: 'yuskin_hana_hand_cream', name: 'ユースキン ハナ ハンドクリーム 高保湿 高純度ビタミン ユズ ジャスミン', query: 'ユースキン ハナ ハンドクリーム' },
    { brand: 'dr_nail_deep_serum_foot', name: 'ドクターネイル ディープセラム 3.3ml 爪補修 興和 二枚爪 縦ジワ Dr.Nail', query: 'ドクターネイル ディープセラム' }
  ];

  const nailItems = [];
  for (const cfg of nailConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (nailItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !nailItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        nailItems.push(valid);
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
    balmItems,
    scentItems,
    nailItems
  };

  fs.writeFileSync('scratch/autumn_series10_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第10弾 楽天API取得完了: 保湿スティック=${balmItems.length}件, 秋フレグランス=${scentItems.length}件, ネイルケア=${nailItems.length}件`);
}

fetchAutumnSeries10Items().catch(console.error);
