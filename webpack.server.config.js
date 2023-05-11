import { resolve as _resolve } from "path";
import webpackNodeExternals from "webpack-node-externals";

export const mode = "development";
export const target = "node";
export const entry = "./src/server/index.ts";
export const output = {
  filename: "server.js",
  path: _resolve(__dirname, "dist"),
};
export const externals = [webpackNodeExternals()];
export const module = {
  rules: [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: "ts-loader",
    },
  ],
};
export const resolve = {
  extensions: [".tsx", ".ts", ".js"],
};

