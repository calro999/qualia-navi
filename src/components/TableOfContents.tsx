import { useState, useMemo } from 'react';
import { ListOrdered, ChevronDown, ChevronUp } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const tocItems = useMemo(() => {
    if (!content) return [];
    const lines = content.split('\n');
    const items: TocItem[] = [];
    let count = 0;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
        const text = trimmed.replace(/^##\s+/, '').replace(/[*_`#]/g, '').trim();
        if (text) {
          count++;
          const id = `toc-heading-${count}`;
          items.push({ id, text, level: 2 });
        }
      } else if (trimmed.startsWith('### ')) {
        const text = trimmed.replace(/^###\s+/, '').replace(/[*_`#]/g, '').trim();
        if (text) {
          count++;
          const id = `toc-heading-${count}`;
          items.push({ id, text, level: 3 });
        }
      }
    }
    return items;
  }, [content]);

  if (tocItems.length < 2) return null;

  const scrollToHeading = (text: string) => {
    // ページ内の見出し要素を検索
    const headings = Array.from(document.querySelectorAll('h2, h3, h4'));
    const target = headings.find((h) => h.textContent?.includes(text.slice(0, 15)));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-50/60 to-pink-50/40 rounded-2xl p-5 border border-rose-200/80 shadow-xs my-6">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base font-serif-brand">
          <ListOrdered className="w-4 h-4 text-rose-600" />
          <span>目次 (タップでスキップ)</span>
          <span className="text-xs bg-rose-200/70 text-rose-800 px-2 py-0.5 rounded-full font-sans">
            {tocItems.length}項目
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 p-1">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <ul className="mt-4 space-y-2 text-xs sm:text-sm border-t border-rose-100 pt-3">
          {tocItems.map((item, idx) => (
            <li
              key={idx}
              className={`${
                item.level === 3 ? 'pl-4 text-slate-600' : 'text-slate-800 font-semibold'
              } flex items-start gap-1.5 hover:text-rose-600 transition-colors cursor-pointer group`}
              onClick={() => scrollToHeading(item.text)}
            >
              <span className="text-rose-400 text-xs mt-0.5 group-hover:translate-x-0.5 transition-transform">
                {item.level === 2 ? '▶' : '・'}
              </span>
              <span className="underline-offset-2 group-hover:underline leading-relaxed">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
