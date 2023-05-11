import { resolve as _resolve } from "path";

export const mode = "development";
export const target = "web";
export const entry = "./src/client/index.tsx";
export const output = {
  filename: "client.js",
  path: _resolve(__dirname, "dist/public"),
};
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

