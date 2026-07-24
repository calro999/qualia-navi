import React from 'react';
import { INITIAL_COMPARISONS } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, Swords } from 'lucide-react';

interface ComparisonListPageProps {
  onNavigate: (path: string) => void;
}

export function ComparisonListPage({ onNavigate }: ComparisonListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '比較記事一覧 | Qualia Navi',
      description: 'お悩みや目的別に人気コスメをガチンコ比較！あなたにピッタリのアイテムを見つけます。',
      urlPath: '/comparisons'
    });
  }, []);

  return (
    <div className="py-6 px-4 sm:px-6 space-y-12">
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white p-8 sm:p-10 shadow-lg space-y-3">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>QUALIA BATTLE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight font-serif-brand">
            お悩み・目的別ガチンコ比較対決
          </h1>
          <p className="text-purple-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            似た者同士の人気コスメを徹底比較。良い点・悪い点を多角的に分析し、買うべき人を明確にします。
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-l-4 border-purple-500 pl-4">
          <h2 className="text-xl font-bold font-serif-brand text-slate-900 flex items-center gap-2">
            <Swords className="w-5 h-5 text-purple-600" />
            <span>比較記事一覧</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_COMPARISONS.map((comp) => (
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
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-purple-600 transition font-serif-brand">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {comp.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>比較結果を見る</span>
                  <span>➔</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
