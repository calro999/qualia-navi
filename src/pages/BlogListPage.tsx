import React from 'react';
import { INITIAL_BLOG_POSTS, INITIAL_COMPARISONS, AUTHOR_PROFILES } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, BookOpen } from 'lucide-react';

interface BlogListPageProps {
  onNavigate: (path: string) => void;
}

export function BlogListPage({ onNavigate }: BlogListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '美肌＆コスメ徹底検証ブログ | Qualia Navi',
      description: 'Qualia 美容分析室による最新コスメ・スキンケアの徹底検証ブログとアイテム比較対決シリーズ一覧。',
      urlPath: '/blogs'
    });
  }, []);

  return (
    <div className="py-6 px-4 sm:px-6 space-y-10">
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 text-white p-6 sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>QUALIA BEAUTY BLOG</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            美肌を引き出す コスメ徹底検証ブログ
          </h1>
          <p className="text-sky-50 text-xs sm:text-sm font-medium leading-relaxed opacity-95">
            美容分析室の専門アナリストが、話題のスキンケア・デパコス・韓国コスメの使用感と効果を徹底レビュー。
          </p>
        </div>
      </div>

      {/* Featured Feature Blogs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-l-4 border-purple-500 pl-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>特集美肌ブログ記事</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_BLOG_POSTS.map((post) => {
            const author = AUTHOR_PROFILES.find((a) => a.id === post.authorId);
            return (
              <article
                key={post.id}
                onClick={() => onNavigate(`/blogs/${post.id}`)}
                className="qualia-glass-card rounded-3xl shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/9] bg-sky-50 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {post.introText}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-sky-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        referrerPolicy="no-referrer"
                        onError={handleImageError}
                        className="w-8 h-8 rounded-full border border-purple-400 object-cover"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        {post.authorName}
                      </span>
                    </div>

                    <span className="text-xs font-extrabold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      記事を読む ➔
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* VS Comparison Posts */}
      <div className="space-y-6 pt-6 border-t border-sky-100">
        <div className="flex items-center justify-between border-l-4 border-sky-500 pl-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">
            ⚔️ お悩み・目的別ガチンコ比較対決
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_COMPARISONS.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate(`/compare/${comp.id}`)}
              className="qualia-glass-card rounded-2xl p-6 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 font-bold text-xs rounded-full">
                  ターゲット: {comp.targetUserCategory}
                </span>
                <h3 className="font-extrabold text-slate-800 text-base leading-snug group-hover:text-purple-600 transition">
                  {comp.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {comp.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                <span>勝者と比較結果をみる</span>
                <span>➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
