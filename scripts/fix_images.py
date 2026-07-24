import os
import re
import random

# Get all images
image_dir = 'public/images/products'
images = [f for f in os.listdir(image_dir) if f.endswith('.jpg')]
random.seed(42)
random.shuffle(images)

with open('src/data.ts', 'r', encoding='utf-8') as f:
    data = f.read()

image_idx = 0

def replace_cover(match):
    global image_idx
    img = f"/images/products/{images[image_idx % len(images)]}"
    image_idx += 1
    # Replace coverImage: '...' with the new image
    inner_data = match.group(0)
    new_inner = re.sub(r"coverImage:\s*['\"].*?['\"]", f"coverImage: '{img}'", inner_data)
    return new_inner

# We need to replace coverImage inside INITIAL_BLOG_POSTS and INITIAL_COMPARISONS
# Let's just find ALL occurrences of `slug: '...'` followed by `coverImage:` and replace them.
# It's safer to just do a global replace on `coverImage: '...'` where the URL is unsplash or loremflickr or something, 
# but wait, let's just replace all coverImage: 'http...'

def replace_all_covers(match):
    global image_idx
    img = f"/images/products/{images[image_idx % len(images)]}"
    image_idx += 1
    return f"coverImage: '{img}'"

new_data = re.sub(r"coverImage:\s*['\"]https?://.*?['\"]", replace_all_covers, data)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(new_data)

print(f"Replaced {image_idx} images with unique local images.")
