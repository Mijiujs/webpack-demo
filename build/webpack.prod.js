const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css'
        })
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
    },
    output: {
        // publicPath:'http://cdn.com.cn', // 资源放在cdn上 统一为资源配置
        filename: '[name].[contenthash].js', // 内容不变contenthash不变
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist')  // 路径必须是一个绝对路径,__dirname 当前webpack.config.js文件所在的目录
    }
}
module.exports = merge(commonConfig, prodConfig)
