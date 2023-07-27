import Axios from 'axios';

export const BASE_URL = process.env.BASE_URL || 'https://discuss.layer5.io/';
export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Cache-Control': 'private',
  },
});
