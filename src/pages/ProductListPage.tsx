import React, { useState, useMemo, useEffect } from 'react';
import { RakutenProductArticle } from '../types';
import { CATEGORIES, INITIAL_COMPARISONS, INITIAL_BLOG_POSTS } from '../data';
import { CosmeDiagnosisWidget } from '../components/CosmeDiagnosisWidget';
import { SeasonalSpotlightHub, SeasonMonthKey } from '../components/SeasonalSpotlightHub';
import { handleImageError, getRakutenOptimizedImageUrl } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, ShoppingCart, ExternalLink, Star, Search, BookMarked, Layers, ArrowRight, Heart, Flame, BookOpen, Calendar } from 'lucide-react';
import { deduplicateArticles, getCleanAffiliateLink } from '../utils/productUtils';
import { toggleFavorite, getFavoriteIds } from '../utils/favorites';

interface ProductListPageProps {
  articles: RakutenProductArticle[];
  onNavigate: (path: string) => void;
}

const POPULAR_INGREDIENT_TAGS = [
  'クリスマスコフレ',
  'セラミド',
  '導入美容液',
  'アイクリーム',
  'ハンドクリーム',
  '美顔器',
  '入浴剤',
  '落ちないリップ',
  'レチノール',
  'ナイアシンアミド',
  'CICA',
  'グルタチオン'
];

const SEASON_FILTER_LABELS: Record<SeasonMonthKey, string> = {
  oct: '🍁 10月・秋本番（寒暖差・秋メイク）',
  nov: '🎄 11月・ホリデーコフレ＆限定品',
  dec: '🎁 12月・冬ご褒美家電＆ギフト',
  jan: '🎍 1月・厳冬レスキュー超高保湿'
};

const CATEGORY_SEO_DESCRIPTIONS: Record<string, string> = {
  skincare: '保湿力、美容成分（セラミド・レチノール・ナイアシンアミド・CICA・アゼライン酸等）の配合バランス、肌なじみを徹底検証。10月〜1月の秋冬乾燥肌・インナードライ・敏感肌まで、肌悩みに合わせた最適なスキンケア・美容液を厳選しています。',
  suncare: 'SPF50+・PA++++の紫外線防御力はもちろん、秋冬の乾燥を防ぐ高保湿UV下地、白浮きしないトーンアップ効果、石けん落ちのしやすさまで実地比較。毎日心地よく使える日焼け止め・UV下地を厳選。',
  makeup: '秋冬の乾燥崩れ・粉吹きを防ぐ高保湿化粧下地から、生ツヤ肌をつくる美容液ファンデ、ホリデー限定アイシャドウパレット・プレストパウダーまで、長時間美肌をキープするベース＆ポイントメイク名品。',
  lip: '忘年会や飲食でも色落ちしにくい高保湿ティント処方、縦ジワをぷるんと補整するプランパー、木枯らしで荒れやすい唇を集中補修するリップバーム・スリーピングマスクまで、血色感と潤いを両立するリップアイテム。',
  device: '冬のボーナスやホリデー自分ご褒美に選ばれるRF温感リフト美顔器、EMSヘッドスパ、LEDフォトマスク、高浸透ナノイオンドライヤーまで、自宅でサロン級の本格エイジングケア＆美髪ケアを叶える最新美容家電・ギアを徹底検証。',
  'k-beauty': '韓国オリーブヤングや楽天市場公式ショップで話題沸騰の最新K-Beautyを最速レビュー。リードルショット、高保湿PDRN・グルタチオン美容液、水光ツヤティントなど実力派韓国コスメを網羅。',
  bodycare: 'お風呂上がりの乾燥・粉吹きを防ぐ高保湿ボディミルク、あかぎれ・ささくれを防ぐハンド＆ネイルオイル、芯から温まる重炭酸バスソルト・冬フレグランスまで、全身うるおい美肌へ導くボディケア名品。',
  haircare: '冬の乾燥・セーターの静電気・パサつきを抑える高保湿ヘアオイル＆ヘアミルク、頭皮の乾燥フケを防ぐスカルプエッセンス、高級パドルブラシなど、指通りなめらかなサロン級ツヤ髪を叶えるヘアケアアイテム。',
  oralcare: 'コーヒーや紅茶のステイン（着色汚れ）を浮かせて落とすホワイトニング歯磨き粉、翌朝の口臭・ネバつきを防ぐ低刺激マウスウォッシュなど、清潔感あふれる白い歯と息をつくるオーラルケア。',
  supplement: '内側から透明感とハリを支えるリポソームビタミンC、低分子コラーゲンペプチド、セラミド・ビオチンなど、秋冬のキレイとコンディションを底上げするインナーケア・美容サプリメント。'
};

export function ProductListPage({ articles, onNavigate }: ProductListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'all';
  });
  const [selectedSeason, setSelectedSeason] = useState<SeasonMonthKey | 'all'>(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('season');
    if (s === 'oct' || s === 'nov' || s === 'dec' || s === 'jan') return s;
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || params.get('q') || '';
  });
  const [showAllComparisons, setShowAllComparisons] = useState<boolean>(false);
  const [visibleProductCount, setVisibleProductCount] = useState<number>(12);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const q = params.get('search') || params.get('q');
      const s = params.get('season');
      if (cat) setSelectedCategory(cat);
      if (q !== null) setSearchQuery(q);
      if (s === 'oct' || s === 'nov' || s === 'dec' || s === 'jan') setSelectedSeason(s);
    };
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  useEffect(() => {
    setFavoriteIds(getFavoriteIds());
    const handleUpdate = () => {
      setFavoriteIds(getFavoriteIds());
    };
    window.addEventListener('qualia_favorites_updated', handleUpdate);
    return () => window.removeEventListener('qualia_favorites_updated', handleUpdate);
  }, []);

  const handleToggleCardFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavoriteIds(getFavoriteIds());
  };

  useEffect(() => {
    const activeCatObj = CATEGORIES.find(c => c.slug === selectedCategory);
    const isCatFiltered = selectedCategory !== 'all' && activeCatObj;
    const pageTitle = isCatFiltered
      ? `【2026秋冬最新】${activeCatObj.name} おすすめ検証図鑑・楽天最安値一覧 | Qualia Navi`
      : '【2026秋冬＆ホリデー最新】注目コスメ図鑑 - クリスマスコフレ・高保湿スキンケア・韓国コスメ検証 | Qualia Navi';
    const pageDesc = isCatFiltered
      ? CATEGORY_SEO_DESCRIPTIONS[selectedCategory] || activeCatObj.description
      : '10月・11月・12月・1月の秋冬乾燥対策コスメ、2026クリスマスコフレ、冬ボーナス美顔器、デパコス・韓国コスメを網羅したコスメ図鑑。Qualia美容分析室が実地検証したスペックや最安値をチェック。';

    updateSeoGeoMetadata({
      title: pageTitle,
      description: pageDesc,
      urlPath: isCatFiltered ? `/?category=${selectedCategory}` : '/',
      jsonLdSchema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Qualia Navi (クオリア・ナビ)',
          url: 'https://qualia-navi.vercel.app',
          logo: 'https://qualia-navi.vercel.app/favicon.svg'
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Qualia Navi (クオリア・ナビ)',
          url: 'https://qualia-navi.vercel.app',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://qualia-navi.vercel.app/?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }
      ]
    });
  }, [selectedCategory]);

  // 1. コスメ図鑑：特集記事（10選・ブログ等）を除外した「個別コスメアイテム」のみを抽出・名寄せ
  const encyclopediaArticles = useMemo(() => {
    const singleOnly = articles.filter(a => 
      !a.isContentArticle &&
      !a.id.includes('10sen') && 
      !(a.title && a.title.includes('10選')) && 
      !a.id.startsWith('feat-') && 
      !a.id.startsWith('blog-')
    );
    return deduplicateArticles(singleOnly);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return encyclopediaArticles.filter((art) => {
      const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
      const matchSeason = selectedSeason === 'all' || art.seasonMonth === selectedSeason;
      const matchQuery =
        !q ||
        (art.title && art.title.toLowerCase().includes(q)) ||
        (art.productName && art.productName.toLowerCase().includes(q)) ||
        (art.introText && art.introText.toLowerCase().includes(q)) ||
        (art.categoryLabel && art.categoryLabel.toLowerCase().includes(q)) ||
        (art.tags && art.tags.some(t => t.toLowerCase().includes(q))) ||
        (art.pros && art.pros.some(p => p.toLowerCase().includes(q)));
      return matchCat && matchSeason && matchQuery;
    });
  }, [encyclopediaArticles, selectedCategory, selectedSeason, searchQuery]);

  const displayedComparisons = showAllComparisons ? INITIAL_COMPARISONS.slice(0, 16) : INITIAL_COMPARISONS.slice(0, 4);
  const displayedArticles = filteredArticles.slice(0, visibleProductCount);
  const hasMoreProducts = visibleProductCount < filteredArticles.length;

  // 10-11-12-1月の最重要ピラー特集6本を下部でもピックアップ
  const featuredBlogs = useMemo(() => {
    const priorityIds = [
      'feat-autumn-cosmetics-guide-45-series-hub',
      'feat-winter-holiday-coffret-makeup-collection-2026',
      'feat-winter-holiday-cosmetics-gift-guide-2026',
      'feat-winter-beauty-advent-calendar-holiday-2026',
      'feat-winter-lift-rf-facial-device-2026',
      'feat-winter-sheet-mask-face-pack-2026'
    ];
    const picked = priorityIds
      .map(id => INITIAL_BLOG_POSTS.find(b => b.id === id))
      .filter((b): b is NonNullable<typeof b> => !!b);
    return picked.length > 0 ? picked : INITIAL_BLOG_POSTS.slice(0, 6);
  }, []);

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setVisibleProductCount(12);
    const url = slug === 'all' ? '/' : `/?category=${slug}`;
    window.history.replaceState({}, '', url);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Header Section - コスメ図鑑としてのデザイン */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white p-8 sm:p-10 shadow-lg space-y-4">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <BookMarked className="w-3.5 h-3.5 text-amber-200" />
            <span>2026-2027 AUTUMN / WINTER / HOLIDAY ENCYCLOPEDIA</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight font-serif-brand">
            コスメ図鑑・秋冬＆ホリデー名品完全ガイド
          </h1>
          <p className="text-rose-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            10月・11月・12月・1月の乾燥対策スキンケア、2026クリスマスコフレ、冬のご褒美美容家電、デパコス・韓国コスメの実力派アイテム（全{encyclopediaArticles.length.toLocaleString()}品）を1品ずつプロ目線で徹底解剖。
          </p>
        </div>

        {/* 特集記事一覧へのバナー導線 */}
        <div 
          onClick={() => onNavigate('/features')}
          className="relative z-10 bg-white/15 hover:bg-white/25 border border-white/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black tracking-wide text-amber-200 flex items-center gap-1">
                <span>AUTUMN & WINTER SPECIAL FEATURES ({INITIAL_BLOG_POSTS.length}本公開中)</span>
              </div>
              <p className="text-sm font-bold text-white leading-tight">
                「秋コスメ450選」「2026クリスマスコフレ」「冬の超高保湿10選」など特集ギャラリーはこちら
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-white bg-white/20 px-4 py-2 rounded-xl group-hover:bg-white group-hover:text-rose-600 transition-colors shrink-0">
            <span>特集記事一覧を見る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 🍁🎄🎁🎍 10月・11月・12月・1月 秋冬＆ホリデー集中攻略ハブ */}
      <SeasonalSpotlightHub
        articles={articles}
        onNavigate={onNavigate}
        activeSeasonFilter={selectedSeason}
        onSelectSeasonFilter={(season) => {
          setSelectedSeason(season);
          setVisibleProductCount(12);
        }}
        onQuickKeywordSelect={(kw) => {
          setSearchQuery(kw);
          setVisibleProductCount(12);
        }}
      />

      {/* 🧭 30秒パーソナルコスメ診断ウィジェット */}
      <CosmeDiagnosisWidget articles={articles} onNavigate={onNavigate} />

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs space-y-4">
        {/* Season Month Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-slate-100">
          <span className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-rose-600" />
            10〜1月 シーズン絞り込み:
          </span>
          <button
            onClick={() => {
              setSelectedSeason('all');
              setVisibleProductCount(12);
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedSeason === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            全シーズン ({encyclopediaArticles.length.toLocaleString()})
          </button>
          {(['oct', 'nov', 'dec', 'jan'] as SeasonMonthKey[]).map((mKey) => {
            const isAct = selectedSeason === mKey;
            return (
              <button
                key={mKey}
                onClick={() => {
                  setSelectedSeason(isAct ? 'all' : mKey);
                  setVisibleProductCount(12);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  isAct
                    ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                    : 'bg-rose-50/60 text-rose-900 border-rose-200 hover:bg-rose-100'
                }`}
              >
                {SEASON_FILTER_LABELS[mKey]}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.slug)}
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
              placeholder="コスメ名・成分・悩み検索..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleProductCount(12);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>
        </div>

        {/* Popular Ingredient / Concern Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
          <span className="text-[11px] font-extrabold text-rose-600 flex items-center gap-1 shrink-0">
            <Flame className="w-3.5 h-3.5 fill-rose-500" />
            秋冬急上昇ワード:
          </span>
          {POPULAR_INGREDIENT_TAGS.map((tag) => {
            const active = searchQuery === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(active ? '' : tag);
                  setVisibleProductCount(12);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition cursor-pointer border ${
                  active
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-rose-50/50 hover:bg-rose-100/70 text-slate-700 border-rose-100'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
        
        {/* Category SEO Enhancement Text */}
        {selectedCategory !== 'all' && (
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 text-xs text-slate-700 leading-relaxed font-medium">
            <h3 className="font-bold text-rose-700 mb-1">
              {CATEGORIES.find(c => c.slug === selectedCategory)?.name}カテゴリについて
            </h3>
            <p>
              {CATEGORY_SEO_DESCRIPTIONS[selectedCategory] || `${CATEGORIES.find(c => c.slug === selectedCategory)?.name}の最新トレンドアイテムをQualia美容分析室が独自基準で徹底検証。`}
            </p>
          </div>
        )}
      </div>

      {/* Encyclopedia Section Header */}
      <div className="flex items-center justify-between border-l-4 border-rose-500 pl-4">
        <h2 className="text-lg sm:text-xl font-bold font-serif-brand text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-rose-600" />
          <span>
            注目コスメ図鑑
            {selectedSeason !== 'all' ? `｜${SEASON_FILTER_LABELS[selectedSeason]}` : ''}
            （全{filteredArticles.length.toLocaleString()}アイテム）
          </span>
        </h2>
        {(selectedCategory !== 'all' || selectedSeason !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              handleSelectCategory('all');
              setSelectedSeason('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
          >
            絞り込みをすべて解除
          </button>
        )}
      </div>

      {/* Product Grid - コスメ図鑑カード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((art) => (
          <div
            key={art.id}
            className="qualia-glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-rose-300 transition-all duration-300"
          >
            {/* Product Image & Badges */}
            <div 
              className="relative aspect-square bg-gradient-to-br from-slate-50 via-rose-50/20 to-pink-50/30 p-6 flex items-center justify-center overflow-hidden cursor-pointer border-b border-rose-100"
              onClick={() => onNavigate(`/articles/${art.id}`)}
            >
              <img
                src={getRakutenOptimizedImageUrl(art.imageUrl)}
                alt={art.productName || art.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
              
              {art.isHallOfFame && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-lg shadow-md flex items-center gap-1">
                  👑 殿堂入り
                </span>
              )}

              <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-white/95 text-rose-600 font-extrabold text-xs rounded-md shadow-xs flex items-center gap-1 backdrop-blur-sm border border-rose-100">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {(typeof art.starRating === 'number' ? art.starRating : 4.8).toFixed(1)}
              </span>

              {/* Keep (Favorite) Button */}
              <button
                onClick={(e) => handleToggleCardFavorite(art.id, e)}
                title="お気に入りにキープ"
                className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
                  favoriteIds.includes(art.id)
                    ? 'bg-rose-500 text-white shadow-rose-300'
                    : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white border border-slate-200/60'
                }`}
              >
                <Heart className={`w-4 h-4 ${favoriteIds.includes(art.id) ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div 
                className="space-y-2 cursor-pointer"
                onClick={() => onNavigate(`/articles/${art.id}`)}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">
                    {art.categoryLabel || art.category}
                  </span>
                  <span className="text-slate-500 font-medium text-[11px]">
                    担当: {art.reviewerName || 'Qualia 美容分析室'}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-rose-600 transition-colors line-clamp-2 font-serif-brand">
                  {art.productName || art.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                  {art.introText}
                </p>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">楽天市場最安値参考:</span>
                  <span className="font-extrabold text-rose-600 text-sm">{art.rakutenPrice || '価格要確認'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onNavigate(`/articles/${art.id}`)}
                    className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition text-center cursor-pointer"
                  >
                    図鑑詳細を見る
                  </button>
                  <a
                    href={getCleanAffiliateLink(art)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="py-2.5 px-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1 shadow-sm shadow-rose-200"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>楽天で見る</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleProductCount((prev) => prev + 12)}
            className="px-8 py-3 bg-white border border-rose-200 hover:border-rose-400 text-rose-600 font-bold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">＋</span>
            <span>コスメ図鑑の続きを読み込む（残り{(filteredArticles.length - visibleProductCount).toLocaleString()}件）</span>
          </button>
        </div>
      )}

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 qualia-glass-card rounded-3xl">
          <p className="text-slate-600 font-bold text-sm">
            検索条件に一致するコスメアイテムが見つかりませんでした。
          </p>
        </div>
      )}

      {/* VS Comparison Featured Grid */}
      <div className="space-y-4 pt-6 border-t border-rose-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚔️</span>
            <h2 className="text-lg sm:text-xl font-bold font-serif-brand text-slate-900 border-l-4 border-rose-500 pl-3">
              注目のコスメVS対決比較（全{INITIAL_COMPARISONS.length}件）
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/comparisons')}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>すべての比較を見る ➔</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedComparisons.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate(`/comparisons/${comp.id}`)}
              className="qualia-glass-card rounded-2xl p-3.5 cursor-pointer hover:border-purple-300 transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div className="space-y-2.5">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={comp.coverImage}
                    alt={comp.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-[10px] rounded-md shadow-xs">
                    VS対決
                  </span>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-md mb-1">
                    {comp.targetUserCategory}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-purple-600 transition-colors font-serif-brand line-clamp-2">
                    {comp.title}
                  </h3>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                <span>勝敗判定を見る</span>
                <span>➔</span>
              </div>
            </div>
          ))}
        </div>
        {!showAllComparisons && INITIAL_COMPARISONS.length > 4 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAllComparisons(true)}
              className="px-6 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-full transition-colors flex items-center gap-2 cursor-pointer border border-purple-200 shadow-xs"
            >
              <span>＋ 比較記事をもっと表示する（全{INITIAL_COMPARISONS.length}件）</span>
            </button>
          </div>
        )}
      </div>

      {/* Featured Special Reports Section */}
      <div className="space-y-4 pt-6 border-t border-rose-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg sm:text-xl font-bold font-serif-brand text-slate-900 border-l-4 border-amber-500 pl-3">
              お悩み・季節別 厳選コスメ特集レポート
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/features')}
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>特集一覧を見る ➔</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => onNavigate(`/features/${blog.id}`)}
              className="bg-white rounded-2xl p-4 border border-amber-100 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex gap-4 items-center cursor-pointer group"
            >
              <img
                src={Array.isArray(blog.coverImage) ? blog.coverImage[0] : blog.coverImage}
                alt={blog.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                  特集10選ガイド
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors font-serif-brand">
                  {blog.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {blog.subtitle || blog.introText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
