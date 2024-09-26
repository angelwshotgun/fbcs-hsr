export default defineEventHandler(async (event) => {
  // URL to the remote JSON file for light cones
  const url = 'https://raw.githubusercontent.com/angelwshotgun/fbcs-hsr/refs/heads/main/data/light_cones.json';

  try {
    const response = await fetch(url);

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return {
      success: true,
      data, // Return the fetched data
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching light cones.',
      error: error.message, // Return the error message
    };
  }
});
