import fs from 'fs';
import path from 'path';
import { fetchRakutenItems, REPAIR_CONFIGS } from './repair_rakuten_images_engine.mjs';

const ARTICLES_DIR = path.resolve('./dist/articles');

// 楽天APIレート制限対策
const delay = ms => new Promise(res => setTimeout(res, ms));

async function main() {
  console.log('🚀 楽天APIから本物の個別商品画像を直接取得して重複を解消開始...\n');

  for (const config of REPAIR_CONFIGS) {
    const filePath = path.join(ARTICLES_DIR, config.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ ファイルが見つかりません: ${config.file}`);
      continue;
    }

    console.log(`\n======================================================`);
    console.log(`📄 対象記事: ${config.file}`);
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // 1. 完全再構築 (fullRebuildKeywords) の場合
    if (config.fullRebuildKeywords) {
      console.log(`🔄 記事全体の商品画像・データを楽天APIから直接再取得中 (${config.fullRebuildKeywords.length}件)...`);
      
      // 既存記事の各商品ブロックを抽出
      // 形式A: <h3>1. ... </h3> または <h3>【第1位】...</h3>
      // 形式B: <h3>...</h3>
      // 各アイテムのimgタグとaタグを順番に楽天APIの別個商品に差し替える
      const newItems = [];
      for (const kw of config.fullRebuildKeywords) {
        await delay(350); // APIレートリミット回避
        const items = await fetchRakutenItems(kw, 5);
        // 重複しない画像を持つアイテムを選択
        const item = items.find(it => it.imageUrl && !newItems.some(existing => existing.imageUrl === it.imageUrl)) || items[0];
        if (item) {
          newItems.push({ ...item, searchKw: kw });
          console.log(`  ✅ 取得成功: [${kw}] -> ${item.itemName.substring(0, 30)}... 画像: ${item.imageUrl.substring(0, 50)}...`);
        } else {
          console.error(`  ❌ 取得失敗: [${kw}]`);
        }
      }

      if (newItems.length > 0) {
        // 記事内の商品セクションを順次置換
        // アイテム画像タグの正規表現: <img src="..." alt="..." ... />
        let itemIndex = 0;
        content = content.replace(/(<h3[^>]*>)([\s\S]*?)(<\/h3>[\s\S]*?<img[^>]+src=["\x27])(https:\/\/[^"\x27]+)(["\x27][^>]*alt=["\x27])([^"\x27]*)(["\x27][\s\S]*?<a[^>]+href=["\x27])(https:\/\/[^"\x27]+)(["\x27])/g, 
          (match, h3Open, title, mid1, oldImg, mid2, oldAlt, mid3, oldLink, post) => {
            if (itemIndex < newItems.length) {
              const fresh = newItems[itemIndex++];
              modified = true;
              return `${h3Open}${fresh.itemName}${mid1}${fresh.imageUrl}${mid2}${fresh.itemName}${mid3}${fresh.affiliateUrl}${post}`;
            }
            return match;
          }
        );
      }
    }

    // 2. 個別置換 (replacements) の場合
    if (config.replacements) {
      for (const rep of config.replacements) {
        // dupeUrl または dupePattern または targetH3Substr
        if (rep.searchKeywords && Array.isArray(rep.searchKeywords)) {
          // 複数回重複している同じURLをそれぞれ別のキーワードで取得した別々の画像に置き換える
          for (let i = 0; i < rep.searchKeywords.length; i++) {
            const kw = rep.searchKeywords[i];
            await delay(350);
            const items = await fetchRakutenItems(kw, 5);
            if (items.length > 0) {
              const fresh = items[0];
              console.log(`  ✅ 楽天API取得: [${kw}] -> ${fresh.itemName.substring(0, 30)}... (${fresh.imageUrl.substring(0, 50)}...)`);
              
              // 該当URLの i+1 回目の出現を置換
              if (rep.dupeUrl) {
                // 1回だけ置換
                content = content.replace(rep.dupeUrl, fresh.imageUrl);
                modified = true;
              }
            }
          }
        } else if (rep.searchKeyword) {
          await delay(350);
          const items = await fetchRakutenItems(rep.searchKeyword, 5);
          if (items.length > 0) {
            const fresh = items[0];
            console.log(`  ✅ 楽天API取得: [${rep.searchKeyword}] -> ${fresh.itemName.substring(0, 30)}... (${fresh.imageUrl.substring(0, 50)}...)`);
            
            if (rep.dupeUrl) {
              // 2回目以降の出現のみ置換するため、1つ目をスキップして2つ目を置換
              const firstPos = content.indexOf(rep.dupeUrl);
              if (firstPos !== -1) {
                const secondPos = content.indexOf(rep.dupeUrl, firstPos + rep.dupeUrl.length);
                if (secondPos !== -1) {
                  content = content.substring(0, secondPos) + fresh.imageUrl + content.substring(secondPos + rep.dupeUrl.length);
                  modified = true;
                }
              }
            } else if (rep.dupePattern) {
              // dupePatternが含まれる付近のimgを置換
              const patPos = content.indexOf(rep.dupePattern);
              if (patPos !== -1) {
                const imgSubstr = content.substring(patPos, patPos + 1500);
                const match = imgSubstr.match(/<img[^>]+src=["\x27](https:\/\/[^"\x27]+)["\x27]/);
                if (match) {
                  const targetImg = match[1];
                  content = content.substring(0, patPos) + imgSubstr.replace(targetImg, fresh.imageUrl) + content.substring(patPos + 1500);
                  modified = true;
                }
              }
            } else if (rep.targetH3Substr) {
              // targetH3Substrが含まれる箇所のimgを置換
              const h3Pos = content.indexOf(rep.targetH3Substr);
              if (h3Pos !== -1) {
                const imgSubstr = content.substring(h3Pos, h3Pos + 1500);
                const match = imgSubstr.match(/<img[^>]+src=["\x27](https:\/\/[^"\x27]+)["\x27]/);
                if (match) {
                  const targetImg = match[1];
                  content = content.substring(0, h3Pos) + imgSubstr.replace(targetImg, fresh.imageUrl) + content.substring(h3Pos + 1500);
                  modified = true;
                }
              }
            }
          }
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`💾 記事更新完了: ${config.file}`);
    } else {
      console.log(`ℹ️ 変更なし: ${config.file}`);
    }
  }

  console.log('\n✨ 全修復処理が終了しました。');
}

main().catch(err => console.error('エラー発生:', err));
