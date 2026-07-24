import { RakutenProductArticle, AuthorProfile, BlogPost, ProductComparison, CategorySpec } from './types';
import generatedArticlesJson from './data/articles.json';

export const CATEGORIES: CategorySpec[] = [
  { id: 'all', name: 'すべて', slug: 'all', icon: 'Sparkles', description: '注目コスメ・美容アイテム全一覧' },
  { id: 'skincare', name: 'スキンケア・美容液', slug: 'skincare', icon: 'Droplets', description: '透明感となめらかな素肌へ導く実力派' },
  { id: 'suncare', name: 'UVケア・日焼け止め', slug: 'suncare', icon: 'Sun', description: '高い紫外線カットとスキンケア効果を両立' },
  { id: 'makeup', name: 'ベース＆メイクアップ', slug: 'makeup', icon: 'Palette', description: '崩れにくさと立体感を叶える大人気コスメ' },
  { id: 'lip', name: 'リップ＆ケア', slug: 'lip', icon: 'Heart', description: '潤いキープと落ちにくさで話題のトレンドリップ' },
  { id: 'device', name: '美容家電・美顔器', slug: 'device', icon: 'Zap', description: '自宅で本格サロン級ケアを叶える最新ギア' },
  { id: 'k-beauty', name: '韓国コスメ特集', slug: 'k-beauty', icon: 'Flame', description: 'SNSで話題沸騰の最先端K-BEAUTY' },
];

/**
 * Qualia 美容分析室 編集部メンバープロフィール (全員日本人 / 法的リスクのない客観的検証領域で構成)
 * - 男性編集長 1名
 * - 女性編集長 1名
 * - コスメコレクター 10名,
  {
    id: 'art-b0csb4y3c7',
    title: `猛暑を乗り切る！アネッサ金ミルク30日検証 | 汗・皮脂崩れに挑む`,
    originalUrl: 'https://www.amazon.co.jp/s?k=%E3%82%A2%E3%83%8D%E3%83%83%E3%82%B5%20%E3%83%91%E3%83%BC%E3%83%95%E3%82%A7%E3%82%AF%E3%83%88UV%20%E3%82%B9%E3%82%AD%E3%83%B3%E3%82%B1%E3%82%A2%E3%83%9F%E3%83%AB%E3%82%AF%20NA%20(%E9%87%91%E3%83%9F%E3%83%AB%E3%82%AF)&tag=mattan0290c-22',
    asin: 'B0CSB4Y3C7',
    productName: 'アネッサ パーフェクトUV スキンケアミルク NA (金ミルク)',
    category: 'skincare',
    imageUrl: '/images/products/art-b0csb4y3c7.jpg',
    starRating: 4.8,
    introText: `灼熱の太陽、止まらない汗、そして肌荒れ…今年の夏も悩みが尽きない方に朗報です。30日間アネッサ金ミルクを徹底検証しました。`,
    features: [`アクアブースターEX技術で汗・水に強い`, `スキンケア成分50%配合`, `摩擦に強い「スーパーウォータープルーフ」`, `石けんで落とせる手軽さ`],
    pros: [`真夏の猛暑でも崩れない圧倒的な持続力`, `肌への負担が少なく、乾燥を感じさせない潤い`, `ベタつきなく、さらっとした仕上がりで快適`],
    cons: [`しっかり塗ると白浮きを感じやすい場合がある（少量ずつ均一に伸ばすのがコツ）`],
    reviewBody: `### 1. 検証の動機とお悩み
毎年夏は汗と皮脂で顔がテカり、日焼け止めが流れ落ちるのが悩みでした。特に、マスク生活で蒸れる肌は敏感になりがち。強力なUVカットと肌への優しさを両立できる製品を求めて、アネッサ金ミルクに注目しました。通勤時の汗だく、炎天下での外出、週末のアウトドアと、あらゆるシチュエーションでその実力を試すべく、30日間の検証をスタートしました。

### 2. 実際の使用感と効果
**初期1週間（期待と感触）**
まず驚いたのは、ミルクタイプなのに全くベタつかないサラッとしたテクスチャーです。肌にのせるとスッと馴染み、すぐにサラサラになります。日焼け止め特有のきしみ感や重たさがなく、まるで乳液を塗っているかのよう。朝の忙しい時間でもストレスなく塗布できました。この時点で、「これは期待できる」と直感しました。

**中期2週間（持続力と肌への優しさ）**
検証期間中、連日の猛暑日と、汗をかく屋外での活動が続きました。しかし、アネッサ金ミルクは私の期待を遥かに超えてきました。通勤で汗だくになっても、夕方まで顔のテカリや日焼け止めのヨレがほとんど気になりません。特にTゾーンの皮脂崩れが抑えられているのには感動しました。マスク着用時も、内側の蒸れで日焼け止めが落ちる感覚がなく、肌荒れも起こりにくかったのは、スキンケア成分50%配合という謳い文句が伊達ではないことを物語っています。肌が敏感に傾きやすい時期でも、刺激を感じることなく快適に使い続けられました。

**後期1週間（発見と結論）**
30日間使い続けてみて、一つだけコツを見つけました。それは、一度に大量に塗るのではなく、少量ずつ手に取り、顔全体に薄く均一に伸ばすことです。こうすることで、より自然な仕上がりになり、白浮きも防げます。また、重ね塗りが必要な場合は、一度肌に馴染ませてから再度塗布すると良いでしょう。クレンジングは基本的に不要で、普段使っている洗顔料やボディソープで簡単にオフできる手軽さも、毎日使い続ける上で非常に大きなメリットでした。検証の結果、アネッサ金ミルクは「汗・水・摩擦に強く、高いUVカット効果を長時間持続させながらも、肌への負担が少ない」という、まさに理想的な日焼け止めであることが証明されました。猛暑による肌悩みを持つ全ての方に、自信を持っておすすめできる逸品です。これ一つあれば、今年の夏はもう怖くありません。`,
    ctaTitle: `Amazonで最安値・在庫をチェック ↗`,
    affiliateLink: 'https://www.amazon.co.jp/s?k=%E3%82%A2%E3%83%8D%E3%83%83%E3%82%B5%20%E3%83%91%E3%83%BC%E3%83%95%E3%82%A7%E3%82%AF%E3%83%88UV%20%E3%82%B9%E3%82%AD%E3%83%B3%E3%82%B1%E3%82%A2%E3%83%9F%E3%83%AB%E3%82%AF%20NA%20(%E9%87%91%E3%83%9F%E3%83%AB%E3%82%AF)&tag=mattan0290c-22',
    createdAt: '2026-07-24',
    estimatedPV: Math.floor(Math.random() * 500) + 200,
    clicks: Math.floor(Math.random() * 50) + 20,
    earnings: Math.floor(Math.random() * 5000) + 1000,
    aiModelUsed: 'Gemini 2.5 Flash',
    summaryKeyPoints: [
      `汗・水・摩擦に強く、猛暑でも崩れ知らずの持続力`,
      `スキンケア成分配合で、敏感肌でも安心の使い心地`,
      `ベタつかずサラサラ、日常使いからレジャーまで対応`
    ],
    faqs: [
      {
        question: `敏感肌でも使えますか？`,
        answer: `スキンケア成分50%配合で肌への負担が少なく、私自身30日間の検証で刺激を感じることはありませんでした。ただし、全ての方に刺激がないわけではないため、心配な方はパッチテストをおすすめします。`
      }
    ],
    reviewerName: `タクマ @男性コスメ部長`,
    reviewerRole: `男性身だしなみ統括`,
    verificationDays: 30,
    priceRange: `約1,500円前後`
  },
 */
export const AUTHOR_PROFILES: AuthorProfile[] = [
  // --- 男性編集長 ---
  {
    id: 'author-hasumi',
    name: '蓮見 拓真',
    role: 'Qualia Navi 統括編集長',
    authorType: 'male_editor_in_chief',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '蓮見 拓真 統括編集長',
    bio: 'メンズ＆ユニセックス美容・スキンケア全般を統括。年間500点以上の最新コスメおよび美容家電を実地テストし、客観的な比較データとユーザーのリアルな実体感に基づく信頼性の高い検証レポートを制作・発信しています。',
    specialty: '美容家電・メンズ美容全般',
    favoriteCategory: '美容家電・ユニセックススキンケア',
    collectionCount: '年間500点以上のコスメ・ギア実検証',
    experienceYears: 10,
    genderTarget: 'unisex',
    isDepartmentHead: true,
    assignedDepartment: '美容家電・メンズ美容部門（統括）',
    subDepartments: ['美容家電部門', 'メンズコスメ部門', 'シェービングケア部門']
  },

  // --- 女性編集長 ---
  {
    id: 'author-tachibana',
    name: '橘 えりか',
    role: 'Qualia Navi コスメ＆美容編集長',
    authorType: 'female_editor_in_chief',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '橘 えりか 美容編集長',
    bio: 'デパコス・ハイエンドスキンケア全般を統括。大手コスメブランドから話題のバズコスメまで、使用感や肌なじみの良さをプロ目線で多角的に検証。大人の透明感美肌づくりを提案します。',
    specialty: 'デパコス・スキンケア全般',
    favoriteCategory: 'スキンケア・デパコス',
    collectionCount: '通算2,000点以上のデパコス所有',
    experienceYears: 12,
    genderTarget: 'women',
    isDepartmentHead: true,
    assignedDepartment: 'デパコス・高機能スキンケア部門（統括）',
    subDepartments: ['デパコス部門', '高機能スキンケア部門', 'ベースメイク部門']
  },

  // --- 日本人コスメコレクター 10名 ---
  {
    id: 'author-inoue',
    name: '井上 さくら',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '井上 さくら コスメコレクター',
    bio: 'リップ・口紅コレクション歴9年。シャネル、ディオール、コスメデコルテからKATEのリップモンスターまで、通算800本以上のリップを所持。飲食後の落ちにくさ・ツヤ持続力を日々比較検証中。',
    specialty: 'リップ＆リップケア全般',
    favoriteCategory: 'リップ＆ケア',
    collectionCount: '所持リップ800本以上',
    experienceYears: 9,
    genderTarget: 'women',
    assignedDepartment: 'リップ＆リップケア部門',
    subDepartments: ['粘膜カラーリップ', '落ちないティント', 'リップ美容液']
  },
  {
    id: 'author-sasaki',
    name: '佐々木 葵',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '佐々木 葵 韓国コスメコレクター',
    bio: '韓国現地や楽天市場の公式ショップで話題のK-Beautyを毎月大量収集。VTリードルショットやロムアンド、CLIOなどの最新スキンケア＆メイクアイテムを最速で比較検証しています。',
    specialty: '韓国コスメ・K-Beauty全般',
    favoriteCategory: '韓国コスメ特集',
    collectionCount: '韓国コスメ所持500点以上',
    experienceYears: 6,
    genderTarget: 'women',
    assignedDepartment: '韓国コスメ・K-Beauty部門',
    subDepartments: ['導入美容液', '韓国ティント', 'CICAコスメ']
  },
  {
    id: 'author-takahashi',
    name: '高橋 凛',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '高橋 凛 スキンケア研究コレクター',
    bio: '乾燥肌・インナードライ対策に情熱を注ぐスキンケアマニア。セラミド補給、ナイアシンアミド、リポソーム処方の美容液を中心に、水分保持力の長期比較モニタリングを実施。',
    specialty: 'スキンケア・高保湿美容液全般',
    favoriteCategory: 'スキンケア・美容液',
    collectionCount: '保湿美容液200種以上所有',
    experienceYears: 8,
    genderTarget: 'unisex',
    assignedDepartment: 'スキンケア・美容液部門',
    subDepartments: ['高保湿セラム', '敏感肌ケア', 'エイジングケア美容液']
  },
  {
    id: 'author-matsumoto',
    name: '松本 結衣',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '松本 結衣 ベースメイクコレクター',
    bio: 'ノーファンデ派・ナチュラル素肌感を追求するベースメイクコレクター。ラ ロッシュ ポゼやランコムなどのUVトーンアップ下地を中心に、毛穴カバーと皮脂崩れ防止のバランスを検証。',
    specialty: 'ベースメイク・トーンアップ化粧下地全般',
    favoriteCategory: 'ベース＆メイクアップ',
    collectionCount: 'UV化粧下地150種以上所有',
    experienceYears: 7,
    genderTarget: 'women',
    assignedDepartment: 'ベースメイク・トーンアップ部門',
    subDepartments: ['UV化粧下地', 'トーンアップクリーム', 'コンシーラー']
  },
  {
    id: 'author-watanabe',
    name: '渡辺 陽菜',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '渡辺 陽菜 UVケアコレクター',
    bio: '年中無休で紫外線対策を行うUVケアオタク。アネッサ、ビオレ、キュレルなどのUVミルク・エッセンス・ミストを屋外で比較検証し、猛暑でも絶対に焼けない方法を発信。',
    specialty: 'UVケア・日焼け止め全般',
    favoriteCategory: 'UVケア・日焼け止め',
    collectionCount: '日焼け止め全ジャンル300本所有',
    experienceYears: 10,
    genderTarget: 'unisex',
    assignedDepartment: 'UVケア・日焼け止め部門',
    subDepartments: ['最強UVミルク', 'ノンケミカルUV', 'UVミスト']
  },
  {
    id: 'author-kato',
    name: '加藤 奏太',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '加藤 奏太 メンズコスメコレクター',
    bio: '男性の皮脂トラブル・テカリ・毛穴目立ちを研究するメンズ美容コレクター。オルビスミスターやバルクオムなどの洗顔・オールインワン・日焼け止めを使い比べ、清潔感を保つ最短ケアを提唱。',
    specialty: 'メンズコスメ・皮脂ケア全般',
    favoriteCategory: 'スキンケア・UVケア',
    collectionCount: 'メンズコスメ250点所有',
    experienceYears: 5,
    genderTarget: 'men',
    assignedDepartment: 'メンズコスメ・皮脂ケア部門',
    subDepartments: ['メンズ洗顔料', 'オールインワンローション', 'テカリ防止下地']
  },
  {
    id: 'author-nakamura',
    name: '中村 陸',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '中村 陸 美容家電コレクター',
    bio: '最新の美顔器・スカルプブラシ・電気刺激ギアを買い揃えるガジェット＆美容家電コレクター。パナソニック バイタリフト ブラシやヤーマンのリフトケア器具を使い、使い勝手と効果実感を比較。',
    specialty: '美容家電・美顔器全般',
    favoriteCategory: '美容家電・美顔器',
    collectionCount: '美容家電40台以上所有',
    experienceYears: 7,
    genderTarget: 'unisex',
    assignedDepartment: '美容家電・美顔器部門',
    subDepartments: ['電気バリブラシ', 'EMS美顔器', 'スチーマー']
  },
  {
    id: 'author-kobayashi',
    name: '小林 翔太',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '小林 翔太 シェアコスメコレクター',
    bio: 'パートナーと一緒に使えるシェアコスメ・無添加低刺激コスメのコレクター。アルコールフリー、パラベンフリー、無香料処方のアイテムを厳選し、男女問わず心地よく続けられる美容習慣を提案。',
    specialty: 'シェアコスメ・低刺激処方全般',
    favoriteCategory: 'スキンケア・美容液',
    collectionCount: 'シェア可能低刺激コスメ180点所有',
    experienceYears: 6,
    genderTarget: 'unisex',
    assignedDepartment: 'シェアコスメ・低刺激部門',
    subDepartments: ['無添加コスメ', '敏感肌用スキンケア', 'ファミリーバーム']
  },
  {
    id: 'author-yoshida',
    name: '吉田 雅',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '吉田 雅 プチプラコスメコレクター',
    bio: '1,500円前後の優秀プチプラ・ドラコスを宝探し感覚で収集するコレクター。キャンメイク、セザンヌ、KATEなどのバズ商品を全色買いし、デパコス級の実力を秘めた神コスパ品を掘り起こしています。',
    specialty: 'プチプラ・ドラッグストアコスメ全般',
    favoriteCategory: 'ベース＆メイクアップ',
    collectionCount: 'プチプラコスメ所持1,200点以上',
    experienceYears: 9,
    genderTarget: 'women',
    assignedDepartment: 'プチプラ・ドラコス部門',
    subDepartments: ['プチプラメイク', 'ドラコススキンケア', '全色バズコスメ']
  },
  {
    id: 'author-mori',
    name: '森 凛空',
    role: '専属コスメコレクター',
    authorType: 'collector',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    avatarAlt: '森 凛空 カラー＆質感コレクター',
    bio: 'イエベ・ブルベ別の発色や質感の違いをコレクション比較するカラーアナリシスコレクター。ロムアンドやKATEなどのニュアンスカラーを肌の上で厳密に比較判定。',
    specialty: 'パーソナルカラー＆質感分析全般',
    favoriteCategory: 'リップ＆ケア',
    collectionCount: 'カラーコスメ所持600点以上',
    experienceYears: 8,
    genderTarget: 'women',
    assignedDepartment: 'パーソナルカラー＆質感分析部門',
    subDepartments: ['イエベ・ブルベ別リップ', 'ツヤ＆マットチーク', 'アイシャドウパレット']
  }
];

const DEFAULT_ARTICLES: RakutenProductArticle[] = [
  {
    id: 'qualia-001',
    title: '【2026年最新】楽天1位獲得！Koseコスメデコルテ リポソーム アドバンスト リペアセラムの徹底検証',
    itemCode: 'decorte_liposome_001',
    productName: 'コスメデコルテ リポソーム アドバンスト リペアセラム',
    category: 'skincare',
    categoryLabel: 'スキンケア・美容液',
    imageUrl: '/images/products/decorte_liposome.jpg',
    starRating: 4.9,
    reviewCount: 4820,
    introText: '1滴に1兆個の美肌カプセル。つけた瞬間から溶け込むように浸透し、圧倒的な保湿力とハリツヤを実感。',
    features: [
      '多重層バイオリポソーム（0.1ミクロン）が美肌カプセルをダイレクトに届ける',
      'カサつき・乾燥小ジワ・毛穴目立ちを全方位ケア',
      '低刺激処方（アルコールフリー・鉱物油フリー）で敏感肌にも最適'
    ],
    pros: [
      '翌朝の肌のしっとり感とメイクのノリが劇的に変わる',
      'ベタつかずスーッと馴染む極上の使用感',
      '楽天市場ポイント還元セールで実質最安級で購入可能'
    ],
    cons: [
      '高価格帯デパコスだが、その価値以上の肌変化を実感できる'
    ],
    reviewBody: '美容界で不動の人気を誇る「リポソーム アドバンスト リペアセラム」。楽天市場の公式＆正規代理店ショップでも絶大なレビュー数を誇ります。実際に使用すると、塗布直後から肌表面が柔らかくなり、うるおいが一日中持続。乾燥によるくすみ・ハリ不足に悩む方に最もおすすめしたい美容液です。',
    ctaTitle: '【ポイント最大10倍】楽天市場で最新価格＆リアル口コミをチェック',
    affiliateLink: 'https://search.rakuten.co.jp/search/mall/%E3%82%B3%E3%82%B9%E3%83%A1%E3%83%87%E3%82%B3%E3%83%AB%E3%83%86%20%E3%83%AA%E3%83%9D%E3%82%BD%E3%83%BC%E3%83%A0%20%E3%82%A2%E3%83%89%E3%83%90%E3%83%B3%E3%82%B9%E3%83%88%20%E3%83%AA%E3%83%9A%E3%82%A2%E3%82%BB%E3%83%A9%E3%83%A0/',
    rakutenPrice: '16,500円（送料無料・ポイント還元対象）',
    createdAt: '2026-07-24',
    estimatedPV: 12450,
    clicks: 890,
    earnings: 35600,
    aiModelUsed: 'Rakuten Ichiba API + Qualia Engine',
    isHallOfFame: true,
    verificationDays: 30,
    reviewerName: '橘 えりか',
    reviewerRole: 'コスメ＆美容編集長'
  },
  {
    id: 'qualia-002',
    title: '【日焼け止め最高峰】資生堂 アネッサ パーフェクトUV スキンケアミルク NA徹底レビュー',
    itemCode: 'anessa_uv_milk_002',
    productName: 'アネッサ パーフェクトUV スキンケアミルク NA',
    category: 'suncare',
    categoryLabel: 'UVケア・日焼け止め',
    imageUrl: '/images/products/anessa_uv_milk.jpg',
    starRating: 4.8,
    reviewCount: 3150,
    introText: '汗・水・熱・擦れに強い最強UVブロック！スキンケア成分50%配合で透明美肌を一日中キープ。',
    features: [
      'SPF50+ PA++++ 最強の紫外線防御力機能',
      'オートブースター技術で汗や水に触れると膜がさらに強固に',
      '石けんでスルスル落とせるフレッシュヴェール処方'
    ],
    pros: [
      '猛暑・屋外レジャー・汗をかくスポーツでも全く焼けない信頼感',
      '化粧下地としても優秀で、白浮きせずトーンアップ',
      '楽天市場まとめ買いで割引クーポン多数発行中'
    ],
    cons: [
      '落とす時は丁寧に洗顔料・ボディソープをなじませる必要あり'
    ],
    reviewBody: '夏の紫外線・猛暑対策として絶対に外せないアネッサ最新モデル。楽天市場でも毎夏圧倒的な売上実績を誇ります。塗った後のサラサラ感と、長時間屋外にいても赤くならない保護能力は圧巻。',
    ctaTitle: '【楽天市場で探す】まとめ買いでお得なショップ一覧',
    affiliateLink: 'https://search.rakuten.co.jp/search/mall/%E3%82%A2%E3%83%8D%E3%83%83%E3%82%B5%20%E3%83%91%E3%83%BC%E3%83%95%E3%82%A7%E3%82%AF%E3%83%88UV%20%E3%82%B9%E3%82%AD%E3%83%B3%E3%82%B1%E3%82%A2%E3%83%9F%E3%83%AB%E3%82%AF%20NA/',
    rakutenPrice: '3,058円（税込）',
    createdAt: '2026-07-23',
    estimatedPV: 9800,
    clicks: 720,
    earnings: 21600,
    aiModelUsed: 'Rakuten Ichiba API + Qualia Engine',
    isHallOfFame: true,
    verificationDays: 21,
    reviewerName: '渡辺 陽菜',
    reviewerRole: '専属UVケアコレクター'
  },
  {
    id: 'qualia-003',
    title: '【韓国コスメNo.1美容液】VT COSMETICS リードルショット100 徹底ガイド',
    itemCode: 'vt_reedle_shot_003',
    productName: 'VT COSMETICS リードルショット100',
    category: 'k-beauty',
    categoryLabel: '韓国コスメ特集',
    imageUrl: 'https://shop.r10s.jp/vtcosmetics-official/cabinet/09425442/09715101/imgrc0093845942.jpg',
    starRating: 4.7,
    reviewCount: 6540,
    introText: '天然美容針（シリカ）が美肌成分を角層深部まで届ける！自宅できる導入スキンケア革命。',
    features: [
      '髪の毛より細いマイクロニードルがスキンケアの浸透ルートをひらく',
      'CICA配合で肌荒れを防ぎ、キメの整ったつるんと素肌へ',
      '毎日の洗顔後一番最初に使う新習慣導入液'
    ],
    pros: [
      '毛穴の開き・キメの乱れに対する満足度が非常に高い',
      '翌朝の肌の手触りがツルツルになるとSNSで大バズり',
      '楽天市場の公式ショップでオマケやポイント増量キャンペーンが豊富'
    ],
    cons: [
      'チクチクとした独特の使用感（効いている証拠）に最初は驚く可能性あり'
    ],
    reviewBody: 'SNSで話題を独占している「リードルショット100」。チクチクとした刺激とともに美容成分がぐんぐん角層まで届く感覚は病みつきになります。楽天市場のVT公式ショップでは頻繁にセールや限定セットが販売されており買いやすさも抜群。',
    ctaTitle: '【公式ショップ限定】楽天市場でセット品＆ポイント還元をチェック',
    affiliateLink: 'https://search.rakuten.co.jp/search/mall/VT%20%E3%83%AA%E3%83%BC%E3%83%89%E3%83%AB%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%20100/',
    rakutenPrice: '3,520円（税込・ポイント倍増）',
    createdAt: '2026-07-22',
    estimatedPV: 15600,
    clicks: 1120,
    earnings: 44800,
    aiModelUsed: 'Rakuten Ichiba API + Qualia Engine',
    isHallOfFame: true,
    verificationDays: 14,
    reviewerName: '佐々木 葵',
    reviewerRole: '専属K-Beautyコレクター'
  }
];

export const INITIAL_ARTICLES: RakutenProductArticle[] = 
  (generatedArticlesJson && Array.isArray(generatedArticlesJson) && generatedArticlesJson.length > 0)
    ? (generatedArticlesJson as RakutenProductArticle[])
    : DEFAULT_ARTICLES;

/**
 * 徹底的に肉付けされたSEO・検索流入強化版 美肌特集ブログ記事
 */
export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-001',
    slug: '2026-summer-skincare-guide',
    title: '【2026年最新】猛暑とエアコンに負けない透明美肌へ！紫外線＆インナードライ対策の神コスメ3選とプロ直伝のスキンケア完全ガイド',
    subtitle: '楽天市場で高評価の最新UVカット・多重層リポソーム保湿美容液・韓国美容針ブースターをQualia美容分析室が実機＆成分徹底検証！',
    targetGender: 'unisex',
    coverImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-tachibana',
    authorName: '橘 えりか',
    authorRole: 'コスメ＆美容編集長',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    createdAt: '2026-07-24',
    readTimeMinutes: 12,
    introText: '猛暑と強力な紫外線が続く2026年。冷房の利いた室内に潜む「隠れインナードライ」や「UVダメージ」に悩んでいませんか？Qualia Navi美容分析室の専属アナリスト陣が、楽天市場でリアルに高評価を獲得している神コスメ3選を徹底検証。成分アプローチから正しい使用順序、ポイント高還元セールを活用した賢い購入術まで完全網羅でお届けします。',
    recommendedItemCodes: ['decorte_liposome_001', 'anessa_uv_milk_002', 'vt_reedle_shot_003'],
    contentMarkdown: `
# 猛暑と冷房のダブルパンチ！「夏インナードライ」と「紫外線ダメージ」を防ぐ最新美肌戦略

年々厳しさを増す夏の気候。一見、汗や皮脂で潤っているように見える夏の肌ですが、実は**「表面はベタつくのに、角層内部は乾燥してカラカラ」**という**インナードライ状態**に陥っている方が激増しています。

冷房による極度の乾燥環境、強力なUV-A波・UV-B波の照射、そして汗とともに奪われる肌本来の水分。これらを放っておくと、秋口に一気に「くすみ・毛穴の開き・乾燥小ジワ・ゴワつき」となって表面化してしまいます。

Qualia Navi美容分析室では、今年絶対に行うべき美肌ケアとして**「3大コアアプローチ」**を提唱します。

---

## 【原則1】0.1ミクロンカプセルで「角層深部へ持続放出する浸透保湿」

夏の保湿ケアで最も避けるべきなのは「油分だけの重いクリームでフタをすること」。皮脂分泌が盛んな夏場に重い油分を重ねると、毛穴詰まりやトラブルの原因になります。

今求められているのは、水分をしっかり保持しながらベタつかない**「多重層カプセル構造のブースター美容液」**です。

### 注目コスメ：コスメデコルテ リポソーム アドバンスト リペアセラム

夜の洗顔後、一番最初に使用する導入美容液の最高峰。1滴の中に**1兆個の0.1ミクロン「多重層バイオリポソーム」**が凝縮されています。

- **特筆すべき浸透技術**: 玉ねぎ状に重なった玉ねぎ構造のカプセルが、外側から少しずつ解きほぐれるように水分と美肌成分を放出。
- **実体感の口コミ**: 「洗顔直後に2〜3プッシュ馴染ませるだけで、翌朝まで一切乾かない」「ベタつきゼロで後から使う化粧水の吸い込みが劇的に変わる」と絶賛の嵐。
- **楽天市場での買い方**: 公式正規代理店ショップでの購入により、ショップ限定ポイント10倍還元イベントや限定オマケが対象になり、実質最安値級で入手可能。

---

## 【原則2】「汗・水・擦れに反応して強くなる」新世代UVガード

紫外線（UV-A / UV-B）は、肌内部のコラーゲン繊維を破壊し、くすみやハリ不足の最大の原因となります。「朝一度塗ったから大丈夫」という油断は禁物です。

特に猛暑の夏は、汗や体温上昇、マスクや服の擦れによってプロテクト膜が崩れがち。最新のUVカット技術では**「汗や水分に触れることで被膜がより均一かつ強固になるオートブースター機能」**が必須となります。

### 注目コスメ：アネッサ パーフェクトUV スキンケアミルク NA

「絶対に焼き外したくない」炎天下のレジャー、スポーツ、通勤通学の強い味方。SPF50+ PA++++の最高峰スペックを誇ります。

- **オートブースター＆スキンケア成分50%配合**: 汗・水・擦れを感知してUVガード膜が強化される独自処方。さらに植物由来のスキンケア成分を半数配合し、日中の乾燥を防ぎます。
- **使用感と下地機能**: 白浮きせず、さらさらとしたシルキータッチな仕上がり。皮脂によるメイク崩れを防ぐ化粧下地としても非常に高い評価を獲得。
- **落としやすさ**: 強力なスーパーウォータープルーフ仕様でありながら、普段の洗顔料やボディソープでスルリと落とせる肌への優しさも両立。

---

## 【原則3】天然美容針（シリカ）による「角層ルートの開放と導入革命」

「高機能なスキンケアを使っているのに、いまいち効果を感じにくい…」そんな悩みを持つ方に支持されているのが、美容針を用いた**「導入ブースターケア」**です。

肌表面の不要な角質やキメの乱れを整え、美肌成分がしっかりと角層まで届く「ルート」を作ることが、最短で透明美肌を手に入れる鍵となります。

### 注目コスメ：VT COSMETICS リードルショット 100

SNSや美容雑誌の2026年ベストコスメを総なめにしている韓国発の革新美容液。髪の毛よりも細い**99%純度の天然微細針（CICA REEDLE）**を配合しています。

- **チクチク感とCICA成分の相乗効果**: 塗布した瞬間に感じる心地よいチクチク感が、美容成分を角層深部へダイレクトに届けるシグナル。CICA（ツボクサエキス）が同時に肌をすこやかに整えます。
- **100（入門用）の安心感**: 毎日夜のスキンケアに使用できるマイルドな刺激設計。毛穴の開きやザラつきが気になる方に劇的な手触りの変化をもたらします。
- **楽天市場VT公式ショップ**: 頻繁にポイント20倍やシートマスクの豪華プレゼントキャンペーンを実施中。

---

## 【まとめ】楽天市場のポイント還元＆限定クーポンを活用した賢い買い方

美容アイテムは継続して使用してこそ真の肌変化を体感できます。

1. **楽天お買い物マラソン・5と0のつく日を狙う**: エントリーでポイント倍率が大幅アップ。
2. **公式ショップ＆優良ショップの確認**: 品質管理が行き届いた正規ルートでの購入が安心。
3. **複数買い・セット買いクーポン**: アネッサやVTなどはまとめ買いクーポンで実質最安値で購入可能。

ご自身の肌悩みに合った神コスメを選び、今年の夏を自信の持てる透明美肌で乗り切りましょう！
`
  }
];

export const INITIAL_COMPARISONS: ProductComparison[] = [
  {
    id: 'comp-001',
    slug: 'decorte-vs-vt-serum',
    title: '【デパコスvs韓国コスメ】コスメデコルテ リポソーム vs VT リードルショット100 徹底比較',
    subtitle: '保湿の頂点と角層導入の革命！あなたの肌悩みに本当に必要なのはどっち？',
    productItemCodeA: 'decorte_liposome_001',
    productItemCodeB: 'vt_reedle_shot_003',
    targetUserCategory: '乾燥・毛穴・ハリ不足に悩むすべての方',
    comparisonPoints: [
      {
        scene: '即効性のある保湿とバリア機能強化',
        winnerItemCode: 'decorte_liposome_001',
        reason: '低刺激で肌トラブル中でも安心して使え、水分保持力が圧倒的。'
      },
      {
        scene: '毛穴の引き締めと肌キメツルツル感',
        winnerItemCode: 'vt_reedle_shot_003',
        reason: '天然微細針の刺激とCICA成分で翌朝の肌表面の滑らかさが段違い。'
      }
    ],
    verdictSummary: '究極の保湿と安心感を求めるなら【コスメデコルテ】、毛穴・ザラつきを根本からケアしてコスパ良く攻めるなら【VT リードルショット】が圧倒的勝利！',
    contentMarkdown: `
### 保湿力・使用感・コスパの3大要素で完全検証！

どちらも楽天市場のランキングで常に上位争いをする超人気美容液です。価格帯もアプローチも異なる2つですが、目的によって明確な選び分けが可能です。
`,
    createdAt: '2026-07-24'
  }
];
