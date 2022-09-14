const path = require('path'); // получаем абсолютный адрес этого файла

module.exports = {
  entry: { main: './src/pages/index.js' }, // Точка вхожа для webpack
  output: {
    path: path.resolve(__dirname, 'dist'), //__dirname - глобальная переменная Node.js адрес папки где мы сейчас находимся. Второй аргумент - относительный путь до нужной папки.
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, '/dist'), // путь, куда "смотрит" режим разработчика
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
};
