import React from 'react';
import { AUTHOR_PROFILES } from '../data';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Heart, Award } from 'lucide-react';

interface AuthorListPageProps {
  onNavigate: (path: string) => void;
}

export function AuthorListPage({ onNavigate }: AuthorListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: 'Qualia 美容分析室 アナリスト紹介 | Qualia Navi',
      description: 'Qualia Naviのコンテンツを徹底検証・執筆・監修する専門アナリストチームのプロフィール紹介です。',
      urlPath: '/authors'
    });
  }, []);

  return (
    <div className="py-6 px-4 sm:px-6 space-y-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 text-white p-6 sm:p-8 shadow-md">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Qualia 美容分析室</h1>
          <p className="text-sky-50 text-xs sm:text-sm font-medium">
            成分・使い心地・実売価格・口コミの信頼度を徹底検証する専門アナリストチーム。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {AUTHOR_PROFILES.map((author) => (
            <div
              key={author.id}
              onClick={() => onNavigate(`/authors/${author.id}`)}
              className="qualia-glass-card p-6 rounded-2xl cursor-pointer hover:shadow-md transition flex flex-col sm:flex-row gap-5 items-center sm:items-start"
            >
              <img
                src={author.avatarUrl}
                alt={author.avatarAlt || author.name}
                className="w-20 h-20 rounded-full border-2 border-purple-400 object-cover shrink-0"
              />
              <div className="space-y-2 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900">{author.name}</h2>
                  <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {author.role}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{author.bio}</p>
                <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                  {author.qualifications?.map((q, idx) => (
                    <span key={idx} className="text-[11px] bg-sky-50 text-sky-700 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Award className="w-3 h-3 text-purple-600" /> {q}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
