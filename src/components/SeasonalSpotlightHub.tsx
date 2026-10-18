import React, { useState, useMemo } from 'react';
import { RakutenProductArticle } from '../types';
import { INITIAL_BLOG_POSTS } from '../data';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { getCleanAffiliateLink } from '../utils/productUtils';
import { Sparkles, Calendar, Gift, Snowflake, Flame, ArrowRight, ShoppingCart, Star, BookOpen } from 'lucide-react';

export type SeasonMonthKey = 'oct' | 'nov' | 'dec' | 'jan';

interface SeasonalSpotlightHubProps {
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
  activeSeasonFilter?: SeasonMonthKey | 'all';
  onSelectSeasonFilter?: (month: SeasonMonthKey | 'all') => void;
  onQuickKeywordSelect?: (keyword: string) => void;
}

interface MonthConfig {
  key: SeasonMonthKey;
  monthLabel: string;
  badgeText: string;
  title: string;
  subtitle: string;
  rakutenEventNote: string;
  gradientClass: string;
  accentTextClass: string;
  pillarBlogId: string;
  subFeatureIds: string[];
  quickKeywords: string[];
}

const SEASON_MONTH_CONFIGS: MonthConfig[] = [
  {
    key: 'oct',
    monthLabel: '10月・秋本番',
    badgeText: '🍁 10月集中特集｜寒暖差ゆらぎ＆秋トレンド',
    title: '秋の急な乾燥・ゴワつき対策＆深み旬顔メイク総力特集',
    subtitle: '朝晩の冷え込みや湿度低下で肌がゆらぐ10月。角質をやわらげる先行オイル・導入美容液から、ひと塗りで秋顔になる粘膜リップ・生ツヤファンデまで完全網羅。',
    rakutenEventNote: '10月のお買い物マラソン＆「5と0のつく日」ポイント4倍での秋支度まとめ買いが狙い目！',
    gradientClass: 'from-amber-600 via-orange-600 to-rose-600',
    accentTextClass: 'text-amber-700',
    pillarBlogId: 'feat-autumn-cosmetics-guide-45-series-hub',
    subFeatureIds: [
      'feat-autumn-best-moist-basemake-foundation-10',
      'feat-autumn-best-lip-cosme-ranking-10',
      'feat-autumn-booster-serum-stiff-skin-absorption-10',
      'feat-autumn-cica-ceramide-calming-balm-10'
    ],
    quickKeywords: ['導入美容液', '秋リップ', 'セラミド', 'アイクリーム', '先行オイル', 'CICA']
  },
  {
    key: 'nov',
    monthLabel: '11月・コフレ＆BF',
    badgeText: '🎄 11月集中特集｜クリスマスコフレ＆ブラックフライデー',
    title: '2026ホリデー限定コフレ・アドベントカレンダー＆冬メイク解禁',
    subtitle: '年に一度の限定クリスマスコフレやアドベントカレンダー、イルミネーションに映える宝石ラメパレット・冬香水が主役の11月。完売前に押さえるべき限定名品を厳選。',
    rakutenEventNote: '11月は「楽天ブラックフライデー」＆イーグルス感謝祭で限定コフレ・デパコスのポイント還元が最大化！',
    gradientClass: 'from-rose-600 via-pink-600 to-purple-700',
    accentTextClass: 'text-rose-700',
    pillarBlogId: 'feat-winter-holiday-coffret-makeup-collection-2026',
    subFeatureIds: [
      'feat-winter-beauty-advent-calendar-holiday-2026',
      'feat-winter-holiday-eyeshadow-palette-glitter-2026',
      'feat-winter-holiday-bodycare-bath-gift-set-2026',
      'feat-winter-warm-holiday-fragrance-parfum-perfume-2026'
    ],
    quickKeywords: ['クリスマスコフレ', 'ホリデー', 'アイシャドウ', 'フレグランス', 'プレストパウダー', 'グリッター']
  },
  {
    key: 'dec',
    monthLabel: '12月・ご褒美＆ベスコス',
    badgeText: '🎁 12月集中特集｜冬ボーナス美容家電・ギフト＆年間ベスコス',
    title: '1年頑張った自分へのご褒美美容ギア＆絶対外さないクリスマスギフト',
    subtitle: '冬のボーナスで手に入れたいRF温感美顔器・EMSヘッドスパ・高機能ドライヤーから、予算別（3,000円〜1万円）のホリデーギフト、極上バスタイム名品まで徹底比較。',
    rakutenEventNote: '12月は「楽天スーパーSALE」＆「楽天大感謝祭」開催月！高額な美容家電やギフトの買い回りに最適。',
    gradientClass: 'from-purple-700 via-indigo-700 to-rose-700',
    accentTextClass: 'text-purple-700',
    pillarBlogId: 'feat-winter-holiday-cosmetics-gift-guide-2026',
    subFeatureIds: [
      'feat-winter-lift-rf-facial-device-2026',
      'feat-winter-ems-head-spa-scalp-lift-device-2026',
      'feat-winter-hair-care-dryer-iron-device-2026',
      'feat-winter-mens-grooming-holiday-gift-set-2026'
    ],
    quickKeywords: ['美顔器', 'ヘッドスパ', 'ドライヤー', 'クリスマスプレゼント', '炭酸パック', 'ホットアイマスク']
  },
  {
    key: 'jan',
    monthLabel: '1月・厳冬保湿＆新春',
    badgeText: '🎍 1月集中特集｜氷点下の砂漠肌レスキュー＆新春リセット美容',
    title: '真冬の粉吹き・ひび割れ・あかぎれを封じ込める超高保湿レスキュー名品',
    subtitle: '1年で最も湿度が下がり、冷気と暖房で肌・唇・指先が悲鳴を上げる1月。翌朝まで潤いを密封するスリーピングマスク、高保湿ハンド＆ネイルオイル、重炭酸温活で徹底防衛。',
    rakutenEventNote: '1月は「新春ポイントアップ祭＆初売り福袋」と冬物リピート買いで賢くスタートダッシュ！',
    gradientClass: 'from-sky-700 via-indigo-700 to-slate-800',
    accentTextClass: 'text-indigo-700',
    pillarBlogId: 'feat-winter-sheet-mask-face-pack-2026',
    subFeatureIds: [
      'feat-winter-hand-cream-nail-oil-repair-2026',
      'feat-winter-bath-salt-bicarbonate-warming-care-2026',
      'feat-winter-long-lasting-hydrating-lip-tint-2026',
      'feat-autumn-sleeping-mask-night-hydration-10'
    ],
    quickKeywords: ['ハンドクリーム', '入浴剤', 'スリーピングマスク', 'バーム', 'リップティント', '静電気']
  }
];

export const SeasonalSpotlightHub: React.FC<SeasonalSpotlightHubProps> = ({
  articles,
  onNavigate,
  activeSeasonFilter = 'all',
  onSelectSeasonFilter,
  onQuickKeywordSelect
}) => {
  // デフォルトは現在月（10月〜1月なら該当月、それ以外は10月）
  const [activeTab, setActiveTab] = useState<SeasonMonthKey>(() => {
    if (activeSeasonFilter && activeSeasonFilter !== 'all') return activeSeasonFilter;
    const m = new Date().getMonth() + 1;
    if (m === 11) return 'nov';
    if (m === 12) return 'dec';
    if (m === 1) return 'jan';
    return 'oct';
  });

  const currentConfig = useMemo(
    () => SEASON_MONTH_CONFIGS.find(c => c.key === activeTab) || SEASON_MONTH_CONFIGS[0],
    [activeTab]
  );

  const pillarBlog = useMemo(
    () => INITIAL_BLOG_POSTS.find(b => b.id === currentConfig.pillarBlogId) || INITIAL_BLOG_POSTS[0],
    [currentConfig]
  );

  const subFeatures = useMemo(
    () =>
      currentConfig.subFeatureIds
        .map(id => INITIAL_BLOG_POSTS.find(b => b.id === id))
        .filter((b): b is NonNullable<typeof b> => !!b),
    [currentConfig]
  );

  // 該当シーズン月の注目個別アイテム上位4件
  const topSeasonProducts = useMemo(() => {
    return articles
      .filter(a => !a.isContentArticle && a.seasonMonth === activeTab)
      .slice(0, 4);
  }, [articles, activeTab]);

  const seasonTotalCount = useMemo(() => {
    return articles.filter(a => !a.isContentArticle && a.seasonMonth === activeTab).length;
  }, [articles, activeTab]);

  const handleTabClick = (key: SeasonMonthKey) => {
    setActiveTab(key);
    if (onSelectSeasonFilter && activeSeasonFilter !== 'all') {
      onSelectSeasonFilter(key);
    }
  };

  return (
    <section className="rounded-3xl bg-white border-2 border-rose-200/80 shadow-md overflow-hidden">
      {/* Top Month Switcher Bar */}
      <div className="bg-slate-900 text-white p-3 sm:px-6 sm:py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-xs shrink-0">
            <Calendar className="w-4 h-4" />
          </span>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-amber-300">
              AUTUMN / WINTER / HOLIDAY SPECIAL NAVIGATION
            </div>
            <h2 className="text-sm sm:text-base font-extrabold text-white font-serif-brand">
              10月・11月・12月・1月 秋冬＆ホリデー集中攻略ハブ
            </h2>
          </div>
        </div>

        {/* 4-Month Interactive Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-800 p-1.5 rounded-2xl">
          {SEASON_MONTH_CONFIGS.map((cfg) => {
            const isActive = activeTab === cfg.key;
            return (
              <button
                key={cfg.key}
                onClick={() => handleTabClick(cfg.key)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/70'
                }`}
              >
                <span>{cfg.monthLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Spotlight Banner & Pillar Feature */}
      <div className={`bg-gradient-to-r ${currentConfig.gradientClass} text-white p-6 sm:p-8`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold text-amber-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentConfig.badgeText}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug font-serif-brand">
              {currentConfig.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {currentConfig.subtitle}
            </p>
            <div className="bg-black/25 backdrop-blur-xs border border-white/20 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-200 flex items-center gap-2">
              <Gift className="w-4 h-4 shrink-0 text-amber-300" />
              <span>{currentConfig.rakutenEventNote}</span>
            </div>

            {/* Quick Season Keyword Pills */}
            {onQuickKeywordSelect && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-black text-white/90 mr-1">急上昇ワード:</span>
                {currentConfig.quickKeywords.map(kw => (
                  <button
                    key={kw}
                    onClick={() => onQuickKeywordSelect(kw)}
                    className="px-2.5 py-1 rounded-full bg-white/15 hover:bg-white hover:text-rose-700 text-white text-[11px] font-bold border border-white/25 transition cursor-pointer"
                  >
                    #{kw}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pillar Hub Article Card */}
          {pillarBlog && (
            <div
              onClick={() => onNavigate(`/features/${pillarBlog.id}`)}
              className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-xl border border-white/40 cursor-pointer group hover:scale-[1.01] transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider">
                  👑 {currentConfig.monthLabel} 最重要ピラー特集
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  読了約{pillarBlog.readTimeMinutes || 10}分
                </span>
              </div>
              <div className="flex gap-3.5 items-center">
                <img
                  src={Array.isArray(pillarBlog.coverImage) ? pillarBlog.coverImage[0] : pillarBlog.coverImage}
                  alt={pillarBlog.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain bg-slate-50 border border-slate-200 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="space-y-1.5 min-w-0">
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-3 leading-snug font-serif-brand">
                    {pillarBlog.title}
                  </h4>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-rose-600">
                <span>総まとめコンプリートガイドを読む</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sub-Features (4 x 10-item guides) + Top Season Products Preview */}
      <div className="p-5 sm:p-6 bg-gradient-to-b from-rose-50/40 to-white space-y-6">
        {/* 4 Curated 10-Item Guides for this month */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-rose-600" />
              <span>{currentConfig.monthLabel}に読まれている「厳選10選特集」ベスト4</span>
            </h4>
            <button
              onClick={() => onNavigate('/features')}
              className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>全315本の特集を見る</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {subFeatures.map((feat) => (
              <div
                key={feat.id}
                onClick={() => onNavigate(`/features/${feat.id}`)}
                className="bg-white rounded-2xl p-3 border border-rose-100 hover:border-rose-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between gap-2"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={Array.isArray(feat.coverImage) ? feat.coverImage[0] : feat.coverImage}
                    alt={feat.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-14 h-14 rounded-xl object-contain bg-slate-50 border border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <h5 className="text-xs font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-3 leading-snug">
                    {feat.title}
                  </h5>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-rose-600 pt-1 border-t border-slate-50">
                  <span>10選比較を見る</span>
                  <span>➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 4 Products for this Month + Filter Toggle Button */}
        {topSeasonProducts.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-rose-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-600 fill-rose-500" />
                <span>{currentConfig.monthLabel}のトレンド注目アイテム（全{seasonTotalCount.toLocaleString()}品）</span>
              </h4>
              {onSelectSeasonFilter && (
                <button
                  onClick={() =>
                    onSelectSeasonFilter(activeSeasonFilter === activeTab ? 'all' : activeTab)
                  }
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto ${
                    activeSeasonFilter === activeTab
                      ? 'bg-slate-900 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                  }`}
                >
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>
                    {activeSeasonFilter === activeTab
                      ? `✓ ${currentConfig.monthLabel}で図鑑を絞り込み中（解除する）`
                      : `下のコスメ図鑑を「${currentConfig.monthLabel}（${seasonTotalCount}品）」で絞り込む`}
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {topSeasonProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3 border border-slate-200/80 hover:border-rose-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between gap-2.5 group"
                >
                  <div
                    onClick={() => onNavigate(`/articles/${item.id}`)}
                    className="flex gap-3 items-center cursor-pointer"
                  >
                    <img
                      src={getRakutenOptimizedImageUrl(item.imageUrl)}
                      alt={item.productName || item.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-14 h-14 rounded-xl object-contain bg-slate-50 border border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600">
                        <span className="truncate">{item.categoryLabel || item.category}</span>
                        <span className="text-amber-500 flex items-center shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                          {(item.starRating || 4.8).toFixed(1)}
                        </span>
                      </div>
                      <h5 className="text-xs font-extrabold text-slate-900 group-hover:text-rose-600 line-clamp-2 leading-snug">
                        {item.productName || item.title}
                      </h5>
                      <div className="text-[11px] font-black text-rose-600">
                        {item.rakutenPrice}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-100">
                    <button
                      onClick={() => onNavigate(`/articles/${item.id}`)}
                      className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg transition cursor-pointer"
                    >
                      検証レビュー
                    </button>
                    <a
                      href={getCleanAffiliateLink(item)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="py-1.5 px-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] rounded-lg transition flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span>楽天で見る</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
