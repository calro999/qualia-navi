import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

console.log('🎨 [100% Real Product Collage Generator] 各記事の厳選商品4枚を実画像合成します...');

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, 'public', 'images', 'collages');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

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
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 4, y + 4, cellW - 8, cellH - 8);

    let imgPath = imagePaths[i];
    if (imgPath && imgPath.startsWith('/')) {
      imgPath = path.join(projectRoot, 'public', imgPath);
    }

    try {
      if (imgPath && fs.existsSync(imgPath)) {
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
      console.warn(`Could not load image ${imgPath}:`, e.message);
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

// Export for usage or execute if standalone
export { create4GridCollage };
