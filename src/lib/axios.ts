import Axios from 'axios';

export const BASE_URL = 'https://discuss.layer5.io/';
export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    // Accept: 'application/json',
    'Api-Key':
      '0deda792d73d76ec3d59b2e7d7adbfeadff0e78d3ba625afb1f828921de51c6e',
    'Api-Username': 'Lee',
  },
});
