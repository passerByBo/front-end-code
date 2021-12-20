const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path')
module.exports = {
    entry: join(__dirname, '../src/client/index.tsx'),
    output: {
        path: join(__dirname, '../dist'),
        filename: 'assets/index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?/,
                use:['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    plugins: [new HtmlWebpackPlugin({
        template: join(__dirname, '../','index.html')
    })]
}