import fs from 'fs';

const g1 = JSON.parse(fs.readFileSync('scratch/rakuten_batch8_g1_verified.json', 'utf8'));
const g2 = JSON.parse(fs.readFileSync('scratch/rakuten_batch8_g2_verified.json', 'utf8'));
const g3 = JSON.parse(fs.readFileSync('scratch/rakuten_batch8_g3_verified.json', 'utf8'));
const g4 = JSON.parse(fs.readFileSync('scratch/rakuten_batch8_g4_verified.json', 'utf8'));

const articlesToAdd = [
  // 1. アイブロウ・脱色風眉
  {
    id: 'art-bleached-look-eyebrow-mascara-ultra-fine-pencil-10sen-2026',
    title: '【眉毛の存在感を消して垢抜ける】うぶ見え脱色風アイブロウマスカラ＆極細ペンシル10選',
    description: '「眉毛が黒くて濃く、主張が強すぎてメイクが野暮ったくなる」「眉脱色は肌が痛むからメイクで自然に明るくしたい」悩みを即効解決！自眉の黒さをふんわり和らげてうぶ毛のように見せる「脱色風ミルキーベージュ眉マスカラ」と、眉尻を毛流れ1本ずつ描き足せる「超極細ペンシル」を徹底比較。楽天市場で絶賛される名品10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      '脱色風 眉マスカラ おすすめ',
      '垢抜け 眉マスカラ ブルベ イエベ',
      'ロムアンド 眉マスカラ 比較',
      'ヘビーローテーション 眉マスカラ 人気色',
      'セザンヌ 超細芯アイブロウ 口コミ',
      '眉毛 存在感 消す メイク',
      'KATE デザイニングアイブロウ3D'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T17:30:00.000Z',
    updatedAt: '2026-09-07T17:30:00.000Z',
    image: g1.romand_han_brow.imageUrl,
    affiliateUrl: g1.romand_han_brow.affiliateUrl,
    price: g1.romand_han_brow.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ「眉の存在感を薄くする」だけで一気に垢抜けるのか？

「アイメイクやリップを綺麗に塗っても、なぜか顔全体が垢抜けない」
「眉毛がしっかり生えているせいで、キツい印象や昭和っぽい濃い顔立ちに見えてしまう」

現代のメイクトレンドにおける最大のポイントは、**「眉毛を主役にするのではなく、存在感を和らげて目元を引き立てる」**ことです。

自眉の黒々とした主張を抑え、ほんのりトーンダウンした「脱色風のアッシュベージュ」に整えると、顔全体に透明感が生まれ、肌の白さや瞳のピュアさが劇的に引き立ちます。大人が成功させる鍵は、ベタッと地肌につかない**「高密着ミルキー眉マスカラ」**と、隙間をミリ単位で埋める**「超極細ペンシル」**の合わせ技です。

---

## 楽天市場で高評価！脱色風アイブロウコスメおすすめ10選

### 1. rom&nd（ロムアンド） ハンオールブロウカラ
* **特徴**: 眉脱色したかのような絶妙なミルキーアッシュ。地肌につきにくいスリムブラシで、固まらずふんわり発色。
* **参考実売価格**: ${g1.romand_han_brow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.romand_han_brow.affiliateUrl})

### 2. キスミー ヘビーローテーション カラーリングアイブロウEX
* **特徴**: ひと塗りで黒眉をしっかり隠す高発色。汗・水・皮脂・こすれに強いマルチプルーフ処方の国民的眉マスカラ。
* **参考実売価格**: ${g1.kissme_heavy_rotation.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.kissme_heavy_rotation.affiliateUrl})

### 3. デジャヴュ（dejavu） アイブロウカラー
* **特徴**: フィルム処方でパリパリに固まらない「やわらか質感」。極小ブラシがうぶ毛まで逃さず自然にカラーリング。
* **参考実売価格**: ${g1.dejavu_eyebrow_color.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.dejavu_eyebrow_color.affiliateUrl})

### 4. セザンヌ 超細芯アイブロウ
* **特徴**: 驚異の0.9mm超極細芯。眉毛1本1本をリアルに描き足せ、眉尻のシャープなラインも完璧に決まる名作。
* **参考実売価格**: ${g1.cezanne_ultra_fine_brow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.cezanne_ultra_fine_brow.affiliateUrl})

### 5. エクセル パウダー＆ペンシル アイブロウEX
* **特徴**: 楕円芯ペンシル・ぼかしパウダー・スクリューブラシが1本に集約。テクニックレスで立体美眉が完成。
* **参考実売価格**: ${g1.excel_pd01_brow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.excel_pd01_brow.affiliateUrl})

### 6. KATE（ケイト） 3DアイブロウカラーN
* **特徴**: 自眉の黒さを打ち消す微粒子パール配合。高発色なのに毛流れをふんわり立ち上げてホールド。
* **参考実売価格**: ${g1.kate_3d_eyebrow_color.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.kate_3d_eyebrow_color.affiliateUrl})

### 7. キャンメイク スマートミニアイブロウカラー
* **特徴**: ミニブラシが小回り抜群で丸みのある眉頭も失敗ゼロ。軽やかな色味でピュアなうぶ眉を演出。
* **参考実売価格**: ${g1.canmake_smart_eyebrow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.canmake_smart_eyebrow.affiliateUrl})

### 8. フジコ（Fujiko） マジカルアイブロウカラー
* **特徴**: 斜めブラシが眉毛をとかすだけで自然にカラーリング。ふんわりとした柔らかい毛質に見せる名品。
* **参考実売価格**: ${g1.fujiko_magic_eyebrow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.fujiko_magic_eyebrow.affiliateUrl})

### 9. イプサ（IPSA） アイブロウ クリエイティブパレット
* **特徴**: オレンジやレッドのニュアンスカラー配合。計算された5色パウダーでどんな髪色にも垢抜けてマッチ。
* **参考実売価格**: ${g1.ipsa_eyebrow_palette.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.ipsa_eyebrow_palette.affiliateUrl})

### 10. KATE（ケイト） デザイニングアイブロウ3D
* **特徴**: ノーズシャドウとしても使える王道パウダー。自然なグラデーションで立体的な陰影を眉頭に仕込める。
* **参考実売価格**: ${g1.kate_deserting_brow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.kate_deserting_brow.affiliateUrl})`
  },

  // 2. 韓国鎮静・CICA＆ドクダミ
  {
    id: 'art-korean-calming-cica-heartleaf-redness-acne-serum-pad-10sen-2026',
    title: '【赤み・突発ニキビを即鎮静】ドクダミ＆CICA高配合カーミング美容液・トナーパッド10選',
    description: '「季節の変わり目やマスク荒れで頬が赤くほてる」「大事な日の前に突然ポツンとニキビができてしまった」肌トラブルを最速レスキュー！韓国スキンケアの2大鎮静成分「CICA（ツボクサエキス）」と「ドクダミエキス」を高濃度配合した名品カーミング美容液＆角質鎮静パッドを徹底比較。楽天市場の高評価10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      'アヌア ドクダミ トナー 口コミ',
      'CICA 美容液 赤み 鎮静',
      '韓国 トナーパッド おすすめ ニキビ',
      'VT CICA デイリーマスク',
      'SKIN1004 センテラ アンプル',
      'ドクタージー スージングクリーム',
      'メディヒール ティーツリー パッド'
    ],
    author: '水城 愛佳',
    createdAt: '2026-09-07T17:32:00.000Z',
    updatedAt: '2026-09-07T17:32:00.000Z',
    image: g2.anua_heartleaf_serum.imageUrl,
    affiliateUrl: g2.anua_heartleaf_serum.affiliateUrl,
    price: g2.anua_heartleaf_serum.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ「CICA」と「ドクダミ」は肌荒れ・赤みを素早く鎮火できるのか？

「洗顔後に顔全体が火照って赤みが引かない」
「ホルモンバランスやストレスでフェイスラインに繰り返しニキビができる」

肌の赤みやニキビの正体は、毛穴内部でアクネ菌が増殖したり、角層バリアの破壊によって**局所的な微小炎症（サイトカインの放出）が暴走している状態**です。

* **CICA（ツボクサエキス/マデカッソシド）**: 創傷治癒のハーブとして知られ、ダメージを受けた皮膚組織の再生を促進しながら抗炎症作用を発揮。
* **ドクダミ（クエルシトリン）**: 熱を持った毛細血管の拡張を鎮め、過剰な皮脂分泌を穏やかにコントロール。

この2大カーミング成分を「水分アンプル」や「部分パックができるトナーパッド」でひんやり角層にチャージすることで、炎症の火種を瞬時に消火します。

---

## 楽天市場で高評価！鎮静CICA＆ドクダミコスメおすすめ10選

### 1. Anua（アヌア） ドクダミ 80% 水分鎮静アンプル
* **特徴**: ドクダミエキス80%高配合。とろみのあるテクスチャーが肌に密着し、赤みや熱感を穏やかに鎮静する大ヒット美容液。
* **参考実売価格**: ${g2.anua_heartleaf_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.anua_heartleaf_serum.affiliateUrl})

### 2. VT（ブイティー） CICA デイリースージングマスク
* **特徴**: 独自成分シカヒアルロン配合。サッと引き出して毎日使える大容量シートマスクで、揺らぎやすい肌を安定化。
* **参考実売価格**: ${g2.vt_cica_daily_mask.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.vt_cica_daily_mask.affiliateUrl})

### 3. SKIN1004（スキンワンオージップフォー） センテラ アンプル
* **特徴**: マダガスカル産高純度ツボクサエキス100%配合。水のようにサラッと浸透し、敏感肌のバリアを整える低刺激アンプル。
* **参考実売価格**: ${g2.skin1004_centella_ampoule.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.skin1004_centella_ampoule.affiliateUrl})

### 4. Dr.G（ドクタージー） レッド ブレミッシュ クリア スージング クリーム
* **特徴**: 10種のCICAコンプレックス配合の水分ジェルクリーム。ノンコメドジェニックテスト済みでニキビ肌もベタつかず鎮静。
* **参考実売価格**: ${g2.drg_red_blemish_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.drg_red_blemish_cream.affiliateUrl})

### 5. メディヒール（MEDIHEAL） ティーツリー トラブルパッド
* **特徴**: ティーツリーとマイクロリポソームCICA配合のスクエア型トナーパッド。赤みが気になる部分の集中パックに最適。
* **参考実売価格**: ${g2.mediheal_tea_tree_pad.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.mediheal_tea_tree_pad.affiliateUrl})

### 6. Abib（アビブ） ドクダミ スポットパッド カミングタッチ
* **特徴**: 智異山（チリサン）産ドクダミエキス配合。ガーゼ面と無地プレーン面のW構造で、摩擦レスに肌をクーリング鎮静。
* **参考実売価格**: ${g2.abib_heartleaf_pad.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.abib_heartleaf_pad.affiliateUrl})

### 7. COSRX（コスアールエックス） ピュアフィット シカ トナー
* **特徴**: 7種のCICA成分配合。荒れやすい肌を優しく包み込み、肌のキメを滑らかに整える低刺激化粧水。
* **参考実売価格**: ${g2.cosrx_cica_toner.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.cosrx_cica_toner.affiliateUrl})

### 8. Torriden（トリデン） バランスフル シカ セラム
* **特徴**: 独自の5D複合シカ成分配合。皮脂バランスを整えながら毛穴トラブルを穏やかにレスキュー。
* **参考実売価格**: ${g2.torriden_cica_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.torriden_cica_serum.affiliateUrl})

### 9. グーダル（goodal） ドクダミ ヒアルロン スージング トナー
* **特徴**: ドクダミとヒアルロン酸のダブルパワー。乾燥と肌荒れを同時にケアし、みずみずしい潤い肌へ。
* **参考実売価格**: ${g2.goodal_heartleaf_calming.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.goodal_heartleaf_calming.affiliateUrl})

### 10. Dr.Jart+（ドクタージャルト） シカペア リカバー
* **特徴**: 塗ると緑色からベージュに変化するレスキュークリーム。赤みを自然にカバーしながら日中の外部刺激から肌を保護。
* **参考実売価格**: ${g2.drjart_cicapair_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.drjart_cicapair_cream.affiliateUrl})`
  },

  // 3. ヘアブラシ・頭皮マッサージ
  {
    id: 'art-hair-brush-scalp-massage-paddle-kassa-lift-10sen-2026',
    title: '【とかすだけでサラツヤ＆顔周りリフト】パドルブラシ＆スカルプカッサブラシ10選',
    description: '「髪の広がり・パサつきを手軽に抑えたい」「頭皮のコリをほぐしてフェイスラインをすっきり引き上げたい」美髪とリフトケアを同時に叶えるブラシ特集！クッション性抜群で頭皮のツボを心地よく刺激する「パドルブラシ」と、インバス・アウトバスで使える「スカルプカッサ・シャンプーブラシ」を徹底比較。楽天市場の高評価10選の実売データを完全網羅。',
    category: 'haircare',
    tags: [
      'アヴェダ パドルブラシ 使い方',
      'リファ ヘアブラシ 口コミ',
      '頭皮 マッサージ ブラシ リフトアップ',
      'uka ケンザン 比較 おすすめ',
      'タングルティーザー 濡れ髪',
      'エトヴォス マッサージブラシ',
      'パドルブラシ おすすめ サロン'
    ],
    author: '佐々木 健一',
    createdAt: '2026-09-07T17:34:00.000Z',
    updatedAt: '2026-09-07T17:34:00.000Z',
    image: g3.refa_heart_brush.imageUrl,
    affiliateUrl: g3.refa_heart_brush.affiliateUrl,
    price: g3.refa_heart_brush.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ「頭皮ブラッシング」をすると顔のたるみと髪質が劇的に変わるのか？

「夕方になると顔がむくんでフェイスラインがぼやける」
「トリートメントをつけても髪にツヤが出ず、根本がペタんこになる」

頭皮と顔の皮膚は、**一枚の筋膜（帽状腱膜）で完全に繋がっています**。

スマホやPC作業で頭皮の側頭筋や後頭筋が凝り固まると、顔の筋肉を引き上げる力が低下し、頬のたるみやほうれい線へと直結します。さらに、血流不足は毛根への栄養供給を阻害します。**弾力のあるピンで頭皮全体をポンポンと心地よく刺激し、毛穴に詰まった皮脂を浮かせながら血行を促進する本格ブラッシング習慣**が、美髪とリフトアップの鍵です。

---

## 楽天市場で高評価！パドルブラシ＆スカルプブラシおすすめ10選

### 1. AVEDA（アヴェダ） パドル ブラシ
* **特徴**: パドルブラシの最高峰。空気穴のある大きなクッション面が頭皮に程よい圧を与え、ブラッシングだけで血行促進。
* **参考実売価格**: ${g3.aveda_paddle_brush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.aveda_paddle_brush.affiliateUrl})

### 2. ReFa（リファ） ハートブラシ
* **特徴**: 握りやすいハート型フォルム。「ほぐしピン」と「みがきピン」の3段構造で、からまりを解きほぐして瞬時にツヤ髪へ。
* **参考実売価格**: ${g3.refa_heart_brush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.refa_heart_brush.affiliateUrl})

### 3. uka（ウカ） スカルプブラシ ケンザン
* **特徴**: サロン発のシリコン製頭皮ブラシ。絶妙な硬さでツボを心地よく刺激し、シャンプー時やPC作業の合間にコリをほぐす。
* **参考実売価格**: ${g3.uka_scalp_kenzan.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.uka_scalp_kenzan.affiliateUrl})

### 4. タングルティーザー（TANGLE TEEZER） ザ・オリジナル
* **特徴**: 特許取得の長短2段構造ブラシ。濡れ髪でも引っ張らずにスルリととかせ、キューティクルへのダメージを最小限に。
* **参考実売価格**: ${g3.tangle_teezer_original.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.tangle_teezer_original.affiliateUrl})

### 5. ETVOS（エトヴォス） リラクシングマッサージブラシ
* **特徴**: 握りやすいしずく型ブラシ。お風呂場でのインバス泡立てマッサージや、アウトバスでのツボ押しに大人気。
* **参考実売価格**: ${g3.etvos_relaxing_brush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.etvos_relaxing_brush.affiliateUrl})

### 6. ラ・カスタ（La CASTA） ヘッドスパ アラトギブラシ
* **特徴**: 粗めのピンがパーマヘアや太い髪も絡まずコーミング。トリートメントを行き渡らせるのにも最適。
* **参考実売価格**: ${g3.la_casta_head_spa_brush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.la_casta_head_spa_brush.affiliateUrl})

### 7. ウェットブラシ（WetBrush） プロ パドルディタングラー
* **特徴**: 独自のIntelliFlexピンがしなやかに曲がり、もつれた髪を摩擦レスに解消。ドライヤーの風を通すエアホール付き。
* **参考実売価格**: ${g3.wet_brush_pro.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.wet_brush_pro.affiliateUrl})

### 8. ReFa（リファ） イオンケアブラシ
* **特徴**: シャンプー中に毛穴の汚れを掻き出す特殊ピン配置。イオンプレート搭載で清潔ですこやかな頭皮環境へ。
* **参考実売価格**: ${g3.refa_ion_care_brush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.refa_ion_care_brush.affiliateUrl})

### 9. メイソンピアソン（MASON PEARSON） ポケットブリッスル
* **特徴**: 「ブラシ界のロールスロイス」と称される最高級猪毛100%。油分が髪に行き渡り、使うほどに艶やかな極上髪へ。
* **参考実売価格**: ${g3.mason_pearson_brush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.mason_pearson_brush.affiliateUrl})

### 10. マークスアンドウェブ（MARKS&WEB） ウッド ヘアブラシ
* **特徴**: 天然オーク材とクッションゴムの温もり。静電気が起きにくく、毎日のブラッシングが心地よい癒しの時間に。
* **参考実売価格**: ${g3.marks_web_wood_brush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.marks_web_wood_brush.affiliateUrl})`
  },

  // 4. ブルベ夏×骨格ストレート
  {
    id: 'art-cool-summer-straight-skeleton-sheer-pink-satin-makeup-10sen-2026',
    title: '【ブルベ夏×骨格ストレート】着太りしないメリハリ美！シアー青みピンク＆立体サテンコスメ10選',
    description: 'サマータイプの清楚な青み透明感と、骨格ストレートのメリハリあるグラマラスな質感を完璧に活かす！膨張して見えやすい白みピンクを避け、肌馴染みの良い「シアー青みピンク」と「上質サテンパール」で立体小顔と洗練された美人オーラを作る神コスメを厳選。楽天市場の高評価10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'ブルベ夏 骨格ストレート コスメ',
      'ブルベ夏 ストレート メイク',
      'ブルベ夏 シアーリップ おすすめ',
      'ルナソル アイカラーレーション 02',
      'KATE モーヴシャワー',
      'クリニーク パンジーポップ',
      'エクセル ピオニーブラウン'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T17:36:00.000Z',
    updatedAt: '2026-09-07T17:36:00.000Z',
    image: g4.lunasol_lavender_02.imageUrl,
    affiliateUrl: g4.lunasol_lavender_02.affiliateUrl,
    price: g4.lunasol_lavender_02.price,
    itemCount: 10,
    featured: true,
    content: `## ブルベ夏×骨格ストレートが放つ「清楚な透明感とクラス感あふれる肉体美」

青みのあるソフトなカラーが似合う「ブルベ夏（Summer）」と、ハリのある肌質とメリハリボディを持つ「骨格ストレート」。

このタイプは、白みの強いミルキーピンクやフリル・ラメ過多のメイクをすると、持ち前のリッチな体型に対して「顔立ちがぼんやり膨張して見える」という落とし穴があります。

成功の鉄則は、**『膨張しない透け感のあるシアーな青みピンク・モーブ』**と、**『骨格のメリハリを引き締める上質なサテンパールの陰影』**です。大粒グリッターを控えて繊細な光沢でまとめることで、上品で洗練された大人のエレガンスが完成します。

---

## 楽天市場で高評価！ブルベ夏×骨格ストレート名品コスメ10選

### 1. ルナソル アイカラーレーション 02 ディープローズクォーツ
* **特徴**: 澄んだモーヴピンクとローズのグラデーション。骨格ストレートのまぶたに腫れぼったさを出さず、すっきり陰影をプラス。
* **参考実売価格**: ${g4.lunasol_lavender_02.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.lunasol_lavender_02.affiliateUrl})

### 2. KATE リップモンスター 08 モーヴシャワー
* **特徴**: 青みパールの輝きが美しいモーブピンク。シアーな発色で唇を引き締め、ブルベ夏の肌の白さを際立たせる。
* **参考実売価格**: ${g4.kate_lip_08_mauve.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.kate_lip_08_mauve.affiliateUrl})

### 3. クリニーク（CLINIQUE） チーク ポップ 15 パンジー ポップ
* **特徴**: 紫チークの代名詞。見た目の鮮やかなパープルが肌にのせると透明感のあるピュアな青みピンクに変化。
* **参考実売価格**: ${g4.clinique_pansy_pop.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.clinique_pansy_pop.affiliateUrl})

### 4. エクセル スキニーリッチシャドウ SR10 ピオニーブラウン
* **特徴**: ほんのりパープルが溶け込んだピンクブラウン。微細パールが骨格ストレートの上品な目元を演出。
* **参考実売価格**: ${g4.excel_sr10_peony.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.excel_sr10_peony.affiliateUrl})

### 5. ディオール アディクト リップ マキシマイザー 026 プラム
* **特徴**: 唇をふっくらプランプアップ。透け感のあるベリープラムが骨格ストレートの唇にグラマラスな上品さをプラス。
* **参考実売価格**: ${g4.dior_maximizer_026.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.dior_maximizer_026.affiliateUrl})

### 6. rom&nd デュイフル ウォーター ティント 06 チュリアン
* **特徴**: 4つの露のような軽やかなツヤ。ベタつかず透け感のあるクールピンクで、オフィス使いにも最適。
* **参考実売価格**: ${g4.romand_dewyful_06.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.romand_dewyful_06.affiliateUrl})

### 7. キャンメイク シルキースフレアイズ マットタイプ M06
* **特徴**: 透け感のあるマット質感。白浮きせずにブルベ夏の目元をすっきりと引き締める高コスパ品。
* **参考実売価格**: ${g4.canmake_silky_10.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.canmake_silky_10.affiliateUrl})

### 8. セザンヌ パールグロウハイライト 01 シャンパンベージュ
* **特徴**: 少量で発光する高輝度ハイライト。Cゾーンや鼻筋にピンポイントで乗せて骨格ストレートのメリハリを強調。
* **参考実売価格**: ${g4.cezanne_pearl_04.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.cezanne_pearl_04.affiliateUrl})

### 9. THREE シマリング グロー デュオ
* **特徴**: クリーミーな自然なツヤ。パウダーっぽさを感じさせず、肌本来のハリ感を美しく際立たせる。
* **参考実売価格**: ${g4.three_dim_glow_02.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.three_dim_glow_02.affiliateUrl})

### 10. SUQQU ピュア カラー ブラッシュ
* **特徴**: 微細なグラデーションパウダー。ふんわり肌に溶け込み、骨格ストレートの頬を洗練された血色感で彩る。
* **参考実売価格**: ${g4.suqqu_blush_summer.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.suqqu_blush_summer.affiliateUrl})`
  }
];

// Insert into articles.json
const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const newIds = new Set(articlesToAdd.map(a => a.id));
const filtered = articles.filter(a => !newIds.has(a.id));

filtered.unshift(...articlesToAdd);

fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2));
console.log('Successfully inserted all 4 Batch 8 articles into src/data/articles.json. Total count:', filtered.length);
