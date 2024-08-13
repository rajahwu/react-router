// src/services/giphy/index.js
import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch(process.env.GIPHY_API_KEY);

export default gf;