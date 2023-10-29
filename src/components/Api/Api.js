import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39790443-28245d1c9624c9b106532caae';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const { data } = await axios.get(
    `?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}`
  );
  return data;
};
