import React, { useState, useMemo } from 'react';
import { INITIAL_BLOG_POSTS, CATEGORIES } from '../data';
import { RakutenProductArticle } from '../types';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, BookOpen, Search, Clock, ArrowRight, Tag, Calendar, Flame } from 'lucide-react';
import { SeasonMonthKey } from '../components/SeasonalSpotlightHub';

interface FeatureListPageProps {
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

const SEASON_TABS: { key: SeasonMonthKey | 'all'; label: string }[] = [
  { key: 'all', label: '全シーズン特集' },
  { key: 'oct', label: '🍁 10月・秋コスメ＆寒暖差ケア' },
  { key: 'nov', label: '🎄 11月・クリスマスコフレ＆ホリデー' },
  { key: 'dec', label: '🎁 12月・冬ボーナス家電＆ギフト' },
  { key: 'jan', label: '🎍 1月・厳冬レスキュー超高保湿' }
];

const QUICK_FEATURE_TAGS = [
  'クリスマスコフレ',
  'アドベントカレンダー',
  'ホリデーギフト',
  '秋リップ',
  '導入美容液',
  'アイクリーム',
  '美顔器',
  'ヘッドスパ',
  'ハンドクリーム',
  '入浴剤'
];

function classifyFeatureCategory(title: string, rawCategory = ''): { slug: string; label: string; season: SeasonMonthKey } {
  const t = `${title} ${rawCategory}`;

  let slug = 'skincare';
  let label = 'スキンケア特集';

  if (/美顔器|ドライヤー|ヘアアイロン|スチーマー|ヘッドスパ|ホットアイマスク|シェーバー|超音波|EMS|RF|LED|電動|充電式/.test(t)) {
    slug = 'device';
    label = '美容家電・ギア特集';
  } else if (/リップ|口紅|ティント|プランパー|グロス/.test(t)) {
    slug = 'lip';
    label = 'リップ・粘膜ティント特集';
  } else if (/日焼け止め|UV|サンケア/.test(t)) {
    slug = 'suncare';
    label = 'UV・サンケア特集';
  } else if (/シャンプー|トリートメント|ヘアオイル|ヘアミルク|スカルプ|頭皮|育毛|ヘアミスト|ヘアブラシ|パドルブラシ|前髪|髪/.test(t)) {
    slug = 'haircare';
    label = 'ヘアケア・美髪特集';
  } else if (/ボディ|ハンドクリーム|ネイル|入浴剤|バスソルト|フット|かかと|デリケートゾーン|香水|フレグランス|パルファン|練り香水|ピローミスト/.test(t)) {
    slug = 'bodycare';
    label = 'ボディ・芳香・温活特集';
  } else if (/韓国|K-Beauty|PDRN|グルタチオン|リードル|アゼライン/.test(t)) {
    slug = 'k-beauty';
    label = '韓国コスメ・トレンド成分';
  } else if (/メイク|コフレ|アドベント|ファンデ|下地|コンシーラー|パウダー|アイシャドウ|アイライナー|マスカラ|チーク|ハイライト|涙袋/.test(t)) {
    slug = 'makeup';
    label = t.includes('コフレ') || t.includes('ホリデー') ? 'ホリデーコフレ・限定メイク' : 'ベース＆ポイントメイク特集';
  }

  let season: SeasonMonthKey = 'jan';
  if (/秋|autumn|木枯らし|寒暖差|ゆらぎ|金木犀|導入美容液|ブースター/.test(t)) {
    season = 'oct';
  } else if (/コフレ|アドベント|ホリデー限定|イルミネーション|グリッター|ラメ|アイシャドウ|フレグランス|香水|ネイル/.test(t)) {
    season = 'nov';
  } else if (slug === 'device' || /ボーナス|ご褒美|ギフト|プレゼント|メンズ|ヘッドスパ|美顔器|ドライヤー|炭酸パック/.test(t)) {
    season = 'dec';
  } else {
    season = 'jan';
  }

  return { slug, label, season };
}

export function FeatureListPage({ articles, onNavigate }: FeatureListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<SeasonMonthKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(15);

  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '【2026秋冬＆ホリデー最新】コスメ・美容 特集記事一覧（10選・クリスマスコフレ・乾燥対策） | Qualia Navi',
      description: '10月・11月・12月・1月の秋冬乾燥対策10選、2026クリスマスコフレ、冬のご褒美美容家電、成分別・お悩み別の徹底比較検証レポート一覧。',
      urlPath: '/features'
    });
  }, []);

  // 1. 特集記事（10選記事およびブログ記事）を統合して抽出
  const allFeatureArticles = useMemo(() => {
    const blogList = INITIAL_BLOG_POSTS.map(post => {
      const { slug, label, season } = classifyFeatureCategory(post.title);
      const isPillar =
        post.id.includes('hub') ||
        post.title.includes('総まとめ') ||
        post.title.includes('クリスマスコフレ') ||
        post.title.includes('アドベントカレンダー') ||
        post.title.includes('ホリデーギフト');

      return {
        id: post.id,
        slug: post.id,
        title: post.title,
        intro: post.introText || post.subtitle,
        imageUrl: Array.isArray(post.coverImage) ? post.coverImage[0] : post.coverImage,
        authorName: post.authorName || 'Qualia 美容分析室',
        authorRole: post.authorRole || '専属ビューティーアナリスト',
        authorAvatar: post.authorAvatar,
        category: slug,
        categoryLabel: label,
        seasonMonth: season,
        isPillar,
        readTime: post.readTimeMinutes || 8,
        isBlog: true,
        linkPath: `/features/${post.id}`
      };
    });

    // articlesから純粋な10選・まとめ記事のみを抽出
    const featureList = articles
      .filter(a => a.isContentArticle || a.id.includes('10sen') || (a.title && /10選|総まとめ|完全ガイド/.test(a.title)))
      .map(art => {
        const { slug, label, season } = classifyFeatureCategory(art.title || '', art.category || '');
        let cleanIntro = art.introText || '';
        if (!cleanIntro && art.content) {
          const firstP = art.content.split('\n\n')[0] || '';
          cleanIntro = firstP.replace(/[#*`]/g, '').slice(0, 140);
        }

        return {
          id: art.id,
          slug: art.id,
          title: art.title,
          intro: cleanIntro,
          imageUrl: art.imageUrl,
          authorName: art.reviewerName || 'Qualia 美容分析室',
          authorRole: '専属アナリスト',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
          category: slug,
          categoryLabel: label,
          seasonMonth: art.seasonMonth || season,
          isPillar: false,
          readTime: 6,
          isBlog: false,
          linkPath: `/articles/${art.id}`
        };
      });

    // ピラー特集やホリデー・秋冬特集を先頭に並べる
    return [...blogList, ...featureList].sort((a, b) => (b.isPillar ? 1 : 0) - (a.isPillar ? 1 : 0));
  }, [articles]);

  // フィルタリング処理
  const filteredFeatures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allFeatureArticles.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSeason = selectedSeason === 'all' || item.seasonMonth === selectedSeason;
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.intro && item.intro.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchCat && matchSeason && matchSearch;
    });
  }, [allFeatureArticles, selectedCategory, selectedSeason, searchQuery]);

  const displayedFeatures = filteredFeatures.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFeatures.length;

  return (
    <div className="py-6 px-4 sm:px-6 space-y-8 pb-16">
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 text-white p-8 sm:p-10 shadow-lg space-y-3">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>2026-2027 AUTUMN / WINTER / HOLIDAY SPECIAL FEATURES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight font-serif-brand">
            10月・11月・12月・1月 厳選コスメ特集ギャラリー
          </h1>
          <p className="text-rose-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            秋コスメ450選コンプリートガイド、2026クリスマスコフレ、冬ボーナス美顔器、厳冬期の超高保湿ケアまで、プロが徹底比較した全{allFeatureArticles.length}本の特集記事を月別・ジャンル別にチェックできます。
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs space-y-4">
        {/* 10-11-12-1 Month Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-3 border-b border-slate-100">
          <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-rose-600" />
            時期・月別で選ぶ:
          </span>
          {SEASON_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedSeason(tab.key);
                setVisibleCount(15);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                selectedSeason === tab.key
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs'
                  : 'bg-rose-50/70 text-rose-900 hover:bg-rose-100 border border-rose-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setVisibleCount(15);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'gold-btn'
                    : 'bg-slate-100 text-slate-700 hover:bg-rose-50 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="特集・コフレ・成分検索..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(15);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>
        </div>

        {/* Quick Trending Feature Tags */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
          <span className="text-[11px] font-extrabold text-rose-600 flex items-center gap-1 shrink-0">
            <Flame className="w-3.5 h-3.5 fill-rose-500" />
            人気テーマ:
          </span>
          {QUICK_FEATURE_TAGS.map(tag => {
            const active = searchQuery === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(active ? '' : tag);
                  setVisibleCount(15);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition cursor-pointer border ${
                  active
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-50 hover:bg-rose-50 text-slate-700 border-slate-200'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Count & Section Header */}
      <div className="flex items-center justify-between border-l-4 border-rose-500 pl-4">
        <h2 className="text-lg sm:text-xl font-bold font-serif-brand text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-rose-600" />
          <span>厳選特集記事（全{filteredFeatures.length}本）</span>
        </h2>
        {(selectedCategory !== 'all' || selectedSeason !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSeason('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
          >
            絞り込みを解除
          </button>
        )}
      </div>

      {/* Features Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedFeatures.map((feat) => (
          <article
            key={feat.id}
            onClick={() => onNavigate(feat.linkPath)}
            className="qualia-glass-card rounded-3xl shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group border border-slate-200"
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-50 via-rose-50/30 to-pink-50/40 p-3 flex items-center justify-center overflow-hidden border-b border-rose-100">
              <img
                src={feat.imageUrl}
                alt={feat.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-rose-700 font-extrabold text-[11px] rounded-lg shadow-xs flex items-center gap-1 backdrop-blur-sm border border-rose-100">
                <Tag className="w-3 h-3 text-rose-500" />
                {feat.categoryLabel}
              </span>
              {feat.isPillar && (
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-[10px] rounded-lg shadow-xs">
                  👑 特大号
                </span>
              )}
              <span className="absolute bottom-3 right-3 px-2.5 py-0.5 bg-black/60 text-white font-medium text-[10px] rounded-md backdrop-blur-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                読了約{feat.readTime}分
              </span>
            </div>

            {/* Content Box */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug line-clamp-2 font-serif-brand">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                  {feat.intro}
                </p>
              </div>

              {/* Footer Meta & Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={feat.authorAvatar}
                    alt={feat.authorName}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-7 h-7 rounded-lg border border-rose-200 object-cover shadow-xs"
                  />
                  <span className="text-[11px] font-bold text-slate-700">
                    {feat.authorName}
                  </span>
                </div>

                <span className="font-extrabold text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-xs">
                  <span>記事を読む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 15)}
            className="px-8 py-3 bg-white border border-rose-200 hover:border-rose-400 text-rose-600 font-bold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">＋</span>
            <span>他の特集記事をさらに読み込む（残り{filteredFeatures.length - visibleCount}本）</span>
          </button>
        </div>
      )}

      {filteredFeatures.length === 0 && (
        <div className="text-center py-16 qualia-glass-card rounded-3xl">
          <p className="text-slate-600 font-bold text-sm">
            検索条件に一致する特集記事が見つかりませんでした。
          </p>
        </div>
      )}
    </div>
  );
}
