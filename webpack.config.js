const MODE = 'development';

const isSourceMap = MODE === 'development';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: MODE,
  entry: './src/index.ts',
  output: {
    path: `${__dirname}/public`,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: isSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isSourceMap,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        type: 'asset/inline',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  //プラグインの設定
  plugins: [
    new MiniCssExtractPlugin({
      // 抽出する CSS のファイル名
      filename: 'style.css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: ['web', 'es5'],
};
