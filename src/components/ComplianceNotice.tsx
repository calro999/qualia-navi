import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface ComplianceNoticeProps {
  className?: string;
}

export function ComplianceNotice({ className = '' }: ComplianceNoticeProps) {
  return (
    <div className={`bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-[11px] leading-relaxed text-slate-500 space-y-2 ${className}`}>
      <div className="flex items-center gap-1.5 font-bold text-slate-700">
        <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
        <span>記事の執筆方針・薬機法および景品表示法に関する開示</span>
      </div>
      <p>
        当サイト（Qualia Navi）に掲載しているコスメおよび美容アイテムのレビューは、専属アナリストによる実地テストや成分調査に基づき独自に作成した客観的情報です。
      </p>
      <ul className="list-disc pl-4 space-y-1 text-slate-500">
        <li>
          <span className="font-semibold text-slate-600">薬機法（医薬品医療機器等法）への配慮：</span>
          効果・効能に関する表現は、化粧品・医薬部外品それぞれの承認範囲および使用者の個人の感想に基づいています。効果を保証するものではありません。
        </li>
        <li>
          <span className="font-semibold text-slate-600">景品表示法（ステルスマーケティング規制）への対応：</span>
          当サイトは楽天市場アフィリエイトプログラムに参加しており、適格販売により紹介手数料を得る場合があります。記事内のリンクから各商品を購入された場合でも、購入者様の支払金額が増えることは一切ありません。
        </li>
        <li>
          <span className="font-semibold text-slate-600">価格・在庫情報の変動：</span>
          掲載価格やポイント還元率は記事作成・更新時点の調査に基づく参考情報です。最新の正確な価格・在庫状況はリンク先の各楽天市場店舗にてご確認ください。
        </li>
      </ul>
    </div>
  );
}
