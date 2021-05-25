const withPWA = require('next-pwa')
const withImages = require('next-images')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable : false,
    register: true,
    sw: 'sw.js',
    runtimeCaching,
  }
})

module.exports = withImages({
  webpack(config, options) {
    return config
  }
})