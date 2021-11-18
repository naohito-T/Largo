const MODE = 'development';

const isSourceMap = MODE === 'development';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @desc SPAではなく通常の画面遷移で、それぞれの画面ごとに異なるJSファイルを読み込むことになると複数のエントリーファイルが必要になる。
 * @see http://webdesign-dackel.com/2015/09/10/webpack-multiple-output/
 */

module.exports = {
  mode: MODE,
  entry: {
    index: './src/index.ts',
    'cube/cube': './src/lib/cube.ts',
    'hobby/hobby': './src/hobby.ts',
    'cube-triagle/cubeTriagle': './src/cubeTriagle.ts',
    'wave/wave': './src/lib/service/wave.ts',
  },
  output: {
    path: `${__dirname}/public`,
    filename: './[name].bundle.js',
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
      filename: './[name].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: ['web', 'es5'],
};
