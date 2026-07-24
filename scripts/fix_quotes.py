import re

data_path = 'src/data.ts'
with open(data_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace "\'2026-07-25\'" with "'2026-07-25'"
new_content = content.replace("createdAt: \\'2026-07-25\\'", "createdAt: '2026-07-25'")

with open(data_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Fixed quotes")
