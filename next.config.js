const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable : true,
    register: true,
    scope: '/app',
    sw: 'service-worker.js',
  }
})