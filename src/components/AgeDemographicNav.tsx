import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  UserCheck, 
  Flame, 
  Heart, 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  Tag, 
  Search,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface AgeDemographicNavProps {
  onNavigate: (path: string) => void;
  onFilterKeyword?: (keyword: string) => void;
}

interface DemographicCard {
  ageLabel: string;
  targetGenderLabel: string;
  badge: string;
  badgeColor: string;
  accentBorder: string;
  gradientBg: string;
  icon: React.ReactNode;
  title: string;
  targetDescription: string;
  problemHighlights: string[];
  articleSlug: string;
  articleCount: string;
  readTime: string;
}

const DEMOGRAPHIC_CARDS: DemographicCard[] = [
  {
    ageLabel: '10代・20代 女性',
    targetGenderLabel: '学生・Z世代女子・トレンド先取り',
    badge: '可愛い×バズり実力派',
    badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/60 dark:text-pink-200 border-pink-200',
    accentBorder: 'hover:border-pink-300 dark:hover:border-pink-700',
    gradientBg: 'from-pink-500/10 via-rose-500/5 to-transparent',
    icon: <Heart className="w-5 h-5 text-pink-500" />,
    title: 'かわいさ最強のサンリオコラボ×超実力派コスメでポーチを刷新！',
    targetDescription: '部活・通学やバイトで崩れやすいメイク、Tゾーンのテカリ、繰り返すポツポツニキビを徹底解決。持ってるだけでテンションの上がる可愛いパケやサンリオコラボコスメも大集結！',
    problemHighlights: ['サンリオ限定リップ＆ライナー', '前髪ベタつき＆皮脂吸着パウダー', 'VT CICA＆ドクダミ肌荒れ鎮静', 'Wonjungyo＆TIRTIR崩れないベース'],
    articleSlug: '10-20s-women-sanrio-trendy-cosmetics-guide',
    articleCount: '厳選11選',
    readTime: '読了 約5分'
  },
  {
    ageLabel: '10代・20代 男性',
    targetGenderLabel: '就活・新社会人・大学生男子',
    badge: '清潔感＝モテの絶対条件',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200 border-sky-200',
    accentBorder: 'hover:border-sky-300 dark:hover:border-sky-700',
    gradientBg: 'from-sky-500/10 via-blue-500/5 to-transparent',
    icon: <Flame className="w-5 h-5 text-sky-600" />,
    title: '汗のニオイ・ベタつき・ボサ髪を根絶！清潔感で無双するモテ必須コスメ',
    targetDescription: '身だしなみは社会人のエチケットでありモテるための最強の武器！女子ウケ抜群の爽やかな香り、頭皮アブラ洗浄、自然な青ひげカバー、サロン級ヘアセットを低予算で完全網羅。',
    problemHighlights: ['8×4制汗＆ギャツビー強力皮脂オフ', '原宿OCEANワックス＆REDENスカルプ', '塗ってる感ゼロのNULL BBクリーム', '女子ウケ最強SHIROサボンの香り'],
    articleSlug: '10-20s-men-grooming-etiquette-dating-must-haves',
    articleCount: '厳選11選',
    readTime: '読了 約5分'
  },
  {
    ageLabel: '30代 男性（実体験）',
    targetGenderLabel: '30代メンズ・老化への恐怖・初コスメ',
    badge: '低価格で老化恐怖を解決',
    badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 border-amber-200',
    accentBorder: 'hover:border-amber-300 dark:hover:border-amber-700',
    gradientBg: 'from-amber-500/10 via-orange-500/5 to-transparent',
    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
    title: '【実体験】カミソリ負け・乾燥・目元クマ・ほうれい線・抜け毛を救う楽天爆安メンズ美容',
    targetDescription: '「30代になって急激に老化が進んで怖い…」太いヒゲの流血、目の下のクマ、ほうれい線、抜け毛の恐怖を楽天APIから直撃した安くて大容量・高コスパアイテムで全身一撃解決したまとめ買い全記録！',
    problemHighlights: ['サクセス薬用ジェル＆貝印Xfitカミソリ', '500mlワンコイン全身保湿液', '120枚CICAアイマスク＆あずき温熱', 'RF温冷EMS美顔器＆薬用育毛トニック'],
    articleSlug: '30s-mens-anti-aging-budget-cosme-all-in-one',
    articleCount: '購入14品徹底解剖',
    readTime: '読了 約6分'
  },
  {
    ageLabel: '30代 男女（酒・二日酔い対策）',
    targetGenderLabel: '働く30代・飲み会多め・初期エイジング',
    badge: '大人コスメ×プチプラ50:50',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 border-emerald-200',
    accentBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    gradientBg: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    icon: <UserCheck className="w-5 h-5 text-emerald-600" />,
    title: '老化加速＆お酒ダメージを同時攻略！大人コスメ×高コスパプチプラで立て直す処方箋',
    targetDescription: '飲み会や二日酔いで翌朝の肌がボロボロ、顔がパンパンに浮腫む…お酒による脱水・酸化ストレスを内と外からWブロック！デパコス級先行美容液と神プチプラを賢く使い分ける大人の新習慣。',
    problemHighlights: ['ヘパリーゼW箱買い＆クエン酸レモン', 'コスメデコルテ リポソーム美肌カプセル', 'タカミスキンピールで角質ケア', 'メラノCCプレミアム＆ファンケルマイクレ'],
    articleSlug: '30s-unisex-aging-alcohol-recovery-skincare',
    articleCount: '厳選11選',
    readTime: '読了 約5分'
  },
  {
    ageLabel: '40代 男女',
    targetGenderLabel: '本格エイジングケア・シワたるみ改善',
    badge: 'プチプラ3：デパコス7の黄金比',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border-purple-200',
    accentBorder: 'hover:border-purple-300 dark:hover:border-purple-700',
    gradientBg: 'from-purple-500/10 via-indigo-500/5 to-transparent',
    icon: <Sparkles className="w-5 h-5 text-purple-600" />,
    title: '深いシワ・たるみ・頑固なシミを本気で叩く！資生堂・SK-II・POLA最高峰エイジングケア',
    targetDescription: 'もう失敗できない40代の年齢肌を医学的エビデンスで押し戻す！百貨店店頭で買うより楽天公式でポイント10〜20倍還元＋限定セットを狙う方が圧倒的にお得な理由を完全力説。',
    problemHighlights: ['資生堂エリクシール純粋レチノール', 'POLAリンクルショット真皮修復', 'SK-IIピテラ90%エッセンス＆HAKU', '極潤ハリ化粧水でジャブジャブ土台作り'],
    articleSlug: '40s-anti-aging-depacos7-petit3-golden-ratio',
    articleCount: '厳選10選',
    readTime: '読了 約6分'
  },
  {
    ageLabel: '50代・60代 男女',
    targetGenderLabel: 'シニア世代・更年期・手足の冷え・薄毛',
    badge: 'プチプラ8：デパコス2で全身解決',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 border-rose-200',
    accentBorder: 'hover:border-rose-300 dark:hover:border-rose-700',
    gradientBg: 'from-rose-500/10 via-orange-500/5 to-transparent',
    icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
    title: '手足の冷え・頑固な乾燥・薄毛・更年期の不調を救う！1ページで全身の悩みを根本解決',
    targetDescription: '「もう歳だから…」と諦めるのはまだ早い！手足の芯からの冷え、ひび割れ粉吹き、分け目の透け見え、手指のこわばりまで、生活改善グッズと確固たるブランド技術で即効レスキュー。',
    problemHighlights: ['まるでこたつソックス＆ツムラ当帰芍薬散', '50の恵養潤液＆ユースキン大容量ポンプ', 'サクセス炭酸トニック＆大塚製薬エクエル', 'アスタリフト自己復元ナノジェリー'],
    articleSlug: '50-60s-senior-full-body-rescue-petit8-depacos2',
    articleCount: '厳選10選',
    readTime: '読了 約6分'
  }
];

const COMMON_CONCERNS = [
  { label: '🔥 カミソリ負け・青ひげ', slug: '30s-mens-anti-aging-budget-cosme-all-in-one' },
  { label: '✨ サンリオ・可愛いコスメ', slug: '10-20s-women-sanrio-trendy-cosmetics-guide' },
  { label: '💼 モテるメンズ身だしなみ', slug: '10-20s-men-grooming-etiquette-dating-must-haves' },
  { label: '🍻 飲み会・二日酔い・くすみ', slug: '30s-unisex-aging-alcohol-recovery-skincare' },
  { label: '💎 シワ改善・レチノール・POLA', slug: '40s-anti-aging-depacos7-petit3-golden-ratio' },
  { label: '🧦 手足の冷え・更年期・育毛', slug: '50-60s-senior-full-body-rescue-petit8-depacos2' }
];

export const AgeDemographicNav: React.FC<AgeDemographicNavProps> = ({ onNavigate }) => {
  return (
    <section 
      id="demographic-navigator" 
      aria-label="年代別お悩み別ナビゲーション"
      className="my-10 rounded-3xl border border-rose-200/80 dark:border-rose-950 bg-gradient-to-b from-rose-50/40 via-white to-stone-50/50 dark:from-stone-900/90 dark:via-stone-900/60 dark:to-stone-950 p-6 sm:p-8 shadow-sm transition-all"
    >
      {/* セクションヘッダー */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 pb-6 border-b border-rose-100 dark:border-stone-800">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>迷わず見つかる！年代・目的別パーソナルナビ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight leading-snug font-serif-brand">
            年代別のリアルなお悩み・解決策はこちらから！
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
            10代〜20代のニキビ・モテエチケットから、30代の老化恐怖・二日酔い、40代の深いシワたるみ、50・60代の冷え・更年期・薄毛まで。
            「今の自分にドンピシャな記事」がひと目で分かるよう、世代ごとの切実な悩みと楽天API直撃アイテムを完全整理しました。
          </p>
        </div>

        {/* 診断誘導ショートカット */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
          <a
            href="#diagnosis-widget"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-extrabold text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 shadow-2xs transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>迷ったら30秒診断へ</span>
          </a>
          <button
            onClick={() => onNavigate('/features')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs font-black text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/80 shadow-2xs transition-all cursor-pointer"
          >
            <span>全特集ブログ一覧（320+本）</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* クイックお悩みアンカーピル */}
      <div className="mb-6 pb-4 border-b border-stone-100 dark:border-stone-800/80">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 shrink-0 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-rose-500" />
            お悩みから直行:
          </span>
          {COMMON_CONCERNS.map((c) => (
            <button
              key={c.slug}
              onClick={() => onNavigate(`/blog/${c.slug}`)}
              className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:border-rose-400 hover:text-rose-600 transition cursor-pointer shadow-2xs"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 年代別カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEMOGRAPHIC_CARDS.map((card) => (
          <div
            key={card.articleSlug}
            onClick={() => onNavigate(`/blog/${card.articleSlug}`)}
            className={`group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/90 p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden ${card.accentBorder}`}
          >
            {/* 上部グラデーションアクセントバー */}
            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.gradientBg}`} />

            <div className="space-y-3">
              {/* 年代バッジ＆アイテム数＆読了時間 */}
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black border ${card.badgeColor}`}>
                  {card.icon}
                  <span>{card.ageLabel}</span>
                </span>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400">
                  <span className="bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md">
                    {card.articleCount}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-0.5 text-stone-400">
                    <Clock className="w-3 h-3" />
                    {card.readTime}
                  </span>
                </div>
              </div>

              {/* ターゲット属性ラベル */}
              <p className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400">
                🎯 {card.targetGenderLabel}
              </p>

              {/* タイトル */}
              <h3 className="text-base font-black text-stone-900 dark:text-white leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors font-serif-brand">
                {card.title}
              </h3>

              {/* ターゲット概要説明 */}
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                {card.targetDescription}
              </p>

              {/* 解決アイテムハイライト */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-1.5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 dark:text-stone-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  主な解決アイテム・成分:
                </p>
                <div className="flex flex-wrap gap-1">
                  {card.problemHighlights.map((hl, i) => (
                    <span
                      key={i}
                      className="inline-block text-[11px] font-medium text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/80 border border-stone-200/70 dark:border-stone-700/70 px-2 py-0.5 rounded-md"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 下部アクションボタン */}
            <div className="mt-5 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-black text-rose-600 dark:text-rose-400 group-hover:translate-x-0.5 transition-transform">
              <span className="flex items-center gap-1">
                <span>この年代の特集記事を読む</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-rose-50 dark:bg-rose-950 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
