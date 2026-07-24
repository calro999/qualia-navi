import json
import os
import datetime

def generate_sitemap():
    base_url = "https://qualia-navi.vercel.app"
    sitemap_path = "public/sitemap.xml"
    robots_path = "public/robots.txt"
    
    # Load articles
    try:
        with open("src/data/articles.json", "r", encoding="utf-8") as f:
            articles = json.load(f)
    except FileNotFoundError:
        articles = []

    # Hardcode static paths
    urls = [
        "/",
        "/blogs",
        "/authors"
    ]
    
    # Add article URLs
    for article in articles:
        urls.append(f"/articles/{article['id']}")
        
    # Add comparison URLs (extract from src/data.ts conceptually, but we know the IDs)
    comparison_ids = [
        "comp-skincare-serum",
        "comp-makeup-base",
        "comp-body-uv",
        "comp-skincare-cleansing",
        "comp-body-odor"
    ]
    for cid in comparison_ids:
        urls.append(f"/compare/{cid}")
        
    # Generate XML
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for url in urls:
        xml_content += f"""  <url>
    <loc>{base_url}{url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>{'1.0' if url == '/' else '0.8'}</priority>
  </url>\n"""
        
    xml_content += '</urlset>'
    
    # Write sitemap.xml
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(xml_content)
        
    # Write robots.txt
    robots_content = f"""User-agent: *
Allow: /

Sitemap: {base_url}/sitemap.xml
"""
    with open(robots_path, "w", encoding="utf-8") as f:
        f.write(robots_content)
        
    print(f"Generated {sitemap_path} with {len(urls)} URLs.")
    print(f"Generated {robots_path}.")

if __name__ == "__main__":
    generate_sitemap()
