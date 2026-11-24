import React from 'react';
import { RakutenProductArticle } from '../types';
import { getMallLinks } from '../utils/productUtils';
import { ShoppingBag, ExternalLink, Calendar, Info, ShieldCheck } from 'lucide-react';

interface ThreeMallPriceBoxProps {
  article: Partial<RakutenProductArticle>;
  variant?: 'compact' | 'full';
  className?: string;
}

export function ThreeMallPriceBox({ article, variant = 'full', className = '' }: ThreeMallPriceBoxProps) {
  const mallLinks = getMallLinks(article);
  const checkDate = '2026年11月調査';
  const refPrice = article.rakutenPrice || (article as any)?.priceRange || 'オープン価格';

  if (variant === 'compact') {
    return (
      <div className={`p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 ${className}`}>
        <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2">
          <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-rose-600" />
            3モール価格・在庫比較
          </span>
          <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            確認日: {checkDate}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {mallLinks.ordered.map((m) => (
            <a
              key={m.mall}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition shadow-xs hover:opacity-95 ${m.buttonColor}`}
            >
              <span>{m.name}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90" />
            </a>
          ))}
        </div>

        <p className="text-[10px] text-slate-500 leading-normal">
          ※各モールの販売価格・送料・ポイント還元率はストアごとに異なります。送料・ポイント条件は各ショップページをご確認ください。
        </p>
      </div>
    );
  }

  return (
    <div className={`my-8 bg-gradient-to-b from-white to-slate-50/80 border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-slate-900 text-white font-extrabold text-xs rounded-full mb-1">
            主要3モール価格・在庫比較
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif-brand">
            {article.productName || article.title}
          </h3>
        </div>
        <div className="text-right sm:text-right shrink-0">
          <div className="text-xs text-slate-500 font-bold">参考参考価格</div>
          <div className="text-lg sm:text-xl font-black text-rose-600">{refPrice}</div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 justify-end">
            <Calendar className="w-3 h-3 text-slate-400" />
            価格確認日: {checkDate}
          </div>
        </div>
      </div>

      {/* モール価格比較ボタン（Yahooはアフィリ登録時のみ表示、Amazon・楽天は常時表示） */}
      <div className={`grid grid-cols-1 ${mallLinks.ordered.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
        {mallLinks.ordered.map((m) => (
          <div
            key={m.mall}
            className="flex flex-col justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs hover:border-slate-300 transition"
          >
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 text-sm">{m.name}</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {m.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {m.priceNote}
              </p>
            </div>

            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`w-full py-3 px-4 rounded-xl text-xs font-black text-center flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 shadow-xs ${m.buttonColor}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{m.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* 送料・ポイント条件・有利誤認防止の明記 */}
      <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3 text-[11px] text-slate-600 space-y-1">
        <div className="font-bold text-slate-800 flex items-center gap-1 text-[11px]">
          <Info className="w-3.5 h-3.5 text-rose-600" />
          <span>価格・送料・ポイント付与に関する重要事項（有利誤認防止）</span>
        </div>
        <p className="leading-relaxed">
          ※表記の参考価格は確認時点の各モール最安値または公式定価に基づく目安です。モール内の出店ストアにより実売価格、送料（無料ラインの有無）、ポイント還元率（キャンペーン適用条件）が大きく異なります。「実質最安値」をご検討の際は、送料・獲得予定ポイント・クーポンの適用有無を各ショップの詳細画面にて必ず比較・ご確認ください。
        </p>
      </div>
    </div>
  );
}
