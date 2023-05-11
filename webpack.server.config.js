const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/server/index.ts",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [webpackNodeExternals()],
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
    extensions: [".tsx", ".ts", ".js"],
  },
};

