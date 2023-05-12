// webpack.client.config.js

import { resolve as _resolve } from "path";

export default {
  devtool: "source-map",
  mode: "development",
  target: "web",
  entry: "./src/client/index.tsx",
  output: {
    filename: "bundle.js",
    path: _resolve(new URL(".", import.meta.url).pathname, "public"),
    module: true,
    chunkFormat: "module",
    libraryTarget: "module",
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};
