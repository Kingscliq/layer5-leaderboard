// const { createProxyMiddleware } = require('http-proxy-middleware');

import { createProxyMiddleware } from 'http-proxy-middleware';
import { BASE_URL } from './axios';

const proxy = (app: any) => {
  app.use(
    '/', // the endpoint on your React app that requires data from the public API
    createProxyMiddleware({
      target: `${BASE_URL}`, // replace this with the base URL of the public API
      changeOrigin: true,
    })
  );
};

export default proxy;
