
require("babel-register")({
  presets: ['env', 'react'],
})

require("css-modules-require-hook")({
  extensions: ['.css','.scss'],
  preprocessCss: (data, filename) =>
  require('node-sass').renderSync({
      data,
      file: filename
  }).css,
  camelCase: true,
  generateScopedName: '[name]__[local]__[hash:base64:5]'
})


const Koa = require('koa')
const views = require('koa-views')
const Router = require('koa-router')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackMHotMiddleware = require('koa-webpack-hot-middleware')
const webpackConfig = require('./webpack..config.dev')
const webpack = require('webpack')
const compiler = webpack(webpackConfig)
const routesMiddleware = require('./middleware/routesMiddleware')

const app = new Koa()
const router = new Router()

app.use(views(__dirname, './index.html', {map: {html: 'ejs'}}))
app.use(routesMiddleware.default)
app.use(router.routes())

app.use(webpackDevMiddleware(compiler), {
  noInfo: false,
  stats: {
    colors: true
  },
  publicPath: webpackConfig.output.publicPath
})
app.use(webpackMHotMiddleware(compiler))

app.listen(3003, err => {
  if (err) throw err

  console.log('app running at http://localhost:3003')
})