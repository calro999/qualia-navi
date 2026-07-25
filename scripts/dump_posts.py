import re

with open('src/data.ts', 'r') as f:
    text = f.read()

start = text.find('export const INITIAL_BLOG_POSTS')
end = text.find('];', start) + 2

with open('blog_posts_dump.ts', 'w') as f:
    f.write(text[start:end])
