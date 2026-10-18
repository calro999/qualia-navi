import React, { useState } from 'react';
import { X, Calendar, Gift, Zap, Sparkles, ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';

interface RakutenPointCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SaleEvent {
  title: string;
  badge: string;
  rate: string;
  dates: string;
  description: string;
  tip: string;
  color: string;
  icon: string;
  link: string;
}

export function RakutenPointCalendarModal({ isOpen, onClose }: RakutenPointCalendarModalProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(() => {
    const m = new Date().getMonth() + 1;
    return m >= 10 || m === 1 ? m : 10;
  });

  if (!isOpen) return null;

  const eventsByMonth: Record<number, SaleEvent[]> = {
    10: [
      {
        title: '5と0のつく日（楽天カード決済限定）',
        badge: '定期開催',
        rate: 'ポイント最大4倍',
        dates: '10月5日, 10日, 15日, 20日, 25日, 30日',
        description: '楽天カードをお持ちならエントリー必須！対象日に決済するだけでポイント倍率が跳ね上がります。',
        tip: 'カゴに入れておいて対象日の0:00以降に購入するのが鉄則です。',
        color: 'from-rose-500 to-pink-600',
        icon: '💳',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fcard%2Fpointday%2F'
      },
      {
        title: 'お買い物マラソン（秋の買い回り特大号）',
        badge: '特大セール',
        rate: '最大46倍',
        dates: '10月上旬・中旬・下旬（各月2回開催）',
        description: '1,000円(税込)以上のショップ買い回りでポイントが最大10倍＋各ショップ個別還元＋SPUで最大46倍！',
        tip: 'コスメのまとめ買いやシートマスク・消耗品のストックに最適。',
        color: 'from-amber-500 to-rose-500',
        icon: '🏃‍♀️',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fpoint-up%2Fmarathon%2F'
      },
      {
        title: 'ご愛顧感謝デー（いちばの日）',
        badge: '会員限定',
        rate: '最大4倍',
        dates: '10月18日',
        description: 'ダイヤモンド会員ならポイント4倍、プラチナ会員なら3倍！保有ポイントで支払ってもポイント対象。',
        tip: '貯まった楽天ポイントを使ってお得にコスメを買いたい日はこの日一択。',
        color: 'from-purple-600 to-indigo-600',
        icon: '💎',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fpoint-up%2Fthankyou%2F'
      }
    ],
    11: [
      {
        title: '楽天ブラックフライデー（Black Friday）',
        badge: '11月目玉',
        rate: '最大46倍',
        dates: '11月下旬（ブラックフライデー週）',
        description: '年に一度の世界的ビッグセール！クリスマスコフレや限定コスメキット、デパコスのクーポンが大量配布。',
        tip: '予約限定コフレや人気アイシャドウパレットは初日スタートダッシュで完売注意！',
        color: 'from-slate-900 to-rose-950',
        icon: '🖤',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fpoint-up%2Fblackfriday%2F'
      },
      {
        title: '5と0のつく日（ホリデー直前版）',
        badge: '定期開催',
        rate: 'ポイント最大4倍',
        dates: '11月5日, 10日, 15日, 20日, 25日, 30日',
        description: 'ブラックフライデーやお買い物マラソンと重なる日（例：11月20日や25日）は還元率が天文学的に跳ね上がります。',
        tip: 'セール期間中の5または0のつく日を狙い撃ちして決済しましょう。',
        color: 'from-rose-500 to-pink-600',
        icon: '💳',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fcard%2Fpointday%2F'
      },
      {
        title: 'ワンダフルデー（月初限定）',
        badge: '月初限定',
        rate: 'ポイント3倍',
        dates: '11月1日 00:00〜23:59',
        description: '全ショップ対象で3,000円(税込)以上のお買い物でポイント3倍＋リピート購入ならポイント2倍。',
        tip: '11月発売の新作コスメや冬用スキンケアの最速ゲットに。',
        color: 'from-red-600 to-amber-600',
        icon: '🎉',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fpoint-up%2Fwonderfulday%2F'
      }
    ],
    12: [
      {
        title: '楽天スーパーSALE（年末最大級）',
        badge: '年内最大',
        rate: '半額以下＋最大46倍',
        dates: '12月4日 20:00 〜 12月11日 01:59',
        description: '3ヶ月に一度の超特大お祭り！高級美顔器や高機能ドライヤー、年間ベスコス受賞スキンケアの目玉割引が連発。',
        tip: '冬のボーナスでの高額家電・自分へのご褒美コスメの買い回りはここが年間ベスト！',
        color: 'from-red-600 via-rose-600 to-pink-600',
        icon: '🏆',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fsupersale%2F'
      },
      {
        title: '楽天大感謝祭（年内ラストセール）',
        badge: '年末総決算',
        rate: '最大46倍',
        dates: '12月19日前後 〜 12月26日前後',
        description: '年内最後のお買い物マラソン形式セール！クリスマスプレゼントの駆け込みや年末年始のストック買いに。',
        tip: 'ふるさと納税や年越し美容アイテムとまとめてショップ買い回りを達成するのがお得。',
        color: 'from-purple-700 to-rose-600',
        icon: '🎁',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fpoint-up%2Fthanks%2F'
      },
      {
        title: '5と0のつく日（クリスマス・年末版）',
        badge: '定期開催',
        rate: 'ポイント最大4倍',
        dates: '12月5日, 10日, 15日, 20日, 25日, 30日',
        description: '12月10日（スーパーSALE中）や12月20日・25日は年内屈指のビッグポイント還元日！',
        tip: 'クリスマス直前の20日はギフト購入のラストチャンス。',
        color: 'from-rose-500 to-pink-600',
        icon: '💳',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fcard%2Fpointday%2F'
      }
    ],
    1: [
      {
        title: '新春超ポイントバック祭 ＆ 初売り福袋',
        badge: '新春特大',
        rate: '最大41倍',
        dates: '1月1日 00:00 〜 1月3日 23:59',
        description: '新年最初の初売り！購入合計金額に応じてポイント倍率がアップする「ポイントバック祭」とコスメ福袋が同時解禁。',
        tip: '高額なスキンケアセットや韓国コスメ豪華福袋はこの3日間で狙うのが最適。',
        color: 'from-red-600 via-amber-600 to-rose-600',
        icon: '🎍',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fpoint-up%2Fpointback%2F'
      },
      {
        title: '新春お買い物マラソン',
        badge: '新春セール',
        rate: '最大46倍',
        dates: '1月中旬（1月9日前後スタート）',
        description: '仕事始め後の新春マラソン！真冬の乾燥対策（ハンドクリーム、バーム、重炭酸入浴剤）のまとめ買いに。',
        tip: '新春クーポンが各公式ショップから大量配布されます。',
        color: 'from-sky-700 to-indigo-700',
        icon: '🏃‍♀️',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fpoint-up%2Fmarathon%2F'
      },
      {
        title: '5と0のつく日（新春初買い版）',
        badge: '定期開催',
        rate: 'ポイント最大4倍',
        dates: '1月5日, 10日, 15日, 20日, 25日, 30日',
        description: '初売りやマラソン期間中の5日・10日・15日・20日はポイントが最も貯まるゴールデンデー。',
        tip: 'エントリーボタンを押してから購入しましょう。',
        color: 'from-rose-500 to-pink-600',
        icon: '💳',
        link: 'https://hb.afl.rakuten.co.jp/hgc/18260b9c.64254bb2.18260b9d.2831aeaa/?pc=https%3A%2F%2Fevent.rakuten.co.jp%2Fcampaign%2Fcard%2Fpointday%2F'
      }
    ]
  };

  const currentEvents = eventsByMonth[selectedMonth] || eventsByMonth[10];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-100 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>RAKUTEN POINT & SALE CALENDAR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-serif-brand">
            楽天市場 おトク日・ポイント最大還元カレンダー
          </h2>
          <p className="text-xs text-rose-100/90 mt-1">
            コスメをお得に買うならどのタイミングが最強？10月〜1月のセール日程と賢い買い方をプロが伝授。
          </p>

          {/* Month Tabs */}
          <div className="grid grid-cols-4 gap-2 mt-4 bg-white/10 p-1.5 rounded-2xl">
            {[10, 11, 12, 1].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                  selectedMonth === m
                    ? 'bg-white text-rose-700 shadow-md scale-[1.02]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {m}月カレンダー
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 bg-slate-50 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-600" />
              <span>{selectedMonth}月の注目セール・ポイントアップ日程</span>
            </span>
            <span className="text-[11px] font-bold text-rose-600">
              ※全キャンペーンは要エントリー
            </span>
          </div>

          <div className="space-y-3.5">
            {currentEvents.map((evt, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3 hover:border-rose-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{evt.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 font-serif-brand">
                          {evt.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-100 shrink-0">
                          {evt.badge}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-rose-600 mt-0.5">
                        開催目安: {evt.dates}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 font-black text-xs rounded-full shrink-0 shadow-2xs">
                    {evt.rate}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>

                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 flex items-start gap-2 text-[11px] font-bold text-amber-900">
                  <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>攻略法: {evt.tip}</span>
                </div>

                <div className="pt-1 flex justify-end">
                  <a
                    href={evt.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-600 hover:text-rose-700 hover:underline"
                  >
                    <span>楽天市場公式キャンペーン詳細・エントリー ↗</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Checklist */}
          <div className="bg-white rounded-2xl p-4 border border-rose-200 space-y-2">
            <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>失敗しない！コスメ購入前の3大チェックポイント</span>
            </h4>
            <ul className="text-[11px] text-slate-600 space-y-1 pl-5 list-disc font-medium">
              <li>購入ボタンを押す前に、該当キャンペーンの「エントリーボタン」を押したか確認</li>
              <li>楽天カード決済で「5と0のつく日」に買えば、通常より＋2倍以上お得</li>
              <li>「ショップ個別クーポン（300円OFF〜1,000円OFF等）」が商品ページに出ていないか確認</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            ※日程や倍率は楽天市場公式のアナウンスに基づきます。
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
