const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    // optimization:{
    //     runtimeChunk:{
    //         name: 'runtime'
    //     }
    // },
    // externals:{
    //     'react':'react',
    //     'react-dom': 'react-dom'
    // },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-react', { targets: "defaults" }]
                        ],
                    }
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app2',
            library: { type: 'var', name: 'app2' },
            exposes:{
                './Button': './src/Button'
            },
            filename: 'remoteEntry.js'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}