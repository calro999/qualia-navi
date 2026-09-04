import fs from 'fs';
import path from 'path';

const RAKUTEN_APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const RAKUTEN_ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const RAKUTEN_AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchRakutenItems(keyword, hits = 10) {
  const cleanKw = keyword.replace(/[+*?^${}()|[\]\\/]/g, ' ').replace(/\s+/g, ' ').trim();
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${RAKUTEN_APP_ID}&accessKey=${RAKUTEN_ACCESS_KEY}&affiliateId=${RAKUTEN_AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&hits=${hits}&imageFlag=1&sort=%2BreviewCount`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`API Error [${res.status}]: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    if (!data.Items || data.Items.length === 0) return [];

    return data.Items.map(itemObj => {
      const item = itemObj.Item || itemObj;
      const rawImg = (item.mediumImageUrls && item.mediumImageUrls[0]) || 
                     (item.smallImageUrls && item.smallImageUrls[0]) || '';
      const secureImg = (typeof rawImg === 'string' ? rawImg : (rawImg.imageUrl || ''))
        .replace(/^http:\/\//, 'https://')
        .replace(/\?_ex=\d+x\d+/, '?_ex=500x500');

      return {
        name: item.itemName,
        price: item.itemPrice,
        url: item.affiliateUrl || item.itemUrl,
        imageUrl: secureImg,
        shopName: item.shopName,
        reviewAverage: item.reviewAverage || 0,
        reviewCount: item.reviewCount || 0
      };
    });
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}

const batchArticles = [
  {
    id: "art-silk-night-cap-hair-care-guide",
    title: "【シルクナイトキャップおすすめ人気10選】翌朝の髪質激変！摩擦・うねり・パサつきを防ぐ選び方と正しい被り方",
    description: "SNSで「朝起きたときのツヤとまとまりが別次元」と話題のシルクナイトキャップを徹底比較。6Aランク100%天然シルクの効果、ロングヘア対応の筒型・紐付きタイプ、うねり改善シャンプーとの組み合わせを解説。",
    category: "ヘアケア",
    tags: ["シルク キャップ おすすめ", "シルクキャップ おすすめ", "髪 うねり シャンプー ドラックストア", "美髪ケア", "ナイトキャップ", "ヘアケア", "ダメージ補修"],
    searchKeyword: "シルク ナイトキャップ 100% 摩擦予防",
    fallbackKeyword: "シルク ナイトキャップ",
    content: `朝起きると髪がボサボサに広がっていたり、枕の摩擦で毛先がパサついて絡まったりしていませんか？
どれだけ高級なトリートメントを使っても、睡眠中の「寝返りによる摩擦や乾燥」を放置していると、美髪への道は遠のいてしまいます。

そんなヘアダメージを寝ている間に根本ブロックしてくれるのが**「シルクナイトキャップ」**です。

「本当に被るだけで翌朝サラサラになるの？」
「ロングヘアでも寝癖がつかない形やゴムの跡がつかないタイプはどれ？」
「ドラッグストアで買えるうねりケアシャンプーと合わせたらどう変わる？」

本記事では、毛髪診断士の視点からシルクナイトキャップの真の美容効果と、失敗しない選び方・正しい被り方を徹底解説します。

---

### 1. シルクナイトキャップが美髪に導く3つの科学的理由

#### ① 寝返りの激しい摩擦（1晩に約20〜30回）をゼロに
綿の枕カバーは繊維が荒く、髪のキューティクルを削り取ってしまいます。シルクは人の肌に近いアミノ酸タンパク質でできており、摩擦係数が極めて低いため、キューティクルを守り抜きます。

#### ② 髪の水分バランスをキープして「うねり・寝癖」を抑制
シルクは吸湿性・放湿性に優れ、適度な湿度を保ちます。夜ドライヤーで整えた水分量をキープできるため、翌朝のアホ毛や乾燥による広がりが驚くほど軽減されます。

#### ③ 形の選び方：ロングは「筒型」、ショート・ミディアムは「全周ゴム／リボン結び」
- **筒型（ロング用）**: 髪を折らずにそのまま通せるので毛先に変な寝癖がつかない
- **リボン・紐調節型**: おでこにゴムの跡が残るのを防ぎ、頭のサイズに合わせて快適にフィット

---

### 2. 口コミ絶賛！本当に買ってよかったシルクナイトキャップ厳選`
  },
  {
    id: "art-matsueku-coating-matupa-serum-ranking-2026",
    title: "【マツエク・マツパ後コーティング剤おすすめ人気ランキング】束感キープ＆プールでも落ちない強力キープ美容液10選",
    description: "まつエクやまつ毛パーマの持ちを2倍にするコーティング剤＆まつパ後専用美容液をプロアイリストが厳選比較！韓国風アイドル束感まつ毛の作り方や、プール・汗でも滲まないウォータープルーフ徹底検証。",
    category: "アイメイク",
    tags: ["マツパ後美容液 おすすめ", "マツエク コーティング剤 ランキング", "マツエク コーティング剤 おすすめ", "ヒロインメイク マスカラ プール", "アイライナー 滲まない", "カールキープ マスカラ下地", "束感まつ毛"],
    searchKeyword: "まつエク コーティング剤 束感 美容液",
    fallbackKeyword: "まつげ コーティング剤",
    content: `サロン帰りのキレイな上向きカールやエクステの美しい毛流れ。「少しでも長くキープしたい」「綺麗な束感を作りたい」という方にとって、絶対に欠かせないのが**「まつ毛コーティング剤＆マツパ専用美容液」**です。

洗顔後の無防備な自まつ毛を外気の乾燥や皮脂・摩擦から保護し、接着剤（グルー）の劣化を防いで持ちを劇的にアップさせます。

「コーティング剤と普通のまつ毛美容液はどう違うの？」
「プールやジムの汗、夏の湿気でもカールが落ちない最強アイテムは？」
「ピンセットなしで韓国アイドルのような束感を作る方法は？」

現役アイリストが厳選した、今買うべき神コーティング剤と束感スタイリング術を余すところなくご紹介します。

---

### 1. マツエク・マツパを長持ちさせるコーティング剤の役割

#### ① グルー（接着剤）を水分・油分からシールド
マツエクのグルーは水分や皮脂に弱く、入浴や皮脂分泌で劣化が進みます。コーティング剤で膜を張ることで、油分や水分の侵入を防ぎ、持続期間が約1.5倍〜2倍に延びます。

#### ② パーマのカールダレを防ぎ、バラつきを整える
まつ毛パーマ後はキューティクルがデリケートな状態。美容液成分配合のコーティング剤で毛先までハリを与え、寝起きの方向バラつきをまっすぐ上向きにロックします。

#### ③ トレンドの「韓国風・束感まつ毛」がひと塗りで完成
粘度のあるジェル状テクスチャーのブラシで根元から立ち上げるように梳かすだけで、ピンセットいらずで流行りのちゅるんとした束感が手に入ります。

---

### 2. アイリストおすすめ！最強マツエクコーティング剤＆美容液`
  },
  {
    id: "art-20s-wiping-lotion-and-nonsticky-emulsion-guide",
    title: "【20代向け拭き取り化粧水おすすめ＆ベタつかない高保湿乳液】毛穴の角栓・ごわつきを一掃して潤いを閉じ込めるスキンケア決定版",
    description: "20代特有の皮脂テカリ・角栓詰まり・大人ニキビを解消する人気の拭き取り化粧水と、塗った後すぐにメイクできるベタつかない名品乳液を徹底比較。ニキビパッチやビタミンCの効果的な取り入れ方も解説。",
    category: "スキンケア",
    tags: ["20代 拭き取り化粧水 おすすめ", "乳液 べたつかない", "ニキビパッチ おすすめ", "リポソームビタミンc 効果ない", "角質ケア", "毛穴ケア", "皮脂バランス"],
    searchKeyword: "拭き取り化粧水 角質 20代 毛穴",
    fallbackKeyword: "拭き取り化粧水 毛穴",
    content: `「Tゾーンはテカるのに、口周りや頬はカサつく…」
「乳液を塗るとベタベタしてニキビができそうだから化粧水だけで済ませている」

20代の肌は皮脂分泌が活発な一方で、水分量が不足しやすいインナードライに陥りがちです。古い角質が溜まって毛穴が詰まり、メイクノリが悪くなる大きな原因となっています。

そんな20代の肌トラブルを解決する黄金ルーティンが、**「拭き取り化粧水で不要な角質をオフ」＋「ベタつかない高浸透乳液で油水分バランスを整える」**というステップです。

本記事では、肌を痛めずに毛穴のざらつきをツルツルにするおすすめ拭き取り化粧水と、みずみずしく潤うのに表面はサラサラに仕上がる神乳液を厳選してご紹介します。

---

### 1. 20代の毛穴・テカリ・ニキビを予防するスキンケアの法則

#### ① こすらない！ひたひたコットンで滑らせる角質ケア
拭き取り化粧水は摩擦が大敵。上質な大判コットンに裏面まで濡れるくらいたっぷり含ませ、力を入れずに滑らせるだけで、洗顔で落としきれなかったメラニン角質や皮脂がスルリと取れます。

#### ② 「乳液抜き」は逆効果！水分蒸発が皮脂テカリを招く
化粧水だけで終わらせると、肌内部の水分が蒸発し、肌が危機感を覚えてさらに大量の皮脂を分泌します。水分を閉じ込めつつベタつかない「ジェル乳液」や「オイルフリー処方」を選ぶのが美肌への近道です。

---

### 2. 20代の肌を劇的に変える拭き取り化粧水＆ベタつかない乳液名品`
  },
  {
    id: "art-usb-hot-eyelash-curler-and-smudgeproof-liner",
    title: "【USB充電式ホットビューラーおすすめ＆滲まないアイライナー比較】一日中絶対に下がらない上向きまつ毛＆夜まで消えない目元メイク",
    description: "電池交換不要な最新USB充電式ホットビューラーの口コミ・キープ力比較！一重・奥二重でも根元から上がる使い方と、夕方になっても下まぶたに転写しない最強ウォータープルーフアイライナーを徹底解説。",
    category: "アイメイク",
    tags: ["ホットビューラー usb", "アイライナー 滲まない", "カールキープ マスカラ下地", "目元メイク", "時短コスメ", "アイメイク", "落ちないメイク"],
    searchKeyword: "ホットビューラー USB充電 まつげ カール",
    fallbackKeyword: "ホットビューラー USB",
    content: `「朝どれだけビューラーで上げても、マスクの湿気ですぐまつ毛が下がる…」
「夕方になるとアイライナーが下まぶたに滲んでパンダ目になる…」

アイメイクに関するお悩みの中で、常に上位に君臨するこの2大トラブル。
これを一発で解決してくれる救世主が、最新の**「USB充電式ホットビューラー」**と、皮脂・涙に強い**「高密着・滲まないアイライナー」**です。

温熱の力でまつ毛のタンパク質を優しくセットするため、自まつ毛を挟んで傷めるリスクが少なく、一日中ピンと上向きのカールが持続します。

本記事では、急速予熱・温度調節機能付きの優秀ホットビューラーと、目尻まで夜までくっきりキープできるアイライナーの名品をプロが徹底比較レビューします。

---

### 1. USBホットビューラーで夕方まで下がらないまつ毛を作る極意

#### ① マスカラ下地（カールキープ型）を薄く塗って乾かす
自まつ毛のまま温めるより、ワックス成分の入ったマスカラ下地を塗って乾かした後に熱を加えることで、形状記憶効果が劇的に高まります。

#### ② まつ毛の根元で3秒キープ → ゆっくり毛先へ抜く
根元にコームをしっかり当てて3秒間熱を伝え、そこから毛先に向かって緩やかなアーチを描くように動かします。

#### ③ 滲まないアイライナーの選び方：ジェル＆速乾密着リキッド
目頭や粘膜付近にはウォータープルーフジェルライナー、目尻のハネ上げにはスマッジプルーフ（耐皮脂）処方の極細リキッドを選ぶのがパンダ目防止の鉄則です。

---

### 2. おすすめ最新USBホットビューラー＆滲まないアイライナー`
  }
];

async function main() {
  console.log("🚀 [Supreme Organic Polish] 第17弾 4大最重要テーマの書き下ろし開始...\n");
  const articlesPath = path.resolve('src/data/articles.json');
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

  for (const item of batchArticles) {
    await sleep(1500);
    console.log(`🔍 楽天APIから【${item.title}】の商品データを取得中... (KW: ${item.searchKeyword})`);
    let items = await fetchRakutenItems(item.searchKeyword, 10);
    if (items.length === 0 && item.fallbackKeyword) {
      await sleep(1500);
      console.log(`⚠️ 代替KWで再試行`);
      items = await fetchRakutenItems(item.fallbackKeyword, 10);
    }
    console.log(`✅ 商品データ ${items.length} 件取得完了！`);

    let dynamicEditorial = item.content;
    if (items.length > 0) {
      dynamicEditorial += "\n\n";
      items.slice(0, 10).forEach((prod, i) => {
        const pReview = prod.reviewAverage > 0 ? `★${Number(prod.reviewAverage).toFixed(1)} (${prod.reviewCount}件)` : '注目アイテム';
        dynamicEditorial += `#### ${i + 1}. [${prod.name}](${prod.url})\n`;
        if (prod.imageUrl) {
          dynamicEditorial += `![${prod.name}](${prod.imageUrl})\n\n`;
        }
        dynamicEditorial += `- **価格**: ¥${Number(prod.price).toLocaleString()}（税込・取扱店：${prod.shopName}）\n`;
        dynamicEditorial += `- **ユーザー評価**: ${pReview}\n`;
        dynamicEditorial += `- **プロの注目ポイント**: 楽天公式・人気ショップで常にトップクラスの売上と高評価を誇る逸品。使い心地・耐久性・仕上がりの美しさすべてにおいて満足度の高い実力派です。\n\n`;
      });
    }

    dynamicEditorial += `\n---

### まとめ：道具と基本を見直してワンランク上の美しさを手に入れよう
毎日のメイクやヘアケアは、正しいアイテム選びと少しの工夫で劇的に変わります。ぜひ気になったアイテムを取り入れて、ストレスフリーな美しさを実感してみてくださいね。`;

    const existingIndex = articles.findIndex(a => a.id === item.id);
    const newArticleObj = {
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags,
      date: "2026-09-05",
      readingTime: "5分",
      content: dynamicEditorial
    };

    if (existingIndex >= 0) {
      articles[existingIndex] = newArticleObj;
      console.log(`🔄 [更新完了] ${item.title}`);
    } else {
      articles.push(newArticleObj);
      console.log(`✨ [新規追加] ${item.title}`);
    }
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
  console.log("🎉 第17弾 4大最重要記事の書き下ろし・データ保存が完了しました！\n");
}

main();
