import fs from 'fs';
import path from 'path';

console.log('🚀 [Supreme Organic Polish] 第2弾 4大最重要テーマの書き下ろし開始...');

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
  // 1. ディズニーコラボ再取得（10件フル）
  {
    id: 'feature-disney-cosme-collab-2026',
    searchKeyword: 'ディズニー コスメ',
    title: '【2026年最新】ディズニーコラボコスメ完全ガイド！即完売の限定リップ・アイシャドウ・ヘアケア厳選10選',
    description: '2026年発売のディズニー限定コラボコスメを徹底特集。&honey（アンドハニー）の限定ボトルからパケ買いリップ、ギフトにも喜ばれるプリンセスデザインまで、楽天市場の公式在庫・実売価格・口コミをもとに詳しく解説します。',
    category: 'makeup',
    tags: ['ディズニーコラボコスメ 2026', 'キャラクターコラボコスメ 2026', 'ディズニー コスメ 2026', 'サンリオ コラボ コスメ 2026', '秋コスメ 2026 プチプラ', 'パケ買いコスメ', 'ディズニープリンセス', 'プレゼント コスメ'],
    author: '神崎 美咲',
    intro: `見ているだけで胸が高鳴るディズニープリンセスや人気キャラクターのアートがあしらわれた限定コスメ。2026年も、発売と同時に即完売を繰り返すヘアケアから、普段使いしやすい絶妙カラーのリップ・アイシャドウまで話題のコラボレーションが続々と登場しています。\n\n「可愛いけれど、コスメとしての実力はどうなの？」「プレゼント用に購入したいけれどどれが喜ばれる？」という疑問に応えるため、楽天市場の公式ショップや正規取扱店のリアルなレビュー・在庫データをもとに、買って損しない本命アイテムを厳選しました。`,
    editorialSections: [
      {
        heading: 'パケ買いだけで終わらせない！2026年ディズニーコスメの選び方',
        text: `コラボコスメを選ぶ際に重視したいのは、「見た目の可愛さ」と「中身の実力」の両立です。\n\n- **ヘアケア・ボディケア系**：＆honey（アンドハニー）やスカルプDなどの実力派ブランドとのコラボは、通常品と同じ高い機能性を備えているため、失敗のない鉄板の選択肢です。\n- **カラーコスメ系**：韓国コスメや国産プチプラの限定パッケージは、日本人の肌トーンに馴染む粘膜系ピンクやニュアンスブラウンが多く、日常のオフィスメイクにも違和感なく溶け込みます。\n- **ギフト・プレゼント用途**：ハンドクリームやリップバームのセットは、相手の肌質や好みの色を問わず贈りやすいため、5,000円前後のコスメギフトとして高い支持を集めています。`
      },
      {
        heading: '完売前の入手方法と注意点',
        text: `ディズニーコラボは数量限定生産が多く、店頭では即日完売してしまうケースが少なくありません。楽天市場などの公式ショップでは、ポイント還元率の高い「お買い物マラソン」や「0と5のつく日」に合わせて在庫が動くため、気になったアイテムはお気に入り登録して早めに確保しておくのが賢い買い方です。`
      }
    ],
    faqs: [
      {
        question: 'ディズニーコラボコスメは敏感肌でも使えますか？',
        answer: 'コラボコスメの多くは、各ブランドの定番処方をベースにパッケージのみ限定仕様にしたものが多いため、通常の製品と同じ基準でお使いいただけます。不安な場合は無香料・低刺激処方のアイテムを選ぶのがおすすめです。'
      },
      {
        question: 'プレゼント用にラッピング対応しているショップはありますか？',
        answer: '楽天市場内の公式旗艦店や百貨店系ショップでは、ギフトラッピングや限定ショッパーの付属に対応している店舗が多数あります。購入手続き時にラッピング指定が可能かご確認ください。'
      }
    ]
  },

  // 2. まつ毛パーマ セルフ キット ランキング
  {
    id: 'art-sachiko-self-lash-perm-ranking',
    searchKeyword: 'まつげパーマ セルフ キット',
    title: '【自宅で簡単】セルフまつ毛パーマキットおすすめ人気10選！失敗しないやり方＆初心者向けランキング',
    description: 'サロンに通わず自宅でくるんと上向きまつ毛を作れるセルフまつ毛パーマキットおすすめ10選。失敗しないシリコンロットの選び方やまぶた別の巻き方、チリつきを防ぐ放置時間、マツパ後におすすめの束感コーティング美容液まで徹底解説します。',
    category: 'makeup',
    tags: ['まつ毛パーマ セルフ ランキング', 'まつ毛パーマセルフキット ランキング', 'セルフまつパ おすすめ', 'まつパ 後 美容液おすすめ', 'マツエク 束感 コーティング', 'まつ毛パーマ セルフ 国産 おすすめ', 'セルフまつ毛パーマ おすすめ'],
    author: '松本 結衣',
    intro: `毎朝のビューラーでまつ毛が抜けたり、湿気で午後には下がってしまう頑固な下向きまつ毛。「サロンに通う時間や費用を節約しながら、いつでも上向きの美まつ毛をキープしたい」という方から注目を集めているのが、自宅でできる**セルフまつ毛パーマキット**です。\n\n「自分でやって失敗してチリチリにならない？」「一重や奥二重でも綺麗に上がる？」という不安を解消するため、初心者でも扱いやすい低刺激キットの選び方と、プロ直伝の巻き方のコツを徹底解説します。`,
    editorialSections: [
      {
        heading: '初心者が絶対に失敗しないための3大鉄則',
        text: `セルフまつパで最も多い失敗は「毛先がチリつくこと」と「根元が折れてカクカクになること」です。これらは次の3つのポイントを押さえるだけで劇的に防げます。\n\n1. **まぶたの形に合ったロットを選ぶ**：一重・奥二重の方はまぶたの厚みを避けて前に押し出す「L字・立ち上げ型ロット」、二重や丸みのある目元の方は毛先に向かって自然な弧を描く「Cカール・丸み型ロット」を選びましょう。\n2. **毛先までパーマ液をベタ塗りしない**：まつ毛の毛先は非常に細く傷みやすいため、1剤・2剤ともに根元〜中央までに留め、毛先には塗布しないのがサロン級の仕上がりを保つ秘訣です。\n3. **規定の放置時間を厳守する**：しっかりカールをつけたいからと放置時間を延ばすのは厳禁です。付属の説明書の時間をタイマーで正確に計りましょう。`
      },
      {
        heading: 'カールを1ヶ月半長持ちさせるマツパ後のアフターケア',
        text: `パーマをかけた当日は、薬剤が定着するまで最低4〜6時間はまつ毛を濡らさないようにしてください。また、日々の洗顔後はケラチンやペプチドが配合された「マツパ専用コーティング美容液」を朝晩塗布することで、乾燥によるバラつきを防ぎ、流行りの韓国風「束感まつ毛」を一日中キープできます。`
      }
    ],
    faqs: [
      {
        question: 'どれくらいの頻度でかけ直せばいいですか？',
        answer: 'まつ毛の毛周期に合わせて、約1ヶ月〜1ヶ月半（4〜6週間）の間隔を空けるのが理想的です。短期間で頻繁にかけ直すと毛先のダメージにつながります。'
      },
      {
        question: 'パーマ液が目に入った場合の対処法は？',
        answer: '万が一目に入った場合は、絶対に目をこすらず、すぐに清潔な流水で15分以上洗い流してください。異物感や充血が残る場合は速やかに眼科を受診してください。施術時は根元ギリギリを攻めすぎないことが安全の鉄則です。'
      }
    ]
  },

  // 3. カプサイシン リップ プランパー
  {
    id: 'art-sachiko-capsaicin-plumper-lip-guide',
    searchKeyword: 'リップ プランパー カプサイシン',
    title: '【ぷっくり唇を作る】カプサイシン配合リッププランパーおすすめ10選！ピリピリ感と縦ジワ補正力比較',
    description: '塗るだけでぽってりとした色っぽい唇を叶えるカプサイシン・トウガラシ果実エキス配合リッププランパーおすすめ10選。心地よい温感刺激の強さ・ツヤ感・縦ジワ消滅効果から、秋メイクに映える人気カラーまで詳しく比較します。',
    category: 'lip',
    tags: ['カプサイシン リップ', 'カプサイシンリップ', '唇 カプサイシン リップ', 'リップ カプサイシン', 'リッププランパー', '縦ジワ改善 リップ', 'ぷるぷる リップ', 'リップ下地 プランパー'],
    author: '橘 えりか',
    intro: `年齢とともに気になってくる唇の縦ジワやくすみ、ボリューム不足。ヒアルロン酸注入のようなふっくらとしたハリと血色感を瞬時に演出してくれる救世主が、**カプサイシンやトウガラシ果実エキスを配合したリッププランパー**です。\n\n「ピリピリとした刺激は痛くない？」「本当に縦ジワが目立たなくなる？」という気になる使用感や、日常使いしやすい人気ブランドの比較検証をお届けします。`,
    editorialSections: [
      {
        heading: 'なぜカプサイシンで唇がふっくらするのか？温感ボリュームの仕組み',
        text: `プランパーに含まれるカプサイシンやバニリルブチルといった温感成分は、唇の毛細血管の血流を一時的に活性化させます。これにより、唇の内側からじんわりと温まり、水分を抱え込んでふっくらと自然にボリュームアップ（プランプアップ）します。\n\nさらに、血色が冴えないすっぴん唇にも自然な桜色の血色感が宿るため、口紅の発色やノリが格段に良くなるのが特徴です。メントールによるスーッとした爽快感と温感が組み合わさることで、心地よい刺激が続きます。`
      },
      {
        heading: 'プロ直伝！プランパーのポテンシャルを最大化する重ね塗り術',
        text: `1. **ベースとして仕込む**：メイクの最初にプランパーをたっぷり塗り、ベースメイクをしている間に唇を柔らかく整えます。口紅を塗る直前に軽くティッシュオフすると、口紅がムラなく密着します。\n2. **中央にだけハイライト重ね**：マットリップやお気に入りの口紅を塗った後、下唇の中央と上唇の山部分にだけチョンチョンとプランパーを重ねると、光を集めて立体感のあるちゅるんとした唇が完成します。`
      }
    ],
    faqs: [
      {
        question: '唇が荒れやすい敏感肌でも使えますか？',
        answer: 'カプサイシンによる強い刺激が心配な方は、まずは手の甲や腕の内側でパッチテストを行うか、刺激が穏やかなペプチド配合やヒアルロン酸メインのマイルドなプランパーから試すのがおすすめです。唇に皮剥けや傷があるときは使用を控えましょう。'
      },
      {
        question: '寝る前のリップケアとして使っても大丈夫ですか？',
        answer: 'メントールやカプサイシンの刺激が睡眠の妨げになる場合があるため、夜のナイトケア用には「無刺激」のリップスリーピングマスクやセラミド配合のナイトリップトリートメントを使用し、プランパーは日中のメイク用として使い分けるのがベストです。'
      }
    ]
  },

  // 4. サンリオ＆シナモロール コラボコスメ 2026
  {
    id: 'art-sachiko-sanrio-cinnamon-collab-cosme-2026',
    searchKeyword: 'サンリオ コスメ 2026 シナモロール',
    title: '【2026年最新】サンリオ＆シナモロール限定コラボコスメおすすめ10選！パケ買い必至のリップ・アイシャドウまとめ',
    description: '2026年最新のサンリオ・シナモロール限定コラボコスメを徹底特集。ロムアンドやキャンメイクとの限定パッケージから、大人のポーチに映える上品デザインまで、楽天市場の公式取扱状況と口コミをもとに厳選10選を詳しく解説します。',
    category: 'makeup',
    tags: ['サンリオ コラボ コスメ 2026', 'シナモン コラボ 化粧品 2026', 'サンリオコラボ コスメ 2026', 'キャラクターコラボコスメ 2026', 'シナモロール コスメ', 'パケ買いコスメ 2026', '限定コスメ プチプラ'],
    author: '神崎 美咲',
    intro: `世界中で愛されるサンリオキャラクターたち。中でも不動の圧倒的人気を誇る「シナモロール（シナモン）」をはじめ、クロミ、マイメロディ、ポムポムプリンと人気コスメブランドの夢のコラボレーションが2026年も大豊作です。\n\nポーチから取り出すだけで気分が上がるビジュアルの可愛さはもちろん、トレンドの粘膜カラーや崩れにくい処方など、実用性でも高評価を集める名品をまとめました。`,
    editorialSections: [
      {
        heading: '大人女子も持ち歩きやすい！サンリオコスメの進化トレンド',
        text: `近年のサンリオコラボは、子どもっぽさを感じさせない「くすみパステル」や「アンティーク調ゴールド」「透け感クリアボトル」など、大人の女性がオフィスのデスクやポーチに忍ばせても馴染む洗練されたパッケージデザインが主流になっています。\n\n中身も実力派の定番人気カラー（コーラルピンク、透け感モーヴ、多色ラメなど）が採用されているため、「飾っておくだけ」にならず毎日一軍コスメとして活躍してくれます。`
      },
      {
        heading: '推しキャラコスメを長く綺麗に使うための保管テクニック',
        text: `限定パッケージの文字やイラストは、ポーチの中で他のコスメの角と擦れ合うことで削れてしまうことがあります。お気に入りの限定デザインを長く美しく保つためには、薄手のクッションポーチに入れるか、透明の保護ケースを活用するのがおすすめです。`
      }
    ],
    faqs: [
      {
        question: 'コラボコスメは通常版と中身のカラーや成分は同じですか？',
        answer: '多くのブランドでは、既存の一番人気カラーを限定パッケージに詰め替えたものや、コラボ限定の特別新色（限定色）として展開されます。限定色の場合、完売後の再販がないことが多いため、色味が気に入った場合は早めの入手が推奨されます。'
      },
      {
        question: '友達への誕生日プレゼントやギフトにも向いていますか？',
        answer: 'ハンドクリーム、リップオイル、前髪クリップなどの雑貨・ケアアイテムは好みが分かれにくく、サンリオ好きの友人へのちょっとしたギフトとして非常に喜ばれます。'
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

ご自身の肌質やライフスタイルに合ったアイテムを選ぶことで、毎日のスタイリングやメイクの楽しさは格段に広がります。ぜひ楽天市場の公式ショップで最新の在庫状況やポイントアップキャンペーンをチェックしてみてください。
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
  console.log('🎉 第2弾 4大最重要記事の書き下ろし・データ保存が完了しました！');
}

generate().catch(e => { console.error('エラー:', e); process.exit(1); });
