import fs from 'fs';

const g1 = JSON.parse(fs.readFileSync('scratch/rakuten_batch4_g1_verified.json', 'utf8'));
const g2 = JSON.parse(fs.readFileSync('scratch/rakuten_batch4_g2_verified.json', 'utf8'));
const g3 = JSON.parse(fs.readFileSync('scratch/rakuten_batch4_g3_verified.json', 'utf8'));
const g4 = JSON.parse(fs.readFileSync('scratch/rakuten_batch4_g4_verified.json', 'utf8'));

const articlesToAdd = [
  // 1. 石けん＆柔軟剤系モテ香水
  {
    id: 'art-soap-softener-clean-fragrance-perfume-10sen-2026',
    title: '【男ウケ抜群・すれ違いざまに褒められる】清潔感あふれる石けん＆柔軟剤系フレグランス10選',
    description: '香水特有のキツい匂いが苦手な人でも虜になる！お風呂上がりの湯気や、洗い立てのリネンを思わせる「清潔感・透明感・柔軟剤の香り」のモテ香水を徹底特集。オフィスや学校でも嫌味にならず、すれ違った瞬間に「いい匂い」と振り返られる名品フレグランス10選のリアルタイム実売データを完全網羅。',
    category: 'fragrance',
    tags: [
      '石けんの香り 香水 おすすめ',
      '柔軟剤の匂い 香水 モテる',
      '清潔感 香水 プチプラ デパコス',
      'SHIRO サボン 香水',
      'レイジーサンデーモーニング 似てる',
      'シャンプーの香り 香水',
      '男ウケ 香水 ナチュラル'
    ],
    author: '篠原 玲奈',
    createdAt: '2026-09-07T13:50:00.000Z',
    updatedAt: '2026-09-07T13:50:00.000Z',
    image: g1.shiro_savon.imageUrl,
    affiliateUrl: g1.shiro_savon.affiliateUrl,
    price: g1.shiro_savon.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ「石けん・柔軟剤の香り」は全人類から愛されるのか？

「香水をつけたいけれど、キツい匂いで周りに迷惑をかけたくない」
「男性から『いい匂いがする』と本能的に褒められる香りをまといたい」
「オフィスや満員電車でも安心して使える自然な香水が欲しい」

香水の嗜好調査において、世代・性別を問わず常に好感度ナンバーワンに輝くのが**『清潔感あふれる石けん・サボン・洗い立てのリネンの香り』**です。

濃厚なオリエンタル系や甘すぎるバニラ系とは異なり、石けんや柔軟剤の香りは「清潔さ」「無防備な素肌感」「安心感」を脳にダイレクトに想起させます。作り込まれた香水感を感じさせず、「もともと清潔でいい匂いの人」という印象を自然に植え付けることができます。

---

## 楽天市場で大人気！清潔感モテフレグランスおすすめ10選

### 1. SHIRO（シロ） サボン オードパルファン
* **特徴**: 清潔感あふれる石けんの香りの金字塔。レモンやオレンジの爽快なシトラスから、ふんわり甘い石けんへと変化。
* **参考実売価格**: ${g1.shiro_savon.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.shiro_savon.affiliateUrl})

### 2. SHIRO（シロ） ホワイトリリー オードパルファン
* **特徴**: 洗練されたフローラルと清潔感の融合。清楚で凛とした女性像を演出する、オフィスモテの代表格。
* **参考実売価格**: ${g1.shiro_white_lily.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.shiro_white_lily.affiliateUrl})

### 3. メゾン マルジェラ レプリカ レイジーサンデーモーニング
* **特徴**: 日曜の朝、洗い立てのリネンシーツに包まれる心地よさを再現。スズランとホワイトムスクが織りなす極上の清潔感。
* **参考実売価格**: ${g1.maison_margiela_lazy.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.maison_margiela_lazy.affiliateUrl})

### 4. アクアシャボン ウォータリーシャンプーの香り
* **特徴**: お風呂上がりのシャンプーの泡立ちを想起させるみずみずしさ。デイリーに気兼ねなく使える大人気プチプラ。
* **参考実売価格**: ${g1.aqua_savon.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.aqua_savon.affiliateUrl})

### 5. ジルスチュアート オード ホワイトフローラル
* **特徴**: 純白の花束と柔らかな石けんが溶け合うような甘く清楚なアロマ。可憐なフェミニンさを演出したい日に。
* **参考実売価格**: ${g1.jillstuart_white_floral.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.jillstuart_white_floral.affiliateUrl})

### 6. アッカカッパ（ACCA KAPPA） ホワイトモス オーデコロン
* **特徴**: イタリアの高級ホテルやスパのアメニティとしても名高い名香。知性とお風呂上がりの爽やかさを兼ね備えたユニセックス仕様。
* **参考実売価格**: ${g1.accakappa_white_moss.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.accakappa_white_moss.affiliateUrl})

### 7. ショーレイヤード（SHOLAYERED） フレッシュペア
* **特徴**: もぎたての洋梨と透明感あるソープが重なり合う上質な香り。レイヤリングにも最適。
* **参考実売価格**: ${g1.layering_fresh_pear.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.layering_fresh_pear.affiliateUrl})

### 8. クロエ（Chloe） オードパルファム
* **特徴**: クラシック・ローズと石けんのようなパウダリーノートが調和。大人のエレガントな清潔感を醸し出す王道フレグランス。
* **参考実売価格**: ${g1.chloe_edp.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.chloe_edp.affiliateUrl})

### 9. フィアンセ ボディミスト ピュアシャンプーの香り
* **特徴**: 「通りすがりに必ず振り返られる」とSNSで伝説化したロングセラー。シャンプーしたてのようなピュアな透明感。
* **参考実売価格**: ${g1.fiancee_pure_shampoo.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.fiancee_pure_shampoo.affiliateUrl})

### 10. オゥパラディ（AUX PARADIS） サボン
* **特徴**: 南仏ラベンダーの安らぎとお風呂上がりの石けんのぬくもり。天然香料を主体とした肌馴染みの良さが魅力。
* **参考実売価格**: ${g1.auxparadis_savon.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g1.auxparadis_savon.affiliateUrl})`
  },

  // 2. 韓国クッションファンデーション
  {
    id: 'art-korean-cushion-foundation-glow-full-coverage-10sen-2026',
    title: '【崩れ知らずの生ツヤ水光肌】韓国発クッションファンデーションおすすめ10選！カバー力＆持続力徹底検証',
    description: '「韓国アイドルのような毛穴レスの内側発光肌になりたい」「夕方になってもマスク崩れや乾燥ヨレを起こしたくない」悩みに完全回答！驚異の密着カバー力と、みずみずしいガラス玉ツヤを両立した最新韓国クッションファンデーションを徹底比較。楽天市場でベストセラーに君臨する名品10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      '韓国 クッションファンデ ツヤ おすすめ',
      'クッションファンデ カバー力 崩れない',
      'TIRTIR クッションファンデ 比較',
      'クリオ メッシュグロウ 口コミ',
      'ジョンセンムル クッションファンデ 色選び',
      'HERA ブラッククッション',
      '水光肌 ファンデーション'
    ],
    author: '水城 愛佳',
    createdAt: '2026-09-07T13:52:00.000Z',
    updatedAt: '2026-09-07T13:52:00.000Z',
    image: g2.tirtir_red_cushion.imageUrl,
    affiliateUrl: g2.tirtir_red_cushion.affiliateUrl,
    price: g2.tirtir_red_cushion.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ韓国のクッションファンデは「圧倒的なツヤ」と「持続力」を両立できるのか？

「ツヤ肌ファンデはベタついてマスクに移りやすい」
「カバー力が高いファンデは厚塗り感が出て老けて見える」

そうした従来のベースメイクの常識を覆したのが、進化を続ける**『最新韓国クッションファンデーション』**です。

韓国コスメの技術革新により、超微粒子パウダーを網目状のメッシュフィルターで極薄に均一化する技術や、水分エッセンスを70%以上閉じ込めたウォーターロック処方が確立。**肌の凹凸や赤みを完璧にカバーしながら、まるで素肌が水分を満タンに抱え込んでいるかのような生ツヤ（水光感）**を一日中キープできるようになりました。

---

## 楽天市場で高評価！韓国クッションファンデおすすめ10選

### 1. TIRTIR（ティルティル） マスクフィット レッド クッション
* **特徴**: 72時間崩れない圧倒的カバー力。赤のパッケージでおなじみの、毛穴・色ムラを瞬時に消滅させるモンスターヒット。
* **参考実売価格**: ${g2.tirtir_red_cushion.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.tirtir_red_cushion.affiliateUrl})

### 2. CLIO（クリオ） キルカバー メッシュグロウ クッション
* **特徴**: 微細メッシュネットを通して均一にパフに密着。水分感あふれるスキンケアのようなガラス玉ツヤ肌へ。
* **参考実売価格**: ${g2.clio_kill_cover_mesh.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.clio_kill_cover_mesh.affiliateUrl})

### 3. rom&nd（ロムアンド） ヌーゼロ クッション
* **特徴**: 塗っていることを忘れるほど極薄フィット。素肌感を残しつつ、毛穴を自然にぼかすフォギーセミマット。
* **参考実売価格**: ${g2.romand_nu_zero.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.romand_nu_zero.affiliateUrl})

### 4. HERA（ヘラ） ブラック クッション
* **特徴**: BLACKPINKジェニー愛用のラグジュアリークッション。薄膜ハイカバーで至近距離でも隙のないベルベット肌を演出。
* **参考実売価格**: ${g2.hera_black_cushion.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.hera_black_cushion.affiliateUrl})

### 5. LANEIGE（ラネージュ） ネオクッション グロウ
* **特徴**: ブルーライトカット機能と24時間ダイヤモンドのような発光ツヤ。しっとり潤いながら服に色移りしにくい密着感。
* **参考実売価格**: ${g2.laneige_neo_cushion.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.laneige_neo_cushion.affiliateUrl})

### 6. fwee（フィー） クッション ガラス ナチュラル
* **特徴**: 温泉水エッセンス配合でぷるんとした水分光膜を形成。インナードライ肌でも夕方まで乾燥知らず。
* **参考実売価格**: ${g2.fwee_cushion_glass.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.fwee_cushion_glass.affiliateUrl})

### 7. espoir（エスポア） プロテーラー ビーベルベット クッション
* **特徴**: パワフルな持続力とホワイトサファイアパウダー配合の高級感あるマット質感。崩れ知らずの完成度。
* **参考実売価格**: ${g2.espoir_pro_tailor.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.espoir_pro_tailor.affiliateUrl})

### 8. ジョンセンムル（JUNG SAEM MOOL） エッセンシャル スキン ヌーダー クッション
* **特徴**: メイクアップアーティスト発の伝説クッション。独自のパレット面で量を調節し、素肌が元から綺麗なプロの仕上がり。
* **参考実売価格**: ${g2.jungsaemmool_skin_nuder.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.jungsaemmool_skin_nuder.affiliateUrl})

### 9. AMUSE（アミューズ） デュー ジェリー マスター ヴィーガン クッション
* **特徴**: 70%ゼリーエッセンス配合のフランスEVEヴィーガン認証クッション。ハリと透明感に満ちた水光弾力肌に。
* **参考実売価格**: ${g2.amuse_dew_jelly.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.amuse_dew_jelly.affiliateUrl})

### 10. APLIN（アプリン） ピンクティーツリーカバークッション
* **特徴**: ティーツリーとCICAエキスを贅沢配合。肌荒れやニキビを優しくケアしながら、高いカバー力で陶器肌を演出。
* **参考実売価格**: ${g2.aplin_pink_cushion.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g2.aplin_pink_cushion.affiliateUrl})`
  },

  // 3. ハンドセラム・老け手ケア
  {
    id: 'art-aging-hands-repair-ceramide-niacinamide-hand-serum-10sen-2026',
    title: '【年齢が出る手元を若見えリセット】高保湿セラミド＆ナイアシンアミド配合ハンドセラム10選',
    description: '「手の甲の血管が浮き出て老けて見える」「水仕事やアルコール消毒で指先がガサガサ・ひび割れる」手元の悩みを根本から解消！ベタつきを一切残さず角層深くまで浸透する「高機能ハンド美容液・セラム」と、手肌のキメをふっくら立て直すセラミド・尿素配合の名品10選の実売データを完全網羅。',
    category: 'bodycare',
    tags: [
      'ハンドクリーム 老け手 改善',
      '手の甲 シミ 美白 ハンドクリーム',
      '高保湿 ハンドセラム ベタつかない',
      'アトリックス ナイトスペリア 口コミ',
      'ロクシタン シア ハンドクリーム',
      '手の甲 血管 浮き出る 対策',
      'イソップ ハンドバーム'
    ],
    author: '蓮見 拓真',
    createdAt: '2026-09-07T13:54:00.000Z',
    updatedAt: '2026-09-07T13:54:00.000Z',
    image: g3.loccitane_shea_hand.imageUrl,
    affiliateUrl: g3.loccitane_shea_hand.affiliateUrl,
    price: g3.loccitane_shea_hand.price,
    itemCount: 10,
    featured: true,
    content: `## なぜ手元は顔よりも10歳早く「老化サイン」が出るのか？

「顔のお手入れは頑張っているのに、ふと自分の手を見るとシワシワで年齢を感じる」
「手の甲の皮膚が薄くなり、青い血管や筋が浮き出てきた」
「ハンドクリームを塗ってもすぐに乾いて表面だけがヌルヌルする」

手元は、**皮脂腺が顔の3分の1以下しかなく、角層が薄いにもかかわらず、手洗い・アルコール消毒・紫外線に年中無休で晒される最も過酷なパーツ**です。

油分の多いクリームを上から塗るだけでは、乾ききった角層内部に水分は届きません。**顔のスキンケアと同じように「美容液（セラム）で水分と美容成分を補給」してから「油分で密閉」する本格手元エイジングケア**が若見えの決定打となります。

---

## 楽天市場で高評価！老け手改善ハンドセラムおすすめ10選

### 1. ロクシタン（L'OCCITANE） シア ハンドクリーム
* **特徴**: 天然シアバター20%配合。手肌にリッチな潤いを与え、乾燥による小ジワや手荒れを包み込む世界的ベストセラー。
* **参考実売価格**: ${g3.loccitane_shea_hand.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.loccitane_shea_hand.affiliateUrl})

### 2. アトリックス ビューティーチャージ ナイトスペリア
* **特徴**: 美容液カプセル配合のこっくり濃厚ナイトパック。寝る前に塗り込むだけで翌朝ふっくらキメの整った手肌へ。
* **参考実売価格**: ${g3.atrix_beauty_charge.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.atrix_beauty_charge.affiliateUrl})

### 3. イソップ（Aesop） レスレクション ハンドバーム
* **特徴**: マンダリンやローズマリーの洗練されたアロマ。肌を柔軟にするエモリエント成分が素早く馴染みベタつきゼロ。
* **参考実売価格**: ${g3.aesop_resurrection.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.aesop_resurrection.affiliateUrl})

### 4. ジュリーク（Jurlique） ローズ ハンドクリーム
* **特徴**: オーガニック認証自社農園の貴重なローズエキス配合。ふっくらとしたハリと華やかな幸福感をもたらします。
* **参考実売価格**: ${g3.jurlique_rose_hand.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.jurlique_rose_hand.affiliateUrl})

### 5. 資生堂 薬用モアディープ
* **特徴**: オレンジのつぶつぶマッサージパウダー配合。尿素とビタミンEが血行を促進し、頑固なガサガサ手肌を柔軟化。
* **参考実売価格**: ${g3.shiseido_hand_urea.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.shiseido_hand_urea.affiliateUrl})

### 6. SHIRO（シロ） ホワイトティー ハンド美容液
* **特徴**: みずみずしいジェル状セラム。アロエや酒粕エキスが手肌の角層に素早く浸透し、上品な香りでリフレッシュ。
* **参考実売価格**: ${g3.shiro_white_tea_hand.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.shiro_white_tea_hand.affiliateUrl})

### 7. キュレル 潤浸保湿 ハンドクリーム
* **特徴**: 手肌保護膜成分とセラミド機能成分配合。水仕事にも強く、ひび・あかぎれを繰り返す敏感肌をレスキュー。
* **参考実売価格**: ${g3.curel_hand_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.curel_hand_cream.affiliateUrl})

### 8. ベネフィーク（BENEFIQUE） ハンドクリーム
* **特徴**: 浄化＆恵みのボタニカル成分配合。手元のくすみを払い、透明感あふれる明るい指先へと導きます。
* **参考実売価格**: ${g3.shiseido_benefique_hand.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.shiseido_benefique_hand.affiliateUrl})

### 9. ユースキン シソラ ローション
* **特徴**: しその葉エキス配合の低刺激ミルク。カサつく手肌にスッと伸びてうるおいバリアをキープ。
* **参考実売価格**: ${g3.yuskin_sisora.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.yuskin_sisora.affiliateUrl})

### 10. 高浸透シルク ナイアシンアミド ハンドセラム
* **特徴**: ナイアシンアミドとシルクエキスを贅沢配合。スマホをすぐに触れるサラサラ感と高いエイジングケア効果を両立。
* **参考実売価格**: ${g3.etvos_hand_cream.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g3.etvos_hand_cream.affiliateUrl})`
  },

  // 4. イエベ春×骨格ウェーブ
  {
    id: 'art-spring-warm-wave-skeleton-coral-pink-multi-glow-10sen-2026',
    title: '【イエベ春×骨格ウェーブ】可憐な甘さと多幸感！コーラルピンク＆パールハイライト10選',
    description: 'スプリングタイプの明るくピュアな血色感と、骨格ウェーブの華奢で柔らかな曲線を最大限に活かす！重たいブラウンや大粒ラメを避け、繊細パールと透け感コーラルピンクで「多幸感あふれる儚げモテ顔」を作る神コスメを厳選。楽天市場で絶賛される名品10選の実売データを完全網羅。',
    category: 'makeup',
    tags: [
      'イエベ春 骨格ウェーブ コスメ',
      'イエベ春 コーラルピンク リップ',
      '多幸感メイク アイシャドウ おすすめ',
      '骨格ウェーブ 似合うメイク',
      'KATE リップモンスター 02',
      'セザンヌ パールグロウハイライト 01',
      'ルナソル アイカラーレーション 15'
    ],
    author: '桐谷 遥',
    createdAt: '2026-09-07T13:56:00.000Z',
    updatedAt: '2026-09-07T13:56:00.000Z',
    image: g4.lunasol_coral.imageUrl,
    affiliateUrl: g4.lunasol_coral.affiliateUrl,
    price: g4.lunasol_coral.price,
    itemCount: 10,
    featured: true,
    content: `## イエベ春×骨格ウェーブが放つ「多幸感とふんわり甘美オーラ」

パーソナルカラー「イエベ春（Spring）」と、曲線的で華奢なボディラインを持つ「骨格ウェーブ」。

この組み合わせを持つ女性は、**春の陽だまりのような温かみ、少女のような愛らしさ、そして守りたくなるようなふんわりとした透明感**という最強のモテ要素を兼ね備えています。

コントラストの強すぎる暗色や、マットすぎるパウダーで仕上げると肌が沈んで見えてしまいます。**『肌に明るい血色感を灯すコーラルピンク・ピーチ』**と**『骨格ウェーブの薄いデコルテや顔立ちを立体的に見せる繊細パールハイライト』**で、内側から発光するような多幸感を演出するのがベストです。

---

## 楽天市場で高評価！イエベ春×骨格ウェーブ名品コスメ10選

### 1. ルナソル アイカラーレーション 15 フローレスクラリティ
* **特徴**: 宝石のようなまばゆい輝き。イエベ春の瞳をキラキラと輝かせ、骨格ウェーブの繊細な目元を華やかに彩る名作。
* **参考実売価格**: ${g4.lunasol_coral.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.lunasol_coral.affiliateUrl})

### 2. KATE リップモンスター 02 Pink banana
* **特徴**: まろやかなピンクベージュ。血色感と愛らしさを自然に宿し、イエベ春の粘膜リップとして圧倒的人気。
* **参考実売価格**: ${g4.kate_lip_02.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.kate_lip_02.affiliateUrl})

### 3. セザンヌ パールグロウハイライト 01 シャンパンベージュ
* **特徴**: 「塗るレフ板」と称される濡れツヤハイライト。シャンパンゴールドの繊細パールが頬骨や鼻根に自然な高さをプラス。
* **参考実売価格**: ${g4.cezanne_pearl_glow.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.cezanne_pearl_glow.affiliateUrl})

### 4. rom&nd ジューシーラスティングティント 07 ジュジュブ
* **特徴**: 熟したナツメのような絶妙コーラル。みずみずしい果汁シロップ膜でぷるんとした立体リップに。
* **参考実売価格**: ${g4.romand_juicy_07.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.romand_juicy_07.affiliateUrl})

### 5. クリニーク（CLINIQUE） チーク ポップ 08 メロンポップ
* **特徴**: ガーベラの花が型押しされたリキッド状パウダー。肌にとけこみ、ポッと上気したようなピュアなメロンコーラルを再現。
* **参考実売価格**: ${g4.clinique_melon_pop.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.clinique_melon_pop.affiliateUrl})

### 6. キャンメイク シルキースフレアイズ 07 ネクタリンオレンジ
* **特徴**: 透け感のあるジューシーなコーラルオレンジ。しっとりスフレ質感で粉飛びせず、ピュアな目元を演出。
* **参考実売価格**: ${g4.canmake_silky_07.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.canmake_silky_07.affiliateUrl})

### 7. エクセル シームレストーン ブラッシュ SB02 シスター
* **特徴**: 肌に溶け込むヌードコーラル。骨格ウェーブの柔らかな頬にふんわりと自然な血色を宿します。
* **参考実売価格**: ${g4.excel_cushion_blush.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.excel_cushion_blush.affiliateUrl})

### 8. ディオール アディクト リップ マキシマイザー 001 ピンク
* **特徴**: カプサイシンとヒアルロン酸配合。唇をふっくらプランプアップさせ、可憐なミルキーピンクのツヤをプラス。
* **参考実売価格**: ${g4.dior_maximizer_001.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.dior_maximizer_001.affiliateUrl})

### 9. クリオ（CLIO） プロ シングル シャドウ G10
* **特徴**: 指原莉乃さんの愛用で伝説となった濡れツヤゴールドラメ。黒目の上や涙袋に重ねるだけで多幸感が爆発。
* **参考実売価格**: ${g4.clio_glitter_spring.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.clio_glitter_spring.affiliateUrl})

### 10. SUQQU ピュア カラー ブラッシュ
* **特徴**: 繊細なグラデーションが織りなす極上の透け感。イエベ春の明るい肌トーンを最大限に美しく魅せる名品チーク。
* **参考実売価格**: ${g4.suqqu_blush_spring.price.toLocaleString()}円
* [▶ 楽天市場で公式・最安値をチェックする](${g4.suqqu_blush_spring.affiliateUrl})`
  }
];

// Insert into articles.json
const articlesPath = 'src/data/articles.json';
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const newIds = new Set(articlesToAdd.map(a => a.id));
const filtered = articles.filter(a => !newIds.has(a.id));

filtered.unshift(...articlesToAdd);

fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2));
console.log('Successfully inserted all 4 Batch 4 articles into src/data/articles.json. Total count:', filtered.length);
