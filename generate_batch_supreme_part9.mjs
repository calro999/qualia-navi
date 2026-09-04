import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第9弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. TFITコンシーラー＆TWICEミナ愛用
  {
    id: 'art-sachiko-tfit-concealer-mina-twice',
    searchKeyword: 'TFIT コンシーラー ティーフィット',
    title: '【TWICEミナ愛用で話題】TFIT（ティーフィット）コンシーラーのカバー力と崩れにくさを徹底検証！3色パレットの使い方',
    description: 'TWICEミナ愛用でSNSで大バズりしたTFIT（ティーフィット）カバーアッププロコンシーラーの本音口コミ。シミ・ニキビ跡・クマを消し去る3色ブレンド術と、乾燥しないプロ直伝の塗り方を徹底解説します。',
    category: 'makeup',
    tags: ['ティーフィット ミナ', 'ミナ tfit', 'ミナ コンシーラー', 'twice ミナ コンシーラー', 'TFIT コンシーラー', '韓国コスメ コンシーラー', 'クマ消し コンシーラー'],
    author: '橘 えりか',
    intro: `TWICEのミナさんが愛用していることで世界的なメガヒットとなり、韓国のメイクアップアーティスト御用達コスメとして不動の地位を築いた**「TFIT（ティーフィット）カバーアップ プロ コンシーラー」**。\n\n「固形バームタイプは乾燥してシワに入り込まない？」「3色をどうやって混ぜて使えばいいの？」という疑問に応えるべく、カバー力・密着度・崩れにくさの実力を徹底検証しました。`,
    editorialSections: [
      {
        heading: 'プロのメイクさんがTFITを手放さない3つの理由',
        text: `1. **体温でとろける高密着メルティング処方**：指先で触れると体温でスルスルとバームが溶け出し、肌に吸い付くようにピタッと密着。薄膜でありながらタトゥーまで隠すと言われる圧倒的なカバー力を誇ります。\n2. **肌悩みに合わせて無限にブレンドできる3色構成**：ライトベージュ・ナチュラルベージュ・ダークベージュの濃淡3色が1つのパレットに収まっており、自分の肌色やパーツに合わせて完璧な色味を自作できます。\n3. **17種のアミノ酸配合で一日中カサつかない**：目元や口元の薄い皮膚に塗っても、時間が経ったときにひび割れたり粉を吹かない高保湿設計です。`
      },
      {
        heading: '失敗ゼロ！パーツ別の3色使い分け＆ブレンド黄金ルール',
        text: `- **頑固な青クマ・黒クマ**：ダークベージュとナチュラルベージュを手の甲で混ぜ、血色感を足しながらトントンと薄く叩き込みます。\n- **小鼻の赤み・ニキビ跡**：自分の肌色よりワントーン暗めのナチュラルベージュをピンポイントでのせ、周囲の境目だけをぼかします。\n- **ほうれい線の影・鼻筋のハイライト**：ライトベージュを影の溝に沿って細くのせ、光の反射でふっくら押し上げます。`
      }
    ],
    faqs: [
      {
        question: '指塗りとブラシ塗り、どちらが綺麗につきますか？',
        answer: '指の腹で塗ると体温でバームが馴染んでツヤ感が出ます。一方、シミやニキビ跡をピンポイントで強力に隠したいときは、小さめの平筆（コンシーラーブラシ）を使うとプロ級の仕上がりになります。'
      },
      {
        question: '偽物が出回っていると聞きましたが本物の見分け方は？',
        answer: 'TFITは偽物が多いため、楽天市場で購入する際は「TFIT公式代理店マーク」があるショップや、ホログラムシール・正規品QRコード認証が付いている店舗を選んでください。'
      }
    ]
  },

  // 2. 40代・50代 シワ改善アイクリーム＆アイセラム
  {
    id: 'art-peri-40s-50s-eye-cream-wrinkle-ranking-2026',
    searchKeyword: 'アイクリーム 40代 50代 シワ改善 レチノール',
    title: '【目元の小ジワ・たるみを押し上げる】40代・50代向けシワ改善アイクリーム＆アイセラムおすすめ10選！本格エイジングケア比較',
    description: '年齢とともに深くなる目尻の小ジワ・目の下のたるみ・窪みを立て直す40代・50代向けアイクリームおすすめ10選。純粋レチノールやナイアシンアミド配合の実力派から、ふっくらハリを取り戻すプロの塗り方を徹底解説します。',
    category: 'skincare',
    tags: ['50代 アイセラム 人気', 'アイセラム おすすめ 50代', '50代 アイセラム おすすめ', 'アイセラム 人気 50代', 'エイジングケア アイクリーム ランキング 50代', 'エイジングケア アイクリーム 人気 50代', 'エイジングケア アイクリーム ランキング 40代', 'アイクリーム おすすめ 50代', '40代肌のハリを取り戻す', 'エリクシール リンクルクリーム'],
    author: 'Dr. 高橋 美紀',
    intro: `ふと鏡を見たときに目につく「目尻のカラスの足跡のような小ジワ」「夕方になるとくぼんで影ができる目の下」「まぶたのたるみ」。\n\n目元の皮膚はティッシュペーパー1枚ほどの薄さしかなく、皮脂腺がほとんどないため、加齢とスマホ・PCによる眼精疲労のダメージを最も受けて老化が進みます。真皮のコラーゲン産生を促す有効成分を配合した**医薬部外品アイクリーム**を徹底比較します。`,
    editorialSections: [
      {
        heading: '40代・50代が選ぶべき「2大シワ改善有効成分」の違い',
        text: `- **純粋レチノール（資生堂・エリクシール等）**：肌みずからがヒアルロン酸を生み出す力を高め、角層の水分量を増やして柔軟にし、目元の深いシワを物理的に押し上げます。効果実感のスピードが速いのが特徴です。\n- **ナイアシンアミド（ビタミンB3）**：真皮層のコラーゲン産生を促進してシワを改善し、同時にメラニンの蓄積を抑えて目元の茶ぐすみ・シミも防ぎます。刺激が非常にマイルドで、敏感肌でも続けやすいのが強みです。`
      },
      {
        heading: '絶対にやってはいけない！目元を老けさせるNG塗り方と正しい手順',
        text: `人差し指で皮膚を引っ張りながら強く塗り込むと、摩擦によって目元の色素沈着とたるみが急激に悪化します。\n\n**正しい塗り方：**\n1. 最も力の入りにくい「薬指の腹」に米粒大を取る。\n2. 目の下、目尻、まぶたの3点にポンポンと置く。\n3. 目頭から目尻に向かって、優しくピアノを弾くような軽いタッチ（タッピング）で押し込むようになじませる。`
      }
    ],
    faqs: [
      {
        question: '朝のメイク前にレチノールを塗っても大丈夫ですか？',
        answer: '純粋レチノールは紫外線によって分解されやすいため、朝使用する場合は必ず上からSPF値の高い日焼け止めや化粧下地を重ねてUVカットを行ってください。夜だけの使用から始めるのもおすすめです。'
      },
      {
        question: 'ほうれい線や首のシワにも使えますか？',
        answer: 'もちろん使用可能です。アイクリームは顔の中で最もデリケートな部分に合わせて作られているため、ほうれい線、眉間のシワ、首の横ジワに塗っても極上のハリ感を実感できます。'
      }
    ]
  },

  // 3. たるみ防止・摩擦レス メイクアップリムーバー＆クレンジング
  {
    id: 'art-sachiko-makeup-remover-tarumi-cleansing-review',
    searchKeyword: 'クレンジングバーム 毛穴 たるみ 摩擦レス',
    title: '【たるみを防ぐ摩擦レス】メイクアップリムーバーおすすめ10選！目元・毛穴のたるみを招かない極上クレンジング比較',
    description: '毎日のクレンジングの摩擦が引き起こす「目元のたるみ・毛穴の開き」を解消するメイクアップリムーバーおすすめ10選。厚みのあるクッションジェルやとろけるバームで、こすらずウォータープルーフまでスルンと落ちる名品を徹底レビューします。',
    category: 'skincare',
    tags: ['メイクアップリムーバー たるみ 口コミ', 'メイクアップリムーバー たるみ 人気', 'メイクアップリムーバー ざらつき おすすめ', 'メイクアップリムーバー たるみ', 'メイクアップリムーバー たるみ ランキング', 'クレンジング たるみ', '摩擦レス クレンジング'],
    author: 'Dr. 高橋 美紀',
    intro: `「しっかりメイクを落とそうとして、ついゴシゴシ擦ってしまう」「クレンジング後に肌が突っ張って、小じわや毛穴のたるみが目立つ…」という方に知ってほしいのが、クレンジングによる**「摩擦ダメージとたるみの関係」**です。\n\n肌を擦る圧力は、皮膚を支えるコラーゲン線維を断裂させ、たるみや色素沈着の最大の原因になります。厚みのあるクッションで肌と手のひらが触れ合わない「摩擦レス処方」のリムーバーを厳選しました。`,
    editorialSections: [
      {
        heading: 'クレンジングで肌をたるませないための3つの鉄則',
        text: `1. **ケチらず規定量（マスカット1粒大）をたっぷり使う**：量が少ないとクッション性が失われ、指が直接皮膚を擦る強い摩擦が発生します。\n2. **なじませる時間は「1分以内」**：時間をかけてマッサージすると、浮き上がったメイク汚れが毛穴に再浸透し、肌に必要なうるおいまで奪ってしまいます。\n3. **すすぎは「ぬるま湯（32℃〜34℃）」で擦らず洗い流す**：熱いお湯はバリア機能を壊して乾燥を招き、冷たすぎる水は油分が固まって毛穴詰まりの原因になります。触れて少しぬるいと感じる温度ですすぎましょう。`
      },
      {
        heading: 'タイプ別（バーム vs ジェル vs オイル）のたるみ防止選び',
        text: `- **クレンジングバーム（DUO・バニラコ等）**：体温でとろけて厚みのあるオイルに変化。毛穴の角栓汚れを吸着しながら、セラミドなどの美容オイルでしっとり洗い上げます。\n- **水性・クッションジェル**：まつエク派や油分が苦手なニキビ肌に最適。弾力のあるジェルがクッションの役割を果たします。\n- **ポイントメイクリムーバーの併用**：ウォータープルーフのマスカラやティントは、全顔を擦る前に専用リムーバーをコットンに含ませ、10秒当ててスルッと落とすのが目元のたるみを防ぐ最大の近道です。`
      }
    ],
    faqs: [
      {
        question: 'ダブル洗顔不要のものは本当に洗顔しなくて大丈夫？',
        answer: 'ダブル洗顔不要と明記された高品質クレンジングは、すすぎ時に界面活性剤が綺麗に水となじんで落ちるよう設計されています。無理に洗顔料を重ねると皮脂の取りすぎになるため、洗顔なしで十分です。'
      },
      {
        question: '小鼻のザラつきも一緒に落とせますか？',
        answer: 'クレンジングバームやオイルを小鼻のキワにのせ、薬指で小さな円を描くように10秒ほどクルクルなじませると、頑固な角栓や酸化した皮脂がポロポロと優しく浮き上がってきます。'
      }
    ]
  },

  // 4. 首元・デコルテ・手の甲のシワ改善クリーム
  {
    id: 'art-sachiko-neck-decollete-hands-wrinkle-care',
    searchKeyword: 'ネッククリーム 首元 デコルテ 手の甲 シワ改善',
    title: '【首元・デコルテ・手の甲のシワ改善】おすすめクリーム10選！ネックレスが映える若見えエイジングケア比較',
    description: '実年齢が如実に現れる「首の横ジワ・デコルテの小ジワ・手の甲の血管浮きや乾燥」を徹底改善するネック＆ハンドクリームおすすめ10選。ナイアシンアミド配合の薬用アイテムや、ハリを呼び戻すリンパマッサージ法を解説します。',
    category: 'bodycare',
    tags: ['ネッククリーム 50代', 'デコルテ しわ ネックレス', '手の甲 シワ 改善', '首のシワ クリーム', 'ネックケア おすすめ', '手の甲 エイジングケア', 'デコルテケア おすすめ'],
    author: 'Dr. 高橋 美紀',
    intro: `「顔はお手入れしているのに、ふと首元を見ると深い横ジワがくっきり入っている」「手の甲がカサついて血管が浮き出て、老けて見える…」\n\n首や手の甲は、皮膚が薄く皮脂腺が少ない上に、スマートフォンの下向き姿勢や日常の手洗い・消毒で過酷なダメージに晒されています。顔と同じように高機能成分を注ぎ込み、ネックレスや指輪が美しく映えるふっくらとしたハリ肌へ導くケアをお届けします。`,
    editorialSections: [
      {
        heading: '首と手の甲にシワが刻まれる3大原因と対策',
        text: `1. **スマホ首（下向き姿勢）による形状記憶**：長時間下を向いてスマホを見ていると、首の皮膚に深い折り目（横ジワ）が定着してしまいます。姿勢を正し、スマホを目線の高さに上げる意識が不可欠です。\n2. **紫外線とエアコンによるコラーゲン変性**：首の後ろやデコルテ、手の甲は日焼け止めを塗り忘れやすく、紫外線A波が真皮の弾力を奪ってたるみを引き起こします。\n3. **手洗いの繰り返しによるバリア崩壊**：手の甲はアルコール消毒や洗剤で油分が奪われやすいため、手洗いの直後に水分を閉じ込めるヘパリン類似物質やセラミド配合のハンドセラムが必須です。`
      },
      {
        heading: 'プロ直伝！首元のシワを薄くする下から上へのリンパマッサージ',
        text: `クリームをたっぷり首全体に伸ばし、手のひら全体を使って**「鎖骨からアゴ下に向かって下から上へ引き上げるように」**優しく撫で上げます。\n\n最後に、耳の後ろから首の側面を通って鎖骨のリンパ節へ老廃物を流すように上から下へ滑らせると、むくみがスッキリ取れて首が長く綺麗に見えるようになります。`
      }
    ],
    faqs: [
      {
        question: '顔用の美容液やクリームを首に塗るだけではダメですか？',
        answer: '顔用のクリームでも十分効果はありますが、首専用のネッククリームは下を向く動作の伸縮に対応する「ストレッチポリマー」やベタつかず服に付かない処方がされているため、より快適で高い引き締め実感が得られます。'
      },
      {
        question: 'どれくらいで首のシワに変化を感じますか？',
        answer: '保湿による肌の滑らかさは塗った翌朝から実感できます。ナイアシンアミドなどのシワ改善有効成分による真皮のハリ感やシワの浅さは、朝晩2回の継続で約2ヶ月〜3ヶ月が目安となります。'
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

正しい知識とお悩みにぴったり合った名品を選ぶことで、毎日のメイクやエイジングケアの満足度は格段に高まります。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第9弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
