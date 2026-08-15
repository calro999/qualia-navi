import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-rose-50/50">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-rose-100 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
              ✨
            </div>
            <h2 className="text-xl font-bold text-slate-800">Qualia Navi</h2>
            <p className="text-sm text-slate-600">
              ページの表示を再読み込みしています。
            </p>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="w-full py-3 px-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm rounded-xl shadow-md hover:from-rose-600 hover:to-pink-700 transition cursor-pointer"
            >
              トップページに戻る
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
