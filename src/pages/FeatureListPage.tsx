import React from 'react';
import { INITIAL_BLOG_POSTS } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, BookOpen } from 'lucide-react';

interface FeatureListPageProps {
  onNavigate: (path: string) => void;
}

export function FeatureListPage({ onNavigate }: FeatureListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '記事特集一覧 | Qualia Navi',
      description: 'Qualia 美容分析室による最新コスメ・スキンケアの徹底検証と特集記事一覧。',
      urlPath: '/features'
    });
  }, []);

  return (
    <div className="py-6 px-4 sm:px-6 space-y-12">
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white p-8 sm:p-10 shadow-lg space-y-3">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>QUALIA BEAUTY BLOG</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight font-serif-brand">
            コスメ・美容 記事特集
          </h1>
          <p className="text-rose-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            美容分析室の専属アナリストが、季節ごとの悩み解決策や、最新トレンドアイテムを徹底解説。
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-l-4 border-rose-500 pl-4">
          <h2 className="text-xl font-bold font-serif-brand text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-600" />
            <span>記事特集一覧</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {INITIAL_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onNavigate(`/features/${post.id}`)}
              className="qualia-glass-card rounded-3xl shadow-xs hover:border-rose-300 transition-all duration-300 overflow-hidden flex flex-col md:flex-row cursor-pointer group border border-slate-200"
            >
              {/* Cover Image */}
              <div className="relative md:w-1/2 aspect-video bg-white overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover bg-white group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="p-8 md:w-1/2 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
                    読了時間: 約{post.readTimeMinutes}分
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors leading-snug font-serif-brand">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {post.introText}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-9 h-9 rounded-xl border border-rose-300 object-cover shadow-xs"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {post.authorName}
                      </span>
                      <span className="text-[11px] text-slate-500 block">{post.authorRole}</span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    記事を読む ➔
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
