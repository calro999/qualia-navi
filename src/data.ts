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

export const AUTHOR_PROFILES: AuthorProfile[] = [
  {
    id: 'author-lumiere',
    name: 'Qualia 美容分析室',
    role: 'コスメアナリスト＆美容研究チーム',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    avatarAlt: 'Qualia 美容分析室 アナリスト',
    bio: '楽天市場で高評価の最新コスメ・美容アイテムを徹底検証。成分、使用感、コスパ、ユーザーのリアルな口コミを分析し信頼できる情報をお届けします。',
    specialty: 'スキンケア解析・トレンドコスメ比較',
    experienceYears: 8,
    genderTarget: 'unisex',
    isDepartmentHead: true,
    qualifications: ['日本化粧品検定1級', 'コスメコンシェルジュ']
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
    imageUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/koreaco/cabinet/08151590/08151591/imgrc0087453303.jpg?_ex=600x600',
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
    reviewerName: 'Qualia 美容分析室',
    reviewerRole: 'コスメアナリスト'
  },
  {
    id: 'qualia-002',
    title: '【日焼け止め最高峰】資生堂 アネッサ パーフェクトUV スキンケアミルク NA徹底レビュー',
    itemCode: 'anessa_uv_milk_002',
    productName: 'アネッサ パーフェクトUV スキンケアミルク NA',
    category: 'suncare',
    categoryLabel: 'UVケア・日焼け止め',
    imageUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/rakuten24/cabinet/351/4909978163351.jpg?_ex=600x600',
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
    reviewerName: 'Qualia 美容分析室',
    reviewerRole: 'UVケア専門研究員'
  },
  {
    id: 'qualia-003',
    title: '【韓国コスメNo.1美容液】VT COSMETICS リードルショット100 徹底ガイド',
    itemCode: 'vt_reedle_shot_003',
    productName: 'VT COSMETICS リードルショット100',
    category: 'k-beauty',
    categoryLabel: '韓国コスメ特集',
    imageUrl: 'https://thumbnail.image.rakuten.co.jp/@0_mall/vtcosmetics-official/cabinet/09425442/09715101/imgrc0093845942.jpg?_ex=600x600',
    starRating: 4.7,
    reviewCount: 6540,
    introText: '天然美容針（シリカ）が美肌成分を角層深部まで届ける！自宅でできる導入スキンケア革命。',
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
    reviewerName: 'Qualia 美容分析室',
    reviewerRole: 'K-Beautyスペシャリスト'
  }
];

export const INITIAL_ARTICLES: RakutenProductArticle[] = 
  (generatedArticlesJson && Array.isArray(generatedArticlesJson) && generatedArticlesJson.length > 0)
    ? (generatedArticlesJson as RakutenProductArticle[])
    : DEFAULT_ARTICLES;

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-001',
    slug: '2026-summer-skincare-guide',
    title: '【2026年最新】紫外線＆猛暑に負けない！透明感美肌を育てる夏の最強コスメ3選',
    subtitle: '楽天市場で高評価の最新UVカット・保湿美容液・韓国コスメを実機＆使用感検証！',
    targetGender: 'unisex',
    coverImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80',
    authorId: 'author-lumiere',
    authorName: 'Qualia 美容分析室',
    authorRole: 'コスメアナリスト',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    createdAt: '2026-07-24',
    readTimeMinutes: 6,
    introText: '猛暑が続く今年の夏。紫外線のダメージや冷房によるインナードライに悩んでいませんか？Qualia Navi美容分析室が、楽天市場のリアルな口コミ・売上・成分分析から本当に選ぶべき神コスメ3選を厳選しました。',
    recommendedItemCodes: ['decorte_liposome_001', 'anessa_uv_milk_002', 'vt_reedle_shot_003'],
    contentMarkdown: `
## 夏の肌トラブル「インナードライ」と「UVダメージ」を防ぐ基本戦略

夏の肌は汗や皮脂で潤っているように見えて、実は冷房や強力な紫外線によって**角層内部の水分が奪われている**ケースが非常に多いです。

Qualia Navi美容分析室では、今年注目すべきケアポイントとして以下の3点を提唱しています。

1. **多重層リポソームによる高浸透保湿**
2. **汗・水・摩擦に負けない最強クラスのUVガード**
3. **角層まで美容成分を届ける導入針ケア**

---

### おすすめアイテム1: コスメデコルテ リポソーム アドバンスト リペアセラム

夜の洗顔後、最初に塗布するだけで翌朝のモチモチ感が段違い。1滴に1兆個の美肌カプセルがジワジワと角層に浸透し続けます。

---

### おすすめアイテム2: アネッサ パーフェクトUV スキンケアミルク NA

「絶対に焼き外したくない」レジャーや毎日の通勤通学の強い味方。ベタつかずスーッと伸びる乳液タイプで、メイク崩れも防ぎます。
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
