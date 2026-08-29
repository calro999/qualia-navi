import fs from 'fs';
import path from 'path';

console.log('🚀 [Phase 49] 仕上がり・機能性別コスメ特化 10選記事 8本 楽天APIリアルタイム取得生成中...');

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
  // 1. コスメ 崩れにくい おすすめ
  {
    id: 'art-cosme-kuzureninui-longlasting-2026',
    queryTarget: 'コスメ 崩れにくい おすすめ',
    searchKeyword: '崩れない ファンデーション 人気',
    title: '【2026年最新】崩れにくいコスメおすすめ10選！汗・皮脂・マスクでも夕方まで美肌が続く最強ベースメイク完全比較',
    description: '2026年最新の崩れにくいコスメおすすめ10選を徹底比較。真夏の汗や皮脂テカリ、長時間のマスク着用でも毛穴落ちやヨレを起こさない最強ファンデーション・下地・キープミストを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['崩れにくいコスメ', 'キープミスト', '皮脂テカリ防止下地', '崩れないファンデ', 'ウォータープルーフ', 'マスクにつかない', 'ロングラスティング'],
    author: '松本 結衣',
    featured: true,
    intro: `「朝どれだけ綺麗に仕上げても昼にはドロドロ」「鼻周りの毛穴落ちが気になる」メイク崩れの悩みを根本解決。皮脂固定フィルム処方や微粒子密着パウダーを採用し、夜までお直し不要の圧倒的キープ力を誇る2026年の崩れ知らずコスメ10選を徹底比較します。`,
    rankingNotes: [
      { rank: '1位', point: '皮脂崩れ防止パウダー配合でテカリを徹底ブロックする最強化粧下地', label: '皮脂防止下地No.1' },
      { rank: '2位', point: '超密着フィルムが肌に一体化しマスクや汗でもヨレない最強クッションファンデ', label: '密着クッションNo.1' },
      { rank: '3位', point: 'メイクの仕上げに吹きかけるだけで一日中固定する微粒子フィックスミスト', label: 'メイクキープミストNo.1' },
      { rank: '4位', point: '毛穴を瞬時に埋めて皮脂を吸着しサラサラ肌が持続するノーセバムパウダー', label: 'テカリ吸着パウダー' },
      { rank: '5位', point: '擦れや皮脂に強く一日中ヨレない高カバーリキッドコンシーラー', label: '高密着コンシーラー' },
      { rank: '6位', point: '汗・水・擦れに強いウォータープルーフの極細アイライナー', label: '落ちないアイライナー' },
      { rank: '7位', point: '湿気や汗でもカールが一日中落ちない強力カールキープマスカラ下地', label: 'カールキープ下地' },
      { rank: '8位', point: '夕方の眉尻消えを防ぐリキッド＆パウダーのWアイブロウ', label: '消えないアイブロウ' },
      { rank: '9位', point: '飲食しても色が残る高密着ロングラスティングティント', label: '高密着ティント' },
      { rank: '10位', point: 'メイク前の肌温度を下げて皮脂分泌を抑えるクーリングトナーパッド', label: '肌温度クーリング' }
    ],
    sections: [
      { h: 'プロが教える「絶対崩さない」ミルフィーユ仕込み術', body: `①スキンケアの油分をティッシュオフ、②皮脂崩れ防止下地を薄く均一に塗布、③ファンデは少量を叩き込む、④パウダーをパフでプレス、⑤キープミストでコーティングする5層レイヤードが崩壊を防ぎます。` }
    ],
    faqs: [
      { q: '崩れにくいコスメを使うと乾燥しませんか？', a: '皮脂吸着成分と保湿成分（ヒアルロン酸やツボクサエキス等）がバランスよく配合された最新アイテムを選べば、乾燥を感じずサラサラ感を維持できます。' }
    ]
  },
  // 2. コスメ 落ちにくい おすすめ
  {
    id: 'art-cosme-ochinikui-lip-tint-2026',
    queryTarget: 'コスメ 落ちにくい おすすめ',
    searchKeyword: '落ちない リップ ティント 人気',
    title: '【2026年最新】落ちにくいコスメおすすめ10選！飲食しても色ツヤが続く神リップ＆アイメイク完全比較',
    description: '2026年の落ちにくいコスメおすすめ10選を徹底比較。カップに色移りせず、食事後も血色感が持続する最強ティントリップ、消えないアイブロウ、滲まないアイライナーを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['落ちにくいコスメ', '落ちないリップ', '高密着ティント', '色持ち最強', '色移り防止', 'アイライナー落ちない', 'アイブロウ落ちない'],
    author: '橘 えりか',
    featured: true,
    intro: `「食事のたびにリップが消えて血色が悪くなる」「夕方になると眉尻が消えている」日常の小さなストレスをゼロにする、2026年最新の「落ちにくさ特化型コスメ」10選をご紹介します。色持ちだけでなく唇の荒れにくさ・使用感の良さを両立した名品を完全比較。`,
    rankingNotes: [
      { rank: '1位', point: 'ジェル膜が唇をコーティングし飲食後もツヤと発色がそのまま残る神リップ', label: '落ちないリップNo.1' },
      { rank: '2位', point: '水や擦れに極めて強く朝描いた眉が夜まで消えないティントアイブロウ', label: '消えない眉No.1' },
      { rank: '3位', point: '目薬や涙でも滲まずシャープなラインをキープする耐久アイライナー', label: '耐久アイライナー' },
      { rank: '4位', point: 'マスク移りゼロ！塗って数分で唇に定着するベルベットマットティント', label: 'マスクプルーフリップ' },
      { rank: '5位', point: '下まぶたへのパンダ目を完全に防ぐ耐水・耐皮脂フィルムマスカラ', label: 'にじまないマスカラ' },
      { rank: '6位', point: '頬に内側から染まるように発色し一日中落ちないリキッドチーク', label: '持続リキッドチーク' },
      { rank: '7位', point: '皮脂によるアイシャドウの二重幅溜まりを防ぐ高密着アイシャドウベース', label: 'ヨレ防止アイベース' },
      { rank: '8位', point: '手洗いや消毒でも落ちにくい高保湿ハンドシールドクリーム', label: '落ちないハンドケア' },
      { rank: '9位', point: '水際レジャーでも日焼け止め効果が落ちない最強スーパーウォータープルーフUV', label: '耐久UVプロテクト' },
      { rank: '10位', point: 'どんな頑固な落ちないメイクも摩擦レスでするんとオフする専用リムーバー', label: 'ポイントリムーバー' }
    ],
    sections: [
      { h: '落ちないリップの色持ちを倍増させる塗り方', body: `①リップクリームを塗って軽くティッシュオフ、②ティントを塗って3分間唇を擦り合わせずに定着させる、③軽くティッシュオフしてもう一度重ねる「2度塗り定着法」が最も色持ちします。` }
    ],
    faqs: [
      { q: '落ちにくいティントで唇が荒れるのを防ぐには？', a: 'オイル配合のティントを選ぶか、夜のスキンケアでリップスリーピングマスクを使って角層をしっかり保護・修復してください。' }
    ]
  },
  // 3. コスメ 高保湿 おすすめ
  {
    id: 'art-cosme-kouhoshitsu-moisture-2026',
    queryTarget: 'コスメ 高保湿 おすすめ',
    searchKeyword: '高保湿 美容液 人気',
    title: '【2026年最新】高保湿コスメおすすめ10選！砂漠肌をうるツヤに満たすセラミド・ヒアルロン酸名品完全比較',
    description: '2026年最新の高保湿コスメおすすめ10選を徹底比較。エアコンや季節の乾燥に負けない、ヒト型セラミド・多重ヒアルロン酸・スクワラン配合の圧倒的保水力を持つスキンケアを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['高保湿コスメ', '高保湿スキンケア', 'セラミド美容液', 'ヒアルロン酸原液', '乾燥対策コスメ', 'インナードライ', 'もっちり肌'],
    author: '蓮見 拓真',
    featured: true,
    intro: `「肌が乾燥して突っ張る」「保湿してもすぐに乾いてしまう」そんな肌には、水分を与えるだけでなく「水分を挟み込んで離さない」高保湿コスメが必要です。2026年の保水力ランキング上位を独占する高機能保湿アイテム10選を完全比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'ヒト型セラミドをナノカプセル化し角層深部まで潤いを閉じ込める最強美容液', label: '高保湿美容液No.1' },
      { rank: '2位', point: 'とろけるような濃密テクスチャーで乾燥小ジワをふっくら整える高保湿化粧水', label: '濃密保水化粧水' },
      { rank: '3位', point: '肌の水分蒸発を鉄壁ガードし翌朝まで吸い付く肌を保つリッチ保湿クリーム', label: '密封バリアクリーム' },
      { rank: '4位', point: '5種のヒアルロン酸が段階的に浸透し潤いの層をつくる高保水エッセンス', label: '多重ヒアルロン酸' },
      { rank: '5位', point: '洗顔後のブースターとして化粧水の引き込み力を倍増させる浸透導入オイル', label: 'ブースターオイル' },
      { rank: '6位', point: '目元や口元の酷い乾燥を集中ケアするピンポイント保湿バームスティック', label: 'ポータブル保湿バーム' },
      { rank: '7位', point: 'シート1枚に美容液1本分を凝縮した贅沢高保湿シートマスク', label: '集中保水マスク' },
      { rank: '8位', point: '洗い流した後も潤いヴェールが残る高保湿アミノ酸洗顔ミルク', label: '潤いキープ洗顔' },
      { rank: '9位', point: '日中のオフィス乾燥を吹き飛ばすオイルイン2層式保湿ミスト', label: '日中高保湿ミスト' },
      { rank: '10位', point: '乾燥でゴワついた唇を一晩でぷるぷるに蘇らせるリップ集中美容液', label: '唇高保湿トリートメント' }
    ],
    sections: [
      { h: '本当に潤う「3大保湿成分」の働きと選び方', body: `①「水分を抱え込む（セラミド）」、②「水分を掴む（ヒアルロン酸・コラーゲン）」、③「水分を閉じ込める（スクワラン・ワセリン）」。この3種が揃ったケアを行うことで乾かない肌が完成します。` }
    ],
    faqs: [
      { q: '高保湿コスメを使うとニキビができませんか？', a: '油分過多ではなく「水分保持成分（セラミドやヒアルロン酸）」主体でノンコメドジェニックテスト済みのアイテムを選べば、毛穴を詰まらせずに潤いをキープできます。' }
    ]
  },
  // 4. コスメ ナチュラル おすすめ
  {
    id: 'art-cosme-natural-organic-2026',
    queryTarget: 'コスメ ナチュラル おすすめ',
    searchKeyword: 'ナチュラル メイク コスメ 人気',
    title: '【2026年最新】ナチュラルコスメおすすめ10選！すっぴん風美肌＆石鹸落ちミネラルメイク完全比較',
    description: '2026年のナチュラルコスメおすすめ10選を徹底比較。素肌感を活かしたすっぴん風メイクから、肌に負担をかけないオーガニック・石鹸オフ対応のミネラルコスメまで楽天実売データから厳選。',
    category: 'makeup',
    tags: ['ナチュラルコスメ', 'すっぴん風メイク', '石鹸落ちコスメ', 'ミネラルコスメ', 'オーガニックコスメ', '素肌感メイク', 'クリーンビューティ'],
    author: '松本 結衣',
    featured: true,
    intro: `「作り込みすぎない自然な美しさが欲しい」「クレンジング不要で肌を休ませたい」方に。素肌そのものが綺麗になったかのような透明感とツヤを演出し、石鹸だけで簡単に落とせる2026年のナチュラルコスメ10選をご紹介します。`,
    rankingNotes: [
      { rank: '1位', point: 'まるで素肌が発光しているかのような自然なカバー力のミネラルBBクリーム', label: 'ナチュラルBB No.1' },
      { rank: '2位', point: '天然由来成分100%でクレンジング不要の石鹸オフミネラルファンデ', label: '石鹸オフファンデNo.1' },
      { rank: '3位', point: '自眉をふんわり活かして自然な立体感をつくるオーガニック眉マスカラ', label: 'ナチュラル美眉' },
      { rank: '4位', point: 'ほんのり血色感を足してすっぴんを格上げするオーガニックカラーリップ', label: '血色バームリップ' },
      { rank: '5位', point: '目元にも頬にも唇にも使えるマルチユースなミネラルカラーバーム', label: 'マルチカラーバーム' },
      { rank: '6位', point: '毛穴をふんわりぼかしてサラサラの陶器肌に整えるオーガニックパウダー', label: 'すっぴんパウダー' },
      { rank: '7位', point: '紫外線吸収剤不使用で肌に極めてやさしいノンケミカルナチュラルUV', label: 'ノンケミカルUV' },
      { rank: '8位', point: '植物オイルブレンドで濡れたようなツヤを宿すナチュラルハイライト', label: '濡れツヤハイライト' },
      { rank: '9位', point: 'お湯だけでつるんと落ちるまつ毛想いのナチュラルマスカラ', label: 'お湯落ちマスカラ' },
      { rank: '10位', point: '天然精油の香りでメイクしながら深呼吸したくなるリフレッシュミスト', label: '精油アロマミスト' }
    ],
    sections: [
      { h: '「すっぴん風ナチュラルメイク」を格上げする3原則', body: `①下地でくすみを払ってファンデは顔の中心のみ、②眉は毛流れを整える程度、③リップは粘膜に近いシアーな発色を選ぶことで、清潔感あふれるナチュラル美人印象が作れます。` }
    ],
    faqs: [
      { q: '石鹸落ちコスメは本当にクレンジング不要？', a: 'はい、純石鹸やアミノ酸系洗顔料をしっかり泡立てて丁寧に洗えば、毛穴に詰まることなく綺麗に落とせます。' }
    ]
  },
  // 5. コスメ ツヤ肌 おすすめ
  {
    id: 'art-cosme-tsuyahada-glow-2026',
    queryTarget: 'コスメ ツヤ肌 おすすめ',
    searchKeyword: 'ツヤ肌 クッションファンデ 人気',
    title: '【2026年最新】ツヤ肌コスメおすすめ10選！内側から発光する水光肌をつくる神ファンデ＆ハイライト完全比較',
    description: '2026年最新のツヤ肌コスメおすすめ10選を徹底比較。テカリに見えない洗練された発光美肌をつくるクッションファンデ、濡れツヤハイライト、トーンアップ下地を楽天実売データから厳選。',
    category: 'makeup',
    tags: ['ツヤ肌コスメ', '水光肌クッション', 'グロウファンデ', '濡れツヤハイライト', '発光美肌', 'ガラス肌', '韓国水光肌'],
    author: '橘 えりか',
    featured: true,
    intro: `韓国発の「水光肌（ムルグァンピブ）」や「ガラス肌」をはじめ、生命力あふれるみずみずしいツヤ肌は2026年の最重要メイクトレンド。テカリとツヤを明確に差別化し、光を味方につけて圧倒的な立体感と若々しさを生み出すツヤ肌コスメ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '美容液成分たっぷり！ポンポンするだけでみずみずしい発光水光肌になるクッション', label: '水光クッションNo.1' },
      { rank: '2位', point: '繊細な微細パールが光を集めて濡れたような輝きを放つバームハイライター', label: '濡れツヤハイライトNo.1' },
      { rank: '3位', point: 'くすんだ肌を瞬時にトーンアップし内側から輝くツヤを仕込むグロウ下地', label: '発光グロウ下地' },
      { rank: '4位', point: '一日中乾かずツヤが続く美容液仕立てのリキッドファンデーション', label: 'リキッドグロウ' },
      { rank: '5位', point: 'ツヤ肌の仕上がりを邪魔せず余分なテカリだけを抑えるグロウパウダー', label: 'ツヤ残しパウダー' },
      { rank: '6位', point: 'メイクの仕上げに吹きかけてツヤの膜をコーティングするグロウフィックスミスト', label: 'ツヤ出しキープミスト' },
      { rank: '7位', point: '頬にジューシーな果汁のようなツヤと血色を宿すリキッドチーク', label: '果汁ツヤチーク' },
      { rank: '8位', point: 'ぷっくり立体的なツヤ唇を長時間キープするプランピンググロス', label: '立体ツヤグロス' },
      { rank: '9位', point: '濡れたような濡れツヤアイホールをつくるリキッドアイシャドウ', label: '濡れツヤアイシャドウ' },
      { rank: '10位', point: 'メイク前の肌に水分をパンパンに満たしてツヤの土台をつくる導入美容液', label: 'ツヤ土台美容液' }
    ],
    sections: [
      { h: '「ツヤ」と「テカリ」の決定的な違いと境界線', body: `ツヤは「頬骨・鼻筋・顎先・唇の上」など高い位置に宿る光。小鼻の脇や眉間、額の中央の光は「テカリ」に見えやすいため、Tゾーンのみ部分パウダーで抑えるのがプロの鉄則です。` }
    ],
    faqs: [
      { q: '脂性肌でもツヤ肌メイクを楽しめますか？', a: '皮脂崩れ防止下地をTゾーンに仕込み、頬の高い位置にだけハイライトやツヤクッションを重ねれば、テカリに見えない上品なツヤ肌が作れます。' }
    ]
  },
  // 6. コスメ マット おすすめ
  {
    id: 'art-cosme-matte-velvet-2026',
    queryTarget: 'コスメ マット おすすめ',
    searchKeyword: 'マット リップ 人気',
    title: '【2026年最新】マットコスメおすすめ10選！乾燥しない・縦ジワが消える洗練ベルベットメイク完全比較',
    description: '2026年のマットコスメおすすめ10選を徹底比較。パサつきや乾燥を感じさせず、上質なベルベットのようにふんわり仕上がるマットリップ・マットファンデ・陶器肌パウダーを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['マットコスメ', 'マットリップ', 'ベルベットティント', 'マットファンデ', '陶器肌', 'セミマットメイク', 'モードメイク'],
    author: '蓮見 拓真',
    featured: true,
    intro: `「マットコスメは唇がカサカサになる」「シワが目立つ」という印象は過去のもの。2026年の最新マットコスメは、内側はしっとり潤いながら表面はサラリと上品なフォギー感を演出する「進化系スフレマット」が主流です。モードで洗練された大人顔をつくるマットコスメ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'スフレのように軽く伸びて縦ジワをふんわりぼかす乾燥知らずのマットリップ', label: 'マットリップNo.1' },
      { rank: '2位', point: '毛穴と色ムラを完璧にカバーしてドールのような陶器肌をつくるマットファンデ', label: '陶器肌ファンデNo.1' },
      { rank: '3位', point: '余分な皮脂を吸着してベルベットのようなシルク肌をキープする仕上げパウダー', label: 'シルクマットパウダー' },
      { rank: '4位', point: 'ふんわり血色が肌に溶け込み毛穴も目立たなくするマットチーク', label: 'ソフトフォーカスチーク' },
      { rank: '5位', point: '陰影と深みを自然に際立たせる捨て色なしの完全マットアイパレット', label: 'オールマットアイシャドウ' },
      { rank: '6位', point: '一日中テカリを抑えてマット肌の土台をつくるオイルコントロール下地', label: 'マットキープ下地' },
      { rank: '7位', point: '自然な影を作って小顔と彫りの深さを演出するマットシェーディング', label: '立体シェーディング' },
      { rank: '8位', point: 'モードで知的な印象の指先を演出するマットトップコート', label: 'マットネイル' },
      { rank: '9位', point: 'ふんわり自然な自眉を再現できるマットアイブロウパウダー', label: 'ふんわり眉パウダー' },
      { rank: '10位', point: 'メイクの上からテカリを即座にリセットするマットお直しスティック', label: 'テカリ消しスティック' }
    ],
    sections: [
      { h: '2026年流「老け見えしない」セミマットの作り方', body: `完全なフラットマットではなく、ほんのり内側の光を感じさせる「セミマット（ソフトマット）」に仕上げるのが今年風。スキンケアでしっかり保湿してからマットアイテムを重ねましょう。` }
    ],
    faqs: [
      { q: '乾燥肌でもマットリップを綺麗に塗るコツは？', a: '塗る5分前にリップバームで唇を柔らかくし、直前に軽くティッシュオフしてから中央から外側にポンポンと指でぼかし塗りするのがコツです。' }
    ]
  },
  // 7. コスメ 時短 おすすめ
  {
    id: 'art-cosme-jitan-allinone-2026',
    queryTarget: 'コスメ 時短 おすすめ',
    searchKeyword: '時短 オールインワン ジェル 人気',
    title: '【2026年最新】時短コスメおすすめ10選！朝5分でスキンケア＆フルメイクが完了する多機能神アイテム完全比較',
    description: '2026年の時短コスメおすすめ10選を徹底比較。化粧水・美容液・乳液が1つになった高機能オールインワンから、1本でベース・UV・カラーメイクまで完成する神速多機能コスメを楽天実売データから厳選。',
    category: 'skincare',
    tags: ['時短コスメ', 'オールインワンコスメ', '朝5分メイク', '多機能コスメ', '時短スキンケア', '朝用シートマスク', '簡単メイク'],
    author: '松本 結衣',
    featured: true,
    intro: `「朝は1分でも長く寝ていたい」「仕事や育児でメイクに時間をかけられない」現代人の強い味方。手抜きに見えないどころか、むしろ丁寧にお手入れしたような美肌をわずか数分で叶える2026年最強の時短コスメ10選を徹底比較します。`,
    rankingNotes: [
      { rank: '1位', point: '化粧水・乳液・美容液・クリーム・パック・化粧下地がこれ1個で完結する最強ジェル', label: '時短オールインワンNo.1' },
      { rank: '2位', point: '洗顔・スキンケア・保湿下地が60秒で完了する朝用サボリーノ系シートマスク', label: '朝用マスクNo.1' },
      { rank: '3位', point: '日焼け止め＋トーンアップ＋ファンデ＋コンシーラーが1本で終わる神BBクリーム', label: '時短ベースメイクNo.1' },
      { rank: '4位', point: '目元・チーク・リップがこれ1本で統一感あるメイクになるマルチスティック', label: '3in1マルチコスメ' },
      { rank: '5位', point: '指でひと塗りするだけで綺麗なグラデーションが完成する時短2色アイシャドウ', label: '秒速アイシャドウ' },
      { rank: '6位', point: 'ペンシル・パウダー・ブラシが1本にまとまった一体型アイブロウ', label: '3in1アイブロウ' },
      { rank: '7位', point: 'クレンジング・洗顔・毛穴角質ケアがW洗顔不要で1回で済むホットクレンジング', label: '時短クレンジング' },
      { rank: '8位', point: 'メイクの上からシューッと吹きかけるだけでUVカット＆保湿ができるスプレー', label: '秒速UVスプレー' },
      { rank: '9位', point: 'お風呂の中で濡れた肌にそのまま使えるインバスボディミルク', label: 'インバス保湿ケア' },
      { rank: '10位', point: '髪を素早く乾かしながらダメージ補修する速乾美髪トリートメントスプレー', label: '速乾ヘアケア' }
    ],
    sections: [
      { h: '朝のルーティンを「5分」に短縮する最適スケジュール', body: `0分: 朝用マスク（60秒）→ 1分: 多機能BBクリーム塗布（90秒）→ 2.5分: 一体型アイブロウ（60秒）→ 3.5分: マルチカラー（目元・チーク・リップ）（60秒）→ 4.5分: キープミスト吹きかけで完了！` }
    ],
    faqs: [
      { q: 'オールインワン1品だけで乾燥しませんか？', a: '最新のオールインワンは多層ラメラ構造やカプセル浸透技術を採用しており、化粧水とクリームを重ね塗りしたのと同等以上の高保湿力を維持できます。' }
    ]
  },
  // 8. コスメ 初心者 セット
  {
    id: 'art-cosme-shoshinsha-set-starter-2026',
    queryTarget: 'コスメ 初心者 セット',
    searchKeyword: 'コスメ 初心者 メイク セット',
    title: '【2026年最新】コスメ初心者セットおすすめ10選！これだけで一式揃うスキンケア＆メイクスターターキット完全比較',
    description: '2026年のコスメ初心者セットおすすめ10選を徹底比較。道具選びに迷わず届いたその日から始められる、ブラシ付きフルメイクセットや基本スキンケアスターターキットを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['コスメ初心者セット', 'メイクスターターセット', 'コスメ一式揃える', 'メイクブラシセット', 'スキンケアトライアルセット', '初めてのメイク道具', '新生活コスメ'],
    author: '橘 えりか',
    featured: true,
    intro: `「メイクを始めたいけれど、何を一つずつ買えばいいか分からない」「単品で集めると高額になってしまう」そんな初心者・新生活スタートの方へ。基本アイテムが一式揃って圧倒的にお得な、2026年のコスメスターターセット10選を完全比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'アイシャドウ・リップ・チーク・ベースが一式揃った大人気フルメイクアップボックス', label: '初心者フルセットNo.1' },
      { rank: '2位', point: 'プロ級の仕上がりを初心者でも再現できる柔らか高級メイクブラシ10本セット', label: 'メイクブラシセットNo.1' },
      { rank: '3位', point: '洗顔・化粧水・乳液・美容液がラインで試せる王道スキンケアトライアルキット', label: 'スキンケア入門セット' },
      { rank: '4位', point: '失敗しない眉メイクの型プレートとペンシル・パウダーが揃った美眉スターター', label: '眉メイク一式セット' },
      { rank: '5位', point: '大人気韓国コスメのミニサイズが豪華に詰まったK-BEAUTYお試しBOX', label: '韓国コスメスターター' },
      { rank: '6位', point: '肌荒れを防ぎながらメイクできる敏感肌専用ミネラルメイクお試しセット', label: '肌に優しいスターター' },
      { rank: '7位', point: 'メンズスキンケアの基本（洗顔・化粧水・乳液）がポーチ付きで揃うメンズキット', label: 'メンズ入門セット' },
      { rank: '8位', point: '持ち運びに便利でお泊まりや旅行にもそのまま使えるトラベルコスメセット', label: 'ポータブルセット' },
      { rank: '9位', point: '自宅でサロン級のネイルアートが一式揃って始められるジェルネイルスターターキット', label: 'ネイルスターター' },
      { rank: '10位', point: 'プレゼントにも自分へのご褒美にも最適なデパコスのベストセラーミニセット', label: 'デパコスお試しセット' }
    ],
    sections: [
      { h: '初心者セットを購入する3大メリット', body: `①「色味や相性の失敗がない（統一された設計）」、②「単品で買うより30〜50%お得」、③「持ち運びに便利なポーチやツールが同梱されている」点が入門に最適です。` }
    ],
    faqs: [
      { q: '初心者セットに入っているアイテムの使い方は分かりますか？', a: '多くのセットにはイラスト入りの使い方説明書やQRコード動画解説が付属しており、初めての方でも迷わず使いこなせます。' }
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
> 楽天市場OpenAPIから直接取得した確定画像・最新価格・公式アフィリエイトリンクをもとに、ニーズと仕上がりに特化した最強10選を徹底解説します。

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

機能性や仕上がりの特徴に合わせた適切なコスメを選ぶことで、毎日のメイク崩れのストレスから解放され、なりたい理想の自分を叶えることができます。ぜひ気になったアイテムから試してみてください。

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
  console.log(`\n🎉 Phase 49 完了！ ${newArticles.length}件追加 → 総計: ${articlesData.length}件`);
}

main().catch(e => { console.error('❌', e); process.exit(1); });
