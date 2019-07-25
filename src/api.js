import axios from 'axios';

// This file create a baseURL

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;