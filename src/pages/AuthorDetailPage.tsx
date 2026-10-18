import React, { useMemo } from 'react';
import { AUTHOR_PROFILES, INITIAL_ARTICLES, INITIAL_BLOG_POSTS } from '../data';
import { updateSeoGeoMetadata, generateAuthorJsonLd } from '../utils/seoGeo';
import { getRakutenOptimizedImageUrl, handleImageError } from '../utils/imageHelper';
import { deduplicateArticles } from '../utils/productUtils';
import { Award, CheckCircle, Sparkles, ArrowLeft, BookOpen, ShoppingBag, Star, ArrowRight } from 'lucide-react';

interface AuthorDetailPageProps {
  authorId: string;
  onNavigate: (path: string) => void;
}

export function AuthorDetailPage({ authorId, onNavigate }: AuthorDetailPageProps) {
  const author = AUTHOR_PROFILES.find((a) => a.id === authorId);

  React.useEffect(() => {
    if (author) {
      const jsonLd = generateAuthorJsonLd(author, window.location.origin);
      updateSeoGeoMetadata({
        title: `${author.name} (${author.role}) プロフィール・担当検証記事 | Qualia 美容分析室`,
        description: author.bio,
        imageUrl: author.avatarUrl,
        urlPath: `/authors/${author.id}`,
        jsonLdSchema: jsonLd
      });
    }
  }, [author]);

  const authoredBlogs = useMemo(() => {
    if (!author) return [];
    return INITIAL_BLOG_POSTS.filter(
      (b) => b.authorId === author.id || b.authorName === author.name
    ).slice(0, 8);
  }, [author]);

  const authoredProducts = useMemo(() => {
    if (!author) return [];
    const matched = INITIAL_ARTICLES.filter(
      (a) =>
        !(a as any).isContentArticle &&
        !a.id.includes('10sen') &&
        (a.reviewerName === author.name || (a as any).author === author.name)
    );
    return deduplicateArticles(matched).slice(0, 12);
  }, [author]);

  if (!author) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center qualia-glass-card rounded-3xl space-y-4 my-8 border border-rose-100">
        <h2 className="text-xl font-bold text-slate-800 font-serif-brand">
          指定されたメンバープロフィールが見つかりませんでした。
        </h2>
        <button
          onClick={() => onNavigate('/authors')}
          className="gold-btn px-6 py-2.5 rounded-xl transition cursor-pointer"
        >
          メンバー一覧へ戻る
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/authors')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer"
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
                {author.collectionCount ? ` ・ ${author.collectionCount}` : ''}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">{author.bio}</p>
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

          {/* Authored Feature Articles */}
          {authoredBlogs.length > 0 && (
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-serif-brand">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>{author.name}が執筆・監修した特集記事</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {authoredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => onNavigate(`/features/${blog.id}`)}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-rose-300 shadow-2xs flex items-center gap-3 cursor-pointer group transition"
                  >
                    <img
                      src={Array.isArray(blog.coverImage) ? blog.coverImage[0] : blog.coverImage}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-16 h-16 rounded-xl object-contain bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 line-clamp-2 font-serif-brand">
                        {blog.title}
                      </h3>
                      <span className="text-[10px] text-rose-600 font-extrabold inline-flex items-center gap-0.5 mt-1">
                        <span>記事を読む</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Authored Product Reviews */}
          {authoredProducts.length > 0 && (
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-serif-brand">
                <ShoppingBag className="w-4 h-4 text-rose-600" />
                <span>{author.name}が実地検証した注目コスメ</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {authoredProducts.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onNavigate(`/articles/${art.id}`)}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-rose-300 shadow-2xs flex flex-col justify-between cursor-pointer group transition"
                  >
                    <div>
                      <div className="aspect-square max-h-28 mx-auto bg-slate-50 rounded-xl p-2 flex items-center justify-center mb-2 border border-slate-100">
                        <img
                          src={getRakutenOptimizedImageUrl(art.imageUrl)}
                          alt={art.productName || art.title}
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 line-clamp-2 font-serif-brand">
                        {art.productName || art.title}
                      </h3>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-black text-amber-500 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {(art.starRating || 4.8).toFixed(1)}
                      </span>
                      <span className="font-extrabold text-rose-600">{art.rakutenPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
