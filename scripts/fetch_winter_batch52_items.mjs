import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch52Items() {
  console.log('❄️ [11-12月冬コスメ 第52弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【高濃度ハイドロキノン＆純粋レチノール 薬用集中スポット美白クリーム】 10選 ---
  console.log('\n=== テーマ1: シミ・肝斑・高濃度ハイドロキノン＆レチノールドクターズコスメ ===');
  const hqConfigs = [
    { brand: 'lantelno_white_rush_hq', name: 'LANTELNO ランテルノ ホワイトHQクリーム 6g 純ハイドロキノン 5%配合 専門機関レベル 集中美白スポットケア', query: 'ランテルノ ホワイトHQクリーム 6g' },
    { brand: 'asahi_lab_pure_hq', name: '旭研究所 純ハイドロキノン 5% 原液 10g 美容液 非加熱 安定型 業務用 シミ 肝斑 スポット美容液', query: '旭研究所 純ハイドロキノン 5% 10g' },
    { brand: 'pluskirei_plus_white_hq', name: 'プラスキレイ プラスホワイトHQセラム 30g ハイドロキノン 5%配合 シワ たるみ シミ 集中ケア', query: 'プラスキレイ プラスホワイトHQ' },
    { brand: 'bglen_qusome_white2', name: 'b.glen ビーグレン QuSome ホワイト2.0 15g ハイドロキノン配合 QuSomeカプセル浸透 ナイトクリーム', query: 'ビーグレン QuSomeホワイト2.0' },
    { brand: 'dermisa_skin_fade', name: 'デルミサ スキンフェイドクリーム 50g 純ハイドロキノン 2%配合 米国ロングセラー ビタミンC シミ そばかす', query: 'デルミサ スキンフェイドクリーム' },
    { brand: 'pola_whiteshot_sxs', name: 'POLA ポーラ ホワイトショット SXS N 20g 医薬部外品 薬用美白美容液 シミ 集中密着 ルシノール配合', query: 'ポーラ ホワイトショット SXS 20g' },
    { brand: 'shiseido_haku_melano_focus', name: '資生堂 HAKU メラノフォーカスEV 45g 医薬部外品 薬用美白美容液 4MSK m-トラネキサム酸 シミ予防', query: 'HAKU メラノフォーカスEV 45g' },
    { brand: 'obagi_c25_serum_neo', name: 'ロート製薬 オバジC25セラム ネオ 12ml ピュアビタミンC 25%配合 毛穴 くすみ ハリ シミ エイジングケア', query: 'オバジC25セラム ネオ 12ml' },
    { brand: 'kiso_hydroquinone_cream', name: 'KISO 基礎化粧品 ハイドロクリーム 8g 純ハイドロキノン 5%配合 安定型 高濃度スポット集中クリーム', query: 'KISO ハイドロクリーム 8g' },
    { brand: 'ampluer_luxury_white_spot', name: 'アンプルール ラグジュアリーホワイト コンセントレートHQ110 11ml 新安定型ハイドロキノン 夜用スポット美容液', query: 'アンプルール コンセントレートHQ110' }
  ];

  const hqItems = [];
  for (const cfg of hqConfigs) {
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
        hqItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【かっさプレート＆温感リフトカッサ】 10選 ---
  console.log('\n=== テーマ2: かっさプレート＆温感リフトカッサ ===');
  const caxaConfigs = [
    { brand: 'ayura_bicassa_plate', name: 'アユーラ AYURA ビカッサプレート プレミアム 陶磁器製 石川窯 手作り かっさ 美容 輪郭マッサージ', query: 'アユーラ ビカッサプレート プレミアム' },
    { brand: 'refa_caxa_ray', name: 'ReFa リファ カッサレイ CAXA RAY 美顔ローラー 美顔器 かっさ サロン専売 マイクロカレント 防水', query: 'ReFa CAXA RAY' },
    { brand: 'panasonic_vitalift_kassa', name: 'パナソニック バイタリフト かっさ EH-SP85-K デュアルダイナミックEMS 温感かっさ 美顔器 防水', query: 'パナソニック バイタリフト かっさ EH-SP85' },
    { brand: 'terahertz_kassa_heart', name: '高純度 テラヘルツ鉱石 かっさプレート ハート型 美容 マッサージ 高純度15N 血行促進 リンパ流し', query: 'テラヘルツ かっさ ハート型' },
    { brand: 'rosequartz_kassa_plate', name: '天然石 ローズクォーツ かっさプレート 羽型 紅水晶 フェイスライン 小顔 目元 むくみケア', query: 'ローズクォーツ かっさプレート' },
    { brand: 'refa_4_caxa_ray', name: 'ReFa 4 CAXA RAY リファフォーカッサレイ 4つのローラー クレセントライン 全身 かっさ マッサージ', query: 'ReFa 4 CAXA RAY' },
    { brand: 'myse_deep_skin_clear', name: 'ヤーマン ミーゼ ディープスキンクリア 超音波 ウォーターピーリング かっさ型 角質 毛穴ケア', query: 'ミーゼ ディープスキンクリア' },
    { brand: 'cogit_caxa_lift_plate', name: 'コジット かっさリフトプレート ローズクォーツ配合 磁器製 ツボ押し フェイスケア', query: 'コジット かっさリフトプレート' },
    { brand: 'water_caxa_buffalo_horn', name: '天然 水牛角 かっさプレート 櫛型 魚型 頭皮 フェイス 全身マッサージ つぼ押し', query: '水牛角 かっさプレート' },
    { brand: 'suqqu_musculate_sponge_cloth', name: 'SUQQU スック 顔筋マッサージ かっさ または デザイニング マッサージ クリーム 200g', query: 'SUQQU マッサージクリーム 200g' }
  ];

  const caxaItems = [];
  for (const cfg of caxaConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        caxaItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【インバス＆アウトバス両用スカルプブラシ＆頭皮マッサージブラシ】 10選 ---
  console.log('\n=== テーマ3: スカルプブラシ＆頭皮マッサージブラシ ===');
  const scalpConfigs = [
    { brand: 'uka_scalp_brush_kenzan', name: 'uka ウカ スカルプブラシ ケンザン kenzan シリコン製 頭皮用ブラシ サロン級 頭皮クレンジング ツボ押し', query: 'uka スカルプブラシ ケンザン' },
    { brand: 'refa_heart_brush_for_scalp', name: 'ReFa リファ ハートブラシ フォースカルプ HEART BRUSH for SCALP 頭皮マッサージ 指圧代用 ほぐしブラシ', query: 'ReFa ハートブラシ フォースカルプ' },
    { brand: 'etvos_relaxing_massage_brush', name: 'エトヴォス ETVOS リラクシングマッサージブラシ シリコン製 シャンプーブラシ 頭皮マッサージ ツボ押し', query: 'エトヴォス リラクシングマッサージブラシ' },
    { brand: 'lacasta_head_spa_scalp_brush', name: 'ラ・カスタ La CASTA ヘッドスパ スキャルプブラシ シリコンピン 頭皮クレンジング シャンプー専用', query: 'ラカスタ ヘッドスパ スキャルプブラシ' },
    { brand: 'marks_and_web_scalp_massage', name: 'MARKS&WEB マークスアンドウェブ スカルプマッサージブラシ シリコン 頭皮用ブラシ ヘアケア', query: 'マークスアンドウェブ スカルプマッサージブラシ' },
    { brand: 'uka_kenzan_barikata', name: 'uka ウカ スカルプブラシ ケンザン バリカタ 硬め シリコン 頭皮コリ 刺激 シャンプーブラシ', query: 'uka スカルプブラシ ケンザン バリカタ' },
    { brand: 'mapepe_relaxing_scalp_brush', name: 'マペペ リラクシングスカルプケアブラシ ソフト シリコン もみほぐし 頭皮ブラシ シャンプー', query: 'マペペ スカルプケアブラシ' },
    { brand: 'vess_head_spa_handpro', name: 'ベス工業 ヘッドスパ ハンドプロ プレミアム ヘッドライン遠赤外線 頭皮マッサージ ツボ刺激', query: 'ヘッドスパ ハンドプロ 遠赤外線' },
    { brand: 'aveda_mini_paddle_brush', name: 'AVEDA アヴェダ ミニ パドル ブラシ 頭皮マッサージ クッションブラシ ブロードライ ホリデーギフト', query: 'アヴェダ ミニパドルブラシ' },
    { brand: 'uka_scalp_brush_soft', name: 'uka ウカ スカルプブラシ ケンザン ソフト やわらかめ 敏感頭皮 ピンク シリコン製', query: 'uka スカルプブラシ ケンザン ソフト' }
  ];

  const scalpItems = [];
  for (const cfg of scalpConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        scalpItems.push(valid);
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
    theme1_hq_whitening: hqItems,
    theme2_caxa_lift: caxaItems,
    theme3_scalp_brush: scalpItems
  };

  const outPath = path.resolve('scratch/rakuten_winter_batch52_items.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 [保存完了] 楽天APIより取得した最新30アイテムを ${outPath} に保存しました！`);
  console.log(`件数: テーマ1=${hqItems.length}/10, テーマ2=${caxaItems.length}/10, テーマ3=${scalpItems.length}/10`);
}

fetchWinterBatch52Items().catch(err => {
  console.error('Fatal fetch error:', err);
  process.exit(1);
});
