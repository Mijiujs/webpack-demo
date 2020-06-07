const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
    // 模式，2种：生产模式(production)和开发模式(development)
    // 开发模式不压缩打包后代码，生产模式压缩打包后代码
    mode: 'development',
    // devtool:'cheap-module-source-map',
    // devtool: 'inline-source-map',
    // devtool:'cheap-module-eval-source-map', // development
    // devtool:'cheap-module-source-map', // production
    devServer: {
        contentBase: './dist', // 代表html页面所在的相对路径
        // publicPath 影响本地在开发环境中的访问
        open: true, // 打开浏览器
        port: 8090,
        hot: true,
        // hotOnly: true
        // proxy:{
        //     '/api':'http://localhost:3000'
        // }
    },

    // 入口，从哪个文件开始打包
    entry: {
        main1: './src/index1.js',
        main: './src/index.js',
        // demo1: './src/demo1/demo1.js',
        // demo2: './src/demo2/demo2.js',
        // demo3:'./src/demo3/demo3.js',
        // demo4: './src/demo4/demo4.js',
        // demo5: './src/demo5/demo5.js',
        // demo6: './src/demo6/demo6.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true
    }
}

module.exports = merge(commonConfig, devConfig)