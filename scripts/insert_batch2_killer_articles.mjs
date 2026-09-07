import fs from 'fs';

const g1 = JSON.parse(fs.readFileSync('scratch/rakuten_powder_lavender_verified.json', 'utf8'));
const g2 = JSON.parse(fs.readFileSync('scratch/rakuten_cool_winter_verified.json', 'utf8'));
const g3 = JSON.parse(fs.readFileSync('scratch/rakuten_scalp_shampoo_verified.json', 'utf8'));
const g4 = JSON.parse(fs.readFileSync('scratch/rakuten_eyelash_coating_verified.json', 'utf8'));

const articlesToAdd = [
  // 1. 夕方くすみ防止パウダー＆ラベンダー下地
  {
    id: 'art-dullness-pore-drop-prevention-powder-lavender-base-10sen-2026',
    title: '【夕方になってもくすまない・毛穴落ちしない】皮脂崩れ防止パウダー＆ラベンダー補正下地10選',
    description: '夕方になると顔がどんより黄ぐすみする、小鼻や頬のファンデーションが毛穴落ちしてドロドロに崩れる悩みを一掃！黄みを打ち消して透明感を宿す「ラベンダー・ブルー補正下地」と、皮脂を吸着して一日中サラサラ陶器肌をキープする「名品フェイスパウダー」を徹底比較。楽天市場で高評価を獲得している神コスメ10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      '夕方 くすまない 下地',
      '毛穴落ち しない パウダー',
      'ラベンダー 下地 透明感 おすすめ',
      '皮脂崩れ防止 下地 おすすめ',
      'エレガンス ラプードル 崩れない',
      'コスメデコルテ ルースパウダー 00',
      'プリマヴィスタ ラベンダー 下地'
    ],
    author: '蓮見 拓真',
    createdAt: '2026-09-07T09:30:00.000Z',
    updatedAt: '2026-09-07T09:30:00.000Z',
    image: g1.elegance_powder.imageUrl,
    affiliateUrl: g1.elegance_powder.affiliateUrl,
    price: g1.elegance_powder.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ夕方になると「黄ぐすみ」と「毛穴落ち」が起きるのか？

「朝は完璧に仕上げたのに、夕方に鏡を見ると顔全体が暗く土気色に濁っている」
「皮脂とファンデが混ざり合って、毛穴にポツポツと白い角栓のように溜まってしまう」

この夕方の肌トラブルを引き起こす2大元凶は、**『皮脂の酸化による黄変（黄ぐすみ）』**と**『皮脂によるファンデーションの液状化と毛穴への流入（毛穴落ち）』**です。

肌から分泌された皮脂は、空気に触れて数時間経つと酸化し、黄色〜茶褐色に変色します。これがファンデーションと混ざることで「夕方のどんより顔」が発生します。さらに、過剰な皮脂がファンデの油分を溶かすことで、開いた毛穴の凹凸にファンデが落ち込んでしまいます。

---

## 酸化と崩れを物理的に遮断する『色彩補正下地×皮脂固定パウダー』の黄金律

夕方の美肌をキープする秘訣は、ファンデーションを厚塗りすることではなく、**下地とパウダーの科学的ブロック**にあります。

\`\`\`
【第1ステップ：色彩補正（トーンアップ下地）】
ラベンダー（ピンク×ブルーの補色）
   ▲ 肌の黄ぐすみを中和（ブルー効果）＋血色感をプラス（ピンク効果）で圧倒的透明感
─────────────────────────────────────
【第2ステップ：皮脂固定（微粒子パウダー）】
シリカ・多孔質微粒子パウダー
   ▲ 分泌された皮脂を瞬時に吸着・ゲル化し、ファンデの毛穴流入をブロック
\`\`\`

---

## 楽天市場で絶賛！くすみ＆毛穴落ち防止コスメおすすめ10選

### 1. エレガンス ラ プードル オートニュアンス
* **特徴**: 崩れにくさの最高峰プレストパウダー。5色のペールカラーが調和し、毛穴を消し去りながら一日中澄んだ明るさをキープ。
* **参考実売価格**: ${g1.elegance_powder.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.elegance_powder.affiliateUrl})

### 2. コスメデコルテ ルースパウダー 00 translucent
* **特徴**: シルクのような極上の肌触り。光のヴェールを纏わせ、素肌そのものが発光しているかのような生ツヤ感を演出。
* **参考実売価格**: ${g1.cosmedecorte_powder.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.cosmedecorte_powder.affiliateUrl})

### 3. イニスフリー ノーセバム ミネラルパウダー N
* **特徴**: 皮脂吸着パウダーの世界的定番。皮脂コントロールミネラルが余分な皮脂を吸着し、一日中サラサラ肌を保ちます。
* **参考実売価格**: ${g1.innisfree_powder.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.innisfree_powder.affiliateUrl})

### 4. キャンメイク マシュマロフィニッシュパウダー Abloom
* **特徴**: 5色補正パウダーでくすみを一掃。洗顔料のみでオフ可能で、プチプラとは思えない透明感と毛穴カバー力を発揮。
* **参考実売価格**: ${g1.canmake_marshmallow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.canmake_marshmallow.affiliateUrl})

### 5. ローラメルシエ ルースセッティングパウダー トランスルーセント
* **特徴**: メイクアップアーティスト溺愛の名品。軽やかな微粒子パウダーが毛穴や小ジワをソフトフォーカスし、夕方のヨレを防止。
* **参考実売価格**: ${g1.laura_powder.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.laura_powder.affiliateUrl})

### 6. ポール＆ジョー ラトゥー エクラ ファンデーション プライマー
* **特徴**: ラベンダーパール配合でくすみを光で飛ばす下地。日本人の黄み肌を計算し尽くした発光トーンアップ。
* **参考実売価格**: ${g1.pauljoe_lavender.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.pauljoe_lavender.affiliateUrl})

### 7. プリマヴィスタ スキンプロテクトベース 皮脂くずれ防止 ラベンダー
* **特徴**: 強力な皮脂吸着技術でテカリを徹底ブロック。ラベンダーカラーが夕方の黄ぐすみを予防。
* **参考実売価格**: ${g1.primavista_lavender.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.primavista_lavender.affiliateUrl})

### 8. キャンディドール ブライトピュアベース CC ラベンダー
* **特徴**: SPF50+ PA+++の高防御力。透き通るような白肌を演出し、色ムラや黄みを瞬時に補正。
* **参考実売価格**: ${g1.candydoll_lavender.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.candydoll_lavender.affiliateUrl})

### 9. d プログラム 薬用 スキンケアベース CC
* **特徴**: 敏感肌用薬用CC下地。肌荒れを防ぎながらニキビ跡や赤み・くすみを自然にカバー。
* **参考実売価格**: ${g1.dprogram_lavender.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.dprogram_lavender.affiliateUrl})

### 10. セザンヌ 皮脂テカリ防止下地
* **特徴**: 皮脂吸着パウダーとウォータープルーフ処方。ベタつかずサラサラが持続する驚異のプチプラ名品。
* **参考実売価格**: ${g1.cezanne_lavender.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.cezanne_lavender.affiliateUrl})`
  },

  // 2. ブルベ冬×骨格ナチュラル
  {
    id: 'art-cool-winter-natural-skeleton-berry-lip-silver-glitter-10sen-2026',
    title: '【ブルベ冬×骨格ナチュラル】洗練モードを引き出す！深みベリーリップ＆濡れ感シルバーラメ10選',
    description: 'ウィンタータイプのコントラスト際立つシャープな透明感と、骨格ナチュラルのフレーム美・スタイリッシュさを最大化！深みベリー・プラムカラーの落ちないリップと、青みや濡れ感を引き立てるシルバー偏光ラメアイシャドウを厳選。楽天市場で高評価のモード系神コスメ10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'ブルベ冬 骨格ナチュラル メイク',
      'ブルベ冬 リップ ベリー',
      'ブルベ冬 アイシャドウ ラメ',
      '骨格ナチュラル コスメ おすすめ',
      'KATE ラスボス ブルベ冬',
      'ロムアンド フィグフィグ',
      'アディクション ムーンリバー'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T09:32:00.000Z',
    updatedAt: '2026-09-07T09:32:00.000Z',
    image: g2.kate_lip_07.imageUrl,
    affiliateUrl: g2.kate_lip_07.affiliateUrl,
    price: g2.kate_lip_07.price,
    itemCount: 10,
    featured: true,
    content: `## ブルベ冬×骨格ナチュラルが放つ「モード＆スタイリッシュの極み」

クリアで鮮烈なコントラストが映える「ブルベ冬（Winter）」と、骨や関節がしっかりとしたスタイリッシュなフレーム感を持つ「骨格ナチュラル」。

この2つの要素を持つ方は、**甘さを抑えたモード感、媚びない大人の色気、洗練された都会的なオーラ**を放つ唯一無二の魅力を持っています。

黄みの強いブラウンや暖色ラメを使うと肌がくすんで見え、逆にコンサバにまとめすぎると持ち前のスタイリッシュさが活きません。**『青みを帯びた深みベリー・プラムのリップ』**と**『骨格の陰影を際立たせる大粒シルバー・偏光青ラメ』**を潔く組み合わせることが垢抜けへの最短ルートです。

---

## 楽天市場で高評価！ブルベ冬×骨格ナチュラル名品コスメ10選

### 1. KATE リップモンスター 07 ラスボス
* **特徴**: 青みと深みを兼ね備えた魅惑のローズレッド。ブルベ冬の顔色を一瞬で冴え渡らせる大ヒット品番。
* **参考実売価格**: ${g2.kate_lip_07.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.kate_lip_07.affiliateUrl})

### 2. rom&nd ジューシーラスティングティント 06 フィグフィグ
* **特徴**: 熟したイチジクのような落ち着いた青みくすみローズ。ブルベ冬のデイリー使いに最適な粘膜リップ。
* **参考実売価格**: ${g2.romand_figfig.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.romand_figfig.affiliateUrl})

### 3. ディオール アディクト リップ マキシマイザー 006 ベリー
* **特徴**: 唇をふっくらボリュームアップさせながら、透明感あふれるディープベリーの輝きをプラス。
* **参考実売価格**: ${g2.dior_lip_glow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.dior_lip_glow.affiliateUrl})

### 4. クリオ（CLIO） プロ アイ パレット
* **特徴**: ブルベ冬に似合うプラム・モーブ・シルバーラメを凝縮。骨格ナチュラルの目元に彫りの深さを演出。
* **参考実売価格**: ${g2.clio_shadow_pro.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.clio_shadow_pro.affiliateUrl})

### 5. ADDICTION ザ アイシャドウ スパークル 005SP Moon River
* **特徴**: 月光を思わせるブルー・シルバーの神秘的な濡れツヤラメ。黒目の上や涙袋に重ねるだけで息を呑む透明感。
* **参考実売価格**: ${g2.addiction_moon_river.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.addiction_moon_river.affiliateUrl})

### 6. SUQQU ピュア カラー ブラッシュ 06 春菫
* **特徴**: ラベンダーピンク×アイスブルーのグラデーション。ブルベ冬の肌の白さと透明感を限界突破させるチーク。
* **参考実売価格**: ${g2.suqqu_blush_winter.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.suqqu_blush_winter.affiliateUrl})

### 7. ルナソル アイカラーレーション
* **特徴**: 濡れたような上質パールの陰影。骨格ナチュラルの立体的なアイホールを洗練されたモード顔へ昇華。
* **参考実売価格**: ${g2.lunasol_winter.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.lunasol_winter.affiliateUrl})

### 8. セザンヌ ウォータリーティントリップ 05 プラムレッド
* **特徴**: みずみずしい濡れツヤが続くプラムカラー。日常使いしやすく、落ちにくい高コスパティント。
* **参考実売価格**: ${g2.cezanne_watery_lip.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.cezanne_watery_lip.affiliateUrl})

### 9. キャンメイク オーロラカクテルグリッター
* **特徴**: 偏光ラメが煌めくグリッターライナー。目元にピンポイントで光を集め、澄んだ瞳を演出。
* **参考実売価格**: ${g2.canmake_glitter.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.canmake_glitter.affiliateUrl})

### 10. CHANEL ルージュ アリュール ラック
* **特徴**: 鮮烈な発色とサテンのような艶膜が長時間密着。ブルベ冬×骨格ナチュラルの勝負リップ。
* **参考実売価格**: ${g2.chanel_rouge_winter.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.chanel_rouge_winter.affiliateUrl})`
  },

  // 3. 炭酸スカルプシャンプー＆頭皮美容液
  {
    id: 'art-scalp-carbonic-shampoo-serum-odor-hair-thinning-care-10sen-2026',
    title: '【頭皮のベタつき・ニオイ・細毛を根本ケア】炭酸スカルプシャンプー＆頭皮美容液おすすめ10選',
    description: '夕方になると頭皮が脂っぽくベタつく、分け目のニオイが気になる、髪が細くなってトップがペタんこになる悩みを頭皮環境から根こそぎ改善！毛穴より微細な高濃度炭酸泡で皮脂汚れを浮かし出すスカルプシャンプーと、育毛・血行促進有効成分配合の頭皮美容液を徹底比較。楽天市場で絶賛される名品10選の実売データを完全網羅。',
    category: 'haircare',
    tags: [
      '頭皮 スカルプシャンプー おすすめ',
      '頭皮 ニオイ 改善 シャンプー',
      '頭皮 美容液 育毛 女性',
      '炭酸シャンプー 比較 おすすめ',
      'スカルプD シャンプー',
      'ミルボン プラーミア クリアスパフォーム',
      '頭皮 臭い 対策'
    ],
    author: '佐々木 健一',
    createdAt: '2026-09-07T09:34:00.000Z',
    updatedAt: '2026-09-07T09:34:00.000Z',
    image: g3.milbon_carbonic.imageUrl,
    affiliateUrl: g3.milbon_carbonic.affiliateUrl,
    price: g3.milbon_carbonic.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ頭皮は顔の2倍以上皮脂が出やすく、ニオイやすいのか？

「毎日洗髪しているのに、夕方になると頭皮が脂っぽく重たい」
「ドライヤーをしている時や帽子を脱いだ瞬間に、頭皮の嫌なニオイが漂う」
「年々分け目が目立ち、髪の毛の立ち上がりがペタんこになってきた」

頭皮は、**Tゾーンの約2〜3倍もの皮脂腺が密集している人体で最も皮脂分泌の激しい部位**です。

毛穴に詰まった皮脂が酸化して過酸化脂質に変化すると、常在菌がそれをエサにして繁殖し、特有の「酸化脂質臭」を放ちます。さらに、毛穴詰まりと血行不良が続くと毛根への栄養供給がストップし、健康な毛髪が細く弱々しく抜けてしまう原因となります。

---

## 炭酸の物理化学パワーと育毛エッセンスのWアプローチ

頭皮トラブルの解消には、通常のシャンプーでは届かない毛穴奥の汚れを掻き出す「高濃度炭酸クレンジング」と「頭皮への直接栄養補給」が不可欠です。

\`\`\`
【ステップ1：毛穴洗浄（高濃度炭酸シャンプー）】
5,000〜10,000ppmの微細炭酸泡
   ▲ 毛穴の隙間に浸透し、固まった皮脂をジュワッと浮き上がらせて完全除去＆血行促進
─────────────────────────────────────
【ステップ2：土台育成（スカルプエッセンス・頭皮美容液）】
アデノシン・グリチルリチン酸2K・植物エキス
   ▲ 清浄化された毛根にダイレクトに有効成分を届け、健やかなハリコシ毛を育てる
\`\`\`

---

## 楽天市場で高評価！頭皮ケア・炭酸スカルプ名品10選

### 1. ミルボン プラーミア クリアスパフォーム
* **特徴**: サロン専売の高濃度炭酸スカルプシャンプー。週2回のスペシャルケアで、頭皮のニオイとベタつきを爽快にリセット。
* **参考実売価格**: ${g3.milbon_carbonic.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.milbon_carbonic.affiliateUrl})

### 2. b.ris（ビーリス） オーガニックスパークリングシャンプー
* **特徴**: 5,000ppmの高濃度炭酸泡。植物エキスと高級オイルを贅沢配合し、傷んだ髪を補修しながら頭皮を優しく洗い上げます。
* **参考実売価格**: ${g3.brio_shampoo.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.brio_shampoo.affiliateUrl})

### 3. 資生堂 アデノバイタル スカルプエッセンス
* **特徴**: 資生堂の最先端育毛テクノロジー「薬用有効成分アデノシン」配合。髪の成長サイクルを活性化し、豊かなボリュームをサポート。
* **参考実売価格**: ${g3.shiseido_adenovital.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.shiseido_adenovital.affiliateUrl})

### 4. haru kurokamiスカルプ
* **特徴**: 100%天然由来素材のオールインワンシャンプー。頭皮のエイジングケアと保湿を両立し、ふんわりとしたハリコシを実感。
* **参考実売価格**: ${g3.haru_shampoo.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.haru_shampoo.affiliateUrl})

### 5. スカルプD 薬用スカルプシャンプー（アンファー）
* **特徴**: 頭皮タイプ別に皮脂を科学する薬用処方。フケ・かゆみ・ニオイを防ぎ、清潔な頭皮環境を徹底維持。
* **参考実売価格**: ${g3.scalp_d_shampoo.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.scalp_d_shampoo.affiliateUrl})

### 6. ルベル ジオ スキャルプビルダー
* **特徴**: サロン品質の頭皮用育毛剤。頭皮の血流をダイレクトに刺激し、根元からグッと立ち上がる強い髪を育みます。
* **参考実売価格**: ${g3.lebel_theo.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.lebel_theo.affiliateUrl})

### 7. チャップアップ（CHAP UP） シャンプー
* **特徴**: アミノ酸系洗浄成分とオーガニックエキス配合。弱酸性で頭皮に負担をかけず、余分な皮脂だけを優しく除去。
* **参考実売価格**: ${g3.chapup_shampoo.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.chapup_shampoo.affiliateUrl})

### 8. キュレル 頭皮保湿ローション
* **特徴**: セラミド機能成分配合で、乾燥によるかゆみやフケを鎮静。ベタつかないローションで健やかな頭皮へ。
* **参考実売価格**: ${g3.curel_scalp.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.curel_scalp.affiliateUrl})

### 9. 高濃度炭酸シャンプー（人気ランキング上位）
* **特徴**: 弾力のある濃密な炭酸ホイップ泡で、摩擦レスに毛穴の皮脂詰まりをクレンジング。
* **参考実売価格**: ${g3.carbonic_shampoo_top.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.carbonic_shampoo_top.affiliateUrl})

### 10. クレアージュ メディカル スカルプセラム
* **特徴**: 女性特有の薄毛・抜け毛・頭皮の乾燥に着目した薬用育毛エッセンス。ふんわりボリュームアップをアシスト。
* **参考実売価格**: ${g3.scalp_d_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.scalp_d_serum.affiliateUrl})`
  },

  // 4. まつ毛美容液＆まつパコーティング
  {
    id: 'art-eyelash-serum-no-pigmentation-lash-lift-coating-10sen-2026',
    title: '【色素沈着しない＆自まつ毛が伸びる】高濃度まつ毛美容液＆まつ毛パーマ長持ちコーティング10選',
    description: '「まぶたの黒ずみ（色素沈着）が怖くてまつ毛美容液を使えない」「まつ毛パーマの持ちを良くしてバラつきを防ぎたい」悩みに完全回答！プロスタグランジン誘導体フリーの安心処方美容液と、パーマの束感キープ＆トリートメントを同時に叶えるクリアコーティング剤を徹底比較。楽天市場で高評価の最新10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'まつ毛美容液 色素沈着なし おすすめ',
      'まつ毛 伸びる 美容液 ランキング',
      'まつ毛パーマ コーティング剤 おすすめ',
      'ラッシュアディクト 効果 口コミ',
      'まつパ 長持ち コーティング',
      'スカルプD まつ毛美容液 プレミアム',
      'リバイタラッシュ アドバンス'
    ],
    author: '篠原 玲奈',
    createdAt: '2026-09-07T09:36:00.000Z',
    updatedAt: '2026-09-07T09:36:00.000Z',
    image: g4.lashaddict_serum.imageUrl,
    affiliateUrl: g4.lashaddict_serum.affiliateUrl,
    price: g4.lashaddict_serum.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ従来のまつ毛美容液で「まぶたの色素沈着」が起きてしまうのか？

「まつ毛を伸ばしたいけれど、目の周りが茶色くくすんでゾンビのようになったら嫌だ」
「まつ毛パーマをかけた後、乾燥して毛先がチリついたりバラついてしまう」

まつ毛美容液でまぶたが黒ずむ原因の多くは、緑内障治療薬由来の成分である**『プロスタグランジン類似物質（ビマトプロスト等）』**によるメラニン産生の過剰刺激です。

強力に毛を伸ばす作用がある一方で、目周りの皮膚が薄い方に色素沈着や目元の窪み（くぼみ目）を引き起こすリスクがあります。

現在は、**ペプチド複合体・毛髪補修アミノ酸・植物幹細胞エキスなど、色素沈着を起こさずに毛根にハリと長さを与える最新ペプチド処方**が主流となり、安心して自まつ毛育成ができる時代になっています。

---

## 自まつ毛を伸ばしパーマを長持ちさせる『夜の育毛×朝の束感コーティング』

サロン帰りのような上向き美まつ毛を保つ秘訣は、**夜の根本ケアと日中の保護コーティングの使い分け**です。

\`\`\`
【夜の集中育毛ケア：まつ毛美容液（高濃度ペプチド）】
極細筆でまつ毛の生え際（根本）に塗布
   ▲ 毛母細胞を活性化し、抜けにくく太く長い自まつ毛を育成
─────────────────────────────────────
【朝の保護＆スタイリング：クリアコーティング剤】
ブラシタイプでまつ毛全体を包み込むように塗布
   ▲ 摩擦・乾燥・湿気からパーマのカールを保護し、流行りの「韓国風束感」をロック
\`\`\`

---

## 楽天市場で高評価！まつ毛美容液＆まつパコーティングおすすめ10選

### 1. ラッシュアディクト アイラッシュ コンディショニング セラム
* **特徴**: サロン専売から火がついた驚異のまつ毛美容液。ナノペプチド複合体が自まつ毛本来の密度と長さを覚醒させます。
* **参考実売価格**: ${g4.lashaddict_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.lashaddict_serum.affiliateUrl})

### 2. スカルプD ボーテ ピュアフリーアイラッシュセラム プレミアム
* **特徴**: 色素沈着成分フリー処方。まつ毛養成成分を2倍配合し、敏感な目元を労りながらハリコシを与えます。
* **参考実売価格**: ${g4.scalpd_eyelash_premium.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.scalpd_eyelash_premium.affiliateUrl})

### 3. リバイタラッシュ アドバンス ジャパン
* **特徴**: 眼科医が開発した世界的まつ毛トリートメントの日本正規品処方。しなやかで強いまつ毛を育みます。
* **参考実売価格**: ${g4.revitalash_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.revitalash_serum.affiliateUrl})

### 4. フェニックス アイラッシュサポートジェル
* **特徴**: まつ毛パーマ・マツエクサロンで絶大な支持を誇るコーティングジェル。バラつきを防ぎ、理想の束感を一日中キープ。
* **参考実売価格**: ${g4.phoreno_coating.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.phoreno_coating.affiliateUrl})

### 5. Omeme（オメメ） グロウアンドプロテクト
* **特徴**: まつ毛を守るコーティング美容液。紫外線や乾燥から守りながら、ツヤのある上向きカールをホールド。
* **参考実売価格**: ${g4.omeme_coating.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.omeme_coating.affiliateUrl})

### 6. セザンヌ まつげ美容液EX
* **特徴**: プチプラ界の超実力派。まぶたや眉毛にも使える3in1仕様で、ワイドラッシュ成分がまつ毛を補強。
* **参考実売価格**: ${g4.cezanne_eyelash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.cezanne_eyelash.affiliateUrl})

### 7. UZU（ウズ） まつげ美容液
* **特徴**: 指で塗る新発想美容液。まぶた全体の血行と潤いを整え、まつ毛が育ちやすい健康な土台を作ります。
* **参考実売価格**: ${g4.uzustudio_eyelash.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.uzustudio_eyelash.affiliateUrl})

### 8. DHC エクストラビューティ アイラッシュトニック
* **特徴**: 多彩な植物エキスと成長サポート成分を配合。まつ毛の毛周期を整え、抜け毛を防ぎます。
* **参考実売価格**: ${g4.dhc_eyelash_tonic.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.dhc_eyelash_tonic.affiliateUrl})

### 9. マジョリカ マジョルカ ラッシュジェリードロップ EX
* **特徴**: 赤いまつ毛美容液として大バズり。ドロップ状のチップがまつ毛1本1本にフィットし、うぶ毛までくっきり。
* **参考実売価格**: ${g4.majolica_lash_jelly.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.majolica_lash_jelly.affiliateUrl})

### 10. ヒロインメイク アイラッシュセラムEX
* **特徴**: 27種類の美容液成分をぎゅっと凝縮。速乾性があり、朝のメイク前でもベタつかずに使えます。
* **参考実売価格**: ${g4.heroine_eyelash_serum.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.heroine_eyelash_serum.affiliateUrl})`
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
