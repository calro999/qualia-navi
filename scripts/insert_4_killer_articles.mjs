import fs from 'fs';

const poreData = JSON.parse(fs.readFileSync('scratch/rakuten_pore_cleansing_verified.json', 'utf8'));
const autumnData = JSON.parse(fs.readFileSync('scratch/rakuten_warm_autumn_verified.json', 'utf8'));
const pdrnData = JSON.parse(fs.readFileSync('scratch/rakuten_pdrn_peptide_verified.json', 'utf8'));
const innerDryData = JSON.parse(fs.readFileSync('scratch/rakuten_inner_dry_verified.json', 'utf8'));

const articlesToAdd = [
  // 1. 毛穴・皮脂・角栓
  {
    id: 'art-pore-blackhead-keratin-plug-cleansing-balm-enzyme-powder-10sen-2026',
    title: '【頑固な黒ずみ毛穴・角栓を溶かす】クレンジングバーム＆酵素洗顔パウダーおすすめ10選',
    description: 'イチゴ鼻や小鼻のザラつき、酸化して固まった頑固な角栓を「無理に押し出さず」穏やかに溶かして分解！タンパク質分解酵素×炭・クレイ吸着処方の最新クレンジングバーム＆酵素洗顔パウダーを徹底比較。毛穴を広げずにキュッと引き締める正しい洗顔手順と、楽天市場で圧倒的支持を集める実力派10選のリアルタイム実売データを完全網羅。',
    category: 'skincare',
    tags: [
      '毛穴 黒ずみ クレンジングバーム',
      '角栓 溶かす 洗顔 おすすめ',
      '酵素洗顔 毎日 比較',
      'いちご鼻 改善 クレンジング',
      '毛穴ケア 洗顔料 おすすめ',
      'DUO 黒ずみ 毛穴',
      '酵素洗顔 毛穴 角栓'
    ],
    author: '神崎 舞香',
    createdAt: '2026-09-07T03:30:00.000Z',
    updatedAt: '2026-09-07T03:30:00.000Z',
    image: poreData.duo_black.imageUrl,
    affiliateUrl: poreData.duo_black.affiliateUrl,
    price: poreData.duo_black.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ角栓や黒ずみ毛穴は普通の洗顔料では落ちないのか？

「毎日丁寧に洗顔しているのに、小鼻がザラついて黒ずみが消えない」
「毛穴パックや爪で押し出しても、数日でまた同じ角栓が詰まる」
「皮脂を取ろうとゴシゴシ洗いすぎて、余計にテカリと毛穴開きが悪化した」

これらのお悩みを抱える最大の理由は、**角栓の正体が「約70%のタンパク質（古い角質）」と「約30%の皮脂（脂質）」が複雑に混ざり合って硬化したもの**だからです。

通常の洗顔料やオイルクレンジングは「皮脂（油分）」を落とすことは得意ですが、硬く結合した「タンパク質」を分解することはできません。無理に押し出そうとすると毛穴の周囲の皮膚を傷つけ、すり鉢状に凹んだ開き毛穴へと悪化してしまいます。

---

## 角栓を無理なく溶かし去る『分解×吸着・溶解』のWアプローチ

頑固な角栓をダメージレスに除去するためには、成分の科学的特性を活かした2大アプローチの組み合わせが極めて効果的です。

\`\`\`
【アプローチ1：オイル・バームによる油分溶解＆吸着】
クレンジングバーム（炭・クレイ配合）
   ▲ 角栓の「皮脂成分（30%）」を油分となじませて浮かせ、炭・クレイの微細孔で吸着除去
─────────────────────────────────────
【アプローチ2：酵素によるタンパク質分解】
酵素洗顔パウダー（プロテアーゼ・パパイン酵素）
   ▲ 角栓の骨格である「タンパク質（70%）」をアミノ酸レベルで穏やかに加水分解
\`\`\`

---

## 楽天市場で高評価！毛穴・角栓ケア名品10選

楽天市場で口コミ評価とリピート率が圧倒的な、実力派クレンジングバーム＆洗顔料10選を徹底比較します。

### 1. DUO（デュオ） ザ クレンジングバーム ブラックリペア
* **特徴**: 2種の炭と発酵エキスを配合。角栓をほぐして皮脂を吸着し、黒ずみ汚れを根本からすっきり洗い流します。
* **参考実売価格**: ${poreData.duo_black.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.duo_black.affiliateUrl})

### 2. カネボウ スイサイ ビューティクリア パウダーウォッシュN
* **特徴**: 2つの酵素（タンパク質分解酵素・皮脂分解酵素）とアミノ酸系洗浄成分を配合した個包装パウダー。
* **参考実売価格**: ${poreData.suisai_powder.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.suisai_powder.affiliateUrl})

### 3. ファンケル マイルドクレンジングオイル ブラック＆スムース
* **特徴**: 熟成ホップエキスと炭・吸着泥が毛穴の角栓を溶かしてつるんとした素肌へ導きます。
* **参考実売価格**: ${poreData.fancl_cleansing.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.fancl_cleansing.affiliateUrl})

### 4. Obagi（オバジ） オバジC 酵素洗顔パウダー
* **特徴**: ピュアビタミンCと2つの酵素をダブル配合。角栓をオフしながら毛穴を引き締め、キメを整えます。
* **参考実売価格**: ${poreData.obagi_powder.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.obagi_powder.affiliateUrl})

### 5. BANILA CO（バニラコ） クレンジングバーム ポアクラリファイング
* **特徴**: ホホバ種子油とAHA・BHA・LHAのトリプル酸配合。毛穴詰まりをマイルドにピーリングします。
* **参考実売価格**: ${poreData.banila_zero.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.banila_zero.affiliateUrl})

### 6. ソフティモ クリアプロ クレンジングバーム CICA ブラック
* **特徴**: 炭×重曹×CICA成分配合。角栓を浮かせつつ、ゆらぎやすい肌を穏やかに鎮静します。
* **参考実売価格**: ${poreData.kose_softymo.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.kose_softymo.affiliateUrl})

### 7. パパウォッシュ ベーシック 酵素洗顔
* **特徴**: パパイヤ由来の天然パパイン酵素が不要な古い角質だけを選択的に分解するロングセラー。
* **参考実売価格**: ${poreData.papawash_powder.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.papawash_powder.affiliateUrl})

### 8. アテニア スキンクリア クレンズ オイル
* **特徴**: くすみと毛穴汚れの原因となる「肌ステイン」を洗い流すロックローズオイル配合。
* **参考実売価格**: ${poreData.attol_cleansing.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.attol_cleansing.affiliateUrl})

### 9. CLAYGE（クレージュ） クレンジングバーム ブラック
* **特徴**: 天然クレイと吸着炭、ビタミンC誘導体配合。とろけるテクスチャーで摩擦レスに毛穴ケア。
* **参考実売価格**: ${poreData.clayge_cleansing.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.clayge_cleansing.affiliateUrl})

### 10. KANEBO（カネボウ） スクラビング マッド ウォッシュ
* **特徴**: モロッコ溶岩クレイと崩れるスクラブが皮脂を吸着。生泥ペーストが濃密泡に変化して磨き上げます。
* **参考実売価格**: ${poreData.kanabo_scrub.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${poreData.kanabo_scrub.affiliateUrl})

---

## 【実践手順】角栓を再発させない毛穴レス洗顔ルーティン

1. **蒸しタオルで毛穴を緩める（週1〜2回）**: ぬるま湯で絞ったタオルを30秒鼻に乗せ、固まった皮脂を柔らかくする。
2. **乾いた手でバームをなじませる**: 摩擦ゼロでクルクルと円を描き、角栓の頭を浮き上がらせる。
3. **乳化を絶対に行う**: 少量のぬるま湯を手にとり、白く濁るまでしっかりなじませてから洗い流す。
4. **週2回の酵素洗顔プラス**: Tゾーン・小鼻を中心に酵素泡を乗せ、泡を転がすように洗う（擦らない）。
5. **洗顔後はビタミンCとセラミドで即時保湿**: 引き締めとバリア修復を怠らないことで、過剰皮脂の分泌を抑制。`
  },

  // 2. イエベ秋×骨格ストレート
  {
    id: 'art-warm-autumn-straight-skeleton-rich-makeup-cosme-10sen-2026',
    title: '【イエベ秋×骨格ストレート】深みリッチな陰影美！垢抜けテラコッタ＆上質ツヤコスメ10選',
    description: 'オータムタイプの豊潤でシックな温かみカラーと、骨格ストレートのメリハリある肉体美を引き立てる！安っぽく見えない「上質サテン・微細ゴールドパール・深みテラコッタ」を厳選。楽天市場で絶賛されている神コスメ10選と、引き算で洗練させるメイクアップ完全手順を徹底解説。',
    category: 'makeup',
    tags: [
      'イエベ秋 骨格ストレート コスメ',
      'イエベ秋 テラコッタ リップ',
      'イエベ秋 アイシャドウ おすすめ',
      '骨格ストレート 似合うメイク',
      'オータム メイク おすすめ',
      'KATE パンプキンワイン',
      'ルナソル アイカラーレーション 07'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T03:32:00.000Z',
    updatedAt: '2026-09-07T03:32:00.000Z',
    image: autumnData.lunasol_autumn.imageUrl,
    affiliateUrl: autumnData.lunasol_autumn.affiliateUrl,
    price: autumnData.lunasol_autumn.price,
    itemCount: 10,
    featured: true,
    content: `## イエベ秋×骨格ストレートが最高に映える「上質リッチの法則」

パーソナルカラー「イエベ秋（Autumn）」と骨格タイプ「骨格ストレート」の組み合わせは、**クラス感・グラマラスな華やかさ・都会的な知性**を兼ね備えた唯一無二の魅力を持っています。

しかし、大粒ラメを散らしすぎたり、くすみが強すぎるマット一色で仕上げると「老け見え」や「重たい印象」になりがちです。

骨格ストレートのハリのある肌質と、イエベ秋のリッチな温かみを最大限に引き出す鉄則は、**『大粒グリッターではなく上質なサテン・微細ゴールドパールの光沢』**と**『輪郭をシャープに際立たせるコントゥアリング』**です。

---

## 楽天市場で高評価！イエベ秋×骨格ストレート名品コスメ10選

### 1. ルナソル アイカラーレーション 07 ダージリンキャラメル
* **特徴**: 芳醇な紅茶のような深みブラウン。イエベ秋の上品さと骨格ストレートの立体感を格上げする最高峰パレット。
* **参考実売価格**: ${autumnData.lunasol_autumn.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.lunasol_autumn.affiliateUrl})

### 2. KATE リップモンスター 04 パンプキンワイン
* **特徴**: 深みのあるテラコッタブラウン。煮詰めたカボチャとワインのような絶妙な黄みと赤みのバランス。
* **参考実売価格**: ${autumnData.kate_lip_04.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.kate_lip_04.affiliateUrl})

### 3. SUQQU ピュア カラー ブラッシュ
* **特徴**: 肌に溶け込むグラデーションチーク。自然な骨格美と上質な血色感を骨格ストレートの頬骨に宿します。
* **参考実売価格**: ${autumnData.suqqu_blush_warm.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.suqqu_blush_warm.affiliateUrl})

### 4. エクセル スキニーリッチシャドウ SR03 ロイヤルブラウン
* **特徴**: 微細なパールがしっとり密着。プチプラとは思えないサテンのような艶感でオフィスにも最適。
* **参考実売価格**: ${autumnData.excel_eyeshadow_sr03.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.excel_eyeshadow_sr03.affiliateUrl})

### 5. セルヴォーク ディグニファイド リップス 09 テラコッタ
* **特徴**: テラコッタブームの火付け役。透け感のあるセミマットで、塗るだけで即座にこなれ感を演出。
* **参考実売価格**: ${autumnData.celvoke_lip_09.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.celvoke_lip_09.affiliateUrl})

### 6. ADDICTION ザ シングル アイシャドウ
* **特徴**: なめらかに伸び広がるリッチな質感。彫りの深い立体的な目元を単色で作れる名品。
* **参考実売価格**: ${autumnData.addiction_eyeshadow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.addiction_eyeshadow.affiliateUrl})

### 7. rom&nd ジューシーラスティングティント 20 ジュジュフィグ
* **特徴**: 熟したイチジクのようなシックなくすみローズレッド。秋らしい深みとジューシーなツヤを両立。
* **参考実売価格**: ${autumnData.romand_autumn.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.romand_autumn.affiliateUrl})

### 8. THREE シマリング グロー デュオ 01
* **特徴**: 肌本来のツヤと血色を再現するクリーミーハイライト。骨格ストレートのメリハリを自然に強調。
* **参考実売価格**: ${autumnData.three_shimmering.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.three_shimmering.affiliateUrl})

### 9. セザンヌ ナチュラル チークN 10
* **特徴**: 暖かみのあるオレンジベージュ。肌馴染み抜群で、毎日のメイクに寄り添う万能カラー。
* **参考実売価格**: ${autumnData.cezanne_blush_terracotta.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.cezanne_blush_terracotta.affiliateUrl})

### 10. ETVOS ミネラルクラッシィシャドー
* **特徴**: 石けんオフ可能な高保湿アイシャドウ。ミネラルの繊細な艶めきで大人の目元を優しく彩ります。
* **参考実売価格**: ${autumnData.etvos_eyeshadow_warm.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${autumnData.etvos_eyeshadow_warm.affiliateUrl})`
  },

  // 3. PDRN & ペプチド
  {
    id: 'art-pdrn-peptide-salmon-injection-firmness-elasticity-serum-10sen-2026',
    title: '【塗るボトックス＆サーモン注射級】PDRN・ペプチド配合美容液おすすめ10選！ハリ・弾力集中ケア',
    description: '韓国美容医療で大人気の「リジュラン（サーモン注射）」や「ボトックス」の発想を毎日のスキンケアに！肌の再生力とコラーゲン生成をブーストするPDRN（ポリデオキシリボヌクレオチド）と高機能ペプチド美容液を徹底比較。たるみ毛穴やハリ低下を立て直す楽天市場の高評価10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      'PDRN 美容液 おすすめ',
      'ペプチド 美容液 効果',
      '韓国 スキンケア ハリ 弾力',
      'VT PDRN エッセンス',
      '塗るボトックス 美容液',
      'メディキューブ PDRN',
      'サーモン注射 美容液'
    ],
    author: '水城 愛佳',
    createdAt: '2026-09-07T03:34:00.000Z',
    updatedAt: '2026-09-07T03:34:00.000Z',
    image: pdrnData.vt_pdrn.imageUrl,
    affiliateUrl: pdrnData.vt_pdrn.affiliateUrl,
    price: pdrnData.vt_pdrn.price,
    itemCount: 10,
    featured: true,
    content: `## 美容医療級のハリ感を自宅で！PDRN×ペプチドの革新性

年齢とともに進行する「肌のしぼみ」「フェイスラインのもたつき」「涙型のたるみ毛穴」。

これらに対して今、韓国美容界で最も熱い注目を浴びているのが、サーモン注射の主成分である**『PDRN（ポリデオキシリボヌクレオチド）』**と、塗るボトックスとも称される**『機能性ペプチド複合体』**です。

* **PDRNの働き**: サーモンのDNAから抽出された成分で、ヒトのDNA構造と極めて酷似。細胞レベルで肌のターンオーバーと組織修復を促し、内側から押し返すような密度感を蘇らせます。
* **ペプチドの働き**: コラーゲンやエラスチンの生成指令を出すアミノ酸結合体。表情ジワの緊張を緩め、ピンとしたハリ膜を形成します。

---

## 楽天市場で高評価！PDRN・ペプチド美容液おすすめ10選

### 1. VT（ブイティー） PDRN エッセンス 100
* **特徴**: 植物性（高麗人参）由来のフィトPDRNを100,000ppm高配合。肌に吸い付くような濃密な弾力ツヤ肌へ導きます。
* **参考実売価格**: ${pdrnData.vt_pdrn.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.vt_pdrn.affiliateUrl})

### 2. MEDICUBE（メディキューブ） PDRN ピンクアンプル
* **特徴**: サーモンPDRN配合のピンク色アンプル。肌のバリアを整えながら、くすみとハリ不足を集中ケア。
* **参考実売価格**: ${pdrnData.medicube_pdrn.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.medicube_pdrn.affiliateUrl})

### 3. Anua（アヌア） PDRN ヒアルロン酸 カプセル セラム
* **特徴**: PDRNとスマートカプセル化ヒアルロン酸を融合。角層の奥まで素早く浸透し、潤いと弾力を満たします。
* **参考実売価格**: ${pdrnData.anua_pdrn.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.anua_pdrn.affiliateUrl})

### 4. The Ordinary マルチペプチド + HA セラム（旧ビュッフェ）
* **特徴**: マトリキシルやシンエイクなど複数の先端ペプチドを高濃度ブレンドした世界的ベストセラー。
* **参考実売価格**: ${pdrnData.ordinary_peptide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.ordinary_peptide.affiliateUrl})

### 5. イニスフリー レチノール シカ リペア セラム
* **特徴**: 純粋レチノールとCICA、ペプチドを配合。敏感肌でも毎日使える毛穴・キメ改善美容液。
* **参考実売価格**: ${pdrnData.innisfree_peptide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.innisfree_peptide.affiliateUrl})

### 6. ドクターペプチ ペプチド ボリューム エッセンス 2.0
* **特徴**: 塗布すると酸素の微細バブルが発生。肌に密着してペプチド成分の浸透をサポートするバブル美容液。
* **参考実売価格**: ${pdrnData.drpepti_peptide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.drpepti_peptide.affiliateUrl})

### 7. アンプルエヌ（AMPLE:N） ペプチドショット アンプル
* **特徴**: 目に見えるペプチド糸（スレッド）が溶け込む濃密処方。もっちりとした吸いつくような弾力を実感。
* **参考実売価格**: ${pdrnData.amplen_peptide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.amplen_peptide.affiliateUrl})

### 8. COSRX（コスアールエックス） 6ペプチド スキン ブースター
* **特徴**: 6種のペプチドを配合した大容量導入美容液。次に使うスキンケアの効果を底上げします。
* **参考実売価格**: ${pdrnData.cosrx_peptide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.cosrx_peptide.affiliateUrl})

### 9. Torriden（トリデン） ダイブイン セラム
* **特徴**: 5重低分子ヒアルロン酸配合。水分チャージで肌の内側を膨らませ、ペプチドケアの土台を作ります。
* **参考実売価格**: ${pdrnData.torriden_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.torriden_serum.affiliateUrl})

### 10. 魔女工場（Manyo） ビフィダ バイオーム コンプレックス アンプル
* **特徴**: 発酵エキスとペプチド配合。肌本来のバリア機能と基礎体力を高め、ハリのある健やかな肌へ。
* **参考実売価格**: ${pdrnData.manyo_bifida.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${pdrnData.manyo_bifida.affiliateUrl})`
  },

  // 4. インナードライ・ヒト型セラミド
  {
    id: 'art-inner-dry-skin-ceramide-hydration-serum-gel-10sen-2026',
    title: '【肌の奥が乾くインナードライ改善】セラミド高配合導入美容液＆保水ジェルおすすめ10選',
    description: '「表面はテカるのに内側がつっぱる」「夕方になると皮脂崩れと乾燥ジワが同時に起きる」厄介なインナードライを根本から解消！肌の角層ラメラ構造を修復するヒト型セラミドやライスパワーNo.11配合の導入美容液＆高保水ジェルを徹底検証。水分と油分の黄金バランスを取り戻す楽天市場の名品10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      'インナードライ スキンケア おすすめ',
      'ヒト型セラミド 美容液',
      'インナードライ 保湿 化粧水',
      'インナードライ 改善 美容液',
      'セラミド 保水ジェル',
      'キュレル フェイスクリーム',
      'エトヴォス モイスチャライジングセラム'
    ],
    author: '水城 愛佳',
    createdAt: '2026-09-07T03:36:00.000Z',
    updatedAt: '2026-09-07T03:36:00.000Z',
    image: innerDryData.etvos_serum.imageUrl,
    affiliateUrl: innerDryData.etvos_serum.affiliateUrl,
    price: innerDryData.etvos_serum.price,
    itemCount: 10,
    featured: true,
    content: `## 表面テカリ・奥カサカサ「インナードライ」の真実

「あぶらとり紙を使うほど鼻やおでこがテカるのに、洗顔後は肌がつっぱる」
「保湿クリームをたっぷり塗るとニキビができ、さっぱり系を使うと乾燥小ジワが出る」

これこそが現代人に急増している**『インナードライ（乾燥性脂性肌）』**の典型症状です。

肌の表面がベタついているため「脂性肌（オイリー肌）」と誤認しがちですが、実際は**角層内部の水分がスカスカに蒸発しているため、肌が防衛反応として過剰に皮脂を分泌している状態**です。

---

## 解決の鍵は「油分」ではなく「細胞間脂質（セラミド）」の補充

インナードライを立て直す唯一の方法は、クリームの油分でフタをすることではなく、**水分を抱え込む主成分「セラミド（特にヒト型セラミド）」を補給して、角層のラメラ構造を再建すること**です。

\`\`\`
【間違ったケア】
皮脂を強いクレンジングで脱脂 ➔ 水分補給が不十分 ➔ クリームで油膜を貼る
（結果：毛穴が詰まり、肌内部は乾いたまま過剰皮脂が噴出）

【正しいインナードライ改善ケア】
低刺激洗顔 ➔ ヒト型セラミド・ライスパワーで角層保水能を改善 ➔ 軽やかな保水ジェル
（結果：内部の水分が満たされ、防衛皮脂の過剰分泌がストップ）
\`\`\`

---

## 楽天市場で高評価！インナードライ改善コスメおすすめ10選

### 1. ETVOS（エトヴォス） モイスチャライジングセラム
* **特徴**: 5種のヒト型セラミドをバランスよく高濃度配合。水分を逃さない濃密美容液。
* **参考実売価格**: ${innerDryData.etvos_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.etvos_serum.affiliateUrl})

### 2. 花王 キュレル 潤浸保湿フェイスクリーム
* **特徴**: セラミド機能成分と消炎剤配合。ふわっと軽いのに吸い付くように潤う大ベストセラー。
* **参考実売価格**: ${innerDryData.curel_facial_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.curel_facial_cream.affiliateUrl})

### 3. 松山油脂 肌をうるおす保湿スキンケア 保湿美容液
* **特徴**: 大豆由来成分と5種のセラミドを配合。敏感に傾いた肌のバリアを整えます。
* **参考実売価格**: ${innerDryData.matsuyama_ceramide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.matsuyama_ceramide.affiliateUrl})

### 4. アスタリフト ジェリー アクアリスタ
* **特徴**: 世界最小クラスにナノ化したヒト型ナノセラミド配合の先行美容液。洗顔直後の肌に吸い込まれます。
* **参考実売価格**: ${innerDryData.astashit_jelly.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.astashit_jelly.affiliateUrl})

### 5. ミノン アミノモイスト モイストチャージ ミルク
* **特徴**: 9種の保潤アミノ酸配合。こっくりしたテクスチャーがとろけて肌の水分油分バランスを整えます。
* **参考実売価格**: ${innerDryData.minon_amino_milk.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.minon_amino_milk.affiliateUrl})

### 6. チューンメーカーズ（TUNEMAKERS） セラミド 200
* **特徴**: ナノ化された米ヌカ由来の植物性セラミドを高濃度200%配合した原液美容液。
* **参考実売価格**: ${innerDryData.tune_makers_ceramide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.tune_makers_ceramide.affiliateUrl})

### 7. ちふれ 薬用 リンクルジェルクリーム
* **特徴**: ナイアシンアミド配合でシワ改善＆美白。インナードライによるハリ不足をマルチケア。
* **参考実売価格**: ${innerDryData.chifure_ceramide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.chifure_ceramide.affiliateUrl})

### 8. ONE BY KOSE セラム ヴェール ディープリペア
* **特徴**: 日本で唯一「肌の水分保持能を改善する」有効成分ライスパワーNo.11配合の薬用導入美容液。
* **参考実売価格**: ${innerDryData.kose_rice_power.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.kose_rice_power.affiliateUrl})

### 9. 肌ラボ 極潤プレミアム ヒアルロン液
* **特徴**: 8種のヒアルロン酸を贅沢配合。まるで美容液のような濃密さで乾いた角層を潤します。
* **参考実売価格**: ${innerDryData.hadalabo_premium.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.hadalabo_premium.affiliateUrl})

### 10. 無印良品 敏感肌用化粧水 高保湿
* **特徴**: 天然水使用、無香料・無着色・アルコールフリー。たっぷり重ね付けして水分を角層にチャージ。
* **参考実売価格**: ${innerDryData.muji_ceramide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${innerDryData.muji_ceramide.affiliateUrl})`
  }
];

// Insert all 4 into articles.json
const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const newIds = new Set(articlesToAdd.map(a => a.id));
const filtered = articles.filter(a => !newIds.has(a.id));

// Add all 4 at the very beginning
filtered.unshift(...articlesToAdd);

fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2));
console.log('Successfully inserted all 4 articles into src/data/articles.json. Total count:', filtered.length);
