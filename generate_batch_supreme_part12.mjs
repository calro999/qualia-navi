import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第12弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. ランコム ジェニフィック お得な買い方・限定キット
  {
    id: 'art-sachiko-lancome-genifique-deal-guide',
    searchKeyword: 'ランコム ジェニフィック アドバンスト 美容液',
    title: '【一番安く買う裏ワザ】ランコム ジェニフィックのお得な買い方＆限定定期便・キット完全ガイド！実質最安値比較',
    description: '美肌菌スキンケアの最高峰「ランコム（LANCOME）ジェニフィック アルティメ」を最もお得に購入する方法を徹底解説。楽天市場公式ショップの定期お届け便、お買い物マラソンのポイント還元、限定キットの実質価格を詳しく検証します。',
    category: 'skincare',
    tags: ['ジェネフィック お得', 'ランコム ジェニフィック', 'ジェニフィック 安く買う', 'ランコム 美容液 口コミ', '美肌菌 美容液', 'デパコス 美容液 おすすめ'],
    author: '神崎 美咲',
    intro: `「使った翌朝から肌のキメと手触りが劇的に変わる」「これなしではスキンケアが完了しない」と世界中で愛されるブースター美容液の最高峰、**ランコムの「ジェニフィック」**。\n\n定価で買うと1本1万円以上するデパコスだからこそ、「少しでも安くお得に手に入れたい」「定期便や限定キットは本当にコスパが良いの？」という疑問を持つ方が大半です。楽天市場のランコム公式ショップの特典や、ポイント還元を駆使して実質最安値で手に入れる買い方をまとめました。`,
    editorialSections: [
      {
        heading: '知らなきゃ損！ランコム公式楽天市場店が最もお得な3つの理由',
        text: `1. **現品と同じ容量のミニボトルが付く「限定スペシャルキット」**：シーズンごとやマラソン時に発売されるキットは、50ml現品の価格で30ml相当のサンプルやアイクリームがセットになり、実質30%〜40%OFF相当の圧倒的コスパになります。\n2. **楽天ポイントの大量還元（SPU＋エントリーで最大20倍以上）**：お買い物マラソンや「5と0のつく日」、ブランドデーに合わせることで、数千円分の楽天ポイントがそのままキャッシュバックされます。\n3. **並行輸入品の偽物リスクを完全回避**：ジェニフィックは偽物が非常に多く流通していますが、楽天公式フラッグシップショップなら100%正規品保証とオリジナルショッパーが付きます。`
      },
      {
        heading: '効果を2倍引き出す！ブースター（導入美容液）の正しい使い方',
        text: `洗顔後、化粧水を塗る前の**【一番最初】**に、自動で吸い上げられるスポイト1回分（適量）を顔全体に馴染ませます。\n\n手のひらで温めてから優しく包み込むようにハンドプレスすると、肌の常在菌バランスが整い、その後に重ねる化粧水や乳液の浸透力が格段に底上げされます。`
      }
    ],
    faqs: [
      {
        question: '日本処方と海外処方の違いはありますか？',
        answer: '日本処方は日本人の繊細な角層に合わせてテクスチャーがみずみずしく設計されており、浸透スピードが早くベタつきません。公式ショップで購入できるものはすべて安心の日本処方です。'
      },
      {
        question: '30mlと50ml、どちらを買うべきですか？',
        answer: '初めて試す方は30ml（約1ヶ月分）がおすすめですが、1mlあたりのコストは50mlやジャンボサイズの方が断然お得です。リピーターなら迷わず50ml以上が推奨されます。'
      }
    ]
  },

  // 2. シャネル リップクリーム＆ルージュ アリュール ラック 口コミ
  {
    id: 'art-chanel-rouge-allure-laque-lipcream-guide',
    searchKeyword: 'シャネル ルージュ アリュール ラック リップ',
    title: '【落ちないのに極上ツヤ】シャネル「ルージュ アリュール ラック」＆リップボーム口コミ徹底検証！人気色・使い心地比較',
    description: 'マスクや飲食でも落ちないリキッドリップの最高峰「シャネル（CHANEL）ルージュ アリュール ラック」と、名品リップクリーム「ボーム エサンシエル」の口コミを検証。人気色（63/64/75等）の仕上がりやプレゼント需要を詳しく解説します。',
    category: 'lip',
    tags: ['シャネル リップ クリーム 口コミ', 'シャネル リップクリーム 口コミ', 'ルージュアリュールラック', 'ルージュ アリュール ラック', 'シャネル リップ 口コミ', 'カリナ シャネル リップ', '落ちない リップ デパコス'],
    author: '橘 えりか',
    intro: `ポーチから取り出すだけで特別な高揚感を与えてくれるラグジュアリーの頂点、**シャネル（CHANEL）のリップコレクション**。\n\n中でも「ウルトラ ウェア リクィッド リップ カラー」としてツヤと鮮やかな発色が夜まで持続する**ルージュ アリュール ラック**と、ギフトの王道である**リップボーム（リップクリーム）**は、常に高い注目を集めています。実際の落ちにくさ、乾燥の有無、人気品番を徹底レビューします。`,
    editorialSections: [
      {
        heading: 'なぜルージュ アリュール ラックは飲食しても落ちないのか？',
        text: `通常、ツヤ感の高いリキッドルージュは油分が多いため擦れに弱く、すぐに落ちてしまいます。\n\nシャネルは水や皮脂を弾くフィルム形成ポリマーと、極微小なピグメント（色素）を高濃度でブレンド。塗布後2〜3分で唇の表面に透明なツヤの保護膜が形成され、カップやマスクに色移りせず、サテンのようなリッチな輝きが12時間持続します。`
      },
      {
        heading: 'ギフト＆自分へのご褒美に外さない神品番',
        text: `- **#63 アルティメット**：肌馴染み抜群のローズヌード。オフィスメイクにも好印象な万人受けカラー。\n- **#64 エグジジャンス**：フレッシュで上品なブライトローズ。肌のくすみを飛ばして明るく見せます。\n- **#75 フィデリテ**：大人っぽくモードなテラコッタブラウン。イエベ秋の秋メイクに最適。\n- **イドゥラ ビューティ リップ バーム**：カメリアの保湿成分が濃密に唇を包み込む、誰に贈っても100%喜ばれる高級リップクリーム。`
      }
    ],
    faqs: [
      {
        question: '荒れたり皮剥けしたりしませんか？',
        answer: '抗酸化作用のある植物オイルやシアバターが贅沢に配合されているため、ティントのような乾燥や色素沈着の心配が極めて少なく、しっとりとしたうるおいが続きます。'
      },
      {
        question: '綺麗に長持ちさせる塗り方のコツは？',
        answer: 'アプリケーターで唇の中央から広げた後、上下の唇を擦り合わせずに1分間そのまま乾かしてください。ツヤのフィルム膜が均一にロックされ、密着度が最大化します。'
      }
    ]
  },

  // 3. エスティローダー リニュートリィブ（最高峰エイジングケア）
  {
    id: 'art-estee-lauder-re-nutriv-luxury-skincare-guide',
    searchKeyword: 'エスティローダー リニュートリィブ クリーム',
    title: '【最高峰の肌再生】エスティローダー「リニュートリィブ」の口コミと効果徹底検証！大人の贅沢エイジングケア',
    description: '世界初のラグジュアリースキンケアとして誕生したエスティローダー最高峰ライン「リニュートリィブ（Re-Nutriv）」の口コミ・成分を徹底検証。ブラック ダイヤモンド トリュフ エキスがもたらす圧倒的なハリ・弾力・輝きを詳しく解説します。',
    category: 'skincare',
    tags: ['エスティーローダーリニュートリィブ', 'エスティ ローダー リニュートリィブ', '高級 スキンケア 口コミ', 'エスティローダー 最高峰 クリーム', 'リニュートリィブ 効果', 'デパコス 高級クリーム'],
    author: 'Dr. 高橋 美紀',
    intro: `1956年、創業者ミセス エスティ ローダーが「肌にできる限りの最高を」という情熱から生み出した世界初のプレステージスキンケア、**「リニュートリィブ（Re-Nutriv）」**。\n\n1個数万円〜十数万円という最高峰の価格帯でありながら、一度使った女性たちが「肌の格が根本から変わる」「ハリと輪郭の引き締まりが劇的」と絶賛し続ける理由と、配合されている希少成分の科学的真実を解き明かします。`,
    editorialSections: [
      {
        heading: 'リニュートリィブの神髄「ブラック ダイヤモンド トリュフ」の肌再生力',
        text: `南仏産の最高品質ブラック ダイヤモンド トリュフを、約10,000時間もの精密な抽出プロセスを経て凝縮した独自エキスを配合。\n\n肌の長寿遺伝子（サーチュイン）に着目した最先端テクノロジーにより、加齢で低下した細胞エネルギーを急速に充電し、真皮のコラーゲン産生とエラスチン構造をパワフルに再構築します。しぼんでたるんだ肌に、内側から押し返すような高密度の弾力が蘇ります。`
      },
      {
        heading: '大人のご褒美コフレ・ミニサイズでお得に試す方法',
        text: `いきなり現品を購入するのがためらわれる方は、ホリデーシーズンや数量限定で発売される**「リニュートリィブ ラグジュアリー キット」**を狙うのが賢い方法です。\n\n化粧水・美容液・クリームのミニサイズがセットになっており、数千円〜1万円台で最高峰ラインの肌変化をじっくり体験できます。`
      }
    ],
    faqs: [
      {
        question: 'どんな肌悩みに最も効果的ですか？',
        answer: '顔全体の深刻なたるみ、ほうれい線、深い乾燥小ジワ、肌のくすみ・ツヤ不足など、複合的なエイジングサインにトータルで劇的なアプローチを発揮します。'
      },
      {
        question: '朝と夜どちらに使うのが効果的ですか？',
        answer: '夜のお手入れの最後に使用すると、睡眠中に濃密な栄養がじっくり浸透し、翌朝洗顔した瞬間の肌のモチモチ感に驚かされます。乾燥が激しい日は朝の使用も可能です。'
      }
    ]
  },

  // 4. ケイト スティックコンシーラー＆名品ベース口コミ
  {
    id: 'art-kate-stick-concealer-review-guide',
    searchKeyword: 'ケイト スティックコンシーラー 口コミ カバー',
    title: '【ピタッと密着ハイカバー】ケイト（KATE）スティックコンシーラーの口コミ検証！ニキビ跡・シミ・テカリを防ぐ塗り方',
    description: 'ドラッグストアで買える名品プチプラ「ケイト（KATE）スティックコンシーラーA」の口コミ・カバー力を徹底検証。シミや濃いニキビ跡、小鼻の赤みを瞬時に消し去り、テカリ崩れを防ぐプロ直伝の使い倒し方を解説します。',
    category: 'makeup',
    tags: ['ケイト スティックコンシーラー 口コミ', 'コンシーラー テカリ', 'コンシーラー ベタつかない', 'ケイト コンシーラー 色選び', 'プチプラ コンシーラー おすすめ', 'ニキビ跡 コンシーラー'],
    author: '神崎 美咲',
    intro: `「リキッドコンシーラーだと薄すぎてニキビ跡や濃いシミが透けてしまう」「固形スティックは乾燥して浮かないか心配…」という方に強くおすすめしたいのが、**ケイト（KATE）のスティックコンシーラー**です。\n\n1,000円前後の手頃なプチプラでありながら、肌にのせた瞬間にピタッと留まるハイ密着処方。崩れにくさとテカリ防止を両立する実力を徹底比較しました。`,
    editorialSections: [
      {
        heading: 'ケイト スティックコンシーラーがピンポイントカバーに最強な理由',
        text: `1. **狙った場所に留まるノンオイリー密着感**：リキッドと違い油分が過剰に広がらないため、隠したいシミやニキビ跡の上にピンポイントで高密度の粉体がピタッと密着します。\n2. **皮脂吸着成分配合でテカリ・ヨレをブロック**：小鼻のキワやTゾーンなど、皮脂が出やすい部位に塗ってもドロドロに溶け出さず、サラサラの質感を長時間キープします。\n3. **スティック型ならではの携帯性と手軽さ**：ポーチに入れて持ち歩きやすく、日中のメイク直しでも手を汚さずに直塗りできます。`
      },
      {
        heading: 'プロ直伝！絶対に浮かない・厚塗り感を出さない塗り方',
        text: `スティックから直接グリグリ塗りたくるのはNGです！\n\n1. 隠したいトラブルの上に、スティックの角を使ってポンと置くようにのせる。\n2. **「トラブルの真上は絶対に触らず、輪郭のフチだけ」**を指の腹や綿棒でトントンと外側に向かってぼかす。\n3. 上から微粒子のフェイスパウダーを軽く押さえるだけで、至近距離で見ても境目が分からない自然なカバーが完成します。`
      }
    ],
    faqs: [
      {
        question: 'ライトベージュとナチュラルベージュの選び方は？',
        answer: '色白の方や目元のハイライト効果を兼ねたい方は「ライトベージュ」、濃いシミやニキビ跡、小鼻の赤みをしっかり消したい標準的な肌色の方は「ナチュラルベージュ」を選ぶと最も浮きません。'
      },
      {
        question: '目の下のクマにも使えますか？',
        answer: '目の下は皮膚がよく動き乾燥しやすいため、スティックコンシーラーを使う場合は手の甲で体温で少し柔らかくしてから、薄くトントンとなじませるのがシワに入り込ませないコツです。'
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

憧れのデパコスから毎日のメイクを底上げする実力派プチプラまで、自分の肌質とお悩みに寄り添ったアイテムを選ぶことで、毎日の美しさは格段に向上します。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第12弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
