const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const browserConfig = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      { test: /\.js$|jsx/, use: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
    new webpack.DefinePlugin({
      process: {env: {}}
  })
  ],
  resolve:{
    extensions:['.js','.jsx']
  }
};

const serverConfig = {
  mode: "production",
  entry: "./ssr/server/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  module: {
    rules: [
      { test: /\.js$|jsx/, use: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: "false",
    }),
    new webpack.DefinePlugin({
      process: {env: {}}
  })
  ],
  resolve:{
    extensions:['.js','.jsx']
  }
};

module.exports = [browserConfig, serverConfig];
