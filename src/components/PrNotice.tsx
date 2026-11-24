import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { ShieldCheck, Info } from 'lucide-react';

export function PrNotice({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-rose-50/90 border border-rose-200/80 rounded-xl p-3 text-xs text-slate-700 leading-relaxed shadow-xs ${className}`}>
      <div className="flex items-start gap-2">
        <span className="shrink-0 font-black text-white bg-rose-600 text-[10px] px-2 py-0.5 rounded-md tracking-wider">
          PR
        </span>
        <div className="space-y-1">
          <p className="font-bold text-slate-900 text-[11px] sm:text-xs">
            本記事はプロモーションを含みます
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-600 leading-normal">
            当サイトは楽天市場アソシエイト、Amazonアソシエイト、Yahoo!ショッピング等のアフィリエイトプログラムに参加しており、適格販売により収入を得ています。掲載価格・ポイント条件・送料等は調査日時点のものであり、各販売店にて変動します。
          </p>
        </div>
      </div>
    </div>
  );
}
