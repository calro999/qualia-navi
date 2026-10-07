import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch57() {
  const current = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch57_items.json', 'utf8'));

  // --- テーマ1の調整 ---
  // ソニッケアー本体を再取得
  console.log('\n--- テーマ1: ソニッケアー本体＆ブリリアントモア再取得 ---');
  const sonicRes = await searchRakutenDirect('ソニッケアー 電動歯ブラシ 本体', 6, '-reviewCount');
  const sonicValid = sonicRes.find(it => it.imageUrl && it.itemPrice > 4000 && !it.itemName.includes('替えブラシ'));
  if (sonicValid) {
    sonicValid.brandKey = 'philips_sonicare_diamondclean_smart';
    sonicValid.displayBrand = 'フィリップス ソニッケアー 音波水流 電動歯ブラシ エキスパートクリーン / ダイヤモンドクリーン ホワイトニング';
    // 既存の替えブラシを置き換え
    const idx = current.theme1_whitening_oral_care.findIndex(it => it.brandKey === 'philips_sonicare_diamondclean_smart');
    if (idx !== -1) current.theme1_whitening_oral_care[idx] = sonicValid;
    else current.theme1_whitening_oral_care.push(sonicValid);
    console.log(`✅ ソニッケアー本体更新: ${sonicValid.itemName.slice(0, 35)} (${sonicValid.priceFormatted})`);
  }
  await sleep(1300);

  const brilliantRes = await searchRakutenDirect('ライオン ブリリアントモア', 6, '-reviewCount');
  const brilliantValid = brilliantRes.find(it => it.imageUrl && it.itemPrice > 800);
  if (brilliantValid) {
    brilliantValid.brandKey = 'lion_brilliant_more_w_whitening';
    brilliantValid.displayBrand = 'ライオン ブリリアントモア W 90g 医薬部外品 ピロリン酸ナトリウム ステイン浮遊除去 美白ハミガキ';
    current.theme1_whitening_oral_care.push(brilliantValid);
    console.log(`✅ ブリリアントモア取得: ${brilliantValid.itemName.slice(0, 35)} (${brilliantValid.priceFormatted})`);
  }
  await sleep(1300);

  // --- テーマ3の不足分再取得 ---
  console.log('\n--- テーマ3: 不足アイテム再取得 ---');
  const theme3Configs = [
    {
      brand: 'atex_lourdes_foot_care_relaboo2',
      name: 'アテックス ルルド フットケア リラブー2 AX-KXL3710 足裏 つま先 かかと 手のひら 強力エアバッグ 温熱 フットマッサージャー',
      query: 'ルルド フットマッサージャー'
    },
    {
      brand: 'sixpad_foot_fit_3_ems_device',
      name: 'SIXPAD シックスパッド フットフィット Foot Fit EMS 足裏 ふくらはぎ 歩行筋 トレーニング 冷え性 むくみ解消',
      query: 'SIXPAD Foot Fit'
    },
    {
      brand: 'mytrex_foot_relax_ems_heating_mat',
      name: 'MYTREX マイトレックス フットフィット EMS フットマッサージャー 温熱 足裏 ふくらはぎ リフレッシュ',
      query: 'MYTREX フット'
    },
    {
      brand: 'omron_air_massager_hm261',
      name: 'オムロン フットマッサージャ ふくらはぎ 足先 温熱ヒーター 加圧マッサージ フットケア 疲労回復',
      query: 'オムロン エアマッサージャ'
    },
    {
      brand: 'belmise_sleep_plus_warm_leggings',
      name: 'BELMISE ベルミス パジャマレギンス スリーププラス 極暖 温熱 発熱 着圧レギンス 骨盤ケア 美脚 下半身引き締め',
      query: 'ベルミス パジャマレギンス'
    }
  ];

  for (const cfg of theme3Configs) {
    try {
      const res = await searchRakutenDirect(cfg.query, 6, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('訳あり')) return false;
        return true;
      }) || res.find(it => it.imageUrl && it.itemPrice > 2500);

      if (valid) {
        valid.brandKey = cfg.brand;
        valid.displayBrand = cfg.name;
        // 既存になければ追加
        const existingIdx = current.theme3_foot_massage_warm_care.findIndex(it => it.brandKey === cfg.brand);
        if (existingIdx !== -1) current.theme3_foot_massage_warm_care[existingIdx] = valid;
        else current.theme3_foot_massage_warm_care.push(valid);
        console.log(`✅ [${cfg.brand}] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      } else {
        console.warn(`⚠️ 見つかりませんでした: ${cfg.query}`);
      }
    } catch (e) {
      console.error(`エラー (${cfg.brand}):`, e.message);
    }
    await sleep(1300);
  }

  // NIPLUX が NECK RELAX だった場合、足用のフットケアまたは加圧レッグマッサージャーに直す
  const nipluxIdx = current.theme3_foot_massage_warm_care.findIndex(it => it.brandKey === 'niplux_leg_relax_air_ems_boots');
  if (nipluxIdx !== -1 && current.theme3_foot_massage_warm_care[nipluxIdx].itemName.includes('NECK')) {
    console.log('🔄 NIPLUX NECKをレッグ/フット用に修正取得中...');
    const footRes = await searchRakutenDirect('フットマッサージャー ふくらはぎ 温熱 エアー', 6, '-reviewCount');
    const footVal = footRes.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古'));
    if (footVal) {
      footVal.brandKey = 'niplux_leg_relax_air_ems_boots';
      footVal.displayBrand = 'エアーレッグマッサージャー ふくらはぎ 足裏 温熱ヒーター 加圧 コードレス 美脚 ブーツ型マッサージ機';
      current.theme3_foot_massage_warm_care[nipluxIdx] = footVal;
      console.log(`✅ レッグマッサージャー修正完了: ${footVal.itemName.slice(0, 35)} (${footVal.priceFormatted})`);
    }
    await sleep(1300);
  }

  // もし10件に満たない場合、人気の冬用フットケア・温熱レッグウォーマー/マッサージャーで補完
  while (current.theme3_foot_massage_warm_care.length < 10) {
    console.log(`補完アイテム取得中... (現在${current.theme3_foot_massage_warm_care.length}件)`);
    const fillerRes = await searchRakutenDirect('フットマッサージャー 足裏 温熱', 10, '-reviewCount');
    const existingCodes = new Set(current.theme3_foot_massage_warm_care.map(it => it.itemCode));
    const nextItem = fillerRes.find(it => !existingCodes.has(it.itemCode) && it.imageUrl && it.itemPrice > 3000);
    if (nextItem) {
      nextItem.brandKey = `winter_foot_heater_device_${current.theme3_foot_massage_warm_care.length + 1}`;
      nextItem.displayBrand = `高機能 温熱フットマッサージャー 足裏・ふくらはぎ集中ケア機 (${nextItem.shopName})`;
      current.theme3_foot_massage_warm_care.push(nextItem);
      console.log(`✅ 補完取得: ${nextItem.itemName.slice(0, 35)} (${nextItem.priceFormatted})`);
    } else {
      break;
    }
    await sleep(1300);
  }

  console.log(`\n最終集計:`);
  console.log(`- テーマ1: ${current.theme1_whitening_oral_care.length} 件`);
  console.log(`- テーマ2: ${current.theme2_gel_nail_kit.length} 件`);
  console.log(`- テーマ3: ${current.theme3_foot_massage_warm_care.length} 件`);

  fs.writeFileSync('scratch/rakuten_winter_batch57_items.json', JSON.stringify(current, null, 2), 'utf8');
}

refineBatch57().catch(console.error);
