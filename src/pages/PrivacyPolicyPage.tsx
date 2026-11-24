import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>トップページへ戻る</span>
        </button>

        <article className="qualia-glass-card rounded-3xl p-6 sm:p-10 space-y-8 border border-rose-100">
          <div className="space-y-3 border-b border-rose-100 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-extrabold">
              <Shield className="w-3.5 h-3.5" />
              <span>コンプライアンス＆プライバシー保護方針</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-brand">
              プライバシーポリシー
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              制定日：2026年4月1日 / 最終改定日：2026年11月25日
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-5 bg-rose-600 rounded-full" />
                1. 個人情報の収集・利用目的
              </h2>
              <p>
                Qualia Navi（以下、「当サイト」）では、お問い合わせやご意見・ご要望をいただく際、お名前（またはニックネーム）、メールアドレス等の個人情報をご入力いただく場合があります。取得した個人情報は、ご質問に対する回答や必要な情報を電子メールなどでご連絡する場合にのみ利用し、これらの目的以外では利用いたしません。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-5 bg-rose-600 rounded-full" />
                2. 広告配信およびアフィリエイトプログラムについて
              </h2>
              <p>
                当サイトは、以下の各種アフィリエイトプログラムに参加しており、適格販売により紹介手数料等の収入を得ています。
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li><strong>楽天アフィリエイトプログラム：</strong>当サイトは、楽天グループ株式会社が提供するアフィリエイトプログラムに参加しています。</li>
                <li><strong>Amazonアソシエイト・プログラム：</strong>当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。</li>
                <li><strong>Yahoo!ショッピング（バリューコマース等）：</strong>当サイトは、LINEヤフー株式会社および提携ASPが提供するアフィリエイトリンクを設置しています。</li>
              </ul>
              <p className="text-xs text-slate-500">
                第三者配信事業者は、利用者の興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名、住所、メールアドレス、電話番号は含まれません）を使用することがあります。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-5 bg-rose-600 rounded-full" />
                3. アクセス解析ツールについて
              </h2>
              <p>
                当サイトでは、サイトの利用状況を把握しコンテンツ改善を図るため、Vercel Analytics等のアクセス解析ツールを使用しています。これらはトラフィックデータの収集のためにCookieを使用していますが、データは匿名で収集されており個人を特定するものではありません。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-5 bg-rose-600 rounded-full" />
                4. 免責事項・価格及び効能表記について
              </h2>
              <p>
                当サイトに掲載されている商品情報、価格、在庫状況、送料、ポイント倍率等は、各調査時点の公開データに基づいております。最新かつ正確な販売条件は、リンク先である楽天市場・Amazon・Yahoo!ショッピング等の各販売店ページにてご確認ください。当サイトの情報を利用したことによって生じたいかなる損害についても、当サイト運営者は一切の責任を負いかねます。
              </p>
              <p>
                化粧品・美容アイテムの解説・レビューにおける効能効果の表現は、医薬品医療機器等法（薬機法）に基づく化粧品の効能範囲56項目の範囲を遵守しております。個人の使用感には個人差があり、効果効能を保証するものではありません。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-5 bg-rose-600 rounded-full" />
                5. お問い合わせ窓口
              </h2>
              <p>
                個人情報の取り扱いに関するご質問、削除要請、または当サイトへのご意見は、
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-rose-600 font-bold underline hover:text-rose-800 mx-1 cursor-pointer"
                >
                  お問い合わせページ
                </button>
                よりご連絡ください。
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
