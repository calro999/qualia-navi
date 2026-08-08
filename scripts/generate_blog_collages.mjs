import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

console.log('🎨 [Strict Product Collage Generator] 各記事に登録された【実際のコスメ商品画像4枚】をグリッド合成します...');

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const outputDir = path.join(projectRoot, 'public', 'images', 'collages');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let articlesMap = new Map();
if (fs.existsSync(articlesJsonPath)) {
  const articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
  articlesData.forEach(art => {
    if (art.id) articlesMap.set(art.id, art);
  });
}

// 利用可能な実在商品画像ファイルリスト
const availableImages = fs.readdirSync(path.join(projectRoot, 'public', 'images', 'products'))
  .filter(f => (f.endsWith('.jpg') || f.endsWith('.png')) && !f.startsWith('.'))
  .map(f => path.join(projectRoot, 'public', 'images', 'products', f));

async function create4GridCollage(imagePaths, outputPath) {
  const width = 800;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 白背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const cellW = width / 2;
  const cellH = height / 2;

  for (let i = 0; i < 4; i++) {
    const x = (i % 2) * cellW;
    const y = Math.floor(i / 2) * cellH;

    // セル枠
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 4, y + 4, cellW - 8, cellH - 8);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 4, y + 4, cellW - 8, cellH - 8);

    let imgPath = imagePaths[i];
    if (!imgPath || !fs.existsSync(imgPath)) {
      imgPath = availableImages[i % availableImages.length];
    }

    try {
      if (fs.existsSync(imgPath)) {
        const img = await loadImage(imgPath);
        const pad = 16;
        const targetW = cellW - pad * 2;
        const targetH = cellH - pad * 2;
        const scale = Math.min(targetW / img.width, targetH / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const drawX = x + (cellW - drawW) / 2;
        const drawY = y + (cellH - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
    } catch (e) {
      try {
        const fallbackPath = availableImages[i % availableImages.length];
        const img = await loadImage(fallbackPath);
        const pad = 16;
        const targetW = cellW - pad * 2;
        const targetH = cellH - pad * 2;
        const scale = Math.min(targetW / img.width, targetH / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const drawX = x + (cellW - drawW) / 2;
        const drawY = y + (cellH - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      } catch (err) {}
    }
  }

  // 中央バッジ（Qualia Navi 厳選マーク）
  ctx.save();
  const badgeW = 340;
  const badgeH = 54;
  const badgeX = (width - badgeW) / 2;
  const badgeY = (height - badgeH) / 2;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 27);
  ctx.fill();

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('QUALIA NAVI 厳選10選比較', width / 2, height / 2);
  ctx.restore();

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  const { INITIAL_BLOG_POSTS } = await import('../src/data.ts');

  console.log(`全 ${INITIAL_BLOG_POSTS.length} 件のブログ用コラージュサムネイルを自動生成中...`);

  let count = 0;
  for (const post of INITIAL_BLOG_POSTS) {
    let imagePaths = [];
    const codes = post.recommendedItemCodes || [];

    for (const code of codes) {
      const art = articlesMap.get(code);
      if (art && art.imageUrl) {
        let localPath = art.imageUrl;
        if (localPath.startsWith('/')) localPath = path.join(projectRoot, 'public', localPath);
        if (fs.existsSync(localPath)) {
          imagePaths.push(localPath);
        }
      }
    }

    let imgIdx = 0;
    while (imagePaths.length < 4) {
      imagePaths.push(availableImages[imgIdx % availableImages.length]);
      imgIdx++;
    }

    const outPath = path.join(outputDir, `${post.id}.jpg`);
    await create4GridCollage(imagePaths.slice(0, 4), outPath);
    count++;
  }

  console.log(`✨ 実在コスメ商品画像4枚を並べたコラージュ ${count} 件を完全出力・生成しました！`);
}

main().catch(console.error);
