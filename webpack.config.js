// HtmlWebPackPlugin 会在打包结束后,自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    mode: 'production', // 默认
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'main.js',
        // __dirname 当前webpack.config.js文件所在的目录
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            // file-loader
            // use: {
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name]_[hash].[ext]',
            //         outputPath: 'images/',
            //     },
            // },

            // url-loader 图片很小用url-loader
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    // 单位:字节
                    limit: 2048
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.scss$/,
            // 执行顺序 从下到上，从右到左
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2, // import引入的文件也走下面两个loader
                        modules: true // css模块化
                    }
                },
                'sass-loader',
                'postcss-loader']
        }, {
            test: /\.(eot|ttf|svg|woff)$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: '/font'
                }
            }
        }]
    },
    plugins:[new HtmlWebPackPlugin({
        template:'./src/index.html'
    })]
}