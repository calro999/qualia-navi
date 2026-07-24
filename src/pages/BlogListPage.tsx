import React from 'react';
import { INITIAL_BLOG_POSTS, INITIAL_COMPARISONS } from '../data';
import { handleImageError } from '../utils/imageHelper';
import { updateSeoGeoMetadata } from '../utils/seoGeo';
import { Sparkles, BookOpen } from 'lucide-react';

interface BlogListPageProps {
  onNavigate: (path: string) => void;
}

export function BlogListPage({ onNavigate }: BlogListPageProps) {
  React.useEffect(() => {
    updateSeoGeoMetadata({
      title: '美肌＆デパコス徹底検証研究ブログ | Qualia Navi',
      description: 'Qualia 美容分析室による最新コスメ・スキンケアの徹底検証ブログとアイテム比較対決シリーズ一覧。',
      urlPath: '/blogs'
    });
  }, []);

  return (
    <div className="py-6 px-4 sm:px-6 space-y-12">
      {/* Header Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-amber-500/30 shadow-2xl space-y-4">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-300 font-serif-brand">
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUALIA BEAUTY & SKINCARE RESEARCH BLOG</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight font-serif-brand qualia-gold-text">
            美肌を引き出す デパコス＆美容徹底研究
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
            Qualia 美容分析室のアナリスト陣（12名）が、最新スキンケア・成分解析・UV紫外線プロテクト・韓国コスメの使用感を圧倒的な長文＆実機テストで検証。
          </p>
        </div>
      </div>

      {/* Featured Feature Blogs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-l-4 border-amber-400 pl-4">
          <h2 className="text-xl font-bold font-serif-brand text-amber-200 flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>SEO徹底強化・完全美肌検証ブログ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {INITIAL_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => onNavigate(`/blogs/${post.id}`)}
              className="qualia-glass-card rounded-3xl shadow-xl hover:border-amber-400/60 transition-all duration-300 overflow-hidden flex flex-col md:flex-row cursor-pointer group border border-amber-500/20"
            >
              {/* Cover Image */}
              <div className="relative md:w-1/2 aspect-[16/9] md:aspect-auto bg-slate-950 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="p-8 md:w-1/2 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30">
                    読了時間: 約{post.readTimeMinutes}分 ・ 完全保存版
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors leading-snug font-serif-brand">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 font-light">
                    {post.introText}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-9 h-9 rounded-xl border border-amber-400 object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-amber-200 block">
                        {post.authorName}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{post.authorRole}</span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-amber-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    長文記事を読む ➔
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* VS Comparison Posts */}
      <div className="space-y-6 pt-8 border-t border-amber-500/20">
        <div className="flex items-center justify-between border-l-4 border-amber-400 pl-4">
          <h2 className="text-xl font-bold font-serif-brand text-amber-200">
            ⚔️ お悩み別・デパコス vs 韓国コスメ ガチンコ比較
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_COMPARISONS.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onNavigate(`/compare/${comp.id}`)}
              className="qualia-glass-card rounded-3xl p-6 shadow-xl hover:border-amber-400/60 transition cursor-pointer flex flex-col justify-between group space-y-4 border border-amber-500/20"
            >
              <div className="space-y-2">
                <span className="inline-block px-3 py-0.5 qualia-gold-gradient text-slate-950 font-black text-xs rounded-md">
                  {comp.targetUserCategory}
                </span>
                <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-amber-300 transition font-serif-brand">
                  {comp.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                  {comp.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>VS勝者と比較検証をみる</span>
                <span>➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
