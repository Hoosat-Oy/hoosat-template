// webpack.server.config.js
import { resolve as _resolve } from "path";
import webpack from 'webpack';
export default {
  devtool: "source-map",
  mode: "development",
  target: "node",
  entry: "./src/server/index.tsx",
  output: {
    filename: "server.js",
    path: _resolve("./build"),
    module: true,
    chunkFormat: "module",
    library: { type: "module" },
    libraryTarget: "module",
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(node|png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'mongodb-client-encryption': 'mongodb-client-encryption-browserify'
    },
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  ignoreWarnings: [
    /aws-crt/, 
    /mongodb\/lib\/utils.js/, 
    /mongodb\/lib\/deps.js/
  ],
  plugins: [
    new webpack.DefinePlugin({
      'global.GENTLY': false,
    }),
    new webpack.DefinePlugin({
      '__filename': false,
      '__dirname': false
    }),
  ],
};