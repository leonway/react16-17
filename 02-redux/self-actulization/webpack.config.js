const path = require('path')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname,'src')
const distPath = path.resolve(__dirname,'dist')

module.exports = {
  mode:'development',
  entry:'./src/main.js',
  output:{
    filename:'bundle.js',
    path:distPath
  },
  devtool:'eval-cheap-module-source-map',
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        exclude: /(node_modules|src\/libs)/,
        include:srcPath,
        loader:"babel-loader",
        options:{
          // cacheDirectory:true
         
        }
      },
      {
        test:/\.css$/,
        include:srcPath,
        use:styleLoaderConfig()
      },
      {
        test: /\.less$/,
        resource: path.resolve(__dirname,'src/index.less'),
        use:styleLoaderConfig({ useCssModule: false })
      },
      {
        test: /\.less$/,
        include: /(src\/pages|src\/components|src\/containers)/,
        use: styleLoaderConfig({ useCssModule: true }),
        exclude: /(node_modules)/
      },
    ]
  },
  plugins:[
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   favicon: './public/favicon.ico',
    //   filename: 'index.html',
    //   title: 'webpack5.0',
    //   inject: 'body',
    //   // minify: {
    //   //     minifyJS: true,
    //   //     minifyCSS: true,
    //   //     removeComments: true,
    //   //     collapseWhitespace: true,
    //   //     removeAttributeQuotes: true
    //   // }
    //   }),
    //   new MiniCssExtractPlugin({
    //     filename: filesNameMapper.cssFilename,
    //     chunkFilename: filesNameMapper.cssChunkFilename
    //   }),
  ],
  devServer:{
    overlay: {//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
        errors: true
    },
    contentBase:distPath,
    hot:true
  },
  performance: {
    hints: false, 
  },
  cache: true,
}

function styleLoaderConfig(options={}) {
  const useCssModule = options.useCssModule || false;
  return [
      // isDev 
      // ?'style-loader' 
      //  : MiniCssExtractPlugin.loader,
      'style-loader',
      // {
      //     loader: 'cache-loader',
      //     options: {
      //         cacheDirectory: path.join(cachePath, 'csscache')
      //     }
      // },
      {
          loader: 'css-loader',
          options: {
              // importLoaders: 2,
              modules: useCssModule,
              // localIdentName: '[local]--[hash:base64:4]'
          }
      },
      // {
      //     loader: 'postcss-loader',
      //     options: {
      //         config: {
      //             path: path.join(__dirname, 'postcss.config.js'),
      //             ctx: {
      //                 autoprefixer: {
      //                     browsers: ['Safari >= 10', 'last 1 firefox version', 'Chrome >= 62', 'Explorer >= 10']
      //                 },
      //                 cssnano: { preset: 'default' },
      //                 cssVariables: {}
      //             }
      //         }
      //     }
      // },
      {
          loader: 'less-loader',
          options: {
              // javascriptEnabled: true,
              // modifyVars: {
              //     '@primary-color': '#00c3c1',
              //     '@link-color': '#00c3c1'
              // }
          }
      }
  ];
}
