import fs from 'fs';
import path from 'path';

console.log('🚀 [Sachiko Master Upgrade Part 2] 残り特化クラスター記事生成開始...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchRakutenItems(keyword, hits = 10, maxRetries = 3) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  if (cleanKw.length > 40) cleanKw = cleanKw.slice(0, 40);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 429) { await new Promise(r => setTimeout(r, 2000)); continue; }
      if (!res.ok) return [];
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) return [];
      return data.Items.map(e => {
        const item = e.Item || e;
        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        else if (img.includes('tshop.r10s.jp/')) img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        return {
          itemName: item.itemName || '',
          shopName: item.shopName || '',
          affiliateUrl: item.affiliateUrl || '',
          imageUrl: img,
          price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '',
          priceNum: item.itemPrice || 0,
          reviewAvg: item.reviewAverage || 4.5,
          reviewCount: item.reviewCount || 0,
          catchcopy: item.catchcopy || ''
        };
      }).filter(p => p.affiliateUrl && p.imageUrl);
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return [];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const part2Defs = [
  // 16. まつ毛パーマ セルフ キット ランキング
  {
    id: 'art-sachiko-self-lash-perm-ranking',
    queryTarget: 'まつ毛パーマ セルフ ランキング 初心者',
    searchKeyword: 'セルフ まつげパーマ キット 人気',
    title: '【自宅で簡単】セルフまつ毛パーマキットおすすめ人気10選！失敗しないやり方＆初心者向けランキング',
    description: 'サロンに通わず自宅でくるんと上向きまつ毛を作れるセルフまつ毛パーマキットおすすめ10選。失敗しないロットの選び方、まつ毛を傷めない放置時間と手順を徹底解説します。',
    category: 'makeup',
    tags: ['セルフまつ毛パーマ', 'まつ毛パーマキット', 'セルフまつパ', 'まつパ失敗しない', 'まつ毛くるん', '初心者まつ毛パーマ'],
    author: '松本 結衣',
    featured: true,
    intro: `毎朝のビューラーの手間を省き、すっぴんでもパッチリとした目元を叶える「セルフまつ毛パーマ」。サロン代を節約しながら安全にキレイなカールを作るための人気キットとプロ直伝の巻き方コツをご紹介します。`,
    sections: [
      {
        h: '初心者が失敗しないセルフまつパの3大鉄則',
        body: `1. **まぶたの形に合ったシリコンロットを選ぶ**（一重・奥二重は立ち上げ型、二重は丸みカール型）\n2. **毛先までパーマ液をベタ塗りしない**（毛先のチリつき防止のため中間まで塗布）\n3. **タイマーで正確に放置時間を計る**（規定時間を超えるとダメージの原因に）`
      }
    ],
    faqs: [
      { q: 'どれくらいの期間カールが持続しますか？', a: 'まつ毛の毛周期にもよりますが、通常1ヶ月〜1ヶ月半ほど綺麗な上向きカールがキープできます。' }
    ]
  },

  // 17. カプサイシン・プランパーリップ
  {
    id: 'art-sachiko-capsaicin-plumper-lip-guide',
    queryTarget: 'カプサイシン リップ プランパー',
    searchKeyword: 'リップ プランパー カプサイシン ボリューム',
    title: '【ふっくらボリューム唇】カプサイシン配合リッププランパーおすすめ10選！ピリピリ感と縦ジワ消滅効果比較',
    description: 'カプサイシンやトウガラシ果実エキス配合で、塗るだけでぽってりとした色っぽい唇を作る最強リッププランパー10選。刺激の強さ・ツヤ感・縦ジワ補正力を徹底比較します。',
    category: 'lip',
    tags: ['カプサイシンリップ', 'リッププランパー', '唇ボリュームアップ', '縦ジワ改善', 'ぷるぷるリップ', 'リップ美容液'],
    author: '橘 えりか',
    featured: true,
    intro: `ヒアルロン酸注入級のふっくら感を演出する「プランパーリップ」。カプサイシンや温感成分が唇の血行を促し、瞬時に縦ジワを飛ばして内側から弾むようなボリュームリップへと導く人気アイテムを比較します。`,
    sections: [
      {
        h: 'プランパーリップのピリピリ感と効果の秘密',
        body: `カプサイシンやバニリルブチルなどの温感刺激成分が唇の毛細血管を広げ、自然な血色感とふっくらとしたハリを引き出します。メントール配合で心地よい清涼感が続くタイプも人気です。`
      }
    ],
    faqs: [
      { q: '敏感肌で唇が荒れやすい人でも使えますか？', a: '刺激が強すぎる場合はピリピリ感が穏やかなペプチド系プランパーから試すのがおすすめです。' }
    ]
  },

  // 18. アイブロウコート 20代・30代 消えない眉
  {
    id: 'art-sachiko-eyebrow-coat-20s-30s-guide',
    queryTarget: 'アイブロウコート おすすめ 20代 30代 ブロウラッシュEX',
    searchKeyword: 'アイブロウコート 眉毛 落ちない',
    title: '【眉毛が消えない】アイブロウコートおすすめ10選！汗・皮脂・擦れに強い20代・30代向けキープ力比較',
    description: '夕方になると眉尻が消えてしまう悩みを解決するアイブロウコートおすすめ10選。ブロウラッシュEXをはじめ、テカらず自然な仕上がりで一日中眉メイクをロックする名品を徹底比較します。',
    category: 'makeup',
    tags: ['アイブロウコート', '眉毛消えない', 'ブロウラッシュEX', '眉コート口コミ', 'ウォータープルーフ眉', '20代アイブロウ', '30代メイク'],
    author: '松本 結衣',
    featured: true,
    intro: `前髪の擦れや汗・皮脂でいつの間にか消えてしまいがちな眉尻。アイブロウメイクの仕上げにサッと重ねるだけで、海やプール、猛暑でも描きたての美眉を死守するアイブロウコートを厳選しました。`,
    sections: [
      {
        h: 'テカらず自然に見せるアイブロウコートの塗り方',
        body: `ボトルの口でブラシの液をしっかりしごき、余分な液を落としてから「眉頭から眉尻に向かって毛流れに沿って軽くなでる」のがテカリを防ぐ秘訣です。`
      }
    ],
    faqs: [
      { q: 'パウダー眉の上から塗っても滲みませんか？', a: '速乾性の透明ポリマー処方のため、パウダーの上から優しく重ねれば滲まずピタッとコーティングされます。' }
    ]
  },

  // 19. サンリオ・シナモン コラボコスメ 2026
  {
    id: 'art-sachiko-sanrio-cinnamon-collab-cosme-2026',
    queryTarget: 'サンリオ コラボ コスメ 2026 シナモン ディズニー',
    searchKeyword: 'サンリオ コスメ 2026 シナモロール コラボ',
    title: '【2026年最新】サンリオ＆シナモロール限定コラボコスメおすすめ10選！パケ買い必至のリップ・アイシャドウまとめ',
    description: '2026年最新のサンリオキャラクターズ（シナモロール、クロミ、マイメロディなど）コラボコスメ特集。可愛すぎる限定パッケージと実力派の使い心地を兼ね備えた話題のアイテムを徹底紹介します。',
    category: 'makeup',
    tags: ['サンリオコスメ', 'シナモロールコラボ', 'サンリオコラボ2026', 'パケ買いコスメ', '限定コスメ2026', 'キャラクターコスメ'],
    author: 'トレンド編集部',
    featured: true,
    intro: `持っているだけで気分が上がるサンリオ＆ディズニーの限定コラボコスメ。2026年注目のシナモロールやクロミちゃんの限定パッケージリップやアイシャドウパレット、ハンドクリームを完全まとめしました。`,
    sections: [
      {
        h: '大人女子にも大人気！2026年サンリオコスメの魅力',
        body: `ただ可愛いだけでなく、韓国コスメや日本の実力派ブランドとの本格コラボが続々登場。普段使いしやすい上品なカラーと高いスキンケア効果で大人世代からも熱烈な支持を集めています。`
      }
    ],
    faqs: [
      { q: '売り切れ後の再販はありますか？', a: '限定生産品が多いため、楽天公式ストアや提携ショップでの早期予約・購入がおすすめです。' }
    ]
  },

  // 20. SEVENTEEN・BTS・Snow Man 愛用コスメまとめ
  {
    id: 'art-sachiko-kpop-idol-makeup-ambassador-guide',
    queryTarget: 'セブチ アンバサダー BTS ジン Snow Man 渡辺翔太 メイク',
    searchKeyword: '韓国アイドル 愛用 スキンケア コスメ',
    title: '【推し肌コスメ】SEVENTEEN・BTSジン・Snow Man愛用のスキンケア＆メイクアイテム完全ガイド',
    description: 'SEVENTEEN（セブチ）のアンバサダー就任アイテム、BTSジン愛用のラネージュ、Snow Man渡辺翔太さんの愛用スキンケアなど、美肌アイドルの愛用コスメを徹底調査してまとめました。',
    category: 'k-beauty',
    tags: ['セブチコスメ', 'BTSジンコスメ', 'ラネージュジン', 'SnowManメイク', '渡辺翔太スキンケア', 'アイドル愛用コスメ', '韓国スキンケア'],
    author: 'K-Beauty LABO',
    featured: true,
    intro: `過酷なステージや長時間の撮影でも陶器のような美肌を保ち続けるK-POP＆J-POPのトップアイドルたち。彼らが実際にアンバサダーを務めたりプライベートで愛用する名品コスメを一挙に公開します。`,
    sections: [
      {
        h: 'アイドル級の透明感とツヤ肌を作るスキンケアの共通点',
        body: `徹底した水分補給（インナードライ対策）と肌バリア強化。ラネージュのクリームスキンやシカ成分、ビタミンCによる毛穴引き締めが美肌キープの鍵となっています。`
      }
    ],
    faqs: [
      { q: 'メンズメイク初心者でも使いやすいアイテムは？', a: '自然に血色感をプラスする色付きリップバームや、素肌感を残してテカリを抑えるトーンアップUVが最適です。' }
    ]
  },

  // 21. LE SSERAFIM・ILLIT・aespa 愛用コスメ
  {
    id: 'art-sachiko-lesserafim-illit-aespa-makeup-complete',
    queryTarget: 'LE SSERAFIM チェウォン ウンチェ ILLIT ウォンヒ カリナ ジゼル メイク',
    searchKeyword: 'LE SSERAFIM メイク ILLIT リップ ロムアンド',
    title: '【第5世代ヨジャドル愛用】LE SSERAFIM・ILLIT・aespaのステージメイク＆愛用リップ・コスメまとめ',
    description: 'LE SSERAFIM（チェウォン・ウンチェ）、ILLIT（ウォンヒ）、aespa（カリナ・ジゼル）が使用する話題のリップ、チーク、ベースメイクアイテムを徹底特定。同じメイクができる完全ガイドです。',
    category: 'k-beauty',
    tags: ['ルセラフィムメイク', 'チェウォンリップ', 'ILLITコスメ', 'ウォンヒリップ', 'カリナシャネル', 'ジゼルコスメ', 'ヨジャドルメイク'],
    author: 'K-Beauty LABO',
    featured: true,
    intro: `SNSで大バズり中のK-POPガールズグループの最新メイク。ウォンヒ愛用のロムアンドリップやカリナのシャネルリップ、チェウォンの崩れないベースメイクなど、憧れのアイドルフェイスになれる愛用コスメをご紹介します。`,
    sections: [
      {
        h: '韓国アイドルのぷるぷる「うさぎ舌リップ」の作り方',
        body: `粘膜カラーのティントを唇全体に薄く仕込み、中央にだけ透明感のあるグロスやプランパーを重ねることで、ぷっくり立体感のあるアイドルリップが完成します。`
      }
    ],
    faqs: [
      { q: 'イエベ・ブルベどちらにも似合いますか？', a: 'メンバーごとに愛用カラーが異なるため、パーソナルカラーに合わせた色番選びが可能です。' }
    ]
  },

  // 22. キュレル 皮脂トラブルケア 保湿ジェル 口コミ
  {
    id: 'art-sachiko-curel-sebum-trouble-care-gel-review',
    queryTarget: 'キュレル 皮脂トラブルケア 保湿ジェル 口コミ テカリ 毛穴',
    searchKeyword: 'キュレル 皮脂トラブルケア 保湿ジェル',
    title: '【テカリ・ニキビを防ぐ】キュレル 皮脂トラブルケア 保湿ジェルの本音口コミ！インナードライに効く成分検証',
    description: '過剰な皮脂によるベタつきと乾燥を同時に防ぐ「キュレル 皮脂トラブルケア 保湿ジェル」の口コミ・効果を検証。セラミドケアとノンオイリー処方による毛穴・ニキビ肌への実力を徹底レビューします。',
    category: 'skincare',
    tags: ['キュレル', '皮脂トラブルケア', '保湿ジェル口コミ', 'テカリ防止スキンケア', 'インナードライ', 'ニキビケア', '敏感肌ジェル'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `「Tゾーンはベタつくのに頬はカサつく」「油分が多い乳液を使うとニキビができる」とお悩みのインナードライ肌へ。オイルフリーのようなみずみずしい感触でセラミドを補うキュレルの名品ジェルのリアルな使い心地をレビューします。`,
    sections: [
      {
        h: 'キュレル 皮脂トラブルケアジェルの独自処方',
        body: `皮脂溶解成分配合で過剰な皮脂による肌荒れを防ぎつつ、潤浸保湿セラミド機能成分が角層の奥まで潤いを届けてバリア機能を整えます。`
      }
    ],
    faqs: [
      { q: 'メイク前の朝の保湿に使っても崩れませんか？', a: 'ジェルが肌に素早くなじんで表面がサラッとするため、メイク前のスキンケアに非常に適しています。' }
    ]
  },

  // 23. ロアオイル（LOA THE OIL）口コミ＆ケア
  {
    id: 'art-sachiko-loa-the-oil-hair-body-care-guide',
    queryTarget: 'ロアライフ ロアオイル LOA THE OIL 口コミ 使い方',
    searchKeyword: 'LOA THE OIL ロアオイル ヘアオイル 香水',
    title: '【香水のように香る】LOA THE OIL（ロアオイル）の口コミと人気ランキング！髪・体・ネイルに使える万能オイル比較',
    description: 'サロン専売から話題沸騰のパフュームオイル「LOA THE OIL（ロアオイル）」の口コミ・香りの種類・使い方を徹底解説。マルゴやブランシュなど人気フレグランスの特徴とツヤ髪キープ力を比較します。',
    category: 'haircare',
    tags: ['ロアオイル', 'LOATHEOIL', 'ロアライフ', '香水ヘアオイル', 'パフュームオイル', 'ヘアケアオイル', 'ボディオイル'],
    author: '佐々木 遥',
    featured: true,
    intro: `高級香水のような上質な香りが6時間以上持続する「LOA THE OIL（ロアオイル）」。天然由来オイル配合で髪のウェットな束感作りだけでなく、ボディやネイルの保湿にも使えるプレミアムマルチオイルの魅力を徹底解剖します。`,
    sections: [
      {
        h: '人気の香りランキングと特徴',
        body: `- **Blanche（ブランシュ）**：洗練された清潔感あるホワイトフローラルの香り（万人受けNo.1）\n- **Citrus Vert（シトラスヴェール）**：爽やかな柑橘とウッディが調和したリフレッシュ系\n- **Jasmine Dore（ジャスミンドレ）**：上品で華やかな大人の甘さを演出するジャスミン`
      }
    ],
    faqs: [
      { q: '髪が重くなりすぎてペタッとしませんか？', a: '少量（1〜2滴）を手のひら全体にしっかり伸ばし、内側から毛先になじませることでベタつかず程よい束感に仕上がります。' }
    ]
  },

  // 24. リップピーリング・スクラブ＆リッププライマー
  {
    id: 'art-sachiko-lip-peeling-scrub-primer-guide',
    queryTarget: 'リップピーリング 唇 スクラブ LUSH ドラッグストア リッププライマー',
    searchKeyword: 'リップスクラブ リップピーリング リッププライマー',
    title: '【ぷるぷる唇復活】リップスクラブ＆リッププライマーおすすめ10選！唇の皮剥け・縦ジワを消す角質ケア比較',
    description: 'ガサガサの皮剥けやくすみをリセットするリップスクラブ（LUSH・ドラッグストア人気品）と、口紅の色持ちを高めるリッププライマーおすすめ10選。ぷるんとした赤ちゃん唇をつくるスペシャルケアを解説します。',
    category: 'lip',
    tags: ['リップスクラブ', 'リップピーリング', 'LUSHリップスクラブ', 'リッププライマー', '唇の皮剥け', '唇角質ケア', 'リップベース'],
    author: '橘 えりか',
    featured: true,
    intro: `どんなに良い口紅を塗っても唇の皮が剥けていたり縦ジワがあるとキレイに乗りません。古い角質を優しくオフするシュガースクラブと、リップの発色・色持ちを格上げする専用下地を組み合わせた美唇メソッドをご紹介します。`,
    sections: [
      {
        h: 'リップスクラブの正しい使用頻度とケア手順',
        body: `週に1〜2回、お風呂上がりなどの唇が柔らかい状態で優しくクルクルとなじませます。洗い流した後はすぐに高保湿リップバームで油分を補給するのがツヤ唇の鉄則です。`
      }
    ],
    faqs: [
      { q: '毎日スクラブしてもいいですか？', a: '唇の角質層は非常に薄いため、毎日の使用は避け週1〜2回のスペシャルケアとしてご使用ください。' }
    ]
  },

  // 25. ドライシャンプー 口コミ・人気おすすめ（ダイアン等）
  {
    id: 'art-sachiko-dry-shampoo-diane-ranking-guide',
    queryTarget: 'ドライシャンプー 口コミ ダイアン サラサラ 汗 防災',
    searchKeyword: 'ドライシャンプー ダイアン スプレー 人気',
    title: '【瞬時にサラサラ髪】ドライシャンプーおすすめ人気10選！ダイアン等の口コミ・汗のベタつき＆頭皮ニオイ撃退比較',
    description: '夏の汗によるペタペタ前髪や頭皮のニオイをシュッとひと吹きで瞬間リセットするドライシャンプーおすすめ10選。ダイアンをはじめとするスプレー・シート・パウダータイプの実力を徹底比較します。',
    category: 'haircare',
    tags: ['ドライシャンプー', 'ダイアンドライシャンプー', 'ドライシャンプー口コミ', '前髪リセット', '頭皮のニオイケア', '汗ベタつき解消', '防災コスメ'],
    author: '佐々木 遥',
    featured: true,
    intro: `猛暑の通勤・通学後のペタッとした前髪や、スポーツ後の頭皮のムレ。水を使わずに頭皮と髪をシャンプーしたてのような爽快感とサラサラ感へと戻す「ドライシャンプー」の選び方を解説します。`,
    sections: [
      {
        h: 'ドライシャンプーのタイプ別特徴と選び方',
        body: `- **スプレータイプ**：最も爽快感が高く、頭皮全体に均一に微粒子パウダーを行き渡らせる\n- **パウダータイプ**：ピンポイントで前髪の割れやテカリを直すのに最適\n- **シートタイプ**：頭皮の汗や汚れを直接拭き取れて持ち運びに便利`
      }
    ],
    faqs: [
      { q: '白残りしない使い方は？', a: '頭皮から20cmほど離してスプレーし、指の腹で揉み込むように全体になじませることで白残りを完全に防げます。' }
    ]
  }
];

async function buildContent(def, products) {
  const top10 = products.slice(0, 10);
  const today = '2026-08-31';

  let table = `| 順位 | 商品名 | 価格帯 | 特徴・おすすめポイント | リンク |\n|:---:|:---|:---:|:---|:---:|\n`;
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const shortName = p.itemName.slice(0, 32).replace(/[|\[\]]/g, ' ');
    table += `| **${rank}位** | **${shortName}** | ${p.price || '価格確認'} | ${p.catchcopy ? p.catchcopy.slice(0, 26) : '高評価・リピート多数'} | [楽天市場で見る](${p.affiliateUrl}) |\n`;
  });

  let productsHtml = '';
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const cleanName = p.itemName.replace(/[<>"']/g, '');
    productsHtml += `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card">
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 16px 0;">
    <img src="${p.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
    <div style="flex: 1; min-width: 240px;">
      <p style="font-size: 1.25rem; font-weight: bold; color: #e11d48; margin-bottom: 8px;">実売価格: ${p.price || 'ショップ価格を参照'}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px;"><strong>取扱ショップ:</strong> ${p.shopName} (★${p.reviewAvg} / レビュー${p.reviewCount}件)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 14px rgba(191,30,46,0.35);">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${p.catchcopy ? `<strong>【特徴】</strong> ${p.catchcopy}` : `楽天市場で高い支持を集める人気定番アイテム。実力派の使い心地と高評価レビューが証明する確かなクオリティです。`}</p>
</div>
`;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": def.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": def.title,
    "description": def.description,
    "numberOfItems": top10.length,
    "itemListElement": top10.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.itemName.slice(0, 80),
      "url": p.affiliateUrl
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": def.title,
    "description": def.description,
    "author": { "@type": "Person", "name": def.author },
    "datePublished": today,
    "dateModified": today,
    "publisher": { "@type": "Organization", "name": "Qualia Navi" }
  };

  let sectionsHtml = '';
  def.sections.forEach(s => {
    sectionsHtml += `\n---\n\n## 📌 ${s.h}\n\n${s.body}\n`;
  });

  let faqHtml = `\n---\n\n## ❓ よくある質問（FAQ）\n\n`;
  def.faqs.forEach(f => {
    faqHtml += `### Q. ${f.q}\n**A.** ${f.a}\n\n`;
  });

  return `# ${def.title}

${def.intro}

---

## 📱 【比較表】${def.queryTarget} おすすめ人気10選 一覧

${table}

${productsHtml}

${sectionsHtml}

${faqHtml}

---

## 🎯 まとめ

本記事では「${def.queryTarget}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる10選**をご紹介しました。

ご自身の肌質やお悩みに合わせた最適なアイテムを選ぶことで、毎日のメイクやスキンケアの満足度は劇的に向上します。ぜひ気になったアイテムから試してみてください。

---

<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(listSchema, null, 2)}
</script>

<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>
`;
}

async function main() {
  const existingMap = new Map(articlesData.map((a, i) => [a.id, i]));
  let updatedCount = 0;
  let createdCount = 0;

  for (const def of part2Defs) {
    console.log(`\n🔍 [処理中] ${def.id}`);
    console.log(`   クエリ: ${def.queryTarget} | KW: ${def.searchKeyword}`);

    let products = await fetchRakutenItems(def.searchKeyword, 12);
    if (products.length === 0) {
      console.warn(`⚠️ 商品取得0件のため代替KWで再試行`);
      await sleep(1000);
      products = await fetchRakutenItems(def.queryTarget.split(' ')[0], 12);
    }

    if (products.length === 0) {
      console.error(`❌ 商品取得失敗 スキップ: ${def.id}`);
      continue;
    }

    console.log(`✅ 商品${products.length}件取得完了`);
    const content = await buildContent(def, products);
    const top10 = products.slice(0, 10);

    const articleObj = {
      id: def.id,
      title: def.title,
      description: def.description,
      content,
      category: def.category,
      tags: def.tags,
      author: def.author,
      createdAt: '2026-08-31',
      updatedAt: '2026-08-31',
      image: top10[0]?.imageUrl || '',
      affiliateUrl: top10[0]?.affiliateUrl || '',
      price: top10[0]?.price || '',
      itemCount: top10.length,
      featured: def.featured
    };

    if (existingMap.has(def.id)) {
      const idx = existingMap.get(def.id);
      articlesData[idx] = articleObj;
      console.log(`🔄 [既存記事を徹底更新] ${def.title.slice(0, 40)}...`);
      updatedCount++;
    } else {
      articlesData.unshift(articleObj);
      console.log(`✨ [新規特化記事を追加] ${def.title.slice(0, 40)}...`);
      createdCount++;
    }
    await sleep(1200);
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 [Part 2 完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
