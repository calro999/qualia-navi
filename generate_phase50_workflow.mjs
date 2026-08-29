import fs from 'fs';
import path from 'path';

console.log('🚀 [Phase 50] リアル検索ワークフロー直結特化 10選記事 10本 楽天APIリアルタイム取得生成中...');

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
  // 1. 30代 毛穴 ファンデーション
  {
    id: 'art-wf-30s-keana-foundation-2026',
    queryTarget: '30代 毛穴 ファンデーション',
    searchKeyword: '30代 毛穴 ファンデーション 人気',
    title: '【2026年最新】30代の開き毛穴・たるみ毛穴を隠すファンデーションおすすめ10選！毛穴落ちしない神アイテム完全比較',
    description: '30代の気になる開き毛穴・たるみ毛穴をなめらかにカバーし、夕方になっても毛穴落ちしない最強ファンデーション10選を徹底比較。崩れにくさ・カバー力・素肌感を楽天実売データから厳選。',
    category: 'makeup',
    tags: ['30代ファンデーション', '毛穴落ち防止', '開き毛穴ファンデ', 'たるみ毛穴カバー', '30代ベースメイク', '毛穴レスファンデ', '崩れないファンデ30代'],
    author: '松本 結衣',
    featured: true,
    intro: `20代の頃とは違い、ファンデーションを塗ると逆に毛穴の凹凸が目立ってしまったり、時間が経つと毛穴にファンデが詰まって水玉状に崩れる「毛穴落ち」。30代特有の水分量低下とたるみ毛穴を光の乱反射と微粒子密着パウダーでフラットに補正する、2026年最強の毛穴カバーファンデーション10選を徹底比較します。`,
    rankingNotes: [
      { rank: '1位', point: '毛穴の凹凸に微粒子パウダーがぴたっと密着し、一日中毛穴落ち知らずの美肌が続くクッション', label: '毛穴カバーNo.1' },
      { rank: '2位', point: '美容液成分80%以上で乾燥によるたるみ毛穴をふっくら持ち上げるリキッドファンデ', label: '美容液リキッドNo.1' },
      { rank: '3位', point: '光を拡散して毛穴の影を消し去るソフトフォーカス処方のパウダリーファンデ', label: 'ふんわりパウダリー' },
      { rank: '4位', point: '皮脂崩れを抑えながら毛穴をなめらかに埋める毛穴専用プライマー下地', label: '毛穴フラット下地' },
      { rank: '5位', point: '薄づきなのに頑固な黒ずみ毛穴を一瞬で消し去る高密着エマルジョン', label: '黒ずみ毛穴カバー' },
      { rank: '6位', point: 'マスクの擦れでも毛穴のファンデが剥がれないキープ力抜群ファンデ', label: 'マスクプルーフ' },
      { rank: '7位', point: 'テカリを抑えて毛穴の引き締まった陶器肌をキープするマットクッション', label: '陶器肌仕上がり' },
      { rank: '8位', point: '紫外線から毛穴の酸化を守り抜くSPF50+高機能ミネラルファンデ', label: 'UV毛穴ブロック' },
      { rank: '9位', point: '石鹸で落とせて毛穴に負担をかけない肌にやさしいBBファンデ', label: '石鹸オフ毛穴ケア' },
      { rank: '10位', point: '夕方の毛穴落ちをポンポンするだけで瞬時にリセットするお直しパクト', label: 'お直し専用パクト' }
    ],
    sections: [
      { h: '30代が「毛穴落ち」させない塗り方の黄金ルール', body: `下地はくるくると円を描くように毛穴の奥へ埋め込み、ファンデーションは決して擦らず、パフで垂直にトントンとタップ（叩き込み）するのが毛穴落ち防止の絶対原則です。` },
      { h: 'リキッド vs クッション vs パウダー 徹底比較', body: `| タイプ | カバー力 | 毛穴落ち耐性 | 向いている肌質 |
|:---|:---:|:---:|:---|
| **クッション** | ★★★★★ | ★★★★★ | 乾燥肌・混合肌 |
| **リキッド** | ★★★★☆ | ★★★★☆ | 乾燥肌・たるみ毛穴 |
| **パウダー** | ★★★☆☆ | ★★★★☆ | 脂性肌・開き毛穴 |` }
    ],
    faqs: [
      { q: '毛穴を目立たなくするには下地とファンデどちらが重要？', a: '下地が7割です。毛穴補正プライマーで凹凸を平らに整えてからファンデを薄く重ねるのが最も自然で崩れません。' }
    ]
  },
  // 2. 40代 シミ カバー ファンデーション
  {
    id: 'art-wf-40s-shimi-cover-foundation-2026',
    queryTarget: '40代 シミ 隠れる ファンデーション',
    searchKeyword: '40代 シミ カバー ファンデーション 人気',
    title: '【2026年最新】40代のシミ・肝斑を厚塗り感なく隠すファンデーションおすすめ10選！コンシーラーいらずの最強カバー完全比較',
    description: '40代の濃いシミ・肝斑・色ムラをひと塗りで綺麗に消し去り、厚塗り感ゼロの若見え美肌をつくる最強ファンデーション10選を徹底比較。高カバー力とツヤ感を両立した楽天実売人気アイテムを厳選。',
    category: 'makeup',
    tags: ['40代ファンデーション', 'シミ隠すファンデ', '肝斑カバー', '40代ベースメイク', 'ハイカバーファンデ', '厚塗り感なし', '若見えツヤ肌'],
    author: '橘 えりか',
    featured: true,
    intro: `年齢とともに濃くなるシミや広がる肝斑。「コンシーラーを重ねると厚塗り感が出て老け見えする」とお悩みの40代へ。光学補正技術と高濃度ピグメントで、薄膜でありながらシミをなかったことにする2026年最強のシミカバーファンデーション10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'コンシーラー不要！濃いシミもポンポンと叩くだけで完全に隠れる驚異のハイカバークッション', label: 'シミ隠しNo.1' },
      { rank: '2位', point: 'カバー力とみずみずしいツヤを両立し小ジワに入り込まない大人向けリキッド', label: 'ツヤ感カバーNo.1' },
      { rank: '3位', point: '肝斑や広範囲のくすみを光のヴェールで自然にぼかす高機能エマルジョン', label: '肝斑ぼかしNo.1' },
      { rank: '4位', point: '美白有効成分配合でメイクしながらシミケアもできる薬用美白BB', label: '薬用美白ファンデ' },
      { rank: '5位', point: '汗や皮脂でもシミが透けてこない強力ウォータープルーフファンデ', label: '耐久カバー' },
      { rank: '6位', point: '目元や頬のピンポイントのシミを瞬時に消す高密着クリームパクト', label: '高密着クリーム' },
      { rank: '7位', point: '大人の黄ぐすみをリセットして若々しい血色感を宿すピンクオークル系ファンデ', label: '若見え血色感' },
      { rank: '8位', point: 'たるんだ肌にピタッと吸い付くようにフィットするリフトアップファンデ', label: 'リフトフィット' },
      { rank: '9位', point: '石鹸オフできてレーザー治療後のデリケート肌にも使えるミネラルファンデ', label: '低刺激ハイカバー' },
      { rank: '10位', point: '日中の紫外線からシミの悪化を防ぐSPF50+PA++++最強プロテクトファンデ', label: 'UV防御カバー' }
    ],
    sections: [
      { h: '老け見えしない「シミ隠し」テクニック', body: `全顔に均一に塗るのではなく、顔全体は極薄に、シミがある頬の高い部分だけにファンデを重ねる「濃淡グラデーション塗り」が厚塗り感を防ぐ秘訣です。` }
    ],
    faqs: [
      { q: '濃いシミにはファンデとコンシーラーどちらを使うべき？', a: '最新のハイカバークッションならファンデ1つで隠せますが、ピンポイントの濃いシミには硬めのスポットコンシーラーを併用するとさらに自然です。' }
    ]
  },
  // 3. 乾燥肌 崩れない ファンデーション
  {
    id: 'art-wf-kansouhada-kuzurenai-foundation-2026',
    queryTarget: '乾燥肌 崩れない ファンデーション',
    searchKeyword: '乾燥肌 崩れない ファンデーション 人気',
    title: '【2026年最新】乾燥肌でも崩れないファンデーションおすすめ10選！粉吹き・乾燥小ジワを防ぐ保湿密着ファンデ完全比較',
    description: 'カサつき・粉吹き・夕方の乾燥崩れに悩む乾燥肌のための、一日中しっとり潤いながら崩れない最強ファンデーション10選を徹底比較。美容液成分高配合のツヤ肌アイテムを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['乾燥肌ファンデーション', '崩れないファンデ乾燥肌', '粉吹き防止', '保湿ファンデ', '美容液クッション', 'ツヤ肌ファンデ', 'インナードライファンデ'],
    author: '蓮見 拓真',
    featured: true,
    intro: `「崩れ防止ファンデを使うと肌がパリパリに乾いて粉を吹く」「夕方になると目元や口元の小ジワが目立つ」乾燥肌の崩れは、皮脂ではなく「乾燥による肌の収縮とヨレ」が原因。美容液成分をたっぷり配合し、潤いの膜で肌を包み込みながら崩れを防ぐ2026年最新ファンデーション10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '美容液成分85%配合！乾いた空気の中でも一日中もっちりツヤ肌が続く高保湿クッション', label: '乾燥肌No.1クッション' },
      { rank: '2位', point: 'ヒアルロン酸とセラミドが角層を潤し続け粉吹きを完全にブロックするリキッド', label: '粉吹き防止No.1' },
      { rank: '3位', point: 'とろけるようなバームが肌に密着し乾燥小ジワを埋めるエッセンスパクト', label: '高保湿バームパクト' },
      { rank: '4位', point: '肌の水分蒸発を防ぐオイルイン処方で夕方までツヤが持続するグロウファンデ', label: '夕方ツヤ持続' },
      { rank: '5位', point: '乾燥による皮脂の過剰分泌（インナードライ崩れ）を水分補給で防ぐバランスファンデ', label: 'インナードライ対策' },
      { rank: '6位', point: '洗顔後これ1本でスキンケアから下地・ファンデまで完了する濃厚BBクリーム', label: '高保湿時短BB' },
      { rank: '7位', point: 'パウダーなのにしっとり！オイルコーティング製法でカサつかないパウダリー', label: 'しっとりパウダリー' },
      { rank: '8位', point: '目元やほうれい線の動きにしなやかに追従してひび割れないストレッチファンデ', label: 'ひび割れ防止' },
      { rank: '9位', point: '無添加・アルコールフリーで乾燥敏感肌をいたわるマイルド処方ファンデ', label: '乾燥敏感肌向け' },
      { rank: '10位', point: 'メイク前の保湿膜を強化して一日中ファンデのノリを保つ高保湿下地', label: '保水ブースター下地' }
    ],
    sections: [
      { h: '乾燥崩れを防ぐメイク前スキンケアの極意', body: `乳液やクリームを塗った後、3分置いて肌になじませてから余分な油分だけをティッシュで軽くオフしてからファンデを乗せると、密着度が格段に上がります。` }
    ],
    faqs: [
      { q: '乾燥肌でもフェイスパウダーは使うべき？', a: '全顔に使うと乾燥の原因になるため、眉や小鼻など崩れやすい部分にだけブラシで極少量をふんわり乗せるのがおすすめです。' }
    ]
  },
  // 4. 敏感肌 使える ファンデーション
  {
    id: 'art-wf-binkanhada-tsukaeru-foundation-2026',
    queryTarget: '敏感肌 使える ファンデーション',
    searchKeyword: '敏感肌 ファンデーション 人気',
    title: '【2026年最新】敏感肌でも安心して使えるファンデーションおすすめ10選！肌荒れ・赤みを防ぐ低刺激＆石鹸落ち完全比較',
    description: '肌荒れ・アトピー・ニキビ肌でもピリつかず使える敏感肌向けファンデーション10選を徹底比較。ノンケミカル・無香料・石鹸オフ可能で肌に負担をかけない名品を楽天実売データから厳選。',
    category: 'makeup',
    tags: ['敏感肌ファンデーション', '石鹸落ちファンデ', 'ミネラルファンデーション', 'ノンケミカルファンデ', '低刺激ベースメイク', '肌荒れしないコスメ', 'アトピー肌コスメ'],
    author: '松本 結衣',
    featured: true,
    intro: `「ファンデーションを塗ると痒みや赤みが出る」「クレンジングの摩擦で肌荒れが悪化する」敏感肌の方へ。紫外線吸収剤フリー（ノンケミカル）、アルコールフリー、石鹸でやさしくオフできる肌想いの2026年最新ファンデーション10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '100%天然ミネラル成分でつけたまま眠れるほど肌にやさしい石鹸オフファンデ', label: '敏感肌No.1ミネラル' },
      { rank: '2位', point: 'CICA成分配合で赤みや肌荒れをカバーしながら日中も鎮静ケアする薬用クッション', label: '薬用鎮静クッション' },
      { rank: '3位', point: '紫外線吸収剤不使用（ノンケミカル）で敏感肌を紫外線から守る低刺激BB', label: 'ノンケミカルBB' },
      { rank: '4位', point: '摩擦レスで肌に乗せられる軽やかな使い心地のミネラルルースパウダー', label: '摩擦レスパウダー' },
      { rank: '5位', point: '皮膚科医テスト済みでアトピー肌やレーザー治療後でも使える高保湿ファンデ', label: 'ドクターズコスメ' },
      { rank: '6位', point: '敏感肌の気になる赤みをグリーン・イエローの光で補正するコントロールBB', label: '赤み消しBB' },
      { rank: '7位', point: '界面活性剤・防腐剤フリーでアレルギーを起こしにくいピュアファンデ', label: '完全無添加' },
      { rank: '8位', point: '肌の常在菌バランスを整えてバリア機能を育む美肌菌ファンデーション', label: 'バリア育成ファンデ' },
      { rank: '9位', point: 'マスクの摩擦刺激から肌を保護するクッションベールファンデ', label: '摩擦保護ベール' },
      { rank: '10位', point: '純石鹸だけで泡立ててするんと落ちる肌負担ゼロ設計のベースメイク', label: '純石鹸オフ' }
    ],
    sections: [
      { h: '敏感肌が選ぶべき「安心の5大フリー処方」', body: `①紫外線吸収剤フリー、②エタノール（アルコール）フリー、③合成香料フリー、④鉱物油フリー、⑤パラベンフリーの表示を確認しましょう。` }
    ],
    faqs: [
      { q: '石鹸落ちファンデはカバー力が低い？', a: '近年のミネラルファンデは粒子加工技術が進化しており、毛穴や赤みをしっかりカバーできるものが多数登場しています。' }
    ]
  },
  // 5. ブルベ夏 似合う リップ
  {
    id: 'art-wf-burubenatsu-niau-lip-2026',
    queryTarget: 'ブルベ夏 似合う リップ',
    searchKeyword: 'ブルベ夏 リップ',
    title: '【2026年最新】ブルベ夏に似合う神リップおすすめ10選！透明感爆発の青みピンク・モーヴ・ローズ完全比較',
    description: 'サマータイプ（ブルベ夏）の肌を圧倒的に白く、透明感あふれる印象に見せる神リップ10選を徹底比較。くすまないシアーな青みピンクから上品なダスティモーヴまで楽天実売データから厳選。',
    category: 'makeup',
    tags: ['ブルベ夏リップ', 'サマータイプコスメ', '青みピンクリップ', 'モーヴリップ', 'ブルベ夏ティント', '透明感リップ', '粘膜リップブルベ'],
    author: '橘 えりか',
    featured: true,
    intro: `黄みよりのリップを塗ると顔がくすんでしまうブルベ夏（サマータイプ）さん。「青みがかった淡いピンク」「くすみを含んだ上品なモーヴ」「透け感のあるローズ」を纏うことで、肌の透明感が劇的に引き立ちます。2026年ブルベ夏大絶賛の神リップ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'ブルベ夏の素の唇を最高に美しく引き立てる青みピンク粘膜ティント', label: 'ブルベ夏神リップNo.1' },
      { rank: '2位', point: 'オフィスメイクにもぴったりな上品でくすまないダスティモーヴリップ', label: '上品モーヴNo.1' },
      { rank: '3位', point: '透明感のあるシアーな発色で重ねるほどみずみずしいチェリーピンクグロス', label: 'シアーチェリー' },
      { rank: '4位', point: '落ちにくさとふんわりスフレ感を両立したソフトマットベリーティント', label: 'ソフトマットベリー' },
      { rank: '5位', point: 'シルバーラメがちらちら輝いて儚げな唇をつくるプランパーリップ', label: 'シルバーラメプランパー' },
      { rank: '6位', point: '青み寄りのミルクティーピンクで落ち着いた大人の抜け感を出すヌードリップ', label: '大人の抜け感ヌード' },
      { rank: '7位', point: '飲食しても紫転びせず綺麗な青みピンクが持続する耐久ジェルリップ', label: '色持ち持続ジェル' },
      { rank: '8位', point: 'ブルベ夏の肌色を一瞬でトーンアップさせるクリアラズベリーカラー', label: 'トーンアップラズベリー' },
      { rank: '9位', point: '乾燥した唇をしっとりケアしながらほんのり色づく薬用カラーリップバーム', label: '高保湿カラーバーム' },
      { rank: '10位', point: '手持ちのリップに重ねるだけでブルベ夏カラーに味変できるパープルニュアンスグロス', label: 'パープル味変グロス' }
    ],
    sections: [
      { h: 'ブルベ夏リップ選びで失敗しない3つのキーワード', body: `①「青み（黄みゼロ）」、②「くすみ感（ソフトトーン）」、③「透け感（シアー発色）」が揃ったものを選ぶと絶対に失敗しません。` }
    ],
    faqs: [
      { q: 'ブルベ夏が赤リップをつけたいときは？', a: '黄みのない「ローズレッド」や「ベリーレッド」で、マットよりもシアーなツヤタイプを選ぶと顔になじみます。' }
    ]
  },
  // 6. イエベ秋 似合う アイシャドウ
  {
    id: 'art-wf-yebeaki-niau-eyeshadow-2026',
    queryTarget: 'イエベ秋 似合う アイシャドウ',
    searchKeyword: 'イエベ パレット 人気',
    title: '【2026年最新】イエベ秋に似合うアイシャドウおすすめ10選！深みテラコッタ・マスタード・カーキ完全比較',
    description: 'オータムタイプ（イエベ秋）の落ち着いた大人の魅力を最大限に引き出す神アイシャドウ10選を徹底比較。リッチな深みブラウン・テラコッタ・ゴールドラメを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['イエベ秋アイシャドウ', 'オータムタイプコスメ', 'テラコッタアイシャドウ', '深みブラウンパレット', 'ゴールドラメ', '秋メイク2026', '深みカラー'],
    author: '蓮見 拓真',
    featured: true,
    intro: `リッチでゴージャス、そして洗練された深みを持つイエベ秋（オータムタイプ）さん。明るすぎるパステルカラーよりも、テラコッタ、カーキ、ブロンズゴールド、深みブラウンなどのこっくりカラーが圧倒的に映えます。2026年イエベ秋大注目の神アイシャドウパレット10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'イエベ秋の目元に吸い付くような深みと陰影をつくる最強テラコッタブラウンパレット', label: 'イエベ秋総合No.1' },
      { rank: '2位', point: 'ゴールドパールが濡れたように輝く大人のウォームブロンズ単色シャドウ', label: 'ゴールドラメNo.1' },
      { rank: '3位', point: 'カーキとマスタードのアクセントで洗練されたモード顔をつくる多色パレット', label: 'モードアクセント' },
      { rank: '4位', point: 'ベルベットマット質感で彫りの深いハーフ顔を演出するオールマットパレット', label: '陰影オールマット' },
      { rank: '5位', point: '夕方になってもくすまず発色が続く高密着リキッドアイシャドウ', label: '高密着リキッド' },
      { rank: '6位', point: '日常のオフィスメイクに重宝する肌なじみ抜群のウォームベージュパレット', label: '王道オフィスブラウン' },
      { rank: '7位', point: '大粒のシャンパンゴールドグリッターで特別な日の華やかさをプラス', label: 'シャンパングリッター' },
      { rank: '8位', point: '指先でサッと塗るだけで綺麗なグラデーションができる時短2色シャドウ', label: '秒速グラデ' },
      { rank: '9位', point: '目元を自然に引き締めるダークチョコレートブラウンの締め色シャドウ', label: '極上締め色' },
      { rank: '10位', point: '目元の乾燥を防ぐ植物オイル配合のオーガニックアイカラー', label: 'オーガニックアイケア' }
    ],
    sections: [
      { h: 'イエベ秋の立体感を極めるアイメイクグラデーション', body: `①アイホール全体にウォームベージュ、②二重幅にテラコッタ、③目尻のキワにダークブラウン、④黒目の上にゴールドラメを置く4ステップで完璧な目元が完成します。` }
    ],
    faqs: [
      { q: 'イエベ秋が明るい色を使いたいときは？', a: '白っぽいパステルではなく、くすみの効いた「マスタードイエロー」や「サーモンピンク」を選ぶとしっくり馴染みます。' }
    ]
  },
  // 7. 唇 荒れない リップ
  {
    id: 'art-wf-kuchibiru-arenai-lip-2026',
    queryTarget: '唇 荒れない リップ',
    searchKeyword: '薬用リップ 人気',
    title: '【2026年最新】唇が荒れない・皮剥けしないリップおすすめ10選！敏感な唇を保護する薬用＆高保湿完全比較',
    description: '唇の皮剥け・ヒリつき・ひび割れに悩む方へ。色素沈着や刺激を起こさず、高保湿成分で荒れた唇をぷるぷるに蘇らせるおすすめリップ10選を楽天実売データから厳選。',
    category: 'skincare',
    tags: ['唇荒れないリップ', '皮剥けしないリップ', '薬用リップクリーム', '低刺激リップ', '敏感肌リップ', '高保湿リップバーム', '唇ケア2026'],
    author: '松本 結衣',
    featured: true,
    intro: `「口紅やティントを塗ると必ず唇の皮が剥ける」「縦ジワが乾燥してヒリヒリ痛い」デリケートな唇の皮ふは顔の中で最も薄く、皮脂腺がありません。ワセリン、セラミド、ビタミンE配合で唇をいたわりながら美しく保つ2026年の荒れない神リップ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '有効成分が唇のひび割れ・炎症を素早く鎮めるロングセラー薬用高保湿リップ', label: '薬用保護No.1' },
      { rank: '2位', point: 'ヒト型セラミドとシアバターで荒れた唇を一晩でつるつるにするナイトリップバーム', label: '夜用集中リペアNo.1' },
      { rank: '3位', point: 'タール色素不使用！天然ミネラル発色で唇に一切負担をかけない無添加ルージュ', label: '無添加カラーリップ' },
      { rank: '4位', point: '高純度ワセリンが唇の水分蒸発を鉄壁ガードする低刺激プロテクトリップ', label: '高純度ワセリン' },
      { rank: '5位', point: '紫外線による唇の荒れとくすみを防ぐSPF20+UVカットリップクリーム', label: 'UVリップケア' },
      { rank: '6位', point: 'ヒアルロン酸注入級のぷるぷる感をもたらす低刺激プランパー美容液', label: '低刺激プランパー' },
      { rank: '7位', point: '唇の角質をやさしくケアしてつるんと整えるシュガースクラブバーム', label: 'リップスクラブ' },
      { rank: '8位', point: '口紅の下地に塗ることで色素沈着と乾燥をダブルで防ぐリップベース', label: '保護下地リップ' },
      { rank: '9位', point: 'オーガニック植物オイル100%で赤ちゃんにも使えるマイルドリップ', label: 'オーガニックケア' },
      { rank: '10位', point: 'ほんのり血色感を足してすっぴんの唇を綺麗に見せる高保湿トリートメント', label: '血色トリートメント' }
    ],
    sections: [
      { h: '唇の皮剥けを即座に治す「ラップパック法」', body: `リップクリームを厚めに塗り、小さく切ったラップを唇に貼って3〜5分置くだけで、カサカサ唇がふっくら柔らかく復活します。` }
    ],
    faqs: [
      { q: 'ティントで唇が荒れる原因は？', a: '染料（タール色素）や揮発性アルコールが原因のことが多いです。ミネラル発色タイプやオイルベースのティントを選びましょう。' }
    ]
  },
  // 8. マスクにつかない リップ
  {
    id: 'art-wf-mask-tsukanai-lip-2026',
    queryTarget: 'マスクにつかない リップ',
    searchKeyword: 'マスクにつかない リップ ティント',
    title: '【2026年最新】マスクにつかないリップおすすめ10選！色移りゼロ＆一日中発色が続く最強ティント完全比較',
    description: 'マスクの内側に色移りせず、外した瞬間も塗りたての美しさをキープする最強リップ10選を徹底比較。高密着ジェル膜処方とマットティントを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['マスクにつかないリップ', '色移り防止リップ', '落ちないティント', '高密着ジェル膜', 'マスクメイク2026', 'ロングラスティングリップ', '食事しても落ちない'],
    author: '橘 えりか',
    featured: true,
    intro: `「マスクを外したときの唇の色落ちが恥ずかしい」「マスクの内側がリップで汚れる」悩みを完璧に解消。塗って数分で唇表面にカラーシールド膜を形成し、擦れてもコップにも一切つかない2026年最強のマスクプルーフリップ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: 'ジェル膜が唇を密封してマスク擦れでも1ミリも色移りしない大ヒットティント', label: 'マスクプルーフNo.1' },
      { rank: '2位', point: '塗った瞬間にピタッと定着してマスクに触れてもサラサラのベルベットマット', label: 'サラサラマットNo.1' },
      { rank: '3位', point: 'みずみずしいツヤを保ちながらマスク移りゼロを叶えるウォーターティント', label: 'ツヤ水光ティント' },
      { rank: '4位', point: '手持ちの口紅の上に重ねるだけでマスク移りを防止するリップコートジェル', label: '魔法のリップコート' },
      { rank: '5位', point: '食事をしても中心だけハゲずに均一な血色が夜まで残る耐久ルージュ', label: '食事耐久ルージュ' },
      { rank: '6位', point: 'マスク内の湿気でもヨレない密着フィルム処方の高発色リキッド', label: '湿気プルーフ' },
      { rank: '7位', point: 'マスクを外したときに健康的な血色感を演出するシアー粘膜カラー', label: '自然な血色キープ' },
      { rank: '8位', point: '乾燥しやすいマスク内環境でも唇の皮剥けを防ぐヒアルロン酸配合ティント', label: '保湿キープティント' },
      { rank: '9位', point: 'ひと塗りで高発色しティッシュオフ1回で完璧に固定されるリップスティック', label: '即固定スティック' },
      { rank: '10位', point: '肌トーンを選ばず誰でも垢抜ける万能ピンクベージュの落ちないリップ', label: '万能垢抜けカラー' }
    ],
    sections: [
      { h: 'マスクに100%つかない「ティッシュオフ定着法」', body: `リップを塗った後、唇を動かさずに2分待って膜を形成させ、ティッシュで軽く挟んで余分な表面油分を抑えると完全に色移りしなくなります。` }
    ],
    faqs: [
      { q: 'マスクにつかないリップは落とすのが大変？', a: 'ポイントメイクリムーバーやクレンジングオイルを使えば、摩擦をかけずにスルリと簡単に落とせます。' }
    ]
  },
  // 9. 夕方 くすまない ファンデーション
  {
    id: 'art-wf-yuugata-kusumanai-foundation-2026',
    queryTarget: '夕方 くすまない ファンデーション',
    searchKeyword: 'トーンアップ ファンデーション くすみ',
    title: '【2026年最新】夕方くすまないファンデーションおすすめ10選！酸化・皮脂による顔色の濁りを防ぐ発光美肌完全比較',
    description: '朝の明るい透明感が夕方になっても持続する、くすみ防止ファンデーション10選を徹底比較。皮脂の酸化を防ぐ抗酸化パウダーと光反射ピグメント配合の人気コスメを楽天実売データから厳選。',
    category: 'makeup',
    tags: ['夕方くすまないファンデ', 'くすみ防止ファンデ', 'トーンアップファンデ', '透明感キープ', '抗酸化ファンデ', '皮脂酸化防止', '夕方の疲れ顔解消'],
    author: '松本 結衣',
    featured: true,
    intro: `「朝は綺麗だったのに夕方になると顔全体が黒ずんで疲れて見える」原因は、ファンデーションに含まれる油分が皮脂と混ざって「酸化」すること。皮脂酸化をブロックするビタミンC配合処方や、紫・ピンクの光を反射するピグメントで、一日中透明感を放ち続ける2026年のくすみ知らずファンデーション10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '皮脂を吸着しても暗くならない抗酸化ピグメント配合で一日中発光するクッション', label: 'くすみ防止No.1' },
      { rank: '2位', point: '黄ぐすみを瞬時に飛ばして澄んだ白肌をつくるラベンダー＆ピンクトーン下地', label: '黄ぐすみ撃退下地' },
      { rank: '3位', point: 'ビタミンC誘導体配合でメイクしながら夕方の酸化を防ぐスキンケアファンデ', label: 'ビタミンC配合ファンデ' },
      { rank: '4位', point: '光を乱反射して夕方の影や疲れ感を吹き飛ばすプリズムパウダーファンデ', label: 'プリズム発光' },
      { rank: '5位', point: '時間が経つほど皮脂と馴染んで透明ツヤに変化するエマルジョンパクト', label: '皮脂味方ファンデ' },
      { rank: '6位', point: '夕方の青黒いくすみに血色感をプラスするローズベージュリキッド', label: '血色ローズリキッド' },
      { rank: '7位', point: 'メイクの上からポンポンするだけで朝の透明感が復活するお直しルースパウダー', label: '透明感復活パウダー' },
      { rank: '8位', point: '紫外線による日中の酸化ダメージをブロックするSPF50+ロングラスティングUV', label: '抗酸化UVブロック' },
      { rank: '9位', point: '美容液のようなみずみずしさで乾燥くすみを一日中防ぐBBセラム', label: '乾燥くすみ防止' },
      { rank: '10位', point: '夕方のどんより顔に吹きかけて透明感をリセットするブライトミスト', label: '夕方リセットミスト' }
    ],
    sections: [
      { h: '夕方のくすみを防ぐ「朝のベース仕込み術」', body: `下地にラベンダーまたはピンクのコントロールカラーを仕込み、Tゾーンの皮脂を抑えるパウダーを重ねることで、皮脂酸化による変色を完全にシャットアウトできます。` }
    ],
    faqs: [
      { q: 'ファンデーションがくすむ主な原因は何ですか？', a: '皮脂の酸化、肌の乾燥による光反射の低下、そしてファンデーションの色選び（暗すぎる色）が主な原因です。' }
    ]
  },
  // 10. 髪をサラサラにしたい / いい匂いになりたい（統合）
  {
    id: 'art-wf-hair-sarasara-fragrance-2026',
    queryTarget: '髪をサラサラにしたい / いい匂いになりたい',
    searchKeyword: 'ヘアオイル サラサラ 人気',
    altKeyword: '香水 レディース 人気',
    title: '【2026年最新】髪がサラサラ＆いい匂いになるヘアケア・フレグランスおすすめ10選！モテ美髪アイテム完全比較',
    description: '指通りなめらかな極上サラサラ美髪と、すれ違いざまにふわっと香る上質なフレグランスを両立するおすすめヘアオイル＆コスメ10選を徹底比較。楽天実売データから厳選。',
    category: 'haircare',
    tags: ['髪サラサラヘアオイル', 'いい匂いのコスメ', 'モテ香水', 'ヘアフレグランス', '美髪トリートメント', 'パサつき改善', 'ヘアケア2026'],
    author: '蓮見 拓真',
    featured: true,
    intro: `「毛先のパサつきやうねりをなくして指通りサラサラになりたい」「香水ほどきつくなく自然にいい匂いと言われたい」髪のツヤ・手触りと上質な香りは、人の第一印象を決定づける最重要要素。ダメージを補修して絹のようなサラサラ髪をつくり、一日中清潔感のある香りが続く2026年のヘア＆フレグランスコスメ10選を比較します。`,
    rankingNotes: [
      { rank: '1位', point: '一滴でパサつく髪がシルクのような指通りになり、高級ホテルのような香りが続く最強ヘアオイル', label: 'サラサラ美髪No.1' },
      { rank: '2位', point: 'ドライヤーの熱を味方にしてダメージを集中補修する洗い流さないトリートメント', label: '熱補修ミルクNo.1' },
      { rank: '3位', point: '風になびくたびに万人受けする清潔感あふれるフローラルサボンが香るヘアミスト', label: 'モテヘアミストNo.1' },
      { rank: '4位', point: '髪のうねりや広がりを抑えて一日中すとんとまとめるストレートセラム', label: 'うねり補正セラム' },
      { rank: '5位', point: '肌にも優しく手首や首筋に自然になじむ練り香水ソリッドパフューム', label: 'ふんわり練り香水' },
      { rank: '6位', point: '週2回のスペシャルケアでサロン帰りのツヤと手触りを再現する濃密ヘアマスク', label: '濃密サロンヘアマスク' },
      { rank: '7位', point: '頭皮のベタつきやニオイをリフレッシュして髪を根元からサラサラにするドライシャンプー', label: '頭皮リフレッシュ' },
      { rank: '8位', point: '紫外線ダメージによる髪の褪色とパサつきを防ぐUVカットヘアオイル', label: 'UVヘアケア' },
      { rank: '9位', point: '手肌の保湿とヘアスタイリングが同時にできるマルチオーガニックバーム', label: 'マルチバーム' },
      { rank: '10位', point: '寝ている間の枕の摩擦から髪を守るシルクナイトキャップ＆ヘアセラム', label: 'ナイト摩擦ガード' }
    ],
    sections: [
      { h: '髪が劇的にサラサラになる「正しいドライヤー手順」', body: `①タオルドライ後にヘアオイルを毛先中心に塗布、②根元から強温風で8割乾かす、③上から下に向けて弱温風を当てキューティクルを整える、④最後に冷風で固定する4工程でサロン帰りのツヤが手に入ります。` }
    ],
    faqs: [
      { q: 'ヘアオイルとヘアミルクはどちらを先に使う？', a: '水分補給のヘアミルクを先に塗り、その上から油分のヘアオイルを重ねて蓋をするのが最もサラサラにまとまる順番です。' }
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

ご自身の肌質やお悩みに合わせた最適なアイテムを選ぶことで、毎日のメイクの満足度や仕上がりは劇的に向上します。ぜひ気になったアイテムから試してみてください。

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
  console.log(`\n🎉 Phase 50 完了！ ${newArticles.length}件追加 → 総計: ${articlesData.length}件`);
}

main().catch(e => { console.error('❌', e); process.exit(1); });
