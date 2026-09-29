import fs from 'fs';
import path from 'path';

const dataTsPath = path.resolve('src/data.ts');
let content = fs.readFileSync(dataTsPath, 'utf8');

// 修正対象のslugリスト
const slugsToFix = [
  'winter-eye-cream-wrinkle-care-2026',
  'winter-sheet-mask-face-pack-2026',
  'winter-hydrating-face-powder-2026',
  'winter-oil-in-mist-makeup-fixer-2026',
  'winter-warm-cleansing-balm-pore-care-2026',
  'winter-holiday-fragrance-solid-perfume-2026'
];

console.log('🔧 src/data.ts の BlogPost 型適合処理を実行します...');

// JSON.parseで安全に修正できるように、INITIAL_BLOG_POSTS ブロックを特定
const startMarker = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
const endMarker = 'export const INITIAL_COMPARISONS: ProductComparison[] = [';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('❌ マーカーが見つかりません');
  process.exit(1);
}

const header = content.slice(0, startIdx + startMarker.length);
const footer = content.slice(endIdx);
const arrayContent = content.slice(startIdx + startMarker.length, endIdx).trim();

// 配列末尾のセミコロンや閉じブラケットを処理
// JSONとしてパースするために、前後のカンマ等を正規化
let sanitizedJson = arrayContent;
if (sanitizedJson.endsWith(';')) {
  sanitizedJson = sanitizedJson.slice(0, -1).trim();
}
if (sanitizedJson.endsWith(']')) {
  sanitizedJson = sanitizedJson.slice(0, -1).trim();
}
if (sanitizedJson.startsWith('[')) {
  sanitizedJson = sanitizedJson.slice(1).trim();
}

// 各オブジェクトをパースするため、[ ... ] で囲む
const fullArrayJson = `[\n${sanitizedJson}\n]`;

let posts;
try {
  posts = JSON.parse(fullArrayJson);
} catch (e) {
  console.log('直接JSONパースに失敗したため、正規表現・個別置換で修正します:', e.message);
  
  // 個別置換アプローチ
  // 6記事の "excerpt" -> "subtitle", "introText" の追加, author関連の適合
  for (const slug of slugsToFix) {
    const slugIdx = content.indexOf(`"slug": "${slug}"`);
    if (slugIdx === -1) continue;
    
    // この記事のブロックの開始と終了
    const objStart = content.lastIndexOf('{', slugIdx);
    const objEnd = content.indexOf('\n  },', slugIdx) + 4;
    let block = content.slice(objStart, objEnd);

    // excerptをsubtitleに変換
    if (block.includes('"excerpt":')) {
      const excerptMatch = block.match(/"excerpt":\s*"([^"]+)"/);
      const excerptText = excerptMatch ? excerptMatch[1] : '';
      
      block = block.replace(/"excerpt":\s*"[^"]*",?\n?/, '');
      
      // subtitle, targetGender, authorId, authorName, authorRole, authorAvatar, createdAt, readTimeMinutes, introText, recommendedItemCodes, isHallOfFame を BlogPost に適合
      let addition = `    "subtitle": "${excerptText}",\n`;
      addition += `    "targetGender": "unisex",\n`;
      addition += `    "authorId": "author-tachibana",\n`;
      addition += `    "authorName": "橘 えりか",\n`;
      addition += `    "authorRole": "Qualia Navi コスメ＆美容編集長",\n`;
      addition += `    "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",\n`;
      addition += `    "createdAt": "2026-09-29",\n`;
      addition += `    "readTimeMinutes": 12,\n`;
      addition += `    "introText": "${excerptText}",\n`;
      addition += `    "isHallOfFame": true,\n`;
      
      // products を recommendedItemCodes に変換
      if (block.includes('"products":')) {
        block = block.replace('"products":', '"recommendedItemCodes":');
      }
      
      // 不要なキーの除去
      block = block.replace(/"category":\s*"[^"]*",?\n?/, '');
      block = block.replace(/"tags":\s*\[[^\]]*\],?\n?/, '');
      block = block.replace(/"date":\s*"[^"]*",?\n?/, '');
      block = block.replace(/"author":\s*"[^"]*",?\n?/, '');
      block = block.replace(/"readTime":\s*"[^"]*",?\n?/, '');

      // titleの直後に挿入
      block = block.replace(/("title":\s*"[^"]*",?\n)/, `$1${addition}`);
      
      content = content.slice(0, objStart) + block + content.slice(objEnd);
      console.log(`✅ ${slug} を BlogPost 型に完全適合させました`);
    }
  }

  fs.writeFileSync(dataTsPath, content, 'utf8');
  console.log('🎉 src/data.ts の置換修正が完了しました！');
  process.exit(0);
}

// JSONパースが成功した場合の整形
posts = posts.map(p => {
  if (slugsToFix.includes(p.slug)) {
    const subtitle = p.subtitle || p.excerpt || p.title;
    const recommendedItemCodes = p.recommendedItemCodes || p.products || [];
    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: subtitle,
      targetGender: 'unisex',
      coverImage: p.coverImage,
      authorId: 'author-tachibana',
      authorName: '橘 えりか',
      authorRole: 'Qualia Navi コスメ＆美容編集長',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      createdAt: '2026-09-29',
      readTimeMinutes: 12,
      introText: subtitle,
      recommendedItemCodes: recommendedItemCodes,
      isHallOfFame: true,
      contentMarkdown: p.contentMarkdown
    };
  }
  return p;
});

const newJson = posts.map(p => JSON.stringify(p, null, 2)).join(',\n');
const newContent = `${header}\n${newJson}\n];\n\n${footer}`;
fs.writeFileSync(dataTsPath, newContent, 'utf8');
console.log('🎉 src/data.ts を BlogPost 型に完全適合させて再書き込みしました！');
