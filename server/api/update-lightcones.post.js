export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { light_cones } = body;

  // URL to the remote JSON file for light cones
  const url = 'https://api.github.com/repos/angelwshotgun/fbcs-hsr/contents/data/light_cones.json';
  const token = process.env.GITHUB_TOKEN; // Using the GitHub token from your .env file

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
        message: 'Update light_cones.json',
        content: Buffer.from(JSON.stringify(light_cones, null, 2)).toString('base64'),
        sha: sha, // The SHA of the file being replaced
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update the data');
    }

    return {
      success: true,
      message: 'light_cones updated successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error saving light_cones.',
      error: error.message,
    };
  }
});
