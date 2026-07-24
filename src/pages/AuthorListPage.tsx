import React from 'react';
import { AUTHOR_PROFILES } from '../data';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Award, Crown, Sparkles, CheckCircle } from 'lucide-react';

interface AuthorListPageProps {
  onNavigate: (path: string) => void;
}

export function AuthorListPage({ onNavigate }: AuthorListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: 'Qualia 美容分析室 メンバー一覧（編集長・コレクター12名） | Qualia Navi',
      description: 'Qualia Naviの統括編集長・美容編集長および日本人コスメコレクター10名による専門アナリストチームのプロフィール紹介です。',
      urlPath: '/authors'
    });
  }, []);

  const editors = AUTHOR_PROFILES.filter((a) => a.authorType === 'male_editor_in_chief' || a.authorType === 'female_editor_in_chief');
  const collectors = AUTHOR_PROFILES.filter((a) => a.authorType === 'collector');

  return (
    <div className="py-6 px-4 sm:px-6 space-y-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 text-amber-100 p-8 sm:p-10 shadow-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300 font-serif-brand">
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUALIA BEAUTY LAB MEMBERS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-serif-brand qualia-gold-text">
            Qualia 美容分析室 専門アナリスト陣 (12名)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-3xl">
            実生活での長期間テスト、成分アプローチ解析、角層水分量の変化測定に基づき、嘘偽りのない本音の検証レポートを発信するプロフェッショナルチームです。
          </p>
        </div>

        {/* Section 1: Editors in Chief (男性編集長 & 女性編集長) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-amber-400 pl-4">
            <Crown className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold font-serif-brand text-amber-200">
              編集長チーム (男性統括編集長 / 女性美容編集長)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editors.map((author) => (
              <div
                key={author.id}
                onClick={() => onNavigate(`/authors/${author.id}`)}
                className="qualia-glass-card p-6 rounded-3xl cursor-pointer hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={author.avatarUrl}
                    alt={author.avatarAlt || author.name}
                    className="w-20 h-20 rounded-2xl border-2 border-amber-400/50 object-cover shrink-0 shadow-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1">
                    <div className="inline-block px-2.5 py-0.5 qualia-gold-gradient text-slate-950 text-[11px] font-black rounded-md">
                      {author.role}
                    </div>
                    <h3 className="text-xl font-extrabold text-white font-serif-brand pt-1">
                      {author.name}
                    </h3>
                    <p className="text-xs text-amber-300 font-medium">
                      検証実績: {author.collectionCount}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {author.bio}
                </p>

                <div className="pt-3 border-t border-amber-500/20 flex flex-wrap gap-1.5">
                  <span className="text-[11px] bg-amber-500/10 text-amber-200 font-bold px-2.5 py-0.5 rounded-md border border-amber-500/20 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> {author.assignedDepartment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 10 Japanese Cosmetics Collectors */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-amber-400 pl-4">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold font-serif-brand text-amber-200">
              専属コスメコレクター (日本人アナリスト 10名)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {collectors.map((author) => (
              <div
                key={author.id}
                onClick={() => onNavigate(`/authors/${author.id}`)}
                className="qualia-glass-card p-6 rounded-3xl cursor-pointer hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={author.avatarUrl}
                    alt={author.avatarAlt || author.name}
                    className="w-16 h-16 rounded-2xl border border-amber-500/30 object-cover shrink-0 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 bg-slate-800 text-amber-300 text-[10px] font-bold rounded-md border border-amber-500/30">
                      {author.role}
                    </span>
                    <h3 className="text-lg font-extrabold text-white font-serif-brand">
                      {author.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      得意分野: <span className="text-amber-200 font-bold">{author.favoriteCategory}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {author.bio}
                </p>

                <div className="pt-3 border-t border-amber-500/10 flex flex-wrap gap-1">
                  <span className="text-[11px] bg-slate-900 text-amber-200 font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-amber-500/20">
                    <CheckCircle className="w-3 h-3 text-amber-400" /> {author.assignedDepartment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
