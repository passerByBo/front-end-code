const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
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
            name: 'app1',
            library: { type: 'var', name: 'app1' },
            remotes: { app2: 'app2' },
            shared: {
                'react': {
                    singleton: true,
                    eager: true,
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}