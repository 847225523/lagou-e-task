const merge = require('webpack-merge').merge
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    performance: {
        hints: false
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
})
