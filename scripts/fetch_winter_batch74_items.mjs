import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch74Items() {
  console.log('❄️ [11-12月冬コスメ 第74弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【冬の角質ゴワつき・浸透不全を打開する高保湿導入美容液＆浸透導入液】 10選 ---
  console.log('\n=== テーマ1: 高保湿導入美容液＆浸透導入液 ===');
  const boosterConfigs = [
    { brand: 'decorte_liposome_advanced_repair_serum', name: 'コスメデコルテ リポソーム アドバンスト リペアセラム 50ml または 75ml 多重層バイオリポソーム 導入美容液 保湿 ハリ', query: 'コスメデコルテ リポソーム アドバンスト リペアセラム 50ml' },
    { brand: 'sofina_ip_base_care_serum_doudai', name: '花王 ソフィーナiP ベースケア セラム 土台美容液 90g 高濃度炭酸泡 マイクロ炭酸泡 導入美容液 血行 浸透', query: 'ソフィーナiP ベースケア セラム 土台美容液 90g' },
    { brand: 'takami_skin_peel_essence', name: 'タカミ TAKAMI スキンピール 30ml 角質美容水 導入化粧液 毛穴 キメ ざらつき なめらか 肌代謝', query: 'タカミ スキンピール 30ml' },
    { brand: 'lancome_genifique_advanced_serum', name: 'ランコム LANCOME ジェニフィック アドバンスト N 50ml または アルティメ 美肌菌 導入美容液 バリア回復 デパコス', query: 'ランコム ジェニフィック アドバンスト N 50ml' },
    { brand: 'vt_reedle_shot_100_serum', name: 'VT COSMETICS リードルショット 100 50ml 天然マイクロニードル シカ スピキュール 導入美容液 韓国コスメ チクチク浸透', query: 'VT リードルショット 100' },
    { brand: 'ma:nyo_galac_niacin_essence', name: '魔女工場 Manyo Factory ガラクナイアシン 2.0 エッセンス 50ml ガラクトミセス ナイアシンアミド トーンアップ 導入美容液', query: '魔女工場 ガラクナイアシン 2.0 エッセンス' },
    { brand: 'muji_fermented_introductory_serum', name: '無印良品 発酵導入美容液 50ml または 300ml 米ぬか発酵液 セラミド 天然由来100% 導入化粧液 プレ化粧水', query: '無印良品 発酵導入美容液' },
    { brand: 'cle_de_peau_le_serum', name: '資生堂 クレ・ド・ポー ボーテ ル・セラム 50ml 美容液 導入 ファーストステップ スキンイルミネイター 最高峰デパコス', query: 'クレ・ド・ポー ボーテ ル・セラム 50ml' },
    { brand: 'dr_ci_labo_vc100_essence_lotion', name: 'ドクターシーラボ VC100 エッセンスローション EX 150ml 高浸透ビタミンC APPS ナイアシンアミド 導入化粧水 毛穴 キメ', query: 'ドクターシーラボ VC100 エッセンスローション EX 150ml' },
    { brand: 'cnp_propolis_energy_active_ampoule', name: 'CNP Laboratory プロポリス エナジー アクティブ アンプル 15ml または 35ml 導入美容液 栄養 潤いツヤ ハチミツ 韓国コスメ', query: 'CNP プロポリス エナジー アンプル' }
  ];

  const boosterItems = [];
  for (const cfg of boosterConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (boosterItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !boosterItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        boosterItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【暖房乾燥・摩擦崩れでも1日中うるツヤキープ！高保湿フィックスミスト】 10選 ---
  console.log('\n=== テーマ2: 高保湿フィックスミスト（メイクキープ＆美容液ミスト） ===');
  const mistConfigs = [
    { brand: 'decorte_comfort_day_mist_set_protect', name: 'コスメデコルテ コンフォート デイミスト セット＆プロテクト 60ml メイクキープミスト うるおい ウォータープルーフ デパコス', query: 'コスメデコルテ コンフォート デイミスト セット＆プロテクト' },
    { brand: 'kose_make_keep_mist_ex_moist', name: 'コーセー KOSE メイク キープ ミスト EX MOIST 85ml 高保湿 しっとり オイルイン うるおい 崩れ防止', query: 'コーセー メイク キープ ミスト EX モイスト' },
    { brand: 'd_program_allerbarrier_mist_n', name: '資生堂 dプログラム アレルバリア ミスト N 57ml 敏感肌 オイル＆化粧水 2層 花粉 微粒子 暖房乾燥 保湿', query: 'dプログラム アレルバリア ミスト N' },
    { brand: 'clarins_fix_make_up', name: 'クラランス CLARINS フィックス メイクアップ 50ml メイク崩れ防止 ローズの香り 高保湿 アロエ デパコス 名品', query: 'クラランス フィックス メイクアップ 50ml' },
    { brand: 'dalba_white_truffle_first_spray_serum', name: 'ダルバ dAlba ホワイトトリュフ ファースト スプレー セラム 100ml 黄色オイル CAミスト 振って使う 二層式 潤い ツヤ', query: 'ダルバ ホワイトトリュフ スプレーセラム 100ml' },
    { brand: 'elixir_superieur_tsuyadama_mist', name: '資生堂 エリクシール シュペリエル つや玉ミスト 80ml 美容液 エイジングケア きめ細かいミスト うるおい フローラル', query: 'エリクシール つや玉ミスト' },
    { brand: 'maquillage_dramatic_mist_ex', name: '資生堂 マキアージュ ドラマティックミスト EX 60ml メイクキープ スプレー ツヤ感 マスク崩れ防止 うるおい', query: 'マキアージュ ドラマティックミスト EX' },
    { brand: 'shu_uemura_unlimited_makeup_fix_mist', name: 'シュウ ウエムラ shu uemura アンリミテッド メイクアップ フィックス ミスト 100ml 超微細ミスト 薄膜密着 キープ力 デパコス', query: 'シュウウエムラ アンリミテッド メイクアップ フィックス ミスト' },
    { brand: 'addiction_makeup_fix_micro_mist', name: 'アディクション ADDICTION メイクアップ フィックス マイクロ ミスト 70ml オイルフリー 超微細ミスト 潤い ウォータープルーフ', query: 'アディクション メイクアップ フィックス マイクロ ミスト' },
    { brand: 'ipsa_the_time_r_day_essence_stick', name: 'イプサ IPSA ザ・タイムR デイエッセンススティック 9.4g スティック状美容液 日中保湿 メイク直し うるおい', query: 'イプサ ザ・タイムR デイエッセンススティック' }
  ];

  const mistItems = [];
  for (const cfg of mistConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (mistItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !mistItems.some(e => e.itemCode === it.itemCode));

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

  // --- テーマ3: 【冬映え深みカラー＆むっちり濃密保湿！冬の本命ボルドー・ショコラブラウン高保湿リップ】 10選 ---
  console.log('\n=== テーマ3: 冬映え深みボルドー・ショコラブラウン高保湿リップ ===');
  const lipConfigs = [
    { brand: 'kate_lip_monster_deep_color', name: 'カネボウ KATE ケイト リップモンスター 口紅 落ちにくい 高発色 保湿 05陽炎 07ラスボス 12誓いのルビー', query: 'ケイト リップモンスター 07 ラスボス' },
    { brand: 'romand_juicy_lasting_tint_deep', name: 'ロムアンド rom&nd ジューシー ラスティング ティント 06 FIGFIG または 17 PLUM COKE 深みベリー 果汁リップ 韓国コスメ', query: 'ロムアンド ジューシーラスティングティント 06' },
    { brand: 'dior_addict_lip_maximizer_berry', name: 'ディオール クリスチャンディオール アディクト リップ マキシマイザー 006 ベリー または 020 マホガニー プランパー ヒアルロン酸 デパコス', query: 'ディオール リップ マキシマイザー 006 ベリー' },
    { brand: 'chanel_rouge_coco_flash_deep', name: 'シャネル CHANEL ルージュ ココ フラッシュ 106 ドミナン または 90 ジュール 濡れツヤ 濃密発色 リップスティック 高級デパコス', query: 'シャネル ルージュ ココ フラッシュ 106' },
    { brand: 'suqqu_moisture_glaze_lipstick', name: 'SUQQU スック モイスチャー グレイズ リップスティック 06 花朧 または 08 木漏日 濃密ツヤ むっちり 膜厚 デパコス', query: 'SUQQU モイスチャー グレイズ リップスティック' },
    { brand: 'opera_lip_tint_n_terracotta', name: 'オペラ OPERA リップティント N 09 テラコッタ または 11 フィグ 透け感ティント スクワラン 高保湿 プチプラ名品', query: 'オペラ リップティント N 09 テラコッタ' },
    { brand: 'canmake_muchipuru_tint_wine', name: 'キャンメイク CANMAKE むちぷるティント 03 ワインベリー または 02 モモ 清涼感 プランパー 濃密ツヤ ボルドー プチプラ', query: 'キャンメイク むちぷるティント 03' },
    { brand: 'laka_bonding_glow_lipstick', name: 'ラカ Laka ボンディング グロウ リップスティック 201 ミロ または 204 ハヴ 濃密ガラス玉ツヤ 高保湿 韓国コスメ', query: 'Laka ボンディング グロウ リップスティック' },
    { brand: 'ysl_candy_glaze_lip_gloss', name: 'イヴ・サンローラン YSL ルージュ ヴォリュプテ キャンディグレーズ シロップリップ ヒアルロン酸 濃密ツヤ デパコス', query: 'イヴサンローラン キャンディグレーズ' },
    { brand: 'fujiko_nuance_wrap_tint_brown', name: 'フジコ Fujiko ニュアンスラップティント 03 珊瑚ブラウン または 04 無花果ブラウン 落ちない 縦ジワカバー ウォーターティント', query: 'フジコ ニュアンスラップティント 03' }
  ];

  const lipItems = [];
  for (const cfg of lipConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (lipItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 500 && !it.itemName.includes('中古') && !lipItems.some(e => e.itemCode === it.itemCode));

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

  const resultData = {
    theme1_booster_serum: boosterItems,
    theme2_hydrating_makeup_mist: mistItems,
    theme3_deep_color_moist_lip: lipItems
  };

  const outputPath = 'scratch/rakuten_winter_batch74_items.json';
  fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2), 'utf8');
  console.log(`\n🎉 [完了] 合計 ${boosterItems.length + mistItems.length + lipItems.length} アイテムのリアルタイム取得結果を ${outputPath} に保存しました！`);
  console.log(`- テーマ1 (導入美容液): ${boosterItems.length}/10 アイテム`);
  console.log(`- テーマ2 (ミスト): ${mistItems.length}/10 アイテム`);
  console.log(`- テーマ3 (深みリップ): ${lipItems.length}/10 アイテム`);
}

fetchWinterBatch74Items().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
