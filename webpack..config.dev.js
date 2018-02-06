const path = require('path'),
      webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    bundle: [
      './client',
      'webpack-hot-middleware/client'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    //  确保生成一致的哈希值
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 热模块替换
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}