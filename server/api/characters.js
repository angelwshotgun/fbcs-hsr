import { promises as fs } from 'fs';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  // Đường dẫn đầy đủ đến file data.json
  const filePath = join(process.cwd(), 'data', 'characters.json');

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data); // Trả về dữ liệu JSON đã phân tích
  } catch (error) {
    return { error: 'Failed to read data' };
  }
});
