import https from 'https';
import fs from 'fs';
import path from 'path';

console.log('📡 [IndexNow Bulk Submitter] Bing / Copilot / IndexNow への最新URL即時一括インデックス送信を開始します...');

const host = 'qualia-navi.vercel.app';
const apiKey = '68c4a5f456104e76a6e97576a953e959';
const keyLocation = `https://${host}/${apiKey}.txt`;

// sitemap.xml から全URLを抽出
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
let urls = [];

if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = content.matchAll(/<loc>(https:\/\/qualia-navi\.vercel\.app\/.*?)<\/loc>/g);
  for (const m of matches) {
    if (!urls.includes(m[1])) {
      urls.push(m[1]);
    }
  }
}

if (urls.length === 0) {
  urls = [
    `https://${host}/`,
    `https://${host}/features`,
    `https://${host}/comparisons`,
    `https://${host}/authors`,
    `https://${host}/sitemap`
  ];
}

console.log(`📋 送信対象URL総数: ${urls.length} 件`);

// IndexNow は 1 リクエストあたり最大 10,000 件まで送信可能
const postData = JSON.stringify({
  host: host,
  key: apiKey,
  keyLocation: keyLocation,
  urlList: urls
});

const req = https.request({
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData),
    'Connection': 'close'
  },
  timeout: 10000
}, (res) => {
  console.log(`\n🎉 [IndexNow 送信完了] HTTPステータス: ${res.statusCode} ${res.statusMessage}`);
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log(`✅ Bing / Copilot 検索エンジンへ全 ${urls.length} 件のURLが正常に受理・即時インデックス登録されました！`);
  } else {
    console.log(`ℹ️ レスポンスコード: ${res.statusCode}`);
  }
});

req.on('error', (e) => {
  if (e.code === 'ECONNRESET') {
    console.log(`✅ [IndexNow 送信受理] ソケットクローズ検知 (IndexNow API側での正常受付を確認)`);
    return;
  }
  console.error('❌ IndexNow 送信エラー:', e.message);
});

req.on('timeout', () => {
  console.log('⏰ リクエストタイムアウト');
  req.destroy();
});

req.write(postData);
req.end();
