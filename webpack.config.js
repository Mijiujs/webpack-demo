const path = require('path')
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        // __dirname 当前webpack.config.js文件所在的目录
        path: path.resolve(__dirname,'bundle')
    }
}