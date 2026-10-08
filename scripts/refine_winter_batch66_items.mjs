import fs from 'fs';
import path from 'path';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refineBatch66() {
  const jsonPath = path.resolve('scratch/rakuten_winter_batch66_items.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log('テーマ1の不足分（1件）を追加検索...');
  if (data.theme1_holiday_advent_calendar.length < 10) {
    const res1 = await searchRakutenDirect('アドベントカレンダー コフレ 限定', 10, '-reviewCount');
    const existingCodes = new Set(data.theme1_holiday_advent_calendar.map(i => i.itemCode));
    const candidate = res1.find(it => it.imageUrl && it.itemPrice > 3000 && !it.itemName.includes('中古') && !existingCodes.has(it.itemCode));
    if (candidate) {
      candidate.brandKey = 'premium_holiday_beauty_advent_special_box';
      candidate.displayBrand = 'プレミアム ホリデー アドベントカレンダー ビューティー コフレ 豪華コフレ ギフト 2026';
      data.theme1_holiday_advent_calendar.push(candidate);
      console.log(`✅ テーマ1追加: ${candidate.itemName.slice(0, 35)} (${candidate.priceFormatted})`);
    }
  }

  console.log('テーマ3の不足分（2件）を追加検索...');
  while (data.theme3_carbonic_acid_foam_wash.length < 10) {
    await sleep(1300);
    const queries = ['DUO 炭酸 泡洗顔', '炭酸 洗顔 濃密泡 毛穴', '炭酸洗顔フォーム 泡立て不要'];
    const q = queries[data.theme3_carbonic_acid_foam_wash.length % queries.length];
    const res3 = await searchRakutenDirect(q, 10, '-reviewCount');
    const existingCodes3 = new Set(data.theme3_carbonic_acid_foam_wash.map(i => i.itemCode));
    const cand = res3.find(it => it.imageUrl && it.itemPrice > 1200 && !it.itemName.includes('中古') && !existingCodes3.has(it.itemCode));
    if (cand) {
      const idx = data.theme3_carbonic_acid_foam_wash.length + 1;
      cand.brandKey = `carbonic_micro_foam_wash_extra_${idx}`;
      cand.displayBrand = `高濃度 炭酸泡洗顔 マイクロホイップ ウォッシュ 毛穴 くすみ オフ 保湿 ${idx}`;
      data.theme3_carbonic_acid_foam_wash.push(cand);
      console.log(`✅ テーマ3追加 (${idx}/10): ${cand.itemName.slice(0, 35)} (${cand.priceFormatted})`);
    } else {
      break;
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`最終アイテム数:
- テーマ1: ${data.theme1_holiday_advent_calendar.length}件
- テーマ2: ${data.theme2_skincare_holiday_coffret.length}件
- テーマ3: ${data.theme3_carbonic_acid_foam_wash.length}件`);
}

refineBatch66();
