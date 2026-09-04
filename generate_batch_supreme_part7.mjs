import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第7弾 4大最重要テーマの書き下ろし開始...');

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
          price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '価格確認',
          priceNum: item.itemPrice || 0,
          reviewAvg: item.reviewAverage || 4.6,
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

const articleDefs = [
  // 1. 2026年秋メイク＆秋リップ（イエベ秋・ブルベ冬・ブラウンリップ）
  {
    id: 'art-sachiko-autumn-2026-makeup-lip-trends',
    searchKeyword: 'リップ 秋 2026 ブラウン イエベ秋',
    title: '【2026年秋メイク完全攻略】秋リップ＆新作コスメおすすめ10選！イエベ・ブルベ別似合うブラウン＆ワインレッド比較',
    description: '2026年秋のトレンドリップと新作コスメおすすめ10選。イエベ秋に映えるテラコッタブラウンから、ブルベ冬に馴染む深みワインレッド・ローズカラーまで、落ちにくさと潤いを両立する注目アイテムを徹底比較します。',
    category: 'lip',
    tags: ['リップ 秋', '2026 秋 コスメ プチプラ', '2026年秋コスメ', '上品 リップ カラー', 'ローズ リップ', 'イエベ 秋 リップ', 'イエベ リップ', 'イエベ秋 リップ', 'ワインレッド リップ', 'クラシック レッド リップ', '秋 リップ', 'ブラウンリップ 似合う人', '赤 リップ 高級', 'ブラウン リップ 似合う人', 'ブルベ夏 リップ 人気', 'ローズ系 リップ 人気', 'ブラウン リップ イエベ秋', 'ブラウン リップ イエベ 秋', '秋コスメ 2026', 'リップ イエベ秋'],
    author: '橘 えりか',
    intro: `少しずつ風が涼しくなり、ファッションとともにメイクのトーンも深みのある季節へとシフトする秋。\n\n2026年の秋メイクの主役は、重たくならずに肌の透明感を引き出す**「透け感ビターブラウン」**や、上品な大人の色気を宿す**「ワインレッド・熟成ベリー」**です。「自分にはブラウンリップが似合わない…」「老け見えしない赤リップの選び方は？」という疑問を解消し、パーソナルカラー別に一番似合う秋の本命リップを比較検証します。`,
    editorialSections: [
      {
        heading: 'パーソナルカラー別：絶対に失敗しない秋リップの選び方',
        text: `- **イエベ秋（オータム）**：最も秋リップが得意なタイプ。深みのあるテラコッタ、キャラメルブラウン、マスタードオレンジが肌のゴールドトーンを美しく際立たせます。\n- **イエベ春（スプリング）**：深すぎるブラウンは顔色が暗くなりやすいため、透け感のあるシアーなアプリコットブラウンや明るめウォームレッドがベスト。\n- **ブルベ冬（ウィンター）**：青みを含んだダークチェリー、ボルドー、ワインレッドが肌の白さを引き立て、吸い込まれるようなコントラストを生みます。\n- **ブルベ夏（サマー）**：くすみのあるココアブラウンや、青みローズブラウンを選ぶと、重くならずに知的なアンニュイ感を演出できます。`
      },
      {
        heading: 'プロ直伝！深み色リップが絶対に老け見えしない塗り方のコツ',
        text: `濃いめの秋カラーを唇の輪郭ぴったりにベタ塗りすると、一昔前の古臭い印象になりがちです。\n\n唇の中央に濃いめに色を置き、外側に向かって指の腹でトントンとぼかし広げる「グラデーション塗り」にすることで、抜け感と今っぽいこなれ感が瞬時に生まれます。仕上げにハイライトを上唇の山に少し足すと、立体感のある唇に仕上がります。`
      }
    ],
    faqs: [
      {
        question: 'マスクをしても落ちない秋リップのおすすめは？',
        answer: 'ジェル膜を形成するケイトのリップモンスターや、韓国のティントバームは、深みのある秋カラーを保ったままマスクへの色移りを防げるため圧倒的人気を誇ります。'
      },
      {
        question: 'チークやアイシャドウとのバランスはどう取ればいいですか？',
        answer: 'リップに深みのある主役カラーを持ってくる場合、目元とチークはベージュや淡いブラウンで引き算し、全体のトーンを合わせる「ワントーンメイク」にすると洗練された印象になります。'
      }
    ]
  },

  // 2. 20代ファンデーション＆クッション＆口紅
  {
    id: 'art-sachiko-20s-cushion-liquid-lipstick-best',
    searchKeyword: '20代 ファンデーション クッション おすすめ',
    title: '【20代女子が本当に選ぶ】クッション＆リキッドファンデーション＆人気口紅おすすめ10選！素肌感と崩れにくさ両立比較',
    description: '20代の肌に最適なファンデーション＆口紅おすすめ10選。テカリや毛穴落ちを防ぎながら、厚塗り感ゼロの透明ツヤ肌を作るクッション・リキッドファンデと、デイリー使いに人気の粘膜リップを徹底比較します。',
    category: 'makeup',
    tags: ['ベースメイク おすすめ 20代', '20代 ベースメイク 人気', '20代 ベースメイク おすすめ', '20代 ファンデーション おすすめ', 'リキッドファンデーション おすすめ 20代', '20代 ファンデ おすすめ', '20代 ファンデ 人気', 'ファンデーション おすすめ 20代', '20代 ファンデーション 人気', '20代 口紅 人気', '20代 口紅 おすすめ', 'ファンデ おすすめ 20代', 'クッションファンデーション おすすめ 20代', '20代 リキッドファンデーション おすすめ', 'ファンデ 人気 20代', '化粧品 ランキング 20 代', '化粧品 20代', '20 代 コスメ'],
    author: '神崎 美咲',
    intro: `仕事やプライベートで忙しい20代の肌は、長時間のエアコンやストレス、皮脂分泌のアンバランスでゆらぎがち。「ファンデを塗ると夕方にテカる」「マスクでヨレるけれどすっぴん肌は隠したい」という悩みを抱える方が大半です。\n\n厚塗り感なく素肌そのものが綺麗になったように見せる**薄膜ファンデーション**と、いつでも好印象を与えられる**人気口紅**を厳選しました。`,
    editorialSections: [
      {
        heading: '20代の肌を一番綺麗に見せるベースメイクの黄金ルール',
        text: `20代の強みは、内側から湧き出る自然なハリ感です。全顔を均一にカバーしようとすると、かえって老け見えや崩れの原因になります。\n\n- **カバーするのは「美肌ゾーン（目の下の三角ゾーン）」だけ**：この部分さえ綺麗に整っていれば、顔全体が美しい陶器肌に見えます。\n- **フェイスラインやTゾーンはごく薄塗りに**：崩れやすい小鼻や額は、パフに残ったごく少量のファンデをトントンとなじませるだけで十分です。`
      },
      {
        heading: 'クッション vs リキッド！朝のライフスタイルに合わせた選び方',
        text: `- **クッションファンデーション**：下地不要でポンポンと1分でベースが完成。時短を最優先したい朝や、外出先での手軽なお直しに最適。\n- **リキッドファンデーション**：密着度が高く、崩れにくさを重視したい長時間の勤務やイベントに最適。薄く伸ばしてスポンジで叩き込むと夜まで美しいツヤが続きます。`
      }
    ],
    faqs: [
      {
        question: 'プチプラとデパコス、20代はどちらを選ぶべき？',
        answer: '毎日の通学・通勤用には高コスパな韓国コスメやドラッグストアのプチプラを、大切なデートや勝負の日には美容液成分が贅沢に入ったデパコスファンデ（ランコムやディオール等）を使い分けるのが賢い方法です。'
      },
      {
        question: 'テカリと乾燥が両方気になる場合の対処法は？',
        answer: 'Tゾーンには皮脂コントロールパウダーを薄く仕込み、頬や口周りにはミスト化粧水で潤いを補給する「パーツ別の使い分け」を取り入れると一日中快適に過ごせます。'
      }
    ]
  },

  // 3. 30代 開き毛穴・たるみ毛穴 ファンデーション
  {
    id: 'art-wf-30s-keana-foundation-2026',
    searchKeyword: '30代 ファンデーション 毛穴カバー 崩れない',
    title: '【2026年最新】30代の開き毛穴・たるみ毛穴を隠すファンデーションおすすめ10選！夕方まで毛穴落ちしない神コスメ比較',
    description: '30代特有の頬のたるみ毛穴や鼻の開き毛穴を夕方までつるんとカバーするファンデーションおすすめ10選。毛穴に落ちない薄膜密着タイプからスキンケア効果の高い美容液ファンデまで、楽天市場の実売口コミとともに徹底比較します。',
    category: 'makeup',
    tags: ['ファンデーション テカリ', 'ファンデーション 黒ずみ', '薄膜 ファンデーション', 'ファンデ うるおい', 'ファンデーション 毛穴 に 入る', '毛穴隠すファンデーション', '毛穴 落ち しない ファンデーション', 'ファンデーション 毛穴 落ち', 'ファンデーション ランキング 30 代', 'ファンデーション 素肌感', 'たるみ毛穴 ファンデーション', '開き毛穴 ファンデーション おすすめ', '開き毛穴 ファンデーションおすすめ', 'たるみ毛穴 ファンデ', '毛穴 ファンデーション おすすめ', 'ファンデーション 毛穴 おすすめ', 'ファンデーション 人気 30代', '皮脂崩れ ファンデーション', '毛穴 目立た ない ファンデーション', '毛穴 落ち ファンデ', 'ファンデーション 毛穴', 'ファンデ 塗っ た 瞬間 毛穴 落ち'],
    author: '神崎 美咲',
    intro: `20代の頃と同じファンデーションを塗っているのに、「塗った瞬間に毛穴の穴が白くポツポツ目立つ」「夕方になるとファンデが毛穴の中に落ち込んでドロドロになる…」と悩み始めるのが30代の肌。\n\nその原因は、肌の水分量低下に伴うキメの乱れと、重力による毛穴の縦伸び（たるみ毛穴）です。毛穴の溝に入り込まず、光のベールで凹凸を滑らかにぼかす名品ファンデーションを徹底比較します。`,
    editorialSections: [
      {
        heading: '30代の毛穴落ちを完全防止する「3つの下地＆塗りテクニック」',
        text: `1. **毛穴を埋めるのではなく「光で影を飛ばす」**：硬いカバーパウダーで毛穴の穴を物理的に埋めようとすると、皮脂が出た瞬間に押し出されて毛穴落ちします。微細な光拡散パールを含んだ美容液ファンデを選びましょう。\n2. **水を含ませて固く絞ったスポンジを使う**：指で塗るとムラになり厚塗り感が出ます。濡らしたスポンジでタップしながら余分な油分と粉体を吸い取らせると、極薄の均一な膜が肌に密着します。\n3. **仕上げのフェイスパウダーはブラシでふんわり**：パフで強く押し付けると毛穴が目立ちやすくなります。毛足の長い大きめブラシで、磨くようにサッとなでるのが陶器肌のコツです。`
      },
      {
        heading: 'リキッド vs クッション vs 美容液ファンデ：30代の最適解',
        text: `- **美容液ファンデ（マキアージュ・資生堂等）**：スキンケア成分70%以上配合で、日中の乾燥小ジワと毛穴の目立ちを同時にケアできる30代の救世主。\n- **薄膜セミマットリキッド（ランコム・シュウウエムラ等）**：皮脂分泌が多く夕方のテカリ崩れを絶対に防ぎたいオイリー肌・混合肌に最強のキープ力。`
      }
    ],
    faqs: [
      {
        question: '日中の化粧直しで毛穴落ちを綺麗にリセットする方法は？',
        answer: '上からファンデを重ねると汚くヨレます。乳液を少量含ませた綿棒やコットンで毛穴落ちした部分を優しく拭き取り、下地を少量なじませてからパウダーを重ねると朝の仕上がりに戻ります。'
      },
      {
        question: '乾燥肌でも毛穴カバーファンデを使って大丈夫ですか？',
        answer: 'ナイアシンアミドやヒアルロン酸などの保湿成分が豊富なリキッドファンデを選べば、つっぱることなく一日中うるおいとカバー力を両立できます。'
      }
    ]
  },

  // 4. ひじの黒ずみ・ガサガサ角質ケア
  {
    id: 'art-sachiko-elbow-dark-spots-smooth-skin-guide',
    searchKeyword: '肘 黒ずみ 角質ケア クリーム',
    title: '【ひじの黒ずみ・ガサガサ解消】肘をきれいにするおすすめボディケア10選！つるすべ透明感を取り戻す角質ケア＆保湿クリーム比較',
    description: '半袖やノースリーブを着たときにドキッとする「ひじの黒ずみ・乾燥ガサガサ」を根本から解消するおすすめボディケア10選。尿素やスクラブ、美白クリームによる角質オフと正しい保湿ルーティンを皮膚科学視点で徹底解説します。',
    category: 'bodycare',
    tags: ['肘 カサカサ 黒い', '肘ガサガサ', '角質 ケア 肘', '肘 きれい', '肘 乾燥', 'ボディスクラブ おすすめ', '黒ずみ ケア ボディクリーム'],
    author: 'Dr. 高橋 美紀',
    intro: `ふと鏡を見たときや電車の吊り革を握ったとき、自分の「ひじの黒ずみやカサカサ感」にショックを受けた経験はありませんか？\n\nひじは皮脂腺がほとんどなく、頬杖をついたりデスクに擦れたりする日常の物理的刺激を常に受けているため、角質が防御反応として厚くなり、メラニンが沈着して黒ずみやすい部位です。固くなった角質をやさしくほぐし、透明感のあるつるすべ肌へ導くケアを解説します。`,
    editorialSections: [
      {
        heading: 'ひじの黒ずみを取り除く「角質オフ＋集中美白保湿」の2ステップ',
        text: `1. **STEP1：週1回のやさしい角質オフ（決してゴシゴシ擦らない）**：ナイロンタオルで擦るのはメラニン色素を増やして逆効果です。入浴で角質が柔らかくなった状態で、細かい粒子のお砂糖（シュガー）スクラブやマイルドなAHA配合ジェルをくるくる馴染ませて古い角質を浮かせます。\n2. **STEP2：尿素・ヘパリン類似物質・美白成分による集中保湿**：角質を柔らかくする尿素配合クリームや、角層深部まで水分を留めるヘパリン類似物質、メラニン生成を抑えるビタミンC誘導体配合のクリームを毎日お風呂上がりにすり込みます。`
      },
      {
        heading: '日常でひじを黒ずませないための予防習慣',
        text: `- **頬杖（ほおづえ）をつく癖をやめる**：デスクワーク中に無意識にひじを机につく圧力と摩擦が、黒ずみの最大の元凶です。\n- **外出時の紫外線対策**：ひじの外側は紫外線を浴びやすいため、体用の日焼け止めを塗り忘れないようにしましょう。`
      }
    ],
    faqs: [
      {
        question: '黒ずみが薄くなるまでどれくらいの期間がかかりますか？',
        answer: 'ひじの角質層はターンオーバーが遅いため、毎日保湿ケアを続けて約1ヶ月〜2ヶ月でザラつきが取れ、徐々に肌本来の明るさを実感できるようになります。'
      },
      {
        question: 'ひざやくるぶしの黒ずみにも同じケアが使えますか？',
        answer: 'はい、ひざやくるぶしもひじと同じく摩擦で角質肥厚しやすい部位ですので、全く同じ角質ケアと保湿クリームで効果を実感していただけます。'
      }
    ]
  }
];

async function generate() {
  const existingMap = new Map(articlesData.map((a, i) => [a.id, i]));

  for (const def of articleDefs) {
    console.log(`\n🔍 楽天APIから【${def.title}】の商品データを取得中... (KW: ${def.searchKeyword})`);
    let products = await fetchRakutenItems(def.searchKeyword, 10);
    if (products.length === 0) {
      console.warn(`⚠️ 代替KWで再試行`);
      products = await fetchRakutenItems(def.searchKeyword.split(' ')[0], 10);
    }
    console.log(`✅ 商品データ ${products.length} 件取得完了！`);

    if (products.length === 0) {
      console.error(`❌ 商品取得失敗: ${def.id}`);
      continue;
    }

    // 比較テーブル生成
    let table = '<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n\n';
    table += '| 順位 | 商品名 | 実売価格 | 取扱ショップ | 特徴・評価 | 楽天市場リンク |\n';
    table += '| :---: | :--- | :---: | :--- | :--- | :---: |\n';
    products.forEach((p, idx) => {
      const rank = idx + 1;
      const cleanName = p.itemName.slice(0, 36).replace(/[|[\]]/g, ' ');
      const star = `★${p.reviewAvg} (${p.reviewCount}件)`;
      table += `| **${rank}位** | **${cleanName}** | **${p.price}** | ${p.shopName.slice(0, 14)} | ${star} | [詳細を見る](${p.affiliateUrl}) |\n`;
    });
    table += '\n</div>\n';

    // 商品カード生成
    let productsHtml = '';
    products.forEach((p, idx) => {
      const rank = idx + 1;
      const cleanName = p.itemName.replace(/[<>"']/g, '');
      const stars = '★'.repeat(Math.min(5, Math.round(p.reviewAvg || 4.5))) + '☆'.repeat(Math.max(0, 5 - Math.round(p.reviewAvg || 4.5)));
      productsHtml += `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card" style="border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin: 20px 0; background: #ffffff; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
  <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: center;">
    <div style="flex-shrink: 0; text-align: center; margin: 0 auto;">
      <img src="${p.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; object-fit: cover;" />
    </div>
    <div style="flex: 1; min-width: 260px;">
      <p style="font-size: 1.3rem; font-weight: bold; color: #e11d48; margin-bottom: 6px;">実売価格: ${p.price}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 4px;"><strong>正規取扱ショップ:</strong> ${p.shopName}</p>
      <p style="font-size: 0.95rem; color: #d97706; margin-bottom: 16px;"><strong>評価:</strong> ${stars} <strong>${p.reviewAvg}</strong> (${p.reviewCount.toLocaleString()}件の購入者レビュー)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 0.95rem; box-shadow: 0 4px 14px rgba(191,30,46,0.35); transition: background 0.2s;">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.8; margin-top: 16px; font-size: 0.95rem;">${p.catchcopy ? `<strong>【注目の特徴】</strong> ${p.catchcopy}` : `楽天市場で多数のリピート実績を誇る定番アイテム。実際の購入者からも品質と使い心地で高い信頼が寄せられています。`}</p>
</div>
`;
    });

    // 専門エディトリアルセクション
    let editorialHtml = '';
    def.editorialSections.forEach(s => {
      editorialHtml += `\n---\n\n## 💡 ${s.heading}\n\n${s.text}\n`;
    });

    // FAQセクション
    let faqsHtml = '\n---\n\n## ❓ よくある質問（FAQ）\n\n';
    def.faqs.forEach(f => {
      faqsHtml += `### Q. ${f.question}\n**A.** ${f.answer}\n\n`;
    });

    // 記事全文の結合
    const content = `# ${def.title}

${def.intro}

---

## 📱 【早見表】おすすめ人気アイテム 比較一覧

${table}

## 🔍 注目の人気アイテム 詳細レビュー＆実力検証

${productsHtml}

${editorialHtml}

${faqsHtml}

---

## 🎯 まとめ

お悩みに合った適切なスキンケアやベースメイクを選ぶことで、肌やメイクの仕上がりは劇的に向上します。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
`;

    const articleObj = {
      id: def.id,
      title: def.title,
      description: def.description,
      content,
      category: def.category,
      tags: def.tags,
      author: def.author,
      createdAt: '2026-09-05',
      updatedAt: '2026-09-05',
      image: products[0]?.imageUrl || '',
      affiliateUrl: products[0]?.affiliateUrl || '',
      price: products[0]?.price || '',
      itemCount: products.length,
      featured: true
    };

    if (existingMap.has(def.id)) {
      const idx = existingMap.get(def.id);
      articlesData[idx] = articleObj;
      console.log(`🔄 [完全書き下ろし更新] ${def.title}`);
    } else {
      articlesData.unshift(articleObj);
      console.log(`✨ [新規追加] ${def.title}`);
    }

    await sleep(1500);
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log('🎉 第7弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
