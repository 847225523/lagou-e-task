const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [
            {
                test: /.vue$/,
                use: ['vue-loader']
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img',
                        name: '[name].[ext]',
                        esModule: false
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: { // 需要配置这块儿就可以了
                    esModule: false
                },
                exclude: /index.html/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'vue-webpack',
            template: './public/index.html',
            inject: true
        }),
        new VueLoaderPlugin()
    ]
}
