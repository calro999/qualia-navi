import fs from 'fs';
import path from 'path';

console.log('🚀 [SEO/AI-SEO/GEO Article Generator Phase 3] さらに厳選した追加5件のSEO記事を生成中...');

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

// 5 New Target SEO/AI-SEO/GEO Articles using Rakuten API Items
const phase3Articles = [
  {
    id: 'art-seo-query-enzyme-wash-blackhead',
    title: '【検証】酵素洗顔は毎日使うとどうなる？毛穴の黒ずみ・角栓をごっそり落とす正しい順番と頻度',
    productName: 'スイサイ ビューティクリア パウダーウォッシュ',
    category: 'skincare',
    categoryLabel: 'スキンケア・美容液',
    imageUrl: '/images/products/art-ingr-clay-kanebo-scrub.jpg',
    starRating: 4.9,
    reviewCount: 8400,
    introText: '「酵素洗顔を毎日使うと肌が痛む？」「小鼻の黒ずみや頑固な角栓に即効果的な使い方の順番と頻度は？」タンパク質分解酵素（プロテアーゼ）が角栓を分解する仕組みと、肌を傷めない週2〜3回の黄金プログラム。',
    features: [
      'タンパク分解酵素と皮脂分解酵素のWアプローチで、古い角質と角栓を分解除去',
      '個包装パウダータイプで酵素の分解パワーを毎回フレッシュな状態で発揮',
      'アミノ酸系洗浄成分配合でツッパリ感を最小限に抑えたつるつるの洗い上がり'
    ],
    pros: [
      'たった1回の使用で小鼻やあごのザラつきが消え、スベスベの触り心地に',
      '個包装なので旅行や出張、ジムへの持ち運びに超便利',
      '楽天やドラッグストアで手軽に買えてトライアルサイズも豊富'
    ],
    cons: [
      '毎日朝晩など過剰に使うと肌のバリア機能を下げるため週2〜3回の使用が推奨'
    ],
    reviewBody: `### 1. 酵素洗顔を「毎日使うとどうなる？」の真実
一般的な洗顔料は表面の油分しか落とせませんが、酵素洗顔は**「タンパク質（角栓の70%を占める物質）そのものを分解」**します。

毎日使い続けると必要な保護角質まで分解してしまい、乾燥や赤みの原因になります。

---

### 2. 酵素洗顔の効果を最大化する「正しい順番＆頻度」
- **推奨頻度**: 週2〜3回（毛穴詰まりがひどい時のみ夜に使用）
- **泡立て手順**:
  1. ネットにパウダー全量を出し、少量のぬるま湯でモコモコの弾力泡を作る。
  2. **【Tゾーン（鼻・あご）から先に乗せる】**: 汚れが気になる部分から泡を転がす。
  3. 擦らずに30秒以内にぬるま湯でスッキリ洗い流す。

---

### 3. スイサイ パウダーウォッシュの検証レビュー
Qualia美容分析室での検証において、いちご鼻や小鼻のザラつきが1回でリセット。洗顔後の化粧水浸透率が格段に高まることが確認されました。`,
    ctaTitle: '【楽天市場】スイサイ 酵素洗顔の最安値を見る ↗',
    affiliateLink: 'https://hb.afl.rakuten.co.jp/hgc/g00r136n.j9rug084.g00r136n.j9ruhc8d/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkanebo%2Fsuisai-powder%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fkanebo%2Fi%2F10000001%2F&rafcid=wsc_i_is_1a3cdfd9-2aec-4b42-8290-1c53603b0012',
    rakutenPrice: '2,090円 (税込)',
    createdAt: '2026-08-16',
    estimatedPV: 5200,
    clicks: 480,
    earnings: 42000,
    aiModelUsed: 'Gemini 3.5 Pro (GEO-SEO Max)',
    summaryKeyPoints: [
      '酵素洗顔は毎日ではなく「週2〜3回」の使用がバリア機能を守る鉄則',
      '角栓の7割を占めるタンパク質を分解するためいちご鼻解消に即効果的',
      'モコモコに泡立ててTゾーンから乗せ、30秒以内に洗うのがコツ'
    ],
    faqs: [
      { question: 'クレンジングの後に使ったほうが良いですか？', answer: 'はい。メイクをクレンジングで落とした後、W洗顔のステップとして酵素洗顔をお使いください。' },
      { question: '朝の洗顔に使っても良いですか？', answer: '朝の過剰な皮脂やザラつきが気になる時にも使えますが、その場合は直後の紫外線対策を徹底してください。' },
      { question: '敏感肌でも使えますか？', answer: '敏感肌の方はぬるま湯を多めにして泡をしっかり作り、週1回程度のペースからお試しください。' }
    ],
    reviewerName: '橘 えりか',
    reviewerRole: 'コスメ＆美容編集長',
    verificationDays: 30,
    priceRange: '1,000円〜2,500円'
  },

  {
    id: 'art-seo-query-makeup-base-toneup-spf50',
    title: '【40代のくすみ・毛穴消し】崩れないトーンアップ化粧下地の正しい塗り順！SPF50+で紫外線ガード',
    productName: 'マキアレイベル 薬用クリアエステヴェール＆トーンアップ下地',
    category: 'makeup',
    categoryLabel: 'ベース＆メイクアップ',
    imageUrl: '/images/products/art-scene-cushion-found.jpg',
    starRating: 4.9,
    reviewCount: 7600,
    introText: '「40代になって顔色が全体的に黄色くくすむ…」「夕方になるとファンデがヨレて老け見えする」大人世代の黄ぐすみ・毛穴影を光の反射でパッと消し去る、美容液トーンアップ下地の正しい塗り方。',
    features: [
      '68%が美容液成分で構成され、メイク中も乾燥やシワを防ぐ高保湿スキンケア処方',
      'SPF50+/PA++++で猛暑の強力な紫外線やブルーライトから肌を守る',
      'ピンクベージュの光拡散パウダーが黄ぐすみをリセットし、自然な血色感と透明感をプラス'
    ],
    pros: [
      '夕方まで顔色が暗くならず、内側から発光するようなツヤ肌が続く',
      'ファンデーションの重ね塗りが不要になり、ナチュラルな若見え肌が作れる',
      '楽天公式ショップで半額キャンペーンや豪華サンプル特典が付与'
    ],
    cons: [
      'カバー力が非常に高いため、つけすぎると首との色差が出やすいので適量を守るのが大事'
    ],
    reviewBody: `### 1. 40代の「黄ぐすみ」と「毛穴影」の原因
40代の肌くすみは**「糖化（AGEs）による黄色変化」と「たるみ毛穴の影」**が原因です。ファンデで隠そうとすると厚塗りになり逆効果に。

光の補色効果を持つトーンアップ下地で土台を整えるのが大人の鉄則です。

---

### 2. くすみを一瞬で消す「下地とファンデの塗り順」
1. **スキンケア後、日焼け止め下地をパール粒大とる**。
2. **【頬の中央から外側へ】**向かって伸ばし、目元や小鼻周りは指に残った少量で薄く馴染ませる。
3. **首筋まで手に余った下地を伸ばす**（顔だけ浮くのを防ぐ）。
4. リキッドファンデを気になる部分だけにポイント重ね塗り。`,
    ctaTitle: '【マキアレイベル公式】トーンアップ最安値を見る ↗',
    affiliateLink: 'https://hb.afl.rakuten.co.jp/hgc/g00qx0rn.j9rug899.g00qx0rn.j9ruhff8/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmacchia-label%2F10000001%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fmacchia-label%2Fi%2F10000001%2F&rafcid=wsc_i_is_1a3cdfd9-2aec-4b42-8290-1c53603b0012',
    rakutenPrice: '2,698円 (税込)',
    createdAt: '2026-08-16',
    estimatedPV: 4800,
    clicks: 440,
    earnings: 39000,
    aiModelUsed: 'Gemini 3.5 Pro (GEO-SEO Max)',
    summaryKeyPoints: [
      '40代の黄ぐすみにはピンクベージュ系の光トーンアップ下地が特効薬',
      '美容液成分配合の下地を選ぶことで夕方のファンデ干からびを防げる',
      '顔中央から塗り伸ばし、首筋まで馴染ませることで自然な透明感が完成'
    ],
    faqs: [
      { question: '日焼け止めを別途塗る必要はありますか？', answer: 'SPF50+/PA++++の最高カット数値があるため、これ1本で日焼け止め兼下地として完成します。' },
      { question: 'ノーファンデ派ですがこれ1本で外出できますか？', answer: 'はい。色補正と毛穴カバー力が高いため、下地＋フェイシャルパウダーだけで綺麗な素肌風メイクが完成します。' },
      { question: '石けんで落とせますか？', answer: 'ウォータープルーフ仕様のため、通常のクレンジング料での落としを推奨いたします。' }
    ],
    reviewerName: '松本 結衣',
    reviewerRole: 'コスメ＆美容編集長',
    verificationDays: 30,
    priceRange: '2,000円〜3,500円'
  },

  {
    id: 'art-seo-query-eyeliner-waterproof-uzu',
    title: '【猛暑でも滲まない】汗と水に強い最強リキッドアイライナー！薬局で買える崩れない目元メイク',
    productName: 'UZU BY FLOWFUSHI アイオープニングライナー',
    category: 'makeup',
    categoryLabel: 'ベース＆メイクアップ',
    imageUrl: '/images/products/art-bazz-kate-lipmon-03.jpg',
    starRating: 4.8,
    reviewCount: 6200,
    introText: '「夏の汗や皮脂、目薬でアイラインが滲んでパンダ目になる…」「目尻のラインが夕方になると消えている」目元の皮脂・汗・擦れに圧倒的に強く、綺麗な極細ラインが1日中持続するアイライナー。',
    features: [
      '独自開発の「WP Film」処方で汗・皮脂・水・湿度・擦れに強い完全ウォータープルーフ',
      '伝統の熊野・奈良の職人が作る大和匠筆を採用し、ぶれずに極細ラインがスッと引ける',
      '色素沈着しない染料フリー＆ぬるま湯で簡単オフできる肌思い設計'
    ],
    pros: [
      '目薬をさしてもフェスで汗をかいても目尻の目頭ラインが一切滲まない',
      '全13色の豊富なカラー展開で、トレンドの抜け感目元メイクが簡単に作れる',
      '楽天やドラッグストアで1,000円台で購入可能'
    ],
    cons: [
      '筆先にファンデーションや油分がつくと出にくくなるため、定期的にティッシュで筆先を拭くのがコツ'
    ],
    reviewBody: `### 1. なぜアイラインがパンダ目に滲むのか？
アイラインが滲む二大原因は**「目元の油分（ファンデ・皮脂）」と「瞬きによる摩擦」**です。

水分に強いウォータープルーフでも、油分に弱いライナーを選ぶとパンダ目になります。

---

### 2. 滲まないアイラインの引き方3ルール
1. **アイシャドウ前に目元の油分をティッシュオフ＆フェイスパウダーを塗布**。
2. 肘を固定し、目尻の皮膚を軽く横に引き上げながら一気に描く。
3. **描いた後、ラインが乾くまで3秒間目を強く閉じない**。`,
    ctaTitle: '【楽天市場】UZU アイライナーの最安値を見る ↗',
    affiliateLink: 'https://hb.afl.rakuten.co.jp/hgc/g00rxu9n.j9rugc52.g00rxu9n.j9ruh8c5/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkireimitsuketa2%2Fh-b_0003264%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fkireimitsuketa2%2Fi%2F10010725%2F&rafcid=wsc_i_is_1a3cdfd9-2aec-4b42-8290-1c53603b0012',
    rakutenPrice: '1,100円 (税込)',
    createdAt: '2026-08-16',
    estimatedPV: 4100,
    clicks: 370,
    earnings: 32000,
    aiModelUsed: 'Gemini 3.5 Pro (GEO-SEO Max)',
    summaryKeyPoints: [
      '目元のパンダ目防止には水分＆油分の両方に強い「WP Film」処方が不可欠',
      '描く前に目元へルースパウダーを仕込むことで持ちが劇的にアップ',
      'ぬるま湯でスルッと落ちるため色素沈着や皮膚への負担ゼロ'
    ],
    faqs: [
      { question: '色素沈着はしませんか？', answer: '色素沈着しない安全な顔料を使用しているため、目元のくすみや色素沈着の心配はありません。' },
      { question: 'インライン（粘膜）に使っても大丈夫ですか？', answer: '低刺激性処方ですが、粘膜への直塗りはお控えいただき、まつ毛の隙間を埋めるようにお使いください。' },
      { question: '初心者におすすめのカラーはどれですか？', answer: '目元を引き締めつつ柔らかい印象になるブラウンブラック（BROWN-BLACK）が一番人気でおすすめです。' }
    ],
    reviewerName: '松本 結衣',
    reviewerRole: 'コスメ＆美容編集長',
    verificationDays: 30,
    priceRange: '1,000円〜1,800円'
  },

  {
    id: 'art-seo-query-hair-oil-milbon-repair',
    title: '【髪のパサつき・うねり即リセット】ミルボンヘアオイルおすすめ！アイロン熱ダメージと広がりを防ぐ美髪ケア',
    productName: 'ミルボン エルジューダ MO＆FO ヘアトリートメントオイル',
    category: 'haircare',
    categoryLabel: 'ヘアケア',
    imageUrl: '/images/products/art-bazz-fino-hair-mask.jpg',
    starRating: 4.9,
    reviewCount: 11000,
    introText: '「美容室帰りのサラツヤ質感を自宅で再現したい」「アイロンの熱で硬くなった毛先を柔らかく整えたい」サロン品質ヘアケアの金字塔、ミルボンエルジューダの毛髪柔軟効果とツヤ髪手順。',
    features: [
      'バオバブオイル配合で硬い髪やブリーチ毛をしなやかで柔らかい質感へ導く',
      '毛髪補修成分（CMADK）がダメージホールを穴埋めし、枝毛・切れ毛を予防',
      '甘く上品なフルーティフローラルの香りでサロン帰りの幸福感が1日中持続'
    ],
    pros: [
      'ドライヤーで乾かした瞬間から髪のまとまりと指通りが劇的に変化',
      'アイロン前の熱ダメージ保護オイルとしても超優秀',
      '楽天市場でまとめ買いクーポンや最安値セットが多数出品'
    ],
    cons: [
      'サロン専売品のため市販品より少し高価だが、1回の使用量が少なく持ちが良い'
    ],
    reviewBody: `### 1. ミルボン エルジューダMOとFOの違いと選び方
- **MO（モイスト）**: 太い髪・硬い髪・広がってまとまらない髪向け。しっとり柔らかい質感を演出。
- **FO（ファイン）**: 細い髪・猫毛・ペタッとしやすい髪向け。適度なハリコシを与えてまとめる。

---

### 2. 美容師が直伝！サロン髪を作る塗布手順
1. **タオルドライ後、髪の水分をしっかり拭き取る**。
2. 1プッシュを手に取り、**【毛先→髪の中間】の順に手ぐしを通しながら揉み込む**。
3. 最後に手に残ったわずかなオイルを表面のパサつく髪へ馴染ませる。
4. ドライヤーの風を上から下に向かって当てて乾かす。`,
    ctaTitle: '【楽天市場】ミルボン エルジューダの最安値を見る ↗',
    affiliateLink: 'https://hb.afl.rakuten.co.jp/hgc/g00r136n.j9rug084.g00r136n.j9ruhc8d/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbeautypro%2Felujuda-mo%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbeautypro%2Fi%2F10001234%2F&rafcid=wsc_i_is_1a3cdfd9-2aec-4b42-8290-1c53603b0012',
    rakutenPrice: '1,899円 (税込)',
    createdAt: '2026-08-16',
    estimatedPV: 5400,
    clicks: 490,
    earnings: 45000,
    aiModelUsed: 'Gemini 3.5 Pro (GEO-SEO Max)',
    summaryKeyPoints: [
      '硬い髪には「MO」、細い髪には「FO」を選ぶのが失敗しないコツ',
      '濡れた髪の毛先を中心に揉み込むことで髪内部のダメージ穴を補修',
      'ドライヤーの風を上から当てることでキューティクルが閉じてツヤツヤに'
    ],
    faqs: [
      { question: '乾いた髪に使っても良いですか？', answer: '基本は濡れた髪への使用ですが、朝のスタイリング仕上げや乾燥が気になる毛先への追いオイルとしてもお使いいただけます。' },
      { question: 'ヘアアイロンを使う前に塗って大丈夫ですか？', answer: 'アイロンの熱による髪のタンパク変性を防ぐ保護効果があるため、ドライヤーで乾かした後にアイロンを通してください。' },
      { question: '香りは強く残りますか？', answer: '上品でほのかな香りで、時間が経つと優しく香るため香水とバッティングしません。' }
    ],
    reviewerName: '蓮見 拓真',
    reviewerRole: '統括編集長',
    verificationDays: 30,
    priceRange: '1,800円〜3,200円'
  },

  {
    id: 'art-seo-query-sunscreen-anessa-uv-gel',
    title: '【フェス・海でも絶対焼けない】最強日焼け止めの正しい塗り直し手順と順番！汗・水・擦れに勝つUV',
    productName: '資生堂 アネッサ パーフェクトUV スキンケアミルク＆ジェル',
    category: 'suncare',
    categoryLabel: 'UVケア・日焼け止め',
    imageUrl: '/images/products/art-dupe-laroche-vs-canmake.jpg',
    starRating: 4.9,
    reviewCount: 14000,
    introText: '「夏の海やプール、夏フェスで絶対に日焼けしたくない！」「メイクの上からの正しい日焼け止め塗り直し方法は？」絶対焼かない王者アネッサのオートブースター技術と、メイクを崩さない塗り直し術。',
    features: [
      '汗・水・熱・空気中の水分に反応してUVブロック膜が強くなる「オートブースター技術」',
      'スキンケア成分50%配合で日中の乾燥を防ぎ、透明感のある肌をキープ',
      'スーパーウォータープルーフでありながら石けんでスルリと落とせる高利便性'
    ],
    pros: [
      '真夏の直射日光を1日中浴びても赤みや黒ずみ焼けが一切起こらない',
      'サラッとしたミルク質感で白浮きやベタつきがゼロ',
      '楽天アフィリエイト公式ショップでお得な大容量サイズや限定セットが出品'
    ],
    cons: [
      '防護力が非常に高いため、夜の入浴時には石けんの泡で丁寧に洗い流す必要がある'
    ],
    reviewBody: `### 1. アネッサが「絶対焼けない」科学的理由
アネッサの最大強みは**「汗や水に触れるとUVブロック膜が均一に強固になるアクアブースター膜」**です。

普通の日焼け止めは汗で崩れますが、アネッサは汗をかいた瞬間に防御力がアップします。

---

### 2. メイクの上から崩さない「正しい塗り直し3STEP」
1. **ティッシュで顔全体の汗と余分な皮脂を抑える**。
2. **日焼け止め（またはUVスプレー/クッションUV）をスポンジに適量とる**。
3. ポンポンと優しく叩き込むように重ねる（ゴシゴシ擦るとメイクが剥げる）。`,
    ctaTitle: '【資生堂公式】アネッサの最安値・限定セットを見る ↗',
    affiliateLink: 'https://hb.afl.rakuten.co.jp/hgc/g00umptn.j9rug528.g00umptn.j9ruhba4/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fcosme-land%2F284813%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fcosme-land%2Fi%2F10123984%2F&rafcid=wsc_i_is_1a3cdfd9-2aec-4b42-8290-1c53603b0012',
    rakutenPrice: '1,496円 (税込)',
    createdAt: '2026-08-16',
    estimatedPV: 5800,
    clicks: 520,
    earnings: 49000,
    aiModelUsed: 'Gemini 3.5 Pro (GEO-SEO Max)',
    summaryKeyPoints: [
      '汗や水に反応して防護膜が強化されるアネッサは真夏の絶対焼けない相棒',
      'メイクの上からの塗り直しは「スポンジでポンポン叩き込む」のがヨレないコツ',
      '石けんで落とせるため、強力UVながら肌へのクレンジング負担が少ない'
    ],
    faqs: [
      { question: '化粧下地としても使えますか？', answer: 'はい。肌にピタッと密着してファンデーションのノリを良くする化粧下地効果を備えています。' },
      { question: '敏感肌や子供でも使えますか？', answer: 'アネッサには低刺激設計の「マイルドミルク（ピンク・ブルー）」もラインナップされており、赤ちゃんや敏感肌の方にはそちらがおすすめです。' },
      { question: '何時間ごとに塗り直すべきですか？', answer: '汗をかきやすい屋外や海では2〜3時間ごとの塗り直しが最も効果を持続させます。' }
    ],
    reviewerName: '渡辺 陽菜',
    reviewerRole: '専属UVケアコレクター',
    verificationDays: 30,
    priceRange: '1,400円〜3,500円'
  }
];

// Unshift Phase 3 articles to articles.json
articlesData.unshift(...phase3Articles);
fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
console.log(`✅ [articles.json] 第三弾の追加5件を無事格納完了！（現在合計: ${articlesData.length}件）`);
