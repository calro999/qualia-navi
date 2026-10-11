import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch84Items() {
  console.log('❄️ [11-12月冬コスメ 第84弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 高保湿マルチバーム＆スティックバーム 10選 ---
  console.log('\n=== テーマ1: 高保湿マルチバーム＆スティックバーム ===');
  const multiBalmConfigs = [
    { brand: 'kahi_wrinkle_bounce_multi_balm', name: 'KAHI カヒ リンクルバウンス マルチバーム スティック 韓国コスメ サーモン複合体 目元 口元 首元 高保湿', query: 'KAHI マルチバーム' },
    { brand: 'ihada_medicated_balm', name: 'イハダ IHADA 薬用バーム 高精製ワセリン配合 肌荒れ 乾燥 あれ性 密封バリア 敏感肌 低刺激', query: 'イハダ 薬用バーム' },
    { brand: 'larocheposay_cicaplast_balme_b5', name: 'ラロッシュポゼ シカプラスト バーム B5+ CICA ツボクサ パンテノール 肌荒れ 乾燥 レスキューバーム', query: 'ラロッシュポゼ シカプラスト バーム' },
    { brand: 'curel_moist_repair_balm', name: 'キュレル Curel 潤浸保湿 モイストリペア アイクリーム または モイストバーム セラミド機能成分 高保湿', query: 'キュレル モイストリペア' },
    { brand: 'dprogram_skin_repair_balm', name: 'dプログラム バーム 資生堂 薬用 スキンリペアバーム 敏感肌用 肌荒れ予防 高保湿', query: 'dプログラム バーム' },
    { brand: 'femmue_beauty_balm', name: 'ファミュ FEMMUE ビューティバーム カメリア ボタニカル リッチバーム 高保湿 乾燥ケア', query: 'ファミュ ビューティバーム' },
    { brand: 'elixir_pocket_balm', name: 'エリクシール ELIXIR つや玉 ポケットバーム または つや玉ミスト 乾燥対策 保湿スティック', query: 'エリクシール ポケットバーム' },
    { brand: 'carte_hd_high_moist_balm', name: 'カルテHD 高保湿バーム ヘパリン類似物質配合 モイスチュア バーム 乾燥肌 肌あれ', query: 'カルテHD 高保湿バーム' },
    { brand: 'embryolisse_lait_creme_concentre', name: 'アンブリオリス モイスチャークリーム フェイスバーム 保湿クリーム 化粧下地 フランス発', query: 'アンブリオリス モイスチャークリーム' },
    { brand: 'rosebud_salve_balm', name: 'ローズバッドサーブ スミス ROSEBUD SALVE リップバーム マルチバーム 全米ロングセラー', query: 'ローズバッドサーブ' }
  ];

  const multiBalmItems = [];
  for (const cfg of multiBalmConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (multiBalmItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !multiBalmItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        multiBalmItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 高保湿乳液＆セラミドエマルジョン 10選 ---
  console.log('\n=== テーマ2: 高保湿乳液＆セラミドエマルジョン ===');
  const emulsionConfigs = [
    { brand: 'decorte_hydra_clarity_softener', name: 'コスメデコルテ イドラクラリティ コンディショニング トリートメント ソフナー 乳液 先行乳液 美肌糖', query: 'コスメデコルテ イドラクラリティ 乳液' },
    { brand: 'albion_flarune_full_refine_milk', name: 'アルビオン ALBION フラルネ フルリファイン ミルク 乳液 先行乳液 高保湿 ラメラケア', query: 'アルビオン フラルネ ミルク' },
    { brand: 'minon_amino_moist_charge_milk', name: 'ミノン アミノモイスト モイストチャージ ミルク アミノ酸 敏感肌 乾燥肌 高保湿乳液', query: 'ミノン モイストチャージミルク' },
    { brand: 'carte_hd_moisture_emulsion', name: 'カルテHD 高保湿乳液 モイスチュア エマルジョン ヘパリン類似物質 肌荒れ防止', query: 'カルテHD 乳液' },
    { brand: 'curel_moisture_facial_milk', name: 'キュレル 潤浸保湿 乳液 セラミドケア 敏感肌 乾燥肌 医薬部外品', query: 'キュレル 乳液' },
    { brand: 'laneige_cream_skin_refiner', name: 'ラネージュ LANEIGE クリームスキン セラミド 高保湿 化粧水乳液 2in1 高浸透', query: 'ラネージュ クリームスキン' },
    { brand: 'muji_fermented_emulsion', name: '無印良品 発酵導入乳液 または 敏感肌用 高保湿乳液 天然由来成分 スキンケア', query: '無印良品 高保湿乳液' },
    { brand: 'elixir_lift_moist_emulsion', name: 'エリクシール リフトモイスト エマルジョン SP コラーゲン 薬用乳液 ハリ うるおい', query: 'エリクシール リフトモイスト エマルジョン' },
    { brand: 'sk2_skinpower_advanced_airy_cream', name: 'SK-II SK2 スキンパワー アドバンスト エアリークリーム 美容乳液 ピテラ ハリ ツヤ', query: 'SK-II スキンパワー エアリー' },
    { brand: 'covermark_cell_advanced_emulsion', name: 'カバーマーク セルアドバンスト エマルジョン または モイスチュアチャージ 美容乳液', query: 'カバーマーク エマルジョン' }
  ];

  const emulsionItems = [];
  for (const cfg of emulsionConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (emulsionItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !emulsionItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        emulsionItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 高保湿メルティングリップ＆濃密ツヤ粘膜ティント 10選 ---
  console.log('\n=== テーマ3: 高保湿メルティングリップ＆濃密ツヤ粘膜ティント ===');
  const lipConfigs = [
    { brand: 'romand_glasting_melting_balm', name: 'ロムアンド rom&nd グラスティング メルティングバーム 水光ツヤ 体温でとろける 高保湿 リップバーム', query: 'ロムアンド メルティングバーム' },
    { brand: 'kate_lip_monster_rouge', name: 'KATE ケイト リップモンスター 高発色 保湿 落ちにくい 密着ジェル膜 口紅 リップ', query: 'ケイト リップモンスター' },
    { brand: 'canmake_muchipuru_tint', name: 'キャンメイク CANMAKE むちぷるティント プランパー効果 ワセリン配合 高保湿 粘膜リップ', query: 'キャンメイク むちぷるティント' },
    { brand: 'opera_lip_tint_n', name: 'オペラ OPERA リップティント N スクワラン 高保湿 透け感 シアー 発色キープ', query: 'オペラ リップティント' },
    { brand: 'dasique_melting_candy_balm', name: 'デイジーク dasique メルティング キャンディバーム ジューシー シロップツヤ ぷるぷる リップ', query: 'デイジーク メルティング キャンディバーム' },
    { brand: 'ririmew_muted_sheer_tint', name: 'リリミュウ Ririmew ミューテッドシアーティント 指原莉乃 粘膜カラー 高保湿 みずみずしい', query: 'リリミュウ シアーティント' },
    { brand: 'fujiko_nuance_wrap_tint', name: 'フジコ Fujiko ニュアンスラップティント ウォーターティント ラップ効果 荒れない 潤い', query: 'フジコ ニュアンスラップティント' },
    { brand: 'wonjungyo_lip_sticker', name: 'ウォンジョンヨ Wonjungyo リップステッカー または グロウリップ 粘膜ツヤ 韓国アイドルメイク', query: 'ウォンジョンヨ リップ' },
    { brand: 'cezanne_lip_color_shield', name: 'セザンヌ CEZANNE リップカラーシールド ジェル膜 高密着 うるおい 美発色', query: 'セザンヌ リップカラーシールド' },
    { brand: 'dior_addict_lip_glow', name: 'Dior ディオール アディクト リップ グロウ チェリーオイル配合 カスタムカラー 高保湿リップバーム', query: 'ディオール アディクト リップグロウ' }
  ];

  const lipItems = [];
  for (const cfg of lipConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lipItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !lipItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        lipItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log(`\n取得集計: マルチバーム=${multiBalmItems.length}/10, 乳液=${emulsionItems.length}/10, リップ=${lipItems.length}/10`);

  const outputData = {
    multiBalmItems,
    emulsionItems,
    lipItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = path.resolve('scratch/winter_batch84_items.json');
  fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`💾 取得データを保存しました: ${outPath}`);
}

fetchWinterBatch84Items().catch(console.error);
