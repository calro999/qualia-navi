import fs from 'fs';
import path from 'path';
import { create4GridCollage } from './generate_clean_collages.mjs';

async function generateCollages() {
  const dataTsText = fs.readFileSync('src/data.ts', 'utf-8');
  const match = dataTsText.match(/export const INITIAL_BLOG_POSTS: BlogPost\[\] = (\[[\s\S]*?\]);/);
  if (!match) return;

  const posts = JSON.parse(match[1]);
  console.log(`Generating grid collage cover thumbnails for ${posts.length} posts...`);

  for (const post of posts) {
    const md = post.contentMarkdown || '';
    const regex = /!\[.*?\]\(([\/a-zA-Z0-9_\-\.]+\.(?:jpg|png))\)/g;
    const imgMatches = [];
    let m;
    while ((m = regex.exec(md)) !== null) {
      imgMatches.push(m[1]);
    }
    const imagePaths = imgMatches.slice(0, 4);
    
    const outPath = path.join(process.cwd(), 'public', 'images', 'collages', `${post.id}.jpg`);
    await create4GridCollage(imagePaths, outPath);
  }
  console.log('🎉 All grid collage thumbnails generated successfully!');
}

generateCollages().catch(console.error);
