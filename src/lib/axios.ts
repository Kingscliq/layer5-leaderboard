import Axios from 'axios';

export const BASE_URL = 'https://discuss.layer5.io/';
export const axios = Axios.create({
  baseURL: '/',
});
