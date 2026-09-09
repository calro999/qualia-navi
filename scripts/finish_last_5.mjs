import fs from 'fs';
import path from 'path';

const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID || '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY || 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '54d2a438.4bc4abc2.54d2a439.aa1be583';

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function fetchOneRakuten(keyword, existingImgs) {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(keyword)}&hits=30`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await sleep(1500);
      const res = await fetch(url);
      if (res.status === 429) {
        await sleep(3000);
        continue;
      }
      if (!res.ok) return null;
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) return null;

      for (const it of data.Items) {
        const item = it.Item;
        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (!img) continue;
        if (img.includes('?_ex=')) {
          img = img.split('?_ex=')[0] + '?_ex=600x600';
        }
        if (!existingImgs.has(img)) {
          return {
            itemName: item.itemName,
            imageUrl: img,
            affiliateUrl: item.affiliateUrl || item.itemUrl
          };
        }
      }
    } catch (e) {
      await sleep(2000);
    }
  }
  return null;
}

const FIVE_FILES = [
  {
    file: 'art-charcoal-clay-deep-scalp-shampoo-10sen-2026.html',
    dupeUrl: 'https://shop.r10s.jp/at-life/cabinet/pic49x/4964653100585_1.jpg',
    keyword: '炭 シャンプー クレイ'
  },
  {
    file: 'art-hematin-elcalactone-damage-repair-hair-mask-10sen-2026.html',
    dupeUrl: 'https://shop.r10s.jp/re-ine/cabinet/08373465/2405_renewal/drh-sttuboh-7set.jpg',
    keyword: 'ヘマチン トリートメント サロン'
  },
  {
    file: 'art-silk-keratin-acid-heat-hair-oil-10sen-2026.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/auc-ulmax/cabinet/zg073/4936201107698.jpg?_ex=128x128',
    keyword: '酸熱トリートメント ヘアオイル'
  },
  {
    file: 'art-solid-perfume-stick-and-sashihara-romand-guide.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/yoikenkou/cabinet/2024v/4901070910342.jpg?_ex=500x500',
    keyword: '練り香水 スティック'
  },
  {
    file: 'feature-niziu-tieup-cosmetics-guide.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/cosmecomonline/cabinet/item-img228/item_1000214095_1.jpg?_ex=600x600',
    keyword: 'コーセー メイクキープミスト'
  }
];

async function finishAll() {
  for (const item of FIVE_FILES) {
    const filePath = path.resolve('./dist/articles', item.file);
    let content = fs.readFileSync(filePath, 'utf-8');
    const existingImgs = new Set(
      [...content.matchAll(/<img[^>]+src=["\x27](https:\/\/[^"\x27]+)["\x27]/g)].map(m => m[1])
    );

    console.log(`検索中: ${item.file} [${item.keyword}]`);
    const res = await fetchOneRakuten(item.keyword, existingImgs);
    if (res) {
      console.log(`  ✅ 取得成功: ${res.itemName.substring(0, 30)} 画像: ${res.imageUrl.substring(0, 50)}`);
      const firstIdx = content.indexOf(item.dupeUrl);
      if (firstIdx !== -1) {
        const secondIdx = content.indexOf(item.dupeUrl, firstIdx + item.dupeUrl.length);
        if (secondIdx !== -1) {
          content = content.substring(0, secondIdx) + res.imageUrl + content.substring(secondIdx + item.dupeUrl.length);
          fs.writeFileSync(filePath, content, 'utf-8');
          console.log(`  💾 置換完了: ${item.file}`);
        }
      }
    } else {
      console.warn(`  ❌ 取得失敗: ${item.file}`);
    }
  }
  console.log('完了');
}

finishAll();
