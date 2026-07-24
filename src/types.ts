export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface RakutenProductArticle {
  id: string;
  title: string;
  originalUrl?: string;
  itemCode: string; // 楽天商品コード
  productName?: string; // コスメ商品名
  category: string; // "skincare", "suncare", "makeup", "lip", "device", "k-beauty"
  categoryLabel?: string;
  imageUrl: string; // 商品画像URL
  starRating: number; // 評価 (e.g. 4.8)
  reviewCount?: number; // レビュー件数
  introText: string; // キャッチコピー
  features: string[]; // 商品の特長
  pros: string[];
  cons: string[];
  reviewBody: string; // レビュー・解説詳細
  ctaTitle: string; // CTAボタン用テキスト
  affiliateLink: string; // 楽天アフィリエイトURL
  rakutenPrice: string; // 楽天最安値・価格
  createdAt: string;
  estimatedPV: number;
  clicks: number;
  earnings: number;
  aiModelUsed: string;
  summaryKeyPoints?: string[];
  faqs?: ArticleFAQ[];
  reviewerName?: string;
  reviewerRole?: string;
  verificationDays?: number;
  priceRange?: string;
  isHallOfFame?: boolean;
}

export interface AuthorProfile {
  id: string;
  name: string; // 日本人名 (例: "蓮見 拓真", "橘 えりか")
  role: string; // 役職 (例: "統括編集長", "コスメ＆美容編集長", "デパコスコレクター")
  authorType: 'male_editor_in_chief' | 'female_editor_in_chief' | 'collector';
  avatarUrl: string; // アバター画像URL
  avatarAlt: string;
  bio: string;
  specialty: string; // 専門ジャンル
  favoriteCategory?: string; // 得意コスメジャンル
  collectionCount?: string; // コレクション数・検証実績
  experienceYears: number;
  genderTarget: 'women' | 'men' | 'unisex';
  isDepartmentHead?: boolean;
  assignedDepartment: string; // 担当部門 (例: "UVケア・日焼け止め部門", "リップ＆ケア部門")
  subDepartments?: string[]; // 関連担当エリア
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  targetGender: 'women' | 'men' | 'unisex';
  coverImage: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  createdAt: string;
  readTimeMinutes: number;
  introText: string;
  recommendedItemCodes: string[];
  contentMarkdown: string;
}

export interface ComparisonPoint {
  scene: string;
  winnerItemCode: string;
  reason: string;
}

export interface ProductComparison {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  productItemCodeA: string;
  productItemCodeB: string;
  targetUserCategory: string;
  comparisonPoints: ComparisonPoint[];
  verdictSummary: string;
  contentMarkdown: string;
  createdAt: string;
}

export interface CategorySpec {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface QualiaNaviState {
  affiliateId: string;
  activeCategorySlug: string;
  articles: RakutenProductArticle[];
}
