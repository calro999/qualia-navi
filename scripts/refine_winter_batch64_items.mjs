import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch64() {
  console.log('🔧 [第64弾 アイテム補完] 各テーマ10商品（合計30商品）に揃えるため不足分を追加検索します...');
  
  const rawData = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch64_items.json', 'utf8'));
  const humidifiers = rawData.theme1_desk_humidifier;
  const hotCool = rawData.theme2_hot_and_cool_device;
  const brushes = rawData.theme3_sonic_reset_brush;

  // 1. 加湿器の補完 (現在9件 -> 10件)
  if (humidifiers.length < 10) {
    console.log('補完中: テーマ1 加湿器');
    const extraQueries = ['加湿器 卓上 コードレス 小型 おしゃれ', '卓上加湿器 超音波 静音 大容量'];
    for (const q of extraQueries) {
      if (humidifiers.length >= 10) break;
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古') || it.itemName.includes('フィルターのみ')) return false;
        if (humidifiers.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = `extra_humidifier_${humidifiers.length + 1}`;
        valid.displayBrand = valid.itemName.slice(0, 30);
        humidifiers.push(valid);
        console.log(`✅ [加湿器追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
      await sleep(1300);
    }
  }

  // 2. 温冷美顔器の補完 (現在9件 -> 10件)
  if (hotCool.length < 10) {
    console.log('補完中: テーマ2 温冷美顔器');
    const extraQueries = ['ホット クール 美顔器', '温冷美顔器 毛穴ケア 引き締め'];
    for (const q of extraQueries) {
      if (hotCool.length >= 10) break;
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 2500) return false;
        if (it.itemName.includes('中古')) return false;
        if (hotCool.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = `extra_hot_cool_${hotCool.length + 1}`;
        valid.displayBrand = valid.itemName.slice(0, 30);
        hotCool.push(valid);
        console.log(`✅ [温冷美顔器追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
      await sleep(1300);
    }
  }

  // 3. リセットブラシの補完 (現在8件 -> 10件)
  if (brushes.length < 10) {
    console.log('補完中: テーマ3 音波振動ヘアブラシ');
    const extraQueries = [
      'リセットブラシ コイズミ',
      '電動ヘアブラシ 音波振動 静電気',
      '音波振動 クッションブラシ 磁気',
      '電動ブラシ ヘアケア 頭皮'
    ];
    for (const q of extraQueries) {
      if (brushes.length >= 10) break;
      const res = await searchRakutenDirect(q, 8, '-reviewCount');
      const valid = res.find(it => {
        if (!it.imageUrl || it.itemPrice <= 1500) return false;
        if (it.itemName.includes('中古')) return false;
        if (brushes.some(e => e.itemCode === it.itemCode)) return false;
        return true;
      });
      if (valid) {
        valid.brandKey = `extra_brush_${brushes.length + 1}`;
        valid.displayBrand = valid.itemName.slice(0, 30);
        brushes.push(valid);
        console.log(`✅ [ブラシ追加] ${valid.itemName.slice(0, 35)} (${valid.priceFormatted})`);
      }
      await sleep(1300);
    }
  }

  console.log(`\n🎉 補完完了！ 加湿器: ${humidifiers.length}件, 温冷美顔器: ${hotCool.length}件, リセットブラシ: ${brushes.length}件`);

  const updatedData = {
    theme1_desk_humidifier: humidifiers.slice(0, 10),
    theme2_hot_and_cool_device: hotCool.slice(0, 10),
    theme3_sonic_reset_brush: brushes.slice(0, 10)
  };

  fs.writeFileSync('scratch/rakuten_winter_batch64_items.json', JSON.stringify(updatedData, null, 2), 'utf8');
  console.log('💾 scratch/rakuten_winter_batch64_items.json に10件ずつ計30件保存完了しました！');
}

refineBatch64().catch(console.error);
