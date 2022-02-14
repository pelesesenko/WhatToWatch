const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].bundle.js",
    chunkFilename: '[name].bundle.js',//????
    path: path.resolve(__dirname, "public"),
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    watchFiles: path.join(__dirname, "public"),
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
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
        use: ['style-loader', {loader: 'css-loader', options: {import: false, modules: true}}],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
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
