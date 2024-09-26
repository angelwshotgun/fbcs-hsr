// server/api/update-characters.post.js
import fs from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { light_cones } = body;

  try {
    const filePath = path.resolve('data/light_cones.json');
    await fs.writeFile(filePath, JSON.stringify(light_cones, null, 2));

    return {
      success: true,
      message: 'light_cones updated successfully.'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error saving light_cones.',
      error
    };
  }
});
