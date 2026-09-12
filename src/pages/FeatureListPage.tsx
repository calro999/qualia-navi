import React, { useState, useMemo } from 'react';
import { INITIAL_BLOG_POSTS, CATEGORIES } from '../data';
import { RakutenProductArticle } from '../types';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, BookOpen, Search, Clock, ArrowRight, Tag } from 'lucide-react';

interface FeatureListPageProps {
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

export function FeatureListPage({ articles, onNavigate }: FeatureListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '【2026年最新】コスメ・美容 特集記事一覧 | Qualia Navi',
      description: 'プロ厳選10選や悩み別・成分別・パーソナルカラー別の特集記事を網羅。Qualia 美容分析室による徹底検証レポート一覧。',
      urlPath: '/features'
    });
  }, []);

  // 1. 特集記事（10選記事およびブログ記事）を統合して抽出
  const allFeatureArticles = useMemo(() => {
    // 既存ブログ記事（INITIAL_BLOG_POSTS）
    const blogList = INITIAL_BLOG_POSTS.map(post => ({
      id: post.id,
      slug: post.id,
      title: post.title,
      intro: post.introText || post.subtitle,
      imageUrl: post.coverImage,
      authorName: post.authorName || 'Qualia 美容分析室',
      authorRole: post.authorRole || '専属ビューティーアナリスト',
      authorAvatar: post.authorAvatar,
      category: 'skincare',
      categoryLabel: 'スキンケア特集',
      readTime: post.readTimeMinutes || 8,
      isBlog: true,
      linkPath: `/features/${post.id}`
    }));

    // articles.jsonから特集記事（10選・徹底比較・ランキング系）を抽出
    const featureList = articles
      .filter(a => a.id.includes('10sen') || a.title.includes('10選') || a.id.startsWith('feat-') || a.id.startsWith('blog-'))
      .map(art => {
        let catLabel = 'コスメ特集';
        if (art.category === 'skincare') catLabel = 'スキンケア特集';
        else if (art.category === 'makeup') catLabel = 'ベース＆メイク特集';
        else if (art.category === 'haircare') catLabel = 'ヘアケア特集';
        else if (art.category === 'device') catLabel = '美容家電・ギア特集';
        else if (art.category === 'oralcare') catLabel = 'オーラルケア特集';
        else if (art.category === 'bodycare') catLabel = 'ボディケア特集';
        else if (art.category === 'supplement') catLabel = 'インナーケア特集';
        else if (art.category) catLabel = `${art.category}特集`;

        // 抜粋文の作成
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
          category: art.category || 'skincare',
          categoryLabel: catLabel,
          readTime: 6,
          isBlog: false,
          linkPath: `/articles/${art.id}`
        };
      });

    return [...blogList, ...featureList];
  }, [articles]);

  // フィルタリング処理
  const filteredFeatures = useMemo(() => {
    return allFeatureArticles.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.intro.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allFeatureArticles, selectedCategory, searchQuery]);

  const displayedFeatures = filteredFeatures.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFeatures.length;

  return (
    <div className="py-6 px-4 sm:px-6 space-y-10 pb-16">
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white p-8 sm:p-10 shadow-lg space-y-3">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>QUALIA SPECIAL FEATURES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight font-serif-brand">
            コスメ・美容 特集記事ギャラリー
          </h1>
          <p className="text-rose-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            プロが厳選する人気10選や、成分・お悩み別の徹底比較検証など、読み応え抜群の特集記事をサムネイル付きで一覧できます。
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setVisibleCount(12);
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
              placeholder="特集・テーマ・成分検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Feature Count & Section Header */}
      <div className="flex items-center justify-between border-l-4 border-rose-500 pl-4">
        <h2 className="text-lg sm:text-xl font-bold font-serif-brand text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-rose-600" />
          <span>厳選特集記事（全{filteredFeatures.length}本）</span>
        </h2>
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
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-8 py-3 bg-white border border-rose-200 hover:border-rose-400 text-rose-600 font-bold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">＋</span>
            <span>他の特集記事をさらに読み込む</span>
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
