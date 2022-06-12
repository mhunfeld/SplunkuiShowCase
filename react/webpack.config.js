const path = require("path");

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    base: './src/base/main.js',
    customVisualization: './src/customVisualization/main.js',
    customInputs: './src/customInputs/main.js'
  },
  output: {
    path: path.join(__dirname, "../appserver/static/react/"),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    fallback: { "querystring": require.resolve("querystring-es3") },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader:"babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-nullish-coalescing-operator"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: "../appserver/static/resources/",
            publicPath: '/static/app/SplunkuiShowCase/react/resources'
          }
        }]
      }
    ]
  }
};