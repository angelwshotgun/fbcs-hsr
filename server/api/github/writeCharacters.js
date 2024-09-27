// server/api/github/writeCharacters.js

import fetch from 'node-fetch';

export default defineEventHandler(async (event) => {
  const { content, message, sha } = await readBody(event); // `sha` is required if updating an existing file

  const url = `https://api.github.com/repos/angelwshotgun/fbcs-hsr/contents/data/characters.json`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: message || 'Update characters.json',
      content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'), // Encode JSON content to base64
      branch: 'main',
      sha: sha, // Include this if the file already exists
    }),
  });

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: await response.text(),
    });
  }

  const data = await response.json();
  return data;
});
