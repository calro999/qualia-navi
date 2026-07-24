import re

def get_content(filename, var_name):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    match = re.search(f'{var_name}\s*=\s*\"\"\"(.*?)\"\"\"', content, re.DOTALL)
    if match:
        return match.group(1)
    return ""

comp1 = get_content('scripts/inject_1.py', 'more_comparisons')
comp2 = get_content('scripts/inject_2.py', 'more_comparisons')
comp3 = get_content('scripts/inject_3.py', 'more_comparisons')
blogs = get_content('scripts/inject_summer_features.py', 'more_blogs')

# Fix missing createdAt in comparisons by doing a simple regex:
# We know the object ends with `\n  }`. We can safely replace `\n  }` with `,\n    createdAt: '2026-07-24'\n  }`
# But ONLY if it doesn't already have createdAt.
def ensure_created_at(text, date='2026-07-24'):
    # A bit hard to regex replace if we don't know the exact boundary.
    # Instead, we will split by `\n  }`.
    parts = text.split('\n  }')
    out = []
    for p in parts[:-1]: # last part is empty or just comma
        if 'createdAt:' not in p:
            out.append(p + f",\n    createdAt: '{date}'")
        else:
            out.append(p)
    if len(parts) > 1:
        return '\n  }'.join(out) + '\n  }' + parts[-1]
    return text

comp1 = ensure_created_at(comp1)
comp2 = ensure_created_at(comp2)
comp3 = ensure_created_at(comp3)

with open('src/data.ts', 'r', encoding='utf-8') as f:
    data = f.read()

# Inject comparisons before the closing ]; of INITIAL_COMPARISONS
comp_target = r'(export const INITIAL_COMPARISONS: ProductComparison\[\] = \[\s*[\s\S]*?)(\n\];)'
all_comps = comp1 + comp2 + comp3
if all_comps:
    # replace backslashes if any, but since we parsed it from python script as raw, it should be fine.
    # Actually, we need to escape backslashes for re.sub
    data = re.sub(comp_target, r'\1' + all_comps.replace('\\', '\\\\') + r'\2', data, count=1)

# Inject blogs before the closing ]; of INITIAL_BLOG_POSTS
blog_target = r'(export const INITIAL_BLOG_POSTS: BlogPost\[\] = \[\s*[\s\S]*?)(\n\];)'
if blogs:
    data = re.sub(blog_target, r'\1' + blogs.replace('\\', '\\\\') + r'\2', data, count=1)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(data)

print("Fixed data.ts by properly injecting all data with createdAt.")
