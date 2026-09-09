import fs from 'fs';
import path from 'path';

const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID || '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY || 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '54d2a438.4bc4abc2.54d2a439.aa1be583';

const sleep = ms => new Promise(res => setTimeout(res, ms));

async function fetchDirectRakuten(keyword, excludeImgs = new Set()) {
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(keyword)}&hits=15`;
  
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        console.log(`⏳ 429レート制限検知。${(attempt + 1) * 2}秒待機...`);
        await sleep((attempt + 1) * 2000);
        continue;
      }
      if (!res.ok) {
        console.error(`❌ APIエラー [${keyword}]: ${res.status}`);
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
        if (!excludeImgs.has(img)) {
          return {
            itemName: item.itemName,
            itemPrice: item.itemPrice ? `¥${item.itemPrice.toLocaleString()}` : '¥2,980',
            shopName: item.shopName || '楽天市場正規取扱店',
            affiliateUrl: item.affiliateUrl || item.itemUrl,
            imageUrl: img
          };
        }
      }
      return null;
    } catch (err) {
      console.error(`❌ 例外発生 [${keyword}]:`, err.message);
      await sleep(1500);
    }
  }
  return null;
}

// 残り全重複箇所のマッピング定義
const TARGETS = [
  {
    file: 'art-charcoal-clay-deep-scalp-shampoo-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/at-life/cabinet/pic49x/4964653100585_1.jpg',
        queries: [
          'ドロアス クレイ スカルプ シャンプー',
          'クレイエステ シャンプー ピンククレイ',
          'ルメント 炭酸シャンプー クレイ'
        ]
      }
    ]
  },
  {
    file: 'art-sachiko-milbon-pointcare-stick-review.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/nacre-beaute/cabinet/12679755/12679758/imgrc0111182918.jpg',
        queries: [
          'プリュスオー ポイントリペア アホ毛 スティック',
          'セザンヌ ヘアケアマスカラ まとめ髪 スティック',
          'フジコ あほ毛レスキュー ポイントマスカラ'
        ]
      }
    ]
  },
  {
    file: 'feature-chanmina-gal-never-die-colorcon-complete.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/maeda/cabinet/i005/galnd-01-0-01.jpg?_ex=600x600',
        queries: [
          'ギャルネバーダイ ネバーダイ カラコン',
          'キャンディーマジック キングブラウン カラコン',
          'モテコン アネコン カラコン'
        ]
      }
    ]
  },
  {
    file: 'art-back-acne-body-mist-salicylic-acid-cica-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/otostore/cabinet/onesell033/otb0f56384cb.jpg',
        queries: [
          'オルビス クリアボディ スムースローション 背中',
          'エテュセ 薬用 アクネ ボディミスト'
        ]
      }
    ]
  },
  {
    file: 'art-scalp-ems-red-led-electric-brush-lift-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/ya-man/cabinet/square500/myse/r2010l/r2010l-main.jpg',
        queries: [
          'アデランス スマスビート 電気ブラシ',
          'サロニア EMS リフトブラシ 電気ブラシ'
        ]
      },
      {
        dupeUrl: 'https://shop.r10s.jp/nissoplus/cabinet/item/13218579/13218606/ehspre_03_260415.jpg',
        queries: [
          'マイトレックス プルーヴ 美顔器 EMS'
        ]
      }
    ]
  },
  {
    file: 'art-whitening-wrinkle-eye-cream-dark-circles-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/rakuten24/cabinet/685/4909978214685.jpg',
        queries: [
          'なめらか本舗 リンクルアイクリーム 豆乳イソフラボン',
          '肌美精 リンクルケア 密着 アイクリーム'
        ]
      },
      {
        dupeUrl: 'https://shop.r10s.jp/attenir/cabinet/thum/thum/161604_voce_2512.jpg',
        queries: [
          'セザンヌ リンクルホワイト アイクリーム',
          'クラエビータ リンクル リペア アイクリーム'
        ]
      }
    ]
  },
  {
    file: 'art-electric-scalp-face-ems-brush-device-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/nissoplus/cabinet/item/elb/main/elb_250418_2.jpg?_ex=128x128',
        queries: [
          'サロニア EMS リフトブラシ 美顔器'
        ]
      }
    ]
  },
  {
    file: 'art-electroporation-ion-facial-device-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/megumishop/cabinet/hera/detailver2/hera_03.jpg?_ex=128x128',
        queries: [
          'メディキューブ AGE-R ブースタープロ 美顔器'
        ]
      }
    ]
  },
  {
    file: 'art-hair-dye-pink-10-ranking-comparison-2026.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/starmall/cabinet/store_notice2.jpg',
        queries: [
          'ソマルカ カラーシャンプー ピンク ホーユー'
        ]
      }
    ]
  },
  {
    file: 'art-hematin-elcalactone-damage-repair-hair-mask-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/re-ine/cabinet/08373465/2405_renewal/drhsptrhmset.jpg',
        queries: [
          'エポプレミアムヘマチン ヘア美容液 110ml'
        ]
      },
      {
        dupeUrl: 'https://shop.r10s.jp/re-ine/cabinet/08373465/2405_renewal/drh-sttuboh-7set.jpg',
        queries: [
          'インプライム プレミアリペア リッチマスク エルカラクトン'
        ]
      }
    ]
  },
  {
    file: 'art-nano-bubble-facial-steamer-device-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/beautypark2017/cabinet/kaden/festino/steamer_cl/nano_oil30.jpg?_ex=128x128',
        queries: [
          'パナソニック ナノケア スチーマー EH-SA3C'
        ]
      }
    ]
  },
  {
    file: 'art-pellicer-hydrolyzed-silk-hair-milk-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/auc-ulmax/cabinet/zg143/4903018205114.jpg?_ex=128x128',
        queries: [
          'オルビス エッセンスイン ヘアミルク'
        ]
      },
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/ulmaxjapan2/cabinet/zg143/4903018205114.jpg?_ex=128x128',
        queries: [
          'ミルボン エルジューダ エマルジョン プラス'
        ]
      }
    ]
  },
  {
    file: 'art-sachiko-paddle-brush-effects-guide.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/dorothy-world/cabinet/08162047/a1.jpg',
        queries: [
          'マークスアンドウェブ ウッド ヘアブラシ パドルブラシ'
        ]
      }
    ]
  },
  {
    file: 'art-sachiko-saborino-morning-mask-skin-trouble-truth.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/base544/cabinet/10452453/set01.jpg',
        queries: [
          'サボリーノ 目ざまシート お疲れさマスク 完熟果実'
        ]
      }
    ]
  },
  {
    file: 'art-silk-keratin-acid-heat-hair-oil-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/auc-ulmax/cabinet/zg073/4936201107698.jpg?_ex=128x128',
        queries: [
          'エイトザタラソ スリーク ヘアオイル 酸熱'
        ]
      },
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/ulmaxjapan2/cabinet/zg073/4936201107698.jpg?_ex=128x128',
        queries: [
          'アンドハニー ディープモイスト ヘアオイル 100ml'
        ]
      }
    ]
  },
  {
    file: 'art-solid-perfume-stick-and-sashihara-romand-guide.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/yoikenkou/cabinet/2024v/4901070910342.jpg?_ex=500x500',
        queries: [
          'shiro サボン 練り香水 12g'
        ]
      }
    ]
  },
  {
    file: 'art-spring-warm-wave-peach-coral-makeup-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/tomimori2/cabinet/itemimg2026/imgrc0149708124.jpg?_ex=128x128',
        queries: [
          'デイジーク アイシャドウパレット 03 コーラル'
        ]
      }
    ]
  },
  {
    file: 'art-warm-autumn-wave-skeleton-soft-terracotta-makeup-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/arianakosume/cabinet/marason-6/suqqu-001-rk.jpg',
        queries: [
          'SUQQU シグニチャー カラー アイズ 02 陽香色'
        ]
      }
    ]
  },
  {
    file: 'art-warm-spring-active-cute-poppy-orange-makeup-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://shop.r10s.jp/soukaikenbi/cabinet/074/4901008314143.jpg',
        queries: [
          'セザンヌ ビタートーンアイシャドウ 01 オレンジガナッシュ'
        ]
      }
    ]
  },
  {
    file: 'art-winter-cool-straight-royal-bordeaux-makeup-10sen-2026.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/cochume1234/cabinet/11501418/imgrc0117139625.jpg?_ex=128x128',
        queries: [
          'オペラ シアーマットリップスティック 05 フィグ ボルドー'
        ]
      }
    ]
  },
  {
    file: 'feature-niziu-tieup-cosmetics-guide.html',
    dupes: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/cosmecomonline/cabinet/item-img228/item_1000214095_1.jpg?_ex=600x600',
        queries: [
          'ヴィセ ネンマクフェイク ルージュ 口紅 NiziU'
        ]
      }
    ]
  }
];

async function run() {
  console.log('🚀 確定置換処理を実行開始...');

  for (const item of TARGETS) {
    const filePath = path.resolve('./dist/articles', item.file);
    if (!fs.existsSync(filePath)) continue;

    console.log(`\n---------------------------------------`);
    console.log(`📄 修正中: ${item.file}`);
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 記事内に既に存在する全画像URLを集約
    const existingImgs = new Set(
      [...content.matchAll(/<img[^>]+src=["\x27](https:\/\/[^"\x27]+)["\x27]/g)].map(m => m[1])
    );

    for (const d of item.dupes) {
      for (const q of d.queries) {
        await sleep(1300); // 1.3秒待機で429完全回避
        console.log(`  🔍 楽天API検索: "${q}"...`);
        const result = await fetchDirectRakuten(q, existingImgs);
        if (result) {
          console.log(`    ✅ 取得: ${result.itemName.substring(0, 30)}... 画像: ${result.imageUrl.substring(0, 50)}...`);
          existingImgs.add(result.imageUrl);
          
          // 2回目以降の出現箇所を置き換える
          const firstPos = content.indexOf(d.dupeUrl);
          if (firstPos !== -1) {
            const secondPos = content.indexOf(d.dupeUrl, firstPos + d.dupeUrl.length);
            if (secondPos !== -1) {
              content = content.substring(0, secondPos) + result.imageUrl + content.substring(secondPos + d.dupeUrl.length);
              modified = true;
              console.log(`    🔁 置換成功 (2回目以降の重複URLを置換)`);
            }
          }
        } else {
          console.warn(`    ⚠️ 取得失敗またはユニーク画像なし: "${q}"`);
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`💾 保存完了: ${item.file}`);
    }
  }

  console.log('\n✨ 全個別置換プロセス完了！');
}

run();
