import fs from 'fs';
import path from 'path';

// 楽天API設定
const RAKUTEN_APP_ID = process.env.RAKUTEN_APP_ID || '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = process.env.RAKUTEN_ACCESS_KEY || 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '54d2a438.4bc4abc2.54d2a439.aa1be583';

console.log('楽天API直接取得エンジン起動');

// 楽天API直接呼び出し
async function fetchRakutenItems(keyword, hits = 10) {
  const encodedKw = encodeURIComponent(keyword);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodedKw}&hits=${hits}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`❌ APIエラー (${keyword}): ${res.status}`);
      return [];
    }
    const data = await res.json();
    if (!data.Items || data.Items.length === 0) return [];
    
    return data.Items.map(it => {
      const item = it.Item;
      let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
      if (img.includes('?_ex=')) {
        img = img.split('?_ex=')[0] + '?_ex=600x600';
      }
      return {
        itemName: item.itemName,
        itemPrice: item.itemPrice ? `¥${item.itemPrice.toLocaleString()}` : '¥2,500',
        shopName: item.shopName || '楽天市場正規取扱店',
        affiliateUrl: item.affiliateUrl || item.itemUrl,
        imageUrl: img
      };
    });
  } catch (err) {
    console.error(`❌ 通信エラー (${keyword}):`, err.message);
    return [];
  }
}

// 修正対象記事と、重複を解消するための個別キーワード定義
const REPAIR_CONFIGS = [
  {
    file: 'art-autumn-warm-wave-maple-cinnamon-makeup-10sen-2026.html',
    // B IDOL むっちリップが2回重複。9位を別色または別テラコッタリップに差し替え
    replacements: [
      {
        dupePattern: '選択【2023リニューアル】B IDOL(ビーアイドル) むっちリップ 『04 ほろよいピンク / 05 きづいてテラコッタ』',
        searchKeyword: 'ロムアンド ジューシーラスティングティント イートドトリ'
      }
    ]
  },
  {
    file: 'art-back-acne-body-mist-salicylic-acid-cica-10sen-2026.html',
    // otb0f56384cb.jpg が3回重複
    replacements: [
      {
        targetH3Substr: '薬用 アクネ ホワイトニング',
        searchKeyword: 'オルビス クリアボディ スムースローション'
      },
      {
        targetH3Substr: 'CICA ボディスクラブ',
        searchKeyword: 'ネイチャーリパブリック CICA ボディミスト'
      }
    ]
  },
  {
    file: 'art-charcoal-clay-deep-scalp-shampoo-10sen-2026.html',
    // 4964653100585_1.jpg が複数重複
    replacements: [
      {
        targetH3Substr: 'ジュン・コスメティック 炭シャンプー 600ml 詰替',
        searchKeyword: 'クレイエステ シャンプー クレイ スカルプ'
      },
      {
        targetH3Substr: 'ジュン・コスメティック 炭シャンプー 600ml 2本',
        searchKeyword: 'DROAS ドロアス クレイクレンジング スカルプ シャンプー'
      },
      {
        targetH3Substr: 'ジュン・コスメティック 炭シャンプー 詰替用 1000ml',
        searchKeyword: 'プレミアムブラックシャンプー 炭 スカルプ'
      }
    ]
  },
  {
    file: 'art-electric-scalp-face-ems-brush-device-10sen-2026.html',
    replacements: [
      {
        targetH3Substr: 'elb_250418_2',
        searchKeyword: 'サロニア EMS リフトブラシ'
      }
    ]
  },
  {
    file: 'art-electroporation-ion-facial-device-10sen-2026.html',
    replacements: [
      {
        targetH3Substr: 'hera_03',
        searchKeyword: 'メディキューブ AGE-R ブースタープロ'
      }
    ]
  },
  {
    file: 'art-feliamo-shiraishi-mai-colorcon-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/lilyanna/cabinet/brand/fam2/imgrc0115874765.jpg',
        searchKeyword: 'フェリアモ シアーブラウン 白石麻衣 カラコン'
      },
      {
        dupeUrl: 'https://shop.r10s.jp/colorcolle/cabinet/feli1d2605_01.jpg',
        searchKeyword: 'フェリアモ アフォガード カラコン ワンデー'
      }
    ]
  },
  {
    file: 'art-hematin-elcalactone-damage-repair-hair-mask-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/re-ine/cabinet/08373465/2405_renewal/drhsptrhmset.jpg',
        searchKeyword: 'ヘマチン トリートメント原液 エポプレミアムヘマチン'
      },
      {
        dupeUrl: 'https://shop.r10s.jp/re-ine/cabinet/08373465/2405_renewal/drh-sttuboh-7set.jpg',
        searchKeyword: 'エルカラクトン ヘアマスク ナプラ インプライム リペアメソッド'
      }
    ]
  },
  {
    file: 'art-nano-bubble-facial-steamer-device-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/beautypark2017/cabinet/kaden/festino/steamer_cl/nano_oil30.jpg?_ex=128x128',
        searchKeyword: 'パナソニック スチーマー ナノケア EH-SA3C'
      }
    ]
  },
  {
    file: 'art-pellicer-hydrolyzed-silk-hair-milk-10sen-2026.html',
    // 椿油ミルクが複数セットで重複。ペリセア・シルク配合の独立したヘアミルク10選へ完全再取得
    fullRebuildKeywords: [
      '椿油 補修ヘアミルク 柳屋',
      'オルビス エッセンスインヘアミルク',
      'ミルボン エルジューダ エマルジョン プラス',
      'ナプラ エヌドット シアミルク',
      'LUTY ルーティー ヘアミルク モイスト',
      'ラサーナ 海藻ヘアミルク',
      'ボタニスト ボタニカルヘアミルク モイスト',
      'ダイアン パーフェクトビューティー ヘアミルク',
      'スティーブンノル モイスチュアソフニング エマルジョン',
      'フィーノ プレミアムタッチ ヘアミルク'
    ]
  },
  {
    file: 'art-sachiko-milbon-pointcare-stick-review.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/nacre-beaute/cabinet/12679755/12679758/imgrc0111182918.jpg',
        searchKeywords: [
          'ミルボン エルジューダ ポイントケアスティック 15ml',
          'plus eau プリュスオー ポイントリペア',
          'セザンヌ ヘアケアマスカラ あほ毛直し',
          'フジコ あほ毛レスキュー ポイントマスカラ'
        ]
      }
    ]
  },
  {
    file: 'art-sachiko-paddle-brush-effects-guide.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/dorothy-world/cabinet/08162047/a1.jpg',
        searchKeyword: 'アヴェダ パドルブラシ AVEDA レギュラー'
      }
    ]
  },
  {
    file: 'art-sachiko-saborino-morning-mask-skin-trouble-truth.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/base544/cabinet/10452453/set01.jpg',
        searchKeyword: 'サボリーノ 目ざまシート 朝用 ボタニカル'
      }
    ]
  },
  {
    file: 'art-scalp-ems-red-led-electric-brush-lift-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/ya-man/cabinet/square500/myse/r2010l/r2010l-main.jpg',
        searchKeywords: [
          'ヤーマン ミーゼ スカルプリフト アクティブ プラス MS-82G',
          'アデランス スマスビート 電気ブラシ EMS LED',
          'デンキバリブラシ エレクトロン 電気バリブラシ 2.0'
        ]
      },
      {
        dupeUrl: 'https://shop.r10s.jp/nissoplus/cabinet/item/13218579/13218606/ehspre_03_260415.jpg',
        searchKeyword: 'MYTREX PROVE マイトレックス プルーヴ EMS 美顔器'
      }
    ]
  },
  {
    file: 'art-silk-keratin-acid-heat-hair-oil-10sen-2026.html',
    // トゥルーストのセットが複数重複。独立した酸熱ヘアオイル10選に再取得
    fullRebuildKeywords: [
      'トゥルースト 酸熱トリートメント ヘアオイル',
      'イオニート エッセンスV 酸熱 ヘアオイル',
      'アンレーベル ラボ V リペア ヘアオイル',
      'エイトザタラソ 酸熱 ヘアオイル スリーク',
      'ハニーク ナイトリペア 酸熱 ヘアオイル',
      'ウルリス 酸熱 ウォーターコンク リペア ヘアオイル',
      'セラティス ナイトリペア ヘアオイル',
      'アンドハニー ディープモイスト ヘアオイル',
      'クンダル ウルトラセラム ヘアオイル',
      'モロッカンオイル トリートメント 100ml'
    ]
  },
  {
    file: 'art-solid-perfume-stick-and-sashihara-romand-guide.html',
    replacements: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/yoikenkou/cabinet/2024v/4901070910342.jpg?_ex=500x500',
        searchKeyword: 'シロ shiro サボン 練り香水 ソリッドパフューム'
      }
    ]
  },
  {
    file: 'art-spring-warm-wave-peach-coral-makeup-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/tomimori2/cabinet/itemimg2026/imgrc0149708124.jpg?_ex=128x128',
        searchKeyword: 'デイジーク アイシャドウパレット 03 ヌードポーション コーラル'
      }
    ]
  },
  {
    file: 'art-topards-sashihara-rino-colorcon-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/lilyanna/cabinet/brand/tp110/tp110-2511-thum01.jpg',
        searchKeyword: 'トパーズ デートトパーズ 指原莉乃 カラコン'
      }
    ]
  },
  {
    file: 'art-warm-autumn-wave-skeleton-soft-terracotta-makeup-10sen-2026.html',
    // SUQQU 001 が4回重複。それぞれ別の名作テラコッタコスメに差し替え
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/arianakosume/cabinet/marason-6/suqqu-001-rk.jpg',
        searchKeywords: [
          'SUQQU シグニチャー カラー アイズ 02 陽香色',
          'エクセル スキニーリッチシャドウ SR11 ブリックブラウン',
          'アディクション ザ アイシャドウ 004SP マリアージュ テラコッタ',
          'ルナソル アイカラーレーション 19 マホガニー'
        ]
      }
    ]
  },
  {
    file: 'art-warm-spring-active-cute-poppy-orange-makeup-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/soukaikenbi/cabinet/074/4901008314143.jpg',
        searchKeyword: 'セザンヌ ビタートーンアイシャドウ 01 オレンジガナッシュ'
      }
    ]
  },
  {
    file: 'art-water-peeling-pore-vacuum-cleaner-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/areti/cabinet/b2007wh/b2007wh_main_220309.jpg',
        searchKeyword: 'ANLAN ウォーターピーリング 超音波美顔器 毛穴吸引'
      }
    ]
  },
  {
    file: 'art-whitening-wrinkle-eye-cream-dark-circles-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://shop.r10s.jp/rakuten24/cabinet/685/4909978214685.jpg',
        searchKeywords: [
          'エリクシール レチノパワー リンクルクリーム S 15g',
          'なめらか本舗 リンクルアイクリーム N 豆乳イソフラボン',
          '肌美精 ONE リンクルケア 密着濃密 アイクリーム'
        ]
      },
      {
        dupeUrl: 'https://shop.r10s.jp/attenir/cabinet/thum/thum/161604_voce_2512.jpg',
        searchKeywords: [
          'アテニア アイ リンクルセラム 目元美容液 15g',
          'クラエビータ リンクル リペア アイクリーム',
          'セザンヌ リンクルホワイトアイクリーム ナイアシンアミド'
        ]
      }
    ]
  },
  {
    file: 'art-winter-cool-straight-royal-bordeaux-makeup-10sen-2026.html',
    replacements: [
      {
        dupeUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/cochume1234/cabinet/11501418/imgrc0117139625.jpg?_ex=128x128',
        searchKeyword: 'オペラ シアーマットリップスティック 05 フィグ ボルドー'
      }
    ]
  },
  {
    file: 'feature-chanmina-gal-never-die-colorcon-complete.html',
    // ギャルネバーダイの各色を個別取得
    fullRebuildKeywords: [
      'ギャルネバーダイ ネバーダイ カラコン ワンデー ちゃんみな',
      'ギャルネバーダイ ホットティー カラコン ワンデー ちゃんみな',
      'ギャルネバーダイ レイニーベイビー カラコン ワンデー ちゃんみな',
      'ギャルネバーダイ チョコレート カラコン ワンデー ちゃんみな'
    ]
  },
  {
    file: 'feature-niziu-tieup-cosmetics-guide.html',
    // NiziUコスメの重複を各メンバータイアップ商品に直接楽天APIから取得
    fullRebuildKeywords: [
      'tilnus サンリットパール ティント NiziU',
      'ヴィセ ネンマクフェイク ルージュ NiziU',
      'ヴィセ パノラマデザイン アイパレット NiziU',
      'コーセー メイクキープミスト EX NiziU',
      'コーセー メイクキープパウダー NiziU'
    ]
  }
];

export { fetchRakutenItems, REPAIR_CONFIGS };
