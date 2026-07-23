import React from 'react';
import { AUTHOR_PROFILES } from '../data';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Award, CheckCircle } from 'lucide-react';

interface AuthorDetailPageProps {
  authorId: string;
  onNavigate: (path: string) => void;
}

export function AuthorDetailPage({ authorId, onNavigate }: AuthorDetailPageProps) {
  const author = AUTHOR_PROFILES.find((a) => a.id === authorId) || AUTHOR_PROFILES[0];

  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: `${author.name} | Qualia 美容分析室`,
      description: author.bio,
      urlPath: `/authors/${author.id}`
    });
  }, [author]);

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={author.avatarUrl}
            alt={author.name}
            className="w-24 h-24 rounded-full border-4 border-purple-400 object-cover shadow-sm shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-2xl font-extrabold text-slate-900">{author.name}</h1>
            <p className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block">
              {author.role} ・ 実務経験 {author.experienceYears}年
            </p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">{author.bio}</p>
          </div>
        </div>

        <div className="space-y-3 border-t border-sky-100 pt-6">
          <h2 className="text-sm font-extrabold text-slate-900">保有資格・専門分野</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {author.qualifications?.map((q, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-sky-100 flex items-center gap-2 text-xs font-bold text-slate-800">
                <Award className="w-4 h-4 text-purple-600" />
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t border-sky-100 pt-6">
          <h2 className="text-sm font-extrabold text-slate-900">Qualia Navi 検証ポリシー</h2>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
              <span>すべてのコスメ・美容アイテムは実際に使用・検証した上で評価を行っています。</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
              <span>楽天市場公式・優良ショップのリアルな最安値・ポイント情報を公平に提示します。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
