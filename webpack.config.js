const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
module.exports = {
    mode: 'production', // 模式，默认两种 production和development
    entry: { // 入口，从哪个文件开始打包
        main: './src/index.js',
        app:'./src/app.js'
    },
    output: { // 出口
        // publicPath:'http://cdn.com.cn',
        filename: '[name].js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist') // 路径必须是一个绝对路径,__dirname 当前webpack.config.js文件所在的目录
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',       // 指定要打包的模板
            filename: 'index.html',             // 打包后生成的文件
        }),
        new CleanWebpackPlugin()
    ],

}