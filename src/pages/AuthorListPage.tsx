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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white p-8 sm:p-10 shadow-lg space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold font-serif-brand">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>QUALIA BEAUTY LAB MEMBERS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif-brand">
            Qualia 美容分析室 アナリスト陣 (12名)
          </h1>
          <p className="text-rose-50 text-xs sm:text-sm font-medium leading-relaxed max-w-3xl opacity-95">
            コスメの長期間実体験テストや使用感比較に基づき、嘘偽りのない本音の検証レポートを発信する専門アナリストチームです。
          </p>
        </div>

        {/* Section 1: Editors in Chief */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-rose-500 pl-4">
            <Crown className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-bold font-serif-brand text-slate-900">
              編集長チーム (男性統括編集長 / 女性美容編集長)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editors.map((author) => (
              <div
                key={author.id}
                onClick={() => onNavigate(`/authors/${author.id}`)}
                className="qualia-glass-card p-6 rounded-3xl cursor-pointer hover:border-rose-300 transition-all duration-300 flex flex-col justify-between space-y-4 group border border-rose-100"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={author.avatarUrl}
                    alt={author.avatarAlt || author.name}
                    className="w-20 h-20 rounded-2xl border-2 border-rose-300 object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1">
                    <div className="inline-block px-2.5 py-0.5 bg-rose-100 text-rose-800 text-[11px] font-black rounded-md">
                      {author.role}
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-serif-brand pt-1">
                      {author.name}
                    </h3>
                    <p className="text-xs text-rose-600 font-bold">
                      検証実績: {author.collectionCount}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {author.bio}
                </p>

                <div className="pt-3 border-t border-rose-100 flex flex-wrap gap-1.5">
                  <span className="text-xs bg-rose-50 text-rose-800 font-bold px-2.5 py-1 rounded-md border border-rose-200 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-rose-600" /> {author.assignedDepartment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 10 Japanese Cosmetics Collectors */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-rose-500 pl-4">
            <Sparkles className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl font-bold font-serif-brand text-slate-900">
              専属コスメコレクター (日本人アナリスト 10名)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {collectors.map((author) => (
              <div
                key={author.id}
                onClick={() => onNavigate(`/authors/${author.id}`)}
                className="qualia-glass-card p-6 rounded-3xl cursor-pointer hover:border-rose-300 transition-all duration-300 flex flex-col justify-between space-y-4 group border border-rose-100"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={author.avatarUrl}
                    alt={author.avatarAlt || author.name}
                    className="w-16 h-16 rounded-2xl border border-rose-200 object-cover shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-md border border-slate-200">
                      {author.role}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 font-serif-brand">
                      {author.name}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      得意ジャンル: <span className="text-rose-600 font-bold">{author.favoriteCategory}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {author.bio}
                </p>

                <div className="pt-3 border-t border-rose-100 flex flex-wrap gap-1">
                  <span className="text-xs bg-slate-50 text-slate-800 font-bold px-2.5 py-1 rounded-md flex items-center gap-1 border border-slate-200">
                    <CheckCircle className="w-3.5 h-3.5 text-rose-600" /> {author.assignedDepartment}
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
