const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output:{
    filename: "bundle.js",
    path: path.resolve(__dirname, 'public')
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options:{
          presets:[]
        }
      }
    ]
  }
}
