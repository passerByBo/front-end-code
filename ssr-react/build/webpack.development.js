const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { join } = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: {
            directory: join(__dirname, '../', '/dist/assets')
        },
        allowedHosts: 'all',
        compress: false,
        port: 3001,
        proxy: {
            '/dev-api': {
                target: 'http://localhost:3002',
                changeOrigin: true,
            }
        },
    }
})