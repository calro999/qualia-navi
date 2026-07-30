with open('scripts/generate_qualia_articles.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if "generated_articles.append(existing_map[topic_id])" in line:
        continue
    new_lines.append(line)

with open('scripts/generate_qualia_articles.py', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
