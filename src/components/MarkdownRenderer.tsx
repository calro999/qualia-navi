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
  
  // State for multi-line blocks
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  
  let inTable = false;
  let tableHeaders: React.ReactNode[] = [];
  let tableRows: React.ReactNode[][] = [];

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

      // Inline code
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code key={pIdx} className="font-mono text-xs text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
            {part.slice(1, -1)}
          </code>
        );
      }

      
      // Inline Markdown Image ![alt](url)
      if (part.startsWith('![') && part.includes('](') && part.endsWith(')')) {
        const imgMatch = part.match(/^\!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          const altText = imgMatch[1];
          const src = imgMatch[2];
          return (
            <div key={pIdx} className="my-6 flex justify-center">
              <img src={src} alt={altText} className="max-w-full sm:max-w-md w-auto rounded-xl shadow-lg border border-slate-200" loading="lazy" />
            </div>
          );
        }
      }

      // Markdown Link [text](url)

      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const anchorText = linkMatch[1];
          let href = linkMatch[2];
          const isInternal = href.startsWith('/');

          // 検索URLが紛れ込んでいた場合のアフィリエイト直リンク変換ガード
          if (href.includes('search.rakuten.co.jp')) {
            const urlObj = new URL(href);
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            const searchKeyword = pathParts[pathParts.length - 1] || '';
            href = `https://hb.afl.rakuten.co.jp/hgc/g00uq6dn.j9rug80d.g00uq6dn.j9ruh5c8/?pc=${encodeURIComponent(`https://item.rakuten.co.jp/search?k=${searchKeyword}`)}`;
          }

          return (
            <a
              key={pIdx}
              href={href}
              target={isInternal ? '_self' : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              onClick={(e) => handleLinkClick(e, href)}
              className={
                anchorText.includes('🛍️') || anchorText.includes('【楽天】') || anchorText.includes('【楽天市場】') || anchorText.includes('直行する')
                  ? "my-4 inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 border border-red-500/30"
                  : "inline-flex items-center gap-1 font-extrabold text-rose-600 hover:text-rose-800 hover:underline bg-rose-50 px-2 py-0.5 rounded my-0.5 border border-rose-200 transition-colors cursor-pointer"
              }
            >
              <span className="flex items-center gap-2">
                {(anchorText.includes('【楽天市場】') || anchorText.includes('直行する')) && <span>🛍️</span>}
                <span>{anchorText}</span>
              </span>
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
  
  const flushTable = (key: string) => {
    if (inTable && tableHeaders.length > 0) {
      elements.push(
        <div key={`table-wrapper-${key}`} className="overflow-x-auto my-8 border border-slate-200 rounded-2xl shadow-sm">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                {tableHeaders.map((th, idx) => (
                  <th key={`th-${idx}`} className="px-4 py-3">{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, rIdx) => (
                <tr key={`tr-${rIdx}`} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
                  {row.map((td, dIdx) => (
                    <td key={`td-${dIdx}`} className="px-4 py-3 align-top">{td}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    inTable = false;
    tableHeaders = [];
    tableRows = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Check code block boundaries (supports both escaped \`\`\` and normal ```)
    if (trimmed.startsWith('```') || trimmed.startsWith('\\`\\`\\`')) {
      if (inCodeBlock) {
        // Close code block
        elements.push(
          <div key={`code-${index}`} className="my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center gap-2 border-b border-slate-700/50">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="ml-2 text-xs text-slate-400 font-mono">CODE / LOG</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-emerald-300 font-mono whitespace-pre-wrap leading-relaxed">
              <code>{codeBlockContent.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = [];
      } else {
        // Open code block
        flushList(`flush-cb-${index}`);
        flushTable(`flush-cbtable-${index}`);
        inCodeBlock = true;
      }
      return;
    }
    
    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }
    
    // Check Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList(`flush-tb-${index}`);
      
      const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
      
      // Is this the separator line like | :--- | :--- | ?
      if (cells.every(c => c.replace(/[:\-]/g, '') === '')) {
        inTable = true;
        return;
      }
      
      if (!inTable && tableHeaders.length === 0) {
        // Assume first row is header
        tableHeaders = cells.map(c => parseInline(c));
        inTable = true; // wait for separator, but technically we are tracking it now
      } else if (inTable) {
        tableRows.push(cells.map(c => parseInline(c)));
      }
      return;
    } else if (inTable) {
      // Table ended
      flushTable(`table-end-${index}`);
    }

    if (!trimmed) {
      flushList(`flush-${index}`);
      flushTable(`flush-tbs-${index}`);
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
        <h4 key={`h4-${index}`} className="text-base sm:text-lg font-bold text-slate-800 mt-6 mb-3 pb-1 border-b border-dashed border-slate-300 flex items-center gap-2 font-serif-brand">
          <span className="w-1.5 h-4 bg-slate-400 rounded-full inline-block shrink-0"></span>
          {parseInline(text)}
        </h4>
      );
      return;
    }

    // Standalone Markdown Image ![alt](url)
    if (trimmed.startsWith('![') && trimmed.includes('](') && trimmed.endsWith(')')) {
      const imgMatch = trimmed.match(/^\!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        flushList(`img-${index}`);
        flushTable(`img-table-${index}`);
        const altText = imgMatch[1];
        const src = imgMatch[2];
        elements.push(
          <div key={`img-${index}`} className="my-8 flex flex-col items-center justify-center bg-slate-50/80 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <img
              src={src}
              alt={altText}
              referrerPolicy="no-referrer"
              className="max-w-full sm:max-w-md max-h-80 w-auto rounded-xl object-contain bg-white p-2 shadow-xs hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
            <p className="text-xs font-bold text-slate-500 mt-3 text-center bg-white px-3 py-1 rounded-full border border-slate-200">
              {altText}
            </p>
          </div>
        );
        return;
      }
    }

    // List item (- or * or ・)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('・')) {
      const text = trimmed.replace(/^[-*・]\s*/, '');
      listItems.push(parseInline(text));
      return;
    }

    // Horizontal Rule (---)
    if (trimmed === '---') {
      flushList(`hr-${index}`);
      elements.push(
        <hr key={`hr-${index}`} className="my-8 border-t-2 border-dashed border-rose-200" />
      );
      return;
    }

    // Raw HTML anchor tag (affiliate button) - <a href="...">...</a>
    if (trimmed.startsWith('<a ') && trimmed.includes('href=') && trimmed.endsWith('</a>')) {
      flushList(`a-${index}`);
      flushTable(`a-table-${index}`);
      const hrefMatch = trimmed.match(/href="([^"]+)"/);
      const textMatch = trimmed.match(/>([^<]+)<\/a>/);
      const isAffiliate = trimmed.includes('affiliate-btn') || trimmed.includes('hb.afl.rakuten') || trimmed.includes('rakuten.co.jp');
      const href = hrefMatch?.[1] || '#';
      const linkText = textMatch?.[1] || '楽天で見る';
      if (isAffiliate) {
        elements.push(
          <div key={`aff-${index}`} className="my-6 flex justify-center">
            <a
              href={href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>🛒</span>
              <span>{linkText}</span>
              <span className="text-xs opacity-80">↗</span>
            </a>
          </div>
        );
      } else {
        elements.push(
          <a
            key={`link-${index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 underline hover:text-rose-800"
          >
            {linkText}
          </a>
        );
      }
      return;
    }

    // Blockquote & Alerts (> )
    if (trimmed.startsWith('> ')) {
      flushList(`blockquote-${index}`);
      let text = trimmed.replace(/^>\s*/, '');
      let alertClass = "border-l-4 border-slate-300 bg-slate-50 text-slate-700 p-4 rounded-r-xl italic";
      let icon = "";

      if (text.startsWith('[!TIP]')) {
        text = text.replace(/^\[!TIP\]\s*/, '');
        alertClass = "border-l-4 border-emerald-500 bg-emerald-50 text-emerald-900 p-4 rounded-r-xl not-italic";
        icon = "💡 TIPS: ";
      } else if (text.startsWith('[!IMPORTANT]')) {
        text = text.replace(/^\[!IMPORTANT\]\s*/, '');
        alertClass = "border-l-4 border-amber-500 bg-amber-50 text-amber-900 p-4 rounded-r-xl not-italic";
        icon = "⚠️ 重要: ";
      }

      elements.push(
        <blockquote key={`blockquote-${index}`} className={`my-4 ${alertClass} text-sm sm:text-base leading-relaxed`}>
          {icon && <strong className="block mb-1">{icon}</strong>}
          {parseInline(text)}
        </blockquote>
      );
      return;
    }

    // Normal Paragraph
    flushList(`p-${index}`);
    
    // Add missing parsed texts
    elements.push(
      <p key={`p-${index}`} className="text-slate-800 text-sm sm:text-base leading-relaxed mb-6 font-normal">
        {parseInline(trimmed)}
      </p>
    );
  });

  flushList(`final`);
  flushTable(`final-table`);

  return <div className="space-y-2">{elements}</div>;
}
