const withPWA = require('next-pwa')
const withImages = require('next-images')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable : true,
    register: true,
    scope: '/app',
    sw: 'service-worker.js',
  }
})

module.exports = withImages({
  webpack(config, options) {
    return config
  }
})