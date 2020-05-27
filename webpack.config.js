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
            test: /\.jpg$/,
            // file-loader
            // use: {
            //     loader: 'file-loader',
            //     options: {
            //         name: '[name].[ext]',
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
            // 执行顺序 从上到下，从右到左
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 2
                }
            }, 'sass-loader', 'postcss-loader']
        }]
    }
}