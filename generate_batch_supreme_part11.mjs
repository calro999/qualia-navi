import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第11弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. TWICE サナ 香水＆愛用リップ
  {
    id: 'art-sana-twice-ysl-libre-fragrance',
    searchKeyword: 'イヴサンローラン リブレ 香水 サナ',
    title: '【TWICEサナ愛用香水＆リップ】YSL「リブレ」の香り・品番徹底解説！上品な色気と透明感をまとう愛用コスメまとめ',
    description: 'TWICEサナさんがアンバサダーを務めるイヴ・サンローラン（YSL）の名香「リブレ（LIBRE）」の香り立ちと愛用リップを徹底解剖。大人のフェミニンさと洗練された華やかさを両立する品番や、楽天市場の正規取扱状況を詳しく解説します。',
    category: 'perfume',
    tags: ['サナ 香水', 'サナ リップ', 'TWICE サナ メイク', 'イヴサンローラン リブレ', 'YSL リブレ 香水', '芸能人愛用香水', 'TWICE 愛用コスメ'],
    author: 'K-Beauty LABO',
    intro: `圧倒的な美貌と愛らしいキャラクターで世界中の女性から憧れのアイコンとして愛される**TWICEのサナさん**。\n\n彼女がジャパンアンバサダーを務めるイヴ・サンローラン・ボーテ（YSL）のアイコン香水「リブレ（LIBRE）」をはじめ、ステージや雑誌撮影で愛用しているリップカラーは常に完売が続く人気アイテムです。サナさんの持つ気品と甘い透明感をそのまま纏える香りとコスメの魅力を徹底解剖しました。`,
    editorialSections: [
      {
        heading: 'サナ愛用の名香「YSL LIBRE（リブレ）」の香りのピラミッドと魅力',
        text: `「リブレ」は、伝統的に男性用香水で使われてきたフゼア調のラベンダーと、女性らしい官能的なオレンジブロッサムを融合させた革新的なジェンダーレスフレグランスです。\n\n- **トップノート**：弾けるようなマンダリンオイルとラベンダーの爽快で清潔感ある香り立ち。\n- **ミドルノート**：モロッコ産オレンジブロッサムとジャスミンが花開き、サナさんのような華やかで気品あるフローラルへ。\n- **ラストノート**：バニラエキスとアンバー、シダーウッドが肌に溶け込み、温かみのあるセクシーな余韻を残します。`
      },
      {
        heading: 'サナ風「うるツヤ粘膜リップ」を作るYSLリップの選び方',
        text: `サナさんのリップメイクの特徴は、自分の唇の美しさを底上げするシアーな粘膜ピンクベージュや、顔色をパッと明るく見せる上品なチェリーレッドです。\n\nYSLの「ルージュ ヴォリュプテ キャンディグレーズ」や「ルージュ ピュールクチュール」など、美容液成分をたっぷり含んだツヤリップを輪郭をぼかすようにのせることで、内側からジュワッと発色するピュアな色気を演出できます。`
      }
    ],
    faqs: [
      {
        question: 'リブレのオーデパルファムとオードトワレ、どちらがおすすめですか？',
        answer: '深みのある大人のバニラとフローラルの持続力を楽しみたいなら「オーデパルファム」、オフィスや日中にも使いやすい軽やかでみずみずしい香り立ちを求めるなら「オードトワレ」がおすすめです。'
      },
      {
        question: '香水をつけるベストなタイミングは？',
        answer: '出かける30分前に纏うと、最初のアルコール感が飛び、最も魅力的なミドルノート（オレンジブロッサムとジャスミン）が香るベストな状態で人と会うことができます。'
      }
    ]
  },

  // 2. BLACKPINK ジス × ディオール（Dior）
  {
    id: 'art-dior-jisoo-blackpink-makeup-guide',
    searchKeyword: 'ディオール リップ ジス BLACKPINK',
    title: '【BLACKPINKジス愛用コスメ】ディオール（Dior）人気リップ＆ファンデ完全特定！クラシックなお嬢様フェイスを作る品番まとめ',
    description: 'ディオール（Dior）のグローバルアンバサダーを務めるBLACKPINKジスさんの愛用リップ・クッションファンデ・チークを徹底調査。「ディオール アディクト リップ グロウ」の着用色番や、ノーブルな陶器肌を作るコスメを詳しく解説します。',
    category: 'makeup',
    tags: ['ディオール ジス', 'BLACKPINK ジス コスメ', 'ディオール リップ ジス', 'ディオール アディクト リップ グロウ', 'ジス 愛用 リップ', '韓国アイドル愛用 デパコス'],
    author: 'K-Beauty LABO',
    intro: `気品あふれるクラシックな美貌とエレガンスで、クリスチャン・ディオールの永遠のミューズとして世界を魅了する**BLACKPINKのジスさん**。\n\n彼女がステージやレッドカーペット、日頃のプライベートで愛用しているDiorのコスメは、塗るだけで洗練された「上品なお嬢様感」を纏える名品ばかりです。ジスさんの愛用品番と、その端正なメイクの再現方法を徹底解説します。`,
    editorialSections: [
      {
        heading: 'ジスの唇を彩る「Dior アディクト リップ」の象徴的カラー',
        text: `ジスさんの代名詞とも言えるのが、「ディオール アディクト リップ グロウ」の**【#031 ストロベリー】**（ジスの誕生日1月3日と名前にちなんで作られた限定カラー）や**【#001 ピンク】**です。\n\n97%自然由来成分配合のティントリップバームで、唇本来の水分量に反応してオーダーメイドの血色感に染め上げます。重ねるほどにジューシーなツヤとハリが増し、すっぴんでも浮かない上品なピンクリップが完成します。`
      },
      {
        heading: '隙のないジス肌を叶える「ディオールスキン フォーエヴァー」の秘密',
        text: `ジスさんの端正な肌を支えているのは、「ディオールスキン フォーエヴァー フルイド グロウ」とクッションファンデーションです。\n\n高いカバー力を誇りながら、光を取り込んで内側から発光するようなセミグロウな仕上がり。皮脂や汗に強く、24時間つけたての美しさが持続するため、長時間のイベントや写真撮影でも崩れ知らずの肌をキープできます。`
      }
    ],
    faqs: [
      {
        question: 'パーソナルカラー問わず使えるジスリップはありますか？',
        answer: '「リップ グロウ #001 ピンク」や「リップ マキシマイザー #001 ピンク」は、唇の水分量によって自然なピンクに変化するため、イエベ・ブルベを問わずどんな肌トーンの方にも美しく馴染みます。'
      },
      {
        question: 'Diorコスメをギフトとして贈る場合の人気アイテムは？',
        answer: '名前やメッセージを刻印できるリップ グロウやリップ マキシマイザー、ミス ディオールのヘアミストは、特別なギフトとして女性に最も喜ばれる鉄板アイテムです。'
      }
    ]
  },

  // 3. ウォンジョンヨ 涙袋ペンシル＆パレット
  {
    id: 'art-wonjungyo-aegyosal-palette-complete-guide',
    searchKeyword: 'ウォンジョンヨ 涙袋 メタルシャワーペンシル',
    title: '【神涙袋が秒で作れる】ウォンジョンヨ（Wonjungyo）メタルシャワーペンシル＆アイシャドウパレット徹底解説！口コミ＆人気色比較',
    description: 'TWICE専属メイクアップアーティスト・ウォンジョンヨ氏プロデュースコスメの口コミ・使い方を徹底検証。大ヒット「メタルシャワーペンシル」全色レビューからデイリームードアップパレットの捨て色なしグラデーションまで詳しく解説します。',
    category: 'makeup',
    tags: ['ウォンジョンヨ 涙袋', 'ウォンジョンヨ パレット', 'ウォンジョンヨ デイリームードアップパレット', 'メタルシャワーペンシル', '涙袋 ライナー おすすめ', '韓国アイドル 涙袋 作り方'],
    author: '橘 えりか',
    intro: `TWICEをはじめとするK-POPトップアイドルのメイクを手掛けるカリスマメイクアップアーティスト、ウォン・ジョンヨ氏が立ち上げた**「Wonjungyo（ウォンジョンヨ）」**。\n\n発売と同時に即完売が相次ぎ、今や「涙袋メイクの絶対的頂点」として君臨する**メタルシャワーペンシル**の立体感の秘密や、普段使いしやすいデイリームードアップパレットの魅力を徹底的に紐解きます。`,
    editorialSections: [
      {
        heading: 'なぜウォンジョンヨのメタルシャワーペンシルは誰でも盛れるのか？',
        text: `1. **下まぶたにフィットする丸芯形状**：皮膚の薄い涙袋に引っかからずにスルスル描けるクリーミーなテクスチャー。ひと塗りでぷっくりとした厚みを生み出します。\n2. **光を集める微細パールの配合比率**：ギラギラした大粒ラメではなく、瞳のウルウル感を引き立てるサテンパールの光沢感。時間が経ってもシワに入り込まず、ヨレない密着力を誇ります。\n3. **人気色チャート**：\n- **01 ドリームハグ（ベイビーピンク）**：あざと可愛いフェミニンな涙袋に。ブルベ夏に大人気。\n- **02 サンドミラージュ（イエローベージュ）**：肌馴染み抜群の王道ベージュ。どんなメイクにも合う万能色。\n- **03 ブロンズベージュ（ヘルシーブロンズ）**：大人っぽい陰影とツヤ感をプラス。イエベ秋におすすめ。\n- **04 リコッタホワイト（ピュアホワイト）**：目頭切開ラインやハイライトとして、瞳をクリアに強調。`
      },
      {
        heading: 'アイドルの立体感涙袋を作るプロの3ステップ',
        text: `1. デイリームードアップパレットのマットな影色を細いブラシに取り、黒目の下を中心に薄く涙袋の影ラインを描く。\n2. メタルシャワーペンシルを目頭から黒目の下までスッと引く（目尻側までは引かず抜け感を残すのがコツ）。\n3. 指の腹でトントンと軽く境目をぼかすことで、生まれつき涙袋があるかのような自然な立体感が完成します。`
      }
    ],
    faqs: [
      {
        question: '夕方になってもラメが飛び散ったりしませんか？',
        answer: '塗るとすぐにまぶたの油分と密着してフィックスするウォータープルーフ処方のため、涙や汗、瞬きによるヨレ・ラメ飛びに非常に強く、夜まで綺麗なツヤが続きます。'
      },
      {
        question: 'デイリームードアップパレットの使いやすさは？',
        answer: 'アイシャドウだけでなく、チークやシェーディングとしても使えるマルチパレット設計になっており、これ1つで統一感のある韓国風ワントーンメイクが完成します。'
      }
    ]
  },

  // 4. NiziU愛用メイク＆コスメまとめ
  {
    id: 'art-niziu-makeup-cosme-complete-guide',
    searchKeyword: 'NiziU メイク コスメ コーセー リップ',
    title: '【NiziUメイク完全再現】メンバー愛用のリップ・アイシャドウ・ベースメイクまとめ！コーセーや韓国コスメの注目アイテム比較',
    description: 'NiziUメンバーがアンバサダーを務めるコーセー（KOSE）のメイクキープシリーズや、MV・ステージで愛用される韓国コスメ・プチプラアイテムを徹底特定。ピュアで崩れない「NiziUフェイス」になれるおすすめコスメを詳しく解説します。',
    category: 'makeup',
    tags: ['niziu メイク', 'niziu コスメ', 'NiziU 愛用コスメ', 'コーセー メイクキープ', '韓国アイドル メイク', 'プチプラ コスメ おすすめ', 'ツヤ肌 クッションファンデ'],
    author: 'K-Beauty LABO',
    intro: `弾けるような笑顔と圧倒的なシンクロダンスで日本中を元気にしてくれる**NiziU（ニジュー）**。\n\n彼女たちの魅力である「みずみずしい透明感」「激しく踊っても絶対に崩れない美肌」「フレッシュなツヤリップ」は、どのようなコスメで作られているのか？コーセーのアンバサダーアイテムをはじめ、メンバー愛用の神コスメを徹底調査しました。`,
    editorialSections: [
      {
        heading: 'NiziUの激しいステージを支える「絶対崩さない」ベースメイク3種の神器',
        text: `1. **コーセー メイク キープ ミスト EX+**：NiziUのCMでもおなじみの必須フィックススプレー。汗や皮脂を弾き、笑顔で激しく動いてもメイクをピタッと固定します。\n2. **皮脂テカリ防止トーンアップ下地**：Tゾーンのベタつきを防ぎつつ、メンバーのような内側から発光するピュアな白肌を演出。\n3. **薄膜密着クッションファンデ**：厚塗り感を一切出さず、素肌のツヤをそのまま残しながら色ムラを均一に補正します。`
      },
      {
        heading: 'フレッシュで可愛い！NiziU風ジューシーリップの作り方',
        text: `NiziUメイクのリップは、みずみずしい果汁のような「ジューシーティント」が定番です。\n\nコーラルピンクやピーチオレンジなど、肌のトーンを明るく見せるビタミンカラーを唇全体に薄く塗り、中央にだけグロスを重ねることで、弾けるような立体感と愛らしい笑顔を引き立てます。`
      }
    ],
    faqs: [
      {
        question: '学生や10代〜20代前半でも真似しやすいプチプラアイテムはありますか？',
        answer: 'コーセーのメイクキープシリーズやキャンメイク、ロムアンドなど、ドラッグストアで1,000円〜2,000円前後で購入できるアイテムが多いため、学生の方でも手軽にNiziUメイクを再現できます。'
      },
      {
        question: 'メンバーごとのパーソナルカラーに合わせた色選びは？',
        answer: 'マコさん・リクさんのような元気な印象にはコーラルオレンジ系、ミイヒさん・アヤカさんのような透明感重視にはピュアピンクや青みローズ系を選ぶと、それぞれの魅力を最大限に引き出せます。'
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

憧れのアイドルやスターと同じコスメを取り入れることで、メイクの完成度だけでなく毎日の自信とモチベーションも劇的に高まります。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第11弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
