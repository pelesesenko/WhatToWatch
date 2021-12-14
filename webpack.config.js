const path = require("path");
// const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    watchFiles: path.join(__dirname, "public"),
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  // plugins: [
  //   new Dotenv({
  //     path: path.resolve(__dirname, "src", "base.env"),
  //   }),
  // ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use:["babel-loader", "ts-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:["babel-loader"]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  devtool: "source-map",
};
