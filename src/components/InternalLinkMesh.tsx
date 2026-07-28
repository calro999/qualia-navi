import React from 'react';
import { INITIAL_ARTICLES, INITIAL_BLOG_POSTS, INITIAL_COMPARISONS } from '../data';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';


const CoverImage = ({ src, alt, className, loading }: { src: string | string[], alt: string, className?: string, loading?: 'lazy' | 'eager' }) => {
  if (Array.isArray(src)) {
    return (
      <div className={`grid grid-cols-2 gap-0.5 w-full h-full bg-slate-100 ${className}`}>
        {src.map((url, i) => (
          <img key={i} src={url} alt={`${alt} ${i+1}`} className="w-full h-full object-cover" loading={loading} />
        ))}
      </div>
    );
  }
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className || ''}`} loading={loading} />;
};


interface InternalLinkMeshProps {
  currentArticleId: string;
  category: string;
}

export function InternalLinkMesh({ currentArticleId, category }: InternalLinkMeshProps) {
  // Get 4 random articles from same category
  const relatedArticles = INITIAL_ARTICLES
    .filter(a => a.category === category && a.id !== currentArticleId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  // Get 2 random features
  const relatedFeatures = INITIAL_BLOG_POSTS
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  // Get 1 random comparison
  const relatedComparison = INITIAL_COMPARISONS
    .sort(() => 0.5 - Math.random())
    .slice(0, 1);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="w-6 h-6 text-pink-500" />
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-400">
          あわせて読みたい注目アイテム
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {relatedArticles.map((article, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={article.id}
          >
            <a 
              href={`/articles/${article.id}`}
              className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-pink-500 bg-pink-50 dark:bg-pink-500/10 px-2 py-1 rounded-full mb-3 inline-block">
                    {article.categoryLabel}
                  </span>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-3 mb-2 group-hover:text-pink-500 transition-colors">
                    {article.title}
                  </h4>
                </div>
                <div className="flex items-center text-sm font-medium text-pink-500 mt-4">
                  詳細を見る <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Features */}
        {relatedFeatures.map((feature, idx) => (
          <a 
            key={`feat-${feature.id}`}
            href={`/features/${feature.id}`}
            className="col-span-1 block relative rounded-2xl overflow-hidden group shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20 z-10" />
            <CoverImage 
              src={feature.coverImage} 
              alt={feature.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
              <span className="text-xs font-bold text-white bg-purple-500 px-2 py-1 rounded-md mb-2 inline-block">
                特集記事
              </span>
              <h4 className="text-white font-bold line-clamp-2">{feature.title}</h4>
            </div>
          </a>
        ))}
        
        {/* Comparison */}
        {relatedComparison.map((comp) => (
          <a 
            key={`comp-${comp.id}`}
            href={`/compare/${comp.id}`}
            className="col-span-1 block relative rounded-2xl overflow-hidden group shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20 z-10" />
            <CoverImage 
              src={comp.coverImage || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600"} 
              alt={comp.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
              <span className="text-xs font-bold text-white bg-blue-500 px-2 py-1 rounded-md mb-2 inline-block">
                徹底比較
              </span>
              <h4 className="text-white font-bold line-clamp-2">{comp.title}</h4>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
