import { put, get } from '@vercel/blob';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === "GET") {
    try {
      const blob = await get('light_cones11.json');
      return JSON.parse(await blob.text());
    } catch (error) {
      throw createError({ 
        statusCode: 500, 
        statusMessage: "Error reading characters" 
      });
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event);
      if (!body) {
        throw createError({ 
          statusCode: 400, 
          statusMessage: "No data provided" 
        });
      }

      // Read existing data
      let data = [];
      try {
        const existingBlob = await get('characters.json');
        data = JSON.parse(await existingBlob.text());
      } catch {
        // File might not exist yet
      }

      // Add new entry
      const newEntry = { ...body, id: Date.now() };
      data.push(newEntry);

      // Write back to blob storage
      await put('characters.json', JSON.stringify(data, null, 2), {
        access: 'private'
      });

      return { success: true, data: newEntry };
    } catch (error) {
      throw createError({ 
        statusCode: 500, 
        statusMessage: "Error writing characters" 
      });
    }
  }

  return createError({ 
    statusCode: 405, 
    statusMessage: "Method Not Allowed" 
  });
});