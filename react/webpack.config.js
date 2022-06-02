const path = require("path");

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',

  entry: {
    demo: './src/demo.js'
  },
  output: {
    path: path.join(__dirname, "../appserver/static/react/"),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
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
            outputPath: "./resources",
            publicPath: '/static/app/reactapp/dist/resources'
          }
        }]
      }
    ]
  }
};