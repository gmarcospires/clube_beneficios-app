// const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
  // async serverMiddleware() {
  //   // Proxy API requests to Laravel
  //   this.app.use(
  //     '/api',
  //     createProxyMiddleware({
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //     })
  //   );
  // },
};
