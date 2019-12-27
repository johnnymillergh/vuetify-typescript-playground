'use strict'
const path = require('path')

// Dev port
const port = 8081

process.env.VUE_APP_PACKAGE_JSON = escape(JSON.stringify(require('./package.json')))

function getAppName () {
  const applicationName = JSON.parse(unescape(process.env.VUE_APP_PACKAGE_JSON)).name.replace(/-/g, ' ').toLocaleUpperCase()
  if (process.env.VUE_APP_ENV !== 'prod') {
    return applicationName.concat(' (', process.env.VUE_APP_ENV, ')')
  }
  return applicationName
}

function resolve (dir) {
  return path.join(__dirname, dir)
}

/**
 * Generate public path by environment.
 * @return {string} public path
 */
function generatePublicPath () {
  // FIXME: ATTENTION: Relative path prefix should start with a dot './'
  //  DON'T add the dot when the environment is development, or browser will throw en error like this:
  //  Uncaught SyntaxError: Unexpected token <
  const runOnDocker = process.env.VUE_APP_RUN_ON_DOCKER
  console.error(`This application is running on Docker: ${runOnDocker}, type of runOnDocker: ${typeof runOnDocker}`)
  const pathPrefix = runOnDocker === 'true' ? './' : '/'
  const env = process.env.NODE_ENV
  if (env === 'production') {
    console.error(`pathPrefix: ${pathPrefix}`)
    return pathPrefix
  }
  const applicationName = JSON.parse(unescape(process.env.VUE_APP_PACKAGE_JSON)).name
  if (applicationName) {
    return applicationName ? pathPrefix.concat(applicationName, '-', env, '/') : pathPrefix
  }
  console.error(`pathPrefix: ${pathPrefix}`)
  return pathPrefix
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * ATTENTION: You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * <a href="https://cli.vuejs.org/config/#publicpath">Click me to view detail</a>
   *
   * ATTENTION: If static server is Nginx, the public path should be relative (with dot slash ./).
   *            If static server is http-server (Node), the public path should be absolute (with slash /).
   * The value of publicPath can also be set to an empty string ('') or a relative path (./) so that all assets are
   * linked using relative paths. This allows the built bundle to be deployed under any public path,
   * or used in a file system based environment like a Cordova hybrid app.
   */
  publicPath: generatePublicPath(),
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    // FIXME: Disable to open browser automatically,
    //  due to error: URIError: Failed to decode param '/%3C%=%20BASE_URL%20%%3Efavicon.ico'
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: getAppName(),
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
