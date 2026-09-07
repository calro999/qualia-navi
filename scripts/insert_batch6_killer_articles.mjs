import fs from 'fs';

const g1 = JSON.parse(fs.readFileSync('scratch/rakuten_batch6_g1_verified.json', 'utf8'));
const g2 = JSON.parse(fs.readFileSync('scratch/rakuten_batch6_g2_verified.json', 'utf8'));
const g3 = JSON.parse(fs.readFileSync('scratch/rakuten_batch6_g3_verified.json', 'utf8'));
const g4 = JSON.parse(fs.readFileSync('scratch/rakuten_batch6_g4_verified.json', 'utf8'));

const articlesToAdd = [
  // 1. デリケートゾーンケア・フェムケア
  {
    id: 'art-femcare-delicate-zone-odor-itching-whitening-soap-serum-10sen-2026',
    title: '【ニオイ・かゆみ・黒ずみを根本ケア】弱酸性デリケートゾーン専用ソープ＆美白セラム10選',
    description: '「生理中やおりもののニオイ・ムレが気になる」「下着の摩擦によるVラインの黒ずみ・乾燥かゆみをケアしたい」女性の繊細な悩みに寄り添うフェムケア特集！自浄作用を守るpH値（弱酸性）設計の専用泡ソープと、メラニン色素の沈着を防ぐ薬用美白セラムを徹底比較。楽天市場で高評価を獲得している名品10選の実売データを完全網羅。',
    category: 'bodycare',
    tags: [
      'デリケートゾーン ソープ おすすめ',
      'フェムケア 黒ずみ 美容液',
      'デリケートゾーン 臭い 対策 石鹸',
      'イビサクリーム 効果 口コミ',
      'コラージュフルフル 泡石鹸 デリケートゾーン',
      'サマーズイブ フェミニンウォッシュ',
      'フェムケア おすすめ 薬局'
    ],
    author: '水城 愛佳',
    createdAt: '2026-09-07T17:20:00.000Z',
    updatedAt: '2026-09-07T17:20:00.000Z',
    image: g1.ph_care_wash.imageUrl,
    affiliateUrl: g1.ph_care_wash.affiliateUrl,
    price: g1.ph_care_wash.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ普通のボディソープでデリケートゾーンを洗ってはいけないのか？

「デリケートゾーンを洗うとヒリヒリとしみる」
「しっかり洗っているのに、夕方になると独特のニオイやムレが気になる」
「下着の擦れや脱毛後のVIOの黒ずみが年々濃くなってきた」

デリケートゾーンの皮膚は、まぶたよりも薄く、体の中で最も経皮吸収率が高い超デリケートな部位です。

さらに、健康な膣内および周辺環境は、乳酸菌（デーデルライン桿菌）の働きによって**「pH3.8〜4.5の弱酸性」**に保たれ、雑菌の繁殖を防いでいます。一般的な弱アルカリ性〜中性のボディソープでゴシゴシ洗うと、必要な常在菌まで洗い流され、自浄作用が低下して**かえって悪臭やかゆみ、カンジダなどのトラブルを招く悪循環**に陥ります。

---

## 楽天市場で高評価！フェムケア＆デリケートゾーンコスメおすすめ10選

### 1. PHジャパン（PH JAPAN） フェミニンウォッシュ
* **特徴**: 生理学的なpHバランス（弱酸性）に合わせた専用リキッドソープ。植物エキスと潤い成分配合で、すっきりと清潔に洗い上げます。
* **参考実売価格**: ${g1.ph_care_wash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.ph_care_wash.affiliateUrl})

### 2. イビサクリーム（Ibiza Cream）
* **特徴**: VIO・デリケートゾーンの黒ずみケア専用の薬用美白クリーム。トラネキサム酸とグリチルリチン酸2KのW有効成分配合。
* **参考実売価格**: ${g1.w_femcare_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.w_femcare_cream.affiliateUrl})

### 3. コラージュフルフル 泡石鹸 ピンク
* **特徴**: 抗真菌（抗カビ）成分ミコナゾール硝酸塩と殺菌成分をW配合。薬用処方でデリケートゾーンのニオイ・かゆみの原因菌をしっかり洗浄。
* **参考実売価格**: ${g1.collis_femcare.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.collis_femcare.affiliateUrl})

### 4. サマーズイブ（Summer's Eve） フェミニンウォッシュ マルチベネフィット
* **特徴**: 全米No.1のフェミニンケアブランド。毎日のシャワータイムに手軽に使え、穏やかな弱酸性泡でニオイの元を洗い流します。
* **参考実売価格**: ${g1.summerseve_wash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.summerseve_wash.affiliateUrl})

### 5. iroha（イロハ） インティメートウォッシュ
* **特徴**: TENGAが女性目線で開発。保湿成分ヒアルロン酸・コラーゲン配合の弱酸性泡が、摩擦レスにしっとり洗い上げます。
* **参考実売価格**: ${g1.iroha_intimate_wash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.iroha_intimate_wash.affiliateUrl})

### 6. MAPUTI（マプティ） オーガニックフレグランスホワイトクリーム
* **特徴**: 独自のロングフレグランス処方で一日中良い香りが持続。ナイアシンアミドなどのオーガニック美白成分が黒ずみにアプローチ。
* **参考実売価格**: ${g1.maputi_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.maputi_cream.affiliateUrl})

### 7. アルジタル（ARGITAL） デリケートハイジーンソープ
* **特徴**: グリーンクレイと100%天然ハーブ（ニアウリ・カモミール）配合。洗い上がりの爽快感と肌への優しさを両立した名品。
* **参考実売価格**: ${g1.argent_femcare.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.argent_femcare.affiliateUrl})

### 8. ピュビケア オーガニック フェミニン シフォン ソープ
* **特徴**: 超微細なシフォン泡で出てくるオーガニックソープ。皮膚の薄いデリケートゾーンをいたわりながら汚れをオフ。
* **参考実売価格**: ${g1.pubicare_mist.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.pubicare_mist.affiliateUrl})

### 9. laugh.（ラフドット） インティメートウォッシュ
* **特徴**: フローラクレンズ処方で美肌菌に着目。デリケートゾーンの環境を整え、潤いを守りながら健やかに保ちます。
* **参考実売価格**: ${g1.laugh_femcare.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.laugh_femcare.affiliateUrl})

### 10. ヴィーナスラボ タラソボーテ
* **特徴**: 海洋深層水と海泥エキス配合。デリケートな部位を優しく保護しながら、清潔感あふれる素肌へと導きます。
* **参考実売価格**: ${g1.peculiar_femcare.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.peculiar_femcare.affiliateUrl})`
  },

  // 2. メンズスキンケア・皮脂＆テカリ防止
  {
    id: 'art-mens-skincare-oil-control-anti-shine-all-in-one-gel-wash-10sen-2026',
    title: '【ベタつき・テカリを一日中リセット】メンズ向け皮脂吸着オールインワンジェル＆洗顔料10選',
    description: '「朝洗顔しても昼にはおでこや鼻がアブラでギトギトになる」「毛穴の開きや皮脂崩れを清潔感あふれるサラサラ肌に変えたい」男性の肌悩みに特化！女性の約3倍と言われる男性の過剰皮脂をしっかり吸着し、インナードライを防いで水分と油分の黄金比を保つ名品オールインワン＆洗顔料10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      'メンズ オールインワン テカリ防止',
      '男 皮脂 抑える スキンケア',
      'メンズ 毛穴 洗顔 おすすめ',
      'バルクオム 洗顔 口コミ',
      'NULL オールインワンジェル メンズ',
      '男のテカリ 対策 化粧水',
      '男性 スキンケア 初心者 おすすめ'
    ],
    author: '蓮見 拓真',
    createdAt: '2026-09-07T17:22:00.000Z',
    updatedAt: '2026-09-07T17:22:00.000Z',
    image: g2.zigan_allinone.imageUrl,
    affiliateUrl: g2.zigan_allinone.affiliateUrl,
    price: g2.zigan_allinone.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ男性の肌は「ギトギトにテカるのに乾いている」のか？

「あぶらとり紙を使ってもすぐに皮脂が浮き出てテカる」
「夕方になると自分の顔のテカリが気になって人と対面するのが恥ずかしい」
「化粧水を塗るとベタついて余計にニキビができる気がする」

男性の肌は、男性ホルモンの影響によって**皮脂分泌量が女性の約3倍もあるのに対し、皮膚の水分量は女性の半分以下（約30〜40%）**しかありません。

「皮脂が多いから」と強い洗顔料で脱脂し、保湿を怠ると、肌は水分蒸発を防ごうとして**「さらに過剰な皮脂を噴出させる」**という負のスパイラルに陥ります。テカリを根本から止める鍵は、**「余分な皮脂と汚れだけを選択的に落とす濃密洗顔」**と**「油分を抑えて水分を補給する高機能オールインワンジェル」**の組み合わせです。

---

## 楽天市場で高評価！メンズテカリ防止コスメおすすめ10選

### 1. ZIGEN（ジゲン） オールインワンフェイスジェル
* **特徴**: オイルフリー設計でベタつきゼロ。5種のヒト型セラミドとコラーゲンが角層深くに水分を満たし、過剰なテカリを根本抑制。
* **参考実売価格**: ${g2.zigan_allinone.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.zigan_allinone.affiliateUrl})

### 2. バルクオム（BULK HOMME） THE TONER / 洗顔
* **特徴**: 濃厚な泡立ちのクレイ洗顔と、低刺激で角層に浸透する高保湿化粧水。男性特有の皮脂膜を健やかに整える大人気ブランド。
* **参考実売価格**: ${g2.bulkhomme_toner.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.bulkhomme_toner.affiliateUrl})

### 3. NULL（ヌル） 薬用オールインワンジェル
* **特徴**: 有効成分ヘパリン類似物質とグリチルリチン酸ジカリウム配合。ニキビ・カミソリ負けを防ぎ、テカらないサラサラ素肌をキープ。
* **参考実売価格**: ${g2.null_allinone.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.null_allinone.affiliateUrl})

### 4. クワトロボタニコ（QUATTRO BOTANICO） ボタニカル ローション
* **特徴**: 4種の植物エキス配合。皮脂テカリ、毛穴の開き、乾燥、ハリ不足を1本でケアする大人のための高機能化粧水。
* **参考実売価格**: ${g2.dismoi_allinone.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.dismoi_allinone.affiliateUrl})

### 5. オルビス ミスター（ORBIS Mr.） ウォッシュ
* **特徴**: クレイと炭のW吸着成分配合。濃密ボリューム泡が頑固な皮脂汚れを吸着し、つっぱり感のない清潔な肌へ。
* **参考実売価格**: ${g2.orbis_mister_wash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.orbis_mister_wash.affiliateUrl})

### 6. SHISEIDO メン フェイス クレンザー
* **特徴**: スキンケア成分たっぷりの濃密泡。余分な皮脂や汚れをすっきり洗い流し、シェービングフォームとしても優秀。
* **参考実売価格**: ${g2.shiseido_men_cleanser.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.shiseido_men_cleanser.affiliateUrl})

### 7. ウーノ（uno） スキンケアタンク マイルド
* **特徴**: とろみのあるローションがベタつかずに馴染む。カミソリ負けや肌荒れを防ぐ薬用処方の高コスパ品。
* **参考実売価格**: ${g2.uno_skincare_tank.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.uno_skincare_tank.affiliateUrl})

### 8. ギャツビー（GATSBY） EXパーフェクトエッセンス
* **特徴**: 1品で化粧水・乳液・美容液を完結。浸透型コラーゲン配合で、カサつきとベタつきを同時にケア。
* **参考実売価格**: ${g2.gatsby_allinone.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.gatsby_allinone.affiliateUrl})

### 9. メンズビオレ 泡タイプ洗顔
* **特徴**: ポンプを押すだけでキメ細かい濃密泡が完成。忙しい朝も摩擦をかけずに毛穴の皮脂をしっかり除去。
* **参考実売価格**: ${g2.mens_biore_wash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.mens_biore_wash.affiliateUrl})

### 10. ロート製薬 オキシー パーフェクトウォッシュ
* **特徴**: 皮脂吸着マイクロパウダーとメントール配合。ガンコなアブラをスッキリ落として超爽快な肌ざわりを持続。
* **参考実売価格**: ${g2.oxy_wash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.oxy_wash.affiliateUrl})`
  },

  // 3. ノンケミカル日焼け止め
  {
    id: 'art-non-chemical-sunscreen-no-white-cast-sensitive-skin-10sen-2026',
    title: '【敏感肌・子供も使える】紫外線吸収剤フリー＆白浮きしない神ノンケミカル日焼け止め10選',
    description: '「日焼け止めを塗ると肌が赤くなる・かゆくなる」「ノンケミカル特有の白浮きやキシキシ感がどうしても苦手」悩みを完全解消！紫外線吸収剤を一切使わず、紫外線散乱剤（酸化チタン・酸化亜鉛）を特殊ナノ分散コーティングした「白浮きゼロ・きしまない」最新ノンケミカル日焼け止め10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      'ノンケミカル 日焼け止め 白浮きしない',
      '紫外線吸収剤フリー 日焼け止め おすすめ',
      '石鹸落ち 日焼け止め 敏感肌',
      'キュレル デイバリアUVローション',
      'ミノン UVマイルドミルク',
      '子供 使える 日焼け止め おすすめ',
      'NOV 日焼け止め'
    ],
    author: '相原 萌',
    createdAt: '2026-09-07T17:24:00.000Z',
    updatedAt: '2026-09-07T17:24:00.000Z',
    image: g3.minon_uv_milk.imageUrl,
    affiliateUrl: g3.minon_uv_milk.affiliateUrl,
    price: g3.minon_uv_milk.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ「ノンケミカル（紫外線散乱剤）」は肌に優しいのか？

「日焼け止めを塗った瞬間にピリピリと熱感や刺激を感じる」
「夏場に日焼け止めを毎日塗っていると、プツプツとした赤みや肌荒れが出る」

一般的な日焼け止めの多くには、「紫外線吸収剤」が配合されています。これは紫外線を吸収して化学反応（熱エネルギー）に変換して放出する仕組みのため、敏感肌の方にとっては**その化学反応自体が肌の微小な炎症や刺激**となってしまいます。

一方、ノンケミカル処方（紫外線散乱剤）は、天然のミネラル鉱物（酸化チタンや酸化亜鉛）が肌表面にヴェールを作り、**鏡のように紫外線を物理的に跳ね返す（散乱させる）仕組み**です。化学変化を起こさないため、敏感肌や赤ちゃん・子供の素肌でも安心して毎日のUVカットが可能です。

---

## 楽天市場で高評価！白浮きしないノンケミカル日焼け止めおすすめ10選

### 1. ミノン（MINON） UVマイルドミルク
* **特徴**: 紫外線吸収剤フリー・パラベンフリー・無香料。乳液のようにサラッと伸びて白浮きせず、生後6ヶ月の赤ちゃんから使用可能。
* **参考実売価格**: ${g3.minon_uv_milk.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.minon_uv_milk.affiliateUrl})

### 2. キュレル（Curel） UVカット デイバリアUVローション
* **特徴**: セラミド機能成分配合の医薬部外品。ちり・ほこり・花粉といった大気汚染物質の付着も同時に防ぐデイバリア処方。
* **参考実売価格**: ${g3.curel_uv_milk.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.curel_uv_milk.affiliateUrl})

### 3. 常盤薬品 NOV（ノブ） UVシールドEX / ミルクEX
* **特徴**: 皮膚科医推奨の低刺激処方。石けんで落とせて白浮きゼロ、毛穴詰まりを起こしにくいノンコメドジェニックテスト済み。
* **参考実売価格**: ${g3.nov_uv_milk.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.nov_uv_milk.affiliateUrl})

### 4. ファンケル（FANCL） サンガード50+ プロテクトUV
* **特徴**: SPF50+ PA++++の最高峰防御力ながらノンケミカル。ウォータープルーフで汗や水に強く、ブルーライトもカット。
* **参考実売価格**: ${g3.fancl_sunguard.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.fancl_sunguard.affiliateUrl})

### 5. ママ＆キッズ（Mama&Kids） UVライトベール
* **特徴**: 小児皮膚科医協力のもと開発された低刺激乳液。ベタつかずみずみずしい使い心地で、毎日のUVケアに最適。
* **参考実売価格**: ${g3.mama_kids_uv.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.mama_kids_uv.affiliateUrl})

### 6. アネッサ（ANESSA） パーフェクトUV マイルドミルク NA
* **特徴**: 敏感肌用アネッサ。ナノレベルで分散された散乱剤が均一な膜を作り、擦れにも強くきしまないシルクのような肌感。
* **参考実売価格**: ${g3.anessa_mild_milk.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.anessa_mild_milk.affiliateUrl})

### 7. ETVOS（エトヴォス） ミネラルUVパウダー
* **特徴**: 天然ミネラルと美容液成分で作られたノンケミカルパウダー。メイク直ししながら手軽にUVカットを重ね塗り可能。
* **参考実売価格**: ${g3.etvos_mineral_uv.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.etvos_mineral_uv.affiliateUrl})

### 8. ヴェレダ（WELEDA） エーデルワイス UVバリアクリーム
* **特徴**: 100%天然由来成分。エーデルワイスエキスが肌を潤し、ほんのりトーンアップして素肌を美しく見せるオーガニックUV。
* **参考実売価格**: ${g3.weleda_edelweiss.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.weleda_edelweiss.affiliateUrl})

### 9. オルビス リンクルブライトUVプロテクター
* **特徴**: ナイアシンアミド配合でシワ改善＆美白も叶える最高峰UV。まるで高級保湿クリームのような塗り心地。
* **参考実売価格**: ${g3.orbis_wrinkle_uv.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.orbis_wrinkle_uv.affiliateUrl})

### 10. 花王 ビオレUV キッズピュアミルク
* **特徴**: アルコールフリー・無香料・紫外線吸収剤ゼロ。ミネラルバリア処方で砂がつきにくく、泥遊びにも強いプチプラ名品。
* **参考実売価格**: ${g3.biore_kids_uv.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.biore_kids_uv.affiliateUrl})`
  },

  // 4. ブルベ冬×顔タイプクール
  {
    id: 'art-cool-winter-cool-face-greyish-brown-crimson-red-lip-10sen-2026',
    title: '【ブルベ冬×顔タイプクール】圧倒的オーラと知性！グレイッシュブラウン＆深紅リップ10選',
    description: 'ウィンタータイプの鋭いコントラストと、顔タイプクールの直線的で知的な美人顔を頂点へ導く！黄みを完全に排除した「グレイッシュブラウン・シルバーラメ」の目元と、ドラマティックな「深紅・真紅ルビーレッド」のリップを厳選。楽天市場で絶賛される名品コスメ10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'ブルベ冬 クール メイク',
      'ブルベ冬 赤リップ おすすめ',
      '顔タイプクール コスメ アイシャドウ',
      'MAC ルビーウー ブルベ冬',
      'KATE 欲望の塊',
      'CHANEL 赤リップ ブルベ冬',
      'クールタイプ 似合うメイク'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T17:26:00.000Z',
    updatedAt: '2026-09-07T17:26:00.000Z',
    image: g4.kate_lip_01.imageUrl,
    affiliateUrl: g4.kate_lip_01.affiliateUrl,
    price: g4.kate_lip_01.price,
    itemCount: 10,
    featured: true,
    content: `## ブルベ冬×顔タイプクールが放つ「凛とした知性と圧倒的な美人オーラ」

コントラストが強く冴え渡る肌色を持つ「ブルベ冬（Winter）」と、直線的なフェイスラインとシャープな目元を持つ「顔タイプクール」。

この組み合わせを持つ女性は、**都会的なスタイリッシュさ、寄せ付けないほどの高貴な美しさ、そして知的なカッコよさ**という天性のオーラを宿しています。

甘いパステルピンクや丸みのあるチークを入れると、持ち前の洗練された魅力が半減してしまいます。**『黄みのないシャープなグレイッシュブラウンやシルバーのアイシャドウ』**と、**『一瞬で視線を奪うドラマティックな深紅・ルビーレッドのリップ』**でコントラストを際立たせるのが最高峰の垢抜け法則です。

---

## 楽天市場で高評価！ブルベ冬×クール名品コスメ10選

### 1. KATE リップモンスター 01 欲望の塊
* **特徴**: 心の奥の情熱を解き放つようなピュアレッド。青みを含んだ鮮烈な発色で、ブルベ冬×クールの顔立ちを劇的に引き締める。
* **参考実売価格**: ${g4.kate_lip_01.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.kate_lip_01.affiliateUrl})

### 2. M・A・C（マック） マキシマル シルキー マット リップスティック ルビー ウー
* **特徴**: 世界中で愛される真紅の伝説マットリップ。青みを含んだ鮮やかなクラシックレッドが、知的な唇をドラマティックに演出。
* **参考実売価格**: ${g4.mac_lipstick_ruby.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.mac_lipstick_ruby.affiliateUrl})

### 3. CHANEL（シャネル） ルージュ アリュール ヴェルヴェット
* **特徴**: ヴェルヴェットのような深みのある上質マット。ブルベ冬の肌の白さを極限まで際立たせる勝負リップ。
* **参考実売価格**: ${g4.chanel_rouge_allure_dark.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.chanel_rouge_allure_dark.affiliateUrl})

### 4. SUQQU（スック） シグニチャー カラー アイズ
* **特徴**: 重ねても決して濁らないクリアな陰影。知性ある目元を凛と際立たせる極上の粉質パレット。
* **参考実売価格**: ${g4.suqqu_shadow_07.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.suqqu_shadow_07.affiliateUrl})

### 5. クリスチャン ディオール モノ クルール クチュール
* **特徴**: クチュール ドレスのファブリックからインスパイアされた高密着アイシャドウ。グレイッシュな陰影を単色で美しく表現。
* **参考実売価格**: ${g4.dior_mono_shadow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.dior_mono_shadow.affiliateUrl})

### 6. CLIO（クリオ） プロ アイ パレット
* **特徴**: ブルベ冬にマッチするスモーキーモーブからクールグレー、シルバーラメまで凝縮した捨て色なしパレット。
* **参考実売価格**: ${g4.clio_shadow_pro_grey.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.clio_shadow_pro_grey.affiliateUrl})

### 7. THREE（スリー） ディヴァインリップジェム
* **特徴**: リップグロスのような透明感とティントの落ちにくさを融合。深みのあるプラムが知的なニュアンスをプラス。
* **参考実売価格**: ${g4.three_epic_mini.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.three_epic_mini.affiliateUrl})

### 8. セザンヌ ウォータリーティントリップ 06 ピンクベージュ
* **特徴**: デイリー使いしやすい落ち着いた粘膜カラー。濡れツヤ感が持続し、オフィスでも知的な印象をキープ。
* **参考実売価格**: ${g4.cezanne_watery_05.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.cezanne_watery_05.affiliateUrl})

### 9. キャンメイク クイックラッシュカーラー ブラック
* **特徴**: 強力カールキープで直線的なクールアイを演出。漆黒のツヤで目力をシャープに際立たせる名品。
* **参考実売価格**: ${g4.canmake_quick_curler_black.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.canmake_quick_curler_black.affiliateUrl})

### 10. rom&nd（ロムアンド） ゼロ ベルベット ティント
* **特徴**: ふんわりスフレ質感のマットリップ。深みのあるディープカラーが唇に密着し、知的なモード顔を完成させます。
* **参考実売価格**: ${g4.romand_velvet_tint.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.romand_velvet_tint.affiliateUrl})`
  }
];

// Insert into articles.json
const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const newIds = new Set(articlesToAdd.map(a => a.id));
const filtered = articles.filter(a => !newIds.has(a.id));

filtered.unshift(...articlesToAdd);

fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2));
console.log('Successfully inserted all 4 Batch 6 articles into src/data/articles.json. Total count:', filtered.length);
