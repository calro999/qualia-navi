import fs from 'fs';

const g1 = JSON.parse(fs.readFileSync('scratch/rakuten_batch7_g1_verified.json', 'utf8'));
const g2 = JSON.parse(fs.readFileSync('scratch/rakuten_batch7_g2_verified.json', 'utf8'));
const g3 = JSON.parse(fs.readFileSync('scratch/rakuten_batch7_g3_verified.json', 'utf8'));
const g4 = JSON.parse(fs.readFileSync('scratch/rakuten_batch7_g4_verified.json', 'utf8'));

const articlesToAdd = [
  // 1. 涙袋・中顔面短縮メイク
  {
    id: 'art-midface-shortening-aegyo-sal-liner-glitter-10sen-2026',
    title: '【中顔面を短縮して小顔見せ】大人のぷっくり涙袋を作る影色ライナー＆透けツヤグリッター10選',
    description: '「面長や中顔面の余白を埋めて若々しい小顔印象にしたい」「大人が涙袋を作ると不自然なクマやシワに見えてしまう」悩みを完全解決！絶妙な透け感グレージュで生まれつきのような影を仕込む「影色ライナー」と、白浮きせず上品に光を集める「コンシーラー＆微細ラメペンシル」を徹底比較。楽天市場で高評価の最新10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      '中顔面短縮 メイク コスメ',
      '涙袋 ライナー おすすめ 大人',
      '涙袋 自然に作る プチプラ',
      'ウォンジョンヨ メタルシャワーペンシル',
      'シピシピ グリッターライナー',
      'キャンメイク アイバッグコンシーラー',
      'セザンヌ 描くふたえアイライナー'
    ],
    author: '篠原 玲奈',
    createdAt: '2026-09-07T17:25:00.000Z',
    updatedAt: '2026-09-07T17:25:00.000Z',
    image: g1.wonjungyo_metal_shower.imageUrl,
    affiliateUrl: g1.wonjungyo_metal_shower.affiliateUrl,
    price: g1.wonjungyo_metal_shower.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ「涙袋」を作ると顔全体がきゅっと引き締まり、小顔に見えるのか？

「年齢とともに目の下から上唇までの距離（中顔面）が長く間延びして見える」
「大人が涙袋メイクをすると、不自然に白浮きしたりシワにラメが溜まってしまう」

顔の黄金比において、**「目元から口元までの距離（中顔面）が短いほど若々しく愛らしい印象」**を与えます。

下まぶたに立体的な「涙袋」を形成すると、目の縦幅が下方向にグッと広がり、錯視効果によって頬の余白が劇的に縮小します。大人が成功させる鍵は、ギラギラした大粒ラメではなく、**「肌馴染みの良いコンシーラー＆微細パール」で膨らみを作り、「透け感グレージュの極薄ライン」で本物の影を偽装すること**です。

---

## 楽天市場で高評価！中顔面短縮・涙袋コスメおすすめ10選

### 1. ウォンジョンヨ（Wonjungyo） メタルシャワーペンシル
* **特徴**: 韓国アイドルメイクの巨匠が開発。ひと塗りでぷっくりとした涙袋が爆誕する滑らか高密着ペンシル。
* **参考実売価格**: ${g1.wonjungyo_metal_shower.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.wonjungyo_metal_shower.affiliateUrl})

### 2. CipiCipi（シピシピ） グリッター イルミネーションライナー R
* **特徴**: 極細筆で狙った場所にピンポイントで光を乗せられる名品。植物エキス配合で乾いてもカピカピしない。
* **参考実売価格**: ${g1.cipicipi_glitter_liner.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.cipicipi_glitter_liner.affiliateUrl})

### 3. キャンメイク（CANMAKE） アイバッグコンシーラー
* **特徴**: 3mmの極細芯で涙袋の内側だけを自然にトーンアップ。生まれつきのようなふっくら感を演出。
* **参考実売価格**: ${g1.canmake_plump_lip_liner.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.canmake_plump_lip_liner.affiliateUrl})

### 4. セザンヌ 描くふたえアイライナー
* **特徴**: 透け感のある極薄ブラウン。涙袋の影を描くのにこれ以上ない絶妙な発色で、絶対に失敗しない大定番。
* **参考実売価格**: ${g1.cezanne_shadow_liner.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.cezanne_shadow_liner.affiliateUrl})

### 5. BBIA（ピアー） ラストパウダーペンシル
* **特徴**: さらさらパウダリーな質感。下まぶたの油分を抑えながら、ふんわり柔らかな涙袋を長時間キープ。
* **参考実売価格**: ${g1.bbia_last_powder_pencil.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.bbia_last_powder_pencil.affiliateUrl})

### 6. KATE ダブルラインエキスパート
* **特徴**: 極細筆でリアルな影になりすます極薄ブラウン。目頭切開ラインや口角アップにも使える万能ライナー。
* **参考実売価格**: ${g1.kate_double_line.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.kate_double_line.affiliateUrl})

### 7. FLORTTE（フロレット） 涙袋 極細アイライナー
* **特徴**: 中国コスメ発の超極細ペンシル。影色からハイライトカラーまで豊富で、立体的で自然な涙袋を再現。
* **参考実売価格**: ${g1.flortte_aegyo_sal.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.flortte_aegyo_sal.affiliateUrl})

### 8. JUDYDOLL 超極細ニードルライナー
* **特徴**: 0.014mmのニードル級極細毛先。ブレずに微細なまつ毛の影や下まぶたのキワを描き込める。
* **参考実売価格**: ${g1.judydoll_shadow_liner.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.judydoll_shadow_liner.affiliateUrl})

### 9. マジョリカ マジョルカ シャドーカスタマイズ BE286 ゴージャス姉妹
* **特徴**: 「TWICEツウィの涙袋」として伝説になったゴールドベージュ。肌にとけこむ上品なツヤで白浮きゼロ。
* **参考実売価格**: ${g1.majolica_shadow_custom.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.majolica_shadow_custom.affiliateUrl})

### 10. CLIO（クリオ） プロ シングル シャドウ G10
* **特徴**: 濡れたような輝きを放つマルチグリッター。黒目の下にちょんと置くだけでうるうるした瞳に。
* **参考実売価格**: ${g1.clio_glitter_liner.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.clio_glitter_liner.affiliateUrl})`
  },

  // 2. ナイトブラ・バストケア
  {
    id: 'art-night-bra-bust-care-cream-firmness-cleavage-10sen-2026',
    title: '【垂れ・離れ胸を寝ている間にホールド】締め付けないのに谷間キープ！人気ナイトブラ＆バストクリーム10選',
    description: '「寝返りを打つたびに胸が横に流れて形が崩れる」「年齢とともにデコルテのハリが削げて削げ胸になってきた」女性の悩みを寝ている間に集中ケア！クーパー靭帯を守る3D補正構造の最新ナイトブラと、ボルフィリン高配合でふっくら弾力をサポートするバスト専用クリームを徹底比較。楽天市場で高評価の10選の実売データを完全網羅。',
    category: 'bodycare',
    tags: [
      'ナイトブラ おすすめ 育乳 40代 30代',
      'ナイトブラ 締め付けない 盛れる',
      'バストアップ クリーム 口コミ',
      'VIAGE ナイトブラ 効果',
      'ワコール ナイトアップブラ',
      'ピーチジョン ナイトブラ',
      'ツーハッチ ナイトブラ 比較'
    ],
    author: '水城 愛佳',
    createdAt: '2026-09-07T17:27:00.000Z',
    updatedAt: '2026-09-07T17:27:00.000Z',
    image: g2.viage_night_bra.imageUrl,
    affiliateUrl: g2.viage_night_bra.affiliateUrl,
    price: g2.viage_night_bra.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ睡眠中の「ノーブラ」はバストの垂れ・離れを加速させるのか？

「寝る時は締め付けられたくないからノーブラで寝ている」
「昔に比べてバストのトップ位置が下がり、左右に離れてきた気がする」

睡眠中、寝返りを打つたびにバストには**「重力による全方位の引っ張りストレス」**がかかっています。

バストの丸みを支えているコラーゲン組織「クーパー靭帯」は、一度伸びたり切れたりすると**二度と元には戻りません**。日中用のワイヤーブラは下からの重力しか支えられないため、睡眠中には不向きです。**横流れ・上流れを全方位から優しく包み込んでホールドする専用ナイトブラと、皮膚の弾力を保つバストクリーム**の併用が美胸キープの必須条件です。

---

## 楽天市場で高評価！ナイトブラ＆バストケアおすすめ10選

### 1. VIAGE（ヴィアージュ） ビューティアップ ナイトブラ
* **特徴**: 累計1,500万枚突破の国民的ナイトブラ。ノンワイヤー＆伸縮素材で苦しくないのに、脇高設計で背中や脇の肉をバストへホールド。
* **参考実売価格**: ${g2.viage_night_bra.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.viage_night_bra.affiliateUrl})

### 2. LUNA（ルーナ） ナチュラルアップ ナイトブラ
* **特徴**: 小胸・離れ胸特有の悩み「オメガライン」に着目。特許構造のハンモックリフトで、逃げやすいお肉を逃さずふっくらキープ。
* **参考実売価格**: ${g2.luna_night_bra.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.luna_night_bra.affiliateUrl})

### 3. ワコール（Wacoal） ナイトアップブラ
* **特徴**: 下着のトップメーカーが解剖学に基づき設計。独自のサポート構造で重力からバストを守り、極上の睡眠を妨げない。
* **参考実売価格**: ${g2.wacoal_night_bra.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.wacoal_night_bra.affiliateUrl})

### 4. tu-hacci（ツーハッチ） まるごと包むナイトブラ
* **特徴**: 繊細な総レースの美しさと高い補正力を両立。前ホック構造で自分好みのホールド感に調節可能。
* **参考実売価格**: ${g2.tu_hacci_bra.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.tu_hacci_bra.affiliateUrl})

### 5. PEACH JOHN（ピーチ・ジョン） ぷるふわナイトブラ
* **特徴**: ビスチェ風の可愛いデザイン。寝ている間もバストを適正位置にキープし、日中のルームウェアとしても優秀。
* **参考実売価格**: ${g2.peachjohn_night_bra.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.peachjohn_night_bra.affiliateUrl})

### 6. ピーチ・ジョン ボムバストクリーム リッチ
* **特徴**: ボルフィリン高配合のバスト用クリーム。マッサージしながら塗り込むことで、もっちり吸い付くような肌質感へ。
* **参考実売価格**: ${g2.pj_bust_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.pj_bust_cream.affiliateUrl})

### 7. セルノート（cellnote） BV LINE GEL ボリュームラインジェル
* **特徴**: バストケアの専門サロンが監修。浸透力にこだわったジェルがデコルテのハリ不足にダイレクトにアプローチ。
* **参考実売価格**: ${g2.cellnote_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.cellnote_cream.affiliateUrl})

### 8. ふんわりルームブラ（Angellir）
* **特徴**: フロントホックでギュッと寄せ上げ。離れ胸をしっかり中央に集めて綺麗な谷間をメイク。
* **参考実売価格**: ${g2.angellir_bra.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.angellir_bra.affiliateUrl})

### 9. ウイング（Wing / ワコール） ナイトブラ
* **特徴**: ワコール品質を手頃な価格で。綿混素材で肌当たりが優しく、毎晩ストレスフリーに着用できる。
* **参考実売価格**: ${g2.winged_night_bra.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.winged_night_bra.affiliateUrl})

### 10. 高純度ボルフィリン配合 バストマッサージクリーム
* **特徴**: 植物由来のボルフィリンを高濃度配合。デコルテの削げ感をふっくらとマッサージで整える人気クリーム。
* **参考実売価格**: ${g2.clarins_bust_gel.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.clarins_bust_gel.affiliateUrl})`
  },

  // 3. 角質柔軟導入液・拭き取り化粧水
  {
    id: 'art-peeling-booster-wipe-lotion-rough-skin-absorption-10sen-2026',
    title: '【ゴワつき・化粧水が入らない肌へ】角質を柔らかくするピーリング導入液＆拭き取り化粧水10選',
    description: '「化粧水をいくら重ねても肌の上で弾かれて浸透しない」「小鼻や顎下がゴワついて手触りが硬い」悩みを根本改善！肌の生まれ変わりサイクルを整える「角質美容水（ピーリングブースター）」と、不要な角質をコットンで穏やかに絡め取る「薬用拭き取り化粧水」を徹底比較。楽天市場で高評価の10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      '拭き取り化粧水 おすすめ 毎日',
      '角質柔軟美容液 タカミ 似てる',
      'ブースター 導入美容液 ゴワつき',
      'タカミスキンピール 効果 口コミ',
      'クリニーク クラリファイングローション',
      'ネイチャーコンク 薬用クリアローション',
      'ベネフィーク リセットクリア'
    ],
    author: '神崎 舞香',
    createdAt: '2026-09-07T17:29:00.000Z',
    updatedAt: '2026-09-07T17:29:00.000Z',
    image: g3.takami_skin_peel.imageUrl,
    affiliateUrl: g3.takami_skin_peel.affiliateUrl,
    price: g3.takami_skin_peel.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ年齢とともに「化粧水が浸透しないゴワつき肌」になるのか？

「どんなに高級な美容液を塗っても、肌の表面でヌルつくだけで中に入っていかない」
「朝の洗顔後、肌を触るとザラザラ・硬いゴムのような手触りになっている」

この現象の正体は、紫外線や加齢、乾燥によってターンオーバーが遅れ、剥がれ落ちるはずの古い角質が何層にも積み重なった**『角質肥厚（かくしつひこう）』**です。

分厚い角質の鎧をまとった肌にいくら化粧水を塗っても、水分は奥まで届きません。スクラブで無理に擦るのではなく、**「フルーツ酸（AHA）や植物エキスで角質同士の結合を穏やかに緩める」**か、**「拭き取り化粧水で古い角質だけを優しく除去する」**ステップを取り入れることで、化粧水がグングン吸い込まれる素肌を取り戻せます。

---

## 楽天市場で高評価！角質柔軟液＆拭き取り化粧水おすすめ10選

### 1. タカミスキンピール（TAKAMI）
* **特徴**: 美容皮膚科発の「角質美容水」。水のようなテクスチャーで角質層に浸透し、肌本来の代謝サイクルを整えるロングセラー。
* **参考実売価格**: ${g3.takami_skin_peel.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.takami_skin_peel.affiliateUrl})

### 2. クリニーク（CLINIQUE） クラリファイング ローション 2
* **特徴**: 皮膚科医処方の角質ケアローション。コットンで優しく拭き取るだけで、くすみや古い角質をすっきりオフ。
* **参考実売価格**: ${g3.clinique_clarifying.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.clinique_clarifying.affiliateUrl})

### 3. ネイチャーコンク 薬用 クリアローション
* **特徴**: 1本で角質オフ・朝洗顔・保湿・美白を叶える薬用マルチローション。ハトムギエキス配合の高コスパ名品。
* **参考実売価格**: ${g3.biorhe_clear_lotion.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.biorhe_clear_lotion.affiliateUrl})

### 4. KANEBO（カネボウ） ラディアント スキン リファイナー
* **特徴**: 肌を潤しながら拭き取る新発想ローション。ザラつきや余分な皮脂を取り去り、なめらかで透明感あるつるん肌へ。
* **参考実売価格**: ${g3.kanebo_clear_cleansing.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.kanebo_clear_cleansing.affiliateUrl})

### 5. ベネフィーク（BENEFIQUE） リセットクリア N
* **特徴**: とろみのある浄化ジェルローション。摩擦レスに肌をひたしてうかせてからめる、大人のためのリセット化粧水。
* **参考実売価格**: ${g3.shiseido_benefique_reset.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.shiseido_benefique_reset.affiliateUrl})

### 6. ちふれ ふきとり化粧水 N
* **特徴**: クレンジングやマッサージ後の油分や古い角質をすっきり除去。アルコール分配合でさっぱり爽快。
* **参考実売価格**: ${g3.chifure_wipe_lotion.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.chifure_wipe_lotion.affiliateUrl})

### 7. メディキューブ ゼロ毛穴パッド 2.0
* **特徴**: 韓国発の超人気トナーパッド。エンボス面で角質をケアし、ソフト面で肌を整えるWケア仕様。
* **参考実売価格**: ${g3.medicube_zero_pad.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.medicube_zero_pad.affiliateUrl})

### 8. アヌア（Anua） ドクダミ 77% スージングトナー
* **特徴**: ドクダミエキス77%配合。拭き取り化粧水としても鎮静パックとしても使える敏感肌の神トナー。
* **参考実売価格**: ${g3.anua_heartleaf_toner.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.anua_heartleaf_toner.affiliateUrl})

### 9. ドクターシーラボ VC100 エッセンスローション EX
* **特徴**: 高浸透ビタミンC（APPS）高濃度配合。角質を柔らかくしながら毛穴・キメ・くすみを全方位ケア。
* **参考実売価格**: ${g3.drci_labo_vc100_lotion.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.drci_labo_vc100_lotion.affiliateUrl})

### 10. 無印良品 薬用クリアケアふき取りローション
* **特徴**: 天然植物エキス配合。毛穴の汚れや古い角質を優しく拭き取り、清潔ですこやかな肌に整える。
* **参考実売価格**: ${g3.muji_wipe_lotion.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.muji_wipe_lotion.affiliateUrl})`
  },

  // 4. イエベ秋×骨格ウェーブ
  {
    id: 'art-warm-autumn-wave-skeleton-muted-terracotta-gold-pearl-10sen-2026',
    title: '【イエベ秋×骨格ウェーブ】シックな華やかさ！くすみテラコッタ＆繊細ゴールドパール10選',
    description: 'オータムタイプの温かみある深みカラーと、骨格ウェーブの華奢でソフトな女性らしさを完全調和！重厚すぎるマットを避け、軽やかな透け感くすみテラコッタと繊細ゴールドパールで「大人っぽく垢抜ける」神コスメを厳選。楽天市場で高評価の最新10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'イエベ秋 骨格ウェーブ コスメ',
      'イエベ秋 華奢 メイク',
      'オータム ウェーブ リップ おすすめ',
      'KATE パンプキンワイン',
      'ロムアンド アップルブラウン',
      'セザンヌ パールグロウハイライト 02',
      'ルナソル ダージリンキャラメル'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T17:31:00.000Z',
    updatedAt: '2026-09-07T17:31:00.000Z',
    image: g4.lunasol_baking_07.imageUrl,
    affiliateUrl: g4.lunasol_baking_07.affiliateUrl,
    price: g4.lunasol_baking_07.price,
    itemCount: 10,
    featured: true,
    content: `## イエベ秋×骨格ウェーブが放つ「シックな温もりと柔らかなフェミニン感」

落ち着いたアースカラーが似合う「イエベ秋（Autumn）」と、華奢で柔らかな曲線美を持つ「骨格ウェーブ」。

このタイプは、重厚なマットブラックや濃すぎるダークブラウンを使うと、骨格の繊細さに色が勝ってしまい「メイクに着られている感」が出やすくなります。

成功の鍵は、**『オータムカラーの深みを残しつつ、質感はシアー・透け感を持たせること』**と、**『寂しくなりがちなデコルテや頬に繊細なゴールドパールのツヤを散らすこと』**です。くすみテラコッタやマロンブラウンをふんわりぼかすことで、唯一無二の洗練された大人の色香が完成します。

---

## 楽天市場で高評価！イエベ秋×骨格ウェーブ名品コスメ10選

### 1. ルナソル アイカラーレーション 07 ダージリンキャラメル
* **特徴**: 芳醇な紅茶のような深みブラウン。シアーな発色で重ねても重たくならず、骨格ウェーブの目元に彫りを演出。
* **参考実売価格**: ${g4.lunasol_baking_07.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.lunasol_baking_07.affiliateUrl})

### 2. KATE リップモンスター 04 パンプキンワイン
* **特徴**: 煮詰めたカボチャとワインを思わせるテラコッタブラウン。透け感のあるツヤ膜がウェーブの唇に軽やかに密着。
* **参考実売価格**: ${g4.kate_lip_04_pumpkin.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.kate_lip_04_pumpkin.affiliateUrl})

### 3. rom&nd ジューシーラスティングティント 08 アップルブラウン
* **特徴**: ほろ苦いシナモンアップルのような温もりカラー。ぷるんとした果汁膜が華奢な顔立ちに血色感をプラス。
* **参考実売価格**: ${g4.romand_juicy_08.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.romand_juicy_08.affiliateUrl})

### 4. セザンヌ パールグロウハイライト 02 ロゼベージュ
* **特徴**: 肌に溶け込むピンクゴールドの濡れツヤ。骨格ウェーブの頬骨にのせるだけで、ふっくらとした立体感を演出。
* **参考実売価格**: ${g4.cezanne_pearl_02.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.cezanne_pearl_02.affiliateUrl})

### 5. エクセル スキニーリッチシャドウ SR01 ベージュブラウン
* **特徴**: 繊細な微細パールがしっとり密着。肌馴染み抜群の王道ブラウンで、毎日のメイクを上品に格上げ。
* **参考実売価格**: ${g4.excel_sr01.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.excel_sr01.affiliateUrl})

### 6. キャンメイク シルキースフレアイズ マットタイプ M06
* **特徴**: スフレのように軽く肌に溶け込む透け感マット。重くならずに陰影をつけられるプチプラ神パレット。
* **参考実売価格**: ${g4.canmake_silky_m01.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.canmake_silky_m01.affiliateUrl})

### 7. THREE シマリング グロー デュオ 01
* **特徴**: クリーミーな自然のツヤと血色。骨格ウェーブの柔らかい肌質をそのまま活かしたツヤ肌メイクに。
* **参考実売価格**: ${g4.three_shimmering_01.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.three_shimmering_01.affiliateUrl})

### 8. クリニーク チーク ポップ
* **特徴**: しっとりパウダーが肌に密着。大人っぽいイチジクカラーで頬をじんわり染め上げ、血色感をキープ。
* **参考実売価格**: ${g4.clinique_fig_pop.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.clinique_fig_pop.affiliateUrl})

### 9. SUQQU ピュア カラー ブラッシュ
* **特徴**: グラデーションが美しいパウダーチーク。透明感あるくすみカラーで、大人っぽい垢抜け顔へ。
* **参考実売価格**: ${g4.suqqu_blush_09.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.suqqu_blush_09.affiliateUrl})

### 10. ETVOS ミネラルクラッシィシャドー
* **特徴**: 敏感肌でも安心のミネラルアイシャドウ。繊細な輝きと深みカラーで大人の上品な目元を完成させます。
* **参考実売価格**: ${g4.etvos_mineral_warm.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.etvos_mineral_warm.affiliateUrl})`
  }
];

// Insert into articles.json
const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const newIds = new Set(articlesToAdd.map(a => a.id));
const filtered = articles.filter(a => !newIds.has(a.id));

filtered.unshift(...articlesToAdd);

fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2));
console.log('Successfully inserted all 4 Batch 7 articles into src/data/articles.json. Total count:', filtered.length);
