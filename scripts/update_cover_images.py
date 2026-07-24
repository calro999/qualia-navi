import re

unsplash_ids = [
    '1598440947619-2c35fc9aa908',
    '1596462502278-27bfdc403348',
    '1615397323114-16f5c5314781',
    '1555529771-468132479e49',
    '1570194065650-d99fb4b8e05a',
    '1512496015851-a1faea6fdf24',
    '1616683693504-3ea7e9ad6fec',
    '1580870059805-4c0ce3a88463',
    '1599305090598-fe179d501227',
    '1583209814683-c023dd293cc6',
    '1599184511528-98e38de42790',
    '1590156424570-698d124ec05b',
    '1571781526291-c477ce607590',
    '1607519198642-892fc7400dcc',
    '1608248543803-ba4f8c70ae0b',
    '1522337660859-02fbefca4702',
    '1611077544346-6dd8dc1b2414',
    '1573575154784-9134a475d654',
    '1629198688000-71f23e745b6e',
    '1620916297397-a4a5402a3c6c',
    '1515377659633-875c74233e75',
    '1626244469493-270529d29fba',
    '1586714101962-d9e032997780',
    '1611413158064-07b998246e43',
    '1575410229391-19b80b2a3a14',
    '1615025983754-0785ff6ed8fb',
    '1583160247711-2191776b4b45',
    '1612817288484-6f916006741a',
    '1606213768222-1d70bb862db2',
    '1614859600122-835bf0ff857f',
    '1526045612212-70fc35cb4a5e',
    '1616788543034-77db8b7deea5',
    '1588663806495-2cc8f3443305',
    '1599557252277-3e1ee5465243',
    '1556228578-0d85b1a4d571',
    '1615967060376-74fc212239f3'
]

def get_image(idx):
    if idx < len(unsplash_ids):
        return f"https://images.unsplash.com/photo-{unsplash_ids[idx]}?w=1200&auto=format&fit=crop&q=80"
    return f"https://loremflickr.com/1200/800/cosmetics,beauty?lock={idx}"

with open('src/data.ts', 'r', encoding='utf-8') as f:
    data = f.read()

img_counter = 0

def process_blog_posts():
    global img_counter
    start = data.find('export const INITIAL_BLOG_POSTS')
    end = data.find('];', start)
    if start == -1 or end == -1: return data
    block = data[start:end]
    
    def replacer(m):
        global img_counter
        img = get_image(img_counter)
        img_counter += 1
        return f"coverImage: '{img}'"

    block = re.sub(r"coverImage:\s*['\"].*?['\"]", replacer, block)
    return data[:start] + block + data[end:]

data = process_blog_posts()

def process_comparisons():
    global img_counter
    start = data.find('export const INITIAL_COMPARISONS')
    end = data.find('];', start)
    if start == -1 or end == -1: return data
    block = data[start:end]

    def replacer(m):
        global img_counter
        img = get_image(img_counter)
        img_counter += 1
        created_at_line = m.group(0)
        return f"{created_at_line},\n    coverImage: '{img}'"

    block = re.sub(r",\s*coverImage:\s*['\"].*?['\"]", "", block)
    block = re.sub(r"createdAt:\s*['\"].*?['\"]", replacer, block)
    
    return data[:start] + block + data[end:]

data = process_comparisons()

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(data)

print(f"Updated data.ts with {img_counter} unique cover images.")
