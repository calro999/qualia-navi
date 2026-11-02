import React, { useEffect } from 'react';
import { Home, Search, BookOpen, Swords, Map as MapIcon, ArrowLeft } from 'lucide-react';
import { updateSeoGeoMetadata } from '../utils/seoGeo';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  useEffect(() => {
    updateSeoGeoMetadata({
      title: '404 ページが見つかりませんでした | Qualia Navi (クオリア・ナビ)',
      description: 'お探しのページは移動または削除された可能性があります。Qualia Naviのコスメ図鑑・特集記事・比較検証からおすすめコスメをお探しください。',
      urlPath: '/404',
      jsonLdSchema: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '404 Not Found',
        description: 'Page not found on Qualia Navi'
      }
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
      <div className="qualia-glass-card rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-sm space-y-6">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto text-2xl font-black shadow-xs">
          404
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-brand">
            ページが見つかりませんでした
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            アクセスされたURLは変更されたか、現在公開されていない可能性があります。<br />
            下記の主要ナビゲーションより気になるコスメ情報をお探しください。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-4 text-left">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 p-3.5 bg-rose-50/80 hover:bg-rose-100 text-rose-800 rounded-2xl transition border border-rose-200 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">コスメ図鑑トップ</p>
              <p className="text-[10px] text-rose-600">3,500件超の最新検証データ</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('/features')}
            className="flex items-center gap-3 p-3.5 bg-pink-50/80 hover:bg-pink-100 text-pink-800 rounded-2xl transition border border-pink-200 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">美肌＆コスメ特集</p>
              <p className="text-[10px] text-pink-600">厳選10選・シーズン特集記事</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('/comparisons')}
            className="flex items-center gap-3 p-3.5 bg-purple-50/80 hover:bg-purple-100 text-purple-800 rounded-2xl transition border border-purple-200 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">VS対決・徹底比較</p>
              <p className="text-[10px] text-purple-600">人気コスメの2大決戦</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('/sitemap')}
            className="flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-2xl transition border border-slate-200 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <MapIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold">サイトマップ</p>
              <p className="text-[10px] text-slate-600">全記事・特集インデックス</p>
            </div>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rose-600 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ホームへ戻る</span>
          </button>
        </div>
      </div>
    </div>
  );
}
