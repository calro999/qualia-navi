// scripts/lib/md_item_parser.mjs
import fs from 'fs';

const SCALAR_KEYS = [
  'itemCode',
  'addedDate',
  'genre',
  'productName',
  'cleanName',
  'price',
  'itemPrice',
  'starRating',
  'reviewCount',
  'shopName',
  'affiliateUrl',
  'imageUrl',
  'pointRate',
  'postageFlag',
  'badge',
  'featurePoint',
  'skinOrColorType',
  'texture'
];

const ARRAY_KEYS = ['pros', 'cons'];

/**
 * 1商品分の Frontmatter + レビュー本文を Markdown 文字列へシリアライズする
 */
export function stringifyHubItemMd(data, reviewMarkdown) {
  const content = reviewMarkdown !== undefined ? reviewMarkdown : (data.reviewMarkdown || '');
  const lines = ['---'];
  for (const key of SCALAR_KEYS) {
    const val = data[key];
    if (val === undefined || val === null) continue;
    if (typeof val === 'number') {
      lines.push(`${key}: ${val}`);
    } else {
      lines.push(`${key}: ${JSON.stringify(String(val))}`);
    }
  }
  for (const key of ARRAY_KEYS) {
    const arr = Array.isArray(data[key]) ? data[key] : [];
    lines.push(`${key}:`);
    for (const item of arr) {
      lines.push(`  - ${JSON.stringify(String(item))}`);
    }
  }
  lines.push('---');
  lines.push('');
  lines.push(String(content || '').trim());
  lines.push('');
  return lines.join('\n');
}

function parseScalarValue(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  return trimmed;
}

/**
 * .md ファイル文字列を { meta, body } にパースする
 */
export function parseHubItemMd(content, filename = '') {
  const text = String(content || '').replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) {
    return { meta: {}, body: text.trim() };
  }
  const endIdx = text.indexOf('\n---\n', 4);
  if (endIdx === -1) {
    return { meta: {}, body: text.trim() };
  }

  const frontmatterRaw = text.slice(4, endIdx);
  const body = text.slice(endIdx + 5).trim();
  const meta = { _filename: filename };

  let currentArrayKey = null;
  for (const line of frontmatterRaw.split('\n')) {
    if (!line.trim()) continue;
    if (currentArrayKey && /^\s+-\s+/.test(line)) {
      const itemRaw = line.replace(/^\s+-\s+/, '');
      meta[currentArrayKey].push(parseScalarValue(itemRaw));
      continue;
    }
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const rest = line.slice(colonIdx + 1).trim();
    if (!rest) {
      meta[key] = [];
      currentArrayKey = key;
    } else {
      currentArrayKey = null;
      meta[key] = parseScalarValue(rest);
    }
  }

  return { meta, body };
}

export function readHubItemsFromDir(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md')).sort();
  const items = [];
  for (const file of files) {
    const raw = fs.readFileSync(pathJoin(dirPath, file), 'utf8');
    const parsed = parseHubItemMd(raw, file);
    if (parsed.meta && (parsed.meta.productName || parsed.meta.cleanName)) {
      items.push({
        ...parsed.meta,
        reviewMarkdown: parsed.body
      });
    }
  }
  return items;
}

function pathJoin(a, b) {
  return a.endsWith('/') ? `${a}${b}` : `${a}/${b}`;
}
