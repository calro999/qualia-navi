import fs from 'fs';
import path from 'path';

console.log('🚀 [楽天API 直接取得 Batch9] 超高需要ロングテール5テーマの商品データを取得開始...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

async function fetchRakutenItems(keyword, hits = 12, maxRetries = 3) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  if (cleanKw.length > 40) cleanKw = cleanKw.slice(0, 40);

  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📡 [楽天API 試行${attempt}] クエリ: "${cleanKw}"`);
      const res = await fetch(url);

      if (res.status === 429) {
        console.warn(`⏳ レートリミット検出。2秒待機後に再試行...`);
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }
      if (!res.ok) {
        console.warn(`⚠️ 楽天APIエラー (${res.status})`);
        return [];
      }

      const data = await res.json();
      if (!data.Items || data.Items.length === 0) return [];

      return data.Items.map(entry => {
        const item = entry.Item || entry;
        let rawImg = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (rawImg.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) {
          rawImg = rawImg.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        } else if (rawImg.includes('tshop.r10s.jp/')) {
          rawImg = rawImg.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        }
        return {
          itemCode: item.itemCode || '',
          itemName: item.itemName || '',
          shopName: item.shopName || '',
          affiliateUrl: item.affiliateUrl || item.itemUrl || '',
          imageUrl: rawImg,
          price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '',
          priceNum: item.itemPrice || 0,
          reviewAvg: item.reviewAverage || 4.5,
          reviewCount: item.reviewCount || 0,
          catchcopy: item.catchcopy || ''
        };
      });
    } catch (e) {
      console.error(`❌ エラー (${cleanKw}):`, e.message);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return [];
}

const themes = [
  {
    key: 'top_hairpiece',
    searchKeywords: ['部分ウィッグ 人毛 つむじ', 'ヘアピース 頭頂部 分け目', 'トップピース 白髪隠し ウィッグ', '部分かつら レディース 自然']
  },
  {
    key: 'delicate_whitening',
    searchKeywords: ['デリケートゾーン 美白 クリーム 医薬部外品', 'イビサクリーム 美白', 'VIO 黒ずみ 美白 ジェル', 'ハーバルラビット 美白クリーム']
  },
  {
    key: 'night_crease_tape',
    searchKeywords: ['夜用 アイテープ 二重 クセ付け', 'ナイト アイテープ 寝てる間', 'ふたえテープ 夜用 医療用', '二重 クセ付け テープ 夜']
  },
  {
    key: 'spoolie_with_cap',
    searchKeywords: ['スクリューブラシ キャップ付き', 'マツエク ブラシ 携帯用', 'まつ毛 コーム スクリューブラシ ケース', 'まつげブラシ 蓋付き']
  },
  {
    key: 'clip_in_bangs',
    searchKeywords: ['前髪ウィッグ シースルーバング', '部分前髪 人毛 自然', '前髪 付け毛 サイドあり', 'ワンタッチ 前髪ピース']
  }
];

async function main() {
  const results = {};
  for (const t of themes) {
    console.log(`\n🔍 テーマ「${t.key}」の商品検索中...`);
    let items = [];
    const seenCodes = new Set();
    for (const kw of t.searchKeywords) {
      const fetched = await fetchRakutenItems(kw, 8);
      for (const it of fetched) {
        if (!seenCodes.has(it.itemCode) && it.imageUrl && it.itemName) {
          seenCodes.add(it.itemCode);
          items.push(it);
        }
      }
      await new Promise(r => setTimeout(r, 400));
      if (items.length >= 10) break;
    }
    results[t.key] = items.slice(0, 10);
    console.log(`✅ 「${t.key}」: ${results[t.key].length} 件取得完了`);
  }

  fs.writeFileSync('scratch_longtail_batch9_rakuten_items.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('\n🎉 全商品の取得が完了し、scratch_longtail_batch9_rakuten_items.json に保存しました！');
}

main();
