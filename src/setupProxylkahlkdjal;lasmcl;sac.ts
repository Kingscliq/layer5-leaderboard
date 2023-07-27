import { createProxyMiddleware } from 'http-proxy-middleware';
import { BASE_URL } from './lib/axios';

const proxy = (app: any) => {
  app.use(
    '/discuss',
    createProxyMiddleware({
      target: `${BASE_URL}`,
      changeOrigin: true,
    })
  );
};

// "proxy": "https://discuss.layer5.io/directory_items.json"
export default proxy;
