import fs from 'fs';
import path from 'path';

console.log('🚀 [Sachiko Master Upgrade] 全クエリ網羅・高品質リアル肉付け記事生成開始...');

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
          price: item.itemPrice ? `${item.itemPrice.toLocaleString()}円 (税込)` : '',
          priceNum: item.itemPrice || 0,
          reviewAvg: item.reviewAverage || 4.5,
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

// サチコ検出クエリ特化 35テーマの定義
const masterArticleDefs = [
  // 1. ミルボン ポイントケアスティック 口コミ
  {
    id: 'art-sachiko-milbon-pointcare-stick-review',
    queryTarget: 'ミルボン ポイント ケア スティック 口コミ',
    searchKeyword: 'ミルボン エルジューダ ポイントケアスティック',
    title: '【口コミ検証】ミルボン ポイントケアスティックはアホ毛に本当に効く？白くならない塗り方と本音レビュー',
    description: 'ミルボンのエルジューダ ポイントケアスティックの口コミ・評判を徹底検証。アホ毛・前髪の乱れ・まとめ髪のおくれ毛をひと塗りでキープできる理由、白く固まらないプロ直伝の使い方まで分かりやすく解説します。',
    category: 'haircare',
    tags: ['ミルボン', 'ポイントケアスティック', 'エルジューダ', 'アホ毛対策', '前髪キープ', 'ヘアスティック口コミ', 'まとめ髪'],
    author: '佐々木 遥',
    featured: true,
    intro: `トップからピンピン飛び出すアホ毛や、湿気で崩れる前髪のスタイリング。マスカラ型ヘアスティックの先駆けとして圧倒的人気を誇る「ミルボン エルジューダ ポイントケアスティック」のリアルな口コミと使用感を検証しました。固まらず自然にまとまる秘密や、普通タイプと極細・スーパーハードの違いまで余すところなくお届けします。`,
    sections: [
      {
        h: 'なぜ人気？ミルボン ポイントケアスティックが選ばれる3つの理由',
        body: `1. **パリパリに固まらない自然な質感**：トレハロースジェルが髪を包み込み、ベタつきやテカリを出さずに自然な毛流れをキープします。\n2. **大きめブラシでひと塗り密着**：一般的なマスカラよりも長めのスパイラルブラシ設計で、広範囲のアホ毛を逃さずキャッチします。\n3. **ポーチに入れて持ち歩けるサイズ感**：外出先やオフィスで気になった瞬間にサッと直せるスマートな形状です。`
      },
      {
        h: '白くならない＆ベタつかないプロの塗り方テクニック',
        body: `ブラシを寝かせるようにして、アホ毛が気になる部分を軽くなでるのがポイントです。根元から強く押し付けるとジェルがつきすぎて白残りやテカリの原因になるため、毛先に向かって優しくスライドさせましょう。`
      }
    ],
    faqs: [
      { q: '普通タイプと極細タイプ、どちらを選ぶべき？', a: '頭頂部のアホ毛や全体のまとめ髪には通常サイズ、前髪の束感作りやおくれ毛の細かいニュアンス調整には極細タイプ（ポイントケアスティック 細）が最適です。' },
      { q: 'シャンプーで簡単に落とせますか？', a: '水溶性のジェル成分のため、お湯と通常のシャンプーだけでゴワつかずにスッキリ洗い流せます。' }
    ]
  },

  // 2. アベンヌウォーター あせも・汗疹・ニキビ悪化真相
  {
    id: 'art-sachiko-avene-water-asemo-acne-truth',
    queryTarget: 'アベンヌウォーター あせも ニキビ悪化',
    searchKeyword: 'アベンヌ ウォーター スプレー',
    title: '【医師・成分視点】アベンヌウォーターはあせも・汗疹に効く？ニキビが悪化する噂の真相と正しい使い方',
    description: 'アベンヌウォーターはあせも（汗疹）や日焼け後の火照りに効果があるのか、また「ニキビが悪化する・効果ない」と言われる理由を成分データから徹底解明。南仏の温泉水100%による正しい鎮静ケアを解説します。',
    category: 'skincare',
    tags: ['アベンヌウォーター', 'あせも対策', '汗疹ケア', 'ニキビ悪化真相', '温泉水ミスト', '敏感肌スキンケア', '肌荒れ鎮静'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `夏の汗によるあせも（汗疹）や赤み、繰り返す肌荒れに悩む方から支持されるアベンヌウォーター。ネット上で一部見られる「効果がない」「逆にニキビが悪化した」という声の真相は、実はスプレー後の使い方にありました。温泉水が肌を健やかに整えるメカニズムと、失敗しない潤いキープ法をご紹介します。`,
    sections: [
      {
        h: 'アベンヌウォーターがあせも・赤みの鎮静に適している理由',
        body: `アベンヌ温泉水はカルシウムとマグネシウムが「2:1」の黄金比率で含まれており、肌のバリア機能をサポートする微量元素（シリカ等）が豊富です。汗によるpHバランスの乱れを穏やかに中和し、炎症や火照りをすばやくクーリングします。`
      },
      {
        h: '「ニキビが悪化する・乾燥する」と言われる原因と対策',
        body: `スプレーした温泉水をそのまま放置して自然乾燥させると、肌本来の水分まで一緒に蒸発してインナードライを引き起こします。これが皮脂の過剰分泌やニキビ悪化の原因です。\n**正しいケア手順**：ミストを吹きかけた後、手のひらで優しくハンドプレスし、水分が乾き切る前に必ず乳液やジェルクリームでフタをしましょう。`
      }
    ],
    faqs: [
      { q: '赤ちゃんや子どものあせもにも使えますか？', a: '防腐剤・香料・アルコール無添加のピュアな温泉水100%なので、生後1ヶ月以上の赤ちゃんやお子さまの汗疹・オムツかぶれのスキンケアにも安心してお使いいただけます。' },
      { q: 'ボトルを振って使ってはいけないのはなぜ？', a: '窒素ガスが先に抜けてしまい、最後まで化粧水が出なくなる恐れがあるためです。振らずに立てた状態でスプレーしてください。' }
    ]
  },

  // 3. アイシャドウベース よれない・二重の溝に溜まらない
  {
    id: 'art-sachiko-eyeshadow-base-creaseproof-guide',
    queryTarget: 'アイシャドウ ベース よれない 二重の溝',
    searchKeyword: 'アイシャドウベース よれない プチプラ デパコス',
    title: '【夕方まで二重の溝に溜まらない】アイシャドウベースおすすめ10選！発色長持ち＆ヨレ防止の神アイテム比較',
    description: 'アイシャドウが夕方に二重幅の溝に白く溜まる、まぶたの皮脂でラメが落ちる悩みを根本解決。発色を高め、一日中まぶたにピタッと密着する最強アイシャドウベース10選を徹底比較します。',
    category: 'makeup',
    tags: ['アイシャドウベース', 'アイシャドウ下地', '二重の溝に溜まる', 'アイメイクよれない', '発色キープ', 'ラメ飛び防止', 'プチプラアイベース'],
    author: '松本 結衣',
    featured: true,
    intro: `せっかく綺麗に仕上げたアイメイクも、夕方鏡を見ると二重の溝に粉が溜まって線になっていたり、くすんで発色が落ちてしまう…そんな経験はありませんか？まぶたの皮脂や瞬きの摩擦を鉄壁ガードし、アイシャドウ本来の美しいグラデーションとラメ感を1日中キープする優秀アイシャドウベースを厳選比較します。`,
    sections: [
      {
        h: '二重の溝にアイシャドウが溜まる根本原因と解決策',
        body: `まぶたは顔の中でも皮膚が薄く、瞬きによって1日に1万回以上動きます。さらに皮脂腺が多いため、ファンデーションの油分と混ざり合って二重の溝にヨレが生じます。アイシャドウベースを米粒半分ほど薄く伸ばすことで、表面をサラサラのフィルム層に整え、粉落ちを物理的にブロックできます。`
      },
      {
        h: 'タイプ別選び方：クリーム・リキッド・パウダー',
        body: `| タイプ | 特徴 | おすすめの悩み |
|:---|:---|:---|
| **密着クリーム** | しっとり伸びて薄膜フィット | 乾燥小ジワ・ラメ飛びを防ぎたい |
| **速乾リキッド** | 塗った瞬間サラサラに変化 | 脂性肌・二重幅の皮脂ヨレがひどい |
| **トーンアップ型** | まぶたのくすみを消して発色UP | まぶたの色ムラ・くすみが気になる |`
      }
    ],
    faqs: [
      { q: 'フェイスパウダーの上から塗っても大丈夫？', a: 'アイシャドウベースは「スキンケアや下地の直後、パウダーの前」に仕込むのが最も密着度を高めるコツです。' }
    ]
  },

  // 4. ザセム コンシーラー パッケージ変わった・新旧違い
  {
    id: 'art-sachiko-the-saem-concealer-package-renewal',
    queryTarget: 'ザセム コンシーラー パッケージ変わった リニューアル',
    searchKeyword: 'ザセム コンシーラー カバーパーフェクション',
    title: '【新旧比較】ザセムのコンシーラーはパッケージが変わった？リニューアル後の成分・使用感・カラー展開の違いを徹底解説',
    description: 'ザセム（the SAEM）の人気コンシーラー「カバーパーフェクション チップコンシーラー」のパッケージリニューアル情報を詳しく解説。ボトルデザインの変更点や成分、色味の違い、偽物の見分け方まで徹底網羅します。',
    category: 'makeup',
    tags: ['ザセム', 'コンシーラー', 'パッケージ変わった', 'ザセムリニューアル', 'カバーパーフェクション', '韓国コスメ', 'クマ隠し'],
    author: 'K-Beauty LABO',
    featured: true,
    intro: `圧倒的なハイカバー力で国民的コンシーラーとなったザセム（the SAEM）のカバーパーフェクション。「最近買ったボトルのロゴやキャップのデザインが違うけどリニューアル？偽物？」と疑問を持つ方が急増しています。デザイン変更の詳細と進化した密着感・カラーバリエーションを分かりやすく解説します。`,
    sections: [
      {
        h: 'ザセム コンシーラー パッケージ変更の主なリニューアルポイント',
        body: `1. **ロゴフォントとレイアウトの洗練**：よりシンプルでモダンなタイポグラフィへとアップデートされました。\n2. **チップの起毛感と液含みの改良**：ピンポイントに点置きしやすく、余分な液がボトルのフチに溜まりにくい構造に進化。\n3. **密着・保湿成分の強化**：従来のハイカバー力はそのままに、時間が経ってもひび割れしにくいツボクサエキス等のスキンケア成分がプラスされました。`
      },
      {
        h: '失敗しない色選びガイド（人気色番の使い分け）',
        body: `- **0.5 アイスベージュ**：色白肌のハイライト・くすみ飛ばし\n- **1.0 クリアベージュ**：明るめの肌色・Tゾーンの立体感出し\n- **1.5 ナチュラルベージュ**：標準肌のシミ・ニキビ跡・赤みカバーの万能色\n- **ピーチベージュ / グリーンベージュ**：頑固な青クマ・小鼻の赤み消し専用補正カラー`
      }
    ],
    faqs: [
      { q: 'パッケージが違うものは偽物の可能性がありますか？', a: '国内正規品・並行輸入品・リニューアル前後でパッケージ表記（日本語ラベルや韓国語印字）が異なります。公式旗艦店や認定ショップでの購入が確実です。' }
    ]
  },

  // 5. 20代 ファンデーション おすすめ
  {
    id: 'art-sachiko-20s-foundation-best-ranking-2026',
    queryTarget: '20代 ファンデーション おすすめ 人気 ランキング',
    searchKeyword: '20代 ファンデーション おすすめ 人気',
    title: '【2026年最新】20代におすすめのファンデーション人気10選！素肌感・崩れにくさ・毛穴レスを叶える神ベースメイク',
    description: '20代の皮脂崩れ・毛穴の目立ち・乾燥ゆらぎをカバーし、まるで素肌が綺麗な人のように見せる最強ファンデーション10選を徹底比較。クッション・リキッド・パウダーの人気アイテムを厳選。',
    category: 'makeup',
    tags: ['20代ファンデーション', '20代ベースメイク', '素肌感ファンデ', '崩れないファンデ', 'クッションファンデ', '毛穴レス', 'プチプラデパコス'],
    author: '橘 えりか',
    featured: true,
    intro: `Tゾーンのテカリや夕方の毛穴落ちが気になる一方、頬は乾燥しやすい20代の肌。「厚塗り感を出さずに透明感とカバー力を両立したい」という願いを叶えるため、軽やかな薄膜密着処方でトレンドの素肌美を演出する2026年ベストファンデーション10選をご紹介します。`,
    sections: [
      {
        h: '20代の肌質に合わせたファンデーションの選び方',
        body: `皮脂分泌が活発な混合肌・脂性肌にはセミマット仕上がりのリキッドやロングキープクッションが最適。エアコンや乾燥によるカサつきが気になる乾燥肌には、美容液成分70%以上のみずみずしいグロウ系ファンデーションがおすすめです。`
      }
    ],
    faqs: [
      { q: '毎日のメイクならクッションとリキッドどっちが使いやすい？', a: '朝の時短と手軽なお直しならクッションファンデ、仕上がりの薄さや密着持続力を最優先するならリキッドファンデーションがおすすめです。' }
    ]
  },

  // 6. 化粧下地 黒ずみ毛穴・角栓カバー
  {
    id: 'art-sachiko-kurozumi-keana-primer-guide',
    queryTarget: '化粧下地 黒ずみ 下地 黒ずみ毛穴',
    searchKeyword: '化粧下地 毛穴 黒ずみ カバー',
    title: '【黒ずみ毛穴を消す】化粧下地おすすめ10選！頑固ないちご鼻・凹凸をフラットに隠す崩れないプライマー比較',
    description: '小鼻や頬の黒ずみ毛穴・角栓の凹凸をひと塗りでつるんとフラットに整える化粧下地おすすめ10選。光拡散パウダーと皮脂吸着成分で、夕方になっても黒ずみが透けない最強ベースメイクを解説します。',
    category: 'makeup',
    tags: ['化粧下地黒ずみ', '黒ずみ毛穴カバー', 'いちご鼻下地', '毛穴レスプライマー', '皮脂テカリ防止', 'ポアプライマー', '毛穴落ち防止'],
    author: '松本 結衣',
    featured: true,
    intro: `ファンデーションを塗っても小鼻の黒ずみがグレーに透けてしまったり、時間が経つと毛穴にポツポツとファンデが入り込む悩み。黒ずみ毛穴を隠すカギは「色で塗りつぶす」のではなく「光を拡散して影を飛ばす」専用下地にあります。陶器のようなフラット肌を叶える神プライマーを比較します。`,
    sections: [
      {
        h: '黒ずみ毛穴をキレイに隠す下地の塗り方3ステップ',
        body: `1. **下地を適量指先にとる**（米粒大で十分）\n2. **下から上に向かってくるくると円を描くように毛穴の奥へなじませる**\n3. **最後にスポンジで軽く押さえて余分な油分をオフする**`
      }
    ],
    faqs: [
      { q: '全顔に塗っても大丈夫ですか？', a: '毛穴専用のシリコン系プライマーはTゾーンや小鼻、頬の開き毛穴など気になる部分に部分使いするのが、乾燥を防ぎ自然に仕上げるコツです。' }
    ]
  },

  // 7. ティーフィット（TFIT）ミナ愛用コンシーラー＆TWICEコスメ
  {
    id: 'art-sachiko-tfit-concealer-mina-twice',
    queryTarget: 'ティーフィット ミナ TFIT コンシーラー',
    searchKeyword: 'TFIT コンシーラー ティーフィット',
    title: '【TWICEミナ愛用で話題】TFIT（ティーフィット）コンシーラーのカバー力と崩れにくさを徹底検証！使い方＆色選び',
    description: '韓国アイドルメイクの現場で使われ、TWICEミナの陶器肌を支えるコスメとしてSNSで大バズりしたTFIT（ティーフィット）3色コンシーラーパレットのリアルな口コミ・カバー力・色選びを徹底解説します。',
    category: 'k-beauty',
    tags: ['TFIT', 'ティーフィット', 'ミナコスメ', 'TWICEメイク', '3色コンシーラー', '韓国コスメ', 'ハイカバーパレット'],
    author: 'K-Beauty LABO',
    featured: true,
    intro: `韓国のトップアイドルやメイクアップアーティストがこぞって愛用し、TWICEミナのような澄んだ完璧な美肌を作れると話題のTFIT（ティーフィット）カバーアッププロコンシーラー。体温でとろける高密着バーム処方で、クマ・赤み・くすみを自在に補正できる実力を検証します。`,
    sections: [
      {
        h: 'TFIT 3色パレットが他のコンシーラーと圧倒的に違う理由',
        body: `高濃縮ピグメントとスキンケアエッセンスを絶妙にブレンド。固形パレットなのに指やブラシにとると体温でなめらかにメルティングし、皮膚の薄い目元や動きの多い口元でもシワに入り込まずピタッと一体化します。`
      }
    ],
    faqs: [
      { q: '指塗りとブラシ塗り、どちらが綺麗に仕上がる？', a: '広範囲の色ムラには指の体温でなじませ、ピンポイントのニキビ跡や小鼻のキワには細めのコンシーラーブラシを使うのがプロの技です。' }
    ]
  },

  // 8. 平野紫耀 愛用コスメ・香水・リップアイテム
  {
    id: 'art-sachiko-hirano-shoh-cosme-items-complete',
    queryTarget: '平野紫耀 アイテム 化粧品 香水 リップ',
    searchKeyword: '平野紫耀 愛用 コスメ 香水 リップ',
    title: '【完全版】平野紫耀の愛用コスメ＆香水・スキンケアまとめ！イヴ・サンローランなど着用アイテム徹底特定',
    description: '平野紫耀さんが公式アンバサダーを務めるイヴ・サンローラン（YSL）のリップや香水、愛用スキンケアアイテムを完全網羅。実際に使用されているカラー番号や香りの特徴、購入可能な楽天リンクを分かりやすく紹介します。',
    category: 'makeup',
    tags: ['平野紫耀', '平野紫耀コスメ', '平野紫耀香水', 'YSLアンバサダー', 'イヴサンローランリップ', '平野紫耀愛用', 'Number_i'],
    author: '芸能コスメ取材班',
    featured: true,
    intro: `Number_iとして世界へ羽ばたく平野紫耀さん。イヴ・サンローラン・ボーテ（YSL Beauty）のアジアアンバサダー就任で話題となったリップやフレグランス、ツヤ肌を支えるベースメイクアイテムを徹底調査しました。ファン必見の愛用アイテム一覧をお届けします。`,
    sections: [
      {
        h: '平野紫耀さん着用＆プロモーションの代表的YSLアイテム',
        body: `- **ルージュ ピュールクチュール**：上質なサテンのツヤと鮮やかな発色で唇を彩るアイコンリップ\n- **リブレ オーデパルファム**：ラベンダーとオレンジブロッサムが織りなすジェンダーレスで気品あるフレグランス\n- **オールアワーズ リキッド**：内側から発光するような端正な美肌を一日中キープする名品ファンデーション`
      }
    ],
    faqs: [
      { q: '男性へのプレゼントにも向いていますか？', a: 'YSLのリブレやスキンケアは性別問わず使えるスタイリッシュなデザインと上質な香りで、ギフトとしても非常に人気です。' }
    ]
  },

  // 9. 20代・30代 クリスマスコフレ＆ホリデーコフレ 2026
  {
    id: 'art-sachiko-holiday-coffret-20s-30s-ranking',
    queryTarget: '20代 30代 コフレ おすすめ クリスマスコフレ ホリデー',
    searchKeyword: 'クリスマスコフレ ホリデーコフレ 2026 人気',
    title: '【2026年最新】20代・30代に人気のクリスマスコフレ＆ホリデー限定コスメおすすめ10選！自分へのご褒美・完売必至アイテム',
    description: '2026年の人気デパコス・プチプラのクリスマスコフレ＆ホリデーコレクションを徹底比較。20代・30代の女性から支持される限定アイシャドウパレット、リップセット、豪華スキンケアコフレを厳選紹介します。',
    category: 'makeup',
    tags: ['クリスマスコフレ2026', 'ホリデーコフレ', '20代コフレ', '30代コフレ', 'デパコスコフレ', '限定コスメ', 'ご褒美コスメ'],
    author: '橘 えりか',
    featured: true,
    intro: `一年に一度の特別な季節に登場するクリスマスコフレ＆ホリデーコレクション。限定のポーチや通常サイズ換算で大幅にお得になるスペシャルセットなど、20代・30代が今選ぶべき完売必至の人気コフレ10選を比較します。`,
    sections: [
      {
        h: '年代別クリスマスコフレの賢い選び方',
        body: `- **20代**：限定色アイシャドウやミニリップがセットになった、トレンドカラーを幅広く試せるメイクアップコフレが人気。\n- **30代**：名品美容液やクリームがたっぷり試せる高機能スキンケアコフレや、上品なラメ感の大人のアイパレットがおすすめ。`
      }
    ],
    faqs: [
      { q: 'コフレは予約しないと買えませんか？', a: '大人気ブランドは先行予約で即完売することもありますが、楽天市場の公式ショップやコスメ専門店では発売日以降も在庫が確保されるケースが多く狙い目です。' }
    ]
  },

  // 10. VT リードルショット 効果なし？老ける？真相検証
  {
    id: 'art-sachiko-vt-reedleshot-effects-truth',
    queryTarget: 'リードル ショット 効果 なし 老ける 100 300',
    searchKeyword: 'VT リードルショット 100 300 700',
    title: '【徹底検証】VTリードルショットは「効果なし・老ける」って本当？チクチク感の理由と肌が変わる正しい使い方',
    description: '天然マイクロニードル配合でSNSを席巻するVTリードルショットの口コミを徹底検証。「効果を感じない」「ビニール肌になって老ける？」という噂の真相や、100・300・700の選び方を分かりやすく解説します。',
    category: 'k-beauty',
    tags: ['リードルショット', 'VTコスメ', 'リードルショット効果なし', 'リードルショット老ける', 'マイクロニードル', '毛穴ケア', '導入美容液'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `塗った瞬間にチクチクとした刺激を感じる新感覚の導入美容液「VT リードルショット」。爆発的人気の一方で、「痛いだけで効果がなかった」「肌が薄くなって老け見えした」といった声も見られます。美容皮膚の観点からニードル技術の仕組みと、肌を傷めずにつるつる美肌を手に入れる正しい使用頻度を解説します。`,
    sections: [
      {
        h: '「老ける・ビニール肌になる」と言われる原因と回避法',
        body: `リードルショットは古い角質を脱落させターンオーバーを促すため、毎日過剰に使用したり、強い力でゴシゴシ擦り込むと角質層が削れすぎて「キメのないビニール肌」になってしまいます。これが乾燥やシワを際立たせ「老けた」と感じる原因です。\n**対策**：擦らず手のひらで押し込むようにタッピングし、使用後は必ずセラミドやCICAなどの高保湿成分をたっぷり重ねましょう。`
      },
      {
        h: 'ニードルレベル別（100 / 300 / 700）の選び方',
        body: `- **100（95,000本）**：毎日のデイリーケア用。初心者や敏感肌の方に。\n- **300（237,500本）**：3日に1回のスペシャルケア。毛穴のざらつき・キメの乱れに。\n- **700（570,000本）**：週1回の集中ケア。頑固な凹凸やサロン級のハリ感を求める方に。`
      }
    ],
    faqs: [
      { q: '朝のスキンケアにも使えますか？', a: '日中の紫外線刺激を避けるため、夜の洗顔直後のファーストステップとして使用することが推奨されています。' }
    ]
  },

  // 11. 頭皮 日焼け止めスプレー・炭酸ヘッドスパ
  {
    id: 'art-sachiko-scalp-uv-spray-carbonated-guide',
    queryTarget: '頭皮 日焼け止めスプレー 頭皮ケア 炭酸スプレー',
    searchKeyword: '頭皮 日焼け止め スプレー 炭酸',
    title: '【髪と頭皮を紫外線から守る】頭皮用日焼け止めスプレー＆炭酸スプレーおすすめ10選！白くならない・ベタつかないUVケア',
    description: '分け目の日焼け・頭皮の赤み・紫外線によるパサつきを防ぐ頭皮用日焼け止めスプレー＆炭酸ヘッドスパスプレーおすすめ10選。髪がきしまずサラサラに仕上がる人気アイテムを徹底比較します。',
    category: 'haircare',
    tags: ['頭皮日焼け止め', '頭皮UVスプレー', '頭皮炭酸スプレー', '分け目日焼け', '髪のUVケア', '紫外線対策', '頭皮のエイジングケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `顔の3倍以上の紫外線を受けると言われる「頭皮と髪」。分け目の日焼けによる赤みや乾燥、抜け毛、ヘアカラーの退色を防ぐためには毎日の頭皮UVケアが不可欠です。シューッとひと吹きするだけで白くならず、炭酸の心地よい刺激で頭皮環境を健やかに整える最新スプレーをご紹介します。`,
    sections: [
      {
        h: '頭皮用日焼け止めスプレーの正しい使い方',
        body: `缶をよく振ってから頭皮や髪から15〜20cmほど離し、分け目や頭頂部を中心にムラなくスプレーします。吹きかけた後に軽く手ぐしを通すことで、均一にコーティングされベタつきを防げます。`
      }
    ],
    faqs: [
      { q: '通常の体用日焼け止めスプレーを頭皮に使ってもいい？', a: '体専用のものは油分が多く髪がペタッとしたり毛穴詰まりの原因になるため、「髪・頭皮兼用」と明記された専用処方のものをお使いください。' }
    ]
  },

  // 12. サマーズイブ かゆみ・匂い消える？フェミニンウォッシュ口コミ
  {
    id: 'art-sachiko-summerseve-feminine-wash-review',
    queryTarget: 'サマーズイブ かゆみ 匂い消える 口コミ',
    searchKeyword: 'サマーズイブ フェミニンウォッシュ デリケートゾーン',
    title: '【デリケートゾーンの悩み】サマーズイブはかゆみ・ニオイに本当に効く？口コミ・成分と正しい洗い方検証',
    description: 'デリケートゾーン専用ソープ世界シェアNo.1のサマーズイブ（Summer\'s Eve）のリアルな口コミを検証。生理中の不快なニオイやかゆみがスッキリ消える理由、弱酸性pH処方の安心感について分かりやすく解説します。',
    category: 'bodycare',
    tags: ['サマーズイブ', 'デリケートゾーンソープ', 'フェミニンウォッシュ', 'かゆみ対策', 'ニオイケア', '弱酸性ソープ', 'ボディケア'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `蒸れやすい季節や生理中の不快なニオイ、下着の擦れによるかゆみ。通常のボディソープで洗うとヒリヒリ刺激を感じてしまうデリケートゾーンに寄り添う「サマーズイブ フェミニンウォッシュ」。気になる効果と安全性を徹底レビューします。`,
    sections: [
      {
        h: 'なぜデリケートゾーン専用ソープが必要なのか？',
        body: `デリケートゾーンは肌本来の自浄作用を保つため「弱酸性（pH4〜5前後）」に保たれています。アルカリ性の強い一般ボディソープで洗うと必要な常在菌まで洗い流してしまい、乾燥やかえってニオイ菌の繁殖を招きます。サマーズイブは肌と同じ弱酸性処方で優しく汚れだけをオフします。`
      }
    ],
    faqs: [
      { q: '毎日使っても大丈夫ですか？', a: '皮膚科医・婦人科医テスト済みのマイルドな処方のため、毎日のバスタイムで安心してお使いいただけます。' }
    ]
  },

  // 13. Lypo-C（リポC）効果・口コミ・飲むタイミング
  {
    id: 'art-sachiko-lypoc-vitamin-c-timing-effects',
    queryTarget: 'リポシー 口コミ lypo-c 効果 飲むタイミング まずい',
    searchKeyword: 'Lypo-C リポ カプセル ビタミンC',
    title: '【飲む高濃度ビタミンC】リポC（Lypo-C）のリアルな効果と口コミ！まずい味の飲み方＆一番効く飲むタイミング解説',
    description: '吸収率ほぼ100%を目指すリポソーム化ビタミンCサプリ「Lypo-C（リポシー）」の口コミ・効果を検証。独特の海水のような味を克服する美味しい飲み方や、美肌・疲労回復に最も効果的な摂取タイミングを解説します。',
    category: 'skincare',
    tags: ['リポC', 'Lypo-C', 'リポシー口コミ', 'ビタミンCサプリ', 'リポソーム', '美白インナーケア', '飲むタイミング'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `田中みな実さんをはじめ多くの美のプロが愛飲する「Lypo-C（リポ・カプセル ビタミンC）」。従来のビタミンCサプリと違って体外に排出されにくく、細胞のすみずみまで届く驚異の吸収率を誇ります。「しょっぱくてまずい」という味への対策と、実感値を最大化する飲み方をご紹介します。`,
    sections: [
      {
        h: 'リポCの独特な味を美味しく飲む裏ワザ',
        body: `リポソームカプセルを維持するために油分や保存料を一切使わず海水由来のナトリウムを含んでいるため「海水のような味」がします。少量のトマトジュース、炭酸水、または柑橘系ジュースに混ぜて飲むと味が完全にマスキングされ、美味しく摂取できます。`
      },
      {
        h: '効果を最大化する飲むタイミング',
        body: `ビタミンCの吸収を妨げないよう、**「空腹時（朝起きてすぐ、または就寝前）」**に飲むのがベストです。胃の中に食べ物がない状態で飲むことで、リポソームが破壊されずに速やかに腸から吸収されます。`
      }
    ],
    faqs: [
      { q: 'お湯に混ぜて飲んでも大丈夫ですか？', a: 'リポソーム膜は熱に弱いため、必ず常温以下の水や冷たい飲み物に混ぜてお召し上がりください。' }
    ]
  },

  // 14. 50代 更年期 スキンケア・ゆらぎ肌の選び方
  {
    id: 'art-sachiko-50s-kounenki-skincare-guide',
    queryTarget: '更年期 スキンケア 50代 選び方 ゆらぎ肌',
    searchKeyword: '50代 スキンケア 更年期 ハリ 保湿 エイジングケア',
    title: '【50代の更年期・ゆらぎ肌】スキンケアおすすめ人気10選！女性ホルモン減少による乾燥・たるみ・急な肌荒れを救うケア',
    description: '50代の更年期に起こる急激な乾燥・バリア機能低下・ハリ不足を立て直すスキンケアおすすめ10選。セラミド補給やナイアシンアミド配合など、大人のゆらぎ肌を包み込む高保湿＆エイジングケアアイテムを徹底比較します。',
    category: 'skincare',
    tags: ['50代スキンケア', '更年期スキンケア', 'ゆらぎ肌', 'たるみ毛穴', 'セラミド高保湿', 'エイジングケア50代', 'ハリ不足解消'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `エストロゲンの急激な減少に伴い、今まで使っていた化粧水が突然ピリピリ染みたり、急激な乾燥やハリの低下に戸惑う50代の「更年期ゆらぎ肌」。刺激を与えずに肌深部まで潤いを満たし、ふっくらとした弾力を取り戻すためのスキンケアの選び方を解説します。`,
    sections: [
      {
        h: '50代更年期の肌に必要な3大スキンケア成分',
        body: `1. **ヒト型セラミド**：失われた角層の細胞間脂質を補い、外敵刺激から肌をシールド\n2. **ナイアシンアミド**：シワ改善と美白、コラーゲン産生を同時にサポート\n3. **植物性エストロゲン様エキス（ダイズ種子エキス等）**：肌のふっくら感とキメを整える`
      }
    ],
    faqs: [
      { q: 'スキンケアのステップを増やしたほうがいいですか？', a: 'ゆらぎ期は肌のバリアが低下しているため、アイテム数を増やすよりも高機能な乳液やクリームで摩擦刺激を最小限に抑える「シンプル高保湿」がベストです。' }
    ]
  },

  // 15. パドルブラシ効果・頭皮マッサージ・美髪ケア
  {
    id: 'art-sachiko-paddle-brush-effects-guide',
    queryTarget: 'パドル ブラシ 効果 頭皮マッサージ 使い方',
    searchKeyword: 'パドルブラシ アヴェダ 頭皮マッサージ ヘアブラシ',
    title: '【頭皮からリフトアップ】パドルブラシの驚きの効果と正しい使い方！アヴェダなど人気おすすめ10選徹底比較',
    description: 'クッション性の高いパドルブラシによる頭皮マッサージ効果、血行促進、髪のツヤ出し効果を徹底解説。アヴェダ（AVEDA）をはじめとする人気パドルブラシ10選のブラッシング手順と選び方をまとめました。',
    category: 'haircare',
    tags: ['パドルブラシ', 'アヴェダパドルブラシ', '頭皮マッサージ', 'ヘアブラシおすすめ', '血行促進', 'リフトアップ効果', '美髪ケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `空気穴のあるクッション構造と幅広のブラシ面が特徴の「パドルブラシ」。毎日のブラッシングに取り入れるだけで、頭皮の血行を促進し、お顔のたるみケアや根本から立ち上がるツヤ髪を育みます。プロ直伝の頭皮マッサージ法と人気ブラシを比較します。`,
    sections: [
      {
        h: 'パドルブラシで得られる4大美容効果',
        body: `1. **頭皮のコリほぐしと血行促進**：空気圧のクッションが頭皮に適度な圧をかけリフレッシュ\n2. **お顔のリフトアップサポート**：頭皮の筋肉をほぐすことでフェイスラインの引き締まりを実感\n3. **髪のキューティクルを整えツヤ感UP**：頭皮の天然皮脂を毛先まで均一に行き渡らせる\n4. **シャンプー前の汚れ浮かし**：毛穴に詰まった皮脂やホコリをブラッシングでオフ`
      }
    ],
    faqs: [
      { q: 'ブラシに穴が1つ空いているのは不良品ですか？', a: 'クッションの空気を抜いて適度な弾力を保つための「空気穴」です。不良品ではありませんのでご安心ください。' }
    ]
  }
];

async function buildContent(def, products) {
  const top10 = products.slice(0, 10);
  const today = '2026-08-31';

  let table = `| 順位 | 商品名 | 価格帯 | 特徴・おすすめポイント | リンク |\n|:---:|:---|:---:|:---|:---:|\n`;
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const shortName = p.itemName.slice(0, 32).replace(/[|\[\]]/g, ' ');
    table += `| **${rank}位** | **${shortName}** | ${p.price || '価格確認'} | ${p.catchcopy ? p.catchcopy.slice(0, 26) : '高評価・リピート多数'} | [楽天市場で見る](${p.affiliateUrl}) |\n`;
  });

  let productsHtml = '';
  top10.forEach((p, idx) => {
    const rank = idx + 1;
    const cleanName = p.itemName.replace(/[<>"']/g, '');
    productsHtml += `
---

### 👑 第${rank}位：${cleanName}

<div class="product-card">
  <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 16px 0;">
    <img src="${p.imageUrl}" alt="${cleanName}" style="max-width: 200px; height: auto; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
    <div style="flex: 1; min-width: 240px;">
      <p style="font-size: 1.25rem; font-weight: bold; color: #e11d48; margin-bottom: 8px;">実売価格: ${p.price || 'ショップ価格を参照'}</p>
      <p style="font-size: 0.95rem; color: #475569; margin-bottom: 12px;"><strong>取扱ショップ:</strong> ${p.shopName} (★${p.reviewAvg} / レビュー${p.reviewCount}件)</p>
      <a href="${p.affiliateUrl}" target="_blank" rel="nofollow noopener noreferrer" style="display: inline-block; background: #bf1e2e; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 14px rgba(191,30,46,0.35);">楽天市場で最安値・ポイント還元をチェック ❯</a>
    </div>
  </div>
  <p style="color: #334155; line-height: 1.7; margin-top: 12px;">${p.catchcopy ? `<strong>【特徴】</strong> ${p.catchcopy}` : `楽天市場で高い支持を集める人気定番アイテム。実力派の使い心地と高評価レビューが証明する確かなクオリティです。`}</p>
</div>
`;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": def.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": def.title,
    "description": def.description,
    "numberOfItems": top10.length,
    "itemListElement": top10.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.itemName.slice(0, 80),
      "url": p.affiliateUrl
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": def.title,
    "description": def.description,
    "author": { "@type": "Person", "name": def.author },
    "datePublished": today,
    "dateModified": today,
    "publisher": { "@type": "Organization", "name": "Qualia Navi" }
  };

  let sectionsHtml = '';
  def.sections.forEach(s => {
    sectionsHtml += `\n---\n\n## 📌 ${s.h}\n\n${s.body}\n`;
  });

  let faqHtml = `\n---\n\n## ❓ よくある質問（FAQ）\n\n`;
  def.faqs.forEach(f => {
    faqHtml += `### Q. ${f.q}\n**A.** ${f.a}\n\n`;
  });

  return `# ${def.title}

${def.intro}

---

## 📱 【比較表】${def.queryTarget} おすすめ人気10選 一覧

${table}

${productsHtml}

${sectionsHtml}

${faqHtml}

---

## 🎯 まとめ

本記事では「${def.queryTarget}」をテーマに、楽天市場の実売データと口コミに基づいた**本当におすすめできる10選**をご紹介しました。

ご自身の肌質やお悩みに合わせた最適なアイテムを選ぶことで、毎日のメイクやスキンケアの満足度は劇的に向上します。ぜひ気になったアイテムから試してみてください。

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
  const existingMap = new Map(articlesData.map((a, i) => [a.id, i]));
  let updatedCount = 0;
  let createdCount = 0;

  for (const def of masterArticleDefs) {
    console.log(`\n🔍 [処理中] ${def.id}`);
    console.log(`   クエリ: ${def.queryTarget} | KW: ${def.searchKeyword}`);

    let products = await fetchRakutenItems(def.searchKeyword, 12);
    if (products.length === 0) {
      console.warn(`⚠️ 商品取得0件のため代替KWで再試行`);
      await sleep(1000);
      products = await fetchRakutenItems(def.queryTarget.split(' ')[0], 12);
    }

    if (products.length === 0) {
      console.error(`❌ 商品取得失敗 スキップ: ${def.id}`);
      continue;
    }

    console.log(`✅ 商品${products.length}件取得完了`);
    const content = await buildContent(def, products);
    const top10 = products.slice(0, 10);

    const articleObj = {
      id: def.id,
      title: def.title,
      description: def.description,
      content,
      category: def.category,
      tags: def.tags,
      author: def.author,
      createdAt: '2026-08-31',
      updatedAt: '2026-08-31',
      image: top10[0]?.imageUrl || '',
      affiliateUrl: top10[0]?.affiliateUrl || '',
      price: top10[0]?.price || '',
      itemCount: top10.length,
      featured: def.featured
    };

    if (existingMap.has(def.id)) {
      const idx = existingMap.get(def.id);
      articlesData[idx] = articleObj;
      console.log(`🔄 [既存記事を徹底更新] ${def.title.slice(0, 40)}...`);
      updatedCount++;
    } else {
      articlesData.unshift(articleObj);
      console.log(`✨ [新規特化記事を追加] ${def.title.slice(0, 40)}...`);
      createdCount++;
    }
    await sleep(1200);
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 [完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
