# webpack-demo

demo1 
webpack模块打包器，可支持commonjs和ES6的模块语法，也包括amd，cmd等等

demo2 
图片可用file-loader，url-loader（小于多少大小直接转base64）
css相关 用css-loader style-loader scss-loader postcss-loader(可以为css高级属性默认添加浏览器前缀),postcss-loader记得配置postcss.config.js文件,使用autoprefixer

demo3 
字体iconfont用file-loader

demo4 
模块热替换HMR Hot Module Replacement 热模块更新
css文件不用 因为css-loader已帮忙实现

demo5
babel es6->es5
npm install --save-dev babel-loader @babel/core
在webpack.config.js中
module: {
  rules: [
      { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: "babel-loader",  

      }
  ]
}
babel-loader实现了转换，但是还不够，有些变量需要被注入进来

配合工具1 preset
使用场景：只是业务代码
1.安装
npm install @babel/preset-env --save-dev
2.在babel-loader的options中放入
options: {
      'presets': ['@babel/preset-env']
}
3.精简，不用的语法不引入，只引入业务代码中涉及到的语法
npm install --save @babel/polyfill 
4.在babel-loader的options改成
options: {
      'presets': [['@babel/preset-env', {
            // 高级浏览器不用转换
            "targets": {
            "edge": "17",
            "firefox": "60",
            "chrome": ">67",
            "safari": "11.1",
            }, 
            useBuiltIns: 'usage'
      }]]
}
5.在对应js文件
import "@babel/polyfill";
polyfill会污染全局环境

配合工具2 plugin runtime
使用场景：生成第三方文件，打包库
1.安装
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
2.在babel-loader的options中放入
options: {
     'plugins': [
            [
                  "@babel/plugin-transform-runtime",
                  {
                        "absoluteRuntime": false,
                        "corejs": false,
                        "helpers": true,
                        "regenerator": true,
                        "useESModules": false,
                        "version": "7.0.0-beta.0"
                  }
            ]
      ]
}
把corejs改成2（只引入用到的代码）
安装
npm install --save @babel/runtime-corejs2
如果options太多，可以新建文件.babelrc并放入

---

# plugin 可以再webpack运行到某个时刻的时候,帮你做一些事情
HtmlWebpackPlugin 打包结束后,自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
CleanWebpackPlugin 打包之前清除打包目录
---

# devtool 值以下
source-map 它是一个映射关系，映射出当前具体是哪个文件哪个位置出错,打包后会出现.map文件
inline-source-map .map被合并到文件内
开发环境 devtool:'cheap-module-eval-source-map'
生产环境 devtool:'cheap-module-source-map' 不产生文件，不产生列
---

# package.json
1.webpack --watch 
自动执行了重新打包的过程，但是不会启一个服务器，因此无法进行ajax的调试，每次都要重新刷新浏览器
2.webpack-dev-server 需要安装，帮我们启动服务器，打包代码到dist目录下(放到内存里),可以打开浏览器并且刷新
3.自己写服务器 其实就是node server.js，要引入webpack-dev-middleware
