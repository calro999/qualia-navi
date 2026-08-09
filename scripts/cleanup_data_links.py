ts_path = "/Users/calro/Downloads/raku-cosme/src/data.ts"
with open(ts_path, "r", encoding="utf-8") as f:
    content = f.read()

cleanup_dict = {
    "![ベ]": "![ベースジェル・トップジェル]",
    "[【楽天市場】ベ の最安値と口コミを見る ↗]": "[【楽天市場】ベースジェル・トップジェルの最安値と口コミを見る ↗]",
    "勝者:** 貼るだけプロ仕様ネイルシールルシール ジェル風 ジェルシール 小さい爪 短": "勝者:** ジェル風ネイルシール (小さい爪・短爪用)",
    "![ネイ]": "![貼るだけプロ仕様ネイルシール]",
    "[【楽天市場】ネイ の最安値と口コミを見る ↗]": "[【楽天市場】貼るだけプロ仕様ネイルシールの最安値と口コミを見る ↗]"
}

for old, new in cleanup_dict.items():
    content = content.replace(old, new)

with open(ts_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Finished cleanup.")
