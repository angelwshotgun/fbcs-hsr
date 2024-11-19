import { readFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const filePath = join(process.cwd(), 'data', 'light_cones34.json'); // Đường dẫn tới file JSON
  try {
    const data = await readFile(filePath, 'utf-8'); // Đọc file JSON
    return JSON.parse(data); // Trả về dữ liệu JSON
  } catch (error) {
    return { error: 'Unable to read data file', details: error.message };
  }
});
