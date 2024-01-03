// webpack.client.config.js
import webpack from 'webpack';
import { resolve as _resolve } from "path";
import TerserPlugin from 'terser-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

export default {
  devtool: "source-map",
  mode: "development",
  target: "web",
  entry: './src/client/index.tsx',  
  output: {
    filename: "bundle.[contenthash].js",
    path: _resolve("./build/public"),
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
    runtimeChunk: 'single', 
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 300000,
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
  },
  plugins: [
    new CompressionPlugin(),
  ]
};
