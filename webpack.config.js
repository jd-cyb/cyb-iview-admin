/**
 * =================================
 * @2018 塞伯坦-CYB前端模块化工程构建工具
 * https://github.com/jd-cyb/cyb-cli
 * =================================
 */

const eslintFriendlyFormatter = require('eslint-friendly-formatter')
const config = require('./cyb.config.js')

const eslintLoader = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  exclude: /(node_modules|bower_components)/,
  options: {
    formatter: eslintFriendlyFormatter,
    emitWarning: true
  }
})

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': 'views/index',
      '_c': 'views/index/components',
      '_conf': 'views/config'
    }
  },
  module: {
    rules: [
      ...(config.eslint.available ? [eslintLoader()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
