import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, Star } from 'lucide-react';

interface InternalLinkMeshProps {
  currentId: string;
  category: string;
  relatedArticles: any[]; // RakutenProductArticle
  relatedFeatures: any[]; // BlogPost
  relatedComparison: any; // Comparison
}

export function InternalLinkMesh({
  currentId,
  category,
  relatedArticles,
  relatedFeatures,
  relatedComparison
}: InternalLinkMeshProps) {
  const filteredArticles = relatedArticles
    .filter(a => a.id !== currentId && a.category === category)
    .slice(0, 4);

  if (filteredArticles.length === 0 && relatedFeatures.length === 0 && !relatedComparison) {
    return null;
  }

  return (
    <section 
      className="mt-12 p-6 sm:p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-rose-100 shadow-[0_8px_32px_rgba(225,29,72,0.05)] overflow-hidden relative"
      aria-labelledby="internal-links-title"
    >
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>

      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-rose-500" />
        <h2 id="internal-links-title" className="text-xl font-bold font-serif-brand text-slate-800">
          関連するおすすめ情報
        </h2>
      </div>

      <div className="space-y-8">
        {/* Related Articles */}
        {filteredArticles.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              同じカテゴリの注目アイテム
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredArticles.map(article => (
                <Link
                  key={article.id}
                  to={`/articles/${article.id}`}
                  className="group flex gap-4 p-3 rounded-2xl hover:bg-white/80 transition-all border border-transparent hover:border-rose-100"
                  aria-label={`${article.title}の詳細を読む`}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0">
                    <img
                      src={article.imageUrl}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-bold text-slate-600">{article.starRating.toFixed(1)}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-rose-600 transition-colors">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Features */}
        {relatedFeatures.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              関連する特集記事
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedFeatures.slice(0, 2).map(feature => (
                <Link
                  key={feature.id}
                  to={`/blogs/${feature.id}`}
                  className="group block p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-purple-50/30 border border-purple-100 hover:shadow-md transition-all"
                  aria-label={`${feature.title}の特集を読む`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-white rounded-lg shadow-sm text-purple-500">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                        {feature.title}
                      </h4>
                      <span className="text-xs text-purple-600 font-medium flex items-center gap-1">
                        特集を読む <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Comparison */}
        {relatedComparison && (
          <div>
            <h3 className="text-sm font-bold text-slate-500 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              徹底比較
            </h3>
            <Link
              to={`/comparisons/${relatedComparison.id}`}
              className="group block p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-100 hover:border-amber-200 transition-all"
              aria-label={`${relatedComparison.title}の比較を見る`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 bg-white text-amber-600 text-[10px] font-bold rounded mb-2 border border-amber-100">
                    VS 比較検証
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    {relatedComparison.title}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-amber-500 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
