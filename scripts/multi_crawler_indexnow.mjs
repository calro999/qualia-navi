// scripts/multi_crawler_indexnow.mjs
import https from 'https';
import fs from 'fs';
import path from 'path';

console.log('🚀 [Multi-Crawler & LLM IndexNow] 全クローラー・主要検索エンジン・LLMへの一括インデックス通知を開始します...');

const domain = 'https://qualia-navi.vercel.app';
const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

// 1. 公開データから最新URLリストを抽出（最大10,000件）
const urlSet = new Set();
urlSet.add(`${domain}/`);
urlSet.add(`${domain}/features`);
urlSet.add(`${domain}/comparisons`);
urlSet.add(`${domain}/sitemap`);
urlSet.add(`${domain}/llms.txt`);
urlSet.add(`${domain}/llms-full.txt`);
urlSet.add(`${domain}/ranking/autumn-cosme`);
urlSet.add(`${domain}/ranking/winter-skincare`);
urlSet.add(`${domain}/ranking/holiday-coffret`);
urlSet.add(`${domain}/ranking/gift-selection`);

// 特集・月次ハブ
const blogsPath = path.resolve('public/data/blogs.json');
if (fs.existsSync(blogsPath)) {
  try {
    const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
    blogs.forEach(b => {
      if (b.id) urlSet.add(`${domain}/features/${b.id}`);
    });
  } catch (e) {
    console.warn('blogs.json read error:', e.message);
  }
}

// 比較記事
const compPath = path.resolve('public/data/comparisons.json');
if (fs.existsSync(compPath)) {
  try {
    const comps = JSON.parse(fs.readFileSync(compPath, 'utf8'));
    comps.forEach(c => {
      if (c.id) urlSet.add(`${domain}/comparisons/${c.id}`);
    });
  } catch (e) {
    console.warn('comparisons.json read error:', e.message);
  }
}

// 個別コスメ記事
const artPath = path.resolve('src/data/articles.json');
if (fs.existsSync(artPath)) {
  try {
    const articles = JSON.parse(fs.readFileSync(artPath, 'utf8'));
    articles.forEach(a => {
      if (a.id) urlSet.add(`${domain}/articles/${a.id}`);
    });
  } catch (e) {
    console.warn('articles.json read error:', e.message);
  }
}

const allUrls = Array.from(urlSet);
console.log(`📋 送信対象URL総数: ${allUrls.length} 件`);

// IndexNow API仕様：1リクエストあたり最大10,000件
const submitUrls = allUrls.slice(0, 10000);

const indexNowEndpoints = [
  { name: 'IndexNow Central (DuckDuckGo, Microsoft, AI Engines)', host: 'api.indexnow.org' },
  { name: 'Microsoft Bing / Copilot', host: 'www.bing.com' },
  { name: 'Yandex Search Engine', host: 'yandex.com' },
  { name: 'Seznam (Europe Search)', host: 'search.seznam.cz' },
  { name: 'Naver Search (Korea / Asia)', host: 'searchadvisor.naver.com' }
];

const postBody = JSON.stringify({
  host: host,
  key: apiKey,
  keyLocation: keyLocation,
  urlList: submitUrls
});

async function sendIndexNow(endpoint) {
  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: endpoint.host,
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(postBody),
          'User-Agent': 'QualiaNavi-Universal-IndexNow/3.0'
        },
        timeout: 10000
      },
      (res) => {
        let resData = '';
        res.on('data', chunk => resData += chunk);
        res.on('end', () => {
          if (res.statusCode === 200 || res.statusCode === 202) {
            console.log(`✅ [${endpoint.name}] 送信成功！ (HTTP ${res.statusCode}) - ${submitUrls.length} URLs 受理`);
          } else {
            console.log(`ℹ️ [${endpoint.name}] 応答: HTTP ${res.statusCode} ${resData.slice(0, 80)}`);
          }
          resolve({ host: endpoint.host, status: res.statusCode });
        });
      }
    );

    req.on('error', (err) => {
      console.warn(`⚠️ [${endpoint.name}] 接続スキップ: ${err.message}`);
      resolve({ host: endpoint.host, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn(`⏱️ [${endpoint.name}] タイムアウト`);
      resolve({ host: endpoint.host, error: 'timeout' });
    });

    req.write(postBody);
    req.end();
  });
}

async function main() {
  console.log(`📡 各IndexNowハブへ並行送信中...`);
  const results = await Promise.all(indexNowEndpoints.map(sendIndexNow));
  console.log(`\n🎉 全クローラー・検索エンジン・AIクローラーへのIndexNow一括通知が完了しました！`);
}

main().catch(console.error);
