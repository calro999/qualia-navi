import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWinterBatch77Items() {
  console.log('❄️ [11-12月冬コスメ 第77弾] 楽天OpenAPIからリアルタイムで最新30アイテムを取得開始します...');

  // --- テーマ1: 【冬の乾燥割れ爪・二枚爪・薄爪を鉄壁補強＆自爪育成】ネイルハードナー＆自爪補強コート 10選 ---
  console.log('\n=== テーマ1: ネイルハードナー＆自爪補強コート ===');
  const nailHardenerConfigs = [
    { brand: 'opi_nail_envy_strengthener', name: 'OPI オーピーアイ ネイルエンビー 15ml 自爪 補強 ネイルケア ハードナー 割れ爪 二枚爪', query: 'OPI ネイルエンビー 15ml' },
    { brand: 'ettusais_quick_care_coat', name: 'エテュセ ettusais クイックケアコート 9ml ツヤ出し ネイル美容液 爪補強 リムーバー不要', query: 'エテュセ クイックケアコート' },
    { brand: 'canmake_foundation_colors_nail', name: 'キャンメイク CANMAKE ファンデーションカラーズ ネイルハードナー 美爪 血色感 自爪補正', query: 'キャンメイク ファンデーションカラーズ' },
    { brand: 'ducato_fiber_in_hardener_ex', name: 'デュカート Ducato ファイバーインハードナー EX 爪補強 ナイロン繊維 割れ防止', query: 'デュカート ファイバーインハードナー' },
    { brand: 'dup_foundation_for_nails', name: 'D-UP ディーアップ ファンデーション ネイルハードナー ダイヤモンドパウダー 爪補強', query: 'ディーアップ ファンデーション ネイル' },
    { brand: 'squse_me_glossy_coat_nail', name: 'スキューズミー グロッシーコート オールインワン ネイル ハードナー 速乾 美爪 うるおい', query: 'スキューズミー グロッシーコート' },
    { brand: 'mentholatum_rich_nail_repair_coat', name: 'メンソレータム ハンドベール リッチネイル 爪補強コート 集中補修 つや消し 自爪感覚', query: 'メンソレータム リッチネイル 爪補強コート' },
    { brand: 'orbis_nail_care_protector', name: 'オルビス ORBIS ネイルケアプロテクター 自爪補強 クリア 美爪 潤い', query: 'オルビス ネイルケアプロテクター' },
    { brand: 'nail_holic_24_7_base_coat', name: 'コーセー ネイルホリック NAIL HOLIC 24_7 ベースコート 爪に優しい 酸素透過性 保湿', query: 'ネイルホリック 24_7 ベースコート' },
    { brand: 'uka_better_nail_serum_care', name: 'uka ウカ ベターネイルセラム または ネイルベースコート 爪用美容液 アミノ酸 ケラチン', query: 'uka ネイルセラム' }
  ];

  const nailHardenerItems = [];
  for (const cfg of nailHardenerConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 400) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (nailHardenerItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 400 && !it.itemName.includes('中古') && !nailHardenerItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        nailHardenerItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ2: 【冬の頭皮砂漠化・乾燥フケ・かゆみを泡立てずに濃密補修】クレイクリームシャンプー＆高保湿泡立たないシャンプー 10選 ---
  console.log('\n=== テーマ2: クレイクリームシャンプー＆高保湿泡立たないシャンプー ===');
  const creamShampooConfigs = [
    { brand: 'cocone_clay_cream_shampoo', name: 'cocone ココネ クレイクリームシャンプー 380g ミネラル海泥 オールインワン 泥シャンプー トリートメント不要', query: 'ココネ クレイクリームシャンプー 380g' },
    { brand: 'kamika_black_hair_cream_shampoo', name: 'KAMIKA カミカ 黒髪クリームシャンプー 400g 泡立たない オールインワン ヘマチン メリタン 白髪染め世代', query: 'KAMIKA クリームシャンプー 400g' },
    { brand: 'predia_fango_head_cleanse_spa', name: 'コーセー プレディア Predia ファンゴ ヘッドクレンズ SPA+ 250g / 500g 頭皮ケア クレンジング パック', query: 'プレディア ファンゴ ヘッドクレンズ' },
    { brand: 'clayence_clayspa_treatment_shampoo', name: 'clayence クレイエンス クレイスパ クレンジング または カラートリートメント クレイ泥補修', query: 'クレイエンス クレイスパ' },
    { brand: 'four_zero_five_cleansing_conditioner', name: '405クレンジングコンディショナー 490ml 泡立たないシャンプー ノーシャンプー 植物由来 スカルプ', query: '405 クレンジングコンディショナー' },
    { brand: 'valanrose_kuro_cream_shampoo', name: 'VALANROSE バランローズ KUROクリームシャンプー ダークブラウン / ナチュラルブラック 白髪ケア 泡立たない', query: 'バランローズ KUROクリームシャンプー' },
    { brand: 'loreal_elseve_cleansing_cream', name: 'ロレアル パリ エルセーヴ エクストラオーディナリー オイル ラ クレム ラヴォン クレンジングクリーム', query: 'ロレアル エルセーヴ クレンジングクリーム' },
    { brand: 'weleda_rosemary_scalp_cleansing', name: 'WELEDA ヴェレダ ローズマリー スカルプクレンジング 200g 3in1 ヘッドスパ 泡立たない クレイ', query: 'ヴェレダ ローズマリー スカルプクレンジング' },
    { brand: 'haru_kurokami_scalp_shampoo', name: 'haru ハル kurokamiスカルプ 400ml 100%天然由来 オールインワン アミノ酸 ノンシリコン 冬頭皮', query: 'haru kurokamiスカルプ 400ml' },
    { brand: 'epo_premium_hematin_hair_essence', name: 'エポ プレミアムヘマチン または クリームシャンプー 高濃度ヘマチン 毛髪集中補修 ハリコシ', query: 'エポ プレミアムヘマチン' }
  ];

  const creamShampooItems = [];
  for (const cfg of creamShampooConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1000) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (creamShampooItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 1000 && !it.itemName.includes('中古') && !creamShampooItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        creamShampooItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // --- テーマ3: 【冬の乾燥肌・粉ふき肌に吸い付く密着美肌】高保湿メイクスポンジ＆水光パフ 10選 ---
  console.log('\n=== テーマ3: 高保湿メイクスポンジ＆水光パフ ===');
  const makeupSpongeConfigs = [
    { brand: 'andbe_black_sponge_smooth', name: '&be アンドビー ブラックスポンジ なめらか肌当たり 水なし水あり 立体型メイクスポンジ 河北裕介', query: '&be ブラックスポンジ' },
    { brand: 'rosy_rosa_multi_foundation_puff', name: 'ロージーローザ ROSY ROSA マルチファンデパフ 2P / ダイヤ型 3Dスポンジ 厚手 ふわふわ', query: 'ロージーローザ マルチファンデパフ' },
    { brand: 'beautyblender_original_sponge', name: 'ビューティーブレンダー beautyblender オリジナル メイクアップスポンジ 水を含ませて膨らむ 立体パフ', query: 'ビューティーブレンダー スポンジ' },
    { brand: 'real_techniques_miracle_complexion', name: 'リアルテクニクス Real Techniques ミラクル コンプレクション スポンジ 卵型 高密着ベース', query: 'リアルテクニクス スポンジ' },
    { brand: 'fillimilli_watery_puff_olive_young', name: 'FILLIMILLI フィリミリ ウォータリーパフ 3P 韓国コスメ オリーブヤング 水光肌 しっとり密着', query: 'フィリミリ ウォータリーパフ' },
    { brand: 'ririmew_mochi_sponge_puff', name: 'Ririmew リリミュウ モチパフ 指原莉乃 プロデュース 密着スポンジパフ ドロップ型', query: 'リリミュウ パフ' },
    { brand: 'etvos_multi_face_sponge', name: 'ETVOS エトヴォス マルチパフ / マカロンパフ メイクアップスポンジ 敏感肌 摩擦レス 洗える', query: 'エトヴォス パフ スポンジ' },
    { brand: 'shiseido_sponge_puff_119_118', name: '資生堂 スポンジパフ アーティストタッチ または ファンデーションスポンジ 119 リキッド用 高密度', query: '資生堂 スポンジパフ 119' },
    { brand: 'chacott_powder_puff_cleartype', name: 'チャコット Chacott パウダーパフ 2個入 ベルベットのような極上肌当たり ビロード パフ', query: 'チャコット パウダーパフ 2個' },
    { brand: 'shobido_3d_makeup_sponge_marshmallow', name: 'SHOBIDO 粧美堂 もちもち 3D メイクアップスポンジ 水を含ませてぷるぷる 水光ベース', query: '粧美堂 メイクスポンジ' }
  ];

  const makeupSpongeItems = [];
  for (const cfg of makeupSpongeConfigs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 300) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり') || it.itemName.includes('ジャンク')) return false;
        if (makeupSpongeItems.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 300 && !it.itemName.includes('中古') && !makeupSpongeItems.some(e => e.itemCode === it.itemCode));

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        makeupSpongeItems.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  const results = {
    theme1_nail_hardener_strengthener: nailHardenerItems,
    theme2_clay_cream_shampoo_nourish: creamShampooItems,
    theme3_hydrating_makeup_sponge_puff: makeupSpongeItems
  };

  const outputPath = 'scratch/rakuten_winter_batch77_items.json';
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n🎉 [取得完了] ${outputPath} に保存しました。`);
  console.log(`- テーマ1 (ネイルハードナー): ${nailHardenerItems.length}件`);
  console.log(`- テーマ2 (クレイクリームシャンプー): ${creamShampooItems.length}件`);
  console.log(`- テーマ3 (メイクスポンジ＆水光パフ): ${makeupSpongeItems.length}件`);
}

fetchWinterBatch77Items();
