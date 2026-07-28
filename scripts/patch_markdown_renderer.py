import re

with open('src/components/MarkdownRenderer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to enhance parseInline to support images ![alt](url)
inline_parser_code = """
      // Markdown Image ![alt](url)
      if (part.startsWith('![') && part.includes('](') && part.endsWith(')')) {
        const imgMatch = part.match(/^\\!\\[(.*?)\\]\\((.*?)\\)$/);
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
"""
content = content.replace("// Markdown Link [text](url)", inline_parser_code)

# We also need to enhance link rendering in parseInline to make it a button if it contains '🛍️'
link_renderer_orig = """            <a
              key={pIdx}
              href={href}
              target={isInternal ? '_self' : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              onClick={(e) => handleLinkClick(e, href)}
              className="inline-flex items-center gap-1 font-extrabold text-rose-600 hover:text-rose-800 hover:underline bg-rose-50 px-2 py-0.5 rounded my-0.5 border border-rose-200 transition-colors cursor-pointer"
            >
              <span>{anchorText}</span>
              {isInternal ? <span className="text-xs">→</span> : <span className="text-xs">↗</span>}
            </a>"""

link_renderer_new = """            <a
              key={pIdx}
              href={href}
              target={isInternal ? '_self' : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              onClick={(e) => handleLinkClick(e, href)}
              className={
                anchorText.includes('🛍️') 
                  ? "my-4 flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-extrabold text-sm sm:text-base px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                  : "inline-flex items-center gap-1 font-extrabold text-rose-600 hover:text-rose-800 hover:underline bg-rose-50 px-2 py-0.5 rounded my-0.5 border border-rose-200 transition-colors cursor-pointer"
              }
            >
              <span>{anchorText}</span>
              {!anchorText.includes('🛍️') && (isInternal ? <span className="text-xs">→</span> : <span className="text-xs">↗</span>)}
            </a>"""
            
content = content.replace(link_renderer_orig, link_renderer_new)

with open('src/components/MarkdownRenderer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched MarkdownRenderer.tsx")
