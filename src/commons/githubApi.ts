import axios from 'axios';

const token = APP_TOKEN;

export const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
