with open('scripts/generate_qualia_articles.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "generated_articles = []" in line:
        new_lines.append("    generated_articles = []\n")
    elif "existing_map = {art['id']: art for art in existing_articles}" in line:
        new_lines.append(line)
        new_lines.append("    generated_articles = existing_articles.copy()\n")
    else:
        new_lines.append(line)

with open('scripts/generate_qualia_articles.py', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
