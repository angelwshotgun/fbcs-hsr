import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const filePath = join(process.cwd(), "data/light_cones.json");

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === "GET") {
    // Đọc dữ liệu từ file JSON
    try {
      const data = await readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw createError({ statusCode: 500, statusMessage: "Error reading file" });
    }
  }

  if (method === "POST") {
    // Ghi dữ liệu vào file JSON
    try {
      const body = await readBody(event);
      if (!body) {
        throw createError({ statusCode: 400, statusMessage: "No data provided" });
      }

      // Đọc dữ liệu hiện tại
      const data = JSON.parse(await readFile(filePath, "utf-8"));

      // Thêm dữ liệu mới
      const newEntry = { ...body, id: Date.now() };
      data.push(newEntry);

      // Ghi lại file
      await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
      return { success: true, data: newEntry };
    } catch (error) {
      throw createError({ statusCode: 500, statusMessage: "Error writing to file" });
    }
  }

  return createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});
