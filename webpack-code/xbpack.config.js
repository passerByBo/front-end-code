const {join} = require('path');
const MyExamoleWebpackPlugin = require('./plugins/MyExamoleWebpackPlugin.js');
module.exports = {
    entry: join(__dirname, './src/index.js'),
    output: {
        path:join(__dirname, './dist'),
        filename: 'main.js'
    },
    plugins: [
        // new MyExamoleWebpackPlugin()
    ]
}