import React from 'react';

interface MarkdownRendererProps {
  content: string;
  onNavigate?: (path: string) => void;
}

export function MarkdownRenderer({ content, onNavigate }: MarkdownRendererProps) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/')) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(href);
      } else {
        window.history.pushState({}, '', href);
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const parseInline = (text: string): React.ReactNode[] => {
    // Regex for [anchor text](url) and **bold**
    const parts = text.split(/(\[.*?\]\(.*?\)|`.*?`|\*\*.*?\*\*)/g);
    return parts.map((part, pIdx) => {
      // Bold text
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={pIdx} className="font-extrabold text-slate-900 bg-rose-100/80 px-1.5 py-0.5 rounded mx-0.5 border-b border-rose-300">
            {boldText}
          </strong>
        );
      }

      // Markdown Link [text](url)
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const anchorText = linkMatch[1];
          const href = linkMatch[2];
          const isInternal = href.startsWith('/');

          return (
            <a
              key={pIdx}
              href={href}
              target={isInternal ? '_self' : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              onClick={(e) => handleLinkClick(e, href)}
              className="inline-flex items-center gap-1 font-extrabold text-rose-600 hover:text-rose-800 hover:underline bg-rose-50 px-2 py-0.5 rounded my-0.5 border border-rose-200 transition-colors cursor-pointer"
            >
              <span>{anchorText}</span>
              {isInternal ? <span className="text-xs">→</span> : <span className="text-xs">↗</span>}
            </a>
          );
        }
      }

      return part;
    });
  };

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="my-4 space-y-2 text-slate-800 font-sans">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-rose-50/50 p-3 rounded-xl border border-rose-100/80 text-sm leading-relaxed">
              <span className="text-rose-500 font-extrabold flex-shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(`flush-${index}`);
      return;
    }

    // H1 Heading (# )
    if (trimmed.startsWith('# ')) {
      flushList(`h1-${index}`);
      const text = trimmed.replace(/^#\s+/, '');
      elements.push(
        <h1 key={`h1-${index}`} className="text-2xl sm:text-3xl font-black text-slate-900 mt-8 mb-4 border-b-2 border-rose-400 pb-3 font-serif-brand">
          {parseInline(text)}
        </h1>
      );
      return;
    }

    // H2 Heading (## )
    if (trimmed.startsWith('## ')) {
      flushList(`h2-${index}`);
      const text = trimmed.replace(/^##\s+/, '');
      elements.push(
        <h2 key={`h2-${index}`} className="text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4 border-b-2 border-rose-400/80 pb-2 flex items-center gap-2 font-serif-brand">
          <span className="w-2 h-6 bg-rose-500 rounded-full inline-block shrink-0"></span>
          <span>{parseInline(text)}</span>
        </h2>
      );
      return;
    }

    // H3 Heading (### )
    if (trimmed.startsWith('### ')) {
      flushList(`h3-${index}`);
      const text = trimmed.replace(/^###\s+/, '');
      elements.push(
        <h3 key={`h3-${index}`} className="text-lg sm:text-xl font-extrabold text-slate-900 mt-6 mb-3 bg-slate-100/80 p-3 rounded-xl border-l-4 border-rose-500 font-serif-brand">
          {parseInline(text)}
        </h3>
      );
      return;
    }

    // H4 Heading (#### )
    if (trimmed.startsWith('#### ')) {
      flushList(`h4-${index}`);
      const text = trimmed.replace(/^####\s+/, '');
      elements.push(
        <h4 key={`h4-${index}`} className="text-base sm:text-lg font-bold text-slate-800 mt-5 mb-2 font-serif-brand">
          {parseInline(text)}
        </h4>
      );
      return;
    }

    // List item (- or * or ・)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('・')) {
      const text = trimmed.replace(/^[-*・]\s*/, '');
      listItems.push(parseInline(text));
      return;
    }

    // Normal Paragraph
    flushList(`p-${index}`);

    elements.push(
      <p key={`p-${index}`} className="text-slate-800 text-sm sm:text-base leading-relaxed mb-4 font-normal">
        {parseInline(trimmed)}
      </p>
    );
  });

  flushList(`final`);

  return <div className="space-y-2">{elements}</div>;
}
