import React, { useState, useMemo } from 'react';
import { INITIAL_COMPARISONS } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, Swords, Search, Flame } from 'lucide-react';

interface ComparisonListPageProps {
  onNavigate: (path: string) => void;
}

const POPULAR_BATTLE_TAGS = [
  '日焼け止め',
  '下地',
  'リップ',
  'CICA',
  'ビタミンC',
  'アゼライン酸',
  'ナイアシンアミド',
  'レチノール',
  'クレンジング',
  'ヘアオイル',
  '美顔器'
];

export function ComparisonListPage({ onNavigate }: ComparisonListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(18);

  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '【2026年最新】人気コスメVS対決・徹底比較記事一覧 | Qualia Navi',
      description: 'お悩みや目的別に人気コスメをガチンコ比較！成分・使用感・コスパの違いを多角的に分析し、あなたにピッタリのアイテムを見つけます。',
      urlPath: '/comparisons'
    });
  }, []);

  const filteredComparisons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return INITIAL_COMPARISONS;
    return INITIAL_COMPARISONS.filter((c) =>
      `${c.title} ${c.subtitle || ''} ${c.targetUserCategory || ''} ${c.verdictSummary || ''}`
        .toLowerCase()
        .includes(q)
    );
  }, [searchQuery]);

  const displayedComparisons = filteredComparisons.slice(0, visibleCount);
  const hasMore = visibleCount < filteredComparisons.length;

  return (
    <div className="py-6 px-4 sm:px-6 space-y-10 pb-16">
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-10 shadow-lg space-y-3">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>QUALIA BATTLE ARCHIVE (全{INITIAL_COMPARISONS.length}対決)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight font-serif-brand">
            お悩み・目的別ガチンコ比較対決
          </h1>
          <p className="text-purple-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            「どっちを買えば失敗しない？」と迷うライバル同士の人気コスメを徹底比較。成分・テクスチャー・持続力・コスパを多角的に分析し、それぞれの勝者を明確にジャッジします。
          </p>
        </div>
      </div>

      {/* Search & Quick Filter Controls */}
      <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="比較したいコスメ名・成分・お悩みで検索（例：アネッサ、レチノール、下地）..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(18);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-purple-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-purple-50 text-purple-700 font-bold text-xs rounded-xl hover:bg-purple-100 transition cursor-pointer shrink-0"
            >
              検索クリア
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-extrabold text-purple-700 flex items-center gap-1 shrink-0">
            <Flame className="w-3.5 h-3.5 fill-purple-600" />
            注目の対決テーマ:
          </span>
          {POPULAR_BATTLE_TAGS.map((tag) => {
            const active = searchQuery === tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(active ? '' : tag);
                  setVisibleCount(18);
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition cursor-pointer border ${
                  active
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-purple-50/50 hover:bg-purple-100 text-slate-700 border-purple-100'
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-l-4 border-purple-500 pl-4">
          <h2 className="text-xl font-bold font-serif-brand text-slate-900 flex items-center gap-2">
            <Swords className="w-5 h-5 text-purple-600" />
            <span>比較検証記事一覧（{filteredComparisons.length}件）</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedComparisons.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate(`/comparisons/${comp.id}`)}
              className="qualia-glass-card rounded-3xl shadow-xs hover:border-purple-300 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col border border-slate-200"
            >
              {/* Cover Image */}
              <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40 p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={comp.coverImage}
                  alt={comp.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-block px-3 py-1 bg-purple-600/90 backdrop-blur-md text-white font-bold text-xs rounded-full shadow-sm">
                    {comp.targetUserCategory}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-purple-600 transition font-serif-brand line-clamp-2">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {comp.verdictSummary || comp.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>勝敗結果と最安値を見る</span>
                  <span>➔</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 18)}
              className="px-8 py-3 bg-white border border-purple-200 hover:border-purple-400 text-purple-700 font-bold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="text-lg">＋</span>
              <span>他の比較対決をさらに読み込む（残り{filteredComparisons.length - visibleCount}件）</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
