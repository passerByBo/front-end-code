const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve, join } = require('path')
module.exports = {
    entry: join(__dirname, '../src/client/index.tsx'),
    output: {
        path: join(__dirname, '../dist/assets'),
        //ilename 指列在 entry 中，打包后输出的文件的名称。
        filename: 'scripts/[name][hash:5]_bundle.js',
        //chunkFilename 指未列在 entry 中，却又需要被打包出来的文件的名称
        // chunkFilename: 'scripts/1111111[name]-[id]-[hash:5]-bundle.js',
        clean:true,
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
        template: join(__dirname, '../','./src/client/template/index.html'),
        minify:false
    })]
}