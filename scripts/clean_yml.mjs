import fs from 'fs';

function cleanKeyword(kw) {
  if (!kw) return '';
  return kw.toLowerCase().replace(/[\s\u3000【】\[\]（）()]/g, '');
}

function cleanArticlesYml() {
  const ymlPath = '/Users/calro/Downloads/raku-cosme/articles.yml';
  const content = fs.readFileSync(ymlPath, 'utf-8');

  // トピックブロックごとに分離
  const lines = content.split('\n');
  const topics = [];
  let currentTopic = [];
  let inTopics = false;
  let headerLines = [];

  for (const line of lines) {
    if (line.trim().startsWith('topics:')) {
      inTopics = true;
      headerLines.push(line);
      continue;
    }
    if (!inTopics) {
      headerLines.push(line);
      continue;
    }

    if (line.trim().startsWith('- id:')) {
      if (currentTopic.length > 0) {
        topics.push(currentTopic.join('\n'));
        currentTopic = [];
      }
    }
    if (inTopics) {
      currentTopic.push(line);
    }
  }
  if (currentTopic.length > 0) {
    topics.push(currentTopic.join('\n'));
  }

  console.log(`初期 YAML トピック数: ${topics.length}`);

  const seenIds = new Set();
  const seenKeywords = new Set();
  const uniqueTopics = [];
  let removedCount = 0;

  for (const topicStr of topics) {
    const idMatch = topicStr.match(/id:\s*([^\s]+)/);
    const kwMatch = topicStr.match(/keyword:\s*["']?([^"'\n]+)["']?/);

    const topicId = idMatch ? idMatch[1] : '';
    const keyword = kwMatch ? kwMatch[1] : '';
    const normKw = cleanKeyword(keyword);

    if (seenIds.has(topicId) || (normKw && seenKeywords.has(normKw))) {
      removedCount++;
      console.log(`重複排除トピック: ID=${topicId}, Keyword=${keyword}`);
      continue;
    }

    if (topicId) seenIds.add(topicId);
    if (normKw) seenKeywords.add(normKw);

    uniqueTopics.push(topicStr);
  }

  console.log(`削除された重複トピック数: ${removedCount}`);
  console.log(`クレンジング後のトピック数: ${uniqueTopics.length}`);

  const newContent = headerLines.join('\n') + '\n' + uniqueTopics.join('\n');
  fs.writeFileSync(ymlPath, newContent, 'utf-8');
  console.log('articles.yml の更新が完了しました。');
}

cleanArticlesYml();
