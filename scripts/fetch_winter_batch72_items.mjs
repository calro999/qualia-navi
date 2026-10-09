import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch72Items() {
  console.log('❄️ [11-12月冬コスメ 第72弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【薬用リンクルクリーム＆高濃度レチノール・ナイアシンアミド美容液】 10選 ---
  console.log('\n=== テーマ1: 薬用リンクルクリーム＆高濃度レチノール・ナイアシンアミド美容液 ===');
  const wrinkleConfigs = [
    { brand: 'pola_wrinkle_shot_medical_serum_n', name: 'POLA ポーラ リンクルショット メディカル セラム N 薬用シワ改善 美容液 ニールワン 有効成分 デパコス ベストコスメ', query: 'ポーラ リンクルショット メディカル セラム N' },
    { brand: 'elixir_retino_power_wrinkle_cream', name: '資生堂 エリクシール レチノパワー リンクルクリーム 純粋レチノール 薬用シワ改善 目元 口元 ハリ', query: 'エリクシール レチノパワー リンクルクリーム' },
    { brand: 'nameraka_wrinkle_eye_cream_n', name: 'なめらか本舗 リンクルアイクリーム N ピュアレチノール 豆乳発酵液 ビタミンE誘導体 目元ケア アイクリーム', query: 'なめらか本舗 リンクルアイクリーム N' },
    { brand: 'cosme_decorte_ip_shot_advanced', name: 'コスメデコルテ iP.Shot プルリポテント ユース コンセントレイト 薬用シワ改善 美容液 ナイアシンアミド ハリ 保湿', query: 'コスメデコルテ iP.Shot' },
    { brand: 'innisfree_retinol_cica_repair_ampoule', name: 'イニスフリー innisfree レチノール シカ リペア アンプル 美容液 敏感肌 低刺激 毛穴 つるん肌 韓国コスメ', query: 'イニスフリー レチノール シカ リペア アンプル' },
    { brand: 'vt_reedle_shot_retin_a_essence', name: 'VT COSMETICS シカ レチA エッセンス 美容液 レチノール CICA 毛穴 ハリ 弾力 キメ 韓国コスメ', query: 'VT シカ レチA エッセンス' },
    { brand: 'astalift_the_serum_wrinkle_repair', name: 'アスタリフト ザ セラム リンクルリペア 朝用 夜用 薬用シワ改善 美容液 ナイアシンアミド ビタミンC 富士フイルム', query: 'アスタリフト ザ セラム リンクルリペア' },
    { brand: 'kanebo_wrinkle_lift_serum', name: 'カネボウ KANEBO リンクル リフト セラム 薬用シワ改善 美容液 ナイアシンアミド 目元 眉間 ほうれい線 ハリ', query: 'カネボウ リンクル リフト セラム' },
    { brand: 'attenir_eye_extra_serum', name: 'アテニア Attenir アイ リンクルセラム 薬用 目元用美容液 ナイアシンアミド シワ改善 アイクリーム ハリ', query: 'アテニア アイ リンクルセラム' },
    { brand: 'hada_labo_gokujyun_aging_care_cream', name: '肌ラボ 極潤 薬用 ハリクリーム ナイアシンアミド 3種のヒアルロン酸 エイジングケア シワ改善 シミ対策', query: '肌ラボ 極潤 薬用 ハリクリーム' }
  ];

  const wrinkleItems = [];
  for (const cfg of wrinkleConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (wrinkleItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !wrinkleItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        wrinkleItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【薬用高保湿ハンドクリーム＆濃密ハンドトリートメントバーム】 10選 ---
  console.log('\n=== テーマ2: 薬用高保湿ハンドクリーム＆濃密ハンドトリートメントバーム ===');
  const handCreamConfigs = [
    { brand: 'yuskin_aa_medicated_cream', name: 'ユースキン 120g ポンプ または ボトル 薬用 ビタミン系クリーム ひび あかぎれ 手荒れ 医薬部外品 指定医薬部外品', query: 'ユースキン 120g' },
    { brand: 'loccitane_shea_butter_hand_cream', name: 'ロクシタン L\'OCCITANE シア ハンドクリーム 150ml または 30ml 高保湿 シアバター 天然由来 ギフト プレゼント', query: 'ロクシタン シア ハンドクリーム' },
    { brand: 'atrix_beauty_charge_premium_hand_cream', name: 'アトリックス プレミアムプレシャス 薬用 ハンドクリーム 保湿 花王 コエンザイムQ10 ヒアルロン酸 桜色', query: 'アトリックス プレミアムプレシャス' },
    { brand: 'neutrogena_intense_repair_hand_cream', name: 'ニュートロジーナ ノルウェーフォーミュラ インテンスリペア ハンドクリーム 超乾燥肌用 高純度グリセリン', query: 'ニュートロジーナ インテンスリペア ハンドクリーム' },
    { brand: 'aesop_resurrection_aromatique_hand_balm', name: 'イソップ Aesop レスレクション ハンドバーム アロマティック ハンドクリーム ギフト プレゼント 保湿', query: 'イソップ レスレクション ハンドバーム' },
    { brand: 'rohto_mentholatum_hibipro_kt_ointment', name: 'メンソレータム ヒビプロ KT 軟膏 薬用 ひび 割れ あかぎれ 手荒れ ビタミンA アラントイン ロート製薬', query: 'メンソレータム ヒビプロ' },
    { brand: 'kose_coenrich_the_premium_q10_cream', name: 'コエンリッチ ザ プレミアム 薬用 リンクルホワイト ハンドクリーム コエンザイムQ10 ナイアシンアミド KOSE', query: 'コエンリッチ プレミアム ハンドクリーム' },
    { brand: 'osaji_medicated_hand_cream', name: 'OSAJI オサジ リペア ハンドクリーム または メディカル 低刺激 敏感肌 香り セラミド', query: 'OSAJI ハンドクリーム' },
    { brand: 'jill_stuart_hand_cream_white_floral', name: 'ジルスチュアート JILL STUART ハンドクリーム ホワイトフローラル 保湿 ギフト プレゼント 女性 かわいい', query: 'ジルスチュアート ハンドクリーム ホワイトフローラル' },
    { brand: 'curel_medicated_hand_cream_ceramide', name: 'キュレル Curel 潤浸保湿 ハンドクリーム 薬用 セラミド 消炎剤 手荒れ 敏感肌 花王', query: 'キュレル ハンドクリーム' }
  ];

  const handCreamItems = [];
  for (const cfg of handCreamConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (handCreamItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !handCreamItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        handCreamItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【薬用重炭酸入浴剤＆極上高保湿バスミルク・生薬温活入浴剤】 10選 ---
  console.log('\n=== テーマ3: 薬用重炭酸入浴剤＆極上高保湿バスミルク・生薬温活入浴剤 ===');
  const bathConfigs = [
    { brand: 'barth_medicated_neutral_bicarbonate_tablet', name: 'BARTH バース 薬用 中性 重炭酸 入浴剤 30錠 または 90錠 炭酸泉 疲労回復 冷え症 温活 ギフト', query: 'BARTH 入浴剤' },
    { brand: 'ayura_meditation_bath_t', name: 'アユーラ AYURA メディテーションバス t 300ml 入浴剤 瞑想風呂 アロマ ハーブ 安らぎ 保湿 ギフト', query: 'アユーラ メディテーションバス' },
    { brand: 'kneipp_bath_salt_gute_nacht_hopfen', name: 'クナイプ KNEIPP バスソルト グーテナハト ホップ＆バレリアン 850g ドイツ 天然岩塩 安眠 温活', query: 'クナイプ バスソルト ホップ' },
    { brand: 'sea_crystals_epsom_salt_original', name: 'シークリスタルス エプソムソルト 2.2kg または 8kg マグネシウム 入浴剤 国産 無香料 保湿 入浴用', query: 'エプソムソルト シークリスタルス' },
    { brand: 'tsumura_kusuriyu_bath_herb', name: 'ツムラのくすり湯 バスハーブ 650ml 薬用 生薬入浴液 生薬エキス チンピ 生姜 疲労回復 冷え症', query: 'ツムラのくすり湯 バスハーブ' },
    { brand: 'bub_medicure_kiwami_yakuto', name: '花王 バブ メディキュア 極み薬湯 薬用 入浴剤 生薬エキス 濃厚 高純度オイル 保湿 温活', query: 'バブ メディキュア 極み薬湯' },
    { brand: 'hot_tab_recovery_neutral_bicarbonate', name: '薬用 HOT TAB ホットタブ リカバリー 重炭酸 入浴剤 炭酸タブレット 疲労回復 冷え症 アスリート', query: 'ホットタブ リカバリー' },
    { brand: 'loccitane_shea_baby_bath_milk', name: 'ロクシタン L\'OCCITANE シア バスミルク または リッチバスローション 保湿 しっとり 乾燥肌', query: 'ロクシタン バスミルク' },
    { brand: 'shiro_bath_oil_savon_white_lily', name: 'SHIRO シロ バスオイル または バスパウダー サボン ホワイトリリー 保湿 アロマ 入浴料 ギフト', query: 'SHIRO バスオイル' },
    { brand: 'kneipp_bath_milk_cotton_milk', name: 'クナイプ KNEIPP バスミルク コットンミルク または イチジク スキムミルク 高保湿 入浴液', query: 'クナイプ バスミルク' }
  ];

  const bathItems = [];
  for (const cfg of bathConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (bathItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !bathItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bathItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  console.log('\n=======================================');
  console.log(`取得完了結果: リンクルケア=${wrinkleItems.length}/10, ハンドケア=${handCreamItems.length}/10, 入浴料=${bathItems.length}/10`);
  console.log('=======================================');

  const outputData = {
    theme1_medicinal_wrinkle_cream: wrinkleItems,
    theme2_medicinal_hand_cream: handCreamItems,
    theme3_warmth_bicarbonate_bath_milk: bathItems
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch72_items.json');
  fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`🎉 最新アイテムデータを ${outPath} に保存しました！`);
}

fetchWinterBatch72Items().catch(err => {
  console.error('致命的エラー:', err);
  process.exit(1);
});
