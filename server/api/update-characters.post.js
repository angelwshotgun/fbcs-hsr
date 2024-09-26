export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { characters } = body;

  // URL to the remote JSON file for characters
  const url = 'https://api.github.com/repos/angelwshotgun/fbcs-hsr/contents/data/characters.json';
  const token = process.env.GITHUB_TOKEN; // Replace with your GitHub token if needed

  try {
    // Fetch the current data to get the SHA of the file (required by GitHub API)
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the current data');
    }

    const fileData = await response.json();
    const sha = fileData.sha;

    // Prepare the request to update the file
    const updateResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'Update characters.json',
        content: Buffer.from(JSON.stringify(characters, null, 2)).toString('base64'),
        sha: sha, // The SHA of the file being replaced
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update the data');
    }

    return {
      success: true,
      message: 'Characters updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error saving characters.',
      error: error.message,
    };
  }
});
