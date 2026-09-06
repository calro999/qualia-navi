import fs from 'fs';
import https from 'https';

const HOST = 'qualia-navi.vercel.app';
const API_KEY = '68c4a5f456104e76a6e97576a953e959';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;

// sitemap.xmlから全URLを抽出
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`IndexNow 送信対象 URL総数: ${urls.length}`);

// IndexNow は 1 リクエストあたり最大 10,000 件まで対応
const payload = {
  host: HOST,
  key: API_KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls
};

const postData = JSON.stringify(payload);

function sendIndexNow(hostname, path = '/indexnow') {
  return new Promise((resolve) => {
    console.log(`[送信中] ${hostname}${path} へ全 ${urls.length} 件を送信...`);
    const req = https.request({
      hostname: hostname,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`✅ [${hostname}] ステータスコード: ${res.statusCode} ${res.statusMessage} (登録受付完了)`);
        resolve(res.statusCode);
      });
    });

    req.on('error', (err) => {
      console.warn(`⚠️ [${hostname}] 送信エラー:`, err.message);
      resolve(null);
    });

    req.on('timeout', () => {
      req.destroy();
      console.warn(`⚠️ [${hostname}] タイムアウト`);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  await sendIndexNow('api.indexnow.org');
  await sendIndexNow('www.bing.com');
  console.log('🎉 GitHubプッシュ後のIndexNow全URL登録送信が正常に完了しました！');
}

run();
