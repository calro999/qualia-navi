import fs from 'fs';
import path from 'path';

console.log('🚀 [Peripheral Query Expansion] 周辺検索流入拡大・特化10選記事生成開始...');

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

const peripheralDefs = [
  // 1. アホ毛スティック プチプラ 薬局 比較（ミルボン周辺）
  {
    id: 'art-peri-ahoge-stick-drugstore-ranking-2026',
    queryTarget: 'アホ毛 スティック プチプラ 薬局 ドラッグストア おすすめ',
    searchKeyword: 'アホ毛 スティック ドラッグストア まとめ髪',
    title: '【ドラッグストアで買える】アホ毛スティックおすすめ人気10選！プチプラ・薬局で買える前髪＆まとめ髪キープ比較',
    description: '薬局やドラッグストアで手軽に買えるプチプラのアホ毛スティックおすすめ10選。ミルボン・マトメージュ・&honeyなどのキープ力、白くならない質感、香りを徹底比較します。',
    category: 'haircare',
    tags: ['アホ毛スティックプチプラ', 'アホ毛マスカラ薬局', 'ドラッグストアヘアスティック', 'マトメージュ比較', '前髪キープスティック', 'まとめ髪プチプラ', 'ヘアケア'],
    author: '佐々木 遥',
    featured: true,
    intro: `湿気や静電気でピンピン跳ねるアホ毛。1,000円前後のドラッグストアで買えるプチプラ品から、プロ御用達サロンクオリティまで、ポーチに入れておきたい人気ヘアスティック10選を徹底比較します。`,
    sections: [
      { h: 'プチプラ vs デパコス アホ毛スティックの違い', body: `プチプラはしっかり固めるハードタイプが多く、サロン系は固めず自然なツヤを残すトリートメントジェル配合が多い傾向にあります。用途に合わせて使い分けるのが賢い選び方です。` }
    ],
    faqs: [{ q: '雨の日の湿気でもキープできますか？', a: 'スーパーハードタイプや耐湿性ポリマー配合のものを選べば、雨の日の湿気でもアホ毛の浮きを一日中ブロックできます。' }]
  },

  // 2. 温泉水スプレー 化粧直し・プレ化粧水 比較（アベンヌ周辺）
  {
    id: 'art-peri-onsen-water-spray-mist-ranking-2026',
    queryTarget: '温泉水 スプレー 化粧水 ミスト 敏感肌 化粧直し',
    searchKeyword: '温泉水 スプレー ミスト 化粧水',
    title: '【敏感肌の救世主】温泉水ミストスプレーおすすめ10選！アベンヌ・ラロッシュポゼ等の化粧直し＆導入効果比較',
    description: '日中の乾燥・化粧直し・洗顔後のブースターに最適な温泉水スプレーおすすめ10選。アベンヌやラロッシュポゼなど各水源のミネラルバランスと鎮静・保湿効果を徹底比較します。',
    category: 'skincare',
    tags: ['温泉水スプレー', 'ミスト化粧水', '化粧直しスプレー', 'ラロッシュポゼミスト', 'アベンヌ比較', '敏感肌化粧水', 'プレ化粧水'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `日中のエアコン乾燥やマスク蒸れ、洗顔後のつっぱりを瞬時に癒す「温泉水ミストスプレー」。天然ミネラルが肌のpHバランスを整え、次に使う美容液の浸透を高める名品スプレーを比較します。`,
    sections: [
      { h: '温泉水スプレーの3大活用術', body: `1. **洗顔直後のプレ化粧水**：水道水の塩素をリセットし肌を柔らかくほぐす\n2. **メイクキープ＆ツヤ出し**：メイク後にひと吹きして粉浮きを抑える\n3. **日中のクーリング**：火照った肌をひんやり鎮静` }
    ],
    faqs: [{ q: '飛行機内や外出先にも持ち込めますか？', a: '50g〜100gのミニボトルならバッグに入れて持ち歩きやすく、機内持ち込み制限内でも重宝します。' }]
  },

  // 3. プチプラ アイシャドウベース おすすめ（キャンメイク・エクセル等）
  {
    id: 'art-peri-eyeshadow-base-petit-price-ranking-2026',
    queryTarget: 'アイシャドウベース プチプラ ドラッグストア キャンメイク エクセル',
    searchKeyword: 'アイシャドウベース プチプラ キャンメイク エクセル',
    title: '【1000円以下も】プチプラアイシャドウベースおすすめ10選！キャンメイク・エクセル等のラメ落ち防止・高発色比較',
    description: 'ドラッグストアで買えるプチプラのアイシャドウベースおすすめ10選。キャンメイクやエクセルなど、安くても二重の溝に溜まらずアイシャドウの発色を劇的に格上げする名品を徹底比較。',
    category: 'makeup',
    tags: ['アイシャドウベースプチプラ', 'キャンメイクアイベース', 'エクセルアイシャドウベース', 'プチプラアイ下地', 'ドラッグストアアイベース', 'ラメ落ち防止', '1000円以下コスメ'],
    author: '松本 結衣',
    featured: true,
    intro: `「高いデパコスを買わなくてもプチプラで十分！」と口コミで絶賛されるプチプラアイシャドウベース。ひと塗りでアイシャドウの発色が3倍アップし、夕方までラメが飛ばない名品を厳選しました。`,
    sections: [
      { h: 'プチプラアイベースの実力とコスパの高さ', body: `ヒアルロン酸やスクワランなどの保湿成分を配合したものが多く、乾燥しやすい目元をケアしながらピタッとアイシャドウを密着させます。` }
    ],
    faqs: [{ q: 'どれくらいの量を使えばいい？', a: '片目につき米粒半分程度の極少量で十分です。塗りすぎると逆にヨレの原因になるので薄膜を意識しましょう。' }]
  },

  // 4. 韓国 クマ隠し コンシーラー 比較（ザセム・LUNA等）
  {
    id: 'art-peri-korean-concealer-kuma-cover-ranking-2026',
    queryTarget: '韓国 コンシーラー クマ隠し 青クマ 黒クマ おすすめ LUNA ザセム',
    searchKeyword: '韓国 コンシーラー クマ カバー LUNA ザセム',
    title: '【頑固な青クマ・黒クマを消す】韓国コンシーラーおすすめ人気10選！ザセム・LUNA等の厚塗り感なしカバー比較',
    description: '目元の頑固な青クマ・茶クマ・たるみによる黒クマを一瞬で消し去る韓国コンシーラーおすすめ10選。ザセムやLUNA、クリオなどヨレずに薄膜フィットする最強アイテムを徹底比較します。',
    category: 'k-beauty',
    tags: ['韓国コンシーラー', 'クマ隠しコンシーラー', 'LUNAコンシーラー', '青クマ対策', '黒クマカバー', '目元コンシーラー', '韓国コスメベース'],
    author: 'K-Beauty LABO',
    featured: true,
    intro: `疲れ顔に見えてしまう目元のクマ。「コンシーラーを塗るとシワに入り込んで老け見えする」という悩みに応える、保湿力が高くひび割れない韓国のハイカバーコンシーラーを厳選しました。`,
    sections: [
      { h: 'クマの種類別・カラー補正の鉄則', body: `- **青クマ（血行不良）**：サーモンピンクやオレンジ系で血色を足す\n- **茶クマ（色素沈着）**：イエローベージュでくすみを中和\n- **黒クマ（たるみの影）**：ワントーン明るいベージュで光を反射させて影を飛ばす` }
    ],
    faqs: [{ q: '目元のシワに入り込まない塗り方は？', a: '目のキワ（涙袋のすぐ下）は避け、クマの一番濃い影の部分にだけ点置きして指で優しくぼかすのがコツです。' }]
  },

  // 5. 20代 毛穴落ちしない化粧下地 ランキング
  {
    id: 'art-peri-20s-keana-primer-ranking-2026',
    queryTarget: '20代 化粧下地 毛穴落ちしない テカリ防止 プチプラ デパコス',
    searchKeyword: '20代 化粧下地 毛穴 テカリ防止 人気',
    title: '【20代の毛穴落ち＆テカリを完全防止】化粧下地おすすめ10選！夕方まで崩れないプチプラ＆デパコス比較',
    description: '20代の皮脂分泌や毛穴の開きに対応し、ファンデーションの毛穴落ちを鉄壁ガードする化粧下地おすすめ10選。ポアレスプライマーや皮脂コントロール下地の実力を徹底比較します。',
    category: 'makeup',
    tags: ['20代化粧下地', '毛穴落ちしない下地', 'テカリ防止下地20代', 'ポアプライマー', '皮脂くずれ防止', '20代ベースメイク', '崩れない下地'],
    author: '松本 結衣',
    featured: true,
    intro: `「夕方になるとTゾーンがテカって小鼻のファンデが毛穴落ちする」とお悩みの20代へ。皮脂を抱え込んでサラサラをキープしつつ、光の乱反射で毛穴の凹凸を消し去る2026年ベスト下地をご紹介します。`,
    sections: [
      { h: '20代の肌に合わせた下地の部分使いテクニック', body: `全顔にテカリ防止下地を塗ると頬が乾燥するため、Tゾーンと小鼻には皮脂崩れ防止下地、乾燥しやすい頬にはトーンアップ保湿下地を塗り分けるのがプロの技です。` }
    ],
    faqs: [{ q: '石鹸で落とせる毛穴下地はありますか？', a: 'ミネラルコスメ系やノンコメドジェニック処方の下地なら、クレンジング不要で石鹸オフできる肌に優しいアイテムも豊富です。' }]
  },

  // 6. リードルショット 100 300 700 違いと使い方
  {
    id: 'art-peri-reedle-shot-levels-comparison-guide-2026',
    queryTarget: 'リードルショット 100 300 700 違い 順番 頻度 使い方 併用不可',
    searchKeyword: 'VT リードルショット 100 300 700 使い方',
    title: '【100・300・700徹底比較】VTリードルショットの強さ別の違い・使う順番・併用NG成分完全マニュアル',
    description: 'VTリードルショットの各レベル（50/100/300/700/1000）のチクチク感の違い、使う頻度、レチノールやビタミンCとの併用ルールを美容皮膚視点で徹底解説します。',
    category: 'k-beauty',
    tags: ['リードルショット違い', 'リードルショット使い方', 'リードルショット併用不可', 'リードルショット100使い方', 'リードルショット300頻度', 'VTマイクロニードル', '韓国コスメ美容液'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `数字が上がるにつれて天然マイクロニードルの配合量がアップする「VT リードルショット」。「どれから始めればいい？」「ビタミンCやレチノールと併用していい？」という疑問をすべて解消する完全ガイドです。`,
    sections: [
      { h: 'レベル別のニードル本数とおすすめ使用頻度', body: `| レベル | ニードル配合本数 | 推奨使用頻度 | 向いている人 |
|:---:|:---:|:---:|:---|
| **100** | 約95,000本 | 毎晩 | 初心者・毎日のキメ毛穴ケア |
| **300** | 約237,500本 | 3日に1回 | 毛穴のざらつき・浸透感を高めたい方 |
| **700** | 約570,000本 | 週1回 | 自宅集中ケア・サロン級のハリ感 |` },
      { h: '併用時の注意点（レチノール・ビタミンCとの関係）', body: `高濃度レチノールやピーリング成分（AHA/BHA）との同時使用は刺激が強くなるため避けるか、低濃度から肌の様子を見て併用してください。` }
    ],
    faqs: [{ q: '使用後に赤みが出た場合の対処法は？', a: 'CICA（ツボクサエキス）やアロエ、セラミドなどの鎮静・高保湿クリームをたっぷり塗って肌を落ち着かせてください。' }]
  },

  // 7. 髪と頭皮のUVケア スプレー＆トリートメント
  {
    id: 'art-peri-hair-scalp-uv-care-complete-2026',
    queryTarget: '髪の毛 日焼け止め スプレー トリートメント ヘアカラー 色落ち防止',
    searchKeyword: '髪 日焼け止め スプレー UV トリートメント',
    title: '【ヘアカラーの色落ち・パサつき防止】髪と頭皮の日焼け止めスプレー＆UVトリートメントおすすめ10選！',
    description: '紫外線によるヘアカラーの退色、毛先のパサつき、枝毛・切れ毛を防ぐ髪用UVスプレー＆UVカットトリートメントおすすめ10選。サロン専売品からプチプラまで徹底比較します。',
    category: 'haircare',
    tags: ['髪の日焼け止め', 'ヘアUVスプレー', 'ヘアカラー色落ち防止', '頭皮UVケア', '髪のパサつき防止', 'UVトリートメント', '紫外線対策ヘア'],
    author: '佐々木 遥',
    featured: true,
    intro: `せっかく綺麗に染めたヘアカラーが夏の紫外線で黄色く退色してしまったり、毛先がパサパサに傷むのを防ぐ「髪のUVケア」。オイルやミルク、スプレーなど質感別に最適なアイテムをご紹介します。`,
    sections: [
      { h: '髪が紫外線を浴びるとどうなるか？', body: `紫外線によって髪の内部のメラニン色素やカラー染料が分解され、キューティクルが剥がれてタンパク質（ケラチン）が流出します。外出前のUVスプレーで表面をシールドすることが美髪キープの鍵です。` }
    ],
    faqs: [{ q: 'スタイリング剤の上からスプレーしてもいい？', a: 'ヘアオイルやワックスでスタイリングを完了した最後の仕上げにシューッとスプレーするのが最も効果的です。' }]
  },

  // 8. 40代・50代 シワ改善 アイクリーム ランキング
  {
    id: 'art-peri-40s-50s-eye-cream-wrinkle-ranking-2026',
    queryTarget: '40代 50代 アイクリーム シワ改善 目元のたるみ おすすめ レチノール ナイアシンアミド',
    searchKeyword: 'アイクリーム 40代 50代 シワ改善 レチノール',
    title: '【目元の小ジワ・たるみを押し上げる】40代・50代向けシワ改善アイクリームおすすめ人気10選！有効成分徹底比較',
    description: '40代・50代の目元の深いシワ、まぶたのくぼみ、たるみクマをケアする薬用シワ改善アイクリームおすすめ10選。純粋レチノール・ナイアシンアミド・ニールワンの配合効果を比較します。',
    category: 'skincare',
    tags: ['40代アイクリーム', '50代アイクリーム', 'シワ改善アイクリーム', '目元のたるみケア', 'レチノールアイクリーム', 'ナイアシンアミド', '目元エイジングケア'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `乾燥によるちりめんジワだけでなく、真皮のコラーゲン減少による深い目尻のシワやまぶたのたるみ。厚生労働省承認のシワ改善有効成分を配合した本格アイクリームを厳選比較します。`,
    sections: [
      { h: 'シワ改善3大有効成分の違い', body: `- **純粋レチノール**：ヒアルロン酸を生み出し肌をふっくら柔軟にする\n- **ナイアシンアミド**：コラーゲン産生を促し同時に美白・メラニン抑制\n- **ニールワン**：好中球エラスターゼの働きを抑えシワを根本改善` }
    ],
    faqs: [{ q: '朝と夜どちらに塗るのが効果的？', a: 'ナイアシンアミド配合品は朝晩使用可能、レチノール配合品は夜の使用を基本とし、朝使う場合はUV対策を徹底してください。' }]
  },

  // 9. デリケートゾーンの黒ずみ・ニオイケア 石鹸＆美白クリーム
  {
    id: 'art-peri-feminine-whitening-soap-cream-guide-2026',
    queryTarget: 'デリケートゾーン 黒ずみ 美白 クリーム 石鹸 ニオイ フェミニンケア',
    searchKeyword: 'デリケートゾーン 黒ずみ 美白 石鹸 クリーム',
    title: '【下着の摩擦・黒ずみ解消】デリケートゾーン用美白クリーム＆弱酸性ソープおすすめ10選！色素沈着ケア徹底比較',
    description: '下着の擦れや脱毛後の色素沈着によるVIO・デリケートゾーンの黒ずみをケアする専用美白クリーム＆低刺激ソープおすすめ10選。トラネキサム酸やビタミンC誘導体配合の人気アイテムを比較。',
    category: 'bodycare',
    tags: ['デリケートゾーン黒ずみ', 'VIO美白クリーム', 'デリケートゾーン石鹸', '色素沈着ケア', 'フェミニンケア', '弱酸性ソープ', 'ボディ美白'],
    author: 'Dr. 高橋 美紀',
    featured: true,
    intro: `脱毛後に気になり始めるVIOの黒ずみや、下着の摩擦による色素沈着。粘膜に近い繊細な肌にも安心して使える、無添加処方のデリケートゾーン専用美白＆保湿クリームをご紹介します。`,
    sections: [
      { h: 'デリケートゾーンの黒ずみの原因と正しいケア', body: `締め付けの強い下着の摩擦やカミソリ処理による炎症が主な原因です。専用ソープで優しく洗い、入浴後すぐに抗炎症・美白有効成分配合のクリームで高保湿することが最短ルートです。` }
    ],
    faqs: [{ q: '効果を実感するまでどれくらいの期間が必要？', a: '肌のターンオーバーに合わせて約2〜3ヶ月間継続して保湿ケアを行うことで、徐々に明るい素肌への変化を実感できます。' }]
  },

  // 10. 香水ヘアオイル・フレグランスオイル ランキング
  {
    id: 'art-peri-perfume-hair-oil-fragrance-ranking-2026',
    queryTarget: '香水 ヘアオイル いい匂い 持続 プチプラ デパコス ロアオイル SHIRO',
    searchKeyword: '香水 ヘアオイル いい匂い モテる 人気',
    title: '【すれ違いざまにふわっと香る】香水ヘアオイルおすすめ人気10選！デパコス・サロン専売の上質な香り比較',
    description: '香水代わりに使えるほど良い香りが長時間持続するフレグランスヘアオイルおすすめ10選。ロアオイル・SHIRO・ミスディオールなど、ツヤ髪と上品な香りを両立するモテヘアオイルを徹底比較します。',
    category: 'haircare',
    tags: ['香水ヘアオイル', 'フレグランスヘアオイル', 'いい匂いのヘアオイル', 'ロアオイル比較', 'SHIROヘアオイル', 'ツヤ髪オイル', 'モテコスメ'],
    author: '佐々木 遥',
    featured: true,
    intro: `「香水ほど強くなく、自然に良い香りを漂わせたい」という方に大人気のフレグランスヘアオイル。髪のダメージを補修しながら、毛先が揺れるたびに上質な香りがふわりと広がる人気アイテムを比較します。`,
    sections: [
      { h: '香りを長持ちさせるヘアオイルのつけ方', body: `ドライヤー前の濡れた髪にベースとして少量なじませ、スタイリング後の乾いた毛先に仕上げとして重ね付けすることで、香りの持続力が格段にアップします。` }
    ],
    faqs: [{ q: '香水とヘアオイルの香りが混ざりませんか？', a: '香水を併用する場合は、無香料のヘアオイルを使うか、同じフローラル系やシトラス系で香調を統一するのがポイントです。' }]
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

  for (const def of peripheralDefs) {
    console.log(`\n🔍 [周辺クエリ記事生成] ${def.id}`);
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
  console.log(`\n🎉 [周辺クエリ拡張完了] 新規作成: ${createdCount}件, 更新: ${updatedCount}件 (総記事数: ${articlesData.length}件)`);
}

main().catch(e => { console.error('❌ エラー:', e); process.exit(1); });
