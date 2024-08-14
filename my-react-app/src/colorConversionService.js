// src/colorConversionService.js
import axios from 'axios';

const API_URL = 'https://api.color-converter.com/convert'; // Replace with the actual API URL
const API_KEY = 'your-api-key'; // Replace with your API key if needed

export const convertColor = async (color, fromFormat, toFormat) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        color,
        from: fromFormat,
        to: toFormat,
        apiKey: API_KEY, // Include this if the API requires an API key
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error converting color:', error);
    throw error;
  }
};
