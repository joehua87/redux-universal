module.exports = {
  production: {
    apiEndpoint: 'http://45.79.94.169:3030',
    db: 'mongodb://127.0.0.1/blog',
    port: '2030',
  },
  dev: {
    apiEndpoint: 'http://45.79.94.169:3030', // Temporary config - Use http://localhost:3030
    db: 'mongodb://127.0.0.1/blog-dev',
    port: '3030',
  },
}
