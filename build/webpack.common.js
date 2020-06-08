const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
    output: {
        // publicPath:'http://cdn.com.cn', // 资源放在cdn上 统一为资源配置
        // publicPath:'/',
        filename: '[name].js', // 打包后的文件名
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '../dist')  // 路径必须是一个绝对路径,__dirname 当前webpack.config.js文件所在的目录
    },
    module: {
        rules: [{
            // 图片文件
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
            // 字体文件
            test: /\.(eot|ttf|svg|woff)$/,
            use: {
                loader: 'file-loader',
                options: {
                    outputPath: '/font'
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                'presets': [['@babel/preset-env', {
                    "targets": {
                        "edge": "17",
                        "firefox": "60",
                        "chrome": "67",
                        "safari": "11.1",
                    },
                    useBuiltIns: 'usage'
                }]],
                // 'plugins': [
                //     [
                //         "@babel/plugin-transform-runtime",
                //         {
                //             "absoluteRuntime": false,
                //             "corejs": 2,
                //             "helpers": true,
                //             "regenerator": true,
                //             "useESModules": false,
                //             "version": "7.0.0-beta.0"
                //         }
                //     ]
                // ]
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',       // 指定要打包的模板
            filename: 'index.html',             // 打包后生成的文件
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        usedExports: true,
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
                vendors: false,
                default: false
            }
        }
    },
}
