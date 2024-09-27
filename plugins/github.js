// plugins/github.js
import { Octokit } from "@octokit/rest";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  const octokit = new Octokit({
    auth: config.public.GITHUB_TOKEN
  });

  // Helper function to encode/decode base64 that works in both Node.js and browser
  const base64 = {
    encode: (str) => {
      if (typeof window === 'undefined') {
        return Buffer.from(str).toString('base64');
      } else {
        return btoa(unescape(encodeURIComponent(str)));
      }
    },
    decode: (str) => {
      if (typeof window === 'undefined') {
        return Buffer.from(str, 'base64').toString();
      } else {
        return decodeURIComponent(escape(atob(str)));
      }
    }
  };

  return {
    provide: {
      github: {
        async readFile(owner, repo, path, ref = 'main') {
          try {
            const response = await octokit.repos.getContent({
              owner,
              repo,
              path,
              ref,
            });
            
            const content = base64.decode(response.data.content);
            return content;
          } catch (error) {
            console.error('Error reading file:', error);
            throw error;
          }
        },
        
        async writeFile(owner, repo, path, content, message, branch = 'main') {
          try {
            // First, get the current file (if it exists) to get its SHA
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

            // Now, create or update the file
            const response = await octokit.repos.createOrUpdateFileContents({
              owner,
              repo,
              path,
              message,
              content: base64.encode(content),
              branch,
              ...(fileSha && { sha: fileSha }), // Include SHA if updating an existing file
            });

            return response.data;
          } catch (error) {
            console.error('Error writing file:', error);
            throw error;
          }
        },
      },
    },
  };
});