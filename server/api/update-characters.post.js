// server/api/update-characters.post.js
import fs from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { characters } = body;

  try {
    const filePath = path.resolve('data/characters.json');
    await fs.writeFile(filePath, JSON.stringify(characters, null, 2));

    return {
      success: true,
      message: 'Characters updated successfully.'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error saving characters.',
      error
    };
  }
});
