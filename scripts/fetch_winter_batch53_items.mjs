import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch53Items() {
  console.log('❄️ [11-12月冬コスメ 第53弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【高純度エクソソーム＆ヒト幹細胞培養液 濃密エイジングケア美容液】 10選 ---
  console.log('\n=== テーマ1: 高純度エクソソーム＆ヒト幹細胞培養液 美容液 ===');
  const exosomeConfigs = [
    { brand: 'kiso_exosome_serum', name: 'KISO 基礎化粧品 ステムセラム EX 30ml 高純度ヒト幹細胞順化培養液 ヒト脂肪由来間葉系細胞エクソソーム 集中エイジングケア原液', query: 'KISO エクソソーム 美容液' },
    { brand: 'fracora_stem_cell_extract', name: 'フラコラ fracora ヒト幹細胞培養エキス原液 30ml 先進培養技術 リポソーム浸透 ハリ弾力 くすみケア', query: 'フラコラ ヒト幹細胞培養エキス原液' },
    { brand: 'regenskin_srs_serum', name: 'RegenSkin リジェンスキン SRS セラム 30ml 成長因子 EGF IGF 配合 ドクターズコスメ 美容クリニック監修', query: 'リジェンスキン SRS セラム' },
    { brand: 'cell_code_exosome_serum', name: 'CELL CODE セルコード エクソソーム配合美容液 30ml ヒト臍帯血幹細胞培養液 高濃度アンプル ハリ ツヤ 毛穴', query: 'セルコード エクソソーム 美容液' },
    { brand: 'nanoa_sc_serum_stem_cell', name: 'NANOA ナノア SCセラム ヒト幹細胞 美容液 30ml 皮膚科医共同開発 EGF FGF 高純度エクソソーム 導入美容液', query: 'ナノア SCセラム ヒト幹細胞' },
    { brand: 'medicube_exosome_shot', name: 'medicube メディキューブ ゼロ 1DAY エクソソームショット 2000 7500 アンプル 毛穴縮小 毛穴引き締め', query: 'メディキューブ エクソソーム ショット' },
    { brand: 'dds_matrix_extract', name: 'DDS MATRIX マトリックス エキス 5ml ヒト脂肪細胞順化培養液 EGF FGF配合 高機能エイジングケア 原液美容液', query: 'マトリックス エキス ヒト幹細胞' },
    { brand: 'stembeaute_booster_lotion', name: 'StemBeaute ステムボーテ スペシャルセット ヒト幹細胞培養液 RemyStem 全身美容ローション フェイス＆ボディ', query: 'ステムボーテ ヒト幹細胞' },
    { brand: 'avalon_pure_exosome', name: 'セルロジーコスメ セラム 30ml リポソーム ヒト幹細胞エキス エクソソーム配合 サロン専売 濃密浸透美容液', query: 'セルロジーコスメ セラム エクソソーム' },
    { brand: 'signalift_serum_exosome', name: 'シグナリフト エクソソーム ステムブースター エッセンス 30ml 導入美容液 年齢肌 ハリ 毛穴 引き締め', query: 'エクソソーム 美容液 原液 30ml' }
  ];

  const exosomeItems = [];
  for (const cfg of exosomeConfigs) {
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
        exosomeItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【超音波トリートメントアイロン＆サロン級浸透促進美髪ギア】 10選 ---
  console.log('\n=== テーマ2: 超音波トリートメントアイロン＆美髪浸透ギア ===');
  const ultrasonicConfigs = [
    { brand: 'care_pro_professional_iron', name: 'CARE PRO ケアプロ プロフェッショナル 超音波アイロン BUI-01 サロン専売 トリートメント浸透促進 超音波 赤外線 防水', query: 'CARE PRO ケアプロ 超音波アイロン' },
    { brand: 'yaman_shine_pro_hc21', name: 'YA-MAN ヤーマン 超音波トリートメント シャインプロ HC-21 ナノ浸透 音波振動 温感 赤色LED 防水 お風呂使用可', query: 'ヤーマン シャインプロ HC-21' },
    { brand: 'care_pro_deep_homecare', name: 'CARE PRO DEEP ケアプロ ディープ 超音波アイロン CPT-01 ホームケア専用 トリートメント浸透IPX7防水 サロン級美髪', query: 'CARE PRO DEEP ケアプロ ディープ' },
    { brand: 'salonia_ultrasonic_treatment', name: 'SALONIA サロニア スムースシャイン トリートメントアイロン 超音波 浸透促進 赤外線 ヘアケアギア', query: 'サロニア トリートメントアイロン 超音波' },
    { brand: 'kiboer_ultrasonic_hair_iron', name: 'Kiboer キボエ 超音波トリートメントアイロン ヘアアイロン コードレス IPX6防水 青色LED 赤外線 髪質改善', query: 'Kiboer 超音波 トリートメントアイロン' },
    { brand: 'le_ment_deep_repair_pro', name: 'Le ment ルメント ディープリペアプロ 超音波アイロン トリートメント導入 赤外線 LED 防水 ヘアパック促進', query: 'ルメント ディープリペアプロ' },
    { brand: 'agetuya_ultrasonic_treatment', name: 'Agetuya アゲツヤ トリートメントアイロン 超音波 赤外線 インバス トリートメント浸透 美髪器 コードレス', query: 'アゲツヤ トリートメントアイロン 超音波' },
    { brand: 'areti_ultrasonic_repair_iron', name: 'Areti アレティ 超音波 ヘアアイロン トリートメント浸透 東京発理美容家電 インバス防水 赤色LED', query: 'アレティ 超音波 トリートメント' },
    { brand: 'modshair_advanced_ultrasonic', name: 'mod\'s hair モッズ・ヘア アドバンス スマート 超音波ヘアアイロン MHI-3200 トリートメント浸透器', query: 'モッズヘア 超音波 トリートメント' },
    { brand: 'kinujo_ultrasonic_pro_iron', name: 'KINUJO 絹女 または プロ仕様 超音波 浸透トリートメントアイロン 防水 赤外線 髪質改善 ツヤ補修', query: '超音波 トリートメントアイロン 防水' }
  ];

  const ultrasonicItems = [];
  for (const cfg of ultrasonicConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        ultrasonicItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【家庭用IPL光美容器＆冬の集中美肌脱毛器】 10選 ---
  console.log('\n=== テーマ3: 家庭用IPL光美容器＆冬の美肌脱毛器 ===');
  const iplConfigs = [
    { brand: 'kenon_ipl_hair_remover', name: 'エムテック ケノン KE-NON フラッシュ式 脱毛器 ver8.6 国内シェア圧倒的No.1 ハイパワーIPL 美顔カートリッジ対応', query: 'ケノン 脱毛器 公式' },
    { brand: 'braun_silk_expert_pro5', name: 'BRAUN ブラウン 光美容器 シルクエキスパート Pro5 PL-5117 PL-5227 最高峰パワー 自動肌色フラッシュ VIO対応', query: 'ブラウン シルクエキスパート Pro5' },
    { brand: 'panasonic_smooth_epi', name: 'Panasonic パナソニック 光エステ スムースエピ ES-WG0A 冷却スキンケア ハイパワーIPL 美肌ケア機能', query: 'パナソニック スムースエピ ES-WG0A' },
    { brand: 'refa_beautech_epi_cool', name: 'ReFa リファ ビューテック エピ クール EPI COOL サファイア冷却 ハイパワー照射 美肌IPL 全身＆VIO', query: 'ReFa ビューテック エピ' },
    { brand: 'yaman_rebeaute_venus_pro', name: 'YA-MAN ヤーマン レイボーテ ヴィーナス プロ 防水仕様 お風呂でVIO脱毛 IPL光美容器 美肌波長', query: 'ヤーマン レイボーテ ヴィーナス' },
    { brand: 'ulike_air_10_pro_ipl', name: 'Ulike ユーライク Air 10 Pro IPL サファイア氷感冷却 デュアルランプ 最高峰パワー 無痛脱毛器 全身ケア', query: 'Ulike Air 10 IPL' },
    { brand: 'jovs_dora_hyper_ipl', name: 'JOVS ジョブズ Dora ハイパーIPL 次世代光美容器 サファイア冷却 美肌フォトモード スタンフォード共同開発', query: 'JOVS Dora 脱毛器' },
    { brand: 'stella_beaute_ipl_device', name: 'STELLA BEAUTE ステラボーテ IPL光美容器 美肌LED オートクリーンシステム 冷却機能 VIO対応', query: 'ステラボーテ 光美容器' },
    { brand: 'smoothskin_pure_fit_ipl', name: 'SMOOTHSKIN スムーズスキン pure fit 家庭用光脱毛美容器 プレシジョンヘッド搭載 スピード照射 英国製', query: 'スムーズスキン pure fit' },
    { brand: 'sarlisi_sapphire_ipl_cooler', name: 'Sarlisi サーリシ サファイア冷感脱毛器 IPL光美容器 9段階調節 冷却クーリング機能 全身脱毛 美肌ケア', query: 'サーリシ 脱毛器 サファイア' }
  ];

  const iplItems = [];
  for (const cfg of iplConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        iplItems.push(valid);
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
  console.log(`- テーマ1 (エクソソーム美容液): ${exosomeItems.length}件`);
  console.log(`- テーマ2 (超音波トリートメントアイロン): ${ultrasonicItems.length}件`);
  console.log(`- テーマ3 (IPL光美容器): ${iplItems.length}件`);

  const outputData = {
    updatedAt: new Date().toISOString(),
    theme1_exosome_serum: exosomeItems,
    theme2_ultrasonic_iron: ultrasonicItems,
    theme3_ipl_device: iplItems
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch53_items.json');
  fs.writeFileSync(outPath, JSON.stringify(outputData, null, 2), 'utf8');
  console.log(`💾 scratch/rakuten_winter_batch53_items.json に保存完了しました！`);
}

fetchWinterBatch53Items();
