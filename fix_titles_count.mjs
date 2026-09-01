import fs from 'fs';
import path from 'path';

const APP_ID = '1a3cdfd9-2aec-4b42-8290-1c53603b0012';
const ACCESS_KEY = 'pk_XkZ5h9MDKSsuVr6T5CnLnlVNvFg3hiR5vMDGrQ75cU5';
const AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

function normalizeHard(name) {
  let s = name;
  s = s.replace(/【[^】]*】/g, ''); s = s.replace(/\[[^\]]*\]/g, '');
  s = s.replace(/（[^）]*）/g, ''); s = s.replace(/\([^)]*\)/g, '');
  s = s.replace(/＼[^／]*／/g, ''); s = s.replace(/★[^★]*★/g, '');
  s = s.replace(/ポイント\d+倍/g, ''); s = s.replace(/P\d+倍/g, '');
  s = s.replace(/送料無料/g, ''); s = s.replace(/公式/g, '');
  s = s.replace(/正規品/g, ''); s = s.replace(/国内/g, '');
  s = s.replace(/期間[^\s]*/g, ''); s = s.replace(/対象商品/g, '');
  s = s.replace(/全商品/g, ''); s = s.replace(/クーポン[^\s]*/g, '');
  s = s.replace(/\d+個セット/g, ''); s = s.replace(/\d+本セット/g, '');
  s = s.replace(/セット/g, ''); s = s.replace(/1\+1/g, '');
  s = s.replace(/詰め替え/g, ''); s = s.replace(/レフィル/g, '');
  s = s.replace(/\d+\.?\d*(mL|ml|g|kg|mg|cc|包|個|枚|本)/gi, '');
  s = s.replace(/[☆★◎●▲■□◆▼△▽♪♫♬※…！!？?・&\/|＆＄＃＊:：,，。.、;；～〜→←↑↓↔「」『』""'']/g, '');
  s = s.replace(/[\s\-_　]/g, '');
  return s.toLowerCase();
}

function isSameProduct(n1, n2) {
  if (n1.length < 4 || n2.length < 4) return false;
  if (n1 === n2) return true;
  if (n1.slice(0,12) === n2.slice(0,12) && n1.length >= 5) return true;
  if (n1.length >= 8 && n2.length >= 8 && (n1.includes(n2.slice(0,10)) || n2.includes(n1.slice(0,10)))) return true;
  return false;
}

// タイトルの「10選」を実際の商品数に修正
function fixTitle(title, actualCount) {
  if (actualCount >= 10) return title;
  return title
    .replace(/10選/g, `${actualCount}選`)
    .replace(/おすすめ10/g, `おすすめ${actualCount}`)
    .replace(/ベスト10/g, `ベスト${actualCount}`)
    .replace(/TOP10/gi, `TOP${actualCount}`)
    .replace(/最強10/g, `最強${actualCount}`)
    .replace(/厳選10/g, `厳選${actualCount}`);
}

// content内のテキストも修正
function fixContentTitle(content, actualCount) {
  if (actualCount >= 10) return content;
  return content
    .replace(/10選/g, `${actualCount}選`)
    .replace(/10商品/g, `${actualCount}商品`);
}

async function main() {
  let titleFixed = 0;

  // 全10選記事をチェック
  for (let idx = 0; idx < articlesData.length; idx++) {
    const a = articlesData[idx];
    if (!a.content) continue;

    const is10 = /(10選|おすすめ10|ベスト10|TOP10|最強10|厳選10)/i.test(a.title || '');
    if (!is10) continue;

    const productCount = (a.content.match(/### 👑 第\d+位/g) || []).length;
    if (productCount >= 10) continue;

    // タイトルとコンテンツを修正
    const newTitle = fixTitle(a.title, productCount);
    const newContent = fixContentTitle(a.content, productCount);

    if (newTitle !== a.title || newContent !== a.content) {
      articlesData[idx].title = newTitle;
      articlesData[idx].content = newContent;
      articlesData[idx].itemCount = productCount;
      titleFixed++;
      console.log(`✅ [${a.id}] ${productCount}選に修正: ${newTitle.slice(0,40)}...`);
    }
  }

  fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
  console.log(`\n🎉 ${titleFixed}記事のタイトルを実際の商品数に合わせて修正完了！`);
}

main().catch(err => { console.error('❌', err); process.exit(1); });
