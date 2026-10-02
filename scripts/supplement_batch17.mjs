import fs from 'fs';
import { searchRakutenDirect } from './rakuten_direct_client.mjs';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function supplementBatch17() {
  console.log('🔄 不足アイテムの追加取得を開始します...');
  const data = JSON.parse(fs.readFileSync('scratch/rakuten_winter_batch17_items.json', 'utf8'));

  // テーマ1の補完: excel, ADDICTION, Ducato, COSME DECORTE
  const nailSupp = [
    { brand: 'excel', query: 'エクセル ネイルポリッシュ' },
    { brand: 'ADDICTION', query: 'アディクション ネイルポリッシュ' },
    { brand: 'Ducato', query: 'デュカート ナチュラルネイルカラー' },
    { brand: 'COSME DECORTE', query: 'コスメデコルテ ネイルエナメル' }
  ];

  for (const q of nailSupp) {
    const items = await searchRakutenDirect(q.query, 5, '-reviewCount');
    const valid = items.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
    if (valid) {
      data.theme1_nail.push({ brandKey: q.brand, ...valid });
      console.log(`✅ [テーマ1追加] ${q.brand}: ${valid.itemName.slice(0, 30)}`);
    }
    await sleep(1300);
  }

  // テーマ2の補完: NANOA
  const steamerSupp = [
    { brand: 'NANOA', query: 'NANOA スチーマー 美顔器' }
  ];

  for (const q of steamerSupp) {
    const items = await searchRakutenDirect(q.query, 5, '-reviewCount');
    const valid = items.find(it => it.imageUrl && it.itemPrice > 0 && !it.itemName.includes('中古') && !it.itemName.includes('訳あり'));
    if (valid) {
      data.theme2_steamer.push({ brandKey: q.brand, ...valid });
      console.log(`✅ [テーマ2追加] ${q.brand}: ${valid.itemName.slice(0, 30)}`);
    }
    await sleep(1300);
  }

  // 各10件に調整
  data.theme1_nail = data.theme1_nail.slice(0, 10);
  data.theme2_steamer = data.theme2_steamer.slice(0, 10);
  data.theme3_eyebrow = data.theme3_eyebrow.slice(0, 10);

  fs.writeFileSync('scratch/rakuten_winter_batch17_items.json', JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 全テーマ10商品ずつ（計30商品）の統合が完了しました！`);
  console.log(`- テーマ1 (ネイル): ${data.theme1_nail.length} 件`);
  console.log(`- テーマ2 (スチーマー): ${data.theme2_steamer.length} 件`);
  console.log(`- テーマ3 (アイブロウ): ${data.theme3_eyebrow.length} 件`);
}

supplementBatch17().catch(console.error);
