const IgnorePlugin = require('webpack').IgnorePlugin;
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const postcssPresetEnv = require('postcss-preset-env');
const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new IgnorePlugin(/^\.\/locale$/, /moment$/),
  new LodashModuleReplacementPlugin(),
  new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
  }),
  // Inlines the webpack runtime script. This script is too small to warrant
  // a network request.
  new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/runtime~.+[.]js/]),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
  }),
  new OptimizeCssAssetsPlugin(),
];

process.env.WEBPACK_PROFILE &&
  plugins.push(
    new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin({
      analyzerMode: 'static',
    })
  );

module.exports = {
  output: {
    publicPath: '/',
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: devMode ? 'eval-source-map' : 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssPresetEnv(/* pluginOptions */)],
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
      // additional optimization: put heavy libs into separate chunk
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const heavyLibs = ['moment', 'moment-timezone'];
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return heavyLibs.includes(packageName) ? 'vendor-big' : 'vendor';
          },
        },
      },
    },
    runtimeChunk: true,
  },
};
