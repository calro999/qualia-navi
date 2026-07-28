import os

files_to_patch = [
    'src/components/BlogDetailView.tsx',
    'src/components/BlogView.tsx',
    'src/components/InternalLinkMesh.tsx',
    'src/components/ProductComparisonCard.tsx',
    'src/pages/ProductComparisonPage.tsx'
]

grid_component = """
const CoverImage = ({ src, alt, className }: { src: string | string[], alt: string, className?: string }) => {
  if (Array.isArray(src)) {
    return (
      <div className={`grid grid-cols-2 gap-0.5 w-full h-full bg-slate-100 ${className}`}>
        {src.map((url, i) => (
          <img key={i} src={url} alt={`${alt} ${i+1}`} className="w-full h-full object-cover" />
        ))}
      </div>
    );
  }
  return <img src={src} alt={alt} className={`w-full h-full object-cover ${className || ''}`} />;
};
"""

for fpath in files_to_patch:
    if not os.path.exists(fpath): continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "const CoverImage =" not in content:
        # insert grid_component after imports
        parts = content.split('\n\n')
        content = parts[0] + '\n\n' + grid_component + '\n\n' + '\n\n'.join(parts[1:])
        
    # Replace `<img ... src={post.coverImage} ... />` with `<CoverImage src={post.coverImage} ... />`
    import re
    content = re.sub(r'<img([^>]*?)src=\{([^}]+coverImage[^}]*)\}([^>]*?)/>', r'<CoverImage\1src={\2}\3/>', content)
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Patched React components for coverImage arrays")
