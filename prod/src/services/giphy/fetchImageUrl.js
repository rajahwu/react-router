// src/services/giphy/fetchImageUrl.js
import { GiphyFetch } from '@giphy/js-fetch-api';

// Ensure that process.env.GIPHY_API_KEY is defined
if (!process.env.GIPHY_API_KEY) {
  throw new Error("GIPHY_API_KEY environment variable is not defined");
}

const gf = new GiphyFetch(process.env.GIPHY_API_KEY);

export async function fetchImageUrl(term) {
  try {
    const { data } = await gf.search(term, { limit: 1 });
    return data.length > 0 ? data[0].images.original.url : '';
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
}
