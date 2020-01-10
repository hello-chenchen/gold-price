const resolve = require('path').resolve
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const url = require('url')
const publicPath = ''


module.exports = (options = {dev: false}) => ({
  mode: "production",
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: options.dev ?  '/assets/' : publicPath
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: ['url-loader']
      },
      {
        test: /\.(jpeg|jpg|png)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false
          }
        }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.css']
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  }
  // devtool: options.dev ? '#source-map' : '#nosources-source-map'
})
