import { Configuration } from 'webpack';
const MODE = 'development';
const enabledSourceMap = MODE === 'development';
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * @desc SPAではなく通常の画面遷移で、それぞれの画面ごとに異なるJSファイルを読み込むことになると複数のエントリーファイルが必要になる。
 * @see http://webdesign-dackel.com/2015/09/10/webpack-multiple-output/
 */

const config: Configuration = {
  mode: MODE,
  target: 'node',
  externalsPresets: { node: true },
  resolve: {
    extensions: ['.ts', '.js'], // import時に拡張子がなくてもよくする
  },
  entry: {
    index: './src/index.ts',
    'cube/cube': './src/lib/cube.ts',
    'hobby/hobby': './src/hobby.ts',
    'cube-triagle/cubeTriagle': './src/cubeTriagle.ts',
    'wave/wave': './src/lib/service/wave.ts',
    'tracking/tracking': './src/lib/service/trackingCharacter.ts',
  },
  output: {
    path: `${__dirname}/public`,
    filename: './[name].bundle.js',
  },
  module: {
    rules: [
      {
        //拡張子 .scss、.sass、css を対象
        test: /\.(scss|sass|css)$/i,
        // 使用するローダーの指定（後ろから順番に適用される）
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // Asset Modulesの設定
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        // 画像をコピーして出力
        type: 'asset/resource',
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
  //production モード以外の場合は source-map タイプのソースマップを指定
  devtool: enabledSourceMap ? 'source-map' : 'eval',
  // node_moduleを監視(watch)対象から除外
  watchOptions: {
    ignored: /node_modules/, //正規表現で指定
  },
};

export default config;
