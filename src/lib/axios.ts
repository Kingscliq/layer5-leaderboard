import Axios from 'axios';

const BASE_URL = 'https://discuss.layer5.io/';
export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
