import os
import glob

def replace_in_files(directory, old_str, new_str):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if old_str in content:
                    new_content = content.replace(old_str, new_str)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")

replace_in_files('src/pages', 'w-full h-full object-cover', 'w-full h-full object-contain bg-white')
replace_in_files('src/components', 'w-full h-full object-cover', 'w-full h-full object-contain bg-white')

# Also fix bg-slate-100 on image containers to avoid a grey border behind the white image
replace_in_files('src/pages', 'aspect-[4/3] bg-slate-100', 'aspect-[4/3] bg-white')
replace_in_files('src/pages', 'aspect-video bg-slate-100', 'aspect-video bg-white')
replace_in_files('src/components', 'aspect-video bg-slate-100', 'aspect-video bg-white')

print("Done replacing.")
