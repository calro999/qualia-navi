import fs from 'fs';
import path from 'path';

console.log('🚀 [楽天API 直接取得] 超高需要ロングテール5テーマの商品データを取得開始...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

// 楽天OpenAPI から商品データを取得
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
    key: 'ahoge_stick',
    searchKeywords: ['アホ毛 スティック マスカラ', 'ポイントケアスティック まとめ髪', 'プリュスオー ポイントリペア', 'エルジューダ ポイントケアスティック']
  },
  {
    key: 'mayu_tint',
    searchKeywords: ['眉ティント フジコ', '眉毛 ティント 落ちない', 'アイブロウ ティント 眉', '消えない眉 アイブロウ']
  },
  {
    key: 'shiraga_foundation',
    searchKeywords: ['白髪 ファンデーション 生え際', '白髪隠し パウダー ポンポン', 'プリオール ヘア ファンデーション', '頭皮 パウダー 白髪']
  },
  {
    key: 'kubi_potsupotsu',
    searchKeywords: ['首 ポツポツ ハトムギ 杏仁', '角質粒 首 美容液', 'イポロン ぽっつるん ハトムギ', 'アンミオイル 杏仁オイル 首']
  },
  {
    key: 'mens_bb',
    searchKeywords: ['メンズ BBクリーム バレない', 'NULL BBクリーム メンズ', 'UNO フェイスカラークリエイター', 'メンズ ファンデーション テカリ防止']
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

  fs.writeFileSync('scratch_longtail_5_rakuten_items.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('\n🎉 全商品の取得が完了し、scratch_longtail_5_rakuten_items.json に保存しました！');
}

main();
