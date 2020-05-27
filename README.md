# webpack-demo
demo1 webpack模块打包器，可支持commonjs和ES6的模块语法，也包括amd，cmd等等
---
demo2 图片可用file-loader，url-loader（小于多少大小直接转base64）
      css相关 用css-loader style-loader scss-loader postcss-loader(可以为css高级属性默认添加浏览器前缀),postcss-loader记得配置postcss.config.js文件,使用autoprefixer
---
demo3 字体iconfont用file-loader
---
#plugin 可以再webpack运行到某个时刻的时候,帮你做一些事情
HtmlWebpackPlugin 打包结束后,自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
CleanWebpackPlugin 打包之前清除打包目录
---
sourceMap 它是一个映射关系，映射出当前具体是哪个文件哪个位置出错