import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第4弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. 平野紫耀 愛用コスメ・香水・スキンケア
  {
    id: 'art-sachiko-hirano-shoh-cosme-items-complete',
    searchKeyword: 'イヴサンローラン リップ 平野紫耀',
    title: '【完全版】平野紫耀の愛用コスメ・香水・スキンケアまとめ！イヴ・サンローランなど着用アイテムの品番・香り・取扱店徹底調査',
    description: '平野紫耀さんがアンバサダーを務めるイヴ・サンローラン（YSL）の完売リップや愛用香水、陶器肌を支えるスキンケアアイテムを徹底特定。同じ香り・質感になれるアイテムの品番や楽天市場の公式取扱状況を詳しく解説します。',
    category: 'makeup',
    tags: ['平野紫耀 アイテム', '平野紫耀 化粧品', '平野紫耀 香水', '平野紫耀 YSL', 'イヴサンローラン リップ', '芸能人愛用コスメ', 'デパコス リップ 人気'],
    author: 'K-Beauty LABO',
    intro: `圧倒的なカリスマ性と美しいビジュアルで世界中を魅了し続ける平野紫耀さん。彼がアンバサダーに就任したブランドや、撮影・プライベートで愛用しているコスメ・香水は、発表直後に店頭やオンラインから姿を消す社会現象を巻き起こしています。\n\n「平野紫耀さんと同じ香りを身にまといたい」「愛用しているリップの正確な品番や使用感を知りたい」というファンの声に応え、特定された名品アイテムを徹底解説します。`,
    editorialSections: [
      {
        heading: '平野紫耀さんが体現する「YSLビューティー」のアイコンアイテム',
        text: `平野紫耀さんがアジアアンバサダーとしてビジュアルを飾ったイヴ・サンローランの代表作が、**「ルージュ ピュールクチュール」**および**「リブレ オーデパルファム」**です。\n\n- **リップ（ルージュ ピュールクチュール）**：ひと塗りでサテンのような上質なツヤと鮮やかな発色を叶える高密着リップ。平野さんの着用カラーは肌の透明感を引き立てる粘膜ヌード〜洗練されたレッド系で、性別を問わずデイリーに使いやすいカラーとして大ヒットを記録しています。\n- **香水（LIBRE / リブレ）**：マスキュリンなラベンダーとフェミニンなオレンジブロッサムが対極に融合した、気品高く自由なフレグランス。甘すぎず深みのあるウッディバニラへと変化するため、大人の色気を纏える香りとして男女問わず愛用者が急増しています。`
      },
      {
        heading: '平野紫耀さんの陶器のようなツヤ肌を作るベースメイク＆スキンケア',
        text: `長時間のライブやハイビジョン撮影でも毛穴ひとつ見当たらない肌の秘密は、徹底した保湿と素肌感を活かした薄膜ベースメイクにあります。\n\n水分と油分のバランスを整える高保湿ローションで土台を整え、クッションファンデーションをごく少量ずつ中央から外側へタッピングして馴染ませることで、厚塗り感のない発光ツヤ肌を再現できます。`
      }
    ],
    faqs: [
      {
        question: '男性でも普段使いしやすいリップの色番はありますか？',
        answer: '唇の元の血色感を自然に底上げするニュアンスベージュや、透明感のあるシアーな粘膜カラーが男性にも非常に人気です。唇のくすみを消し、清潔感のある口元を演出できます。'
      },
      {
        question: '香水はどの部位につけるのがおすすめですか？',
        answer: 'リブレは香りの持続性と拡散力が高いため、手首や首筋に強く吹きかけるよりも、ウエスト（腰回り）や足首、膝の裏に1プッシュ纏うと、歩くたびに下からふんわりと品良く香ります。'
      }
    ]
  },

  // 2. K-POPアイドル（SEVENTEEN・BTSジン・Snow Man渡辺翔太）愛用コスメ
  {
    id: 'art-sachiko-kpop-idol-makeup-ambassador-guide',
    searchKeyword: 'ラネージュ クリームスキン ジン BTS',
    title: '【推し肌コスメ】SEVENTEEN・BTSジン・Snow Man愛用のスキンケア＆メイクアイテム完全ガイド',
    description: 'SEVENTEEN（セブチ）のアンバサダー就任アイテム、BTSジン愛用のラネージュ、Snow Man渡辺翔太さんの愛用スキンケアなど、美肌アイドルの愛用コスメを徹底調査。楽天市場の公式取扱状況と本音レビューをまとめました。',
    category: 'k-beauty',
    tags: ['セブチ アンバサダー', 'seventeen メイク', 'ラネージュ jin', 'ジン 化粧品 ラ ネージュ', 'snow man メイク', '渡辺翔太 メイク', 'ジョンハン バニラコ', 'ジョングク 香水 シャネル'],
    author: 'K-Beauty LABO',
    intro: `激しいダンスパフォーマンスや過密なツアースケジュールの中でも、常に陶器のように発光するツヤ肌をキープしているK-POP＆J-POPのトップアイドルたち。\n\nBTSのジンさんがグローバルアンバサダーを務める「LANEIGE（ラネージュ）」、SEVENTEENメンバーがモデルを務める韓国スキンケア、そして美容男子の頂点として知られるSnow Man渡辺翔太さんの本気スキンケアまで、推しと同じアイテムで美肌を目指すための完全ガイドをお届けします。`,
    editorialSections: [
      {
        heading: 'BTSジン×ラネージュ：クリームスキンが叶える「水光肌」の秘密',
        text: `BTSのジンさんがアンバサダーを務めるラネージュの代表作「クリームスキン ローション」は、化粧水の浸透力とクリームの保湿力を1本に凝縮したメガヒットアイテムです。\n\n白茶から抽出した高濃度アミノ酸が肌のバリア機能を強力にサポートし、インナードライでカサつく肌を内側からモチモチに満たします。コットンパックやメイク前の仕込みに使うことで、ファンデーションの密着度が劇的にアップします。`
      },
      {
        heading: 'SEVENTEEN＆Snow Man渡辺翔太さんの美肌ルーティンの共通点',
        text: `トップアイドルたちの美肌の根底にあるのは、「摩擦ゼロのクレンジング」と「ビタミンC＆セラミドの継続補給」です。\n\nバニラコのクレンジングバーム等で毛穴の角栓や舞台メイクを擦らずに溶かし出し、その直後に高濃度ビタミンCや鎮静シカ成分で毛穴を引き締めるのが、毛穴レスな陶器肌を保つ秘訣です。`
      }
    ],
    faqs: [
      {
        question: '敏感肌でも使いやすいアイテムはどれですか？',
        answer: 'ラネージュのクリームスキンやシカ成分配合のスキンケアは、低刺激テスト済みでアルコールフリーのものが多く、ゆらぎやすい敏感肌の方でも安心してお使いいただけます。'
      },
      {
        question: 'メンズへのプレゼントとしても喜ばれますか？',
        answer: 'スタイリッシュなパッケージでベタつかない高保湿スキンケアは、美容に関心の高い男性へのギフトとして大人気です。清潔感を重視するビジネスパーソンにも好評です。'
      }
    ]
  },

  // 3. LE SSERAFIM・ILLIT・aespa 愛用コスメ
  {
    id: 'art-sachiko-lesserafim-illit-aespa-makeup-complete',
    searchKeyword: 'ロムアンド リップ ウォンヒ ILLIT',
    title: '【第5世代ヨジャドル愛用】LE SSERAFIM・ILLIT・aespaのステージメイク＆愛用リップ・コスメまとめ',
    description: 'LE SSERAFIM（チェウォン・ウンチェ）、ILLIT（ウォンヒ）、aespa（カリナ・ジゼル）が使用する話題のリップ、チーク、ベースメイクアイテムを徹底特定。同じメイクができる品番リストと楽天市場の公式在庫を解説します。',
    category: 'k-beauty',
    tags: ['le sserafim メイク', 'チェウォン メイク', 'ウォンヒ 愛用 リップ ロムアンド', 'ウォンヒ fwee', 'ウンチェ リップ', 'カリナ シャネル リップ', 'ジゼル 洗顔', 'パーフェクトホイップ ジゼル', 'illit リップ', 'illit 化粧品'],
    author: 'K-Beauty LABO',
    intro: `SNSやTikTokで爆発的なバズを生み出し続ける、K-POP第4世代・第5世代ガールズグループの最新メイクトレンド。\n\nILLITウォンヒさんのあどけない「うさぎ舌リップ」やfweeのプリンポット、LE SSERAFIMチェウォンさんの崩れない陶器肌ベースメイク、aespaカリナさんのモードなシャネルリップ、ジゼルさんの愛用洗顔まで、憧れのヨジャドル顔になれる愛用アイテムを網羅しました。`,
    editorialSections: [
      {
        heading: 'ウォンヒ風「ぽってり粘膜うさぎ舌リップ」の作り方手順',
        text: `1. **コンシーラーで唇の輪郭をぼかす**：元の唇の赤みを抑え、口角のくすみを消すことで、次のリップの発色をピュアに見せます。\n2. **ベースにマットな粘膜ピンクをオーバー気味に仕込む**：fweeのリプポットやロムアンドのマットティントを指でポンポンと唇の山と下唇に広げ、人中を短縮して見せます。\n3. **中央にツヤ系プランパーグロスを重ねる**：唇の中央にだけガラス玉のようなツヤグロスを重ねることで、赤ちゃんのようなぷるんとした立体感が生まれます。`
      },
      {
        heading: '崩れない！チェウォン＆カリナのステージ肌を再現するベースメイク',
        text: `激しいダンスや照明の熱でもテカらずヨレない秘密は、「皮脂吸着プライマー＋薄膜セミマットクッション＋超微粒子フィックスミスト」のミルフィーユ構造にあります。全顔に厚塗りするのではなく、ハイライトゾーンを中心に極薄で密着させるのがプロの技です。`
      }
    ],
    faqs: [
      {
        question: 'イエベ・ブルベそれぞれに似合うヨジャドルカラーは？',
        answer: 'イエベ春・秋の方にはコーラルやピーチ系のロムアンドティントが、ブルベ夏・冬の方には青みを含んだモーヴピンクやベリー系の粘膜カラーが肌の白さを最大限に引き立てます。'
      },
      {
        question: 'プチプラでも同じ仕上がりに近づけますか？',
        answer: '韓国コスメは1,000円〜2,000円台のプチプラ価格でありながら、デパコス級の発色と密着度を誇るものが多いため、手軽にアイドルメイクを再現できます。'
      }
    ]
  },

  // 4. クリスマスコフレ＆ホリデー限定コスメ（20代・30代）
  {
    id: 'art-sachiko-holiday-coffret-20s-30s-ranking',
    searchKeyword: 'クリスマスコフレ ホリデー 2026',
    title: '【2026年最新】20代・30代に人気のクリスマスコフレ＆ホリデー限定コスメおすすめ10選！自分へのご褒美＆ギフト徹底比較',
    description: '2026年のクリスマスコフレ・ホリデーコレクションおすすめ10選。20代・30代女性に人気のデパコス限定パレットから5000円前後のプレゼント用ギフトセットまで、予約開始日・発売日・即完売必至の限定アイテムを徹底解説します。',
    category: 'makeup',
    tags: ['20代 コフレ 人気', '30代 コフレ おすすめ', 'コフレ 人気 20代', '20代 ホリデーコフレ おすすめ', '30代 コフレ 人気', 'コフレ おすすめ 20代', '20代 クリスマスコフレ おすすめ', '彼女 プレゼント コスメ', '5000円 コスメ', 'ご褒美 コスメ'],
    author: '神崎 美咲',
    intro: `一年に一度、各コスメブランドが総力を結集して世に送り出す華やかな「クリスマスコフレ＆ホリデーコレクション」。\n\n普段は手に入らない限定デザインのパッケージ、人気アイテムのミニサイズ詰め合わせ、捨て色なしの贅沢なマルチパレットなど、自分へのご褒美にも大切な人へのプレゼントにも胸が高鳴るラインナップが揃います。\n\n20代・30代の大人の女性が本当に満足できる、即完売必至の本命コフレを厳選しました。`,
    editorialSections: [
      {
        heading: '後悔しないクリスマスコフレの選び方：3つの基準',
        text: `1. **現品換算のお得度をチェックする**：コフレの最大の魅力はコスパの高さです。人気美容液やリップの現品に、ミニサイズのスキンケアやポーチが付いてくるセットは、通常購入よりも数千円〜数万円相当お得になります。\n2. **日常使いできるカラー構成か見極める**：ホリデー限定品はラメや発色が華やかなものが多く、イベント時しか使えない色ばかりだとタンスの肥やしになりがちです。ブラウンやベージュを基調とした、オフィスメイクにも転用できるパレットを選ぶのが賢い選択です。\n3. **予算別（5,000円前後 vs 15,000円以上）で目的を分ける**：友人や彼女へのプレゼントには気兼ねなく渡せる5,000円前後のリップ・ハンドケアセット、自分へのご褒美には15,000円以上のラグジュアリーデパコスが人気です。`
      },
      {
        heading: '争奪戦を制する！楽天市場公式ショップの予約・購入テクニック',
        text: `デパコスのコフレは店頭予約が即日終了することも珍しくありません。楽天市場の各ブランド公式旗艦店（エスティローダー、ランコム、YSL、SK-II等）では、公式限定のポイント10倍キャンペーンやオリジナルノベルティ付きで先行予約・発売が行われるため、事前に発売日時をチェックしてエントリーを済ませておくのが確実です。`
      }
    ],
    faqs: [
      {
        question: '男性から女性へのプレゼントにコフレを選ぶ際の注意点は？',
        answer: '肌色に左右されやすいファンデーションや好みが分かれる原色アイシャドウは避け、高級スキンケアセットやボディケア、上品な香りのハンドクリーム＆リップバームのセットを選ぶと失敗がありません。'
      },
      {
        question: '限定コフレはいつ頃から予約が始まりますか？',
        answer: '例年9月下旬〜10月上旬にかけて各ブランドで第1弾の予約受付がスタートし、10月下旬〜11月中旬に全国発売されます。気になるブランドはお気に入り登録を推奨します。'
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

憧れのアイドルやスターが愛用する名品、そして一年に一度の特別なコフレは、毎日のメイクやスキンケアを最高にワクワクさせてくれます。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第4弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
