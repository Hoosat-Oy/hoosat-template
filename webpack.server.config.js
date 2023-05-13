// webpack.server.config.js

// Import the "resolve" method from the "path" module
import { resolve as _resolve } from "path";

// Export the configuration object
export default {
  // Set the source map type to "source-map" for easier debugging
  devtool: "source-map",
  // Set the build mode to "development"
  mode: "development",
  // Specify the target environment as "node" to bundle for Node.js
  target: "node",
  // Specify the entry point for the server application
  entry: "./src/server/index.tsx",
  // Specify the output file name and path
  output: {
    filename: "server.js",
    path: _resolve(new URL(".", import.meta.url).pathname, "dist"),
    // Set the output format to "module"
    module: true,
    // Set the chunk format to "module"
    chunkFormat: "module",
    // Set the library target to "module"
    library: { type: "module" },
    libraryTarget: "module",
  },
  // Enable the "outputModule" experiment
  experiments: {
    outputModule: true,
  },
  // Specify the module loaders and rules
  module: {
    rules: [
      // Use the "ts-loader" to transpile TypeScript files
      {
        test: /.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      // Use the "style-loader" and "css-loader" to load CSS files
      {
        test: /.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // Specify the file extensions to resolve
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};