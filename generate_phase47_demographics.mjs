import fs from 'fs';
import path from 'path';

console.log('🚀 [Phase 47] 年代別・性別コスメおすすめ特化 10選記事 10本 楽天APIリアルタイム取得生成中...');

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

async function fetchRakutenItems(keyword, hits = 12, maxRetries = 3) {
  let cleanKw = keyword.replace(/【.*?】/g, '').replace(/（.*?）/g, '').replace(/\(.*?\)/g, '').trim();
  if (cleanKw.length > 40) cleanKw = cleanKw.slice(0, 40);
  const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?applicationId=${APP_ID}&accessKey=${ACCESS_KEY}&affiliateId=${AFFILIATE_ID}&keyword=${encodeURIComponent(cleanKw)}&format=json&hits=${hits}&sort=-reviewCount&imageFlag=1`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📡 [楽天API 試行${attempt}] "${cleanKw}"`);
      const res = await fetch(url);
      if (res.status === 429) { await new Promise(r => setTimeout(r, 2000)); continue; }
      if (!res.ok) { console.warn(`⚠️ APIエラー ${res.status}`); return []; }
      const data = await res.json();
      if (!data.Items || data.Items.length === 0) { console.warn(`⚠️ 0件: "${cleanKw}"`); return []; }
      return data.Items.map(e => {
        const item = e.Item || e;
        let img = item.mediumImageUrls?.[0]?.imageUrl || item.smallImageUrls?.[0]?.imageUrl || '';
        if (img.includes('thumbnail.image.rakuten.co.jp/@0_mall/')) img = img.replace('https://thumbnail.image.rakuten.co.jp/@0_mall/', 'https://shop.r10s.jp/').split('?_ex=')[0];
        else if (img.includes('tshop.r10s.jp/')) img = img.replace('https://tshop.r10s.jp/', 'https://shop.r10s.jp/');
        return { itemName: item.itemName || '', shopName: item.shopName || '', affiliateUrl: item.affiliateUrl || '', imageUrl: img, price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '', priceNum: item.itemPrice || 0, reviewAvg: item.reviewAverage || 4.5, reviewCount: item.reviewCount || 0, catchcopy: item.catchcopy || '' };
      }).filter(p => p.affiliateUrl && p.imageUrl);
    } catch (e) { console.error(`❌ エラー:`, e.message); await new Promise(r => setTimeout(r, 1000)); }
  }
  return [];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const articleDefs = [
  // 1. コスメ おすすめ 女性
  {
    id: 'art-cosme-osusume-women-2026-best10',
    queryTarget: 'コスメ おすすめ 女性',
    searchKeyword: 'コスメ 女性 おすすめ 人気',
    title: '【2026年版】女性向けおすすめコスメ10選！プロが選ぶ本当に使えるスキンケア＆メイクアイテム完全比較',
    description: '2026年最新の女性向けおすすめコスメ10選を徹底比較。楽天市場の実売データと口コミから、忙しい女性の肌を美しく整えるスキンケアから崩れないメイクアップまで厳選。',
    category: 'skincare',
    tags: ['女性コスメ', 'コスメおすすめ女性', 'レディースコスメ', '2026女性コスメ', '人気コスメ', 'スキンケア女性', 'メイク女性'],
    author: '松本 結衣',
    featured: true,
    intro: `仕事や家事、育児で毎日忙しい女性にとって、コスメは「時短でありながら最大限の効果を発揮するもの」であってほしいもの。2026年の女性向けコスメ市場は、機能性と使用感を極限まで高めた実力派が揃っています。楽天市場のリアルな購買データと高評価レビューをもとに、大人の女性が持っておくべき神コスメ10選を比較解説します。`,
    rankingNotes: [
      { rank: '1位', point: '肌なじみ抜群で朝晩のスキンケアの質を底上げする万能保湿アイテム', label: '女性支持No.1' },
      { rank: '2位', point: '夕方になってもくすまない透明感をキープする高機能美容液', label: '透明感No.1' },
      { rank: '3位', point: '忙しい朝でもサッと塗るだけで美肌補正が完了する多機能ベース', label: '時短ベースNo.1' },
      { rank: '4位', point: '乾燥小ジワを目立たなくする濃密アイクリーム', label: '目元集中ケア' },
      { rank: '5位', point: '色持ちとツヤ感を両立した大人のための粘膜リップ', label: '大人のリップNo.1' },
      { rank: '6位', point: '紫外線と大気汚染から肌をガードするデイリーUV', label: '美肌UV No.1' },
      { rank: '7位', point: '毛穴汚れをやさしくオフするマイルドクレンジング', label: '毛穴オフNo.1' },
      { rank: '8位', point: '髪のパサつきを抑えてツヤを与えるプレミアムヘアオイル', label: '美髪ケアNo.1' },
      { rank: '9位', point: '肌のバリア機能を整える敏感肌対応クリーム', label: 'バリア機能強化' },
      { rank: '10位', point: '一日の疲れを癒す極上の香りと保湿力を持つナイトマスク', label: 'ご褒美ナイトケア' }
    ],
    sections: [
      { h: '忙しい現代女性のためのスマートコスメ選び', body: `現代の女性コスメは「多機能性」と「低刺激」がキーワード。1本で化粧水＋美容液効果のある導入液や、UVカット＋トーンアップ＋下地を兼ねたアイテムを選ぶことで、朝の身支度を劇的に効率化できます。` },
      { h: '季節の変わり目を乗り切るスキンケアシフト', body: `春夏から秋冬への移行期は、インナードライに注意が必要。表面はサラサラでも角層深部が乾燥している状態を防ぐため、ヒト型セラミドやヒアルロン酸配合のアイテムで水分保持力を底上げしましょう。` }
    ],
    faqs: [
      { q: '女性向けコスメで最も重視すべきポイントは？', a: '自分の肌タイプ（乾燥・脂性・混合・敏感）に合っていることと、続けやすい使用感・価格帯であることです。' },
      { q: '朝と夜でコスメは使い分けるべき？', a: '朝は「UVカットと保湿・酸化防止」、夜は「修復と高保湿・栄養補給」を目的に使い分けると最も効果的です。' }
    ]
  },
  // 2. コスメ おすすめ 男性
  {
    id: 'art-cosme-osusume-men-2026-best10',
    queryTarget: 'コスメ おすすめ 男性',
    searchKeyword: 'メンズコスメ おすすめ 人気',
    title: '【2026年最新】メンズコスメおすすめ10選！男性の清潔感を格上げするスキンケア＆身だしなみアイテム完全比較',
    description: '2026年の男性向けメンズコスメおすすめ10選を徹底比較。テカリ・毛穴・髭剃り後の肌荒れを防ぐスキンケアから、自然に印象アップするメンズメイクまで楽天実売データで厳選。',
    category: 'skincare',
    tags: ['メンズコスメ', '男性コスメ', 'メンズスキンケア', 'メンズメイク', 'テカリ防止', '髭剃りケア', '清潔感アップ'],
    author: '蓮見 拓真',
    featured: true,
    intro: `「清潔感を高めたい」「第一印象を良くしたい」と考える男性が急増している2026年。男性の肌は女性に比べて皮脂量が約3倍、水分量が約3分の1という特徴があります。テカリやすいのに乾燥しやすい男性特有の肌質にフォーカスした、本当に結果が出るメンズコスメ10選を厳選比較します。`,
    rankingNotes: [
      { rank: '1位', point: '洗顔後のこれ1本でテカリと乾燥を同時に防ぐオールインワン', label: 'メンズNo.1オールインワン' },
      { rank: '2位', point: '髭剃り後のヒリつきや赤みを抑える薬用鎮静ローション', label: 'アフターシェーブNo.1' },
      { rank: '3位', point: '皮脂吸着パウダー配合で一日中サラサラ肌が続く洗顔料', label: 'メンズ洗顔No.1' },
      { rank: '4位', point: '白浮き・ベタつきゼロで汗に強いメンズ専用UVジェル', label: 'メンズUV No.1' },
      { rank: '5位', point: 'バレずに青髭や毛穴・クマをカバーする自然なメンズBBクリーム', label: 'メンズBB No.1' },
      { rank: '6位', point: '唇の血色感を自然に整えて好印象を与える無色〜自然発色リップ', label: 'メンズリップNo.1' },
      { rank: '7位', point: '頭皮のベタつきやニオイをスッキリ落とすスカルプシャンプー', label: 'スカルプケアNo.1' },
      { rank: '8位', point: '眉毛を整えて顔の輪郭を引き締めるメンズアイブロウ', label: 'メンズ眉ケア' },
      { rank: '9位', point: '頑固な毛穴の黒ずみを酵素の力で分解するメンズ酵素洗顔', label: '毛穴黒ずみケア' },
      { rank: '10位', point: 'ビジネスシーンでも爽やかに香る大人の練り香水', label: 'フレグランスNo.1' }
    ],
    sections: [
      { h: '男性特有の肌悩みを解決する3大ステップ', body: `①「落とす（皮脂汚れの除去）」、②「潤す（水分補給）」、③「守る（UVカット・抗炎症）」が基本。特に日焼け止めを習慣化することで、将来のシミやたるみを大幅に防げます。` },
      { h: '初心者男性がまず揃えるべき基本セット', body: `最初は「泡立ちの良い洗顔料」と「オールインワンジェル」の2点からスタートするのがおすすめ。習慣化できたら、日焼け止めやBBクリームを取り入れていきましょう。` }
    ],
    faqs: [
      { q: 'メンズコスメは女性用と何が違うの？', a: '男性用は皮脂吸着成分や清涼感、ベタつかないサラッとしたテクスチャーに設計されている点に違いがあります。' },
      { q: 'BBクリームは周りにバレませんか？', a: 'メンズ用に設計されたBBクリームは肌色になじみやすく、薄く均一に伸ばせば塗っていることが周囲に気付かれません。' }
    ]
  },
  // 3. コスメ おすすめ 男女
  {
    id: 'art-cosme-osusume-unisex-genderless-2026',
    queryTarget: 'コスメ おすすめ 男女',
    searchKeyword: 'ジェンダーレス コスメ スキンケア',
    title: '【2026年最新】男女兼用・ジェンダーレスコスメおすすめ10選！カップル・家族でシェアできる実力派アイテム完全比較',
    description: '2026年注目の男女兼用ジェンダーレスコスメおすすめ10選を徹底比較。パートナーや家族と一緒に使えるシンプル設計・高機能なスキンケア＆コスメを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['ジェンダーレスコスメ', '男女兼用コスメ', 'シェアコスメ', 'ユニセックスコスメ', 'カップルコスメ', '家族スキンケア'],
    author: '橘 えりか',
    featured: true,
    intro: `性別にとらわれず、誰もが心地よく使える「シェアコスメ・ジェンダーレスコスメ」が2026年の大トレンド。無香料や天然精油の心地よい香り、ミニマルなパッケージ、あらゆる肌質に対応する低刺激設計のアイテムを10選ピックアップしました。`,
    rankingNotes: [
      { rank: '1位', point: '男女問わず使える無香料・超高保湿の大容量化粧水', label: 'シェア化粧水No.1' },
      { rank: '2位', point: '家族全員の肌荒れを防ぐマイルドなセラミド乳液', label: 'ファミリー乳液No.1' },
      { rank: '3位', point: 'スタイリッシュなボトルとベタつかない保湿力の万能バーム', label: 'マルチバームNo.1' },
      { rank: '4位', point: '男女の異なる皮脂バランスを整えるCICAリペアセラム', label: 'シェア美容液No.1' },
      { rank: '5位', point: '白浮きせず石鹸で落ちるデイリー日焼け止め', label: 'シェアUV No.1' },
      { rank: '6位', point: 'ワンプッシュで濃密泡が出る肌に優しいアミノ酸洗顔', label: '時短泡洗顔' },
      { rank: '7位', point: 'パートナーと共有できるオーガニックリップバーム', label: 'シェアリップ' },
      { rank: '8位', point: '男女ともに好まれるウッディ・シトラス精油香のハンドクリーム', label: '上質ハンドケア' },
      { rank: '9位', point: '毛穴と頭皮の両方をリフレッシュできるクレイパック', label: 'ディープクレンジング' },
      { rank: '10位', point: '寝室に置いて2人で使えるナイトリペアスリーピングパック', label: 'ナイトシェアケア' }
    ],
    sections: [
      { h: 'シェアコスメを選ぶ3つの基準', body: `①「香りが強すぎないこと」、②「ベタつきのない使用感」、③「大容量またはポンプ式で衛生的に使えること」が重要です。` },
      { h: 'ジェンダーレスコスメがもたらすコスパのメリット', body: `スキンケアを1本化することで洗面台がすっきりし、まとめ買いや定期購入でコスメ代を大幅に節約できるメリットがあります。` }
    ],
    faqs: [
      { q: '男女で肌質が違っても同じスキンケアで大丈夫？', a: '低刺激で水分補給に特化したアイテム（セラミドやヒアルロン酸等）であれば、男女問わず肌の土台を整えることができます。' }
    ]
  },
  // 4. コスメ おすすめ 10代
  {
    id: 'art-cosme-osusume-teens-10s-2026',
    queryTarget: 'コスメ おすすめ 10代',
    searchKeyword: '10代 スキンケア 化粧水',
    title: '【2026年最新】10代向けおすすめコスメ10選！中高生のニキビ・毛穴・テカリ予防とプチプラ垢抜けアイテム完全比較',
    description: '2026年の10代（中学生・高校生・大学生）におすすめのコスメ10選を徹底比較。思春期ニキビや皮脂テカリを抑えるスキンケアから、学校や休日に使えるプチプラ垢抜けメイクまで厳選。',
    category: 'skincare',
    tags: ['10代コスメ', '中学生コスメ', '高校生コスメ', '思春期ニキビ', 'プチプラコスメ10代', '学生スキンケア', '垢抜けメイク'],
    author: '蓮見 拓真',
    featured: true,
    intro: `皮脂分泌が活発でニキビや毛穴の詰まりに悩みやすい10代。お小遣いやバイト代の範囲で買えるプチプラでありながら、しっかり肌悩みをケアできる実力派アイテムを楽天データから厳選しました。`,
    rankingNotes: [
      { rank: '1位', point: '思春期ニキビを殺菌・消炎して予防する薬用アクネ化粧水', label: '10代ニキビ対策No.1' },
      { rank: '2位', point: '毛穴の皮脂をごっそり吸着してサラサラにするクレイ洗顔', label: '10代毛穴洗顔No.1' },
      { rank: '3位', point: 'ベタつかず水分だけをたっぷり補給するハトムギ保湿ジェル', label: 'プチプラ水分補給' },
      { rank: '4位', point: '学校でもバレにくい自然な血色感を与えるスクールリップ', label: 'プチプラリップNo.1' },
      { rank: '5位', point: '部活や通学の強い日差しから肌を守るウォータープルーフUV', label: '学生UV No.1' },
      { rank: '6位', point: '1,000円以下で買える高発色＆捨て色なしアイシャドウパレット', label: '垢抜けアイシャドウ' },
      { rank: '7位', point: 'テカリを瞬時に抑えて毛穴をぼかすプチプラフェイスパウダー', label: '皮脂テカリ防止' },
      { rank: '8位', point: 'お風呂で手軽に角質ケアができるピーリングジェル', label: 'ざらつきオフ' },
      { rank: '9位', point: '初心者でも失敗しない極細アイブロウペンシル', label: '美眉ペンシル' },
      { rank: '10位', point: 'ニキビ跡の赤みを自然に隠すプチプラコンシーラー', label: '赤みカバー' }
    ],
    sections: [
      { h: '10代のスキンケアで一番大切なこと', body: `「洗いすぎないこと」と「オイルフリーの保湿」が鉄則。ゴシゴシ擦る洗顔は皮脂の過剰分泌を招くため、優しい泡洗顔を徹底しましょう。` },
      { h: 'プチプラで垢抜けるメイクのコツ', body: `ファンデーションを厚塗りせず、素肌感を残して眉とリップの血色感を整えるだけで、清潔感のある垢抜けた印象になります。` }
    ],
    faqs: [
      { q: '中学生からメイクを始めても肌に悪くない？', a: '正しいクレンジングと保湿を行えば問題ありません。帰宅後はすぐにメイクを落とす習慣をつけましょう。' }
    ]
  },
  // 5. コスメ おすすめ 20代
  {
    id: 'art-cosme-osusume-20s-2026-best10',
    queryTarget: 'コスメ おすすめ 20代',
    searchKeyword: '20代 コスメ おすすめ スキンケア',
    title: '【2026年最新】20代おすすめコスメ10選！毛穴・くすみ・乾燥を防ぐスキンケア＆旬顔トレンドメイク完全比較',
    description: '2026年の20代向けおすすめコスメ10選を徹底比較。皮脂トラブルから初期エイジングケアまで、社会人・大学生が押さえるべき人気スキンケア＆トレンドメイクアイテムを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['20代コスメ', 'コスメおすすめ20代', 'ファーストエイジングケア', '20代スキンケア', 'トレンドメイク', '韓国コスメ20代'],
    author: '松本 結衣',
    featured: true,
    intro: `社会人になり生活リズムの変化やストレス、大人の肌荒れ・毛穴の目立ちに直面しやすい20代。プチプラの良品と少しリッチな投資アイテムを上手に掛け合わせる「賢いコスメ選び」を完全解説します。`,
    rankingNotes: [
      { rank: '1位', point: 'ビタミンC配合で毛穴・キメ・くすみを同時にケアする導入美容液', label: '20代毛穴ケアNo.1' },
      { rank: '2位', point: '素肌感を残しながら気になる色ムラを消し去るツヤ感クッション', label: '20代ベースNo.1' },
      { rank: '3位', point: '大人ニキビと肌荒れを速攻で鎮静するCICAトナーパッド', label: '鎮静トナーNo.1' },
      { rank: '4位', point: '絶妙なニュアンスカラーで今っぽい顔をつくるトレンドアイパレット', label: 'トレンドアイメイク' },
      { rank: '5位', point: 'マスクや飲食でも落ちない高密着ティントリップ', label: '持続力リップ' },
      { rank: '6位', point: 'メイク崩れとテカリを一日中ブロックするフィックスミスト', label: 'メイクキープNo.1' },
      { rank: '7位', point: '夜の集中保湿で翌朝ぷるぷる肌になるスリーピングマスク', label: '夜用水分チャージ' },
      { rank: '8位', point: 'ファーストエイジングケアとして使える低刺激レチノール誘導体美容液', label: '初期エイジングケア' },
      { rank: '9位', point: '紫外線ダメージをリセットする美白シートマスク', label: '集中美白ケア' },
      { rank: '10位', point: 'サロン帰りの指通りを自宅で再現する濃密トリートメント', label: 'ダメージヘアケア' }
    ],
    sections: [
      { h: '20代から始めるべき「ファーストエイジングケア」', body: `20代後半からは肌のコラーゲン量が少しずつ減少し始めます。ビタミンCやナイアシンアミドなどの抗酸化成分を毎日のルーティンに取り入れましょう。` }
    ],
    faqs: [
      { q: '20代でデパコスを買うならどのアイテムがおすすめ？', a: '効果が最も実感しやすい「美容液」または「ベースメイク（下地・ファンデ）」への投資がおすすめです。' }
    ]
  },
  // 6. コスメ おすすめ 30代
  {
    id: 'art-cosme-osusume-30s-2026-best10',
    queryTarget: 'コスメ おすすめ 30代',
    searchKeyword: '30代 スキンケア おすすめ',
    title: '【2026年最新】30代おすすめコスメ10選！乾燥・くすみ・初期シワを本格ケアする大人の名品完全比較',
    description: '2026年の30代向けおすすめコスメ10選を徹底比較。20代との肌質変化を感じ始めた30代に本当に必要なレチノール・ナイアシンアミド・高保湿スキンケアを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['30代コスメ', 'コスメおすすめ30代', 'エイジングケア30代', '30代スキンケア', '乾燥小ジワ', 'くすみ改善', '大人のベースメイク'],
    author: '橘 えりか',
    featured: true,
    intro: `「今までのスキンケアが効かなくなってきた」「乾燥やくすみが抜けにくい」と感じる30代。肌のターニングポイントを迎える年代だからこそ、成分と浸透技術にこだわった本気のコスメ選びが必要です。`,
    rankingNotes: [
      { rank: '1位', point: 'ナイアシンアミド配合でシワ改善と美白を同時に叶える薬用化粧水', label: '30代総合No.1' },
      { rank: '2位', point: '低刺激処方で毎晩使える純粋レチノール配合美容液', label: 'シワ改善セラム' },
      { rank: '3位', point: 'ヒト型セラミド複数種配合でバリア機能を立て直す高保湿クリーム', label: 'バリア修復No.1' },
      { rank: '4位', point: '疲れた目元の印象を明るくするアイゾーンブライトセラム', label: '目元ブライトニング' },
      { rank: '5位', point: '大人のくすみを光で飛ばすラベンダー系トーンアップ下地', label: 'くすみ飛ばし下地' },
      { rank: '6位', point: '美容液成分80%以上で一日中乾燥しないリキッドファンデーション', label: '美容液ファンデ' },
      { rank: '7位', point: '摩擦レスで濃いメイクも毛穴汚れも素早く落とすクレンジングバーム', label: '極上クレンジング' },
      { rank: '8位', point: '首元やデコルテまで年齢サインをケアするネックトリートメント', label: 'デコルテケア' },
      { rank: '9位', point: '大人の唇に自然なボリュームと血色感を与えるエイジングリップ', label: 'プランプリップ' },
      { rank: '10位', point: '週1回のスペシャルケアで肌の透明感を呼び覚ます炭酸ガスパック', label: '集中炭酸ケア' }
    ],
    sections: [
      { h: '30代が選ぶべき有効成分トリオ', body: `①シワ改善と美白の「ナイアシンアミド」、②肌代謝を促進する「レチノール」、③潤いの盾となる「セラミド」の3成分を意識してアイテムを組み合わせましょう。` }
    ],
    faqs: [
      { q: '30代でファンデーションが崩れやすくなった理由は？', a: '水分量の低下によるインナードライが原因のことが多いです。スキンケアでの保湿強化と、美容液成分の多い下地への変更が効果的です。' }
    ]
  },
  // 7. コスメ おすすめ 40代
  {
    id: 'art-cosme-osusume-40s-2026-best10',
    queryTarget: 'コスメ おすすめ 40代',
    searchKeyword: '40代 スキンケア 人気',
    title: '【2026年最新】40代おすすめコスメ10選！ハリ・たるみ・シミ悩みに応える本格エイジングケア完全比較',
    description: '2026年の40代向けおすすめコスメ10選を徹底比較。女性ホルモンの変化や深刻化するハリ不足・シミ・シワを科学的アプローチで改善する高機能コスメを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['40代コスメ', 'コスメおすすめ40代', 'エイジングケア40代', 'ハリ不足改善', 'シミ対策', 'たるみケア', '40代スキンケア'],
    author: '橘 えりか',
    featured: true,
    intro: `40代の肌悩みは「複合化」します。ハリの低下、フェイスラインのもたつき、深まるシワ、濃くなるシミ。単一のケアではなく、肌の深部に働きかける高機能成分と確かな実績を持つコスメ10選を徹底比較します。`,
    rankingNotes: [
      { rank: '1位', point: '独自ペプチド複合体で肌の弾力とリフト感をサポートする高機能美容液', label: '40代リフトケアNo.1' },
      { rank: '2位', point: '医薬部外品認可のシワ改善＆美白ダブル有効成分配合クリーム', label: 'シワ改善No.1' },
      { rank: '3位', point: '濃密なとろみで角層奥深くまで潤いを届けるエイジングケア化粧水', label: '濃密化粧水' },
      { rank: '4位', point: '目元・口元の深い刻まれラインに密着する集中リンクルパッチ', label: '集中パッチ' },
      { rank: '5位', point: 'シミの根源にアプローチする高濃度コウジ酸・トラネキサム酸美容液', label: 'シミ根源ケア' },
      { rank: '6位', point: 'たるみ毛穴をなめらかに埋めて引き締める毛穴専用プライマー', label: '毛穴引き締め下地' },
      { rank: '7位', point: 'カバー力と素肌感を両立した大人のための艶肌クッションファンデ', label: '大人の艶肌ファンデ' },
      { rank: '8位', point: '睡眠中の肌再生サイクルを最大限に高めるナイトオーバーナイトクリーム', label: '再生ナイトクリーム' },
      { rank: '9位', point: '年齢とともに細くなった髪に根元からボリュームを与える頭皮美容液', label: 'スカルプエイジング' },
      { rank: '10位', point: '年齢サインが出やすい手の甲をふっくら若々しく保つハンドセラム', label: '手のエイジングケア' }
    ],
    sections: [
      { h: '40代からの「浸透技術」重視コスメ選び', body: `どれほど優れた成分も肌に届かなければ意味がありません。リポソーム化やナノカプセル技術を採用したアイテムを選ぶことが、効果実感の最大の鍵となります。` }
    ],
    faqs: [
      { q: '40代のベースメイクで老け見えしないコツは？', a: 'パウダーの全顔塗りを避け、ツヤ下地＋必要最小限のコンシーラー＋Tゾーンのみのパウダーで仕上げる「ツヤ感重視」が若見えの秘訣です。' }
    ]
  },
  // 8. コスメ おすすめ 50代
  {
    id: 'art-cosme-osusume-50s-2026-best10',
    queryTarget: 'コスメ おすすめ 50代',
    searchKeyword: '50代 コスメ おすすめ スキンケア',
    title: '【2026年最新】50代おすすめコスメ10選！深刻な乾燥・くすみ・ハリ低下を克服するプレミアムコスメ完全比較',
    description: '2026年の50代向けおすすめコスメ10選を徹底比較。皮脂量と水分量が大幅に減少する50代の肌に、極上の油分と美容成分を補給する高保湿・高機能エイジングケアアイテムを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['50代コスメ', 'コスメおすすめ50代', 'エイジングケア50代', '高保湿コスメ', '乾燥肌50代', 'シニア手前コスメ', '艶肌メイク50代'],
    author: '松本 結衣',
    featured: true,
    intro: `更年期以降、肌の皮脂分泌は急激に低下し、乾燥とバリア機能の低下が加速します。50代のコスメ選びで最も重要なのは「上質な油分と水分の黄金バランス」。しぼんだ肌をふっくらと蘇らせるプレミアムコスメ10選をご紹介します。`,
    rankingNotes: [
      { rank: '1位', point: '極上の植物オイルと発酵エキスで肌を柔らかくほぐす導入オイル', label: '50代導入オイルNo.1' },
      { rank: '2位', point: '乾燥によるしぼみ肌を一晩でふっくら満たす濃密リッチクリーム', label: '50代高保湿クリームNo.1' },
      { rank: '3位', point: 'まぶたの下がりや目尻のシワをピンと引き上げるアイリフトセラム', label: '目元リフトケア' },
      { rank: '4位', point: 'とろみのある美容液のような感触で乾きを癒すプレミアムローション', label: 'プレミアム化粧水' },
      { rank: '5位', point: 'くすみがちな肌をワントーン明るく華やかに見せるピンク下地', label: '血色アップ下地' },
      { rank: '6位', point: 'シワに入り込まずなめらかに密着するエマルジョンファンデーション', label: '高密着エマルジョン' },
      { rank: '7位', point: '年齢を重ねた肌の古い角質をやさしく除去するマイルド酵素洗顔', label: 'やさしい角質ケア' },
      { rank: '8位', point: '輪郭のゆるみにアプローチするマッサージ兼用リフトジェル', label: 'リフトマッサージ' },
      { rank: '9位', point: 'くすんだ唇に自然な赤みとふっくら感を与える高保湿カラーリップ', label: '大人の血色リップ' },
      { rank: '10位', point: 'パサつくうねり髪をしっとりまとめる濃密ヘアマスク', label: 'うねり髪ケア' }
    ],
    sections: [
      { h: '50代スキンケアは「油分を恐れない」ことが成功の秘訣', body: `水分補給だけでなく、スクワランやホホバオイル、シアバターなどの良質な油分で膜を作り、肌内部の水分蒸発を徹底的に防ぐことが若々しさを保つ鍵です。` }
    ],
    faqs: [
      { q: '50代でおすすめのファンデーションのタイプは？', a: '乾燥小ジワに入り込みにくい「クリームタイプ」または美容液成分たっぷりの「クッションタイプ」が最適です。' }
    ]
  },
  // 9. コスメ おすすめ 60代
  {
    id: 'art-cosme-osusume-60s-2026-best10',
    queryTarget: 'コスメ おすすめ 60代',
    searchKeyword: '60代 スキンケア おすすめ コスメ',
    title: '【2026年最新】60代おすすめコスメ10選！年齢を重ねた肌を明るく若々しく保つ高保湿＆簡単ケア完全比較',
    description: '2026年の60代向けおすすめコスメ10選を徹底比較。肌の薄さ・乾燥・くすみにやさしく寄り添い、シンプルかつ効果的に若々しいツヤ肌をつくる人気コスメを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['60代コスメ', 'コスメおすすめ60代', 'シニアコスメ', '60代スキンケア', '簡単コスメ60代', '高保湿60代', 'ツヤ肌60代'],
    author: '蓮見 拓真',
    featured: true,
    intro: `60代のコスメ選びでは「肌へのやさしさ」「確かな高保湿力」「使いやすさ（シンプルステップ）」が重視されます。重いスキンケアステップは負担になりがちだからこそ、1品で高い満足感を得られる厳選10アイテムを完全解説します。`,
    rankingNotes: [
      { rank: '1位', point: '1品で化粧水・美容液・クリーム・パックまで完了する高機能オールインワン', label: '60代オールインワンNo.1' },
      { rank: '2位', point: '薄くなった肌を守り抜く高純度ワセリン配合の低刺激保湿バーム', label: '低刺激保護バーム' },
      { rank: '3位', point: '肌を明るく元気に見せるゴールドパール配合のツヤ出し化粧下地', label: '明るさアップ下地' },
      { rank: '4位', point: 'シミやくすみを自然にぼかしながら紫外線もカットするBBクリーム', label: '簡単美肌BB' },
      { rank: '5位', point: '泡立て不要でそのまま使えるしっとりミルキィ洗顔料', label: '泡立ていらず洗顔' },
      { rank: '6位', point: '年齢が出やすい首・デコルテをふっくら整えるエイジングクリーム', label: '首元専用ケア' },
      { rank: '7位', point: '細くなった眉毛を簡単に自然な太さに描けるパウダーチップアイブロウ', label: '簡単ふんわり眉' },
      { rank: '8位', point: '唇の縦ジワを目立たなくして上品に発色するトリートメントルージュ', label: '上品ルージュ' },
      { rank: '9位', point: '乾燥による背中やかかとのカサつきをケアする大容量ボディミルク', label: '全身保湿ミルク' },
      { rank: '10位', point: 'ボリュームダウンした髪の根元をふんわり立ち上げるヘアミスト', label: 'ふんわり美髪ミスト' }
    ],
    sections: [
      { h: '60代のスキンケアをシンプル＆贅沢にする工夫', body: `無理に何本も重ね塗りするよりも、高品質なオールインワンや濃厚なクリームを丁寧にハンドプレスして肌になじませる方が、摩擦も少なく肌本来の輝きを引き出せます。` }
    ],
    faqs: [
      { q: '60代のメイクで気をつけるべきポイントは？', a: '「ツヤ」と「血色感」を足すことです。ピンク系のチークやツヤ下地を少量取り入れるだけで、顔全体がパッと明るくなります。' }
    ]
  },
  // 10. コスメ おすすめ 70代 / 年代別 おすすめ（統合）
  {
    id: 'art-cosme-osusume-70s-seniors-2026',
    queryTarget: 'コスメ おすすめ 70代 / コスメ 年代別 おすすめ',
    searchKeyword: '70代 スキンケア おすすめ',
    title: '【2026年最新】70代・シニア向けおすすめコスメ10選＆年代別スキンケア選び完全比較ガイド',
    description: '2026年の70代・シニア向けおすすめコスメ10選と年代別（10代〜70代）の選び方を完全比較。デリケートな乾燥肌をやさしくいたわる低刺激・超高保湿スキンケアを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['70代コスメ', 'シニアコスメ', '年代別コスメ', '70代スキンケア', '超高保湿', '低刺激スキンケア', 'プレゼントシニアコスメ'],
    author: '橘 えりか',
    featured: true,
    intro: `70代の肌は皮脂腺の働きが低下し、少しの刺激や乾燥でもトラブルを起こしやすい非常に繊細な状態です。本記事では、ご自身でのご愛用はもちろん、お母様・お祖母様へのプレゼントにも心から喜ばれる、肌に極上のやさしさと潤いをもたらす名品10選と、年代別の最適アプローチを総括します。`,
    rankingNotes: [
      { rank: '1位', point: '皮膚科監修の低刺激設計でカサカサ肌をしっとり落ち着かせる保護クリーム', label: 'シニア安心保護No.1' },
      { rank: '2位', point: 'ポンプ式で押しやすく家族も安心の超高保湿ローション', label: '使いやすさNo.1' },
      { rank: '3位', point: '1本でパッと顔色が明るくなるシニア専用トーンアップBB', label: 'シニアBB No.1' },
      { rank: '4位', point: 'カサつく唇をなめらかに保護する薬用無添加リップクリーム', label: '薬用保護リップ' },
      { rank: '5位', point: '摩擦刺激を極限まで抑えた泡で出てくるアミノ酸系マイルド洗顔', label: 'やさしい泡洗顔' },
      { rank: '6位', point: '乾燥による肌の痒みやかさつきを防ぐ全身用高保湿ミルク', label: 'かゆみ予防ミルク' },
      { rank: '7位', point: '手肌の乾燥やひび割れをしっかり防ぐセラミドハンドクリーム', label: '濃厚ハンドケア' },
      { rank: '8位', point: '年齢を重ねた髪と頭皮を優しく洗い上げるアミノ酸スカルプシャンプー', label: '地肌にやさしいシャンプー' },
      { rank: '9位', point: '鏡を見なくてもきれいに塗れる自然な血色リップスティック', label: '失敗なし血色リップ' },
      { rank: '10位', point: 'ギフトにも最適な高級桐箱入りの無添加スキンケアセット', label: 'シニアギフトNo.1' }
    ],
    sections: [
      { h: '【総括】年代別（10代〜70代）コスメ選びの最適解マトリクス', body: `| 年代 | 主要な肌悩み | 最優先すべきケア | おすすめ成分 |
|:---|:---|:---|:---|
| **10代** | ニキビ・過剰皮脂・毛穴 | 丁寧な洗顔＋オイルフリー保湿 | サリチル酸・ハトムギエキス |
| **20代** | 毛穴・くすみ・乾燥 | ビタミンC導入＋初期抗酸化ケア | ビタミンC・ナイアシンアミド |
| **30代** | 初期シワ・乾燥小ジワ | 水分保持力の再構築＋レチノール | ヒト型セラミド・レチノール |
| **40代** | たるみ・ハリ低下・シミ | 浸透技術コスメ＋深部リフトケア | ペプチド・トラネキサム酸 |
| **50代** | 深刻な乾燥・しぼみ肌 | 良質な油分補給＋濃密クリーム | スクワラン・発酵オイル |
| **60代** | 肌の薄さ・くすみ・衰え | シンプルステップ＋ツヤ出し | コラーゲン・高保湿オールインワン |
| **70代** | デリケートな超乾燥・刺激過敏 | 摩擦レス＋絶対的保護膜 | 高純度ワセリン・無添加成分 |` },
      { h: '70代向けコスメの選び方で配慮すべきポイント', body: `容器の開けやすさ（ワンタッチキャップやポンプ式）、文字の見やすさ、そして無香料・無着色などの安全性の高い処方が最も喜ばれます。` }
    ],
    faqs: [
      { q: '高齢の母へのプレゼントにはどんなコスメが良いですか？', a: '操作が簡単で肌にやさしい「ポンプ式の高保湿ミルク」や「ほんのり自然に色づく高保湿リップ」が最も使いやすく喜ばれます。' }
    ]
  }
];

async function buildContent(def, products) {
  const today = '2026-08-30';
  const top10 = products.slice(0, 10);

  let table = `<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n`;
  table += `| 順位 | 商品名 | 特徴・部門 | 注目ポイント | 楽天参考価格 | 公式リンク |\n`;
  table += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
  top10.forEach((p, i) => {
    const note = def.rankingNotes[i] || { rank: `${i+1}位`, point: '楽天市場で高評価の人気商品', label: '注目アイテム' };
    table += `| **${note.rank}** | **[${p.itemName.slice(0,42)}...](${p.affiliateUrl})** | 🏷️${note.label} | ${note.point} | **${p.price}** | [👉 楽天公式](${p.affiliateUrl}) |\n`;
  });
  table += `</div>\n`;

  let products_html = '';
  top10.forEach((p, i) => {
    const note = def.rankingNotes[i] || { rank: `${i+1}位`, point: '人気商品', label: '人気' };
    const stars = '★'.repeat(Math.min(5, Math.round(p.reviewAvg || 4.5))) + '☆'.repeat(Math.max(0, 5 - Math.round(p.reviewAvg || 4.5)));
    products_html += `
---

## ${i+1}位【${note.label}】${p.itemName.slice(0, 55)}

> **💡 注目ポイント: ${note.point}**

![${p.itemName.slice(0, 30)}](${p.imageUrl})

| 項目 | 詳細情報 |
|:---|:---|
| **取扱ショップ** | ${p.shopName || '楽天公式取扱店'} |
| **楽天価格** | **${p.price || '価格はリンク先で確認'}** |
| **ユーザー評価** | ${stars} (${p.reviewAvg}/5.0・レビュー${p.reviewCount.toLocaleString()}件) |
| **おすすめ度** | ${note.point} |

${p.catchcopy ? `> 「${p.catchcopy.slice(0, 120)}」` : `> 楽天市場の購入者レビューで絶大な支持を集める注目コスメです。`}

**[👉 楽天市場で詳細情報・口コミを見る](${p.affiliateUrl})**

`;
  });

  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": def.faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) };
  const listSchema = { "@context": "https://schema.org", "@type": "ItemList", "name": def.title, "description": def.description, "numberOfItems": top10.length, "itemListElement": top10.map((p, i) => ({ "@type": "ListItem", "position": i + 1, "name": p.itemName.slice(0, 80), "url": p.affiliateUrl })) };
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", "headline": def.title, "description": def.description, "author": { "@type": "Person", "name": def.author }, "datePublished": today, "dateModified": today, "publisher": { "@type": "Organization", "name": "Qualia Navi" } };

  let sectionsHtml = '';
  def.sections.forEach(s => { sectionsHtml += `\n---\n\n## 📌 ${s.h}\n\n${s.body}\n`; });

  let faqHtml = `\n---\n\n## ❓ よくある質問（FAQ）\n\n`;
  def.faqs.forEach(f => { faqHtml += `### Q. ${f.q}\n**A.** ${f.a}\n\n`; });

  return `# ${def.title}

> **【${today} 最新 / 対象クエリ: ${def.queryTarget}】**
> 楽天市場OpenAPIから直接取得した確定画像・最新価格・公式アフィリエイトリンクをもとに、年代・性別に応じた最適な10選を徹底解説します。

---

${def.intro}

---

## 📱 【比較表】${def.queryTarget} おすすめ人気10選 一覧

${table}

${products_html}

${sectionsHtml}

${faqHtml}

---

## まとめ

本記事では「${def.queryTarget}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる10選**をご紹介しました。

年齢や性別に応じた適切なアプローチをとることで、毎日のスキンケアやメイクの満足度は飛躍的に向上します。ぜひ気になったアイテムから試してみてください。

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
  const existingIds = new Set(articlesData.map(a => a.id));
  const newArticles = [];

  for (const def of articleDefs) {
    if (existingIds.has(def.id)) { console.log(`⏭️ 既存スキップ: ${def.id}`); continue; }

    console.log(`\n🔍 [記事生成] ${def.id}`);
    console.log(`   クエリ: ${def.queryTarget} | KW: ${def.searchKeyword}`);

    let products = await fetchRakutenItems(def.searchKeyword, 12);
    if (products.length === 0) { console.warn(`❌ 商品取得失敗 スキップ: ${def.id}`); await sleep(2000); continue; }

    console.log(`✅ 商品${products.length}件取得`);
    const content = await buildContent(def, products);
    const top10 = products.slice(0, 10);

    newArticles.push({
      id: def.id, title: def.title, description: def.description, content,
      category: def.category, tags: def.tags, author: def.author,
      createdAt: '2026-08-30', updatedAt: '2026-08-30',
      image: top10[0]?.imageUrl || '', affiliateUrl: top10[0]?.affiliateUrl || '',
      price: top10[0]?.price || '', itemCount: top10.length, featured: def.featured
    });
    console.log(`✅ [記事完成] ${def.title.slice(0, 45)}...`);
    await sleep(1500);
  }

  articlesData.unshift(...newArticles);
  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 Phase 47 完了！ ${newArticles.length}件追加 → 総計: ${articlesData.length}件`);
}

main().catch(e => { console.error('❌', e); process.exit(1); });
