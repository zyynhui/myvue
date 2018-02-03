const path = require('path')
// 导入 html-webpack-plugin,得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')

const htmlPluginObj = new HtmlPlugin({
  template: path.join(__dirname, './src/index.html'), // 指定页面模板文件
  filename: 'index.html' // 指定生成的页面的名称
})

// --hot 热更新 /  热刷新  /  热重载    更够提高打包的效率，因为热更新只是 把需要重新打包的代码编译了一下，并以补丁的形式，热更新到了页面中，并没有重新编译整个项目
// 而且  --hot 也能够实现页面的无刷新重载(这个无刷新重载对JS无效，只对CSS有效)
module.exports = {
  // 指定入口和出口
  entry: path.join(__dirname, './src/main.js'), // 入口
  output: {
    path: path.join(__dirname, './dist'), // 指定输出的文件夹
    filename: 'bundle.js'
  }, // 出口
  plugins: [
    htmlPluginObj
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.jpg|png|gif|bmp$/, use: 'url-loader?name=[hash:8]-[name].[ext]' },
      { test: /\.ttf|eot|svg|woff|woff2$/, use: 'url-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}