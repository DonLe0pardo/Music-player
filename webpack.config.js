const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

// stylus css in build

module.exports = {

  entry: './dev/index.js',  // точка входа

  output: {
    path: path.resolve(__dirname, 'build'), // resolve  для разрешения поиска файлов.
    filename: 'bundle.js',
    publicPath: '/build/', // publicPath  куда загружены объединенные файлы. (абсолютный путь или относительно основного файла HTML) указывает общедоступный URL-адрес выходного каталога при ссылке в браузере
  },

  module: {
    rules: [
      {
        // test: /\.css$/i,
        // test: /\.styl$/,
        test: /\.(styl|css)$/,
        use: [
          { 
            loader: MiniCssExtractPlugin.loader,
          },
          // {
          //   loader: "style-loader",
          // },
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
          }
          
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename:  "style.css",
    })
  ],

  devServer: {

    static: {         // Этот параметр позволяет настроить параметры для обслуживания статических файлов из каталога / откуда должны обслуживаться пакеты
      directory: path.join(__dirname, '/'), // join directory     path.join - объединяет все указанные сегменты пути с разделителем соответствующим текущей платформе
    },

  },
  
};