# webpack-demo

### demo1 
webpack模块打包器，可支持commonjs和ES6的模块语法，也包括amd，cmd等等

### demo2 
图片可用file-loader，url-loader（小于多少大小直接转base64）

css相关 用css-loader style-loader scss-loader postcss-loader(可以为css高级属性默认添加浏览器前缀)

postcss-loader记得配置postcss.config.js文件,使用autoprefixer

### demo3 
字体iconfont用file-loader

### demo4 
模块热替换HMR(HotModuleReplacement)
注意：css文件不用，因为css-loader已帮忙实现

### demo5
babel es6->es5
```
npm install --save-dev babel-loader @babel/core
```
在webpack.config.js中
```
module: {
  rules: [
      { 
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: "babel-loader",  
      }
  ]
}
```
babel-loader实现了转换，但是还不够，有些变量需要被注入进来

配合工具 preset polyfill 使用场景：只是业务代码,因为polyfill会污染全局环境

一.安装
```
npm install @babel/preset-env --save-dev
```
二.在babel-loader的options中放入
```
options: {
      'presets': ['@babel/preset-env']
}
```
三.精简，不用的语法不引入，只引入业务代码中涉及到的语法
```
npm install --save @babel/polyfill 
```
polyfill实际上就是在window上添加一些对象
四.在babel-loader的options改成
```
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
```
五.在对应js文件
```
import "@babel/polyfill";
```
会出提示
```
When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.
Please remove the `import '@babel/polyfill'` call or use `useBuiltIns: 'entry'` instead.
```
其实可以不用引了,webpack已帮忙处理啦



配合工具2 plugin runtime 使用场景：生成第三方文件，打包库

一.安装
```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```
二.在babel-loader的options中放入
```
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
```
三.把corejs改成2（精简，不用的语法不引入，只引入业务代码中涉及到的语法），需安装
```
npm install --save @babel/runtime-corejs2
```
四.如果options太多，可以新建文件.babelrc并放入

### demo6
Tree Shaking:引入文件中使用的部分做打包，不使用的不打包

注意：只支持ES Module。es底层静态引入，commonjs动态

development模式下是没有的。但是实际引用后并不做删除，还是做exports user提示,因为开发环境错误要在浏览器出提示，如果生效就导致行数都出错了

1.在webpack.config.js下
```
optimization: {
      usedExports: true
}
```
2.在package.json
对所有模块
```
"sideEffects":false,
```
或者对除数组之外的，css文件不需要做Tree Shaking处理
```
"sideEffects":["*.css"],
```
***

### demo7
code splitting:代码分割

在webpack.config.js中
```
optimization: {
      splitChunks: {
      chunks: 'all'
      }
}
```
参数详细说明
```
 optimization: {
      // code splitting
      splitChunks: {
            chunks: "all", // async：异步（默认） all：所有 initial：只对同步
            minSize: 30000, // 引入文件大于30000字节才做分割
            minChunks: 1, // 当一个代码被引入了多少次才被分割
            maxAsyncRequests: 5, // 同时加载的模块数最多是5个，前5个分割，之后不分割
            maxInitialRequests: 3, // 入口文件最多分割出3个
            automaticNameDelimiter: '~', // 生成文件中间的连接符
            name: true,
            cacheGroups: {
                  vendors: {
                        // 如果引入的库来自node_modules
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10, // 优先级，谁大谁先
                        filename:'vendors.js'
                  },
                  default: {
                        priority: -20,
                        reuseExistingChunk: true, // 如果一个模块被打包过了那么久忽略这个模块直接使用之前被打包的模块
                        filename:'default.js'
                  }
            }
      }
}
```


# plugin 
可以再webpack运行到某个时刻的时候,帮你做一些事情
### HtmlWebpackPlugin 
打包结束后,自动生成一个html文件，并把打包生成的js自动引入到这个html文件中

https://www.webpackjs.com/plugins/html-webpack-plugin/
### CleanWebpackPlugin 
打包之前清除打包目录
### SplitChunksPlugin
https://www.webpackjs.com/plugins/split-chunks-plugin/
### babel-plugin-dynamic-import-webpack

### MiniCssExtractPlugin
https://www.npmjs.com/package/mini-css-extract-plugin
将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap，如果要压缩css使用下面那个插件
### extract-text-webpack-plugin

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
      plugins: [
            new MiniCssExtractPlugin({})
      ],
      module: {
            rules: [
                  {
                        // scc文件
                        test: /\.css$/,
                        // 执行顺序 从下到上，从右到左
                        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                  }, {
                        // scss文件
                        test: /\.scss$/,
                        use: [
                              MiniCssExtractPlugin.loader,
                              {
                              loader: 'css-loader',
                              options: {
                                    importLoaders: 2, // import引入的文件也走下面两个loader
                                    modules: true // css模块化
                              }
                              },
                              'sass-loader',
                              'postcss-loader']
                  },
            ]
      }
}
```
***

# devtool 值以下
source-map 它是一个映射关系，映射出当前具体是哪个文件哪个位置出错,打包后会出现.map文件

inline-source-map .map被合并到文件内

开发环境 devtool:'cheap-module-eval-source-map'

生产环境 devtool:'cheap-module-source-map' 不产生列
***

# package.json
1.webpack --watch 
自动执行了重新打包的过程，但是不会启一个服务器，因此无法进行ajax的调试，每次都要重新刷新浏览器
2.webpack-dev-server 需要安装，帮我们启动服务器，打包代码到dist目录下(放到内存里),可以打开浏览器并且刷新
3.自己写服务器 其实就是node server.js，要引入webpack-dev-middleware
***

# 打包分析,Preloading,prefetching
https://github.com/webpack/analyse

package.json script中 
```
webpack --profile --json > stats.json
```
目录下会多出stats.json，可以在http://webpack.github.io/analyse/进行分析
```
/*webpackPrefetch:true*/ //等主流程结束后空闲才回去加载，推荐
/*webpackPreLoad:true*/  //和主流程一起加载
```
# shimming
多个文件需要使用某个第三方库,不用一个一个文件引入，可以使用shimming
```
// 当发现在一个模块用了$字符串，那么在那个文件自动引入jquery
new webpack.ProvidePlugin({
      $:'jquery'
}),
```
让每个某块的this指向window对象,对某个js文件引用imports-loader
```
npm install imports-loader --save-dev

loader:'imports-loader?this=>window'
```







