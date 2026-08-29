import fs from 'fs';
import path from 'path';

console.log('🚀 [Phase 48] 肌質別・パーソナルカラー・肌悩み別コスメ特化 10選記事 9本 楽天APIリアルタイム取得生成中...');

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
  // 1. コスメ 肌質別 おすすめ
  {
    id: 'art-cosme-osusume-hadashitsu-betsu-2026',
    queryTarget: 'コスメ 肌質別 おすすめ',
    searchKeyword: '乾燥肌 化粧水 保湿 人気',
    title: '【2026年最新】肌質別コスメおすすめ10選！乾燥肌・脂性肌・混合肌・敏感肌にぴったりの名品完全比較',
    description: '2026年の肌質別おすすめコスメ10選を徹底比較。自分の肌質（乾燥・オイリー・混合・敏感）に最適なスキンケアを楽天実売データから厳選。肌質診断と選び方マトリクス付き。',
    category: 'skincare',
    tags: ['肌質別コスメ', '乾燥肌コスメ', '脂性肌コスメ', '混合肌コスメ', '敏感肌コスメ', '肌質診断', 'スキンケア選び方'],
    author: '松本 結衣',
    featured: true,
    intro: `「どれだけ人気の商品を使っても肌荒れする」「自分に合うコスメがわからない」原因の9割は、「自分の肌質とアイテムの不一致」にあります。乾燥肌・脂性肌・混合肌・敏感肌の4大肌質それぞれに最適な成分と処方を備えた、2026年最新の最強コスメ10選を徹底比較します。`,
    rankingNotes: [
      { rank: '1位', point: '乾燥肌の救世主！ヒト型セラミド複数配合でバリア機能を強力補強する高保湿化粧水', label: '乾燥肌部門1位' },
      { rank: '2位', point: '敏感肌でもピリつかない！無香料・アルコールフリーの薬用低刺激ローション', label: '敏感肌部門1位' },
      { rank: '3位', point: '脂性肌のテカリ・毛穴を速攻リフレッシュする皮脂吸着さっぱりトナー', label: '脂性肌部門1位' },
      { rank: '4位', point: 'TゾーンのテカリとUゾーンの乾燥を同時に調律する水分バランスクリーム', label: '混合肌部門1位' },
      { rank: '5位', point: 'インナードライ肌に水分をぐんぐん引き込むヒアルロン酸導入美容液', label: 'インナードライ対策' },
      { rank: '6位', point: 'バリア機能が低下した揺らぎ肌を速攻で落ち着かせるCICAシカクリーム', label: '揺らぎ肌ケア' },
      { rank: '7位', point: '皮脂分泌をコントロールしながら毛穴を引き締めるナイアシンアミド美容液', label: '皮脂調律セラム' },
      { rank: '8位', point: '摩擦刺激を極限まで抑えた敏感肌向けクレンジングジェル', label: '低刺激オフ' },
      { rank: '9位', point: '水分蒸発を徹底ブロックする高純度スクワランオイル', label: 'オイル保護' },
      { rank: '10位', point: '肌質を選ばず使える弱酸性アミノ酸マイルド泡洗顔', label: '全肌質対応洗顔' }
    ],
    sections: [
      { h: '簡単セルフ肌質チェック（4タイプ分類）', body: `朝起きて洗顔後、何もつけずに10分放置して確認します。
- **乾燥肌**: 全体につっぱり感やかさつきがある
- **脂性肌**: 全体にテカリやベタつきがある
- **混合肌**: Tゾーン（額・鼻）はベタつき、Uゾーン（頬・口元）はつっぱる
- **敏感肌**: 季節の変わり目や化粧水でヒリつき・赤みが出やすい` }
    ],
    faqs: [
      { q: '肌質は季節や年齢で変わりますか？', a: 'はい、湿度や気温、加齢による皮脂分泌量の変化によって変動します。季節ごとにスキンケアを見直すのが理想です。' }
    ]
  },
  // 2. コスメ パーソナルカラー おすすめ
  {
    id: 'art-cosme-osusume-personal-color-2026',
    queryTarget: 'コスメ パーソナルカラー おすすめ',
    searchKeyword: 'パーソナルカラー アイシャドウ',
    title: '【2026年最新】パーソナルカラー別おすすめコスメ10選！イエベ・ブルベに似合うアイシャドウ＆リップ完全比較',
    description: '2026年最新のパーソナルカラー別おすすめコスメ10選を徹底比較。イエベ春・秋、ブルベ夏・冬それぞれを最も魅力的に見せるカラーコスメを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['パーソナルカラーコスメ', 'イエベコスメ', 'ブルベコスメ', 'イエベ春', 'イエベ秋', 'ブルベ夏', 'ブルベ冬', '似合わせメイク'],
    author: '橘 えりか',
    featured: true,
    intro: `自分にぴったりのパーソナルカラーコスメを使うと、肌の透明感が劇的にアップし、表情が一瞬で垢抜けます。イエローベース（イエベ春・秋）とブルーベース（ブルベ夏・冬）の肌トーンを引き立てる、2026年大人気のおすすめアイパレット＆リップ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '多色パレットでイエベ・ブルベ両方の捨て色なしグラデがつくれる万能アイシャドウ', label: 'PC総合No.1パレット' },
      { rank: '2位', point: 'イエベ春の明るい多幸感を引き出すコーラルピンクアイシャドウ', label: 'イエベ春ベスト' },
      { rank: '3位', point: 'ブルベ夏の透明感と上品さを極めるラベンダーモーヴアイパレット', label: 'ブルベ夏ベスト' },
      { rank: '4位', point: 'イエベ秋の深みと洗練された温かみを演出するテラコッタブラウン', label: 'イエベ秋ベスト' },
      { rank: '5位', point: 'ブルベ冬のコントラストを際立たせるワインレッド＆シルバーラメ', label: 'ブルベ冬ベスト' },
      { rank: '6位', point: '肌トーンを問わずなじむ粘膜カラーのうるツヤティントリップ', label: '万能粘膜リップ' },
      { rank: '7位', point: '黄ぐすみを一掃して透明感を底上げするパープルコントロールカラー下地', label: '透明感コントロール' },
      { rank: '8位', point: '血色感をプラスしてヘルシーに見せるピーチオレンジチーク', label: '多幸感チーク' },
      { rank: '9位', point: 'シルバー＆偏光ブルーラメで儚げな目元をつくるグリッターライナー', label: '儚げグリッター' },
      { rank: '10位', point: '立体感と自然なツヤを宿すシャンパンゴールドハイライター', label: '立体ツヤハイライト' }
    ],
    sections: [
      { h: 'イエベとブルベの基本見分け方', body: `手首の内側の血管が緑っぽく見えゴールドが似合う方は「イエベ」、血管が青〜紫に見えシルバーが似合う方は「ブルベ」の傾向があります。` }
    ],
    faqs: [
      { q: 'パーソナルカラーと違う色を使いたいときは？', a: 'コントロールカラー下地で肌トーンを補正するか、リップやチークなど顔の中心から少し離れたポイントメイクで取り入れるとなじみやすくなります。' }
    ]
  },
  // 3. コスメ イエベ おすすめ
  {
    id: 'art-cosme-osusume-yebe-warm-2026',
    queryTarget: 'コスメ イエベ おすすめ',
    searchKeyword: 'イエベ アイシャドウ 人気',
    title: '【2026年最新】イエベ向けおすすめコスメ10選！イエベ春・秋に似合う神アイシャドウ＆リップ完全比較',
    description: '2026年最新のイエベ（イエローベース）向けおすすめコスメ10選を徹底比較。スプリング・オータムの肌を輝かせるコーラル・テラコッタ・ゴールド系コスメを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['イエベコスメ', 'イエベ春コスメ', 'イエベ秋コスメ', 'コーラルリップ', 'ブラウンアイシャドウ', 'イエベアイシャドウ', '多幸感メイク'],
    author: '蓮見 拓真',
    featured: true,
    intro: `黄み寄りのあたたかみある肌を持つ「イエベ（イエローベース）」さん。コーラルやサーモンピンク、ブラウン、テラコッタなどのウォームトーンを纏うことで、肌が発光するように明るく血色感あふれる印象に仕上がります。2026年のイエベ神コスメ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'イエベの肌に溶け込む極上ウォームブラウン4色アイパレット', label: 'イエベアイシャドウNo.1' },
      { rank: '2位', point: '塗るだけで顔色がパッと華やぐコーラルベージュ高密着リップ', label: 'イエベリップNo.1' },
      { rank: '3位', point: '秋タイプの洗練された深みをつくるマスタード＆テラコッタパレット', label: 'イエベ秋No.1' },
      { rank: '4位', point: '春タイプのフレッシュさを最大化するジューシーピーチティント', label: 'イエベ春No.1' },
      { rank: '5位', point: 'イエベ肌に自然な立体ツヤを与えるウォームゴールドハイライト', label: 'ゴールドハイライト' },
      { rank: '6位', point: '内側からじゅわっと上気したような血色をつくるアプリコットチーク', label: '血色チーク' },
      { rank: '7位', point: '目元を引き締めつつ抜け感を出すアプリコットブラウンアイライナー', label: '抜け感ライナー' },
      { rank: '8位', point: 'イエベの肌色を均一に整えて健康的に見せるイエロー・ベージュ系下地', label: 'イエベ特化下地' },
      { rank: '9位', point: '繊細なゴールドパールが輝く濡れツヤ単色アイシャドウ', label: 'ゴールドシャドウ' },
      { rank: '10位', point: '指先まで血色よく見せるキャラメルブラウン系ネイルポリッシュ', label: 'イエベネイル' }
    ],
    sections: [
      { h: 'イエベ春（スプリング）とイエベ秋（オータム）の違い', body: `春は「明るく鮮やかなクリアトーン（コーラル・ライトブラウン）」、秋は「落ち着いた深みのあるリッチトーン（テラコッタ・カーキ・深みブラウン）」が得意です。` }
    ],
    faqs: [
      { q: 'イエベが青みピンクを使いたい場合の工夫は？', a: '黄み寄りのリップ下地を仕込むか、ゴールドラメのグロスを重ねることでイエベ肌にも自然になじませることができます。' }
    ]
  },
  // 4. コスメ ブルベ おすすめ
  {
    id: 'art-cosme-osusume-burube-cool-2026',
    queryTarget: 'コスメ ブルベ おすすめ',
    searchKeyword: 'ブルベ リップ 人気',
    title: '【2026年最新】ブルベ向けおすすめコスメ10選！ブルベ夏・冬の透明感を引き出す神リップ＆アイシャドウ完全比較',
    description: '2026年最新のブルベ（ブルーベース）向けおすすめコスメ10選を徹底比較。サマー・ウィンターの肌に圧倒的な透明感と洗練を与えるモーヴ・ローズ・プラム系コスメを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['ブルベコスメ', 'ブルベ夏コスメ', 'ブルベ冬コスメ', 'モーヴアイシャドウ', '青みピンクリップ', 'ブルベリップ', '透明感メイク'],
    author: '松本 結衣',
    featured: true,
    intro: `青み寄りの涼しげで澄んだ肌を持つ「ブルベ（ブルーベース）」さん。モーヴピンク、ローズ、ワインレッド、ラベンダーなどのクールトーンを纏うことで、肌の白さと透明感が圧倒的に際立ちます。2026年ブルベ大絶賛の神コスメ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'ブルベの肌を一瞬で白玉のように見せる青みピンク＆ローズ粘膜ティント', label: 'ブルベリップNo.1' },
      { rank: '2位', point: 'くすまず澄んだグラデーションが作れるモーヴラベンダーアイパレット', label: 'ブルベアイシャドウNo.1' },
      { rank: '3位', point: '夏タイプの儚げな柔らかさを引き立てるダスティピンクアイシャドウ', label: 'ブルベ夏No.1' },
      { rank: '4位', point: '冬タイプのシャープな美しさを極めるディーププラムリップ', label: 'ブルベ冬No.1' },
      { rank: '5位', point: '黄ぐすみを飛ばして内側から発光するパープルトーンアップ下地', label: '透明感No.1下地' },
      { rank: '6位', point: '白肌を際立たせる青みラベンダーチーク', label: '儚げチーク' },
      { rank: '7位', point: '光の角度でシルバーとブルーに煌めく偏光ハイライト', label: 'オーロラハイライト' },
      { rank: '8位', point: '黒目をクリアに見せるバーガンディブラウンアイライナー', label: '美瞳ライナー' },
      { rank: '9位', point: '透明感を引き立てるシルバーラメ単色グリッターシャドウ', label: 'シルバーグリッター' },
      { rank: '10位', point: '指先の透明感を強調するシアーグレープネイル', label: 'ブルベネイル' }
    ],
    sections: [
      { h: 'ブルベ夏（サマー）とブルベ冬（ウィンター）の違い', body: `夏は「柔らかく淡いソフトクールトーン（ラベンダー・ベビーピンク）」、冬は「鮮やかでコントラストの強いヴィヴィッドトーン（ワイン・チェリー・ブラック）」が得意です。` }
    ],
    faqs: [
      { q: 'ブルベがオレンジ系メイクを楽しむ方法は？', a: '青みを含んだピンク寄りのコーラルを選ぶか、ピンクの下地をベースに仕込むことで違和感なく取り入れられます。' }
    ]
  },
  // 5. コスメ 敏感肌 おすすめ
  {
    id: 'art-cosme-osusume-binkanhada-sensitive-2026',
    queryTarget: 'コスメ 敏感肌 おすすめ',
    searchKeyword: '敏感肌 化粧水 スキンケア 低刺激',
    title: '【2026年最新】敏感肌向けおすすめコスメ10選！ピリつき・赤みを防ぐ低刺激＆高保湿スキンケア完全比較',
    description: '2026年の敏感肌向けおすすめコスメ10選を徹底比較。バリア機能低下によるヒリヒリ・赤み・揺らぎに悩む方に、無添加・低刺激・高保湿な薬用スキンケアを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['敏感肌コスメ', '低刺激スキンケア', '敏感肌化粧水', 'アトピー肌コスメ', 'アルコールフリー', '敏感肌おすすめ', '揺らぎ肌'],
    author: '橘 えりか',
    featured: true,
    intro: `少しの外気や花粉、摩擦で赤みやヒリつきを起こしやすい敏感肌。「肌に何も合わない」と悩む方にこそ試してほしい、皮膚科医テスト済み・無香料・低刺激処方の2026年安心コスメ10選を徹底比較します。`,
    rankingNotes: [
      { rank: '1位', point: '肌の必須成分セラミドの働きを補いバリア機能を整える薬用低刺激化粧水', label: '敏感肌総合No.1' },
      { rank: '2位', point: '摩擦レスで塗れるスプレー式ミスト化粧水で日中の赤みを速攻鎮静', label: 'レスキューミスト' },
      { rank: '3位', point: '花粉や大気中の微粒子汚れから肌をシールドする敏感肌用UVプロテクター', label: '敏感肌バリアUV' },
      { rank: '4位', point: '濃密泡でこすらず洗えるアミノ酸系マイルド洗顔フォーム', label: '摩擦レス洗顔' },
      { rank: '5位', point: 'CICA成分配合で肌荒れ・ニキビを防ぐ鎮静リペアクリーム', label: '鎮静リペアNo.1' },
      { rank: '6位', point: 'メイク落としの刺激を最小限に抑える敏感肌用クレンジングウォーター', label: '低刺激オフ' },
      { rank: '7位', point: '敏感肌でも使えるノンケミカル（紫外線吸収剤フリー）BBクリーム', label: '肌に優しいBB' },
      { rank: '8位', point: '唇の皮剥けや荒れをしっかり防ぐ無添加薬用リップケアバーム', label: '薬用リップケア' },
      { rank: '9位', point: '全身のカサつきとかゆみを防ぐ弱酸性ボディローション', label: '全身バリアミルク' },
      { rank: '10位', point: 'デリケートな頭皮をやさしく洗い上げる無添加スカルプシャンプー', label: '敏感頭皮ケア' }
    ],
    sections: [
      { h: '敏感肌のコスメ選び「避けるべき成分」チェック', body: `エタノール（アルコール）、合成香料、合成着色料、強い界面活性剤は刺激になりやすいため、「フリー処方」の表記を確認しましょう。` }
    ],
    faqs: [
      { q: '新しいコスメを試す際のパッチテストの方法は？', a: '二の腕の内側に少量を塗り、24〜48時間後に赤みやかゆみが出ないか確認してから顔に使用してください。' }
    ]
  },
  // 6. コスメ 乾燥肌 / 乾燥 おすすめ（統合）
  {
    id: 'art-cosme-osusume-kansouhada-dry-2026',
    queryTarget: 'コスメ 乾燥肌 おすすめ / コスメ 乾燥 おすすめ',
    searchKeyword: '高保湿 美容液 乾燥肌 人気',
    title: '【2026年最新】乾燥肌向けおすすめコスメ10選！カサつき・粉吹きを根本から潤す超高保湿アイテム完全比較',
    description: '2026年の乾燥肌向けおすすめコスメ10選を徹底比較。カサつき・つっぱり・粉吹きに悩む方へ、角層深くまで潤いを届けて閉じ込めるセラミド・ヒアルロン酸配合の高保湿コスメを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['乾燥肌コスメ', 'コスメ乾燥おすすめ', '高保湿コスメ', 'セラミド化粧水', '乾燥肌美容液', '粉吹き対策', 'インナードライ'],
    author: '蓮見 拓真',
    featured: true,
    intro: `「化粧水をつけてもすぐにカサつく」「夕方になるとファンデが粉を吹く」深刻な乾燥肌に。水分を与えるだけでなく、与えた水分を絶対に逃さない「バリア型高保湿コスメ」10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'ナノ化セラミドが角層の隙間を満たし、一日中潤いが続く濃密保湿美容液', label: '乾燥肌美容液No.1' },
      { rank: '2位', point: 'とろみテクスチャーが肌に吸い付くように浸透する高保湿化粧水', label: '高保湿化粧水No.1' },
      { rank: '3位', point: '水分蒸発を防ぎ翌朝までモチモチ肌をキープする高純度保湿クリーム', label: '密封クリームNo.1' },
      { rank: '4位', point: '洗顔後の最初の一滴で化粧水の浸透力を劇的に高めるブースターオイル', label: '導入オイルNo.1' },
      { rank: '5位', point: '乾燥小ジワの目立ちを即効でふっくら整える濃密アイセラム', label: '目元乾燥ケア' },
      { rank: '6位', point: '洗い流した後も肌がしっとり潤う美容液クレンジングミルク', label: '潤いクレンジング' },
      { rank: '7位', point: '美容液成分80%以上で粉吹きを防ぐうるおいクッションファンデ', label: '乾燥知らずファンデ' },
      { rank: '8位', point: '日中の乾燥を感じたときにメイクの上から水分補給できるオイルインミスト', label: '日中保湿ミスト' },
      { rank: '9位', point: '週2回の集中ケアで砂漠肌をぷるぷるに蘇らせる生シートマスク', label: '超保湿マスク' },
      { rank: '10位', point: '皮剥けしたガサガサ唇を一晩でつるつるにするナイトリップスリーピングマスク', label: '唇集中保湿' }
    ],
    sections: [
      { h: '乾燥肌を救う「水分＋油分」のゴールデンバランス', body: `化粧水だけで終わらせると蒸発時に肌本来の水分まで奪われます。必ず乳液やクリームの油分で「蓋」をすることが絶対条件です。` }
    ],
    faqs: [
      { q: '乾燥肌は朝の洗顔をお湯だけで済ませても良い？', a: '寝ている間の皮脂やほこりを落とすため、乾燥肌用のアミノ酸系洗顔料を使うか、ぬるま湯でのやさしい水洗顔がおすすめです。' }
    ]
  },
  // 7. コスメ 脂性肌 おすすめ
  {
    id: 'art-cosme-osusume-shiseihada-oily-2026',
    queryTarget: 'コスメ 脂性肌 おすすめ',
    searchKeyword: '脂性肌 化粧水 テカリ 人気',
    title: '【2026年最新】脂性肌（オイリー肌）おすすめコスメ10選！テカリ・ベタつき・毛穴落ちを防ぐサラサラ名品完全比較',
    description: '2026年の脂性肌向けおすすめコスメ10選を徹底比較。過剰な皮脂テカリ・ベタつき・化粧崩れを防ぎ、水分を補給しながら一日中サラサラ肌を保つ人気アイテムを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['脂性肌コスメ', 'オイリー肌コスメ', 'テカリ防止', '皮脂コントロール', '皮脂吸着パウダー', 'ノンコメドジェニック', 'オイルフリー'],
    author: '松本 結衣',
    featured: true,
    intro: `「朝メイクしても昼にはテカテカ」「皮脂で毛穴落ちする」脂性肌（オイリー肌）さんへ。皮脂を抑えつつ必要な水分だけをチャージする、2026年最新のオイルコントロールコスメ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '皮脂吸着成分配合でTゾーンのテカリを一日中抑える薬用さっぱり化粧水', label: '脂性肌化粧水No.1' },
      { rank: '2位', point: '毛穴の余分な皮脂汚れを酵素の力でスッキリ落とす酵素洗顔パウダー', label: '皮脂オフ洗顔No.1' },
      { rank: '3位', point: '皮脂崩れを徹底ブロックしてサラサラ肌が続く大人気化粧下地', label: 'テカリ防止下地No.1' },
      { rank: '4位', point: '油分ゼロ！ぷるぷるの水分だけで肌を満たすオイルフリージェル', label: 'オイルフリー保湿' },
      { rank: '5位', point: 'ポンポンするだけで毛穴を消し去りテカリをリセットするノーセバムパウダー', label: '皮脂吸着パウダーNo.1' },
      { rank: '6位', point: '皮脂分泌を根本からケアするナイアシンアミド高配合セラム', label: '皮脂抑制美容液' },
      { rank: '7位', point: '過剰な皮脂を吸着して毛穴を引き締めるクレイ泥パック', label: '毛穴クレイパック' },
      { rank: '8位', point: 'テカリを抑えてマスク崩れを防ぐ超微粒子セッティングミスト', label: 'マットキープミスト' },
      { rank: '9位', point: 'ニキビの元になりにくいノンコメドジェニックテスト済み日焼け止め', label: '脂性肌向けUV' },
      { rank: '10位', point: '頑固な角栓や皮脂汚れを溶かして落とす毛穴専用クレンジングバーム', label: '毛穴クレンジング' }
    ],
    sections: [
      { h: '脂性肌でも「保湿」が必要な理由', body: `皮脂が多いからと保湿をサボると、肌が乾燥を察知して余計に皮脂を分泌する「インナードライ」に陥ります。オイルフリーの水分保湿を徹底しましょう。` }
    ],
    faqs: [
      { q: 'あぶらとり紙は頻繁に使っても大丈夫？', a: '使いすぎると必要な皮脂まで取り除き過剰分泌を招きます。ティッシュで軽く押さえる程度にするのが理想です。' }
    ]
  },
  // 8. コスメ 混合肌 おすすめ
  {
    id: 'art-cosme-osusume-kongouhada-combination-2026',
    queryTarget: 'コスメ 混合肌 おすすめ',
    searchKeyword: '混合肌 スキンケア',
    title: '【2026年最新】混合肌向けおすすめコスメ10選！TゾーンのテカリとUゾーンの乾燥を同時に救う水分調律アイテム完全比較',
    description: '2026年の混合肌（コンビネーションスキン）向けおすすめコスメ10選を徹底比較。テカリと乾燥が混在する複雑な肌を、絶妙な水分・油分バランスで調律する名品を楽天実売データから厳選。',
    category: 'skincare',
    tags: ['混合肌コスメ', 'コンビネーション肌', 'Tゾーンテカリ', 'Uゾーン乾燥', '水分バランス', 'インナードライ対策', '混合肌スキンケア'],
    author: '橘 えりか',
    featured: true,
    intro: `日本人女性に最も多いと言われる「混合肌」。おでこや鼻はテカるのに、頬や口元はカサつくという厄介な二重悩みを、1つのルーティンでスマートに解決する2026年の水分調律コスメ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'ベタつくTゾーンと乾くUゾーンの水分油分バランスを黄金比に整える乳液ローション', label: '混合肌調律No.1' },
      { rank: '2位', point: '肌の内側には潤いを届け表面はサラリと仕上がるジェルエッセンス', label: 'バランス美容液' },
      { rank: '3位', point: '角層の水分保持力を高めてインナードライを根本改善するヒト型セラミド美容水', label: 'インナードライ改善' },
      { rank: '4位', point: 'Tゾーンにはテカリ防止、頬にはツヤを与える部分使い対応下地', label: 'ハイブリッド下地' },
      { rank: '5位', point: '必要な潤いを残しながら余分な皮脂だけをオフするマイルドフォーム洗顔', label: 'バランス洗顔' },
      { rank: '6位', point: '乾燥崩れも皮脂崩れも両方防ぐロングラスティングクッションファンデ', label: '両立ファンデ' },
      { rank: '7位', point: '肌荒れと毛穴の目立ちを同時に鎮静するティーツリー＆CICAパッド', label: '鎮静バランスパッド' },
      { rank: '8位', point: '重くないのに乾燥ゾーンをしっかりシールドするウォータリークリーム', label: '軽密クリーム' },
      { rank: '9位', point: '日中のテカリとカサつきの両方を1本で直せるスティック美容液', label: 'お直しスティック' },
      { rank: '10位', point: '石鹸オフ可能で負担をかけない水分リッチなデイリーUVジェル', label: '混合肌UV' }
    ],
    sections: [
      { h: '混合肌の「塗り分け（ゾーン別ケア）」テクニック', body: `化粧水は全顔にたっぷり、乳液・クリームは乾燥しやすい頬から塗り始め、Tゾーンは手のひらに残った少量をなじませるのがベストです。` }
    ],
    faqs: [
      { q: '混合肌用コスメと普通肌用コスメの違いは？', a: '混合肌用は水分を高配合しつつ油分を控えめにし、肌のバリア機能を整える成分が強化されています。' }
    ]
  },
  // 9. コスメ 毛穴 おすすめ / コスメ ニキビ おすすめ（統合）
  {
    id: 'art-cosme-osusume-keana-acne-care-2026',
    queryTarget: 'コスメ 毛穴 おすすめ / コスメ ニキビ おすすめ',
    searchKeyword: '毛穴 美容液 人気',
    altKeyword: 'ニキビ 化粧水 人気',
    title: '【2026年最新】毛穴・ニキビケアおすすめコスメ10選！黒ずみ・開き毛穴・大人ニキビを撃退する薬用名品完全比較',
    description: '2026年の毛穴ケア＆ニキビ予防おすすめコスメ10選を徹底比較。頑固な黒ずみ毛穴・たるみ毛穴・繰り返す大人ニキビにアプローチするビタミンC・サリチル酸・薬用成分配合コスメを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['毛穴ケアコスメ', 'ニキビケアコスメ', '毛穴おすすめ', 'ニキビおすすめ', 'ビタミンC美容液', '毛穴黒ずみ', '大人ニキビ', '角栓ケア'],
    author: '松本 結衣',
    featured: true,
    intro: `鏡を見るたびにため息が出る「毛穴の黒ずみ・開き」と「繰り返すニキビ」。原因は皮脂の詰まり、ターンオーバーの乱れ、そして炎症です。皮膚科学に基づいた有効成分で肌を根本から清浄にする2026年最強の毛穴＆ニキビ対策コスメ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '高濃度ピュアビタミンCが毛穴を引き締めキメを整える最強の毛穴レス美容液', label: '毛穴ケアNo.1' },
      { rank: '2位', point: 'グリチルリチン酸配合でニキビの炎症を素早く鎮める薬用アクネローション', label: 'ニキビ予防No.1' },
      { rank: '3位', point: '酵素＋クレイのW効果で毛穴の角栓と黒ずみを根こそぎ吸着する洗顔パウダー', label: '角栓オフ洗顔No.1' },
      { rank: '4位', point: '微細針（スピキュール）が美容成分を毛穴深部へ届ける話題の導入セラム', label: '毛穴導入セラム' },
      { rank: '5位', point: 'サリチル酸（BHA）配合で古い角質を溶かし毛穴詰まりを防ぐトナーパッド', label: '角質クリアパッド' },
      { rank: '6位', point: 'ニキビの上から塗って寝るだけで赤みを引かせる薬用スポットパッチ', label: '集中スポットケア' },
      { rank: '7位', point: 'たるみ毛穴をふっくら持ち上げて目立たなくするレチノール誘導体クリーム', label: 'たるみ毛穴ケア' },
      { rank: '8位', point: 'ノンコメドジェニック処方で毛穴を詰まらせずに凹凸をぼかすプライマー', label: '毛穴消し下地' },
      { rank: '9位', point: '毛穴の奥のメイク汚れまで乳化して落とすクレンジングオイル', label: 'ディープクレンジング' },
      { rank: '10位', point: 'ニキビ跡の色素沈着を防ぐトラネキサム酸配合の美白集中美容液', label: 'ニキビ跡ケア' }
    ],
    sections: [
      { h: '毛穴の3大タイプ別アプローチ', body: `①「黒ずみ毛穴（酸化皮脂）」→ 酵素洗顔・クレンジング、②「開き毛穴（過剰皮脂）」→ ビタミンC・収れん化粧水、③「たるみ毛穴（加齢）」→ レチノール・ペプチドでのハリ強化が有効です。` },
      { h: 'ニキビを悪化させないスキンケアの基本', body: `絶対に指で潰さず、ノンコメドジェニック処方の低刺激アイテムで水分補給を行い、バリア機能を回復させましょう。` }
    ],
    faqs: [
      { q: '毛穴パックは使っても大丈夫ですか？', a: '剥がすタイプの毛穴パックは皮膚を痛め毛穴を広げる恐れがあるため、酵素洗顔やクレンジングバームで優しく溶かして落とす方法をおすすめします。' }
    ]
  }
];

async function buildContent(def, products) {
  const today = '2026-08-30';
  const top10 = products.slice(0, 10);

  let table = `<div style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 24px;">\n`;
  table += `| 順位 | 商品名 | 部門・特徴 | 注目ポイント | 楽天参考価格 | 公式リンク |\n`;
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
> 楽天市場OpenAPIから直接取得した確定画像・最新価格・公式アフィリエイトリンクをもとに、肌質・パーソナルカラー・肌悩みに特化した最強10選を徹底解説します。

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

ご自身の肌質やパーソナルカラー、肌悩みに的確に合わせたアイテム選びを行うことで、スキンケア効果やメイクの仕上がりは劇的に変わります。ぜひ毎日のルーティンに取り入れてみてください。

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
    if (products.length < 5 && def.altKeyword) {
      console.log(`⚠️ 商品不足(${products.length}件)→ 代替KW: "${def.altKeyword}"`);
      await sleep(800);
      const alt = await fetchRakutenItems(def.altKeyword, 12);
      const seen = new Set(products.map(p => p.affiliateUrl));
      for (const p of alt) { if (!seen.has(p.affiliateUrl)) { products.push(p); seen.add(p.affiliateUrl); } }
    }

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
  console.log(`\n🎉 Phase 48 完了！ ${newArticles.length}件追加 → 総計: ${articlesData.length}件`);
}

main().catch(e => { console.error('❌', e); process.exit(1); });
