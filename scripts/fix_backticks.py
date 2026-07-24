with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all unescaped triple backticks inside template literals with escaped ones \`\`\`
# Or replace ``` with > [メカニズム図解] blockquote style which is clean and safe
def replace_backticks(match):
    return match.group(0).replace('```', '\\`\\`\\`')

import re
# Escape all ``` in src/data.ts
content_fixed = content.replace('```', '\\`\\`\\`')

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content_fixed)

print("Successfully escaped all triple backticks in src/data.ts!")
