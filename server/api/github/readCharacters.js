// server/api/github/readCharacters.js

import fetch from 'node-fetch';

export default defineEventHandler(async (event) => {
  const token = process.env.GITHUB_TOKEN;

  console.log('GitHub Token:', token); // Debug line

  const url = `https://api.github.com/repos/angelwshotgun/fbcs-hsr/contents/data/characters.json?ref=main`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  });

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: await response.text(),
    });
  }

  const content = await response.json(); // Assuming the file content is in JSON format
  return { content };
});
