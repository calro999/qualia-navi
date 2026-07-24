import re

data_path = 'src/data.ts'
with open(data_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the INITIAL_COMPARISONS array
start_match = re.search(r'export const INITIAL_COMPARISONS: ProductComparison\[\] = \[', content)
end_match = re.search(r'\n\];', content[start_match.end():])

if start_match and end_match:
    comps_str = content[start_match.end():start_match.end() + end_match.start()]
    
    # We need to add `createdAt: '2026-07-25'` before the closing `}` of each object if it doesn't exist
    # A bit risky with regex, but we can look for `contentMarkdown: `.*?\n  }` and inject it.
    
    def add_created_at(match):
        block = match.group(0)
        if "createdAt:" not in block:
            # Replace the last \n  } with \n`,\n    createdAt: '2026-07-25'\n  }
            return re.sub(r'(\n\s*\}\s*)$', r',\n    createdAt: \'2026-07-25\'\1', block)
        return block

    # Match each object roughly
    fixed_comps = re.sub(r'\{\s*id:.*?contentMarkdown:.*?`\n\s*\}', add_created_at, comps_str, flags=re.DOTALL)
    
    new_content = content[:start_match.end()] + fixed_comps + content[start_match.end() + end_match.start():]
    
    with open(data_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Fixed missing createdAt")
else:
    print("Could not find INITIAL_COMPARISONS block")
