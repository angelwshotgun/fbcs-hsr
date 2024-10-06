// server/api/github.post.ts
import { defineEventHandler, readBody } from "h3";
import { Octokit } from "@octokit/rest";

export default defineEventHandler(async (event) => {
  const {
    action,
    owner,
    repo,
    path,
    content,
    message,
    branch = "main",
  } = await readBody(event);

  const config = useRuntimeConfig();
  const octokit = new Octokit({
    auth: config.GITHUB_TOKEN,
  });

  // Helper function to encode/decode base64
  const base64 = {
    encode: (str) => Buffer.from(str).toString("base64"),
    decode: (str) => Buffer.from(str, "base64").toString(),
  };

  try {
    switch (action) {
      case "readFile":
        const { data: fileData } = await octokit.repos.getContent({
          owner,
          repo,
          path,
          ref: branch,
        });

        if ("content" in fileData) {
          const decodedContent = base64.decode(fileData.content);
          const jsonContent = JSON.parse(decodedContent);
          return { content: jsonContent };
        } else {
          throw new Error("File content not found");
        }

      case "writeFile":
        let fileSha;
        try {
          const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path,
            ref: branch,
          });
          fileSha = data.sha;
        } catch (error) {
          // File doesn't exist, which is fine for creating a new file
        }

        const response = await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path,
          message,
          content: base64.encode(content),
          branch,
          ...(fileSha && { sha: fileSha }),
        });

        return { success: true, data: response.data };

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    console.error("GitHub API Error:", error);
    return { error: error.message };
  }
});
