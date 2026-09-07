import fs from 'fs';

const g1 = JSON.parse(fs.readFileSync('scratch/rakuten_batch3_g1_verified.json', 'utf8'));
const g2 = JSON.parse(fs.readFileSync('scratch/rakuten_batch3_g2_verified.json', 'utf8'));
const g3 = JSON.parse(fs.readFileSync('scratch/rakuten_batch3_g3_verified.json', 'utf8'));
const g4 = JSON.parse(fs.readFileSync('scratch/rakuten_batch3_g4_verified.json', 'utf8'));

const articlesToAdd = [
  // 1. 医薬部外品 シワ改善×シミ予防
  {
    id: 'art-quasi-drug-wrinkle-spot-prevention-cream-10sen-2026',
    title: '【医薬部外品】シワ改善×シミ予防を1本で！トラネキサム酸＆ナイアシンアミド配合クリーム10選',
    description: '目元や口元の年齢サイン（シワ）と、頬に広がる紫外線ダメージ（シミ・肝斑）を1本で同時ブロック！厚生労働省認可の有効成分「ナイアシンアミド」「純粋レチノール」「トラネキサム酸」を贅沢に配合した医薬部外品リンクル＆美白クリームを徹底比較。楽天市場で圧倒的支持を集める最新10選の実売データを完全網羅。',
    category: 'skincare',
    tags: [
      'シワ改善 シミ予防 クリーム',
      'ナイアシンアミド トラネキサム酸 併用',
      '医薬部外品 アイクリーム おすすめ',
      'エリクシール リンクルクリーム 効果',
      'ポーラ リンクルショット 口コミ',
      'シワ改善 美白 アイクリーム',
      'HAKU メラノフォーカス'
    ],
    author: '神崎 舞香',
    createdAt: '2026-09-07T13:40:00.000Z',
    updatedAt: '2026-09-07T13:40:00.000Z',
    image: g1.elixir_wrinkle.imageUrl,
    affiliateUrl: g1.elixir_wrinkle.affiliateUrl,
    price: g1.elixir_wrinkle.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ「シワ」と「シミ」は同時にケアすべきなのか？

「目尻の小ジワやほうれい線が深くなってきた」
「頬の高い位置にモヤモヤしたシミやくすみが目立ち始めた」
「シワ用クリームと美白美容液を両方重ねると肌が重たくて続かない」

大人の女性を悩ませる2大エイジングサインですが、実は**どちらも「紫外線・乾燥・微弱炎症による真皮ダメージ」という共通の根本原因**から発生しています。

紫外線や摩擦によって皮膚内部で慢性的な炎症が起こると、メラノサイトが刺激されてシミが生成されると同時に、コラーゲン分解酵素（MMP）が過剰発生して真皮の弾力線維が破壊され、深いシワへと定着してしまいます。

---

## 医薬部外品が誇る『真皮コラーゲン産生×メラニン抑制』の科学

シワとシミを同時に根本解決する最大の近道は、効果効能が医学的に認められた**「医薬部外品（有効成分）」**を賢くセレクトすることです。

\`\`\`
【ナイアシンアミド（ビタミンB3）のW作用】
真皮のコラーゲン産生を促進してシワを内側から押し上げる
   ＋ 表皮へのメラニン受け渡しをブロックしてシミを防ぐ
─────────────────────────────────────
【トラネキサム酸の抗炎症美白】
プラスミンをブロックしてメラノサイトの活性化指令をストップ
   ＋ 肌荒れ・微弱炎症を鎮めてバリア機能をサポート
\`\`\`

---

## 楽天市場で高評価！シワ改善×美白クリームおすすめ10選

### 1. 資生堂 エリクシール レチノパワー リンクルクリーム
* **特徴**: 日本で唯一「シワを改善する」純粋レチノール配合。目元・口元の深い刻まれジワをふっくら柔軟に。
* **参考実売価格**: ${g1.elixir_wrinkle.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.elixir_wrinkle.affiliateUrl})

### 2. ポーラ（POLA） リンクルショット メディカル セラム N
* **特徴**: 日本初承認のシワ改善有効成分「ニールワン」配合。好中球エラスターゼの働きを抑え、シワを根本改善。
* **参考実売価格**: ${g1.pola_wrinkle.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.pola_wrinkle.affiliateUrl})

### 3. 肌ラボ 極潤 薬用ハリクリーム
* **特徴**: 有効成分ナイアシンアミドと3種のヒアルロン酸配合。プチプラとは思えない濃密さでシワ改善＆シミ予防。
* **参考実売価格**: ${g1.hadalabo_ageing.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.hadalabo_ageing.affiliateUrl})

### 4. アテニア ドレススノー ナイトクリーム
* **特徴**: 美白とシワ改善を叶える推進成分「推進型カテキン」とナイアシンアミド配合。翌朝の肌密度が変わる名品。
* **参考実売価格**: ${g1.attol_wrinkle.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.attol_wrinkle.affiliateUrl})

### 5. キュレル 潤浸保湿 モイストリペア アイクリーム
* **特徴**: 消炎剤配合で肌荒れを防ぎ、セラミド機能成分で乾燥小ジワを目立たなくする敏感肌設計。
* **参考実売価格**: ${g1.curer_wrinkle.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.curer_wrinkle.affiliateUrl})

### 6. ちふれ 薬用リンクルジェルクリーム
* **特徴**: 1品7役の薬用オールインワン。ナイアシンアミドが全顔のシワ改善と美白を時短でフルサポート。
* **参考実売価格**: ${g1.chifure_wrinkle.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.chifure_wrinkle.affiliateUrl})

### 7. 資生堂 HAKU メラノフォーカスEV
* **特徴**: 美白有効成分4MSKとトラネキサム酸をW配合。シミの無限ループを断ち切る美白美容液の頂点。
* **参考実売価格**: ${g1.shiseido_haku.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.shiseido_haku.affiliateUrl})

### 8. ソフィーナ iP 薬用 シワ改善 泡セラム
* **特徴**: 毛穴より小さい炭酸泡が有効成分ナイアシンアミドを肌の奥（真皮）まで素早く届ける新発想美容液。
* **参考実売価格**: ${g1.sofinai_wrinkle.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.sofinai_wrinkle.affiliateUrl})

### 9. アスタリフト ザ セラム リンクルリペア
* **特徴**: 朝用・夜用のシワ改善スティック＆クリーム。ナノ浸透技術で一日中シワとシミの定着を防ぎます。
* **参考実売価格**: ${g1.astashit_wrinkle.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.astashit_wrinkle.affiliateUrl})

### 10. メラノCC 薬用 しみ集中対策 プレミアム美容液
* **特徴**: 活性型ビタミンCと抗炎症成分配合。皮脂分泌を抑えながらシミの根源にアプローチする高コスパ名品。
* **参考実売価格**: ${g1.melanocc_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.melanocc_serum.affiliateUrl})`
  },

  // 2. イエベ秋×顔タイプ大人顔
  {
    id: 'art-warm-autumn-adult-face-chic-brown-semi-matte-10sen-2026',
    title: '【イエベ秋×顔タイプ大人顔】洗練された都会美！深みブラウン＆セミマットチーク10選',
    description: 'オータムタイプの落ち着いたリッチカラーと、大人顔（フェミニン・エレガント・クール）の華やかな骨格美を極限まで引き立てる！子供っぽくならない「深みビターブラウン、テラコッタ、上質セミマットチーク」を厳選。楽天市場で絶賛される名品コスメ10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'イエベ秋 エレガント メイク',
      'イエベ秋 大人顔 コスメ',
      'イエベ秋 ブラウンリップ おすすめ',
      '顔タイプ エレガント コスメ',
      'SUQQU シグニチャーカラーアイズ 03',
      'KATE ダークフィグ',
      'セルヴォーク 09 テラコッタ'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T13:42:00.000Z',
    updatedAt: '2026-09-07T13:42:00.000Z',
    image: g2.suqqu_shadow_autumn.imageUrl,
    affiliateUrl: g2.suqqu_shadow_autumn.affiliateUrl,
    price: g2.suqqu_shadow_autumn.price,
    itemCount: 10,
    featured: true,
    content: `## イエベ秋×大人顔が放つ「圧倒的な気品と都会的エレガンス」

パーソナルカラー「イエベ秋」で、顔タイプが「大人顔（エレガント、フェミニン、クール、ソフトエレガント）」に属する女性は、**洗練されたゴージャス感と知的で落ち着いた佇まい**を兼ね備えています。

このタイプが淡いパステルカラーやポップな大粒ラメを使うと、持ち前の顔立ちの華やかさとチグハグになり、垢抜けない印象になってしまいます。

成功の鍵は、**『深みのあるビターブラウンやテラコッタの陰影』**と、**『骨格の美しさを引き立てるセミマット〜サテン質感のチーク』**による引き算メイクです。

---

## 楽天市場で高評価！イエベ秋×大人顔名品コスメ10選

### 1. SUQQU シグニチャー カラー アイズ 03 光暮（HIKARIGURE）
* **特徴**: 洗練された黄みブラウンと上質ゴールドパールの調和。大人顔の目元に彫りの深さと気品を宿す最高峰。
* **参考実売価格**: ${g2.suqqu_shadow_autumn.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.suqqu_shadow_autumn.affiliateUrl})

### 2. セルヴォーク ディグニファイド リップス 09 テラコッタ
* **特徴**: 絶妙なくすみオレンジブラウン。塗るだけで洗練された都会的な抜け感を生み出すアイコンリップ。
* **参考実売価格**: ${g2.celvoke_lip_terracotta.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.celvoke_lip_terracotta.affiliateUrl})

### 3. ルナソル アイカラーレーション 07 ダージリンキャラメル
* **特徴**: 芳醇な紅茶を思わせる深みと温かみ。大人顔の求心的な目元をドラマティックに引き立てます。
* **参考実売価格**: ${g2.lunasol_baking.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.lunasol_baking.affiliateUrl})

### 4. KATE リップモンスター 05 ダークフィグ
* **特徴**: 熟れたイチジクのようなシックなブラウンレッド。肌の白さを際立たせ、落ちにくさも抜群。
* **参考実売価格**: ${g2.kate_lip_brown.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.kate_lip_brown.affiliateUrl})

### 5. THREE シマリング グロー デュオ
* **特徴**: 肌に溶け込むクリーミーなツヤと血色。自然な骨格の陰影を演出し、やりすぎ感のない立体フェイスに。
* **参考実売価格**: ${g2.three_dim.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.three_dim.affiliateUrl})

### 6. エクセル スキニーリッチシャドウ SR03 ロイヤルブラウン
* **特徴**: しっとり微細な粉質でグラデーションが簡単。毎日のオフィスメイクにも重宝する万能パレット。
* **参考実売価格**: ${g2.excel_sr03.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.excel_sr03.affiliateUrl})

### 7. NARS ブラッシュ N
* **特徴**: 微細なゴールドシマーが溶け込むパウダーチーク。大人顔の頬骨をリフトアップして見せます。
* **参考実売価格**: ${g2.nars_orgasm.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.nars_orgasm.affiliateUrl})

### 8. CHANEL ルージュ ココ ブルーム
* **特徴**: 鮮やかな発色とプランプ効果のある輝き。イエベ秋の華やかな唇を一段とグラマラスに彩ります。
* **参考実売価格**: ${g2.chanel_rouge_autumn.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.chanel_rouge_autumn.affiliateUrl})

### 9. キャンメイク シルキースフレアイズ マットタイプ M06
* **特徴**: 透け感マットで重たくならないテラコッタ系。プチプラとは思えない滑らかな密着感。
* **参考実売価格**: ${g2.canmake_terracotta.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.canmake_terracotta.affiliateUrl})

### 10. ローラメルシエ ブラッシュ カラー インフュージョン 06 チャイ
* **特徴**: どんなメイクにも調和する上品なピンクベージュ。大人の肌に溶け込み、知的な血色感を演出。
* **参考実売価格**: ${g2.laura_blush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.laura_blush.affiliateUrl})`
  },

  // 3. 二の腕ブツブツ・お尻黒ずみ
  {
    id: 'art-upper-arm-bumps-hip-darkening-urea-salicylic-acid-body-scrub-10sen-2026',
    title: '【二の腕のブツブツ・お尻の黒ずみ解消】尿素＆サリチル酸配合ボディスクラブ＆薬用ミルク10選',
    description: 'ノースリーブを着ると気になる二の腕のザラザラ・赤み（毛孔性苔癬）や、座り仕事によるお尻・デリケートゾーンの黒ずみ・角質肥厚を滑らかリセット！硬くなった角質を溶かす「尿素・サリチル酸」配合の薬用クリームと、摩擦レスに磨き上げる名品ボディスクラブを徹底比較。楽天市場の高評価10選の実売データを完全網羅。',
    category: 'bodycare',
    tags: [
      '二の腕 ブツブツ クリーム おすすめ',
      'お尻 黒ずみ スクラブ',
      '角質ケア ボディミルク 薬用',
      '毛孔性苔癬 改善 クリーム',
      'ニノキュア 効果 口コミ',
      '恋するおしり 石鹸',
      'ハウスオブローゼ ボディスクラブ'
    ],
    author: '水城 愛佳',
    createdAt: '2026-09-07T13:44:00.000Z',
    updatedAt: '2026-09-07T13:44:00.000Z',
    image: g3.houseofrose_ohbaby.imageUrl,
    affiliateUrl: g3.houseofrose_ohbaby.affiliateUrl,
    price: g3.houseofrose_ohbaby.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ二の腕は「ブツブツ」し、お尻は「黒ずむ」のか？

「二の腕を触るとサメ肌のようにザラザラして赤みがある」
「座り仕事が続いて、お尻の下側や太ももの付け根が黒ずんで色素沈着している」
「ボディソープでしっかり洗っているのに、一向に滑らかにならない」

二の腕のブツブツの正体は、毛穴に古い角質が過剰に溜まって硬く詰まる**『毛孔性苔癬（もうこうせいたいせん）』**であることが大半です。

一方、お尻の黒ずみは、下着の摩擦や座りっぱなしによる「持続的な圧迫刺激」から皮膚を守るために、メラニン色素が過剰生成され、角質が分厚くなる**『角質肥厚（かくしつひこう）』**が原因です。

どちらもゴシゴシ擦る物理的刺激は絶対にNG。**「角質溶解成分で穏やかにほぐす」＋「摩擦レスな保湿でターンオーバーを促す」**ことが唯一の改善策です。

---

## 楽天市場で高評価！ボディ角質＆黒ずみケア名品10選

### 1. 小林製薬 ニノキュア
* **特徴**: 尿素20%配合の第3類医薬品。硬くなった古い角質を軟化させてブツブツを治し、トコフェロール酢酸エステルが血行を促進。
* **参考実売価格**: ${g3.ninocure_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.ninocure_cream.affiliateUrl})

### 2. ハウス オブ ローゼ Oh! Baby ボディ スムーザー N
* **特徴**: 温泉水配合のボディスクラブ。体温（37℃）でペーストがとろけて肌に負担をかけずに全身をつるつるに磨き上げます。
* **参考実売価格**: ${g3.houseofrose_ohbaby.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.houseofrose_ohbaby.affiliateUrl})

### 3. ペリカン石鹸 恋するおしり ヒップケアソープ
* **特徴**: もぎたてピーチの香りが心地よい直洗いスクラブ石鹸。角質ケア成分と保湿成分が黒ずみ・ザラつきを集中オフ。
* **参考実売価格**: ${g3.pelican_hipsoap.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.pelican_hipsoap.affiliateUrl})

### 4. SABON（サボン） ボディスクラブ
* **特徴**: 死海の塩とボタニカルオイルを贅沢にブレンド。古い角質を優しく落としながら、吸い付くような潤いとしなやかさを残します。
* **参考実売価格**: ${g3.sabon_bodyscrub.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.sabon_bodyscrub.affiliateUrl})

### 5. ヴェレダ（WELEDA） ホワイトバーチ ボディオイル
* **特徴**: 白樺エキス配合のマッサージオイル。滞りやすいヒップや太ももの巡りを整え、引き締まったなめらか肌へ。
* **参考実売価格**: ${g3.weleda_whitebirch.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.weleda_whitebirch.affiliateUrl})

### 6. キュレル モイスチャーバーム
* **特徴**: 濃厚バームがカサつく部位に密着。セラミド機能成分がバリアを立て直し、衣類の摩擦刺激から素肌をプロテクト。
* **参考実売価格**: ${g3.curel_moist_milk.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.curel_moist_milk.affiliateUrl})

### 7. 資生堂 尿素10%クリーム
* **特徴**: 尿素10%配合で硬くなった皮膚をすばやく軟化。持ち運びに便利なチューブタイプで乾燥小ジワやかかとのガサつきにも。
* **参考実売価格**: ${g3.shiseido_urea_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.shiseido_urea_cream.affiliateUrl})

### 8. ユースキン 120g（指定医薬部外品）
* **特徴**: ビタミンB2色（黄色）のこっくり濃厚クリーム。抗炎症成分と血行促進成分がひび・あかぎれ・ざらつきを集中ケア。
* **参考実売価格**: ${g3.yuskin_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.yuskin_cream.affiliateUrl})

### 9. ニベア プレミアムボディミルク ホワイトニング
* **特徴**: 美白有効成分ビタミンC誘導体配合。角質層まで浸透してメラニンの生成を抑え、澄みわたるツヤ肌をキープ。
* **参考実売価格**: ${g3.nivea_premium_body.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.nivea_premium_body.affiliateUrl})

### 10. 高保湿ソルト＆オイル ボディスクラブ
* **特徴**: 粒子が細かく肌当たりの優しいソルトスクラブ。洗い流した瞬間からシルクのような指通りを実感。
* **参考実売価格**: ${g3.scrub_top.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.scrub_top.affiliateUrl})`
  },

  // 4. リッププランパー
  {
    id: 'art-lip-plumper-no-pain-vertical-lines-volume-up-10sen-2026',
    title: '【痛くないのに縦ジワ消滅】ぷっくり唇を作るカプサイシン＆ヒアルロン酸リッププランパー10選',
    description: '「プランパーの激しいピリピリ感が苦手」「年齢とともに唇が薄くなり、縦ジワが目立つ」悩みを完全解決！痛みを抑えたマイルド温感処方から、瞬時に縦ジワをふっくら押し上げる高保水ヒアルロン酸・カプサイシン配合リッププランパーを徹底比較。楽天市場で絶賛される名品10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'リッププランパー 痛くない おすすめ',
      '唇 縦ジワ プランパー',
      'Dior マキシマイザー 似てる プチプラ',
      'ヴィセ リッププランパー 口コミ',
      'リッププランパー 効果 比較',
      'keybo リッププランパー',
      'ぷっくり唇 作り方'
    ],
    author: '篠原 玲奈',
    createdAt: '2026-09-07T13:46:00.000Z',
    updatedAt: '2026-09-07T13:46:00.000Z',
    image: g4.dior_maximizer.imageUrl,
    affiliateUrl: g4.dior_maximizer.affiliateUrl,
    price: g4.dior_maximizer.price,
    itemCount: 10,
    featured: true,
    content: `## なぜリッププランパーを塗ると唇が「ぷっくり」するのか？

「唇の血色が悪く、しぼんで縦ジワが深くなってきた」
「口紅を塗ると縦ジワに色が溜まって汚く見えてしまう」
「唇の厚みを出して、人中を短く見せたい」

リッププランパーが唇をふっくらボリュームアップさせる秘密は、**『温感・冷感刺激による血行促進』**と**『高分子ヒアルロン酸・カプセルによる水分抱え込み膜』**にあります。

唐辛子由来のカプサイシンやバニリルブチル、メントールなどの成分が唇の毛細血管を刺激し、血液を集中させることで自然な血色感と厚みを創出。同時に、水分を吸収して何倍にも膨らむヒアルロン酸が縦ジワの隙間を埋め尽くし、まるでヒアルロン酸注射を打ったかのような弾力感を与えます。

---

## 楽天市場で高評価！痛くない＆ボリュームUPリッププランパー10選

### 1. ディオール アディクト リップ マキシマイザー
* **特徴**: プランパー界の絶対王者。ヒアルロン酸とチェリーオイル配合で、ミントの清涼感とともに24時間潤いと圧倒的ボリュームを持続。
* **参考実売価格**: ${g4.dior_maximizer.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.dior_maximizer.affiliateUrl})

### 2. keybo（キボ） ドトムリッププラスプランパー
* **特徴**: SNSで爆発的人気。マイルドから超強力まで段階を選べ、ひと塗りでぷるんと肉厚な唇を即座にメイク。
* **参考実売価格**: ${g4.vanity_plumper.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.vanity_plumper.affiliateUrl})

### 3. Borica（ボリカ） リッププランパー エクストラセラム
* **特徴**: 痛みの少ないマイルド処方。贅沢な美容液成分が唇のキメを整え、縦ジワをふっくら目立たなくします。
* **参考実売価格**: ${g4.borica_plumper.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.borica_plumper.affiliateUrl})

### 4. ヴィセ エッセンス リッププランパー
* **特徴**: 「Diorに激似」と大バズりしたプチプラ神コスメ。スパイシー成分配合で心地よい清涼感とぽってり唇を両立。
* **参考実売価格**: ${g4.visee_essence_lip.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.visee_essence_lip.affiliateUrl})

### 5. キャンメイク プランプリップケアスクラブ
* **特徴**: 洗い流し不要のシュガースクラブ入りプランパー。古い角質を優しくオフしながら、ふっくらツヤツヤに。
* **参考実売価格**: ${g4.canmake_plump_lip.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.canmake_plump_lip.affiliateUrl})

### 6. rom&nd グラスティング ウォーター グロス
* **特徴**: 水膜を張ったようなガラス玉の輝き。微細な偏光ラメと心地よいスースー感で唇に透明感をプラス。
* **参考実売価格**: ${g4.romand_glasting_water.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.romand_glasting_water.affiliateUrl})

### 7. クラランス リップコンフォートオイル
* **特徴**: 植物オイルの恵みで唇をトリートメント。ベタつかないリッチなツヤ膜で唇を保護し、ふっくら仕上げます。
* **参考実売価格**: ${g4.clarins_lip_oil.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.clarins_lip_oil.affiliateUrl})

### 8. 無印良品 リップエッセンス
* **特徴**: こっくり濃厚なテクスチャーで乾燥を徹底ブロック。無香料・低刺激で敏感な唇にも安心のベストセラー。
* **参考実売価格**: ${g4.muji_lip_essence.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.muji_lip_essence.affiliateUrl})

### 9. ペリペラ インク グロス
* **特徴**: ボリューム感たっぷりのぷるぷるグロス。唇をボリューミーに見せる光沢膜が長時間続きます。
* **参考実売価格**: ${g4.fation_plumper.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.fation_plumper.affiliateUrl})

### 10. Torriden（トリデン） ソリッドイン セラミド リップ エッセンス
* **特徴**: 5D複合セラミド配合。皮むけや乾燥をすばやく修復し、ぷっくり柔らかな素の唇へと導く高保湿エッセンス。
* **参考実売価格**: ${g4.torriden_lip_essence.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.torriden_lip_essence.affiliateUrl})`
  }
];

// Insert into articles.json
const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const newIds = new Set(articlesToAdd.map(a => a.id));
const filtered = articles.filter(a => !newIds.has(a.id));

filtered.unshift(...articlesToAdd);

fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2));
console.log('Successfully inserted all 4 articles into src/data/articles.json. Total count:', filtered.length);
