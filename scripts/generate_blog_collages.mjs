import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

console.log('🎨 [Collage Generator Master] 全96件の特集記事用 4分割グリッドコラージュサムネイルの生成を開始します...');

const projectRoot = process.cwd();
const dataTsPath = path.join(projectRoot, 'src', 'data.ts');
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

// デフォルト画像リスト
const defaultImages = [
  path.join(projectRoot, 'public', 'images', 'products', 'decorte_liposome.jpg'),
  path.join(projectRoot, 'public', 'images', 'products', 'kate_lipmonster.jpg'),
  path.join(projectRoot, 'public', 'images', 'products', 'anessa_gold_milk.jpg'),
  path.join(projectRoot, 'public', 'images', 'products', 'romand_tint.jpg')
];

async function create4GridCollage(imagePaths, outputPath, titleText) {
  const width = 800;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景グラデーション
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#fdfbfb');
  bgGrad.addColorStop(1, '#ebedee');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  const cellW = width / 2;
  const cellH = height / 2;

  for (let i = 0; i < 4; i++) {
    const x = (i % 2) * cellW;
    const y = Math.floor(i / 2) * cellH;

    // セル背景枠
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 6, y + 6, cellW - 12, cellH - 12);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 6, y + 6, cellW - 12, cellH - 12);

    let imgPath = imagePaths[i];
    if (!imgPath || !fs.existsSync(imgPath)) {
      imgPath = defaultImages[i % defaultImages.length];
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
      // フォールバック描画
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(x + 10, y + 10, cellW - 20, cellH - 20);
    }
  }

  // 中央バッジ（Qualia Navi 特集マーク）
  ctx.save();
  const badgeW = 340;
  const badgeH = 54;
  const badgeX = (width - badgeW) / 2;
  const badgeY = (height - badgeH) / 2;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 27);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('QUALIA NAVI 厳選10選比較', width / 2, height / 2);
  ctx.restore();

  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.92 });
  fs.writeFileSync(outputPath, buffer);
}

async function main() {
  const dataTsContent = fs.readFileSync(dataTsPath, 'utf-8');
  
  // INITIAL_BLOG_POSTS からすべての記事IDとrecommendedItemCodesを正確にパース
  const { INITIAL_BLOG_POSTS } = await import('../src/data.ts');

  console.log(`全 ${INITIAL_BLOG_POSTS.length} 件の特集記事の4分割サムネイルを自動合成生成中...`);

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

    // 補充
    while (imagePaths.length < 4) {
      imagePaths.push(defaultImages[imagePaths.length % defaultImages.length]);
    }

    const outPath = path.join(outputDir, `${post.id}.jpg`);
    await create4GridCollage(imagePaths.slice(0, 4), outPath, post.title);
    count++;
  }

  console.log(`✨ 全 ${count} 件の4分割コラージュサムネイル画像が /public/images/collages/ に完全出力されました！`);
}

main().catch(console.error);
