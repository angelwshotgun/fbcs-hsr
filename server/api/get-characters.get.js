// server/api/get-characters.get.js
import fs from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    const filePath = path.resolve('data/characters.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {
      success: false,
      message: 'Error reading characters.',
      error
    };
  }
});
