// webpack.client.config.js
import webpack from 'webpack';
import { resolve as _resolve } from "path";
import TerserPlugin from 'terser-webpack-plugin'

export default (env, argv) => {
  const isDevelopment = argv.mode === 'development'
  const buildDir = isDevelopment ? 'build-dev' : 'build';
  return {
    devtool: "source-map",
    mode: argv.mode,
    target: "web",
    entry: './src/client/index.tsx',  
    output: {
      filename: "bundle.[contenthash].js",
      path: _resolve(`./${buildDir}/public`),
    },
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["css-loader"],
        },
        {
          test: /\.(png\|jpg\|gif\|avif\|\/otf\/|ttf)$/i,
          loader: 'ignore-loader',
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: [
            /node_modules/,
            /node_modules\/(dotenv|google-auth-library|formidable|dotenv|mongoose)/,
            /node_modules\/(nodemailer|sync-fetch|uuid|ws|chokidar-cli|compression-webpack-plugin)/,
            /node_modules\/(css-loader|esm|file-loader|jest|json-loader|mkdirp|ncp|node-loader)/,
            /node_modules\/(nodemon|npm-run-all|style-loader|terser-webpack-plugin|ts-loader|ts-node)/,
            /node_modules\/(tsconfig-paths|typescript|webpack|webpack-bundle-analyzer|webpack-cli)/,
            /node_modules\/(webpack-dev-server|webpack-node-externals)/

          ],
          use: ["ts-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    optimization: {
      emitOnErrors: false,
      moduleIds: 'hashed',
      minimize: true,
      minimizer: [new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            // Enable aggressive minification options
            defaults: true,
            arrows: true,
            arguments: true,
            module: true,
            unused: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            loops: true,
            passes: 5,
          },
        },
      }),],
      runtimeChunk: 'single', 
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 1000000,
        minChunks: 1,
        maxAsyncRequests: 15,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      usedExports: true,
    }
  }
};
