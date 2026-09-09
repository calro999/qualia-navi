import fs from 'fs';
import path from 'path';

const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID || '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY || 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '54d2a438.4bc4abc2.54d2a439.aa1be583';

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function fetchDirect(keyword, existingImgs) {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(keyword)}&hits=20`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await sleep(1500); // 確実なレート回避
      const res = await fetch(url);
      if (res.status === 429) {
        console.log(`⏳ 429待機中 (${keyword})...`);
        await sleep(3000);
        continue;
      }
      if (!res.ok) {
        console.error(`❌ エラー [${keyword}]: ${res.status}`);
        return null;
      }
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
      return null;
    } catch (err) {
      console.error(`例外:`, err.message);
      await sleep(2000);
    }
  }
  return null;
}

// 残り12記事の重複解消用定義
const FINAL_TASKS = [
  {
    file: 'art-back-acne-body-mist-salicylic-acid-cica-10sen-2026.html',
    dupeUrl: 'https://shop.r10s.jp/otostore/cabinet/onesell033/otb0f56384cb.jpg',
    keywords: ['オルビス クリアボディ スムースローション', '薬用 背中ニキビ スプレー']
  },
  {
    file: 'art-charcoal-clay-deep-scalp-shampoo-10sen-2026.html',
    dupeUrl: 'https://shop.r10s.jp/at-life/cabinet/pic49x/4964653100585_1.jpg',
    keywords: ['クレイ シャンプー スカルプケア', '炭酸 クレイ シャンプー']
  },
  {
    file: 'art-hematin-elcalactone-damage-repair-hair-mask-10sen-2026.html',
    dupeUrl: 'https://shop.r10s.jp/re-ine/cabinet/08373465/2405_renewal/drhsptrhmset.jpg',
    keywords: ['ヘマチン ヘアトリートメント 美容液', 'エルカラクトン トリートメント ヘアマスク']
  },
  {
    file: 'art-sachiko-milbon-pointcare-stick-review.html',
    dupeUrl: 'https://shop.r10s.jp/nacre-beaute/cabinet/12679755/12679758/imgrc0111182918.jpg',
    keywords: ['プリュスオー ポイントリペア', 'セザンヌ ヘアケアマスカラ', 'ミルボン エルジューダ ポイントケア']
  },
  {
    file: 'art-sachiko-paddle-brush-effects-guide.html',
    dupeUrl: 'https://shop.r10s.jp/dorothy-world/cabinet/08162047/a1.jpg',
    keywords: ['AVEDA パドルブラシ 正規品', 'ルーヴルドー パドルブラシ']
  },
  {
    file: 'art-sachiko-saborino-morning-mask-skin-trouble-truth.html',
    dupeUrl: 'https://shop.r10s.jp/base544/cabinet/10452453/set01.jpg',
    keywords: ['サボリーノ 目ざまシート ボタニカル']
  },
  {
    file: 'art-silk-keratin-acid-heat-hair-oil-10sen-2026.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/auc-ulmax/cabinet/zg073/4936201107698.jpg?_ex=128x128',
    keywords: ['エイトザタラソ ヘアオイル スリーク']
  },
  {
    file: 'art-solid-perfume-stick-and-sashihara-romand-guide.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/yoikenkou/cabinet/2024v/4901070910342.jpg?_ex=500x500',
    keywords: ['shiro 練り香水 サボン', 'ロクシタン 練り香水 ローズ']
  },
  {
    file: 'art-spring-warm-wave-peach-coral-makeup-10sen-2026.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/tomimori2/cabinet/itemimg2026/imgrc0149708124.jpg?_ex=128x128',
    keywords: ['デイジーク アイシャドウ コーラル', 'キャンメイク アイシャドウ コーラル']
  },
  {
    file: 'art-winter-cool-straight-royal-bordeaux-makeup-10sen-2026.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/cochume1234/cabinet/11501418/imgrc0117139625.jpg?_ex=128x128',
    keywords: ['オペラ リップティント ボルドー', 'ロムアンド ティント ボルドー']
  },
  {
    file: 'feature-chanmina-gal-never-die-colorcon-complete.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/maeda/cabinet/i005/galnd-01-0-01.jpg?_ex=600x600',
    keywords: ['ギャルネバーダイ カラコン ワンデー', 'キャンディーマジック カラコン ワンデー', 'エバーカラーワンデー ルクアージュ']
  },
  {
    file: 'feature-niziu-tieup-cosmetics-guide.html',
    dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/cosmecomonline/cabinet/item-img228/item_1000214095_1.jpg?_ex=600x600',
    keywords: ['ヴィセ リップ ネンマクフェイク']
  }
];

async function main() {
  console.log('⚡️ 最終クリーンアップ開始（残り12記事）...');

  for (const task of FINAL_TASKS) {
    const filePath = path.resolve('./dist/articles', task.file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 現在記事内にある全画像
    const currentImgs = new Set(
      [...content.matchAll(/<img[^>]+src=["\x27](https:\/\/[^"\x27]+)["\x27]/g)].map(m => m[1])
    );

    console.log(`\n============================\n処理中: ${task.file}`);
    for (const kw of task.keywords) {
      // まだ dupeUrl が複数回存在するか確認
      const firstIdx = content.indexOf(task.dupeUrl);
      if (firstIdx === -1) break;
      const secondIdx = content.indexOf(task.dupeUrl, firstIdx + task.dupeUrl.length);
      if (secondIdx === -1) {
        console.log(`  🎉 ${task.file} の重複はすべて解消されました。`);
        break;
      }

      console.log(`  🔍 楽天API直接叩き: "${kw}"...`);
      const res = await fetchDirect(kw, currentImgs);
      if (res) {
        console.log(`    ✅ ヒット: ${res.itemName.substring(0, 30)}... 画像: ${res.imageUrl.substring(0, 45)}...`);
        currentImgs.add(res.imageUrl);

        // 2回目以降の出現箇所を置き換え
        content = content.substring(0, secondIdx) + res.imageUrl + content.substring(secondIdx + task.dupeUrl.length);
        modified = true;
      } else {
        console.log(`    ⚠️ 取得ならず: "${kw}"`);
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`💾 更新完了: ${task.file}`);
    }
  }

  console.log('\n🚀 最終処理完了！');
}

main();
