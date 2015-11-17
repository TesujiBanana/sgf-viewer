var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client/entry',
  ],
  output: {
    path: __dirname + '/public/js/',
    filename: 'app.js',
    publicPath: 'http://localhost:8080/js/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', ".jsx"]
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
}
