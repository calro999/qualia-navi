import os

files_to_patch = [
    'src/components/BlogDetailView.tsx',
    'src/components/BlogView.tsx',
    'src/components/InternalLinkMesh.tsx',
    'src/components/ProductComparisonCard.tsx',
    'src/pages/ProductComparisonPage.tsx'
]

for fpath in files_to_patch:
    if not os.path.exists(fpath): continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = content.replace(
        "const CoverImage = ({ src, alt, className }: { src: string | string[], alt: string, className?: string }) => {",
        "const CoverImage = ({ src, alt, className, loading }: { src: string | string[], alt: string, className?: string, loading?: 'lazy' | 'eager' }) => {"
    )
    # also add loading={loading} to the imgs inside CoverImage
    content = content.replace(
        "className=\"w-full h-full object-cover\" />",
        "className=\"w-full h-full object-cover\" loading={loading} />"
    )
    content = content.replace(
        "className={`w-full h-full object-cover ${className || ''}`} />",
        "className={`w-full h-full object-cover ${className || ''}`} loading={loading} />"
    )
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Fixed CoverImage loading prop")
