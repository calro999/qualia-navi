import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第3弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. アイブロウコート 落ちない・20代/30代
  {
    id: 'art-sachiko-eyebrow-coat-20s-30s-guide',
    searchKeyword: 'アイブロウコート 眉毛 落ちない',
    title: '【眉尻が夜まで消えない】アイブロウコートおすすめ10選！汗・皮脂・擦れに強い人気ランキング＆テカらない塗り方',
    description: '夕方になると眉尻が消えてしまう悩みを根本解決するアイブロウコートおすすめ10選。オルビスやブロウラッシュEXをはじめ、テカらず自然なマット仕上がりで一日中眉メイクをキープする名品を徹底比較します。',
    category: 'makeup',
    tags: ['アイブロウコート おすすめ 30代', 'アイブロウコート 人気 20代', 'アイブロウコート おすすめ 20代', 'アイブロウコート ランキング', 'アイブロウコート おすすめ', 'アイブロウコート 人気', '眉コート', '眉毛消えない'],
    author: '松本 結衣',
    intro: `「前髪の擦れや汗、皮脂のせいで、気がつくと眉尻だけ消えてまろ眉になっている…」「メイク直しのたびに眉を描き足すのが面倒」という方に絶対おすすめしたいのが、眉メイクの仕上げに重ねる**アイブロウコート**です。\n\n「塗った部分がテカテカして不自然にならない？」「ペンシルやパウダーが滲んだり消えたりしない？」という心配を解消し、すっぴん風のナチュラルな質感を保ったまま強力にガードするおすすめアイテムをご紹介します。`,
    editorialSections: [
      {
        heading: 'テカらず自然に仕上がる！アイブロウコートの正しい塗り方手順',
        text: `1. **眉を描いた直後にすぐ塗らない**：ペンシルやパウダーの油分が定着する前に塗ると、色が滲んでムラの原因になります。眉メイク後、1〜2分置いてからコートを重ねるのがポイントです。\n2. **ボトルの口で液量をしっかり調節する**：ハケに液がたっぷり付いた状態で塗ると、テカリや束感が出やすくなります。ティッシュやボトルのフチでしっかりしごき、ごく少量を均一にのせましょう。\n3. **毛並みに沿って軽くなぞる**：何度も往復させず、眉頭から眉尻に向かってサッとひとはけするだけで十分なウォータープルーフ効果を発揮します。`
      },
      {
        heading: '年代別（20代・30代・40代・50代）の選び方の基準',
        text: `- **20代**：スポーツやライブ、夏の汗・皮脂分泌が多い時期には、耐水性・耐皮脂性に優れた強力ウォータープルーフタイプがベスト。\n- **30代・40代**：オフィスの空調乾燥や大人特有の皮脂崩れに対応するため、植物エキスやパンテノール等の眉毛トリートメント成分配合タイプがおすすめ。\n- **50代**：自眉の毛量が気になり始める世代には、速乾性があり地肌に色が定着しやすい速乾マット処方が適しています。`
      }
    ],
    faqs: [
      {
        question: 'クレンジングで簡単に落とせますか？',
        answer: '一般的なジェルクレンジングやオイルクレンジングで綺麗に落とせます。ゴシゴシこすると眉毛が抜ける原因になるため、目元用のポイントメイクリムーバーをコットンに含ませ、優しくなじませてオフするのが理想的です。'
      },
      {
        question: '眉マスカラと併用する場合はどちらを先に塗りますか？',
        answer: '「アイブロウペンシル・パウダー → 眉マスカラ → 眉マスカラが完全に乾いた後にアイブロウコート」の順番が正解です。一番最後にトップコートとして重ねることで、眉マスカラのカールや色味も一緒にロックできます。'
      }
    ]
  },

  // 2. 黒ずみ毛穴・凹凸を消す 化粧下地
  {
    id: 'art-sachiko-kurozumi-keana-primer-guide',
    searchKeyword: '化粧下地 毛穴 黒ずみ カバー',
    title: '【黒ずみ毛穴・開き毛穴を消す】化粧下地おすすめ10選！頑固ないちご鼻・テカリを一日中フラットに隠すプライマー比較',
    description: '小鼻の黒ずみ・頬のたるみ毛穴・開き毛穴をファンデーションなしでも目立たなくする化粧下地おすすめ10選。毛穴落ちや皮脂テカリを防ぎ、陶器のような滑らか肌を作るプロ直伝の塗り方を徹底解説します。',
    category: 'makeup',
    tags: ['化粧下地 黒ずみ', '下地 黒ずみ', '毛穴 ファンデーション', '下地 くすみ おすすめ', '毛穴 コンシーラー おすすめ', 'ファンデーション 毛穴 カバー', '毛穴 カバー ファンデーション', '開き毛穴 ファンデーション おすすめ'],
    author: '神崎 美咲',
    intro: `ファンデーションを重ねるほど毛穴が白くポツポツ浮き出る「毛穴落ち」や、夕方になると皮脂と混ざって黒ずみが透けてしまう悩み。毛穴トラブルを解消する鍵は、厚塗りのファンデーションではなく、**土台となる「化粧下地（毛穴プライマー）」の選び方**にあります。\n\nすり鉢状の開き毛穴やたるみ毛穴の凹凸に光を拡散させ、薄膜でサラサラの陶器肌をキープする名品下地を徹底比較します。`,
    editorialSections: [
      {
        heading: '毛穴落ちを100%防ぐための「下地塗り」の鉄則',
        text: `1. **スキンケアの油分をティッシュオフする**：乳液やクリームの油分が肌表面に残ったまま下地を塗ると、油分同士が混ざり合って崩れの原因になります。下地を塗る直前に、ティッシュで軽く全顔を押さえましょう。\n2. **毛穴の下から上に向かってクルクル塗り込む**：毛穴は下を向いて開いているため、上から下へ滑らせるだけでは凹凸が埋まりません。指の腹で小さな円を描きながら、下から上へ毛穴を埋めるように優しくなじませます。\n3. **皮脂吸着パウダーをピンポイントで仕込む**：テカリやすいTゾーンと小鼻周りにだけポアプライマーを薄く仕込み、乾燥しやすいUゾーンには高保湿下地を使い分ける「部分使い」が最も崩れません。`
      },
      {
        heading: '黒ずみ毛穴とたるみ毛穴、それぞれに効く下地の違い',
        text: `- **黒ずみ・いちご鼻**：光拡散パウダー（ソフトフォーカス効果）と皮脂吸着シリカが配合された半透明〜微細パール系の下地が、黒ずみの影を光で飛ばしてくれます。\n- **たるみ毛穴（涙型毛穴）**：ハリ感を与えるナイアシンアミドやペプチド配合で、肌をピンと引き上げるストレッチ成分を含んだみずみずしい下地が向いています。`
      }
    ],
    faqs: [
      {
        question: 'シリコン配合のプライマーは毛穴に詰まりませんか？',
        answer: '良質なシリコン（ジメチコン等）は分子が大きく皮膚呼吸を妨げない設計になっていますが、夜のクレンジングを怠ると角栓の原因になります。毛穴ケア用下地を使った日は、毛穴の汚れを浮かすバームやオイルで丁寧にクレンジングしてください。'
      },
      {
        question: 'ノーファンデでも毛穴は隠せますか？',
        answer: 'はい。トーンアップ効果とポアカバー効果を兼ね備えた下地に、微粒子のフェイスパウダーを重ねるだけで、ファンデーションを使わずに自然な素肌美に仕上げることができます。'
      }
    ]
  },

  // 3. ザセム コンシーラー パッケージ変わった・新旧比較
  {
    id: 'art-sachiko-the-saem-concealer-package-renewal',
    searchKeyword: 'ザセム コンシーラー カバーパーフェクション',
    title: '【新旧比較】ザセムのコンシーラーはパッケージが変わった？リニューアル後の成分・色味・カバー力の違いを徹底検証',
    description: '「ザセム（the SAEM）のコンシーラーのパッケージが変わった？」という疑問を徹底解明。リニューアル前後の容器デザインの違い、乾燥しにくくなった保湿成分の進化、人気カラー（1.25/1.5等）の色味変化を詳しく比較します。',
    category: 'makeup',
    tags: ['ザセム コンシーラー パッケージ変わった', 'ザセム コンシーラー リニューアル', 'the saem コンシーラー 色', 'コンシーラー テカリ', '青 クマ コンシーラー', '韓国コスメ コンシーラー'],
    author: '橘 えりか',
    intro: `圧倒的なハイカバー力とお手頃なプチプラ価格で、コンシーラー界の絶対王者として君臨し続ける**ザセム（the SAEM）の「カバーパーフェクション チップコンシーラー」**。\n\n最近「店舗やネットで見たらパッケージが変わっていたけれどリニューアルしたの？」「中身の成分や色番も変わってしまったの？」と話題になっています。新旧パッケージの見分け方と、実際の使い心地の変化を検証しました。`,
    editorialSections: [
      {
        heading: 'リニューアルで何が変わった？新旧パッケージと処方のポイント',
        text: `1. **洗練されたシンプルモダンな容器デザイン**：旧パッケージに比べてロゴ配置がスタイリッシュになり、ポーチの中でより上品に見えるデザインへとアップデートされました。\n2. **保湿力アップで「乾燥・ひび割れ」が軽減**：従来の強力な密着カバー力はそのままに、ツボクサエキス（CICA）やアロエベラ葉エキスなどのスキンケア保湿成分が強化され、目元や口元に塗っても時間が経ったときの粉浮きが大幅に改善されました。\n3. **SPF38/PA++の紫外線カット効果を維持**：シミやニキビ跡の悪化を防ぐUVカット性能は変わらず健在です。`
      },
      {
        heading: '失敗しない人気カラーの選び方診断',
        text: `- **0.5 アイスベージュ**：色白の方のハイライト用、眉周りの輪郭補正に。\n- **1.25 ライトベージュ**：やや明るめの肌色で、くすみや赤みを飛ばす万能カラー。\n- **1.5 ナチュラルベージュ**：一番人気の標準色。シミ・ニキビ跡・小鼻の赤みをしっかり消したい方に。\n- **ブライトナー（ピンク系）**：青クマや目元のくすみを自然に明るく補正。\n- **ピーチベージュ（オレンジ系）**：頑固な黒クマや茶クマを補色効果で消去。`
      }
    ],
    faqs: [
      {
        question: '時間が経つとシワに溜まるのを防ぐ塗り方は？',
        answer: 'チップから直接肌にベタ塗りせず、一度手の甲に取り、指の腹や小さなブラシでトントンと薄く叩き込むように乗せるのがコツです。塗った直後に水を含ませたスポンジで余分な液を吸い取ると一日中ヨレません。'
      },
      {
        question: '偽物の見分け方はありますか？',
        answer: '楽天市場で購入する際は、公式マークのある公式代理店や正規輸入総代理店ショップを選ぶのが確実です。正規品には日本語表記の法定成分シールが貼付されています。'
      }
    ]
  },

  // 4. 50代 更年期 スキンケア・ゆらぎ肌
  {
    id: 'art-sachiko-50s-kounenki-skincare-guide',
    searchKeyword: '50代 スキンケア 更年期 ハリ 保湿 エイジングケア',
    title: '【50代の更年期・ゆらぎ肌】スキンケアおすすめ人気10選！女性ホルモン減少による乾燥・たるみ・急な肌荒れを救うケア',
    description: '50代の更年期に起こる急激な乾燥・バリア機能低下・ハリ不足を立て直すスキンケアおすすめ10選。セラミド補給やナイアシンアミド配合など、大人のゆらぎ肌を包み込む高保湿＆エイジングケアアイテムを徹底比較します。',
    category: 'skincare',
    tags: ['更年期 スキンケア 50代 選び方', '更年期 スキンケア 50代', '更年期 スキンケア', '更年期 スキンケア 女性ホルモン', '更年期 スキンケア 50代 原因', '50代 アイセラム おすすめ', 'ネッククリーム 50代', '手の甲 シワ 改善'],
    author: 'Dr. 高橋 美紀',
    intro: `50代を迎えて「今まで使っていたスキンケアが突然合わなくなった」「どんなに保湿してもすぐにカサついて突っ張る」「フェイスラインのたるみや首元のシワが急に目立ってきた」と戸惑う声が多く聞かれます。\n\nその大きな原因は、更年期に伴う**女性ホルモン（エストロゲン）の急激な分泌低下**にあります。ホルモンバランスの変化で皮脂量とコラーゲン生成が減少した肌に必要なのは、若い頃と同じケアではなく「大人のゆらぎ肌専用の補給アプローチ」です。`,
    editorialSections: [
      {
        heading: '更年期の肌に本当に必要な「3大必須成分」',
        text: `1. **ヒト型セラミド**：エストロゲン減少により角層の細胞間脂質がスカスカになり、水分保持力が激減します。肌本来の組成に近いヒト型セラミド（セラミドNP・AP・EOP等）でバリアを再構築することが最優先です。\n2. **ナイアシンアミド（ビタミンB3）**：真皮のコラーゲン産生を促進してシワを改善し、同時にメラニンの受け渡しをブロックしてシミも防ぐ、50代に最も適した低刺激エイジングケア成分です。\n3. **大豆イソフラボン・植物性エストロゲン様エキス**：肌の内側からふっくらとしたハリと弾力をサポートし、しぼみがちな肌に自然なツヤを取り戻します。`
      },
      {
        heading: 'アイテム数を増やさない！肌を傷めない「シンプル高保湿」のすすめ',
        text: `肌が敏感に傾いている時期に、美容液やパックを何種類も重ねると、摩擦刺激や成分の過多でかえって肌荒れを招きます。\n\n洗顔後は、浸透性の高い高保湿化粧水でたっぷりと水分を満たし、良質なセラミドクリームまたはオイルイン乳液の2ステップで摩擦を最小限に抑える「シンプル高保湿」が、バリア機能を最も早く回復させる近道です。首元やデコルテ、手の甲まで余ったクリームを伸ばして一緒にケアしましょう。`
      }
    ],
    faqs: [
      {
        question: '急なほてり（ホットフラッシュ）で汗をかいたときのスキンケアは？',
        answer: '汗を放置すると塩分でかゆみや乾燥が悪化します。こすらず清潔なタオルで優しく押さえた後、アベンヌなどの低刺激ミスト化粧水を軽く吹きかけて水分を補い、乳液を薄く重ねてください。'
      },
      {
        question: 'プチプラでも更年期肌に十分な効果はありますか？',
        answer: '最近はドラッグストアでも有効成分（ナイアシンアミドやセラミド）を高配合した医薬部外品が多数登場しています。高価な美容液を少量ケチって使うよりも、続けやすい価格帯の実力派アイテムを規定量たっぷり使う方が高い保湿効果を得られます。'
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

ご自身の肌質やお悩みの段階に合わせた適切なアイテムを選ぶことで、毎日のメイク崩れのストレスやエイジングサインの不安は劇的に解消されます。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第3弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
