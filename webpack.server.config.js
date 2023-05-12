// webpack.server.config.js

import { resolve as _resolve } from "path";

export default {
  devtool: "source-map",
  mode: "development",
  target: "node",
  entry: "./src/server/index.tsx",
  output: {
    filename: "server.js",
    path: _resolve(new URL(".", import.meta.url).pathname, "dist"),
    library: { type: "module" },
    libraryTarget: "module",
    chunkFormat: "module",
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
