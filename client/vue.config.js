const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'), // build all the assets inside server/public folder
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/global.scss')]
    }
  },
  chainWebpack: config => {
    if (config.plugins.has('optimize-css')) {
      config.plugins.delete('optimize-css')
    }
  }
}
