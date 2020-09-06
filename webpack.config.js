const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: 'last 2 versions, not dead, not <2%, not ie 11',

                useBuiltIns: 'entry',
              },
            ],
            '@babel/preset-react',
            '@babel/typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           auto: true,
      //           compileType: 'module',
      //           localIdentName: '[path][name]__[local]--[hash:base64:5]',
      //         },
      //       },
      //     },
      //     {
      //       loader: 'postcss-loader', // Run post css actions
      //       options: {
      //         plugins: function () {
      //           // post css plugins, can be exported to postcss.config.js
      //           return [require('precss'), require('autoprefixer')];
      //         },
      //       },
      //     },
      //     // 'sass-loader', // compiles Sass to CSS
      //   ],
      // },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      API_URL:
        process.env.NODE_ENV === 'production'
          ? JSON.stringify('https://shrouded-meadow-36658.herokuapp.com')
          : JSON.stringify('http://localhost:3000'),
    }),
  ],
};
