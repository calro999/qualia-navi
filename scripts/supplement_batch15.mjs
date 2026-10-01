import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch15() {
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch15_items.json', 'utf8'));

  // Theme 1: uka を補充
  if (data.theme1_handcream.length < 10) {
    console.log('補充分 Theme 1 (uka) を検索中...');
    const res = await searchRakutenDirect('uka ウカ ネイルオイル 5ml', 5, '-reviewCount');
    const it = res.find(i => i.imageUrl && i.itemPrice > 0 && !i.itemName.includes('中古'));
    if (it) {
      data.theme1_handcream.splice(2, 0, { brandKey: 'uka', ...it });
      console.log('✅ Theme 1: uka を追加しました');
    }
    await sleep(1300);
  }

  // Theme 2: SABON / LUSH / BARAKA を補充して10件に
  if (data.theme2_bathsalt.length < 10) {
    console.log('補充分 Theme 2 (SABON / LUSH) を検索中...');
    const resSabon = await searchRakutenDirect('SABON サボン バスソルト ローズ', 5, '-reviewCount');
    const itSabon = resSabon.find(i => i.imageUrl && i.itemPrice > 0 && !i.itemName.includes('中古'));
    if (itSabon) {
      data.theme2_bathsalt.push({ brandKey: 'SABON', ...itSabon });
      console.log('✅ Theme 2: SABON を追加しました');
    }
    await sleep(1300);

    const resLush = await searchRakutenDirect('BARAKA ジョルダニアン デッドシーソルト 500g', 5, '-reviewCount');
    const itLush = resLush.find(i => i.imageUrl && i.itemPrice > 0 && !i.itemName.includes('中古'));
    if (itLush) {
      data.theme2_bathsalt.push({ brandKey: 'BARAKA', ...itLush });
      console.log('✅ Theme 2: BARAKA を追加しました');
    } else {
      const resMarks = await searchRakutenDirect('マークスアンドウェブ ハーバルバスソルト', 5, '-reviewCount');
      const itMarks = resMarks.find(i => i.imageUrl && i.itemPrice > 0 && !i.itemName.includes('中古'));
      if (itMarks) {
        data.theme2_bathsalt.push({ brandKey: 'MARKS&WEB', ...itMarks });
        console.log('✅ Theme 2: MARKS&WEB を追加しました');
      }
    }
    await sleep(1300);
  }

  // Theme 3: TAKAMI / メンソレータム プレミアム を補充
  if (data.theme3_lipmask.length < 10) {
    console.log('補充分 Theme 3 (TAKAMI / メンソレータム) を検索中...');
    const resTakami = await searchRakutenDirect('タカミリップ 唇用美容液', 5, '-reviewCount');
    const itTakami = resTakami.find(i => i.imageUrl && i.itemPrice > 0 && !i.itemName.includes('中古'));
    if (itTakami) {
      data.theme3_lipmask.splice(1, 0, { brandKey: 'TAKAMI', ...itTakami });
      console.log('✅ Theme 3: TAKAMI を追加しました');
    } else {
      const resMentho = await searchRakutenDirect('メンソレータム プレミアムメルティクリームリップ', 5, '-reviewCount');
      const itMentho = resMentho.find(i => i.imageUrl && i.itemPrice > 0 && !i.itemName.includes('中古'));
      if (itMentho) {
        data.theme3_lipmask.splice(1, 0, { brandKey: 'メンソレータム', ...itMentho });
        console.log('✅ Theme 3: メンソレータム プレミアム を追加しました');
      }
    }
  }

  // 10件にトリム
  data.theme1_handcream = data.theme1_handcream.slice(0, 10);
  data.theme2_bathsalt = data.theme2_bathsalt.slice(0, 10);
  data.theme3_lipmask = data.theme3_lipmask.slice(0, 10);

  fs.writeFileSync('scratch/rakuten_winter_batch15_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 全テーマ10アイテム揃いました！`);
  console.log(`- Theme 1: ${data.theme1_handcream.length} 件`);
  console.log(`- Theme 2: ${data.theme2_bathsalt.length} 件`);
  console.log(`- Theme 3: ${data.theme3_lipmask.length} 件`);
}

supplementBatch15().catch(console.error);
