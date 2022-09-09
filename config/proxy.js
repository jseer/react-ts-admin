const proxy = {
  local: {
    '/api': {
      target: 'http://localhost:7001',
      changeOrigin: true,
    },
  },
};

module.exports = proxy[process.env.PROXY_ENV];
