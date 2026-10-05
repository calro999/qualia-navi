import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch46Items() {
  console.log('❄️ [11-12月冬コスメ 第46弾] 楽天OpenAPIからリアルタイムで最新30アイテムを厳選取得します...');

  // --- テーマ1: 【2026冬・寒暖差の赤ら顔＆皮脂ゆらぎ肌を集中鎮静】高濃度アゼライン酸美容液＆アゼライン酸バリアクリーム 10選 ---
  console.log('\n=== テーマ1: 高濃度アゼライン酸美容液＆アゼライン酸バリアクリーム ===');
  const azelaicConfigs = [
    { brand: 'drx_aza_clear', name: 'ロート製薬 DRX AZAクリア 15g アゼライン酸高濃度配合クリーム クリニック専売 皮脂・赤みケア', query: 'DRX AZAクリア' },
    { brand: 'cos_de_baha_azelaic_10_serum', name: 'Cos De BAHA コスデバハ アゼライン酸 10% 美容液 30ml ヒアルロン酸 ナイアシンアミド 肌トラブル鎮静', query: 'コスデバハ アゼライン酸 美容液 30ml' },
    { brand: 'kiso_care_azelaic_acid_serum', name: 'KISO キソ バランシングエッセンス AZ 20% 30ml 高濃度アゼライン酸誘導体 毛穴・皮脂バランス整肌', query: 'KISO アゼライン酸 美容液' },
    { brand: 'toutvert_balancing_ga_lotion', name: 'TOUT VERT トゥヴェール バランシングGAローション 100ml グリシルグリシン6% アゼライン酸誘導体 プレ化粧水', query: 'トゥヴェール バランシングGAローション' },
    { brand: 'advanced_clinicals_azelaic_acid', name: 'Advanced Clinicals アドバンスドクリニカルズ アゼライン酸 セラム 59ml 赤ら顔 色ムラ補正', query: 'アドバンスドクリニカルズ アゼライン酸' },
    { brand: 'the_ordinary_azelaic_suspension', name: 'The Ordinary ジオーディナリー アゼライン酸 サスペンション 10% 30ml 明るく滑らかな肌へ', query: 'The Ordinary アゼライン酸' },
    { brand: 'anua_heartleaf_azelaic_pore_serum', name: 'Anua アヌア ドクダミ アゼライン酸 ポアコントロール 美容液 30ml 毛穴引き締め 低刺激', query: 'アヌア アゼライン酸 美容液' },
    { brand: 'derma_laser_azelaic_sheet_mask', name: 'クオリティファースト ダーマレーザー ウルセラAZ 美容液 30ml 高濃度アゼライン酸 レーザー美容発想', query: 'ダーマレーザー アゼライン酸' },
    { brand: 'dr_wu_renewal_serum_azelaic', name: 'DR.WU ドクターウー マンデル酸 18% セラム 15ml 敏感肌マイルド角質ケア 毛穴・くすみ', query: 'DR.WU マンデル酸 15ml' },
    { brand: 'nature_republic_azelaic_cica', name: 'ネイチャーリパブリック アゼライン酸 シカ 美容液 30ml 敏感肌ケア 鎮静・毛穴', query: 'ネイチャーリパブリック アゼライン酸' }
  ];

  const azelaicItems = [];
  for (const cfg of azelaicConfigs) {
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
        azelaicItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【2026冬・寒さで硬化した角層を解きほぐす発酵バイオの力】発酵スキンケア＆ガラクトミセス・コメ発酵液・酵母コスメ 10選 ---
  console.log('\n=== テーマ2: 発酵スキンケア＆ガラクトミセス・コメ発酵液・酵母コスメ ===');
  const fermentedConfigs = [
    { brand: 'sk2_facial_treatment_essence', name: 'SK-II エスケーツー フェイシャルトリートメント エッセンス 230ml ピテラ90%以上 発酵美肌', query: 'SK-II フェイシャルトリートメントエッセンス 230ml' },
    { brand: 'manyo_galac_niacin_20_essence', name: '魔女工場 manyo ガラク ナイアシン 2.0 エッセンス 50ml ガラクトミセス93.69% 美白・キメ透明感', query: '魔女工場 ガラクナイアシン 50ml' },
    { brand: 'albion_flora_drip', name: 'ALBION アルビオン フローラドリップ 160ml 白神産5種厳選植物 純白麹発酵濃密化粧液', query: 'アルビオン フローラドリップ 160ml' },
    { brand: 'one_by_kose_serum_veil_deep_repair', name: 'ONE BY KOSE ワンバイコーセー セラム ヴェール ディープリペア 60ml ライスパワーNo.11 うるおい改善薬用導入美容液', query: 'ONE BY KOSE セラム ヴェール 60ml' },
    { brand: 'numbuzin_no3_skin_softening_serum', name: 'numbuzin ナンバーズイン 3番 すべすべキメケアセラム 50ml 50種類の発酵成分 毛穴・つるすべ肌', query: 'ナンバーズイン 3番 セラム 50ml' },
    { brand: 'missha_time_revolution_night_repair', name: 'MISSHA ミシャ タイムレボリューション ナイトリペア アンプル 50ml 極酵二裂酵母発酵 ハリツヤ夜用美容液', query: 'ミシャ タイムレボリューション アンプル 50ml' },
    { brand: 'maihada_hada_jun_essence', name: '米肌 MAIHADA 肌潤改善エッセンス 30ml ライスパワーNo.11 高保湿薬用美容液 セラミド産生', query: '米肌 肌潤改善エッセンス 30ml' },
    { brand: 'dr_ci_labo_vc100_essence_lotion_ex', name: 'ドクターシーラボ VC100 エッセンスローションEX 150ml 高浸透ビタミンC × 発酵コラーゲン 濃厚とろみ', query: 'ドクターシーラボ VC100 エッセンスローションEX 150ml' },
    { brand: 'kikumasamune_sake_skin_lotion_high_moist', name: '菊正宗 日本酒の化粧水 高保湿 500ml コメ発酵液 アミノ酸 セラミド大容量 うるおいバリア', query: '菊正宗 日本酒の化粧水 高保湿 500ml' },
    { brand: 'anua_rice_70_glow_milky_toner', name: 'Anua アヌア 米ぬか 70% グロウ ミルキートナー 250ml 米セラミド コメ発酵エキス もちもち吸い付く肌', query: 'Anua 米ぬか トナー 250ml' }
  ];

  const fermentedItems = [];
  for (const cfg of fermentedConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        fermentedItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【2026冬・美容室に行けない年末の褪色・白髪を艶やかにリセット】サロン級カラートリートメント＆カラーシャンプー 10選 ---
  console.log('\n=== テーマ3: サロン級カラートリートメント＆カラーシャンプー ===');
  const colorConfigs = [
    { brand: 'clayence_clayspa_color_treatment', name: 'clayence クレイエンス クレイスパ カラートリートメント 235g 泥ミネラル 自然な染め上がり ツヤ美髪', query: 'クレイスパ カラートリートメント 235g' },
    { brand: 'rishiri_hair_color_treatment', name: '利尻ヘアカラートリートメント 200g 天然利尻昆布エキス 無添加 白髪用 うるおいトリートメント染毛', query: '利尻ヘアカラートリートメント 200g' },
    { brand: 'fiole_qualucia_color_shampoo_purple', name: 'FIOLE フィヨーレ クオルシア カラーシャンプー パープル 250ml ブリーチ毛・黄ばみ防止 サロン品質', query: 'クオルシア カラーシャンプー パープル 250ml' },
    { brand: 'hoyu_somarca_color_charge_treatment', name: 'hoyu ホーユー ソマルカ カラーチャージ トリートメント 130g サロンクオリティ 高発色 色持ちサポート', query: 'ソマルカ カラーチャージ 130g' },
    { brand: 'syoss_color_treatment', name: 'syoss サイオス カラートリートメント 180g たった5分放置 濃厚カラー定着 サロン帰り再現', query: 'サイオス カラートリートメント 180g' },
    { brand: 'ancels_color_butter_treatment', name: 'エンシェールズ カラーバター 200g トリートメント成分90% 鮮やか発色 傷まないヘアカラーケア', query: 'エンシェールズ カラーバター 200g' },
    { brand: 'napla_n_dot_color_shampoo', name: 'napla ナプラ N. エヌドット カラーシャンプー 320ml シアバター ハーブエキス つややか退色防止', query: 'N. カラーシャンプー 320ml' },
    { brand: 'scalp_d_beaute_hair_color_treatment', name: 'スカルプD ボーテ ヘアカラートリートメント 200g 女性用白髪染め 深染め 頭皮ケア処方', query: 'スカルプD ボーテ カラートリートメント 200g' },
    { brand: 'b_ris_airy_coloring_foam', name: 'b.ris ビーリス エアリーカラーリングフォーム 80g 泡タイプ 医薬部外品 根元からムラなく染まる', query: 'b.ris エアリーカラーリングフォーム' },
    { brand: 'royce_royce_color_shampoo', name: 'ROYD ロイド カラーシャンプー 300ml サロン仕様 きしまない 高密着カラーキープ処方', query: 'ロイド カラーシャンプー 300ml' }
  ];

  const colorItems = [];
  for (const cfg of colorConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        colorItems.push(valid);
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
    batch: 46,
    fetchedAt: new Date().toISOString(),
    theme1_azelaic: azelaicItems,
    theme2_fermented: fermentedItems,
    theme3_colortreatment: colorItems
  };

  fs.writeFileSync('scratch/rakuten_winter_batch46_items.json', JSON.stringify(result, null, 2), 'utf8');
  console.log(`\n🎉 完了！ テーマ1: ${azelaicItems.length}件, テーマ2: ${fermentedItems.length}件, テーマ3: ${colorItems.length}件 を scratch/rakuten_winter_batch46_items.json に保存しました！`);
}

fetchWinterBatch46Items().catch(console.error);
