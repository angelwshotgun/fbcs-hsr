// server/api/update-character-point.post.js
import fs from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, newPoints } = body;

  try {
    const filePath = path.resolve('data/characters.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const characters = JSON.parse(data);

    if (characters[id]) {
      characters[id].point = newPoints;

      await fs.writeFile(filePath, JSON.stringify(characters, null, 2));
      return {
        success: true,
        message: 'Character points updated successfully.'
      };
    } else {
      return {
        success: false,
        message: 'Character not found.'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error updating character points.',
      error
    };
  }
});
