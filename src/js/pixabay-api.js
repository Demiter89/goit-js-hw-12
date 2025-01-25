import axios from 'axios';

const API_KEY = '48302309-d155748c9a8bdc74060d05abe'; 
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        page,
        per_page: 15,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}