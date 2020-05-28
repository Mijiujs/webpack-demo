const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
module.exports = {

    // 模式，2种：生产模式(production)和开发模式(development)
    // 开发模式不压缩打包后代码，生产模式压缩打包后代码
    mode: 'development',
    // devtool: 'inline-source-map',
    // devtool:'cheap-module-eval-source-map', // development
    // devtool:'cheap-module-source-map', // production

    devServer: {
        // contentBase: './dist', // 代表html页面所在的相对路径
        // publicPath 影响本地在开发环境中的访问
        open: true, // 打开浏览器
        port:8090,
        // proxy:{
        //     '/api':'http://localhost:3000'
        // }
    },

    // 监听
    // watch: true,
    // watchOptions: {
    //     poll: 1000, // 每秒询问多少次
    //     aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
    //     ignored: /node_modules/ //忽略时时监听
    // },

    // 入口，从哪个文件开始打包
    entry: {
        main: './src/index.js',
        // demo1: './src/demo1/demo1.js',
        // demo2: './src/demo2/demo2.js',
        // demo3:'./src/demo3/demo3.js'
    },
    // 出口
    output: {
        // publicPath:'http://cdn.com.cn', // 资源放在cdn上 统一为资源配置
        filename: 'main.js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist') // 路径必须是一个绝对路径,__dirname 当前webpack.config.js文件所在的目录
    },
    // loader
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
            // url-loader 图片很小用url-loader可以实现转base64
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