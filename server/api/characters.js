export default defineEventHandler(async (event) => {
  // URL to the remote JSON file
  const url = 'https://raw.githubusercontent.com/angelwshotgun/fbcs-hsr/refs/heads/main/data/characters.json';

  try {
    const response = await fetch(url);

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
  } catch (error) {
    return { error: 'Failed to fetch data' };
  }
});
