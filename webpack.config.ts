const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const version = process.env.npm_package_version;

const config = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : undefined,
  devServer: {
    static: {
      directory: path.join(__dirname, `public`),
    },
    port: 8081,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  entry: {
    main: './src/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, `resources/${version}`),
  },
  module: {
    rules: [
      {
        // 拡張子 .tsx の場合
        test: /\.ts[x]?$/,
        exclude: [/node_modules/, /\.(sa|sc|c)ss$/],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
      },
      {
        // 拡張子 .sass or .scss or .css の場合
        test: /\.(sa|sc|c)ss$/,
        exclude: [/node_modules/, /\.(j|t)s[x]?$/],
        // Sassファイルの読み込みとコンパイル
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // jsとしてバンドルせず、cssとして出力する
          },
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // css内のurl()メソッドの取り込みを禁止
              url: false,
              // Sass+PostCSSの場合は2を指定
              importLoaders: 2,
              sourceMap: isDev,
            },
          },
          // PostCSSのための設定
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与
                  ['autoprefixer', { grid: true }],
                ],
              },
            },
          },
          // Sassをバンドルするための機能
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  target: ['web', 'es5'],
};

module.exports = config;
