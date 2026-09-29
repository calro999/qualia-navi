import fs from 'fs';
import path from 'path';

const dataTsPath = path.resolve('src/data.ts');
let content = fs.readFileSync(dataTsPath, 'utf8');

const slugsToFix = [
  'winter-booster-serum-peeling-2026',
  'winter-toneup-base-cc-cream-2026',
  'winter-lift-rf-facial-device-2026'
];

console.log('🔧 batch 6 の 3記事を BlogPost 型に適合させます...');

for (const slug of slugsToFix) {
  const slugIdx = content.indexOf(`"slug": "${slug}"`);
  if (slugIdx === -1) {
    console.warn(`⚠️ ${slug} が見つかりませんでした`);
    continue;
  }
  
  const objStart = content.lastIndexOf('{', slugIdx);
  const objEnd = content.indexOf('\n  },', slugIdx) + 4;
  let block = content.slice(objStart, objEnd);

  if (block.includes('"excerpt":')) {
    const excerptMatch = block.match(/"excerpt":\s*"([^"]+)"/);
    const excerptText = excerptMatch ? excerptMatch[1] : '';
    
    block = block.replace(/"excerpt":\s*"[^"]*",?\n?/, '');
    
    let addition = `    "subtitle": "${excerptText}",\n`;
    addition += `    "targetGender": "unisex",\n`;
    addition += `    "authorId": "author-tachibana",\n`;
    addition += `    "authorName": "橘 えりか",\n`;
    addition += `    "authorRole": "Qualia Navi コスメ＆美容編集長",\n`;
    addition += `    "authorAvatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",\n`;
    addition += `    "createdAt": "2026-09-29",\n`;
    addition += `    "readTimeMinutes": 13,\n`;
    addition += `    "introText": "${excerptText}",\n`;
    addition += `    "isHallOfFame": true,\n`;
    
    if (block.includes('"products":')) {
      block = block.replace('"products":', '"recommendedItemCodes":');
    }
    
    block = block.replace(/"category":\s*"[^"]*",?\n?/, '');
    block = block.replace(/"tags":\s*\[[^\]]*\],?\n?/, '');
    block = block.replace(/"date":\s*"[^"]*",?\n?/, '');
    block = block.replace(/"author":\s*"[^"]*",?\n?/, '');
    block = block.replace(/"readTime":\s*"[^"]*",?\n?/, '');

    block = block.replace(/("title":\s*"[^"]*",?\n)/, `$1${addition}`);
    
    content = content.slice(0, objStart) + block + content.slice(objEnd);
    console.log(`✅ ${slug} を BlogPost 型に完全適合させました`);
  }
}

fs.writeFileSync(dataTsPath, content, 'utf8');
console.log('🎉 src/data.ts の型適合修正が完了しました！');
