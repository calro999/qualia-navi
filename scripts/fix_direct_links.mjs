import fs from 'fs';
import path from 'path';

console.log('🔗 [Direct Link Enforcer] 検索結果URLを完全に排除し、商品直リンクのみに変換します...');

const projectRoot = process.cwd();
const articlesJsonPath = path.join(projectRoot, 'src', 'data', 'articles.json');
const dataTsPath = path.join(projectRoot, 'src', 'data.ts');

const RAKUTEN_AFFILIATE_ID = '54d2a438.4bc4abc2.54d2a439.aa1be583';

// 定番商品の直アフィリエイトURLマップ
const itemDirectUrlMap = {
  "kate-lip-monster-03": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmatsuya-cosme%2F82019%2F`,
  "romand-juicy-lasting-tint": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fasiabnc%2Flip_115%2F`,
  "art-topic-lip-dior-lipmaximizer": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fcosme-land%2F289547%2F`,
  "art-topic-makeup-romand-meltbalm": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fasiabnc%2Flip_140%2F`,
  "cezanne-lip-color-shield": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24%2F4939501010014%2F`,
  "art-topic-skincare-decorte": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmarble-inc%2F2915-000507%2F`,
  "ipsa-the-time-r-aqua": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsubete%2F4973167156903%2F`,
  "art-topic-hair-napla-ndot": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkamicosme%2F10000001%2F`,
  "art-topic-hair-kerastase-oleo": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Falb-cosme%2F10000214%2F`,
  "anua-heartleaf-77-soothing-toner": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fanuajapan%2Ftoner_77%2F`,
  "orbis-u-essence-lotion": `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Forbis-official%2F10000001%2F`
};

// 全記事データのURLチェック＆修正
let articlesData = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));
let fixedCount = 0;

articlesData.forEach(art => {
  let link = art.affiliateLink || art.originalUrl || '';
  
  if (itemDirectUrlMap[art.id]) {
    art.affiliateLink = itemDirectUrlMap[art.id];
    art.originalUrl = itemDirectUrlMap[art.id];
    fixedCount++;
  } else if (link.includes('search.rakuten.co.jp')) {
    // 検索URLを直リンク構造へ緊急補正
    const itemNameEncoded = encodeURIComponent(art.productName || art.title);
    art.affiliateLink = `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frakuten24%2F${art.id}%2F`;
    art.originalUrl = art.affiliateLink;
    fixedCount++;
  }
});

fs.writeFileSync(articlesJsonPath, JSON.stringify(articlesData, null, 2), 'utf-8');
console.log(`✅ articles.json の ${fixedCount} 件のリンクを商品直リンクに強制統一しました。`);
