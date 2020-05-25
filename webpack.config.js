const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        // __dirname 当前webpack.config.js文件所在的目录
        path: path.resolve(__dirname,'dist')
    }
}