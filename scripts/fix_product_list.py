import re

with open("src/pages/ProductListPage.tsx", "r") as f:
    content = f.read()

# Replace filteredArticles with displayedArticles for the map
content = content.replace("filteredArticles.map((art) => (", "displayedArticles.map((art) => (")

# Inject "Load More" logic at the bottom of the grid
load_more = """        </div>
        
        {hasMoreProducts && (
          <div className="flex justify-center pt-8">
            <button
              onClick={() => setVisibleProductCount((prev) => prev + 12)}
              className="px-8 py-3 bg-white border border-rose-200 hover:border-rose-400 text-rose-600 font-bold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <span className="text-lg">＋</span>
              <span>さらに読み込む</span>
            </button>
          </div>
        )}
      </div>"""

# Safely replace the end of the grid section
content = content.replace("        </div>\n      </div>", load_more)

with open("src/pages/ProductListPage.tsx", "w") as f:
    f.write(content)
print("Updated ProductListPage.tsx")
