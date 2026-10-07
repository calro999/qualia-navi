import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch54Items() {
  console.log('❄️ [11-12月冬コスメ 第54弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【ウルトラファインバブル＆マイクロナノバブル美肌シャワーヘッド】 10選 ---
  console.log('\n=== テーマ1: ウルトラファインバブル＆マイクロナノバブル美肌シャワーヘッド ===');
  const bubbleConfigs = [
    { brand: 'refa_fine_bubble_pure', name: 'ReFa リファ ファインバブル ピュア ホワイト 塩素低減カートリッジ対応 ウルトラファインバブル マイクロバブル 美肌 節水 保温', query: 'ReFa ファインバブル ピュア' },
    { brand: 'mytrex_hiho_fine_bubble_plus', name: 'MYTREX マイトレックス HIHO FINE BUBBLE+ プラス 秘泡ファインバブル 最大5億3000万個 ミスト水流 保温 温浴', query: 'MYTREX HIHO FINE BUBBLE+' },
    { brand: 'bollina_wide_plus_silver', name: '田中金属製作所 ボリーナ ワイドプラス シルバー TK-7008-SL マイクロナノバブル シャワーヘッド ウルトラファインバブル 節水 保湿', query: 'ボリーナ ワイドプラス 田中金属製作所' },
    { brand: 'mirable_zero_ultra_fine_mist', name: 'サイエンス ミラブルzero ミラブルゼロ ウルトラファインミスト トルネードスティック 塩素除去 口腔モード 美肌 保湿', query: 'ミラブルzero サイエンス 公式' },
    { brand: 'refa_fine_bubble_u', name: 'ReFa リファ ファインバブル U 最新モデル 4モード水流 シルキーバス ポイントパルス ウルトラファインバブル 美顔 節水', query: 'ReFa ファインバブル U' },
    { brand: 'salonia_pure_bright_shower', name: 'SALONIA サロニア ファインバブル クリア シャワーヘッド ナノバブル 毛穴汚れ スカルプケア 節水 美肌モード', query: 'サロニア ファインバブル シャワーヘッド' },
    { brand: 'create_ion_iomu_shower', name: 'クレイツ イオン ハンディシャワー IO霧 イオム ウルトラファインバブル 節水シャワー 5段階水流切替 ミスト スカルプ', query: 'クレイツ IO霧 ハンディシャワー' },
    { brand: 'bollina_avanti_shower', name: '田中金属製作所 ボリーナ アヴァンティ TK-7200 ハイエンド ナノバブル シャワーヘッド パワフル水流 ミスト切替 節水 美容', query: 'ボリーナ アヴァンティ 田中金属' },
    { brand: 'arromic_silky_nano_bubble', name: 'アラミック シルキーナノバブルシャワー プレミアム ナノバブル 手元ストップ機能 節水効果最大50% 増圧 肌当たり極上', query: 'アラミック シルキーナノバブルシャワー' },
    { brand: 'aquabulle_bonheur_fine_bubble', name: 'AQUA BULLE Bonheur ボヌール 5段階水流 ウルトラファインバブル マイクロバブル 節水シャワーヘッド 美肌 保湿 温浴', query: 'AQUA BULLE ボヌール ファインバブル' }
  ];

  const bubbleItems = [];
  for (const cfg of bubbleConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 3000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('カートリッジのみ') || it.itemName.includes('交換用ホース')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        bubbleItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【高純度プロテオグリカン原液＆保水ハリ集中エイジングケア美容液】 10選 ---
  console.log('\n=== テーマ2: 高純度プロテオグリカン原液＆保水ハリ美容液 ===');
  const proteoConfigs = [
    { brand: 'fracora_liftest_proteoglycan', name: 'fracora フラコラ LIFTest プロテオグリカン原液 30ml 高純度原液 浸透型エイジングケア ハリ 弾力 うるおい 透明感', query: 'フラコラ プロテオグリカン原液' },
    { brand: 'pg2_pure_essence_proteo', name: 'PG2 ピュアエッセンス 10ml 高純度プロテオグリカン原液 高濃度 非加熱抽出 無添加 スキンケア ハリ 美容液', query: 'PG2 ピュアエッセンス プロテオグリカン' },
    { brand: 'tunemakers_proteoglycan_serum', name: 'TUNEMAKERS チューンメーカーズ プロテオグリカン 20ml 原液美容液 乾燥小じわ ほうれい線 うるおい原液 保湿', query: 'チューンメーカーズ プロテオグリカン' },
    { brand: 'kiso_proteoglycan_extract', name: 'KISO 基礎化粧品 プロテオグリカン 原液 20ml PG 高純度 水溶性プロテオグリカン エイジングケア 低刺激', query: 'KISO プロテオグリカン 原液' },
    { brand: 'lavie_precieuse_proteo_essence', name: 'ラヴィプレシューズ PG エッセンス 50ml 青森県産りんご果汁 リンゴセラミド プロテオグリカン 高保湿 美容液', query: 'ラヴィプレシューズ PGエッセンス' },
    { brand: 'shizen_proteoglycan_solution', name: '自然化粧品研究所 水溶性 プロテオグリカン 原液 20ml 青森県産サケ鼻軟骨抽出 EGF様作用 高保水 美容液', query: '自然化粧品研究所 プロテオグリカン 原液' },
    { brand: 'pluskirei_proteoglycan_serum', name: 'プラスキレイ プラスピュア PGセラム プロテオグリカン 高濃度配合 原液美容液 乾燥肌 保湿 うるおい', query: 'プロテオグリカン 美容液 原液' },
    { brand: 'aomori_pg_rich_moist_serum', name: 'あおもりPG認証 プロテオグリカン 高配合 プレミアムリッチセラム 30ml ヒアルロン酸 コラーゲン 乾燥肌 年齢肌', query: 'あおもりPG プロテオグリカン 美容液' },
    { brand: 'fracora_double_serum_pg', name: 'フラコラ ディープ プロテオグリカン 原液 30ml 高濃度抽出 エイジングケア 目元 口元 ハリ', query: 'フラコラ ディープ プロテオグリカン' },
    { brand: 'japan_algae_proteo_collagen', name: 'プロテオグリカン＆非変性II型コラーゲン 高保湿 ナノ浸透 美容原液 30ml 冬の超乾燥肌 レスキューセラム', query: 'プロテオグリカン 原液 コラーゲン 美容液' }
  ];

  const proteoItems = [];
  for (const cfg of proteoConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('サプリ') || it.itemName.includes('錠剤') || it.itemName.includes('カプセル')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !it.itemName.includes('サプリ'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        proteoItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【白玉グルタチオン美容液＆濃密美白アンプル】 10選 ---
  console.log('\n=== テーマ3: 白玉グルタチオン美容液＆濃密美白アンプル ===');
  const glutathioneConfigs = [
    { brand: 'numbuzin_no5_glutathione_serum', name: 'numbuzin ナンバーズイン 5番 白玉グルタチオンC美容液 30ml 高純度グルタチオン ビタミンC ナイアシンアミド シミ くすみ', query: 'ナンバーズイン 5番 白玉グルタチオンC美容液' },
    { brand: 'medicube_glutathione_glow_ampoule', name: 'medicube メディキューブ ディープ グルタチオン グロウセラム アンプル 50ml 高純度白玉ツヤ肌 リフトアップ ビタミンC', query: 'メディキューブ グルタチオン グロウ' },
    { brand: 'anua_niacin_txa_dark_spot_serum', name: 'Anua アヌア ナイアシンアミド10% TXA4% トラネキサム酸 ダークスポットセラム 30ml グルタチオン 美白 くすみ 色素沈着', query: 'アヌア ナイアシンアミド トラネキサム酸 セラム' },
    { brand: 'manyo_galac_niacin_2_essence', name: '魔女工場 ma:nyo ガラクナイアシン2.0エッセンス 50ml ガラクトミセス発酵濾過物 ナイアシンアミド グルタチオン 透明感 毛穴', query: '魔女工場 ガラクナイアシン2.0エッセンス' },
    { brand: 'nature_republic_vitapair_c_glutathione', name: 'NATURE REPUBLIC ネイチャーリパブリック ビタペアC 集中美容液 45ml グリーンレモン グルタチオン ビタミンC シミ そばかす', query: 'ネイチャーリパブリック ビタペアC 美容液' },
    { brand: 'kiso_glutathione_pure_essence', name: 'KISO 基礎化粧品 グルタチオン 原液 20ml ホワイトエッセンス GL 高純度白玉ケア ナイアシンアミド 高配合 美容液', query: 'KISO グルタチオン 原液' },
    { brand: 'bioheal_boh_vitamin_toning_serum', name: 'BIOHEAL BOH バイオヒールボ ビタミン トーニング セラム 30ml グルタチオン カプセル くすみ 弾力 トーンアップ アンプル', query: 'バイオヒールボ ビタミン トーニング セラム' },
    { brand: 'dalba_white_truffle_first_spray_serum', name: 'd\'Alba ダルバ ホワイトトリュフ ファースト スプレー セラム 100ml イタリア産白トリュフ アボカド油 グルタチオン 水光ツヤ ミスト', query: 'ダルバ ホワイトトリュフ ファーストスプレーセラム' },
    { brand: 'drg_red_blemish_clear_soothing_serum', name: 'Dr.G ドクタージー レッドブレミッシュ クリアスージングセラム 30ml ナイアシンアミド グルタチオン CICA 鎮静 美白 トラブル肌', query: 'Dr.G レッドブレミッシュ セラム' },
    { brand: 'cosrx_the_vitamin_c_23_serum', name: 'COSRX コスアールエックス ザ・ビタミンC 23% セラム 20ml 純粋ビタミンC グルタチオン トコトリエノール 毛穴 くすみ 美白', query: 'COSRX ビタミンC 23 セラム' }
  ];

  const glutathioneItems = [];
  for (const cfg of glutathioneConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('サプリ')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        glutathioneItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const outData = {
    theme1_bubble_shower: bubbleItems,
    theme2_proteo_serum: proteoItems,
    theme3_glutathione_serum: glutathioneItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch54_items.json', JSON.stringify(outData, null, 2), 'utf8');
  console.log(`\n🎉 保存完了: scratch/rakuten_winter_batch54_items.json (シャワーヘッド: ${bubbleItems.length}件, プロテオグリカン: ${proteoItems.length}件, グルタチオン: ${glutathioneItems.length}件)`);
}

fetchWinterBatch54Items();
