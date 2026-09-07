import fs from 'fs';

const g1 = JSON.parse(fs.readFileSync('scratch/rakuten_batch5_g1_verified.json', 'utf8'));
const g2 = JSON.parse(fs.readFileSync('scratch/rakuten_batch5_g2_verified.json', 'utf8'));
const g3 = JSON.parse(fs.readFileSync('scratch/rakuten_batch5_g3_verified.json', 'utf8'));
const g4 = JSON.parse(fs.readFileSync('scratch/rakuten_batch5_g4_verified.json', 'utf8'));

const articlesToAdd = [
  // 1. ピールオフパック＆密着クレイマスク
  {
    id: 'art-peel-off-clay-mask-pore-tightening-fine-hair-removal-10sen-2026',
    title: '【産毛・角栓ごっそり除去】引き締め効果抜群のピールオフパック＆密着クレイマスク10選',
    description: '「ファンデーションが産毛に引っかかって浮く」「鼻や眉間の黒ずみ・角栓がどうしても落ちない」悩みを即効リセット！顔全体の不要な産毛と古い角質を心地よく剥がし取る最新ピールオフパックと、毛穴の奥から皮脂汚れを吸着して引き締める密着クレイマスクを徹底比較。楽天市場で絶賛される名品10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      'ピールオフパック 毛穴 おすすめ',
      '角栓 取れる パック 剥がす',
      'クレイマスク 毛穴 引き締め',
      'イニスフリー ヴォルカニック クレイマスク',
      'がばいよか 剥がすパック 口コミ',
      '産毛 処理 パック',
      'キールズ レアアースマスク'
    ],
    author: '神崎 舞香',
    createdAt: '2026-09-07T17:10:00.000Z',
    updatedAt: '2026-09-07T17:10:00.000Z',
    image: g1.innisfree_volcanic_clay.imageUrl,
    affiliateUrl: g1.innisfree_volcanic_clay.affiliateUrl,
    price: g1.innisfree_volcanic_clay.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ「産毛と角栓」を同時にケアすると肌が劇的にトーンアップするのか？

「スキンケアを念入りにしても肌触りがザラザラしてくすんでいる」
「朝のファンデーションが密着せず、粉吹きや毛穴浮きを起こしてしまう」

この原因の多くは、**顔全体に密集している「無数の微小な産毛」に、皮脂や大気のホコリが絡みつき、さらに古い角質（角栓）と一体化して肌表面を覆っていること**にあります。

産毛と角栓を物理的・化学的に安全にリセットする2大手法が、**「乾かして一網打尽に剥がすピールオフパック」**と、**「微細ミネラルで毛穴奥の汚れを吸着するクレイマスク」**です。不要なヴェールが剥がれ落ちることで、光が均一に反射する「ゆで卵のようなつるん肌」が蘇ります。

---

## 楽天市場で高評価！ピールオフパック＆クレイマスクおすすめ10選

### 1. イニスフリー スーパーヴォルカニック ポア クレイマスク 2X
* **特徴**: チェジュ島の火山灰（ヴォルカニックスフィア）配合。余分な皮脂と毛穴汚れをパワフルに吸着し、冷涼感ですっきり引き締め。
* **参考実売価格**: ${g1.innisfree_volcanic_clay.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.innisfree_volcanic_clay.affiliateUrl})

### 2. がばいよか 剥がすパック 炭黒
* **特徴**: 炭と馬油配合のピールオフパック。乾いてからゆっくり剥がすだけで、小鼻や眉間の角栓・産毛をごっそりキャッチ。
* **参考実売価格**: ${g1.black_peel_off.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.black_peel_off.affiliateUrl})

### 3. KANEBO（カネボウ） スクラビング マッド ウォッシュ
* **特徴**: モロッコ溶岩クレイ高配合のペーストが、吸着・スクラブ崩壊・濃密泡へと3段階変化する革新的洗顔クレイ。
* **参考実売価格**: ${g1.kanebo_clay_wash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.kanebo_clay_wash.affiliateUrl})

### 4. キールズ（KIEHL'S） レアアース マスク
* **特徴**: アマゾンホワイトクレイ配合。毛穴を開かせる過剰な皮脂を吸い上げ、なめらかで透明感のある素肌へ。
* **参考実売価格**: ${g1.kiehls_clay_mask.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.kiehls_clay_mask.affiliateUrl})

### 5. ナイアード ガスール 粉末
* **特徴**: モロッコ産の天然粘土100%。水で溶いてペーストにする本格派で、ミネラルが肌の潤いを守りながら汚れを吸着。
* **参考実売価格**: ${g1.ghassoul_clay.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.ghassoul_clay.affiliateUrl})

### 6. ツルリ 黒ずみ吸着 うるおいガスールパック
* **特徴**: モロッコ産ガスールと黒糖エキス配合。お風呂場でそのまま塗って洗い流せる手軽な角栓・ザラつき対策ペースト。
* **参考実売価格**: ${g1.tsururi_peel_pack.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.tsururi_peel_pack.affiliateUrl})

### 7. アルジタル（ARGITAL） グリーンクレイペースト
* **特徴**: シチリア島の海洋性グリーンクレイ（海泥）配合。古い角質やメラニン色素を含む汚れを優しくオフ。
* **参考実売価格**: ${g1.argital_green_clay.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.argital_green_clay.affiliateUrl})

### 8. メディキューブ ゼロ毛穴 クレイパック
* **特徴**: 5種類の複合クレイと毛穴引き締め特許成分配合。短時間のパックで毛穴の引き締まりを実感。
* **参考実売価格**: ${g1.medicube_zero_pore_clay.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.medicube_zero_pore_clay.affiliateUrl})

### 9. CLAYGE（クレージュ） ピンククレイパック
* **特徴**: 薬用炭とピンククレイのW吸着。肌をじんわり温める温感処方で毛穴を緩めて黒ずみをスッキリ除去。
* **参考実売価格**: ${g1.clayge_clay_pack.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.clayge_clay_pack.affiliateUrl})

### 10. ルルルン クレンジングバーム CLEAR BLACK
* **特徴**: 炭×泥×酵素のトリプルアプローチ。日々のクレンジングでパック並みの毛穴クリア効果を発揮。
* **参考実売価格**: ${g1.lululun_clay_mask.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.lululun_clay_mask.affiliateUrl})`
  },

  // 2. エルカラクトン配合ヒートケアヘアオイル
  {
    id: 'art-heat-care-hair-oil-elcalactone-damage-repair-10sen-2026',
    title: '【アイロン・ドライヤーの熱を味方に変える】エルカラクトン配合ヒートケアヘアオイル10選',
    description: '毎日のヘアアイロンやドライヤーの熱で毛先がパサパサ・チリつく「熱変性ダメージ」を完全克服！ドライヤーやアイロンの熱（60℃以上）に反応して毛髪内部のアミノ基と結合し、髪のキューティクルを疑似補修する注目成分「エルカラクトン（γ-ドコサラクトン）」配合の名品ヘアオイル＆ミルクを徹底比較。楽天市場の高評価10選の実売データを完全網羅。',
    category: 'haircare',
    tags: [
      'エルカラクトン ヘアオイル おすすめ',
      'アイロン前 ヘアオイル 傷まない',
      'うねり 改善 ヘアオイル サロン',
      'ミルボン エルジューダ 比較',
      'オルビス ヘアミルク 口コミ',
      '熱ダメージ 補修 トリートメント',
      'トラックオイル No3'
    ],
    author: '佐々木 健一',
    createdAt: '2026-09-07T17:12:00.000Z',
    updatedAt: '2026-09-07T17:12:00.000Z',
    image: g2.napla_shea_oil.imageUrl,
    affiliateUrl: g2.napla_shea_oil.affiliateUrl,
    price: g2.napla_shea_oil.price,
    itemCount: 10,
    featured: true,
    content: `## なぜヘアアイロンの熱で髪は硬くパサパサになってしまうのか？

「毎日160℃〜180℃でアイロンを通していたら、毛先がゴワゴワに硬くなった」
「ドライヤーで乾かした直後は綺麗なのに、湿気を吸うとうねって広がる」

髪の主成分であるケラチンタンパク質は、熱を加えると「生卵がゆで卵になる」のと同じように不可逆な**『タンパク質熱変性』**を起こします。一度硬化したタンパク質は水分を保持できなくなり、内部に空洞（ダメージホール）が生じてパサつきの原因となります。

これを防ぎ、むしろ**「熱を味方にして髪の結合を修復する」**のが、菜種油由来の画期的な補修成分**『エルカラクトン（γ-ドコサラクトン）』**です。

---

## 楽天市場で高評価！ヒートケアヘアオイル＆ミルクおすすめ10選

### 1. ナプラ エヌドット（N.） シアオイル
* **特徴**: 超高圧処理したシアバター配合の洗い流さないオイル。熱から髪を守り、軽やかでサラサラな指通りを実現。
* **参考実売価格**: ${g2.napla_shea_oil.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.napla_shea_oil.affiliateUrl})

### 2. ミルボン（MILBON） エルジューダ FO / MO
* **特徴**: サロン専売の金字塔。バオバブオイル配合で、硬くゴワつく髪を根元からしなやかでおさまりの良い状態へ。
* **参考実売価格**: ${g2.milbon_elujuda_sun.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.milbon_elujuda_sun.affiliateUrl})

### 3. オルビス エッセンスインヘアミルク
* **特徴**: SNSで爆発的ヒット。11種のアミノ酸と高保水ミルクが傷んだ髪の内側まで浸透し、しっとりまとめる。
* **参考実売価格**: ${g2.orbis_hair_milk.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.orbis_hair_milk.affiliateUrl})

### 4. トラックオイル（track oil） No.3
* **特徴**: 金木犀（シトラスフローラル）の上質な香り。植物由来99.19%で、乾燥した毛先にリッチな束感と濡れツヤを演出。
* **参考実売価格**: ${g2.track_oil_no3.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.track_oil_no3.affiliateUrl})

### 5. プリュスオー（plus eau） メロウオイル
* **特徴**: 毛髪補修成分エルカラクトン高配合。アイロンの熱を味方にしてキューティクルを密着コートし、うねりを防ぐ。
* **参考実売価格**: ${g2.plus_eau_point_repair.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.plus_eau_point_repair.affiliateUrl})

### 6. 資生堂 フィーノ プレミアムタッチ 浸透美容液ヘアオイル
* **特徴**: 濃密Wオイル処方。わずかな傷みも集中補修し、ベタつかず「つるサラ」の毛先へと導く高コスパ品。
* **参考実売価格**: ${g2.fino_hair_oil.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.fino_hair_oil.affiliateUrl})

### 7. YOLU（ヨル） カームナイトリペア ヘアオイル
* **特徴**: 夜間の摩擦ダメージと乾燥から髪を守るナイトキャップ発想。翌朝の寝癖やうねりを抑えます。
* **参考実売価格**: ${g2.yolu_night_oil.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.yolu_night_oil.affiliateUrl})

### 8. ロレッタ（Loretta） ベースケアオイル
* **特徴**: ローズの香りが広がるサラサラ系オイル。つけた瞬間からベタつかず、サラッとした軽やかな風になびく髪へ。
* **参考実売価格**: ${g2.loretta_base_care.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.loretta_base_care.affiliateUrl})

### 9. モロッカンオイル トリートメント
* **特徴**: アルガンオイル配合の世界的人気オイル。髪のコンディショニングとスタイリングのベースを完璧に整える。
* **参考実売価格**: ${g2.moroccanoil_treatment.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.moroccanoil_treatment.affiliateUrl})

### 10. 大島椿 椿油100%
* **特徴**: 100%天然椿油。熱や紫外線から髪を保護し、髪に必要な水分と油分を保ってツヤを与えます。
* **参考実売価格**: ${g2.curel_hair_moist.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.curel_hair_moist.affiliateUrl})`
  },

  // 3. ブルベ夏×顔タイプアクティブキュート
  {
    id: 'art-cool-summer-active-cute-lavender-pink-lash-bundle-10sen-2026',
    title: '【ブルベ夏×顔タイプアクティブキュート】透明感×目力両立！ラベンダーピンク＆束感まつげ10選',
    description: 'サマータイプの涼しげで澄んだ青み肌と、アクティブキュートの印象的な大きな瞳・ポップな華やかさを最大限に開花させる！ぼんやり見えない「高発色ラベンダーピンクシャドウ」と、K-POPアイドルのような「放射状の束感まつげ」を作る神コスメを厳選。楽天市場で絶賛される名品10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'ブルベ夏 アクティブキュート メイク',
      'ブルベ夏 ピンク アイシャドウ',
      '束感まつげ マスカラ おすすめ',
      'KATE リップモンスター 08',
      'ロムアンド ベアグレープ',
      'クリオ キルラッシュ マスカラ',
      '顔タイプ アクティブキュート コスメ'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T17:14:00.000Z',
    updatedAt: '2026-09-07T17:14:00.000Z',
    image: g3.clio_kill_lash.imageUrl,
    affiliateUrl: g3.clio_kill_lash.affiliateUrl,
    price: g3.clio_kill_lash.price,
    itemCount: 10,
    featured: true,
    content: `## ブルベ夏×アクティブキュートが放つ「ポップな透明感と強い目力」

青みのある明るいトーンが似合う「ブルベ夏（Summer）」と、パーツが大きく元気でエネルギッシュな印象を持つ「顔タイプアクティブキュート」。

このタイプは、サマー特有の「淡いグレージュ」や「くすみカラー」だけでまとめると、持ち前の目力の強さに負けて「地味で元気のない印象」になってしまいがちです。

成功の鉄則は、**『くすみすぎない鮮やかな青みラベンダーピンク・プラムの発色』**と、**『韓国アイドルのようなピンポイントの束感まつげ』**で、瞳のインパクトと澄んだ透明感を同時に主役に立てることです。

---

## 楽天市場で高評価！ブルベ夏×アクティブキュート名品コスメ10選

### 1. CLIO（クリオ） キルラッシュ スーパープルーフ マスカラ
* **特徴**: 韓国アイドルメイクの必需品。ダマにならず毛先までスッと伸び、ピンセットでつまんで束感を作るのに最適なキープ力。
* **参考実売価格**: ${g3.clio_kill_lash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.clio_kill_lash.affiliateUrl})

### 2. KATE リップモンスター 08 モーヴシャワー
* **特徴**: ブルーパールの青ラメが煌めくモーブピンク。ブルベ夏の透明感を引き出しながら、華やかな存在感を放つ限定人気色。
* **参考実売価格**: ${g3.kate_lip_08.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.kate_lip_08.affiliateUrl})

### 3. rom&nd ジューシーラスティングティント 25 ベアグレープ
* **特徴**: 透き通るぶどう色の粘膜リップ。青みと血色の黄金バランスで、アクティブキュートの唇をジューシーに彩る大名作。
* **参考実売価格**: ${g3.romand_juicy_25.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.romand_juicy_25.affiliateUrl})

### 4. JUDYDOLL（ジュディードール） 極細メタルマスカラ
* **特徴**: 金属コームがまつ毛の根元から均一に液を塗布。重ねてもダマにならず、理想のセパレート＆束感を即座にメイク。
* **参考実売価格**: ${g3.judydoll_metal_mascara.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.judydoll_metal_mascara.affiliateUrl})

### 5. キャンメイク シルキースフレアイズ マットタイプ M06 リマグレージュ
* **特徴**: 透け感マットなモーヴピンク。ブルベ夏の肌に自然な立体陰影を作り、大きな瞳をさらに際立たせます。
* **参考実売価格**: ${g3.canmake_silky_06.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.canmake_silky_06.affiliateUrl})

### 6. セザンヌ シングルカラーアイシャドウ 04 クリアラベンダー
* **特徴**: 目元のくすみを一瞬で吹き飛ばすラベンダーブルー。黒目の上や目頭にちょんと置くだけで澄んだ瞳に。
* **参考実売価格**: ${g3.cezanne_single_04.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.cezanne_single_04.affiliateUrl})

### 7. エチュード（ETUDE） プレイカラーアイズ
* **特徴**: 捨て色なしのピンク・モーブ・グリッターパレット。キュートで活発なアイメイクを多彩に楽しめる。
* **参考実売価格**: ${g3.etude_play_color.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.etude_play_color.affiliateUrl})

### 8. デジャヴュ ラッシュノックアウト エクストラボリュームE
* **特徴**: ひと塗りでまつ毛1本1本を太く濃く見せるフィルムマスカラ。お湯落ちなのにパンダ目にならず目力を底上げ。
* **参考実売価格**: ${g3.dejavu_lash_knockout.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.dejavu_lash_knockout.affiliateUrl})

### 9. ペリペラ インク オール ブラックカラ
* **特徴**: 強力カールキープ＆フィックス。湿度や涙にも負けず、上向きカールまつげを夜まで完全ホールド。
* **参考実売価格**: ${g3.peripera_ink_black.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.peripera_ink_black.affiliateUrl})

### 10. ルナソル アイカラーレーション
* **特徴**: 繊細な青みパールと澄んだパープルのグラデーション。大人の洗練された透明感をアクティブキュートにプラス。
* **参考実売価格**: ${g3.lunasol_lavender.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.lunasol_lavender.affiliateUrl})`
  },

  // 4. 飲むセラミド＆リポソームビタミンC
  {
    id: 'art-oral-ceramide-liposomal-vitamin-c-inner-beauty-supplements-10sen-2026',
    title: '【肌荒れ・くすみを内側から浄化】飲むセラミド＆高吸収ビタミンCリポソームサプリ10選',
    description: '「化粧水や美容液をいくら塗っても肌の乾燥や大人ニキビが改善しない」悩みを体の内側から根本解決！消費者庁認可の特定保健用食品「飲む米由来セラミド」と、通常のビタミンCの数倍の吸収率を誇る「リポソーム化ビタミンC」サプリを徹底比較。楽天市場で絶大なリピート率を誇る名品10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      '飲むセラミド 効果 口コミ',
      'リポソーム ビタミンC サプリ おすすめ',
      '肌荒れ 改善 サプリメント 美容',
      'オルビス ディフェンセラ 効果',
      'リポスフェリック ビタミンC',
      'チョコラBB リッチセラミド',
      'インナーケア 肌荒れ 美白'
    ],
    author: '水城 愛佳',
    createdAt: '2026-09-07T17:16:00.000Z',
    updatedAt: '2026-09-07T17:16:00.000Z',
    image: g4.orbis_defencera.imageUrl,
    affiliateUrl: g4.orbis_defencera.affiliateUrl,
    price: g4.orbis_defencera.price,
    itemCount: 10,
    featured: true,
    content: `## なぜスキンケアだけでは限界があるのか？「内側ケア（経口摂取）」の真実

「高額なクリームを使っても、夕方になると頬や口周りがカサつく」
「睡眠不足やストレスですぐに肌荒れや吹き出物ができる」

外側からのスキンケアが届くのは、皮膚の最も表面にあるわずか0.02mmの「角層」までです。

しかし、セラミドを作り出し、コラーゲンやエラスチンを合成している細胞の本体は、その奥深くの「表皮基底層」や「真皮層」に存在します。**血流を通じて内側から直接栄養（セラミド前駆体・高濃度抗酸化成分）を届けるインナーケア**を組み合わせることで、全身の皮膚の水分蒸発を防ぎ、くすみのない透明感を劇的に高めることができます。

---

## 楽天市場で高評価！飲むセラミド＆リポソームサプリおすすめ10選

### 1. オルビス（ORBIS） ディフェンセラ（特定保健用食品）
* **特徴**: 日本で唯一「肌の水分を逃しにくくする」機能が認められたトクホ。高純度グルコシルセラミドが全身の水分を保持。
* **参考実売価格**: ${g4.orbis_defencera.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.orbis_defencera.affiliateUrl})

### 2. リポスフェリック ビタミンC（LivOn社正規品）
* **特徴**: 大豆レシチン由来のリポソーム（リン脂質カプセル）にビタミンCを封入。胃酸で壊れず血中に高濃度で届く究極のビタミンC。
* **参考実売価格**: ${g4.lypricel_vitaminc.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.lypricel_vitaminc.affiliateUrl})

### 3. エーザイ チョコラBB リッチセラミド
* **特徴**: 機能性表示食品。米由来グルコシルセラミド配合の美容ドリンクで、手軽に美味しく肌のバリアをサポート。
* **参考実売価格**: ${g4.chocola_bb_rich.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.chocola_bb_rich.affiliateUrl})

### 4. DHC セラミド モイスチュア
* **特徴**: 機能性表示食品。パイナップル由来グルコシルセラミド配合で、乾燥が気になる肌の潤いを守る高コスパサプリ。
* **参考実売価格**: ${g4.dhc_ceramide.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.dhc_ceramide.affiliateUrl})

### 5. トランシーノ ホワイトCクリア（第3類医薬品）
* **特徴**: L-システイン最大量240mgとビタミンC1000mg配合。過剰なメラニンの無色化と排出を促進する医薬品。
* **参考実売価格**: ${g4.transino_white_c.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.transino_white_c.affiliateUrl})

### 6. ファンケル（FANCL） ディープチャージ コラーゲン
* **特徴**: 吸収されやすいHTCフィッシュコラーゲンペプチドとビタミンC配合。ハリと弾力を内側から育むロングセラー。
* **参考実売価格**: ${g4.fancl_deep_charge.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.fancl_deep_charge.affiliateUrl})

### 7. アスタリフト ドリンク ピュアコラーゲン 10000
* **特徴**: 低分子ピュアコラーゲン10,000mgとオルニチン配合。寝る前に飲む集中ナイトケアドリンク。
* **参考実売価格**: ${g4.astashit_drink.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.astashit_drink.affiliateUrl})

### 8. 資生堂 ザ・コラーゲン ドリンク
* **特徴**: 美の根幹を育てる美容特許成分（コケモモ＋アムラ果実）配合。毎日のすこやかな美しさを後押し。
* **参考実売価格**: ${g4.shiseido_the_collagen.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.shiseido_the_collagen.affiliateUrl})

### 9. NOW Foods L-システイン 500mg
* **特徴**: ビタミンCの働きをサポートし、ターンオーバーと抗酸化を内側から支えるアミノ酸サプリ。
* **参考実売価格**: ${g4.rohto_v5_grain.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.rohto_v5_grain.affiliateUrl})

### 10. DHC 持続型ビタミンC
* **特徴**: 水に溶けやすいビタミンCをタイムリリース処方に。体内でゆっくり溶け出して効率よく吸収される高機能サプリ。
* **参考実売価格**: ${g4.dhc_sustained_vitaminc.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.dhc_sustained_vitaminc.affiliateUrl})`
  }
];

// Insert into articles.json
const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const newIds = new Set(articlesToAdd.map(a => a.id));
const filtered = articles.filter(a => !newIds.has(a.id));

filtered.unshift(...articlesToAdd);

fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2));
console.log('Successfully inserted all 4 Batch 5 articles into src/data/articles.json. Total count:', filtered.length);
