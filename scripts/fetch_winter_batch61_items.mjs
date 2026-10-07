import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch61Items() {
  console.log('❄️ [11-12月冬コスメ 第61弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【フェイス対応ミニマッサージガン＆超軽量筋膜リリース美容器】 10選 ---
  console.log('\n=== テーマ1: フェイス対応ミニマッサージガン＆超軽量筋膜リリース美容器 ===');
  const massageGunConfigs = [
    { brand: 'mytrex_rebive_mini_xs_face_gun', name: 'MYTREX REBIVE MINI XS マイトレックス リバイブ ミニ フェイスケア 筋膜リリースガン 軽量 顔 首 肩', query: 'MYTREX REBIVE MINI' },
    { brand: 'doctorair_recovery_gun_rg01_light', name: 'ドクターエア リカバリーガン RG-01 DOCTORAIR マッサージガン 軽量 筋膜リリース 小型 ハンディ', query: 'ドクターエア リカバリーガン' },
    { brand: 'sixpad_power_gun_pocket_compact', name: 'SIXPAD シックスパッド パワーガン ポケット Power Gun Pocket フェイスモード 軽量 筋膜リリース', query: 'シックスパッド パワーガン ポケット' },
    { brand: 'uFit_releaser_mini_fascia_gun', name: 'uFit RELEASER Mini ユーフィット リリーサー ミニ 筋膜リリースガン 日本国内ブランド 静音設計', query: 'uFit RELEASER Mini' },
    { brand: 'arboleaf_pocket_massage_gun_metal', name: 'arboleaf 筋膜リリースガン ポケット ミニ 金属ボディ 超軽量 静音 4段階強力振動 Type-C充電', query: 'arboleaf 筋膜リリースガン' },
    { brand: 'anlan_mini_fascia_massage_gun', name: 'ANLAN 筋膜リリースガン ミニ 小型 軽量 ハンディ振動マシン 温熱ヘッド 首 肩こり 全身ケア', query: 'ANLAN 筋膜リリースガン' },
    { brand: 'fukushin_relx_total_body_care_gun', name: 'RELX リラクストータルボディケア ガン 超軽量 ハンディ振動マシン 美容 フェイス 全身 アタッチメント', query: 'RELX 筋膜リリース ガン' },
    { brand: 'salonia_ems_fascia_body_care_gun', name: 'サロニア SALONIA フェイス 筋膜リリース ガン コンパクト 美容家電 温冷 美顔器', query: '筋膜リリースガン フェイス' },
    { brand: 'renpho_pocket_massage_gun_compact', name: 'RENPHO レンフォ ハンディマッサージャー 筋膜リリースガン 小型 超軽量 パワフル振動', query: 'RENPHO 筋膜リリースガン' },
    { brand: 'kawa_mini_massage_gun_metal_body', name: '超軽量 ハンディ ミニ 筋膜リリースガン 静音 アルミニウム合金ボディ 4段階振動 首 肩 足裏', query: '筋膜リリースガン 超軽量 ミニ' }
  ];

  const massageGunItems = [];
  for (const cfg of massageGunConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 3000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (massageGunItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古') && !massageGunItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        massageGunItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【防水キャビテーション美容器＆温熱RF・EMSボディシェイパー】 10選 ---
  console.log('\n=== テーマ2: 防水キャビテーション美容器＆温熱RF・EMSボディシェイパー ===');
  const cavitationConfigs = [
    { brand: 'yaman_cavispa_rf_core_plus_body', name: 'ヤーマン YA-MAN キャビスパRFコア PLUS 防水 キャビテーション ラジオ波 EMS お風呂 全身', query: 'ヤーマン キャビスパ RFコア' },
    { brand: 'belulu_cavitstyle_cavitation_led', name: '美ルル キャビスタ belulu キャビテーション RF温熱 LED光エステ 赤色LED EMS お腹 太もも 二の腕', query: '美ルル キャビスタ' },
    { brand: 'myse_deep_core_body_facial_roller', name: 'ミーゼ ディープコア myse ヤーマン アセチノ もみ出し 防水 ボディ 顔 お腹 セルライトケア', query: 'ミーゼ ディープコア' },
    { brand: 'tbr_cavitation_rf_ems_body_shaper', name: 'キャビテーション 美顔器 ボディ美容器 超音波 EMS 高周波RF ラジオ波 赤色LED セルライト 痩身', query: 'キャビテーション RF EMS 美容器' },
    { brand: 'anlan_cavitation_rf_ems_slimming', name: 'ANLAN キャビテーション 美容器 ボディ用 高周波 ラジオ波 温熱 EMS 振動 LED光エステ お腹 引き締め', query: 'ANLAN キャビテーション' },
    { brand: 'sarlisi_body_cavitation_rf_device', name: 'SARLISI キャビテーション 美容器 超音波 RF温熱 EMS微弱電流 赤色青色LED 引き締め 脂肪燃焼サポート', query: 'SARLISI キャビテーション' },
    { brand: 'alif_cavispa_waterproof_body_shaper', name: 'キャビテーション 家庭用 複合美容器 IPX7防水 お風呂使用可 超音波振動 EMS リフトケア 太もも', query: 'キャビテーション 防水 お風呂 家庭用' },
    { brand: 'dr_caviet_the_phantom_body_pro', name: '家庭用 キャビテーション ダイエット 器具 シェイプアップ セルライト 除去 吸引 高周波 EMS', query: 'キャビテーション 器具 お腹' },
    { brand: 'cavit_fat_reduction_slimming_machine', name: '超音波 キャビテーション ボディスリミングマシン EMS ラジオ波 LEDフォト 全身 ダイエット器具', query: '超音波 キャビテーション マシン' },
    { brand: 'lourdes_ems_shape_roller_device', name: 'ルルド シェイプアップ 美容ローラー 温熱 EMS キャビテーション ボディケア むくみ セルライト', query: 'ルルド シェイプ EMS' }
  ];

  const cavitationItems = [];
  for (const cfg of cavitationConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 3000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (cavitationItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古') && !cavitationItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        cavitationItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【電動かかと角質リムーバー＆ガラス製足裏フットファイル】 10選 ---
  console.log('\n=== テーマ3: 電動かかと角質リムーバー＆ガラス製足裏フットファイル ===');
  const callusConfigs = [
    { brand: 'drscholl_velvet_smooth_electric_file', name: 'ドクターショール ベルベットスムーズ 電動角質リムーバー 海洋ミネラル ダイヤモンド かかと やすり', query: 'ドクターショール ベルベットスムーズ' },
    { brand: 'anlan_electric_callus_remover_vacuum', name: 'ANLAN 電動角質リムーバー かかと角質削り 吸塵機能付き LEDライト 3種類ローラー USB充電式 防水', query: 'ANLAN 角質リムーバー' },
    { brand: 'koizumi_sound_foot_care_klc0341', name: 'コイズミ KOIZUMI プチエステ 角質ケア 電動爪やすり かかと 削り 乾電池式 フットケア', query: 'コイズミ 角質ケア' },
    { brand: 'nano_glass_foot_file_heel_shiner', name: 'ナノガラス かかとやすり 角質削り 踵 かかと磨き 丸洗い ガラス製 フットファイル つるつる', query: 'ナノガラス かかとやすり' },
    { brand: 'festino_charging_foot_care_file', name: 'FESTINO フェスティノ 充電式 フットケア 角質リムーバー 電動かかと削り コードレス', query: 'フェスティノ フットケア' },
    { brand: 'showa_electric_heel_polisher_waterproof', name: '電動かかと角質リムーバー 強力2段階スピード 3種ローラー 防水仕様 丸洗い USB充電式', query: '電動角質リムーバー 強力 防水' },
    { brand: 'titania_solingen_germany_foot_file', name: 'ゾーリンゲン ドイツ製 フットファイル かかと 角質削り 両面ヤスリ プロ仕様 魚の目 タコ', query: 'ゾーリンゲン フットファイル' },
    { brand: 'be_smile_glass_foot_peeling_buffer', name: '両面 特殊ガラス かかと 角質取り やすり 削り 足裏 つるつる 美足 フットピーリング', query: 'ガラス かかと 角質削り' },
    { brand: 'dual_roller_electric_heel_file_recharge', name: '充電式 電動かかと削り 角質除去 足裏ケア ひび割れ ガサガサ タコ 魚の目 リムーバー', query: '電動かかと削り 充電式' },
    { brand: 'stainless_foot_file_callus_remover', name: 'プロ用 両面 ステンレス製 かかとやすり 足裏 角質削り 耐水 お風呂 丸洗い フットケア', query: 'ステンレス かかとやすり 両面' }
  ];

  const callusItems = [];
  for (const cfg of callusConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 800) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (callusItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 800 && !it.itemName.includes('中古') && !callusItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        callusItems.push(valid);
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
    theme1_massage_gun: massageGunItems,
    theme2_cavitation: cavitationItems,
    theme3_callus_remover: callusItems,
    fetchedAt: new Date().toISOString()
  };

  const outPath = 'scratch/rakuten_winter_batch61_items.json';
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 第61弾 全${massageGunItems.length + cavitationItems.length + callusItems.length}件のアイテム情報を ${outPath} に保存しました！`);
}

fetchWinterBatch61Items().catch(console.error);
