const fetchJson = async () => {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    throw error;
  }
};

export default fetchJson;
