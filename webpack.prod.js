const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: './src/index.js',
    },
    output: {
        // publicPath:'http://cdn.com.cn', // 资源放在cdn上 统一为资源配置
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    // loader
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
            // scc文件
            test: /\.css$/,
            // 执行顺序 从下到上，从右到左
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            // scss文件
            test: /\.scss$/,
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
}