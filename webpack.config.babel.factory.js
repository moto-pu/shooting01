import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const srcPath = './src';
const numThreads = 4;
const threadPool = HappyPack.ThreadPool({ size: numThreads });
const compressOptions = {
  ecma: 8,
  drop_console: true,
};
const terserOptions = {
  toplevel: false,
  nameCache: null,
  ie8: false,
  keep_classnames: false,
  keep_fnames: false,
  safari10: false,
  ecma: 8,
  warnings: false,
  mangle: true,
  output: {
    comments: false,
    beautify: false,
  },
  compress: compressOptions,
};



const config = params => {
  const {environment, buildMode,
    isWatchify, usePolling, aggregateTimeout, pollInterval,
  } = params;
  const entry = {
    'shooting': `${srcPath}/main.js`,
  };
  const output = {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  };
  const ret = {
    mode: buildMode === 'develop' ? 'development' : 'production',
    entry,
    output,
    resolve: {
      extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    },
    watch: isWatchify,
    watchOptions: usePolling ? {
      aggregateTimeout: aggregateTimeout,
      poll: pollInterval
    } : {},
    cache: true,
    optimization: {
      minimize: buildMode !== 'develop',
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: numThreads,
          sourceMap: false,
          terserOptions,
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
    },
    devtool: buildMode === 'develop' ? 'source-map' : '',
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: environment.NODE_ENV,
        DEBUG: buildMode === 'develop',
      }),
      new HappyPack({
        id: 'babel',
        debug: false,
        verbose: false,
        threadPool,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              comments: false,
              compact: buildMode !== 'develop',
              cacheDirectory: true,
            },
          }
        ]
      }),
      new ProgressBarPlugin(),
      new webpack.BannerPlugin({
        banner:'This program code is bundled by Motohiro Yakura',
        raw: false,
        entryOnly: true
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: [
            /node_modules/,
          ],
          use: ['happypack/loader?id=babel']
        },
        {
          test: /\.(png|jpe?g|gif|woff|svg|eot|ttf|woff2)$/i,
          use: [
            {
              loader: 'url-loader',
            },
            {
              loader: 'image-webpack-loader',
              query: {
                bypassOnDebug: true,
                mozjpeg: {
                  progressive: true
                },
                gifsicle: {
                  interlaced: true
                },
                optipng: {
                  optimizationLevel: 7
                }
              }
            }
          ]
        },
      ]
    }
  };

  if (buildMode !== 'develop') {
    ret.plugins = [
      ...ret.plugins,
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
    ];
  }
  return ret;
};

export default config;
