import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, CheckCircle, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
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
              <Mail className="w-3.5 h-3.5" />
              <span>Contact & Inquiry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif-brand">
              お問い合わせ
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Qualia Naviに関するご質問、掲載内容へのご指摘・修正依頼、情報提供、タイアップ・広告掲載等のご相談は下記フォームよりお問い合わせください。
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-extrabold text-emerald-900">
                お問い合わせを受け付けました
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed max-w-md mx-auto">
                メッセージを送信いただきありがとうございます。内容を確認のうえ、担当者より原則3営業日以内にご連絡差し上げます。
              </p>
              <button
                onClick={() => onNavigate('/')}
                className="mt-4 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition cursor-pointer"
              >
                トップページに戻る
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  お名前（またはニックネーム） <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例：山田 太郎"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  メールアドレス <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="例：contact@example.com"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  お問い合わせ内容 <span className="text-rose-600">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="ご意見、記事の修正依頼、ご質問等をご記入ください。"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-extrabold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>送信する</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                ※ご送信いただいた個人情報は、プライバシーポリシーに基づき適切に管理いたします。
              </p>
            </form>
          )}
        </article>
      </div>
    </div>
  );
}
