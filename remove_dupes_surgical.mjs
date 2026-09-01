import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

// ===== 超強力正規化 =====
function normalizeHard(name) {
  let s = name;
  s = s.replace(/【[^】]*】/g, '');
  s = s.replace(/\[[^\]]*\]/g, '');
  s = s.replace(/（[^）]*）/g, '');
  s = s.replace(/\([^)]*\)/g, '');
  s = s.replace(/＼[^／]*／/g, '');
  s = s.replace(/★[^★]*★/g, '');
  s = s.replace(/ポイント\d+倍/g, ''); s = s.replace(/P\d+倍/g, '');
  s = s.replace(/送料無料/g, ''); s = s.replace(/あす楽/g, '');
  s = s.replace(/公式/g, ''); s = s.replace(/正規品/g, '');
  s = s.replace(/国内/g, ''); s = s.replace(/即納/g, '');
  s = s.replace(/限定/g, ''); s = s.replace(/メール便/g, '');
  s = s.replace(/ネコポス/g, ''); s = s.replace(/スーパーSALE/g, '');
  s = s.replace(/お買い物マラソン/g, ''); s = s.replace(/クーポン[^\s]*/g, '');
  s = s.replace(/期間[^\s]*/g, ''); s = s.replace(/対象商品/g, '');
  s = s.replace(/全商品/g, ''); s = s.replace(/先着\d+名様/g, '');
  s = s.replace(/\d+％?OFF/gi, ''); s = s.replace(/\d+%OFF/gi, '');
  s = s.replace(/\d+個セット/g, ''); s = s.replace(/\d+本セット/g, '');
  s = s.replace(/\d+枚セット/g, ''); s = s.replace(/\d+個入/g, '');
  s = s.replace(/\d+セット/g, ''); s = s.replace(/セット/g, '');
  s = s.replace(/1\+1\+1/g, ''); s = s.replace(/1\+1/g, '');
  s = s.replace(/詰め替え/g, ''); s = s.replace(/つめかえ/g, '');
  s = s.replace(/レフィル/g, '');
  s = s.replace(/\d+\.?\d*(mL|ml|g|kg|mg|cc|包|個|枚|本)/gi, '');
  s = s.replace(/[☆★◎●▲■□◆▼△▽♪♫♬※…！!？?・&\/|＆＄＃＊:：,，。.、;；～〜→←↑↓↔「」『』""'']/g, '');
  s = s.replace(/[\s\-_　]/g, '');
  return s.toLowerCase();
}

function isSameProduct(norm1, norm2) {
  if (norm1.length < 4 || norm2.length < 4) return false;
  if (norm1 === norm2) return true;
  if (norm1.slice(0, 12) === norm2.slice(0, 12) && norm1.slice(0, 12).length >= 5) return true;
  if (norm1.length >= 8 && norm2.length >= 8) {
    if (norm1.includes(norm2.slice(0, 10)) || norm2.includes(norm1.slice(0, 10))) return true;
  }
  return false;
}

// 記事内の商品名を抽出し、重複ペアのインデックスを特定
function findDuplicateIndices(content) {
  const names = [];
  const matches = content.matchAll(/### 👑 第(\d+)位：([^\n]+)/g);
  for (const m of matches) {
    names.push({ rank: parseInt(m[1]), name: m[2].trim() });
  }

  const norms = names.map(n => normalizeHard(n.name));
  const dupeRanks = new Set(); // 後のほう（重複側）を除去対象にする

  for (let i = 0; i < norms.length; i++) {
    for (let j = i + 1; j < norms.length; j++) {
      if (isSameProduct(norms[i], norms[j])) {
        dupeRanks.add(j); // 後ろの方を除去
      }
    }
  }

  return { names, dupeRanks };
}

// 重複商品を除去した新しいcontentを生成
function removeDupesFromContent(content) {
  const { names, dupeRanks } = findDuplicateIndices(content);
  if (dupeRanks.size === 0) return null; // 重複なし

  // 商品ブロックを分割
  const blocks = content.split(/(?=### 👑 第\d+位：)/);
  const header = blocks[0]; // ヘッダー部分（比較表含む）
  const productBlocks = blocks.slice(1);

  // 重複でないブロックのみ残す
  const keptBlocks = [];
  for (let i = 0; i < productBlocks.length; i++) {
    if (!dupeRanks.has(i)) {
      keptBlocks.push(productBlocks[i]);
    }
  }

  // 順位を振り直す
  const renumbered = keptBlocks.map((block, idx) => {
    const newRank = idx + 1;
    return block
      .replace(/### 👑 第\d+位/, `### 👑 第${newRank}位`)
      .replace(/\*\*\d+位\*\*/, `**${newRank}位**`);
  });

  // 比較表も修正（重複行を除去して振り直す）
  let newHeader = header;
  const tableLines = header.split('\n');
  const newTableLines = [];
  let productRowIdx = 0;
  for (const line of tableLines) {
    if (line.match(/^\| \*\*\d+位\*\*/)) {
      if (!dupeRanks.has(productRowIdx)) {
        const newRank = newTableLines.filter(l => l.match(/^\| \*\*\d+位\*\*/)).length + 1;
        newTableLines.push(line.replace(/\*\*\d+位\*\*/, `**${newRank}位**`));
      }
      productRowIdx++;
    } else {
      newTableLines.push(line);
    }
  }
  newHeader = newTableLines.join('\n');

  return newHeader + renumbered.join('');
}

// メイン処理
let fixedCount = 0;
let totalDupsRemoved = 0;

articlesData.forEach((a, idx) => {
  if (!a.content) return;

  const { dupeRanks } = findDuplicateIndices(a.content);
  if (dupeRanks.size === 0) return;

  const newContent = removeDupesFromContent(a.content);
  if (newContent) {
    articlesData[idx].content = newContent;

    // itemCountを更新
    const remaining = (newContent.match(/### 👑 第\d+位/g) || []).length;
    articlesData[idx].itemCount = remaining;

    fixedCount++;
    totalDupsRemoved += dupeRanks.size;
    console.log(`✅ [${a.id}] ${dupeRanks.size}件の重複を除去 → 残り${remaining}商品`);
  }
});

// 保存
fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
console.log(`\n🎉 ${fixedCount}記事から合計${totalDupsRemoved}件の重複商品を除去完了！`);
