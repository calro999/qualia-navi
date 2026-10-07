import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch57Items() {
  console.log('❄️ [11-12月冬コスメ 第57弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【薬用ホワイトニング歯磨き粉＆音波電動歯ブラシ・美白オーラルケア】 10選 ---
  console.log('\n=== テーマ1: 薬用ホワイトニング歯磨き粉＆音波電動歯ブラシ・美白オーラルケア ===');
  const whiteningOralConfigs = [
    { brand: 'apagard_premio_whitening_toothpaste', name: 'アパガード プレミオ 105g 薬用ハイドロキシアパタイト ホワイトニング 歯磨き粉 むし歯予防 美白 プレミアム', query: 'アパガード プレミオ 105g' },
    { brand: 'bresmile_clear_medicated_whitening_gel', name: 'ブレスマイルクリア 60g 医薬部外品 薬用ホワイトニング 歯磨き粉 歯周病予防 口臭ケア 美白ジェル', query: 'ブレスマイルクリア 60g' },
    { brand: 'ruscello_white_dental_paste', name: 'ルシェロ 歯みがきペースト ホワイト 100g 弱アルカリ性 Lime粒子 ステイン除去 歯科専売 ホワイトニング', query: 'ルシェロホワイト 100g' },
    { brand: 'lion_brilliant_more_w_whitening', name: 'ライオン ブリリアントモア W 90g 医薬部外品 ピロリン酸ナトリウム ステイン浮遊除去 美白ハミガキ', query: 'ブリリアントモア W 90g' },
    { brand: 'droral_whitening_powder_egg_apatite', name: 'Dr.Oral ドクターオーラル ホワイトニングパウダー 26g 天然卵殻アパタイト40% 黄ばみ 吸着美白粉', query: 'ドクターオーラル ホワイトニングパウダー' },
    { brand: 'philips_sonicare_diamondclean_smart', name: 'フィリップス ソニッケアー エキスパートクリーン / ダイヤモンドクリーン 音波水流 電動歯ブラシ ホワイトニング 充電器 ステイン除去', query: 'ソニッケアー ダイヤモンドクリーン' },
    { brand: 'braun_oral_b_io_series_brush', name: 'ブラウン オーラルB iOシリーズ 電動歯ブラシ 磁気駆動 丸型回転ブラシ 人工知能ブラッシング ホワイトニング 歯垢除去', query: 'ブラウン オーラルB iO' },
    { brand: 'marvis_whitening_mint_toothpaste', name: 'MARVIS マービス ホワイト・ミント 85ml イタリア製 ラグジュアリー 歯磨き粉 ホワイトニング 爽快感 口臭ケア', query: 'マービス ホワイトミント 85ml' },
    { brand: 'therabreath_oral_rinse_mouthwash', name: 'セラブレス オーラルリンス マイルドミント 473ml ノンアルコール OXYD-8 口臭予防 マウスウォッシュ 洗口液', query: 'セラブレス オーラルリンス 473ml' },
    { brand: 'smile_cosmetique_whitening_paste', name: 'スマイルコスメティック ホワイトニングペースト トラブルケア 85ml ポンプ式 美白 歯磨き粉 イオンクレンジング', query: 'スマイルコスメティック ホワイトニングペースト' }
  ];

  const oralItems = [];
  for (const cfg of whiteningOralConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('替えブラシのみ')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        oralItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【セルフジェルネイルスターターキット＆UV/LEDライト・自爪補修ベース】 10選 ---
  console.log('\n=== テーマ2: セルフジェルネイルスターターキット＆UV/LEDライト・自爪補修ベース ===');
  const gelNailConfigs = [
    { brand: 'shinygel_starter_kit_led_light', name: 'シャイニージェル ジェルネイル スターターキット LEDランプ 16W / 36W 純国産 弱酸性 削らない 長持ち 初心者セット', query: 'シャイニージェル スターターキット' },
    { brand: 'ohora_semi_cure_gel_lamp_starter_set', name: 'ohora オホーラ ジェルネイル スターターセット ジェルランプ付き 貼って固める セミキュアジェル サロン級 初心者', query: 'ohora ジェルネイル スターターセット' },
    { brand: 'nail_koubou_gel_starter_kit_mega', name: 'ネイル工房 メガ盛り ジェルネイルキット 36W LEDライト カラージェル ベース トップ ブラシ アートパーツ一式', query: 'ネイル工房 ジェルネイル キット' },
    { brand: 'gracegel_base_wipless_top_set', name: 'グレースジェル ベース＆ワイプレストップ 各15mlセット リフトしない 密着 艶長持ち ノンワイプトップコート', query: 'グレースジェル ベース ワイプレストップ' },
    { brand: 'homei_weekly_gel_led_light_set', name: 'HOMEI ウィークリージェル はがせるジェルネイル コンパクトジェルライト 剥がせる ベース不要 トップ不要 サンディング不要', query: 'HOMEI ウィークリージェル ライト' },
    { brand: 'nail_koubou_magnet_gel_crystal', name: 'ネイル工房 5D マグネットジェル キャッツアイ 微粒子 ラメ 奥行き ホリデーネイル カラージェル UV/LED対応', query: 'ネイル工房 マグネットジェル' },
    { brand: 'uv_led_nail_lamp_48w_dual', name: 'UV LED ネイルライト 48W / 54W ハイパワー 硬化熱軽減 ローヒートモード 自動センサー タイマー付き レジン ジェルネイル', query: 'UV LED ネイルライト 48W' },
    { brand: 'christrio_basic_one_clear_gel', name: 'クリストリオ ベーシックワン クリアジェル 14.8g / 1/2oz ハードジェル ガラスのような透明感 トップコート', query: 'クリストリオ ベーシックワン 1/2' },
    { brand: 'lcn_diamond_power_nail_hardener', name: 'LCN エルシーエヌ ダイヤモンドパワー 8ml ダイヤモンド微粒子 自爪補強 トップコート ベースコート 光沢', query: 'LCN ダイヤモンドパワー 8ml' },
    { brand: 'orbis_release_clear_base_coat', name: 'uka ウカ カラーベースコート ゼロ / ネイル強化ベース 美容液成分 ケラチン 保湿 自爪ケア ナチュラル', query: 'uka ベースコート ゼロ' }
  ];

  const nailItems = [];
  for (const cfg of gelNailConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1200) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1200 && !it.itemName.includes('中古'));

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

  // --- テーマ3: 【温熱EMSフットマッサージャー＆エアーレッグリフレ＆温熱着圧レギンス】 10選 ---
  console.log('\n=== テーマ3: 温熱EMSフットマッサージャー＆エアーレッグリフレ＆温熱着圧レギンス ===');
  const footMassageConfigs = [
    { brand: 'panasonic_leg_refre_ew_ra190', name: 'Panasonic パナソニック レッグリフレ エアーマッサージャー EW-RA190 / EW-RA180 太もも ふくらはぎ 足裏 温感ヒーター ブーツむくみ', query: 'パナソニック レッグリフレ' },
    { brand: 'atex_lourdes_foot_care_relaboo2', name: 'アテックス ルルド フットケアコードレス リラブー2 AX-KXL3710 足裏 つま先 かかと 手のひら 強力エアバッグ 温熱 リフレッシュ', query: 'ルルド フットケア リラブー2' },
    { brand: 'sixpad_foot_fit_3_ems_device', name: 'SIXPAD シックスパッド フットフィット 3 Foot Fit 3 EMS 足裏 ふくらはぎ 筋トレ 歩行筋 冷え むくみ解消 運動不足', query: 'シックスパッド フットフィット 3' },
    { brand: 'doctorair_3d_leg_massager_air', name: 'DOCTORAIR ドクターエア 3Dレッグマッサージャー AIR フットマッサージャー 温熱 エアバッグ ふくらはぎ 足裏 疲労回復', query: 'ドクターエア レッグマッサージャー' },
    { brand: 'niplux_leg_relax_air_ems_boots', name: 'NIPLUX LEG RELAX ニップラックス レッグリラックス コードレス レッグマッサージャー 温熱 エアー加圧 ふくらはぎ ブーツ', query: 'NIPLUX LEG RELAX' },
    { brand: 'mytrex_foot_relax_ems_heating_mat', name: 'MYTREX FOOT RELAX マイトレックス フットリラックス 温熱 EMS フットマット 足裏 ふくらはぎ 下半身トレーニング', query: 'MYTREX フットマット EMS' },
    { brand: 'omron_air_massager_hm261', name: 'オムロン エアマッサージャ HM-261 / HM-260 ふくらはぎ 足先 温熱ヒーター 加圧マッサージ フットケア 疲労回復', query: 'オムロン エアマッサージャ HM-261' },
    { brand: 'belmise_sleep_plus_warm_leggings', name: 'BELMISE ベルミス スリーププラス ウォーム 着圧レギンス 極暖 発熱 超強着圧 骨盤ケア ふくらはぎ太もも引き締め 就寝用', query: 'ベルミス スリーププラス ウォーム' },
    { brand: 'mediqtto_super_high_pressure_winter_ex', name: 'メディキュット フルレッグ 超高圧力 EX 就寝用 着圧ソックス 寝ながらメディキュット 太もも ふくらはぎ 翌朝スッキリ', query: '寝ながらメディキュット 超高圧力' },
    { brand: 'fujiiryoki_momiina_air_foot_massager', name: 'フジ医療器 モミーナ エアー フットマッサージャー KC-210 / KC-220 足裏ローラー エアーバッグ ふくらはぎ温熱', query: 'フジ医療器 モミーナ フットマッサージャー' }
  ];

  const footItems = [];
  for (const cfg of footMassageConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500 && !it.itemName.includes('中古'));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        footItems.push(valid);
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
    theme1_whitening_oral_care: oralItems,
    theme2_gel_nail_kit: nailItems,
    theme3_foot_massage_warm_care: footItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch57_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第57弾 全${oralItems.length + nailItems.length + footItems.length}件のアイテム情報を ${outPath} に保存しました！`);
}

fetchWinterBatch57Items().catch(console.error);
