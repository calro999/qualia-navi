import React from 'react';
import { AUTHOR_PROFILES } from '../data';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Award, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';

interface AuthorDetailPageProps {
  authorId: string;
  onNavigate: (path: string) => void;
}

export function AuthorDetailPage({ authorId, onNavigate }: AuthorDetailPageProps) {
  const author = AUTHOR_PROFILES.find((a) => a.id === authorId) || AUTHOR_PROFILES[0];

  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: `${author.name} (${author.role}) プロフィール | Qualia 美容分析室`,
      description: author.bio,
      urlPath: `/authors/${author.id}`
    });
  }, [author]);

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/authors')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>メンバー一覧へ戻る</span>
        </button>

        <div className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={author.avatarUrl}
              alt={author.name}
              className="w-28 h-28 rounded-3xl border-2 border-rose-400 object-cover shadow-md shrink-0"
            />
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-lg">
                {author.role}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif-brand">
                {author.name}
              </h1>
              <p className="text-xs text-rose-600 font-bold">
                専門ジャンル: {author.specialty} ・ 検証経験 {author.experienceYears}年
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1 font-normal">{author.bio}</p>
            </div>
          </div>

          {/* Assigned Department */}
          <div className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 font-serif-brand">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>担当部門・得意領域</span>
            </h2>
            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 space-y-2">
              <div className="text-xs font-bold text-rose-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-rose-600" />
                <span>メイン担当: {author.assignedDepartment}</span>
              </div>
              {author.subDepartments && author.subDepartments.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {author.subDepartments.map((sub, idx) => (
                    <span key={idx} className="text-xs bg-white text-slate-700 font-bold px-2.5 py-0.5 rounded-md border border-rose-200">
                      #{sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Policy */}
          <div className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-sm font-extrabold text-slate-900 font-serif-brand">
              Qualia 美容分析室 検証ポリシー
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>すべてのアイテムは専属アナリストが実際に使用し、使用感や肌馴染みを評価しています。</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>楽天市場オープンAPIと連携し、リアルタイム最安値および限定ポイント還元情報を提示します。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
