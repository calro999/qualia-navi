import https from 'https';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('📡 [IndexNow Ping] サイトマップおよび全記事URLのIndexNow送信を開始します...');

const domain = 'https://qualia-navi.vercel.app';
const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

const articleIds = [];
const jsonPath = resolve(process.cwd(), 'src', 'data', 'articles.json');
if (existsSync(jsonPath)) {
  const jsonContent = readFileSync(jsonPath, 'utf8');
  const articles = JSON.parse(jsonContent);
  articles.forEach(art => {
    if (art.id && !articleIds.includes(art.id)) {
      articleIds.push(art.id);
    }
  });
}

// Extract feature / blog URLs from data.ts
const featureUrls = [];
const dataTsPath = resolve(process.cwd(), 'src', 'data.ts');
if (existsSync(dataTsPath)) {
  const content = readFileSync(dataTsPath, 'utf8');
  const startIdx = content.indexOf('export const INITIAL_BLOG_POSTS: BlogPost[] = [');
  const endIdx = content.indexOf('export const INITIAL_COMPARISONS: ProductComparison[] = [');
  if (startIdx !== -1 && endIdx !== -1) {
    const block = content.slice(startIdx, endIdx);
    const matches = [...block.matchAll(/"id":\s*"([^"]+)"[\s\S]*?"slug":\s*"([^"]+)"/g)];
    matches.forEach(m => {
      featureUrls.push(`https://${host}/features/${m[1]}`);
      if (m[2] !== m[1]) featureUrls.push(`https://${host}/features/${m[2]}`);
    });
  }
}

const urlList = [
  `https://${host}/`,
  `https://${host}/blogs`,
  `https://${host}/features`,
  ...featureUrls,
  ...articleIds.slice(0, 1000).map(id => `https://${host}/articles/${id}`)
];

const postData = JSON.stringify({
  host: host,
  key: apiKey,
  keyLocation: keyLocation,
  urlList: urlList
});

const req = https.request({
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  console.log(`✅ [IndexNow Response] Status Code: ${res.statusCode} (Bing/Copilot/Yandex 登録受付完了 - 対象URL: ${urlList.length}件)`);
});

req.on('error', (e) => {
  console.warn(`⚠️ [IndexNow Warning] ${e.message}`);
});

req.write(postData);
req.end();
