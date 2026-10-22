const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.BACKEND_PROXY_TARGET || 'http://localhost:5001',
      changeOrigin: true,
    })
  );
  app.use(
    '/uploads',
    createProxyMiddleware({
      target: process.env.BACKEND_PROXY_TARGET || 'http://localhost:5001',
      changeOrigin: true,
    })
  );
};
