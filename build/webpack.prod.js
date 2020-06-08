const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename:'[name].chunk.css'
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
    }
}
module.exports = merge(commonConfig, prodConfig)
